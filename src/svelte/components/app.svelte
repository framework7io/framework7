<script>
  import { onMount } from 'svelte';
  import { app, f7init } from '../shared/f7.js';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, noUndefinedProps } from '../shared/utils.js';

  import RoutableModals from './routable-modals.svelte';

  let className = undefined;
  export { className as class };

  let el;

  $: classes = classNames(className, 'framework7-root', colorClasses($$props));

  if (!app.f7 || typeof window === 'undefined') {
    f7init(el, noUndefinedProps($$props), false);
  }

  onMount(() => {
    const parentEl = el.parentNode;
    if (parentEl && parentEl !== document.body && parentEl.parentNode === document.body) {
      parentEl.style.height = '100%';
    }
    if (app.f7) {
      app.f7.init(el);
      return;
    }
    f7init(el, noUndefinedProps($$props), true);
  });
</script>

<div bind:this={el} class={classes}>
  <slot />
  <RoutableModals />
</div>
