<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { setReactiveContext } from '../shared/set-reactive-context.js';
  import { getReactiveContext } from '../shared/get-reactive-context.js';

  let className = undefined;
  export { className as class };

  export let mediaList = undefined;
  export let sortable = undefined;
  export let sortableOpposite = undefined;
  export let sortableTapHold = false;
  export let sortableMoveElements = undefined;
  export let simpleList = undefined;

  let ListContext =
    getReactiveContext('ListContext', (value) => {
      ListContext = value || {};
    }) || {};

  setReactiveContext('ListContext', () => ({
    listIsMedia: mediaList || ListContext.listIsMedia,
    listIsSimple: simpleList || ListContext.listIsSimple,
    listIsSortable: sortable || ListContext.listIsSortable,
    listIsSortableOpposite: sortableOpposite || ListContext.listIsSortableOpposite,
  }));

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
  data-sortable-move-elements={typeof sortableMoveElements !== 'undefined'
    ? sortableMoveElements.toString()
    : undefined}
  {...restProps($$restProps)}
>
  <ul>
    <slot />
  </ul>
</div>
