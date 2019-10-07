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

var F7Actions =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Actions, _React$Component);

  function F7Actions(props, context) {
    var _this;

    _classCallCheck(this, F7Actions);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Actions).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onOpen', 'onOpened', 'onClose', 'onClosed']);
    })();

    return _this;
  }

  _createClass(F7Actions, [{
    key: "onOpen",
    value: function onOpen(instance) {
      this.dispatchEvent('actions:open actionsOpen', instance);
    }
  }, {
    key: "onOpened",
    value: function onOpened(instance) {
      this.dispatchEvent('actions:opened actionsOpened', instance);
    }
  }, {
    key: "onClose",
    value: function onClose(instance) {
      this.dispatchEvent('actions:close actionsClose', instance);
    }
  }, {
    key: "onClosed",
    value: function onClosed(instance) {
      this.dispatchEvent('actions:closed actionsClosed', instance);
    }
  }, {
    key: "open",
    value: function open(animate) {
      var self = this;
      if (!self.f7Actions) return undefined;
      return self.f7Actions.open(animate);
    }
  }, {
    key: "close",
    value: function close(animate) {
      var self = this;
      if (!self.f7Actions) return undefined;
      return self.f7Actions.close(animate);
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
          grid = props.grid;
      var classes = Utils.classNames(className, 'actions-modal', {
        'actions-grid': grid
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        className: classes
      }, this.slots['default']);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      if (self.f7Actions) self.f7Actions.destroy();
      delete self.f7Actions;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      if (!el) return;
      var props = self.props;
      var grid = props.grid,
          target = props.target,
          convertToPopover = props.convertToPopover,
          forceToPopover = props.forceToPopover,
          opened = props.opened,
          closeByBackdropClick = props.closeByBackdropClick,
          closeByOutsideClick = props.closeByOutsideClick,
          closeOnEscape = props.closeOnEscape,
          backdrop = props.backdrop,
          backdropEl = props.backdropEl;
      var actionsParams = {
        el: el,
        grid: grid,
        on: {
          open: self.onOpen,
          opened: self.onOpened,
          close: self.onClose,
          closed: self.onClosed
        }
      };
      if (target) actionsParams.targetEl = target;
      {
        if ('convertToPopover' in props) actionsParams.convertToPopover = convertToPopover;
        if ('forceToPopover' in props) actionsParams.forceToPopover = forceToPopover;
        if ('backdrop' in props) actionsParams.backdrop = backdrop;
        if ('backdropEl' in props) actionsParams.backdropEl = backdropEl;
        if ('closeByBackdropClick' in props) actionsParams.closeByBackdropClick = closeByBackdropClick;
        if ('closeByOutsideClick' in props) actionsParams.closeByOutsideClick = closeByOutsideClick;
        if ('closeOnEscape' in props) actionsParams.closeOnEscape = closeOnEscape;
      }
      self.$f7ready(function () {
        self.f7Actions = self.$f7.actions.create(actionsParams);

        if (opened) {
          self.f7Actions.open(false);
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
        if (!self.f7Actions) return;

        if (opened) {
          self.f7Actions.open();
        } else {
          self.f7Actions.close();
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

  return F7Actions;
}(React.Component);

__reactComponentSetProps(F7Actions, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  opened: Boolean,
  grid: Boolean,
  convertToPopover: Boolean,
  forceToPopover: Boolean,
  target: [String, Object],
  backdrop: Boolean,
  backdropEl: [String, Object, window.HTMLElement],
  closeByBackdropClick: Boolean,
  closeByOutsideClick: Boolean,
  closeOnEscape: Boolean
}, Mixins.colorProps));

F7Actions.displayName = 'f7-actions';
export default F7Actions;