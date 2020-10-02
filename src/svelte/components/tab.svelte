<script>
  import { onMount, onDestroy, afterUpdate, createEventDispatcher, tick, getContext } from 'svelte';

  import { restProps } from '../shared/rest-props';
  import { colorClasses } from '../shared/mixins';
  import { classNames, createEmitter, getComponentId } from '../shared/utils';
  import { f7ready, f7routers, f7events } from '../shared/f7';
  import { useTab } from '../shared/use-tab';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };
  export let tabActive = false;
  export let id = undefined;

  const RouterContext = getContext('RouterContext') || {};

  let el;
  let routerData = null;
  let initialTabContent = null;

  if (
    !routerData &&
    RouterContext &&
    RouterContext.route &&
    RouterContext.route.route &&
    RouterContext.route.route.tab &&
    RouterContext.route.route.tab.id === id
  ) {
    const { component, asyncComponent } = RouterContext.route.route.tab;
    if (component || asyncComponent) {
      initialTabContent = {
        id: getComponentId(),
        component: component || asyncComponent,
        isAsync: !!asyncComponent,
        props: {
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
        f7routers.tabs.push(routerData);
      } else {
        routerData.el = el;
      }
    });
  });
  afterUpdate(() => {
    if (!routerData) return;
    f7events.emit('tabRouterDidUpdate', routerData);
  });
  onDestroy(() => {
    if (!routerData) return;
    f7routers.tabs.splice(f7routers.tabs.indexOf(routerData), 1);
    routerData = null;
  });
</script>

<div {id} class={classes} bind:this={el} {...restProps($$restProps)}>
  {#if tabContent}
    <svelte:component this={tabContent.component} {...tabContent.props} />
  {/if}
  <slot />
</div>
