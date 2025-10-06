import $ from '../../shared/dom7.js';
import { bindMethods } from '../../shared/utils.js';
import { getSupport } from '../../shared/get-support.js';

const Navbar = {
  size(el) {
    const app = this;

    const $el = $(el);

    const $innerEl = $el.children('.navbar-inner');
    if (!$innerEl.length) return;

    const needCenterTitle =
      $innerEl.hasClass('navbar-inner-centered-title') ||
      app.params.navbar[`${app.theme}CenterTitle`];
    const needLeftTitle = app.theme === 'ios' && !app.params.navbar[`${app.theme}CenterTitle`];

    if (!needCenterTitle && !needLeftTitle) return;

    if (
      $el.parents('.tab:not(.tab-active)').length > 0 ||
      $el.parents('.popup:not(.modal-in)').length > 0
    ) {
      return;
    }

    if (app.theme !== 'ios' && app.params.navbar[`${app.theme}CenterTitle`]) {
      $innerEl.addClass('navbar-inner-centered-title');
    }
    if (app.theme === 'ios' && !app.params.navbar.iosCenterTitle) {
      $innerEl.addClass('navbar-inner-left-title');
    }

    const left = app.rtl ? $innerEl.children('.right') : $innerEl.children('.left');
    const right = app.rtl ? $innerEl.children('.left') : $innerEl.children('.right');
    const title = $innerEl.children('.title');
    const noLeft = left.length === 0;
    const noRight = right.length === 0;
    const leftWidth = noLeft ? 0 : left.outerWidth(true);
    const rightWidth = noRight ? 0 : right.outerWidth(true);
    const titleWidth = title.outerWidth(true);
    const navbarStyles = $innerEl.styles();
    const navbarWidth = $innerEl[0].offsetWidth;
    const navbarInnerWidth =
      navbarWidth -
      parseInt(navbarStyles.paddingLeft, 10) -
      parseInt(navbarStyles.paddingRight, 10);

    let currLeft;
    let diff;
    if (noRight) {
      currLeft = navbarInnerWidth - titleWidth;
    }
    if (noLeft) {
      currLeft = 0;
    }
    if (!noLeft && !noRight) {
      currLeft = (navbarInnerWidth - rightWidth - titleWidth + leftWidth) / 2;
    }
    let requiredLeft = (navbarInnerWidth - titleWidth) / 2;
    if (navbarInnerWidth - leftWidth - rightWidth > titleWidth) {
      if (requiredLeft < leftWidth) {
        requiredLeft = leftWidth;
      }
      if (requiredLeft + titleWidth > navbarInnerWidth - rightWidth) {
        requiredLeft = navbarInnerWidth - rightWidth - titleWidth;
      }
      diff = requiredLeft - currLeft;
    } else {
      diff = 0;
    }

    // Center title
    if (needCenterTitle) {
      let titleLeft = diff;
      if (app.rtl && noLeft && noRight && title.length > 0) titleLeft = -titleLeft;
      title.css({ left: `${titleLeft}px` });
    }
  },
  hide(el, animate = true, hideStatusbar = false) {
    const app = this;
    const $el = $(el);
    if (!$el.length) return;
    if ($el.hasClass('navbar-hidden')) return;
    let className = `navbar-hidden${animate ? ' navbar-transitioning' : ''}`;
    const currentIsLarge = $el.find('.title-large').length;
    if (currentIsLarge) {
      className += ' navbar-large-hidden';
    }
    if (hideStatusbar) {
      className += ' navbar-hidden-statusbar';
    }
    $el.transitionEnd(() => {
      $el.removeClass('navbar-transitioning');
    });
    $el.addClass(className);

    $el.trigger('navbar:hide');
    app.emit('navbarHide', $el[0]);
  },
  show(el = '.navbar-hidden', animate = true) {
    const app = this;
    const $el = $(el);
    if (!$el.length) return;
    if (!$el.hasClass('navbar-hidden')) return;
    if (animate) {
      $el.addClass('navbar-transitioning');
      $el.transitionEnd(() => {
        $el.removeClass('navbar-transitioning');
      });
    }
    $el.removeClass('navbar-hidden navbar-large-hidden navbar-hidden-statusbar');

    $el.trigger('navbar:show');
    app.emit('navbarShow', $el[0]);
  },
  getElByPage(page) {
    let $pageEl;
    let $navbarEl;
    let pageData;
    if (page.$navbarEl || page.$el) {
      pageData = page;
      $pageEl = page.$el;
    } else {
      $pageEl = $(page);
      if ($pageEl.length > 0) pageData = $pageEl[0].f7Page;
    }
    if (pageData && pageData.$navbarEl && pageData.$navbarEl.length > 0) {
      $navbarEl = pageData.$navbarEl;
    } else if ($pageEl) {
      $navbarEl = $pageEl.children('.navbar');
    }
    if (!$navbarEl || ($navbarEl && $navbarEl.length === 0)) return undefined;
    return $navbarEl[0];
  },
  getPageByEl(navbarEl) {
    const $navbarEl = $(navbarEl);
    if ($navbarEl.parents('.page').length) {
      return $navbarEl.parents('.page')[0];
    }
    let pageEl;
    $navbarEl
      .parents('.view')
      .find('.page')
      .each((el) => {
        if (el && el.f7Page && el.f7Page.navbarEl && $navbarEl[0] === el.f7Page.navbarEl) {
          pageEl = el;
        }
      });
    return pageEl;
  },

  collapseLargeTitle(navbarEl) {
    const app = this;
    const $navbarEl = $(navbarEl);

    const $pageEl = $(app.navbar.getPageByEl($navbarEl));
    $navbarEl.addClass('navbar-large-collapsed');
    $pageEl.eq(0).addClass('page-with-navbar-large-collapsed').trigger('page:navbarlargecollapsed');
    app.emit('pageNavbarLargeCollapsed', $pageEl[0]);
    $navbarEl.trigger('navbar:collapse');
    app.emit('navbarCollapse', $navbarEl[0]);
  },
  expandLargeTitle(navbarEl) {
    const app = this;
    const $navbarEl = $(navbarEl);

    const $pageEl = $(app.navbar.getPageByEl($navbarEl));
    $navbarEl.removeClass('navbar-large-collapsed');
    $pageEl
      .eq(0)
      .removeClass('page-with-navbar-large-collapsed')
      .trigger('page:navbarlargeexpanded');
    app.emit('pageNavbarLargeExpanded', $pageEl[0]);
    $navbarEl.trigger('navbar:expand');
    app.emit('navbarExpand', $navbarEl[0]);
  },
  toggleLargeTitle(navbarEl) {
    const app = this;
    const $navbarEl = $(navbarEl);

    if ($navbarEl.hasClass('navbar-large-collapsed')) {
      app.navbar.expandLargeTitle($navbarEl);
    } else {
      app.navbar.collapseLargeTitle($navbarEl);
    }
  },
  initNavbarOnScroll(pageEl, navbarEl, needHide, needCollapse, needTransparent) {
    const app = this;
    const support = getSupport();
    const $pageEl = $(pageEl);
    const $navbarEl = $(navbarEl);
    const $titleLargeEl = $navbarEl.find('.title-large');
    const isLarge = $titleLargeEl.length || $navbarEl.hasClass('.navbar-large');
    let navbarHideHeight = 44;
    const snapPageScrollToLargeTitle = app.params.navbar.snapPageScrollToLargeTitle;
    const snapPageScrollToTransparentNavbar = app.params.navbar.snapPageScrollToTransparentNavbar;

    let previousScrollTop;
    let currentScrollTop;

    let scrollHeight;
    let offsetHeight;
    let reachEnd;
    let action;
    let navbarHidden;

    let navbarCollapsed;
    let navbarTitleLargeHeight;

    let navbarOffsetHeight;

    if (needCollapse || (needHide && isLarge)) {
      navbarTitleLargeHeight = $navbarEl.css('--f7-navbar-large-title-height');

      if (navbarTitleLargeHeight && navbarTitleLargeHeight.indexOf('px') >= 0) {
        navbarTitleLargeHeight = parseInt(navbarTitleLargeHeight, 10);
        if (Number.isNaN(navbarTitleLargeHeight) && $titleLargeEl.length) {
          navbarTitleLargeHeight = $titleLargeEl[0].offsetHeight;
        } else if (Number.isNaN(navbarTitleLargeHeight)) {
          if (app.theme === 'ios') navbarTitleLargeHeight = 52;
          else if (app.theme === 'md') navbarTitleLargeHeight = 88;
        }
      } else if ($titleLargeEl.length) {
        navbarTitleLargeHeight = $titleLargeEl[0].offsetHeight;
      } else {
        // eslint-disable-next-line
        if (app.theme === 'ios') navbarTitleLargeHeight = 52;
        else if (app.theme === 'md') navbarTitleLargeHeight = 88;
      }
    }

    if (needHide && isLarge) {
      navbarHideHeight += navbarTitleLargeHeight;
    }

    let scrollChanged;
    let scrollContent;
    let scrollTimeoutId;
    let touchEndTimeoutId;
    const touchSnapTimeout = 70;
    const desktopSnapTimeout = 300;

    function calcScrollableDistance() {
      $pageEl.find('.page-content').each((pageContentEl) => {
        pageContentEl.f7ScrollableDistance =
          pageContentEl.scrollHeight - pageContentEl.offsetHeight;
      });
    }

    function snapLargeNavbar() {
      const inSearchbarExpanded = $navbarEl.hasClass('with-searchbar-expandable-enabled');
      if (inSearchbarExpanded) return;
      if (!scrollContent || currentScrollTop < 0) return;
      if (
        currentScrollTop >= navbarTitleLargeHeight / 2 &&
        currentScrollTop < navbarTitleLargeHeight
      ) {
        $(scrollContent).scrollTop(navbarTitleLargeHeight, 100);
      } else if (currentScrollTop < navbarTitleLargeHeight) {
        $(scrollContent).scrollTop(0, 200);
      }
    }

    function snapTransparentNavbar() {
      const inSearchbarExpanded = $navbarEl.hasClass('with-searchbar-expandable-enabled');
      if (inSearchbarExpanded) return;
      if (!scrollContent || currentScrollTop < 0) return;
      if (currentScrollTop >= navbarOffsetHeight / 2 && currentScrollTop < navbarOffsetHeight) {
        $(scrollContent).scrollTop(navbarOffsetHeight, 100);
      } else if (currentScrollTop < navbarOffsetHeight) {
        $(scrollContent).scrollTop(0, 200);
      }
    }

    function handleNavbarTransparent() {
      const isHidden = $navbarEl.hasClass('navbar-hidden');
      const inSearchbarExpanded = $navbarEl.hasClass('with-searchbar-expandable-enabled');
      if (inSearchbarExpanded || isHidden) return;
      if (!navbarOffsetHeight) {
        navbarOffsetHeight = navbarEl.offsetHeight;
      }
      let opacity = currentScrollTop / navbarOffsetHeight;
      const notTransparent = $navbarEl.hasClass('navbar-transparent-visible');
      opacity = Math.max(Math.min(opacity, 1), 0);

      if ((notTransparent && opacity === 1) || (!notTransparent && opacity === 0)) {
        $navbarEl.find('.navbar-bg, .title').css('opacity', '');
        return;
      }
      if (notTransparent && opacity === 0) {
        $navbarEl.trigger('navbar:transparenthide');
        app.emit('navbarTransparentHide', $navbarEl[0]);
        $navbarEl.removeClass('navbar-transparent-visible');
        $navbarEl.find('.navbar-bg, .title').css('opacity', '');
        return;
      }
      if (!notTransparent && opacity === 1) {
        $navbarEl.trigger('navbar:transparentshow');
        app.emit('navbarTransparentShow', $navbarEl[0]);
        $navbarEl.addClass('navbar-transparent-visible');
        $navbarEl.find('.navbar-bg, .title').css('opacity', '');
        return;
      }

      $navbarEl.find('.navbar-bg, .title').css('opacity', opacity);

      if (snapPageScrollToTransparentNavbar) {
        if (!support.touch) {
          clearTimeout(scrollTimeoutId);
          scrollTimeoutId = setTimeout(() => {
            snapTransparentNavbar();
          }, desktopSnapTimeout);
        } else if (touchEndTimeoutId) {
          clearTimeout(touchEndTimeoutId);
          touchEndTimeoutId = null;
          touchEndTimeoutId = setTimeout(() => {
            snapTransparentNavbar();
            clearTimeout(touchEndTimeoutId);
            touchEndTimeoutId = null;
          }, touchSnapTimeout);
        }
      }
    }

    let previousCollapseProgress = null;
    let collapseProgress = null;
    function handleLargeNavbarCollapse(pageContentEl) {
      const isHidden = $navbarEl.hasClass('navbar-hidden');
      if (isHidden) return;
      const isLargeTransparent =
        $navbarEl.hasClass('navbar-large-transparent') ||
        ($navbarEl.hasClass('navbar-large') && $navbarEl.hasClass('navbar-transparent'));
      previousCollapseProgress = collapseProgress;
      const scrollableDistance = Math.min(
        navbarTitleLargeHeight,
        pageContentEl.f7ScrollableDistance || navbarTitleLargeHeight,
      );
      collapseProgress = Math.min(Math.max(currentScrollTop / scrollableDistance, 0), 1);
      const previousCollapseWasInMiddle =
        previousCollapseProgress > 0 && previousCollapseProgress < 1;
      const inSearchbarExpanded = $navbarEl.hasClass('with-searchbar-expandable-enabled');
      if (inSearchbarExpanded) return;
      navbarCollapsed = $navbarEl.hasClass('navbar-large-collapsed');
      const $bgEl = $navbarEl.find('.navbar-bg');
      if (collapseProgress === 0 && navbarCollapsed) {
        app.navbar.expandLargeTitle($navbarEl[0]);
      } else if (collapseProgress === 1 && !navbarCollapsed) {
        app.navbar.collapseLargeTitle($navbarEl[0]);
      }
      if (
        (collapseProgress === 0 && navbarCollapsed) ||
        (collapseProgress === 0 && previousCollapseWasInMiddle) ||
        (collapseProgress === 1 && !navbarCollapsed) ||
        (collapseProgress === 1 && previousCollapseWasInMiddle)
      ) {
        if (app.theme === 'md') {
          $navbarEl.find('.navbar-inner').css('overflow', '');
        }
        $navbarEl.find('.title').css('opacity', '');
        $navbarEl.find('.title-large-text, .subnavbar').css('transform', '');
        $navbarEl.find('.title-large-text').css('opacity', '');
        if (app.theme === 'md') {
          if (isLargeTransparent) {
            $bgEl.css('opacity', '');
          }
          $bgEl.css('transform', '');
        }
      } else if (collapseProgress > 0 && collapseProgress < 1) {
        if (app.theme === 'md') {
          $navbarEl.find('.navbar-inner').css('overflow', 'visible');
        }
        $navbarEl.find('.title').css('opacity', -0.5 + collapseProgress * 1.5);
        $navbarEl
          .find('.title-large-text, .subnavbar')
          .css(
            'transform',
            `translate3d(0px, ${-1 * collapseProgress * navbarTitleLargeHeight}px, 0)`,
          );
        $navbarEl.find('.title-large-text').css('opacity', 1 - collapseProgress * 2);

        if (app.theme === 'md') {
          if (isLargeTransparent) {
            $bgEl.css('opacity', collapseProgress);
          }
          $bgEl.css(
            'transform',
            `translate3d(0px, ${-1 * collapseProgress * navbarTitleLargeHeight}px, 0)`,
          );
        }
      }

      if (snapPageScrollToLargeTitle) {
        if (!support.touch) {
          clearTimeout(scrollTimeoutId);
          scrollTimeoutId = setTimeout(() => {
            snapLargeNavbar();
          }, desktopSnapTimeout);
        } else if (touchEndTimeoutId) {
          clearTimeout(touchEndTimeoutId);
          touchEndTimeoutId = null;
          touchEndTimeoutId = setTimeout(() => {
            snapLargeNavbar();
            clearTimeout(touchEndTimeoutId);
            touchEndTimeoutId = null;
          }, touchSnapTimeout);
        }
      }
    }

    function handleTitleHideShow() {
      if ($pageEl.hasClass('page-with-card-opened')) return;
      scrollHeight = scrollContent.scrollHeight;
      offsetHeight = scrollContent.offsetHeight;
      reachEnd = currentScrollTop + offsetHeight >= scrollHeight;
      navbarHidden = $navbarEl.hasClass('navbar-hidden');
      if (reachEnd) {
        if (app.params.navbar.showOnPageScrollEnd) {
          action = 'show';
        }
      } else if (previousScrollTop > currentScrollTop) {
        if (app.params.navbar.showOnPageScrollTop || currentScrollTop <= navbarHideHeight) {
          action = 'show';
        } else {
          action = 'hide';
        }
      } else if (currentScrollTop > navbarHideHeight) {
        action = 'hide';
      } else {
        action = 'show';
      }

      if (action === 'show' && navbarHidden) {
        app.navbar.show($navbarEl, true, true);
        navbarHidden = false;
      } else if (action === 'hide' && !navbarHidden) {
        app.navbar.hide($navbarEl, true, false, true);
        navbarHidden = true;
      }
      previousScrollTop = currentScrollTop;
    }

    function handleScroll(e) {
      scrollContent = this;
      if (e && e.target && e.target !== scrollContent) {
        return;
      }
      currentScrollTop = scrollContent.scrollTop;
      scrollChanged = currentScrollTop;
      if (needCollapse) {
        handleLargeNavbarCollapse(scrollContent);
      } else if (needTransparent) {
        handleNavbarTransparent();
      }
      if ($pageEl.hasClass('page-previous')) return;
      if (needHide) {
        handleTitleHideShow();
      }
    }
    function handeTouchStart() {
      scrollChanged = false;
    }
    function handleTouchEnd() {
      clearTimeout(touchEndTimeoutId);
      touchEndTimeoutId = null;
      touchEndTimeoutId = setTimeout(() => {
        if (scrollChanged !== false) {
          if (needTransparent && !needCollapse) {
            snapTransparentNavbar();
          } else {
            snapLargeNavbar();
          }
          clearTimeout(touchEndTimeoutId);
          touchEndTimeoutId = null;
        }
      }, touchSnapTimeout);
    }
    $pageEl.on('scroll', '.page-content', handleScroll, true);

    if (
      support.touch &&
      ((needCollapse && snapPageScrollToLargeTitle) ||
        (needTransparent && snapPageScrollToTransparentNavbar))
    ) {
      app.on('touchstart:passive', handeTouchStart);
      app.on('touchend:passive', handleTouchEnd);
    }
    calcScrollableDistance();
    if (needCollapse || needTransparent) {
      $pageEl.find('.page-content').each((pageContentEl) => {
        if (pageContentEl.scrollTop > 0) handleScroll.call(pageContentEl);
      });
    }
    app.on('resize', calcScrollableDistance);
    $pageEl[0].f7DetachNavbarScrollHandlers = function f7DetachNavbarScrollHandlers() {
      app.off('resize', calcScrollableDistance);
      delete $pageEl[0].f7DetachNavbarScrollHandlers;
      $pageEl.off('scroll', '.page-content', handleScroll, true);
      if (
        support.touch &&
        ((needCollapse && snapPageScrollToLargeTitle) ||
          (needTransparent && snapPageScrollToTransparentNavbar))
      ) {
        app.off('touchstart:passive', handeTouchStart);
        app.off('touchend:passive', handleTouchEnd);
      }
    };
  },
};
export default {
  name: 'navbar',
  create() {
    const app = this;
    bindMethods(app, {
      navbar: Navbar,
    });
  },
  params: {
    navbar: {
      scrollTopOnTitleClick: true,
      iosCenterTitle: true,
      mdCenterTitle: false,
      hideOnPageScroll: false,
      showOnPageScrollEnd: true,
      showOnPageScrollTop: true,
      collapseLargeTitleOnScroll: true,
      snapPageScrollToLargeTitle: true,
      snapPageScrollToTransparentNavbar: true,
    },
  },
  on: {
    'panelBreakpoint panelCollapsedBreakpoint panelResize viewResize resize viewMasterDetailBreakpoint':
      function onPanelResize() {
        const app = this;
        $('.navbar').each((navbarEl) => {
          app.navbar.size(navbarEl);
        });
      },
    pageBeforeRemove(page) {
      if (page.$el[0].f7DetachNavbarScrollHandlers) {
        page.$el[0].f7DetachNavbarScrollHandlers();
      }
    },
    pageReinit(page) {
      const app = this;
      const $navbarEl = $(app.navbar.getElByPage(page));
      if (!$navbarEl || $navbarEl.length === 0) return;
      app.navbar.size($navbarEl);
    },
    pageInit(page) {
      const app = this;
      const $navbarEl = $(app.navbar.getElByPage(page));
      if (!$navbarEl || $navbarEl.length === 0) return;

      // Size
      app.navbar.size($navbarEl);

      // Need Collapse On Scroll
      let needCollapseOnScrollHandler;
      if ($navbarEl.find('.title-large').length > 0) {
        $navbarEl.addClass('navbar-large');
      }
      if ($navbarEl.hasClass('navbar-large')) {
        if (app.params.navbar.collapseLargeTitleOnScroll) needCollapseOnScrollHandler = true;
        page.$el.addClass('page-with-navbar-large');
      }

      // Need transparent on scroll
      let needTransparentOnScroll;
      if (!needCollapseOnScrollHandler && $navbarEl.hasClass('navbar-transparent')) {
        needTransparentOnScroll = true;
      }

      // Need Hide On Scroll
      let needHideOnScrollHandler;
      if (
        app.params.navbar.hideOnPageScroll ||
        page.$el.find('.hide-navbar-on-scroll').length ||
        page.$el.hasClass('hide-navbar-on-scroll') ||
        page.$el.find('.hide-bars-on-scroll').length ||
        page.$el.hasClass('hide-bars-on-scroll')
      ) {
        if (
          page.$el.find('.keep-navbar-on-scroll').length ||
          page.$el.hasClass('keep-navbar-on-scroll') ||
          page.$el.find('.keep-bars-on-scroll').length ||
          page.$el.hasClass('keep-bars-on-scroll')
        ) {
          needHideOnScrollHandler = false;
        } else {
          needHideOnScrollHandler = true;
        }
      }

      if (needCollapseOnScrollHandler || needHideOnScrollHandler || needTransparentOnScroll) {
        app.navbar.initNavbarOnScroll(
          page.el,
          $navbarEl[0],
          needHideOnScrollHandler,
          needCollapseOnScrollHandler,
          needTransparentOnScroll,
        );
      }
    },
    'panelOpen panelSwipeOpen modalOpen': function onPanelModalOpen(instance) {
      const app = this;
      instance.$el.find('.navbar').each((navbarEl) => {
        app.navbar.size(navbarEl);
      });
    },
    tabShow(tabEl) {
      const app = this;
      $(tabEl)
        .find('.navbar')
        .each((navbarEl) => {
          app.navbar.size(navbarEl);
        });
    },
  },
  clicks: {
    '.navbar .title': function onTitleClick($clickedEl, clickedData, e) {
      const app = this;
      if (!app.params.navbar.scrollTopOnTitleClick) return;
      if ($(e.target).closest('a, button').length > 0) {
        return;
      }
      let $pageContentEl;

      // Find active page
      const $navbarEl = $clickedEl.parents('.navbar');

      // Static Layout
      $pageContentEl = $navbarEl.parents('.page-content');

      if ($pageContentEl.length === 0) {
        // Fixed Layout
        if ($navbarEl.parents('.page').length > 0) {
          $pageContentEl = $navbarEl.parents('.page').find('.page-content');
        }
      }
      if ($pageContentEl && $pageContentEl.length > 0) {
        // Check for tab
        if ($pageContentEl.hasClass('tab')) {
          $pageContentEl = $pageContentEl.parent('.tabs').children('.page-content.tab-active');
        }
        if ($pageContentEl.length > 0) $pageContentEl.scrollTop(0, 300);
      }
    },
  },
  vnode: {
    navbar: {
      postpatch(vnode) {
        const app = this;
        app.navbar.size(vnode.elm);
      },
    },
  },
};
