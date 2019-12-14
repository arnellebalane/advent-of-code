export function evaluateProgram(program, getInput=() => 0) {
  let i = 0;
  let input = 0;

  while (i < program.length) {
    const instruction = program[i];
    const opcode = instruction % 100;

    const opcodeHandlers = {
      1: opcode1,
      2: opcode2,
      3: opcode3,
      4: opcode4,
      5: opcode5,
      6: opcode6,
      7: opcode7,
      8: opcode8
    };

    if (opcode === 99) {
      break;
    } else if (opcode === 3) {
      input = getInput();
    }

    [i, program] = opcodeHandlers[opcode](i, program, input);
  }

  return program;
}

function extractParameters(ptr, program) {
  const instruction = program[ptr];
  const aType = Math.floor(instruction % 1000 / 100);
  const bType = Math.floor(instruction % 10000 / 1000);
  const a = aType === 0 ? program[program[ptr + 1]] : program[ptr + 1];
  const b = bType === 0 ? program[program[ptr + 2]] : program[ptr + 2];
  const output = program[ptr + 3];
  return [a, b, output];
}

// Opcode 1: Addition
function opcode1(ptr, program) {
  const [a, b, output] = extractParameters(ptr, program);
  program[output] = a + b;
  return [ptr + 4, program];
}

// Opcode 2: Multiplication
function opcode2(ptr, program) {
  const [a, b, output] = extractParameters(ptr, program);
  program[output] = a * b;
  return [ptr + 4, program];
}

// Opcode 3: Read Input
function opcode3(ptr, program, input) {
  const output = program[ptr + 1];
  program[output] = input;
  return [ptr + 2, program];
}

// Opcode 4: Write Output
function opcode4(ptr, program) {
  const address = program[ptr + 1];
  program[0] = program[address];
  return [ptr + 2, program];
}

// Opcode 5: Jump If True
function opcode5(ptr, program) {
  const [a, b] = extractParameters(ptr, program);
  return [a === 0 ? ptr + 3 : b, program];
}

// Opcode 6: Jump If False
function opcode6(ptr, program) {
  const [a, b] = extractParameters(ptr, program);
  return [a === 0 ? b : ptr + 3, program];
}

// Opcode 7: Less Than
function opcode7(ptr, program) {
  const [a, b, output] = extractParameters(ptr, program);
  program[output] = a < b ? 1 : 0;
  return [ptr + 4, program];
}

// Opcode 8: Equals
function opcode8(ptr, program) {
  const [a, b, output] = extractParameters(ptr, program);
  program[output] = a === b ? 1 : 0;
  return [ptr + 4, program];
}



// https://adventofcode.com/2019/day/5
import program from './input.mjs';

if (process.env.NODE_ENV !== 'test') {
  const output = evaluateProgram(program, () => 5);
  console.log(output[0]);
}
