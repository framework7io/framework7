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
import F7PageContent from './page-content';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Page =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Page, _React$Component);

  function F7Page(props, context) {
    var _this;

    _classCallCheck(this, F7Page);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Page).call(this, props, context));
    _this.__reactRefs = {};

    _this.state = function () {
      return {
        hasSubnavbar: false,
        hasNavbarLarge: false,
        hasNavbarLargeCollapsed: false,
        hasCardExpandableOpened: false,
        routerPositionClass: '',
        routerForceUnstack: false,
        routerPageRole: null,
        routerPageRoleDetailRoot: false,
        routerPageMasterStack: false
      };
    }();

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onPtrPullStart', 'onPtrPullMove', 'onPtrPullEnd', 'onPtrRefresh', 'onPtrDone', 'onInfinite', 'onPageMounted', 'onPageInit', 'onPageReinit', 'onPageBeforeIn', 'onPageBeforeOut', 'onPageAfterOut', 'onPageAfterIn', 'onPageBeforeRemove', 'onPageStack', 'onPageUnstack', 'onPagePosition', 'onPageRole', 'onPageMasterStack', 'onPageMasterUnstack', 'onPageNavbarLargeCollapsed', 'onPageNavbarLargeExpanded', 'onCardOpened', 'onCardClose']);
    })();

    return _this;
  }

  _createClass(F7Page, [{
    key: "onPtrPullStart",
    value: function onPtrPullStart() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.dispatchEvent.apply(this, ['ptr:pullstart ptrPullStart'].concat(args));
    }
  }, {
    key: "onPtrPullMove",
    value: function onPtrPullMove() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.dispatchEvent.apply(this, ['ptr:pullmove ptrPullMove'].concat(args));
    }
  }, {
    key: "onPtrPullEnd",
    value: function onPtrPullEnd() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.dispatchEvent.apply(this, ['ptr:pullend ptrPullEnd'].concat(args));
    }
  }, {
    key: "onPtrRefresh",
    value: function onPtrRefresh() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.dispatchEvent.apply(this, ['ptr:refresh ptrRefresh'].concat(args));
    }
  }, {
    key: "onPtrDone",
    value: function onPtrDone() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this.dispatchEvent.apply(this, ['ptr:done ptrDone'].concat(args));
    }
  }, {
    key: "onInfinite",
    value: function onInfinite() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      this.dispatchEvent.apply(this, ['infinite'].concat(args));
    }
  }, {
    key: "onPageMounted",
    value: function onPageMounted(page) {
      if (this.eventTargetEl !== page.el) return;
      this.dispatchEvent('page:mounted pageMounted', page);
    }
  }, {
    key: "onPageInit",
    value: function onPageInit(page) {
      if (this.eventTargetEl !== page.el) return;
      var _this$props = this.props,
          withSubnavbar = _this$props.withSubnavbar,
          subnavbar = _this$props.subnavbar,
          withNavbarLarge = _this$props.withNavbarLarge,
          navbarLarge = _this$props.navbarLarge;

      if (typeof withSubnavbar === 'undefined' && typeof subnavbar === 'undefined') {
        if (page.$navbarEl && page.$navbarEl.length && page.$navbarEl.find('.subnavbar').length || page.$el.children('.navbar').find('.subnavbar').length) {
          this.setState({
            hasSubnavbar: true
          });
        }
      }

      if (typeof withNavbarLarge === 'undefined' && typeof navbarLarge === 'undefined') {
        if (page.$navbarEl && page.$navbarEl.hasClass('navbar-large')) {
          this.setState({
            hasNavbarLarge: true
          });
        }
      }

      this.dispatchEvent('page:init pageInit', page);
    }
  }, {
    key: "onPageReinit",
    value: function onPageReinit(page) {
      if (this.eventTargetEl !== page.el) return;
      this.dispatchEvent('page:reinit pageReinit', page);
    }
  }, {
    key: "onPageBeforeIn",
    value: function onPageBeforeIn(page) {
      if (this.eventTargetEl !== page.el) return;

      if (!page.swipeBack) {
        if (page.from === 'next') {
          this.setState({
            routerPositionClass: 'page-next'
          });
        }

        if (page.from === 'previous') {
          this.setState({
            routerPositionClass: 'page-previous'
          });
        }
      }

      this.dispatchEvent('page:beforein pageBeforeIn', page);
    }
  }, {
    key: "onPageBeforeOut",
    value: function onPageBeforeOut(page) {
      if (this.eventTargetEl !== page.el) return;
      this.dispatchEvent('page:beforeout pageBeforeOut', page);
    }
  }, {
    key: "onPageAfterOut",
    value: function onPageAfterOut(page) {
      if (this.eventTargetEl !== page.el) return;

      if (page.to === 'next') {
        this.setState({
          routerPositionClass: 'page-next'
        });
      }

      if (page.to === 'previous') {
        this.setState({
          routerPositionClass: 'page-previous'
        });
      }

      this.dispatchEvent('page:afterout pageAfterOut', page);
    }
  }, {
    key: "onPageAfterIn",
    value: function onPageAfterIn(page) {
      if (this.eventTargetEl !== page.el) return;
      this.setState({
        routerPositionClass: 'page-current'
      });
      this.dispatchEvent('page:afterin pageAfterIn', page);
    }
  }, {
    key: "onPageBeforeRemove",
    value: function onPageBeforeRemove(page) {
      if (this.eventTargetEl !== page.el) return;
      this.dispatchEvent('page:beforeremove pageBeforeRemove', page);
    }
  }, {
    key: "onPageStack",
    value: function onPageStack(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerForceUnstack: false
      });
    }
  }, {
    key: "onPageUnstack",
    value: function onPageUnstack(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerForceUnstack: true
      });
    }
  }, {
    key: "onPagePosition",
    value: function onPagePosition(pageEl, position) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerPositionClass: "page-".concat(position)
      });
    }
  }, {
    key: "onPageRole",
    value: function onPageRole(pageEl, rolesData) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerPageRole: rolesData.role,
        routerPageRoleDetailRoot: rolesData.detailRoot
      });
    }
  }, {
    key: "onPageMasterStack",
    value: function onPageMasterStack(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerPageMasterStack: true
      });
    }
  }, {
    key: "onPageMasterUnstack",
    value: function onPageMasterUnstack(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerPageMasterStack: false
      });
    }
  }, {
    key: "onPageNavbarLargeCollapsed",
    value: function onPageNavbarLargeCollapsed(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        hasNavbarLargeCollapsed: true
      });
    }
  }, {
    key: "onPageNavbarLargeExpanded",
    value: function onPageNavbarLargeExpanded(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        hasNavbarLargeCollapsed: false
      });
    }
  }, {
    key: "onCardOpened",
    value: function onCardOpened(cardEl, pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        hasCardExpandableOpened: true
      });
    }
  }, {
    key: "onCardClose",
    value: function onCardClose(cardEl, pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        hasCardExpandableOpened: false
      });
    }
  }, {
    key: "render",
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
          ptrBottom = props.ptrBottom,
          ptrMousewheel = props.ptrMousewheel,
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
          navbarLarge = props.navbarLarge,
          withNavbarLarge = props.withNavbarLarge,
          noNavbar = props.noNavbar,
          noToolbar = props.noToolbar,
          noSwipeback = props.noSwipeback;
      var fixedList = [];
      var staticList = [];
      var _self$slots = self.slots,
          slotsStatic = _self$slots.static,
          slotsFixed = _self$slots.fixed,
          slotsDefault = _self$slots.default;
      var fixedTags;
      fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ').map(function (tagName) {
        return "f7-".concat(tagName);
      });
      var hasSubnavbar;
      var hasMessages;
      var hasNavbarLarge;
      hasMessages = messagesContent;

      if (slotsDefault) {
        slotsDefault.forEach(function (child) {
          if (typeof child === 'undefined') return;
          var isFixedTag = false;
          {
            var tag = child.type && (child.type.displayName || child.type.name);

            if (!tag) {
              if (pageContent) staticList.push(child);
              return;
            }

            if (tag === 'F7Subnavbar' || tag === 'f7-subnavbar') hasSubnavbar = true;

            if (tag === 'F7Navbar' || tag === 'f7-navbar') {
              if (child.props && child.props.large) hasNavbarLarge = true;
            }

            if (typeof hasMessages === 'undefined' && (tag === 'F7Messages' || tag === 'f7-messages')) hasMessages = true;

            if (fixedTags.indexOf(tag) >= 0) {
              isFixedTag = true;
            }
          }

          if (pageContent) {
            if (isFixedTag) fixedList.push(child);else staticList.push(child);
          }
        });
      }

      var forceSubnavbar = typeof subnavbar === 'undefined' && typeof withSubnavbar === 'undefined' ? hasSubnavbar || this.state.hasSubnavbar : false;
      var forceNavbarLarge = typeof navbarLarge === 'undefined' && typeof withNavbarLarge === 'undefined' ? hasNavbarLarge || this.state.hasNavbarLarge : false;
      var classes = Utils.classNames(className, 'page', this.state.routerPositionClass, {
        stacked: stacked && !this.state.routerForceUnstack,
        tabs: tabs,
        'page-with-subnavbar': subnavbar || withSubnavbar || forceSubnavbar,
        'page-with-navbar-large': navbarLarge || withNavbarLarge || forceNavbarLarge,
        'no-navbar': noNavbar,
        'no-toolbar': noToolbar,
        'no-swipeback': noSwipeback,
        'page-master': this.state.routerPageRole === 'master',
        'page-master-detail': this.state.routerPageRole === 'detail',
        'page-master-detail-root': this.state.routerPageRoleDetailRoot === true,
        'page-master-stacked': this.state.routerPageMasterStack === true,
        'page-with-navbar-large-collapsed': this.state.hasNavbarLargeCollapsed === true,
        'page-with-card-opened': this.state.hasCardExpandableOpened === true,
        'login-screen-page': loginScreen
      }, Mixins.colorClasses(props));

      if (!pageContent) {
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes,
          'data-name': name
        }, slotsFixed, slotsStatic, slotsDefault);
      }

      var pageContentEl = React.createElement(F7PageContent, {
        ptr: ptr,
        ptrDistance: ptrDistance,
        ptrPreloader: ptrPreloader,
        ptrBottom: ptrBottom,
        ptrMousewheel: ptrMousewheel,
        infinite: infinite,
        infiniteTop: infiniteTop,
        infiniteDistance: infiniteDistance,
        infinitePreloader: infinitePreloader,
        hideBarsOnScroll: hideBarsOnScroll,
        hideNavbarOnScroll: hideNavbarOnScroll,
        hideToolbarOnScroll: hideToolbarOnScroll,
        messagesContent: messagesContent || hasMessages,
        loginScreen: loginScreen,
        onPtrPullStart: self.onPtrPullStart,
        onPtrPullMove: self.onPtrPullMove,
        onPtrPullEnd: self.onPtrPullEnd,
        onPtrRefresh: self.onPtrRefresh,
        onPtrDone: self.onPtrDone,
        onInfinite: self.onInfinite
      }, slotsStatic, staticList);
      return React.createElement('div', {
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
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      if (!self.$f7) return;
      var f7 = self.$f7;
      f7.off('pageMounted', self.onPageMounted);
      f7.off('pageInit', self.onPageInit);
      f7.off('pageReinit', self.onPageReinit);
      f7.off('pageBeforeIn', self.onPageBeforeIn);
      f7.off('pageBeforeOut', self.onPageBeforeOut);
      f7.off('pageAfterOut', self.onPageAfterOut);
      f7.off('pageAfterIn', self.onPageAfterIn);
      f7.off('pageBeforeRemove', self.onPageBeforeRemove);
      f7.off('pageStack', self.onPageStack);
      f7.off('pageUnstack', self.onPageUnstack);
      f7.off('pagePosition', self.onPagePosition);
      f7.off('pageRole', self.onPageRole);
      f7.off('pageMasterStack', self.onPageMasterStack);
      f7.off('pageMasterUnstack', self.onPageMasterUnstack);
      f7.off('pageNavbarLargeCollapsed', self.onPageNavbarLargeCollapsed);
      f7.off('pageNavbarLargeExpanded', self.onPageNavbarLargeExpanded);
      f7.off('cardOpened', self.onCardOpened);
      f7.off('cardClose', self.onCardClose);
      self.eventTargetEl = null;
      delete self.eventTargetEl;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      self.$f7ready(function (f7) {
        self.eventTargetEl = el;
        f7.on('pageMounted', self.onPageMounted);
        f7.on('pageInit', self.onPageInit);
        f7.on('pageReinit', self.onPageReinit);
        f7.on('pageBeforeIn', self.onPageBeforeIn);
        f7.on('pageBeforeOut', self.onPageBeforeOut);
        f7.on('pageAfterOut', self.onPageAfterOut);
        f7.on('pageAfterIn', self.onPageAfterIn);
        f7.on('pageBeforeRemove', self.onPageBeforeRemove);
        f7.on('pageStack', self.onPageStack);
        f7.on('pageUnstack', self.onPageUnstack);
        f7.on('pagePosition', self.onPagePosition);
        f7.on('pageRole', self.onPageRole);
        f7.on('pageMasterStack', self.onPageMasterStack);
        f7.on('pageMasterUnstack', self.onPageMasterUnstack);
        f7.on('pageNavbarLargeCollapsed', self.onPageNavbarLargeCollapsed);
        f7.on('pageNavbarLargeExpanded', self.onPageNavbarLargeExpanded);
        f7.on('cardOpened', self.onCardOpened);
        f7.on('cardClose', self.onCardClose);
      });
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(events) {
      for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        args[_key7 - 1] = arguments[_key7];
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

  return F7Page;
}(React.Component);

__reactComponentSetProps(F7Page, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  name: String,
  stacked: Boolean,
  withSubnavbar: {
    type: Boolean,
    default: undefined
  },
  subnavbar: {
    type: Boolean,
    default: undefined
  },
  withNavbarLarge: {
    type: Boolean,
    default: undefined
  },
  navbarLarge: {
    type: Boolean,
    default: undefined
  },
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

F7Page.displayName = 'f7-page';
export default F7Page;