<script>
  import { createEventDispatcher, onMount, onDestroy, afterUpdate, getContext } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';
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

  // Tooltip
  export let tooltip = undefined;

  // Link Props
  export let link = undefined;
  export let href = undefined;
  export let target = undefined;

  export let after = undefined;
  export let badge = undefined;
  export let badgeColor = undefined;

  export let mediaItem = false;
  export let mediaList = false;
  export let divider = false;
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
  export let radio = undefined;
  export let checked = undefined;
  export let indeterminate = undefined;
  export let name = undefined;
  export let value = undefined;
  export let readonly = undefined;
  export let required = undefined;
  export let disabled = undefined;
  export let virtualListIndex = undefined;

  let el;
  let linkEl;
  let innerEl;
  let inputEl;

  let f7SmartSelect;
  let f7Tooltip;

  $: isMedia = mediaList || mediaItem || getContext('f7ListMedia');
  $: isSortable = sortable || getContext('f7ListSortable');
  $: isSortableOpposite = sortableOpposite || getContext('f7ListSortableOpposite');
  $: isSimple = getContext('f7ListSimple');

  $: liClasses = Utils.classNames(
    className,
    {
      'item-divider': divider,
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
    Mixins.colorClasses($$props),
  );

  $: contentClasses = Utils.classNames(
    className,
    'item-content',
    {
      'item-checkbox': checkbox,
      'item-radio': radio,
    },
    Mixins.colorClasses($$props),
  );

  $: linkClasses = Utils.classNames(
    {
      'item-link': true,
      'smart-select': smartSelect,
    },
    Mixins.linkRouterClasses($$props),
    Mixins.linkActionsClasses($$props),
  );

  $: linkAttrs = {
    href: link === true ? '' : link || href,
    target,
    ...Mixins.linkRouterAttrs($$props),
    ...Mixins.linkActionsAttrs($$props),
  };

  $: isLink = link || href || smartSelect || accordionItem;

  /* eslint-disable no-undef */
  $: hasMedia = media || hasSlots(arguments, 'media');
  $: hasTitle = title || hasSlots(arguments, 'title');
  $: hasHeader = header || hasSlots(arguments, 'header');
  $: hasFooter = footer || hasSlots(arguments, 'footer');
  $: hasSubtitle = subtitle || hasSlots(arguments, 'subtitle');
  $: hasText = text || hasSlots(arguments, 'text');
  $: hasAfter = after || badge || hasSlots(arguments, 'after');
  /* eslint-enable no-undef */

  let tooltipText = tooltip;
  function watchTooltip(newText) {
    const oldText = tooltipText;
    if (oldText === newText) return;
    tooltipText = newText;
    if (!newText && f7Tooltip) {
      f7Tooltip.destroy();
      f7Tooltip = null;
      return;
    }
    if (newText && !f7Tooltip && f7.instance) {
      f7Tooltip = f7.instance.tooltip.create({
        targetEl: el,
        text: newText,
      });
      return;
    }
    if (!newText || !f7Tooltip) return;
    f7Tooltip.setText(newText);
  }
  $: watchTooltip(tooltip);

  function watchSwipeoutOpened(opened) {
    if (!swipeout) return;
    if (opened) {
      f7.instance.swipeout.open(el);
    } else {
      f7.instance.swipeout.close(el);
    }
  }
  $: watchSwipeoutOpened(swipeoutOpened);

  function onClick(event) {
    if (event.target.tagName.toLowerCase() !== 'input') {
      dispatch('click', Array.isArray(event.detail) ? event.detail : [event]);
    }
  }
  function onSwipeoutOverswipeEnter(eventEl) {
    if (eventEl !== el) return;
    dispatch('swipeoutOverswipeEnter');
  }
  function onSwipeoutOverswipeExit(eventEl) {
    if (eventEl !== el) return;
    dispatch('swipeoutOverswipeExit');
  }
  function onSwipeoutDeleted(eventEl) {
    if (eventEl !== el) return;
    dispatch('swipeoutDeleted');
  }
  function onSwipeoutDelete(eventEl) {
    if (eventEl !== el) return;
    dispatch('swipeoutDelete');
  }
  function onSwipeoutClose(eventEl) {
    if (eventEl !== el) return;
    dispatch('swipeoutClose');
  }
  function onSwipeoutClosed(eventEl) {
    if (eventEl !== el) return;
    dispatch('swipeoutClosed');
  }
  function onSwipeoutOpen(eventEl) {
    if (eventEl !== el) return;
    dispatch('swipeoutOpen');
  }
  function onSwipeoutOpened(eventEl) {
    if (eventEl !== el) return;
    dispatch('swipeoutOpened');
  }
  function onSwipeout(eventEl, progress) {
    if (eventEl !== el) return;
    dispatch('swipeout', progress);
  }
  function onAccBeforeClose(eventEl, prevent) {
    if (eventEl !== el) return;
    dispatch('accordionBeforeClose', [prevent]);
  }
  function onAccClose(eventEl) {
    if (eventEl !== el) return;
    dispatch('accordionClose');
  }
  function onAccClosed(eventEl) {
    if (eventEl !== el) return;
    dispatch('accordionClosed');
  }
  function onAccBeforeOpen(eventEl, prevent) {
    if (eventEl !== el) return;
    dispatch('accordionBeforeOpen', [prevent]);
  }
  function onAccOpen(eventEl) {
    if (eventEl !== el) return;
    dispatch('accordionOpen');
  }
  function onAccOpened(eventEl) {
    if (eventEl !== el) return;
    dispatch('accordionOpened');
  }
  function onChange(event) {
    dispatch('change', [event]);
  }
  onMount(() => {
    if (linkEl && $$props.routeProps) {
      linkEl.f7RouteProps = $$props.routeProps;
    }
    if (indeterminate && inputEl) {
      inputEl.indeterminate = true;
    }
    f7.ready(() => {
      if (swipeout) {
        f7.instance.on('swipeoutOpen', onSwipeoutOpen);
        f7.instance.on('swipeoutOpened', onSwipeoutOpened);
        f7.instance.on('swipeoutClose', onSwipeoutClose);
        f7.instance.on('swipeoutClosed', onSwipeoutClosed);
        f7.instance.on('swipeoutDelete', onSwipeoutDelete);
        f7.instance.on('swipeoutDeleted', onSwipeoutDeleted);
        f7.instance.on('swipeoutOverswipeEnter', onSwipeoutOverswipeEnter);
        f7.instance.on('swipeoutOverswipeExit', onSwipeoutOverswipeExit);
        f7.instance.on('swipeout', onSwipeout);
      }
      if (accordionItem) {
        f7.instance.on('accordionBeforeOpen', onAccBeforeOpen);
        f7.instance.on('accordionOpen', onAccOpen);
        f7.instance.on('accordionOpened', onAccOpened);
        f7.instance.on('accordionBeforeClose', onAccBeforeClose);
        f7.instance.on('accordionClose', onAccClose);
        f7.instance.on('accordionClosed', onAccClosed);
      }
      if (linkEl && smartSelect) {
        const ssParams = Utils.extend(
          { el: linkEl },
          smartSelectParams || {},
        );
        f7SmartSelect = f7.smartSelect.create(ssParams);
      }
      if (swipeoutOpened) {
        f7.swipeout.open(el);
      }
      if (tooltip) {
        f7Tooltip = f7.tooltip.create({
          targetEl: el,
          text: tooltip,
        });
      }
    });
  });

  afterUpdate(() => {
    if (linkEl && $$props.routeProps) {
      linkEl.f7RouteProps = $$props.routeProps;
    }
    if (inputEl) {
      inputEl.indeterminate = indeterminate;
    }
  });

  onDestroy(() => {
    if (linkEl) {
      delete linkEl.f7RouteProps;
    }
    if (swipeout) {
      f7.instance.off('swipeoutOpen', onSwipeoutOpen);
      f7.instance.off('swipeoutOpened', onSwipeoutOpened);
      f7.instance.off('swipeoutClose', onSwipeoutClose);
      f7.instance.off('swipeoutClosed', onSwipeoutClosed);
      f7.instance.off('swipeoutDelete', onSwipeoutDelete);
      f7.instance.off('swipeoutDeleted', onSwipeoutDeleted);
      f7.instance.off('swipeoutOverswipeEnter', onSwipeoutOverswipeEnter);
      f7.instance.off('swipeoutOverswipeExit', onSwipeoutOverswipeExit);
      f7.instance.off('swipeout', onSwipeout);
    }
    if (accordionItem) {
      f7.instance.off('accordionBeforeOpen', onAccBeforeOpen);
      f7.instance.off('accordionOpen', onAccOpen);
      f7.instance.off('accordionOpened', onAccOpened);
      f7.instance.off('accordionBeforeClose', onAccBeforeClose);
      f7.instance.off('accordionClose', onAccClose);
      f7.instance.off('accordionClosed', onAccClosed);
    }
    if (f7SmartSelect && f7SmartSelect.destroy) {
      f7SmartSelect.destroy();
      f7SmartSelect = null;
    }
    if (f7Tooltip && f7Tooltip.destroy) {
      f7Tooltip.destroy();
      f7Tooltip = null;
    }
  });

</script>
<!-- svelte-ignore a11y-missing-attribute -->
{#if (divider || groupTitle)}
  <li on:click={ onClick } bind:this={el} id={id} style={style} class={liClasses} data-virtual-list-index={virtualListIndex}>
    <span><slot>{title}</slot></span>
  </li>
{:else if isSimple}
  <li on:click={ onClick } bind:this={el} id={id} style={style} class={liClasses} data-virtual-list-index={virtualListIndex}>
    {title}
    <slot />
  </li>
{:else}
  <li bind:this={el} id={id} style={style} class={liClasses} data-virtual-list-index={virtualListIndex}>
    <slot name="root-start" />
    {#if swipeout}
      <div class="swipeout-content">
        {#if isLink}
          <a bind:this={linkEl} class={linkClasses} {...linkAttrs} on:click={onClick}>
          <!-- Item content start -->
            <div
              bind:this={el}
              id={id}
              style={style}
              class={contentClasses}
            >
              <slot name="content-start" />
              {#if isSortableOpposite}
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
                        {#if after}
                          <span>{after}</span>
                        {/if}
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
                  {#if !(swipeout || accordionItem)}
                    <slot />
                  {/if}
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
                      {#if after}
                        <span>{after}</span>
                      {/if}
                      {#if badge}
                        <Badge color={badgeColor}>{badge}</Badge>
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
            <label
              bind:this={el}
              id={id}
              style={style}
              class={contentClasses}
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
                        {#if after}
                          <span>{after}</span>
                        {/if}
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
                  {#if !(swipeout || accordionItem)}
                    <slot />
                  {/if}
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
                      {#if after}
                        <span>{after}</span>
                      {/if}
                      {#if badge}
                        <Badge color={badgeColor}>{badge}</Badge>
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
            <div
              bind:this={el}
              id={id}
              style={style}
              class={contentClasses}
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
                        {#if after}
                          <span>{after}</span>
                        {/if}
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
                  {#if !(swipeout || accordionItem)}
                    <slot />
                  {/if}
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
                      {#if after}
                        <span>{after}</span>
                      {/if}
                      {#if badge}
                        <Badge color={badgeColor}>{badge}</Badge>
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
    {:else}
      {#if isLink}
        <a bind:this={linkEl} class={linkClasses} {...linkAttrs} on:click={onClick}>
          <!-- Item content start -->
          <div
            bind:this={el}
            id={id}
            style={style}
            class={contentClasses}
          >
            <slot name="content-start" />
            {#if isSortableOpposite}
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
                      {#if after}
                        <span>{after}</span>
                      {/if}
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
                {#if !(swipeout || accordionItem)}
                  <slot />
                {/if}
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
                    {#if after}
                      <span>{after}</span>
                    {/if}
                    {#if badge}
                      <Badge color={badgeColor}>{badge}</Badge>
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
          <label
            bind:this={el}
            id={id}
            style={style}
            class={contentClasses}
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
                      {#if after}
                        <span>{after}</span>
                      {/if}
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
                {#if !(swipeout || accordionItem)}
                  <slot />
                {/if}
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
                    {#if after}
                      <span>{after}</span>
                    {/if}
                    {#if badge}
                      <Badge color={badgeColor}>{badge}</Badge>
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
          <div
            bind:this={el}
            id={id}
            style={style}
            class={contentClasses}
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
                      {#if after}
                        <span>{after}</span>
                      {/if}
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
                {#if !(swipeout || accordionItem)}
                  <slot />
                {/if}
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
                    {#if after}
                      <span>{after}</span>
                    {/if}
                    {#if badge}
                      <Badge color={badgeColor}>{badge}</Badge>
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
    {/if}
    {#if (isSortable && sortable !== false && !isSortableOpposite)}
      <div class="sortable-handler" />)
    {/if}
    {#if (swipeout || accordionItem)}
      <slot />
    {/if}
    <slot name="root" />
    <slot name="root-end" />
  </li>
{/if}

