'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _swiper = require('./swiper-class/swiper');

var _swiper2 = _interopRequireDefault(_swiper);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if ("es" !== 'es') {
  if (!window.Swiper) {
    window.Swiper = _swiper2.default;
  }
}

function initSwipers(swiperEl) {
  var app = this;
  var $swiperEl = (0, _dom2.default)(swiperEl);
  if ($swiperEl.length === 0) return;
  if ($swiperEl[0].swiper) return;
  var initialSlide = void 0;
  var params = {};
  var isTabs = void 0;
  var isRoutableTabs = void 0;
  if ($swiperEl.hasClass('tabs-swipeable-wrap')) {
    $swiperEl.addClass('swiper-container').children('.tabs').addClass('swiper-wrapper').children('.tab').addClass('swiper-slide');
    initialSlide = $swiperEl.children('.tabs').children('.tab-active').index();
    isTabs = true;
    isRoutableTabs = $swiperEl.find('.tabs-routable').length > 0;
  }
  if ($swiperEl.attr('data-swiper')) {
    params = JSON.parse($swiperEl.attr('data-swiper'));
  } else {
    params = $swiperEl.dataset();
    Object.keys(params).forEach(function (key) {
      var value = params[key];
      if (typeof value === 'string' && value.indexOf('{') === 0 && value.indexOf('}') > 0) {
        try {
          params[key] = JSON.parse(value);
        } catch (e) {
          // not JSON
        }
      }
    });
  }
  if (typeof params.initialSlide === 'undefined' && typeof initialSlide !== 'undefined') {
    params.initialSlide = initialSlide;
  }

  var swiper = app.swiper.create($swiperEl[0], params);
  if (isTabs) {
    swiper.on('slideChange', function () {
      if (isRoutableTabs) {
        var view = app.views.get($swiperEl.parents('.view'));
        if (!view) view = app.views.main;
        var router = view.router;
        var tabRoute = router.findTabRoute(swiper.slides.eq(swiper.activeIndex)[0]);
        if (tabRoute) router.navigate(tabRoute.path);
      } else {
        app.tab.show({
          tabEl: swiper.slides.eq(swiper.activeIndex)
        });
      }
    });
  }
}

exports.default = {
  name: 'swiper',
  static: {
    Swiper: _swiper2.default
  },
  create: function create() {
    var app = this;
    app.swiper = (0, _constructorMethods2.default)({
      defaultSelector: '.swiper-container',
      constructor: _swiper2.default,
      domProp: 'swiper'
    });
  },

  on: {
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.swiper-init, .tabs-swipeable-wrap').each(function (index, swiperEl) {
        app.swiper.destroy(swiperEl);
      });
    },
    pageMounted: function pageMounted(page) {
      var app = this;
      page.$el.find('.tabs-swipeable-wrap').each(function (index, swiperEl) {
        initSwipers.call(app, swiperEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.swiper-init, .tabs-swipeable-wrap').each(function (index, swiperEl) {
        initSwipers.call(app, swiperEl);
      });
    },
    pageReinit: function pageReinit(page) {
      var app = this;
      page.$el.find('.swiper-init, .tabs-swipeable-wrap').each(function (index, swiperEl) {
        var swiper = app.swiper.get(swiperEl);
        if (swiper && swiper.update) swiper.update();
      });
    },
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      (0, _dom2.default)(tabEl).find('.swiper-init, .tabs-swipeable-wrap').each(function (index, swiperEl) {
        initSwipers.call(app, swiperEl);
      });
    },
    tabShow: function tabShow(tabEl) {
      var app = this;
      (0, _dom2.default)(tabEl).find('.swiper-init, .tabs-swipeable-wrap').each(function (index, swiperEl) {
        var swiper = app.swiper.get(swiperEl);
        if (swiper && swiper.update) swiper.update();
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var app = this;
      (0, _dom2.default)(tabEl).find('.swiper-init, .tabs-swipeable-wrap').each(function (index, swiperEl) {
        app.swiper.destroy(swiperEl);
      });
    }
  }
};