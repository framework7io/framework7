'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (routePreRoute, to, from, resolve, reject) {
  var router = this;
  var preRoutes = [];
  if (Array.isArray(routePreRoute)) {
    preRoutes.push.apply(preRoutes, _toConsumableArray(routePreRoute));
  } else if (routePreRoute && typeof routePreRoute === 'function') {
    preRoutes.push(routePreRoute);
  }
  if (router.params.preRoute) {
    if (Array.isArray(router.params.preRoute)) {
      preRoutes.push.apply(preRoutes, _toConsumableArray(router.params.preRoute));
    } else {
      preRoutes.push(router.params.preRoute);
    }
  }

  function next() {
    if (preRoutes.length === 0) {
      resolve();
      return;
    }
    var preRoute = preRoutes.shift();

    preRoute.call(router, to, from, function () {
      next();
    }, function () {
      reject();
    });
  }
  next();
};

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
}