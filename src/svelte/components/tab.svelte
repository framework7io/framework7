<script>
  import { onMount, onDestroy, tick, getContext } from 'svelte';

  import { colorClasses } from '../shared/mixins.js';
  import { classNames, getComponentId } from '../shared/utils.js';
  import { f7ready, app } from '../shared/f7.js';
  import { useTab } from '../shared/use-tab.js';

  let { class: className, tabActive = false, id = undefined, children, ...restProps } = $props();

  const RouterContext = getContext('RouterContext') || {};

  let TabsSwipeableContext = getContext('TabsSwipeableContext') || (() => ({ value: false }));

  let el = $state(null);
  let routerData = $state(null);
  let initialTabContent = $state(null);

  const isSwiper = $derived(TabsSwipeableContext().value);

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
  let tabContent = $state(initialTabContent || null);

  const classes = $derived(
    classNames(className, 'tab', tabActive && 'tab-active', colorClasses(restProps)),
  );

  useTab(() => el, restProps);

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
  $effect(() => {
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
  <swiper-slide {id} class={classes} bind:this={el} {...restProps}>
    {#if tabContent}
      <tabContent.component {...tabContent.props} />
    {/if}
    {@render children?.()}
  </swiper-slide>
{:else}
  <div {id} class={classes} bind:this={el} {...restProps}>
    {#if tabContent}
      <tabContent.component {...tabContent.props} />
    {/if}
    {@render children?.()}
  </div>
{/if}
