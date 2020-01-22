import yaml from 'js-yaml';
import ini from 'ini';

const parserObject = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

const parser = (data, format) => parserObject[format](data);

export default parser;
