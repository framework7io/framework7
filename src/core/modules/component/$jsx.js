import { flattenArray } from '../../shared/utils.js';

const ignoreChildren = [false, null, '', undefined];

const $jsx = (type, props, ...children) => {
  const flatChildren = flattenArray(
    (children || []).filter((child) => ignoreChildren.indexOf(child) < 0),
  );
  if (type === 'Fragment') {
    return flatChildren;
  }
  return {
    type,
    props: props || {},
    children: flatChildren,
  };
};

export default $jsx;
