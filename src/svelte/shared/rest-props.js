function restProps(rest = {}) {
  const props = {};
  Object.keys(rest).forEach((key) => {
    if (key.indexOf('on') !== 0) {
      props[key] = rest[key];
    }
  });
  return props;
}

export default restProps;
