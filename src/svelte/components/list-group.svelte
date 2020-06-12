<script>
  import { setContext } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';

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

  $: classes = Utils.classNames(
    className,
    'list-group',
    {
      'media-list': mediaList,
      sortable,
      'sortable-tap-hold': sortableTapHold,
      'sortable-opposite': sortableOpposite,
    },
    Mixins.colorClasses($$props),
  );
</script>

<div class={classes} data-sortable-move-elements={typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined} {...restProps($$restProps)}>
  <ul>
    <slot />
  </ul>
</div>
