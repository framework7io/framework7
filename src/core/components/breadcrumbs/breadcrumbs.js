import { bindMethods } from '../../shared/utils.js';

const Breadcrumbs = {};

export default {
  name: 'breadrumbs',
  create() {
    const app = this;
    bindMethods(app, {
      breadrumbs: Breadcrumbs,
    });
  },
};
