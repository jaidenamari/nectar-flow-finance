// Tests the 2025 estimated tax calculator's safe-harbor logic.
// Runs the page's own <script> from the built _site file against a stub
// document. Build the site first: bundle exec jekyll build
// Run: node --test '_tests/**/*.test.mjs'
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { builtSite } from './built-site.mjs';

const siteDir = builtSite();
const PAGE = 'estimated-tax-calculator.html';

function findPage(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const found = findPage(full);
      if (found) return found;
    } else if (entry.name === PAGE) {
      return full;
    }
  }
  return null;
}

function loadCalculatorScript() {
  assert.ok(fs.existsSync(siteDir), `${siteDir} not found; run bundle exec jekyll build first`);
  const pagePath = findPage(siteDir);
  assert.ok(pagePath, `${PAGE} not found under ${siteDir}`);
  const html = fs.readFileSync(pagePath, 'utf8');
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const script = scripts.find((s) => s.includes('estimatedTaxForm'));
  assert.ok(script, 'calculator <script> not found in built page');
  return script;
}

const SCRIPT = loadCalculatorScript();

function makeElement() {
  const listeners = {};
  const classes = new Set();
  return {
    value: '',
    textContent: '',
    innerHTML: '',
    style: {},
    classList: {
      add: (c) => classes.add(c),
      remove: (c) => classes.delete(c),
      contains: (c) => classes.has(c),
    },
    addEventListener: (type, fn) => {
      (listeners[type] ||= []).push(fn);
    },
    dispatch(type, event) {
      for (const fn of listeners[type] || []) fn.call(this, event);
    },
    scrollIntoView: () => {},
  };
}

// Selects default to their first option, as in a browser.
const SELECT_DEFAULTS = { age: 'under65', spouseAge: 'under65', deductionType: 'standard' };

function runCalculator(inputs) {
  const elements = new Map();
  const docListeners = {};
  const document = {
    getElementById(id) {
      if (!elements.has(id)) {
        const el = makeElement();
        if (id in SELECT_DEFAULTS) el.value = SELECT_DEFAULTS[id];
        elements.set(id, el);
      }
      return elements.get(id);
    },
    addEventListener: (type, fn) => {
      (docListeners[type] ||= []).push(fn);
    },
  };

  vm.runInNewContext(SCRIPT, { document });
  for (const fn of docListeners.DOMContentLoaded || []) fn();

  for (const [id, value] of Object.entries(inputs)) {
    document.getElementById(id).value = value;
  }
  let prevented = false;
  document.getElementById('estimatedTaxForm').dispatch('submit', {
    preventDefault: () => {
      prevented = true;
    },
  });
  assert.ok(prevented, 'submit handler did not run');

  const text = (id) => document.getElementById(id).textContent;
  const dollars = (id) => {
    const t = text(id);
    assert.match(t, /^\$\d+$/, `${id} should be a whole-dollar amount, got ${t}`);
    return Number(t.slice(1));
  };
  return {
    annualTax: dollars('annualTax'),
    safeHarbor: dollars('safeHarborAmount'),
    quarterly: dollars('quarterlyAmount'),
    quarterlyNote: text('quarterlyNote'),
    safeHarborNote: text('safeHarborNote'),
    recommendations: document.getElementById('recommendationsText').innerHTML,
  };
}

// Single filer, self-employed, no withholding: tax well over $1,000.
const BASE = {
  filingStatus: 'single',
  wages: '',
  selfEmploymentIncome: '80000',
  otherIncome: '',
  businessExpenses: '',
  itemizedDeductions: '',
  iraContributions: '',
  childTaxCredit: '',
  otherCredits: '',
  withheld: '',
  priorYearAGI: '',
};

const NO_PAYMENTS = 'No estimated payments required!';

// The page rounds each figure on its own, and the annual tax it shows is
// already rounded, so a figure derived from it can be $1 off.
function assertNear(actual, expected, msg) {
  assert.ok(Math.abs(actual - expected) <= 1, `${msg || 'amount'}: expected ~${expected}, got ${actual}`);
}

for (const blank of ['', '   ']) {
  test(`blank prior-year tax (${JSON.stringify(blank)}) falls back to 90% of 2025 tax`, () => {
    const r = runCalculator({ ...BASE, priorYearTax: blank });
    assert.ok(r.annualTax >= 1000, `fixture should give tax >= $1,000, got ${r.annualTax}`);
    assertNear(r.safeHarbor, 0.9 * r.annualTax, 'safe harbor');
    assert.notEqual(r.quarterlyNote, NO_PAYMENTS);
    assert.ok(r.quarterly > 0);
    assert.equal(r.safeHarborNote, 'Based on 90% of 2025 tax (2024 tax not entered)');
  });
}

test('prior-year tax of 0 still means no estimated payments required', () => {
  const r = runCalculator({ ...BASE, priorYearTax: '0' });
  assert.ok(r.annualTax >= 1000);
  assert.equal(r.safeHarbor, 0);
  assert.equal(r.quarterlyNote, NO_PAYMENTS);
  assert.equal(r.safeHarborNote, 'Based on 2024 tax (safe harbor)');
});

test('prior-year tax lower than 90% of current uses the prior-year amount', () => {
  const probe = runCalculator({ ...BASE, priorYearTax: '' });
  const prior = Math.floor(probe.annualTax / 2);
  const r = runCalculator({ ...BASE, priorYearTax: String(prior) });
  assert.ok(prior < 0.9 * r.annualTax);
  assert.equal(r.safeHarbor, prior);
  assert.equal(r.safeHarborNote, 'Based on 2024 tax (safe harbor)');
  assert.notEqual(r.quarterlyNote, NO_PAYMENTS);
});

test('prior-year tax lower than 90% of current uses 110% when 2024 AGI > 150,000', () => {
  const probe = runCalculator({ ...BASE, priorYearTax: '' });
  const prior = Math.floor(probe.annualTax / 2);
  const r = runCalculator({ ...BASE, priorYearTax: String(prior), priorYearAGI: '150001' });
  assert.ok(prior * 1.1 < 0.9 * r.annualTax);
  assertNear(r.safeHarbor, prior * 1.1, 'safe harbor');
  assert.equal(r.safeHarborNote, 'Based on 2024 tax (safe harbor)');
  assert.match(r.recommendations, /110%/);
});

test('blank prior-year tax with 2024 AGI over 150,000 shows no 110% alert', () => {
  const r = runCalculator({ ...BASE, priorYearTax: '', priorYearAGI: '200000' });
  assert.notEqual(r.quarterlyNote, NO_PAYMENTS, 'fixture should reach the recommendations branch');
  assertNear(r.safeHarbor, 0.9 * r.annualTax, 'safe harbor');
  assert.doesNotMatch(r.recommendations, /110%/);
});

test('prior-year tax higher than 90% of current uses 90% of current', () => {
  const probe = runCalculator({ ...BASE, priorYearTax: '' });
  const prior = probe.annualTax * 2;
  const r = runCalculator({ ...BASE, priorYearTax: String(prior) });
  assertNear(r.safeHarbor, 0.9 * r.annualTax, 'safe harbor');
  assert.equal(r.safeHarborNote, 'Based on 90% of 2025 tax');
  assert.notEqual(r.quarterlyNote, NO_PAYMENTS);
});
