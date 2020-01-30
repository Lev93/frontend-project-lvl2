import renderTree from './renderTree';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

const formatters = {
  tree: renderTree,
  plain: renderPlain,
  json: renderJson,
};
const render = (getDifference, format) => formatters[format](getDifference);
export default render;
