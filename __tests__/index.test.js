import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const filepathBeforeJson = path.resolve(__dirname, '__fixtures__/before.json');
const filepathAfterJson = path.resolve(__dirname, '__fixtures__/after.json');
const filepathBeforeYml = path.resolve(__dirname, '__fixtures__/before.yml');
const filepathAfterYml = path.resolve(__dirname, '__fixtures__/after.yml');
const filepathBeforeIni = path.resolve(__dirname, '__fixtures__/before.ini');
const filepathAfterIni = path.resolve(__dirname, '__fixtures__/after.ini');
const filepathResultTree = path.resolve(__dirname, '__fixtures__/diff-tree.txt');
const filepathResultPlain = path.resolve(__dirname, '__fixtures__/diff-plain.txt');
const resultTree = fs.readFileSync(filepathResultTree, 'utf8');
const resultPlain = fs.readFileSync(filepathResultPlain, 'utf8');

test.each([
  [filepathBeforeJson, filepathAfterJson],
  [filepathBeforeYml, filepathAfterYml],
  [filepathBeforeIni, filepathAfterIni],
])('gendiff tree', (filepathBefore, filepathAfter) => {
  expect(genDiff(filepathBefore, filepathAfter, 'tree')).toBe(resultTree);
});

test.each([
  [filepathBeforeJson, filepathAfterJson],
  [filepathBeforeYml, filepathAfterYml],
  [filepathBeforeIni, filepathAfterIni],
])('gendiff plain', (filepathBefore, filepathAfter) => {
  expect(genDiff(filepathBefore, filepathAfter, 'plain')).toBe(resultPlain);
});
