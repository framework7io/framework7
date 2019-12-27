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

  $: hasSendLinkSlots = hasSlots(arguments, 'send-link');

  function watchSheetVisible() {
    if (!resizable || !f7Messagebar) return;
    updateSheetVisible = true;
  }
  function watchAttachmentsVisible() {
    if (!resizable || !f7Messagebar) return;
    updateAttachmentsVisible = true;
  }

  $: watchSheetVisible(sheetVisible);
  $: watchAttachmentsVisible(attachmentsVisible);

  function onChange(event) {
    dispatch('change', [...event.detail]);
  }

  function onInput(event) {
    dispatch('input', [...event.detail]);
  }

  function onFocus(event) {
    dispatch('focus', [...event.detail]);
  }

  function onBlur(event) {
    dispatch('blur', [...event.detail]);
  }

  function onClick(event) {
    const inputValue = el.querySelector('textarea');

    const clear = f7Messagebar
      ? () => { f7Messagebar.clear(); }
      : () => {};
    dispatch('submit', [inputValue, clear]);
    dispatch('send', [inputValue, clear]);
    dispatch('click', [event]);
  }

  function onAttachmentDelete(instance, attachmentEl, attachmentElIndex) {
    dispatch('messagebar:attachmentdelete', [instance, attachmentEl, attachmentElIndex]);
  }

  function onAttachmentClick(instance, attachmentEl, attachmentElIndex) {
    dispatch('messagebar:attachmentclick', [instance, attachmentEl, attachmentElIndex]);
  }

  function onResizePage(instance) {
    dispatch('messagebar:resizepage', [instance]);
  }

  onMount(() => {
    if (!init || !el) return;
    if (el && f7.instance) {
      const $ = f7.instance.$;
      const $attachmentsEl = $(el).find('.toolbar-inner > .messagebar-attachments');
      if ($attachmentsEl.length) $(el).find('.messagebar-area').prepend($attachmentsEl);

      const $sheetEl = $(el).find('.toolbar-inner > .messagebar-sheet');
      if ($sheetEl.length) $(el).append($sheetEl);
    }
    f7.ready(() => {
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
      const $ = f7.instance.$;
      const $attachmentsEl = $(el).find('.toolbar-inner > .messagebar-attachments');
      if ($attachmentsEl.length) $(el).find('.messagebar-area').prepend($attachmentsEl);

      const $sheetEl = $(el).find('.toolbar-inner > .messagebar-sheet');
      if ($sheetEl.length) $(el).append($sheetEl);
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
        value={value}
        on:input={onInput}
        on:change={onChange}
        on:focus={onFocus}
        on:blur={onBlur}
      />
      <slot name="after-inner" />
    </div>
    {#if ((sendLink && sendLink.length > 0) || hasSendLinkSlots)}
      <Link on:click={onClick}>
        <slot name="send-link" />
        {sendLink}
      </Link>
    {/if}
    <slot name="inner-end" />
    <slot />
  </div>
  <slot name="after-inner" />
</div>
