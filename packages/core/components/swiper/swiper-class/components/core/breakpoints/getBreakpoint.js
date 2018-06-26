'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (breakpoints) {
  // Get breakpoint for window width
  if (!breakpoints) return undefined;
  var breakpoint = false;
  var points = [];
  Object.keys(breakpoints).forEach(function (point) {
    points.push(point);
  });
  points.sort(function (a, b) {
    return parseInt(a, 10) - parseInt(b, 10);
  });
  for (var i = 0; i < points.length; i += 1) {
    var point = points[i];
    if (point >= _ssrWindow.window.innerWidth && !breakpoint) {
      breakpoint = point;
    }
  }
  return breakpoint || 'max';
};

var _ssrWindow = require('ssr-window');