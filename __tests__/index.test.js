import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const filepathBeforeJson = path.resolve(__dirname, '__fixtures__/before.json');
const filepathAfterJson = path.resolve(__dirname, '__fixtures__/after.json');
const filepathBeforeYml = path.resolve(__dirname, '__fixtures__/before.yml');
const filepathAfterYml = path.resolve(__dirname, '__fixtures__/after.yml');
const filepathBeforeIni = path.resolve(__dirname, '__fixtures__/before.ini');
const filepathAfterIni = path.resolve(__dirname, '__fixtures__/after.ini');
const filepath = path.resolve(__dirname, '__fixtures__/result.txt');
const result = fs.readFileSync(filepath, 'utf8');

test.each([
  [filepathBeforeJson, filepathAfterJson],
  [filepathBeforeYml, filepathAfterYml],
  [filepathBeforeIni, filepathAfterIni],
])('gendiff', (filepathBefore, filepathAfter) => {
  expect(genDiff(filepathBefore, filepathAfter)).toBe(result);
});
