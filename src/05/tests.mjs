import test from 'ava';
import { evaluateProgram, DEFAULT_INPUT } from './index.mjs';

test('evaluateProgram()', t => {
  t.deepEqual(
    evaluateProgram([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]),
    [3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]
  );
  t.deepEqual(
    evaluateProgram([1, 0, 0, 0, 99]),
    [2, 0, 0, 0, 99]
  );
  t.deepEqual(
    evaluateProgram([2, 3, 0, 3, 99]),
    [2, 3, 0, 6, 99]
  );
  t.deepEqual(
    evaluateProgram([2, 4, 4, 5, 99, 0]),
    [2, 4, 4, 5, 99, 9801]
  );
  t.deepEqual(
    evaluateProgram([1, 1, 1, 4, 99, 5, 6, 0, 99]),
    [30, 1, 1, 4, 2, 5, 6, 0, 99]
  );
  t.deepEqual(
    evaluateProgram([1002, 4, 3, 4, 33]),
    [1002, 4, 3, 4, 99]
  );
  t.deepEqual(
    evaluateProgram([3, 0, 99]),
    [DEFAULT_INPUT, 0, 99]
  );
  t.deepEqual(
    evaluateProgram([4, 2, 99]),
    [99, 2, 99]
  );
  t.deepEqual(
    evaluateProgram([3, 5, 4, 5, 99, 1]),
    [DEFAULT_INPUT, 5, 4, 5, 99, DEFAULT_INPUT]
  );
});

test('evaluateProgram() opcode 5', t => {
  t.deepEqual(
    evaluateProgram([5, 0, 4, 1, 7, 5, 0, 99]),
    [5, 0, 4, 1, 7, 5, 0, 99]
  );
  t.deepEqual(
    evaluateProgram([5, 6, 4, 1, 7, 5, 0, 99]),
    [104, 6, 4, 1, 7, 5, 0, 99]
  );
  t.deepEqual(
    evaluateProgram([1005, 0, 3, 1, 7, 5, 0, 99]),
    [104, 0, 3, 1, 7, 5, 0, 99]
  );
});

test('evaluateProgram() opcode 6', t => {
  t.deepEqual(
    evaluateProgram([6, 0, 4, 1, 7, 5, 0, 99]),
    [104, 0, 4, 1, 7, 5, 0, 99]
  );
  t.deepEqual(
    evaluateProgram([6, 6, 4, 1, 7, 5, 0, 99]),
    [6, 6, 4, 1, 7, 5, 0, 99]
  );
  t.deepEqual(
    evaluateProgram([106, 0, 4, 1, 7, 5, 0, 99]),
    [106, 0, 4, 1, 7, 5, 0, 99]
  );
});

test('evaluateProgram() opcode 7', t => {
  t.deepEqual(
    evaluateProgram([7, 0, 1, 2, 99]),
    [7, 0, 0, 2, 99]
  );
  t.deepEqual(
    evaluateProgram([7, 1, 0, 2, 99]),
    [7, 1, 1, 2, 99]
  );
  t.deepEqual(
    evaluateProgram([1007, 1, 0, 2, 99]),
    [1007, 1, 0, 2, 99]
  );
});

test('evaluateProgram() opcode 8', t => {
  t.deepEqual(
    evaluateProgram([8, 0, 1, 2, 99]),
    [8, 0, 0, 2, 99]
  );
  t.deepEqual(
    evaluateProgram([8, 1, 1, 2, 99]),
    [8, 1, 1, 2, 99]
  );
  t.deepEqual(
    evaluateProgram([1008, 1, 1, 2, 99]),
    [1008, 1, 1, 2, 99]
  );
});
