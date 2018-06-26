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

var F7Progressbar = function (_React$Component) {
  _inherits(F7Progressbar, _React$Component);

  function F7Progressbar(props, context) {
    _classCallCheck(this, F7Progressbar);

    var _this = _possibleConstructorReturn(this, (F7Progressbar.__proto__ || Object.getPrototypeOf(F7Progressbar)).call(this, props, context));

    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Progressbar, [{
    key: 'set',
    value: function set(progress, speed) {
      var self = this;
      if (!self.$f7) return;
      self.$f7.progressbar.set(self.refs.el, progress, speed);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var progress = props.progress,
          id = props.id,
          style = props.style,
          infinite = props.infinite,
          className = props.className;

      var transformStyle = {
        transform: progress ? 'translate3d(' + (-100 + progress) + '%, 0, 0)' : '',
        WebkitTransform: progress ? 'translate3d(' + (-100 + progress) + '%, 0, 0)' : ''
      };
      var classes = _utils2.default.classNames(className, 'progressbar', {
        'progressbar-infinite': infinite
      }, _mixins2.default.colorClasses(props));
      return _react2.default.createElement('span', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes,
        'data-progress': progress
      }, _react2.default.createElement('span', {
        style: transformStyle
      }));
    }
  }, {
    key: 'refs',
    get: function get() {
      return this.__reactRefs;
    },
    set: function set(refs) {}
  }]);

  return F7Progressbar;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Progressbar, Object.assign({
  id: [String, Number],
  progress: Number,
  infinite: Boolean
}, _mixins2.default.colorProps));

exports.default = F7Progressbar;