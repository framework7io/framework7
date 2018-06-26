'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _class = require('../../utils/class');

var _class2 = _interopRequireDefault(_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint indent: ["off"] */


var PhotoBrowser = function (_Framework7Class) {
  _inherits(PhotoBrowser, _Framework7Class);

  function PhotoBrowser(app) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PhotoBrowser);

    var _this = _possibleConstructorReturn(this, (PhotoBrowser.__proto__ || Object.getPrototypeOf(PhotoBrowser)).call(this, params, [app]));

    var pb = _this;
    pb.app = app;

    var defaults = _utils2.default.extend({
      on: {}
    }, app.params.photoBrowser);

    // Extend defaults with modules params
    pb.useModulesParams(defaults);

    pb.params = _utils2.default.extend(defaults, params);

    _utils2.default.extend(pb, {
      exposed: false,
      opened: false,
      activeIndex: pb.params.swiper.initialSlide,
      url: pb.params.url,
      view: pb.params.view || app.views.main,
      swipeToClose: {
        allow: true,
        isTouched: false,
        diff: undefined,
        start: undefined,
        current: undefined,
        started: false,
        activeSlide: undefined,
        timeStart: undefined
      }
    });

    // Install Modules
    pb.useModules();

    // Init
    pb.init();
    return _this;
  }

  _createClass(PhotoBrowser, [{
    key: 'onSlideChange',
    value: function onSlideChange(swiper) {
      var pb = this;
      pb.activeIndex = swiper.activeIndex;

      var current = swiper.activeIndex + 1;
      var total = pb.params.virtualSlides ? pb.params.photos.length : swiper.slides.length;
      if (swiper.params.loop) {
        total -= 2;
        current -= swiper.loopedSlides;
        if (current < 1) current = total + current;
        if (current > total) current -= total;
      }

      var $activeSlideEl = pb.params.virtualSlides ? swiper.$wrapperEl.find('.swiper-slide[data-swiper-slide-index="' + swiper.activeIndex + '"]') : swiper.slides.eq(swiper.activeIndex);
      var $previousSlideEl = pb.params.virtualSlides ? swiper.$wrapperEl.find('.swiper-slide[data-swiper-slide-index="' + swiper.previousIndex + '"]') : swiper.slides.eq(swiper.previousIndex);

      var $currentEl = pb.$el.find('.photo-browser-current');
      var $totalEl = pb.$el.find('.photo-browser-total');
      if (pb.params.type === 'page' && pb.params.navbar && $currentEl.length === 0 && pb.app.theme === 'ios') {
        var navbarEl = pb.app.navbar.getElByPage(pb.$el);
        if (navbarEl) {
          $currentEl = (0, _dom2.default)(navbarEl).find('.photo-browser-current');
          $totalEl = (0, _dom2.default)(navbarEl).find('.photo-browser-total');
        }
      }
      $currentEl.text(current);
      $totalEl.text(total);

      // Update captions
      if (pb.captions.length > 0) {
        var captionIndex = swiper.params.loop ? $activeSlideEl.attr('data-swiper-slide-index') : pb.activeIndex;
        pb.$captionsContainerEl.find('.photo-browser-caption-active').removeClass('photo-browser-caption-active');
        pb.$captionsContainerEl.find('[data-caption-index="' + captionIndex + '"]').addClass('photo-browser-caption-active');
      }

      // Stop Video
      var previousSlideVideo = $previousSlideEl.find('video');
      if (previousSlideVideo.length > 0) {
        if ('pause' in previousSlideVideo[0]) previousSlideVideo[0].pause();
      }
    }
  }, {
    key: 'onTouchStart',
    value: function onTouchStart() {
      var pb = this;
      var swipeToClose = pb.swipeToClose;
      if (!swipeToClose.allow) return;
      swipeToClose.isTouched = true;
    }
  }, {
    key: 'onTouchMove',
    value: function onTouchMove(e) {
      var pb = this;
      var swipeToClose = pb.swipeToClose;

      if (!swipeToClose.isTouched) return;
      if (!swipeToClose.started) {
        swipeToClose.started = true;
        swipeToClose.start = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        if (pb.params.virtualSlides) {
          swipeToClose.activeSlide = pb.swiper.$wrapperEl.children('.swiper-slide-active');
        } else {
          swipeToClose.activeSlide = pb.swiper.slides.eq(pb.swiper.activeIndex);
        }
        swipeToClose.timeStart = _utils2.default.now();
      }
      e.preventDefault();
      swipeToClose.current = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      swipeToClose.diff = swipeToClose.start - swipeToClose.current;
      var opacity = 1 - Math.abs(swipeToClose.diff) / 300;
      var color = pb.exposed || pb.params.theme === 'dark' ? 0 : 255;
      swipeToClose.activeSlide.transform('translate3d(0,' + -swipeToClose.diff + 'px,0)');
      pb.swiper.$el.css('background-color', 'rgba(' + color + ', ' + color + ', ' + color + ', ' + opacity + ')').transition(0);
    }
  }, {
    key: 'onTouchEnd',
    value: function onTouchEnd() {
      var pb = this;
      var swipeToClose = pb.swipeToClose;
      swipeToClose.isTouched = false;
      if (!swipeToClose.started) {
        swipeToClose.started = false;
        return;
      }
      swipeToClose.started = false;
      swipeToClose.allow = false;
      var diff = Math.abs(swipeToClose.diff);
      var timeDiff = new Date().getTime() - swipeToClose.timeStart;
      if (timeDiff < 300 && diff > 20 || timeDiff >= 300 && diff > 100) {
        _utils2.default.nextTick(function () {
          if (pb.$el) {
            if (swipeToClose.diff < 0) pb.$el.addClass('swipe-close-to-bottom');else pb.$el.addClass('swipe-close-to-top');
          }
          pb.emit('local::swipeToClose', pb);
          pb.close();
          swipeToClose.allow = true;
        });
        return;
      }
      if (diff !== 0) {
        swipeToClose.activeSlide.addClass('photo-browser-transitioning').transitionEnd(function () {
          swipeToClose.allow = true;
          swipeToClose.activeSlide.removeClass('photo-browser-transitioning');
        });
      } else {
        swipeToClose.allow = true;
      }
      pb.swiper.$el.transition('').css('background-color', '');
      swipeToClose.activeSlide.transform('');
    }

    // Render Functions

  }, {
    key: 'renderNavbar',
    value: function renderNavbar() {
      var pb = this;
      if (pb.params.renderNavbar) return pb.params.renderNavbar.call(pb);

      var iconsColor = pb.params.iconsColor;
      if (!pb.params.iconsColor && pb.params.theme === 'dark') iconsColor = 'white';

      var backLinkText = pb.app.theme === 'ios' && pb.params.backLinkText ? pb.params.backLinkText : '';

      var isPopup = pb.params.type !== 'page';
      var navbarHtml = ('\n      <div class="navbar">\n        <div class="navbar-inner sliding">\n          <div class="left">\n            <a href="#" class="link ' + (isPopup ? 'popup-close' : '') + ' ' + (!backLinkText ? 'icon-only' : '') + ' ' + (!isPopup ? 'back' : '') + '" ' + (isPopup ? 'data-popup=".photo-browser-popup"' : '') + '>\n              <i class="icon icon-back ' + (iconsColor ? 'color-' + iconsColor : '') + '"></i>\n              ' + (backLinkText ? '<span>' + backLinkText + '</span>' : '') + '\n            </a>\n          </div>\n          <div class="title">\n            <span class="photo-browser-current"></span>\n            <span class="photo-browser-of">' + pb.params.navbarOfText + '</span>\n            <span class="photo-browser-total"></span>\n          </div>\n          <div class="right"></div>\n        </div>\n      </div>\n    ').trim();
      return navbarHtml;
    }
  }, {
    key: 'renderToolbar',
    value: function renderToolbar() {
      var pb = this;
      if (pb.params.renderToolbar) return pb.params.renderToolbar.call(pb);

      var iconsColor = pb.params.iconsColor;
      if (!pb.params.iconsColor && pb.params.theme === 'dark') iconsColor = 'white';

      var toolbarHtml = ('\n      <div class="toolbar tabbar toolbar-bottom-md">\n        <div class="toolbar-inner">\n          <a href="#" class="link photo-browser-prev">\n            <i class="icon icon-back ' + (iconsColor ? 'color-' + iconsColor : '') + '"></i>\n          </a>\n          <a href="#" class="link photo-browser-next">\n            <i class="icon icon-forward ' + (iconsColor ? 'color-' + iconsColor : '') + '"></i>\n          </a>\n        </div>\n      </div>\n    ').trim();
      return toolbarHtml;
    }
  }, {
    key: 'renderCaption',
    value: function renderCaption(caption, index) {
      var pb = this;
      if (pb.params.renderCaption) return pb.params.renderCaption.call(pb, caption, index);
      var captionHtml = ('\n      <div class="photo-browser-caption" data-caption-index="' + index + '">\n        ' + caption + '\n      </div>\n    ').trim();
      return captionHtml;
    }
  }, {
    key: 'renderObject',
    value: function renderObject(photo, index) {
      var pb = this;
      if (pb.params.renderObject) return pb.params.renderObject.call(pb, photo, index);
      var objHtml = '\n      <div class="photo-browser-slide photo-browser-object-slide swiper-slide" data-swiper-slide-index="' + index + '">' + (photo.html ? photo.html : photo) + '</div>\n    ';
      return objHtml;
    }
  }, {
    key: 'renderLazyPhoto',
    value: function renderLazyPhoto(photo, index) {
      var pb = this;
      if (pb.params.renderLazyPhoto) return pb.params.renderLazyPhoto.call(pb, photo, index);
      var photoHtml = ('\n      <div class="photo-browser-slide photo-browser-slide-lazy swiper-slide" data-swiper-slide-index="' + index + '">\n          <div class="preloader swiper-lazy-preloader ' + (pb.params.theme === 'dark' ? 'color-white' : '') + '">' + (pb.app.theme === 'md' ? _utils2.default.mdPreloaderContent : '') + '</div>\n          <span class="swiper-zoom-container">\n              <img data-src="' + (photo.url ? photo.url : photo) + '" class="swiper-lazy">\n          </span>\n      </div>\n    ').trim();
      return photoHtml;
    }
  }, {
    key: 'renderPhoto',
    value: function renderPhoto(photo, index) {
      var pb = this;
      if (pb.params.renderPhoto) return pb.params.renderPhoto.call(pb, photo, index);
      var photoHtml = ('\n      <div class="photo-browser-slide swiper-slide" data-swiper-slide-index="' + index + '">\n        <span class="swiper-zoom-container">\n          <img src="' + (photo.url ? photo.url : photo) + '">\n        </span>\n      </div>\n    ').trim();
      return photoHtml;
    }
  }, {
    key: 'render',
    value: function render() {
      var pb = this;
      if (pb.params.render) return pb.params.render.call(pb, pb.params);
      var html = ('\n      <div class="photo-browser photo-browser-' + pb.params.theme + '">\n        <div class="view">\n          <div class="page photo-browser-page photo-browser-page-' + pb.params.theme + ' no-toolbar ' + (!pb.params.navbar ? 'no-navbar' : '') + '" data-name="photo-browser-page">\n            ' + (pb.params.navbar ? pb.renderNavbar() : '') + '\n            ' + (pb.params.toolbar ? pb.renderToolbar() : '') + '\n            <div class="photo-browser-captions photo-browser-captions-' + (pb.params.captionsTheme || pb.params.theme) + '">\n              ' + pb.params.photos.map(function (photo, index) {
        if (photo.caption) return pb.renderCaption(photo.caption, index);
        return '';
      }).join(' ') + '\n            </div>\n            <div class="photo-browser-swiper-container swiper-container">\n              <div class="photo-browser-swiper-wrapper swiper-wrapper">\n                ' + (pb.params.virtualSlides ? '' : pb.params.photos.map(function (photo, index) {
        if (photo.html || (typeof photo === 'string' || photo instanceof String) && photo.indexOf('<') >= 0 && photo.indexOf('>') >= 0) {
          return pb.renderObject(photo, index);
        }
        if (pb.params.swiper.lazy === true || pb.params.swiper.lazy && pb.params.swiper.lazy.enabled) {
          return pb.renderLazyPhoto(photo, index);
        }
        return pb.renderPhoto(photo, index);
      }).join(' ')) + '\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ').trim();
      return html;
    }
  }, {
    key: 'renderStandalone',
    value: function renderStandalone() {
      var pb = this;
      if (pb.params.renderStandalone) return pb.params.renderStandalone.call(pb);
      var standaloneHtml = '<div class="popup photo-browser-popup photo-browser-standalone popup-tablet-fullscreen">' + pb.render() + '</div>';
      return standaloneHtml;
    }
  }, {
    key: 'renderPage',
    value: function renderPage() {
      var pb = this;
      if (pb.params.renderPage) return pb.params.renderPage.call(pb);
      var pageHtml = pb.render();

      return pageHtml;
    }
  }, {
    key: 'renderPopup',
    value: function renderPopup() {
      var pb = this;
      if (pb.params.renderPopup) return pb.params.renderPopup.call(pb);
      var popupHtml = '<div class="popup photo-browser-popup">' + pb.render() + '</div>';

      return popupHtml;
    }

    // Callbacks

  }, {
    key: 'onOpen',
    value: function onOpen(type, el) {
      var pb = this;
      var app = pb.app;
      var $el = (0, _dom2.default)(el);

      $el[0].f7PhotoBrowser = pb;

      pb.$el = $el;
      pb.el = $el[0];
      pb.openedIn = type;
      pb.opened = true;

      pb.$swiperContainerEl = pb.$el.find('.photo-browser-swiper-container');
      pb.$swiperWrapperEl = pb.$el.find('.photo-browser-swiper-wrapper');
      pb.slides = pb.$el.find('.photo-browser-slide');
      pb.$captionsContainerEl = pb.$el.find('.photo-browser-captions');
      pb.captions = pb.$el.find('.photo-browser-caption');

      // Init Swiper
      var swiperParams = _utils2.default.extend({}, pb.params.swiper, {
        initialSlide: pb.activeIndex,
        on: {
          tap: function tap(e) {
            pb.emit('local::tap', e);
          },
          click: function click(e) {
            if (pb.params.exposition) {
              pb.expositionToggle();
            }
            pb.emit('local::click', e);
          },
          doubleTap: function doubleTap(e) {
            pb.emit('local::doubleTap', e);
          },
          slideChange: function slideChange() {
            var swiper = this;
            pb.onSlideChange(swiper);

            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            pb.emit.apply(pb, ['local::slideChange'].concat(args));
          },
          transitionStart: function transitionStart() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            pb.emit.apply(pb, ['local::transitionStart'].concat(args));
          },
          transitionEnd: function transitionEnd() {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            pb.emit.apply(pb, ['local::transitionEnd'].concat(args));
          },
          slideChangeTransitionStart: function slideChangeTransitionStart() {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }

            pb.emit.apply(pb, ['local::slideChangeTransitionStart'].concat(args));
          },
          slideChangeTransitionEnd: function slideChangeTransitionEnd() {
            for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
              args[_key5] = arguments[_key5];
            }

            pb.emit.apply(pb, ['local::slideChangeTransitionEnd'].concat(args));
          },
          lazyImageLoad: function lazyImageLoad() {
            for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
              args[_key6] = arguments[_key6];
            }

            pb.emit.apply(pb, ['local::lazyImageLoad'].concat(args));
          },
          lazyImageReady: function lazyImageReady() {
            for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
              args[_key7] = arguments[_key7];
            }

            var slideEl = args[0];
            (0, _dom2.default)(slideEl).removeClass('photo-browser-slide-lazy');
            pb.emit.apply(pb, ['local::lazyImageReady'].concat(args));
          }
        }
      });
      if (pb.params.swipeToClose && pb.params.type !== 'page') {
        _utils2.default.extend(swiperParams.on, {
          touchStart: function touchStart(e) {
            pb.onTouchStart(e);
            pb.emit('local::touchStart', e);
          },
          touchMoveOpposite: function touchMoveOpposite(e) {
            pb.onTouchMove(e);
            pb.emit('local::touchMoveOpposite', e);
          },
          touchEnd: function touchEnd(e) {
            pb.onTouchEnd(e);
            pb.emit('local::touchEnd', e);
          }
        });
      }
      if (pb.params.virtualSlides) {
        _utils2.default.extend(swiperParams, {
          virtual: {
            slides: pb.params.photos,
            renderSlide: function renderSlide(photo, index) {
              if (photo.html || (typeof photo === 'string' || photo instanceof String) && photo.indexOf('<') >= 0 && photo.indexOf('>') >= 0) {
                return pb.renderObject(photo, index);
              }
              if (pb.params.swiper.lazy === true || pb.params.swiper.lazy && pb.params.swiper.lazy.enabled) {
                return pb.renderLazyPhoto(photo, index);
              }
              return pb.renderPhoto(photo, index);
            }
          }
        });
      }

      pb.swiper = app.swiper.create(pb.$swiperContainerEl, swiperParams);

      if (pb.activeIndex === 0) {
        pb.onSlideChange(pb.swiper);
      }
      if (pb.$el) {
        pb.$el.trigger('photobrowser:open');
      }
      pb.emit('local::open photoBrowserOpen', pb);
    }
  }, {
    key: 'onOpened',
    value: function onOpened() {
      var pb = this;

      if (pb.$el) {
        pb.$el.trigger('photobrowser:opened');
      }
      pb.emit('local::opened photoBrowserOpened', pb);
    }
  }, {
    key: 'onClose',
    value: function onClose() {
      var pb = this;
      if (pb.destroyed) return;

      // Destroy Swiper
      if (pb.swiper && pb.swiper.destroy) {
        pb.swiper.destroy(true, false);
        pb.swiper = null;
        delete pb.swiper;
      }
      if (pb.$el) {
        pb.$el.trigger('photobrowser:close');
      }
      pb.emit('local::close photoBrowserClose', pb);
    }
  }, {
    key: 'onClosed',
    value: function onClosed() {
      var pb = this;
      if (pb.destroyed) return;
      pb.opened = false;
      pb.$el = null;
      pb.el = null;
      delete pb.$el;
      delete pb.el;
      if (pb.$el) {
        pb.$el.trigger('photobrowser:closed');
      }
      pb.emit('local::closed photoBrowserClosed', pb);
    }

    // Open

  }, {
    key: 'openPage',
    value: function openPage() {
      var pb = this;
      if (pb.opened) return pb;

      var pageHtml = pb.renderPage();

      pb.view.router.navigate({
        url: pb.url,
        route: {
          content: pageHtml,
          path: pb.url,
          on: {
            pageBeforeIn: function pageBeforeIn(e, page) {
              pb.view.$el.addClass('with-photo-browser-page with-photo-browser-page-' + pb.params.theme);
              pb.onOpen('page', page.el);
            },
            pageAfterIn: function pageAfterIn(e, page) {
              pb.onOpened('page', page.el);
            },
            pageBeforeOut: function pageBeforeOut(e, page) {
              pb.view.$el.removeClass('with-photo-browser-page with-photo-browser-page-exposed with-photo-browser-page-' + pb.params.theme);
              pb.onClose('page', page.el);
            },
            pageAfterOut: function pageAfterOut(e, page) {
              pb.onClosed('page', page.el);
            }
          }
        }
      });
      return pb;
    }
  }, {
    key: 'openStandalone',
    value: function openStandalone() {
      var pb = this;
      if (pb.opened) return pb;

      var standaloneHtml = pb.renderStandalone();

      var popupParams = {
        backdrop: false,
        content: standaloneHtml,
        on: {
          popupOpen: function popupOpen(popup) {
            pb.onOpen('popup', popup.el);
          },
          popupOpened: function popupOpened(popup) {
            pb.onOpened('popup', popup.el);
          },
          popupClose: function popupClose(popup) {
            pb.onClose('popup', popup.el);
          },
          popupClosed: function popupClosed(popup) {
            pb.onClosed('popup', popup.el);
          }
        }
      };

      if (pb.params.routableModals) {
        pb.view.router.navigate({
          url: pb.url,
          route: {
            path: pb.url,
            popup: popupParams
          }
        });
      } else {
        pb.modal = pb.app.popup.create(popupParams).open();
      }
      return pb;
    }
  }, {
    key: 'openPopup',
    value: function openPopup() {
      var pb = this;
      if (pb.opened) return pb;

      var popupHtml = pb.renderPopup();

      var popupParams = {
        content: popupHtml,
        on: {
          popupOpen: function popupOpen(popup) {
            pb.onOpen('popup', popup.el);
          },
          popupOpened: function popupOpened(popup) {
            pb.onOpened('popup', popup.el);
          },
          popupClose: function popupClose(popup) {
            pb.onClose('popup', popup.el);
          },
          popupClosed: function popupClosed(popup) {
            pb.onClosed('popup', popup.el);
          }
        }
      };

      if (pb.params.routableModals) {
        pb.view.router.navigate({
          url: pb.url,
          route: {
            path: pb.url,
            popup: popupParams
          }
        });
      } else {
        pb.modal = pb.app.popup.create(popupParams).open();
      }
      return pb;
    }

    // Exposition

  }, {
    key: 'expositionEnable',
    value: function expositionEnable() {
      var pb = this;
      if (pb.params.type === 'page') {
        pb.view.$el.addClass('with-photo-browser-page-exposed');
      }
      if (pb.$el) pb.$el.addClass('photo-browser-exposed');
      if (pb.params.expositionHideCaptions) pb.$captionsContainerEl.addClass('photo-browser-captions-exposed');
      pb.exposed = true;
      return pb;
    }
  }, {
    key: 'expositionDisable',
    value: function expositionDisable() {
      var pb = this;
      if (pb.params.type === 'page') {
        pb.view.$el.removeClass('with-photo-browser-page-exposed');
      }
      if (pb.$el) pb.$el.removeClass('photo-browser-exposed');
      if (pb.params.expositionHideCaptions) pb.$captionsContainerEl.removeClass('photo-browser-captions-exposed');
      pb.exposed = false;
      return pb;
    }
  }, {
    key: 'expositionToggle',
    value: function expositionToggle() {
      var pb = this;
      if (pb.params.type === 'page') {
        pb.view.$el.toggleClass('with-photo-browser-page-exposed');
      }
      if (pb.$el) pb.$el.toggleClass('photo-browser-exposed');
      if (pb.params.expositionHideCaptions) pb.$captionsContainerEl.toggleClass('photo-browser-captions-exposed');
      pb.exposed = !pb.exposed;
      return pb;
    }
  }, {
    key: 'open',
    value: function open(index) {
      var pb = this;
      var type = pb.params.type;
      if (pb.opened) {
        if (pb.swiper && typeof index !== 'undefined') {
          pb.swiper.slideTo(parseInt(index, 10));
        }
        return pb;
      }
      if (typeof index !== 'undefined') {
        pb.activeIndex = index;
      }
      if (type === 'standalone') {
        pb.openStandalone();
      }
      if (type === 'page') {
        pb.openPage();
      }
      if (type === 'popup') {
        pb.openPopup();
      }
      return pb;
    }
  }, {
    key: 'close',
    value: function close() {
      var pb = this;
      if (!pb.opened) return pb;
      if (pb.params.routableModals || pb.openedIn === 'page') {
        if (pb.view) pb.view.router.back();
      } else {
        pb.modal.once('modalClosed', function () {
          _utils2.default.nextTick(function () {
            pb.modal.destroy();
            delete pb.modal;
          });
        });
        pb.modal.close();
      }
      return pb;
    }
    // eslint-disable-next-line

  }, {
    key: 'init',
    value: function init() {}
  }, {
    key: 'destroy',
    value: function destroy() {
      var pb = this;
      pb.emit('local::beforeDestroy photoBrowserBeforeDestroy', pb);
      if (pb.$el) {
        pb.$el.trigger('photobrowser:beforedestroy');
        delete pb.$el[0].f7PhotoBrowser;
      }
      _utils2.default.deleteProps(pb);
      pb = null;
    }
  }]);

  return PhotoBrowser;
}(_class2.default);

exports.default = PhotoBrowser;