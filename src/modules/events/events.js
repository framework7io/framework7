export default {
  name: 'events',
  create(params) {
    const self = this;
    self.eventsListeners = {};
    if (params && params.parents) self.eventsParents = params.parents;
    if (self.params && self.params.on) {
      Object.keys(self.params.on).forEach((eventName) => {
        self.on(eventName, self.params.on[eventName]);
      });
    }
  },
  instance: {
    on(events, handler) {
      const self = this;
      events.split(' ').forEach((event) => {
        if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
        self.eventsListeners[event].push(handler);
      });
      return self;
    },
    once(events, handler) {
      const self = this;
      function onceHandler(...args) {
        handler.apply(self, args);
        self.off(events, onceHandler);
      }
      return self.on(events, onceHandler);
    },
    off(events, handler) {
      const self = this;
      events.split(' ').forEach((event) => {
        if (typeof handler === 'undefined') {
          self.eventsListeners[event] = [];
        } else {
          self.eventsListeners[event].forEach((eventHandler, index) => {
            if (eventHandler === handler) {
              self.eventsListeners[event].splice(index, 1);
            }
          });
        }
      });
      return self;
    },
    emit(events, ...args) {
      const self = this;
      events.split(' ').forEach((event) => {
        if (self.eventsListeners[event]) {
          self.eventsListeners[event].forEach((eventHandler) => {
            eventHandler.apply(self, args);
          });
        }
      });
      if (self.eventsParents && self.eventsParents.length > 0) {
        self.eventsParents.forEach((eventsParent) => {
          eventsParent.emit(events, ...args);
        });
      }
      return self;
    },
  },
};
