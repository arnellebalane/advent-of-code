// https://adventofcode.com/2019/day/2

import { evaluateProgram } from './index.mjs';

const program = [
  1, 0, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 13, 1, 19, 1, 19, 10, 23,
  2, 10, 23, 27, 1, 27, 6, 31, 1, 13, 31, 35, 1, 13, 35, 39, 1, 39, 10, 43, 2,
  43, 13, 47, 1, 47, 9, 51, 2, 51, 13, 55, 1, 5, 55, 59, 2, 59, 9, 63, 1, 13,
  63, 67, 2, 13, 67, 71, 1, 71, 5, 75, 2, 75, 13, 79, 1, 79, 6, 83, 1, 83, 5,
  87, 2, 87, 6, 91, 1, 5, 91, 95, 1, 95, 13, 99, 2, 99, 6, 103, 1, 5, 103, 107,
  1, 107, 9, 111, 2, 6, 111, 115, 1, 5, 115, 119, 1, 119, 2, 123, 1, 6, 123, 0,
  99, 2, 14, 0, 0
];

// Restore the gravity assist program to the "1202 program alarm", replacing
// position 1 with the value 12 and replace position 2 with the value 2.
// program[1] = 12;
// program[2] = 2;

// const output = evaluateProgram(program);
// console.log(output[0]);

const minNoun = 0;
const maxNoun = 99;
const minVerb = 0;
const maxVerb = 99;
const targetOutput = 19690720;

for (let noun = minNoun; noun <= maxNoun; noun++) {
  for (let verb = minVerb; verb <= maxVerb; verb++) {
    const memory = [...program];
    memory[1] = noun;
    memory[2] = verb;

    const a = memory[2];
    const output = evaluateProgram(memory);
    if (output[0] === targetOutput) {
      console.log(100 * noun + verb);
    }
  }
}
