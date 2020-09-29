<script>
  import { setContext } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';

  let className = undefined;
  export { className as class };

  export let mediaList = undefined;
  export let sortable = undefined;
  export let sortableOpposite = undefined;
  export let sortableTapHold = false;
  export let sortableMoveElements = undefined;

  $: if (typeof mediaList !== 'undefined') {
    setContext('f7ListMedia', mediaList);
  }

  $: if (typeof sortable !== 'undefined') {
    setContext('f7ListSortable', sortable);
  }

  $: if (typeof sortable !== 'undefined' && typeof sortableOpposite !== 'undefined') {
    setContext('f7ListSortableOpposite', sortable);
  }

  $: classes = classNames(
    className,
    'list-group',
    {
      'media-list': mediaList,
      sortable,
      'sortable-tap-hold': sortableTapHold,
      'sortable-opposite': sortableOpposite,
    },
    colorClasses($$props),
  );
</script>

<div
  class={classes}
  data-sortable-move-elements={typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined}
  {...restProps($$restProps)}>
  <ul>
    <slot />
  </ul>
</div>
