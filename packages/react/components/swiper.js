function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Swiper =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Swiper, _React$Component);

  function F7Swiper(props, context) {
    var _this;

    _classCallCheck(this, F7Swiper);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Swiper).call(this, props, context));
    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Swiper, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var id = props.id,
          style = props.style,
          className = props.className;
      var paginationEl;
      var scrollbarEl;
      var buttonNextEl;
      var buttonPrevEl;

      if (self.paginationComputed) {
        paginationEl = React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['paginationEl'] = __reactNode;
          },
          className: 'swiper-pagination'
        });
      }

      if (self.scrollbarComputed) {
        scrollbarEl = React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['scrollbarEl'] = __reactNode;
          },
          className: 'swiper-scrollbar'
        });
      }

      if (self.navigationComputed) {
        buttonNextEl = React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['nextEl'] = __reactNode;
          },
          className: 'swiper-button-next'
        });
        buttonPrevEl = React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['prevEl'] = __reactNode;
          },
          className: 'swiper-button-prev'
        });
      }

      var classes = Utils.classNames(className, 'swiper-container', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        className: classes
      }, this.slots['before-wrapper'], React.createElement('div', {
        className: 'swiper-wrapper'
      }, this.slots['default']), paginationEl, scrollbarEl, buttonPrevEl, buttonNextEl, this.slots['after-wrapper']);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      if (!self.props.init) return;
      if (self.swiper && self.swiper.destroy) self.swiper.destroy();
    }
  }, {
    key: "componentDidMount",
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
        if (params) Utils.extend(newParams, params);
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
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var self = this;

      if (!self.initialUpdate) {
        self.initialUpdate = true;
        return;
      }

      if (self.swiper && self.swiper.update) self.swiper.update();
    }
  }, {
    key: "paginationComputed",
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
    key: "scrollbarComputed",
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
    key: "navigationComputed",
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

  return F7Swiper;
}(React.Component);

__reactComponentSetProps(F7Swiper, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  params: Object,
  pagination: Boolean,
  scrollbar: Boolean,
  navigation: Boolean,
  init: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps));

F7Swiper.displayName = 'f7-swiper';
export default F7Swiper;