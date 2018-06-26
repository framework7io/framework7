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

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

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

var F7Messagebar = function (_React$Component) {
  _inherits(F7Messagebar, _React$Component);

  function F7Messagebar(props, context) {
    _classCallCheck(this, F7Messagebar);

    var _this = _possibleConstructorReturn(this, (F7Messagebar.__proto__ || Object.getPrototypeOf(F7Messagebar)).call(this, props, context));

    _this.__reactRefs = {};

    (function () {
      _this.onChangeBound = _this.onChange.bind(_this);
      _this.onInputBound = _this.onInput.bind(_this);
      _this.onFocusBound = _this.onFocus.bind(_this);
      _this.onBlurBound = _this.onBlur.bind(_this);
      _this.onClickBound = _this.onClick.bind(_this);
      _this.onDeleteAttachmentBound = _this.onDeleteAttachment.bind(_this);
      _this.onClickAttachmentBound = _this.onClickAttachment.bind(_this);
      _this.onResizePageBound = _this.onResizePage.bind(_this);
    })();
    return _this;
  }

  _createClass(F7Messagebar, [{
    key: 'clear',
    value: function clear() {
      var _f7Messagebar;

      if (!this.f7Messagebar) return undefined;
      return (_f7Messagebar = this.f7Messagebar).clear.apply(_f7Messagebar, arguments);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var _f7Messagebar2;

      if (!this.f7Messagebar) return undefined;
      return (_f7Messagebar2 = this.f7Messagebar).getValue.apply(_f7Messagebar2, arguments);
    }
  }, {
    key: 'setValue',
    value: function setValue() {
      var _f7Messagebar3;

      if (!this.f7Messagebar) return undefined;
      return (_f7Messagebar3 = this.f7Messagebar).setValue.apply(_f7Messagebar3, arguments);
    }
  }, {
    key: 'setPlaceholder',
    value: function setPlaceholder() {
      var _f7Messagebar4;

      if (!this.f7Messagebar) return undefined;
      return (_f7Messagebar4 = this.f7Messagebar).setPlaceholder.apply(_f7Messagebar4, arguments);
    }
  }, {
    key: 'resize',
    value: function resize() {
      var _f7Messagebar5;

      if (!this.f7Messagebar) return undefined;
      return (_f7Messagebar5 = this.f7Messagebar).resizePage.apply(_f7Messagebar5, arguments);
    }
  }, {
    key: 'focus',
    value: function focus() {
      var _f7Messagebar6;

      if (!this.f7Messagebar) return undefined;
      return (_f7Messagebar6 = this.f7Messagebar).focus.apply(_f7Messagebar6, arguments);
    }
  }, {
    key: 'blur',
    value: function blur() {
      var _f7Messagebar7;

      if (!this.f7Messagebar) return undefined;
      return (_f7Messagebar7 = this.f7Messagebar).blur.apply(_f7Messagebar7, arguments);
    }
  }, {
    key: 'attachmentsShow',
    value: function attachmentsShow() {
      var _f7Messagebar8;

      if (!this.f7Messagebar) return undefined;
      return (_f7Messagebar8 = this.f7Messagebar).attachmentsShow.apply(_f7Messagebar8, arguments);
    }
  }, {
    key: 'attachmentsHide',
    value: function attachmentsHide() {
      var _f7Messagebar9;

      if (!this.f7Messagebar) return undefined;
      return (_f7Messagebar9 = this.f7Messagebar).attachmentsHide.apply(_f7Messagebar9, arguments);
    }
  }, {
    key: 'attachmentsToggle',
    value: function attachmentsToggle() {
      var _f7Messagebar10;

      if (!this.f7Messagebar) return undefined;
      return (_f7Messagebar10 = this.f7Messagebar).attachmentsToggle.apply(_f7Messagebar10, arguments);
    }
  }, {
    key: 'sheetShow',
    value: function sheetShow() {
      var _f7Messagebar11;

      if (!this.f7Messagebar) return undefined;
      return (_f7Messagebar11 = this.f7Messagebar).sheetShow.apply(_f7Messagebar11, arguments);
    }
  }, {
    key: 'sheetHide',
    value: function sheetHide() {
      var _f7Messagebar12;

      if (!this.f7Messagebar) return undefined;
      return (_f7Messagebar12 = this.f7Messagebar).sheetHide.apply(_f7Messagebar12, arguments);
    }
  }, {
    key: 'sheetToggle',
    value: function sheetToggle() {
      var _f7Messagebar13;

      if (!this.f7Messagebar) return undefined;
      return (_f7Messagebar13 = this.f7Messagebar).sheetToggle.apply(_f7Messagebar13, arguments);
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      this.dispatchEvent('change', event);
    }
  }, {
    key: 'onInput',
    value: function onInput(event) {
      this.dispatchEvent('input', event);
    }
  }, {
    key: 'onFocus',
    value: function onFocus(event) {
      this.dispatchEvent('focus', event);
    }
  }, {
    key: 'onBlur',
    value: function onBlur(event) {
      this.dispatchEvent('blur', event);
    }
  }, {
    key: 'onClick',
    value: function onClick(event) {
      var self = this;
      var value = self.refs.area.refs.inputEl.value;
      var clear = self.f7Messagebar ? function () {
        self.f7Messagebar.clear();
      } : function () {};
      this.dispatchEvent('submit', value, clear);
      this.dispatchEvent('send', value, clear);
      this.dispatchEvent('click', event);
    }
  }, {
    key: 'onDeleteAttachment',
    value: function onDeleteAttachment(e) {
      this.dispatchEvent('messagebar:attachmentdelete messagebarAttachmentDelete', e);
    }
  }, {
    key: 'onClickAttachment',
    value: function onClickAttachment(e) {
      this.dispatchEvent('messagebar:attachmentclick messagebarAttachmentClick', e);
    }
  }, {
    key: 'onResizePage',
    value: function onResizePage(e) {
      this.dispatchEvent('messagebar:resizepage messagebarResizePage', e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var _self$props = self.props,
          placeholder = _self$props.placeholder,
          disabled = _self$props.disabled,
          name = _self$props.name,
          readonly = _self$props.readonly,
          resizable = _self$props.resizable,
          value = _self$props.value,
          sendLink = _self$props.sendLink,
          id = _self$props.id,
          style = _self$props.style;
      var _self$slots = self.slots,
          slotsDefault = _self$slots.default,
          slotsBeforeInner = _self$slots['before-inner'],
          slotsAfterInner = _self$slots['after-inner'],
          slotsSendLink = _self$slots['send-link'],
          slotsInnerStart = _self$slots['inner-start'],
          slotsInnerEnd = _self$slots['inner-end'],
          slotsBeforeArea = _self$slots['before-area'],
          slotsAfterArea = _self$slots['after-area'];

      var innerEndEls = [];
      var messagebarAttachmentsEl = void 0;
      var messagebarSheetEl = void 0;

      if (slotsDefault) {
        slotsDefault.forEach(function (child) {
          if (typeof child === 'undefined') return;
          var tag = void 0;
          tag = child.type && child.type.name;

          if (tag && (tag.indexOf('messagebar-attachments') >= 0 || tag === 'F7MessagebarAttachments')) {
            messagebarAttachmentsEl = child;
          } else if (tag && (tag.indexOf('messagebar-sheet') >= 0 || tag === 'F7MessagebarSheet')) {
            messagebarSheetEl = child;
          } else {
            innerEndEls.push(child);
          }
        });
      }

      return _react2.default.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: self.classes
      }, slotsBeforeInner, _react2.default.createElement('div', {
        className: 'toolbar-inner'
      }, slotsInnerStart, _react2.default.createElement('div', {
        className: 'messagebar-area'
      }, slotsBeforeArea, messagebarAttachmentsEl, _react2.default.createElement(_input2.default, {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['area'] = __reactNode;
        },
        type: 'textarea',
        wrap: false,
        placeholder: placeholder,
        disabled: disabled,
        name: name,
        readonly: readonly,
        resizable: resizable,
        value: value,
        onInput: self.onInputBound,
        onChange: self.onChangeBound,
        onFocus: self.onFocusBound,
        onBlur: self.onBlurBound
      }), slotsAfterArea), (sendLink && sendLink.length > 0 || slotsSendLink) && _react2.default.createElement(_link2.default, {
        onClick: self.onClickBound
      }, slotsSendLink || sendLink), slotsInnerEnd, innerEndEls), slotsAfterInner, messagebarSheetEl);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      if (self.f7Messagebar && self.f7Messagebar.destroy) self.f7Messagebar.destroy();
      var el = self.refs.el;
      if (!el) return;
      el.removeEventListener('messagebar:attachmentdelete', self.onDeleteAttachmentBound);
      el.removeEventListener('messagebar:attachmentclick', self.onClickAttachmentBound);
      el.removeEventListener('messagebar:resizepage', self.onResizePageBound);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      (0, _reactComponentWatch2.default)(this, 'props.sheetVisible', prevProps, prevState, function () {
        var self = _this3;
        if (!self.props.resizable || !self.f7Messagebar) return;
        self.updateSheetVisible = true;
      });

      (0, _reactComponentWatch2.default)(this, 'props.attachmentsVisible', prevProps, prevState, function () {
        var self = _this3;
        if (!self.props.resizable || !self.f7Messagebar) return;
        self.updateAttachmentsVisible = true;
      });

      var self = this;
      if (!self.f7Messagebar) return;
      var _self$props2 = self.props,
          sheetVisible = _self$props2.sheetVisible,
          attachmentsVisible = _self$props2.attachmentsVisible;

      if (self.updateSheetVisible) {
        self.updateSheetVisible = false;
        self.f7Messagebar.sheetVisible = sheetVisible;
        self.f7Messagebar.resizePage();
      }

      if (self.updateAttachmentsVisible) {
        self.updateAttachmentsVisible = false;
        self.f7Messagebar.attachmentsVisible = attachmentsVisible;
        self.f7Messagebar.resizePage();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var _self$props3 = self.props,
          init = _self$props3.init,
          top = _self$props3.top,
          resizePage = _self$props3.resizePage,
          bottomOffset = _self$props3.bottomOffset,
          topOffset = _self$props3.topOffset,
          maxHeight = _self$props3.maxHeight;

      if (!init) return;
      var el = self.refs.el;
      if (!el) return;
      el.addEventListener('messagebar:attachmentdelete', self.onDeleteAttachmentBound);
      el.addEventListener('messagebar:attachmentclick', self.onClickAttachmentBound);
      el.addEventListener('messagebar:resizepage', self.onResizePageBound);
      var params = _utils2.default.noUndefinedProps({
        el: el,
        top: top,
        resizePage: resizePage,
        bottomOffset: bottomOffset,
        topOffset: topOffset,
        maxHeight: maxHeight
      });
      self.$f7ready(function () {
        self.f7Messagebar = self.$f7.messagebar.create(params);
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
    key: 'classes',
    get: function get() {
      var self = this;
      var props = self.props;
      var className = props.className,
          attachmentsVisible = props.attachmentsVisible,
          sheetVisible = props.sheetVisible;

      return _utils2.default.classNames(className, 'toolbar', 'messagebar', {
        'messagebar-attachments-visible': attachmentsVisible,
        'messagebar-sheet-visible': sheetVisible
      }, _mixins2.default.colorClasses(props));
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

  return F7Messagebar;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Messagebar, Object.assign({
  id: [String, Number],
  sheetVisible: Boolean,
  attachmentsVisible: Boolean,
  top: Boolean,
  resizable: {
    type: Boolean,
    default: true
  },
  bottomOffset: {
    type: Number,
    default: 0
  },
  topOffset: {
    type: Number,
    default: 0
  },
  maxHeight: Number,
  resizePage: Boolean,
  sendLink: String,
  value: [String, Number, Array],
  disabled: Boolean,
  readonly: Boolean,
  name: String,
  placeholder: {
    type: String,
    default: 'Message'
  },
  init: {
    type: Boolean,
    default: true
  }
}, _mixins2.default.colorProps));

exports.default = F7Messagebar;