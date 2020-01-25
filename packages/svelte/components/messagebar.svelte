<script>
  import { createEventDispatcher, onMount, onDestroy, afterUpdate } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';
  import hasSlots from '../utils/has-slots';

  import Link from './link.svelte';
  import Input from './input.svelte';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let sheetVisible = false;
  export let attachmentsVisible = false;
  export let top = false;
  export let resizable = true;
  export let bottomOffset = 0;
  export let topOffset = 0;
  export let maxHeight = undefined;
  export let resizePage = true;
  export let sendLink = undefined;
  export let value = undefined;
  export let disabled = false;
  export let readonly = false;
  export let textareaId = undefined;
  export let name = undefined;
  export let placeholder = 'Message';

  export let init = true;

  export let f7Slot = 'fixed';

  let el;
  let f7Messagebar;
  let updateSheetVisible;
  let updateAttachmentsVisible;

  export function instance() {
    return f7Messagebar;
  }

  export function clear(...args) {
    if (!f7Messagebar) return undefined;
    return f7Messagebar.clear(...args);
  }
  export function getValue(...args) {
    if (!f7Messagebar) return undefined;
    return f7Messagebar.getValue(...args);
  }
  export function setValue(...args) {
    if (!f7Messagebar) return undefined;
    return f7Messagebar.setValue(...args);
  }
  export function resize(...args) {
    if (!f7Messagebar) return undefined;
    return f7Messagebar.resizePage(...args);
  }
  export function focus(...args) {
    if (!f7Messagebar) return undefined;
    return f7Messagebar.focus(...args);
  }
  export function blur(...args) {
    if (!f7Messagebar) return undefined;
    return f7Messagebar.blur(...args);
  }

  $: classes = Utils.classNames(
    className,
    'toolbar',
    'messagebar',
    {
      'messagebar-attachments-visible': attachmentsVisible,
      'messagebar-sheet-visible': sheetVisible,
    },
    Mixins.colorClasses($$props),
  );

  // eslint-disable-next-line
  $: hasSendLinkSlots = hasSlots(arguments, 'send-link');

  let initialWatchedSheet = false;
  function watchSheetVisible() {
    if (!initialWatchedSheet) {
      initialWatchedSheet = true;
      return;
    }
    if (!resizable || !f7Messagebar) return;
    updateSheetVisible = true;
  }
  let initialWatchedAttachments;
  function watchAttachmentsVisible() {
    if (!initialWatchedAttachments) {
      initialWatchedAttachments = true;
      return;
    }
    if (!resizable || !f7Messagebar) return;
    updateAttachmentsVisible = true;
  }

  $: watchSheetVisible(sheetVisible);
  $: watchAttachmentsVisible(attachmentsVisible);

  function onChange(event) {
    dispatch('change', [...event.detail]);
    if (typeof $$props.onChange === 'function') $$props.onChange(...event.detail);
  }

  function onInput(event) {
    dispatch('input', [...event.detail]);
    if (typeof $$props.onInput === 'function') $$props.onInput(...event.detail);
  }

  function onFocus(event) {
    dispatch('focus', [...event.detail]);
    if (typeof $$props.onFocus === 'function') $$props.onFocus(...event.detail);
  }

  function onBlur(event) {
    dispatch('blur', [...event.detail]);
    if (typeof $$props.onBlur === 'function') $$props.onBlur(...event.detail);
  }

  function onClick(event) {
    const inputValue = el.querySelector('textarea');

    const clear = f7Messagebar
      ? () => { f7Messagebar.clear(); }
      : () => {};
    dispatch('submit', [inputValue, clear]);
    if (typeof $$props.onSubmit === 'function') $$props.onSubmit(inputValue, clear);
    dispatch('send', [inputValue, clear]);
    if (typeof $$props.onSend === 'function') $$props.onSend(inputValue, clear);
    dispatch('click', [event]);
    if (typeof $$props.onClick === 'function') $$props.onClick(event);
  }

  function onAttachmentDelete(inst, attachmentEl, attachmentElIndex) {
    dispatch('messagebarAttachmentDelete', [inst, attachmentEl, attachmentElIndex]);
    if (typeof $$props.onMessagebarAttachmentDelete === 'function') $$props.onMessagebarAttachmentDelete(inst, attachmentEl, attachmentElIndex);
  }

  function onAttachmentClick(inst, attachmentEl, attachmentElIndex) {
    dispatch('messagebarAttachmentClick', [inst, attachmentEl, attachmentElIndex]);
    if (typeof $$props.onMessagebarAttachmentClick === 'function') $$props.onMessagebarAttachmentClick(inst, attachmentEl, attachmentElIndex);
  }

  function onResizePage(inst) {
    dispatch('messagebarResizePage', [inst]);
    if (typeof $$props.onMessagebarResizePage === 'function') $$props.onMessagebarResizePage(inst);
  }

  onMount(() => {
    if (!init || !el) return;
    f7.ready(() => {
      if (el) {
        const dom7 = f7.instance.$;
        const attachmentsEl = dom7(el).find('.toolbar-inner > .messagebar-attachments');
        if (attachmentsEl.length) dom7(el).find('.messagebar-area').prepend(attachmentsEl);

        const sheetEl = dom7(el).find('.toolbar-inner > .messagebar-sheet');
        if (sheetEl.length) dom7(el).append(sheetEl);
      }
      f7Messagebar = f7.instance.messagebar.create(Utils.noUndefinedProps({
        el,
        top,
        resizePage,
        bottomOffset,
        topOffset,
        maxHeight,
        on: {
          attachmentDelete: onAttachmentDelete,
          attachmentClick: onAttachmentClick,
          resizePage: onResizePage,
        },
      }));
    });
  });

  afterUpdate(() => {
    if (!f7Messagebar) return;
    if (el && f7.instance) {
      const dom7 = f7.instance.$;
      const attachmentsEl = dom7(el).find('.toolbar-inner > .messagebar-attachments');
      if (attachmentsEl.length) dom7(el).find('.messagebar-area').prepend(attachmentsEl);

      const sheetEl = dom7(el).find('.toolbar-inner > .messagebar-sheet');
      if (sheetEl.length) dom7(el).append(sheetEl);
    }
    if (updateSheetVisible) {
      updateSheetVisible = false;
      f7Messagebar.sheetVisible = sheetVisible;
      f7Messagebar.resizePage();
    }
    if (updateAttachmentsVisible) {
      updateAttachmentsVisible = false;
      f7Messagebar.attachmentsVisible = attachmentsVisible;
      f7Messagebar.resizePage();
    }
  });

  onDestroy(() => {
    if (f7Messagebar && f7Messagebar.destroy) f7Messagebar.destroy();
  });

</script>

<div bind:this={el} id={id} style={style} class={classes} data-f7-slot={f7Slot}>
  <slot name="before-inner" />
  <div class="toolbar-inner">
    <slot name="inner-start" />
    <div class="messagebar-area">
      <slot name="before-area" />
      <Input
        id={textareaId}
        type="textarea"
        wrap={false}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        readonly={readonly}
        resizable={resizable}
        value={typeof value === 'undefined' ? '' : value}
        on:input={onInput}
        on:change={onChange}
        on:focus={onFocus}
        on:blur={onBlur}
      />
      <slot name="after-inner" />
    </div>
    {#if ((sendLink && sendLink.length > 0) || hasSendLinkSlots)}
      <Link onClick={onClick}>
        <slot name="send-link" />
        {sendLink}
      </Link>
    {/if}
    <slot name="inner-end" />
    <slot />
  </div>
  <slot name="after-inner" />
</div>
