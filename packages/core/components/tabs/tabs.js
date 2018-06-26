'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tab = {
  show: function show() {
    var app = this;
    var tabEl = void 0;
    var tabLinkEl = void 0;
    var animate = void 0;
    var tabRoute = void 0;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length === 1 && args[0].constructor === Object) {
      tabEl = args[0].tabEl;
      tabLinkEl = args[0].tabLinkEl;
      animate = args[0].animate;
      tabRoute = args[0].tabRoute;
    } else {
      tabEl = args[0];
      tabLinkEl = args[1];
      animate = args[2];
      tabRoute = args[3];

      if (typeof args[1] === 'boolean') {
        tabEl = args[0];
        animate = args[1];
        tabLinkEl = args[2];
        tabRoute = args[3];

        if (args.length > 2 && tabLinkEl.constructor === Object) {
          tabEl = args[0];
          animate = args[1];
          tabRoute = args[2];
          tabLinkEl = args[3];
        }
      }
    }
    if (typeof animate === 'undefined') animate = true;

    var $newTabEl = (0, _dom2.default)(tabEl);
    if (tabRoute && $newTabEl[0]) {
      $newTabEl[0].f7TabRoute = tabRoute;
    }

    if ($newTabEl.length === 0 || $newTabEl.hasClass('tab-active')) {
      return {
        $newTabEl: $newTabEl,
        newTabEl: $newTabEl[0]
      };
    }

    var $tabLinkEl = void 0;
    if (tabLinkEl) $tabLinkEl = (0, _dom2.default)(tabLinkEl);

    var $tabsEl = $newTabEl.parent('.tabs');
    if ($tabsEl.length === 0) {
      return {
        $newTabEl: $newTabEl,
        newTabEl: $newTabEl[0]
      };
    }

    // Release swipeouts in hidden tabs
    if (app.swipeout) app.swipeout.allowOpen = true;

    // Animated tabs
    var tabsChangedCallbacks = [];

    function onTabsChanged(callback) {
      tabsChangedCallbacks.push(callback);
    }
    function tabsChanged() {
      tabsChangedCallbacks.forEach(function (callback) {
        callback();
      });
    }

    var animated = false;

    if ($tabsEl.parent().hasClass('tabs-animated-wrap')) {
      $tabsEl.parent()[animate ? 'removeClass' : 'addClass']('not-animated');

      var transitionDuration = parseFloat($tabsEl.css('transition-duration').replace(',', '.'));
      if (animate && transitionDuration) {
        $tabsEl.transitionEnd(tabsChanged);
        animated = true;
      }

      var tabsTranslate = (app.rtl ? $newTabEl.index() : -$newTabEl.index()) * 100;
      $tabsEl.transform('translate3d(' + tabsTranslate + '%,0,0)');
    }

    // Swipeable tabs
    if ($tabsEl.parent().hasClass('tabs-swipeable-wrap') && app.swiper) {
      var swiper = $tabsEl.parent()[0].swiper;
      if (swiper && swiper.activeIndex !== $newTabEl.index()) {
        animated = true;
        swiper.once('slideChangeTransitionEnd', function () {
          tabsChanged();
        }).slideTo($newTabEl.index(), animate ? undefined : 0);
      }
    }

    // Remove active class from old tabs
    var $oldTabEl = $tabsEl.children('.tab-active');
    $oldTabEl.removeClass('tab-active').trigger('tab:hide');
    app.emit('tabHide', $oldTabEl[0]);

    // Trigger 'show' event on new tab
    $newTabEl.addClass('tab-active').trigger('tab:show');
    app.emit('tabShow', $newTabEl[0]);

    // Find related link for new tab
    if (!$tabLinkEl) {
      // Search by id
      if (typeof tabEl === 'string') $tabLinkEl = (0, _dom2.default)('.tab-link[href="' + tabEl + '"]');else $tabLinkEl = (0, _dom2.default)('.tab-link[href="#' + $newTabEl.attr('id') + '"]');
      // Search by data-tab
      if (!$tabLinkEl || $tabLinkEl && $tabLinkEl.length === 0) {
        (0, _dom2.default)('[data-tab]').each(function (index, el) {
          if ($newTabEl.is((0, _dom2.default)(el).attr('data-tab'))) $tabLinkEl = (0, _dom2.default)(el);
        });
      }
      if (tabRoute && (!$tabLinkEl || $tabLinkEl && $tabLinkEl.length === 0)) {
        $tabLinkEl = (0, _dom2.default)('[data-route-tab-id="' + tabRoute.route.tab.id + '"]');
        if ($tabLinkEl.length === 0) {
          $tabLinkEl = (0, _dom2.default)('.tab-link[href="' + tabRoute.url + '"]');
        }
      }
      if ($tabLinkEl.length > 1 && $newTabEl.parents('.page').length) {
        // eslint-disable-next-line
        $tabLinkEl = $tabLinkEl.filter(function (index, tabLinkElement) {
          return (0, _dom2.default)(tabLinkElement).parents('.page')[0] === $newTabEl.parents('.page')[0];
        });
        if (app.theme === 'ios' && $tabLinkEl.length === 0 && tabRoute) {
          var $pageEl = $newTabEl.parents('.page');
          var $navbarEl = (0, _dom2.default)(app.navbar.getElByPage($pageEl));
          $tabLinkEl = $navbarEl.find('[data-route-tab-id="' + tabRoute.route.tab.id + '"]');
          if ($tabLinkEl.length === 0) {
            $tabLinkEl = $navbarEl.find('.tab-link[href="' + tabRoute.url + '"]');
          }
        }
      }
    }
    if ($tabLinkEl.length > 0) {
      // Find related link for old tab
      var $oldTabLinkEl = void 0;
      if ($oldTabEl && $oldTabEl.length > 0) {
        // Search by id
        var oldTabId = $oldTabEl.attr('id');
        if (oldTabId) {
          $oldTabLinkEl = (0, _dom2.default)('.tab-link[href="#' + oldTabId + '"]');
          // Search by data-route-tab-id
          if (!$oldTabLinkEl || $oldTabLinkEl && $oldTabLinkEl.length === 0) {
            $oldTabLinkEl = (0, _dom2.default)('.tab-link[data-route-tab-id="' + oldTabId + '"]');
          }
        }
        // Search by data-tab
        if (!$oldTabLinkEl || $oldTabLinkEl && $oldTabLinkEl.length === 0) {
          (0, _dom2.default)('[data-tab]').each(function (index, tabLinkElement) {
            if ($oldTabEl.is((0, _dom2.default)(tabLinkElement).attr('data-tab'))) $oldTabLinkEl = (0, _dom2.default)(tabLinkElement);
          });
        }
        if (!$oldTabLinkEl || $oldTabLinkEl && $oldTabLinkEl.length === 0) {
          $oldTabLinkEl = $tabLinkEl.siblings('.tab-link-active');
        }
      } else if (tabRoute) {
        $oldTabLinkEl = $tabLinkEl.siblings('.tab-link-active');
      }

      if ($oldTabLinkEl && $oldTabLinkEl.length > 1 && $oldTabEl && $oldTabEl.parents('.page').length) {
        // eslint-disable-next-line
        $oldTabLinkEl = $oldTabLinkEl.filter(function (index, tabLinkElement) {
          return (0, _dom2.default)(tabLinkElement).parents('.page')[0] === $oldTabEl.parents('.page')[0];
        });
      }

      if ($oldTabLinkEl && $oldTabLinkEl.length > 0) $oldTabLinkEl.removeClass('tab-link-active');

      // Update links' classes
      if ($tabLinkEl && $tabLinkEl.length > 0) {
        $tabLinkEl.addClass('tab-link-active');
        // Material Highlight
        if (app.theme === 'md' && app.toolbar) {
          var $tabbarEl = $tabLinkEl.parents('.tabbar, .tabbar-labels');
          if ($tabbarEl.length > 0) {
            app.toolbar.setHighlight($tabbarEl);
          }
        }
      }
    }
    return {
      $newTabEl: $newTabEl,
      newTabEl: $newTabEl[0],
      $oldTabEl: $oldTabEl,
      oldTabEl: $oldTabEl[0],
      onTabsChanged: onTabsChanged,
      animated: animated
    };
  }
};
exports.default = {
  name: 'tabs',
  create: function create() {
    var app = this;
    _utils2.default.extend(app, {
      tab: {
        show: Tab.show.bind(app)
      }
    });
  },

  clicks: {
    '.tab-link': function tabLinkClick($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      if ($clickedEl.attr('href') && $clickedEl.attr('href').indexOf('#') === 0 || $clickedEl.attr('data-tab')) {
        app.tab.show({
          tabEl: data.tab || $clickedEl.attr('href'),
          tabLinkEl: $clickedEl,
          animate: data.animate
        });
      }
    }
  }
};