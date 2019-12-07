import test from 'ava';
import {
  getPathCoordinates,
  getIntersectionCoordinates,
  getDistanceToCoordinate,
  getStepsToCoordinate,
  getNearestIntersection,
  getNearestIntersectionBySteps
} from './index.mjs';

test('getPathCoordinates()', t => {
  t.deepEqual(
    getPathCoordinates('R8,U5,L5,D3'),
    [
      '1,0', '2,0', '3,0', '4,0', '5,0', '6,0', '7,0', '8,0',
      '8,1', '8,2', '8,3', '8,4', '8,5',
      '7,5', '6,5', '5,5', '4,5', '3,5',
      '3,4', '3,3', '3,2'
    ]
  );
  t.deepEqual(
    getPathCoordinates('U7,R6,D4,L4'),
    [
      '0,1', '0,2', '0,3', '0,4', '0,5', '0,6', '0,7',
      '1,7', '2,7', '3,7', '4,7', '5,7', '6,7',
      '6,6', '6,5', '6,4', '6,3',
      '5,3', '4,3', '3,3', '2,3'
    ]
  );
});

test('getIntersectionCoordinates()', t => {
  t.deepEqual(
    getIntersectionCoordinates([
      '1,0', '2,0', '3,0', '4,0', '5,0', '6,0', '7,0', '8,0',
      '8,1', '8,2', '8,3', '8,4', '8,5',
      '7,5', '6,5', '5,5', '4,5', '3,5',
      '3,4', '3,3', '3,2'
    ], [
      '0,1', '0,2', '0,3', '0,4', '0,5', '0,6', '0,7',
      '1,7', '2,7', '3,7', '4,7', '5,7', '6,7',
      '6,6', '6,5', '6,4', '6,3',
      '5,3', '4,3', '3,3', '2,3'
    ]),
    ['6,5', '3,3']
  );
});

test('getDistanceToCoordinate()', t => {
  t.is(getDistanceToCoordinate('3,3'), 6);
  t.is(getDistanceToCoordinate('-3,3'), 6);
  t.is(getDistanceToCoordinate('3,-3'), 6);
  t.is(getDistanceToCoordinate('-3,-3'), 6);
});

test('getNearestIntersection()', t => {
  t.is(
    getNearestIntersection(
      'R8,U5,L5,D3',
      'U7,R6,D4,L4'
    ),
    6
  );
  t.is(
    getNearestIntersection(
      'R75,D30,R83,U83,L12,D49,R71,U7,L72',
      'U62,R66,U55,R34,D71,R55,D58,R83'
    ),
    159
  );
  t.is(
    getNearestIntersection(
      'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
      'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
    ),
    135
  );
});

test('getStepsToCoordinate()', t => {
  t.is(
    getStepsToCoordinate(
      ['1,0', '2,0', '3,0', '4,0', '5,0', '6,0', '7,0', '8,0'],
      '5,0'
    ),
    5
  );
});

test('getNearestIntersectionBySteps()', t => {
  t.is(
    getNearestIntersectionBySteps(
      'R75,D30,R83,U83,L12,D49,R71,U7,L72',
      'U62,R66,U55,R34,D71,R55,D58,R83'
    ),
    610
  );
  t.is(
    getNearestIntersectionBySteps(
      'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
      'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
    ),
    410
  );
});
