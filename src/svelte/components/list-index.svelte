<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';

  let {
    class: className,
    init = true,
    listEl = undefined,
    indexes = 'auto',
    scrollList = true,
    label = false,
    iosItemHeight = 14,
    mdItemHeight = 14,
    f7Slot = 'fixed',
    children,
    ...restProps
  } = $props();

  let el = $state(null);
  let f7ListIndex = $state(null);

  export function instance() {
    return f7ListIndex;
  }

  const classes = $derived(classNames(className, 'list-index', colorClasses(restProps)));

  export function update() {
    if (!f7ListIndex) return;
    f7ListIndex.update();
  }

  export function scrollListToIndex(indexContent) {
    if (!f7ListIndex) return;
    f7ListIndex.scrollListToIndex(indexContent);
  }

  let initialWatched = false;
  function watchIndexes() {
    if (!initialWatched) {
      initialWatched = true;
      return;
    }
    if (!f7ListIndex) return;
    f7ListIndex.params.indexes = indexes;
    update();
  }

  $effect(() => watchIndexes(indexes));

  onMount(() => {
    if (!init || !el) return;
    f7ready(() => {
      f7ListIndex = app.f7.listIndex.create({
        el,
        listEl,
        indexes,
        iosItemHeight,
        mdItemHeight,
        scrollList,
        label,
        on: {
          select(index, itemContent, itemIndex) {
            restProps.onListIndexSelect?.([itemContent, itemIndex]);
            restProps.onlistindexselect?.([itemContent, itemIndex]);
          },
        },
      });
    });
  });

  onDestroy(() => {
    if (f7ListIndex && f7ListIndex.destroy) f7ListIndex.destroy();
  });
</script>

<div bind:this={el} class={classes} data-f7-slot={f7Slot} {...restProps}>
  {@render children?.(f7ListIndex)}
</div>
