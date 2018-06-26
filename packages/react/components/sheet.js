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

var F7Sheet = function (_React$Component) {
  _inherits(F7Sheet, _React$Component);

  function F7Sheet(props, context) {
    _classCallCheck(this, F7Sheet);

    var _this = _possibleConstructorReturn(this, (F7Sheet.__proto__ || Object.getPrototypeOf(F7Sheet)).call(this, props, context));

    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Sheet, [{
    key: 'onOpen',
    value: function onOpen(event) {
      this.dispatchEvent('sheet:open sheetOpen', event);
    }
  }, {
    key: 'onOpened',
    value: function onOpened(event) {
      this.dispatchEvent('sheet:opened sheetOpened', event);
    }
  }, {
    key: 'onClose',
    value: function onClose(event) {
      this.dispatchEvent('sheet:close sheetClose', event);
    }
  }, {
    key: 'onClosed',
    value: function onClosed(event) {
      this.dispatchEvent('sheet:closed sheetClosed', event);
    }
  }, {
    key: 'open',
    value: function open(animate) {
      var self = this;
      if (!self.$f7) return undefined;
      return self.$f7.sheet.open(self.refs.el, animate);
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
      var fixedList = [];
      var staticList = [];
      var props = self.props;
      var id = props.id,
          style = props.style,
          className = props.className;

      var fixedTags = void 0;
      fixedTags = 'Navbar Toolbar Tabbar Subnavbar Searchbar Messagebar Fab ListIndex'.split(' ').map(function (tagName) {
        return 'F7' + tagName;
      });
      var slotsDefault = self.slots.default;

      if (slotsDefault && slotsDefault.length) {
        slotsDefault.forEach(function (child) {
          if (typeof child === 'undefined') return;
          var isFixedTag = false;
          {
            var tag = child.type && child.type.name;

            if (!tag) {
              return;
            }

            if (fixedTags.indexOf(tag) >= 0) {
              isFixedTag = true;
            }
          }
          if (isFixedTag) fixedList.push(child);else staticList.push(child);
        });
      }

      var innerEl = _react2.default.createElement('div', {
        className: 'sheet-modal-inner'
      }, staticList);
      var classes = _utils2.default.classNames(className, 'sheet-modal', _mixins2.default.colorClasses(props));
      return _react2.default.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, fixedList, innerEl);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      if (self.f7Sheet) self.f7Sheet.destroy();
      var el = self.el;
      if (!el) return;
      el.removeEventListener('popup:open', self.onOpenBound);
      el.removeEventListener('popup:opened', self.onOpenedBound);
      el.removeEventListener('popup:close', self.onCloseBound);
      el.removeEventListener('popup:closed', self.onClosedBound);
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
      el.addEventListener('sheet:open', self.onOpenBound);
      el.addEventListener('sheet:opened', self.onOpenedBound);
      el.addEventListener('sheet:close', self.onCloseBound);
      el.addEventListener('sheet:closed', self.onClosedBound);
      self.$f7ready(function () {
        var useBackdrop = void 0;
        var useDefaultBackdrop = void 0;
        var _self$props = self.props,
            opened = _self$props.opened,
            backdrop = _self$props.backdrop;

        useDefaultBackdrop = typeof backdrop === 'undefined';

        if (useDefaultBackdrop) {
          var app = self.$f7;
          useBackdrop = app.params.sheet && app.params.sheet.backdrop !== undefined ? app.params.sheet.backdrop : self.$theme.md;
        }

        self.f7Sheet = self.$f7.sheet.create({
          el: self.refs.el,
          backdrop: useBackdrop
        });

        if (opened) {
          self.f7Sheet.open(false);
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
        if (!self.f7Sheet) return;

        if (opened) {
          self.f7Sheet.open();
        } else {
          self.f7Sheet.close();
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

  return F7Sheet;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Sheet, Object.assign({
  id: [String, Number],
  opened: Boolean,
  backdrop: Boolean
}, _mixins2.default.colorProps));

exports.default = F7Sheet;