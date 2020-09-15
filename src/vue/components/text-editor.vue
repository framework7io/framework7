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
import { classNames, noUndefinedProps } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { f7ready, f7 } from '../shared/f7';

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
    'texteditor:change',
    'texteditor:focus',
    'texteditor:blur',
    'texteditor:buttonclick',
    'texteditor:keyboardopen',
    'texteditor:keyboardclose',
    'texteditor:popoveropen',
    'texteditor:popoverclose',
  ],
  setup(props, { emit }) {
    const f7TextEditor = ref(null);
    const elRef = ref(null);

    const onChange = (editor, editorValue) => {
      emit('texteditor:change', editorValue);
    };
    const onInput = () => {
      emit('texteditor:change');
    };
    const onFocus = () => {
      emit('texteditor:focus');
    };
    const onBlur = () => {
      emit('texteditor:blur');
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

    watch(
      () => props.value,
      (newValue) => {
        if (f7TextEditor.value) {
          f7TextEditor.value.setValue(newValue);
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
        },
      });
      f7ready(() => {
        f7TextEditor.value = f7.textEditor.create(params);
      });
    });

    onBeforeUnmount(() => {
      if (f7TextEditor.value && f7TextEditor.value.destroy) {
        f7TextEditor.value.destroy();
      }
      f7TextEditor.value = null;
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
