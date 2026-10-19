// Shared by the tests that read the built site. A _site built before the
// latest source change makes those tests check old pages, so call
// builtSite() before reading _site: if _site is missing or older than a
// source file, it adds one failing test that says to rebuild.
// Not a test file itself; run the tests with: node --test '_tests/**/*.test.mjs'
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = dirname(dirname(fileURLToPath(import.meta.url)));
export const site = join(root, '_site');

// What the build reads. Dot entries (.obsidian, .DS_Store) are not content.
const SOURCES = ['_posts', '_categories', '_layouts', '_includes', '_sass', '_data', '_config.yml', 'assets'];
// Root pages (about.md, 404.html, index.markdown, ...) are built too.
// README.md is excluded in _config.yml.
const rootPages = () =>
  readdirSync(root).filter((f) => /\.(md|markdown|html)$/.test(f) && f !== 'README.md');

// Updates best to the most recently modified file at or under path.
function newest(path, best = { file: null, mtime: -Infinity }) {
  if (!existsSync(path)) return best;
  const stat = statSync(path);
  if (stat.isDirectory()) {
    for (const name of readdirSync(path)) if (!name.startsWith('.')) newest(join(path, name), best);
  } else if (stat.mtimeMs > best.mtime) {
    best.file = path;
    best.mtime = stat.mtimeMs;
  }
  return best;
}

// Every build rewrites the pages, so the newest file in _site dates the build.
function problem() {
  if (!existsSync(site)) return '_site not found';
  const built = newest(site);
  if (!built.file) return '_site is empty';
  const source = { file: null, mtime: -Infinity };
  for (const s of [...SOURCES, ...rootPages()]) newest(join(root, s), source);
  if (source.mtime > built.mtime) return `_site is older than ${relative(root, source.file)}`;
  return null;
}

// Returns the _site path.
export function builtSite() {
  const reason = problem();
  if (reason) {
    test('_site is built from the current sources', () => {
      assert.fail(`${reason}; run bundle exec jekyll build, then the tests again`);
    });
  }
  return site;
}
