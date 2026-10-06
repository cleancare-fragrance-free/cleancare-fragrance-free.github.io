import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const source = readFileSync(new URL('../src/pages/about-us.astro', import.meta.url), 'utf8');

test('about page presents lived experience without turning it into universal proof', () => {
  for (const phrase of ['became sensitive to synthetic fragrances', 'similar sensitivity within my family', 'noticed a clear improvement', 'does not prove that fragrance caused every symptom', 'not a universal diagnosis']) {
    assert.ok(source.includes(phrase), phrase);
  }
});

test('about page connects the story to evidence, solutions and advocacy', () => {
  for (const phrase of ['Follow the documentation', 'Make change practical', 'Advocate for shared air', 'fragrance-free-starter-toolkit', 'Follow the sources']) {
    assert.ok(source.includes(phrase), phrase);
  }
});

test('about page invites readers into the Facebook community without treating posts as evidence', () => {
  const page = source;
  assert.match(page, /facebook\.com\/groups\/391954731491131/);
  assert.match(page, /Join the Facebook group/);
  assert.match(page, /Visit our Facebook page/);
  assert.match(page, /not automatically evidence/);
  assert.match(page, /Facebook may require sign-in/);
});

test('Facebook community sits beside the personal story, before the mission section', () => {
  const storyStart = source.indexOf('<section class="container story-section">');
  const communityStart = source.indexOf('<section class="community-section"');
  const missionStart = source.indexOf('<section class="mission-band">');
  assert.ok(storyStart < communityStart && communityStart < missionStart);
  assert.equal(source.match(/class="community-section"/g)?.length, 1);
  assert.ok(source.includes('aria-labelledby="facebook-community-title"'));
  assert.match(source, /grid-template-columns:minmax\(0,1\.4fr\) minmax\(300px,1fr\)/);
  assert.match(source, /@media\(max-width:760px\)\{\.story-section\{grid-template-columns:1fr/);
});

test('community uses a locally stored Facebook logo rather than a styled letter', () => {
  assert.ok(source.includes("url('images/social/facebook.png')"));
  assert.ok(existsSync(new URL('../public/images/social/facebook.png', import.meta.url)));
  assert.ok(!source.includes('<span>f</span>'));
  assert.match(source, /community-mark" aria-hidden="true"><img[^>]+alt=""/);
});

test('about page presents the walk-the-path reflection with accurate attribution context', () => {
  assert.ok(source.includes("url('images/about-walk-the-path.png')"));
  assert.ok(existsSync(new URL('../public/images/about-walk-the-path.png', import.meta.url)));
  assert.match(source, /alt="A wooden path winding through coastal grass toward a sunrise"/);
  assert.ok(source.includes('A Buddhist-inspired reflection'));
  assert.ok(source.includes('No one saves us but ourselves'));
  assert.ok(source.includes('later rendering inspired by <em>Dhammapada</em> 165'));
  assert.match(source, /\.path-reflection\{position:relative;isolation:isolate;overflow:hidden/);
  assert.match(source, /@media\(max-width:620px\).*\.path-reflection\{min-height:365px\}/);
});

test('about page makes an evidence-led shared-air advocacy case without overstating health risk', () => {
  for (const phrase of ['difficult to work, study, travel, seek care', 'Fragrance sensitivity is reported in population surveys', 'not a single, consistently diagnosed condition', 'This is also for people who do not identify as sensitive', 'meaningful ingredient disclosure, responsible policy, and public participation']) {
    assert.ok(source.includes(phrase), phrase);
  }
  assert.ok(source.includes('do not claim that every synthetic fragrance has the same hazard or risk as a pesticide'));
  assert.match(source, /pubmed\.ncbi\.nlm\.nih\.gov\/19326669/);
  assert.match(source, /fda\.gov\/cosmetics\/cosmetic-ingredients\/fragrances-cosmetics/);
});
