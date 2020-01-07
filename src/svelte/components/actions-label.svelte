<script>
  import { createEventDispatcher } from 'svelte';

  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let bold = false;

  $: classes = Utils.classNames(
    className,
    'actions-label',
    {
      'actions-button-bold': bold,
    },
    Mixins.colorClasses($$props),
  );

  function onClick() {
    dispatch('click');
    if (typeof $$props.onClick === 'function') $$props.onClick();
  }
</script>

<div
  id={id}
  style={style}
  class={classes}
  on:click={onClick}
>
  <slot />
</div>
