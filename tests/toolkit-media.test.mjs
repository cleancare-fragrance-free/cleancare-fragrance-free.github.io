import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { learningVideos } from '../src/data/learning-videos.mjs';

test('starter toolkit covers the replacement sequence and keeps progress private', () => {
  const source = readFileSync(new URL('../src/pages/guides/fragrance-free-starter-toolkit.astro', import.meta.url), 'utf8');
  for (const phrase of ['Stop adding scent to the air','Reset the laundry routine','Simplify household cleaning','Replace leave-on skincare','Change hair products','Check bags and shared spaces']) assert.ok(source.includes(phrase));
  assert.ok(source.includes('localStorage'));
  assert.ok(source.includes("params.set('country'"));
  assert.match(source, /import PrivateHealthCheck from .*PrivateHealthCheck\.astro/);
  assert.match(source, /<PrivateHealthCheck\/>/);
  assert.match(source, /id="quick-checklist"/);
  assert.ok(!source.includes('fetch('));
});

test('private health check is embedded in the toolkit and legacy URL uses the same quiz component', () => {
  const toolkit = readFileSync(new URL('../src/pages/guides/fragrance-free-starter-toolkit.astro', import.meta.url), 'utf8');
  const legacy = readFileSync(new URL('../src/pages/self-check.astro', import.meta.url), 'utf8');
  const menu = readFileSync(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
  const home = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
  assert.match(toolkit, /<PrivateHealthCheck\/>/);
  assert.match(legacy, /<PrivateHealthCheck standalone=\{true\}\s*\/>/);
  assert.match(menu, /guides\/fragrance-free-starter-toolkit\/\#private-health-check/);
  assert.match(home, /guides\/fragrance-free-starter-toolkit\/\#private-health-check/);
});

test('learning videos use unique YouTube sources and include scope notes', () => {
  assert.ok(learningVideos.length >= 12);
  assert.equal(new Set(learningVideos.map(video => video.youtubeId)).size, learningVideos.length);
  for (const video of learningVideos) {
    assert.match(video.youtubeId, /^[\w-]{11}$/);
    assert.ok(video.title && video.source && video.note);
    if (!video.local) assert.equal(new URL(video.href).hostname, 'www.youtube.com');
  }
});
