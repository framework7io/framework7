import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-text-editor',
  props: Object.assign({
    id: [String, Number]
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
  }),
  created: function created() {
    Utils.bindMethods(this, 'onChange onInput onFocus onBlur onButtonClick onKeyboardOpen onKeyboardClose onPopoverOpen onPopoverClose'.split(' '));
  },
  mounted: function mounted() {
    var _this = this;

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
      el: this.$refs.el,
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
      _this.f7TextEditor = f7.textEditor.create(params);
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.f7TextEditor && this.f7TextEditor.destroy) {
      this.f7TextEditor.destroy();
    }
  },
  watch: {
    'props.value': function watchValue() {
      if (this.f7TextEditor) {
        this.f7TextEditor.setValue(this.props.value);
      }
    }
  },
  render: function render() {
    var _h = this.$createElement;
    var props = this.props;
    var className = props.className,
        id = props.id,
        style = props.style,
        resizable = props.resizable;
    var classes = Utils.classNames(className, 'text-editor', resizable && 'text-editor-resizable', Mixins.colorClasses(props));
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['root-start'], _h('div', {
      class: 'text-editor-content',
      attrs: {
        contenteditable: true
      }
    }, [this.$slots['default']]), this.$slots['root-end'], this.$slots['root']]);
  },
  methods: {
    onChange: function onChange(editor, value) {
      this.dispatchEvent('texteditor:change textEditorChange', value);
    },
    onInput: function onInput() {
      this.dispatchEvent('texteditor:change textEditorChange');
    },
    onFocus: function onFocus() {
      this.dispatchEvent('texteditor:focus textEditorFocus');
    },
    onBlur: function onBlur() {
      this.dispatchEvent('texteditor:blur textEditorBlur');
    },
    onButtonClick: function onButtonClick(editor, button) {
      this.dispatchEvent('texteditor:buttonclick textEditorButtonClick', button);
    },
    onKeyboardOpen: function onKeyboardOpen() {
      this.dispatchEvent('texteditor:keyboardopen textEditorKeyboardOpen');
    },
    onKeyboardClose: function onKeyboardClose() {
      this.dispatchEvent('texteditor:keyboardclose textEditorKeyboardClose');
    },
    onPopoverOpen: function onPopoverOpen() {
      this.dispatchEvent('texteditor:popoveropen textEditorPopoverOpen');
    },
    onPopoverClose: function onPopoverClose() {
      this.dispatchEvent('texteditor:popoverclose textEditorPopoverClose');
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};