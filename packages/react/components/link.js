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
import F7Badge from './badge';
import F7Icon from './icon';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Link =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Link, _React$Component);

  function F7Link(props, context) {
    var _this;

    _classCallCheck(this, F7Link);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Link).call(this, props, context));
    _this.__reactRefs = {};

    _this.state = function () {
      return {
        isTabbarLabel: props.tabbarLabel
      };
    }();

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onClick']);
    })();

    return _this;
  }

  _createClass(F7Link, [{
    key: "onClick",
    value: function onClick(event) {
      this.dispatchEvent('click', event);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var text = props.text,
          badge = props.badge,
          badgeColor = props.badgeColor,
          iconOnly = props.iconOnly,
          iconBadge = props.iconBadge,
          icon = props.icon,
          iconColor = props.iconColor,
          iconSize = props.iconSize,
          iconMaterial = props.iconMaterial,
          iconF7 = props.iconF7,
          iconMd = props.iconMd,
          iconIos = props.iconIos,
          iconAurora = props.iconAurora,
          id = props.id,
          style = props.style;
      var defaultSlots = self.slots.default;
      var iconEl;
      var textEl;
      var badgeEl;
      var iconBadgeEl;

      if (text) {
        if (badge) badgeEl = React.createElement(F7Badge, {
          color: badgeColor
        }, badge);
        textEl = React.createElement('span', {
          className: self.state.isTabbarLabel ? 'tabbar-label' : ''
        }, text, badgeEl);
      }

      if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
        if (iconBadge) {
          iconBadgeEl = React.createElement(F7Badge, {
            color: badgeColor
          }, iconBadge);
        }

        iconEl = React.createElement(F7Icon, {
          material: iconMaterial,
          f7: iconF7,
          icon: icon,
          md: iconMd,
          ios: iconIos,
          aurora: iconAurora,
          color: iconColor,
          size: iconSize
        }, iconBadgeEl);
      }

      if (iconOnly || !text && defaultSlots && defaultSlots.length === 0 || !text && !defaultSlots) {
        self.iconOnlyComputed = true;
      } else {
        self.iconOnlyComputed = false;
      }

      return React.createElement('a', Object.assign({
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: self.classes
      }, self.attrs), iconEl, textEl, defaultSlots);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      var el = self.refs.el;
      el.removeEventListener('click', self.onClick);
      delete el.f7RouteProps;

      if (self.f7SmartSelect && self.f7SmartSelect.destroy) {
        self.f7SmartSelect.destroy();
      }

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
          tabbarLabel = _self$props.tabbarLabel,
          tabLink = _self$props.tabLink,
          tooltip = _self$props.tooltip,
          smartSelect = _self$props.smartSelect,
          smartSelectParams = _self$props.smartSelectParams,
          routeProps = _self$props.routeProps;
      var isTabbarLabel = false;

      if (tabbarLabel || (tabLink || tabLink === '') && self.$$(el).parents('.tabbar-labels').length) {
        isTabbarLabel = true;
      }

      self.setState({
        isTabbarLabel: isTabbarLabel
      });
      if (routeProps) el.f7RouteProps = routeProps;
      self.$f7ready(function (f7) {
        if (smartSelect) {
          var ssParams = Utils.extend({
            el: el
          }, smartSelectParams || {});
          self.f7SmartSelect = f7.smartSelect.create(ssParams);
        }

        if (tooltip) {
          self.f7Tooltip = f7.tooltip.create({
            targetEl: el,
            text: tooltip
          });
        }
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
          tabLink = props.tabLink;
      var hrefComputed = href;
      if (href === true) hrefComputed = '#';
      if (href === false) hrefComputed = undefined;
      return Utils.extend({
        href: hrefComputed,
        target: target,
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
          noLinkClass = props.noLinkClass,
          smartSelect = props.smartSelect,
          className = props.className;
      return Utils.classNames(className, {
        link: !(noLinkClass || self.state.isTabbarLabel),
        'icon-only': self.iconOnlyComputed,
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,
        'smart-select': smartSelect
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

  return F7Link;
}(React.Component);

__reactComponentSetProps(F7Link, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  noLinkClass: Boolean,
  text: String,
  tabLink: [Boolean, String],
  tabLinkActive: Boolean,
  tabbarLabel: Boolean,
  iconOnly: Boolean,
  badge: [String, Number],
  badgeColor: [String],
  iconBadge: [String, Number],
  href: {
    type: [String, Boolean],
    default: '#'
  },
  target: String,
  tooltip: String,
  smartSelect: Boolean,
  smartSelectParams: Object
}, Mixins.colorProps, {}, Mixins.linkIconProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps));

F7Link.displayName = 'f7-link';
export default F7Link;