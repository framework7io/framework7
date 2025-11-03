<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, noUndefinedProps } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';

  import Link from './link.svelte';
  import Input from './input.svelte';

  let {
    class: className,
    sheetVisible = false,
    attachmentsVisible = false,
    top = false,
    resizable = true,
    bottomOffset = 0,
    topOffset = 0,
    maxHeight = undefined,
    resizePage = true,
    sendLink = undefined,
    value = undefined,
    disabled = false,
    readonly = false,
    textareaId = undefined,
    name = undefined,
    placeholder = 'Message',
    init = true,
    f7Slot = 'fixed',
    children,
    beforeInner,
    innerStart,
    beforeArea,
    afterArea,
    innerEnd,
    afterInner,
    ...restProps
  } = $props();

  let el = $state(undefined);
  let f7Messagebar = $state(undefined);
  let updateSheetVisible = $state(false);
  let updateAttachmentsVisible = $state(false);

  export function instance() {
    return f7Messagebar;
  }

  const classes = $derived(
    classNames(
      className,
      'toolbar',
      'messagebar',
      {
        'messagebar-attachments-visible': attachmentsVisible,
        'messagebar-sheet-visible': sheetVisible,
      },
      colorClasses(restProps),
    ),
  );

  const hasSendLinkSlots = $derived(sendLink);

  let initialWatchedSheet = $state(false);
  function watchSheetVisible() {
    if (!initialWatchedSheet) {
      initialWatchedSheet = true;
      return;
    }
    if (!resizable || !f7Messagebar) return;
    updateSheetVisible = true;
  }
  let initialWatchedAttachments = $state(false);
  function watchAttachmentsVisible() {
    if (!initialWatchedAttachments) {
      initialWatchedAttachments = true;
      return;
    }
    if (!resizable || !f7Messagebar) return;
    updateAttachmentsVisible = true;
  }

  $effect(() => watchSheetVisible(sheetVisible));
  $effect(() => watchAttachmentsVisible(attachmentsVisible));

  function onChange(event) {
    restProps.onChange?.(event);
    restProps.onchange?.(event);
  }

  function onInput(event) {
    restProps.onInput?.(event);
    restProps.oninput?.(event);
    value = event.detail[0].target.value;
  }

  function onFocus(event) {
    restProps.onFocus?.(event);
    restProps.onfocus?.(event);
  }

  function onBlur(event) {
    restProps.onBlur?.(event);
    restProps.onblur?.(event);
  }

  function onClick(event) {
    const inputValue = el.querySelector('textarea');
    const clear = f7Messagebar
      ? () => {
          f7Messagebar.clear();
        }
      : () => {};
    restProps.onSubmit?.(inputValue, clear);
    restProps.onsubmit?.(inputValue, clear);
    restProps.onSend?.(inputValue, clear);
    restProps.onsend?.(inputValue, clear);
    restProps.onClick?.(event);
    restProps.onclick?.(event);
  }

  function onAttachmentDelete(inst, attachmentEl, attachmentElIndex) {
    restProps.onMessagebarAttachmentDelete?.(inst, attachmentEl, attachmentElIndex);
    restProps.onmessagebarattachmentdelete?.(inst, attachmentEl, attachmentElIndex);
  }

  function onAttachmentClick(inst, attachmentEl, attachmentElIndex) {
    restProps.onMessagebarAttachmentClick?.(inst, attachmentEl, attachmentElIndex);
    restProps.onmessagebarattachmentclick?.(inst, attachmentEl, attachmentElIndex);
  }

  function onResizePage(inst) {
    restProps.onMessagebarResizePage?.(inst);
    restProps.onmessagebarresizepage?.(inst);
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

  $effect(() => {
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

<div bind:this={el} class={classes} data-f7-slot={f7Slot} {...restProps}>
  {@render beforeInner?.(f7Messagebar)}

  <div class="toolbar-inner">
    {@render innerStart?.(f7Messagebar)}
    <div class="messagebar-area">
      {@render beforeArea?.(f7Messagebar)}
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
      {@render afterArea?.(f7Messagebar)}
    </div>
    {#if (sendLink && sendLink.length > 0) || hasSendLinkSlots}
      <Link {onClick}>
        {@render sendLink?.(f7Messagebar)}
        {sendLink}
      </Link>
    {/if}
    {@render innerEnd?.(f7Messagebar)}
    {@render children?.(f7Messagebar)}
  </div>
  {@render afterInner?.(f7Messagebar)}
</div>
