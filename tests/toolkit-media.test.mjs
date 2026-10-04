import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { learningVideos } from '../src/data/learning-videos.mjs';

test('starter toolkit covers the replacement sequence and keeps progress private', () => {
  const source = readFileSync(new URL('../src/pages/guides/fragrance-free-starter-toolkit.astro', import.meta.url), 'utf8');
  for (const phrase of ['Stop adding scent to the air','Reset the laundry routine','Simplify household cleaning','Replace leave-on skincare','Change hair products','Check bags and shared spaces']) assert.ok(source.includes(phrase));
  assert.ok(source.includes('localStorage'));
  assert.ok(source.includes("params.set('country'"));
  assert.ok(!source.includes('fetch('));
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
