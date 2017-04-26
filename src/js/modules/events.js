export default {
  name: 'events',
  create() {
    this.eventsListeners = {};
    // if (eventsParent) this.prototype.eventsParent = eventsParent;
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
      // if (self.eventsParent && self.eventsParent.prototype) {
      //   self.eventsParent.prototype.emit(event, ...args);
      // }
      if (!self.eventsListeners[event]) return self;
      self.eventsListeners[event].forEach((eventHandler) => {
        eventHandler.apply(self, args);
      });
      return self;
    },
  },
};
