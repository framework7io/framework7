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

var F7MessagebarSheetImage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7MessagebarSheetImage, _React$Component);

  function F7MessagebarSheetImage(props, context) {
    var _this;

    _classCallCheck(this, F7MessagebarSheetImage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7MessagebarSheetImage).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onChange']);
    })();

    return _this;
  }

  _createClass(F7MessagebarSheetImage, [{
    key: "onChange",
    value: function onChange(event) {
      if (this.props.checked) this.dispatchEvent('checked', event);else this.dispatchEvent('unchecked', event);
      this.dispatchEvent('change', event);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var image = props.image,
          checked = props.checked,
          id = props.id,
          className = props.className,
          style = props.style;
      var classes = Utils.classNames(className, 'messagebar-sheet-image', 'checkbox', Mixins.colorClasses(props));
      var styles = Utils.extend({
        backgroundImage: image && "url(".concat(image, ")")
      }, style || {});
      var inputEl;
      {
        inputEl = React.createElement('input', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['inputEl'] = __reactNode;
          },
          type: 'checkbox',
          checked: checked,
          onChange: self.onChange
        });
      }
      return React.createElement('label', {
        id: id,
        className: classes,
        style: styles
      }, inputEl, React.createElement('i', {
        className: 'icon icon-checkbox'
      }), this.slots['default']);
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

  return F7MessagebarSheetImage;
}(React.Component);

__reactComponentSetProps(F7MessagebarSheetImage, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  image: String,
  checked: Boolean
}, Mixins.colorProps));

F7MessagebarSheetImage.displayName = 'f7-messagebar-sheet-image';
export default F7MessagebarSheetImage;