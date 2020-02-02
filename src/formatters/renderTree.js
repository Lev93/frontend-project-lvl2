import flatten from 'lodash/flatten';

const tab = '  ';
const tabStep = 2;

const stringify = (item, gap) => {
  if (!(item instanceof Object)) return item;

  const func = ([key, value]) => `{\n${gap}${tab.repeat(3)}${key}: ${value}\n${gap}${tab}}`;
  return Object.entries(item).map(func);
};

const renderTree = (diff, tabCount) => {
  const func = ({
    type, key, oldValue = null, newValue = null,
  }) => {
    const gap = tab.repeat(tabCount);

    const lines = {
      compared: () => `${gap}${tab}${key}: {\n${renderTree(newValue, tabCount + tabStep)}\n${gap}${tab}}`,
      equal: () => `${gap}${tab}${key}: ${stringify(newValue, gap)}`,
      removed: () => `${gap}- ${key}: ${stringify(oldValue, gap)}`,
      added: () => `${gap}+ ${key}: ${stringify(newValue, gap)}`,
      updated: () => [lines.added(), lines.removed()],
    };

    return lines[type]();
  };

  return flatten(diff.map(func)).join('\n');
};

export default (diff) => `{\n${renderTree(diff, 1)}\n}`;
