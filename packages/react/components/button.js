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
import F7Icon from './icon';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Button =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Button, _React$Component);

  function F7Button(props, context) {
    var _this;

    _classCallCheck(this, F7Button);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Button).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onClick']);
    })();

    return _this;
  }

  _createClass(F7Button, [{
    key: "onClick",
    value: function onClick(event) {
      this.dispatchEvent('click', event);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var iconEl;
      var textEl;
      var props = self.props;
      var text = props.text,
          icon = props.icon,
          iconMaterial = props.iconMaterial,
          iconF7 = props.iconF7,
          iconMd = props.iconMd,
          iconIos = props.iconIos,
          iconAurora = props.iconAurora,
          iconColor = props.iconColor,
          iconSize = props.iconSize,
          id = props.id,
          style = props.style,
          type = props.type;

      if (text) {
        textEl = React.createElement('span', null, text);
      }

      if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
        iconEl = React.createElement(F7Icon, {
          material: iconMaterial,
          f7: iconF7,
          icon: icon,
          md: iconMd,
          ios: iconIos,
          aurora: iconAurora,
          color: iconColor,
          size: iconSize
        });
      }

      var ButtonTag = type === 'submit' || type === 'reset' || type === 'button' ? 'button' : 'a';
      return React.createElement(ButtonTag, Object.assign({
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: self.classes
      }, self.attrs), iconEl, textEl, this.slots['default']);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      var el = self.refs.el;
      el.removeEventListener('click', self.onClick);
      delete el.f7RouteProps;

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, function (newText) {
        var self = _this3;

        if (!newText && self.f7Tooltip) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
          return;
        }

        if (newText && !self.f7Tooltip && self.$f7) {
          self.f7Tooltip = self.$f7.tooltip.create({
            targetEl: self.refs.el,
            text: newText
          });
          return;
        }

        if (!newText || !self.f7Tooltip) return;
        self.f7Tooltip.setText(newText);
      });

      var self = this;
      var el = self.refs.el;
      var routeProps = self.props.routeProps;

      if (routeProps) {
        el.f7RouteProps = routeProps;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      el.addEventListener('click', self.onClick);
      var _self$props = self.props,
          tooltip = _self$props.tooltip,
          routeProps = _self$props.routeProps;

      if (routeProps) {
        el.f7RouteProps = routeProps;
      }

      if (!tooltip) return;
      self.$f7ready(function (f7) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: el,
          text: tooltip
        });
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
    key: "attrs",
    get: function get() {
      var self = this;
      var props = self.props;
      var href = props.href,
          target = props.target,
          tabLink = props.tabLink,
          type = props.type;
      var hrefComputed = href;
      if (href === true) hrefComputed = '#';
      if (href === false) hrefComputed = undefined;
      return Utils.extend({
        href: hrefComputed,
        target: target,
        type: type,
        'data-tab': Utils.isStringProp(tabLink) && tabLink || undefined
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    }
  }, {
    key: "classes",
    get: function get() {
      var self = this;
      var props = self.props;
      var tabLink = props.tabLink,
          tabLinkActive = props.tabLinkActive,
          round = props.round,
          roundIos = props.roundIos,
          roundAurora = props.roundAurora,
          roundMd = props.roundMd,
          fill = props.fill,
          fillIos = props.fillIos,
          fillAurora = props.fillAurora,
          fillMd = props.fillMd,
          large = props.large,
          largeIos = props.largeIos,
          largeAurora = props.largeAurora,
          largeMd = props.largeMd,
          small = props.small,
          smallIos = props.smallIos,
          smallAurora = props.smallAurora,
          smallMd = props.smallMd,
          raised = props.raised,
          raisedIos = props.raisedIos,
          raisedAurora = props.raisedAurora,
          raisedMd = props.raisedMd,
          active = props.active,
          outline = props.outline,
          outlineIos = props.outlineIos,
          outlineAurora = props.outlineAurora,
          outlineMd = props.outlineMd,
          disabled = props.disabled,
          className = props.className;
      return Utils.classNames(className, 'button', {
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,
        'button-round': round,
        'button-round-ios': roundIos,
        'button-round-aurora': roundAurora,
        'button-round-md': roundMd,
        'button-fill': fill,
        'button-fill-ios': fillIos,
        'button-fill-aurora': fillAurora,
        'button-fill-md': fillMd,
        'button-large': large,
        'button-large-ios': largeIos,
        'button-large-aurora': largeAurora,
        'button-large-md': largeMd,
        'button-small': small,
        'button-small-ios': smallIos,
        'button-small-aurora': smallAurora,
        'button-small-md': smallMd,
        'button-raised': raised,
        'button-raised-ios': raisedIos,
        'button-raised-aurora': raisedAurora,
        'button-raised-md': raisedMd,
        'button-active': active,
        'button-outline': outline,
        'button-outline-ios': outlineIos,
        'button-outline-aurora': outlineAurora,
        'button-outline-md': outlineMd,
        disabled: disabled
      }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
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

  return F7Button;
}(React.Component);

__reactComponentSetProps(F7Button, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  text: String,
  tabLink: [Boolean, String],
  tabLinkActive: Boolean,
  type: String,
  href: {
    type: [String, Boolean],
    default: '#'
  },
  target: String,
  round: Boolean,
  roundMd: Boolean,
  roundIos: Boolean,
  roundAurora: Boolean,
  fill: Boolean,
  fillMd: Boolean,
  fillIos: Boolean,
  fillAurora: Boolean,
  large: Boolean,
  largeMd: Boolean,
  largeIos: Boolean,
  largeAurora: Boolean,
  small: Boolean,
  smallMd: Boolean,
  smallIos: Boolean,
  smallAurora: Boolean,
  raised: Boolean,
  raisedMd: Boolean,
  raisedIos: Boolean,
  raisedAurora: Boolean,
  outline: Boolean,
  outlineMd: Boolean,
  outlineIos: Boolean,
  outlineAurora: Boolean,
  active: Boolean,
  disabled: Boolean,
  tooltip: String
}, Mixins.colorProps, {}, Mixins.linkIconProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps));

F7Button.displayName = 'f7-button';
export default F7Button;