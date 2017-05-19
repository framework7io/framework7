import $ from 'dom7';
import Utils from '../../utils/utils';

const Navbar = {
  size(el) {
    const app = this;
    const $el = $(el);
    console.log(app);
  },
  hide(el, animate = true) {
    const app = this;
    const $el = $(el);

  },
  show(el, animate = true) {
    const app = this;
    const $el = $(el);

  },
};

export default {
  create() {
    const app = this;
    Object.keys(Navbar).forEach((method) => {
      Navbar[method] = Navbar[method].bind(app);
    });
    Utils.extend(app, {
      navbar: Navbar,
    });
  },
  on: {
    init() {

    },
    pageInit(page) {

    },
  },
};
