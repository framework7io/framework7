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
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7ListIndex =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7ListIndex, _React$Component);

  function F7ListIndex(props, context) {
    var _this;

    _classCallCheck(this, F7ListIndex);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7ListIndex).call(this, props, context));
    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7ListIndex, [{
    key: "update",
    value: function update() {
      if (!this.f7ListIndex) return;
      this.f7ListIndex.update();
    }
  }, {
    key: "scrollListToIndex",
    value: function scrollListToIndex(indexContent) {
      if (!this.f7ListIndex) return;
      this.f7ListIndex.scrollListToIndex(indexContent);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;
      var className = props.className,
          id = props.id,
          style = props.style;
      var classes = Utils.classNames(className, 'list-index', Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      if (!self.props.init) return;
      self.$f7ready(function (f7) {
        var el = self.refs.el;
        var _self$props = self.props,
            listEl = _self$props.listEl,
            indexes = _self$props.indexes,
            iosItemHeight = _self$props.iosItemHeight,
            mdItemHeight = _self$props.mdItemHeight,
            auroraItemHeight = _self$props.auroraItemHeight,
            scrollList = _self$props.scrollList,
            label = _self$props.label;
        self.f7ListIndex = f7.listIndex.create({
          el: el,
          listEl: listEl,
          indexes: indexes,
          iosItemHeight: iosItemHeight,
          mdItemHeight: mdItemHeight,
          auroraItemHeight: auroraItemHeight,
          scrollList: scrollList,
          label: label,
          on: {
            select: function select(index, itemContent, itemIndex) {
              self.dispatchEvent('listindex:select listIndexSelect', itemContent, itemIndex);
            }
          }
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (!this.props.init) return;

      if (this.f7ListIndex && this.f7ListIndex.destroy) {
        this.f7ListIndex.destroy();
      }
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      __reactComponentWatch(this, 'props.indexes', prevProps, prevState, function () {
        if (!_this3.f7ListIndex) return;
        _this3.f7ListIndex.params.indexes = _this3.props.indexes;

        _this3.update();
      });
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

  return F7ListIndex;
}(React.Component);

__reactComponentSetProps(F7ListIndex, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  init: {
    type: Boolean,
    default: true
  },
  listEl: [String, Object],
  indexes: {
    type: [String, Array],
    default: 'auto'
  },
  scrollList: {
    type: Boolean,
    default: true
  },
  label: {
    type: Boolean,
    default: false
  },
  iosItemHeight: {
    type: Number,
    default: 14
  },
  mdItemHeight: {
    type: Number,
    default: 14
  },
  auroraItemHeight: {
    type: Number,
    default: 14
  }
}, Mixins.colorProps));

F7ListIndex.displayName = 'f7-list-index';
export default F7ListIndex;