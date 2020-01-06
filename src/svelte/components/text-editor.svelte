<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

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

  $: classes = Utils.classNames(
    className,
    'text-editor',
    resizable && 'text-editor-resizable',
    Mixins.colorClasses($$props),
  );

  function watchValue(newValue) {
    if (f7TextEditor) {
      f7TextEditor.setValue(newValue);
    }
  }

  $: watchValue(value);

  function onChange(editor, editorValue) {
    dispatch('textEditorChange', [editorValue]);
  }
  function onInput() {
    dispatch('textEditorChange');
  }
  function onFocus() {
    dispatch('textEditorFocus');
  }
  function onBlur() {
    dispatch('textEditorBlur');
  }
  function onButtonClick(editor, button) {
    dispatch('textEditorButtonClick', [button]);
  }
  function onKeyboardOpen() {
    dispatch('textEditorKeyboardOpen');
  }
  function onKeyboardClose() {
    dispatch('textEditorKeyboardClose');
  }
  function onPopoverOpen() {
    dispatch('textEditorPopoverOpen');
  }
  function onPopoverClose() {
    dispatch('textEditorPopoverClose');
  }

  onMount(() => {
    const params = Utils.noUndefinedProps({
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
    }
  });
</script>

<div bind:this={el} id={id} style={style} class={classes}>
  <slot name="root-start" />
  <div class="text-editor-content" contenteditable><slot /></div>
  <slot name="root-end" />
  <slot name="root" />
</div>
