function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7SkeletonText =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7SkeletonText, _React$Component);

  function F7SkeletonText(props, context) {
    _classCallCheck(this, F7SkeletonText);

    return _possibleConstructorReturn(this, _getPrototypeOf(F7SkeletonText).call(this, props, context));
  }

  _createClass(F7SkeletonText, [{
    key: "render",
    value: function render() {
      var props = this.props;
      var className = props.className,
          id = props.id,
          style = props.style,
          width = props.width,
          height = props.height,
          tag = props.tag;
      var classes = Utils.classNames('skeleton-text', className, Mixins.colorClasses(props));
      var styleAttribute = style;

      if (width) {
        var widthValue = typeof width === 'number' ? "".concat(width, "px") : width;

        if (!styleAttribute) {
          styleAttribute = {
            width: widthValue
          };
        } else if (_typeof(styleAttribute) === 'object') {
          styleAttribute = Object.assign({
            width: widthValue
          }, styleAttribute);
        } else if (typeof styleAttribute === 'string') {
          styleAttribute = "width: ".concat(widthValue, "; ").concat(styleAttribute);
        }
      }

      if (height) {
        var heightValue = typeof height === 'number' ? "".concat(height, "px") : height;

        if (!styleAttribute) {
          styleAttribute = {
            height: heightValue
          };
        } else if (_typeof(styleAttribute) === 'object') {
          styleAttribute = Object.assign({
            height: heightValue
          }, styleAttribute);
        } else if (typeof styleAttribute === 'string') {
          styleAttribute = "height: ".concat(heightValue, "; ").concat(styleAttribute);
        }
      }

      var Tag = tag;
      return React.createElement(Tag, {
        id: id,
        style: styleAttribute,
        className: classes
      }, this.slots['default']);
    }
  }, {
    key: "slots",
    get: function get() {
      return __reactComponentSlots(this.props);
    }
  }]);

  return F7SkeletonText;
}(React.Component);

__reactComponentSetProps(F7SkeletonText, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  width: [Number, String],
  height: [Number, String],
  tag: {
    type: String,
    default: 'span'
  }
}, Mixins.colorProps));

F7SkeletonText.displayName = 'f7-skeleton-text';
export default F7SkeletonText;