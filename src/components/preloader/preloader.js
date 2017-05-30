import $ from 'dom7';
import Utils from '../../utils/utils';

const Preloader = {
  init(el) {
    const app = this;
    if (app.theme !== 'md') return;
    const $el = $(el);
    if ($el.length === 0 || $el.children('.preloader-inner').length > 0) return;
    $el.append(
      '<span class="preloader-inner">' +
          '<span class="preloader-inner-gap"></span>' +
          '<span class="preloader-inner-left">' +
              '<span class="preloader-inner-half-circle"></span>' +
          '</span>' +
          '<span class="preloader-inner-right">' +
              '<span class="preloader-inner-half-circle"></span>' +
          '</span>' +
      '</span>');
  },
};
export default {
  name: 'preloader',
  create() {
    const app = this;
    Utils.extend(app, {
      preloader: {
        init: Preloader.init.bind(app),
      },
    });
  },
  on: {
    pageInit(page) {
      const app = this;
      if (app.theme !== 'md') return;
      page.$el.find('.preloader').each((index, preloaderEl) => {
        app.preloader.init(preloaderEl);
      });
    },
  },
};
