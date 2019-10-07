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

var F7Tabs =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Tabs, _React$Component);

  function F7Tabs(props, context) {
    var _this;

    _classCallCheck(this, F7Tabs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Tabs).call(this, props, context));
    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Tabs, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var animated = props.animated,
          swipeable = props.swipeable,
          id = props.id,
          style = props.style,
          className = props.className,
          routable = props.routable;
      var classes = Utils.classNames(className, Mixins.colorClasses(props));
      var wrapClasses = Utils.classNames({
        'tabs-animated-wrap': animated,
        'tabs-swipeable-wrap': swipeable
      });
      var tabsClasses = Utils.classNames({
        tabs: true,
        'tabs-routable': routable
      });

      if (animated || swipeable) {
        return React.createElement('div', {
          id: id,
          style: style,
          className: Utils.classNames(wrapClasses, classes),
          ref: function ref(__reactNode) {
            _this2.__reactRefs['wrapEl'] = __reactNode;
          }
        }, React.createElement('div', {
          className: tabsClasses
        }, this.slots['default']));
      }

      return React.createElement('div', {
        id: id,
        style: style,
        className: Utils.classNames(tabsClasses, classes)
      }, this.slots['default']);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var _self$props = self.props,
          swipeable = _self$props.swipeable,
          swiperParams = _self$props.swiperParams;
      if (!swipeable || !swiperParams) return;
      var wrapEl = self.refs.wrapEl;
      if (!wrapEl) return;
      wrapEl.f7SwiperParams = swiperParams;
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

  return F7Tabs;
}(React.Component);

__reactComponentSetProps(F7Tabs, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  animated: Boolean,
  swipeable: Boolean,
  routable: Boolean,
  swiperParams: {
    type: Object,
    default: undefined
  }
}, Mixins.colorProps));

F7Tabs.displayName = 'f7-tabs';
export default F7Tabs;