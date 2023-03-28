<script>
import { computed, ref, onMounted, onBeforeUnmount, onUpdated, toRaw, h } from 'vue';
import { classNames, noUndefinedProps, getRouterId } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7ready, f7routers, f7, f7events } from '../shared/f7.js';
import { useTab } from '../shared/use-tab.js';
import { getRouterInitialComponent } from '../shared/get-router-initial-component.js';

export default {
  name: 'f7-view',
  props: {
    tab: Boolean,
    tabActive: Boolean,

    name: String,
    initRouterOnTabShow: {
      type: Boolean,
      default: undefined,
    },
    router: {
      type: Boolean,
      default: true,
    },
    linksView: [Object, String],
    url: String,
    main: {
      type: Boolean,
      default: undefined,
    },
    xhrCache: {
      type: Boolean,
      default: undefined,
    },
    xhrCacheIgnore: Array,
    xhrCacheIgnoreGetParameters: {
      type: Boolean,
      default: undefined,
    },
    xhrCacheDuration: Number,
    preloadPreviousPage: {
      type: Boolean,
      default: undefined,
    },
    allowDuplicateUrls: {
      type: Boolean,
      default: undefined,
    },
    reloadPages: {
      type: Boolean,
      default: undefined,
    },
    reloadDetail: {
      type: Boolean,
      default: undefined,
    },
    masterDetailResizable: {
      type: Boolean,
      default: undefined,
    },
    masterDetailBreakpoint: Number,
    removeElements: {
      type: Boolean,
      default: undefined,
    },
    removeElementsWithTimeout: {
      type: Boolean,
      default: undefined,
    },
    removeElementsTimeout: Number,
    restoreScrollTopOnBack: {
      type: Boolean,
      default: undefined,
    },
    loadInitialPage: {
      type: Boolean,
      default: undefined,
    },
    // Swipe Back
    iosSwipeBack: {
      type: Boolean,
      default: undefined,
    },
    iosSwipeBackAnimateShadow: {
      type: Boolean,
      default: undefined,
    },
    iosSwipeBackAnimateOpacity: {
      type: Boolean,
      default: undefined,
    },
    iosSwipeBackActiveArea: Number,
    iosSwipeBackThreshold: Number,
    mdSwipeBack: {
      type: Boolean,
      default: undefined,
    },
    mdSwipeBackAnimateShadow: {
      type: Boolean,
      default: undefined,
    },
    mdSwipeBackAnimateOpacity: {
      type: Boolean,
      default: undefined,
    },
    mdSwipeBackActiveArea: Number,
    mdSwipeBackThreshold: Number,
    // Push State
    browserHistory: {
      type: Boolean,
      default: undefined,
    },
    browserHistoryRoot: String,
    browserHistoryAnimate: {
      type: Boolean,
      default: undefined,
    },
    browserHistoryAnimateOnLoad: {
      type: Boolean,
      default: undefined,
    },
    browserHistorySeparator: String,
    browserHistoryOnLoad: {
      type: Boolean,
      default: undefined,
    },
    browserHistoryInitialMatch: {
      type: Boolean,
      default: true,
    },
    browserHistoryStoreHistory: {
      type: Boolean,
      default: undefined,
    },
    // Animate Pages
    animate: {
      type: Boolean,
      default: undefined,
    },
    transition: String,
    // iOS Dynamic Navbar
    iosDynamicNavbar: {
      type: Boolean,
      default: undefined,
    },
    // Animate iOS Navbar Back Icon
    iosAnimateNavbarBackIcon: {
      type: Boolean,
      default: undefined,
    },
    // MD Theme delay
    materialPageLoadDelay: Number,

    passRouteQueryToRequest: {
      type: Boolean,
      default: undefined,
    },
    passRouteParamsToRequest: {
      type: Boolean,
      default: undefined,
    },
    routes: Array,
    routesAdd: Array,

    // Routes hooks
    routesBeforeEnter: [Function, Array],
    routesBeforeLeave: [Function, Array],

    unloadTabContent: { type: Boolean, default: undefined },

    init: {
      type: Boolean,
      default: true,
    },
    ...colorProps,
  },
  emits: [
    'view:init',
    'view:resize',
    'swipeback:move',
    'swipeback:beforechange',
    'swipeback:afterchange',
    'swipeback:beforereset',
    'swipeback:afterreset',
    'tab:hide',
    'tab:show',
  ],
  setup(props, { emit, slots }) {
    // const childrenArray = React.Children.toArray(children);
    // const initialPageComponent = childrenArray.filter((c) => c.props && c.props.initialPage)[0];
    // const restChildren = childrenArray.filter((c) => !c.props || !c.props.initialPage);
    const initialPageComponent = null;
    const shouldInitRouter = !(props.initRouterOnTabShow && props.tab && !props.tabActive);

    let f7View = null;
    const elRef = ref(null);
    let routerData = null;

    let initialPage;
    let initialRoute;

    const onViewInit = (view) => {
      emit('view:init', view);
      if (!props.init) {
        routerData.instance = view;
        f7View = routerData.instance;
      }
    };

    const getViewParams = () => {
      const routes = toRaw(props.routes || []);
      const routesAdd = toRaw(props.routesAdd || []);
      return noUndefinedProps({ ...props, routes, routesAdd });
    };

    if (f7 && !f7View && props.init) {
      const routerId = getRouterId();
      f7View = f7.views.create(elRef.value, {
        ...getViewParams(),
        routerId,
        init: false,
        on: {
          init: onViewInit,
        },
      });
      routerData = {
        routerId,
        instance: f7View,
      };
      f7routers.views.push(routerData);
      if (shouldInitRouter && f7View && f7View.router && (props.url || props.main)) {
        const initialData = getRouterInitialComponent(f7View.router, initialPageComponent);
        initialPage = initialData.initialPage;
        initialRoute = initialData.initialRoute;
        if (initialRoute && initialRoute.route && initialRoute.route.masterRoute) {
          initialPage = undefined;
          initialRoute = undefined;
        }
      }
    }

    const pages = ref(initialPage ? [initialPage] : []);
    const setPages = (newPages) => {
      newPages.forEach((page) => {
        // eslint-disable-next-line
        page.component = toRaw(page.component);
      });
      pages.value = newPages;
    };

    const onResize = (view, width) => {
      emit('view:resize', width);
    };
    const onSwipeBackMove = (data) => {
      const swipeBackData = data;
      emit('swipeback:move', swipeBackData);
    };
    const onSwipeBackBeforeChange = (data) => {
      const swipeBackData = data;
      emit('swipeback:beforechange', swipeBackData);
    };
    const onSwipeBackAfterChange = (data) => {
      const swipeBackData = data;
      emit('swipeback:afterchange', swipeBackData);
    };
    const onSwipeBackBeforeReset = (data) => {
      const swipeBackData = data;
      emit('swipeback:beforereset', swipeBackData);
    };
    const onSwipeBackAfterReset = (data) => {
      const swipeBackData = data;
      emit('swipeback:afterreset', swipeBackData);
    };

    onMounted(() => {
      f7ready(() => {
        if (f7View) {
          routerData.el = elRef.value;
          routerData.pages = pages.value;
          routerData.setPages = (newPages) => {
            setPages([...newPages]);
          };
          if (initialPage && initialPage.isAsync && !initialPage.initialComponent) {
            initialPage.component().then(() => {
              setTimeout(() => {
                f7View.init(elRef.value);
                if (initialPage) {
                  initialPage.el = f7View.router.currentPageEl;
                  if (initialRoute && initialRoute.route && initialRoute.route.keepAlive) {
                    initialRoute.route.keepAliveData = { pageEl: initialPage.el };
                  }
                }
              }, 100);
            });
          } else {
            f7View.init(elRef.value);
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
            el: elRef.value,
            routerId,
            pages: pages.value,
            instance: f7View,
            setPages(newPages) {
              setPages([...newPages]);
            },
          };
          f7routers.views.push(routerData);
          routerData.instance = f7.views.create(elRef.value, {
            routerId,
            ...getViewParams(),
            on: {
              init: onViewInit,
            },
          });
          f7View = routerData.instance;
        }

        if (!props.init) return;

        f7View.on('resize', onResize);
        f7View.on('swipebackMove', onSwipeBackMove);
        f7View.on('swipebackBeforeChange', onSwipeBackBeforeChange);
        f7View.on('swipebackAfterChange', onSwipeBackAfterChange);
        f7View.on('swipebackBeforeReset', onSwipeBackBeforeReset);
        f7View.on('swipebackAfterReset', onSwipeBackAfterReset);
      });
    });

    onBeforeUnmount(() => {
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

    onUpdated(() => {
      if (!routerData || !f7) return;
      f7events.emit('viewRouterDidUpdate', routerData);
    });

    useTab(elRef, emit);

    const classes = computed(() =>
      classNames(
        'view',
        {
          'view-main': props.main,
          'tab-active': props.tabActive,
          tab: props.tab,
        },
        colorClasses(props),
      ),
    );

    const getComponent = (page) => toRaw(page.component);
    const getProps = (page) => {
      const { component: pageComponent, props: pageProps } = page;
      let keys = [];
      const passProps = {};
      if (pageComponent && pageComponent.props) {
        if (Array.isArray(pageComponent.props))
          keys = pageComponent.props.filter((prop) => typeof prop === 'string');
        else keys = Object.keys(pageComponent.props);
      }
      keys.forEach((key) => {
        if (key in pageProps) passProps[key] = pageProps[key];
      });
      return passProps;
    };

    return () => {
      return h('div', { ref: elRef, class: classes.value }, [
        slots.default && slots.default(),
        ...pages.value.map((page) =>
          h(getComponent(page), {
            key: page.id,
            ...getProps(page),
          }),
        ),
      ]);
    };
  },
};
</script>
