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
import f7 from '../utils/f7';
import RoutableModals from './routable-modals';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7App, _React$Component);

  function F7App(props, context) {
    var _this;

    _classCallCheck(this, F7App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7App).call(this, props, context));
    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7App, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var id = props.id,
          style = props.style,
          className = props.className;
      var classes = Utils.classNames(className, 'framework7-root', Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id || 'framework7-root',
        style: style,
        className: classes
      }, this.slots['default'], React.createElement(RoutableModals, null));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var _self$props = self.props,
          _self$props$params = _self$props.params,
          params = _self$props$params === void 0 ? {} : _self$props$params,
          routes = _self$props.routes;
      var el = self.refs.el;
      var parentEl = el.parentNode;

      if (parentEl && parentEl !== document.body && parentEl.parentNode === document.body) {
        parentEl.style.height = '100%';
      }

      f7.init(el, params, routes);
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

  return F7App;
}(React.Component);

__reactComponentSetProps(F7App, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  params: Object,
  routes: Array
}, Mixins.colorProps));

F7App.displayName = 'f7-app';
export default F7App;