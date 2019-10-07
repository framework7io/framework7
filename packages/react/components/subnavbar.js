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

var F7Subnavbar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Subnavbar, _React$Component);

  function F7Subnavbar(props, context) {
    _classCallCheck(this, F7Subnavbar);

    return _possibleConstructorReturn(this, _getPrototypeOf(F7Subnavbar).call(this, props, context));
  }

  _createClass(F7Subnavbar, [{
    key: "render",
    value: function render() {
      var self = this;
      var props = self.props;
      var inner = props.inner,
          title = props.title,
          style = props.style,
          id = props.id,
          className = props.className,
          sliding = props.sliding;
      var classes = Utils.classNames(className, 'subnavbar', {
        sliding: sliding
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        className: classes,
        id: id,
        style: style
      }, inner ? React.createElement('div', {
        className: 'subnavbar-inner'
      }, title && React.createElement('div', {
        className: 'subnavbar-title'
      }, title), this.slots['default']) : this.slots['default']);
    }
  }, {
    key: "slots",
    get: function get() {
      return __reactComponentSlots(this.props);
    }
  }]);

  return F7Subnavbar;
}(React.Component);

__reactComponentSetProps(F7Subnavbar, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  sliding: Boolean,
  title: String,
  inner: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps));

F7Subnavbar.displayName = 'f7-subnavbar';
export default F7Subnavbar;