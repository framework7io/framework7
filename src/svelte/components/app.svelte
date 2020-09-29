<script>
  import { onMount } from 'svelte';
  import { f7, f7init } from '../shared/f7';
  import { colorClasses } from '../shared/mixins';
  import { classNames, noUndefinedProps } from '../shared/utils';

  import RoutableModals from './routable-modals';

  let className = undefined;
  export { className as class };

  let el;

  $: classes = classNames(className, 'framework7-root', colorClasses($$props));

  if (!f7 || typeof window === 'undefined') {
    f7init(el, noUndefinedProps($$props), false);
  }

  onMount(() => {
    const parentEl = el.parentNode;
    if (parentEl && parentEl !== document.body && parentEl.parentNode === document.body) {
      parentEl.style.height = '100%';
    }
    if (f7) {
      f7.init(el);
      return;
    }
    f7init(el, noUndefinedProps($$props), true);
  });
</script>

<div bind:this={el} class={classes}>
  <slot />
  <RoutableModals />
</div>
