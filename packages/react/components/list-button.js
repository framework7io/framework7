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
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7ListButton =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7ListButton, _React$Component);

  function F7ListButton(props, context) {
    var _this;

    _classCallCheck(this, F7ListButton);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7ListButton).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onClick']);
    })();

    return _this;
  }

  _createClass(F7ListButton, [{
    key: "onClick",
    value: function onClick(event) {
      this.dispatchEvent('click', event);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = this.props;
      var className = props.className,
          id = props.id,
          style = props.style,
          title = props.title,
          text = props.text;
      return React.createElement('li', {
        id: id,
        style: style,
        className: className
      }, React.createElement('a', Object.assign({
        className: self.classes
      }, self.attrs, {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['linkEl'] = __reactNode;
        }
      }), this.slots['default'], !this.slots.default && (title || text)));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      var linkEl = self.refs.linkEl;
      linkEl.removeEventListener('click', this.onClick);
      delete linkEl.f7RouteProps;

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, function (newText) {
        var self = _this3;

        if (!newText && self.f7Tooltip) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
          return;
        }

        if (newText && !self.f7Tooltip && self.$f7) {
          self.f7Tooltip = self.$f7.tooltip.create({
            targetEl: self.refs.el,
            text: newText
          });
          return;
        }

        if (!newText || !self.f7Tooltip) return;
        self.f7Tooltip.setText(newText);
      });

      var self = this;
      var linkEl = self.refs.linkEl;
      var routeProps = self.props.routeProps;

      if (routeProps) {
        linkEl.f7RouteProps = routeProps;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var linkEl = self.refs.linkEl;
      var _self$props = self.props,
          routeProps = _self$props.routeProps,
          tooltip = _self$props.tooltip;

      if (routeProps) {
        linkEl.f7RouteProps = routeProps;
      }

      linkEl.addEventListener('click', self.onClick);
      self.$f7ready(function (f7) {
        if (tooltip) {
          self.f7Tooltip = f7.tooltip.create({
            targetEl: linkEl,
            text: tooltip
          });
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
    key: "attrs",
    get: function get() {
      var self = this;
      var props = self.props;
      var link = props.link,
          href = props.href,
          target = props.target,
          tabLink = props.tabLink;
      return Utils.extend({
        href: typeof link === 'boolean' && typeof href === 'boolean' ? '#' : link || href,
        target: target,
        'data-tab': Utils.isStringProp(tabLink) && tabLink
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    }
  }, {
    key: "classes",
    get: function get() {
      var self = this;
      var props = self.props;
      var tabLink = props.tabLink,
          tabLinkActive = props.tabLinkActive;
      return Utils.classNames({
        'list-button': true,
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive
      }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
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

  return F7ListButton;
}(React.Component);

__reactComponentSetProps(F7ListButton, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  title: [String, Number],
  text: [String, Number],
  tabLink: [Boolean, String],
  tabLinkActive: Boolean,
  link: [Boolean, String],
  href: [Boolean, String],
  target: String,
  tooltip: String
}, Mixins.colorProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps));

F7ListButton.displayName = 'f7-list-button';
export default F7ListButton;