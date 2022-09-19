<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { app, f7ready } from '../shared/f7.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let init = true;
  export let listEl = undefined;
  export let indexes = 'auto';
  export let scrollList = true;
  export let label = false;
  export let iosItemHeight = 14;
  export let mdItemHeight = 14;

  export let f7Slot = 'fixed';

  let el;
  let f7ListIndex;

  export function instance() {
    return f7ListIndex;
  }

  $: classes = classNames(className, 'list-index', colorClasses($$props));

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

  $: watchIndexes(indexes);

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
            emit('listIndexSelect', [itemContent, itemIndex]);
          },
        },
      });
    });
  });

  onDestroy(() => {
    if (f7ListIndex && f7ListIndex.destroy) f7ListIndex.destroy();
  });
</script>

<div bind:this={el} class={classes} data-f7-slot={f7Slot} {...restProps($$restProps)}>
  <slot listIndex={f7ListIndex} />
</div>
