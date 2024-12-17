import test from 'ava';
import { countTreesEncountered } from './index.js';

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
