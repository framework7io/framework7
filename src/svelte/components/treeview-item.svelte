<script>
  import { onMount, onDestroy } from 'svelte';
  import {
    colorClasses,
    routerAttrs,
    routerClasses,
    actionsClasses,
    actionsAttrs,
  } from '../shared/mixins.js';
  import { classNames, extend } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';
  import { useIcon } from '../shared/use-icon.js';

  import UseIcon from './use-icon.svelte';

  let {
    class: className,
    toggle = undefined,
    itemToggle = false,
    selectable = false,
    selected = false,
    opened = false,
    label = undefined,
    loadChildren = false,
    link = undefined,
    childrenStart,
    children,
    rootStart,
    root,
    rootEnd,
    contentStart,
    content,
    contentEnd,
    labelStart,
    media,
    ...restProps
  } = $props();

  let el = $state(null);

  const classes = $derived(
    classNames(
      className,
      'treeview-item',
      {
        'treeview-item-opened': opened,
        'treeview-load-children': loadChildren,
      },
      colorClasses(restProps),
    ),
  );

  const itemRootClasses = $derived(
    classNames(
      'treeview-item-root',
      {
        'treeview-item-selectable': selectable,
        'treeview-item-selected': selected,
        'treeview-item-toggle': itemToggle,
      },
      routerClasses(restProps),
      actionsClasses(restProps),
    ),
  );

  const itemRootAttrs = $derived(
    extend(
      {
        href: link === true ? '#' : link || undefined,
      },
      routerAttrs(restProps),
      actionsAttrs(restProps),
    ),
  );

  const hasChildren = $derived(children || childrenStart);

  const needToggle = $derived(typeof toggle === 'undefined' ? hasChildren : toggle);

  const icon = $derived(useIcon(restProps));

  const treeviewRootTag = $derived(link || link === '' ? 'a' : 'div');

  function onClick(e) {
    restProps.onClick?.(e);
    restProps.onclick?.(e);
  }
  function onOpen(itemEl) {
    if (itemEl !== el) return;
    restProps.onTreeviewOpen?.(el);
    restProps.ontreeviewopen?.(el);
  }
  function onClose(itemEl) {
    if (itemEl !== el) return;
    restProps.onTreeviewClose?.(el);
    restProps.ontreeviewclose?.(el);
  }
  function onLoadChildren(itemEl, done) {
    if (itemEl !== el) return;
    restProps.onTreeviewLoadChildren?.(el, done);
    restProps.ontreeviewloadchildren?.(el, done);
  }

  onMount(() => {
    if (!el) return;
    f7ready(() => {
      app.f7.on('treeviewOpen', onOpen);
      app.f7.on('treeviewClose', onClose);
      app.f7.on('treeviewLoadChildren', onLoadChildren);
    });
  });

  onDestroy(() => {
    if (!el || !app.f7) return;
    app.f7.off('treeviewOpen', onOpen);
    app.f7.off('treeviewClose', onClose);
    app.f7.off('treeviewLoadChildren', onLoadChildren);
  });
</script>

<div bind:this={el} class={classes} {...restProps}>
  {#if treeviewRootTag === 'div'}
    <div onclick={onClick} class={itemRootClasses} {...itemRootAttrs}>
      {@render rootStart?.()}
      {#if needToggle}
        <div class="treeview-toggle"></div>
      {/if}
      <div class="treeview-item-content">
        {@render contentStart?.()}
        {#if icon}
          <UseIcon {icon} />
        {/if}
        {@render media?.()}
        <div class="treeview-item-label">
          {@render labelStart?.()}
          {#if typeof label === 'function'}
            {@render label?.()}
          {:else if typeof label !== 'undefined'}
            {label}
          {/if}
        </div>
        {@render content?.()}
        {@render contentEnd?.()}
      </div>
      {@render root?.()}
      {@render rootEnd?.()}
    </div>
  {:else}
    <a onclick={onClick} class={itemRootClasses} {...itemRootAttrs}>
      {@render rootStart?.()}
      {#if needToggle}
        <div class="treeview-toggle"></div>
      {/if}
      <div class="treeview-item-content">
        {@render contentStart?.()}
        {#if icon}
          <UseIcon {icon} />
        {/if}
        {@render media?.()}
        <div class="treeview-item-label">
          {@render labelStart?.()}
          {#if typeof label === 'function'}
            {@render label?.()}
          {:else if typeof label !== 'undefined'}
            {label}
          {/if}
        </div>
        {@render content?.()}
        {@render contentEnd?.()}
      </div>
      {@render root?.()}
      {@render rootEnd?.()}
    </a>
  {/if}
  {#if hasChildren}
    <div class="treeview-item-children">
      {@render childrenStart?.()}
      {@render children?.()}
    </div>
  {/if}
</div>
