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
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Toggle =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Toggle, _React$Component);

  function F7Toggle(props, context) {
    var _this;

    _classCallCheck(this, F7Toggle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Toggle).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onChange']);
    })();

    return _this;
  }

  _createClass(F7Toggle, [{
    key: "toggle",
    value: function toggle() {
      var self = this;
      if (self.f7Toggle && self.f7Toggle.toggle) self.f7Toggle.toggle();
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      var self = this;
      self.dispatchEvent('change', event);
    }
  }, {
    key: "render",
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
      var labelClasses = Utils.classNames('toggle', className, {
        disabled: disabled
      }, Mixins.colorClasses(props));
      var inputEl;
      {
        inputEl = React.createElement('input', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['inputEl'] = __reactNode;
          },
          type: 'checkbox',
          name: name,
          disabled: disabled,
          readOnly: readonly,
          checked: checked,
          defaultChecked: defaultChecked,
          value: value,
          onChange: self.onChange
        });
      }
      return React.createElement('label', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: labelClasses
      }, inputEl, React.createElement('span', {
        className: 'toggle-icon'
      }));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      if (self.f7Toggle && self.f7Toggle.destroy && self.f7Toggle.$el) self.f7Toggle.destroy();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      if (!self.props.init) return;
      self.$f7ready(function (f7) {
        self.f7Toggle = f7.toggle.create({
          el: self.refs.el,
          on: {
            change: function change(toggle) {
              var checked = toggle.checked;
              self.dispatchEvent('toggle:change toggleChange', checked);
            }
          }
        });
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
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      __reactComponentWatch(this, 'props.checked', prevProps, prevState, function (newValue) {
        var self = _this3;
        if (!self.f7Toggle) return;
        self.f7Toggle.checked = newValue;
      });
    }
  }, {
    key: "refs",
    get: function get() {
      return this.__reactRefs;
    },
    set: function set(refs) {}
  }]);

  return F7Toggle;
}(React.Component);

__reactComponentSetProps(F7Toggle, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
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
}, Mixins.colorProps));

F7Toggle.displayName = 'f7-toggle';
export default F7Toggle;