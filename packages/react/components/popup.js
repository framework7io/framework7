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
import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Popup =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Popup, _React$Component);

  function F7Popup(props, context) {
    var _this;

    _classCallCheck(this, F7Popup);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Popup).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onOpen', 'onOpened', 'onClose', 'onClosed']);
    })();

    return _this;
  }

  _createClass(F7Popup, [{
    key: "onOpen",
    value: function onOpen(instance) {
      this.dispatchEvent('popup:open popupOpen', instance);
    }
  }, {
    key: "onOpened",
    value: function onOpened(instance) {
      this.dispatchEvent('popup:opened popupOpened', instance);
    }
  }, {
    key: "onClose",
    value: function onClose(instance) {
      this.dispatchEvent('popup:close popupClose', instance);
    }
  }, {
    key: "onClosed",
    value: function onClosed(instance) {
      this.dispatchEvent('popup:closed popupClosed', instance);
    }
  }, {
    key: "open",
    value: function open(animate) {
      var self = this;
      if (!self.f7Popup) return undefined;
      return self.f7Popup.open(animate);
    }
  }, {
    key: "close",
    value: function close(animate) {
      var self = this;
      if (!self.f7Popup) return undefined;
      return self.f7Popup.close(animate);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var className = props.className,
          id = props.id,
          style = props.style,
          tabletFullscreen = props.tabletFullscreen,
          push = props.push;
      var classes = Utils.classNames(className, 'popup', {
        'popup-tablet-fullscreen': tabletFullscreen,
        'popup-push': push
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      if (self.f7Popup) self.f7Popup.destroy();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      if (!el) return;
      var props = self.props;
      var closeByBackdropClick = props.closeByBackdropClick,
          backdrop = props.backdrop,
          backdropEl = props.backdropEl,
          animate = props.animate,
          closeOnEscape = props.closeOnEscape,
          swipeToClose = props.swipeToClose,
          swipeHandler = props.swipeHandler;
      var popupParams = {
        el: el,
        on: {
          open: self.onOpen,
          opened: self.onOpened,
          close: self.onClose,
          closed: self.onClosed
        }
      };
      {
        if ('closeByBackdropClick' in props) popupParams.closeByBackdropClick = closeByBackdropClick;
        if ('closeOnEscape' in props) popupParams.closeOnEscape = closeOnEscape;
        if ('animate' in props) popupParams.animate = animate;
        if ('backdrop' in props) popupParams.backdrop = backdrop;
        if ('backdropEl' in props) popupParams.backdropEl = backdropEl;
        if ('swipeToClose' in props) popupParams.swipeToClose = swipeToClose;
        if ('swipeHandler' in props) popupParams.swipeHandler = swipeHandler;
      }
      self.$f7ready(function () {
        self.f7Popup = self.$f7.popup.create(popupParams);

        if (self.props.opened) {
          self.f7Popup.open(false);
        }
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

      __reactComponentWatch(this, 'props.opened', prevProps, prevState, function (opened) {
        var self = _this3;
        if (!self.f7Popup) return;

        if (opened) {
          self.f7Popup.open();
        } else {
          self.f7Popup.close();
        }
      });
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

  return F7Popup;
}(React.Component);

__reactComponentSetProps(F7Popup, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  tabletFullscreen: Boolean,
  opened: Boolean,
  animate: Boolean,
  backdrop: Boolean,
  backdropEl: [String, Object, window.HTMLElement],
  closeByBackdropClick: Boolean,
  closeOnEscape: Boolean,
  swipeToClose: {
    type: [Boolean, String],
    default: false
  },
  swipeHandler: [String, Object, window.HTMLElement],
  push: Boolean
}, Mixins.colorProps));

F7Popup.displayName = 'f7-popup';
export default F7Popup;