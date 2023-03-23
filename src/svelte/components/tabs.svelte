<script>
  import { onMount, tick } from 'svelte';

  import { restProps } from '../shared/rest-props.js';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { setReactiveContext } from '../shared/set-reactive-context.js';

  let className = undefined;
  export { className as class };
  export let animated = false;
  export let swipeable = false;
  export let routable = false;
  export let swiperParams = undefined;

  let wrapEl;

  $: classes = classNames(className, colorClasses($$props));

  $: tabsClasses = classNames({
    tabs: true,
    'tabs-routable': routable,
  });

  setReactiveContext('TabsSwipeableContext', () => true);

  onMount(() => {
    if (swipeable && swiperParams && wrapEl) {
      Object.assign(wrapEl, swiperParams);
      wrapEl.initialize();
    }
    tick().then(() => {
      if (swipeable && wrapEl.swiper) {
        wrapEl.swiper.update();
      }
    });
  });
</script>

{#if animated}
  <div
    class={classNames('tabs-animated-wrap', classes)}
    bind:this={wrapEl}
    {...restProps($$restProps)}
  >
    <div class={tabsClasses}>
      <slot />
    </div>
  </div>
{:else if swipeable}
  <swiper-container
    bind:this={wrapEl}
    class={classNames(tabsClasses, classes)}
    {...restProps($$restProps)}
    init={swiperParams ? 'false' : 'true'}
  >
    <slot />
  </swiper-container>
{:else}
  <div class={classNames(tabsClasses, classes)} {...restProps($$restProps)}>
    <slot />
  </div>
{/if}
