import flatten from 'lodash/flatten';

const tab = '  ';
const tabStep = 2;

const convert = (item, gap) => {
  if (!(item instanceof Object)) return item;

  const func = ([key, value]) => `{\n${gap}${tab.repeat(3)}${key}: ${value}\n${gap}${tab}}`;
  return Object.entries(item).map(func);
};

const inter = (diff, tabCount) => {
  const func = ({
    type, key, oldValue = null, newValue = null,
  }) => {
    const gap = tab.repeat(tabCount);

    const lines = {
      compared: () => `${gap}${tab}${key}: {\n${inter(newValue, tabCount + tabStep)}\n${gap}${tab}}`,
      equal: () => `${gap}${tab}${key}: ${convert(newValue, gap)}`,
      removed: () => `${gap}- ${key}: ${convert(oldValue, gap)}`,
      added: () => `${gap}+ ${key}: ${convert(newValue, gap)}`,
      replaced: () => [lines.added(), lines.removed()],
    };

    return lines[type]();
  };

  return flatten(diff.map(func)).join('\n');
};

export default (diff) => `{\n${inter(diff, 1)}\n}`;
