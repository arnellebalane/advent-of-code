import { URL } from 'node:url';
import { readFile } from 'node:fs/promises';

const numbers = '0123456789';

class MemoryReader {
    data = undefined;
    cursor = 0;

    constructor(data) {
        this.data = data;
    }

    readNext(count = 1) {
        let buffer = '';
        while (!this.isEmpty() && count-- > 0) {
            buffer += this.data[this.cursor++];
        }
        return buffer;
    }

    peekNext(count = 1) {
        let buffer = '';
        let cursor = this.cursor;
        while (!this.isEmpty() && count-- > 0) {
            buffer += this.data[cursor++];
        }
        return buffer;
    }

    readUntil(characters) {
        let buffer = '';
        while (!this.isEmpty() && !characters.includes(this.data[this.cursor])) {
            buffer += this.data[this.cursor++];
        }
        return buffer;
    }

    readWhile(predicate) {
        let buffer = '';
        while (!this.isEmpty() && predicate(this.data[this.cursor])) {
            buffer += this.data[this.cursor++];
        }
        return buffer;
    }

    isEmpty() {
        return this.cursor === this.data.length;
    }
}

export function getSumOfProducts(input) {
    let total = 0;
    let multiplier = 1;
    const reader = new MemoryReader(input);

    while (!reader.isEmpty()) {
        reader.readUntil(['m', 'd']);

        let operation;
        if (reader.peekNext(3) === 'mul') {
            operation = reader.readNext(3);
        } else if (reader.peekNext(5) === "don't") {
            operation = reader.readNext(5);
        } else if (reader.peekNext(2) === 'do') {
            operation = reader.readNext(2);
        } else {
            reader.readNext();
            continue;
        }

        if (operation === 'mul') {
            if (reader.readNext() !== '(') continue;

            const firstOperand = reader.readWhile((character) => numbers.includes(character));
            if (firstOperand.length < 1 || firstOperand.length > 3) continue;

            const separator = reader.readNext();
            if (separator !== ',') continue;

            const secondOperand = reader.readWhile((character) => numbers.includes(character));
            if (secondOperand.length < 1 || secondOperand.length > 3) continue;
            if (reader.readNext() !== ')') continue;

            total += parseInt(firstOperand, 10) * parseInt(secondOperand, 10) * multiplier;
        } else if (operation === 'do') {
            if (reader.readNext() !== '(') continue;
            if (reader.readNext() !== ')') continue;
            multiplier = 1;
        } else if (operation === "don't") {
            if (reader.readNext() !== '(') continue;
            if (reader.readNext() !== ')') continue;
            multiplier = 0;
        }
    }

    return total;
}

const input = await readFile(new URL('input.txt', import.meta.url), 'utf8');
const sum = getSumOfProducts(input);
console.log({ sum });
