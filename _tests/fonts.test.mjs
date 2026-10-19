// The web fonts are hosted on the site (assets/fonts/, declared in
// _sass/_fonts.scss). Nothing may load from Google Fonts again: its
// stylesheet blocked rendering on every page. Every @font-face src must be
// a file in the build, every page with a <head> must preload the body face
// and carry the site CSS inline exactly once (<style id="site-css">, built
// from _includes/site.scss), and Inter must reach weight 700 (bold table
// first columns and totals).
// Reads the built _site. Build the site first: bundle exec jekyll build
// Run: node --test '_tests/**/*.test.mjs'
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const site = join(root, '_site');
const css = join(site, 'assets/css/main.css');
const PRELOAD =
  '<link rel="preload" href="/assets/fonts/cormorant-garamond-latin.woff2" as="font" type="font/woff2" crossorigin>';
const GOOGLE = /fonts\.(googleapis|gstatic)\.com/;

function walk(dir, ext) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = join(dir, e.name);
    if (e.isDirectory()) return walk(full, ext);
    return ext.some((x) => e.name.endsWith(x)) ? [full] : [];
  });
}

function fontFaces() {
  const text = readFileSync(css, 'utf8');
  return [...text.matchAll(/@font-face\s*\{([^}]*)\}/g)].map(([, body]) => {
    const get = (k) => ((body.match(new RegExp(`${k}\\s*:\\s*([^;]+)`)) || [])[1] || '').trim();
    return {
      family: get('font-family').replace(/["']/g, ''),
      style: get('font-style'),
      weight: get('font-weight'),
      urls: [...get('src').matchAll(/url\(\s*["']?([^"')]+)["']?\s*\)/g)].map((m) => m[1]),
    };
  });
}

test('the site is built', () => {
  assert.ok(existsSync(css), 'no _site/assets/css/main.css: run bundle exec jekyll build');
});

test('no page, stylesheet or script references Google Fonts', () => {
  const hits = walk(site, ['.html', '.css', '.js', '.xml'])
    .filter((f) => GOOGLE.test(readFileSync(f, 'utf8')))
    .map((f) => relative(site, f));
  assert.deepEqual(hits, [], 'remove the Google Fonts reference; the fonts are in assets/fonts/');
});

test('every @font-face src is a file in the build', () => {
  const faces = fontFaces();
  assert.ok(faces.length > 0, 'main.css has no @font-face rules: is _sass/_fonts.scss imported?');
  for (const face of faces) {
    assert.ok(face.urls.length > 0, `${face.family} ${face.style}: no src url`);
    for (const url of face.urls) {
      assert.match(url, /^\/[^/]/, `${face.family} ${face.style}: src ${url} must be a site-absolute path`);
      assert.ok(existsSync(join(site, url)), `${face.family} ${face.style}: ${url} is not in _site`);
    }
  }
});

// The site CSS is inlined in every page, so no page links main.css; check
// every built page that has a <head>.
const pages = () =>
  walk(site, ['.html']).filter((f) => readFileSync(f, 'utf8').includes('<head>'));

test('there are built pages with a <head>', () => {
  assert.ok(pages().length > 0, 'no built HTML page has a <head>: run bundle exec jekyll build');
});

test('every page with a <head> preloads the body face', () => {
  const missing = pages()
    .filter((f) => !readFileSync(f, 'utf8').includes(PRELOAD))
    .map((f) => relative(site, f));
  assert.deepEqual(missing, [], `add ${PRELOAD} to _includes/head.html`);
});

test('every page with a <head> has the site CSS inline exactly once', () => {
  const wrong = pages()
    .map((f) => [relative(site, f), (readFileSync(f, 'utf8').match(/<style id="site-css">/g) || []).length])
    .filter(([, n]) => n !== 1)
    .map(([f, n]) => `${f}: ${n} blocks`);
  assert.deepEqual(wrong, [], 'each page needs one <style id="site-css"> from _includes/head.html');
});

test("Inter's face covers weight 700", () => {
  const inter = fontFaces().filter((f) => f.family === 'Inter');
  assert.ok(inter.length > 0, 'no Inter @font-face in main.css');
  const covers = inter.some((f) => {
    const [lo, hi = lo] = f.weight.split(/\s+/).map(Number);
    return lo <= 700 && 700 <= hi;
  });
  assert.ok(covers, `Inter weights ${inter.map((f) => f.weight).join(', ')} do not include 700`);
});
