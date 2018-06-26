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

var _reactComponentDispatchEvent = require('../runtime-helpers/react-component-dispatch-event.js');

var _reactComponentDispatchEvent2 = _interopRequireDefault(_reactComponentDispatchEvent);

var _reactComponentSlots = require('../runtime-helpers/react-component-slots.js');

var _reactComponentSlots2 = _interopRequireDefault(_reactComponentSlots);

var _reactComponentSetProps = require('../runtime-helpers/react-component-set-props.js');

var _reactComponentSetProps2 = _interopRequireDefault(_reactComponentSetProps);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
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

var F7Col = function (_React$Component) {
  _inherits(F7Col, _React$Component);

  function F7Col(props, context) {
    _classCallCheck(this, F7Col);

    return _possibleConstructorReturn(this, (F7Col.__proto__ || Object.getPrototypeOf(F7Col)).call(this, props, context));
  }

  _createClass(F7Col, [{
    key: 'onClick',
    value: function onClick(e) {
      this.dispatchEvent('click', e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _Utils$classNames;

      var self = this;
      var props = self.props;
      var className = props.className,
          id = props.id,
          style = props.style,
          tag = props.tag,
          width = props.width,
          tabletWidth = props.tabletWidth,
          desktopWidth = props.desktopWidth;

      var ColTag = tag;
      var classes = _utils2.default.classNames(className, (_Utils$classNames = {
        col: width === 'auto'
      }, _defineProperty(_Utils$classNames, 'col-' + width, width !== 'auto'), _defineProperty(_Utils$classNames, 'tablet-' + tabletWidth, tabletWidth), _defineProperty(_Utils$classNames, 'desktop-' + desktopWidth, desktopWidth), _Utils$classNames), _mixins2.default.colorClasses(props));
      return _react2.default.createElement(ColTag, {
        id: id,
        style: style,
        className: classes,
        onClick: self.onClick.bind(self)
      }, this.slots['default']);
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
  }]);

  return F7Col;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Col, Object.assign({
  id: [String, Number],
  tag: {
    type: String,
    default: 'div'
  },
  width: {
    type: [Number, String],
    default: 'auto'
  },
  tabletWidth: {
    type: [Number, String]
  },
  desktopWidth: {
    type: [Number, String]
  }
}, _mixins2.default.colorProps));

exports.default = F7Col;