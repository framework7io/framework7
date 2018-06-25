'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _mixins = require('../utils/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _reactComponentDispatchEvent = require('../runtime-helpers/react-component-dispatch-event.js');

var _reactComponentDispatchEvent2 = _interopRequireDefault(_reactComponentDispatchEvent);

var _reactComponentSlots = require('../runtime-helpers/react-component-slots.js');

var _reactComponentSlots2 = _interopRequireDefault(_reactComponentSlots);

var _reactComponentSetProps = require('../runtime-helpers/react-component-set-props.js');

var _reactComponentSetProps2 = _interopRequireDefault(_reactComponentSetProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var F7PageContent = function (_React$Component) {
  _inherits(F7PageContent, _React$Component);

  function F7PageContent(props, context) {
    _classCallCheck(this, F7PageContent);

    var _this = _possibleConstructorReturn(this, (F7PageContent.__proto__ || Object.getPrototypeOf(F7PageContent)).call(this, props, context));

    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7PageContent, [{
    key: 'onPtrPullStart',
    value: function onPtrPullStart(event) {
      this.dispatchEvent('ptr:pullstart ptrPullStart', event);
    }
  }, {
    key: 'onPtrPullMove',
    value: function onPtrPullMove(event) {
      this.dispatchEvent('ptr:pullmove ptrPullMove', event);
    }
  }, {
    key: 'onPtrPullEnd',
    value: function onPtrPullEnd(event) {
      this.dispatchEvent('ptr:pullend ptrPullEnd', event);
    }
  }, {
    key: 'onPtrRefresh',
    value: function onPtrRefresh(event) {
      this.dispatchEvent('ptr:refresh ptrRefresh', event, event.detail);
    }
  }, {
    key: 'onPtrDone',
    value: function onPtrDone(event) {
      this.dispatchEvent('ptr:done ptrDone', event);
    }
  }, {
    key: 'onInfinite',
    value: function onInfinite(event) {
      this.dispatchEvent('infinite', event);
    }
  }, {
    key: 'onTabShow',
    value: function onTabShow(e) {
      this.dispatchEvent('tab:show tabShow', e);
    }
  }, {
    key: 'onTabHide',
    value: function onTabHide(e) {
      this.dispatchEvent('tab:hide tabHide', e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var ptr = props.ptr,
          ptrPreloader = props.ptrPreloader,
          infinite = props.infinite,
          infinitePreloader = props.infinitePreloader,
          id = props.id,
          style = props.style,
          ptrDistance = props.ptrDistance,
          infiniteDistance = props.infiniteDistance,
          infiniteTop = props.infiniteTop;

      var ptrEl = void 0;
      var infiniteEl = void 0;

      if (ptr && ptrPreloader) {
        ptrEl = _react2.default.createElement('div', {
          className: 'ptr-preloader'
        }, _react2.default.createElement('div', {
          className: 'preloader'
        }), _react2.default.createElement('div', {
          className: 'ptr-arrow'
        }));
      }

      if (infinite && infinitePreloader) {
        infiniteEl = _react2.default.createElement('div', {
          className: 'preloader infinite-scroll-preloader'
        });
      }

      return _react2.default.createElement('div', {
        id: id,
        style: style,
        className: self.classes,
        'data-ptr-distance': ptrDistance || undefined,
        'data-infinite-distance': infiniteDistance || undefined,
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        }
      }, ptrEl, infiniteTop ? infiniteEl : self.slots.default, infiniteTop ? self.slots.default : infiniteEl);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      var el = self.refs.el;
      el.removeEventListener('ptr:pullstart', self.onPtrPullStart);
      el.removeEventListener('ptr:pullmove', self.onPtrPullMove);
      el.removeEventListener('ptr:pullend', self.onPtrPullEnd);
      el.removeEventListener('ptr:refresh', self.onPtrRefresh);
      el.removeEventListener('ptr:done', self.onPtrDone);
      el.removeEventListener('infinite', self.onInfinite);
      el.removeEventListener('tab:show', self.onTabShow);
      el.removeEventListener('tab:hide', self.onTabHide);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      var _self$props = self.props,
          ptr = _self$props.ptr,
          infinite = _self$props.infinite,
          tab = _self$props.tab;

      self.onPtrPullStart = self.onPtrPullStart.bind(self);
      self.onPtrPullMove = self.onPtrPullMove.bind(self);
      self.onPtrPullEnd = self.onPtrPullEnd.bind(self);
      self.onPtrRefresh = self.onPtrRefresh.bind(self);
      self.onPtrDone = self.onPtrDone.bind(self);
      self.onInfinite = self.onInfinite.bind(self);
      self.onTabShow = self.onTabShow.bind(self);
      self.onTabHide = self.onTabHide.bind(self);

      if (ptr) {
        el.addEventListener('ptr:pullstart', self.onPtrPullStart);
        el.addEventListener('ptr:pullmove', self.onPtrPullMove);
        el.addEventListener('ptr:pullend', self.onPtrPullEnd);
        el.addEventListener('ptr:refresh', self.onPtrRefresh);
        el.addEventListener('ptr:done', self.onPtrDone);
      }

      if (infinite) {
        el.addEventListener('infinite', self.onInfinite);
      }

      if (tab) {
        el.addEventListener('tab:show', self.onTabShow);
        el.addEventListener('tab:hide', self.onTabHide);
      }
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(events) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return _reactComponentDispatchEvent2.default.apply(undefined, [this, events].concat(args));
    }
  }, {
    key: 'classes',
    get: function get() {
      var self = this;
      var props = self.props;
      var className = props.className,
          tab = props.tab,
          tabActive = props.tabActive,
          ptr = props.ptr,
          infinite = props.infinite,
          infiniteTop = props.infiniteTop,
          hideBarsOnScroll = props.hideBarsOnScroll,
          hideNavbarOnScroll = props.hideNavbarOnScroll,
          hideToolbarOnScroll = props.hideToolbarOnScroll,
          messagesContent = props.messagesContent,
          loginScreen = props.loginScreen;

      return _utils2.default.classNames(className, 'page-content', {
        tab: tab,
        'tab-active': tabActive,
        'ptr-content': ptr,
        'infinite-scroll-content': infinite,
        'infinite-scroll-top': infiniteTop,
        'hide-bars-on-scroll': hideBarsOnScroll,
        'hide-navbar-on-scroll': hideNavbarOnScroll,
        'hide-toolbar-on-scroll': hideToolbarOnScroll,
        'messages-content': messagesContent,
        'login-screen-content': loginScreen
      }, _mixins2.default.colorClasses(props));
    }
  }, {
    key: 'slots',
    get: function get() {
      return (0, _reactComponentSlots2.default)(this.props);
    }
  }, {
    key: 'refs',
    get: function get() {
      return this.__reactRefs;
    },
    set: function set(refs) {}
  }]);

  return F7PageContent;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7PageContent, Object.assign({
  id: [String, Number],
  tab: Boolean,
  tabActive: Boolean,
  ptr: Boolean,
  ptrDistance: Number,
  ptrPreloader: {
    type: Boolean,
    default: true
  },
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
}, _mixins2.default.colorProps));

exports.default = F7PageContent;