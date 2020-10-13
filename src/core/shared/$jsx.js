/* eslint-disable prefer-rest-params */
const $jsx = (tag, props, ...args) => {
  const attrs = props || {};
  const children = args || [];

  const attrsString = Object.keys(attrs)
    .map((attr) => {
      if (attr[0] === '_') {
        if (attrs[attr]) return attr.replace('_', '');
        return '';
      }
      return `${attr}="${attrs[attr]}"`;
    })
    .filter((attr) => !!attr)
    .join(' ');

  if (['path', 'img', 'circle', 'polygon', 'line', 'input'].indexOf(tag) >= 0) {
    return `<${tag} ${attrsString} />`.trim();
  }
  const childrenContent = children
    .filter((c) => !!c)
    .map((c) => (Array.isArray(c) ? c.join('') : c))
    .join('');
  return `<${tag} ${attrsString}>${childrenContent}</${tag}>`.trim();
};

export default $jsx;
