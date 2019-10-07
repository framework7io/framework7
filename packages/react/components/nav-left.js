function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
import F7Link from './link';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7NavLeft =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7NavLeft, _React$Component);

  function F7NavLeft(props, context) {
    var _this;

    _classCallCheck(this, F7NavLeft);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7NavLeft).call(this, props, context));

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onBackClick']);
    })();

    return _this;
  }

  _createClass(F7NavLeft, [{
    key: "onBackClick",
    value: function onBackClick(event) {
      this.dispatchEvent('back-click backClick click:back clickBack', event);
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var backLink = props.backLink,
          backLinkUrl = props.backLinkUrl,
          backLinkForce = props.backLinkForce,
          backLinkShowText = props.backLinkShowText,
          sliding = props.sliding,
          className = props.className,
          style = props.style,
          id = props.id;
      var linkEl;
      var needBackLinkText = backLinkShowText;
      if (typeof needBackLinkText === 'undefined') needBackLinkText = !this.$theme.md;

      if (backLink) {
        var text = backLink !== true && needBackLinkText ? backLink : undefined;
        linkEl = React.createElement(F7Link, {
          href: backLinkUrl || '#',
          back: true,
          icon: 'icon-back',
          force: backLinkForce || undefined,
          className: !text ? 'icon-only' : undefined,
          text: text,
          onClick: this.onBackClick
        });
      }

      var classes = Utils.classNames(className, 'left', {
        sliding: sliding
      }, Mixins.colorClasses(props));
      var children = [];
      var slots = this.slots;

      if (slots && Object.keys(slots).length) {
        Object.keys(slots).forEach(function (key) {
          children.push.apply(children, _toConsumableArray(slots[key]));
        });
      }

      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, linkEl, children);
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
  }]);

  return F7NavLeft;
}(React.Component);

__reactComponentSetProps(F7NavLeft, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  backLink: [Boolean, String],
  backLinkUrl: String,
  backLinkForce: Boolean,
  backLinkShowText: {
    type: Boolean,
    default: undefined
  },
  sliding: Boolean
}, Mixins.colorProps));

F7NavLeft.displayName = 'f7-nav-left';
export default F7NavLeft;