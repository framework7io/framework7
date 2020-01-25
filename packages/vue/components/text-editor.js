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

  created() {
    Utils.bindMethods(this, 'onChange onInput onFocus onBlur onButtonClick onKeyboardOpen onKeyboardClose onPopoverOpen onPopoverClose'.split(' '));
  },

  mounted() {
    const props = this.props;
    const {
      mode,
      value,
      buttons,
      customButtons,
      dividers,
      imageUrlText,
      linkUrlText,
      placeholder,
      clearFormattingOnPaste
    } = props;
    const params = Utils.noUndefinedProps({
      el: this.$refs.el,
      mode,
      value,
      buttons,
      customButtons,
      dividers,
      imageUrlText,
      linkUrlText,
      placeholder,
      clearFormattingOnPaste,
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
    this.$f7ready(f7 => {
      this.f7TextEditor = f7.textEditor.create(params);
    });
  },

  beforeDestroy() {
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

  render() {
    const _h = this.$createElement;
    const props = this.props;
    const {
      className,
      id,
      style,
      resizable
    } = props;
    const classes = Utils.classNames(className, 'text-editor', resizable && 'text-editor-resizable', Mixins.colorClasses(props));
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
    onChange(editor, value) {
      this.dispatchEvent('texteditor:change textEditorChange', value);
    },

    onInput() {
      this.dispatchEvent('texteditor:change textEditorChange');
    },

    onFocus() {
      this.dispatchEvent('texteditor:focus textEditorFocus');
    },

    onBlur() {
      this.dispatchEvent('texteditor:blur textEditorBlur');
    },

    onButtonClick(editor, button) {
      this.dispatchEvent('texteditor:buttonclick textEditorButtonClick', button);
    },

    onKeyboardOpen() {
      this.dispatchEvent('texteditor:keyboardopen textEditorKeyboardOpen');
    },

    onKeyboardClose() {
      this.dispatchEvent('texteditor:keyboardclose textEditorKeyboardClose');
    },

    onPopoverOpen() {
      this.dispatchEvent('texteditor:popoveropen textEditorPopoverOpen');
    },

    onPopoverClose() {
      this.dispatchEvent('texteditor:popoverclose textEditorPopoverClose');
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};