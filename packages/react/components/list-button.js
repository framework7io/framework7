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

var F7ListButton = function (_React$Component) {
  _inherits(F7ListButton, _React$Component);

  function F7ListButton(props, context) {
    _classCallCheck(this, F7ListButton);

    return _possibleConstructorReturn(this, (F7ListButton.__proto__ || Object.getPrototypeOf(F7ListButton)).call(this, props, context));
  }

  _createClass(F7ListButton, [{
    key: 'onClick',
    value: function onClick(event) {
      this.dispatchEvent('click', event);
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      var props = this.props;
      var className = props.className,
          id = props.id,
          style = props.style,
          title = props.title,
          text = props.text;

      return _react2.default.createElement('li', {
        id: id,
        style: style,
        className: className
      }, _react2.default.createElement('a', Object.assign({
        className: self.classes
      }, self.attrs, {
        onClick: self.onClick.bind(self)
      }), this.slots['default'], !this.slots.default && (title || text)));
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
    key: 'attrs',
    get: function get() {
      var self = this;
      var props = self.props;
      var link = props.link,
          href = props.href,
          target = props.target,
          tabLink = props.tabLink;

      return _utils2.default.extend({
        href: typeof link === 'boolean' && typeof href === 'boolean' ? '#' : link || href,
        target: target,
        'data-tab': _utils2.default.isStringProp(tabLink) && tabLink
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
          tabLinkActive = props.tabLinkActive;

      return _utils2.default.classNames({
        'item-link': true,
        'list-button': true,
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,
        'no-fastclick': noFastclick || noFastClick
      }, _mixins2.default.colorClasses(props), _mixins2.default.linkRouterClasses(props), _mixins2.default.linkActionsClasses(props));
    }
  }, {
    key: 'slots',
    get: function get() {
      return (0, _reactComponentSlots2.default)(this.props);
    }
  }]);

  return F7ListButton;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7ListButton, Object.assign({
  id: [String, Number],
  noFastclick: Boolean,
  noFastClick: Boolean,
  title: [String, Number],
  text: [String, Number],
  tabLink: [Boolean, String],
  tabLinkActive: Boolean,
  link: [Boolean, String],
  href: [Boolean, String],
  target: String
}, _mixins2.default.colorProps, _mixins2.default.linkRouterProps, _mixins2.default.linkActionsProps));

exports.default = F7ListButton;