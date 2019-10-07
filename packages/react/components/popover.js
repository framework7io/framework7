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

var F7Popover =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Popover, _React$Component);

  function F7Popover(props, context) {
    var _this;

    _classCallCheck(this, F7Popover);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Popover).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onOpen', 'onOpened', 'onClose', 'onClosed']);
    })();

    return _this;
  }

  _createClass(F7Popover, [{
    key: "onOpen",
    value: function onOpen(instance) {
      this.dispatchEvent('popover:open popoverOpen', instance);
    }
  }, {
    key: "onOpened",
    value: function onOpened(instance) {
      this.dispatchEvent('popover:opened popoverOpened', instance);
    }
  }, {
    key: "onClose",
    value: function onClose(instance) {
      this.dispatchEvent('popover:close popoverClose', instance);
    }
  }, {
    key: "onClosed",
    value: function onClosed(instance) {
      this.dispatchEvent('popover:closed popoverClosed', instance);
    }
  }, {
    key: "open",
    value: function open(animate) {
      var self = this;
      if (!self.f7Popover) return undefined;
      return self.f7Popover.open(animate);
    }
  }, {
    key: "close",
    value: function close(animate) {
      var self = this;
      if (!self.f7Popover) return undefined;
      return self.f7Popover.close(animate);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var className = props.className,
          id = props.id,
          style = props.style;
      var classes = Utils.classNames(className, 'popover', Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, React.createElement('div', {
        className: 'popover-angle'
      }), React.createElement('div', {
        className: 'popover-inner'
      }, this.slots['default']));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      if (self.f7Popover) self.f7Popover.destroy();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      if (!el) return;
      var props = self.props;
      var target = props.target,
          opened = props.opened,
          backdrop = props.backdrop,
          backdropEl = props.backdropEl,
          closeByBackdropClick = props.closeByBackdropClick,
          closeByOutsideClick = props.closeByOutsideClick,
          closeOnEscape = props.closeOnEscape;
      var popoverParams = {
        el: el,
        on: {
          open: self.onOpen,
          opened: self.onOpened,
          close: self.onClose,
          closed: self.onClosed
        }
      };
      if (target) popoverParams.targetEl = target;
      {
        if ('closeByBackdropClick' in props) popoverParams.closeByBackdropClick = closeByBackdropClick;
        if ('closeByOutsideClick' in props) popoverParams.closeByOutsideClick = closeByOutsideClick;
        if ('closeOnEscape' in props) popoverParams.closeOnEscape = closeOnEscape;
        if ('backdrop' in props) popoverParams.backdrop = backdrop;
        if ('backdropEl' in props) popoverParams.backdropEl = backdropEl;
      }
      self.$f7ready(function () {
        self.f7Popover = self.$f7.popover.create(popoverParams);

        if (opened && target) {
          self.f7Popover.open(target, false);
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
        if (!self.f7Popover) return;

        if (opened) {
          self.f7Popover.open();
        } else {
          self.f7Popover.close();
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

  return F7Popover;
}(React.Component);

__reactComponentSetProps(F7Popover, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  opened: Boolean,
  target: [String, Object],
  backdrop: Boolean,
  backdropEl: [String, Object, window.HTMLElement],
  closeByBackdropClick: Boolean,
  closeByOutsideClick: Boolean,
  closeOnEscape: Boolean
}, Mixins.colorProps));

F7Popover.displayName = 'f7-popover';
export default F7Popover;