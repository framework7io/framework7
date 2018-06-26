'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (direction, route, options) {
  var router = this;
  var redirect = route.route.redirect;
  if (options.initial && router.params.pushState) {
    options.replaceState = true; // eslint-disable-line
    options.history = true; // eslint-disable-line
  }
  function redirectResolve(redirectUrl) {
    var redirectOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    router.allowPageChange = true;
    router[direction](redirectUrl, _utils2.default.extend({}, options, redirectOptions));
  }
  function redirectReject() {
    router.allowPageChange = true;
  }
  if (typeof redirect === 'function') {
    router.allowPageChange = false;
    var redirectUrl = redirect.call(router, route, redirectResolve, redirectReject);
    if (redirectUrl && typeof redirectUrl === 'string') {
      router.allowPageChange = true;
      return router[direction](redirectUrl, options);
    }
    return router;
  }
  return router[direction](redirect, options);
};

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }