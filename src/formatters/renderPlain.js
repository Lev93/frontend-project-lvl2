const stringify = (item) => {
  if (typeof item === 'string') return `'${item}'`;
  if (item instanceof Object) return '[complex value]';
  return item;
};

const buildPath = (dir, base) => [dir, base].filter((i) => i !== '').join('.');

const renderPlain = (diff, path = '') => {
  const func = ({
    type, key, oldValue = null, newValue = null,
  }) => {
    const fullPath = buildPath(path, key);

    const lines = {
      compared: () => renderPlain(newValue, fullPath),
      equal: () => null,
      removed: () => `Property '${fullPath}' was removed`,
      added: () => `Property '${fullPath}' was added with value: ${stringify(newValue)}`,
      updated: () => `Property '${fullPath}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`,
    };

    return lines[type]();
  };

  return diff.map(func).filter((item) => item !== '').join('\n');
};

export default (diff) => renderPlain(diff);
