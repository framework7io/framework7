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
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Icon =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Icon, _React$Component);

  function F7Icon(props, context) {
    var _this;

    _classCallCheck(this, F7Icon);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Icon).call(this, props, context));
    _this.__reactRefs = {};

    _this.state = function () {
      var self = _assertThisInitialized(_this);

      var $f7 = self.$f7;

      if (!$f7) {
        self.$f7ready(function () {
          self.setState({
            _theme: self.$theme
          });
        });
      }

      return {
        _theme: $f7 ? self.$theme : null
      };
    }();

    return _this;
  }

  _createClass(F7Icon, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var id = props.id,
          style = props.style;
      var size = props.size;

      if (typeof size === 'number' || parseFloat(size) === size * 1) {
        size = "".concat(size, "px");
      }

      return React.createElement('i', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: Utils.extend({
          fontSize: size,
          width: size,
          height: size
        }, style),
        className: self.classes
      }, self.iconTextComputed, this.slots['default']);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;

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
      var el = self.refs.el;
      if (!el) return;
      var tooltip = self.props.tooltip;
      if (!tooltip) return;
      self.$f7ready(function (f7) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: el,
          text: tooltip
        });
      });
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
    key: "iconTextComputed",
    get: function get() {
      var self = this;
      var _self$props = self.props,
          material = _self$props.material,
          f7 = _self$props.f7,
          md = _self$props.md,
          ios = _self$props.ios,
          aurora = _self$props.aurora;
      var theme = self.state._theme;
      var text = material || f7;

      if (md && theme && theme.md && (md.indexOf('material:') >= 0 || md.indexOf('f7:') >= 0)) {
        text = md.split(':')[1];
      } else if (ios && theme && theme.ios && (ios.indexOf('material:') >= 0 || ios.indexOf('f7:') >= 0)) {
        text = ios.split(':')[1];
      } else if (aurora && theme && theme.aurora && (aurora.indexOf('material:') >= 0 || aurora.indexOf('f7:') >= 0)) {
        text = aurora.split(':')[1];
      }

      return text;
    }
  }, {
    key: "classes",
    get: function get() {
      var classes = {
        icon: true
      };
      var self = this;
      var props = self.props;
      var theme = self.state._theme;
      var material = props.material,
          f7 = props.f7,
          icon = props.icon,
          md = props.md,
          ios = props.ios,
          aurora = props.aurora,
          className = props.className;
      var themeIcon;
      if (theme && theme.ios) themeIcon = ios;else if (theme && theme.md) themeIcon = md;else if (theme && theme.aurora) themeIcon = aurora;

      if (themeIcon) {
        var parts = themeIcon.split(':');
        var prop = parts[0];
        var value = parts[1];

        if (prop === 'material' || prop === 'f7') {
          classes['material-icons'] = prop === 'material';
          classes['f7-icons'] = prop === 'f7';
        }

        if (prop === 'icon') {
          classes[value] = true;
        }
      } else {
        classes = {
          icon: true,
          'material-icons': material,
          'f7-icons': f7
        };
        if (icon) classes[icon] = true;
      }

      return Utils.classNames(className, classes, Mixins.colorClasses(props));
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

  return F7Icon;
}(React.Component);

__reactComponentSetProps(F7Icon, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  material: String,
  f7: String,
  icon: String,
  ios: String,
  aurora: String,
  md: String,
  tooltip: String,
  size: [String, Number]
}, Mixins.colorProps));

F7Icon.displayName = 'f7-icon';
export default F7Icon;