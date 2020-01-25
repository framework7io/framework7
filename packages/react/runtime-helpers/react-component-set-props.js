import PropTypes from 'prop-types';

export default (component, props) => {
  const propType = (type) => {
    if (type === String) return PropTypes.string;
    if (type === Boolean) return PropTypes.bool;
    if (type === Function) return PropTypes.func;
    if (type === Number) return PropTypes.number;
    if (type === Object) return PropTypes.object;
    if (type === Array) return PropTypes.array;
    if (type === Symbol) return PropTypes.symbol;
    if (type.constructor === Function || type === Date) return PropTypes.instanceOf(type);
    return PropTypes.any;
  };

  component.propTypes = {};

  Object.keys(props).forEach((propName) => {
    const prop = props[propName];
    const required = typeof prop.required !== 'undefined';
    const type = prop.type || prop;

    if (Array.isArray(type)) {
      if (required) {
        component.propTypes[propName] = PropTypes.oneOfType(type.map(propType)).required;
      } else {
        component.propTypes[propName] = PropTypes.oneOfType(type.map(propType));
      }
    } else if (required) {
      component.propTypes[propName] = propType(type).required;
    } else {
      component.propTypes[propName] = propType(type);
    }

    if (
      (typeof prop.default !== 'undefined')
      || (('default' in prop) && prop.default === undefined)
    ) {
      const hasFunctionType = prop.type === Function
        || (Array.isArray(prop.type) && prop.type.indexOf(Function) >= 0);
      if (!component.defaultProps) component.defaultProps = {};
      if (typeof prop.default === 'function' && !hasFunctionType) {
        component.defaultProps[propName] = prop.default();
      } else {
        component.defaultProps[propName] = prop.default;
      }
    }
  });
};
