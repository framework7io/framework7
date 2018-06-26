'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var eventsEmitter = {
  listeners: {},
  on: function on(events, handler) {
    events.split(' ').forEach(function (event) {
      if (!eventsEmitter.listeners[event]) eventsEmitter.listeners[event] = [];
      eventsEmitter.listeners[event].push(handler);
    });
  },
  off: function off(events, handler) {
    events.split(' ').forEach(function (event) {
      if (!eventsEmitter.listeners[event]) return;
      if (typeof handler === 'undefined') {
        eventsEmitter.listeners[event] = [];
      } else {
        eventsEmitter.listeners[event].forEach(function (eventHandler, index) {
          if (eventHandler === handler) {
            eventsEmitter.listeners[event].splice(index, 1);
          }
        });
      }
    });
  },
  once: function once(events, handler) {
    if (typeof handler !== 'function') return;
    function onceHandler() {
      handler.apply(undefined, arguments);
      eventsEmitter.off(events, onceHandler);
    }
    eventsEmitter.on(events, onceHandler);
  },
  emit: function emit(events) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    events.split(' ').forEach(function (event) {
      if (eventsEmitter.listeners && eventsEmitter.listeners[event]) {
        var handlers = [];
        eventsEmitter.listeners[event].forEach(function (eventHandler) {
          handlers.push(eventHandler);
        });
        handlers.forEach(function (eventHandler) {
          eventHandler.apply(undefined, args);
        });
      }
    });
  }
};

exports.default = eventsEmitter;