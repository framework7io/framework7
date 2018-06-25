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

var _reactComponentWatch = require('../runtime-helpers/react-component-watch.js');

var _reactComponentWatch2 = _interopRequireDefault(_reactComponentWatch);

var _reactComponentSlots = require('../runtime-helpers/react-component-slots.js');

var _reactComponentSlots2 = _interopRequireDefault(_reactComponentSlots);

var _reactComponentSetProps = require('../runtime-helpers/react-component-set-props.js');

var _reactComponentSetProps2 = _interopRequireDefault(_reactComponentSetProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var F7Icon = function (_React$Component) {
  _inherits(F7Icon, _React$Component);

  function F7Icon(props, context) {
    _classCallCheck(this, F7Icon);

    var _this = _possibleConstructorReturn(this, (F7Icon.__proto__ || Object.getPrototypeOf(F7Icon)).call(this, props, context));

    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Icon, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var id = props.id,
          style = props.style;

      return _react2.default.createElement('i', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: _utils2.default.extend({
          fontSize: self.sizeComputed
        }, style),
        className: self.classes
      }, self.iconTextComputed, this.slots['default']);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
      }
    }
  }, {
    key: 'componentDidMount',
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
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      (0, _reactComponentWatch2.default)(this, 'props.tooltip', prevProps, prevState, function (newText) {
        var self = _this3;
        if (!newText || !self.f7Tooltip) return;
        self.f7Tooltip.setText(newText);
      });
    }
  }, {
    key: 'sizeComputed',
    get: function get() {
      var self = this;
      var size = self.props.size;

      if (typeof size === 'number' || parseFloat(size) === size * 1) {
        size = size + 'px';
      }

      return size;
    }
  }, {
    key: 'iconTextComputed',
    get: function get() {
      var self = this;
      var _self$props = self.props,
          material = _self$props.material,
          f7 = _self$props.f7,
          ifMd = _self$props.ifMd,
          ifIos = _self$props.ifIos,
          md = _self$props.md,
          ios = _self$props.ios;

      var text = material || f7;
      var mdIcon = ifMd || md;
      var iosIcon = ifIos || ios;

      if (mdIcon && self.$theme.md && (mdIcon.indexOf('material:') >= 0 || mdIcon.indexOf('f7:') >= 0)) {
        text = mdIcon.split(':')[1];
      } else if (iosIcon && self.$theme.ios && (iosIcon.indexOf('material:') >= 0 || iosIcon.indexOf('f7:') >= 0)) {
        text = iosIcon.split(':')[1];
      }

      return text;
    }
  }, {
    key: 'classes',
    get: function get() {
      var classes = {
        icon: true
      };
      var self = this;
      var props = self.props;
      var ifMd = props.ifMd,
          ifIos = props.ifIos,
          material = props.material,
          f7 = props.f7,
          fa = props.fa,
          ion = props.ion,
          icon = props.icon,
          md = props.md,
          ios = props.ios,
          className = props.className;

      var mdIcon = ifMd || md;
      var iosIcon = ifIos || ios;

      if (mdIcon || iosIcon) {
        var parts = (self.$theme.md ? mdIcon : iosIcon).split(':');
        var prop = parts[0];
        var value = parts[1];

        if (prop === 'material' || prop === 'fa' || prop === 'f7') {
          classes.fa = prop === 'fa';
          classes['material-icons'] = prop === 'material';
          classes['f7-icons'] = prop === 'f7';
        }

        if (prop === 'fa' || prop === 'ion') {
          classes[prop + '-' + value] = true;
        }

        if (prop === 'icon') {
          classes[value] = true;
        }
      } else {
        classes = {
          icon: true,
          'material-icons': material,
          'f7-icons': f7,
          fa: fa
        };
        if (ion) classes['ion-' + ion] = true;
        if (fa) classes['fa-' + fa] = true;
        if (icon) classes[icon] = true;
      }

      return _utils2.default.classNames(className, classes, _mixins2.default.colorClasses(props));
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

  return F7Icon;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Icon, Object.assign({
  id: [String, Number],
  material: String,
  f7: String,
  ion: String,
  fa: String,
  icon: String,
  ifMd: String,
  ifIos: String,
  ios: String,
  md: String,
  tooltip: String,
  size: [String, Number]
}, _mixins2.default.colorProps));

exports.default = F7Icon;