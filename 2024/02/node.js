import { URL } from 'node:url';
import { readFile } from 'node:fs/promises';
import { parseInput } from './index.js';

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

const input = await readFile(new URL('input.txt', import.meta.url), 'utf8');
const reports = parseInput(input);
const count = getSafeReports(reports).length;
console.log({ count });
