import test from 'ava';
import {
  computeFuelRequired,
  computeTotalFuelRequired
} from './index.mjs';

test('computeFuelRequired()', t => {
  t.is(computeFuelRequired(12), 2);
  t.is(computeFuelRequired(14), 2);
  t.is(computeFuelRequired(1969), 654);
  t.is(computeFuelRequired(100756), 33583);
});

test('computeTotalFuelRequired()', t => {
  t.is(computeTotalFuelRequired(14), 2);
  t.is(computeTotalFuelRequired(1969), 966);
  t.is(computeTotalFuelRequired(100756), 50346);
});
