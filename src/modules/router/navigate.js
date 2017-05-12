import Utils from '../../utils/utils';

function navigate(url, navigateOptions) {
  const router = this;
  let navigateUrl = url;
  if (navigateUrl[0] !== '/' && navigateUrl.indexOf('#') !== 0) {
    navigateUrl = ((router.path || '/') + navigateUrl).replace('//', '/');
  }
  let route = router.findMatchingRoute(navigateUrl);
  if (!route) {
    return router;
    if (navigateUrl.indexOf('#') === 0) {
      // Load by name
      route = {
        url: navigateUrl,
        path: navigateUrl,
        route: {
          path: navigateUrl,
          name: navigateUrl.replace('#', ''),
        },
      };
    } else {
      // Load by URL
      route = {
        url: navigateUrl,
        path: navigateUrl.split('?')[0],
        query: Utils.parseUrlQuery(navigateUrl),
        route: {
          path: navigateUrl.split('?')[0],
          url: navigateUrl,
        },
      };
    }
  }
  const options = Utils.extend(navigateOptions, { route });

  ('url content name el component template').split(' ').forEach((pageLoadProp) => {
    if (route.route[pageLoadProp]) {
      router.load({ [pageLoadProp]: route.route[pageLoadProp] }, options);
    }
  });
  // Async
  function asyncLoad(loadParams, loadOptions) {
    router.allowPageChange = false;
    router.load(loadParams, Utils.extend(options, loadOptions), true);
  }
  function asyncRelease() {
    router.allowPageChange = true;
  }
  if (route.route.async) {
    router.allowPageChange = false;

    route.route.async(asyncLoad, asyncRelease);
  }
  // Retur Router
  return router;
}
export default navigate;
