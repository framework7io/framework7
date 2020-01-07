<script>
  import { onMount, onDestroy, afterUpdate, createEventDispatcher, tick } from 'svelte';
  import f7 from '../utils/f7';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  export let init = true;
  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  const dispatch = createEventDispatcher();

  const { main, tab, tabActive } = $$props;
  $: classes = Utils.classNames(
    className,
    'view',
    {
      'view-main': main,
      'tab-active': tabActive,
      tab,
    },
    Mixins.colorClasses($$props),
  );

  let el;
  let pages = [];
  let routerData;
  let f7View;

  export function instance() {
    return f7View;
  }

  function onSwipeBackMove(data) {
    dispatch('swipeBackMove', [data]);
    if (typeof $$props.onSwipeBackMove === 'function') $$props.onSwipeBackMove(data);
  }
  function onSwipeBackBeforeChange(data) {
    dispatch('swipeBackBeforeChange', [data]);
    if (typeof $$props.onSwipeBackBeforeChange === 'function') $$props.onSwipeBackBeforeChange(data);
  }
  function onSwipeBackAfterChange(data) {
    dispatch('swipeBackAfterChange', [data]);
    if (typeof $$props.onSwipeBackAfterChange === 'function') $$props.onSwipeBackAfterChange(data);
  }
  function onSwipeBackBeforeReset(data) {
    dispatch('swipeBackBeforeReset', [data]);
    if (typeof $$props.onSwipeBackBeforeReset === 'function') $$props.onSwipeBackBeforeReset(data);
  }
  function onSwipeBackAfterReset(data) {
    dispatch('swipeBackAfterReset', [data]);
    if (typeof $$props.onSwipeBackAfterReset === 'function') $$props.onSwipeBackAfterReset(data);
  }
  function onTabShow(tabEl) {
    if (el !== tabEl) return;
    dispatch('tabShow');
    if (typeof $$props.onTabShow === 'function') $$props.onTabShow();
  }
  function onTabHide(tabEl) {
    if (el !== tabEl) return;
    dispatch('tabHide');
    if (typeof $$props.onTabHide === 'function') $$props.onTabHide();
  }

  function onViewInit(view) {
    f7View = view;
    routerData.instance = view;
    dispatch('viewInit', [view]);
    if (typeof $$props.onViewInit === 'function') $$props.onViewInit(view);
  }

  onMount(() => {
    if (!init) return;
    f7.ready(() => {
      f7.instance.on('tabShow', onTabShow);
      f7.instance.on('tabHide', onTabHide);
      routerData = {
        el,
        instance: null,
        pages,
        setPages(p) {
          tick().then(() => {
            pages = p;
          });
        },
      };
      f7.routers.views.push(routerData);
      routerData.instance = f7.instance.views.create(el, {
        ...Utils.noUndefinedProps($$props),
        on: {
          init: onViewInit,
        },
      });
      if (!f7View) f7View = routerData.instance;
      f7View.on('swipebackMove', onSwipeBackMove);
      f7View.on('swipebackBeforeChange', onSwipeBackBeforeChange);
      f7View.on('swipebackAfterChange', onSwipeBackAfterChange);
      f7View.on('swipebackBeforeReset', onSwipeBackBeforeReset);
      f7View.on('swipebackAfterReset', onSwipeBackAfterReset);
    });
  });

  afterUpdate(() => {
    if (!routerData) return;
    f7.events.emit('viewRouterDidUpdate', routerData);
  });

  onDestroy(() => {
    if (!init) return;
    if (f7.instance) {
      f7.instance.off('tabShow', onTabShow);
      f7.instance.off('tabHide', onTabHide);
    }
    if (f7View) {
      f7View.off('swipebackMove', onSwipeBackMove);
      f7View.off('swipebackBeforeChange', onSwipeBackBeforeChange);
      f7View.off('swipebackAfterChange', onSwipeBackAfterChange);
      f7View.off('swipebackBeforeReset', onSwipeBackBeforeReset);
      f7View.off('swipebackAfterReset', onSwipeBackAfterReset);
      if (f7View.destroy) {
        f7View.destroy();
      }
    }
    f7.routers.views.splice(f7.routers.views.indexOf(routerData), 1);
    f7View = null;
    routerData = null;
  });
</script>

<div class={classes} style={style} id={id} bind:this={el}>
  <slot></slot>
  {#each pages as page (page.id)}
  <svelte:component this={page.component} {...page.props}></svelte:component>
  {/each}
</div>
