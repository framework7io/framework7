import { flattenArray } from '../../shared/utils';

const ignoreChildren = [false, null, '', undefined];

const $jsx = (type, props, ...children) => {
  return {
    type,
    props: props || {},
    children: flattenArray((children || []).filter((child) => ignoreChildren.indexOf(child) < 0)),
  };
};

export default $jsx;
