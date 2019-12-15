import test from 'ava';
import {
  generatePermutations,
  computeSignalToThrusters,
  findHighestSignalToThrusters
} from './index.mjs';

test('generatePermutations()', t => {
  t.deepEqual(
    generatePermutations([1, 2, 3]),
    [[1, 2, 3], [2, 1, 3], [3, 1, 2], [1, 3, 2], [2, 3, 1], [3, 2, 1]]
  );
});

test('computeSignalToThrusters()', t => {
  // f(a, b) => a * 2 + b
  const program = [3, 0, 3, 2, 1002, 0, 2, 4, 1, 4, 2, 8, 4, 8, 99];
  t.is(computeSignalToThrusters(program, [0, 1, 2, 3, 4]), 20);
  t.is(computeSignalToThrusters(program, [3, 1, 0, 4, 2]), 20);
});

test('findHighestSignalToThrusters()', t => {
  t.is(findHighestSignalToThrusters([3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0]), 43210);
  t.is(findHighestSignalToThrusters([3, 23, 3, 24, 1002, 24, 10, 24, 1002, 23, -1, 23, 101, 5, 23, 23, 1, 24, 23, 23, 4, 23, 99, 0, 0]), 54321);
  t.is(findHighestSignalToThrusters([3, 31, 3, 32, 1002, 32, 10, 32, 1001, 31, -2, 31, 1007, 31, 0, 33, 1002, 33, 7, 33, 1, 33, 31, 31, 1, 32, 31, 31, 4, 31, 99, 0, 0, 0]), 65210);
});
