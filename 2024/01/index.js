export function sortList(list) {
    return list.slice().sort((a, b) => a - b);
}

export function parseInput(input) {
    const first = [];
    const second = [];
    for (const line of input.trim().split('\n')) {
        const [a, b] = line.split(/\s+/);
        first.push(parseInt(a));
        second.push(parseInt(b));
    }
    return [first, second];
}
