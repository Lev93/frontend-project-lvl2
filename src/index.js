import fs from 'fs';
import path from 'path';
import parse from './parsers';
import ast from './ast';
import render from './formatters';

const getData = (config) => {
  const filepath = path.resolve(config);
  const type = path.extname(config).slice(1);
  const data = fs.readFileSync(filepath, 'utf8');

  return parse(data, type);
};

const genDiff = (firstConfig, secondConfig, format) => {
  const data1 = getData(firstConfig);
  const data2 = getData(secondConfig);
  const difference = ast(data1, data2);
  return render(difference, format);
};

export default genDiff;
