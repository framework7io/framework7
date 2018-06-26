'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (component, props) {
  var propType = function propType(type) {
    if (type === String) return _propTypes2.default.string;
    if (type === Boolean) return _propTypes2.default.bool;
    if (type === Function) return _propTypes2.default.func;
    if (type === Number) return _propTypes2.default.number;
    if (type === Object) return _propTypes2.default.object;
    if (type === Array) return _propTypes2.default.array;
    if (type === Symbol) return _propTypes2.default.symbol;
    if (type.constructor === Function) return _propTypes2.default.instanceOf(type);
    return _propTypes2.default.any;
  };

  component.propTypes = {};

  Object.keys(props).forEach(function (propName) {
    var prop = props[propName];
    var required = typeof prop.required !== 'undefined';
    var type = prop.type || prop;

    if (Array.isArray(type)) {
      if (required) {
        component.propTypes[propName] = _propTypes2.default.oneOfType(type.map(propType)).required;
      } else {
        component.propTypes[propName] = _propTypes2.default.oneOfType(type.map(propType));
      }
    } else if (required) {
      component.propTypes[propName] = propType(type).required;
    } else {
      component.propTypes[propName] = propType(type);
    }

    if (typeof prop.default !== 'undefined') {
      var hasFunctionType = prop.type === Function || Array.isArray(prop.type) && prop.type.indexOf(Function) >= 0;
      if (!component.defaultProps) component.defaultProps = {};
      if (typeof prop.default === 'function' && !hasFunctionType) {
        component.defaultProps[propName] = prop.default();
      } else {
        component.defaultProps[propName] = prop.default;
      }
    }
  });
};