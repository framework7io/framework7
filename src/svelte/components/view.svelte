<script>
  import { onMount, onDestroy, tick } from 'svelte';
  import { app, f7ready } from '../shared/f7.js';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, noUndefinedProps, getRouterId } from '../shared/utils.js';
  import { getRouterInitialComponent } from '../shared/get-router-initial-component.js';
  import { useTab } from '../shared/use-tab.js';

  import RouterContextProvider from './router-context-provider.svelte';

  let {
    class: className,
    id = undefined,
    style = undefined,
    init = true,
    url = undefined,
    children,
    ...restProps
  } = $props();

  const {
    main,
    tab,
    tabActive,
    browserHistoryInitialMatch = true,
    initRouterOnTabShow,
  } = restProps;

  const shouldInitRouter = $derived(!(initRouterOnTabShow && tab && !tabActive));

  let initialPage = $state(null);
  let initialRoute = $state(null);
  let el = $state(null);
  let routerData = $state(null);
  let f7View = $state(null);

  export function instance() {
    return f7View;
  }

  function onViewInit(view) {
    restProps.onViewInit?.(view);
    restProps.onviewinit?.(view);
    if (!init) {
      f7View = view;
      routerData.instance = view;
    }
  }

  if (app.f7 && !f7View && init) {
    const routerId = getRouterId();
    f7View = app.f7.views.create(el, {
      routerId,
      init: false,
      ...noUndefinedProps({ url, ...restProps }),
      browserHistoryInitialMatch,
      on: {
        init: onViewInit,
      },
    });
    routerData = {
      routerId,
      instance: f7View,
    };
    app.f7routers.views.push(routerData);
    if (shouldInitRouter && f7View && f7View.router && (url || main)) {
      const initialData = getRouterInitialComponent(f7View.router);
      initialPage = initialData.initialPage;
      initialRoute = initialData.initialRoute;
      if (initialRoute && initialRoute.route && initialRoute.route.masterRoute) {
        initialPage = undefined;
        initialRoute = undefined;
      }
    }
  }

  let pages = $state(initialPage ? [initialPage] : []);

  function onResize(view, width) {
    restProps.onViewResize?.(width);
    restProps.onviewresize?.(width);
  }
  function onSwipeBackMove(data) {
    restProps.onSwipeBackMove?.(data);
    restProps.onswipebackmove?.(data);
  }
  function onSwipeBackBeforeChange(data) {
    restProps.onSwipeBackBeforeChange?.(data);
    restProps.onswipebackbeforechange?.(data);
  }
  function onSwipeBackAfterChange(data) {
    restProps.onSwipeBackAfterChange?.(data);
    restProps.onswipebackafterchange?.(data);
  }
  function onSwipeBackBeforeReset(data) {
    restProps.onSwipeBackBeforeReset?.(data);
    restProps.onswipebackbeforereset?.(data);
  }
  function onSwipeBackAfterReset(data) {
    restProps.onSwipeBackAfterReset?.(data);
    restProps.onswipebackafterreset?.(data);
  }

  const classes = $derived(
    classNames(
      className,
      'view',
      {
        'view-main': main,
        'tab-active': tabActive,
        tab,
      },
      colorClasses(restProps),
    ),
  );

  useTab(() => el, restProps);

  onMount(() => {
    f7ready(() => {
      if (f7View) {
        routerData.el = el;
        routerData.pages = pages;
        routerData.setPages = (newPages) => {
          tick().then(() => {
            pages = [...newPages];
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
              pages = [...newPages];
            });
          },
        };
        app.f7routers.views.push(routerData);
        routerData.instance = app.f7.views.create(el, {
          routerId,
          ...noUndefinedProps(restProps),
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

  const watchPagesAndRouterData = (pages, routerData) => {
    if (!routerData || !pages) return;

    app.f7events.emit('viewRouterDidUpdate', routerData);
  };

  $effect(() => watchPagesAndRouterData(pages, routerData));

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

    app.f7routers.views.splice(app.f7routers.views.indexOf(routerData), 1);
    routerData = null;
  });
</script>

<div class={classes} {style} {id} bind:this={el}>
  {@render children?.(f7View)}
  {#each pages as page (page.id)}
    <RouterContextProvider route={page.props.f7route} router={page.props.f7router}>
      <page.component {...page.props} />
    </RouterContextProvider>
  {/each}
</div>
