import commander from 'commander';

const program = () => {
  commander
    .description('Compares two configuration files and shows a difference.')
    .option('-v, --version', 'output usage information')
    .option('-f, --format <type>', 'output format [pretty]', 'pretty')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
      console.log(`${firstConfig}${secondConfig}`);
    })
    .parse(process.argv);
};

export default program;
