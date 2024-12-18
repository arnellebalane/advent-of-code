import { URL } from 'node:url';
import { readFile } from 'node:fs/promises';

export function getSafeReports(reports) {
    return reports.filter((report) => {
        let lastDirection;

        for (let i = 1; i < report.length; i++) {
            const currentDirection = report[i] - report[i - 1];
            const difference = Math.abs(currentDirection);
            if (i > 1) {
                const directionChanged = lastDirection * currentDirection <= 0;
                if (directionChanged) {
                    return false;
                }
            }
            if (difference < 1 || difference > 3) {
                return false;
            }
            lastDirection = currentDirection;
        }
        return true;
    });
}

function parseInput(input) {
    return input
        .trim()
        .split('\n')
        .map((report) => report.split(/\s+/).map((level) => parseInt(level, 10)));
}

const input = await readFile(new URL('input.txt', import.meta.url), 'utf8');
const reports = parseInput(input);
const count = getSafeReports(reports).length;
console.log({ count });
