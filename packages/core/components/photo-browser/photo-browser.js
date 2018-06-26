'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _photoBrowserClass = require('./photo-browser-class');

var _photoBrowserClass2 = _interopRequireDefault(_photoBrowserClass);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
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
      virtualSlides: true,

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
        initialSlide: 0,
        spaceBetween: 20,
        speed: 300,
        loop: false,
        preloadImages: true,
        navigation: {
          nextEl: '.photo-browser-next',
          prevEl: '.photo-browser-prev'
        },
        zoom: {
          enabled: true,
          maxRatio: 3,
          minRatio: 1
        },
        lazy: {
          enabled: true
        }
      }
    }
  },
  create: function create() {
    var app = this;
    app.photoBrowser = (0, _constructorMethods2.default)({
      defaultSelector: '.photo-browser',
      constructor: _photoBrowserClass2.default,
      app: app,
      domProp: 'f7PhotoBrowser'
    });
  },

  static: {
    PhotoBrowser: _photoBrowserClass2.default
  }
};