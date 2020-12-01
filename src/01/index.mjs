export function findPairWithSum(numbers, sum) {
  const set = new Set(numbers);
  for (const number of set) {
    if (set.has(sum - number)) {
      return [number, sum - number];
    }
  }
}

// https://adventofcode.com/2020/day/1
export default function main(input) {
  const entries = input
    .trim()
    .split(/\r?\n/g)
    .map((n) => parseInt(n, 10));
  const pair = findPairWithSum(entries, 2020);
  return pair[0] * pair[1];
}
