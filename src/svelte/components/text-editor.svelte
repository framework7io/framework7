<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames, noUndefinedProps } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7 } from '../shared/f7';

  const dispatch = createEventDispatcher();

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
    dispatch('textEditorChange', [editorValue]);
    if (typeof $$props.onTextEditorChange === 'function') $$props.onTextEditorChange(editorValue);
  }
  function onInput(editor, editorValue) {
    dispatch('textEditorInput', [editorValue]);
    if (typeof $$props.onTextEditorInput === 'function') $$props.onTextEditorInput(editorValue);
  }
  function onFocus() {
    dispatch('textEditorFocus');
    if (typeof $$props.onTextEditorFocus === 'function') $$props.onTextEditorFocus();
  }
  function onBlur() {
    dispatch('textEditorBlur');
    if (typeof $$props.onTextEditorBlur === 'function') $$props.onTextEditorBlur();
  }
  function onButtonClick(editor, button) {
    dispatch('textEditorButtonClick', [button]);
    if (typeof $$props.onTextEditorButtonClick === 'function')
      $$props.onTextEditorButtonClick(button);
  }
  function onKeyboardOpen() {
    dispatch('textEditorKeyboardOpen');
    if (typeof $$props.onTextEditorKeyboardOpen === 'function') $$props.onTextEditorKeyboardOpen();
  }
  function onKeyboardClose() {
    dispatch('textEditorKeyboardClose');
    if (typeof $$props.onTextEditorKeyboardClose === 'function')
      $$props.onTextEditorKeyboardClose();
  }
  function onPopoverOpen() {
    dispatch('textEditorPopoverOpen');
    if (typeof $$props.onTextEditorPopoverOpen === 'function') $$props.onTextEditorPopoverOpen();
  }
  function onPopoverClose() {
    dispatch('textEditorPopoverClose');
    if (typeof $$props.onTextEditorPopoverClose === 'function') $$props.onTextEditorPopoverClose();
  }

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
      },
    });
    f7.ready(() => {
      f7TextEditor = f7.instance.textEditor.create(params);
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
  <slot name="root-start" />
  <div class="text-editor-content" contenteditable>
    <slot />
  </div>
  <slot name="root-end" />
  <slot name="root" />
</div>
