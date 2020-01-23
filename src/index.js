import commander from 'commander';
import fs from 'fs';
import path from 'path';
import parser from './parsers';
import ast from './ast';
import render from './formatters/index';

const getData = (file) => {
  const filepath = path.resolve(file);
  const formatOffile = path.extname(file);
  const data = fs.readFileSync(filepath, 'utf8');

  return parser(data, formatOffile);
};

const genDiff = (firstFile, secondFile, format) => {
  const object1 = getData(firstFile);
  const object2 = getData(secondFile);
  const difference = ast(object1, object2);
  return render(difference, format);
};

const program = () => {
  commander
    .description('Compares two configuration files and shows a difference.')
    .option('-v, --version', 'output usage information')
    .option('-f, --format <type>', 'output format [tree]', 'tree')
    .arguments('<file1> <file2>')
    .action((file1, file2) => console.log(genDiff(file1, file2, commander.format)))
    .parse(process.argv);
};

export default genDiff;
export { program };
