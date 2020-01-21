import commander from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parser from './parsers';

const getData = (file) => {
  const filepath = path.resolve(file);
  const format = path.extname(file);
  const data = fs.readFileSync(filepath, 'utf8');

  return parser(data, format);
};

const genDiff = (firstFile, secondFile) => {
  const object1 = getData(firstFile);
  const object2 = getData(secondFile);
  const keys = _.union(Object.keys(object1), Object.keys(object2));

  const func = (item) => {
    if (object1[item] === object2[item]) {
      return `    ${item}: ${object1[item]}\n`;
    }
    if (!_.has(object1, item) && _.has(object2, item)) {
      return `  + ${item}: ${object2[item]}\n`;
    }
    if (_.has(object1, item) && !_.has(object2, item)) {
      return `  - ${item}: ${object1[item]}\n`;
    }
    return `  + ${item}: ${object2[item]}\n  - ${item}: ${object1[item]}\n`;
  };

  const str = keys.map(func).join('');
  return `\n{\n${str}}\n`;
};

const program = () => {
  commander
    .description('Compares two configuration files and shows a difference.')
    .option('-v, --version', 'output usage information')
    .option('-f, --format <type>', 'output format [pretty]', 'pretty')
    .arguments('<firstFile> <secondFile>')
    .action((firstFile, secondFile) => console.log(genDiff(firstFile, secondFile)))
    .parse(process.argv);
};

export default genDiff;
export { program };
