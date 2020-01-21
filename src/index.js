import commander from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (firstFile, secondFile) => {
  const filepath1 = path.resolve(firstFile);
  const filepath2 = path.resolve(secondFile);
  const json1 = fs.readFileSync(filepath1, 'utf8');
  const json2 = fs.readFileSync(filepath2, 'utf8');
  const object1 = JSON.parse(json1);
  const object2 = JSON.parse(json2);
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
