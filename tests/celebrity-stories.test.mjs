import test from 'node:test';
import assert from 'node:assert/strict';
import { celebrityStories } from '../src/data/celebrity-stories.mjs';
import { readFileSync } from 'node:fs';

test('celebrity collection keeps Miranda and replaces the three removed stories', () => {
  assert.deepEqual(celebrityStories.map(person => person.name), [
    'Eva Longoria', 'Miranda Kerr', 'Pharrell Williams', 'Jessica Alba', 'Rihanna',
    'Hailey Bieber', 'Alicia Keys', 'Selena Gomez', 'Michelle Pfeiffer', 'Kourtney Kardashian', 'Michelle Obama',
  ]);
});

test('celebrity stories live under Why fragrance free without breaking the existing address', () => {
  const source = path => readFileSync(new URL(path, import.meta.url), 'utf8');
  const navigation = source('../src/layouts/Layout.astro');
  const why = navigation.match(/<details><summary>Why fragrance free<\/summary>(.*?)<\/details>/s)[1];
  const read = navigation.match(/<details><summary>Read & watch<\/summary>(.*?)<\/details>/s)[1];
  assert.ok(why.includes("url('celebrity-stories/')"));
  assert.ok(!read.includes("url('celebrity-stories/')"));
  const page = source('../src/pages/celebrity-stories.astro');
  assert.ok(page.includes('<h1>You are not alone.'));
  assert.ok(page.includes('breadcrumbs={breadcrumbs}'));
  assert.ok(source('../src/pages/why-fragrance-free.astro').includes("url('celebrity-stories/')"));
});

test('new stories distinguish sensitivity, product options and broader indoor-air context', () => {
  const text = name => celebrityStories.find(person => person.name === name).text;
  assert.match(text('Eva Longoria'), /sneezing/);
  assert.doesNotMatch(text('Eva Longoria'), /severe headaches|hypoallergenic/);
  assert.match(text('Hailey Bieber'), /mostly fragrance-free/);
  assert.match(text('Alicia Keys'), /not entirely fragrance-free/);
  assert.match(text('Michelle Obama'), /not evidence of a fragrance-specific campaign/);
  assert.ok(!celebrityStories.some(person => ['Beyoncé', 'Cindy Crawford'].includes(person.name)));
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
  assert.ok(celebrityStories.every(person => person.category !== 'Scented alternatives'));
  const transparencyStory = celebrityStories.find(person => person.name === 'Michelle Pfeiffer');
  assert.notEqual(transparencyStory.category, 'Fragrance-free options');
  assert.equal(new URL(transparencyStory.source).hostname, 'www.earwolf.com');
  const licensedPhoto = celebrityStories.find(person => person.name === 'Michelle Pfeiffer');
  assert.ok(licensedPhoto.credit.includes('joyparris'));
  assert.equal(licensedPhoto.license, 'CC BY 3.0');
  assert.equal(new URL(licensedPhoto.licenseUrl).hostname, 'creativecommons.org');
});
