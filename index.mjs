import path from 'path';
import fs from 'fs/promises';

const day = process.argv[2];

if (!day) {
  throw new Error('Advent of Code day is not provided');
}

const SOURCE_DIR = path.resolve('src', day);

(async () => {
  const main = (await import(path.resolve(SOURCE_DIR, 'index.mjs'))).default;
  const input = await fs.readFile(path.resolve(SOURCE_DIR, 'input.txt'), 'utf-8');
  console.log(main(input));
})();
