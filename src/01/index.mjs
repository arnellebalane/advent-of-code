export function computeFuelRequired(mass) {
  return Math.floor(mass / 3) - 2;
}

export function computeTotalFuelRequired(mass) {
  let total = 0;
  let fuel;
  while ((fuel = computeFuelRequired(mass)) > 0) {
    total += fuel;
    mass = fuel;
  }
  return total;
}



// https://adventofcode.com/2019/day/1
import input from './input.mjs';

if (process.env.NODE_ENV !== 'test') {
  const sum = input.reduce(
    (sum, input) => sum + computeTotalFuelRequired(input),
    0
  );

  console.log(sum);
}
