import { parseInput } from './index.js';

const $reports = document.querySelector('.aoc-reports');
const $totalReports = document.querySelector('.aoc-total-reports');
const $safeReports = document.querySelector('.aoc-safe-reports');
const $unsafeReports = document.querySelector('.aoc-unsafe-reports');

const $reportTemplate = document.querySelector('template#report');
const $levelTemplate = document.querySelector('template#level');
const $deltaTemplate = document.querySelector('template#delta');

function renderReport(report) {
    const $report = $reportTemplate.content.cloneNode(true);
    const $levels = $report.querySelector('.aoc-levels');

    const deltas = [];
    for (let i = 0; i < report.length; i++) {
        const $level = renderLevel(report[i]);
        $levels.appendChild($level);

        if (i < report.length - 1) {
            const delta = report[i + 1] - report[i];
            deltas.push(delta);

            const $delta = renderDelta(delta);
            $levels.appendChild($delta);
        }
    }
    $reports.appendChild($report);
    return deltas;
}

function determineSafeDeltas(deltas, $report) {
    const $levels = $report.querySelectorAll('.aoc-level');
    const $deltas = $report.querySelectorAll('.aoc-delta');
    $levels[0].classList.add('bg-teal-400');

    let lastDelta;
    for (let i = 0; i < deltas.length; i++) {
        const delta = deltas[i];
        const deltaAbs = Math.abs(delta);
        if (i > 0) {
            const directionChanged = lastDelta * delta <= 0;
            if (directionChanged) {
                $deltas[i].classList.remove('text-slate-600');
                $deltas[i].classList.add('text-red-700');
                $levels[i + 1].classList.remove('bg-slate-300');
                $levels[i + 1].classList.add('bg-red-300');
                return false;
            }
        }
        if (deltaAbs < 1 || deltaAbs > 3) {
            $deltas[i].classList.remove('text-slate-600');
            $deltas[i].classList.add('text-red-700');
            $levels[i + 1].classList.remove('bg-slate-300');
            $levels[i + 1].classList.add('bg-red-300');
            return false;
        }
        $deltas[i].classList.remove('text-slate-600');
        $deltas[i].classList.add('text-teal-700');
        $levels[i + 1].classList.remove('bg-slate-300');
        $levels[i + 1].classList.add('bg-teal-400');
        lastDelta = delta;
    }
    return true;
}

function renderLevel(level) {
    const $level = $levelTemplate.content.cloneNode(true);
    $level.querySelector('.aoc-level').textContent = level;
    return $level;
}

function renderDelta(delta) {
    const $delta = $deltaTemplate.content.cloneNode(true);
    $delta.querySelector('.aoc-delta').textContent = delta;
    return $delta;
}

function getSafeReports(reports) {
    $totalReports.textContent = reports.length;
    let safeReportsCount = 0;
    let unsafeReportsCount = 0;

    reports.forEach((report, i) => {
        const deltas = renderReport(report);
        const $report = document.querySelector(`.aoc-report:nth-child(${i + 1})`);
        const $assessment = $report.querySelector('.aoc-assessment');

        const isSafe = determineSafeDeltas(deltas, $report);
        if (isSafe) {
            safeReportsCount++;
            $assessment.textContent = 'Safe';
            $assessment.classList.add('text-teal-700');
        } else {
            unsafeReportsCount++;
            $assessment.textContent = 'Unsafe';
            $assessment.classList.add('text-red-700');
        }
    });

    $safeReports.textContent = safeReportsCount;
    $unsafeReports.textContent = unsafeReportsCount;
}

const response = await fetch('./input.txt');
const input = await response.text();
const reports = parseInput(input);
getSafeReports(reports);
