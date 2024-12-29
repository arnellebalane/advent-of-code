export function parseInput(input) {
    return input
        .trim()
        .split('\n')
        .map((report) => report.split(/\s+/).map((level) => parseInt(level, 10)));
}
