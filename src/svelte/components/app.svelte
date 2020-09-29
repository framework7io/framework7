<script>
  import { onMount } from 'svelte';
  import { f7 } from '../shared/f7';
  import RoutableModals from './routable-modals';
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';

  export let id = 'framework7-root';
  export let params = {};
  export let routes = [];

  let className = undefined;
  export { className as class };

  let el;

  $: classes = classNames(className, 'framework7-root', colorClasses($$props));

  onMount(() => {
    const parentEl = el.parentNode;
    if (parentEl && parentEl !== document.body && parentEl.parentNode === document.body) {
      parentEl.style.height = '100%';
    }
    if (f7.instance) return;
    f7.init(el, params, routes);
  });
</script>

<div {id} bind:this={el} class={classes} {...restProps($$restProps)}>
  <slot />
  <RoutableModals />
</div>
