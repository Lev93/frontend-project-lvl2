const convert = (item) => {
  if (typeof item === 'string') return `'${item}'`;
  if (item instanceof Object) return '[complex value]';
  return item;
};

const buildPath = (dir, base) => [dir, base].filter((i) => i !== '').join('.');

const inter = (diff, path = '') => {
  const func = ({
    type, key, oldValue = null, newValue = null,
  }) => {
    const fullPath = buildPath(path, key);

    const lines = {
      compared: () => inter(newValue, fullPath),
      equal: () => '',
      removed: () => `Property '${fullPath}' was removed`,
      added: () => `Property '${fullPath}' was added with value: ${convert(newValue)}`,
      replaced: () => `Property '${fullPath}' was updated. From ${convert(oldValue)} to ${convert(newValue)}`,
    };

    return lines[type]();
  };

  return diff.map(func).filter((item) => item !== '').join('\n');
};

export default (diff) => inter(diff);
