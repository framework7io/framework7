<script>
  import { createEventDispatcher, onMount, afterUpdate } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import hasSlots from '../utils/has-slots';

  import Badge from './badge.svelte';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let title = undefined;
  export let text = undefined;
  export let media = undefined;
  export let subtitle = undefined;
  export let header = undefined;
  export let footer = undefined;
  export let after = undefined;
  export let badge = undefined;
  export let badgeColor = undefined;
  export let mediaList = false;
  export let mediaItem = false;

  export let checkbox = false;
  export let checked = false;
  // export let defaultChecked = false;
  export let indeterminate = false;
  export let radio = false;
  export let name = undefined;
  export let value = undefined;
  export let readonly = false;
  export let required = false;
  export let disabled = false;

  export let sortableOpposite = false;

  let el;
  let inputEl;
  let innerEl;

  $: classes = Utils.classNames(
    className,
    'item-content',
    {
      'item-checkbox': checkbox,
      'item-radio': radio,
    },
    Mixins.colorClasses($$props),
  );

  /* eslint-disable no-undef */
  $: hasMedia = media || hasSlots(arguments, 'media');
  $: hasTitle = title || hasSlots(arguments, 'title');
  $: hasHeader = header || hasSlots(arguments, 'header');
  $: hasFooter = footer || hasSlots(arguments, 'footer');
  $: hasSubtitle = subtitle || hasSlots(arguments, 'subtitle');
  $: hasText = text || hasSlots(arguments, 'text');
  $: hasAfter = after || badge || hasSlots(arguments, 'after');
  /* eslint-enable no-undef */

  $: isMedia = mediaList || mediaItem;

  function onClick(event) {
    dispatch('click', [event]);
  }

  function onChange(event) {
    dispatch('change', [event]);
  }

  onMount(() => {
    if (indeterminate && inputEl) {
      inputEl.indeterminate = true;
    }
  });

  afterUpdate(() => {
    if (inputEl) {
      inputEl.indeterminate = indeterminate;
    }
  });

</script>
<!-- svelte-ignore a11y-missing-attribute -->
{#if checkbox || radio}
  <label
    bind:this={el}
    id={id}
    style={style}
    class={classes}
    on:click={onClick}
  >
    <slot name="content-start" />
    {#if sortableOpposite}
      <div class="sortable-handler" />
    {/if}
    <input
      bind:this={inputEl}
      value={value || ''}
      name={name}
      checked={checked}
      readonly={readonly}
      disabled={disabled}
      required={required}
      type={radio ? 'radio' : 'checkbox'}
      on:change={onChange}
    />
    <i class={`icon icon-${radio ? 'radio' : 'checkbox'}`} />
    {#if hasMedia}
      <div class="item-media">
        {#if media}
          <img src={media} />
        {/if}
        <slot name="media" />
      </div>
    {/if}
    <div bind:this={innerEl} class="item-inner">
      <slot name="inner-start" />
      {#if isMedia}
        {#if hasHeader}
          <div class="item-header">
            {header}
            <slot name="header" />
          </div>
        {/if}
        <div class="item-title-row">
          <slot name="before-title" />
          {#if (hasTitle)}
            <div class="item-title">
              {title}
              <slot name="title" />
            </div>
          {/if}
          <slot name="after-title" />
          {#if hasAfter}
            <div class="item-after">
              <slot name="after-start" />
              <span>{after}</span>
              {#if badge}
                <Badge color={badgeColor}>{badge}</Badge>
              {/if}
              <slot name="after" />
              <slot name="after-end" />
            </div>
          {/if}
        </div>
        {#if hasSubtitle}
          <div class="item-subtitle">
            {subtitle}
            <slot name="subtitle" />
          </div>
        {/if}
        {#if hasText}
          <div class="item-text">
            {text}
            <slot name="text" />
          </div>
        {/if}
        <slot name="inner" />
        <slot/>
        {#if hasFooter}
          <div class="item-footer">
            {footer}
            <slot name="footer" />
          </div>
        {/if}
      {:else}
        <slot name="before-title" />
        {#if (hasTitle || hasHeader || hasFooter)}
          <div class="item-title">
            {#if hasHeader}
              <div class="item-header">
                {header}
                <slot name="header" />
              </div>
            {/if}
            {title}
            <slot name="title" />
            {#if hasFooter}
              <div class="item-footer">
                {footer}
                <slot name="footer" />
              </div>
            {/if}
          </div>
        {/if}
        <slot name="after-title" />
        {#if hasAfter}
          <div class="item-after">
            <slot name="after-start" />
            <span>{after}</span>
            {#if badge}
              <Badge color={badgeColor}>{badge}</Badge>
            {/if}
            <slot name="after" />
            <slot name="after-end" />
          </div>
        {/if}
        <slot name="inner" />
        <slot />
      {/if}
      <slot name="inner-end" />
    </div>
    <slot name="content" />
    <slot name="content-end" />
  </label>
{:else}
  <div
    bind:this={el}
    id={id}
    style={style}
    class={classes}
    on:click={onClick}
  >
    <slot name="content-start" />
    {#if sortableOpposite}
      <div class="sortable-handler" />
    {/if}
    {#if hasMedia}
      <div class="item-media">
        {#if media}
          <img src={media} />
        {/if}
        <slot name="media" />
      </div>
    {/if}
    <div bind:this={innerEl} class="item-inner">
      <slot name="inner-start" />
      {#if isMedia}
        {#if hasHeader}
          <div class="item-header">
            {header}
            <slot name="header" />
          </div>
        {/if}
        <div class="item-title-row">
          <slot name="before-title" />
          {#if (hasTitle)}
            <div class="item-title">
              {title}
              <slot name="title" />
            </div>
          {/if}
          <slot name="after-title" />
          {#if hasAfter}
            <div class="item-after">
              <slot name="after-start" />
              <span>{after}</span>
              {#if badge}
                <Badge color={badgeColor}>{badge}</Badge>
              {/if}
              <slot name="after" />
              <slot name="after-end" />
            </div>
          {/if}
        </div>
        {#if hasSubtitle}
          <div class="item-subtitle">
            {subtitle}
            <slot name="subtitle" />
          </div>
        {/if}
        {#if hasText}
          <div class="item-text">
            {text}
            <slot name="text" />
          </div>
        {/if}
        <slot name="inner" />
        <slot/>
        {#if hasFooter}
          <div class="item-footer">
            {footer}
            <slot name="footer" />
          </div>
        {/if}
      {:else}
        <slot name="before-title" />
        {#if (hasTitle || hasHeader || hasFooter)}
          <div class="item-title">
            {#if hasHeader}
              <div class="item-header">
                {header}
                <slot name="header" />
              </div>
            {/if}
            {title}
            <slot name="title" />
            {#if hasFooter}
              <div class="item-footer">
                {footer}
                <slot name="footer" />
              </div>
            {/if}
          </div>
        {/if}
        <slot name="after-title" />
        {#if hasAfter}
          <div class="item-after">
            <slot name="after-start" />
            <span>{after}</span>
            {#if badge}
              <Badge color={badgeColor}>{badge}</Badge>
            {/if}
            <slot name="after" />
            <slot name="after-end" />
          </div>
        {/if}
        <slot name="inner" />
        <slot />
      {/if}
      <slot name="inner-end" />
    </div>
    <slot name="content" />
    <slot name="content-end" />
  </div>
{/if}
