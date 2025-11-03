<script>
  import { onMount, onDestroy, getContext } from 'svelte';
  import {
    colorClasses,
    routerClasses,
    routerAttrs,
    actionsClasses,
    actionsAttrs,
  } from '../shared/mixins.js';

  import { classNames, isStringProp, plainText } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';
  import { useTooltip } from '../shared/use-tooltip.js';
  import { useSmartSelect } from '../shared/use-smart-select.js';
  import { useRouteProps } from '../shared/use-route-props.js';

  import Badge from './badge.svelte';
  import SnippetRender from './snippet-render.svelte';

  let {
    class: className,
    title = undefined,
    text = undefined,
    media = undefined,
    subtitle = undefined,
    header = undefined,
    footer = undefined,
    tooltip = undefined,
    tooltipTrigger = undefined,
    link = undefined,
    tabLink = undefined,
    tabLinkActive = false,
    selected = false,
    href = undefined,
    target = undefined,
    after = undefined,
    badge = undefined,
    badgeColor = undefined,
    mediaItem = false,
    mediaList = false,
    groupTitle = false,
    swipeout = false,
    swipeoutOpened = false,
    sortable = undefined,
    sortableOpposite = undefined,
    accordionItem = false,
    accordionItemOpened = false,
    smartSelect = false,
    smartSelectParams = undefined,
    noChevron = undefined,
    chevronCenter = undefined,
    checkbox = undefined,
    checkboxIcon = undefined,
    radio = undefined,
    radioIcon = undefined,
    checked = undefined,
    indeterminate = undefined,
    name = undefined,
    value = undefined,
    readonly = undefined,
    required = undefined,
    disabled = undefined,
    virtualListIndex = undefined,
    routeProps = undefined,

    contentStart,
    content,
    contentEnd,
    innerStart,
    inner,
    innerEnd,
    root,
    rootStart,
    rootEnd,
    beforeTitle,
    afterTitle,
    afterStart,
    afterEnd,
    children,
    ...restProps
  } = $props();

  let el = $state(undefined);
  let linkEl = $state(undefined);
  let innerEl = $state(undefined);
  let inputEl;

  let f7SmartSelect = $state(undefined);

  export function smartSelectInstance() {
    return f7SmartSelect;
  }

  const ListContext =
    getContext('ListContext') ||
    (() => ({
      value: {},
    }));

  const isMedia = $derived(mediaList || mediaItem || ListContext().value.listIsMedia);
  const isSortable = $derived(
    sortable === true || sortable === false ? sortable : ListContext().value.listIsSortable,
  );
  const isSortableOpposite = $derived(
    sortableOpposite || ListContext().value.listIsSortableOpposite,
  );
  const isSimple = $derived(ListContext().value.listIsSimple);

  const liClasses = $derived(
    classNames(
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
      colorClasses(restProps),
    ),
  );

  const contentClasses = $derived(
    classNames(
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
      colorClasses(restProps),
    ),
  );

  const linkClasses = $derived(
    classNames(
      {
        'item-link': true,
        'smart-select': smartSelect,
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,
        'item-selected': selected,
      },
      routerClasses(restProps),
      actionsClasses(restProps),
    ),
  );

  const linkAttrs = $derived({
    href: href === false ? undefined : link === true ? href || '' : link || href,
    target,
    'data-tab': (isStringProp(tabLink) && tabLink) || undefined,
    ...routerAttrs(restProps),
    ...actionsAttrs(restProps),
  });

  const isLink = $derived(link || href || smartSelect || accordionItem);

  /* eslint-disable no-undef */
  const hasMedia = $derived(typeof media !== 'undefined');
  const hasTitle = $derived(typeof title !== 'undefined');
  const hasHeader = $derived(typeof header !== 'undefined');
  const hasFooter = $derived(typeof footer !== 'undefined');
  const hasSubtitle = $derived(typeof subtitle !== 'undefined');
  const hasText = $derived(typeof text !== 'undefined');
  const hasAfter = $derived(typeof after !== 'undefined' || typeof badge !== 'undefined');
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
  $effect(() => watchSwipeoutOpened(swipeoutOpened));

  function onClick(event) {
    if (event.target.tagName.toLowerCase() !== 'input') {
      restProps.onClick?.(event);
      restProps.onclick?.(event);
    }
  }
  function onSwipeoutOverswipeEnter(eventEl) {
    if (eventEl !== el) return;
    restProps.onSwipeoutOverswipeEnter?.(event);
    restProps.onswipeoutoverswipeenter?.(event);
  }
  function onSwipeoutOverswipeExit(eventEl) {
    if (eventEl !== el) return;
    restProps.onSwipeoutOverswipeExit?.(event);
    restProps.onswipeoutoverswipeexit?.(event);
  }
  function onSwipeoutDeleted(eventEl) {
    if (eventEl !== el) return;
    restProps.onSwipeoutDeleted?.(event);
    restProps.onswipeoutdeleted?.(event);
  }
  function onSwipeoutDelete(eventEl) {
    if (eventEl !== el) return;
    restProps.onSwipeoutDelete?.(event);
    restProps.onswipeoutdelete?.(event);
  }
  function onSwipeoutClose(eventEl) {
    if (eventEl !== el) return;
    restProps.onSwipeoutClose?.(event);
    restProps.onswipeoutclose?.(event);
  }
  function onSwipeoutClosed(eventEl) {
    if (eventEl !== el) return;
    restProps.onSwipeoutClosed?.(event);
    restProps.onswipeoutclosed?.(event);
  }
  function onSwipeoutOpen(eventEl) {
    if (eventEl !== el) return;
    restProps.onSwipeoutOpen?.(event);
    restProps.onswipeoutopen?.(event);
  }
  function onSwipeoutOpened(eventEl) {
    if (eventEl !== el) return;
    restProps.onSwipeoutOpened?.(event);
    restProps.onswipeoutopened?.(event);
  }
  function onSwipeout(eventEl, progress) {
    if (eventEl !== el) return;
    restProps.onSwipeout?.(progress);
    restProps.onswipeout?.(progress);
  }
  function onAccBeforeClose(eventEl, prevent) {
    if (eventEl !== el) return;
    restProps.onAccordionBeforeClose?.(prevent);
    restProps.onaccordionbeforeclose?.(prevent);
  }
  function onAccClose(eventEl) {
    if (eventEl !== el) return;
    restProps.onAccordionClose?.(event);
    restProps.onaccordionclose?.(event);
  }
  function onAccClosed(eventEl) {
    if (eventEl !== el) return;
    restProps.onAccordionClosed?.(event);
    restProps.onaccordionclosed?.(event);
  }
  function onAccBeforeOpen(eventEl, prevent) {
    if (eventEl !== el) return;
    restProps.onAccordionBeforeOpen?.(prevent);
    restProps.onaccordionbeforeopen?.(prevent);
  }
  function onAccOpen(eventEl) {
    if (eventEl !== el) return;
    restProps.onAccordionOpen?.(event);
    restProps.onaccordionopen?.(event);
  }
  function onAccOpened(eventEl) {
    if (eventEl !== el) return;
    restProps.onAccordionOpened?.(event);
    restProps.onaccordionopened?.(event);
  }
  function onChange(event) {
    restProps.onChange?.(event);
    restProps.onchange?.(event);
    checked = event.target.checked;
  }

  $effect(() =>
    useSmartSelect(
      { smartSelect, smartSelectParams },
      (instance) => {
        f7SmartSelect = instance;
      },
      () => linkEl,
    ),
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

  $effect(() => {
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

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_no_static_element_interactions -->

{#if groupTitle}
  <li
    onclick={onClick}
    bind:this={el}
    use:useTooltip={{ tooltip, tooltipTrigger }}
    class={liClasses}
    data-virtual-list-index={virtualListIndex}
    {...restProps}
  >
    <span>
      <SnippetRender content={title} />
      {@render children?.()}
    </span>
  </li>
{:else if isSimple}
  <li
    onclick={onClick}
    bind:this={el}
    use:useTooltip={{ tooltip, tooltipTrigger }}
    class={liClasses}
    data-virtual-list-index={virtualListIndex}
    {...restProps}
  >
    <SnippetRender content={title} />
    {@render children?.()}
  </li>
{:else}
  <li
    bind:this={el}
    use:useTooltip={{ tooltip, tooltipTrigger }}
    class={liClasses}
    data-virtual-list-index={virtualListIndex}
    {...restProps}
  >
    <SnippetRender content={rootStart} />
    {#if swipeout}
      <div class="swipeout-content">
        {#if isLink}
          <a
            bind:this={linkEl}
            use:useRouteProps={routeProps}
            class={linkClasses}
            {...linkAttrs}
            onclick={onClick}
          >
            <!-- Item content start -->
            <div class={contentClasses}>
              <SnippetRender content={contentStart} />
              {#if isSortable && sortable !== false && isSortableOpposite}
                <div class="sortable-handler" />
              {/if}
              {#if hasMedia}
                <div class="item-media">
                  {#if typeof media === 'function'}
                    {@render media?.()}
                  {:else if typeof media === 'string'}
                    <img src={media} />
                  {/if}
                </div>
              {/if}
              <div bind:this={innerEl} class="item-inner">
                <SnippetRender content={innerStart} />
                {#if isMedia}
                  {#if hasHeader}
                    <div class="item-header">
                      <SnippetRender content={header} />
                    </div>
                  {/if}
                  <div class="item-title-row">
                    <SnippetRender content={beforeTitle} />

                    {#if hasTitle}
                      <div class="item-title">
                        <SnippetRender content={title} />
                      </div>
                    {/if}
                    <SnippetRender content={afterTitle} />
                    {#if hasAfter}
                      <div class="item-after">
                        <SnippetRender content={afterStart} />

                        <SnippetRender content={after} />
                        {#if typeof badge !== 'undefined'}
                          <Badge color={badgeColor}>{plainText(badge)}</Badge>
                        {/if}

                        <SnippetRender content={afterEnd} />
                      </div>
                    {/if}
                  </div>
                  {#if hasSubtitle}
                    <div class="item-subtitle">
                      <SnippetRender content={subtitle} />
                    </div>
                  {/if}
                  {#if hasText}
                    <div class="item-text">
                      <SnippetRender content={text} />
                    </div>
                  {/if}
                  {@render children?.()}
                  <SnippetRender content={inner} />
                  {#if !(swipeout || accordionItem)}
                    <SnippetRender {content} />
                  {/if}
                  {#if hasFooter}
                    <div class="item-footer">
                      <SnippetRender content={footer} />
                    </div>
                  {/if}
                {:else}
                  <SnippetRender content={beforeTitle} />

                  {#if hasTitle || hasHeader || hasFooter}
                    <div class="item-title">
                      {#if hasHeader}
                        <div class="item-header">
                          <SnippetRender content={header} />
                        </div>
                      {/if}
                      <SnippetRender content={title} />
                      {#if hasFooter}
                        <div class="item-footer">
                          <SnippetRender content={footer} />
                        </div>
                      {/if}
                    </div>
                  {/if}
                  <SnippetRender content={afterTitle} />
                  {#if hasAfter}
                    <div class="item-after">
                      <SnippetRender content={afterStart} />
                      <SnippetRender content={after} />
                      {#if typeof badge !== 'undefined'}
                        <Badge color={badgeColor}>{plainText(badge)}</Badge>
                      {/if}

                      <SnippetRender content={afterEnd} />
                    </div>
                  {/if}
                  {@render children?.()}
                  <SnippetRender content={inner} />
                  {#if !(swipeout || accordionItem)}
                    <SnippetRender {content} />
                  {/if}
                {/if}
                <SnippetRender content={innerEnd} />
              </div>
              <SnippetRender {content} />
              <SnippetRender content={contentEnd} />
            </div>
            <!-- Item content end -->
          </a>
        {:else}
          <!-- Item content start -->
          {#if checkbox || radio}
            <label class={contentClasses} onclick={onClick}>
              <SnippetRender content={contentStart} />
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
                onchange={onChange}
              />
              <i class={`icon icon-${radio ? 'radio' : 'checkbox'}`} />
              {#if hasMedia}
                <div class="item-media">
                  {#if typeof media === 'function'}
                    {@render media?.()}
                  {:else if typeof media === 'string'}
                    <img src={media} />
                  {/if}
                </div>
              {/if}
              <div bind:this={innerEl} class="item-inner">
                <SnippetRender content={innerStart} />
                {#if isMedia}
                  {#if hasHeader}
                    <div class="item-header">
                      <SnippetRender content={header} />
                    </div>
                  {/if}
                  <div class="item-title-row">
                    <SnippetRender content={beforeTitle} />

                    {#if hasTitle}
                      <div class="item-title">
                        <SnippetRender content={title} />
                      </div>
                    {/if}
                    <SnippetRender content={afterTitle} />
                    {#if hasAfter}
                      <div class="item-after">
                        <SnippetRender content={afterStart} />
                        <SnippetRender content={after} />
                        {#if typeof badge !== 'undefined'}
                          <Badge color={badgeColor}>{plainText(badge)}</Badge>
                        {/if}

                        <SnippetRender content={afterEnd} />
                      </div>
                    {/if}
                  </div>
                  {#if hasSubtitle}
                    <div class="item-subtitle">
                      <SnippetRender content={subtitle} />
                    </div>
                  {/if}
                  {#if hasText}
                    <div class="item-text">
                      <SnippetRender content={text} />
                    </div>
                  {/if}
                  {@render children?.()}
                  <SnippetRender content={inner} />
                  {#if !(swipeout || accordionItem)}
                    <SnippetRender {content} />
                  {/if}
                  {#if hasFooter}
                    <div class="item-footer">
                      <SnippetRender content={footer} />
                    </div>
                  {/if}
                {:else}
                  <SnippetRender content={beforeTitle} />

                  {#if hasTitle || hasHeader || hasFooter}
                    <div class="item-title">
                      {#if hasHeader}
                        <div class="item-header">
                          <SnippetRender content={header} />
                        </div>
                      {/if}
                      <SnippetRender content={title} />
                      {#if hasFooter}
                        <div class="item-footer">
                          <SnippetRender content={footer} />
                        </div>
                      {/if}
                    </div>
                  {/if}
                  <SnippetRender content={afterTitle} />
                  {#if hasAfter}
                    <div class="item-after">
                      <SnippetRender content={afterStart} />
                      <SnippetRender content={after} />
                      {#if typeof badge !== 'undefined'}
                        <Badge color={badgeColor}>{plainText(badge)}</Badge>
                      {/if}

                      <SnippetRender content={afterEnd} />
                    </div>
                  {/if}
                  {@render children?.()}
                  <SnippetRender content={inner} />
                  {#if !(swipeout || accordionItem)}
                    <SnippetRender {content} />
                  {/if}
                {/if}
                <SnippetRender content={innerEnd} />
              </div>
              <SnippetRender {content} />
              <SnippetRender content={contentEnd} />
            </label>
          {:else}
            <div class={contentClasses} onclick={onClick}>
              <SnippetRender content={contentStart} />
              {#if isSortable && sortable !== false && isSortableOpposite}
                <div class="sortable-handler" />
              {/if}
              {#if hasMedia}
                <div class="item-media">
                  {#if typeof media === 'function'}
                    {@render media?.()}
                  {:else if typeof media === 'string'}
                    <img src={media} />
                  {/if}
                </div>
              {/if}
              <div bind:this={innerEl} class="item-inner">
                <SnippetRender content={innerStart} />
                {#if isMedia}
                  {#if hasHeader}
                    <div class="item-header">
                      <SnippetRender content={header} />
                    </div>
                  {/if}
                  <div class="item-title-row">
                    <SnippetRender content={beforeTitle} />

                    {#if hasTitle}
                      <div class="item-title">
                        <SnippetRender content={title} />
                      </div>
                    {/if}
                    <SnippetRender content={afterTitle} />
                    {#if hasAfter}
                      <div class="item-after">
                        <SnippetRender content={afterStart} />
                        <SnippetRender content={after} />
                        {#if typeof badge !== 'undefined'}
                          <Badge color={badgeColor}>{plainText(badge)}</Badge>
                        {/if}

                        <SnippetRender content={afterEnd} />
                      </div>
                    {/if}
                  </div>
                  {#if hasSubtitle}
                    <div class="item-subtitle">
                      <SnippetRender content={subtitle} />
                    </div>
                  {/if}
                  {#if hasText}
                    <div class="item-text">
                      <SnippetRender content={text} />
                    </div>
                  {/if}
                  {@render children?.()}
                  <SnippetRender content={inner} />
                  {#if !(swipeout || accordionItem)}
                    <SnippetRender {content} />
                  {/if}
                  {#if hasFooter}
                    <div class="item-footer">
                      <SnippetRender content={footer} />
                    </div>
                  {/if}
                {:else}
                  <SnippetRender content={beforeTitle} />

                  {#if hasTitle || hasHeader || hasFooter}
                    <div class="item-title">
                      {#if hasHeader}
                        <div class="item-header">
                          <SnippetRender content={header} />
                        </div>
                      {/if}
                      <SnippetRender content={title} />
                      {#if hasFooter}
                        <div class="item-footer">
                          <SnippetRender content={footer} />
                        </div>
                      {/if}
                    </div>
                  {/if}
                  <SnippetRender content={afterTitle} />
                  {#if hasAfter}
                    <div class="item-after">
                      <SnippetRender content={afterStart} />
                      <SnippetRender content={after} />
                      {#if typeof badge !== 'undefined'}
                        <Badge color={badgeColor}>{plainText(badge)}</Badge>
                      {/if}

                      <SnippetRender content={afterEnd} />
                    </div>
                  {/if}
                  {@render children?.()}
                  <SnippetRender content={inner} />
                  {#if !(swipeout || accordionItem)}
                    <SnippetRender {content} />
                  {/if}
                {/if}
                <SnippetRender content={innerEnd} />
              </div>
              <SnippetRender {content} />
              <SnippetRender content={contentEnd} />
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
        onclick={onClick}
      >
        <!-- Item content start -->
        <div class={contentClasses}>
          <SnippetRender content={contentStart} />
          {#if isSortable && sortable !== false && isSortableOpposite}
            <div class="sortable-handler" />
          {/if}
          {#if hasMedia}
            <div class="item-media">
              {#if typeof media === 'function'}
                {@render media?.()}
              {:else if typeof media === 'string'}
                <img src={media} />
              {/if}
            </div>
          {/if}
          <div bind:this={innerEl} class="item-inner">
            <SnippetRender content={innerStart} />
            {#if isMedia}
              {#if hasHeader}
                <div class="item-header">
                  <SnippetRender content={header} />
                </div>
              {/if}
              <div class="item-title-row">
                <SnippetRender content={beforeTitle} />

                {#if hasTitle}
                  <div class="item-title">
                    <SnippetRender content={title} />
                  </div>
                {/if}
                <SnippetRender content={afterTitle} />
                {#if hasAfter}
                  <div class="item-after">
                    <SnippetRender content={afterStart} />
                    <SnippetRender content={after} />
                    {#if typeof badge !== 'undefined'}
                      <Badge color={badgeColor}>{plainText(badge)}</Badge>
                    {/if}

                    <SnippetRender content={afterEnd} />
                  </div>
                {/if}
              </div>
              {#if hasSubtitle}
                <div class="item-subtitle">
                  <SnippetRender content={subtitle} />
                </div>
              {/if}
              {#if hasText}
                <div class="item-text">
                  <SnippetRender content={text} />
                </div>
              {/if}
              {@render children?.()}
              <SnippetRender content={inner} />
              {#if !(swipeout || accordionItem)}
                <SnippetRender {content} />
              {/if}
              {#if hasFooter}
                <div class="item-footer">
                  <SnippetRender content={footer} />
                </div>
              {/if}
            {:else}
              <SnippetRender content={beforeTitle} />

              {#if hasTitle || hasHeader || hasFooter}
                <div class="item-title">
                  {#if hasHeader}
                    <div class="item-header">
                      <SnippetRender content={header} />
                    </div>
                  {/if}
                  <SnippetRender content={title} />
                  {#if hasFooter}
                    <div class="item-footer">
                      <SnippetRender content={footer} />
                    </div>
                  {/if}
                </div>
              {/if}
              <SnippetRender content={afterTitle} />
              {#if hasAfter}
                <div class="item-after">
                  <SnippetRender content={afterStart} />
                  <SnippetRender content={after} />
                  {#if typeof badge !== 'undefined'}
                    <Badge color={badgeColor}>{plainText(badge)}</Badge>
                  {/if}

                  <SnippetRender content={afterEnd} />
                </div>
              {/if}
              {@render children?.()}
              <SnippetRender content={inner} />
              {#if !(swipeout || accordionItem)}
                <SnippetRender {content} />
              {/if}
            {/if}
            <SnippetRender content={innerEnd} />
          </div>
          <SnippetRender {content} />
          <SnippetRender content={contentEnd} />
        </div>
        <!-- Item content end -->
      </a>
    {:else}
      <!-- Item content start -->
      {#if checkbox || radio}
        <label class={contentClasses} onclick={onClick}>
          <SnippetRender content={contentStart} />
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
            onchange={onChange}
          />
          <i class={`icon icon-${radio ? 'radio' : 'checkbox'}`} />
          {#if hasMedia}
            <div class="item-media">
              {#if typeof media === 'function'}
                {@render media?.()}
              {:else if typeof media === 'string'}
                <img src={media} />
              {/if}
            </div>
          {/if}
          <div bind:this={innerEl} class="item-inner">
            <SnippetRender content={innerStart} />
            {#if isMedia}
              {#if hasHeader}
                <div class="item-header">
                  <SnippetRender content={header} />
                </div>
              {/if}
              <div class="item-title-row">
                <SnippetRender content={beforeTitle} />

                {#if hasTitle}
                  <div class="item-title">
                    <SnippetRender content={title} />
                  </div>
                {/if}
                <SnippetRender content={afterTitle} />
                {#if hasAfter}
                  <div class="item-after">
                    <SnippetRender content={afterStart} />
                    <SnippetRender content={after} />
                    {#if typeof badge !== 'undefined'}
                      <Badge color={badgeColor}>{plainText(badge)}</Badge>
                    {/if}

                    <SnippetRender content={afterEnd} />
                  </div>
                {/if}
              </div>
              {#if hasSubtitle}
                <div class="item-subtitle">
                  <SnippetRender content={subtitle} />
                </div>
              {/if}
              {#if hasText}
                <div class="item-text">
                  <SnippetRender content={text} />
                </div>
              {/if}
              {@render children?.()}
              <SnippetRender content={inner} />
              {#if !(swipeout || accordionItem)}
                <SnippetRender {content} />
              {/if}
              {#if hasFooter}
                <div class="item-footer">
                  <SnippetRender content={footer} />
                </div>
              {/if}
            {:else}
              <SnippetRender content={beforeTitle} />

              {#if hasTitle || hasHeader || hasFooter}
                <div class="item-title">
                  {#if hasHeader}
                    <div class="item-header">
                      <SnippetRender content={header} />
                    </div>
                  {/if}
                  <SnippetRender content={title} />
                  {#if hasFooter}
                    <div class="item-footer">
                      <SnippetRender content={footer} />
                    </div>
                  {/if}
                </div>
              {/if}
              <SnippetRender content={afterTitle} />
              {#if hasAfter}
                <div class="item-after">
                  <SnippetRender content={afterStart} />
                  <SnippetRender content={after} />
                  {#if typeof badge !== 'undefined'}
                    <Badge color={badgeColor}>{plainText(badge)}</Badge>
                  {/if}

                  <SnippetRender content={afterEnd} />
                </div>
              {/if}
              {@render children?.()}
              <SnippetRender content={inner} />
              {#if !(swipeout || accordionItem)}
                <SnippetRender {content} />
              {/if}
            {/if}
            <SnippetRender content={innerEnd} />
          </div>
          <SnippetRender {content} />
          <SnippetRender content={contentEnd} />
        </label>
      {:else}
        <div class={contentClasses} onclick={onClick}>
          <SnippetRender content={contentStart} />
          {#if isSortable && sortable !== false && isSortableOpposite}
            <div class="sortable-handler" />
          {/if}
          {#if hasMedia}
            <div class="item-media">
              {#if typeof media === 'function'}
                {@render media?.()}
              {:else if typeof media === 'string'}
                <img src={media} />
              {/if}
            </div>
          {/if}
          <div bind:this={innerEl} class="item-inner">
            <SnippetRender content={innerStart} />
            {#if isMedia}
              {#if hasHeader}
                <div class="item-header">
                  <SnippetRender content={header} />
                </div>
              {/if}
              <div class="item-title-row">
                <SnippetRender content={beforeTitle} />

                {#if hasTitle}
                  <div class="item-title">
                    <SnippetRender content={title} />
                  </div>
                {/if}
                <SnippetRender content={afterTitle} />
                {#if hasAfter}
                  <div class="item-after">
                    <SnippetRender content={afterStart} />
                    <SnippetRender content={after} />
                    {#if typeof badge !== 'undefined'}
                      <Badge color={badgeColor}>{plainText(badge)}</Badge>
                    {/if}

                    <SnippetRender content={afterEnd} />
                  </div>
                {/if}
              </div>
              {#if hasSubtitle}
                <div class="item-subtitle">
                  <SnippetRender content={subtitle} />
                </div>
              {/if}
              {#if hasText}
                <div class="item-text">
                  <SnippetRender content={text} />
                </div>
              {/if}
              {@render children?.()}
              <SnippetRender content={inner} />
              {#if !(swipeout || accordionItem)}
                <SnippetRender {content} />
              {/if}
              {#if hasFooter}
                <div class="item-footer">
                  <SnippetRender content={footer} />
                </div>
              {/if}
            {:else}
              <SnippetRender content={beforeTitle} />

              {#if hasTitle || hasHeader || hasFooter}
                <div class="item-title">
                  {#if hasHeader}
                    <div class="item-header">
                      <SnippetRender content={header} />
                    </div>
                  {/if}
                  <SnippetRender content={title} />
                  {#if hasFooter}
                    <div class="item-footer">
                      <SnippetRender content={footer} />
                    </div>
                  {/if}
                </div>
              {/if}
              <SnippetRender content={afterTitle} />
              {#if hasAfter}
                <div class="item-after">
                  <SnippetRender content={afterStart} />
                  <SnippetRender content={after} />
                  {#if typeof badge !== 'undefined'}
                    <Badge color={badgeColor}>{plainText(badge)}</Badge>
                  {/if}

                  <SnippetRender content={afterEnd} />
                </div>
              {/if}
              {@render children?.()}
              <SnippetRender content={inner} />
              {#if !(swipeout || accordionItem)}
                <SnippetRender {content} />
              {/if}
            {/if}
            <SnippetRender content={innerEnd} />
          </div>
          <SnippetRender {content} />
          <SnippetRender content={contentEnd} />
        </div>
      {/if}
      <!-- Item content end -->
    {/if}
    {#if isSortable && sortable !== false && !isSortableOpposite}
      <div class="sortable-handler" />
    {/if}
    {#if swipeout || accordionItem}
      <SnippetRender {content} />
    {/if}
    <SnippetRender content={root} />
    <SnippetRender content={rootEnd} />
  </li>
{/if}
