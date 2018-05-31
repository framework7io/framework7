const eventsEmitter = {
  listeners: {},
  on(events, handler) {
    events.split(' ').forEach((event) => {
      if (!eventsEmitter.listeners[event]) eventsEmitter.listeners[event] = [];
      eventsEmitter.listeners[event].push(handler);
    });
  },
  off(events, handler) {
    events.split(' ').forEach((event) => {
      if (!eventsEmitter.listeners[event]) return;
      if (typeof handler === 'undefined') {
        eventsEmitter.listeners[event] = [];
      } else {
        eventsEmitter.listeners[event].forEach((eventHandler, index) => {
          if (eventHandler === handler) {
            eventsEmitter.listeners[event].splice(index, 1);
          }
        });
      }
    });
  },
  once(events, handler) {
    if (typeof handler !== 'function') return;
    function onceHandler(...args) {
      handler(...args);
      eventsEmitter.off(events, onceHandler);
    }
    eventsEmitter.on(events, onceHandler);
  },
  emit(events, ...args) {
    events.split(' ').forEach((event) => {
      if (eventsEmitter.listeners && eventsEmitter.listeners[event]) {
        const handlers = [];
        eventsEmitter.listeners[event].forEach((eventHandler) => {
          handlers.push(eventHandler);
        });
        handlers.forEach((eventHandler) => {
          eventHandler(...args);
        });
      }
    });
  },
};

export default eventsEmitter;
