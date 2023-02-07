<script>
  import { createEventDispatcher, onMount, onDestroy, afterUpdate } from 'svelte';
  import {
    colorClasses,
    routerClasses,
    routerAttrs,
    actionsClasses,
    actionsAttrs,
  } from '../shared/mixins.js';
  import { classNames, plainText, isStringProp, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { app, f7ready } from '../shared/f7.js';
  import { useTooltip } from '../shared/use-tooltip.js';
  import { useSmartSelect } from '../shared/use-smart-select.js';
  import { useRouteProps } from '../shared/use-route-props.js';
  import { getReactiveContext } from '../shared/get-reactive-context.js';

  import Badge from './badge.svelte';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let title = undefined;
  export let text = undefined;
  export let media = undefined;
  export let subtitle = undefined;
  export let header = undefined;
  export let footer = undefined;

  // Tooltip
  export let tooltip = undefined;
  export let tooltipTrigger = undefined;

  // Link Props
  export let link = undefined;
  export let tabLink = undefined;
  export let tabLinkActive = false;
  export let selected = false;
  export let href = undefined;
  export let target = undefined;

  export let after = undefined;
  export let badge = undefined;
  export let badgeColor = undefined;

  export let mediaItem = false;
  export let mediaList = false;
  export let groupTitle = false;
  export let swipeout = false;
  export let swipeoutOpened = false;
  export let sortable = undefined;
  export let sortableOpposite = undefined;
  export let accordionItem = false;
  export let accordionItemOpened = false;

  // Smart Select
  export let smartSelect = false;
  export let smartSelectParams = undefined;

  // Links Chevron (Arrow) Icon
  export let noChevron = undefined;
  export let chevronCenter = undefined;

  // Inputs
  export let checkbox = undefined;
  export let checkboxIcon = undefined;
  export let radio = undefined;
  export let radioIcon = undefined;
  export let checked = undefined;
  export let indeterminate = undefined;
  export let name = undefined;
  export let value = undefined;
  export let readonly = undefined;
  export let required = undefined;
  export let disabled = undefined;
  export let virtualListIndex = undefined;

  export let routeProps = undefined;

  let el;
  let linkEl;
  let innerEl;
  let inputEl;

  let f7SmartSelect;

  export function smartSelectInstance() {
    return f7SmartSelect;
  }

  let ListContext =
    getReactiveContext('ListContext', (value) => {
      ListContext = value || {};
    }) || {};

  $: isMedia = mediaList || mediaItem || ListContext.listIsMedia;
  $: isSortable = sortable === true || sortable === false ? sortable : ListContext.listIsSortable;
  $: isSortableOpposite = sortableOpposite || ListContext.listIsSortableOpposite;
  $: isSimple = ListContext.listIsSimple;

  $: liClasses = classNames(
    className,
    {
      'list-group-title': groupTitle,
      'media-item': isMedia,
      swipeout,
      'accordion-item': accordionItem,
      'accordion-item-opened': accordionItemOpened,
      disabled: disabled && !(radio || checkbox),
      'no-chevron': noChevron,
      'chevron-center': chevronCenter,
      'disallow-sorting': sortable === false,
    },
    colorClasses($$props),
  );

  $: contentClasses = classNames(
    className,
    'item-content',
    {
      'item-checkbox': checkbox,
      'item-radio': radio,
      'item-checkbox-icon-start': checkbox && checkboxIcon === 'start',
      'item-checkbox-icon-end': checkbox && checkboxIcon === 'end',
      'item-radio-icon-start': radio && radioIcon === 'start',
      'item-radio-icon-end': radio && radioIcon === 'end',
    },
    colorClasses($$props),
  );

  $: linkClasses = classNames(
    {
      'item-link': true,
      'smart-select': smartSelect,
      'tab-link': tabLink || tabLink === '',
      'tab-link-active': tabLinkActive,
      'item-selected': selected,
    },
    routerClasses($$props),
    actionsClasses($$props),
  );

  $: linkAttrs = {
    href: link === true ? '' : link || href,
    target,
    'data-tab': (isStringProp(tabLink) && tabLink) || undefined,
    ...routerAttrs($$props),
    ...actionsAttrs($$props),
  };

  $: isLink = link || href || smartSelect || accordionItem;

  /* eslint-disable no-undef */
  $: hasMedia = typeof media !== 'undefined' || $$slots.media;
  $: hasTitle = typeof title !== 'undefined' || $$slots.title;
  $: hasHeader = typeof header !== 'undefined' || $$slots.header;
  $: hasFooter = typeof footer !== 'undefined' || $$slots.footer;
  $: hasSubtitle = typeof subtitle !== 'undefined' || $$slots.subtitle;
  $: hasText = typeof text !== 'undefined' || $$slots.text;
  $: hasAfter = typeof after !== 'undefined' || typeof badge !== 'undefined' || $$slots.after;
  /* eslint-enable no-undef */

  let initialWatchedOpened = false;
  function watchSwipeoutOpened(opened) {
    if (!initialWatchedOpened) {
      initialWatchedOpened = true;
      return;
    }
    if (!swipeout) return;
    if (opened) {
      app.f7.swipeout.open(el);
    } else {
      app.f7.swipeout.close(el);
    }
  }
  $: watchSwipeoutOpened(swipeoutOpened);

  function onClick(event) {
    if (event.target.tagName.toLowerCase() !== 'input') {
      emit('click', event);
    }
  }
  function onSwipeoutOverswipeEnter(eventEl) {
    if (eventEl !== el) return;
    emit('swipeoutOverswipeEnter');
  }
  function onSwipeoutOverswipeExit(eventEl) {
    if (eventEl !== el) return;
    emit('swipeoutOverswipeExit');
  }
  function onSwipeoutDeleted(eventEl) {
    if (eventEl !== el) return;
    emit('swipeoutDeleted');
  }
  function onSwipeoutDelete(eventEl) {
    if (eventEl !== el) return;
    emit('swipeoutDelete');
  }
  function onSwipeoutClose(eventEl) {
    if (eventEl !== el) return;
    emit('swipeoutClose');
  }
  function onSwipeoutClosed(eventEl) {
    if (eventEl !== el) return;
    emit('swipeoutClosed');
  }
  function onSwipeoutOpen(eventEl) {
    if (eventEl !== el) return;
    emit('swipeoutOpen');
  }
  function onSwipeoutOpened(eventEl) {
    if (eventEl !== el) return;
    emit('swipeoutOpened');
  }
  function onSwipeout(eventEl, progress) {
    if (eventEl !== el) return;
    emit('swipeout', progress);
  }
  function onAccBeforeClose(eventEl, prevent) {
    if (eventEl !== el) return;
    emit('accordionBeforeClose', [prevent]);
  }
  function onAccClose(eventEl) {
    if (eventEl !== el) return;
    emit('accordionClose');
  }
  function onAccClosed(eventEl) {
    if (eventEl !== el) return;
    emit('accordionClosed');
  }
  function onAccBeforeOpen(eventEl, prevent) {
    if (eventEl !== el) return;
    emit('accordionBeforeOpen', [prevent]);
  }
  function onAccOpen(eventEl) {
    if (eventEl !== el) return;
    emit('accordionOpen');
  }
  function onAccOpened(eventEl) {
    if (eventEl !== el) return;
    emit('accordionOpened');
  }
  function onChange(event) {
    emit('change', [event]);
    checked = event.target.checked;
  }

  useSmartSelect(
    { smartSelect, smartSelectParams },
    (instance) => {
      f7SmartSelect = instance;
    },
    () => linkEl,
  );

  onMount(() => {
    if (indeterminate && inputEl) {
      inputEl.indeterminate = true;
    }
    f7ready(() => {
      if (swipeout) {
        app.f7.on('swipeoutOpen', onSwipeoutOpen);
        app.f7.on('swipeoutOpened', onSwipeoutOpened);
        app.f7.on('swipeoutClose', onSwipeoutClose);
        app.f7.on('swipeoutClosed', onSwipeoutClosed);
        app.f7.on('swipeoutDelete', onSwipeoutDelete);
        app.f7.on('swipeoutDeleted', onSwipeoutDeleted);
        app.f7.on('swipeoutOverswipeEnter', onSwipeoutOverswipeEnter);
        app.f7.on('swipeoutOverswipeExit', onSwipeoutOverswipeExit);
        app.f7.on('swipeout', onSwipeout);
      }
      if (accordionItem) {
        app.f7.on('accordionBeforeOpen', onAccBeforeOpen);
        app.f7.on('accordionOpen', onAccOpen);
        app.f7.on('accordionOpened', onAccOpened);
        app.f7.on('accordionBeforeClose', onAccBeforeClose);
        app.f7.on('accordionClose', onAccClose);
        app.f7.on('accordionClosed', onAccClosed);
      }
      if (swipeoutOpened) {
        app.f7.swipeout.open(el);
      }
    });
  });

  afterUpdate(() => {
    if (inputEl) {
      inputEl.indeterminate = indeterminate;
    }
  });

  onDestroy(() => {
    if (!app.f7) return;
    if (swipeout) {
      app.f7.off('swipeoutOpen', onSwipeoutOpen);
      app.f7.off('swipeoutOpened', onSwipeoutOpened);
      app.f7.off('swipeoutClose', onSwipeoutClose);
      app.f7.off('swipeoutClosed', onSwipeoutClosed);
      app.f7.off('swipeoutDelete', onSwipeoutDelete);
      app.f7.off('swipeoutDeleted', onSwipeoutDeleted);
      app.f7.off('swipeoutOverswipeEnter', onSwipeoutOverswipeEnter);
      app.f7.off('swipeoutOverswipeExit', onSwipeoutOverswipeExit);
      app.f7.off('swipeout', onSwipeout);
    }
    if (accordionItem) {
      app.f7.off('accordionBeforeOpen', onAccBeforeOpen);
      app.f7.off('accordionOpen', onAccOpen);
      app.f7.off('accordionOpened', onAccOpened);
      app.f7.off('accordionBeforeClose', onAccBeforeClose);
      app.f7.off('accordionClose', onAccClose);
      app.f7.off('accordionClosed', onAccClosed);
    }
  });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
{#if groupTitle}
  <li
    on:click={onClick}
    bind:this={el}
    use:useTooltip={{ tooltip, tooltipTrigger }}
    class={liClasses}
    data-virtual-list-index={virtualListIndex}
    {...restProps($$restProps)}
  >
    <span><slot>{plainText(title)}</slot></span>
  </li>
{:else if isSimple}
  <li
    on:click={onClick}
    bind:this={el}
    use:useTooltip={{ tooltip, tooltipTrigger }}
    class={liClasses}
    data-virtual-list-index={virtualListIndex}
    {...restProps($$restProps)}
  >
    {plainText(title)}
    <slot />
  </li>
{:else}
  <li
    bind:this={el}
    use:useTooltip={{ tooltip, tooltipTrigger }}
    class={liClasses}
    data-virtual-list-index={virtualListIndex}
    {...restProps($$restProps)}
  >
    <slot name="root-start" />
    {#if swipeout}
      <div class="swipeout-content">
        {#if isLink}
          <a
            bind:this={linkEl}
            use:useRouteProps={routeProps}
            class={linkClasses}
            {...linkAttrs}
            on:click={onClick}
          >
            <!-- Item content start -->
            <div class={contentClasses}>
              <slot name="content-start" />
              {#if isSortable && sortable !== false && isSortableOpposite}
                <div class="sortable-handler" />
              {/if}
              {#if hasMedia}
                <div class="item-media">
                  {#if typeof media !== 'undefined'}
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
                      {plainText(header)}
                      <slot name="header" />
                    </div>
                  {/if}
                  <div class="item-title-row">
                    <slot name="before-title" />
                    {#if hasTitle}
                      <div class="item-title">
                        {plainText(title)}
                        <slot name="title" />
                      </div>
                    {/if}
                    <slot name="after-title" />
                    {#if hasAfter}
                      <div class="item-after">
                        <slot name="after-start" />
                        {#if typeof after !== 'undefined'}
                          <span>{plainText(after)}</span>
                        {/if}
                        {#if typeof badge !== 'undefined'}
                          <Badge color={badgeColor}>{plainText(badge)}</Badge>
                        {/if}
                        <slot name="after" />
                        <slot name="after-end" />
                      </div>
                    {/if}
                  </div>
                  {#if hasSubtitle}
                    <div class="item-subtitle">
                      {plainText(subtitle)}
                      <slot name="subtitle" />
                    </div>
                  {/if}
                  {#if hasText}
                    <div class="item-text">
                      {plainText(text)}
                      <slot name="text" />
                    </div>
                  {/if}
                  <slot name="inner" />
                  {#if !(swipeout || accordionItem)}
                    <slot />
                  {/if}
                  {#if hasFooter}
                    <div class="item-footer">
                      {plainText(footer)}
                      <slot name="footer" />
                    </div>
                  {/if}
                {:else}
                  <slot name="before-title" />
                  {#if hasTitle || hasHeader || hasFooter}
                    <div class="item-title">
                      {#if hasHeader}
                        <div class="item-header">
                          {plainText(header)}
                          <slot name="header" />
                        </div>
                      {/if}
                      {plainText(title)}
                      <slot name="title" />
                      {#if hasFooter}
                        <div class="item-footer">
                          {plainText(footer)}
                          <slot name="footer" />
                        </div>
                      {/if}
                    </div>
                  {/if}
                  <slot name="after-title" />
                  {#if hasAfter}
                    <div class="item-after">
                      <slot name="after-start" />
                      {#if typeof after !== 'undefined'}
                        <span>{plainText(after)}</span>
                      {/if}
                      {#if typeof badge !== 'undefined'}
                        <Badge color={badgeColor}>{plainText(badge)}</Badge>
                      {/if}
                      <slot name="after" />
                      <slot name="after-end" />
                    </div>
                  {/if}
                  <slot name="inner" />
                  {#if !(swipeout || accordionItem)}
                    <slot />
                  {/if}
                {/if}
                <slot name="inner-end" />
              </div>
              <slot name="content" />
              <slot name="content-end" />
            </div>
            <!-- Item content end -->
          </a>
        {:else}
          <!-- Item content start -->
          {#if checkbox || radio}
            <label class={contentClasses} on:click={onClick}>
              <slot name="content-start" />
              {#if isSortable && sortable !== false && isSortableOpposite}
                <div class="sortable-handler" />
              {/if}
              <input
                bind:this={inputEl}
                value={typeof value === 'undefined' ? '' : value}
                {name}
                {checked}
                {readonly}
                {disabled}
                {required}
                type={radio ? 'radio' : 'checkbox'}
                on:change={onChange}
              />
              <i class={`icon icon-${radio ? 'radio' : 'checkbox'}`} />
              {#if hasMedia}
                <div class="item-media">
                  {#if typeof media !== 'undefined'}
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
                      {plainText(header)}
                      <slot name="header" />
                    </div>
                  {/if}
                  <div class="item-title-row">
                    <slot name="before-title" />
                    {#if hasTitle}
                      <div class="item-title">
                        {plainText(title)}
                        <slot name="title" />
                      </div>
                    {/if}
                    <slot name="after-title" />
                    {#if hasAfter}
                      <div class="item-after">
                        <slot name="after-start" />
                        {#if typeof after !== 'undefined'}
                          <span>{plainText(after)}</span>
                        {/if}
                        {#if typeof badge !== 'undefined'}
                          <Badge color={badgeColor}>{plainText(badge)}</Badge>
                        {/if}
                        <slot name="after" />
                        <slot name="after-end" />
                      </div>
                    {/if}
                  </div>
                  {#if hasSubtitle}
                    <div class="item-subtitle">
                      {plainText(subtitle)}
                      <slot name="subtitle" />
                    </div>
                  {/if}
                  {#if hasText}
                    <div class="item-text">
                      {plainText(text)}
                      <slot name="text" />
                    </div>
                  {/if}
                  <slot name="inner" />
                  {#if !(swipeout || accordionItem)}
                    <slot />
                  {/if}
                  {#if hasFooter}
                    <div class="item-footer">
                      {plainText(footer)}
                      <slot name="footer" />
                    </div>
                  {/if}
                {:else}
                  <slot name="before-title" />
                  {#if hasTitle || hasHeader || hasFooter}
                    <div class="item-title">
                      {#if hasHeader}
                        <div class="item-header">
                          {plainText(header)}
                          <slot name="header" />
                        </div>
                      {/if}
                      {plainText(title)}
                      <slot name="title" />
                      {#if hasFooter}
                        <div class="item-footer">
                          {plainText(footer)}
                          <slot name="footer" />
                        </div>
                      {/if}
                    </div>
                  {/if}
                  <slot name="after-title" />
                  {#if hasAfter}
                    <div class="item-after">
                      <slot name="after-start" />
                      {#if typeof after !== 'undefined'}
                        <span>{plainText(after)}</span>
                      {/if}
                      {#if typeof badge !== 'undefined'}
                        <Badge color={badgeColor}>{plainText(badge)}</Badge>
                      {/if}
                      <slot name="after" />
                      <slot name="after-end" />
                    </div>
                  {/if}
                  <slot name="inner" />
                  {#if !(swipeout || accordionItem)}
                    <slot />
                  {/if}
                {/if}
                <slot name="inner-end" />
              </div>
              <slot name="content" />
              <slot name="content-end" />
            </label>
          {:else}
            <div class={contentClasses} on:click={onClick}>
              <slot name="content-start" />
              {#if isSortable && sortable !== false && isSortableOpposite}
                <div class="sortable-handler" />
              {/if}
              {#if hasMedia}
                <div class="item-media">
                  {#if typeof media !== 'undefined'}
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
                      {plainText(header)}
                      <slot name="header" />
                    </div>
                  {/if}
                  <div class="item-title-row">
                    <slot name="before-title" />
                    {#if hasTitle}
                      <div class="item-title">
                        {plainText(title)}
                        <slot name="title" />
                      </div>
                    {/if}
                    <slot name="after-title" />
                    {#if hasAfter}
                      <div class="item-after">
                        <slot name="after-start" />
                        {#if typeof after !== 'undefined'}
                          <span>{plainText(after)}</span>
                        {/if}
                        {#if typeof badge !== 'undefined'}
                          <Badge color={badgeColor}>{plainText(badge)}</Badge>
                        {/if}
                        <slot name="after" />
                        <slot name="after-end" />
                      </div>
                    {/if}
                  </div>
                  {#if hasSubtitle}
                    <div class="item-subtitle">
                      {plainText(subtitle)}
                      <slot name="subtitle" />
                    </div>
                  {/if}
                  {#if hasText}
                    <div class="item-text">
                      {plainText(text)}
                      <slot name="text" />
                    </div>
                  {/if}
                  <slot name="inner" />
                  {#if !(swipeout || accordionItem)}
                    <slot />
                  {/if}
                  {#if hasFooter}
                    <div class="item-footer">
                      {plainText(footer)}
                      <slot name="footer" />
                    </div>
                  {/if}
                {:else}
                  <slot name="before-title" />
                  {#if hasTitle || hasHeader || hasFooter}
                    <div class="item-title">
                      {#if hasHeader}
                        <div class="item-header">
                          {plainText(header)}
                          <slot name="header" />
                        </div>
                      {/if}
                      {plainText(title)}
                      <slot name="title" />
                      {#if hasFooter}
                        <div class="item-footer">
                          {plainText(footer)}
                          <slot name="footer" />
                        </div>
                      {/if}
                    </div>
                  {/if}
                  <slot name="after-title" />
                  {#if hasAfter}
                    <div class="item-after">
                      <slot name="after-start" />
                      {#if typeof after !== 'undefined'}
                        <span>{plainText(after)}</span>
                      {/if}
                      {#if typeof badge !== 'undefined'}
                        <Badge color={badgeColor}>{plainText(badge)}</Badge>
                      {/if}
                      <slot name="after" />
                      <slot name="after-end" />
                    </div>
                  {/if}
                  <slot name="inner" />
                  {#if !(swipeout || accordionItem)}
                    <slot />
                  {/if}
                {/if}
                <slot name="inner-end" />
              </div>
              <slot name="content" />
              <slot name="content-end" />
            </div>
          {/if}
          <!-- Item content end -->
        {/if}
      </div>
    {:else if isLink}
      <a
        bind:this={linkEl}
        use:useRouteProps={routeProps}
        class={linkClasses}
        {...linkAttrs}
        on:click={onClick}
      >
        <!-- Item content start -->
        <div class={contentClasses}>
          <slot name="content-start" />
          {#if isSortable && sortable !== false && isSortableOpposite}
            <div class="sortable-handler" />
          {/if}
          {#if hasMedia}
            <div class="item-media">
              {#if typeof media !== 'undefined'}
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
                  {plainText(header)}
                  <slot name="header" />
                </div>
              {/if}
              <div class="item-title-row">
                <slot name="before-title" />
                {#if hasTitle}
                  <div class="item-title">
                    {plainText(title)}
                    <slot name="title" />
                  </div>
                {/if}
                <slot name="after-title" />
                {#if hasAfter}
                  <div class="item-after">
                    <slot name="after-start" />
                    {#if typeof after !== 'undefined'}
                      <span>{plainText(after)}</span>
                    {/if}
                    {#if typeof badge !== 'undefined'}
                      <Badge color={badgeColor}>{plainText(badge)}</Badge>
                    {/if}
                    <slot name="after" />
                    <slot name="after-end" />
                  </div>
                {/if}
              </div>
              {#if hasSubtitle}
                <div class="item-subtitle">
                  {plainText(subtitle)}
                  <slot name="subtitle" />
                </div>
              {/if}
              {#if hasText}
                <div class="item-text">
                  {plainText(text)}
                  <slot name="text" />
                </div>
              {/if}
              <slot name="inner" />
              {#if !(swipeout || accordionItem)}
                <slot />
              {/if}
              {#if hasFooter}
                <div class="item-footer">
                  {plainText(footer)}
                  <slot name="footer" />
                </div>
              {/if}
            {:else}
              <slot name="before-title" />
              {#if hasTitle || hasHeader || hasFooter}
                <div class="item-title">
                  {#if hasHeader}
                    <div class="item-header">
                      {plainText(header)}
                      <slot name="header" />
                    </div>
                  {/if}
                  {plainText(title)}
                  <slot name="title" />
                  {#if hasFooter}
                    <div class="item-footer">
                      {plainText(footer)}
                      <slot name="footer" />
                    </div>
                  {/if}
                </div>
              {/if}
              <slot name="after-title" />
              {#if hasAfter}
                <div class="item-after">
                  <slot name="after-start" />
                  {#if typeof after !== 'undefined'}
                    <span>{plainText(after)}</span>
                  {/if}
                  {#if typeof badge !== 'undefined'}
                    <Badge color={badgeColor}>{plainText(badge)}</Badge>
                  {/if}
                  <slot name="after" />
                  <slot name="after-end" />
                </div>
              {/if}
              <slot name="inner" />
              {#if !(swipeout || accordionItem)}
                <slot />
              {/if}
            {/if}
            <slot name="inner-end" />
          </div>
          <slot name="content" />
          <slot name="content-end" />
        </div>
        <!-- Item content end -->
      </a>
    {:else}
      <!-- Item content start -->
      {#if checkbox || radio}
        <label class={contentClasses} on:click={onClick}>
          <slot name="content-start" />
          {#if isSortable && sortable !== false && isSortableOpposite}
            <div class="sortable-handler" />
          {/if}
          <input
            bind:this={inputEl}
            value={typeof value === 'undefined' ? '' : value}
            {name}
            {checked}
            {readonly}
            {disabled}
            {required}
            type={radio ? 'radio' : 'checkbox'}
            on:change={onChange}
          />
          <i class={`icon icon-${radio ? 'radio' : 'checkbox'}`} />
          {#if hasMedia}
            <div class="item-media">
              {#if typeof media !== 'undefined'}
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
                  {plainText(header)}
                  <slot name="header" />
                </div>
              {/if}
              <div class="item-title-row">
                <slot name="before-title" />
                {#if hasTitle}
                  <div class="item-title">
                    {plainText(title)}
                    <slot name="title" />
                  </div>
                {/if}
                <slot name="after-title" />
                {#if hasAfter}
                  <div class="item-after">
                    <slot name="after-start" />
                    {#if typeof after !== 'undefined'}
                      <span>{plainText(after)}</span>
                    {/if}
                    {#if typeof badge !== 'undefined'}
                      <Badge color={badgeColor}>{plainText(badge)}</Badge>
                    {/if}
                    <slot name="after" />
                    <slot name="after-end" />
                  </div>
                {/if}
              </div>
              {#if hasSubtitle}
                <div class="item-subtitle">
                  {plainText(subtitle)}
                  <slot name="subtitle" />
                </div>
              {/if}
              {#if hasText}
                <div class="item-text">
                  {plainText(text)}
                  <slot name="text" />
                </div>
              {/if}
              <slot name="inner" />
              {#if !(swipeout || accordionItem)}
                <slot />
              {/if}
              {#if hasFooter}
                <div class="item-footer">
                  {plainText(footer)}
                  <slot name="footer" />
                </div>
              {/if}
            {:else}
              <slot name="before-title" />
              {#if hasTitle || hasHeader || hasFooter}
                <div class="item-title">
                  {#if hasHeader}
                    <div class="item-header">
                      {plainText(header)}
                      <slot name="header" />
                    </div>
                  {/if}
                  {plainText(title)}
                  <slot name="title" />
                  {#if hasFooter}
                    <div class="item-footer">
                      {plainText(footer)}
                      <slot name="footer" />
                    </div>
                  {/if}
                </div>
              {/if}
              <slot name="after-title" />
              {#if hasAfter}
                <div class="item-after">
                  <slot name="after-start" />
                  {#if typeof after !== 'undefined'}
                    <span>{plainText(after)}</span>
                  {/if}
                  {#if typeof badge !== 'undefined'}
                    <Badge color={badgeColor}>{plainText(badge)}</Badge>
                  {/if}
                  <slot name="after" />
                  <slot name="after-end" />
                </div>
              {/if}
              <slot name="inner" />
              {#if !(swipeout || accordionItem)}
                <slot />
              {/if}
            {/if}
            <slot name="inner-end" />
          </div>
          <slot name="content" />
          <slot name="content-end" />
        </label>
      {:else}
        <div class={contentClasses} on:click={onClick}>
          <slot name="content-start" />
          {#if isSortable && sortable !== false && isSortableOpposite}
            <div class="sortable-handler" />
          {/if}
          {#if hasMedia}
            <div class="item-media">
              {#if typeof media !== 'undefined'}
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
                  {plainText(header)}
                  <slot name="header" />
                </div>
              {/if}
              <div class="item-title-row">
                <slot name="before-title" />
                {#if hasTitle}
                  <div class="item-title">
                    {plainText(title)}
                    <slot name="title" />
                  </div>
                {/if}
                <slot name="after-title" />
                {#if hasAfter}
                  <div class="item-after">
                    <slot name="after-start" />
                    {#if typeof after !== 'undefined'}
                      <span>{plainText(after)}</span>
                    {/if}
                    {#if typeof badge !== 'undefined'}
                      <Badge color={badgeColor}>{plainText(badge)}</Badge>
                    {/if}
                    <slot name="after" />
                    <slot name="after-end" />
                  </div>
                {/if}
              </div>
              {#if hasSubtitle}
                <div class="item-subtitle">
                  {plainText(subtitle)}
                  <slot name="subtitle" />
                </div>
              {/if}
              {#if hasText}
                <div class="item-text">
                  {plainText(text)}
                  <slot name="text" />
                </div>
              {/if}
              <slot name="inner" />
              {#if !(swipeout || accordionItem)}
                <slot />
              {/if}
              {#if hasFooter}
                <div class="item-footer">
                  {plainText(footer)}
                  <slot name="footer" />
                </div>
              {/if}
            {:else}
              <slot name="before-title" />
              {#if hasTitle || hasHeader || hasFooter}
                <div class="item-title">
                  {#if hasHeader}
                    <div class="item-header">
                      {plainText(header)}
                      <slot name="header" />
                    </div>
                  {/if}
                  {plainText(title)}
                  <slot name="title" />
                  {#if hasFooter}
                    <div class="item-footer">
                      {plainText(footer)}
                      <slot name="footer" />
                    </div>
                  {/if}
                </div>
              {/if}
              <slot name="after-title" />
              {#if hasAfter}
                <div class="item-after">
                  <slot name="after-start" />
                  {#if typeof after !== 'undefined'}
                    <span>{plainText(after)}</span>
                  {/if}
                  {#if typeof badge !== 'undefined'}
                    <Badge color={badgeColor}>{plainText(badge)}</Badge>
                  {/if}
                  <slot name="after" />
                  <slot name="after-end" />
                </div>
              {/if}
              <slot name="inner" />
              {#if !(swipeout || accordionItem)}
                <slot />
              {/if}
            {/if}
            <slot name="inner-end" />
          </div>
          <slot name="content" />
          <slot name="content-end" />
        </div>
      {/if}
      <!-- Item content end -->
    {/if}
    {#if isSortable && sortable !== false && !isSortableOpposite}
      <div class="sortable-handler" />
    {/if}
    {#if swipeout || accordionItem}
      <slot />
    {/if}
    <slot name="root" />
    <slot name="root-end" />
  </li>
{/if}
