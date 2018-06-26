'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (props) {
  var slots = {};
  if (!props) return slots;
  var children = props.children;

  if (!children || children.length === 0) {
    return slots;
  }

  function addChildToSlot(name, child) {
    if (!slots[name]) slots[name] = [];
    slots[name].push(child);
  }

  if (Array.isArray(children)) {
    children.forEach(function (child) {
      if (!child) return;
      var slotName = child.props && child.props.slot || 'default';
      addChildToSlot(slotName, child);
    });
  } else {
    var slotName = 'default';
    if (children.props && children.props.slot) slotName = children.props.slot;
    addChildToSlot(slotName, children);
  }

  return slots;
};