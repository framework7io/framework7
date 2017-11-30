import $ from 'dom7';
import Utils from '../../utils/utils';

const Preloader = {
  init(el) {
    const app = this;
    if (app.theme !== 'md') return;
    const $el = $(el);
    if ($el.length === 0 || $el.children('.preloader-inner').length > 0) return;
    $el.append(Utils.mdPreloaderContent);
  },
  // Modal
  visible: false,
  show(color = 'white') {
    const app = this;
    if (Preloader.visible) return;
    const preloaderInner = app.theme !== 'md' ? '' : Utils.mdPreloaderContent;
    $('html').addClass('with-modal-preloader');
    app.root.append(`
      <div class="preloader-backdrop"></div>
      <div class="preloader-modal">
        <div class="preloader color-${color}">${preloaderInner}</div>
      </div>
    `);
    Preloader.visible = true;
  },
  hide() {
    const app = this;
    if (!Preloader.visible) return;
    $('html').removeClass('with-modal-preloader');
    app.root.find('.preloader-backdrop, .preloader-modal').remove();
    Preloader.visible = false;
  },
};
export default {
  name: 'preloader',
  create() {
    const app = this;
    Utils.extend(app, {
      preloader: {
        init: Preloader.init.bind(app),
        show: Preloader.show.bind(app),
        hide: Preloader.hide.bind(app),
      },
    });
  },
  on: {
    photoBrowserOpen(pb) {
      const app = this;
      if (app.theme !== 'md') return;
      pb.$containerEl.find('.preloader').each((index, preloaderEl) => {
        app.preloader.init(preloaderEl);
      });
    },
    pageInit(page) {
      const app = this;
      if (app.theme !== 'md') return;
      page.$el.find('.preloader').each((index, preloaderEl) => {
        app.preloader.init(preloaderEl);
      });
    },
  },
};
