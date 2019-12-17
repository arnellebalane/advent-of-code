import test from 'ava';
import {
  getImageLayers,
  getLayerDigitCount,
  getLayerWithFewestZeroes,
  getImageCheckSum,
  renderImage
} from './index.mjs';

test('getImageLayers()', t => {
  t.deepEqual(
    getImageLayers('123456789012', 3, 2),
    ['123456', '789012']
  );
  t.deepEqual(
    getImageLayers('123456789012', 2, 2),
    ['1234', '5678', '9012']
  );
});

test('getLayerDigitCount()', t => {
  t.deepEqual(getLayerDigitCount('123456', 1), 1);
  t.deepEqual(getLayerDigitCount('100100101111', 0), 5);
  t.deepEqual(getLayerDigitCount('189218219829', 2), 3);
});

test('getLayerWithFewestZeroes()', t => {
  t.deepEqual(
    getLayerWithFewestZeroes([
      '1001001000101010',
      '0100100010101101',
      '1000100100001001'
    ]),
    '0100100010101101'
  );
});

test('getImageCheckSum()', t => {
  t.deepEqual(getImageCheckSum('120121110002', 3, 2), 6);
  t.deepEqual(getImageCheckSum('120120222010120210021022020101121002102012020201', 4, 4), 28);
});

test('renderImage()', t => {
  t.deepEqual(renderImage('0222112222120000', 2, 2), '0110');
});
