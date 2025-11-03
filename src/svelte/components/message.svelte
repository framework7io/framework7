<script>
  /* eslint-disable no-undef */
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, plainText } from '../shared/utils.js';

  let {
    class: className,
    text = undefined,
    htmlText = undefined,
    name = undefined,
    avatar = undefined,
    type = 'sent',
    image = undefined,
    header = undefined,
    footer = undefined,
    textHeader = undefined,
    textFooter = undefined,
    first = undefined,
    last = undefined,
    tail = undefined,
    sameName = undefined,
    sameHeader = undefined,
    sameFooter = undefined,
    sameAvatar = undefined,
    typing = undefined,
    start = undefined,
    contentStart = undefined,
    contentEnd = undefined,
    end = undefined,
    bubbleStart = undefined,
    bubbleEnd = undefined,
    children,
    ...restProps
  } = $props();

  const classes = $derived(
    classNames(
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
      colorClasses(restProps),
    ),
  );

  const hasAvatarSlots = $derived(avatar);
  const hasNameSlots = $derived(name);
  const hasHeaderSlots = $derived(header);
  const hasImageSlots = $derived(image);
  const hasTextHeaderSlots = $derived(textHeader);
  const hasTextFooterSlots = $derived(textFooter);
  const hasTextSlots = $derived(text);
  const hasFooterSlots = $derived(footer);

  function onClick() {
    restProps.onclick?.();
  }

  function onNameClick() {
    restProps.onclickname?.();
    restProps.onClickName?.();
  }

  function onTextClick() {
    restProps.onclicktext?.();
    restProps.onClickText?.();
  }

  function onAvatarClick() {
    restProps.onclickavatar?.();
    restProps.onClickAvatar?.();
  }

  function onHeaderClick() {
    restProps.onclickheader?.();
    restProps.onClickHeader?.();
  }

  function onFooterClick() {
    restProps.onclickfooter?.();
    restProps.onClickFooter?.();
  }

  function onBubbleClick() {
    restProps.onclickbubble?.();
    restProps.onClickBubble?.();
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class={classes} onclick={onClick} {...restProps}>
  {@render start?.()}
  {#if avatar || hasAvatarSlots}
    <div
      onclick={onAvatarClick}
      class="message-avatar"
      style={avatar && typeof avatar === 'string' ? `background-image: url(${avatar})` : undefined}
    >
      {#if typeof avatar === 'function'}
        {@render avatar?.()}
      {/if}
    </div>
  {/if}
  <div class="message-content">
    {@render contentStart?.()}
    {#if hasNameSlots || name}
      <div class="message-name" onclick={onNameClick}>
        {#if typeof name === 'function'}
          {@render name?.()}
        {:else}
          {name}
        {/if}
      </div>
    {/if}
    {#if hasHeaderSlots || header}
      <div class="message-header" onclick={onHeaderClick}>
        {#if typeof header === 'function'}
          {@render header?.()}
        {:else}
          {header}
        {/if}
      </div>
    {/if}
    <div class="message-bubble" onclick={onBubbleClick}>
      {@render bubbleStart?.()}
      {#if hasImageSlots || image}
        <div class="message-image">
          {#if typeof image === 'function'}
            {@render image?.()}
          {:else if typeof image === 'string' && image}
            <img src={image} />
          {/if}
        </div>
      {/if}
      {#if hasTextHeaderSlots || textHeader}
        <div class="message-text-header">
          {#if typeof textHeader === 'function'}
            {@render textHeader?.()}
          {:else}
            {textHeader}
          {/if}
        </div>
      {/if}
      {#if hasTextSlots || text || htmlText || typing}
        <div class="message-text" onclick={onTextClick}>
          {#if typeof text === 'function'}
            {@render text?.()}
          {:else}
            {text}
          {/if}
          {#if htmlText}{@html htmlText}{/if}

          {#if typing}
            <div class="message-typing-indicator">
              <div />
              <div />
              <div />
            </div>
          {/if}
        </div>
      {/if}
      {#if hasTextFooterSlots || textFooter}
        <div class="message-text-footer">
          {#if typeof textFooter === 'function'}
            {@render textFooter?.()}
          {:else}
            {textFooter}
          {/if}
        </div>
      {/if}
      {@render bubbleEnd?.()}
      {@render children?.()}
    </div>
    {#if hasFooterSlots || footer}
      <div class="message-footer" onclick={onFooterClick}>
        {#if typeof footer === 'function'}
          {@render footer?.()}
        {:else}
          {footer}
        {/if}
      </div>
    {/if}
    {@render contentEnd?.()}
  </div>
  {@render end?.()}
</div>
