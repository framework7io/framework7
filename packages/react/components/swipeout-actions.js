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

var F7SwipeoutActions =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7SwipeoutActions, _React$Component);

  function F7SwipeoutActions(props, context) {
    _classCallCheck(this, F7SwipeoutActions);

    return _possibleConstructorReturn(this, _getPrototypeOf(F7SwipeoutActions).call(this, props, context));
  }

  _createClass(F7SwipeoutActions, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var left = props.left,
          right = props.right,
          side = props.side,
          className = props.className,
          id = props.id,
          style = props.style;
      var sideComputed = side;

      if (!sideComputed) {
        if (left) sideComputed = 'left';
        if (right) sideComputed = 'right';
      }

      var classes = Utils.classNames(className, "swipeout-actions-".concat(sideComputed), Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    }
  }, {
    key: "slots",
    get: function get() {
      return __reactComponentSlots(this.props);
    }
  }]);

  return F7SwipeoutActions;
}(React.Component);

__reactComponentSetProps(F7SwipeoutActions, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  left: Boolean,
  right: Boolean,
  side: String
}, Mixins.colorProps));

F7SwipeoutActions.displayName = 'f7-swipeout-actions';
export default F7SwipeoutActions;