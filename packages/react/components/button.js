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

var F7Button = function (_React$Component) {
  _inherits(F7Button, _React$Component);

  function F7Button(props, context) {
    _classCallCheck(this, F7Button);

    var _this = _possibleConstructorReturn(this, (F7Button.__proto__ || Object.getPrototypeOf(F7Button)).call(this, props, context));

    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Button, [{
    key: 'onClick',
    value: function onClick(event) {
      this.dispatchEvent('click', event);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var iconEl = void 0;
      var textEl = void 0;
      var props = self.props;
      var text = props.text,
          icon = props.icon,
          iconMaterial = props.iconMaterial,
          iconIon = props.iconIon,
          iconFa = props.iconFa,
          iconF7 = props.iconF7,
          iconIfMd = props.iconIfMd,
          iconIfIos = props.iconIfIos,
          iconMd = props.iconMd,
          iconIos = props.iconIos,
          iconColor = props.iconColor,
          iconSize = props.iconSize,
          id = props.id,
          style = props.style;


      if (text) {
        textEl = _react2.default.createElement('span', null, text);
      }

      var mdThemeIcon = iconIfMd || iconMd;
      var iosThemeIcon = iconIfIos || iconIos;

      if (icon || iconMaterial || iconIon || iconFa || iconF7 || mdThemeIcon || iosThemeIcon) {
        iconEl = _react2.default.createElement(_icon2.default, {
          material: iconMaterial,
          ion: iconIon,
          fa: iconFa,
          f7: iconF7,
          icon: icon,
          md: mdThemeIcon,
          ios: iosThemeIcon,
          color: iconColor,
          size: iconSize
        });
      }

      return _react2.default.createElement('a', Object.assign({
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: self.classes,
        onClick: self.onClick.bind(self)
      }, self.attrs), iconEl, textEl, this.slots['default']);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;

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
      var tooltip = self.props.tooltip;

      if (!tooltip) return;
      self.$f7ready(function (f7) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: self.refs.el,
          text: tooltip
        });
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
          round = props.round,
          roundIos = props.roundIos,
          roundMd = props.roundMd,
          fill = props.fill,
          fillIos = props.fillIos,
          fillMd = props.fillMd,
          big = props.big,
          bigIos = props.bigIos,
          bigMd = props.bigMd,
          small = props.small,
          smallIos = props.smallIos,
          smallMd = props.smallMd,
          raised = props.raised,
          active = props.active,
          outline = props.outline,
          disabled = props.disabled,
          className = props.className;

      return _utils2.default.classNames(className, 'button', {
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,
        'no-fastclick': noFastclick || noFastClick,
        'button-round': round,
        'button-round-ios': roundIos,
        'button-round-md': roundMd,
        'button-fill': fill,
        'button-fill-ios': fillIos,
        'button-fill-md': fillMd,
        'button-big': big,
        'button-big-ios': bigIos,
        'button-big-md': bigMd,
        'button-small': small,
        'button-small-ios': smallIos,
        'button-small-md': smallMd,
        'button-raised': raised,
        'button-active': active,
        'button-outline': outline,
        disabled: disabled
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

  return F7Button;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Button, Object.assign({
  id: [String, Number],
  noFastclick: Boolean,
  noFastClick: Boolean,
  text: String,
  tabLink: [Boolean, String],
  tabLinkActive: Boolean,
  href: {
    type: [String, Boolean],
    default: '#'
  },
  target: String,
  round: Boolean,
  roundMd: Boolean,
  roundIos: Boolean,
  fill: Boolean,
  fillMd: Boolean,
  fillIos: Boolean,
  big: Boolean,
  bigMd: Boolean,
  bigIos: Boolean,
  small: Boolean,
  smallMd: Boolean,
  smallIos: Boolean,
  raised: Boolean,
  outline: Boolean,
  active: Boolean,
  disabled: Boolean,
  tooltip: String
}, _mixins2.default.colorProps, _mixins2.default.linkIconProps, _mixins2.default.linkRouterProps, _mixins2.default.linkActionsProps));

exports.default = F7Button;