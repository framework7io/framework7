<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7, f7ready } from '../shared/f7';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let tag = 'div';
  export let width = 'auto';
  export let xsmall = undefined;
  export let small = undefined;
  export let medium = undefined;
  export let large = undefined;
  export let xlarge = undefined;
  export let resizable = false;
  export let resizableFixed = false;
  export let resizableAbsolute = false;
  export let resizableHandler = true;

  let el;

  $: classes = classNames(
    className,
    {
      col: width === 'auto',
      [`col-${width}`]: width !== 'auto',
      [`xsmall-${xsmall}`]: xsmall,
      [`small-${small}`]: small,
      [`medium-${medium}`]: medium,
      [`large-${large}`]: large,
      [`xlarge-${xlarge}`]: xlarge,
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
{:else if tag === 'span'}
  <span class={classes} bind:this={el} on:click={onClick} {...restProps($$restProps)}>
    <slot />
    {#if resizable && resizableHandler}<span class="resize-handler" />{/if}
  </span>
{/if}
