'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

var _f = require('../utils/f7');

var _f2 = _interopRequireDefault(_f);

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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var F7Tab = function (_React$Component) {
  _inherits(F7Tab, _React$Component);

  function F7Tab(props, context) {
    _classCallCheck(this, F7Tab);

    var _this = _possibleConstructorReturn(this, (F7Tab.__proto__ || Object.getPrototypeOf(F7Tab)).call(this, props, context));

    _this.__reactRefs = {};

    _this.state = function () {
      return {
        tabContent: null
      };
    }();

    (function () {
      _this.onTabShowBound = _this.onTabShow.bind(_this);
      _this.onTabHideBound = _this.onTabHide.bind(_this);
    })();
    return _this;
  }

  _createClass(F7Tab, [{
    key: 'show',
    value: function show(animate) {
      if (!this.$f7) return;
      this.$f7.tab.show(this.refs.el, animate);
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
      var tabActive = props.tabActive,
          id = props.id,
          className = props.className,
          style = props.style;

      var tabContent = self.state.tabContent;
      var classes = _utils2.default.classNames(className, 'tab', {
        'tab-active': tabActive
      }, _mixins2.default.colorClasses(props));
      var TabContent = void 0;
      if (tabContent) TabContent = tabContent.component;
      {
        return _react2.default.createElement('div', {
          id: id,
          style: style,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          className: classes
        }, tabContent ? _react2.default.createElement(TabContent, Object.assign({
          key: tabContent.id
        }, tabContent.props)) : this.slots['default']);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;

      if (el) {
        el.addEventListener('tab:show', self.onTabShowBound);
        el.addEventListener('tab:hide', self.onTabHideBound);
      }

      self.setState({
        tabContent: null
      });
      self.$f7ready(function () {
        self.routerData = {
          el: el,
          component: self
        };
        _f2.default.routers.tabs.push(self.routerData);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      var el = self.refs.el;

      if (el) {
        el.removeEventListener('tab:show', self.onTabShowBound);
        el.removeEventListener('tab:hide', self.onTabHideBound);
      }

      if (!self.routerData) return;
      _f2.default.routers.tabs.splice(_f2.default.routers.tabs.indexOf(self.routerData), 1);
      self.routerData = null;
      delete self.routerData;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var self = this;
      if (!self.routerData) return;
      _events2.default.emit('tabRouterDidUpdate', self.routerData);
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

  return F7Tab;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Tab, Object.assign({
  id: [String, Number],
  tabActive: Boolean
}, _mixins2.default.colorProps));

exports.default = F7Tab;