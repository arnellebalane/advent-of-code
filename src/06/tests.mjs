import test from 'ava';
import {
  constructOrbitTree,
  countOrbitsByObject,
  getPathToCenter,
  countTotalOrbits,
  countTransfersBetweenObjects
} from './index.mjs';

test('constructOrbitTree()', t => {
  t.deepEqual(
    constructOrbitTree(['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L']),
    { COM: null, B: 'COM', C: 'B', D: 'C', E: 'D', F: 'E', G: 'B', H: 'G', I: 'D', J: 'E', K: 'J', L: 'K' }
  );
});

test('countOrbitsByObject()', t => {
  const tree = { COM: null, B: 'COM', C: 'B', D: 'C', E: 'D', F: 'E', G: 'B', H: 'G', I: 'D', J: 'E', K: 'J', L: 'K' };
  t.is(countOrbitsByObject(tree, 'D'), 3);
  t.is(countOrbitsByObject(tree, 'L'), 7);
  t.is(countOrbitsByObject(tree, 'COM'), 0);
});

test('getPathToCenter()', t => {
  const tree = { COM: null, B: 'COM', C: 'B', D: 'C', E: 'D', F: 'E', G: 'B', H: 'G', I: 'D', J: 'E', K: 'J', L: 'K', YOU: 'K', SAN: 'I' };
  t.deepEqual(
    getPathToCenter(tree, 'YOU'),
    ['K', 'J', 'E', 'D', 'C', 'B', 'COM']
  );
  t.deepEqual(
    getPathToCenter(tree, 'SAN'),
    ['I', 'D', 'C', 'B', 'COM']
  );
});

test('countTotalOrbits()', t => {
  const input = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L'];
  t.is(countTotalOrbits(input), 42);
});

test('countTransfersBetweenObjects()', t => {
  const input = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L', 'K)YOU', 'I)SAN'];
  t.is(countTransfersBetweenObjects(input, 'YOU' ,'SAN'), 4);
});
