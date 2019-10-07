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

var F7Fab =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Fab, _React$Component);

  function F7Fab(props, context) {
    var _this;

    _classCallCheck(this, F7Fab);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Fab).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onClick']);
    })();

    return _this;
  }

  _createClass(F7Fab, [{
    key: "onClick",
    value: function onClick(event) {
      var self = this;
      self.dispatchEvent('click', event);
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
          morphTo = props.morphTo,
          initialHref = props.href,
          position = props.position,
          text = props.text,
          target = props.target;
      var href = initialHref;
      if (href === true) href = '#';
      if (href === false) href = undefined;
      var linkChildren = [];
      var rootChildren = [];
      var _self$slots = self.slots,
          linkSlots = _self$slots.link,
          defaultSlots = _self$slots.default,
          rootSlots = _self$slots.root,
          textSlots = _self$slots.text;

      if (defaultSlots) {
        for (var i = 0; i < defaultSlots.length; i += 1) {
          var child = defaultSlots[i];
          var isRoot = void 0;
          {
            var tag = child.type && (child.type.displayName || child.type.name);
            if (tag === 'F7FabButtons' || tag === 'f7-fab-buttons') isRoot = true;
          }
          if (isRoot) rootChildren.push(child);else linkChildren.push(child);
        }
      }

      var textEl;

      if (text || textSlots && textSlots.length) {
        textEl = React.createElement('div', {
          className: 'fab-text'
        }, text || textSlots);
      }

      var linkEl;

      if (linkChildren.length || linkSlots && linkSlots.length) {
        linkEl = React.createElement('a', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['linkEl'] = __reactNode;
          },
          target: target,
          href: href,
          key: 'f7-fab-link'
        }, linkChildren, textEl, linkSlots);
      }

      var classes = Utils.classNames(className, 'fab', "fab-".concat(position), {
        'fab-morph': morphTo,
        'fab-extended': typeof textEl !== 'undefined'
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes,
        'data-morph-to': morphTo
      }, linkEl, rootChildren, rootSlots);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;

      if (self.refs.linkEl) {
        self.refs.linkEl.removeEventListener('click', self.onClick);
      }

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;

      if (self.refs.linkEl) {
        self.refs.linkEl.addEventListener('click', self.onClick);
      }

      var tooltip = self.props.tooltip;
      if (!tooltip) return;
      self.$f7ready(function (f7) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: self.refs.el,
          text: tooltip
        });
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

  return F7Fab;
}(React.Component);

__reactComponentSetProps(F7Fab, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  morphTo: String,
  href: [Boolean, String],
  target: String,
  text: String,
  position: {
    type: String,
    default: 'right-bottom'
  },
  tooltip: String
}, Mixins.colorProps));

F7Fab.displayName = 'f7-fab';
export default F7Fab;