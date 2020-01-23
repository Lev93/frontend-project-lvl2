import renderDefault from './renderDefault';
import renderPlain from './renderPlain';

const formatters = {
  tree: renderDefault,
  plain: renderPlain,
};
const render = (difference, format) => formatters[format](difference);
export default render;
