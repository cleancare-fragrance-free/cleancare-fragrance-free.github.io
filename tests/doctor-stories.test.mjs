import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { doctorStories } from '../src/data/doctor-stories.mjs';

test('expert collection includes the five requested people with accurate badge roles', () => {
  assert.deepEqual(doctorStories.map(person => person.name), [
    'Dr. Samantha Ellis', 'Dr. Michelle Wong', 'Dr. Muneeb Shah',
    'Dr. Macrene Alexiades', 'Dr. Andrea Suarez / Dr. Dray',
  ]);
  assert.equal(doctorStories.filter(person => person.doctor).length, 4);
  const chemist = doctorStories.find(person => person.name === 'Dr. Michelle Wong');
  assert.equal(chemist.doctor, false);
  assert.match(chemist.credentials, /Chemistry PhD.*not a physician/);
  assert.equal(chemist.initials, 'MW');
  assert.ok(!chemist.image, 'Do not reuse the portrait without the permission requested by its publisher');
});

test('expert profiles have primary sources, concise summaries and commercial context', () => {
  for (const person of doctorStories) {
    for (const link of [person.source, person.credentialUrl, ...person.related.map(item => item.url)]) {
      assert.equal(new URL(link).protocol, 'https:');
      assert.ok(!/amzlink|magik|utm_|affiliate/i.test(link));
    }
    assert.ok(person.text.length > 50 && person.text.length < 250);
    assert.ok(person.sourceLabel && person.publisher && person.disclosure);
    assert.equal(person.checked, '2026-10-05');
    if (person.image) {
      assert.equal(new URL(person.image).protocol, 'https:');
      assert.equal(new URL(person.imageSource).protocol, 'https:');
      assert.ok(person.credit);
    }
  }
  for (const name of ['Dr. Samantha Ellis', 'Dr. Muneeb Shah', 'Dr. Macrene Alexiades']) {
    assert.match(doctorStories.find(person => person.name === name).disclosure, /^Founder · /);
  }
});

test('doctors are a separate accessible section and only physicians receive the medical badge', () => {
  const page = readFileSync(new URL('../src/pages/celebrity-stories.astro', import.meta.url), 'utf8');
  assert.match(page, /id="doctors" aria-labelledby="doctors-heading"/);
  const experts = readFileSync(new URL('../src/pages/experts.astro', import.meta.url), 'utf8');
  assert.match(experts, /person\.doctor \? <DoctorBadge/);
  assert.match(experts, /<h2 id=\{`expert-/);
  assert.match(page, /url\('experts\/'\)/);
  assert.match(page, /href="#doctors"/);
  assert.match(page, /Brand founders have commercial interests/);
});
