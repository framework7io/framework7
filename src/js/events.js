const eventsListeners = {};

export default {
  name: 'events',
  proto: {
    eventsListeners,
    on(event, handler) {
      if (!eventsListeners[event]) eventsListeners[event] = [];
      eventsListeners[event].push(handler);
      return this;
    },
    off(event, handler) {
      if (typeof handler === 'undefined') {
        eventsListeners[event] = [];
        return this;
      }
      eventsListeners[event].forEach((eventHandler, index) => {
        if (eventHandler === event) {
          eventsListeners[event].splice(index, 1);
        }
      });
      return this;
    },
    emit(event, ...args) {
      if (!eventsListeners[event]) return this;
      eventsListeners[event].forEach((eventHandler) => {
        eventHandler.apply(this, args);
      });
      return this;
    },
  },
};
