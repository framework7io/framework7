<script>
  import { createEventDispatcher, onMount, onDestroy, afterUpdate } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, noUndefinedProps, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { app, f7ready } from '../shared/f7.js';

  import Link from './link.svelte';
  import Input from './input.svelte';

  const emit = createEmitter(createEventDispatcher, $$props);

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

  $: classes = classNames(
    className,
    'toolbar',
    'messagebar',
    {
      'messagebar-attachments-visible': attachmentsVisible,
      'messagebar-sheet-visible': sheetVisible,
    },
    colorClasses($$props),
  );

  $: hasSendLinkSlots = $$slots['send-link'];

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
    emit('change', [...event.detail]);
  }

  function onInput(event) {
    emit('input', [...event.detail]);
    value = event.detail[0].target.value;
  }

  function onFocus(event) {
    emit('focus', [...event.detail]);
  }

  function onBlur(event) {
    emit('blur', [...event.detail]);
  }

  function onClick(event) {
    const inputValue = el.querySelector('textarea');
    const clear = f7Messagebar
      ? () => {
          f7Messagebar.clear();
        }
      : () => {};

    emit('submit', [inputValue, clear]);
    emit('send', [inputValue, clear]);
    emit('click', [event]);
  }

  function onAttachmentDelete(inst, attachmentEl, attachmentElIndex) {
    emit('messagebarAttachmentDelete', [inst, attachmentEl, attachmentElIndex]);
  }

  function onAttachmentClick(inst, attachmentEl, attachmentElIndex) {
    emit('messagebarAttachmentClick', [inst, attachmentEl, attachmentElIndex]);
  }

  function onResizePage(inst) {
    emit('messagebarResizePage', [inst]);
  }

  onMount(() => {
    if (!init || !el) return;
    f7ready(() => {
      if (el) {
        const dom7 = app.f7.$;
        const attachmentsEl = dom7(el).find('.toolbar-inner > .messagebar-attachments');
        if (attachmentsEl.length) dom7(el).find('.messagebar-area').prepend(attachmentsEl);

        const sheetEl = dom7(el).find('.toolbar-inner > .messagebar-sheet');
        if (sheetEl.length) dom7(el).append(sheetEl);
      }
      f7Messagebar = app.f7.messagebar.create(
        noUndefinedProps({
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
        }),
      );
    });
  });

  afterUpdate(() => {
    if (!f7Messagebar) return;
    if (el && app.f7) {
      const dom7 = app.f7.$;
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
    if (f7Messagebar && f7Messagebar.destroy) {
      f7Messagebar.destroy();
      f7Messagebar = null;
    }
  });
</script>

<div bind:this={el} class={classes} data-f7-slot={f7Slot} {...restProps($$restProps)}>
  <slot messagebar={f7Messagebar} name="before-inner" />
  <div class="toolbar-inner">
    <slot messagebar={f7Messagebar} name="inner-start" />
    <div class="messagebar-area">
      <slot messagebar={f7Messagebar} name="before-area" />
      <Input
        inputId={textareaId}
        type="textarea"
        wrap={false}
        {placeholder}
        {disabled}
        {name}
        {readonly}
        {resizable}
        value={typeof value === 'undefined' ? '' : value}
        on:input={onInput}
        on:change={onChange}
        on:focus={onFocus}
        on:blur={onBlur}
      />
      <slot messagebar={f7Messagebar} name="after-inner" />
    </div>
    {#if (sendLink && sendLink.length > 0) || hasSendLinkSlots}
      <Link {onClick}>
        <slot messagebar={f7Messagebar} name="send-link" />
        {sendLink}
      </Link>
    {/if}
    <slot messagebar={f7Messagebar} name="inner-end" />
    <slot messagebar={f7Messagebar} />
  </div>
  <slot messagebar={f7Messagebar} name="after-inner" />
</div>
