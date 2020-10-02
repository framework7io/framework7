<script>
  import { onMount, onDestroy, afterUpdate, createEventDispatcher, tick } from 'svelte';
  import { f7, f7ready, f7routers, f7events } from '../shared/f7';
  import { colorClasses } from '../shared/mixins';
  import { classNames, noUndefinedProps, createEmitter } from '../shared/utils';

  export let id = undefined;
  export let style = undefined;

  export let init = true;
  let className = undefined;
  export { className as class };

  const emit = createEmitter(createEventDispatcher, $$props);

  const { main, tab, tabActive } = $$props;
  $: classes = classNames(
    className,
    'view',
    {
      'view-main': main,
      'tab-active': tabActive,
      tab,
    },
    colorClasses($$props),
  );

  let el;
  let pages = [];
  let routerData;
  let f7View;

  export function instance() {
    return f7View;
  }

  function onResize(view, width) {
    emit('viewResize', [width]);
  }
  function onSwipeBackMove(data) {
    emit('swipeBackMove', [data]);
  }
  function onSwipeBackBeforeChange(data) {
    emit('swipeBackBeforeChange', [data]);
  }
  function onSwipeBackAfterChange(data) {
    emit('swipeBackAfterChange', [data]);
  }
  function onSwipeBackBeforeReset(data) {
    emit('swipeBackBeforeReset', [data]);
  }
  function onSwipeBackAfterReset(data) {
    emit('swipeBackAfterReset', [data]);
  }
  function onTabShow(tabEl) {
    if (el !== tabEl) return;
    emit('tabShow');
  }
  function onTabHide(tabEl) {
    if (el !== tabEl) return;
    emit('tabHide');
  }

  function onViewInit(view) {
    f7View = view;
    routerData.instance = view;
    emit('viewInit', [view]);
  }

  onMount(() => {
    if (!init) return;
    f7ready(() => {
      f7.on('tabShow', onTabShow);
      f7.on('tabHide', onTabHide);
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
      f7routers.views.push(routerData);
      routerData.instance = f7.views.create(el, {
        ...noUndefinedProps($$props),
        on: {
          init: onViewInit,
        },
      });
      if (!f7View) f7View = routerData.instance;
      f7View.on('resize', onResize);
      f7View.on('swipebackMove', onSwipeBackMove);
      f7View.on('swipebackBeforeChange', onSwipeBackBeforeChange);
      f7View.on('swipebackAfterChange', onSwipeBackAfterChange);
      f7View.on('swipebackBeforeReset', onSwipeBackBeforeReset);
      f7View.on('swipebackAfterReset', onSwipeBackAfterReset);
    });
  });

  afterUpdate(() => {
    if (!routerData) return;
    f7events.emit('viewRouterDidUpdate', routerData);
  });

  onDestroy(() => {
    if (!init) return;
    if (f7) {
      f7.off('tabShow', onTabShow);
      f7.off('tabHide', onTabHide);
    }
    if (f7View) {
      f7View.off('resize', onResize);
      f7View.off('swipebackMove', onSwipeBackMove);
      f7View.off('swipebackBeforeChange', onSwipeBackBeforeChange);
      f7View.off('swipebackAfterChange', onSwipeBackAfterChange);
      f7View.off('swipebackBeforeReset', onSwipeBackBeforeReset);
      f7View.off('swipebackAfterReset', onSwipeBackAfterReset);
      if (f7View.destroy) {
        f7View.destroy();
      }
    }
    f7routers.views.splice(f7routers.views.indexOf(routerData), 1);
    f7View = null;
    routerData = null;
  });
</script>

<div class={classes} {style} {id} bind:this={el}>
  <slot />
  {#each pages as page (page.id)}
    <svelte:component this={page.component} {...page.props} />
  {/each}
</div>
