<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7, f7ready } from '../shared/f7';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let noGap = false;
  export let tag = 'div';
  export let resizable = false;
  export let resizableFixed = false;
  export let resizableAbsolute = false;
  export let resizableHandler = true;

  let el;

  $: classes = classNames(
    className,
    'row',
    {
      'no-gap': noGap,
      resizable,
      'resizable-fixed': resizableFixed,
      'resizable-absolute': resizableAbsolute,
    },
    colorClasses($$props),
  );

  function onClick() {
    emit('click');
  }
  function onResize(targetEl) {
    if (el !== targetEl) return;
    emit('gridResize');
  }

  onMount(() => {
    f7ready(() => {
      f7.on('gridResize', onResize);
    });
  });
  onDestroy(() => {
    if (!f7) return;
    f7.off('gridResize', onResize);
  });
</script>

{#if tag === 'div'}
  <div class={classes} bind:this={el} on:click={onClick} {...restProps($$restProps)}>
    <slot />
    {#if resizable && resizableHandler}<span class="resize-handler" />{/if}
  </div>
{:else if tag === 'p'}
  <p class={classes} bind:this={el} on:click={onClick} {...restProps($$restProps)}>
    <slot />
    {#if resizable && resizableHandler}<span class="resize-handler" />{/if}
  </p>
{/if}
