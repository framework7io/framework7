function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7MessagebarAttachment =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7MessagebarAttachment, _React$Component);

  function F7MessagebarAttachment(props, context) {
    var _this;

    _classCallCheck(this, F7MessagebarAttachment);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7MessagebarAttachment).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onClick', 'onDeleteClick']);
    })();

    return _this;
  }

  _createClass(F7MessagebarAttachment, [{
    key: "onClick",
    value: function onClick(event) {
      this.dispatchEvent('attachment:click attachmentClick', event);
    }
  }, {
    key: "onDeleteClick",
    value: function onDeleteClick(event) {
      this.dispatchEvent('attachment:delete attachmentDelete', event);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var deletable = props.deletable,
          image = props.image,
          className = props.className,
          id = props.id,
          style = props.style;
      var classes = Utils.classNames(className, 'messagebar-attachment', Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, image && React.createElement('img', {
        src: image
      }), deletable && React.createElement('span', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['deleteEl'] = __reactNode;
        },
        className: 'messagebar-attachment-delete'
      }), this.slots['default']);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.refs.el.removeEventListener('click', this.onClick);

      if (this.refs.deleteEl) {
        this.refs.deleteEl.removeEventListener('click', this.onDeleteClick);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.refs.el.addEventListener('click', this.onClick);

      if (this.refs.deleteEl) {
        this.refs.deleteEl.addEventListener('click', this.onDeleteClick);
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

  return F7MessagebarAttachment;
}(React.Component);

__reactComponentSetProps(F7MessagebarAttachment, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  image: String,
  deletable: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps));

F7MessagebarAttachment.displayName = 'f7-messagebar-attachment';
export default F7MessagebarAttachment;