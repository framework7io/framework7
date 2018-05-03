export default function (component, keys) {
  const props = {};
  keys.forEach((propKey) => {
    if (typeof component[propKey] !== 'undefined') props[propKey] = component[propKey];
  });

  const children = [];
  Object.keys(component.$slots).forEach((slotName) => {
    children.push(...component.$slots[slotName]);
  });
  props.children = children;

  return props;
}
