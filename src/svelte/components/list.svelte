<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, extend, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { app, f7ready } from '../shared/f7.js';
  import { useTab } from '../shared/use-tab.js';
  import { setReactiveContext } from '../shared/set-reactive-context.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let ul = true;

  export let inset = false;
  export let xsmallInset = false;
  export let smallInset = false;
  export let mediumInset = false;
  export let largeInset = false;
  export let xlargeInset = false;
  export let mediaList = false;
  export let sortable = false;
  export let sortableTapHold = false;
  export let sortableEnabled = false;
  export let sortableMoveElements = undefined;
  export let sortableOpposite = false;
  export let accordionList = false;
  export let accordionOpposite = false;
  export let contactsList = false;
  export let simpleList = false;
  export let linksList = false;
  export let menuList = false;

  export let noHairlines = false;
  export let noHairlinesBetween = false;
  export let noHairlinesMd = false;
  export let noHairlinesBetweenMd = false;
  export let noHairlinesIos = false;
  export let noHairlinesBetweenIos = false;
  export let noHairlinesAurora = false;
  export let noHairlinesBetweenAurora = false;

  // Links Chevron (Arrow) Icon
  export let noChevron = false;
  export let chevronCenter = false;

  // Tab
  export let tab = false;
  export let tabActive = false;

  // Form
  export let form = false;
  export let formStoreData = false;
  export let inlineLabels = false;

  // Virtual List
  export let virtualList = false;
  export let virtualListParams = undefined;

  let el;
  let f7VirtualList;

  export function virtualListInstance() {
    return f7VirtualList;
  }

  // eslint-disable-next-line
  $: hasUlSlots = $$slots.default || $$slots.list;

  $: classes = classNames(
    className,
    'list',
    {
      inset,
      'xsmall-inset': xsmallInset,
      'small-inset': smallInset,
      'medium-inset': mediumInset,
      'large-inset': largeInset,
      'xlarge-inset': xlargeInset,
      'media-list': mediaList,
      'simple-list': simpleList,
      'links-list': linksList,
      'menu-list': menuList,
      sortable,
      'sortable-tap-hold': sortableTapHold,
      'sortable-enabled': sortableEnabled,
      'sortable-opposite': sortableOpposite,
      'accordion-list': accordionList,
      'accordion-opposite': accordionOpposite,
      'contacts-list': contactsList,
      'virtual-list': virtualList,
      tab,
      'tab-active': tabActive,
      'no-hairlines': noHairlines,
      'no-hairlines-md': noHairlinesMd,
      'no-hairlines-ios': noHairlinesIos,
      'no-hairlines-aurora': noHairlinesAurora,
      'no-hairlines-between': noHairlinesBetween,
      'no-hairlines-between-md': noHairlinesBetweenMd,
      'no-hairlines-between-ios': noHairlinesBetweenIos,
      'no-hairlines-between-aurora': noHairlinesBetweenAurora,
      'form-store-data': formStoreData,
      'inline-labels': inlineLabels,
      'no-chevron': noChevron,
      'chevron-center': chevronCenter,
    },
    colorClasses($$props),
  );

  setReactiveContext('ListContext', () => ({
    listIsMedia: mediaList,
    listIsSimple: simpleList,
    listIsSortable: sortable,
    listIsSortableOpposite: sortableOpposite,
  }));

  function onSubmit(event) {
    emit('submit', [event]);
  }
  function onSortableEnable(sortableEl) {
    if (sortableEl !== el) return;
    emit('sortableEnable');
  }
  function onSortableDisable(sortableEl) {
    if (sortableEl !== el) return;
    emit('sortableDisable');
  }
  function onSortableSort(listItemEl, sortData, listEl) {
    if (listEl !== el) return;
    emit('sortableSort', [sortData]);
  }
  function onSortableMove(listItemEl, listEl) {
    if (listEl !== el) return;
    emit('sortableMove', [listItemEl, listEl]);
  }

  useTab(() => el, emit);

  onMount(() => {
    f7ready(() => {
      app.f7.on('sortableEnable', onSortableEnable);
      app.f7.on('sortableDisable', onSortableDisable);
      app.f7.on('sortableSort', onSortableSort);
      app.f7.on('sortableMove', onSortableMove);

      if (!virtualList) return;
      const vlParams = virtualListParams || {};
      if (!vlParams.renderItem && !vlParams.renderExternal) return;

      f7VirtualList = app.f7.virtualList.create(
        extend(
          {
            el,
            on: {
              itemBeforeInsert(itemEl, item) {
                const vl = this;
                emit('virtualItemBeforeInsert', [vl, itemEl, item]);
              },
              beforeClear(fragment) {
                const vl = this;
                emit('virtualBeforeClear', [vl, fragment]);
              },
              itemsBeforeInsert(fragment) {
                const vl = this;
                emit('virtualItemsBeforeInsert', [vl, fragment]);
              },
              itemsAfterInsert(fragment) {
                const vl = this;
                emit('virtualItemsAfterInsert', [vl, fragment]);
              },
            },
          },
          vlParams,
        ),
      );
    });
  });

  onDestroy(() => {
    if (!app.f7) return;
    app.f7.off('sortableEnable', onSortableEnable);
    app.f7.off('sortableDisable', onSortableDisable);
    app.f7.off('sortableSort', onSortableSort);
    app.f7.off('sortableMove', onSortableMove);

    if (f7VirtualList && f7VirtualList.destroy) {
      f7VirtualList.destroy();
      f7VirtualList = null;
    }
  });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
{#if form}
  <form
    bind:this={el}
    class={classes}
    data-sortable-move-elements={typeof sortableMoveElements !== 'undefined'
      ? sortableMoveElements.toString()
      : undefined}
    on:submit={onSubmit}
    {...restProps($$restProps)}
  >
    <slot name="before-list" />
    {#if hasUlSlots && ul}
      <ul>
        <slot name="list" />
        <slot />
      </ul>
    {:else}
      <slot />
    {/if}
    <slot name="after-list" />
  </form>
{:else}
  <div
    bind:this={el}
    class={classes}
    data-sortable-move-elements={typeof sortableMoveElements !== 'undefined'
      ? sortableMoveElements.toString()
      : undefined}
    {...restProps($$restProps)}
  >
    <slot name="before-list" />
    {#if hasUlSlots && ul}
      <ul>
        <slot name="list" />
        <slot />
      </ul>
    {:else}
      <slot />
    {/if}
    <slot name="after-list" />
  </div>
{/if}
