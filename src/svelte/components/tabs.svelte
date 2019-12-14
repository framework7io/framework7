<script>
  import { onMount } from 'svelte';
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';

  let className = undefined;
  export { className as class };

  export let id = undefined;
  export let style = undefined;
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
  <div id={id} style={style} class={Utils.classNames(wrapClasses, classes)} bind:this={wrapEl}>
    <div class={tabsClasses}>
      <slot />
    </div>
  </div>
{:else}
  <div id={id} style={style} class={Utils.classNames(tabsClasses, classes)}>
    <slot />
  </div>
{/if}

