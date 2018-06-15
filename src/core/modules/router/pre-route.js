export default function (routePreRoute, to, from, resolve, reject) {
  const router = this;
  const preRoutes = [];
  if (Array.isArray(routePreRoute)) {
    preRoutes.push(...routePreRoute);
  } else if (routePreRoute && typeof routePreRoute === 'function') {
    preRoutes.push(routePreRoute);
  }
  if (router.params.preRoute) {
    if (Array.isArray(router.params.preRoute)) {
      preRoutes.push(...router.params.preRoute);
    } else {
      preRoutes.push(router.params.preRoute);
    }
  }

  function next() {
    if (preRoutes.length === 0) {
      resolve();
      return;
    }
    const preRoute = preRoutes.shift();

    preRoute.call(
      router,
      to,
      from,
      () => {
        next();
      },
      () => {
        reject();
      }
    );
  }
  next();
}
