import commander from 'commander';

const program = () => {
  commander
    .description('Compares two configuration files and shows a difference.')
    .option('-v, --version', 'output usage information')
    .parse(process.argv);
};

export default program;
