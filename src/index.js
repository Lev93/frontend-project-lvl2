import fs from 'fs';
import path from 'path';
import parser from './parsers';
import ast from './ast';
import render from './formatters/index';

const getFileContents = (file) => {
  const filepath = path.resolve(file);
  const fileExtension = path.extname(file);
  const data = fs.readFileSync(filepath, 'utf8');

  return parser(data, fileExtension);
};

const genDiff = (firstFile, secondFile, format) => {
  const object1 = getFileContents(firstFile);
  const object2 = getFileContents(secondFile);
  const getDifference = ast(object1, object2);
  return render(getDifference, format);
};

export default genDiff;
