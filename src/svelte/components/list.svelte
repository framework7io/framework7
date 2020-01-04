<script>
  import { createEventDispatcher, onMount, onDestroy, setContext } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';
  import hasSlots from '../utils/has-slots';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

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

  setContext('f7ListMedia', mediaList);
  setContext('f7ListSortable', sortable);
  setContext('f7ListSortableOpposite', sortableOpposite);
  setContext('f7ListSimple', simpleList);

  // eslint-disable-next-line
  $: hasUlSlots = hasSlots(arguments, 'default') || hasSlots(arguments, 'list');

  $: classes = Utils.classNames(
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
    Mixins.colorClasses($$props),
  );

  function onSubmit(event) {
    dispatch('submit', [event]);
  }
  function onSortableEnable(sortableEl) {
    if (sortableEl !== el) return;
    dispatch('sortable:enable');
  }
  function onSortableDisable(sortableEl) {
    if (sortableEl !== el) return;
    dispatch('sortable:disable');
  }
  function onSortableSort(sortableEl, sortData, listEl) {
    if (sortableEl !== listEl) return;
    dispatch('sortable:sort', [sortData]);
  }
  function onTabShow(tabEl) {
    if (tabEl !== el) return;
    dispatch('tab:show');
  }
  function onTabHide(tabEl) {
    if (tabEl !== el) return;
    dispatch('tab:hide');
  }

  onMount(() => {
    f7.instance.on('sortableEnable', onSortableEnable);
    f7.instance.on('sortableDisable', onSortableDisable);
    f7.instance.on('sortableSort', onSortableSort);
    f7.instance.on('tabShow', onTabShow);
    f7.instance.on('tabHide', onTabHide);

    if (!virtualList) return;
    const vlParams = virtualListParams || {};
    if (!vlParams.renderItem && !vlParams.itemTemplate && !vlParams.renderExternal) return;

    f7VirtualList = f7.instance.virtualList.create(Utils.extend(
      {
        el,
        on: {
          itemBeforeInsert(itemEl, item) {
            const vl = this;
            dispatch('virtual:itembeforeinsert', [vl, itemEl, item]);
          },
          beforeClear(fragment) {
            const vl = this;
            dispatch('virtual:beforeclear', [vl, fragment]);
          },
          itemsBeforeInsert(fragment) {
            const vl = this;
            dispatch('virtual:itemsbeforeinsert', [vl, fragment]);
          },
          itemsAfterInsert(fragment) {
            const vl = this;
            dispatch('virtual:itemsafterinsert', [vl, fragment]);
          },
        },
      },
      vlParams,
    ));
  });

  onDestroy(() => {
    f7.instance.off('sortableEnable', onSortableEnable);
    f7.instance.off('sortableDisable', onSortableDisable);
    f7.instance.off('sortableSort', onSortableSort);
    f7.instance.off('tabShow', onTabShow);
    f7.instance.off('tabHide', onTabHide);

    if (f7VirtualList && f7VirtualList.destroy) f7VirtualList.destroy();
  });

</script>
<!-- svelte-ignore a11y-missing-attribute -->
{#if form}
  <form
    id={id}
    bind:this={el}
    style={style}
    class={classes}
    data-sortable-move-elements={typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined}
    on:submit={onSubmit}
  >
    <slot name="before-list" />
    {#if hasUlSlots}
    <ul>
      <slot name="list" />
      <slot />
    </ul>
    {/if}
    <slot name="after-list" />
  </form>
{:else}
  <div
    id={id}
    bind:this={el}
    style={style}
    class={classes}
    data-sortable-move-elements={typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined}
  >
    <slot name="before-list" />
    {#if hasUlSlots}
    <ul>
      <slot name="list" />
      <slot />
    </ul>
    {/if}
    <slot name="after-list" />
  </div>
{/if}
