import test from 'ava';
import { findPairWithSum } from './index.mjs';

test('findPairWithSum()', (t) => {
  t.deepEqual(findPairWithSum([1721, 979, 366, 299, 675, 1456], 2020), [1721, 299]);
});
