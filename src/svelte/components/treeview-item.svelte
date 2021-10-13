<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import {
    colorClasses,
    routerAttrs,
    routerClasses,
    actionsClasses,
    actionsAttrs,
  } from '../shared/mixins.js';
  import { classNames, extend, plainText, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { app, f7ready } from '../shared/f7.js';
  import { useIcon } from '../shared/use-icon.js';

  import UseIcon from './use-icon.svelte';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let toggle = undefined;
  export let itemToggle = false;
  export let selectable = false;
  export let selected = false;
  export let opened = false;
  export let label = undefined;
  export let loadChildren = false;
  export let link = undefined;

  let el;

  $: classes = classNames(
    className,
    'treeview-item',
    {
      'treeview-item-opened': opened,
      'treeview-load-children': loadChildren,
    },
    colorClasses($$props),
  );

  $: itemRootClasses = classNames(
    'treeview-item-root',
    {
      'treeview-item-selectable': selectable,
      'treeview-item-selected': selected,
      'treeview-item-toggle': itemToggle,
    },
    routerClasses($$props),
    actionsClasses($$props),
  );

  $: itemRootAttrs = extend(
    {
      href: link === true ? '#' : link || undefined,
    },
    routerAttrs($$props),
    actionsAttrs($$props),
  );

  /* eslint-disable no-undef */
  $: hasChildren = $$slots.default || $$slots.children || $$slots['children-start'];
  /* eslint-enable no-undef */

  $: needToggle = typeof toggle === 'undefined' ? hasChildren : toggle;

  $: icon = useIcon($$props);

  $: treeviewRootTag = link || link === '' ? 'a' : 'div';

  function onClick(e) {
    emit('click', [e]);
  }
  function onOpen(itemEl) {
    if (itemEl !== el) return;
    emit('treeviewOpen', [el]);
  }
  function onClose(itemEl) {
    if (itemEl !== el) return;
    emit('treeviewClose', [el]);
  }
  function onLoadChildren(itemEl, done) {
    if (itemEl !== el) return;
    emit('treeviewLoadChildren', [el, done]);
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

<!-- svelte-ignore a11y-missing-attribute -->
<div bind:this={el} class={classes} {...restProps($$restProps)}>
  {#if treeviewRootTag === 'div'}
    <div on:click={onClick} class={itemRootClasses} {...itemRootAttrs}>
      <slot name="root-start" />
      {#if needToggle}
        <div class="treeview-toggle" />
      {/if}
      <div class="treeview-item-content">
        <slot name="content-start" />
        {#if icon}
          <UseIcon {icon} />
        {/if}
        <slot name="media" />
        <div class="treeview-item-label">
          <slot name="label-start" />
          {plainText(label)}
          <slot name="label" />
        </div>
        <slot name="content" />
        <slot name="content-end" />
      </div>
      <slot name="root" />
      <slot name="root-end" />
    </div>
  {:else}
    <a on:click={onClick} class={itemRootClasses} {...itemRootAttrs}>
      <slot name="root-start" />
      {#if needToggle}
        <div class="treeview-toggle" />
      {/if}
      <div class="treeview-item-content">
        <slot name="content-start" />
        {#if icon}
          <UseIcon {icon} />
        {/if}
        <slot name="media" />
        <div class="treeview-item-label">
          <slot name="label-start" />
          {plainText(label)}
          <slot name="label" />
        </div>
        <slot name="content" />
        <slot name="content-end" />
      </div>
      <slot name="root" />
      <slot name="root-end" />
    </a>
  {/if}
  {#if hasChildren}
    <div class="treeview-item-children">
      <slot name="children-start" />
      <slot />
      <slot name="children" />
    </div>
  {/if}
</div>
