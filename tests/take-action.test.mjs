import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const source = readFileSync(new URL('../src/pages/take-action.astro', import.meta.url), 'utf8');

test('take action hero replaces the illustration with a local advocacy photograph', () => {
  const hero = source.slice(source.indexOf('<section class="action-hero">'), source.indexOf('<section class="container action-grid"'));
  assert.ok(hero.includes("url('images/take-action-advocacy.jpg')"));
  assert.ok(existsSync(new URL('../public/images/take-action-advocacy.jpg', import.meta.url)));
  assert.match(hero, /alt="People holding environmental-action placards/);
  assert.match(hero, /width="1123" height="750"/);
  assert.ok(!hero.includes('<svg'));
  assert.ok(!source.includes('Original CleanCare illustration'));
});

test('advocacy photo is credited without implying the subjects endorse CleanCare', () => {
  assert.ok(source.includes('Pavel Danilyuk / Pexels'));
  assert.ok(source.includes('8553167/'));
  assert.ok(source.includes('no CleanCare endorsement implied'));
});

test('hero photo stays compact and preserves its aspect ratio', () => {
  assert.match(source, /\.action-visual\{width:100%;max-width:480px;min-width:0/);
  assert.match(source, /\.action-visual img\{display:block;width:100%;height:auto\}/);
  assert.match(source, /@media\(max-width:900px\)\{\.action-visual\{justify-self:start\}/);
});
