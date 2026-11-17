import test from 'node:test';
import assert from 'node:assert/strict';
import { filterStudentsByQuery, validateStrategyPayload } from './pedagogicalLogic';
import { INITIAL_STUDENTS, SAMPLE_STRATEGY_GENERATED } from '../data/mockData';

test('filterStudentsByQuery matches by student name or code', () => {
  const resultName = filterStudentsByQuery(INITIAL_STUDENTS, 'Samuel');
  assert.equal(resultName.length, 1);
  assert.equal(resultName[0].studentName, 'Samuel Calderón');

  const resultCode = filterStudentsByQuery(INITIAL_STUDENTS, 'E-302');
  assert.equal(resultCode.length, 1);
  assert.equal(resultCode[0].studentName, 'Valentina Ríos');
});

test('filterStudentsByQuery filters by grade', () => {
  const thirdGrade = filterStudentsByQuery(INITIAL_STUDENTS, '', '3.° Primaria');
  assert.ok(thirdGrade.length >= 3);
  assert.ok(thirdGrade.every(s => s.grade === '3.° Primaria'));
});

test('validateStrategyPayload verifies 3 contrasting strategies and complete structure', () => {
  assert.equal(validateStrategyPayload(SAMPLE_STRATEGY_GENERATED), true);
  assert.equal(validateStrategyPayload({}), false);
  assert.equal(validateStrategyPayload(null), false);
});
