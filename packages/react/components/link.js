'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _mixins = require('../utils/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _badge = require('./badge');

var _badge2 = _interopRequireDefault(_badge);

var _icon = require('./icon');

var _icon2 = _interopRequireDefault(_icon);

var _reactComponentWatch = require('../runtime-helpers/react-component-watch.js');

var _reactComponentWatch2 = _interopRequireDefault(_reactComponentWatch);

var _reactComponentDispatchEvent = require('../runtime-helpers/react-component-dispatch-event.js');

var _reactComponentDispatchEvent2 = _interopRequireDefault(_reactComponentDispatchEvent);

var _reactComponentSlots = require('../runtime-helpers/react-component-slots.js');

var _reactComponentSlots2 = _interopRequireDefault(_reactComponentSlots);

var _reactComponentSetProps = require('../runtime-helpers/react-component-set-props.js');

var _reactComponentSetProps2 = _interopRequireDefault(_reactComponentSetProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var F7Link = function (_React$Component) {
  _inherits(F7Link, _React$Component);

  function F7Link(props, context) {
    _classCallCheck(this, F7Link);

    var _this = _possibleConstructorReturn(this, (F7Link.__proto__ || Object.getPrototypeOf(F7Link)).call(this, props, context));

    _this.__reactRefs = {};

    _this.state = function () {
      return {
        isTabbarLabel: props.tabbarLabel
      };
    }();
    return _this;
  }

  _createClass(F7Link, [{
    key: 'onClick',
    value: function onClick(event) {
      var self = this;

      if (self.props.smartSelect && self.f7SmartSelect) {
        self.f7SmartSelect.open();
      }

      this.dispatchEvent('click', event);
    }
  }, {
    key: 'render',
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
          iconIon = props.iconIon,
          iconFa = props.iconFa,
          iconF7 = props.iconF7,
          iconIfMd = props.iconIfMd,
          iconIfIos = props.iconIfIos,
          iconMd = props.iconMd,
          iconIos = props.iconIos,
          id = props.id,
          style = props.style;

      var defaultSlots = self.slots.default;
      var iconEl = void 0;
      var textEl = void 0;
      var badgeEl = void 0;
      var iconBadgeEl = void 0;

      if (text) {
        if (badge) badgeEl = _react2.default.createElement(_badge2.default, {
          color: badgeColor
        }, badge);
        textEl = _react2.default.createElement('span', {
          className: self.state.isTabbarLabel ? 'tabbar-label' : ''
        }, text, badgeEl);
      }

      var mdThemeIcon = iconIfMd || iconMd;
      var iosThemeIcon = iconIfIos || iconIos;

      if (icon || iconMaterial || iconIon || iconFa || iconF7 || mdThemeIcon || iosThemeIcon) {
        if (iconBadge) {
          iconBadgeEl = _react2.default.createElement(_badge2.default, {
            color: badgeColor
          }, iconBadge);
        }

        iconEl = _react2.default.createElement(_icon2.default, {
          material: iconMaterial,
          f7: iconF7,
          fa: iconFa,
          ion: iconIon,
          icon: icon,
          md: mdThemeIcon,
          ios: iosThemeIcon,
          color: iconColor,
          size: iconSize
        }, iconBadgeEl);
      }

      if (iconOnly || !text && defaultSlots && defaultSlots.length === 0 || !text && !defaultSlots) {
        self.iconOnlyComputed = true;
      } else {
        self.iconOnlyComputed = false;
      }

      return _react2.default.createElement('a', Object.assign({
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: self.classes,
        onClick: self.onClick.bind(self)
      }, self.attrs), iconEl, textEl, defaultSlots);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;

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
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      var _self$props = self.props,
          tabbarLabel = _self$props.tabbarLabel,
          tabLink = _self$props.tabLink,
          tooltip = _self$props.tooltip,
          smartSelect = _self$props.smartSelect,
          smartSelectParams = _self$props.smartSelectParams;

      var isTabbarLabel = false;

      if (tabbarLabel || (tabLink || tabLink === '') && self.$$(el).parents('.tabbar-labels').length) {
        isTabbarLabel = true;
      }

      self.setState({
        isTabbarLabel: isTabbarLabel
      });
      self.$f7ready(function (f7) {
        if (smartSelect) {
          var ssParams = _utils2.default.extend({
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
    key: 'dispatchEvent',
    value: function dispatchEvent(events) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return _reactComponentDispatchEvent2.default.apply(undefined, [this, events].concat(args));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      (0, _reactComponentWatch2.default)(this, 'props.tooltip', prevProps, prevState, function (newText) {
        var self = _this3;
        if (!newText || !self.f7Tooltip) return;
        self.f7Tooltip.setText(newText);
      });
    }
  }, {
    key: 'attrs',
    get: function get() {
      var self = this;
      var props = self.props;
      var href = props.href,
          target = props.target,
          tabLink = props.tabLink;

      var hrefComputed = href;
      if (href === true) hrefComputed = '#';
      if (href === false) hrefComputed = undefined;
      return _utils2.default.extend({
        href: hrefComputed,
        target: target,
        'data-tab': _utils2.default.isStringProp(tabLink) && tabLink || undefined
      }, _mixins2.default.linkRouterAttrs(props), _mixins2.default.linkActionsAttrs(props));
    }
  }, {
    key: 'classes',
    get: function get() {
      var self = this;
      var props = self.props;
      var noFastclick = props.noFastclick,
          noFastClick = props.noFastClick,
          tabLink = props.tabLink,
          tabLinkActive = props.tabLinkActive,
          noLinkClass = props.noLinkClass,
          smartSelect = props.smartSelect,
          className = props.className;

      return _utils2.default.classNames(className, {
        link: !(noLinkClass || self.state.isTabbarLabel),
        'icon-only': self.iconOnlyComputed,
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,
        'no-fastclick': noFastclick || noFastClick,
        'smart-select': smartSelect
      }, _mixins2.default.colorClasses(props), _mixins2.default.linkRouterClasses(props), _mixins2.default.linkActionsClasses(props));
    }
  }, {
    key: 'slots',
    get: function get() {
      return (0, _reactComponentSlots2.default)(this.props);
    }
  }, {
    key: 'refs',
    get: function get() {
      return this.__reactRefs;
    },
    set: function set(refs) {}
  }]);

  return F7Link;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Link, Object.assign({
  id: [String, Number],
  noLinkClass: Boolean,
  noFastClick: Boolean,
  noFastclick: Boolean,
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
}, _mixins2.default.colorProps, _mixins2.default.linkIconProps, _mixins2.default.linkRouterProps, _mixins2.default.linkActionsProps));

exports.default = F7Link;