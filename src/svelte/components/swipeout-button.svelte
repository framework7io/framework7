<script>
  import { createEventDispatcher } from 'svelte';

  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let text = undefined;
  export let confirmTitle = undefined;
  export let confirmText = undefined;
  export let overswipe = undefined;
  export let close = undefined;
  let deleteProp = undefined;
  export { deleteProp as delete };
  export let href = undefined;

  $: classes = Utils.classNames(
    className,
    {
      'swipeout-overswipe': overswipe,
      'swipeout-delete': deleteProp,
      'swipeout-close': close,
    },
    Mixins.colorClasses($$props),
  );

  function onClick() {
    dispatch('click');
    if (typeof $$props.onClick === 'function') $$props.onClick();
  }

</script>

<a
  href={href || '#'}
  id={id}
  style={style}
  data-confirm={confirmText || undefined}
  data-confirm-title={confirmTitle || undefined}
  class={classes}
  on:click={onClick}
>
  {Utils.text(text)}
  <slot></slot>
</a>
