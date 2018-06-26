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

var _reactComponentWatch = require('../runtime-helpers/react-component-watch.js');

var _reactComponentWatch2 = _interopRequireDefault(_reactComponentWatch);

var _reactComponentDispatchEvent = require('../runtime-helpers/react-component-dispatch-event.js');

var _reactComponentDispatchEvent2 = _interopRequireDefault(_reactComponentDispatchEvent);

var _reactComponentSetProps = require('../runtime-helpers/react-component-set-props.js');

var _reactComponentSetProps2 = _interopRequireDefault(_reactComponentSetProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var F7Toggle = function (_React$Component) {
  _inherits(F7Toggle, _React$Component);

  function F7Toggle(props, context) {
    _classCallCheck(this, F7Toggle);

    var _this = _possibleConstructorReturn(this, (F7Toggle.__proto__ || Object.getPrototypeOf(F7Toggle)).call(this, props, context));

    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Toggle, [{
    key: 'toggle',
    value: function toggle() {
      var self = this;
      if (self.f7Toggle && self.f7Toggle.toggle) self.f7Toggle.toggle();
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var self = this;
      self.dispatchEvent('change', e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var className = props.className,
          disabled = props.disabled,
          id = props.id,
          style = props.style,
          name = props.name,
          readonly = props.readonly,
          checked = props.checked,
          defaultChecked = props.defaultChecked,
          value = props.value;

      var labelClasses = _utils2.default.classNames('toggle', className, {
        disabled: disabled
      }, _mixins2.default.colorClasses(props));
      var inputEl = void 0;
      {
        inputEl = _react2.default.createElement('input', {
          type: 'checkbox',
          name: name,
          disabled: disabled,
          readOnly: readonly,
          checked: checked,
          defaultChecked: defaultChecked,
          value: value,
          onChange: self.onChange.bind(self)
        });
      }
      return _react2.default.createElement('label', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: labelClasses
      }, inputEl, _react2.default.createElement('span', {
        className: 'toggle-icon'
      }));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      if (self.f7Toggle && self.f7Toggle.destroy && self.f7Toggle.$el) self.f7Toggle.destroy();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      if (!self.props.init) return;
      self.$f7ready(function (f7) {
        self.f7Toggle = f7.toggle.create({
          el: self.refs.el,
          on: {
            change: function change(toggle) {
              self.dispatchEvent('toggle:change toggleChange', toggle.checked);
            }
          }
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

      (0, _reactComponentWatch2.default)(this, 'props.checked', prevProps, prevState, function (newValue) {
        var self = _this3;
        if (!self.f7Toggle) return;
        self.f7Toggle.checked = newValue;
      });
    }
  }, {
    key: 'refs',
    get: function get() {
      return this.__reactRefs;
    },
    set: function set(refs) {}
  }]);

  return F7Toggle;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Toggle, Object.assign({
  id: [String, Number],
  init: {
    type: Boolean,
    default: true
  },
  checked: Boolean,
  defaultChecked: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  name: String,
  value: [String, Number, Array]
}, _mixins2.default.colorProps));

exports.default = F7Toggle;