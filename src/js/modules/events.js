export default {
  name: 'events',
  create(params) {
    const self = this;
    self.eventsListeners = {};
    if (params && params.parents) self.eventsParents = params.parents;
  },
  instance: {
    on(event, handler) {
      const self = this;
      if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
      self.eventsListeners[event].push(handler);
      return self;
    },
    once(event, handler) {
      const self = this;
      function onceHandler(...args) {
        handler.apply(self, args);
        self.off(event, onceHandler);
      }
      return self.on(event, onceHandler);
    },
    off(event, handler) {
      const self = this;
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
        return self;
      }
      self.eventsListeners[event].forEach((eventHandler, index) => {
        if (eventHandler === handler) {
          self.eventsListeners[event].splice(index, 1);
        }
      });
      return self;
    },
    emit(event, ...args) {
      const self = this;
      if (self.eventsListeners[event]) {
        self.eventsListeners[event].forEach((eventHandler) => {
          eventHandler.apply(self, args);
        });
      }
      if (self.eventsParents && self.eventsParents.length > 0) {
        self.eventsParents.forEach((eventsParent) => {
          eventsParent.emit(event, ...args);
        });
      }
      return self;
    },
  },
};
