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
import Preloader from './preloader';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7PageContent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7PageContent, _React$Component);

  function F7PageContent(props, context) {
    var _this;

    _classCallCheck(this, F7PageContent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7PageContent).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onPtrPullStart', 'onPtrPullMove', 'onPtrPullEnd', 'onPtrRefresh', 'onPtrDone', 'onInfinite', 'onTabShow', 'onTabHide']);
    })();

    return _this;
  }

  _createClass(F7PageContent, [{
    key: "onPtrPullStart",
    value: function onPtrPullStart(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('ptr:pullstart ptrPullStart');
    }
  }, {
    key: "onPtrPullMove",
    value: function onPtrPullMove(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('ptr:pullmove ptrPullMove');
    }
  }, {
    key: "onPtrPullEnd",
    value: function onPtrPullEnd(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('ptr:pullend ptrPullEnd');
    }
  }, {
    key: "onPtrRefresh",
    value: function onPtrRefresh(el, done) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('ptr:refresh ptrRefresh', done);
    }
  }, {
    key: "onPtrDone",
    value: function onPtrDone(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('ptr:done ptrDone');
    }
  }, {
    key: "onInfinite",
    value: function onInfinite(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('infinite');
    }
  }, {
    key: "onTabShow",
    value: function onTabShow(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tab:show tabShow');
    }
  }, {
    key: "onTabHide",
    value: function onTabHide(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tab:hide tabHide');
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var ptr = props.ptr,
          ptrPreloader = props.ptrPreloader,
          ptrDistance = props.ptrDistance,
          ptrBottom = props.ptrBottom,
          ptrMousewheel = props.ptrMousewheel,
          infinite = props.infinite,
          infinitePreloader = props.infinitePreloader,
          id = props.id,
          style = props.style,
          infiniteDistance = props.infiniteDistance,
          infiniteTop = props.infiniteTop;
      var ptrEl;
      var infiniteEl;

      if (ptr && ptrPreloader) {
        ptrEl = React.createElement('div', {
          className: 'ptr-preloader'
        }, React.createElement(Preloader, null), React.createElement('div', {
          className: 'ptr-arrow'
        }));
      }

      if (infinite && infinitePreloader) {
        infiniteEl = React.createElement(Preloader, {
          className: 'infinite-scroll-preloader'
        });
      }

      return React.createElement('div', {
        id: id,
        style: style,
        className: self.classes,
        'data-ptr-distance': ptrDistance || undefined,
        'data-ptr-mousewheel': ptrMousewheel || undefined,
        'data-infinite-distance': infiniteDistance || undefined,
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        }
      }, ptrBottom ? null : ptrEl, infiniteTop ? infiniteEl : null, self.slots.default, infiniteTop ? null : infiniteEl, ptrBottom ? ptrEl : null);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      if (!self.$f7) return;
      self.$f7.off('ptrPullStart', self.onPtrPullStart);
      self.$f7.off('ptrPullMove', self.onPtrPullMove);
      self.$f7.off('ptrPullEnd', self.onPtrPullEnd);
      self.$f7.off('ptrRefresh', self.onPtrRefresh);
      self.$f7.off('ptrDone', self.onPtrDone);
      self.$f7.off('infinite', self.onInfinite);
      self.$f7.off('tabShow', self.onTabShow);
      self.$f7.off('tabHide', self.onTabHide);
      self.eventTargetEl = null;
      delete self.eventTargetEl;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      var _self$props = self.props,
          ptr = _self$props.ptr,
          infinite = _self$props.infinite,
          tab = _self$props.tab;
      self.$f7ready(function (f7) {
        self.eventTargetEl = el;

        if (ptr) {
          f7.on('ptrPullStart', self.onPtrPullStart);
          f7.on('ptrPullMove', self.onPtrPullMove);
          f7.on('ptrPullEnd', self.onPtrPullEnd);
          f7.on('ptrRefresh', self.onPtrRefresh);
          f7.on('ptrDone', self.onPtrDone);
        }

        if (infinite) {
          f7.on('infinite', self.onInfinite);
        }

        if (tab) {
          f7.on('tabShow', self.onTabShow);
          f7.on('tabHide', self.onTabHide);
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
    key: "classes",
    get: function get() {
      var self = this;
      var props = self.props;
      var className = props.className,
          tab = props.tab,
          tabActive = props.tabActive,
          ptr = props.ptr,
          ptrBottom = props.ptrBottom,
          infinite = props.infinite,
          infiniteTop = props.infiniteTop,
          hideBarsOnScroll = props.hideBarsOnScroll,
          hideNavbarOnScroll = props.hideNavbarOnScroll,
          hideToolbarOnScroll = props.hideToolbarOnScroll,
          messagesContent = props.messagesContent,
          loginScreen = props.loginScreen;
      return Utils.classNames(className, 'page-content', {
        tab: tab,
        'tab-active': tabActive,
        'ptr-content': ptr,
        'ptr-bottom': ptrBottom,
        'infinite-scroll-content': infinite,
        'infinite-scroll-top': infiniteTop,
        'hide-bars-on-scroll': hideBarsOnScroll,
        'hide-navbar-on-scroll': hideNavbarOnScroll,
        'hide-toolbar-on-scroll': hideToolbarOnScroll,
        'messages-content': messagesContent,
        'login-screen-content': loginScreen
      }, Mixins.colorClasses(props));
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

  return F7PageContent;
}(React.Component);

__reactComponentSetProps(F7PageContent, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  tab: Boolean,
  tabActive: Boolean,
  ptr: Boolean,
  ptrDistance: Number,
  ptrPreloader: {
    type: Boolean,
    default: true
  },
  ptrBottom: Boolean,
  ptrMousewheel: Boolean,
  infinite: Boolean,
  infiniteTop: Boolean,
  infiniteDistance: Number,
  infinitePreloader: {
    type: Boolean,
    default: true
  },
  hideBarsOnScroll: Boolean,
  hideNavbarOnScroll: Boolean,
  hideToolbarOnScroll: Boolean,
  messagesContent: Boolean,
  loginScreen: Boolean
}, Mixins.colorProps));

F7PageContent.displayName = 'f7-page-content';
export default F7PageContent;