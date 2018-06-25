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

var F7FabButton = function (_React$Component) {
  _inherits(F7FabButton, _React$Component);

  function F7FabButton(props, context) {
    _classCallCheck(this, F7FabButton);

    var _this = _possibleConstructorReturn(this, (F7FabButton.__proto__ || Object.getPrototypeOf(F7FabButton)).call(this, props, context));

    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7FabButton, [{
    key: 'onClick',
    value: function onClick(event) {
      this.dispatchEvent('click', event);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var className = props.className,
          id = props.id,
          style = props.style,
          fabClose = props.fabClose,
          label = props.label,
          target = props.target;

      var classes = _utils2.default.classNames(className, {
        'fab-close': fabClose,
        'fab-label-button': label
      }, _mixins2.default.colorClasses(props));
      var labelEl = void 0;

      if (label) {
        labelEl = _react2.default.createElement('span', {
          className: 'fab-label'
        }, label);
      }

      return _react2.default.createElement('a', {
        id: id,
        style: style,
        target: target,
        className: classes,
        onClick: this.onClick.bind(this)
      }, this.slots['default'], labelEl);
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
    key: 'dispatchEvent',
    value: function dispatchEvent(events) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return _reactComponentDispatchEvent2.default.apply(undefined, [this, events].concat(args));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      (0, _reactComponentWatch2.default)(this, 'props.tooltip', prevProps, prevState, function (newText) {
        var self = _this2;
        if (!newText || !self.f7Tooltip) return;
        self.f7Tooltip.setText(newText);
      });
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

  return F7FabButton;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7FabButton, Object.assign({
  id: [String, Number],
  fabClose: Boolean,
  label: String,
  target: String,
  tooltip: String
}, _mixins2.default.colorProps));

exports.default = F7FabButton;