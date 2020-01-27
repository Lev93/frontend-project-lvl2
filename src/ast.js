import _ from 'lodash';

const ast = (object1, object2) => {
  const keys = _.union(Object.keys(object1), Object.keys(object2));

  const func = (key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (value1 instanceof Object && value2 instanceof Object) {
      return { operator: 'compare', key, currentValue: ast(value1, value2) };
    }
    if (_.has(object1, key) && !_.has(object2, key)) {
      return { operator: 'delete', key, removedValue: value1 };
    }
    if (!_.has(object1, key) && _.has(object2, key)) {
      return { operator: 'add', key, currentValue: value2 };
    }
    if (value1 === value2) {
      return {
        operator: 'equals', key, currentValue: value1,
      };
    }
    return {
      operator: 'replace', key, removedValue: value1, currentValue: value2,
    };
  };

  return keys.map(func);
};

export default ast;
