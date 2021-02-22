<script>
  import { onMount, onDestroy, afterUpdate, createEventDispatcher, tick } from 'svelte';
  import { f7, f7ready, f7routers, f7events } from '../shared/f7';
  import { colorClasses } from '../shared/mixins';
  import { classNames, noUndefinedProps, createEmitter, getRouterId } from '../shared/utils';
  import { getRouterInitialComponent } from '../shared/get-router-initial-component';
  import { useTab } from '../shared/use-tab';

  import RouterContextProvider from './router-context-provider';

  export let id = undefined;
  export let style = undefined;

  export let init = true;
  export let url = undefined;
  let className = undefined;
  export { className as class };

  const emit = createEmitter(createEventDispatcher, $$props);

  const { main, tab, tabActive, browserHistoryInitialMatch = true } = $$props;

  let initialPage;
  let initialRoute;
  let el;
  let routerData;
  let f7View;

  export function instance() {
    return f7View;
  }

  function onViewInit(view) {
    emit('viewInit', [view]);
    if (!init) {
      f7View = view;
      routerData.instance = view;
    }
  }

  if (f7 && !f7View && init) {
    const routerId = getRouterId();
    f7View = f7.views.create(el, {
      routerId,
      init: false,
      ...noUndefinedProps($$props),
      browserHistoryInitialMatch,
      on: {
        init: onViewInit,
      },
    });
    routerData = {
      routerId,
      instance: f7View,
    };
    f7routers.views.push(routerData);
    if (f7View && f7View.router && (url || main)) {
      const initialData = getRouterInitialComponent(f7View.router);
      initialPage = initialData.initialPage;
      initialRoute = initialData.initialRoute;
    }
  }

  let pages = initialPage ? [initialPage] : [];

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

  useTab(() => el, emit);

  onMount(() => {
    f7ready(() => {
      if (f7View) {
        routerData.el = el;
        routerData.pages = pages;
        routerData.setPages = (newPages) => {
          tick().then(() => {
            pages = newPages;
          });
        };
        if (initialPage && initialPage.isAsync && !initialPage.initialComponent) {
          initialPage.component().then(() => {
            setTimeout(() => {
              f7View.init(el);
              if (initialPage) {
                initialPage.el = f7View.router.currentPageEl;
                if (initialRoute && initialRoute.route && initialRoute.route.keepAlive) {
                  initialRoute.route.keepAliveData = { pageEl: initialPage.el };
                }
              }
            }, 100);
          });
        } else {
          f7View.init(el);
          if (initialPage) {
            initialPage.el = f7View.router.currentPageEl;
            if (initialRoute && initialRoute.route && initialRoute.route.keepAlive) {
              initialRoute.route.keepAliveData = { pageEl: initialPage.el };
            }
          }
        }
      } else {
        const routerId = getRouterId();
        routerData = {
          el,
          routerId,
          pages,
          instance: f7View,
          setPages(newPages) {
            tick().then(() => {
              pages = newPages;
            });
          },
        };
        f7routers.views.push(routerData);
        routerData.instance = f7.views.create(el, {
          routerId,
          ...noUndefinedProps($$props),
          browserHistoryInitialMatch,
          on: {
            init: onViewInit,
          },
        });
        f7View = routerData.instance;
      }

      if (!init) return;

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
    if (f7View) {
      f7View.off('resize', onResize);
      f7View.off('swipebackMove', onSwipeBackMove);
      f7View.off('swipebackBeforeChange', onSwipeBackBeforeChange);
      f7View.off('swipebackAfterChange', onSwipeBackAfterChange);
      f7View.off('swipebackBeforeReset', onSwipeBackBeforeReset);
      f7View.off('swipebackAfterReset', onSwipeBackAfterReset);
      if (f7View.destroy) f7View.destroy();
      f7View = null;
    }

    f7routers.views.splice(f7routers.views.indexOf(routerData), 1);
    routerData = null;
  });
</script>

<div class={classes} {style} {id} bind:this={el}>
  <slot />
  {#each pages as page (page.id)}
    <RouterContextProvider route={page.props.f7route} router={page.props.f7router}>
      <svelte:component this={page.component} {...page.props} />
    </RouterContextProvider>
  {/each}
</div>
