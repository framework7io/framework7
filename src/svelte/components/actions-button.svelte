<script>
  import { createEventDispatcher } from 'svelte';

  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7 } from '../shared/f7';
  import { hasSlots } from '../shared/has-slots';

  const dispatch = createEventDispatcher();

  let className = undefined;
  export { className as class };

  export let bold = false;
  export let close = true;

  let el;

  // eslint-disable-next-line
  $: hasMediaSlots = hasSlots(arguments, 'media');

  $: classes = classNames(
    className,
    {
      'actions-button': true,
      'actions-button-bold': bold,
    },
    colorClasses($$props),
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

<div class={classes} on:click={onClick} bind:this={el} {...restProps($$restProps)}>
  {#if hasMediaSlots}
    <div class="actions-button-media">
      <slot name="media" />
    </div>
  {/if}
  <div class="actions-button-text">
    <slot />
  </div>
</div>
