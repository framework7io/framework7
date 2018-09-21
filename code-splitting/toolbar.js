
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

  var Toolbar = {
    setHighlight: function setHighlight(tabbarEl) {
      var app = this;
      if (app.theme !== 'md') { return; }

      var $tabbarEl = $(tabbarEl);

      if ($tabbarEl.length === 0 || !($tabbarEl.hasClass('tabbar') || $tabbarEl.hasClass('tabbar-labels'))) { return; }

      var $highlightEl = $tabbarEl.find('.tab-link-highlight');
      var tabLinksCount = $tabbarEl.find('.tab-link').length;
      if (tabLinksCount === 0) {
        $highlightEl.remove();
        return;
      }

      if ($highlightEl.length === 0) {
        $tabbarEl.children('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
        $highlightEl = $tabbarEl.find('.tab-link-highlight');
      }

      var $activeLink = $tabbarEl.find('.tab-link-active');
      var highlightWidth;
      var highlightTranslate;

      if ($tabbarEl.hasClass('tabbar-scrollable') && $activeLink && $activeLink[0]) {
        highlightWidth = ($activeLink[0].offsetWidth) + "px";
        highlightTranslate = ($activeLink[0].offsetLeft) + "px";
      } else {
        var activeIndex = $activeLink.index();
        highlightWidth = (100 / tabLinksCount) + "%";
        highlightTranslate = ((app.rtl ? -activeIndex : activeIndex) * 100) + "%";
      }

      $highlightEl
        .css('width', highlightWidth)
        .transform(("translate3d(" + highlightTranslate + ",0,0)"));
    },
    init: function init(tabbarEl) {
      var app = this;
      app.toolbar.setHighlight(tabbarEl);
    },
    hide: function hide(el, animate) {
      if ( animate === void 0 ) animate = true;

      var $el = $(el);
      if ($el.hasClass('toolbar-hidden')) { return; }
      var className = "toolbar-hidden" + (animate ? ' toolbar-transitioning' : '');
      $el.transitionEnd(function () {
        $el.removeClass('toolbar-transitioning');
      });
      $el.addClass(className);
    },
    show: function show(el, animate) {
      if ( animate === void 0 ) animate = true;

      var $el = $(el);
      if (!$el.hasClass('toolbar-hidden')) { return; }
      if (animate) {
        $el.addClass('toolbar-transitioning');
        $el.transitionEnd(function () {
          $el.removeClass('toolbar-transitioning');
        });
      }
      $el.removeClass('toolbar-hidden');
    },
    initHideToolbarOnScroll: function initHideToolbarOnScroll(pageEl) {
      var app = this;
      var $pageEl = $(pageEl);
      var $toolbarEl = $pageEl.parents('.view').children('.toolbar');
      if ($toolbarEl.length === 0) {
        $toolbarEl = $pageEl.find('.toolbar');
      }
      if ($toolbarEl.length === 0) {
        $toolbarEl = $pageEl.parents('.views').children('.tabbar, .tabbar-labels');
      }
      if ($toolbarEl.length === 0) {
        return;
      }

      var previousScrollTop;
      var currentScrollTop;

      var scrollHeight;
      var offsetHeight;
      var reachEnd;
      var action;
      var toolbarHidden;
      function handleScroll() {
        var scrollContent = this;
        if ($pageEl.hasClass('page-previous')) { return; }
        currentScrollTop = scrollContent.scrollTop;
        scrollHeight = scrollContent.scrollHeight;
        offsetHeight = scrollContent.offsetHeight;
        reachEnd = currentScrollTop + offsetHeight >= scrollHeight;
        toolbarHidden = $toolbarEl.hasClass('toolbar-hidden');

        if (reachEnd) {
          if (app.params.toolbar.showOnPageScrollEnd) {
            action = 'show';
          }
        } else if (previousScrollTop > currentScrollTop) {
          if (app.params.toolbar.showOnPageScrollTop || currentScrollTop <= 44) {
            action = 'show';
          } else {
            action = 'hide';
          }
        } else if (currentScrollTop > 44) {
          action = 'hide';
        } else {
          action = 'show';
        }

        if (action === 'show' && toolbarHidden) {
          app.toolbar.show($toolbarEl);
          toolbarHidden = false;
        } else if (action === 'hide' && !toolbarHidden) {
          app.toolbar.hide($toolbarEl);
          toolbarHidden = true;
        }

        previousScrollTop = currentScrollTop;
      }
      $pageEl.on('scroll', '.page-content', handleScroll, true);
      $pageEl[0].f7ScrollToolbarHandler = handleScroll;
    },
  };
  var toolbar = {
    name: 'toolbar',
    create: function create() {
      var app = this;
      Utils.extend(app, {
        toolbar: {
          hide: Toolbar.hide.bind(app),
          show: Toolbar.show.bind(app),
          setHighlight: Toolbar.setHighlight.bind(app),
          initHideToolbarOnScroll: Toolbar.initHideToolbarOnScroll.bind(app),
          init: Toolbar.init.bind(app),
        },
      });
    },
    params: {
      toolbar: {
        hideOnPageScroll: false,
        showOnPageScrollEnd: true,
        showOnPageScrollTop: true,
      },
    },
    on: {
      pageBeforeRemove: function pageBeforeRemove(page) {
        if (page.$el[0].f7ScrollToolbarHandler) {
          page.$el.off('scroll', '.page-content', page.$el[0].f7ScrollToolbarHandler, true);
        }
      },
      pageBeforeIn: function pageBeforeIn(page) {
        var app = this;
        var $toolbarEl = page.$el.parents('.view').children('.toolbar');
        if ($toolbarEl.length === 0) {
          $toolbarEl = page.$el.parents('.views').children('.tabbar, .tabbar-labels');
        }
        if ($toolbarEl.length === 0) {
          $toolbarEl = page.$el.find('.toolbar');
        }
        if ($toolbarEl.length === 0) {
          return;
        }
        if (page.$el.hasClass('no-toolbar')) {
          app.toolbar.hide($toolbarEl);
        } else {
          app.toolbar.show($toolbarEl);
        }
      },
      pageInit: function pageInit(page) {
        var app = this;
        page.$el.find('.tabbar, .tabbar-labels').each(function (index, tabbarEl) {
          app.toolbar.init(tabbarEl);
        });
        if (
          app.params.toolbar.hideOnPageScroll
          || page.$el.find('.hide-toolbar-on-scroll').length
          || page.$el.hasClass('hide-toolbar-on-scroll')
          || page.$el.find('.hide-bars-on-scroll').length
          || page.$el.hasClass('hide-bars-on-scroll')
        ) {
          if (
            page.$el.find('.keep-toolbar-on-scroll').length
            || page.$el.hasClass('keep-toolbar-on-scroll')
            || page.$el.find('.keep-bars-on-scroll').length
            || page.$el.hasClass('keep-bars-on-scroll')
          ) {
            return;
          }
          app.toolbar.initHideToolbarOnScroll(page.el);
        }
      },
      init: function init() {
        var app = this;
        app.root.find('.tabbar, .tabbar-labels').each(function (index, tabbarEl) {
          app.toolbar.init(tabbarEl);
        });
      },
    },
  };

  return toolbar;
}
framework7ComponentLoader.componentName = 'toolbar';

