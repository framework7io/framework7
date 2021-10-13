import htm from 'htm';
import { flattenArray } from '../../shared/utils.js';

const ignoreChildren = [false, null, '', undefined];

const h = (type, props, ...children) => {
  return {
    type,
    props: props || {},
    children: flattenArray(children.filter((child) => ignoreChildren.indexOf(child) < 0)),
  };
};

const $h = htm.bind(h);

export default $h;
