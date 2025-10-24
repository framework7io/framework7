export const setRef = (ref, el, extraRefs = {}) => {
  const res = { el, ...extraRefs };
  if (typeof ref === 'function') {
    ref(res);
  } else if (ref) {
    ref.current = res;
  }
};
