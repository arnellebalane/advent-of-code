export function countTreesEncountered(map, dx, dy) {
  const TREE = '#';
  let x = 0;
  let y = 0;
  let count = 0;

  const rows = map.trim().split(/\r?\n/g);
  let columns = rows[0].length;

  while (y + dy < rows.length) {
    x = (x + dx) % columns;
    y = y + dy;

    if (rows[y][x] === TREE) {
      count++;
    }
  }

  return count;
}

// https://adventofcode.com/2020/day/3
export default function main(input) {
  // return countTreesEncountered(input, 3, 1);

  const results = [
    countTreesEncountered(input, 1, 1),
    countTreesEncountered(input, 3, 1),
    countTreesEncountered(input, 5, 1),
    countTreesEncountered(input, 7, 1),
    countTreesEncountered(input, 1, 2),
  ];

  return results.reduce((product, number) => product * number, 1);
}
