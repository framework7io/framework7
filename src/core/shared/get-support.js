import { getWindow, getDocument } from 'ssr-window';

let support;

function calcSupport() {
  const window = getWindow();
  const document = getDocument();

  return {
    touch: !!(
      'ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch)
    ),
  };
}

function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}

export { getSupport };
