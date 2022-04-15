import { getComponentId } from './utils.js';

export const getRouterInitialComponent = (router, initialComponent) => {
  let initialComponentData;
  const { initialUrl } = router.getInitialUrl();
  const initialRoute = router.findMatchingRoute(initialUrl);
  let routeProps = {};

  if (initialRoute && initialRoute.route && initialRoute.route.options) {
    routeProps = initialRoute.route.options.props;
  }

  const isMasterRoute = (route) => {
    if (route.master === true) return true;
    if (typeof route.master === 'function') return route.master(router.app);
    return false;
  };

  if (
    initialRoute &&
    initialRoute.route &&
    (initialRoute.route.component || initialRoute.route.asyncComponent) &&
    !isMasterRoute(initialRoute.route)
  ) {
    initialComponentData = {
      component: initialRoute.route.component || initialRoute.route.asyncComponent,
      initialComponent,
      id: getComponentId(),
      isAsync: !!initialRoute.route.asyncComponent,
      props: {
        f7route: initialRoute,
        f7router: router,
        ...initialRoute.params,
        ...routeProps,
      },
    };
  }
  return {
    initialPage: initialComponentData,
    initialRoute,
  };
};
