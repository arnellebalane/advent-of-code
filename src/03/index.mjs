export function getPathCoordinates(path) {
  let x = 0;
  let y = 0;
  const directions = {
    U: () => y++,
    D: () => y--,
    L: () => x--,
    R: () => x++
  };

  const actions = path.split(',');
  return actions.reduce((coordinates, action) => {
    const direction = action[0];
    let count = parseInt(action.slice(1), 10);

    while (count-- > 0) {
      directions[direction]();
      coordinates.push(`${x},${y}`);
    }

    return coordinates;
  }, []);
}

export function getIntersectionCoordinates(a, b) {
  return a.filter(coordinates => b.includes(coordinates));
}

export function getDistanceToCoordinate(coordinate) {
  const segments = coordinate.split(',');
  const x = parseInt(segments[0], 10);
  const y = parseInt(segments[1], 10);
  return Math.abs(x) + Math.abs(y);
}

export function getStepsToCoordinate(path, coordinate) {
  return path.indexOf(coordinate) + 1;
}

export function getNearestIntersection(a, b) {
  const intersections = getIntersectionCoordinates(
    getPathCoordinates(a),
    getPathCoordinates(b)
  );
  return intersections.reduce(
    (distance, intersection) =>
      Math.min(distance, getDistanceToCoordinate(intersection)),
    Infinity
  );
}

export function getNearestIntersectionBySteps(a, b) {
  const aPath = getPathCoordinates(a);
  const bPath = getPathCoordinates(b);
  const intersections = getIntersectionCoordinates(aPath, bPath);

  return intersections.reduce(
    (steps, intersection) => {
      const total = getStepsToCoordinate(aPath, intersection)
        + getStepsToCoordinate(bPath, intersection);
      return Math.min(steps, total);
    },
    Infinity
  );
}



// https://adventofcode.com/2019/day/3
import input from './input.mjs';

if (process.env.NODE_ENV !== 'test') {
  // const distance = getNearestIntersection(...input);
  // console.log(distance);

  const steps = getNearestIntersectionBySteps(...input);
  console.log(steps);
}
