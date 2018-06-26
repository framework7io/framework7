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

var F7MessagebarSheetImage = function (_React$Component) {
  _inherits(F7MessagebarSheetImage, _React$Component);

  function F7MessagebarSheetImage(props, context) {
    _classCallCheck(this, F7MessagebarSheetImage);

    var _this = _possibleConstructorReturn(this, (F7MessagebarSheetImage.__proto__ || Object.getPrototypeOf(F7MessagebarSheetImage)).call(this, props, context));

    (function () {
      _this.onChangeBound = _this.onChange.bind(_this);
    })();
    return _this;
  }

  _createClass(F7MessagebarSheetImage, [{
    key: 'onChange',
    value: function onChange(e) {
      if (this.props.checked) this.dispatchEvent('checked', e);else this.dispatchEvent('unchecked', e);
      this.dispatchEvent('change', e);
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      var props = self.props;
      var image = props.image,
          checked = props.checked,
          id = props.id,
          className = props.className,
          style = props.style;

      var classes = _utils2.default.classNames(className, 'messagebar-sheet-image', 'checkbox', _mixins2.default.colorClasses(props));
      var styles = _utils2.default.extend({
        backgroundImage: image && 'url(' + image + ')'
      }, style || {});
      var inputEl = void 0;
      {
        inputEl = _react2.default.createElement('input', {
          type: 'checkbox',
          checked: checked,
          onChange: self.onChangeBound
        });
      }
      return _react2.default.createElement('label', {
        id: id,
        className: classes,
        style: styles
      }, inputEl, _react2.default.createElement('i', {
        className: 'icon icon-checkbox'
      }), this.slots['default']);
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

  return F7MessagebarSheetImage;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7MessagebarSheetImage, Object.assign({
  id: [String, Number],
  image: String,
  checked: Boolean
}, _mixins2.default.colorProps));

exports.default = F7MessagebarSheetImage;