<script>
  import { onMount, setContext } from 'svelte';

  import { app, f7ready } from '../shared/f7.js';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

  let {
    class: className,
    animated = false,
    swipeable = false,
    routable = false,
    swiperParams = undefined,
    children,
    ...restProps
  } = $props();

  let wrapEl = $state(null);

  const classes = $derived(classNames(className, colorClasses(restProps)));

  const tabsClasses = $derived(
    classNames({
      tabs: true,
      'tabs-routable': routable,
    }),
  );

  setContext('TabsSwipeableContext', () => ({
    value: true,
  }));

  onMount(() => {
    if (swipeable) {
      f7ready(() => {
        // It only initializes in pageInit callback
        // We may need to manually call init() to update the instance
        app.f7.swiper.init(wrapEl);
      });
    }
    if (!swipeable || !swiperParams) return;
    if (!wrapEl) return;
    Object.assign(wrapEl, swiperParams);
    wrapEl.initialize();
  });
</script>

{#if animated}
  <div class={classNames('tabs-animated-wrap', classes)} bind:this={wrapEl} {...restProps}>
    <div class={tabsClasses}>
      {@render children?.()}
    </div>
  </div>
{:else if swipeable}
  <swiper-container
    bind:this={wrapEl}
    class={classNames(tabsClasses, classes)}
    {...restProps}
    init={swiperParams ? 'false' : 'true'}
  >
    {@render children?.()}
  </swiper-container>
{:else}
  <div class={classNames(tabsClasses, classes)} {...restProps}>
    {@render children?.()}
  </div>
{/if}
