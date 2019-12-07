export function evaluateProgram(program) {
  for (let i = 0; i < program.length; i += 4) {
    const opcode = program[i];
    const noun = program[program[i + 1]];
    const verb = program[program[i + 2]];
    const output = program[i + 3];

    if (opcode === 99) {
      break;
    } else if (opcode === 1) {
      program[output] = noun + verb;
    } else if (opcode === 2) {
      program[output] = noun * verb;
    } else {
      throw new ValueError(`Invalid opcode: ${opcode}`);
    }
  }
  return program;
}


// https://adventofcode.com/2019/day/2
import program from './input.mjs';

if (process.env.NODE_ENV !== 'test') {
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

}
