import test from 'ava';
import { countTreesEncountered } from './index.mjs';

test('countTreesEncountered()', (t) => {
  const map = `
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`;
  t.is(countTreesEncountered(map, 3, 1), 7);
});
