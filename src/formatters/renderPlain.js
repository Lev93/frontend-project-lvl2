const convert = (item) => {
  if (typeof item === 'string') return `'${item}'`;
  if (item instanceof Object) return '[complex value]';
  return item;
};

const buildPath = (dir, base) => [dir, base].filter((i) => i !== '').join('.');

const inter = (diff, path = '') => {
  const func = ({
    operator, key, removedValue = null, currentValue = null,
  }) => {
    const fullPath = buildPath(path, key);

    const lines = {
      compare: () => inter(currentValue, fullPath),
      equals: () => '',
      delete: () => `Property '${fullPath}' was removed`,
      add: () => `Property '${fullPath}' was added with value: ${convert(currentValue)}`,
      replace: () => `Property '${fullPath}' was updated. From ${convert(removedValue)} to ${convert(currentValue)}`,
    };

    return lines[operator]();
  };

  return diff.map(func).filter((item) => item !== '').join('\n');
};

export default (diff) => inter(diff);
