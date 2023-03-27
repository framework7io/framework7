import PhotoBrowser from './photo-browser-class.js';
import ConstructorMethods from '../../shared/constructor-methods.js';

export default {
  name: 'photoBrowser',
  params: {
    photoBrowser: {
      photos: [],
      thumbs: [],
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
      popupCloseLinkText: undefined,
      popupCloseLinkIcon: true,
      navbarOfText: 'of',
      navbarShowCount: undefined,
      view: undefined,
      url: 'photos/',
      routableModals: false,
      virtualSlides: true,
      lazy: true,
      closeByBackdropClick: true,

      renderNavbar: undefined,
      renderToolbar: undefined,
      renderCaption: undefined,
      renderObject: undefined,
      renderLazyPhoto: undefined,
      renderPhoto: undefined,
      renderThumb: undefined,
      renderPage: undefined,
      renderPopup: undefined,
      renderStandalone: undefined,

      swiper: {
        cssMode: false,
        initialSlide: 0,
        spaceBetween: 20,
        speed: 300,
        loop: false,
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
