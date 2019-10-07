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
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Progressbar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Progressbar, _React$Component);

  function F7Progressbar(props, context) {
    var _this;

    _classCallCheck(this, F7Progressbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Progressbar).call(this, props, context));
    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Progressbar, [{
    key: "set",
    value: function set(progress, speed) {
      var self = this;
      if (!self.$f7) return;
      self.$f7.progressbar.set(self.refs.el, progress, speed);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var progress = props.progress,
          id = props.id,
          style = props.style,
          infinite = props.infinite,
          className = props.className;
      var transformStyle = {
        transform: progress ? "translate3d(".concat(-100 + progress, "%, 0, 0)") : '',
        WebkitTransform: progress ? "translate3d(".concat(-100 + progress, "%, 0, 0)") : ''
      };
      var classes = Utils.classNames(className, 'progressbar', {
        'progressbar-infinite': infinite
      }, Mixins.colorClasses(props));
      return React.createElement('span', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes,
        'data-progress': progress
      }, React.createElement('span', {
        style: transformStyle
      }));
    }
  }, {
    key: "refs",
    get: function get() {
      return this.__reactRefs;
    },
    set: function set(refs) {}
  }]);

  return F7Progressbar;
}(React.Component);

__reactComponentSetProps(F7Progressbar, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  progress: Number,
  infinite: Boolean
}, Mixins.colorProps));

F7Progressbar.displayName = 'f7-progressbar';
export default F7Progressbar;