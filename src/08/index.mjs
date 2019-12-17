export function getImageLayers(input, width, height) {
  const layers = [];
  const layerSize = width * height;

  let i = 0;
  while (i < input.length) {
    layers.push(input.substring(i, i + layerSize));
    i += layerSize;
  }
  return layers;
}

export function getLayerDigitCount(layer, digit) {
  let count = 0;
  for (let character of layer) {
    if (character === String(digit)) {
      count++;
    }
  }
  return count;
}

export function getLayerWithFewestZeroes(layers) {
  let resultLayer = null;
  let fewestZeroesCount = Infinity;

  for (let layer of layers) {
    const zeroesCount = getLayerDigitCount(layer, 0);
    if (zeroesCount < fewestZeroesCount) {
      resultLayer = layer;
      fewestZeroesCount = zeroesCount;
    }
  }
  return resultLayer;
}

export function getImageCheckSum(input, width, height) {
  const layers = getImageLayers(input, width, height);
  const layer = getLayerWithFewestZeroes(layers);
  return getLayerDigitCount(layer, 1) * getLayerDigitCount(layer, 2);
}

export function renderImage(input, width, height) {
  const layers = getImageLayers(input, width, height);

  let rendered = '';
  for (let i = 0; i < layers[0].length; i++) {
    let pixel = '2';
    for (let j = layers.length - 1; j >= 0; j--) {
      const character = layers[j].charAt(i);
      if (character !== '2') {
        pixel = character;
      }
    }
    rendered += pixel;
  }
  return rendered;
}

export function renderImageGraphically(input, width, height) {
  const rendered = renderImage(input, width, height);
  const pixels = { '0': ' ', '1': 'x', '2': ' ' };
  let output = '';

  for (let i = 0; i < rendered.length; i++) {
    output += pixels[rendered.charAt(i)];
    if ((i + 1) % width === 0) {
      output += '\n';
    }
  }
  return output;
}



// https://adventofcode.com/2019/day/8
import input from './input.mjs';

if (process.env.NODE_ENV !== 'test') {
  const IMAGE_WIDTH = 25;
  const IMAGE_HEIGHT = 6;

  const result = renderImageGraphically(input, IMAGE_WIDTH, IMAGE_HEIGHT);
  console.log(result);
}
