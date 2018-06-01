import $ from 'dom7';
import Utils from '../../utils/utils';
import Stepper from './stepper-class';
import ConstructorMethods from '../../utils/constructor-methods';

export default {
  name: 'stepper',
  create() {
    const app = this;
    app.stepper = Utils.extend(
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
      }
    );
  },
  static: {
    Stepper,
  },
  on: {
    tabMounted(tabEl) {
      const app = this;
      $(tabEl).find('.stepper-init').each((index, stepperEl) => {
        const dataset = $(stepperEl).dataset();
        // eslint-disable-next-line
        new Stepper(app, Utils.extend({ el: stepperEl }, dataset || {}));
      });
    },
    tabBeforeRemove(tabEl) {
      $(tabEl).find('.stepper-init').each((index, stepperEl) => {
        if (stepperEl.f7Stepper) stepperEl.f7Stepper.destroy();
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.stepper-init').each((index, stepperEl) => {
        const dataset = $(stepperEl).dataset();
        // eslint-disable-next-line
        new Stepper(app, Utils.extend({ el: stepperEl }, dataset || {}));
      });
    },
    pageBeforeRemove(page) {
      page.$el.find('.stepper-init').each((index, stepperEl) => {
        if (stepperEl.f7Stepper) stepperEl.f7Stepper.destroy();
      });
    },
  },
};
