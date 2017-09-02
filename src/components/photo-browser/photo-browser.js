import $ from 'dom7';
import Utils from '../../utils/utils';
import PhotoBrowser from './photo-browser-class';

export default {
  name: 'photoBrowser',
  params: {
    photoBrowser: {
      photos: [],
      exposition: true,
      expositionHideCaptions: false,
      type: 'standalone',
      navbar: true,
      toolbar: true,
      theme: 'light',
      captionsTheme: undefined,
      iconsColor: undefined,
      swipeToClose: true,
      backLinkText: 'Close',
      navbarOfText: 'of',
      view: undefined,
      url: 'photos/',
      routableModals: true,
      renderPage: undefined,
      renderPopup: undefined,
      renderStandalone: undefined,
      swiper: {
        initialSlide: 0,
        spaceBetween: 20,
        speed: 300,
        loop: false,
        preloadImages: true,
        navigation: {
          nextEl: '.photo-browser-next',
          prevEl: '.photo-browser-prev',
        },
        zoom: {
          enabled: true,
          maxRatio: 3,
          minRatio: 1,
        },
        lazy: {
          enabled: true,
        },
      },
    },
  },
  create() {
    const app = this;
    Utils.extend(app, {
      photoBrowser: {
        create(params) {
          return new PhotoBrowser(app, params);
        },
        get(el = '.photo-browser') {
          const $el = $(el);
          if ($el.length) return $el[0].f7PhotoBrowser;
          return undefined;
        },
        destroy(el) {
          if (el && (el instanceof PhotoBrowser) && el.destroy) return el.destroy();
          const $el = $(el);
          if ($el.length) return $el[0].f7PhotoBrowser.destroy();
          return undefined;
        },
      },
    });
  },
  static: {
    PhotoBrowser,
  },
};
