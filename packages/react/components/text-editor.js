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
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7TextEditor =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7TextEditor, _React$Component);

  function F7TextEditor(props, context) {
    var _this;

    _classCallCheck(this, F7TextEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7TextEditor).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), 'onChange onInput onFocus onBlur onButtonClick onKeyboardOpen onKeyboardClose onPopoverOpen onPopoverClose'.split(' '));
    })();

    return _this;
  }

  _createClass(F7TextEditor, [{
    key: "onChange",
    value: function onChange(editor, value) {
      this.dispatchEvent('texteditor:change textEditorChange', value);
    }
  }, {
    key: "onInput",
    value: function onInput() {
      this.dispatchEvent('texteditor:change textEditorChange');
    }
  }, {
    key: "onFocus",
    value: function onFocus() {
      this.dispatchEvent('texteditor:focus textEditorFocus');
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      this.dispatchEvent('texteditor:blur textEditorBlur');
    }
  }, {
    key: "onButtonClick",
    value: function onButtonClick(editor, button) {
      this.dispatchEvent('texteditor:buttonclick textEditorButtonClick', button);
    }
  }, {
    key: "onKeyboardOpen",
    value: function onKeyboardOpen() {
      this.dispatchEvent('texteditor:keyboardopen textEditorKeyboardOpen');
    }
  }, {
    key: "onKeyboardClose",
    value: function onKeyboardClose() {
      this.dispatchEvent('texteditor:keyboardclose textEditorKeyboardClose');
    }
  }, {
    key: "onPopoverOpen",
    value: function onPopoverOpen() {
      this.dispatchEvent('texteditor:popoveropen textEditorPopoverOpen');
    }
  }, {
    key: "onPopoverClose",
    value: function onPopoverClose() {
      this.dispatchEvent('texteditor:popoverclose textEditorPopoverClose');
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var props = this.props;
      var className = props.className,
          id = props.id,
          style = props.style,
          resizable = props.resizable;
      var classes = Utils.classNames(className, 'text-editor', resizable && 'text-editor-resizable', Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, this.slots['root-start'], React.createElement('div', {
        className: 'text-editor-content',
        contentEditable: true
      }, this.slots['default']), this.slots['root-end'], this.slots['root']);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.f7TextEditor && this.f7TextEditor.destroy) {
        this.f7TextEditor.destroy();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this3 = this;

      var props = this.props;
      var mode = props.mode,
          value = props.value,
          palceholder = props.palceholder,
          buttons = props.buttons,
          customButtons = props.customButtons,
          dividers = props.dividers,
          imageUrlText = props.imageUrlText,
          linkUrlText = props.linkUrlText,
          placeholder = props.placeholder,
          clearFormattingOnPaste = props.clearFormattingOnPaste;
      var params = Utils.noUndefinedProps({
        el: this.refs.el,
        mode: mode,
        value: value,
        palceholder: palceholder,
        buttons: buttons,
        customButtons: customButtons,
        dividers: dividers,
        imageUrlText: imageUrlText,
        linkUrlText: linkUrlText,
        placeholder: placeholder,
        clearFormattingOnPaste: clearFormattingOnPaste,
        on: {
          change: this.onChange,
          input: this.onInput,
          focus: this.onFocus,
          blur: this.onBlur,
          buttonClick: this.onButtonClick,
          keyboardOpen: this.onKeyboardOpen,
          keyboardClose: this.onKeyboardClose,
          popoverOpen: this.onPopoverOpen,
          popoverClose: this.onPopoverClose
        }
      });
      this.$f7ready(function (f7) {
        _this3.f7TextEditor = f7.textEditor.create(params);
      });
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
      var _this4 = this;

      __reactComponentWatch(this, 'props.value', prevProps, prevState, function () {
        if (_this4.f7TextEditor) {
          _this4.f7TextEditor.setValue(_this4.props.value);
        }
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

  return F7TextEditor;
}(React.Component);

__reactComponentSetProps(F7TextEditor, Object.assign({
  id: [String, Number],
  className: String,
  style: Object
}, Mixins.colorProps, {
  mode: {
    type: String,
    default: undefined
  },
  value: {
    type: String,
    default: undefined
  },
  buttons: Array,
  customButtons: Object,
  dividers: {
    type: Boolean,
    default: undefined
  },
  imageUrlText: {
    type: String,
    default: undefined
  },
  linkUrlText: {
    type: String,
    default: undefined
  },
  placeholder: {
    type: String,
    default: undefined
  },
  clearFormattingOnPaste: {
    type: Boolean,
    default: undefined
  },
  resizable: {
    type: Boolean,
    default: false
  }
}));

F7TextEditor.displayName = 'f7-text-editor';
export default F7TextEditor;