import test from 'ava';
import { isValidPasswordByCount, isValidPasswordByPosition } from './index.js';

test('isValidPasswordByCount()', (t) => {
    t.true(isValidPasswordByCount('1-3 a: abcde'));
    t.true(isValidPasswordByCount('2-9 c: ccccccccc'));
    t.false(isValidPasswordByCount('1-3 b: cdefg'));
});

test('isValidPasswordByPosition()', (t) => {
    t.true(isValidPasswordByPosition('1-3 a: abcde'));
    t.false(isValidPasswordByPosition('1-3 b: cdefg'));
    t.false(isValidPasswordByPosition('2-9 c: ccccccccc'));
});
