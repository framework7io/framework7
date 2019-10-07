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
import f7 from '../utils/f7';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7View =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7View, _React$Component);

  function F7View(props, context) {
    var _this;

    _classCallCheck(this, F7View);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7View).call(this, props, context));
    _this.__reactRefs = {};

    _this.state = function () {
      return {
        pages: []
      };
    }();

    (function () {
      var self = _assertThisInitialized(_this);

      Utils.bindMethods(self, ['onSwipeBackMove', 'onSwipeBackBeforeChange', 'onSwipeBackAfterChange', 'onSwipeBackBeforeReset', 'onSwipeBackAfterReset', 'onTabShow', 'onTabHide', 'onViewInit']);
    })();

    return _this;
  }

  _createClass(F7View, [{
    key: "onViewInit",
    value: function onViewInit(view) {
      var self = this;
      self.dispatchEvent('view:init viewInit', view);

      if (!self.props.init) {
        self.routerData.instance = view;
        self.f7View = self.routerData.instance;
      }
    }
  }, {
    key: "onSwipeBackMove",
    value: function onSwipeBackMove(data) {
      var swipeBackData = data;
      this.dispatchEvent('swipeback:move swipeBackMove', swipeBackData);
    }
  }, {
    key: "onSwipeBackBeforeChange",
    value: function onSwipeBackBeforeChange(data) {
      var swipeBackData = data;
      this.dispatchEvent('swipeback:beforechange swipeBackBeforeChange', swipeBackData);
    }
  }, {
    key: "onSwipeBackAfterChange",
    value: function onSwipeBackAfterChange(data) {
      var swipeBackData = data;
      this.dispatchEvent('swipeback:afterchange swipeBackAfterChange', swipeBackData);
    }
  }, {
    key: "onSwipeBackBeforeReset",
    value: function onSwipeBackBeforeReset(data) {
      var swipeBackData = data;
      this.dispatchEvent('swipeback:beforereset swipeBackBeforeReset', swipeBackData);
    }
  }, {
    key: "onSwipeBackAfterReset",
    value: function onSwipeBackAfterReset(data) {
      var swipeBackData = data;
      this.dispatchEvent('swipeback:afterreset swipeBackAfterReset', swipeBackData);
    }
  }, {
    key: "onTabShow",
    value: function onTabShow(el) {
      if (el === this.refs.el) {
        this.dispatchEvent('tab:show tabShow');
      }
    }
  }, {
    key: "onTabHide",
    value: function onTabHide(el) {
      if (el === this.refs.el) {
        this.dispatchEvent('tab:hide tabHide');
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var id = props.id,
          style = props.style,
          tab = props.tab,
          main = props.main,
          tabActive = props.tabActive,
          className = props.className;
      var classes = Utils.classNames(className, 'view', {
        'view-main': main,
        'tab-active': tabActive,
        tab: tab
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, this.slots['default'], self.state.pages.map(function (page) {
        var PageComponent = page.component;
        {
          return React.createElement(PageComponent, Object.assign({
            key: page.id
          }, page.props));
        }
      }));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var self = this;
      if (!self.routerData) return;
      f7.events.emit('viewRouterDidUpdate', self.routerData);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;

      if (f7.instance) {
        f7.instance.off('tabShow', self.onTabShow);
        f7.instance.off('tabHide', self.onTabHide);
      }

      if (self.f7View) {
        self.f7View.off('swipebackMove', self.onSwipeBackMove);
        self.f7View.off('swipebackBeforeChange', self.onSwipeBackBeforeChange);
        self.f7View.off('swipebackAfterChange', self.onSwipeBackAfterChange);
        self.f7View.off('swipebackBeforeReset', self.onSwipeBackBeforeReset);
        self.f7View.off('swipebackAfterReset', self.onSwipeBackAfterReset);
        if (self.f7View.destroy) self.f7View.destroy();
      }

      f7.routers.views.splice(f7.routers.views.indexOf(self.routerData), 1);
      self.routerData = null;
      delete self.routerData;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      self.$f7ready(function (f7Instance) {
        f7Instance.on('tabShow', self.onTabShow);
        f7Instance.on('tabHide', self.onTabHide);
        self.routerData = {
          el: el,
          component: self,
          pages: self.state.pages,
          instance: null,
          setPages: function setPages(pages) {
            self.setState({
              pages: pages
            });
          }
        };
        f7.routers.views.push(self.routerData);
        if (!self.props.init) return;
        self.routerData.instance = f7Instance.views.create(el, Object.assign({
          on: {
            init: self.onViewInit
          }
        }, Utils.noUndefinedProps(self.props)));
        self.f7View = self.routerData.instance;
        self.f7View.on('swipebackMove', self.onSwipeBackMove);
        self.f7View.on('swipebackBeforeChange', self.onSwipeBackBeforeChange);
        self.f7View.on('swipebackAfterChange', self.onSwipeBackAfterChange);
        self.f7View.on('swipebackBeforeReset', self.onSwipeBackBeforeReset);
        self.f7View.on('swipebackAfterReset', self.onSwipeBackAfterReset);
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

  return F7View;
}(React.Component);

__reactComponentSetProps(F7View, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  tab: Boolean,
  tabActive: Boolean,
  name: String,
  router: Boolean,
  linksView: [Object, String],
  url: String,
  main: Boolean,
  stackPages: Boolean,
  xhrCache: Boolean,
  xhrCacheIgnore: Array,
  xhrCacheIgnoreGetParameters: Boolean,
  xhrCacheDuration: Number,
  preloadPreviousPage: Boolean,
  allowDuplicateUrls: Boolean,
  reloadPages: Boolean,
  reloadDetail: Boolean,
  masterDetailBreakpoint: Number,
  removeElements: Boolean,
  removeElementsWithTimeout: Boolean,
  removeElementsTimeout: Number,
  restoreScrollTopOnBack: Boolean,
  loadInitialPage: Boolean,
  iosSwipeBack: Boolean,
  iosSwipeBackAnimateShadow: Boolean,
  iosSwipeBackAnimateOpacity: Boolean,
  iosSwipeBackActiveArea: Number,
  iosSwipeBackThreshold: Number,
  mdSwipeBack: Boolean,
  mdSwipeBackAnimateShadow: Boolean,
  mdSwipeBackAnimateOpacity: Boolean,
  mdSwipeBackActiveArea: Number,
  mdSwipeBackThreshold: Number,
  auroraSwipeBack: Boolean,
  auroraSwipeBackAnimateShadow: Boolean,
  auroraSwipeBackAnimateOpacity: Boolean,
  auroraSwipeBackActiveArea: Number,
  auroraSwipeBackThreshold: Number,
  pushState: Boolean,
  pushStateRoot: String,
  pushStateAnimate: Boolean,
  pushStateAnimateOnLoad: Boolean,
  pushStateSeparator: String,
  pushStateOnLoad: Boolean,
  animate: Boolean,
  transition: String,
  iosDynamicNavbar: Boolean,
  iosAnimateNavbarBackIcon: Boolean,
  materialPageLoadDelay: Number,
  passRouteQueryToRequest: Boolean,
  passRouteParamsToRequest: Boolean,
  routes: Array,
  routesAdd: Array,
  routesBeforeEnter: [Function, Array],
  routesBeforeLeave: [Function, Array],
  init: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps));

F7View.displayName = 'f7-view';
export default F7View;