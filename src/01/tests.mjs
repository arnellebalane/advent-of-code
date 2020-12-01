import test from 'ava';
import { findTwoWithSum, findThreeWithSum } from './index.mjs';

test('findTwoWithSum()', (t) => {
  t.deepEqual(findTwoWithSum([1721, 979, 366, 299, 675, 1456], 2020), [1721, 299]);
});

test('findThreeWithSum()', (t) => {
  t.deepEqual(findThreeWithSum([1721, 979, 366, 299, 675, 1456], 2020), [979, 366, 675]);
});
