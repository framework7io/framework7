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

var _reactComponentEl = require('../runtime-helpers/react-component-el.js');

var _reactComponentEl2 = _interopRequireDefault(_reactComponentEl);

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

var F7Actions = function (_React$Component) {
  _inherits(F7Actions, _React$Component);

  function F7Actions(props, context) {
    _classCallCheck(this, F7Actions);

    var _this = _possibleConstructorReturn(this, (F7Actions.__proto__ || Object.getPrototypeOf(F7Actions)).call(this, props, context));

    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Actions, [{
    key: 'onOpen',
    value: function onOpen(event) {
      this.dispatchEvent('actions:open actionsOpen', event);
    }
  }, {
    key: 'onOpened',
    value: function onOpened(event) {
      this.dispatchEvent('actions:opened actionsOpened', event);
    }
  }, {
    key: 'onClose',
    value: function onClose(event) {
      this.dispatchEvent('actions:close actionsClose', event);
    }
  }, {
    key: 'onClosed',
    value: function onClosed(event) {
      this.dispatchEvent('actions:closed actionsClosed', event);
    }
  }, {
    key: 'open',
    value: function open(animate) {
      var self = this;
      if (!self.$f7) return undefined;
      return self.$f7.actions.open(self.refs.el, animate);
    }
  }, {
    key: 'close',
    value: function close(animate) {
      var self = this;
      if (!self.$f7) return undefined;
      return self.$f7.actions.close(self.refs.el, animate);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var className = props.className,
          id = props.id,
          style = props.style,
          grid = props.grid;

      var classes = _utils2.default.classNames(className, 'actions-modal', {
        'actions-grid': grid
      }, _mixins2.default.colorClasses(props));
      return _react2.default.createElement('div', {
        id: id,
        style: style,
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        className: classes
      }, this.slots['default']);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      if (self.f7Actions) self.f7Actions.destroy();
      var el = self.el;
      if (!el) return;
      el.removeEventListener('actions:open', self.onOpenBound);
      el.removeEventListener('actions:opened', self.onOpenedBound);
      el.removeEventListener('actions:close', self.onCloseBound);
      el.removeEventListener('actions:closed', self.onClosedBound);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      if (!el) return;
      var props = self.props;
      var grid = props.grid,
          target = props.target,
          convertToPopover = props.convertToPopover,
          forceToPopover = props.forceToPopover,
          opened = props.opened;

      self.onOpenBound = self.onOpen.bind(self);
      self.onOpenedBound = self.onOpened.bind(self);
      self.onCloseBound = self.onClose.bind(self);
      self.onClosedBound = self.onClosed.bind(self);
      el.addEventListener('actions:open', self.onOpenBound);
      el.addEventListener('actions:opened', self.onOpenedBound);
      el.addEventListener('actions:close', self.onCloseBound);
      el.addEventListener('actions:closed', self.onClosedBound);
      self.$f7ready(function () {
        var actionsParams = {
          el: self.refs.el,
          grid: grid
        };
        if (target) actionsParams.targetEl = target;
        if ('convertToPopover' in props) actionsParams.convertToPopover = convertToPopover;
        if ('forceToPopover' in props) actionsParams.forceToPopover = forceToPopover;
        self.f7Actions = self.$f7.actions.create(actionsParams);

        if (opened) {
          self.f7Actions.open(false);
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
        if (!self.f7Actions) return;

        if (opened) {
          self.f7Actions.open();
        } else {
          self.f7Actions.close();
        }
      });
    }
  }, {
    key: 'slots',
    get: function get() {
      return (0, _reactComponentSlots2.default)(this.props);
    }
  }, {
    key: 'el',
    get: function get() {
      return (0, _reactComponentEl2.default)(this);
    }
  }, {
    key: 'refs',
    get: function get() {
      return this.__reactRefs;
    },
    set: function set(refs) {}
  }]);

  return F7Actions;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Actions, Object.assign({
  id: [String, Number],
  opened: Boolean,
  grid: Boolean,
  convertToPopover: Boolean,
  forceToPopover: Boolean,
  target: [String, Object]
}, _mixins2.default.colorProps));

exports.default = F7Actions;