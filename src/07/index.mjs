import { evaluateProgram } from '../05/index.mjs';

// https://en.wikipedia.org/wiki/Heap%27s_algorithm
export function generatePermutations(inputs) {
  const permutations = [];
  const swap = (i, j) => {
    const t = inputs[i];
    inputs[i] = inputs[j];
    inputs[j] = t;
  };

  const recurse = size => {
    if (size === 1) {
      return permutations.push([...inputs]);
    }
    for (let i = 0; i < size; i++) {
      recurse(size - 1);
      swap(size - 1, size % 2 ? 0 : i);
    }
  };
  recurse(inputs.length);

  return permutations;
}

export function computeSignalToThrusters(program, settings) {
  let signal = 0;
  for (let amplifier = 0; amplifier < settings.length; amplifier++) {
    const programCopy = [...program];
    const inputs = [settings[amplifier], signal];
    let inputIndex = 0;

    evaluateProgram(programCopy, () => inputs[inputIndex++]);
    signal = programCopy[0];
  }
  return signal;
}

export function findHighestSignalToThrusters(program) {
  const permutations = generatePermutations([0, 1, 2, 3, 4]);
  return permutations.reduce((highestSignal, settings) => {
    const signal = computeSignalToThrusters(program, settings);
    return Math.max(highestSignal, signal);
  }, 0);
}



// https://adventofcode.com/2019/day/7
import input from './input.mjs';

if (process.env.NODE_ENV !== 'test') {
  const result = findHighestSignalToThrusters(input);
  console.log(result);
}
