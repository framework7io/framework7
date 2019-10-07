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
import F7CardHeader from './card-header';
import F7CardContent from './card-content';
import F7CardFooter from './card-footer';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Card =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Card, _React$Component);

  function F7Card(props, context) {
    var _this;

    _classCallCheck(this, F7Card);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Card).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), 'onBeforeOpen onOpen onOpened onClose onClosed'.split(' '));
    })();

    return _this;
  }

  _createClass(F7Card, [{
    key: "open",
    value: function open() {
      var self = this;
      if (!self.refs.el) return;
      self.$f7.card.open(self.refs.el);
    }
  }, {
    key: "close",
    value: function close() {
      var self = this;
      if (!self.refs.el) return;
      self.$f7.card.close(self.refs.el);
    }
  }, {
    key: "onBeforeOpen",
    value: function onBeforeOpen(el, prevent) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('cardBeforeOpen card:beforeopen', el, prevent);
    }
  }, {
    key: "onOpen",
    value: function onOpen(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('cardOpen card:open', el);
    }
  }, {
    key: "onOpened",
    value: function onOpened(el, pageEl) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('cardOpened card:opened', el, pageEl);
    }
  }, {
    key: "onClose",
    value: function onClose(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('cardClose card:close', el);
    }
  }, {
    key: "onClosed",
    value: function onClosed(el, pageEl) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('cardClosed card:closed', el, pageEl);
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
          title = props.title,
          content = props.content,
          footer = props.footer,
          padding = props.padding,
          outline = props.outline,
          expandable = props.expandable,
          expandableAnimateWidth = props.expandableAnimateWidth,
          animate = props.animate,
          hideNavbarOnOpen = props.hideNavbarOnOpen,
          hideToolbarOnOpen = props.hideToolbarOnOpen,
          hideStatusbarOnOpen = props.hideStatusbarOnOpen,
          swipeToClose = props.swipeToClose,
          closeByBackdropClick = props.closeByBackdropClick,
          backdrop = props.backdrop,
          backdropEl = props.backdropEl,
          noShadow = props.noShadow,
          noBorder = props.noBorder;
      var headerEl;
      var contentEl;
      var footerEl;
      var classes = Utils.classNames(className, 'card', {
        'card-outline': outline,
        'card-expandable': expandable,
        'card-expandable-animate-width': expandableAnimateWidth,
        'no-shadow': noShadow,
        'no-border': noBorder
      }, Mixins.colorClasses(props));

      if (title || self.slots && self.slots.header) {
        headerEl = React.createElement(F7CardHeader, null, title, this.slots['header']);
      }

      if (content || self.slots && self.slots.content) {
        contentEl = React.createElement(F7CardContent, {
          padding: padding
        }, content, this.slots['content']);
      }

      if (footer || self.slots && self.slots.footer) {
        footerEl = React.createElement(F7CardFooter, null, footer, this.slots['footer']);
      }

      return React.createElement('div', {
        id: id,
        style: style,
        className: classes,
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        'data-animate': typeof animate === 'undefined' ? animate : animate.toString(),
        'data-hide-navbar-on-open': typeof hideNavbarOnOpen === 'undefined' ? hideNavbarOnOpen : hideNavbarOnOpen.toString(),
        'data-hide-toolbar-on-open': typeof hideToolbarOnOpen === 'undefined' ? hideToolbarOnOpen : hideToolbarOnOpen.toString(),
        'data-hide-statusbar-on-open': typeof hideStatusbarOnOpen === 'undefined' ? hideStatusbarOnOpen : hideStatusbarOnOpen.toString(),
        'data-swipe-to-close': typeof swipeToClose === 'undefined' ? swipeToClose : swipeToClose.toString(),
        'data-close-by-backdrop-click': typeof closeByBackdropClick === 'undefined' ? closeByBackdropClick : closeByBackdropClick.toString(),
        'data-backdrop': typeof backdrop === 'undefined' ? backdrop : backdrop.toString(),
        'data-backdrop-el': backdropEl
      }, headerEl, contentEl, footerEl, this.slots['default']);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      if (!self.props.expandable) return;
      var el = self.refs.el;
      if (!el || !self.$f7) return;
      self.$f7.off('cardBeforeOpen', self.onBeforeOpen);
      self.$f7.off('cardOpen', self.onOpen);
      self.$f7.off('cardOpened', self.onOpened);
      self.$f7.off('cardClose', self.onClose);
      self.$f7.off('cardClosed', self.onClosed);
      self.eventTargetEl = null;
      delete self.eventTargetEl;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      if (!self.props.expandable) return;
      var el = self.refs.el;
      if (!el) return;
      self.eventTargetEl = el;
      self.$f7ready(function (f7) {
        f7.on('cardBeforeOpen', self.onBeforeOpen);
        f7.on('cardOpen', self.onOpen);
        f7.on('cardOpened', self.onOpened);
        f7.on('cardClose', self.onClose);
        f7.on('cardClosed', self.onClosed);

        if (self.props.expandable && self.props.expandableOpened) {
          self.$f7.card.open(el, false);
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

      __reactComponentWatch(this, 'props.expandableOpened', prevProps, prevState, function (expandableOpened) {
        var self = _this3;

        if (expandableOpened) {
          self.open();
        } else {
          self.close();
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

  return F7Card;
}(React.Component);

__reactComponentSetProps(F7Card, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  title: [String, Number],
  content: [String, Number],
  footer: [String, Number],
  outline: Boolean,
  expandable: Boolean,
  expandableAnimateWidth: Boolean,
  expandableOpened: Boolean,
  animate: {
    type: Boolean,
    default: undefined
  },
  hideNavbarOnOpen: {
    type: Boolean,
    default: undefined
  },
  hideToolbarOnOpen: {
    type: Boolean,
    default: undefined
  },
  hideStatusbarOnOpen: {
    type: Boolean,
    default: undefined
  },
  swipeToClose: {
    type: Boolean,
    default: undefined
  },
  closeByBackdropClick: {
    type: Boolean,
    default: undefined
  },
  backdrop: {
    type: Boolean,
    default: undefined
  },
  backdropEl: {
    type: String,
    default: undefined
  },
  noShadow: Boolean,
  noBorder: Boolean,
  padding: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps));

F7Card.displayName = 'f7-card';
export default F7Card;