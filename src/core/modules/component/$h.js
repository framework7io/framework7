import htm from 'htm';

const h = (type, props, ...children) => {
  return {
    type,
    props,
    children,
  };
};

const $h = htm.bind(h);

export default $h;
