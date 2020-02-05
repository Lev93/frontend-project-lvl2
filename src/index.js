import fs from 'fs';
import path from 'path';
import parser from './parsers';
import ast from './ast';
import render from './formatters/index';

const getContents = (file) => {
  const filepath = path.resolve(file);
  const extension = path.extname(file);
  const data = fs.readFileSync(filepath, 'utf8');

  return parser(data, extension);
};

const genDiff = (firstFile, secondFile, format) => {
  const object1 = getContents(firstFile);
  const object2 = getContents(secondFile);
  const getDifference = ast(object1, object2);
  return render(getDifference, format);
};

export default genDiff;
