import { getSupport } from '../../utils/get-support';

const supportGetter = {};
Object.defineProperty(supportGetter, 'support', {
  get() {
    return getSupport();
  },
});

export default {
  name: 'support',
  proto: supportGetter,
  static: {
    getSupport,
  },
};
