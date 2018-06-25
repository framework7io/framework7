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

var F7Radio = function (_React$Component) {
  _inherits(F7Radio, _React$Component);

  function F7Radio(props, context) {
    _classCallCheck(this, F7Radio);

    return _possibleConstructorReturn(this, (F7Radio.__proto__ || Object.getPrototypeOf(F7Radio)).call(this, props, context));
  }

  _createClass(F7Radio, [{
    key: 'onChange',
    value: function onChange(event) {
      this.dispatchEvent('change', event);
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      var props = self.props;
      var name = props.name,
          value = props.value,
          disabled = props.disabled,
          readonly = props.readonly,
          checked = props.checked,
          defaultChecked = props.defaultChecked,
          id = props.id,
          style = props.style,
          className = props.className;

      var inputEl = void 0;
      {
        inputEl = _react2.default.createElement('input', {
          type: 'radio',
          name: name,
          value: value,
          disabled: disabled,
          readOnly: readonly,
          checked: checked,
          defaultChecked: defaultChecked,
          onChange: self.onChange.bind(self)
        });
      }
      var iconEl = _react2.default.createElement('i', {
        className: 'icon-radio'
      });
      var classes = _utils2.default.classNames(className, 'radio', {
        disabled: disabled
      }, _mixins2.default.colorClasses(props));
      return _react2.default.createElement('label', {
        id: id,
        style: style,
        className: classes
      }, inputEl, iconEl, this.slots['default']);
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

  return F7Radio;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Radio, Object.assign({
  id: [String, Number],
  checked: Boolean,
  name: [Number, String],
  value: [Number, String, Boolean],
  disabled: Boolean,
  readonly: Boolean,
  defaultChecked: Boolean
}, _mixins2.default.colorProps));

exports.default = F7Radio;