/* eslint-disable prefer-rest-params */
const render = (tag, args = []) => {
  let className = '';
  let attrs = {};
  let children = [];
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (typeof arg === 'string') className = arg;
    else if (Array.isArray(arg)) children = arg;
    else attrs = arg;
  }
  if (className) attrs.class = className;

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

  if (['path', 'img', 'polygon', 'line', 'input'].indexOf('tag') >= 0) {
    return `<${tag} ${attrsString} />`.trim();
  }
  return `<${tag} ${attrsString}>${children.join('')}</${tag}>`.trim();
};
function div() {
  return render('div', arguments);
}
function ul() {
  return render('ul', arguments);
}
function li() {
  return render('li', arguments);
}
function span() {
  return render('span', arguments);
}
function input() {
  return render('input', arguments);
}
function form() {
  return render('form', arguments);
}
function label() {
  return render('label', arguments);
}
function a() {
  return render('a', arguments);
}
function img() {
  return render('img', arguments);
}
function icon() {
  return render('i', arguments);
}
function svg() {
  return render('svg', arguments);
}
function path() {
  return render('path', arguments);
}
function polygon() {
  return render('polygon', arguments);
}
function line() {
  return render('line', arguments);
}
function circle() {
  return render('circle', arguments);
}
function text() {
  return render('text', arguments);
}

export {
  render,
  div,
  ul,
  li,
  span,
  input,
  form,
  label,
  a,
  img,
  icon,
  svg,
  path,
  polygon,
  line,
  circle,
  text,
};
