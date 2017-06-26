import $ from 'dom7';
import Utils from '../../utils/utils';

const Navbar = {
  size(el) {
    const app = this;
    if (app.theme !== 'ios') return;
    const $el = $(el);
    if ($el.hasClass('stacked') || $el.parents('.stacked').length > 0 || $el.parents('.tab:not(.active)').length > 0) {
      return;
    }
    const $viewEl = $el.parents('.view').eq(0);
    const left = app.rtl ? $el.find('.right') : $el.find('.left');
    const right = app.rtl ? $el.find('.left') : $el.find('.right');
    const title = $el.find('.title');
    const subnavbar = $el.find('.subnavbar');
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
    // RTL inverter
    const inverter = app.rtl ? -1 : 1;

    if (dynamicNavbar) {
      if (title.hasClass('sliding') || sliding) {
        title[0].f7NavbarLeftOffset = -(currLeft + diff) * inverter + separateNavbarLeftOffset;
        title[0].f7NavbarRightOffset = (navbarInnerWidth - currLeft - diff - titleWidth) * inverter - separateNavbarRightOffset;
        if (isPrevious) {
          if (router && router.params.iosAnimateNavbarBackIcon) {
            const activeNavbarBackLink = $el.parent().find('.navbar-current').find('.left.sliding .back .icon ~ span');
            if (activeNavbarBackLink.length > 0) {
              title[0].f7NavbarLeftOffset += activeNavbarBackLink[0].offsetLeft;
            }
          }
        }
      }
      if (!noLeft && (left.hasClass('sliding') || sliding)) {
        if (app.rtl) {
          left[0].f7NavbarLeftOffset = -(navbarInnerWidth - left[0].offsetWidth) / 2 * inverter;
          left[0].f7NavbarRightOffset = leftWidth * inverter;
        } else {
          left[0].f7NavbarLeftOffset = -leftWidth + separateNavbarLeftOffset;
          left[0].f7NavbarRightOffset = (navbarInnerWidth - left[0].offsetWidth) / 2 - separateNavbarRightOffset;
          if (router && router.params.iosAnimateNavbarBackIcon && left.find('.back .icon').length > 0) {
            left[0].f7NavbarRightOffset -= left.find('.back .icon')[0].offsetWidth;
          }
        }
      }
      if (!noRight && (right.hasClass('sliding') || sliding)) {
        if (app.rtl) {
          right[0].f7NavbarLeftOffset = -rightWidth * inverter;
          right[0].f7NavbarRightOffset = (navbarInnerWidth - right[0].offsetWidth) / 2 * inverter;
        } else {
          right[0].f7NavbarLeftOffset = -(navbarInnerWidth - right[0].offsetWidth) / 2 + separateNavbarLeftOffset;
          right[0].f7NavbarRightOffset = rightWidth - separateNavbarRightOffset;
        }
      }
      if (subnavbar.length && (subnavbar.hasClass('sliding') || sliding)) {
        subnavbar[0].f7NavbarLeftOffset = app.rtl ? subnavbar[0].offsetWidth : (-subnavbar[0].offsetWidth + separateNavbarLeftOffset);
        subnavbar[0].f7NavbarRightOffset = -subnavbar[0].f7NavbarLeftOffset - separateNavbarRightOffset + separateNavbarLeftOffset;
      }
    }

    // Title left
    if (app.params.navbar.iosCenterTitle) {
      let titleLeft = diff;
      if (app.rtl && noLeft && noRight && title.length > 0) titleLeft = -titleLeft;
      title.css({ left: `${titleLeft}px` });
    }
  },
  hide(el, animate = true) {
    const $el = $(el);
    if ($el.hasClass('navbar-hidden')) return;
    const className = `navbar-hidden${animate ? ' navbar-transitioning' : ''}`;
    $el.transitionEnd(() => {
      $el.removeClass('navbar-transitioning');
    });
    $el.addClass(className);
  },
  show(el, animate = true) {
    const $el = $(el);
    if (!$el.hasClass('navbar-hidden')) return;
    if (animate) {
      $el.addClass('navbar-transitioning');
      $el.transitionEnd(() => {
        $el.removeClass('navbar-transitioning');
      });
    }
    $el.removeClass('navbar-hidden');
  },
  getEl(page) {
    let $navbarEl;
    if (page.$navbarEl && page.$navbarEl.length > 0) $navbarEl = page.$navbarEl;
    else $navbarEl = page.$el.children('.navbar').children('.navbar-inner');
    return $navbarEl;
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
      },
    });
  },
  params: {
    navbar: {
      scrollTopOnTitleClick: true,
      iosCenterTitle: true,
    },
  },
  on: {
    pageBeforeRemove(page) {
      const app = this;
      if (app.theme !== 'ios') return;
      const $navbarEl = Navbar.getEl(page);
      if (!$navbarEl || $navbarEl.length === 0) return;

      app.off('resize', $navbarEl[0].f7ResizeHandler);
    },
    pageReinit(page) {
      const app = this;
      if (app.theme !== 'ios') return;
      const $navbarEl = Navbar.getEl(page);
      if (!$navbarEl || $navbarEl.length === 0) return;

      app.navbar.size($navbarEl);
    },
    pageInit(page) {
      const app = this;
      if (app.theme !== 'ios') return;
      const $navbarEl = Navbar.getEl(page);
      if (!$navbarEl || $navbarEl.length === 0) return;
      $navbarEl[0].f7ResizeHandler = function resizeHandler() {
        app.navbar.size($navbarEl);
      };
      app.navbar.size($navbarEl);
      app.on('resize', $navbarEl[0].f7ResizeHandler);
    },
    panelOpen(panel) {
      const app = this;
      if (app.theme !== 'ios') return;
      panel.$el.find('.navbar:not(.navbar-previous):not(.stacked)').each((index, navbarEl) => {
        app.navbar.size(navbarEl);
      });
    },
    panelSwipeOpen(panel) {
      const app = this;
      if (app.theme !== 'ios') return;
      panel.$el.find('.navbar:not(.navbar-previous):not(.stacked)').each((index, navbarEl) => {
        app.navbar.size(navbarEl);
      });
    },
    tabShow(tabEl) {
      const app = this;
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
};
