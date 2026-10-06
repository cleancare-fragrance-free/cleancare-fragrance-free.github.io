import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { learningVideos } from '../src/data/learning-videos.mjs';

const page = readFileSync(new URL('../src/pages/evidence.astro', import.meta.url), 'utf8');
const icons = readFileSync(new URL('../src/components/EditorialIcon.astro', import.meta.url), 'utf8');

test('evidence categories use consistent icons while retaining readable text and anchors', () => {
  for (const name of ['heart', 'air', 'label', 'headphones']) assert.ok(page.includes(`'${name}'`) || page.includes(`name="${name}"`));
  assert.ok(page.includes('aria-label="Evidence categories"'));
  assert.ok(page.includes('href="#watch"'));
  assert.ok(page.includes('id="watch"'));
  assert.ok(page.includes('EditorialIcon name="people"'));
});

test('each video gets a linked play icon, visible format label and its original scope note', () => {
  assert.ok(page.includes('learningVideos.map(video =>'));
  assert.ok(page.includes('class="media-link"'));
  assert.ok(page.includes('class="media-play"><EditorialIcon name="play"/>'));
  assert.ok(page.includes('video.local ? url(video.href) : video.href'));
  assert.ok(page.includes('<small>{video.note}</small>'));
  for (const label of ['Physician video', 'Documentary', 'Research presentation', 'Video']) assert.ok(page.includes(`'${label}'`));
  assert.ok(page.includes("video.doctor ? 'stethoscope'"));
  assert.equal(learningVideos.filter(video => video.local).length, 2);
});

test('media icons are decorative and compact links retain focus and motion safeguards', () => {
  for (const name of ['play', 'video', 'headphones', 'film', 'microphone', 'stethoscope']) assert.ok(icons.includes(` ${name}:`));
  assert.ok(icons.includes('aria-hidden="true"'));
  assert.ok(page.includes('.media-link:focus-visible{outline:2px solid'));
  assert.ok(page.includes('@media(prefers-reduced-motion:reduce)'));
  assert.ok(page.includes('grid-template-columns:32px minmax(0,1fr)'));
});
