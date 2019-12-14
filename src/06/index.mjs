export function constructOrbitTree(input) {
  return input.reduce((tree, orbit) => {
    const [a, b] = orbit.split(')');
    tree[b] = a;
    return tree;
  }, { COM: null });
}

export function countOrbitsByObject(tree, object) {
  let count = 0;
  while ((object = tree[object]) !== null) {
    count++;
  }
  return count;
}

export function getPathToCenter(tree, object) {
  const path = [];
  while ((object = tree[object]) !== null) {
    path.push(object);
  }
  return path;
}

export function countTotalOrbits(input) {
  const tree = constructOrbitTree(input);
  const objects = Object.keys(tree);
  return objects.reduce(
    (total, object) => total + countOrbitsByObject(tree, object),
    0
  );
}

export function countTransfersBetweenObjects(input, a, b) {
  const tree = constructOrbitTree(input);
  const aPath = getPathToCenter(tree, a);
  const bPath = getPathToCenter(tree, b);

  let i = 1;
  while (aPath[aPath.length - i] === bPath[bPath.length - i]) {
    i++;
  }
  return (aPath.length - i + 1) + (bPath.length - i + 1);
}



// https://adventofcode.com/2019/day/6
import input from './input.mjs';

if (process.env.NODE_ENV !== 'test') {
  // const result = countTotalOrbits(input);
  const result = countTransfersBetweenObjects(input, 'YOU', 'SAN');
  console.log(result);
}
