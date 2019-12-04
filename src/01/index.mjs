export function computeFuelRequired(mass) {
  return Math.floor(mass / 3) - 2;
}

export function computeTotalFuelRequired(mass) {
  let total = 0;
  let fuel;
  while ((fuel = computeFuelRequired(mass)) > 0) {
    total += fuel;
    mass = fuel;
  }
  return total;
}
