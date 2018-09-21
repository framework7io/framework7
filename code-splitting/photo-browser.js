
function framework7ComponentLoader(chunks) {
  var doc = document;
  var win = window;
  var $ = chunks.$;
  var Template7 = chunks.Template7;
  var Utils = chunks.Utils;
  var Device = chunks.Device;
  var Support = chunks.Support;
  var ConstructorMethods = chunks.ConstructorMethods;
  var ModalMethods = chunks.ModalMethods;
  var Framework7Class = chunks.Framework7Class;
  var Modal = chunks.Modal;

  /* eslint indent: ["off"] */

  var PhotoBrowser = (function (Framework7Class$$1) {
    function PhotoBrowser(app, params) {
      if ( params === void 0 ) params = {};

      Framework7Class$$1.call(this, params, [app]);

      var pb = this;
      pb.app = app;

      var defaults = Utils.extend({
        on: {},
      }, app.params.photoBrowser);

      // Extend defaults with modules params
      pb.useModulesParams(defaults);

      pb.params = Utils.extend(defaults, params);

      Utils.extend(pb, {
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
          timeStart: undefined,
        },
      });

      // Install Modules
      pb.useModules();

      // Init
      pb.init();
    }

    if ( Framework7Class$$1 ) PhotoBrowser.__proto__ = Framework7Class$$1;
    PhotoBrowser.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
    PhotoBrowser.prototype.constructor = PhotoBrowser;

    PhotoBrowser.prototype.onSlideChange = function onSlideChange (swiper) {
      var pb = this;
      pb.activeIndex = swiper.activeIndex;

      var current = swiper.activeIndex + 1;
      var total = pb.params.virtualSlides ? pb.params.photos.length : swiper.slides.length;
      if (swiper.params.loop) {
        total -= 2;
        current -= swiper.loopedSlides;
        if (current < 1) { current = total + current; }
        if (current > total) { current -= total; }
      }

      var $activeSlideEl = pb.params.virtualSlides
        ? swiper.$wrapperEl.find((".swiper-slide[data-swiper-slide-index=\"" + (swiper.activeIndex) + "\"]"))
        : swiper.slides.eq(swiper.activeIndex);
      var $previousSlideEl = pb.params.virtualSlides
        ? swiper.$wrapperEl.find((".swiper-slide[data-swiper-slide-index=\"" + (swiper.previousIndex) + "\"]"))
        : swiper.slides.eq(swiper.previousIndex);

      var $currentEl = pb.$el.find('.photo-browser-current');
      var $totalEl = pb.$el.find('.photo-browser-total');
      if (pb.params.type === 'page' && pb.params.navbar && $currentEl.length === 0 && pb.app.theme === 'ios') {
        var navbarEl = pb.app.navbar.getElByPage(pb.$el);
        if (navbarEl) {
          $currentEl = $(navbarEl).find('.photo-browser-current');
          $totalEl = $(navbarEl).find('.photo-browser-total');
        }
      }
      $currentEl.text(current);
      $totalEl.text(total);

      // Update captions
      if (pb.captions.length > 0) {
        var captionIndex = swiper.params.loop ? $activeSlideEl.attr('data-swiper-slide-index') : pb.activeIndex;
        pb.$captionsContainerEl.find('.photo-browser-caption-active').removeClass('photo-browser-caption-active');
        pb.$captionsContainerEl.find(("[data-caption-index=\"" + captionIndex + "\"]")).addClass('photo-browser-caption-active');
      }

      // Stop Video
      var previousSlideVideo = $previousSlideEl.find('video');
      if (previousSlideVideo.length > 0) {
        if ('pause' in previousSlideVideo[0]) { previousSlideVideo[0].pause(); }
      }
    };

    PhotoBrowser.prototype.onTouchStart = function onTouchStart () {
      var pb = this;
      var swipeToClose = pb.swipeToClose;
      if (!swipeToClose.allow) { return; }
      swipeToClose.isTouched = true;
    };

    PhotoBrowser.prototype.onTouchMove = function onTouchMove (e) {
      var pb = this;
      var swipeToClose = pb.swipeToClose;

      if (!swipeToClose.isTouched) { return; }
      if (!swipeToClose.started) {
        swipeToClose.started = true;
        swipeToClose.start = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        if (pb.params.virtualSlides) {
          swipeToClose.activeSlide = pb.swiper.$wrapperEl.children('.swiper-slide-active');
        } else {
          swipeToClose.activeSlide = pb.swiper.slides.eq(pb.swiper.activeIndex);
        }
        swipeToClose.timeStart = Utils.now();
      }
      e.preventDefault();
      swipeToClose.current = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      swipeToClose.diff = swipeToClose.start - swipeToClose.current;
      var opacity = 1 - (Math.abs(swipeToClose.diff) / 300);
      var color = pb.exposed || pb.params.theme === 'dark' ? 0 : 255;
      swipeToClose.activeSlide.transform(("translate3d(0," + (-swipeToClose.diff) + "px,0)"));
      pb.swiper.$el.css('background-color', ("rgba(" + color + ", " + color + ", " + color + ", " + opacity + ")")).transition(0);
    };

    PhotoBrowser.prototype.onTouchEnd = function onTouchEnd () {
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
      var timeDiff = (new Date()).getTime() - swipeToClose.timeStart;
      if ((timeDiff < 300 && diff > 20) || (timeDiff >= 300 && diff > 100)) {
        Utils.nextTick(function () {
          if (pb.$el) {
            if (swipeToClose.diff < 0) { pb.$el.addClass('swipe-close-to-bottom'); }
            else { pb.$el.addClass('swipe-close-to-top'); }
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
    };

    // Render Functions
    PhotoBrowser.prototype.renderNavbar = function renderNavbar () {
      var pb = this;
      if (pb.params.renderNavbar) { return pb.params.renderNavbar.call(pb); }

      var iconsColor = pb.params.iconsColor;
      if (!pb.params.iconsColor && pb.params.theme === 'dark') { iconsColor = 'white'; }

      var backLinkText = pb.app.theme === 'ios' && pb.params.backLinkText ? pb.params.backLinkText : '';

      var isPopup = pb.params.type !== 'page';
      var navbarHtml = ("\n      <div class=\"navbar\">\n        <div class=\"navbar-inner sliding\">\n          <div class=\"left\">\n            <a href=\"#\" class=\"link " + (isPopup ? 'popup-close' : '') + " " + (!backLinkText ? 'icon-only' : '') + " " + (!isPopup ? 'back' : '') + "\" " + (isPopup ? 'data-popup=".photo-browser-popup"' : '') + ">\n              <i class=\"icon icon-back " + (iconsColor ? ("color-" + iconsColor) : '') + "\"></i>\n              " + (backLinkText ? ("<span>" + backLinkText + "</span>") : '') + "\n            </a>\n          </div>\n          <div class=\"title\">\n            <span class=\"photo-browser-current\"></span>\n            <span class=\"photo-browser-of\">" + (pb.params.navbarOfText) + "</span>\n            <span class=\"photo-browser-total\"></span>\n          </div>\n          <div class=\"right\"></div>\n        </div>\n      </div>\n    ").trim();
      return navbarHtml;
    };

    PhotoBrowser.prototype.renderToolbar = function renderToolbar () {
      var pb = this;
      if (pb.params.renderToolbar) { return pb.params.renderToolbar.call(pb); }

      var iconsColor = pb.params.iconsColor;
      if (!pb.params.iconsColor && pb.params.theme === 'dark') { iconsColor = 'white'; }

      var toolbarHtml = ("\n      <div class=\"toolbar tabbar toolbar-bottom-md\">\n        <div class=\"toolbar-inner\">\n          <a href=\"#\" class=\"link photo-browser-prev\">\n            <i class=\"icon icon-back " + (iconsColor ? ("color-" + iconsColor) : '') + "\"></i>\n          </a>\n          <a href=\"#\" class=\"link photo-browser-next\">\n            <i class=\"icon icon-forward " + (iconsColor ? ("color-" + iconsColor) : '') + "\"></i>\n          </a>\n        </div>\n      </div>\n    ").trim();
      return toolbarHtml;
    };

    PhotoBrowser.prototype.renderCaption = function renderCaption (caption, index) {
      var pb = this;
      if (pb.params.renderCaption) { return pb.params.renderCaption.call(pb, caption, index); }
      var captionHtml = ("\n      <div class=\"photo-browser-caption\" data-caption-index=\"" + index + "\">\n        " + caption + "\n      </div>\n    ").trim();
      return captionHtml;
    };

    PhotoBrowser.prototype.renderObject = function renderObject (photo, index) {
      var pb = this;
      if (pb.params.renderObject) { return pb.params.renderObject.call(pb, photo, index); }
      var objHtml = "\n      <div class=\"photo-browser-slide photo-browser-object-slide swiper-slide\" data-swiper-slide-index=\"" + index + "\">" + (photo.html ? photo.html : photo) + "</div>\n    ";
      return objHtml;
    };

    PhotoBrowser.prototype.renderLazyPhoto = function renderLazyPhoto (photo, index) {
      var pb = this;
      if (pb.params.renderLazyPhoto) { return pb.params.renderLazyPhoto.call(pb, photo, index); }
      var photoHtml = ("\n      <div class=\"photo-browser-slide photo-browser-slide-lazy swiper-slide\" data-swiper-slide-index=\"" + index + "\">\n          <div class=\"preloader swiper-lazy-preloader " + (pb.params.theme === 'dark' ? 'color-white' : '') + "\">" + (pb.app.theme === 'md' ? Utils.mdPreloaderContent : '') + "</div>\n          <span class=\"swiper-zoom-container\">\n              <img data-src=\"" + (photo.url ? photo.url : photo) + "\" class=\"swiper-lazy\">\n          </span>\n      </div>\n    ").trim();
      return photoHtml;
    };

    PhotoBrowser.prototype.renderPhoto = function renderPhoto (photo, index) {
      var pb = this;
      if (pb.params.renderPhoto) { return pb.params.renderPhoto.call(pb, photo, index); }
      var photoHtml = ("\n      <div class=\"photo-browser-slide swiper-slide\" data-swiper-slide-index=\"" + index + "\">\n        <span class=\"swiper-zoom-container\">\n          <img src=\"" + (photo.url ? photo.url : photo) + "\">\n        </span>\n      </div>\n    ").trim();
      return photoHtml;
    };

    PhotoBrowser.prototype.render = function render () {
      var pb = this;
      if (pb.params.render) { return pb.params.render.call(pb, pb.params); }
      var html = ("\n      <div class=\"photo-browser photo-browser-" + (pb.params.theme) + "\">\n        <div class=\"view\">\n          <div class=\"page photo-browser-page photo-browser-page-" + (pb.params.theme) + " no-toolbar " + (!pb.params.navbar ? 'no-navbar' : '') + "\" data-name=\"photo-browser-page\">\n            " + (pb.params.navbar ? pb.renderNavbar() : '') + "\n            " + (pb.params.toolbar ? pb.renderToolbar() : '') + "\n            <div class=\"photo-browser-captions photo-browser-captions-" + (pb.params.captionsTheme || pb.params.theme) + "\">\n              " + (pb.params.photos.map(function (photo, index) {
                  if (photo.caption) { return pb.renderCaption(photo.caption, index); }
                  return '';
                }).join(' ')) + "\n            </div>\n            <div class=\"photo-browser-swiper-container swiper-container\">\n              <div class=\"photo-browser-swiper-wrapper swiper-wrapper\">\n                " + (pb.params.virtualSlides ? '' : pb.params.photos.map(function (photo, index) {
                    if (photo.html || ((typeof photo === 'string' || photo instanceof String) && photo.indexOf('<') >= 0 && photo.indexOf('>') >= 0)) {
                      return pb.renderObject(photo, index);
                    }
                    if (pb.params.swiper.lazy === true || (pb.params.swiper.lazy && pb.params.swiper.lazy.enabled)) {
                      return pb.renderLazyPhoto(photo, index);
                    }
                    return pb.renderPhoto(photo, index);
                  }).join(' ')) + "\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ").trim();
      return html;
    };

    PhotoBrowser.prototype.renderStandalone = function renderStandalone () {
      var pb = this;
      if (pb.params.renderStandalone) { return pb.params.renderStandalone.call(pb); }
      var standaloneHtml = "<div class=\"popup photo-browser-popup photo-browser-standalone popup-tablet-fullscreen\">" + (pb.render()) + "</div>";
      return standaloneHtml;
    };

    PhotoBrowser.prototype.renderPage = function renderPage () {
      var pb = this;
      if (pb.params.renderPage) { return pb.params.renderPage.call(pb); }
      var pageHtml = pb.render();

      return pageHtml;
    };

    PhotoBrowser.prototype.renderPopup = function renderPopup () {
      var pb = this;
      if (pb.params.renderPopup) { return pb.params.renderPopup.call(pb); }
      var popupHtml = "<div class=\"popup photo-browser-popup\">" + (pb.render()) + "</div>";

      return popupHtml;
    };

    // Callbacks
    PhotoBrowser.prototype.onOpen = function onOpen (type, el) {
      var pb = this;
      var app = pb.app;
      var $el = $(el);

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
      var swiperParams = Utils.extend({}, pb.params.swiper, {
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
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            var swiper = this;
            pb.onSlideChange(swiper);
            pb.emit.apply(pb, [ 'local::slideChange' ].concat( args ));
          },
          transitionStart: function transitionStart() {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            pb.emit.apply(pb, [ 'local::transitionStart' ].concat( args ));
          },
          transitionEnd: function transitionEnd() {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            pb.emit.apply(pb, [ 'local::transitionEnd' ].concat( args ));
          },
          slideChangeTransitionStart: function slideChangeTransitionStart() {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            pb.emit.apply(pb, [ 'local::slideChangeTransitionStart' ].concat( args ));
          },
          slideChangeTransitionEnd: function slideChangeTransitionEnd() {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            pb.emit.apply(pb, [ 'local::slideChangeTransitionEnd' ].concat( args ));
          },
          lazyImageLoad: function lazyImageLoad() {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            pb.emit.apply(pb, [ 'local::lazyImageLoad' ].concat( args ));
          },
          lazyImageReady: function lazyImageReady() {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            var slideEl = args[0];
            $(slideEl).removeClass('photo-browser-slide-lazy');
            pb.emit.apply(pb, [ 'local::lazyImageReady' ].concat( args ));
          },
        },
      });
      if (pb.params.swipeToClose && pb.params.type !== 'page') {
        Utils.extend(swiperParams.on, {
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
          },
        });
      }
      if (pb.params.virtualSlides) {
        Utils.extend(swiperParams, {
          virtual: {
            slides: pb.params.photos,
            renderSlide: function renderSlide(photo, index) {
              if (photo.html || ((typeof photo === 'string' || photo instanceof String) && photo.indexOf('<') >= 0 && photo.indexOf('>') >= 0)) {
                return pb.renderObject(photo, index);
              }
              if (pb.params.swiper.lazy === true || (pb.params.swiper.lazy && pb.params.swiper.lazy.enabled)) {
                return pb.renderLazyPhoto(photo, index);
              }
              return pb.renderPhoto(photo, index);
            },
          },
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
    };

    PhotoBrowser.prototype.onOpened = function onOpened () {
      var pb = this;

      if (pb.$el) {
        pb.$el.trigger('photobrowser:opened');
      }
      pb.emit('local::opened photoBrowserOpened', pb);
    };

    PhotoBrowser.prototype.onClose = function onClose () {
      var pb = this;
      if (pb.destroyed) { return; }

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
    };

    PhotoBrowser.prototype.onClosed = function onClosed () {
      var pb = this;
      if (pb.destroyed) { return; }
      pb.opened = false;
      pb.$el = null;
      pb.el = null;
      delete pb.$el;
      delete pb.el;
      if (pb.$el) {
        pb.$el.trigger('photobrowser:closed');
      }
      pb.emit('local::closed photoBrowserClosed', pb);
    };

    // Open
    PhotoBrowser.prototype.openPage = function openPage () {
      var pb = this;
      if (pb.opened) { return pb; }

      var pageHtml = pb.renderPage();

      pb.view.router.navigate({
        url: pb.url,
        route: {
          content: pageHtml,
          path: pb.url,
          on: {
            pageBeforeIn: function pageBeforeIn(e, page) {
              pb.view.$el.addClass(("with-photo-browser-page with-photo-browser-page-" + (pb.params.theme)));
              pb.onOpen('page', page.el);
            },
            pageAfterIn: function pageAfterIn(e, page) {
              pb.onOpened('page', page.el);
            },
            pageBeforeOut: function pageBeforeOut(e, page) {
              pb.view.$el.removeClass(("with-photo-browser-page with-photo-browser-page-exposed with-photo-browser-page-" + (pb.params.theme)));
              pb.onClose('page', page.el);
            },
            pageAfterOut: function pageAfterOut(e, page) {
              pb.onClosed('page', page.el);
            },
          },
        },
      });
      return pb;
    };

    PhotoBrowser.prototype.openStandalone = function openStandalone () {
      var pb = this;
      if (pb.opened) { return pb; }

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
          },
        },
      };

      if (pb.params.routableModals) {
        pb.view.router.navigate({
          url: pb.url,
          route: {
            path: pb.url,
            popup: popupParams,
          },
        });
      } else {
        pb.modal = pb.app.popup.create(popupParams).open();
      }
      return pb;
    };

    PhotoBrowser.prototype.openPopup = function openPopup () {
      var pb = this;
      if (pb.opened) { return pb; }

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
          },
        },
      };

      if (pb.params.routableModals) {
        pb.view.router.navigate({
          url: pb.url,
          route: {
            path: pb.url,
            popup: popupParams,
          },
        });
      } else {
        pb.modal = pb.app.popup.create(popupParams).open();
      }
      return pb;
    };

    // Exposition
    PhotoBrowser.prototype.expositionEnable = function expositionEnable () {
      var pb = this;
      if (pb.params.type === 'page') {
        pb.view.$el.addClass('with-photo-browser-page-exposed');
      }
      if (pb.$el) { pb.$el.addClass('photo-browser-exposed'); }
      if (pb.params.expositionHideCaptions) { pb.$captionsContainerEl.addClass('photo-browser-captions-exposed'); }
      pb.exposed = true;
      return pb;
    };

    PhotoBrowser.prototype.expositionDisable = function expositionDisable () {
      var pb = this;
      if (pb.params.type === 'page') {
        pb.view.$el.removeClass('with-photo-browser-page-exposed');
      }
      if (pb.$el) { pb.$el.removeClass('photo-browser-exposed'); }
      if (pb.params.expositionHideCaptions) { pb.$captionsContainerEl.removeClass('photo-browser-captions-exposed'); }
      pb.exposed = false;
      return pb;
    };

    PhotoBrowser.prototype.expositionToggle = function expositionToggle () {
      var pb = this;
      if (pb.params.type === 'page') {
        pb.view.$el.toggleClass('with-photo-browser-page-exposed');
      }
      if (pb.$el) { pb.$el.toggleClass('photo-browser-exposed'); }
      if (pb.params.expositionHideCaptions) { pb.$captionsContainerEl.toggleClass('photo-browser-captions-exposed'); }
      pb.exposed = !pb.exposed;
      return pb;
    };

    PhotoBrowser.prototype.open = function open (index) {
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
    };

    PhotoBrowser.prototype.close = function close () {
      var pb = this;
      if (!pb.opened) { return pb; }
      if (pb.params.routableModals || pb.openedIn === 'page') {
        if (pb.view) { pb.view.router.back(); }
      } else {
        pb.modal.once('modalClosed', function () {
          Utils.nextTick(function () {
            pb.modal.destroy();
            delete pb.modal;
          });
        });
        pb.modal.close();
      }
      return pb;
    };
    // eslint-disable-next-line
    PhotoBrowser.prototype.init = function init () {};

    PhotoBrowser.prototype.destroy = function destroy () {
      var pb = this;
      pb.emit('local::beforeDestroy photoBrowserBeforeDestroy', pb);
      if (pb.$el) {
        pb.$el.trigger('photobrowser:beforedestroy');
        pb.$el[0].f7PhotoBrowser = null;
        delete pb.$el[0].f7PhotoBrowser;
      }
      Utils.deleteProps(pb);
      pb = null;
    };

    return PhotoBrowser;
  }(Framework7Class));

  var photoBrowser = {
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
    create: function create() {
      var app = this;
      app.photoBrowser = ConstructorMethods({
        defaultSelector: '.photo-browser',
        constructor: PhotoBrowser,
        app: app,
        domProp: 'f7PhotoBrowser',
      });
    },
    static: {
      PhotoBrowser: PhotoBrowser,
    },
  };

  return photoBrowser;
}
framework7ComponentLoader.componentName = 'photoBrowser';

