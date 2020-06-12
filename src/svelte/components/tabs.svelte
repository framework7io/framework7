<script>
  import { onMount } from 'svelte';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';
  import Mixins from '../utils/mixins';

  let className = undefined;
  export { className as class };
  export let animated = false;
  export let swipeable = false;
  export let routable = false;
  export let swiperParams = undefined;

  let wrapEl;

  $: classes = Utils.classNames(
    className,
    Mixins.colorClasses($$props),
  );
  $: wrapClasses = Utils.classNames({
    'tabs-animated-wrap': animated,
    'tabs-swipeable-wrap': swipeable,
  });
  $: tabsClasses = Utils.classNames({
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
  <div class={Utils.classNames(wrapClasses, classes)} bind:this={wrapEl} {...restProps($$restProps)}>
    <div class={tabsClasses}>
      <slot />
    </div>
  </div>
{:else}
  <div class={Utils.classNames(tabsClasses, classes)} {...restProps($$restProps)}>
    <slot />
  </div>
{/if}

