const inter = (difference) => {
  const func = ([operator, key, value1, value2 = null]) => {
    const lines = {
      default: { operator, key, value: Array.isArray(value1) ? inter(value1) : value1 },
      replace: {
        operator, key, removedValue: value1, currentValue: value2,
      },
    };

    return lines[operator === 'replace' ? operator : 'default'];
  };

  return difference.map(func);
};

const renderJson = (difference) => JSON.stringify(inter(difference), '', 2);
export default renderJson;
