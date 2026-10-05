import test from 'node:test';
import assert from 'node:assert/strict';
import { celebrityStories } from '../src/data/celebrity-stories.mjs';

test('celebrity collection keeps Miranda and replaces the three removed stories', () => {
  assert.deepEqual(celebrityStories.map(person => person.name), [
    'Miranda Kerr', 'Pharrell Williams', 'Jessica Alba', 'Rihanna',
    'Selena Gomez', 'Michelle Pfeiffer', 'Bella Hadid', 'Kourtney Kardashian',
  ]);
});

test('each celebrity has a source, photo credit and a short contextual summary', () => {
  for (const person of celebrityStories) {
    assert.equal(new URL(person.source).protocol, 'https:');
    assert.ok(person.image && person.category && person.credit);
    assert.ok(person.text.length > 30 && person.text.length < 250);
    if (!person.local) {
      assert.equal(new URL(person.image).protocol, 'https:');
      assert.equal(new URL(person.imageSource).protocol, 'https:');
    }
  }
  for (const name of ['Michelle Pfeiffer', 'Bella Hadid']) {
    const person = celebrityStories.find(person => person.name === name);
    assert.notEqual(person.category, 'Fragrance-free options');
  }
  const licensedPhoto = celebrityStories.find(person => person.name === 'Michelle Pfeiffer');
  assert.ok(licensedPhoto.credit.includes('joyparris'));
  assert.equal(licensedPhoto.license, 'CC BY 3.0');
  assert.equal(new URL(licensedPhoto.licenseUrl).hostname, 'creativecommons.org');
});
