import test from 'ava';
import {
  neverDecreases,
  hasSameAdjacentDigits,
  hasExactlyTwoSameAdjacentDigits,
  getNumberDigits,
  countMatchingPasswords
} from './index.mjs';

test('neverDecreases()', t => {
  t.true(neverDecreases([1, 1, 1, 1, 1, 1]));
  t.true(neverDecreases([1, 1, 1, 1, 2, 3]));
  t.true(neverDecreases([1, 3, 5, 6, 7, 9]));
  t.true(neverDecreases([1, 2, 3, 4, 5, 6]));
  t.false(neverDecreases([1, 1, 1, 1, 1, 0]));
  t.false(neverDecreases([2, 2, 3, 4, 5, 0]));
});

test('hasSameAdjacentDigits()', t => {
  t.true(hasSameAdjacentDigits([1, 1, 1, 1, 1, 1]));
  t.true(hasSameAdjacentDigits([1, 2, 2, 3, 4, 5]));
  t.true(hasSameAdjacentDigits([1, 1, 1, 1, 2, 3]));
  t.true(hasSameAdjacentDigits([2, 2, 3, 4, 5, 0]));
  t.false(hasSameAdjacentDigits([1, 2, 3, 7, 8, 9]));
  t.false(hasSameAdjacentDigits([1, 2, 1, 2, 1, 2]));
});

test('hasExactlyTwoSameAdjacentDigits()', t => {
  t.true(hasExactlyTwoSameAdjacentDigits([1, 1, 2, 2, 3, 3]));
  t.true(hasExactlyTwoSameAdjacentDigits([1, 1, 1, 1, 2, 2]));
  t.false(hasExactlyTwoSameAdjacentDigits([1, 2, 3, 4, 4, 4]));
});

test('getNumberDigits()', t => {
  t.deepEqual(getNumberDigits(111111), [1, 1, 1, 1, 1, 1]);
  t.deepEqual(getNumberDigits(223450), [2, 2, 3, 4, 5, 0]);
});

test('countMatchingPasswords()', t => {
  t.is(countMatchingPasswords(111111, 111130), 1);
});
