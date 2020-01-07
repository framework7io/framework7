<script>
  import { createEventDispatcher } from 'svelte';

  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';
  import hasSlots from '../utils/has-slots';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

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
  id={id}
  style={style}
  class={classes}
  on:click={onClick}
  bind:this={el}
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
