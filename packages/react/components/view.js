'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _f = require('../utils/f7');

var _f2 = _interopRequireDefault(_f);

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

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

var F7View = function (_React$Component) {
  _inherits(F7View, _React$Component);

  function F7View(props, context) {
    _classCallCheck(this, F7View);

    var _this = _possibleConstructorReturn(this, (F7View.__proto__ || Object.getPrototypeOf(F7View)).call(this, props, context));

    _this.__reactRefs = {};

    _this.state = function () {
      return {
        pages: []
      };
    }();

    (function () {
      var self = _this;
      self.onSwipeBackMoveBound = self.onSwipeBackMove.bind(self);
      self.onSwipeBackBeforeChangeBound = self.onSwipeBackBeforeChange.bind(self);
      self.onSwipeBackAfterChangeBound = self.onSwipeBackAfterChange.bind(self);
      self.onSwipeBackBeforeResetBound = self.onSwipeBackBeforeReset.bind(self);
      self.onSwipeBackAfterResetBound = self.onSwipeBackAfterReset.bind(self);
      self.onTabShowBound = self.onTabShow.bind(self);
      self.onTabHideBound = self.onTabHide.bind(self);
    })();
    return _this;
  }

  _createClass(F7View, [{
    key: 'onSwipeBackMove',
    value: function onSwipeBackMove(event) {
      this.dispatchEvent('swipeback:move swipeBackMove', event, event.detail);
    }
  }, {
    key: 'onSwipeBackBeforeChange',
    value: function onSwipeBackBeforeChange(event) {
      this.dispatchEvent('swipeback:beforechange swipeBackBeforeChange', event, event.detail);
    }
  }, {
    key: 'onSwipeBackAfterChange',
    value: function onSwipeBackAfterChange(event) {
      this.dispatchEvent('swipeback:afterchange swipeBackAfterChange', event, event.detail);
    }
  }, {
    key: 'onSwipeBackBeforeReset',
    value: function onSwipeBackBeforeReset(event) {
      this.dispatchEvent('swipeback:beforereset swipeBackBeforeReset', event, event.detail);
    }
  }, {
    key: 'onSwipeBackAfterReset',
    value: function onSwipeBackAfterReset(event) {
      this.dispatchEvent('swipeback:afterreset swipeBackAfterReset', event, event.detail);
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
      var id = props.id,
          style = props.style,
          tab = props.tab,
          main = props.main,
          tabActive = props.tabActive,
          className = props.className;

      var classes = _utils2.default.classNames(className, 'view', {
        'view-main': main,
        'tab-active': tabActive,
        tab: tab
      }, _mixins2.default.colorClasses(props));
      return _react2.default.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, this.slots['default'], self.state.pages.map(function (page) {
        var PageComponent = page.component;
        {
          return _react2.default.createElement(PageComponent, Object.assign({
            key: page.id
          }, page.props));
        }
      }));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var self = this;
      if (!self.routerData) return;
      _events2.default.emit('viewRouterDidUpdate', self.routerData);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      var el = self.refs.el;
      el.removeEventListener('swipeback:move', self.onSwipeBackMoveBound);
      el.removeEventListener('swipeback:beforechange', self.onSwipeBackBeforeChangeBound);
      el.removeEventListener('swipeback:afterchange', self.onSwipeBackAfterChangeBound);
      el.removeEventListener('swipeback:beforereset', self.onSwipeBackBeforeResetBound);
      el.removeEventListener('swipeback:afterreset', self.onSwipeBackAfterResetBound);
      el.removeEventListener('tab:show', self.onTabShowBound);
      el.removeEventListener('tab:hide', self.onTabHideBound);
      if (!self.props.init) return;
      if (self.f7View && self.f7View.destroy) self.f7View.destroy();
      _f2.default.routers.views.splice(_f2.default.routers.views.indexOf(self.routerData), 1);
      self.routerData = null;
      delete self.routerData;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      el.addEventListener('swipeback:move', self.onSwipeBackMoveBound);
      el.addEventListener('swipeback:beforechange', self.onSwipeBackBeforeChangeBound);
      el.addEventListener('swipeback:afterchange', self.onSwipeBackAfterChangeBound);
      el.addEventListener('swipeback:beforereset', self.onSwipeBackBeforeResetBound);
      el.addEventListener('swipeback:afterreset', self.onSwipeBackAfterResetBound);
      el.addEventListener('tab:show', self.onTabShowBound);
      el.addEventListener('tab:hide', self.onTabHideBound);
      self.setState({
        pages: []
      });
      self.$f7ready(function (f7Instance) {
        if (!self.props.init) return;
        self.routerData = {
          el: el,
          component: self,
          instance: null
        };
        _f2.default.routers.views.push(self.routerData);
        self.routerData.instance = f7Instance.views.create(el, _utils2.default.noUndefinedProps(self.props));
        self.f7View = self.routerData.instance;
      });
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

  return F7View;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7View, Object.assign({
  id: [String, Number],
  tab: Boolean,
  tabActive: Boolean,
  name: String,
  router: Boolean,
  linksView: [Object, String],
  url: String,
  main: Boolean,
  stackPages: Boolean,
  xhrCache: String,
  xhrCacheIgnore: Array,
  xhrCacheIgnoreGetParameters: Boolean,
  xhrCacheDuration: Number,
  preloadPreviousPage: Boolean,
  uniqueHistory: Boolean,
  uniqueHistoryIgnoreGetParameters: Boolean,
  allowDuplicateUrls: Boolean,
  reloadPages: Boolean,
  removeElements: Boolean,
  removeElementsWithTimeout: Boolean,
  removeElementsTimeout: Number,
  restoreScrollTopOnBack: Boolean,
  iosSwipeBack: Boolean,
  iosSwipeBackAnimateShadow: Boolean,
  iosSwipeBackAnimateOpacity: Boolean,
  iosSwipeBackActiveArea: Number,
  iosSwipeBackThreshold: Number,
  pushState: Boolean,
  pushStateRoot: String,
  pushStateAnimate: Boolean,
  pushStateAnimateOnLoad: Boolean,
  pushStateSeparator: String,
  pushStateOnLoad: Boolean,
  animate: Boolean,
  iosDynamicNavbar: Boolean,
  iosSeparateDynamicNavbar: Boolean,
  iosAnimateNavbarBackIcon: Boolean,
  materialPageLoadDelay: Number,
  passRouteQueryToRequest: Boolean,
  passRouteParamsToRequest: Boolean,
  routes: Array,
  routesAdd: Array,
  init: {
    type: Boolean,
    default: true
  }
}, _mixins2.default.colorProps));

exports.default = F7View;