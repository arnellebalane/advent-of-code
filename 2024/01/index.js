import { readFile } from 'node:fs/promises';
import { URL } from 'node:url';

export function getTotalDistance(first, second) {
    first = first.slice().sort((a, b) => a - b);
    second = second.slice().sort((a, b) => a - b);

    let total = 0;
    for (let i = 0; i < first.length; i++) {
        total += Math.abs(first[i] - second[i]);
    }
    return total;
}

export function getSimilarityScore(first, second) {
    const appearances = {};
    for (const item of second) {
        if (!appearances[item]) {
            appearances[item] = 0;
        }
        appearances[item] += 1;
    }

    let score = 0;
    for (const item of first) {
        score += (appearances[item] || 0) * item;
    }
    return score;
}

function parseInput(input) {
    const first = [];
    const second = [];
    for (const line of input.trim().split('\n')) {
        const [a, b] = line.split(/\s+/);
        first.push(parseInt(a));
        second.push(parseInt(b));
    }
    return [first, second];
}

const input = await readFile(new URL('input.txt', import.meta.url), 'utf8');
const [first, second] = parseInput(input);
const distance = getTotalDistance(first, second);
const score = getSimilarityScore(first, second);
console.log({ distance, score });
