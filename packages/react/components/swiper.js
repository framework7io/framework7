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

var F7Swiper = function (_React$Component) {
  _inherits(F7Swiper, _React$Component);

  function F7Swiper(props, context) {
    _classCallCheck(this, F7Swiper);

    var _this = _possibleConstructorReturn(this, (F7Swiper.__proto__ || Object.getPrototypeOf(F7Swiper)).call(this, props, context));

    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Swiper, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var id = props.id,
          style = props.style,
          className = props.className;

      var paginationEl = void 0;
      var scrollbarEl = void 0;
      var buttonNextEl = void 0;
      var buttonPrevEl = void 0;

      if (self.paginationComputed) {
        paginationEl = _react2.default.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['paginationEl'] = __reactNode;
          },
          className: 'swiper-pagination'
        });
      }

      if (self.scrollbarComputed) {
        scrollbarEl = _react2.default.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['scrollbarEl'] = __reactNode;
          },
          className: 'swiper-scrollbar'
        });
      }

      if (self.navigationComputed) {
        buttonNextEl = _react2.default.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['nextEl'] = __reactNode;
          },
          className: 'swiper-button-next'
        });
        buttonPrevEl = _react2.default.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['prevEl'] = __reactNode;
          },
          className: 'swiper-button-prev'
        });
      }

      var classes = _utils2.default.classNames(className, 'swiper-container', _mixins2.default.colorClasses(props));
      return _react2.default.createElement('div', {
        id: id,
        style: style,
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        className: classes
      }, this.slots['before-wrapper'], _react2.default.createElement('div', {
        className: 'swiper-wrapper'
      }, this.slots['default']), paginationEl, scrollbarEl, buttonPrevEl, buttonNextEl, this.slots['after-wrapper']);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      if (!self.props.init) return;
      if (self.swiper && self.swiper.destroy) self.swiper.destroy();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      if (!self.props.init) return;
      self.$f7ready(function (f7) {
        var newParams = {
          pagination: {},
          navigation: {},
          scrollbar: {}
        };
        var _self$props = self.props,
            params = _self$props.params,
            pagination = _self$props.pagination,
            navigation = _self$props.navigation,
            scrollbar = _self$props.scrollbar;

        if (params) _utils2.default.extend(newParams, params);
        if (pagination && !newParams.pagination.el) newParams.pagination.el = self.refs.paginationEl;

        if (navigation && !newParams.navigation.nextEl && !newParams.navigation.prevEl) {
          newParams.navigation.nextEl = self.refs.nextEl;
          newParams.navigation.prevEl = self.refs.prevEl;
        }

        if (scrollbar && !newParams.scrollbar.el) newParams.scrollbar.el = self.refs.scrollbarEl;
        self.swiper = f7.swiper.create(self.refs.el, newParams);
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var self = this;

      if (!self.initialUpdate) {
        self.initialUpdate = true;
        return;
      }

      if (self.swiper && self.swiper.update) self.swiper.update();
    }
  }, {
    key: 'paginationComputed',
    get: function get() {
      var self = this;
      var _self$props2 = self.props,
          pagination = _self$props2.pagination,
          params = _self$props2.params;

      if (pagination === true || params && params.pagination && !params.pagination.el) {
        return true;
      }

      return false;
    }
  }, {
    key: 'scrollbarComputed',
    get: function get() {
      var self = this;
      var _self$props3 = self.props,
          scrollbar = _self$props3.scrollbar,
          params = _self$props3.params;

      if (scrollbar === true || params && params.scrollbar && !params.scrollbar.el) {
        return true;
      }

      return false;
    }
  }, {
    key: 'navigationComputed',
    get: function get() {
      var self = this;
      var _self$props4 = self.props,
          navigation = _self$props4.navigation,
          params = _self$props4.params;

      if (navigation === true || params && params.navigation && !params.navigation.nextEl && !params.navigation.prevEl) {
        return true;
      }

      return false;
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

  return F7Swiper;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Swiper, Object.assign({
  id: [String, Number],
  params: Object,
  pagination: Boolean,
  scrollbar: Boolean,
  navigation: Boolean,
  init: {
    type: Boolean,
    default: true
  }
}, _mixins2.default.colorProps));

exports.default = F7Swiper;