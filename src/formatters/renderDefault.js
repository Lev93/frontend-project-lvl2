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
    operator, key, removedValue = null, currentValue = null,
  }) => {
    const gap = tab.repeat(tabCount);

    const lines = {
      compare: () => `${gap}${tab}${key}: {\n${inter(currentValue, tabCount + tabStep)}\n${gap}${tab}}`,
      equals: () => `${gap}${tab}${key}: ${convert(currentValue, gap)}`,
      delete: () => `${gap}- ${key}: ${convert(removedValue, gap)}`,
      add: () => `${gap}+ ${key}: ${convert(currentValue, gap)}`,
      replace: () => [lines.add(), lines.delete()],
    };

    return lines[operator]();
  };

  return flatten(diff.map(func)).join('\n');
};

export default (diff) => `{\n${inter(diff, 1)}\n}`;
