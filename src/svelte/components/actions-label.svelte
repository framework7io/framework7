<script>
  import { createEventDispatcher } from 'svelte';

  import Mixins from '../shared/mixins';
  import Utils from '../shared/utils';
  import restProps from '../shared/rest-props';

  const dispatch = createEventDispatcher();

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
  class={classes}
  on:click={onClick}
  {...restProps($$restProps)}
>
  <slot />
</div>
