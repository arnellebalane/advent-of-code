function parseInput(input) {
  const [policy, password] = input.split(/:\s*/);
  const [range, character] = policy.split(' ');
  let [min, max] = range.split('-');
  min = parseInt(min, 10);
  max = parseInt(max, 10);

  return { min, max, character, password };
}

export function isValidPasswordByCount(input) {
  const { min, max, character, password } = parseInput(input);

  let count = 0;
  for (const letter of password) {
    if (letter === character) {
      count++;
    }
    if (count > max) {
      return false;
    }
  }
  return count >= min && count <= max;
}

export function isValidPasswordByPosition(input) {
  const { min, max, character, password } = parseInput(input);
  const a = min - 1;
  const b = max - 1;

  return (password[a] === character || password[b] === character) && password[a] !== password[b];
}

// https://adventofcode.com/2020/day/2
export default function main(input) {
  const passwords = input.trim().split(/\r?\n/g);

  // return passwords.filter(isValidPasswordByCount).length;
  return passwords.filter(isValidPasswordByPosition).length;
}
