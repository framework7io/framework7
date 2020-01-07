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

  export let init = true;
  export let listEl = undefined;
  export let indexes = 'auto';
  export let scrollList = true;
  export let label = false;
  export let iosItemHeight = 14;
  export let mdItemHeight = 14;
  export let auroraItemHeight = 14;

  export let f7Slot = 'fixed';

  let el;
  let f7ListIndex;

  export function instance() {
    return f7ListIndex;
  }

  $: classes = Utils.classNames(
    className,
    'list-index',
    Mixins.colorClasses($$props),
  );

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
    f7.ready(() => {
      f7ListIndex = f7.instance.listIndex.create({
        el,
        listEl,
        indexes,
        iosItemHeight,
        mdItemHeight,
        auroraItemHeight,
        scrollList,
        label,
        on: {
          select(index, itemContent, itemIndex) {
            dispatch('listIndexSelect', [itemContent, itemIndex]);
            if (typeof $$props.onListIndexSelect === 'function') $$props.onListIndexSelect(itemContent, itemIndex);
          },
        },
      });
    });
  });

  onDestroy(() => {
    if (f7ListIndex && f7ListIndex.destroy) f7ListIndex.destroy();
  });

</script>

<div bind:this={el} id={id} style={style} class={classes} data-f7-slot={f7Slot}>
  <slot />
</div>
