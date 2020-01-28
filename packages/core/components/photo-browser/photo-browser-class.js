/* eslint indent: ["off"] */
import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

class PhotoBrowser extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);

    const pb = this;
    pb.app = app;

    const defaults = Utils.extend({
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

  get view() {
    const { params, app } = this;
    return params.view || app.views.main;
  }

  onSlideChange(swiper) {
    const pb = this;
    pb.activeIndex = swiper.activeIndex;

    let current = swiper.activeIndex + 1;
    let total = pb.params.virtualSlides ? pb.params.photos.length : swiper.slides.length;
    if (swiper.params.loop) {
      total -= 2;
      current -= swiper.loopedSlides;
      if (current < 1) current = total + current;
      if (current > total) current -= total;
    }

    const $activeSlideEl = pb.params.virtualSlides
      ? swiper.$wrapperEl.find(`.swiper-slide[data-swiper-slide-index="${swiper.activeIndex}"]`)
      : swiper.slides.eq(swiper.activeIndex);
    const $previousSlideEl = pb.params.virtualSlides
      ? swiper.$wrapperEl.find(`.swiper-slide[data-swiper-slide-index="${swiper.previousIndex}"]`)
      : swiper.slides.eq(swiper.previousIndex);

    let $currentEl = pb.$el.find('.photo-browser-current');
    let $totalEl = pb.$el.find('.photo-browser-total');
    let navbarEl;
    if (pb.params.type === 'page' && pb.params.navbar && $currentEl.length === 0 && pb.app.theme === 'ios') {
      navbarEl = pb.app.navbar.getElByPage(pb.$el);
      if (navbarEl) {
        $currentEl = $(navbarEl).find('.photo-browser-current');
        $totalEl = $(navbarEl).find('.photo-browser-total');
      }
    }
    if ($currentEl.length && $totalEl.length) {
      $currentEl.text(current);
      $totalEl.text(total);
      if (!navbarEl) navbarEl = $currentEl.parents('.navbar')[0];
      if (navbarEl) {
        pb.app.navbar.size(navbarEl);
      }
    }

    // Update captions
    if (pb.captions.length > 0) {
      const captionIndex = swiper.params.loop ? $activeSlideEl.attr('data-swiper-slide-index') : pb.activeIndex;
      pb.$captionsContainerEl.find('.photo-browser-caption-active').removeClass('photo-browser-caption-active');
      pb.$captionsContainerEl.find(`[data-caption-index="${captionIndex}"]`).addClass('photo-browser-caption-active');
    }

    // Stop Video
    const previousSlideVideo = $previousSlideEl.find('video');
    if (previousSlideVideo.length > 0) {
      if ('pause' in previousSlideVideo[0]) previousSlideVideo[0].pause();
    }
  }

  onTouchStart() {
    const pb = this;
    const swipeToClose = pb.swipeToClose;
    if (!swipeToClose.allow) return;
    swipeToClose.isTouched = true;
  }

  onTouchMove(e) {
    const pb = this;
    const swipeToClose = pb.swipeToClose;

    if (!swipeToClose.isTouched) return;
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
    pb.$el.transition(0).transform(`translate3d(0,${-swipeToClose.diff}px,0)`);
  }

  onTouchEnd() {
    const pb = this;
    const swipeToClose = pb.swipeToClose;
    swipeToClose.isTouched = false;
    if (!swipeToClose.started) {
      swipeToClose.started = false;
      return;
    }
    swipeToClose.started = false;
    swipeToClose.allow = false;
    const diff = Math.abs(swipeToClose.diff);
    const timeDiff = (new Date()).getTime() - swipeToClose.timeStart;
    if ((timeDiff < 300 && diff > 20) || (timeDiff >= 300 && diff > 100)) {
      Utils.nextTick(() => {
        if (pb.$el) {
          if (swipeToClose.diff < 0) pb.$el.addClass('swipe-close-to-bottom');
          else pb.$el.addClass('swipe-close-to-top');
        }
        pb.emit('local::swipeToClose', pb);
        pb.$el.transform('').transition('');
        pb.close();
        swipeToClose.allow = true;
      });
      return;
    }
    if (diff !== 0) {
      pb.$el.addClass('photo-browser-transitioning').transitionEnd(() => {
        swipeToClose.allow = true;
        pb.$el.removeClass('photo-browser-transitioning');
      });
    } else {
      swipeToClose.allow = true;
    }
    Utils.nextTick(() => {
      pb.$el.transform('').transition('');
    });
  }

  // Render Functions
  renderNavbar() {
    const pb = this;
    if (pb.params.renderNavbar) return pb.params.renderNavbar.call(pb);

    let iconsColor = pb.params.iconsColor;
    if (!pb.params.iconsColor && pb.params.theme === 'dark') iconsColor = 'white';

    const pageBackLinkText = (pb.app.theme === 'ios' || pb.app.theme === 'aurora') && pb.params.pageBackLinkText ? pb.params.pageBackLinkText : '';

    const renderNavbarCount = typeof pb.params.navbarShowCount === 'undefined' ? pb.params.photos.length > 1 : pb.params.navbarShowCount;

    const isPopup = pb.params.type !== 'page';
    const navbarHtml = `
      <div class="navbar navbar-photo-browser ${pb.params.theme === 'dark' ? 'navbar-photo-browser-dark' : ''}">
        <div class="navbar-bg"></div>
        <div class="navbar-inner navbar-inner-centered-title sliding">
          ${!isPopup ? `
          <div class="left">
            <a class="link ${!pageBackLinkText ? 'icon-only' : ''} back">
              <i class="icon icon-back ${iconsColor ? `color-${iconsColor}` : ''}"></i>
              ${pageBackLinkText ? `<span>${pageBackLinkText}</span>` : ''}
            </a>
          </div>
          ` : ''}
          ${renderNavbarCount ? `
          <div class="title">
            <span class="photo-browser-current"></span>
            <span class="photo-browser-of">${pb.params.navbarOfText}</span>
            <span class="photo-browser-total"></span>
          </div>
          ` : ''}
          ${isPopup ? `
          <div class="right">
            <a class="link popup-close" data-popup=".photo-browser-popup">
              <span>${pb.params.popupCloseLinkText}</span>
            </a>
          </div>
          ` : ''}
        </div>
      </div>
    `.trim();
    return navbarHtml;
  }

  renderToolbar() {
    const pb = this;
    if (pb.params.renderToolbar) return pb.params.renderToolbar.call(pb);

    let iconsColor = pb.params.iconsColor;
    if (!pb.params.iconsColor && pb.params.theme === 'dark') iconsColor = 'white';

    const toolbarHtml = `
      <div class="toolbar toolbar-bottom tabbar">
        <div class="toolbar-inner">
          <a class="link photo-browser-prev">
            <i class="icon icon-back ${iconsColor ? `color-${iconsColor}` : ''}"></i>
          </a>
          <a class="link photo-browser-next">
            <i class="icon icon-forward ${iconsColor ? `color-${iconsColor}` : ''}"></i>
          </a>
        </div>
      </div>
    `.trim();
    return toolbarHtml;
  }

  renderCaption(caption, index) {
    const pb = this;
    if (pb.params.renderCaption) return pb.params.renderCaption.call(pb, caption, index);
    const captionHtml = `
      <div class="photo-browser-caption" data-caption-index="${index}">
        ${caption}
      </div>
    `.trim();
    return captionHtml;
  }

  renderObject(photo, index) {
    const pb = this;
    if (pb.params.renderObject) return pb.params.renderObject.call(pb, photo, index);
    const objHtml = `
      <div class="photo-browser-slide photo-browser-object-slide swiper-slide" data-swiper-slide-index="${index}">${photo.html ? photo.html : photo}</div>
    `;
    return objHtml;
  }

  renderLazyPhoto(photo, index) {
    const pb = this;
    if (pb.params.renderLazyPhoto) return pb.params.renderLazyPhoto.call(pb, photo, index);
    const photoHtml = `
      <div class="photo-browser-slide photo-browser-slide-lazy swiper-slide" data-swiper-slide-index="${index}">
          <div class="swiper-lazy-preloader"></div>
          <span class="swiper-zoom-container">
              <img data-src="${photo.url ? photo.url : photo}" class="swiper-lazy">
          </span>
      </div>
    `.trim();
    return photoHtml;
  }

  renderPhoto(photo, index) {
    const pb = this;
    if (pb.params.renderPhoto) return pb.params.renderPhoto.call(pb, photo, index);
    const photoHtml = `
      <div class="photo-browser-slide swiper-slide" data-swiper-slide-index="${index}">
        <span class="swiper-zoom-container">
          <img src="${photo.url ? photo.url : photo}">
        </span>
      </div>
    `.trim();
    return photoHtml;
  }

  render() {
    const pb = this;
    if (pb.params.render) return pb.params.render.call(pb, pb.params);
    const html = `
      <div class="photo-browser photo-browser-${pb.params.theme}">
        <div class="view">
          <div class="page photo-browser-page photo-browser-page-${pb.params.theme} no-toolbar ${!pb.params.navbar ? 'no-navbar' : ''}" data-name="photo-browser-page">
            ${pb.params.navbar ? pb.renderNavbar() : ''}
            ${pb.params.toolbar ? pb.renderToolbar() : ''}
            <div class="photo-browser-captions photo-browser-captions-${pb.params.captionsTheme || pb.params.theme}">
              ${pb.params.photos.map((photo, index) => {
                if (photo.caption) return pb.renderCaption(photo.caption, index);
                return '';
              }).join(' ')}
            </div>
            <div class="photo-browser-swiper-container swiper-container">
              <div class="photo-browser-swiper-wrapper swiper-wrapper">
                ${pb.params.virtualSlides ? '' : pb.params.photos.map((photo, index) => {
                  if (photo.html || ((typeof photo === 'string' || photo instanceof String) && photo.indexOf('<') >= 0 && photo.indexOf('>') >= 0)) {
                    return pb.renderObject(photo, index);
                  }
                  if (pb.params.swiper.lazy === true || (pb.params.swiper.lazy && pb.params.swiper.lazy.enabled)) {
                    return pb.renderLazyPhoto(photo, index);
                  }
                  return pb.renderPhoto(photo, index);
                }).join(' ')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `.trim();
    return html;
  }

  renderStandalone() {
    const pb = this;
    if (pb.params.renderStandalone) return pb.params.renderStandalone.call(pb);
    const standaloneHtml = `<div class="popup photo-browser-popup photo-browser-standalone popup-tablet-fullscreen">${pb.render()}</div>`;
    return standaloneHtml;
  }

  renderPage() {
    const pb = this;
    if (pb.params.renderPage) return pb.params.renderPage.call(pb);
    const pageHtml = pb.render();

    return pageHtml;
  }

  renderPopup() {
    const pb = this;
    if (pb.params.renderPopup) return pb.params.renderPopup.call(pb);
    const popupHtml = `<div class="popup photo-browser-popup">${pb.render()}</div>`;

    return popupHtml;
  }

  // Callbacks
  onOpen(type, el) {
    const pb = this;
    const app = pb.app;
    const $el = $(el);

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
    let clickTimeout;

    const swiperParams = Utils.extend({}, pb.params.swiper, {
      initialSlide: pb.activeIndex,
      on: {
        click(e) {
          clearTimeout(clickTimeout);

          if (pb.params.exposition) {
            clickTimeout = setTimeout(() => {
              pb.expositionToggle();
            }, 350);
          }
          pb.emit('local::tap', e);
          pb.emit('local::click', e);
        },
        doubleClick(e) {
          clearTimeout(clickTimeout);
          pb.emit('local::doubleTap', e);
          pb.emit('local::doubleClick', e);
        },
        slideChange(...args) {
          pb.emit('local::slideChange', ...args);
        },
        transitionStart(...args) {
          pb.emit('local::transitionStart', ...args);
        },
        transitionEnd(...args) {
          pb.emit('local::transitionEnd', ...args);
        },
        slideChangeTransitionStart(...args) {
          const swiper = this;
          pb.onSlideChange(swiper);
          pb.emit('local::slideChangeTransitionStart', ...args);
        },
        slideChangeTransitionEnd(...args) {
          pb.emit('local::slideChangeTransitionEnd', ...args);
        },
        lazyImageLoad(...args) {
          pb.emit('local::lazyImageLoad', ...args);
        },
        lazyImageReady(...args) {
          const slideEl = args[0];
          $(slideEl).removeClass('photo-browser-slide-lazy');
          pb.emit('local::lazyImageReady', ...args);
        },
      },
    });
    if (pb.params.swipeToClose && pb.params.type !== 'page') {
      Utils.extend(swiperParams.on, {
        touchStart(e) {
          pb.onTouchStart(e);
          pb.emit('local::touchStart', e);
        },
        touchMoveOpposite(e) {
          pb.onTouchMove(e);
          pb.emit('local::touchMoveOpposite', e);
        },
        touchEnd(e) {
          pb.onTouchEnd(e);
          pb.emit('local::touchEnd', e);
        },
      });
    }
    if (pb.params.virtualSlides) {
      Utils.extend(swiperParams, {
        virtual: {
          slides: pb.params.photos,
          renderSlide(photo, index) {
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
  }

  onOpened() {
    const pb = this;
    if (pb.$el && pb.params.type === 'standalone') {
      pb.$el.css('animation', 'none');
    }
    if (pb.$el) {
      pb.$el.trigger('photobrowser:opened');
    }
    pb.emit('local::opened photoBrowserOpened', pb);
  }

  onClose() {
    const pb = this;
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

  onClosed() {
    const pb = this;
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
  openPage() {
    const pb = this;
    if (pb.opened) return pb;

    const pageHtml = pb.renderPage();

    pb.view.router.navigate({
      url: pb.url,
      route: {
        content: pageHtml,
        path: pb.url,
        on: {
          pageBeforeIn(e, page) {
            pb.view.$el.addClass(`with-photo-browser-page with-photo-browser-page-${pb.params.theme}`);
            pb.onOpen('page', page.el);
          },
          pageAfterIn(e, page) {
            pb.onOpened('page', page.el);
          },
          pageBeforeOut(e, page) {
            pb.view.$el.removeClass(`with-photo-browser-page with-photo-browser-page-exposed with-photo-browser-page-${pb.params.theme}`);
            pb.onClose('page', page.el);
          },
          pageAfterOut(e, page) {
            pb.onClosed('page', page.el);
          },
        },
      },
    });
    return pb;
  }

  openStandalone() {
    const pb = this;
    if (pb.opened) return pb;

    const standaloneHtml = pb.renderStandalone();

    const popupParams = {
      backdrop: false,
      content: standaloneHtml,
      on: {
        popupOpen(popup) {
          pb.onOpen('popup', popup.el);
        },
        popupOpened(popup) {
          pb.onOpened('popup', popup.el);
        },
        popupClose(popup) {
          pb.onClose('popup', popup.el);
        },
        popupClosed(popup) {
          pb.onClosed('popup', popup.el);
        },
      },
    };

    if (pb.params.routableModals && pb.view) {
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
  }

  openPopup() {
    const pb = this;
    if (pb.opened) return pb;

    const popupHtml = pb.renderPopup();

    const popupParams = {
      content: popupHtml,
      push: pb.params.popupPush,
      on: {
        popupOpen(popup) {
          pb.onOpen('popup', popup.el);
        },
        popupOpened(popup) {
          pb.onOpened('popup', popup.el);
        },
        popupClose(popup) {
          pb.onClose('popup', popup.el);
        },
        popupClosed(popup) {
          pb.onClosed('popup', popup.el);
        },
      },
    };

    if (pb.params.routableModals && pb.view) {
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
  }

  // Exposition
  expositionEnable() {
    const pb = this;
    if (pb.params.type === 'page') {
      pb.view.$el.addClass('with-photo-browser-page-exposed');
    }
    if (pb.$el) pb.$el.addClass('photo-browser-exposed');
    if (pb.params.expositionHideCaptions) pb.$captionsContainerEl.addClass('photo-browser-captions-exposed');
    pb.exposed = true;
    return pb;
  }

  expositionDisable() {
    const pb = this;
    if (pb.params.type === 'page') {
      pb.view.$el.removeClass('with-photo-browser-page-exposed');
    }
    if (pb.$el) pb.$el.removeClass('photo-browser-exposed');
    if (pb.params.expositionHideCaptions) pb.$captionsContainerEl.removeClass('photo-browser-captions-exposed');
    pb.exposed = false;
    return pb;
  }

  expositionToggle() {
    const pb = this;
    if (pb.params.type === 'page') {
      pb.view.$el.toggleClass('with-photo-browser-page-exposed');
    }
    if (pb.$el) pb.$el.toggleClass('photo-browser-exposed');
    if (pb.params.expositionHideCaptions) pb.$captionsContainerEl.toggleClass('photo-browser-captions-exposed');
    pb.exposed = !pb.exposed;
    return pb;
  }

  open(index) {
    const pb = this;
    const type = pb.params.type;
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

  close() {
    const pb = this;
    if (!pb.opened) return pb;
    if ((pb.params.routableModals && pb.view) || pb.openedIn === 'page') {
      pb.view.router.back();
    } else {
      pb.modal.once('modalClosed', () => {
        Utils.nextTick(() => {
          if (pb.destroyed) return;
          pb.modal.destroy();
          delete pb.modal;
        });
      });
      pb.modal.close();
    }
    return pb;
  }
  // eslint-disable-next-line
  init() {}

  destroy() {
    let pb = this;
    pb.emit('local::beforeDestroy photoBrowserBeforeDestroy', pb);
    if (pb.$el) {
      pb.$el.trigger('photobrowser:beforedestroy');
      pb.$el[0].f7PhotoBrowser = null;
      delete pb.$el[0].f7PhotoBrowser;
    }
    Utils.deleteProps(pb);
    pb.destroyed = true;
    pb = null;
  }
}

export default PhotoBrowser;
