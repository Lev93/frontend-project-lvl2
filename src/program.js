import commander from 'commander';
import genDiff from '.';

const program = () => {
  commander
    .description('Compares two configuration files and shows a difference.')
    .option('-v, --version', 'output usage information')
    .option('-f, --format <type>', 'output format [tree]', 'tree')
    .arguments('<file1> <file2>')
    .action((file1, file2) => console.log(genDiff(file1, file2, commander.format)))
    .parse(process.argv);
};

export default program;
