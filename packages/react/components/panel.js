function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Panel =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Panel, _React$Component);

  function F7Panel(props, context) {
    var _this;

    _classCallCheck(this, F7Panel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Panel).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onOpen', 'onOpened', 'onClose', 'onClosed', 'onBackdropClick', 'onSwipe', 'onSwipeOpen', 'onBreakpoint', 'onCollapsedBreakpoint', 'onResize']);
    })();

    return _this;
  }

  _createClass(F7Panel, [{
    key: "onOpen",
    value: function onOpen(event) {
      this.dispatchEvent('panel:open panelOpen', event);
    }
  }, {
    key: "onOpened",
    value: function onOpened(event) {
      this.dispatchEvent('panel:opened panelOpened', event);
    }
  }, {
    key: "onClose",
    value: function onClose(event) {
      this.dispatchEvent('panel:close panelClose', event);
    }
  }, {
    key: "onClosed",
    value: function onClosed(event) {
      this.dispatchEvent('panel:closed panelClosed', event);
    }
  }, {
    key: "onBackdropClick",
    value: function onBackdropClick(event) {
      this.dispatchEvent('panel:backdrop-click panelBackdropClick', event);
    }
  }, {
    key: "onSwipe",
    value: function onSwipe(event) {
      this.dispatchEvent('panel:swipe panelSwipe', event);
    }
  }, {
    key: "onSwipeOpen",
    value: function onSwipeOpen(event) {
      this.dispatchEvent('panel:swipeopen panelSwipeOpen', event);
    }
  }, {
    key: "onBreakpoint",
    value: function onBreakpoint(event) {
      this.dispatchEvent('panel:breakpoint panelBreakpoint', event);
    }
  }, {
    key: "onCollapsedBreakpoint",
    value: function onCollapsedBreakpoint(event) {
      this.dispatchEvent('panel:collapsedbreakpoint panelCollapsedBreakpoint', event);
    }
  }, {
    key: "onResize",
    value: function onResize(event) {
      this.dispatchEvent('panel:resize panelResize', event);
    }
  }, {
    key: "open",
    value: function open(animate) {
      var self = this;
      if (!self.f7Panel) return;
      self.f7Panel.open(animate);
    }
  }, {
    key: "close",
    value: function close(animate) {
      var self = this;
      if (!self.f7Panel) return;
      self.f7Panel.close(animate);
    }
  }, {
    key: "toggle",
    value: function toggle(animate) {
      var self = this;
      if (!self.f7Panel) return;
      self.f7Panel.toggle(animate);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;
      var id = props.id,
          style = props.style,
          resizable = props.resizable;
      return React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: this.classes
      }, this.slots['default'], resizable && React.createElement('div', {
        className: 'panel-resize-handler'
      }));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;

      if (self.f7Panel && self.f7Panel.destroy) {
        self.f7Panel.destroy();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      var _self$props = self.props,
          opened = _self$props.opened,
          resizable = _self$props.resizable,
          backdrop = _self$props.backdrop,
          backdropEl = _self$props.backdropEl,
          visibleBreakpoint = _self$props.visibleBreakpoint,
          collapsedBreakpoint = _self$props.collapsedBreakpoint,
          swipe = _self$props.swipe,
          swipeOnlyClose = _self$props.swipeOnlyClose,
          swipeActiveArea = _self$props.swipeActiveArea,
          swipeThreshold = _self$props.swipeThreshold;
      self.$f7ready(function () {
        var $ = self.$$;
        if (!$) return;

        if ($('.panel-backdrop').length === 0) {
          $('<div class="panel-backdrop"></div>').insertBefore(el);
        }

        var params = Utils.noUndefinedProps({
          el: el,
          resizable: resizable,
          backdrop: backdrop,
          backdropEl: backdropEl,
          visibleBreakpoint: visibleBreakpoint,
          collapsedBreakpoint: collapsedBreakpoint,
          swipe: swipe,
          swipeOnlyClose: swipeOnlyClose,
          swipeActiveArea: swipeActiveArea,
          swipeThreshold: swipeThreshold,
          on: {
            open: self.onOpen,
            opened: self.onOpened,
            close: self.onClose,
            closed: self.onClosed,
            backdropClick: self.onBackdropClick,
            swipe: self.onSwipe,
            swipeOpen: self.onSwipeOpen,
            collapsedBreakpoint: self.onCollapsedBreakpoint,
            breakpoint: self.onBreakpoint,
            resize: self.onResize
          }
        });
        self.f7Panel = self.$f7.panel.create(params);

        if (opened) {
          self.f7Panel.open(false);
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

      __reactComponentWatch(this, 'props.resizable', prevProps, prevState, function (resizable) {
        var self = _this3;
        if (!self.f7Panel) return;
        if (resizable) self.f7Panel.enableResizable();else self.f7Panel.disableResizable();
      });

      __reactComponentWatch(this, 'props.opened', prevProps, prevState, function (opened) {
        var self = _this3;
        if (!self.f7Panel) return;

        if (opened) {
          self.f7Panel.open();
        } else {
          self.f7Panel.close();
        }
      });
    }
  }, {
    key: "classes",
    get: function get() {
      var _Utils$classNames;

      var self = this;
      var props = self.props;
      var left = props.left,
          reveal = props.reveal,
          className = props.className,
          resizable = props.resizable;
      var side = props.side,
          effect = props.effect;
      side = side || (left ? 'left' : 'right');
      effect = effect || (reveal ? 'reveal' : 'cover');
      return Utils.classNames(className, 'panel', (_Utils$classNames = {
        'panel-resizable': resizable
      }, _defineProperty(_Utils$classNames, "panel-".concat(side), side), _defineProperty(_Utils$classNames, "panel-".concat(effect), effect), _Utils$classNames), Mixins.colorClasses(props));
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

  return F7Panel;
}(React.Component);

__reactComponentSetProps(F7Panel, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  side: String,
  effect: String,
  cover: Boolean,
  reveal: Boolean,
  left: Boolean,
  right: Boolean,
  opened: Boolean,
  resizable: Boolean,
  backdrop: {
    type: Boolean,
    default: true
  },
  backdropEl: {
    type: String,
    default: undefined
  },
  visibleBreakpoint: {
    type: Number,
    default: undefined
  },
  collapsedBreakpoint: {
    type: Number,
    default: undefined
  },
  swipe: Boolean,
  swipeOnlyClose: Boolean,
  swipeActiveArea: {
    type: Number,
    default: 0
  },
  swipeThreshold: {
    type: Number,
    default: 0
  }
}, Mixins.colorProps));

F7Panel.displayName = 'f7-panel';
export default F7Panel;