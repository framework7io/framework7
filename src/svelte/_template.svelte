<script>
  import { createEventDispatcher, onMount, onDestroy, afterUpdate } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  // export props

  let el;

  $: classes = '';

  function onClick() {
    dispatch('click');
  }

  onMount(() => {

  });
  afterUpdate(() => {

  });
  onDestroy(() => {

  });
</script>
<div
  id={id}
  style={style}
  class={classes}
  bind:this={el}
  on:click={onClick}
>
  <slot />
</div>
