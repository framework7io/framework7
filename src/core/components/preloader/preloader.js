import $ from '../../utils/dom7';
import {
  extend,
  iosPreloaderContent,
  mdPreloaderContent,
  auroraPreloaderContent,
} from '../../utils/utils';

const Preloader = {
  init(el) {
    const app = this;
    const preloaders = {
      iosPreloaderContent,
      mdPreloaderContent,
      auroraPreloaderContent,
    };
    const $el = $(el);
    if (
      $el.length === 0 ||
      $el.children('.preloader-inner').length > 0 ||
      $el.children('.preloader-inner-line').length > 0
    )
      return;
    $el.append(preloaders[`${app.theme}PreloaderContent`]);
  },
  // Modal
  visible: false,
  show(color = 'white') {
    const app = this;
    if (Preloader.visible) return;
    const preloaders = {
      iosPreloaderContent,
      mdPreloaderContent,
      auroraPreloaderContent,
    };
    const preloaderInner = preloaders[`${app.theme}PreloaderContent`] || '';
    $('html').addClass('with-modal-preloader');
    // prettier-ignore
    app.root.append(`
      <div class="preloader-backdrop"></div>
      <div class="preloader-modal">
        <div class="preloader color-${color}">${preloaderInner}</div>
      </div>
    `);
    Preloader.visible = true;
  },
  showIn(el, color = 'white') {
    const app = this;
    const preloaders = {
      iosPreloaderContent,
      mdPreloaderContent,
      auroraPreloaderContent,
    };
    const preloaderInner = preloaders[`${app.theme}PreloaderContent`] || '';
    $(el || 'html').addClass('with-modal-preloader');
    // prettier-ignore
    $(el || app.root).append(`
      <div class="preloader-backdrop"></div>
      <div class="preloader-modal">
        <div class="preloader color-${color}">${preloaderInner}</div>
      </div>
    `);
  },
  hide() {
    const app = this;
    if (!Preloader.visible) return;
    $('html').removeClass('with-modal-preloader');
    app.root.find('.preloader-backdrop, .preloader-modal').remove();
    Preloader.visible = false;
  },
  hideIn(el) {
    const app = this;
    $(el || 'html').removeClass('with-modal-preloader');
    $(el || app.root)
      .find('.preloader-backdrop, .preloader-modal')
      .remove();
  },
};
export default {
  name: 'preloader',
  create() {
    const app = this;
    extend(app, {
      preloader: {
        init: Preloader.init.bind(app),
        show: Preloader.show.bind(app),
        hide: Preloader.hide.bind(app),
        showIn: Preloader.showIn.bind(app),
        hideIn: Preloader.hideIn.bind(app),
      },
    });
  },
  on: {
    photoBrowserOpen(pb) {
      const app = this;
      pb.$el.find('.preloader').each((index, preloaderEl) => {
        app.preloader.init(preloaderEl);
      });
    },
    tabMounted(tabEl) {
      const app = this;
      $(tabEl)
        .find('.preloader')
        .each((index, preloaderEl) => {
          app.preloader.init(preloaderEl);
        });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.preloader').each((index, preloaderEl) => {
        app.preloader.init(preloaderEl);
      });
    },
  },
  vnode: {
    preloader: {
      insert(vnode) {
        const app = this;
        const preloaderEl = vnode.elm;
        app.preloader.init(preloaderEl);
      },
    },
  },
};
