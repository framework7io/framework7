<script>
  import { onMount, onDestroy, setContext } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, extend } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';
  import { useTab } from '../shared/use-tab.js';
  let {
    class: className,
    ul = true,
    inset = false,
    insetIos = false,
    insetMd = false,
    xsmallInset = false,
    xsmallInsetIos = false,
    xsmallInsetMd = false,
    smallInset = false,
    smallInsetIos = false,
    smallInsetMd = false,
    mediumInset = false,
    mediumInsetIos = false,
    mediumInsetMd = false,
    largeInset = false,
    largeInsetIos = false,
    largeInsetMd = false,
    xlargeInset = false,
    xlargeInsetIos = false,
    xlargeInsetMd = false,
    strong = false,
    strongIos = false,
    strongMd = false,
    outline = false,
    outlineIos = false,
    outlineMd = false,
    dividers = false,
    dividersIos = false,
    dividersMd = false,
    mediaList = false,
    sortable = false,
    sortableTapHold = false,
    sortableEnabled = false,
    sortableMoveElements = undefined,
    sortableOpposite = false,
    accordionList = false,
    accordionOpposite = false,
    contactsList = false,
    simpleList = false,
    linksList = false,
    menuList = false,
    noChevron = false,
    chevronCenter = false,
    tab = false,
    tabActive = false,
    form = false,
    formStoreData = false,
    virtualList = false,
    virtualListParams = undefined,
    children,
    list,
    beforeList,
    afterList,
    ...restProps
  } = $props();

  let el = $state(null);
  let f7VirtualList;

  export function virtualListInstance() {
    return f7VirtualList;
  }

  // eslint-disable-next-line
  const hasUlSlots = $derived(children || list);

  const classes = $derived(
    classNames(
      className,
      'list',
      {
        inset,
        'inset-ios': insetIos,
        'inset-md': insetMd,
        'xsmall-inset': xsmallInset,
        'xsmall-inset-ios': xsmallInsetIos,
        'xsmall-inset-md': xsmallInsetMd,
        'small-inset': smallInset,
        'small-inset-ios': smallInsetIos,
        'small-inset-md': smallInsetMd,
        'medium-inset': mediumInset,
        'medium-inset-ios': mediumInsetIos,
        'medium-inset-md': mediumInsetMd,
        'large-inset': largeInset,
        'large-inset-ios': largeInsetIos,
        'large-inset-md': largeInsetMd,
        'xlarge-inset': xlargeInset,
        'xlarge-inset-ios': xlargeInsetIos,
        'xlarge-inset-md': xlargeInsetMd,
        'list-strong': strong,
        'list-strong-ios': strongIos,
        'list-strong-md': strongMd,
        'list-outline': outline,
        'list-outline-ios': outlineIos,
        'list-outline-md': outlineMd,
        'list-dividers': dividers,
        'list-dividers-ios': dividersIos,
        'list-dividers-md': dividersMd,
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
        'form-store-data': formStoreData,
        'no-chevron': noChevron,
        'chevron-center': chevronCenter,
      },
      colorClasses(restProps),
    ),
  );

  setContext('ListContext', () => ({
    value: {
      listIsMedia: mediaList,
      listIsSimple: simpleList,
      listIsSortable: sortable,
      listIsSortableOpposite: sortableOpposite,
    },
  }));

  function onSubmit(event) {
    restProps.onSubmit?.(event);
    restProps.onSubmit?.(event);
  }
  function onSortableEnable(sortableEl) {
    if (sortableEl !== el) return;
    restProps.onSortableEnable?.(sortableEl);
    restProps.onSortableEnable?.(sortableEl);
  }
  function onSortableDisable(sortableEl) {
    if (sortableEl !== el) return;
    restProps.onSortableDisable?.(sortableEl);
    restProps.onsortabledisable?.(sortableEl);
  }
  function onSortableSort(listItemEl, sortData, listEl) {
    if (listEl !== el) return;
    restProps.onSortableSort?.(sortData);
    restProps.onsortablesort?.(sortData);
  }
  function onSortableMove(listItemEl, listEl) {
    if (listEl !== el) return;
    restProps.onSortableMove?.(listItemEl, listEl);
    restProps.onsortablemove?.(listItemEl, listEl);
  }

  useTab(() => el, restProps);

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
                restProps.onVirtualItemBeforeInsert?.(vl, itemEl, item);
                restProps.onvirtualitembeforeinsert?.(vl, itemEl, item);
              },
              beforeClear(fragment) {
                const vl = this;
                restProps.onVirtualBeforeClear?.(vl, fragment);
                restProps.onvirtualbeforeclear?.(vl, fragment);
              },
              itemsBeforeInsert(fragment) {
                const vl = this;
                restProps.onVirtualItemsBeforeInsert?.(vl, fragment);
                restProps.onvirtualitemsbeforeinsert?.(vl, fragment);
              },
              itemsAfterInsert(fragment) {
                const vl = this;
                restProps.onVirtualItemsAfterInsert?.(vl, fragment);
                restProps.onvirtualitemsafterinsert?.(vl, fragment);
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
    onsubmit={onSubmit}
    {...restProps}
  >
    {@render beforeList?.()}
    {#if hasUlSlots && ul}
      <ul>
        {@render list?.()}
        {@render children?.()}
      </ul>
    {:else}
      {@render children?.()}
    {/if}
    {@render afterList?.()}
  </form>
{:else}
  <div
    bind:this={el}
    class={classes}
    data-sortable-move-elements={typeof sortableMoveElements !== 'undefined'
      ? sortableMoveElements.toString()
      : undefined}
    {...restProps}
  >
    {@render beforeList?.()}
    {#if hasUlSlots && ul}
      <ul>
        {@render list?.()}
        {@render children?.()}
      </ul>
    {:else}
      {@render children?.()}
    {/if}
    {@render afterList?.()}
  </div>
{/if}
