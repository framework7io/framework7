<script>
  import { onMount } from 'svelte';

  import { restProps } from '../shared/rest-props.js';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

  let className = undefined;
  export { className as class };
  export let animated = false;
  export let swipeable = false;
  export let routable = false;
  export let swiperParams = undefined;

  let wrapEl;

  $: classes = classNames(className, colorClasses($$props));
  $: wrapClasses = classNames({
    'tabs-animated-wrap': animated,
    'tabs-swipeable-wrap': swipeable,
  });
  $: tabsClasses = classNames({
    tabs: true,
    'tabs-routable': routable,
  });

  onMount(() => {
    if (swipeable && swiperParams && wrapEl) {
      wrapEl.f7SwiperParams = swiperParams;
    }
  });
</script>

{#if animated || swipeable}
  <div class={classNames(wrapClasses, classes)} bind:this={wrapEl} {...restProps($$restProps)}>
    <div class={tabsClasses}>
      <slot />
    </div>
  </div>
{:else}
  <div class={classNames(tabsClasses, classes)} {...restProps($$restProps)}>
    <slot />
  </div>
{/if}
