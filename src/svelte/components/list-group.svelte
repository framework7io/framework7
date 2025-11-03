<script>
  import { setContext, getContext } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  let {
    class: className,
    mediaList = undefined,
    sortable = undefined,
    sortableOpposite = undefined,
    sortableTapHold = false,
    sortableMoveElements = undefined,
    simpleList = undefined,
    children,
    ...restProps
  } = $props();

  const ListContext =
    getContext('ListContext') ||
    (() => ({
      value: {},
    }));

  setContext('ListContext', () => ({
    value: {
      listIsMedia: mediaList || ListContext().value.listIsMedia,
      listIsSimple: simpleList || ListContext().value.listIsSimple,
      listIsSortable: sortable || ListContext().value.listIsSortable,
      listIsSortableOpposite: sortableOpposite || ListContext().value.listIsSortableOpposite,
    },
  }));

  const classes = $derived(
    classNames(
      className,
      'list-group',
      {
        'media-list': mediaList,
        sortable,
        'sortable-tap-hold': sortableTapHold,
        'sortable-opposite': sortableOpposite,
      },
      colorClasses(restProps),
    ),
  );
</script>

<div
  class={classes}
  data-sortable-move-elements={typeof sortableMoveElements !== 'undefined'
    ? sortableMoveElements.toString()
    : undefined}
  {...restProps}
>
  <ul>
    {@render children?.()}
  </ul>
</div>
