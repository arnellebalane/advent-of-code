import { parseInput, sortList } from './index.js';

const $lists = document.querySelector('.aoc-lists');
const $totalDistance = document.querySelector('.aoc-total-distance');
const $similarityScore = document.querySelector('.aoc-similarity-score');

let $highlightedPair = undefined;

$lists.addEventListener('click', (event) => {
    const $pair = event.target.closest('.aoc-pair');
    if (!$pair) return;

    if ($highlightedPair === $pair) {
        clearHighlightedPair();
    } else {
        highlightPair($pair);
    }
});

document.addEventListener('keydown', (event) => {
    if ($highlightedPair && event.code === 'Escape') {
        clearHighlightedPair();
    }
});

function highlightPair($pair) {
    $highlightedPair = $pair;

    const firstItem = $pair.querySelector('.aoc-first-item').textContent;
    document.querySelectorAll('.aoc-pair').forEach(($element) => {
        if ($element === $pair) {
            $element.classList.remove('opacity-50');
            $element.classList.add('bg-orange-300');
            return;
        }

        const secondItem = $element.querySelector('.aoc-second-item').textContent;
        const shouldHighlight = firstItem === secondItem;

        $element.classList.remove('bg-orange-300');
        $element.classList.toggle('opacity-50', !shouldHighlight);
        $element.classList.toggle('bg-amber-200', shouldHighlight);
    });
}

function clearHighlightedPair() {
    $highlightedPair = undefined;

    document.querySelectorAll('.opacity-50,.bg-amber-200,.bg-orange-300').forEach(($element) => {
        $element.classList.remove('opacity-50', 'bg-amber-200', 'bg-orange-300');
    });
}

function renderListPair(values) {
    const template = document.querySelector('template#pair').content.cloneNode(true);

    template.querySelector('.aoc-first-item').textContent = values.itemOne;
    template.querySelector('.aoc-second-item').textContent = values.itemTwo;
    template.querySelector('.aoc-distance').textContent = values.distance;

    $lists.appendChild(template);
}

function getTotalDistance(first, second) {
    let total = 0;
    for (let i = 0; i < first.length; i++) {
        const distance = Math.abs(first[i] - second[i]);
        total += distance;

        renderListPair({
            itemOne: first[i],
            itemTwo: second[i],
            distance,
        });
    }

    $totalDistance.textContent = total;
}

function getSimilarityScore(first, second) {
    const appearances = {};
    for (const item of second) {
        if (!appearances[item]) {
            appearances[item] = 0;
        }
        appearances[item] += 1;
    }

    let total = 0;
    for (let i = 0; i < first.length; i++) {
        const score = (appearances[first[i]] || 0) * first[i];
        total += score;

        const $element = document.querySelector(`.aoc-pair:nth-child(${i + 1}) .aoc-similarity-score`);
        $element.textContent = score;
        $element.classList.add(score ? 'bg-teal-400' : 'bg-teal-100');
    }

    $similarityScore.textContent = total;
}

const response = await fetch('./input.txt');
const input = await response.text();

let [first, second] = parseInput(input);
first = sortList(first);
second = sortList(second);

getTotalDistance(first, second);
getSimilarityScore(first, second);
