<script>
  import { onMount, onDestroy, afterUpdate, createEventDispatcher, tick } from 'svelte';
  import Utils from '../utils/utils';
  import Mixins from '../utils/mixins';
  import f7 from '../utils/f7';

  const dispatch = createEventDispatcher();

  let className = undefined;
  export { className as class };

  export let id = undefined;
  export let style = undefined;
  export let tabActive = false;

  let el;
  let tabContent = null;
  let routerData = null;

  $: classes = Utils.classNames(
    className,
    'tab',
    tabActive && 'tab-active',
    Mixins.colorClasses($$props),
  );

  function onTabShow(tabEl) {
    if (tabEl !== el) return;
    dispatch('tabShow');
    if (typeof $$props.onTabShow === 'function') $$props.onTabShow();
  }
  function onTabHide(tabEl) {
    if (tabEl !== el) return;
    dispatch('tabHide');
    if (typeof $$props.onTabHide === 'function') $$props.onTabHide();
  }

  onMount(() => {
    f7.ready(() => {
      routerData = {
        el,
        setTabContent(tc) {
          tick().then(() => {
            tabContent = tc;
          });
        },
      };
      f7.routers.tabs.push(routerData);
      f7.instance.on('tabShow', onTabShow);
      f7.instance.on('tabHide', onTabHide);
    });
  });
  afterUpdate(() => {
    if (!routerData) return;
    f7.events.emit('tabRouterDidUpdate', routerData);
  });
  onDestroy(() => {
    if (f7.instance) {
      f7.instance.off('tabShow', onTabShow);
      f7.instance.off('tabHide', onTabHide);
    }
    if (!routerData) return;
    f7.routers.tabs.splice(f7.routers.tabs.indexOf(routerData), 1);
    routerData = null;
  });

  export function show(animate) {
    if (!f7.instance) return;
    f7.instance.tab.show(el, animate);
  }
</script>

<div id={id} class={classes} style={style} bind:this={el}>
  {#if tabContent}
  <svelte:component this={tabContent.component} {...tabContent.props}></svelte:component>
  {/if}
  <slot/>
</div>
