'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (component, events) {
  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var self = component;

  if (!events || !events.trim().length || typeof events !== 'string') return;

  events.trim().split(' ').forEach(function (event) {
    var _self$props;

    var eventName = (event || '').trim();
    if (!eventName) return;
    eventName = eventName.charAt(0).toUpperCase() + eventName.slice(1);

    var propName = 'on' + eventName;

    if (self.props[propName]) (_self$props = self.props)[propName].apply(_self$props, args);
  });
};