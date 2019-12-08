export function neverDecreases(digits) {
  for (let i = 1; i < digits.length; i++) {
    if (digits[i] < digits[i - 1]) {
      return false;
    }
  }
  return true;
}

export function hasSameAdjacentDigits(digits) {
  for (let i = 1; i < digits.length; i++) {
    if (digits[i] === digits[i - 1]) {
      return true;
    }
  }
  return false;
}

export function hasExactlyTwoSameAdjacentDigits(digits) {
  let digit = digits[0];
  let count = 1;
  for (let i = 1; i < digits.length; i++) {
    if (digits[i] === digit) {
      count++;
    } else if (count === 2) {
      return true;
    } else {
      digit = digits[i];
      count = 1;
    }
  }
  return count === 2;
}

export function getNumberDigits(number) {
  const digits = [];
  while (number > 0) {
    digits.unshift(number % 10);
    number = Math.floor(number / 10);
  }
  return digits;
}

export function countMatchingPasswords(min, max) {
  let count = 0;
  for (let i = min; i <= max; i++) {
    const digits = getNumberDigits(i);
    if (neverDecreases(digits) && hasExactlyTwoSameAdjacentDigits(digits)) {
      count++;
    }
  }
  return count;
}



// https://adventofcode.com/2019/day/4
if (process.env.NODE_ENV !== 'test') {
  const min = 165432;
  const max = 707912;

  const count = countMatchingPasswords(min, max);
  console.log(count);
}
