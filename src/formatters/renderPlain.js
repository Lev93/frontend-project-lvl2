const convert = (item, operator) => {
  if (typeof item === 'string') {
    return `'${item}'`;
  }
  if (item instanceof Object && operator !== 'compare') {
    return '[complex value]';
  }

  return item;
};

const buildPath = (dir, base) => [dir, base].filter((i) => i !== '').join('.');

const inter = (difference, path) => {
  const func = ([operator, key, value1, value2 = null]) => {
    const value = convert(value1, operator);
    const replacedValue = convert(value2, operator);

    switch (operator) {
      case 'compare':
        return inter(value, buildPath(path, key));
      case 'equals':
        return '';
      case 'delete':
        return `Property '${buildPath(path, key)}' was removed`;
      case 'add':
        return `Property '${buildPath(path, key)}' was added with value: ${value}`;
      case 'replace':
        return `Property '${buildPath(path, key)}' was updated. From ${value} to ${replacedValue}`;
      default:
        return false;
    }
  };

  return difference.map(func).filter((item) => item !== '').join('\n');
};

const renderPlain = (difference) => inter(difference, '');
export default renderPlain;
