export default function (component) {
  const self = component;
  const slots = {};
  const children = self.props.children;

  if (!children || children.length === 0) {
    return slots;
  }

  function addChildToSlot(name, child) {
    if (!slots[name]) slots[name] = [];
    slots[name].push(child);
  }

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (!child) return;
      const slotName = (child.props && child.props.slot) || 'default';
      addChildToSlot(slotName, child);
    });
  } else {
    let slotName = 'default';
    if (children.props && children.props.slot) slotName = children.props.slot;
    addChildToSlot(slotName, children);
  }

  return slots;
}
