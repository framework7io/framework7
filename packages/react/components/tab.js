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

var F7Tab =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Tab, _React$Component);

  function F7Tab(props, context) {
    var _this;

    _classCallCheck(this, F7Tab);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Tab).call(this, props, context));
    _this.__reactRefs = {};

    _this.state = function () {
      return {
        tabContent: null
      };
    }();

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onTabShow', 'onTabHide']);
    })();

    return _this;
  }

  _createClass(F7Tab, [{
    key: "show",
    value: function show(animate) {
      if (!this.$f7) return;
      this.$f7.tab.show(this.refs.el, animate);
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
      var tabActive = props.tabActive,
          id = props.id,
          className = props.className,
          style = props.style;
      var tabContent = self.state.tabContent;
      var classes = Utils.classNames(className, 'tab', {
        'tab-active': tabActive
      }, Mixins.colorClasses(props));
      var TabContent;
      if (tabContent) TabContent = tabContent.component;
      {
        return React.createElement('div', {
          id: id,
          style: style,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          className: classes
        }, tabContent ? React.createElement(TabContent, Object.assign({
          key: tabContent.id
        }, tabContent.props)) : this.slots['default']);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      self.setState({
        tabContent: null
      });
      self.$f7ready(function () {
        self.$f7.on('tabShow', self.onTabShow);
        self.$f7.on('tabHide', self.onTabHide);
        self.eventTargetEl = el;
        self.routerData = {
          el: el,
          component: self,
          setTabContent: function setTabContent(tabContent) {
            self.setState({
              tabContent: tabContent
            });
          }
        };
        f7.routers.tabs.push(self.routerData);
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;

      if (self.$f7) {
        self.$f7.off('tabShow', self.onTabShow);
        self.$f7.off('tabHide', self.onTabHide);
      }

      if (!self.routerData) return;
      f7.routers.tabs.splice(f7.routers.tabs.indexOf(self.routerData), 1);
      self.routerData = null;
      self.eventTargetEl = null;
      delete self.routerData;
      delete self.eventTargetEl;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var self = this;
      if (!self.routerData) return;
      f7.events.emit('tabRouterDidUpdate', self.routerData);
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

  return F7Tab;
}(React.Component);

__reactComponentSetProps(F7Tab, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  tabActive: Boolean
}, Mixins.colorProps));

F7Tab.displayName = 'f7-tab';
export default F7Tab;