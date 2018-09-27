export default function (component) {
  const self = component;
  let el;
  let child = self._reactInternalFiber.child;

  while (!el && child) {
    if (child.stateNode && child.stateNode instanceof window.HTMLElement) {
      el = child.stateNode;
    } else {
      child = child.child;
    }
  }

  return el;
}
