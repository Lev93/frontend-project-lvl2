import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const filepath1 = path.resolve('__tests__/__files__/before.json');
const filepath2 = path.resolve('__tests__/__files__/after.json');
const filepath3 = path.resolve('__tests__/__files__/result.txt');
const result = fs.readFileSync(filepath3, 'utf8');

test('gendiff', () => {
  expect(genDiff(filepath1, filepath2)).toBe(result);
});
