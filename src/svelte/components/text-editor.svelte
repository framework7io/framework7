<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, noUndefinedProps, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { app, f7ready } from '../shared/f7.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let mode = undefined;
  export let value = undefined;
  export let buttons = undefined;
  export let customButtons = undefined;
  export let dividers = undefined;
  export let imageUrlText = undefined;
  export let linkUrlText = undefined;
  export let placeholder = undefined;
  export let clearFormattingOnPaste = undefined;
  export let resizable = false;

  let el;
  let f7TextEditor;

  export function instance() {
    return f7TextEditor;
  }

  $: classes = classNames(
    className,
    'text-editor',
    resizable && 'text-editor-resizable',
    colorClasses($$props),
  );

  function watchValue(newValue) {
    if (f7TextEditor) {
      f7TextEditor.setValue(newValue);
    }
  }

  $: watchValue(value);

  function onChange(editor, editorValue) {
    emit('textEditorChange', [editorValue]);
  }
  function onInput(editor, editorValue) {
    emit('textEditorInput', [editorValue]);
  }
  function onFocus() {
    emit('textEditorFocus');
  }
  function onBlur() {
    emit('textEditorBlur');
  }
  function onButtonClick(editor, button) {
    emit('textEditorButtonClick', [button]);
  }
  function onKeyboardOpen() {
    emit('textEditorKeyboardOpen');
  }
  function onKeyboardClose() {
    emit('textEditorKeyboardClose');
  }
  function onPopoverOpen() {
    emit('textEditorPopoverOpen');
  }
  function onPopoverClose() {
    emit('textEditorPopoverClose');
  }
  const onInsertLink = (editor, url) => {
    emit('textEditorInsertLink', [url]);
  };
  const onInsertImage = (editor, url) => {
    emit('textEditorInsertImage', [url]);
  };

  onMount(() => {
    const params = noUndefinedProps({
      el,
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
      f7TextEditor = app.f7.textEditor.create(params);
    });
  });

  onDestroy(() => {
    if (f7TextEditor && f7TextEditor.destroy) {
      f7TextEditor.destroy();
      f7TextEditor = null;
    }
  });
</script>

<div bind:this={el} class={classes} {...restProps($$restProps)}>
  <slot textEditor={f7TextEditor} name="root-start" />
  <div class="text-editor-content" contenteditable>
    <slot textEditor={f7TextEditor} />
  </div>
  <slot textEditor={f7TextEditor} name="root-end" />
  <slot textEditor={f7TextEditor} name="root" />
</div>
