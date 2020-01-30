import yaml from 'js-yaml';
import ini from 'ini';

const parserObject = {
  '.yml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

const parser = (data, typeOfData) => parserObject[typeOfData](data);

export default parser;
