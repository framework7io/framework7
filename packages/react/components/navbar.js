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
import F7NavLeft from './nav-left';
import F7NavTitle from './nav-title';
import F7NavRight from './nav-right';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Navbar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Navbar, _React$Component);

  function F7Navbar(props, context) {
    var _this;

    _classCallCheck(this, F7Navbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Navbar).call(this, props, context));
    _this.__reactRefs = {};

    _this.state = function () {
      var self = _assertThisInitialized(_this);

      var $f7 = self.$f7;

      if (!$f7) {
        self.$f7ready(function () {
          self.setState({
            _theme: self.$theme
          });
        });
      }

      return {
        _theme: $f7 ? self.$theme : null
      };
    }();

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onBackClick', 'onHide', 'onShow', 'onExpand', 'onCollapse']);
    })();

    return _this;
  }

  _createClass(F7Navbar, [{
    key: "onHide",
    value: function onHide(navbarEl) {
      if (this.eventTargetEl !== navbarEl) return;
      this.dispatchEvent('navbar:hide navbarHide');
    }
  }, {
    key: "onShow",
    value: function onShow(navbarEl) {
      if (this.eventTargetEl !== navbarEl) return;
      this.dispatchEvent('navbar:show navbarShow');
    }
  }, {
    key: "onExpand",
    value: function onExpand(navbarEl) {
      if (this.eventTargetEl !== navbarEl) return;
      this.dispatchEvent('navbar:expand navbarExpand');
    }
  }, {
    key: "onCollapse",
    value: function onCollapse(navbarEl) {
      if (this.eventTargetEl !== navbarEl) return;
      this.dispatchEvent('navbar:collapse navbarCollapse');
    }
  }, {
    key: "hide",
    value: function hide(animate) {
      var self = this;
      if (!self.$f7) return;
      self.$f7.navbar.hide(self.refs.el, animate);
    }
  }, {
    key: "show",
    value: function show(animate) {
      var self = this;
      if (!self.$f7) return;
      self.$f7.navbar.show(self.refs.el, animate);
    }
  }, {
    key: "size",
    value: function size() {
      var self = this;
      if (!self.$f7) return;
      self.$f7.navbar.size(self.refs.el);
    }
  }, {
    key: "onBackClick",
    value: function onBackClick(event) {
      this.dispatchEvent('back-click backClick click:back clickBack', event);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var backLink = props.backLink,
          backLinkUrl = props.backLinkUrl,
          backLinkForce = props.backLinkForce,
          backLinkShowText = props.backLinkShowText,
          sliding = props.sliding,
          title = props.title,
          subtitle = props.subtitle,
          innerClass = props.innerClass,
          innerClassName = props.innerClassName,
          className = props.className,
          id = props.id,
          style = props.style,
          hidden = props.hidden,
          noShadow = props.noShadow,
          noHairline = props.noHairline,
          large = props.large,
          largeTransparent = props.largeTransparent,
          titleLarge = props.titleLarge;
      var theme = self.state.theme;
      var leftEl;
      var titleEl;
      var rightEl;
      var titleLargeEl;
      var addLeftTitleClass = theme && theme.ios && self.$f7 && !self.$f7.params.navbar.iosCenterTitle;
      var addCenterTitleClass = theme && theme.md && self.$f7 && self.$f7.params.navbar.mdCenterTitle || theme && theme.aurora && self.$f7 && self.$f7.params.navbar.auroraCenterTitle;
      var slots = self.slots;
      var classes = Utils.classNames(className, 'navbar', {
        'navbar-hidden': hidden,
        'navbar-large': large,
        'navbar-large-transparent': largeTransparent
      }, Mixins.colorClasses(props));

      if (backLink || slots['nav-left'] || slots.left) {
        leftEl = React.createElement(F7NavLeft, {
          backLink: backLink,
          backLinkUrl: backLinkUrl,
          backLinkForce: backLinkForce,
          backLinkShowText: backLinkShowText,
          onBackClick: self.onBackClick
        }, slots['nav-left'], slots.left);
      }

      if (title || subtitle || slots.title) {
        titleEl = React.createElement(F7NavTitle, {
          title: title,
          subtitle: subtitle
        }, slots.title);
      }

      if (slots['nav-right'] || slots.right) {
        rightEl = React.createElement(F7NavRight, null, slots['nav-right'], slots.right);
      }

      var largeTitle = titleLarge;
      if (!largeTitle && large && title) largeTitle = title;

      if (largeTitle || slots['title-large']) {
        titleLargeEl = React.createElement('div', {
          className: 'title-large'
        }, React.createElement('div', {
          className: 'title-large-text'
        }, largeTitle || '', this.slots['title-large']));
      }

      var innerEl = React.createElement('div', {
        className: Utils.classNames('navbar-inner', innerClass, innerClassName, {
          sliding: sliding,
          'no-shadow': noShadow,
          'no-hairline': noHairline,
          'navbar-inner-left-title': addLeftTitleClass,
          'navbar-inner-centered-title': addCenterTitleClass
        })
      }, leftEl, titleEl, rightEl, titleLargeEl, this.slots['default']);
      return React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, React.createElement('div', {
        className: 'navbar-bg'
      }), this.slots['before-inner'], innerEl, this.slots['after-inner']);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      var el = self.refs.el;
      if (!el || !self.$f7) return;
      var f7 = self.$f7;
      f7.off('navbarShow', self.onShow);
      f7.off('navbarHide', self.onHide);
      f7.off('navbarCollapse', self.onCollapse);
      f7.off('navbarExpand', self.onExpand);
      self.eventTargetEl = null;
      delete self.eventTargetEl;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var self = this;
      if (!self.$f7) return;
      var el = self.refs.el;
      self.$f7.navbar.size(el);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      if (!el) return;
      self.$f7ready(function (f7) {
        self.eventTargetEl = el;
        f7.on('navbarShow', self.onShow);
        f7.on('navbarHide', self.onHide);
        f7.on('navbarCollapse', self.onCollapse);
        f7.on('navbarExpand', self.onExpand);
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

  return F7Navbar;
}(React.Component);

__reactComponentSetProps(F7Navbar, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  backLink: [Boolean, String],
  backLinkUrl: String,
  backLinkForce: Boolean,
  backLinkShowText: {
    type: Boolean,
    default: undefined
  },
  sliding: {
    type: Boolean,
    default: true
  },
  title: String,
  subtitle: String,
  hidden: Boolean,
  noShadow: Boolean,
  noHairline: Boolean,
  innerClass: String,
  innerClassName: String,
  large: Boolean,
  largeTransparent: Boolean,
  titleLarge: String
}, Mixins.colorProps));

F7Navbar.displayName = 'f7-navbar';
export default F7Navbar;