import $ from 'dom7';
import Utils from '../../utils/utils';
import Support from '../../utils/support';

const Navbar = {
  size(el) {
    const app = this;
    if (app.theme !== 'ios' && !app.params.navbar[`${app.theme}CenterTitle`]) {
      return;
    }
    let $el = $(el);
    if ($el.hasClass('navbar')) {
      $el = $el.children('.navbar-inner').each((index, navbarEl) => {
        app.navbar.size(navbarEl);
      });
      return;
    }

    if (
      $el.hasClass('stacked')
      || $el.parents('.stacked').length > 0
      || $el.parents('.tab:not(.tab-active)').length > 0
      || $el.parents('.popup:not(.modal-in)').length > 0
    ) {
      return;
    }

    if (app.theme !== 'ios' && app.params.navbar[`${app.theme}CenterTitle`]) {
      $el.addClass('navbar-inner-centered-title');
    }
    if (app.theme === 'ios' && !app.params.navbar.iosCenterTitle) {
      $el.addClass('navbar-inner-left-title');
    }

    const $viewEl = $el.parents('.view').eq(0);
    const left = app.rtl ? $el.children('.right') : $el.children('.left');
    const right = app.rtl ? $el.children('.left') : $el.children('.right');
    const title = $el.children('.title');
    const subnavbar = $el.children('.subnavbar');
    const noLeft = left.length === 0;
    const noRight = right.length === 0;
    const leftWidth = noLeft ? 0 : left.outerWidth(true);
    const rightWidth = noRight ? 0 : right.outerWidth(true);
    const titleWidth = title.outerWidth(true);
    const navbarStyles = $el.styles();
    const navbarWidth = $el[0].offsetWidth;
    const navbarInnerWidth = navbarWidth - parseInt(navbarStyles.paddingLeft, 10) - parseInt(navbarStyles.paddingRight, 10);
    const isPrevious = $el.hasClass('navbar-previous');
    const sliding = $el.hasClass('sliding');

    let router;
    let dynamicNavbar;
    let separateNavbar;
    let separateNavbarRightOffset = 0;
    let separateNavbarLeftOffset = 0;

    if ($viewEl.length > 0 && $viewEl[0].f7View) {
      router = $viewEl[0].f7View.router;
      dynamicNavbar = router && router.dynamicNavbar;
      separateNavbar = router && router.separateNavbar;
      if (!separateNavbar) {
        separateNavbarRightOffset = navbarWidth;
        separateNavbarLeftOffset = navbarWidth / 5;
      }
    }

    let currLeft;
    let diff;
    if (noRight) {
      currLeft = navbarInnerWidth - titleWidth;
    }
    if (noLeft) {
      currLeft = 0;
    }
    if (!noLeft && !noRight) {
      currLeft = ((navbarInnerWidth - rightWidth - titleWidth) + leftWidth) / 2;
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

    // RTL inverter
    const inverter = app.rtl ? -1 : 1;

    if (dynamicNavbar && app.theme === 'ios') {
      if (title.hasClass('sliding') || (title.length > 0 && sliding)) {
        let titleLeftOffset = (-(currLeft + diff) * inverter) + separateNavbarLeftOffset;
        const titleRightOffset = ((navbarInnerWidth - currLeft - diff - titleWidth) * inverter) - separateNavbarRightOffset;

        if (isPrevious) {
          if (router && router.params.iosAnimateNavbarBackIcon) {
            const activeNavbarBackLink = $el.parent().find('.navbar-current').children('.left.sliding').find('.back .icon ~ span');
            if (activeNavbarBackLink.length > 0) {
              titleLeftOffset += activeNavbarBackLink[0].offsetLeft;
            }
          }
        }
        title[0].f7NavbarLeftOffset = titleLeftOffset;
        title[0].f7NavbarRightOffset = titleRightOffset;
      }
      if (!noLeft && (left.hasClass('sliding') || sliding)) {
        if (app.rtl) {
          left[0].f7NavbarLeftOffset = (-(navbarInnerWidth - left[0].offsetWidth) / 2) * inverter;
          left[0].f7NavbarRightOffset = leftWidth * inverter;
        } else {
          left[0].f7NavbarLeftOffset = -leftWidth + separateNavbarLeftOffset;
          left[0].f7NavbarRightOffset = ((navbarInnerWidth - left[0].offsetWidth) / 2) - separateNavbarRightOffset;
          if (router && router.params.iosAnimateNavbarBackIcon && left.find('.back .icon').length > 0) {
            if (left.find('.back .icon ~ span').length) {
              const leftOffset = left[0].f7NavbarLeftOffset;
              const rightOffset = left[0].f7NavbarRightOffset;
              left[0].f7NavbarLeftOffset = 0;
              left[0].f7NavbarRightOffset = 0;
              left.find('.back .icon ~ span')[0].f7NavbarLeftOffset = leftOffset;
              left.find('.back .icon ~ span')[0].f7NavbarRightOffset = rightOffset - left.find('.back .icon')[0].offsetWidth;
            }
          }
        }
      }
      if (!noRight && (right.hasClass('sliding') || sliding)) {
        if (app.rtl) {
          right[0].f7NavbarLeftOffset = -rightWidth * inverter;
          right[0].f7NavbarRightOffset = ((navbarInnerWidth - right[0].offsetWidth) / 2) * inverter;
        } else {
          right[0].f7NavbarLeftOffset = (-(navbarInnerWidth - right[0].offsetWidth) / 2) + separateNavbarLeftOffset;
          right[0].f7NavbarRightOffset = rightWidth - separateNavbarRightOffset;
        }
      }
      if (subnavbar.length && (subnavbar.hasClass('sliding') || sliding)) {
        subnavbar[0].f7NavbarLeftOffset = app.rtl ? subnavbar[0].offsetWidth : (-subnavbar[0].offsetWidth + separateNavbarLeftOffset);
        subnavbar[0].f7NavbarRightOffset = (-subnavbar[0].f7NavbarLeftOffset - separateNavbarRightOffset) + separateNavbarLeftOffset;
      }
    }

    // Center title
    if (app.params.navbar[`${app.theme}CenterTitle`]) {
      let titleLeft = diff;
      if (app.rtl && noLeft && noRight && title.length > 0) titleLeft = -titleLeft;
      title.css({ left: `${titleLeft}px` });
    }
  },
  hide(el, animate = true) {
    const app = this;
    let $el = $(el);
    if ($el.hasClass('navbar-inner')) $el = $el.parents('.navbar');
    if (!$el.length) return;
    if ($el.hasClass('navbar-hidden')) return;
    let className = `navbar-hidden${animate ? ' navbar-transitioning' : ''}`;
    const currentIsLarge = app.theme === 'ios'
      ? $el.find('.navbar-current .title-large').length
      : $el.find('.title-large').length;
    if (currentIsLarge) {
      className += ' navbar-large-hidden';
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
    let $el = $(el);
    if ($el.hasClass('navbar-inner')) $el = $el.parents('.navbar');
    if (!$el.length) return;
    if (!$el.hasClass('navbar-hidden')) return;
    if (animate) {
      $el.addClass('navbar-transitioning');
      $el.transitionEnd(() => {
        $el.removeClass('navbar-transitioning');
      });
    }
    $el.removeClass('navbar-hidden navbar-large-hidden');
    $el.trigger('navbar:show');
    app.emit('navbarShow', $el[0]);
  },
  getElByPage(page) {
    let $pageEl;
    let $navbarInnerEl;
    let pageData;
    if (page.$navbarEl || page.$el) {
      pageData = page;
      $pageEl = page.$el;
    } else {
      $pageEl = $(page);
      if ($pageEl.length > 0) pageData = $pageEl[0].f7Page;
    }
    if (pageData && pageData.$navbarEl && pageData.$navbarEl.length > 0) {
      $navbarInnerEl = pageData.$navbarEl;
    } else if ($pageEl) {
      $navbarInnerEl = $pageEl.children('.navbar').children('.navbar-inner');
    }
    if (!$navbarInnerEl || ($navbarInnerEl && $navbarInnerEl.length === 0)) return undefined;
    return $navbarInnerEl[0];
  },
  getPageByEl(navbarInnerEl) {
    let $navbarInnerEl = $(navbarInnerEl);
    if ($navbarInnerEl.hasClass('navbar')) {
      $navbarInnerEl = $navbarInnerEl.find('.navbar-inner');
      if ($navbarInnerEl.length > 1) return undefined;
    }
    if ($navbarInnerEl.parents('.page').length) {
      return $navbarInnerEl.parents('.page')[0];
    }
    let pageEl;
    $navbarInnerEl.parents('.view').find('.page').each((index, el) => {
      if (el && el.f7Page && el.f7Page.navbarEl && $navbarInnerEl[0] === el.f7Page.navbarEl) {
        pageEl = el;
      }
    });
    return pageEl;
  },

  collapseLargeTitle(navbarInnerEl) {
    const app = this;
    let $navbarInnerEl = $(navbarInnerEl);
    if ($navbarInnerEl.hasClass('navbar')) {
      $navbarInnerEl = $navbarInnerEl.find('.navbar-inner-large');
      if ($navbarInnerEl.length > 1) {
        $navbarInnerEl = $(navbarInnerEl).find('.navbar-inner-large.navbar-current');
      }
      if ($navbarInnerEl.length > 1 || !$navbarInnerEl.length) {
        return;
      }
    }
    const $pageEl = $(app.navbar.getPageByEl($navbarInnerEl));
    $navbarInnerEl.addClass('navbar-inner-large-collapsed');
    $pageEl.eq(0).addClass('page-with-navbar-large-collapsed').trigger('page:navbarlargecollapsed');
    app.emit('pageNavbarLargeCollapsed', $pageEl[0]);
    const $navbarEl = $navbarInnerEl.parents('.navbar');
    if (app.theme === 'md' || app.theme === 'aurora') {
      $navbarEl.addClass('navbar-large-collapsed');
    }
    $navbarEl.trigger('navbar:collapse');
    app.emit('navbarCollapse', $navbarEl[0]);
  },
  expandLargeTitle(navbarInnerEl) {
    const app = this;
    let $navbarInnerEl = $(navbarInnerEl);
    if ($navbarInnerEl.hasClass('navbar')) {
      $navbarInnerEl = $navbarInnerEl.find('.navbar-inner-large');
      if ($navbarInnerEl.length > 1) {
        $navbarInnerEl = $(navbarInnerEl).find('.navbar-inner-large.navbar-current');
      }
      if ($navbarInnerEl.length > 1 || !$navbarInnerEl.length) {
        return;
      }
    }
    const $pageEl = $(app.navbar.getPageByEl($navbarInnerEl));
    $navbarInnerEl.removeClass('navbar-inner-large-collapsed');
    $pageEl.eq(0).removeClass('page-with-navbar-large-collapsed').trigger('page:navbarlargeexpanded');
    app.emit('pageNavbarLargeExpanded', $pageEl[0]);
    const $navbarEl = $navbarInnerEl.parents('.navbar');
    if (app.theme === 'md' || app.theme === 'aurora') {
      $navbarEl.removeClass('navbar-large-collapsed');
    }
    $navbarEl.trigger('navbar:expand');
    app.emit('navbarExpand', $navbarEl[0]);
  },
  toggleLargeTitle(navbarInnerEl) {
    const app = this;
    let $navbarInnerEl = $(navbarInnerEl);
    if ($navbarInnerEl.hasClass('navbar')) {
      $navbarInnerEl = $navbarInnerEl.find('.navbar-inner-large');
      if ($navbarInnerEl.length > 1) {
        $navbarInnerEl = $(navbarInnerEl).find('.navbar-inner-large.navbar-current');
      }
      if ($navbarInnerEl.length > 1 || !$navbarInnerEl.length) {
        return;
      }
    }
    if ($navbarInnerEl.hasClass('navbar-inner-large-collapsed')) {
      app.navbar.expandLargeTitle($navbarInnerEl);
    } else {
      app.navbar.collapseLargeTitle($navbarInnerEl);
    }
  },
  initNavbarOnScroll(pageEl, navbarInnerEl, needHide, needCollapse) {
    const app = this;
    const $pageEl = $(pageEl);
    const $navbarInnerEl = $(navbarInnerEl);
    const $navbarEl = app.theme === 'md' || app.theme === 'aurora'
      ? $navbarInnerEl.parents('.navbar')
      : $(navbarInnerEl || app.navbar.getElByPage(pageEl)).closest('.navbar');
    const isLarge = $navbarInnerEl.find('.title-large').length || $navbarInnerEl.hasClass('.navbar-inner-large');
    let navbarHideHeight = 44;
    const snapPageScrollToLargeTitle = app.params.navbar.snapPageScrollToLargeTitle;

    let previousScrollTop;
    let currentScrollTop;

    let scrollHeight;
    let offsetHeight;
    let reachEnd;
    let action;
    let navbarHidden;

    let navbarCollapsed;
    let navbarTitleLargeHeight;
    if (needCollapse || (needHide && isLarge)) {
      navbarTitleLargeHeight = $navbarInnerEl.css('--f7-navbar-large-title-height');
      if (navbarTitleLargeHeight && navbarTitleLargeHeight.indexOf('px') >= 0) {
        navbarTitleLargeHeight = parseInt(navbarTitleLargeHeight, 10);
        if (Number.isNaN(navbarTitleLargeHeight)) {
          if (app.theme === 'ios') navbarTitleLargeHeight = 52;
          else if (app.theme === 'md') navbarTitleLargeHeight = 48;
          else if (app.theme === 'aurora') navbarTitleLargeHeight = 38;
        }
      } else { // eslint-disable-next-line
        if (app.theme === 'ios') navbarTitleLargeHeight = 52;
        else if (app.theme === 'md') navbarTitleLargeHeight = 48;
        else if (app.theme === 'aurora') navbarTitleLargeHeight = 38;
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

    function snapLargeNavbar() {
      const inSearchbarExpanded = $navbarInnerEl.hasClass('with-searchbar-expandable-enabled');
      if (inSearchbarExpanded) return;
      if (!scrollContent || currentScrollTop < 0) return;
      if (currentScrollTop >= navbarTitleLargeHeight / 2 && currentScrollTop < navbarTitleLargeHeight) {
        $(scrollContent).scrollTop(navbarTitleLargeHeight, 100);
      } else if (currentScrollTop < navbarTitleLargeHeight) {
        $(scrollContent).scrollTop(0, 200);
      }
    }

    function handleLargeNavbarCollapse() {
      const collapseProgress = Math.min(Math.max((currentScrollTop / navbarTitleLargeHeight), 0), 1);
      const inSearchbarExpanded = $navbarInnerEl.hasClass('with-searchbar-expandable-enabled');
      if (inSearchbarExpanded) return;
      navbarCollapsed = $navbarInnerEl.hasClass('navbar-inner-large-collapsed');
      if (collapseProgress === 0 && navbarCollapsed) {
        app.navbar.expandLargeTitle($navbarInnerEl[0]);
        $navbarInnerEl[0].style.removeProperty('--f7-navbar-large-collapse-progress');
        $pageEl[0].style.removeProperty('--f7-navbar-large-collapse-progress');
        $navbarInnerEl[0].style.overflow = '';
        if (app.theme === 'md' || app.theme === 'aurora') {
          $navbarEl[0].style.removeProperty('--f7-navbar-large-collapse-progress');
        }
      } else if (collapseProgress === 1 && !navbarCollapsed) {
        app.navbar.collapseLargeTitle($navbarInnerEl[0]);
        $navbarInnerEl[0].style.removeProperty('--f7-navbar-large-collapse-progress');
        $navbarInnerEl[0].style.overflow = '';
        $pageEl[0].style.removeProperty('--f7-navbar-large-collapse-progress');
        if (app.theme === 'md' || app.theme === 'aurora') {
          $navbarEl[0].style.removeProperty('--f7-navbar-large-collapse-progress');
        }
      } else if ((collapseProgress === 1 && navbarCollapsed) || (collapseProgress === 0 && !navbarCollapsed)) {
        $navbarInnerEl[0].style.removeProperty('--f7-navbar-large-collapse-progress');
        $navbarInnerEl[0].style.overflow = '';
        $pageEl[0].style.removeProperty('--f7-navbar-large-collapse-progress');
        if (app.theme === 'md' || app.theme === 'aurora') {
          $navbarEl[0].style.removeProperty('--f7-navbar-large-collapse-progress');
        }
      } else {
        $navbarInnerEl[0].style.setProperty('--f7-navbar-large-collapse-progress', collapseProgress);
        $navbarInnerEl[0].style.overflow = 'visible';
        $pageEl[0].style.setProperty('--f7-navbar-large-collapse-progress', collapseProgress);
        if (app.theme === 'md' || app.theme === 'aurora') {
          $navbarEl[0].style.setProperty('--f7-navbar-large-collapse-progress', collapseProgress);
        }
      }

      if (snapPageScrollToLargeTitle) {
        if (!Support.touch) {
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
        app.navbar.show($navbarEl);
        navbarHidden = false;
      } else if (action === 'hide' && !navbarHidden) {
        app.navbar.hide($navbarEl);
        navbarHidden = true;
      }
      previousScrollTop = currentScrollTop;
    }

    function handleScroll() {
      scrollContent = this;
      currentScrollTop = scrollContent.scrollTop;
      scrollChanged = currentScrollTop;

      if (needCollapse) {
        handleLargeNavbarCollapse();
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
          snapLargeNavbar();
          clearTimeout(touchEndTimeoutId);
          touchEndTimeoutId = null;
        }
      }, touchSnapTimeout);
    }
    $pageEl.on('scroll', '.page-content', handleScroll, true);
    if (Support.touch && needCollapse && snapPageScrollToLargeTitle) {
      app.on('touchstart:passive', handeTouchStart);
      app.on('touchend:passive', handleTouchEnd);
    }
    if (needCollapse) {
      $pageEl.find('.page-content').each((pageContentIndex, pageContentEl) => {
        if (pageContentEl.scrollTop > 0) handleScroll.call(pageContentEl);
      });
    }
    $pageEl[0].f7DetachNavbarScrollHandlers = function f7DetachNavbarScrollHandlers() {
      delete $pageEl[0].f7DetachNavbarScrollHandlers;
      $pageEl.off('scroll', '.page-content', handleScroll, true);
      if (Support.touch && needCollapse && snapPageScrollToLargeTitle) {
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
    Utils.extend(app, {
      navbar: {
        size: Navbar.size.bind(app),
        hide: Navbar.hide.bind(app),
        show: Navbar.show.bind(app),
        getElByPage: Navbar.getElByPage.bind(app),
        getPageByEl: Navbar.getPageByEl.bind(app),
        collapseLargeTitle: Navbar.collapseLargeTitle.bind(app),
        expandLargeTitle: Navbar.expandLargeTitle.bind(app),
        toggleLargeTitle: Navbar.toggleLargeTitle.bind(app),
        initNavbarOnScroll: Navbar.initNavbarOnScroll.bind(app),
      },
    });
  },
  params: {
    navbar: {
      scrollTopOnTitleClick: true,
      iosCenterTitle: true,
      mdCenterTitle: false,
      auroraCenterTitle: true,
      hideOnPageScroll: false,
      showOnPageScrollEnd: true,
      showOnPageScrollTop: true,
      collapseLargeTitleOnScroll: true,
      snapPageScrollToLargeTitle: true,
    },
  },
  on: {
    'panelBreakpoint panelResize resize viewMasterDetailBreakpoint': function onResize() {
      const app = this;
      $('.navbar').each((index, navbarEl) => {
        app.navbar.size(navbarEl);
      });
    },
    pageBeforeRemove(page) {
      if (page.$el[0].f7DetachNavbarScrollHandlers) {
        page.$el[0].f7DetachNavbarScrollHandlers();
      }
    },
    pageBeforeIn(page) {
      const app = this;
      if (app.theme !== 'ios') return;
      let $navbarEl;
      const view = page.$el.parents('.view')[0].f7View;
      const navbarInnerEl = app.navbar.getElByPage(page);
      if (!navbarInnerEl) {
        $navbarEl = page.$el.parents('.view').children('.navbar');
      } else {
        $navbarEl = $(navbarInnerEl).parents('.navbar');
      }
      if (page.$el.hasClass('no-navbar') || (view.router.dynamicNavbar && !navbarInnerEl)) {
        const animate = !!(page.pageFrom && page.router.history.length > 0);
        app.navbar.hide($navbarEl, animate);
      } else {
        app.navbar.show($navbarEl);
      }
    },
    pageReinit(page) {
      const app = this;
      const $navbarInnerEl = $(app.navbar.getElByPage(page));
      if (!$navbarInnerEl || $navbarInnerEl.length === 0) return;
      app.navbar.size($navbarInnerEl);
    },
    pageInit(page) {
      const app = this;
      const $navbarInnerEl = $(app.navbar.getElByPage(page));
      if (!$navbarInnerEl || $navbarInnerEl.length === 0) return;

      // Size
      app.navbar.size($navbarInnerEl);

      // Need Collapse On Scroll
      let needCollapseOnScrollHandler;
      if ($navbarInnerEl.children('.title-large').length > 0) {
        $navbarInnerEl.addClass('navbar-inner-large');
      }
      if ($navbarInnerEl.hasClass('navbar-inner-large')) {
        if (app.params.navbar.collapseLargeTitleOnScroll) needCollapseOnScrollHandler = true;
        if (app.theme === 'md' || app.theme === 'aurora') {
          $navbarInnerEl.parents('.navbar').addClass('navbar-large');
        }
        page.$el.addClass('page-with-navbar-large');
      }

      // Need Hide On Scroll
      let needHideOnScrollHandler;
      if (
        app.params.navbar.hideOnPageScroll
        || page.$el.find('.hide-navbar-on-scroll').length
        || page.$el.hasClass('hide-navbar-on-scroll')
        || page.$el.find('.hide-bars-on-scroll').length
        || page.$el.hasClass('hide-bars-on-scroll')
      ) {
        if (
          page.$el.find('.keep-navbar-on-scroll').length
          || page.$el.hasClass('keep-navbar-on-scroll')
          || page.$el.find('.keep-bars-on-scroll').length
          || page.$el.hasClass('keep-bars-on-scroll')
        ) {
          needHideOnScrollHandler = false;
        } else {
          needHideOnScrollHandler = true;
        }
      }

      if (needCollapseOnScrollHandler || needHideOnScrollHandler) {
        app.navbar.initNavbarOnScroll(page.el, $navbarInnerEl[0], needHideOnScrollHandler, needCollapseOnScrollHandler);
      }
    },
    modalOpen(modal) {
      const app = this;
      if (!app.params.navbar[`${app.theme}CenterTitle`]) {
        return;
      }
      modal.$el.find('.navbar:not(.navbar-previous):not(.stacked)').each((index, navbarEl) => {
        app.navbar.size(navbarEl);
      });
    },
    panelOpen(panel) {
      const app = this;
      if (!app.params.navbar[`${app.theme}CenterTitle`]) {
        return;
      }
      panel.$el.find('.navbar:not(.navbar-previous):not(.stacked)').each((index, navbarEl) => {
        app.navbar.size(navbarEl);
      });
    },
    panelSwipeOpen(panel) {
      const app = this;
      if (!app.params.navbar[`${app.theme}CenterTitle`]) {
        return;
      }
      panel.$el.find('.navbar:not(.navbar-previous):not(.stacked)').each((index, navbarEl) => {
        app.navbar.size(navbarEl);
      });
    },
    tabShow(tabEl) {
      const app = this;
      if (!app.params.navbar[`${app.theme}CenterTitle`]) {
        return;
      }
      $(tabEl).find('.navbar:not(.navbar-previous):not(.stacked)').each((index, navbarEl) => {
        app.navbar.size(navbarEl);
      });
    },
  },
  clicks: {
    '.navbar .title': function onTitleClick($clickedEl) {
      const app = this;
      if (!app.params.navbar.scrollTopOnTitleClick) return;
      if ($clickedEl.closest('a').length > 0) {
        return;
      }
      let pageContent;
      // Find active page
      const navbar = $clickedEl.parents('.navbar');

      // Static Layout
      pageContent = navbar.parents('.page-content');

      if (pageContent.length === 0) {
        // Fixed Layout
        if (navbar.parents('.page').length > 0) {
          pageContent = navbar.parents('.page').find('.page-content');
        }
        // Through Layout
        if (pageContent.length === 0) {
          if (navbar.nextAll('.page-current:not(.stacked)').length > 0) {
            pageContent = navbar.nextAll('.page-current:not(.stacked)').find('.page-content');
          }
        }
      }
      if (pageContent && pageContent.length > 0) {
        // Check for tab
        if (pageContent.hasClass('tab')) {
          pageContent = pageContent.parent('.tabs').children('.page-content.tab-active');
        }
        if (pageContent.length > 0) pageContent.scrollTop(0, 300);
      }
    },
  },
  vnode: {
    'navbar-inner': {
      postpatch(vnode) {
        const app = this;
        if (!app.params.navbar[`${app.theme}CenterTitle`]) {
          return;
        }
        app.navbar.size(vnode.elm);
      },
    },
  },
};
