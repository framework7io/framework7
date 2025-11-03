<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, noUndefinedProps } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';

  let {
    class: className,
    mode = undefined,
    value = undefined,
    buttons = undefined,
    customButtons = undefined,
    dividers = undefined,
    imageUrlText = undefined,
    linkUrlText = undefined,
    placeholder = undefined,
    clearFormattingOnPaste = undefined,
    resizable = false,
    rootStart,
    rootEnd,
    root,
    children,
    ...restProps
  } = $props();

  let el = $state(null);
  let f7TextEditor;

  export function instance() {
    return f7TextEditor;
  }

  const classes = $derived(
    classNames(
      className,
      'text-editor',
      resizable && 'text-editor-resizable',
      colorClasses(restProps),
    ),
  );

  function watchValue(newValue) {
    if (f7TextEditor) {
      f7TextEditor.setValue(newValue);
    }
  }

  $effect(() => watchValue(value));

  function onChange(editor, editorValue) {
    restProps.onTextEditorChange?.(editorValue);
    restProps.ontexteditorchange?.(editorValue);
  }
  function onInput(editor, editorValue) {
    restProps.onTextEditorInput?.(editorValue);
    restProps.ontexteditorinput?.(editorValue);
  }
  function onFocus() {
    restProps.onTextEditorFocus?.();
    restProps.ontexteditorfocus?.();
  }
  function onBlur() {
    restProps.onTextEditorBlur?.();
    restProps.ontexteditorblur?.();
  }
  function onButtonClick(editor, button) {
    restProps.onTextEditorButtonClick?.(button);
    restProps.ontexteditorbuttonclick?.(button);
  }
  function onKeyboardOpen() {
    restProps.onTextEditorKeyboardOpen?.();
    restProps.ontexteditorkeyboardopen?.();
  }
  function onKeyboardClose() {
    restProps.onTextEditorKeyboardClose?.();
    restProps.ontexteditorkeyboardclose?.();
  }
  function onPopoverOpen() {
    restProps.onTextEditorPopoverOpen?.();
    restProps.ontexteditorpopoveropen?.();
  }
  function onPopoverClose() {
    restProps.onTextEditorPopoverClose?.();
    restProps.ontexteditorpopoverclose?.();
  }
  const onInsertLink = (editor, url) => {
    restProps.onTextEditorInsertLink?.(url);
    restProps.ontexteditorinsertlink?.(url);
  };
  const onInsertImage = (editor, url) => {
    restProps.onTextEditorInsertImage?.(url);
    restProps.ontexteditorinsertimage?.(url);
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

<div bind:this={el} class={classes} {...restProps}>
  {@render rootStart?.(f7TextEditor)}
  <div class="text-editor-content" contenteditable>
    {@render children?.(f7TextEditor)}
  </div>
  {@render rootEnd?.(f7TextEditor)}
  {@render root?.(f7TextEditor)}
</div>
