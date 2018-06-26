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

var F7Fab = function (_React$Component) {
  _inherits(F7Fab, _React$Component);

  function F7Fab(props, context) {
    _classCallCheck(this, F7Fab);

    var _this = _possibleConstructorReturn(this, (F7Fab.__proto__ || Object.getPrototypeOf(F7Fab)).call(this, props, context));

    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Fab, [{
    key: 'onClick',
    value: function onClick(event) {
      var self = this;
      self.dispatchEvent('click', event);
    }
  }, {
    key: 'render',
    value: function render() {
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
            var tag = child.type && child.type.name;
            if (tag === 'F7FabButtons') isRoot = true;
          }
          if (isRoot) rootChildren.push(child);else linkChildren.push(child);
        }
      }

      var textEl = void 0;

      if (text || textSlots && textSlots.length) {
        textEl = _react2.default.createElement('div', {
          className: 'fab-text'
        }, text || textSlots);
      }

      var linkEl = void 0;

      if (linkChildren.length || linkSlots && linkSlots.length) {
        linkEl = _react2.default.createElement('a', {
          target: target,
          href: href,
          onClick: self.onClick.bind(self),
          key: 'f7-fab-link'
        }, linkChildren, textEl, linkSlots);
      }

      var classes = _utils2.default.classNames(className, 'fab', 'fab-' + position, {
        'fab-morph': morphTo,
        'fab-extended': typeof textEl !== 'undefined'
      }, _mixins2.default.colorClasses(props));
      return _react2.default.createElement('div', {
        id: id,
        style: style,
        className: classes,
        'data-morph-to': morphTo
      }, linkEl, rootChildren, rootSlots);
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

  return F7Fab;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Fab, Object.assign({
  id: [String, Number],
  morphTo: String,
  href: [Boolean, String],
  target: String,
  text: String,
  position: {
    type: String,
    default: 'right-bottom'
  },
  tooltip: String
}, _mixins2.default.colorProps));

exports.default = F7Fab;