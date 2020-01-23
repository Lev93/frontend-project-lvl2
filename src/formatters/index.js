import renderDefault from './renderDefault';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const formatters = {
  tree: renderDefault,
  plain: renderPlain,
  json: renderJson,
};
const render = (difference, format) => formatters[format](difference);
export default render;
