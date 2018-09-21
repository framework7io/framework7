
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

  var Navbar = {
    size: function size(el) {
      var app = this;
      if (app.theme !== 'ios') { return; }
      var $el = $(el);
      if ($el.hasClass('navbar')) {
        $el = $el.children('.navbar-inner').each(function (index, navbarEl) {
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
      var $viewEl = $el.parents('.view').eq(0);
      var left = app.rtl ? $el.children('.right') : $el.children('.left');
      var right = app.rtl ? $el.children('.left') : $el.children('.right');
      var title = $el.children('.title');
      var subnavbar = $el.children('.subnavbar');
      var noLeft = left.length === 0;
      var noRight = right.length === 0;
      var leftWidth = noLeft ? 0 : left.outerWidth(true);
      var rightWidth = noRight ? 0 : right.outerWidth(true);
      var titleWidth = title.outerWidth(true);
      var navbarStyles = $el.styles();
      var navbarWidth = $el[0].offsetWidth;
      var navbarInnerWidth = navbarWidth - parseInt(navbarStyles.paddingLeft, 10) - parseInt(navbarStyles.paddingRight, 10);
      var isPrevious = $el.hasClass('navbar-previous');
      var sliding = $el.hasClass('sliding');

      var router;
      var dynamicNavbar;
      var separateNavbar;
      var separateNavbarRightOffset = 0;
      var separateNavbarLeftOffset = 0;

      if ($viewEl.length > 0 && $viewEl[0].f7View) {
        router = $viewEl[0].f7View.router;
        dynamicNavbar = router && router.dynamicNavbar;
        separateNavbar = router && router.separateNavbar;
        if (!separateNavbar) {
          separateNavbarRightOffset = navbarWidth;
          separateNavbarLeftOffset = navbarWidth / 5;
        }
      }

      var currLeft;
      var diff;
      if (noRight) {
        currLeft = navbarInnerWidth - titleWidth;
      }
      if (noLeft) {
        currLeft = 0;
      }
      if (!noLeft && !noRight) {
        currLeft = ((navbarInnerWidth - rightWidth - titleWidth) + leftWidth) / 2;
      }
      var requiredLeft = (navbarInnerWidth - titleWidth) / 2;
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
      var inverter = app.rtl ? -1 : 1;

      if (dynamicNavbar) {
        if (title.hasClass('sliding') || (title.length > 0 && sliding)) {
          var titleLeftOffset = (-(currLeft + diff) * inverter) + separateNavbarLeftOffset;
          var titleRightOffset = ((navbarInnerWidth - currLeft - diff - titleWidth) * inverter) - separateNavbarRightOffset;

          if (isPrevious) {
            if (router && router.params.iosAnimateNavbarBackIcon) {
              var activeNavbarBackLink = $el.parent().find('.navbar-current').children('.left.sliding').find('.back .icon ~ span');
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
              left[0].f7NavbarRightOffset -= left.find('.back .icon')[0].offsetWidth;
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

      // Title left
      if (app.params.navbar.iosCenterTitle) {
        var titleLeft = diff;
        if (app.rtl && noLeft && noRight && title.length > 0) { titleLeft = -titleLeft; }
        title.css({ left: (titleLeft + "px") });
      }
    },
    hide: function hide(el, animate) {
      if ( animate === void 0 ) animate = true;

      var $el = $(el);
      if ($el.hasClass('navbar-inner')) { $el = $el.parents('.navbar'); }
      if (!$el.length) { return; }
      if ($el.hasClass('navbar-hidden')) { return; }
      var className = "navbar-hidden" + (animate ? ' navbar-transitioning' : '');
      $el.transitionEnd(function () {
        $el.removeClass('navbar-transitioning');
      });
      $el.addClass(className);
    },
    show: function show(el, animate) {
      if ( el === void 0 ) el = '.navbar-hidden';
      if ( animate === void 0 ) animate = true;

      var $el = $(el);
      if ($el.hasClass('navbar-inner')) { $el = $el.parents('.navbar'); }
      if (!$el.length) { return; }
      if (!$el.hasClass('navbar-hidden')) { return; }
      if (animate) {
        $el.addClass('navbar-transitioning');
        $el.transitionEnd(function () {
          $el.removeClass('navbar-transitioning');
        });
      }
      $el.removeClass('navbar-hidden');
    },
    getElByPage: function getElByPage(page) {
      var $pageEl;
      var $navbarEl;
      var pageData;
      if (page.$navbarEl || page.$el) {
        pageData = page;
        $pageEl = page.$el;
      } else {
        $pageEl = $(page);
        if ($pageEl.length > 0) { pageData = $pageEl[0].f7Page; }
      }
      if (pageData && pageData.$navbarEl && pageData.$navbarEl.length > 0) {
        $navbarEl = pageData.$navbarEl;
      } else if ($pageEl) {
        $navbarEl = $pageEl.children('.navbar').children('.navbar-inner');
      }
      if (!$navbarEl || ($navbarEl && $navbarEl.length === 0)) { return undefined; }
      return $navbarEl[0];
    },
    getPageByEl: function getPageByEl(navbarInnerEl) {
      var $navbarInnerEl = $(navbarInnerEl);
      if ($navbarInnerEl.hasClass('navbar')) {
        $navbarInnerEl = $navbarInnerEl.find('.navbar-inner');
        if ($navbarInnerEl.length > 1) { return undefined; }
      }
      return $navbarInnerEl[0].f7Page;
    },
    initHideNavbarOnScroll: function initHideNavbarOnScroll(pageEl, navbarInnerEl) {
      var app = this;
      var $pageEl = $(pageEl);
      var $navbarEl = $(navbarInnerEl || app.navbar.getElByPage(pageEl)).closest('.navbar');

      var previousScrollTop;
      var currentScrollTop;

      var scrollHeight;
      var offsetHeight;
      var reachEnd;
      var action;
      var navbarHidden;
      function handleScroll() {
        var scrollContent = this;
        if ($pageEl.hasClass('page-previous')) { return; }
        currentScrollTop = scrollContent.scrollTop;
        scrollHeight = scrollContent.scrollHeight;
        offsetHeight = scrollContent.offsetHeight;
        reachEnd = currentScrollTop + offsetHeight >= scrollHeight;
        navbarHidden = $navbarEl.hasClass('navbar-hidden');

        if (reachEnd) {
          if (app.params.navbar.showOnPageScrollEnd) {
            action = 'show';
          }
        } else if (previousScrollTop > currentScrollTop) {
          if (app.params.navbar.showOnPageScrollTop || currentScrollTop <= 44) {
            action = 'show';
          } else {
            action = 'hide';
          }
        } else if (currentScrollTop > 44) {
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
      $pageEl.on('scroll', '.page-content', handleScroll, true);
      $pageEl[0].f7ScrollNavbarHandler = handleScroll;
    },
  };
  var navbar = {
    name: 'navbar',
    create: function create() {
      var app = this;
      Utils.extend(app, {
        navbar: {
          size: Navbar.size.bind(app),
          hide: Navbar.hide.bind(app),
          show: Navbar.show.bind(app),
          getElByPage: Navbar.getElByPage.bind(app),
          initHideNavbarOnScroll: Navbar.initHideNavbarOnScroll.bind(app),
        },
      });
    },
    params: {
      navbar: {
        scrollTopOnTitleClick: true,
        iosCenterTitle: true,
        hideOnPageScroll: false,
        showOnPageScrollEnd: true,
        showOnPageScrollTop: true,
      },
    },
    on: {
      'panelBreakpoint resize': function onResize() {
        var app = this;
        if (app.theme !== 'ios') { return; }
        $('.navbar').each(function (index, navbarEl) {
          app.navbar.size(navbarEl);
        });
      },
      pageBeforeRemove: function pageBeforeRemove(page) {
        if (page.$el[0].f7ScrollNavbarHandler) {
          page.$el.off('scroll', '.page-content', page.$el[0].f7ScrollNavbarHandler, true);
        }
      },
      pageBeforeIn: function pageBeforeIn(page) {
        var app = this;
        if (app.theme !== 'ios') { return; }
        var $navbarEl;
        var view = page.$el.parents('.view')[0].f7View;
        var navbarInnerEl = app.navbar.getElByPage(page);
        if (!navbarInnerEl) {
          $navbarEl = page.$el.parents('.view').children('.navbar');
        } else {
          $navbarEl = $(navbarInnerEl).parents('.navbar');
        }
        if (page.$el.hasClass('no-navbar') || (view.router.dynamicNavbar && !navbarInnerEl)) {
          var animate = !!(page.pageFrom && page.router.history.length > 0);
          app.navbar.hide($navbarEl, animate);
        } else {
          app.navbar.show($navbarEl);
        }
      },
      pageReinit: function pageReinit(page) {
        var app = this;
        if (app.theme !== 'ios') { return; }
        var $navbarEl = $(app.navbar.getElByPage(page));
        if (!$navbarEl || $navbarEl.length === 0) { return; }
        app.navbar.size($navbarEl);
      },
      pageInit: function pageInit(page) {
        var app = this;
        var $navbarEl = $(app.navbar.getElByPage(page));
        if (!$navbarEl || $navbarEl.length === 0) { return; }
        if (app.theme === 'ios') {
          app.navbar.size($navbarEl);
        }
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
            return;
          }
          app.navbar.initHideNavbarOnScroll(page.el, $navbarEl[0]);
        }
      },
      modalOpen: function modalOpen(modal) {
        var app = this;
        if (app.theme !== 'ios') { return; }
        modal.$el.find('.navbar:not(.navbar-previous):not(.stacked)').each(function (index, navbarEl) {
          app.navbar.size(navbarEl);
        });
      },
      panelOpen: function panelOpen(panel) {
        var app = this;
        if (app.theme !== 'ios') { return; }
        panel.$el.find('.navbar:not(.navbar-previous):not(.stacked)').each(function (index, navbarEl) {
          app.navbar.size(navbarEl);
        });
      },
      panelSwipeOpen: function panelSwipeOpen(panel) {
        var app = this;
        if (app.theme !== 'ios') { return; }
        panel.$el.find('.navbar:not(.navbar-previous):not(.stacked)').each(function (index, navbarEl) {
          app.navbar.size(navbarEl);
        });
      },
      tabShow: function tabShow(tabEl) {
        var app = this;
        $(tabEl).find('.navbar:not(.navbar-previous):not(.stacked)').each(function (index, navbarEl) {
          app.navbar.size(navbarEl);
        });
      },
    },
    clicks: {
      '.navbar .title': function onTitleClick($clickedEl) {
        var app = this;
        if (!app.params.navbar.scrollTopOnTitleClick) { return; }
        if ($clickedEl.closest('a').length > 0) {
          return;
        }
        var pageContent;
        // Find active page
        var navbar = $clickedEl.parents('.navbar');

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
          if (pageContent.length > 0) { pageContent.scrollTop(0, 300); }
        }
      },
    },
    vnode: {
      'navbar-inner': {
        postpatch: function postpatch(vnode) {
          var app = this;
          if (app.theme !== 'ios') { return; }
          app.navbar.size(vnode.elm);
        },
      },
    },
  };

  return navbar;
}
framework7ComponentLoader.componentName = 'navbar';

