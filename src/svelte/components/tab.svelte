<script>
  import { onMount, onDestroy, afterUpdate, createEventDispatcher, tick, getContext } from 'svelte';

  import { restProps } from '../shared/rest-props.js';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, createEmitter, getComponentId } from '../shared/utils.js';
  import { f7ready, app } from '../shared/f7.js';
  import { useTab } from '../shared/use-tab.js';
  import { getReactiveContext } from '../shared/get-reactive-context.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };
  export let tabActive = false;
  export let id = undefined;

  const RouterContext = getContext('RouterContext') || {};

  let TabsSwipeableContext =
    getReactiveContext('TabsSwipeableContext', (newValue) => {
      TabsSwipeableContext = newValue || false;
    }) || {};

  let el;
  let routerData = null;
  let initialTabContent = null;

  $: isSwiper = TabsSwipeableContext;

  if (
    !routerData &&
    RouterContext &&
    RouterContext.route &&
    RouterContext.route.route &&
    RouterContext.route.route.tab &&
    RouterContext.route.route.tab.id === id
  ) {
    const { component, asyncComponent, options: tabRouteOptions } = RouterContext.route.route.tab;
    if (component || asyncComponent) {
      const parentProps =
        RouterContext.route.route.options && RouterContext.route.route.options.props;
      initialTabContent = {
        id: getComponentId(),
        component: component || asyncComponent,
        isAsync: !!asyncComponent,
        props: {
          ...(parentProps || {}),
          ...((tabRouteOptions && tabRouteOptions.props) || {}),
          f7router: RouterContext.router,
          f7route: RouterContext.route,
          ...RouterContext.route.params,
        },
      };
    }
  }
  let tabContent = initialTabContent || null;

  $: classes = classNames(className, 'tab', tabActive && 'tab-active', colorClasses($$props));

  useTab(() => el, emit);

  onMount(() => {
    if (el && initialTabContent) {
      el.f7RouterTabLoaded = true;
    }
    f7ready(() => {
      if (!routerData) {
        routerData = {
          el,
          setTabContent(tc) {
            tick().then(() => {
              tabContent = tc;
            });
          },
        };
        app.f7routers.tabs.push(routerData);
      } else {
        routerData.el = el;
      }
    });
  });
  afterUpdate(() => {
    if (!routerData) return;
    app.f7events.emit('tabRouterDidUpdate', routerData);
  });
  onDestroy(() => {
    if (!routerData) return;
    app.f7routers.tabs.splice(app.f7routers.tabs.indexOf(routerData), 1);
    routerData = null;
  });
</script>

{#if isSwiper || TabsSwipeableContext}
  <swiper-slide {id} class={classes} bind:this={el} {...restProps($$restProps)}>
    {#if tabContent}
      <svelte:component this={tabContent.component} {...tabContent.props} />
    {/if}
    <slot />
  </swiper-slide>
{:else}
  <div {id} class={classes} bind:this={el} {...restProps($$restProps)}>
    {#if tabContent}
      <svelte:component this={tabContent.component} {...tabContent.props} />
    {/if}
    <slot />
  </div>
{/if}
