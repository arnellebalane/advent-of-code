import { MemoryReader } from './index.js';

const $result = document.querySelector('.aoc-result');
const $memory = document.querySelector('.aoc-memory');
const $highlightTemplate = document.querySelector('template#highlight');

const numbers = '0123456789';

function getSumOfProducts(input) {
    let total = 0;
    let multiplier = 1;
    const highlights = [];

    const reader = new MemoryReader(input);

    while (!reader.isEmpty()) {
        let start;
        reader.readUntil(['m', 'd']);

        let operation;
        if (reader.peekNext(3) === 'mul') {
            start = reader.cursor;
            operation = reader.readNext(3);
        } else if (reader.peekNext(5) === "don't") {
            start = reader.cursor;
            operation = reader.readNext(5);
        } else if (reader.peekNext(2) === 'do') {
            start = reader.cursor;
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

            const className = multiplier === 1 ? 'bg-teal-200' : 'bg-red-200';
            highlights.push([start, reader.cursor, className]);
        } else if (operation === 'do') {
            if (reader.readNext() !== '(') continue;
            if (reader.readNext() !== ')') continue;
            multiplier = 1;
            highlights.push([start, reader.cursor, 'bg-orange-200']);
        } else if (operation === "don't") {
            if (reader.readNext() !== '(') continue;
            if (reader.readNext() !== ')') continue;
            multiplier = 0;
            highlights.push([start, reader.cursor, 'bg-orange-200']);
        }
    }

    const nodes = [];
    let cursor = 0;

    for (const [start, end, className] of highlights) {
        const $text = document.createTextNode(input.substring(cursor, start));
        const $highlight = $highlightTemplate.content.cloneNode(true);
        const $span = $highlight.querySelector('span');
        $span.textContent = input.substring(start, end);
        $span.classList.add(className);
        nodes.push($text, $span);
        cursor = end;
    }
    const $text = document.createTextNode(input.substring(cursor));
    nodes.push($text);

    $memory.textContent = '';
    for (const $node of nodes) {
        $memory.appendChild($node);
    }

    return total;
}

const response = await fetch('./input.txt');
const input = await response.text();
$memory.textContent = input;

$result.textContent = getSumOfProducts(input);
