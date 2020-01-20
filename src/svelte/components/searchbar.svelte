<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let noShadow = false;
  export let noHairline = false;
  export let form = true;
  export let placeholder = 'Search';
  export let disableButton = true;
  export let disableButtonText = 'Cancel';
  export let clearButton = true;
  // Input Value
  export let value = undefined;

  // SB Params
  export let inputEvents = 'change input compositionend';
  export let expandable = false;
  export let inline = false;
  export let searchContainer = undefined;
  export let searchIn = '.item-title';
  export let searchItem = 'li';
  export let searchGroup = '.list-group';
  export let searchGroupTitle = '.item-divider, .list-group-title';
  export let foundEl = '.searchbar-found';
  export let notFoundEl = '.searchbar-not-found';
  export let backdrop = undefined;
  export let backdropEl = undefined;
  export let hideOnEnableEl = '.searchbar-hide-on-enable';
  export let hideOnSearchEl = '.searchbar-hide-on-search';
  export let ignore = '.searchbar-ignore';
  export let customSearch = false;
  export let removeDiacritics = false;
  export let hideDividers = true;
  export let hideGroups = true;
  export let init = true;

  export let f7Slot = 'fixed';

  let el;
  let f7Searchbar;

  export function instance() {
    return f7Searchbar;
  }
  export function search(query) {
    if (!f7Searchbar) return undefined;
    return f7Searchbar.search(query);
  }
  export function enable() {
    if (!f7Searchbar) return undefined;
    return f7Searchbar.enable();
  }
  export function disable() {
    if (!f7Searchbar) return undefined;
    return f7Searchbar.disable();
  }
  export function toggle() {
    if (!f7Searchbar) return undefined;
    return f7Searchbar.toggle();
  }
  export function clear() {
    if (!f7Searchbar) return undefined;
    return f7Searchbar.clear();
  }

  $: classes = Utils.classNames(
    className,
    'searchbar',
    {
      'searchbar-inline': inline,
      'no-shadow': noShadow,
      'no-hairline': noHairline,
      'searchbar-expandable': expandable,
    },
    Mixins.colorClasses($$props),
  );

  function onChange(event) {
    dispatch('change', [event]);
    if (typeof $$props.onChange === 'function') $$props.onChange(event);
  }

  function onInput(event) {
    dispatch('input', [event]);
    if (typeof $$props.onInput === 'function') $$props.onInput(event);
  }

  function onFocus(event) {
    dispatch('focus', [event]);
    if (typeof $$props.onFocus === 'function') $$props.onFocus(event);
  }

  function onBlur(event) {
    dispatch('blur', [event]);
    if (typeof $$props.onBlur === 'function') $$props.onBlur(event);
  }

  function onSubmit(event) {
    dispatch('submit', [event]);
    if (typeof $$props.onSubmit === 'function') $$props.onSubmit(event);
  }

  function onClearButtonClick(event) {
    dispatch('click:clear', [event]);
  }

  function onDisableButtonClick(event) {
    dispatch('click:disable', [event]);
  }

  onMount(() => {
    if (!init) return;
    f7.ready(() => {
      const params = Utils.noUndefinedProps({
        el,
        inputEvents,
        searchContainer,
        searchIn,
        searchItem,
        searchGroup,
        searchGroupTitle,
        hideOnEnableEl,
        hideOnSearchEl,
        foundEl,
        notFoundEl,
        backdrop,
        backdropEl,
        disableButton,
        ignore,
        customSearch,
        removeDiacritics,
        hideDividers,
        hideGroups,
        expandable,
        inline,
        on: {
          search(searchbar, query, previousQuery) {
            dispatch('searchbarSearch', [searchbar, query, previousQuery]);
            if (typeof $$props.onSearchbarSearch === 'function') $$props.onSearchbarSearch(searchbar, query, previousQuery);
          },
          clear(searchbar, previousQuery) {
            dispatch('searchbarClear', [searchbar, previousQuery]);
            if (typeof $$props.onSearchbarClear === 'function') $$props.onSearchbarClear(searchbar, previousQuery);
          },
          enable(searchbar) {
            dispatch('searchbarEnable', [searchbar]);
            if (typeof $$props.onSearchbarEnable === 'function') $$props.onSearchbarEnable(searchbar);
          },
          disable(searchbar) {
            dispatch('searchbarDisable', [searchbar]);
            if (typeof $$props.onSearchbarDisable === 'function') $$props.onSearchbarDisable(searchbar);
          },
        },
      });
      Object.keys(params).forEach((key) => {
        if (params[key] === '') {
          delete params[key];
        }
      });
      f7Searchbar = f7.instance.searchbar.create(params);
    });
  });

  onDestroy(() => {
    if (f7Searchbar && f7Searchbar.destroy) {
      f7Searchbar.destroy();
    }
  });
</script>
{#if form}
  <form bind:this={el} id={id} style={style} class={classes} on:submit={onSubmit} data-f7-slot={f7Slot}>
    <slot name="before-inner" />
    <div class="searchbar-inner">
      <slot name="inner-start" />
      <div class="searchbar-input-wrap">
        <slot name="input-wrap-start" />
        <input
          value={typeof value === 'undefined' ? '' : value}
          placeholder={placeholder}
          type="search"
          on:input={onInput}
          on:change={onChange}
          on:focus={onFocus}
          on:blur={onBlur}
        />
        <i class="searchbar-icon" />
        {#if clearButton}
          <span on:click={onClearButtonClick} class="input-clear-button" />
        {/if}
        <slot name="input-wrap-end" />
      </div>
      {#if disableButton}
        <span on:click={onDisableButtonClick} class="searchbar-disable-button">{disableButtonText}</span>
      {/if}
      <slot name="inner-end" />
      <slot />
    </div>
    <slot name="after-inner" />
  </form>
{:else}
  <div bind:this={el} id={id} style={style} class={classes} data-f7-slot={f7Slot}>
    <slot name="before-inner" />
    <div class="searchbar-inner">
      <slot name="inner-start" />
      <div class="searchbar-input-wrap">
        <slot name="input-wrap-start" />
        <input
          value={typeof value === 'undefined' ? '' : value}
          placeholder={placeholder}
          type="search"
          on:input={onInput}
          on:change={onChange}
          on:focus={onFocus}
          on:blur={onBlur}
        />
        <i class="searchbar-icon" />
        {#if clearButton}
          <span on:click={onClearButtonClick} class="input-clear-button" />
        {/if}
        <slot name="input-wrap-end" />
      </div>
      {#if disableButton}
        <span on:click={onDisableButtonClick} class="searchbar-disable-button">{disableButtonText}</span>
      {/if}
      <slot name="inner-end" />
      <slot />
    </div>
    <slot name="after-inner" />
  </div>
{/if}
