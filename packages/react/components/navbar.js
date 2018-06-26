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

var _navLeft = require('./nav-left');

var _navLeft2 = _interopRequireDefault(_navLeft);

var _navTitle = require('./nav-title');

var _navTitle2 = _interopRequireDefault(_navTitle);

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

var F7Navbar = function (_React$Component) {
  _inherits(F7Navbar, _React$Component);

  function F7Navbar(props, context) {
    _classCallCheck(this, F7Navbar);

    var _this = _possibleConstructorReturn(this, (F7Navbar.__proto__ || Object.getPrototypeOf(F7Navbar)).call(this, props, context));

    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Navbar, [{
    key: 'hide',
    value: function hide(animate) {
      var self = this;
      if (!self.$f7) return;
      self.$f7.navbar.hide(self.refs.el, animate);
    }
  }, {
    key: 'show',
    value: function show(animate) {
      var self = this;
      if (!self.$f7) return;
      self.$f7.navbar.show(self.refs.el, animate);
    }
  }, {
    key: 'size',
    value: function size() {
      var self = this;
      if (!self.$f7) return;
      self.$f7.navbar.size(self.refs.el);
    }
  }, {
    key: 'onBackClick',
    value: function onBackClick(e) {
      this.dispatchEvent('back-click backClick click:back clickBack', e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var backLink = props.backLink,
          backLinkUrl = props.backLinkUrl,
          backLinkForce = props.backLinkForce,
          sliding = props.sliding,
          title = props.title,
          subtitle = props.subtitle,
          inner = props.inner,
          className = props.className,
          id = props.id,
          style = props.style,
          hidden = props.hidden,
          noShadow = props.noShadow,
          noHairline = props.noHairline;

      var innerEl = void 0;
      var leftEl = void 0;
      var titleEl = void 0;

      if (inner) {
        if (backLink) {
          leftEl = _react2.default.createElement(_navLeft2.default, {
            backLink: backLink,
            backLinkUrl: backLinkUrl,
            backLinkForce: backLinkForce,
            onBackClick: self.onBackClick.bind(self)
          });
        }

        if (title || subtitle) {
          titleEl = _react2.default.createElement(_navTitle2.default, {
            title: title,
            subtitle: subtitle
          });
        }

        innerEl = _react2.default.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['inner'] = __reactNode;
          },
          className: _utils2.default.classNames('navbar-inner', {
            sliding: sliding
          })
        }, leftEl, titleEl, this.slots['default']);
      }

      var classes = _utils2.default.classNames(className, 'navbar', {
        'navbar-hidden': hidden,
        'no-shadow': noShadow,
        'no-hairline': noHairline
      }, _mixins2.default.colorClasses(props));
      return _react2.default.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, this.slots['before-inner'], innerEl, this.slots['after-inner']);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var self = this;
      if (!self.$f7) return;
      var el = self.refs.el;

      if (el && el.children && el.children.length) {
        self.$f7.navbar.size(el);
      } else if (self.refs.inner) {
        self.$f7.navbar.size(self.refs.inner);
      }
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

  return F7Navbar;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Navbar, Object.assign({
  id: [String, Number],
  backLink: [Boolean, String],
  backLinkUrl: String,
  backLinkForce: Boolean,
  sliding: {
    type: Boolean,
    default: true
  },
  title: String,
  subtitle: String,
  hidden: Boolean,
  noShadow: Boolean,
  noHairline: Boolean,
  inner: {
    type: Boolean,
    default: true
  }
}, _mixins2.default.colorProps));

exports.default = F7Navbar;