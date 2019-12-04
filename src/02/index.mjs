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
