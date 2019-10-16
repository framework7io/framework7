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

var F7Toolbar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Toolbar, _React$Component);

  function F7Toolbar(props, context) {
    var _this;

    _classCallCheck(this, F7Toolbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Toolbar).call(this, props, context));
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
      Utils.bindMethods(_assertThisInitialized(_this), ['onHide', 'onShow']);
    })();

    return _this;
  }

  _createClass(F7Toolbar, [{
    key: "onHide",
    value: function onHide(navbarEl) {
      if (this.eventTargetEl !== navbarEl) return;
      this.dispatchEvent('toolbar:hide toolbarHide');
    }
  }, {
    key: "onShow",
    value: function onShow(navbarEl) {
      if (this.eventTargetEl !== navbarEl) return;
      this.dispatchEvent('toolbar:show toolbarShow');
    }
  }, {
    key: "hide",
    value: function hide(animate) {
      var self = this;
      if (!self.$f7) return;
      self.$f7.toolbar.hide(this.refs.el, animate);
    }
  }, {
    key: "show",
    value: function show(animate) {
      var self = this;
      if (!self.$f7) return;
      self.$f7.toolbar.show(this.refs.el, animate);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var id = props.id,
          style = props.style,
          className = props.className,
          inner = props.inner,
          tabbar = props.tabbar,
          labels = props.labels,
          scrollable = props.scrollable,
          hidden = props.hidden,
          noShadow = props.noShadow,
          noHairline = props.noHairline,
          noBorder = props.noBorder,
          topMd = props.topMd,
          topIos = props.topIos,
          topAurora = props.topAurora,
          top = props.top,
          bottomMd = props.bottomMd,
          bottomIos = props.bottomIos,
          bottomAurora = props.bottomAurora,
          bottom = props.bottom,
          position = props.position;
      var theme = self.state._theme;
      var classes = Utils.classNames(className, 'toolbar', {
        tabbar: tabbar,
        'toolbar-bottom': theme && theme.md && bottomMd || theme && theme.ios && bottomIos || theme && theme.aurora && bottomAurora || bottom || position === 'bottom',
        'toolbar-top': theme && theme.md && topMd || theme && theme.ios && topIos || theme && theme.aurora && topAurora || top || position === 'top',
        'tabbar-labels': labels,
        'tabbar-scrollable': scrollable,
        'toolbar-hidden': hidden,
        'no-shadow': noShadow,
        'no-hairline': noHairline || noBorder
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        className: classes
      }, this.slots['before-inner'], inner ? React.createElement('div', {
        className: 'toolbar-inner'
      }, this.slots['default']) : this.slots['default'], this.slots['after-inner']);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      var el = self.refs.el;
      if (!el || !self.$f7) return;
      var f7 = self.$f7;
      f7.off('toolbarShow', self.onShow);
      f7.off('toolbarHide', self.onHide);
      self.eventTargetEl = null;
      delete self.eventTargetEl;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      if (!el) return;
      self.$f7ready(function (f7) {
        self.eventTargetEl = el;
        if (self.props.tabbar) f7.toolbar.setHighlight(el);
        f7.on('toolbarShow', self.onShow);
        f7.on('toolbarHide', self.onHide);
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var self = this;

      if (self.props.tabbar && self.$f7) {
        self.$f7.toolbar.setHighlight(self.refs.el);
      }
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

  return F7Toolbar;
}(React.Component);

__reactComponentSetProps(F7Toolbar, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  tabbar: Boolean,
  labels: Boolean,
  scrollable: Boolean,
  hidden: Boolean,
  noShadow: Boolean,
  noHairline: Boolean,
  noBorder: Boolean,
  position: {
    type: String,
    default: undefined
  },
  topMd: {
    type: Boolean,
    default: undefined
  },
  topIos: {
    type: Boolean,
    default: undefined
  },
  topAurora: {
    type: Boolean,
    default: undefined
  },
  top: {
    type: Boolean,
    default: undefined
  },
  bottomMd: {
    type: Boolean,
    default: undefined
  },
  bottomIos: {
    type: Boolean,
    default: undefined
  },
  bottomAurora: {
    type: Boolean,
    default: undefined
  },
  bottom: {
    type: Boolean,
    default: undefined
  },
  inner: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps));

F7Toolbar.displayName = 'f7-toolbar';
export default F7Toolbar;