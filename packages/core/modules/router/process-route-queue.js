function processQueue(router, routerQueue, routeQueue, to, from, resolve, reject) {
  const queue = [];

  if (Array.isArray(routeQueue)) {
    queue.push(...routeQueue);
  } else if (routeQueue && typeof routeQueue === 'function') {
    queue.push(routeQueue);
  }
  if (routerQueue) {
    if (Array.isArray(routerQueue)) {
      queue.push(...routerQueue);
    } else {
      queue.push(routerQueue);
    }
  }

  function next() {
    if (queue.length === 0) {
      resolve();
      return;
    }
    const queueItem = queue.shift();

    queueItem.call(
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

export default function (to, from, resolve, reject) {
  const router = this;
  function enterNextRoute() {
    if (to && to.route && (router.params.routesBeforeEnter || to.route.beforeEnter)) {
      router.allowPageChange = false;
      processQueue(
        router,
        router.params.routesBeforeEnter,
        to.route.beforeEnter,
        to,
        from,
        () => {
          router.allowPageChange = true;
          resolve();
        },
        () => {
          reject();
        },
      );
    } else {
      resolve();
    }
  }
  function leaveCurrentRoute() {
    if (from && from.route && (router.params.routesBeforeLeave || from.route.beforeLeave)) {
      router.allowPageChange = false;
      processQueue(
        router,
        router.params.routesBeforeLeave,
        from.route.beforeLeave,
        to,
        from,
        () => {
          router.allowPageChange = true;
          enterNextRoute();
        },
        () => {
          reject();
        },
      );
    } else {
      enterNextRoute();
    }
  }
  leaveCurrentRoute();
}
