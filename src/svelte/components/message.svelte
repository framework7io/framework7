<script>
  /* eslint-disable no-undef */
  import { createEventDispatcher } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames, plainText, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { hasSlots } from '../shared/has-slots';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let text = undefined;
  export let htmlText = undefined;
  export let name = undefined;
  export let avatar = undefined;
  export let type = 'sent';
  export let image = undefined;
  export let header = undefined;
  export let footer = undefined;
  export let textHeader = undefined;
  export let textFooter = undefined;
  export let first = undefined;
  export let last = undefined;
  export let tail = undefined;
  export let sameName = undefined;
  export let sameHeader = undefined;
  export let sameFooter = undefined;
  export let sameAvatar = undefined;
  export let typing = undefined;

  $: classes = classNames(
    className,
    'message',
    {
      'message-sent': type === 'sent' || !type,
      'message-received': type === 'received',
      'message-typing': typing,
      'message-first': first,
      'message-last': last,
      'message-tail': tail,
      'message-same-name': sameName,
      'message-same-header': sameHeader,
      'message-same-footer': sameFooter,
      'message-same-avatar': sameAvatar,
    },
    colorClasses($$props),
  );

  $: hasAvatarSlots = hasSlots(arguments, 'avatar');
  $: hasNameSlots = hasSlots(arguments, 'name');
  $: hasHeaderSlots = hasSlots(arguments, 'header');
  $: hasImageSlots = hasSlots(arguments, 'image');
  $: hasTextHeaderSlots = hasSlots(arguments, 'text-header');
  $: hasTextFooterSlots = hasSlots(arguments, 'text-footer');
  $: hasTextSlots = hasSlots(arguments, 'text');
  $: hasFooterSlots = hasSlots(arguments, 'footer');

  function onClick() {
    emit('click');
  }

  function onNameClick() {
    emit('clickName');
  }

  function onTextClick() {
    emit('clickText');
  }

  function onAvatarClick() {
    emit('clickAvatar');
  }

  function onHeaderClick() {
    emit('clickHeader');
  }

  function onFooterClick() {
    emit('clickFooter');
  }

  function onBubbleClick() {
    emit('clickBubble');
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class={classes} on:click={onClick} {...restProps($$restProps)}>
  <slot name="start"/>
  {#if (avatar || hasAvatarSlots)}
    <div
      on:click={onAvatarClick}
      class="message-avatar"
      style={ avatar ? `background-image: url(${avatar})` : undefined }
    >
      <slot name="avatar"/>
    </div>
  {/if}
  <div class="message-content">
    <slot name="content-start"/>
    {#if (hasNameSlots || name)}
      <div class="message-name" on:click={onNameClick}>
        {plainText(name)}
        <slot name="name"/>
      </div>
    {/if}
    {#if (hasHeaderSlots || header)}
      <div class="message-header" on:click={onHeaderClick}>
        {plainText(header)}
        <slot name="header"/>
      </div>
    {/if}
    <div class="message-bubble" on:click={onBubbleClick}>
      <slot name="bubble-start"/>
      {#if (hasImageSlots || image)}
        <div class="message-image">
          {#if image}
            <img src={image} />
          {/if}
          <slot name="image"/>
        </div>
      {/if}
      {#if (hasTextHeaderSlots || textHeader)}
        <div class="message-text-header">
          {plainText(textHeader)}
          <slot name="text-header"/>
        </div>
      {/if}
      {#if (hasTextSlots || text || htmlText || typing)}
        <div class="message-text" on:click={onTextClick}>
          {plainText(text)}
          {#if htmlText}{@html htmlText}{/if}
          <slot name="text"/>
          {#if typing}
            <div class="message-typing-indicator">
              <div />
              <div />
              <div />
            </div>
          {/if}
        </div>
      {/if}
      {#if (hasTextFooterSlots || textFooter)}
        <div class="message-text-footer">
          {plainText(textFooter)}
          <slot name="text-footer"/>
        </div>
      {/if}
      <slot name="bubble-end"/>
      <slot />
    </div>
    {#if (hasFooterSlots || footer)}
      <div class="message-footer" on:click={onFooterClick}>
        {plainText(footer)}
        <slot name="footer"/>
      </div>
    {/if}
    <slot name="content-end"/>
  </div>
  <slot name="end"/>
</div>
