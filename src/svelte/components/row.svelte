<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let noGap = false;
  export let tag = 'div';
  export let resizable = false;
  export let resizableFixed = false;
  export let resizableAbsolute = false;
  export let resizableHandler = true;

  let el;

  $: classes = Utils.classNames(
    className,
    'row',
    {
      'no-gap': noGap,
      resizable,
      'resizable-fixed': resizableFixed,
      'resizable-absolute': resizableAbsolute,
    },
    Mixins.colorClasses($$props),
  );

  function onClick() {
    dispatch('click');
    if (typeof $$props.onClick === 'function') $$props.onClick();
  }
  function onResize(targetEl) {
    if (el !== targetEl) return;
    dispatch('gridResize');
    if (typeof $$props.onGridResize === 'function') $$props.onGridResize();
  }

  onMount(() => {
    f7.ready(() => {
      f7.instance.on('gridResize', onResize);
    });
  });
  onDestroy(() => {
    if (!f7.instance) return;
    f7.instance.off('gridResize', onResize);
  });
</script>
{#if tag === 'div'}
  <div
    id={id}
    style={style}
    class={classes}
    bind:this={el}
    on:click={onClick}
  >
    <slot />
    {#if resizable && resizableHandler}
      <span class="resize-handler"></span>
    {/if}
  </div>
{:else if tag === 'p'}
  <p
    id={id}
    style={style}
    class={classes}
    bind:this={el}
    on:click={onClick}
  >
    <slot />
    {#if resizable && resizableHandler}
      <span class="resize-handler"></span>
    {/if}
  </p>
{/if}
