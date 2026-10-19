// Every built page needs a <title> and a meta description of its own, and a
// page that sets seo_title / seo_description (the Obsidian post template's
// fields) must render them. jekyll-seo-tag alone ignores both fields;
// _includes/seo.html swaps them in. seo_title is the whole <title> (no site
// suffix), og:title, twitter:title and the JSON-LD headline; seo_description
// is the meta description, og:description and the JSON-LD description.
// Redirect stubs (meta refresh) are skipped.
// Reads the built _site. Build the site first: bundle exec jekyll build
// Run: node --test '_tests/**/*.test.mjs'
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const site = join(root, '_site');
// Source folders whose pages may set seo_*; root-level pages are read too.
const SOURCE_DIRS = ['_posts', '_categories'];

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };
const decode = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1)));
    return ENTITIES[e.toLowerCase()] ?? m;
  });
const norm = (s) => s.replace(/\s+/g, ' ').trim();

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = join(dir, e.name);
    return e.isDirectory() ? walk(full) : e.name.endsWith('.html') ? [full] : [];
  });
}

function readHead(file) {
  const html = readFileSync(file, 'utf8');
  if (html.includes('http-equiv="refresh"')) return null;
  const head = (html.match(/<head>([\s\S]*?)<\/head>/) || [, ''])[1];
  const meta = (attr, name) => {
    const m = head.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`));
    return m ? norm(decode(m[1])) : '';
  };
  const title = head.match(/<title>([\s\S]*?)<\/title>/);
  const ld = head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  let json = {};
  try {
    if (ld) json = JSON.parse(ld[1]);
  } catch (err) {
    throw new Error(`${relative(site, file)}: JSON-LD does not parse: ${err.message}`);
  }
  return {
    title: title ? norm(decode(title[1])) : '',
    description: meta('name', 'description'),
    ogTitle: meta('property', 'og:title'),
    twitterTitle: meta('property', 'twitter:title'),
    ogDescription: meta('property', 'og:description'),
    ldHeadline: norm(decode(json.headline ?? '')),
    ldDescription: norm(decode(json.description ?? '')),
  };
}

// One front matter scalar: plain, quoted, or a block (> or |) on the
// following indented lines. Enough for what the Obsidian template writes.
function frontMatterValue(fm, key) {
  const lines = fm.split(/\r?\n/);
  const i = lines.findIndex((l) => l.startsWith(`${key}:`));
  if (i < 0) return '';
  let v = lines[i].slice(key.length + 1).trim();
  const more = [];
  for (let j = i + 1; j < lines.length && /^(\s+\S|\s*$)/.test(lines[j]); j++) more.push(lines[j].trim());
  if (/^[>|][-+]?$/.test(v)) return norm(more.join(' '));
  if (v.startsWith('"')) {
    try { return norm(JSON.parse(v)); } catch { return norm(v.slice(1, -1)); }
  }
  if (v.startsWith("'")) return norm(v.slice(1, -1).replace(/''/g, "'"));
  return norm([v.replace(/\s+#.*$/, ''), ...more].join(' '));
}

const pages = existsSync(site) ? walk(site) : [];
const heads = new Map();
for (const file of pages) {
  const h = readHead(file);
  if (h) heads.set(relative(site, file), h);
}

// Where a source file is built: its permalink, else a post's slug, else
// the root page's own name.
function builtPath(dir, file, fm) {
  const permalink = frontMatterValue(fm, 'permalink');
  if (permalink) return (permalink.endsWith('/') ? `${permalink}index.html` : permalink).replace(/^\//, '');
  const name = file.replace(/\.[^.]+$/, '');
  if (dir === '_posts') {
    const slug = `${name.replace(/^\d{4}-\d{2}-\d{2}-/, '')}.html`;
    const hits = [...heads.keys()].filter((rel) => basename(rel) === slug);
    return hits.length === 1 ? hits[0] : null;
  }
  return dir === '' ? `${name}.html` : null;
}

const sources = [];
for (const dir of ['', ...SOURCE_DIRS]) {
  const abs = join(root, dir);
  if (!existsSync(abs)) continue;
  for (const file of readdirSync(abs).filter((f) => /\.(md|markdown|html)$/.test(f))) {
    const fm = readFileSync(join(abs, file), 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fm) continue;
    const seoTitle = frontMatterValue(fm[1], 'seo_title');
    const seoDescription = frontMatterValue(fm[1], 'seo_description');
    if (seoTitle || seoDescription) {
      sources.push({ source: join(dir, file), built: builtPath(dir, file, fm[1]), seoTitle, seoDescription });
    }
  }
}

test('the site is built and has pages and seo_* sources', () => {
  assert.ok(existsSync(site), `${site} not found; run bundle exec jekyll build first`);
  assert.ok(heads.size > 0, 'no built pages found; the test would pass vacuously');
  assert.ok(sources.length > 0, 'no source sets seo_title or seo_description; the test would pass vacuously');
});

for (const [rel, h] of heads) {
  test(`${rel} has a <title> and a meta description`, () => {
    assert.ok(h.title, `${rel} has no <title>`);
    assert.ok(h.description, `${rel} has no meta description`);
  });
}

for (const field of ['title', 'description']) {
  test(`no two pages share a ${field === 'title' ? '<title>' : 'meta description'}`, () => {
    const seen = new Map();
    for (const [rel, h] of heads) if (h[field]) seen.set(h[field], [...(seen.get(h[field]) || []), rel]);
    const dupes = [...seen].filter(([, rels]) => rels.length > 1);
    assert.deepEqual(
      dupes.map(([value, rels]) => `${rels.join(', ')} share "${value.slice(0, 70)}"`),
      [],
      `pages share a ${field}; give each its own (seo_${field} or ${field} in front matter)`,
    );
  });
}

for (const { source, built, seoTitle, seoDescription } of sources) {
  test(`${source} renders its seo_title and seo_description`, () => {
    assert.ok(built, `${source}: no single built page found for it`);
    const h = heads.get(built);
    assert.ok(h, `${source}: ${built} is not in _site`);
    if (seoTitle) {
      assert.equal(h.title, seoTitle, `${built}: <title> is not seo_title`);
      assert.equal(h.ogTitle, seoTitle, `${built}: og:title is not seo_title`);
      assert.equal(h.twitterTitle, seoTitle, `${built}: twitter:title is not seo_title`);
      assert.equal(h.ldHeadline, seoTitle, `${built}: JSON-LD headline is not seo_title`);
    }
    if (seoDescription) {
      assert.equal(h.description, seoDescription, `${built}: meta description is not seo_description`);
      assert.equal(h.ogDescription, seoDescription, `${built}: og:description is not seo_description`);
      assert.equal(h.ldDescription, seoDescription, `${built}: JSON-LD description is not seo_description`);
    }
  });
}
