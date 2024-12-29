import { URL } from 'node:url';
import { readFile } from 'node:fs/promises';

class WordSearch {
    constructor(input) {
        const lines = input.trim().split('\n');
        this.rows = lines.length;
        this.cols = lines[0].length;
        this.input = lines.join('');
    }

    toCoordinates(index) {
        const row = Math.floor(index / this.cols);
        const col = index % this.cols;
        return [row, col];
    }

    toIndex(row, col) {
        return row * this.cols + col;
    }

    getInputCharAt(row, col) {
        return this.input.charAt(this.toIndex(row, col));
    }

    countOccurrences() {
        const query = 'XMAS';
        const length = query.length;
        let occurences = 0;

        for (let i = 0; i < this.input.length; i++) {
            const letter = this.input.charAt(i);
            if (letter !== 'X') continue;

            const [row, col] = this.toCoordinates(i);
            if (row >= length - 1) {
                // search top
                const word =
                    'X' +
                    this.getInputCharAt(row - 1, col) +
                    this.getInputCharAt(row - 2, col) +
                    this.getInputCharAt(row - 3, col);
                if (word === query) {
                    occurences++;
                }
            }
            if (row >= length - 1 && col >= length - 1) {
                // search top-left
                const word =
                    'X' +
                    this.getInputCharAt(row - 1, col - 1) +
                    this.getInputCharAt(row - 2, col - 2) +
                    this.getInputCharAt(row - 3, col - 3);
                if (word === query) {
                    occurences++;
                }
            }
            if (row >= length - 1 && col < this.cols - length) {
                // search top-right
                const word =
                    'X' +
                    this.getInputCharAt(row - 1, col + 1) +
                    this.getInputCharAt(row - 2, col + 2) +
                    this.getInputCharAt(row - 3, col + 3);
                if (word === query) {
                    occurences++;
                }
            }
            if (col >= length - 1) {
                // search left
                const word =
                    'X' +
                    this.getInputCharAt(row, col - 1) +
                    this.getInputCharAt(row, col - 2) +
                    this.getInputCharAt(row, col - 3);
                if (word === query) {
                    occurences++;
                }
            }
            if (col < this.cols - length) {
                // search right
                const word =
                    'X' +
                    this.getInputCharAt(row, col + 1) +
                    this.getInputCharAt(row, col + 2) +
                    this.getInputCharAt(row, col + 3);
                if (word === query) {
                    occurences++;
                }
            }
            if (row < this.rows - length) {
                // search bottom
                const word =
                    'X' +
                    this.getInputCharAt(row + 1, col) +
                    this.getInputCharAt(row + 2, col) +
                    this.getInputCharAt(row + 3, col);
                if (word === query) {
                    occurences++;
                }
            }
            if (row < this.rows - length && col >= length - 1) {
                // search bottom-left
                const word =
                    'X' +
                    this.getInputCharAt(row + 1, col - 1) +
                    this.getInputCharAt(row + 2, col - 2) +
                    this.getInputCharAt(row + 3, col - 3);
                if (word === query) {
                    occurences++;
                }
            }
            if (row < this.rows - length && col < this.cols - length) {
                // search bottom-right
                const word =
                    'X' +
                    this.getInputCharAt(row + 1, col + 1) +
                    this.getInputCharAt(row + 2, col + 2) +
                    this.getInputCharAt(row + 3, col + 3);
                if (word === query) {
                    occurences++;
                }
            }
        }

        return occurences;
    }
}

const input = await readFile(new URL('input.txt', import.meta.url), 'utf8');
const puzzle = new WordSearch(input);
const occurrences = puzzle.countOccurrences();
console.log({ occurrences });
