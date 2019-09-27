export default function (router, asyncComponent, resolve, reject) {
  function resolvePromise(componentPromise) {
    componentPromise
      .then((c) => {
        // eslint-disable-next-line
        resolve({ component: c.default || c._default || c });
      })
      .catch((err) => {
        reject();
        throw new Error(err);
      });
  }
  if (asyncComponent instanceof Promise) {
    resolvePromise(asyncComponent);
    return;
  }
  const asyncComponentResult = asyncComponent.call(router);
  if (asyncComponentResult instanceof Promise) {
    resolvePromise(asyncComponentResult);
  } else {
    resolve({ component: asyncComponentResult });
  }
}
