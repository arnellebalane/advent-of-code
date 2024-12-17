export function findTwoWithSum(numbers, sum) {
    const set = new Set(numbers);
    for (const number of set) {
        if (set.has(sum - number)) {
            return [number, sum - number];
        }
    }
}

export function findThreeWithSum(numbers, sum) {
    const set = new Set(numbers);
    for (let i = 0; i < numbers.length - 1; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            const a = numbers[i];
            const b = numbers[j];
            if (set.has(sum - (a + b))) {
                return [a, b, sum - (a + b)];
            }
        }
    }
}

// https://adventofcode.com/2020/day/1
export default function main(input) {
    const entries = input
        .trim()
        .split(/\r?\n/g)
        .map((n) => parseInt(n, 10));

    // const two = findTwoWithSum(entries, 2020);
    // return two[0] * two[1];

    const three = findThreeWithSum(entries, 2020);
    return three[0] * three[1] * three[2];
}
