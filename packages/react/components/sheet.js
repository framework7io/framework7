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

var F7Sheet =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Sheet, _React$Component);

  function F7Sheet(props, context) {
    var _this;

    _classCallCheck(this, F7Sheet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Sheet).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onOpen', 'onOpened', 'onClose', 'onClosed', 'onStepOpen', 'onStepClose', 'onStepProgress']);
    })();

    return _this;
  }

  _createClass(F7Sheet, [{
    key: "onStepProgress",
    value: function onStepProgress(instance, progress) {
      this.dispatchEvent('sheet:stepprogress sheetStepProgress', instance, progress);
    }
  }, {
    key: "onStepOpen",
    value: function onStepOpen(instance) {
      this.dispatchEvent('sheet:stepopen sheetStepOpen', instance);
    }
  }, {
    key: "onStepClose",
    value: function onStepClose(instance) {
      this.dispatchEvent('sheet:stepclose sheetStepClose', instance);
    }
  }, {
    key: "onOpen",
    value: function onOpen(instance) {
      this.dispatchEvent('sheet:open sheetOpen', instance);
    }
  }, {
    key: "onOpened",
    value: function onOpened(instance) {
      this.dispatchEvent('sheet:opened sheetOpened', instance);
    }
  }, {
    key: "onClose",
    value: function onClose(instance) {
      this.dispatchEvent('sheet:close sheetClose', instance);
    }
  }, {
    key: "onClosed",
    value: function onClosed(instance) {
      this.dispatchEvent('sheet:closed sheetClosed', instance);
    }
  }, {
    key: "open",
    value: function open(animate) {
      var self = this;
      if (!self.f7Sheet) return undefined;
      return self.f7Sheet.open(animate);
    }
  }, {
    key: "close",
    value: function close(animate) {
      var self = this;
      if (!self.f7Sheet) return undefined;
      return self.f7Sheet.close(animate);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var fixedList = [];
      var staticList = [];
      var props = self.props;
      var id = props.id,
          style = props.style,
          className = props.className,
          top = props.top,
          bottom = props.bottom,
          position = props.position,
          push = props.push;
      var fixedTags;
      fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ').map(function (tagName) {
        return "f7-".concat(tagName);
      });
      var slotsDefault = self.slots.default;

      if (slotsDefault && slotsDefault.length) {
        slotsDefault.forEach(function (child) {
          if (typeof child === 'undefined') return;
          var isFixedTag = false;
          {
            var tag = child.type && (child.type.displayName || child.type.name);

            if (!tag) {
              staticList.push(child);
              return;
            }

            if (fixedTags.indexOf(tag) >= 0) {
              isFixedTag = true;
            }
          }
          if (isFixedTag) fixedList.push(child);else staticList.push(child);
        });
      }

      var innerEl = React.createElement('div', {
        className: 'sheet-modal-inner'
      }, staticList);
      var positionComputed = 'bottom';
      if (position) positionComputed = position;else if (top) positionComputed = 'top';else if (bottom) positionComputed = 'bottom';
      var classes = Utils.classNames(className, 'sheet-modal', "sheet-modal-".concat(positionComputed), {
        'sheet-modal-push': push
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, fixedList, innerEl);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      if (self.f7Sheet) self.f7Sheet.destroy();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      if (!el) return;
      var props = self.props;
      var opened = props.opened,
          backdrop = props.backdrop,
          backdropEl = props.backdropEl,
          closeByBackdropClick = props.closeByBackdropClick,
          closeByOutsideClick = props.closeByOutsideClick,
          closeOnEscape = props.closeOnEscape,
          swipeToClose = props.swipeToClose,
          swipeToStep = props.swipeToStep,
          swipeHandler = props.swipeHandler;
      var sheetParams = {
        el: self.refs.el,
        on: {
          open: self.onOpen,
          opened: self.onOpened,
          close: self.onClose,
          closed: self.onClosed,
          stepOpen: self.onStepOpen,
          stepClose: self.onStepClose,
          stepProgress: self.onStepProgress
        }
      };
      {
        if ('backdrop' in props && typeof backdrop !== 'undefined') sheetParams.backdrop = backdrop;
        if ('backdropEl' in props) sheetParams.backdropEl = backdropEl;
        if ('closeByBackdropClick' in props) sheetParams.closeByBackdropClick = closeByBackdropClick;
        if ('closeByOutsideClick' in props) sheetParams.closeByOutsideClick = closeByOutsideClick;
        if ('closeOnEscape' in props) sheetParams.closeOnEscape = closeOnEscape;
        if ('swipeToClose' in props) sheetParams.swipeToClose = swipeToClose;
        if ('swipeToStep' in props) sheetParams.swipeToStep = swipeToStep;
        if ('swipeHandler' in props) sheetParams.swipeHandler = swipeHandler;
      }
      self.$f7ready(function () {
        self.f7Sheet = self.$f7.sheet.create(sheetParams);

        if (opened) {
          self.f7Sheet.open(false);
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
        if (!self.f7Sheet) return;

        if (opened) {
          self.f7Sheet.open();
        } else {
          self.f7Sheet.close();
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

  return F7Sheet;
}(React.Component);

__reactComponentSetProps(F7Sheet, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  opened: Boolean,
  top: Boolean,
  bottom: Boolean,
  position: String,
  backdrop: Boolean,
  backdropEl: [String, Object, window.HTMLElement],
  closeByBackdropClick: Boolean,
  closeByOutsideClick: Boolean,
  closeOnEscape: Boolean,
  push: Boolean,
  swipeToClose: Boolean,
  swipeToStep: Boolean,
  swipeHandler: [String, Object, window.HTMLElement]
}, Mixins.colorProps));

F7Sheet.displayName = 'f7-sheet';
export default F7Sheet;