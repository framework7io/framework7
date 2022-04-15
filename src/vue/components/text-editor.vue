<template>
  <div ref="elRef" :class="classes">
    <slot name="root-start" />
    <div class="text-editor-content" contenteditable>
      <slot />
    </div>
    <slot name="root-end" />
    <slot name="root" />
  </div>
</template>
<script>
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { classNames, noUndefinedProps } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';

export default {
  name: 'f7-text-editor',
  props: {
    mode: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    },
    buttons: Array,
    customButtons: Object,
    dividers: {
      type: Boolean,
      default: undefined,
    },
    imageUrlText: {
      type: String,
      default: undefined,
    },
    linkUrlText: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    clearFormattingOnPaste: {
      type: Boolean,
      default: undefined,
    },
    resizable: {
      type: Boolean,
      default: false,
    },
    ...colorProps,
  },
  emits: [
    'texteditor:change',
    'texteditor:input',
    'texteditor:focus',
    'texteditor:blur',
    'texteditor:buttonclick',
    'texteditor:keyboardopen',
    'texteditor:keyboardclose',
    'texteditor:popoveropen',
    'texteditor:popoverclose',
    'texteditor:insertlink',
    'texteditor:insertimage',
    'texteditorChange',
    'texteditorInput',
    'texteditorFocus',
    'texteditorBlur',
  ],
  setup(props, { emit }) {
    let f7TextEditor = null;
    const elRef = ref(null);

    const onChange = (editor, editorValue) => {
      emit('texteditor:change', editorValue);
      emit('texteditorChange', editorValue);
    };
    const onInput = (editor, editorValue) => {
      emit('texteditor:input', editorValue);
      emit('texteditorInput', editorValue);
    };
    const onFocus = () => {
      emit('texteditor:focus');
      emit('texteditorFocus');
    };
    const onBlur = () => {
      emit('texteditor:blur');
      emit('texteditorBlur');
    };
    const onButtonClick = (editor, button) => {
      emit('texteditor:buttonclick', button);
    };
    const onKeyboardOpen = () => {
      emit('texteditor:keyboardopen');
    };
    const onKeyboardClose = () => {
      emit('texteditor:keyboardclose');
    };
    const onPopoverOpen = () => {
      emit('texteditor:popoveropen');
    };
    const onPopoverClose = () => {
      emit('texteditor:popoverclose');
    };
    const onInsertLink = (editor, url) => {
      emit('texteditor:insertlink', url);
    };
    const onInsertImage = (editor, url) => {
      emit('texteditor:insertimage', url);
    };

    watch(
      () => props.value,
      (newValue) => {
        if (f7TextEditor) {
          f7TextEditor.setValue(newValue);
        }
      },
    );

    onMounted(() => {
      const params = noUndefinedProps({
        el: elRef.value,
        mode: props.mode,
        value: props.value,
        buttons: props.buttons,
        customButtons: props.customButtons,
        dividers: props.dividers,
        imageUrlText: props.imageUrlText,
        linkUrlText: props.linkUrlText,
        placeholder: props.placeholder,
        clearFormattingOnPaste: props.clearFormattingOnPaste,
        on: {
          change: onChange,
          input: onInput,
          focus: onFocus,
          blur: onBlur,
          buttonClick: onButtonClick,
          keyboardOpen: onKeyboardOpen,
          keyboardClose: onKeyboardClose,
          popoverOpen: onPopoverOpen,
          popoverClose: onPopoverClose,
          insertLink: onInsertLink,
          insertImage: onInsertImage,
        },
      });
      f7ready(() => {
        f7TextEditor = f7.textEditor.create(params);
      });
    });

    onBeforeUnmount(() => {
      if (f7TextEditor && f7TextEditor.destroy) {
        f7TextEditor.destroy();
      }
      f7TextEditor = null;
    });

    const classes = computed(() =>
      classNames('text-editor', props.resizable && 'text-editor-resizable', colorClasses(props)),
    );

    return {
      elRef,
      classes,
    };
  },
};
</script>
