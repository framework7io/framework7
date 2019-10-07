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

var F7AccordionItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7AccordionItem, _React$Component);

  function F7AccordionItem(props, context) {
    var _this;

    _classCallCheck(this, F7AccordionItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7AccordionItem).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), 'onBeforeOpen onOpen onOpened onBeforeClose onClose onClosed'.split(' '));
    })();

    return _this;
  }

  _createClass(F7AccordionItem, [{
    key: "onBeforeOpen",
    value: function onBeforeOpen(el, prevent) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionBeforeOpen accordion:beforeopen', prevent);
    }
  }, {
    key: "onOpen",
    value: function onOpen(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionOpen accordion:open');
    }
  }, {
    key: "onOpened",
    value: function onOpened(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionOpened accordion:opened');
    }
  }, {
    key: "onBeforeClose",
    value: function onBeforeClose(el, prevent) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionBeforeClose accordion:beforeclose', prevent);
    }
  }, {
    key: "onClose",
    value: function onClose(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionClose accordion:close');
    }
  }, {
    key: "onClosed",
    value: function onClosed(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordionClosed accordion:closed');
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;
      var className = props.className,
          id = props.id,
          style = props.style,
          opened = props.opened;
      var classes = Utils.classNames(className, 'accordion-item', {
        'accordion-item-opened': opened
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes,
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        }
      }, this.slots['default']);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      var el = self.refs.el;
      if (!el || !self.$f7) return;
      var f7 = self.$f7;
      f7.off('accordionBeforeOpen', self.onBeforeOpen);
      f7.off('accordionOpen', self.onOpen);
      f7.off('accordionOpened', self.onOpened);
      f7.off('accordionBeforeClose', self.onBeforeClose);
      f7.off('accordionClose', self.onClose);
      f7.off('accordionClosed', self.onClosed);
      delete this.eventTargetEl;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      if (!el) return;
      self.eventTargetEl = el;
      self.$f7ready(function (f7) {
        f7.on('accordionBeforeOpen', self.onBeforeOpen);
        f7.on('accordionOpen', self.onOpen);
        f7.on('accordionOpened', self.onOpened);
        f7.on('accordionBeforeClose', self.onBeforeClose);
        f7.on('accordionClose', self.onClose);
        f7.on('accordionClosed', self.onClosed);
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

  return F7AccordionItem;
}(React.Component);

__reactComponentSetProps(F7AccordionItem, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  opened: Boolean
}, Mixins.colorProps));

F7AccordionItem.displayName = 'f7-accordion-item';
export default F7AccordionItem;