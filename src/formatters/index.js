import renderDefault from './renderDefault';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const formatters = {
  tree: renderDefault,
  plain: renderPlain,
  json: renderJson,
};
const render = (getDifference, format) => formatters[format](getDifference);
export default render;
