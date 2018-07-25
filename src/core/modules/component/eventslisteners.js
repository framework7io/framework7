import $ from 'dom7';

function invokeHandler(handler, event, args) {
  if (typeof handler === 'function') {
    // call function handler
    handler(event, ...args);
  }
}
function handleEvent(event, args, vnode) {
  const name = event.type;
  const on = vnode.data.on;
  // call event handler(s) if exists
  if (on && on[name]) {
    invokeHandler(on[name], event, args, vnode);
  }
}
function createListener() {
  return function handler(event, ...args) {
    handleEvent(event, args, handler.vnode);
  };
}
function updateEvents(oldVnode, vnode) {
  const oldOn = oldVnode.data.on;
  const oldListener = oldVnode.listener;
  const oldElm = oldVnode.elm;
  const on = vnode && vnode.data.on;
  const elm = (vnode && vnode.elm);
  // optimization for reused immutable handlers
  if (oldOn === on) {
    return;
  }
  // remove existing listeners which no longer used
  if (oldOn && oldListener) {
    // if element changed or deleted we remove all existing listeners unconditionally
    if (!on) {
      Object.keys(oldOn).forEach((name) => {
        $(oldElm).off(name, oldListener);
      });
    } else {
      Object.keys(oldOn).forEach((name) => {
        if (!on[name]) {
          $(oldElm).off(name, oldListener);
        }
      });
    }
  }
  // add new listeners which has not already attached
  if (on) {
    // reuse existing listener or create new
    const listener = oldVnode.listener || createListener();
    vnode.listener = listener;
    // update vnode for listener
    listener.vnode = vnode;
    // if element changed or added we add all needed listeners unconditionally
    if (!oldOn) {
      Object.keys(on).forEach((name) => {
        $(elm).on(name, listener);
      });
    } else {
      Object.keys(on).forEach((name) => {
        if (!oldOn[name]) {
          $(elm).on(name, listener);
        }
      });
    }
  }
}

export default {
  create: updateEvents,
  update: updateEvents,
  destroy: updateEvents,
};
