<script>
  import { createEventDispatcher } from 'svelte';

  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';
  import f7 from '../utils/f7';
  import hasSlots from '../utils/has-slots';

  const dispatch = createEventDispatcher();

  let className = undefined;
  export { className as class };

  export let bold = false;
  export let close = true;

  let el;

  // eslint-disable-next-line
  $: hasMediaSlots = hasSlots(arguments, 'media');

  $: classes = Utils.classNames(
    className,
    {
      'actions-button': true,
      'actions-button-bold': bold,
    },
    Mixins.colorClasses($$props),
  );

  function onClick() {
    if (close && f7.instance) {
      const dom7 = f7.instance.$;
      f7.instance.actions.close(dom7(el).parents('.actions-modal'));
    }
    dispatch('click');
    if (typeof $$props.onClick === 'function') $$props.onClick();
  }

</script>

<div
  class={classes}
  on:click={onClick}
  bind:this={el}
  {...restProps($$restProps)}
>
  {#if hasMediaSlots}
    <div class="actions-button-media">
      <slot name="media" />
    </div>
  {/if}
  <div class="actions-button-text">
    <slot />
  </div>
</div>
