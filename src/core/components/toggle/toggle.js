import $ from '../../shared/dom7.js';
import ConstructorMethods from '../../shared/constructor-methods.js';
import Toggle from './toggle-class.js';

export default {
  name: 'toggle',
  create() {
    const app = this;
    app.toggle = ConstructorMethods({
      defaultSelector: '.toggle',
      constructor: Toggle,
      app,
      domProp: 'f7Toggle',
    });
  },
  static: {
    Toggle,
  },
  on: {
    tabMounted(tabEl) {
      const app = this;
      $(tabEl)
        .find('.toggle-init')
        .each((toggleEl) => app.toggle.create({ el: toggleEl }));
    },
    tabBeforeRemove(tabEl) {
      $(tabEl)
        .find('.toggle-init')
        .each((toggleEl) => {
          if (toggleEl.f7Toggle) toggleEl.f7Toggle.destroy();
        });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.toggle-init').each((toggleEl) => app.toggle.create({ el: toggleEl }));
    },
    pageBeforeRemove(page) {
      page.$el.find('.toggle-init').each((toggleEl) => {
        if (toggleEl.f7Toggle) toggleEl.f7Toggle.destroy();
      });
    },
  },
  vnode: {
    'toggle-init': {
      insert(vnode) {
        const app = this;
        const toggleEl = vnode.elm;
        app.toggle.create({ el: toggleEl });
      },
      destroy(vnode) {
        const toggleEl = vnode.elm;
        if (toggleEl.f7Toggle) toggleEl.f7Toggle.destroy();
      },
    },
  },
};
