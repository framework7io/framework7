'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _mixins = require('../utils/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _cardHeader = require('./card-header');

var _cardHeader2 = _interopRequireDefault(_cardHeader);

var _cardContent = require('./card-content');

var _cardContent2 = _interopRequireDefault(_cardContent);

var _cardFooter = require('./card-footer');

var _cardFooter2 = _interopRequireDefault(_cardFooter);

var _reactComponentSlots = require('../runtime-helpers/react-component-slots.js');

var _reactComponentSlots2 = _interopRequireDefault(_reactComponentSlots);

var _reactComponentSetProps = require('../runtime-helpers/react-component-set-props.js');

var _reactComponentSetProps2 = _interopRequireDefault(_reactComponentSetProps);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var F7Card = function (_React$Component) {
  _inherits(F7Card, _React$Component);

  function F7Card(props, context) {
    _classCallCheck(this, F7Card);

    return _possibleConstructorReturn(this, (F7Card.__proto__ || Object.getPrototypeOf(F7Card)).call(this, props, context));
  }

  _createClass(F7Card, [{
    key: 'render',
    value: function render() {
      var self = this;
      var props = self.props;
      var className = props.className,
          id = props.id,
          style = props.style,
          title = props.title,
          content = props.content,
          footer = props.footer,
          padding = props.padding,
          outline = props.outline;

      var headerEl = void 0;
      var contentEl = void 0;
      var footerEl = void 0;
      var classes = _utils2.default.classNames(className, 'card', {
        'card-outline': outline
      }, _mixins2.default.colorClasses(props));

      if (title || self.slots && self.slots.header) {
        headerEl = _react2.default.createElement(_cardHeader2.default, null, title, this.slots['header']);
      }

      if (content || self.slots && self.slots.content) {
        contentEl = _react2.default.createElement(_cardContent2.default, {
          padding: padding
        }, content, this.slots['content']);
      }

      if (footer || self.slots && self.slots.footer) {
        footerEl = _react2.default.createElement(_cardFooter2.default, null, footer, this.slots['footer']);
      }

      return _react2.default.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, headerEl, contentEl, footerEl, this.slots['default']);
    }
  }, {
    key: 'slots',
    get: function get() {
      return (0, _reactComponentSlots2.default)(this.props);
    }
  }]);

  return F7Card;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Card, Object.assign({
  id: [String, Number],
  title: [String, Number],
  content: [String, Number],
  footer: [String, Number],
  outline: Boolean,
  padding: {
    type: Boolean,
    default: true
  }
}, _mixins2.default.colorProps));

exports.default = F7Card;