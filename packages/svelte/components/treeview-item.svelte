<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';
  import hasSlots from '../utils/has-slots';

  import Icon from './icon.svelte';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

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

  $: classes = Utils.classNames(
    className,
    'treeview-item',
    {
      'treeview-item-opened': opened,
      'treeview-load-children': loadChildren,
    },
    Mixins.colorClasses($$props),
  );

  $: itemRootClasses = Utils.classNames(
    'treeview-item-root',
    {
      'treeview-item-selectable': selectable,
      'treeview-item-selected': selected,
      'treeview-item-toggle': itemToggle,
    },
    Mixins.linkRouterClasses($$props),
    Mixins.linkActionsClasses($$props),
  );

  $: itemRootAttrs = Utils.extend(
    {
      href: link === true ? '#' : link || undefined,
    },
    Mixins.linkRouterAttrs($$props),
    Mixins.linkActionsAttrs($$props),
  );

  /* eslint-disable no-undef */
  $: hasChildren = hasSlots(arguments, 'default')
    || hasSlots(arguments, 'children')
    || hasSlots(arguments, 'children-start');
  /* eslint-enable no-undef */

  $: needToggle = typeof toggle === 'undefined' ? hasChildren : toggle;

  $: hasIcon = $$props.icon || $$props.iconMaterial || $$props.iconF7 || $$props.iconMd || $$props.iconIos || $$props.iconAurora;

  $: treeviewRootTag = link || link === '' ? 'a' : 'div';

  function onClick(e) {
    dispatch('click', [e]);
    if (typeof $$props.onClick === 'function') $$props.onClick(e);
  }
  function onOpen(itemEl) {
    if (itemEl !== el) return;
    dispatch('treeviewOpen', [el]);
    if (typeof $$props.onTreeviewOpen === 'function') $$props.onTreeviewOpen(el);
  }
  function onClose(itemEl) {
    if (itemEl !== el) return;
    dispatch('treeviewClose', [el]);
    if (typeof $$props.onTreeviewClose === 'function') $$props.onTreeviewClose(el);
  }
  function onLoadChildren(itemEl, done) {
    if (itemEl !== el) return;
    dispatch('treeviewLoadChildren', [el, done]);
    if (typeof $$props.onTreeviewLoadChildren === 'function') $$props.onTreeviewLoadChildren(el, done);
  }

  onMount(() => {
    if (!el) return;
    f7.ready(() => {
      f7.instance.on('treeviewOpen', onOpen);
      f7.instance.on('treeviewClose', onClose);
      f7.instance.on('treeviewLoadChildren', onLoadChildren);
    });
  });

  onDestroy(() => {
    if (!el || !f7.instance) return;
    f7.instance.off('treeviewOpen', onOpen);
    f7.instance.off('treeviewClose', onClose);
    f7.instance.off('treeviewLoadChildren', onLoadChildren);
  });
</script>
<!-- svelte-ignore a11y-missing-attribute -->
<div bind:this={el} id={id} style={style} class={classes}>
  {#if treeviewRootTag === 'div'}
    <div
      on:click={onClick}
      class={itemRootClasses}
      {...itemRootAttrs}
    >
      <slot name="root-start" />
      {#if needToggle}
        <div class="treeview-toggle"></div>
      {/if}
      <div class="treeview-item-content">
        <slot name="content-start" />
        {#if hasIcon}
          <Icon
            material={$$props.iconMaterial}
            f7={$$props.iconF7}
            icon={$$props.icon}
            md={$$props.iconMd}
            ios={$$props.iconIos}
            aurora={$$props.iconAurora}
            color={$$props.iconColor}
            size={$$props.iconSize}
          />
        {/if}
        <slot name="media" />
        <div class="treeview-item-label">
          <slot name="label-start" />
          {Utils.text(label)}
          <slot name="label" />
        </div>
        <slot name="content" />
        <slot name="content-end" />
      </div>
      <slot name="root" />
      <slot name="root-end" />
    </div>
  {:else}
    <a
      on:click={onClick}
      class={itemRootClasses}
      {...itemRootAttrs}
    >
      <slot name="root-start" />
      {#if needToggle}
        <div class="treeview-toggle"></div>
      {/if}
      <div class="treeview-item-content">
        <slot name="content-start" />
        {#if hasIcon}
          <Icon
            material={$$props.iconMaterial}
            f7={$$props.iconF7}
            icon={$$props.icon}
            md={$$props.iconMd}
            ios={$$props.iconIos}
            aurora={$$props.iconAurora}
            color={$$props.iconColor}
            size={$$props.iconSize}
          />
        {/if}
        <slot name="media" />
        <div class="treeview-item-label">
          <slot name="label-start" />
          {Utils.text(label)}
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
