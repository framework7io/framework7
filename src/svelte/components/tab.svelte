<script>
  import { onMount, onDestroy, afterUpdate, createEventDispatcher, tick } from 'svelte';

  import { restProps } from '../shared/rest-props';
  import { colorClasses } from '../shared/mixins';
  import { classNames, createEmitter } from '../shared/utils';
  import { f7, f7ready, f7routers, f7events } from '../shared/f7';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };
  export let tabActive = false;

  let el;
  let tabContent = null;
  let routerData = null;

  $: classes = classNames(className, 'tab', tabActive && 'tab-active', colorClasses($$props));

  function onTabShow(tabEl) {
    if (tabEl !== el) return;
    emit('tabShow');
  }
  function onTabHide(tabEl) {
    if (tabEl !== el) return;
    emit('tabHide');
  }

  onMount(() => {
    f7ready(() => {
      routerData = {
        el,
        setTabContent(tc) {
          tick().then(() => {
            tabContent = tc;
          });
        },
      };
      f7routers.tabs.push(routerData);
      f7.on('tabShow', onTabShow);
      f7.on('tabHide', onTabHide);
    });
  });
  afterUpdate(() => {
    if (!routerData) return;
    f7events.emit('tabRouterDidUpdate', routerData);
  });
  onDestroy(() => {
    if (f7) {
      f7.off('tabShow', onTabShow);
      f7.off('tabHide', onTabHide);
    }
    if (!routerData) return;
    f7routers.tabs.splice(f7routers.tabs.indexOf(routerData), 1);
    routerData = null;
  });
</script>

<div class={classes} bind:this={el} {...restProps($$restProps)}>
  {#if tabContent}
    <svelte:component this={tabContent.component} {...tabContent.props} />
  {/if}
  <slot />
</div>
