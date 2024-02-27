export default function asyncComponent(router, component, resolve, reject) {
  function resolvePromise(componentPromise) {
    componentPromise
      .then((c) => {
        // eslint-disable-next-line
        resolve({ component: c.default || c._default || c });
      })
      .catch((err) => {
        reject();
        throw new Error(err, { cause: err });
      });
  }
  if (component instanceof Promise) {
    resolvePromise(component);
    return;
  }
  const asyncComponentResult = component.call(router);
  if (asyncComponentResult instanceof Promise) {
    resolvePromise(asyncComponentResult);
  } else {
    resolve({ component: asyncComponentResult });
  }
}
