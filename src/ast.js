import _ from 'lodash';

const ast = (object1, object2) => {
  const keys = _.union(Object.keys(object1), Object.keys(object2));

  const func = (key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (value1 instanceof Object && value2 instanceof Object) {
      return ['compare', key, ast(value1, value2)];
    }
    if (_.has(object1, key) && !_.has(object2, key)) {
      return ['delete', key, value1];
    }
    if (!_.has(object1, key) && _.has(object2, key)) {
      return ['add', key, value2];
    }
    if (value1 === value2) {
      return ['equals', key, value1];
    }
    return ['replace', key, value1, value2];
  };

  return keys.map(func);
};

export default ast;
