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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
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

var F7Panel = function (_React$Component) {
  _inherits(F7Panel, _React$Component);

  function F7Panel(props, context) {
    _classCallCheck(this, F7Panel);

    var _this = _possibleConstructorReturn(this, (F7Panel.__proto__ || Object.getPrototypeOf(F7Panel)).call(this, props, context));

    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Panel, [{
    key: 'onOpen',
    value: function onOpen(event) {
      this.dispatchEvent('panel:open panelOpen', event);
    }
  }, {
    key: 'onOpened',
    value: function onOpened(event) {
      this.dispatchEvent('panel:opened panelOpened', event);
    }
  }, {
    key: 'onClose',
    value: function onClose(event) {
      this.dispatchEvent('panel:close panelClose', event);
    }
  }, {
    key: 'onClosed',
    value: function onClosed(event) {
      this.dispatchEvent('panel:closed panelClosed', event);
    }
  }, {
    key: 'onBackdropClick',
    value: function onBackdropClick(event) {
      this.dispatchEvent('panel:backdrop-click panelBackdropClick', event);
    }
  }, {
    key: 'onPanelSwipe',
    value: function onPanelSwipe(event) {
      this.dispatchEvent('panel:swipe panelSwipe', event);
    }
  }, {
    key: 'onPanelSwipeOpen',
    value: function onPanelSwipeOpen(event) {
      this.dispatchEvent('panel:swipeopen panelSwipeOpen', event);
    }
  }, {
    key: 'onBreakpoint',
    value: function onBreakpoint(event) {
      this.dispatchEvent('panel:breakpoint panelBreakpoint', event);
    }
  }, {
    key: 'open',
    value: function open(animate) {
      var self = this;
      if (!self.$f7) return;
      var side = self.props.side || (self.props.left ? 'left' : 'right');
      self.$f7.panel.open(side, animate);
    }
  }, {
    key: 'close',
    value: function close(animate) {
      var self = this;
      if (!self.$f7) return;
      var side = self.props.side || (self.props.left ? 'left' : 'right');
      self.$f7.panel.close(side, animate);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = this.props;
      var id = props.id,
          style = props.style;

      return _react2.default.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: this.classes
      }, this.slots['default']);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      if (self.f7Panel) self.f7Panel.destroy();
      var el = self.refs.el;
      if (!el) return;
      el.removeEventListener('panel:open', self.onOpenBound);
      el.removeEventListener('panel:opened', self.onOpenedBound);
      el.removeEventListener('panel:close', self.onCloseBound);
      el.removeEventListener('panel:closed', self.onClosedBound);
      el.removeEventListener('panel:backdrop-click', self.onBackdropClickBound);
      el.removeEventListener('panel:swipe', self.onPanelSwipeBound);
      el.removeEventListener('panel:swipeopen', self.onPanelSwipeOpenBound);
      el.removeEventListener('panel:breakpoint', self.onBreakpointBound);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      var _self$props = self.props,
          side = _self$props.side,
          effect = _self$props.effect,
          opened = _self$props.opened,
          left = _self$props.left,
          reveal = _self$props.reveal;

      self.onOpenBound = self.onOpen.bind(self);
      self.onOpenedBound = self.onOpened.bind(self);
      self.onCloseBound = self.onClose.bind(self);
      self.onClosedBound = self.onClosed.bind(self);
      self.onBackdropClickBound = self.onBackdropClick.bind(self);
      self.onPanelSwipeBound = self.onPanelSwipe.bind(self);
      self.onPanelSwipeOpenBound = self.onPanelSwipeOpen.bind(self);
      self.onBreakpointBound = self.onBreakpoint.bind(self);

      if (el) {
        el.addEventListener('panel:open', self.onOpenBound);
        el.addEventListener('panel:opened', self.onOpenedBound);
        el.addEventListener('panel:close', self.onCloseBound);
        el.addEventListener('panel:closed', self.onClosedBound);
        el.addEventListener('panel:backdrop-click', self.onBackdropClickBound);
        el.addEventListener('panel:swipe', self.onPanelSwipeBound);
        el.addEventListener('panel:swipeopen', self.onPanelSwipeOpenBound);
        el.addEventListener('panel:breakpoint', self.onBreakpointBound);
      }

      self.$f7ready(function () {
        var $ = self.$$;
        if (!$) return;

        if ($('.panel-backdrop').length === 0) {
          $('<div class="panel-backdrop"></div>').insertBefore(el);
        }

        self.f7Panel = self.$f7.panel.create({
          el: el
        });
      });

      if (opened) {
        el.style.display = 'block';
      }

      var $ = self.$$;
      if (!$) return;
      var panelSide = side || (left ? 'left' : 'right');
      var panelEffect = effect || (reveal ? 'reveal' : 'cover');

      if (opened) {
        $('html').addClass('with-panel-' + panelSide + '-' + panelEffect);
      }
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
        if (!self.$f7) return;
        var side = self.props.side || (self.props.left ? 'left' : 'right');

        if (opened) {
          self.$f7.panel.open(side);
        } else {
          self.$f7.panel.open(side);
        }
      });
    }
  }, {
    key: 'classes',
    get: function get() {
      var _Utils$classNames;

      var self = this;
      var props = self.props;
      var left = props.left,
          reveal = props.reveal,
          className = props.className,
          opened = props.opened;
      var side = props.side,
          effect = props.effect;

      side = side || (left ? 'left' : 'right');
      effect = effect || (reveal ? 'reveal' : 'cover');
      return _utils2.default.classNames(className, 'panel', (_Utils$classNames = {
        'panel-active': opened
      }, _defineProperty(_Utils$classNames, 'panel-' + side, side), _defineProperty(_Utils$classNames, 'panel-' + effect, effect), _Utils$classNames), _mixins2.default.colorClasses(props));
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

  return F7Panel;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Panel, Object.assign({
  id: [String, Number],
  side: String,
  effect: String,
  cover: Boolean,
  reveal: Boolean,
  left: Boolean,
  right: Boolean,
  opened: Boolean
}, _mixins2.default.colorProps));

exports.default = F7Panel;