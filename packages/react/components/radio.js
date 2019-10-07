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

var F7Radio =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Radio, _React$Component);

  function F7Radio(props, context) {
    var _this;

    _classCallCheck(this, F7Radio);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Radio).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onChange']);
    })();

    return _this;
  }

  _createClass(F7Radio, [{
    key: "onChange",
    value: function onChange(event) {
      this.dispatchEvent('change', event);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

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
      var inputEl;
      {
        inputEl = React.createElement('input', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['inputEl'] = __reactNode;
          },
          type: 'radio',
          name: name,
          value: value,
          disabled: disabled,
          readOnly: readonly,
          checked: checked,
          defaultChecked: defaultChecked,
          onChange: self.onChange
        });
      }
      var iconEl = React.createElement('i', {
        className: 'icon-radio'
      });
      var classes = Utils.classNames(className, 'radio', {
        disabled: disabled
      }, Mixins.colorClasses(props));
      return React.createElement('label', {
        id: id,
        style: style,
        className: classes
      }, inputEl, iconEl, this.slots['default']);
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

  return F7Radio;
}(React.Component);

__reactComponentSetProps(F7Radio, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  checked: Boolean,
  name: [Number, String],
  value: [Number, String, Boolean],
  disabled: Boolean,
  readonly: Boolean,
  defaultChecked: Boolean
}, Mixins.colorProps));

F7Radio.displayName = 'f7-radio';
export default F7Radio;