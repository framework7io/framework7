function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Appbar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Appbar, _React$Component);

  function F7Appbar(props, context) {
    var _this;

    _classCallCheck(this, F7Appbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Appbar).call(this, props, context));
    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Appbar, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var inner = props.inner,
          innerClass = props.innerClass,
          innerClassName = props.innerClassName,
          className = props.className,
          id = props.id,
          style = props.style,
          noShadow = props.noShadow,
          noHairline = props.noHairline;
      var innerEl;

      if (inner) {
        innerEl = React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['inner'] = __reactNode;
          },
          className: Utils.classNames('appbar-inner', innerClass, innerClassName)
        }, this.slots['default']);
      }

      var classes = Utils.classNames(className, 'appbar', {
        'no-shadow': noShadow,
        'no-hairline': noHairline
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, this.slots['before-inner'], innerEl || self.slots.default, this.slots['after-inner']);
    }
  }, {
    key: "slots",
    get: function get() {
      return __reactComponentSlots(this.props);
    }
  }, {
    key: "refs",
    get: function get() {
      return this.__reactRefs;
    },
    set: function set(refs) {}
  }]);

  return F7Appbar;
}(React.Component);

__reactComponentSetProps(F7Appbar, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  noShadow: Boolean,
  noHairline: Boolean,
  inner: {
    type: Boolean,
    default: true
  },
  innerClass: String,
  innerClassName: String
}, Mixins.colorProps));

F7Appbar.displayName = 'f7-appbar';
export default F7Appbar;