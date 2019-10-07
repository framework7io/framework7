function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Block =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Block, _React$Component);

  function F7Block(props, context) {
    var _this;

    _classCallCheck(this, F7Block);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Block).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onTabShow', 'onTabHide']);
    })();

    return _this;
  }

  _createClass(F7Block, [{
    key: "onTabShow",
    value: function onTabShow(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tabShow tab:show');
    }
  }, {
    key: "onTabHide",
    value: function onTabHide(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tabHide tab:hide');
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var className = props.className,
          inset = props.inset,
          xsmallInset = props.xsmallInset,
          smallInset = props.smallInset,
          mediumInset = props.mediumInset,
          largeInset = props.largeInset,
          xlargeInset = props.xlargeInset,
          strong = props.strong,
          accordionList = props.accordionList,
          tabs = props.tabs,
          tab = props.tab,
          tabActive = props.tabActive,
          noHairlines = props.noHairlines,
          noHairlinesIos = props.noHairlinesIos,
          noHairlinesMd = props.noHairlinesMd,
          noHairlinesAurora = props.noHairlinesAurora,
          id = props.id,
          style = props.style;
      var classes = Utils.classNames(className, 'block', {
        inset: inset,
        'xsmall-inset': xsmallInset,
        'small-inset': smallInset,
        'medium-inset': mediumInset,
        'large-inset': largeInset,
        'xlarge-inset': xlargeInset,
        'block-strong': strong,
        'accordion-list': accordionList,
        tabs: tabs,
        tab: tab,
        'tab-active': tabActive,
        'no-hairlines': noHairlines,
        'no-hairlines-md': noHairlinesMd,
        'no-hairlines-ios': noHairlinesIos,
        'no-hairlines-aurora': noHairlinesAurora
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes,
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        }
      }, this.slots['default']);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var el = this.refs.el;
      if (!el || !this.$f7) return;
      this.$f7.off('tabShow', this.onTabShow);
      this.$f7.off('tabHide', this.onTabHide);
      delete this.eventTargetEl;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      if (!el) return;
      self.eventTargetEl = el;
      self.$f7ready(function (f7) {
        f7.on('tabShow', self.onTabShow);
        f7.on('tabHide', self.onTabHide);
      });
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
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

  return F7Block;
}(React.Component);

__reactComponentSetProps(F7Block, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  inset: Boolean,
  xsmallInset: Boolean,
  smallInset: Boolean,
  mediumInset: Boolean,
  largeInset: Boolean,
  xlargeInset: Boolean,
  strong: Boolean,
  tabs: Boolean,
  tab: Boolean,
  tabActive: Boolean,
  accordionList: Boolean,
  noHairlines: Boolean,
  noHairlinesMd: Boolean,
  noHairlinesIos: Boolean,
  noHairlinesAurora: Boolean
}, Mixins.colorProps));

F7Block.displayName = 'f7-block';
export default F7Block;