'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mixins = require('../utils/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

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

var F7Popover = function (_React$Component) {
  _inherits(F7Popover, _React$Component);

  function F7Popover(props, context) {
    _classCallCheck(this, F7Popover);

    var _this = _possibleConstructorReturn(this, (F7Popover.__proto__ || Object.getPrototypeOf(F7Popover)).call(this, props, context));

    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Popover, [{
    key: 'onOpen',
    value: function onOpen(event) {
      this.dispatchEvent('popover:open popoverOpen', event);
    }
  }, {
    key: 'onOpened',
    value: function onOpened(event) {
      this.dispatchEvent('popover:opened popoverOpened', event);
    }
  }, {
    key: 'onClose',
    value: function onClose(event) {
      this.dispatchEvent('popover:close popoverClose', event);
    }
  }, {
    key: 'onClosed',
    value: function onClosed(event) {
      this.dispatchEvent('popover:closed popoverClosed', event);
    }
  }, {
    key: 'open',
    value: function open(target, animate) {
      var self = this;
      if (!self.$f7) return undefined;
      return self.$f7.popover.open(self.refs.el, target, animate);
    }
  }, {
    key: 'close',
    value: function close(animate) {
      var self = this;
      if (!self.$f7) return undefined;
      return self.$f7.sheet.close(self.refs.el, animate);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var className = props.className,
          id = props.id,
          style = props.style;

      var classes = _utils2.default.classNames(className, 'popover', _mixins2.default.colorClasses(props));
      return _react2.default.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, _react2.default.createElement('div', {
        className: 'popover-angle'
      }), _react2.default.createElement('div', {
        className: 'popover-inner'
      }, this.slots['default']));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      if (self.f7Popover) self.f7Popover.destroy();
      var el = self.refs.el;
      if (!el) return;
      el.removeEventListener('popover:open', self.onOpenBound);
      el.removeEventListener('popover:opened', self.onOpenedBound);
      el.removeEventListener('popover:close', self.onCloseBound);
      el.removeEventListener('popover:closed', self.onClosedBound);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      if (!el) return;
      self.onOpenBound = self.onOpen.bind(self);
      self.onOpenedBound = self.onOpened.bind(self);
      self.onCloseBound = self.onClose.bind(self);
      self.onClosedBound = self.onClosed.bind(self);
      el.addEventListener('popover:open', self.onOpenBound);
      el.addEventListener('popover:opened', self.onOpenedBound);
      el.addEventListener('popover:close', self.onCloseBound);
      el.addEventListener('popover:closed', self.onClosedBound);
      var _self$props = self.props,
          target = _self$props.target,
          opened = _self$props.opened;

      self.$f7ready(function () {
        var popoverParams = {
          el: el
        };
        if (target) popoverParams.targetEl = target;
        self.f7Popover = self.$f7.popover.create(popoverParams);

        if (opened && target) {
          self.f7Popover.open(target, false);
        }
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
      var _this3 = this;

      (0, _reactComponentWatch2.default)(this, 'props.opened', prevProps, prevState, function (opened) {
        var self = _this3;
        if (!self.f7Popover) return;

        if (opened) {
          self.f7Popover.open();
        } else {
          self.f7Popover.close();
        }
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

  return F7Popover;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Popover, Object.assign({
  id: [String, Number],
  opened: Boolean,
  target: [String, Object]
}, _mixins2.default.colorProps));

exports.default = F7Popover;