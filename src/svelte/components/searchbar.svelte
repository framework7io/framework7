<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, noUndefinedProps } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';

  let {
    class: className,
    outline = true,
    form = true,
    placeholder = 'Search',
    autocomplete = undefined,
    autocorrect = undefined,
    autocapitalize = undefined,
    spellcheck = undefined,
    disableButton = true,
    disableButtonText = '',
    clearButton = true,
    value = undefined,
    inputEvents = 'change input compositionend',
    expandable = false,
    inline = false,
    searchContainer = undefined,
    searchIn = '.item-title',
    searchItem = 'li',
    searchGroup = '.list-group',
    searchGroupTitle = '.list-group-title',
    foundEl = '.searchbar-found',
    notFoundEl = '.searchbar-not-found',
    backdrop = undefined,
    backdropEl = undefined,
    hideOnEnableEl = '.searchbar-hide-on-enable',
    hideOnSearchEl = '.searchbar-hide-on-search',
    ignore = '.searchbar-ignore',
    customSearch = false,
    removeDiacritics = false,
    hideGroupTitles = true,
    hideGroups = true,
    init = true,
    f7Slot = 'fixed',
    beforeInner,
    innerStart,
    inputWrapStart,
    inputWrapEnd,
    innerEnd,
    afterInner,
    children,
    ...restProps
  } = $props();

  let el = $state(null);
  let f7Searchbar = $state(null);

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

  const classes = $derived(
    classNames(
      className,
      'searchbar',
      {
        'searchbar-inline': inline,
        'no-outline': !outline,
        'searchbar-expandable': expandable,
      },
      colorClasses(restProps),
    ),
  );

  function onChange(event) {
    restProps.onChange?.(event);
    restProps.onchange?.(event);
  }

  function onInput(event) {
    restProps.onInput?.(event);
    restProps.oninput?.(event);
    value = event.target.value;
  }

  function onFocus(event) {
    restProps.onFocus?.(event);
    restProps.onfocus?.(event);
  }

  function onBlur(event) {
    restProps.onBlur?.(event);
    restProps.onblur?.(event);
  }

  function onSubmit(event) {
    restProps.onSubmit?.(event);
    restProps.onsubmit?.(event);
  }

  function onClearButtonClick(event) {
    restProps.onClickClear?.(event);
    restProps.onclickclear?.(event);
  }

  function onDisableButtonClick(event) {
    restProps.onClickDisable?.(event);
    restProps.onclickdisable?.(event);
  }

  onMount(() => {
    if (!init) return;
    f7ready(() => {
      const params = noUndefinedProps({
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
        hideGroupTitles,
        hideGroups,
        expandable,
        inline,
        on: {
          search(searchbar, query, previousQuery) {
            restProps.onSearchbarSearch?.(searchbar, query, previousQuery);
            restProps.onsearchbarsearch?.(searchbar, query, previousQuery);
          },
          clear(searchbar, previousQuery) {
            restProps.onSearchbarClear?.(searchbar, previousQuery);
            restProps.onsearchbarclear?.(searchbar, previousQuery);
          },
          enable(searchbar) {
            restProps.onSearchbarEnable?.(searchbar);
            restProps.onsearchbarenable?.(searchbar);
          },
          disable(searchbar) {
            restProps.onSearchbarDisable?.(searchbar);
            restProps.onsearchbardisable?.(searchbar);
          },
        },
      });
      Object.keys(params).forEach((key) => {
        if (params[key] === '') {
          delete params[key];
        }
      });
      f7Searchbar = app.f7.searchbar.create(params);
    });
  });

  onDestroy(() => {
    if (f7Searchbar && f7Searchbar.destroy) {
      f7Searchbar.destroy();
      f7Searchbar = null;
    }
  });
</script>

{#if form}
  <form bind:this={el} class={classes} onsubmit={onSubmit} data-f7-slot={f7Slot} {...restProps}>
    {@render restProps.beforeInner?.(f7Searchbar)}
    <div class="searchbar-inner">
      {@render restProps.innerStart?.(f7Searchbar)}
      <div class="searchbar-input-wrap">
        {@render restProps.inputWrapStart?.(f7Searchbar)}
        <input
          value={typeof value === 'undefined' ? '' : value}
          {placeholder}
          {autocomplete}
          {autocorrect}
          {autocapitalize}
          {spellcheck}
          type="search"
          oninput={onInput}
          onchange={onChange}
          onfocus={onFocus}
          onblur={onBlur}
        />
        <i class="searchbar-icon"></i>
        {#if clearButton}<span onclick={onClearButtonClick} class="input-clear-button" />{/if}
        {@render restProps.inputWrapEnd?.(f7Searchbar)}
      </div>
      {#if disableButton}
        <span onclick={onDisableButtonClick} class="searchbar-disable-button">
          <i class="icon icon-close"></i>
          {#if disableButtonText}
            <span>{disableButtonText}</span>
          {/if}
        </span>
      {/if}
      {@render restProps.innerEnd?.(f7Searchbar)}
      {@render restProps.children?.(f7Searchbar)}
    </div>
    {@render restProps.afterInner?.(f7Searchbar)}
  </form>
{:else}
  <div bind:this={el} class={classes} data-f7-slot={f7Slot} {...restProps}>
    {@render restProps.beforeInner?.(f7Searchbar)}
    <div class="searchbar-inner">
      {@render restProps.innerStart?.(f7Searchbar)}
      <div class="searchbar-input-wrap">
        {@render restProps.inputWrapStart?.(f7Searchbar)}
        <input
          value={typeof value === 'undefined' ? '' : value}
          {placeholder}
          {autocomplete}
          {autocorrect}
          {autocapitalize}
          {spellcheck}
          type="search"
          oninput={onInput}
          onchange={onChange}
          onfocus={onFocus}
          onblur={onBlur}
        />
        <i class="searchbar-icon"></i>
        {#if clearButton}<span onclick={onClearButtonClick} class="input-clear-button" />{/if}
        {@render restProps.inputWrapEnd?.(f7Searchbar)}
      </div>
      {#if disableButton}
        <span onclick={onDisableButtonClick} class="searchbar-disable-button"
          >{disableButtonText}</span
        >
      {/if}
      {@render restProps.innerEnd?.(f7Searchbar)}
      {@render restProps.children?.(f7Searchbar)}
    </div>
    {@render restProps.afterInner?.(f7Searchbar)}
  </div>
{/if}
