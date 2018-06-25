"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (component) {
  var self = component;
  var el = void 0;
  var child = self._reactInternalFiber.child;

  while (!el && child) {
    if (child.stateNode && child.stateNode instanceof window.HTMLElement) {
      el = child.stateNode;
    } else {
      child = child.child;
    }
  }

  return el;
};