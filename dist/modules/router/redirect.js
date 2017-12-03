import Utils from '../../utils/utils';

export default function (direction, route, options) {
  const router = this;
  const redirect = route.route.redirect;
  function redirectResolve(redirectUrl, redirectOptions = {}) {
    router.allowPageChange = true;
    router[direction](redirectUrl, Utils.extend({}, options, redirectOptions));
  }
  function redirectReject() {
    router.allowPageChange = true;
  }
  if (typeof redirect === 'function') {
    router.allowPageChange = false;
    const redirectUrl = redirect.call(router, route, redirectResolve, redirectReject);
    if (redirectUrl && typeof redirectUrl === 'string') {
      router.allowPageChange = true;
      return router[direction](redirectUrl, options);
    }
    return router;
  }
  return router[direction](redirect, options);
}
