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
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7MenuItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7MenuItem, _React$Component);

  function F7MenuItem(props, context) {
    var _this;

    _classCallCheck(this, F7MenuItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7MenuItem).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onClick', 'onOpened', 'onClosed']);
    })();

    return _this;
  }

  _createClass(F7MenuItem, [{
    key: "onClick",
    value: function onClick(e) {
      this.dispatchEvent('click', e);
    }
  }, {
    key: "onOpened",
    value: function onOpened(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('menuOpened menu:opened', el);
    }
  }, {
    key: "onClosed",
    value: function onClosed(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('menuClosed menu:closed', el);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var id = props.id,
          className = props.className,
          style = props.style,
          link = props.link,
          href = props.href,
          text = props.text,
          dropdown = props.dropdown,
          iconOnly = props.iconOnly,
          icon = props.icon,
          iconColor = props.iconColor,
          iconSize = props.iconSize,
          iconMaterial = props.iconMaterial,
          iconF7 = props.iconF7,
          iconMd = props.iconMd,
          iconIos = props.iconIos,
          iconAurora = props.iconAurora;
      var slots = self.slots;
      var iconEl;
      var iconOnlyComputed;

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

      if (iconOnly || !text && slots.text && slots.text.length === 0 || !text && !slots.text) {
        iconOnlyComputed = true;
      } else {
        iconOnlyComputed = false;
      }

      var isLink = link || href || href === '';
      var Tag = isLink ? 'a' : 'div';
      var isDropdown = dropdown || dropdown === '';
      var classes = Utils.classNames({
        'menu-item': true,
        'menu-item-dropdown': isDropdown,
        'icon-only': iconOnlyComputed
      }, className, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
      return React.createElement(Tag, Object.assign({
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        className: classes,
        id: id,
        style: style
      }, self.attrs), (text || slots.text && slots.text.length || iconEl) && React.createElement('div', {
        className: 'menu-item-content'
      }, text, iconEl, this.slots['text']), this.slots['default']);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      var el = self.refs.el;
      if (!el || !self.$f7) return;
      el.removeEventListener('click', self.onClick);
      self.$f7.off('menuOpened', self.onOpened);
      self.$f7.off('menuClosed', self.onOpened);
      self.eventTargetEl = null;
      delete el.f7RouteProps;
      delete self.eventTargetEl;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var self = this;
      var el = self.refs.el;
      if (!el) return;
      var routeProps = self.props.routeProps;
      if (routeProps) el.f7RouteProps = routeProps;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      if (!el) return;
      self.eventTargetEl = el;
      el.addEventListener('click', self.onClick);
      var routeProps = self.props.routeProps;
      if (routeProps) el.f7RouteProps = routeProps;
      self.$f7ready(function (f7) {
        f7.on('menuOpened', self.onOpened);
        f7.on('menuClosed', self.onClosed);
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
          link = props.link,
          target = props.target;
      var hrefComputed = href;
      if (typeof hrefComputed === 'undefined' && link) hrefComputed = '#';
      return Utils.extend({
        href: hrefComputed,
        target: target
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
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

  return F7MenuItem;
}(React.Component);

__reactComponentSetProps(F7MenuItem, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  text: String,
  iconOnly: Boolean,
  href: String,
  link: Boolean,
  target: String,
  dropdown: Boolean
}, Mixins.colorProps, {}, Mixins.linkIconProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps));

F7MenuItem.displayName = 'f7-menu-item';
export default F7MenuItem;