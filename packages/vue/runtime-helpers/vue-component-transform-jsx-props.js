export default (props) => {
  if (!props) return props;
  const nestedPropsKeys = ('style class domProps slot key ref attrs on props').split(' ');
  Object.keys(props).forEach((key) => {
    if (key === 'className') {
      props.class = props.className;
      delete props.className;
      return;
    } else if (key === 'dangerouslySetInnerHTML') {
      if (!props.domProps) props.domProps = {};
      props.domProps.innerHTML = props[key];
      if (props.domProps.innerHTML && props.domProps.innerHTML.__html) {
        props.domProps.innerHTML = props.domProps.innerHTML.__html;
      }
      delete props.dangerouslySetInnerHTML;
      return;
    } else if (key.match(/^on?([A-Z])/)) {
      if (!props.on) props.on = {};
      const newKey = key.replace(/(^on?)([A-Z])/, (found, first, second) => second.toLowerCase());
      props.on[newKey] = props[key];
      delete props[key];
      return;
    }
    if (nestedPropsKeys.indexOf(key) >= 0) {
      return;
    }
    if (!props.attrs) {
      props.attrs = {};
    }
    if (!props.attrs[key]) {
      props.attrs[key] = props[key];
      delete props[key];
    }
  });

  return props;
};
