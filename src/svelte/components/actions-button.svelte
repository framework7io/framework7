<script>
  import { createEventDispatcher } from 'svelte';

  import { colorClasses } from '../shared/mixins';
  import { classNames, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7 } from '../shared/f7';
  import { hasSlots } from '../shared/has-slots';

  const emit = createEmitter(createEventDispatcher, $$props);

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
    if (close && f7) {
      const dom7 = f7.$;
      f7.actions.close(dom7(el).parents('.actions-modal'));
    }
    emit('click');
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
