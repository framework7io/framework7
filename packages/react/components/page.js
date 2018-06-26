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

var _pageContent = require('./page-content');

var _pageContent2 = _interopRequireDefault(_pageContent);

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

var F7Page = function (_React$Component) {
  _inherits(F7Page, _React$Component);

  function F7Page(props, context) {
    _classCallCheck(this, F7Page);

    var _this = _possibleConstructorReturn(this, (F7Page.__proto__ || Object.getPrototypeOf(F7Page)).call(this, props, context));

    _this.__reactRefs = {};

    _this.state = function () {
      return {
        hasSubnavbar: false
      };
    }();
    return _this;
  }

  _createClass(F7Page, [{
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
    key: 'onPageMounted',
    value: function onPageMounted(event) {
      this.dispatchEvent('page:mounted pageMounted', event, event.detail);
    }
  }, {
    key: 'onPageInit',
    value: function onPageInit(event) {
      this.dispatchEvent('page:init pageInit', event, event.detail);
    }
  }, {
    key: 'onPageReinit',
    value: function onPageReinit(event) {
      this.dispatchEvent('page:reinit pageReinit', event, event.detail);
    }
  }, {
    key: 'onPageBeforeIn',
    value: function onPageBeforeIn(event) {
      this.dispatchEvent('page:beforein pageBeforeIn', event, event.detail);
    }
  }, {
    key: 'onPageBeforeOut',
    value: function onPageBeforeOut(event) {
      this.dispatchEvent('page:beforeout pageBeforeOut', event, event.detail);
    }
  }, {
    key: 'onPageAfterOut',
    value: function onPageAfterOut(event) {
      this.dispatchEvent('page:afterout pageAfterOut', event, event.detail);
    }
  }, {
    key: 'onPageAfterIn',
    value: function onPageAfterIn(event) {
      this.dispatchEvent('page:afterin pageAfterIn', event, event.detail);
    }
  }, {
    key: 'onPageBeforeRemove',
    value: function onPageBeforeRemove(event) {
      this.dispatchEvent('page:beforeremove pageBeforeRemove', event, event.detail);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var id = props.id,
          style = props.style,
          name = props.name,
          pageContent = props.pageContent,
          messagesContent = props.messagesContent,
          ptr = props.ptr,
          ptrDistance = props.ptrDistance,
          ptrPreloader = props.ptrPreloader,
          infinite = props.infinite,
          infiniteDistance = props.infiniteDistance,
          infinitePreloader = props.infinitePreloader,
          infiniteTop = props.infiniteTop,
          hideBarsOnScroll = props.hideBarsOnScroll,
          hideNavbarOnScroll = props.hideNavbarOnScroll,
          hideToolbarOnScroll = props.hideToolbarOnScroll,
          loginScreen = props.loginScreen,
          className = props.className,
          stacked = props.stacked,
          tabs = props.tabs,
          subnavbar = props.subnavbar,
          withSubnavbar = props.withSubnavbar,
          noNavbar = props.noNavbar,
          noToolbar = props.noToolbar,
          noSwipeback = props.noSwipeback;

      var fixedList = [];
      var staticList = [];
      var needsPageContent = pageContent;
      var _self$slots = self.slots,
          slotsStatic = _self$slots.static,
          slotsFixed = _self$slots.fixed,
          slotsDefault = _self$slots.default;

      var fixedTags = void 0;
      fixedTags = 'Navbar Toolbar Tabbar Subnavbar Searchbar Messagebar Fab ListIndex'.split(' ').map(function (tagName) {
        return 'F7' + tagName;
      });
      var hasSubnavbar = void 0;
      var hasMessages = void 0;
      hasMessages = messagesContent;

      if (slotsDefault) {
        slotsDefault.forEach(function (child) {
          if (typeof child === 'undefined') return;
          var isFixedTag = false;
          {
            var tag = child.type && child.type.name;

            if (!tag) {
              if (needsPageContent) staticList.push(child);
              return;
            }

            if (tag === 'F7Subnavbar') hasSubnavbar = true;
            if (typeof hasMessages === 'undefined' && tag === 'F7Messages') hasMessages = true;

            if (fixedTags.indexOf(tag) >= 0) {
              isFixedTag = true;
            }
          }

          if (needsPageContent) {
            if (isFixedTag) fixedList.push(child);else staticList.push(child);
          }
        });
      }

      var classes = _utils2.default.classNames(className, 'page', {
        stacked: stacked,
        tabs: tabs,
        'page-with-subnavbar': subnavbar || withSubnavbar || hasSubnavbar,
        'no-navbar': noNavbar,
        'no-toolbar': noToolbar,
        'no-swipeback': noSwipeback
      }, _mixins2.default.colorClasses(props));

      if (!needsPageContent) {
        return _react2.default.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes,
          'data-name': name
        }, slotsFixed, slotsStatic, slotsDefault);
      }

      var pageContentEl = _react2.default.createElement(_pageContent2.default, {
        ptr: ptr,
        ptrDistance: ptrDistance,
        ptrPreloader: ptrPreloader,
        infinite: infinite,
        infiniteTop: infiniteTop,
        infiniteDistance: infiniteDistance,
        infinitePreloader: infinitePreloader,
        hideBarsOnScroll: hideBarsOnScroll,
        hideNavbarOnScroll: hideNavbarOnScroll,
        hideToolbarOnScroll: hideToolbarOnScroll,
        messagesContent: messagesContent || hasMessages,
        loginScreen: loginScreen
      }, slotsStatic, staticList);
      return _react2.default.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes,
        'data-name': name
      }, fixedList, slotsFixed, pageContentEl);
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
      el.removeEventListener('page:mounted', self.onPageMounted);
      el.removeEventListener('page:init', self.onPageInit);
      el.removeEventListener('page:reinit', self.onPageReinit);
      el.removeEventListener('page:beforein', self.onPageBeforeIn);
      el.removeEventListener('page:beforeout', self.onPageBeforeOut);
      el.removeEventListener('page:afterout', self.onPageAfterOut);
      el.removeEventListener('page:afterin', self.onPageAfterIn);
      el.removeEventListener('page:beforeremove', self.onPageBeforeRemove);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      var _self$props = self.props,
          ptr = _self$props.ptr,
          infinite = _self$props.infinite;

      self.onPtrPullStart = self.onPtrPullStart.bind(self);
      self.onPtrPullMove = self.onPtrPullMove.bind(self);
      self.onPtrPullEnd = self.onPtrPullEnd.bind(self);
      self.onPtrRefresh = self.onPtrRefresh.bind(self);
      self.onPtrDone = self.onPtrDone.bind(self);
      self.onInfinite = self.onInfinite.bind(self);
      self.onPageMounted = self.onPageMounted.bind(self);
      self.onPageInit = self.onPageInit.bind(self);
      self.onPageReinit = self.onPageReinit.bind(self);
      self.onPageBeforeIn = self.onPageBeforeIn.bind(self);
      self.onPageBeforeOut = self.onPageBeforeOut.bind(self);
      self.onPageAfterOut = self.onPageAfterOut.bind(self);
      self.onPageAfterIn = self.onPageAfterIn.bind(self);
      self.onPageBeforeRemove = self.onPageBeforeRemove.bind(self);

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

      el.addEventListener('page:mounted', self.onPageMounted);
      el.addEventListener('page:init', self.onPageInit);
      el.addEventListener('page:reinit', self.onPageReinit);
      el.addEventListener('page:beforein', self.onPageBeforeIn);
      el.addEventListener('page:beforeout', self.onPageBeforeOut);
      el.addEventListener('page:afterout', self.onPageAfterOut);
      el.addEventListener('page:afterin', self.onPageAfterIn);
      el.addEventListener('page:beforeremove', self.onPageBeforeRemove);
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

  return F7Page;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Page, Object.assign({
  id: [String, Number],
  name: String,
  stacked: Boolean,
  withSubnavbar: Boolean,
  subnavbar: Boolean,
  noNavbar: Boolean,
  noToolbar: Boolean,
  tabs: Boolean,
  pageContent: {
    type: Boolean,
    default: true
  },
  noSwipeback: Boolean,
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

exports.default = F7Page;