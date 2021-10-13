import $ from '../../shared/dom7.js';
import { extend } from '../../shared/utils.js';
import Stepper from './stepper-class.js';
import ConstructorMethods from '../../shared/constructor-methods.js';

export default {
  name: 'stepper',
  create() {
    const app = this;
    app.stepper = extend(
      ConstructorMethods({
        defaultSelector: '.stepper',
        constructor: Stepper,
        app,
        domProp: 'f7Stepper',
      }),
      {
        getValue(el = '.stepper') {
          const stepper = app.stepper.get(el);
          if (stepper) return stepper.getValue();
          return undefined;
        },
        setValue(el = '.stepper', value) {
          const stepper = app.stepper.get(el);
          if (stepper) return stepper.setValue(value);
          return undefined;
        },
      },
    );
  },
  static: {
    Stepper,
  },
  on: {
    tabMounted(tabEl) {
      const app = this;
      $(tabEl)
        .find('.stepper-init')
        .each((stepperEl) => {
          const dataset = $(stepperEl).dataset();
          app.stepper.create(extend({ el: stepperEl }, dataset || {}));
        });
    },
    tabBeforeRemove(tabEl) {
      $(tabEl)
        .find('.stepper-init')
        .each((stepperEl) => {
          if (stepperEl.f7Stepper) stepperEl.f7Stepper.destroy();
        });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.stepper-init').each((stepperEl) => {
        const dataset = $(stepperEl).dataset();
        app.stepper.create(extend({ el: stepperEl }, dataset || {}));
      });
    },
    pageBeforeRemove(page) {
      page.$el.find('.stepper-init').each((stepperEl) => {
        if (stepperEl.f7Stepper) stepperEl.f7Stepper.destroy();
      });
    },
  },
  vnode: {
    'stepper-init': {
      insert(vnode) {
        const app = this;
        const stepperEl = vnode.elm;
        const dataset = $(stepperEl).dataset();
        app.stepper.create(extend({ el: stepperEl }, dataset || {}));
      },
      destroy(vnode) {
        const stepperEl = vnode.elm;
        if (stepperEl.f7Stepper) stepperEl.f7Stepper.destroy();
      },
    },
  },
};
