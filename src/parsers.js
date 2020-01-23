import yaml from 'js-yaml';
import ini from 'ini';

const parserObject = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

const parser = (data, formatOffile) => parserObject[formatOffile](data);

export default parser;
