import PhotoBrowser from './photo-browser-class.js';
import ConstructorMethods from '../../shared/constructor-methods.js';

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
      popupPush: false,
      swipeToClose: true,
      pageBackLinkText: 'Back',
      popupCloseLinkText: 'Close',
      navbarOfText: 'of',
      navbarShowCount: undefined,
      view: undefined,
      url: 'photos/',
      routableModals: false,
      virtualSlides: true,
      closeByBackdropClick: true,

      renderNavbar: undefined,
      renderToolbar: undefined,
      renderCaption: undefined,
      renderObject: undefined,
      renderLazyPhoto: undefined,
      renderPhoto: undefined,
      renderPage: undefined,
      renderPopup: undefined,
      renderStandalone: undefined,

      swiper: {
        cssMode: false,
        initialSlide: 0,
        spaceBetween: 20,
        speed: 300,
        loop: false,
        preloadImages: true,
        keyboard: {
          enabled: true,
        },
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
    app.photoBrowser = ConstructorMethods({
      defaultSelector: '.photo-browser-popup, .photo-browser-page',
      constructor: PhotoBrowser,
      app,
      domProp: 'f7PhotoBrowser',
    });
  },
  static: {
    PhotoBrowser,
  },
};
