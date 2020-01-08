<script>
  import { onMount } from 'svelte';
  import f7 from '../utils/f7';
  import RoutableModals from './routable-modals.svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  export let id = 'framework7-root';
  export let params = {};
  export let routes = [];
  export let style = undefined;

  let className = undefined;
  export { className as class };

  let el;

  $: classes = Utils.classNames(
    className,
    'framework7-root',
    Mixins.colorClasses($$props),
  );

  onMount(() => {
    const parentEl = el.parentNode;
    if (parentEl && parentEl !== document.body && parentEl.parentNode === document.body) {
      parentEl.style.height = '100%';
    }
    if (f7.instance) return;
    f7.init(el, params, routes);
  });

</script>

<div id={id} bind:this={el} class={classes} style={style}>
  <slot></slot>
  <RoutableModals />
</div>
