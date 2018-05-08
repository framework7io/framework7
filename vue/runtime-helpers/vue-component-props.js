export default function (component) {
  const props = {};
  const $props = component.$props;
  Object.keys($props).forEach((propKey) => {
    if (typeof $props[propKey] !== 'undefined') props[propKey] = $props[propKey];
  });

  const children = [];
  Object.keys(component.$slots).forEach((slotName) => {
    children.push(...component.$slots[slotName]);
  });
  props.children = children;

  return props;
}
