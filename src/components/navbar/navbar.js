import $ from 'dom7';
import Utils from '../../utils/utils';

const Navbar = {
  size(el) {
    const app = this;
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
    const navbarWidth = $el[0].offsetWidth - parseInt(navbarStyles.paddingLeft, 10) - parseInt(navbarStyles.paddingRight, 10);
    const isPrevious = $el.hasClass('navbar-previous');
    const sliding = $el.hasClass('sliding');

    let router;
    let dynamicNavbar;

    if ($viewEl.length > 0 && $viewEl[0].f7View) {
      router = $viewEl[0].f7View.router;
      dynamicNavbar = router && router.params.iosDynamicNavbar;
    }

    let currLeft;
    let diff;

    if (noRight) {
      currLeft = navbarWidth - titleWidth;
    }
    if (noLeft) {
      currLeft = 0;
    }
    if (!noLeft && !noRight) {
      currLeft = (navbarWidth - rightWidth - titleWidth + leftWidth) / 2;
    }
    let requiredLeft = (navbarWidth - titleWidth) / 2;
    if (navbarWidth - leftWidth - rightWidth > titleWidth) {
      if (requiredLeft < leftWidth) {
        requiredLeft = leftWidth;
      }
      if (requiredLeft + titleWidth > navbarWidth - rightWidth) {
        requiredLeft = navbarWidth - rightWidth - titleWidth;
      }
      diff = requiredLeft - currLeft;
    } else {
      diff = 0;
    }
    // RTL inverter
    const inverter = app.rtl ? -1 : 1;

    if (dynamicNavbar) {
      if (title.hasClass('sliding') || sliding) {
        title[0].f7NavbarLeftOffset = -(currLeft + diff) * inverter;
        title[0].f7NavbarRightOffset = (navbarWidth - currLeft - diff - titleWidth) * inverter;
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
          left[0].f7NavbarLeftOffset = -(navbarWidth - left[0].offsetWidth) / 2 * inverter;
          left[0].f7NavbarRightOffset = leftWidth * inverter;
        } else {
          left[0].f7NavbarLeftOffset = -leftWidth;
          left[0].f7NavbarRightOffset = (navbarWidth - left[0].offsetWidth) / 2;
          if (router && router.params.iosAnimateNavbarBackIcon && left.find('.back .icon').length > 0) {
            left[0].f7NavbarRightOffset -= left.find('.back .icon')[0].offsetWidth;
          }
        }
      }
      if (!noRight && (right.hasClass('sliding') || sliding)) {
        if (app.rtl) {
          right[0].f7NavbarLeftOffset = -rightWidth * inverter;
          right[0].f7NavbarRightOffset = (navbarWidth - right[0].offsetWidth) / 2 * inverter;
        } else {
          right[0].f7NavbarLeftOffset = -(navbarWidth - right[0].offsetWidth) / 2;
          right[0].f7NavbarRightOffset = rightWidth;
        }
      }
      if (subnavbar.length && (subnavbar.hasClass('sliding') || sliding)) {
        subnavbar[0].f7NavbarLeftOffset = app.rtl ? subnavbar[0].offsetWidth : -subnavbar[0].offsetWidth;
        subnavbar[0].f7NavbarRightOffset = -subnavbar[0].f7NavbarLeftOffset;
      }
    }

    // Title left
    if (app.params.iosCenterTitle) {
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
    if (page.$navbarEl) $navbarEl = page.$navbarEl;
    else $navbarEl = page.$el.children('.navbar').children('.navbar-inner');
    return $navbarEl;
  },
};
export default {
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
      iosCenterTitle: true,
    },
  },
  on: {
    init() {

    },
    pageBeforeRemove(page) {
      const app = this;
      if (app.theme === 'md') return;
      const $navbarEl = Navbar.getEl(page);
      if (!$navbarEl || $navbarEl.length === 0) return;

      app.off('resize', $navbarEl[0].f7ResizeHandler);
    },
    pageReinit(page) {
      const app = this;
      if (app.theme === 'md') return;
      const $navbarEl = Navbar.getEl(page);
      if (!$navbarEl || $navbarEl.length === 0) return;

      app.navbar.size($navbarEl);
    },
    pageInit(page) {
      const app = this;
      if (app.theme === 'md') return;
      const $navbarEl = Navbar.getEl(page);
      if (!$navbarEl || $navbarEl.length === 0) return;

      $navbarEl[0].f7ResizeHandler = function resizeHandler() {
        app.navbar.size($navbarEl);
      };
      app.navbar.size($navbarEl);
      app.on('resize', $navbarEl[0].f7ResizeHandler);
    },
  },
};
