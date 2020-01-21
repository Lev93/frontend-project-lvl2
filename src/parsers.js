import yaml from 'js-yaml';

const parserObject = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
};

const parser = (data, format) => parserObject[format](data);

export default parser;
