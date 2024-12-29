const search = new URLSearchParams(location.search);
const shouldAnimate = search.has('animate');

const $puzzle = document.querySelector('.aoc-puzzle');
const $occurrences = document.querySelector('.aoc-occurrences');
const $letterTemplate = document.querySelector('template#letter');

class WordSearch {
    constructor(input) {
        const lines = input.trim().split('\n');
        this.rows = lines.length;
        this.cols = lines[0].length;
        this.input = lines.join('');

        $puzzle.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
        $puzzle.style.gridTemplateRows = `repeat(${this.rows}, 1fr)`;
        for (let i = 0; i < this.input.length; i++) {
            const $letter = $letterTemplate.content.cloneNode(true);
            $letter.querySelector('.aoc-letter').textContent = this.input.charAt(i);
            $puzzle.appendChild($letter);
        }
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

    highlightCharAt(row, col, colorClass) {
        const index = this.toIndex(row, col);
        const $letter = $puzzle.querySelector(`.aoc-letter:nth-child(${index + 1})`);
        $letter.classList.add(colorClass);
    }

    async countOccurrences() {
        const query = 'XMAS';
        const length = query.length;
        let occurrences = 0;

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
                    occurrences++;
                    this.highlightCharAt(row, col, 'bg-pink-300');
                    this.highlightCharAt(row - 1, col, 'bg-pink-300');
                    this.highlightCharAt(row - 2, col, 'bg-pink-300');
                    this.highlightCharAt(row - 3, col, 'bg-pink-300');
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
                    occurrences++;
                    this.highlightCharAt(row, col, 'bg-fuchsia-300');
                    this.highlightCharAt(row - 1, col - 1, 'bg-fuchsia-300');
                    this.highlightCharAt(row - 2, col - 2, 'bg-fuchsia-300');
                    this.highlightCharAt(row - 3, col - 3, 'bg-fuchsia-300');
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
                    occurrences++;
                    this.highlightCharAt(row, col, 'bg-violet-300');
                    this.highlightCharAt(row - 1, col + 1, 'bg-violet-300');
                    this.highlightCharAt(row - 2, col + 2, 'bg-violet-300');
                    this.highlightCharAt(row - 3, col + 3, 'bg-violet-300');
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
                    occurrences++;
                    this.highlightCharAt(row, col, 'bg-blue-300');
                    this.highlightCharAt(row, col - 1, 'bg-blue-300');
                    this.highlightCharAt(row, col - 2, 'bg-blue-300');
                    this.highlightCharAt(row, col - 3, 'bg-blue-300');
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
                    occurrences++;
                    this.highlightCharAt(row, col, 'bg-teal-300');
                    this.highlightCharAt(row, col + 1, 'bg-teal-300');
                    this.highlightCharAt(row, col + 2, 'bg-teal-300');
                    this.highlightCharAt(row, col + 3, 'bg-teal-300');
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
                    occurrences++;
                    this.highlightCharAt(row, col, 'bg-green-300');
                    this.highlightCharAt(row + 1, col, 'bg-green-300');
                    this.highlightCharAt(row + 2, col, 'bg-green-300');
                    this.highlightCharAt(row + 3, col, 'bg-green-300');
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
                    occurrences++;
                    this.highlightCharAt(row, col, 'bg-yellow-200');
                    this.highlightCharAt(row + 1, col - 1, 'bg-yellow-200');
                    this.highlightCharAt(row + 2, col - 2, 'bg-yellow-200');
                    this.highlightCharAt(row + 3, col - 3, 'bg-yellow-200');
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
                    occurrences++;
                    this.highlightCharAt(row, col, 'bg-orange-300');
                    this.highlightCharAt(row + 1, col + 1, 'bg-orange-300');
                    this.highlightCharAt(row + 2, col + 2, 'bg-orange-300');
                    this.highlightCharAt(row + 3, col + 3, 'bg-orange-300');
                }
            }

            $occurrences.textContent = occurrences;
            if (shouldAnimate) {
                await new Promise((resolve) => setTimeout(resolve, 0));
            }
        }

        return occurrences;
    }
}

const response = await fetch('./input.txt');
const input = await response.text();
const puzzle = new WordSearch(input);
await puzzle.countOccurrences();
