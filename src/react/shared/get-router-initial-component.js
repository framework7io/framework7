import { getComponentId } from './utils';

export const getRouterInitialComponent = (router, initialComponent) => {
  let initialComponentData;
  const { initialUrl } = router.getInitialUrl();
  const initialRoute = router.findMatchingRoute(initialUrl);
  if (
    initialRoute &&
    initialRoute.route &&
    (initialRoute.route.component || initialRoute.route.asyncComponent) &&
    !initialRoute.route.master
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
      },
    };
  }
  return initialComponentData;
};
