import { extend } from '../../utils/utils';

export default function redirect(direction, route, options) {
  const router = this;
  const r = route.route.redirect;
  if (options.initial && router.params.pushState) {
    options.replaceState = true; // eslint-disable-line
    options.history = true; // eslint-disable-line
  }
  function redirectResolve(redirectUrl, redirectOptions = {}) {
    router.allowPageChange = true;
    router[direction](redirectUrl, extend({}, options, redirectOptions));
  }
  function redirectReject() {
    router.allowPageChange = true;
  }
  if (typeof r === 'function') {
    router.allowPageChange = false;
    const redirectUrl = r.call(router, route, redirectResolve, redirectReject);
    if (redirectUrl && typeof redirectUrl === 'string') {
      router.allowPageChange = true;
      return router[direction](redirectUrl, options);
    }
    return router;
  }
  return router[direction](r, options);
}
