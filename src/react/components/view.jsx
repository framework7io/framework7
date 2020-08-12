import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect';
import {
  classNames,
  getExtraAttrs,
  noUndefinedProps,
  emit,
  getRouterId,
  getComponentId,
} from '../shared/utils';
import { colorClasses } from '../shared/mixins';
import { f7ready, f7routers, f7, f7events } from '../shared/f7';
import { useTab } from '../shared/use-tab';
/* dts-imports
  import { View, Router } from 'framework7/types';
*/
/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  tab? : boolean
  tabActive? : boolean
  name? : string
  router? : boolean
  linksView? : Object | string
  url? : string
  main? : boolean
  stackPages? : boolean
  xhrCache? : boolean
  xhrCacheIgnore? : Array<any>
  xhrCacheIgnoreGetParameters? : boolean
  xhrCacheDuration? : number
  preloadPreviousPage? : boolean
  allowDuplicateUrls? : boolean
  reloadPages? : boolean
  reloadDetail? : boolean
  masterDetailResizable? : boolean
  masterDetailBreakpoint? : number
  removeElements? : boolean
  removeElementsWithTimeout? : boolean
  removeElementsTimeout? : number
  restoreScrollTopOnBack? : boolean
  loadInitialPage? : boolean
  iosSwipeBack? : boolean
  iosSwipeBackAnimateShadow? : boolean
  iosSwipeBackAnimateOpacity? : boolean
  iosSwipeBackActiveArea? : number
  iosSwipeBackThreshold? : number
  mdSwipeBack? : boolean
  mdSwipeBackAnimateShadow? : boolean
  mdSwipeBackAnimateOpacity? : boolean
  mdSwipeBackActiveArea? : number
  mdSwipeBackThreshold? : number
  auroraSwipeBack? : boolean
  auroraSwipeBackAnimateShadow? : boolean
  auroraSwipeBackAnimateOpacity? : boolean
  auroraSwipeBackActiveArea? : number
  auroraSwipeBackThreshold? : number
  browserHistory? : boolean
  browserHistoryRoot? : string
  browserHistoryAnimate? : boolean
  browserHistoryAnimateOnLoad? : boolean
  browserHistorySeparator? : string
  browserHistoryOnLoad? : boolean
  browserHistoryInitialMatch?: boolean;
  browserHistoryStoreHistory?: boolean;
  animate? : boolean
  transition? : string
  iosDynamicNavbar? : boolean
  iosAnimateNavbarBackIcon? : boolean
  materialPageLoadDelay? : number
  passRouteQueryToRequest? : boolean
  passRouteParamsToRequest? : boolean
  routes? : Array<any>
  routesAdd? : Array<any>
  routesBeforeEnter? : Function | Array<any>
  routesBeforeLeave? : Function | Array<any>
  init? : boolean
  COLOR_PROPS
  onViewInit? : (view?: View.View) => void
  onViewResize? : (width?: number) => void
  onSwipeBackMove? : (swipeBackData?: Router.SwipeBackData) => void
  onSwipeBackBeforeChange? : (swipeBackData?: Router.SwipeBackData) => void
  onSwipeBackAfterChange? : (swipeBackData?: Router.SwipeBackData) => void
  onSwipeBackBeforeReset? : (swipeBackData?: Router.SwipeBackData) => void
  onSwipeBackAfterReset? : (swipeBackData?: Router.SwipeBackData) => void
  onTabShow? : (el?: HTMLElement) => void
  onTabHide? : (el?: HTMLElement) => void
*/

const View = forwardRef((props, ref) => {
  const { className, id, style, children, init = true, main, tab, tabActive, url } = props;

  const extraAttrs = getExtraAttrs(props);

  const f7View = useRef(null);
  const elRef = useRef(null);
  const routerData = useRef(null);

  let initialPage;

  const onViewInit = (view) => {
    emit(props, 'viewInit', view);
    if (!init) {
      routerData.current.instance = view;
      f7View.current = routerData.current.instance;
    }
  };

  if (f7 && !f7View.current && init) {
    const routerId = getRouterId();
    f7View.current = f7.views.create(elRef.current, {
      routerId,
      init: false,
      ...noUndefinedProps(props),
    });
    routerData.current = {
      routerId,
      instance: f7View.current,
      on: {
        init: onViewInit,
      },
    };
    f7routers.views.push(routerData.current);
    if (f7View.current && f7View.current.router && url) {
      const initialRoute = f7View.current.router.findMatchingRoute(url);
      if (initialRoute && initialRoute.route && initialRoute.route.component) {
        initialPage = {
          component: initialRoute.route.component,
          id: getComponentId(),
          props: {
            f7route: initialRoute,
            $f7route: initialRoute,
            f7router: f7View.current.router,
            $f7router: f7View.current.router,
            ...initialRoute.params,
          },
        };
      }
    }
  }

  const [pages, setPages] = useState(initialPage ? [initialPage] : []);

  const onResize = (view, width) => {
    emit(props, 'viewResize', width);
  };
  const onSwipeBackMove = (data) => {
    const swipeBackData = data;
    emit(props, 'swipeBackMove', swipeBackData);
  };
  const onSwipeBackBeforeChange = (data) => {
    const swipeBackData = data;
    emit(props, 'swipeBackBeforeChange', swipeBackData);
  };
  const onSwipeBackAfterChange = (data) => {
    const swipeBackData = data;
    emit(props, 'swipeBackAfterChange', swipeBackData);
  };
  const onSwipeBackBeforeReset = (data) => {
    const swipeBackData = data;
    emit(props, 'swipeBackBeforeReset', swipeBackData);
  };
  const onSwipeBackAfterReset = (data) => {
    const swipeBackData = data;
    emit(props, 'swipeBackAfterReset', swipeBackData);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7View: () => f7View.current,
  }));

  const onMount = () => {
    f7ready(() => {
      if (f7View.current) {
        routerData.current.el = elRef.current;
        routerData.current.pages = pages;
        routerData.current.setPages = (newPages) => {
          setPages([...newPages]);
        };
        f7View.current.init(elRef.current);
      } else {
        const routerId = getRouterId();
        routerData.current = {
          el: elRef.current,
          routerId,
          pages,
          instance: f7View.current,
          setPages(newPages) {
            setPages([...newPages]);
          },
        };
        f7routers.views.push(routerData.current);
        routerData.current.instance = f7.views.create(elRef.current, {
          routerId,
          ...noUndefinedProps(props),
          on: {
            init: onViewInit,
          },
        });
        f7View.current = routerData.current.instance;
      }

      if (!init) return;

      f7View.current.on('resize', onResize);
      f7View.current.on('swipebackMove', onSwipeBackMove);
      f7View.current.on('swipebackBeforeChange', onSwipeBackBeforeChange);
      f7View.current.on('swipebackAfterChange', onSwipeBackAfterChange);
      f7View.current.on('swipebackBeforeReset', onSwipeBackBeforeReset);
      f7View.current.on('swipebackAfterReset', onSwipeBackAfterReset);
    });
  };

  const onDestroy = () => {
    if (f7View.current) {
      f7View.current.off('resize', onResize);
      f7View.current.off('swipebackMove', onSwipeBackMove);
      f7View.current.off('swipebackBeforeChange', onSwipeBackBeforeChange);
      f7View.current.off('swipebackAfterChange', onSwipeBackAfterChange);
      f7View.current.off('swipebackBeforeReset', onSwipeBackBeforeReset);
      f7View.current.off('swipebackAfterReset', onSwipeBackAfterReset);
      if (f7View.current.destroy) f7View.current.destroy();
      f7View.current = null;
    }

    f7routers.views.splice(f7routers.views.indexOf(routerData.current), 1);
    routerData.current = null;
  };

  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!routerData.current || !f7) return;
    f7events.emit('viewRouterDidUpdate', routerData.current);
  });

  useTab(elRef, props);

  const classes = classNames(
    className,
    'view',
    {
      'view-main': main,
      'tab-active': tabActive,
      tab,
    },
    colorClasses(props),
  );

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      {children}
      {pages.map(({ component: PageComponent, id: pageId, props: pageProps }) => {
        return <PageComponent key={pageId} {...pageProps} />;
      })}
    </div>
  );
});

View.displayName = 'f7-view';

export default View;
