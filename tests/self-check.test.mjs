import test from 'node:test';
import assert from 'node:assert/strict';
import { questions, validAnswer, summarizeAnswers } from '../src/lib/self-check.mjs';

const baseline = () => ({ products: ['none'], symptoms: ['none'], frequency: ['never'], timing: ['na'], contexts: ['unsure'], relief: ['unsure'], impact: ['none'] });
const symptomQuestion = questions.find(question => question.id === 'symptoms');
const frequencyQuestion = questions.find(question => question.id === 'frequency');
test('no reported symptoms is not described as a safe or low sensitivity score', () => {
  const result = summarizeAnswers(baseline());
  assert.equal(result.title, 'You report no symptoms in this period');
  assert.match(result.description, /does not prove/);
  assert.equal(result.breathing, false);
  assert.equal(result.answers.length, 7);
  assert.equal('score' in result, false);
});
test('repeated symptoms and impact produce relevant guidance, never a diagnosis', () => {
  const result = summarizeAnswers({ ...baseline(), symptoms: ['breathing', 'headache'], frequency: ['often'], impact: ['significant'] });
  assert.equal(result.title, 'You report symptoms on repeated occasions');
  assert.match(result.description, /not proof/);
  assert.equal(result.breathing, true);
  assert.equal(result.impact, true);
  assert.match(result.answers.find(answer => answer.title === symptomQuestion.title).response, /Headaches or migraine episodes; Cough/);
});
test('one-off and uncertain answers keep uncertainty explicit', () => {
  assert.equal(summarizeAnswers({ ...baseline(), symptoms: ['skin'], frequency: ['once'] }).title, 'You have noticed symptoms worth recording');
  assert.equal(summarizeAnswers({ ...baseline(), symptoms: ['unsure'], frequency: ['unsure'] }).title, 'Your pattern is not clear yet');
});
test('conflicting answers do not become a reassuring or diagnostic result', () => {
  for (const changes of [{ frequency: ['often'] }, { impact: ['repeated'] }]) {
    const result = summarizeAnswers({ ...baseline(), ...changes });
    assert.equal(result.title, 'Some answers may need another look');
  }
  assert.equal(summarizeAnswers({ ...baseline(), symptoms: ['breathing'] }).breathing, true);
});
test('invalid, missing, duplicated and exclusive selections are rejected', () => {
  assert.equal(validAnswer(symptomQuestion, ['skin', 'headache']), true);
  for (const values of [[], ['none', 'skin'], ['unsure', 'skin'], ['skin', 'skin'], ['bogus']]) {
    assert.equal(validAnswer(symptomQuestion, values), false);
  }
  assert.equal(validAnswer(frequencyQuestion, ['never', 'often']), false);
  assert.throws(() => summarizeAnswers({}), /every question/);
});
test('scented-product use is reported even with no symptoms and does not change symptom result', () => {
  const result = summarizeAnswers({ ...baseline(), products: ['candles', 'incense', 'softener', 'perfume', 'fresheners'] });
  assert.equal(result.title, 'You report no symptoms in this period');
  assert.match(result.productSummary, /5 scented-product categories/);
  assert.match(result.productSummary, /not a measure of dose, toxicity, or sensitivity/);
  assert.equal(result.alternatives.length, 5);
  assert.match(result.alternatives[0], /flameless/);
});
test('uncertain and absent product use have distinct summaries without invented alternatives', () => {
  const none = summarizeAnswers(baseline());
  const unsure = summarizeAnswers({ ...baseline(), products: ['unsure'] });
  assert.match(none.productSummary, /no use/);
  assert.match(unsure.productSummary, /unsure/);
  assert.deepEqual(none.alternatives, []);
  assert.deepEqual(unsure.alternatives, []);
});
test('symptoms without a reported fragrance link are not attributed to fragrance', () => {
  const result = summarizeAnswers({ ...baseline(), symptoms: ['dizziness', 'concentration', 'headache'] });
  assert.equal(result.title, 'You report symptoms without a noticed fragrance link');
  assert.match(result.description, /does not attribute/);
});
