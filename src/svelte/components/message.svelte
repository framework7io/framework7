<script>
  /* eslint-disable no-undef */
  import { createEventDispatcher } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import hasSlots from '../utils/has-slots';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

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

  $: classes = Utils.classNames(
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
    Mixins.colorClasses($$props),
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
    dispatch('click');
    if (typeof $$props.onClick === 'function') $$props.onClick();
  }

  function onNameClick() {
    dispatch('clickName');
    if (typeof $$props.onClickName === 'function') $$props.onClickName();
  }

  function onTextClick() {
    dispatch('clickText');
    if (typeof $$props.onClickText === 'function') $$props.onClickText();
  }

  function onAvatarClick() {
    dispatch('clickAvatar');
    if (typeof $$props.onClickAvatar === 'function') $$props.onClickAvatar();
  }

  function onHeaderClick() {
    dispatch('clickHeader');
    if (typeof $$props.onClickHeader === 'function') $$props.onClickHeader();
  }

  function onFooterClick() {
    dispatch('clickFooter');
    if (typeof $$props.onClickFooter === 'function') $$props.onClickFooter();
  }

  function onBubbleClick() {
    dispatch('clickBubble');
    if (typeof $$props.onClickBubble === 'function') $$props.onClickBubble();
  }

</script>
<!-- svelte-ignore a11y-missing-attribute -->
<div id={id} style={style} class={classes} on:click={onClick}>
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
        {Utils.text(name)}
        <slot name="name"/>
      </div>
    {/if}
    {#if (hasHeaderSlots || header)}
      <div class="message-header" on:click={onHeaderClick}>
        {Utils.text(header)}
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
          {Utils.text(textHeader)}
          <slot name="text-header"/>
        </div>
      {/if}
      {#if (hasTextSlots || text || htmlText || typing)}
        <div class="message-text" on:click={onTextClick}>
          {Utils.text(text)}
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
          {Utils.text(textFooter)}
          <slot name="text-footer"/>
        </div>
      {/if}
      <slot name="bubble-end"/>
      <slot />
    </div>
    {#if (hasFooterSlots || footer)}
      <div class="message-footer" on:click={onFooterClick}>
        {Utils.text(footer)}
        <slot name="footer"/>
      </div>
    {/if}
    <slot name="content-end"/>
  </div>
  <slot name="end"/>
</div>
