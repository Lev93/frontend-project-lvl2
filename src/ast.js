import _ from 'lodash';

const ast = (object1, object2) => {
  const keys = _.union(Object.keys(object1), Object.keys(object2));

  const func = (key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    if (value1 instanceof Object && value2 instanceof Object) {
      return { type: 'compared', key, newValue: ast(value1, value2) };
    }
    if (_.has(object1, key) && !_.has(object2, key)) {
      return { type: 'removed', key, oldValue: value1 };
    }
    if (!_.has(object1, key) && _.has(object2, key)) {
      return { type: 'added', key, newValue: value2 };
    }
    if (value1 === value2) {
      return {
        type: 'equal', key, newValue: value1,
      };
    }
    return {
      type: 'replaced', key, oldValue: value1, newValue: value2,
    };
  };

  return keys.map(func);
};

export default ast;
