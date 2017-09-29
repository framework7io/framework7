import $ from 'dom7';
import Utils from '../../utils/utils';
import Swiper from './swiper-class/swiper';
import ConstructorMethods from '../../utils/constructor-methods';

if (process.env.FORMAT !== 'es') {
  if (!window.Swiper) {
    window.Swiper = Swiper;
  }
}

function initSwipers(swiperEl) {
  const app = this;
  const $swiperEl = $(swiperEl);
  if ($swiperEl.length === 0) return;
  if ($swiperEl[0].swiper) return;
  let initialSlide;
  let params = {};
  let isTabs;
  if ($swiperEl.hasClass('tabs-swipeable-wrap')) {
    $swiperEl
      .addClass('swiper-container')
      .children('.tabs')
      .addClass('swiper-wrapper')
      .children('.tab')
      .addClass('swiper-slide');
    initialSlide = $swiperEl.children('.tabs').children('.tab-active').index();
    isTabs = true;
  }
  if ($swiperEl.attr('data-swiper')) {
    params = JSON.parse($swiperEl.attr('data-swiper'));
  } else {
    params = $swiperEl.dataset();
    Object.keys(params).forEach((key) => {
      const value = params[key];
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
  if (isTabs) {
    Utils.extend(params, {
      on: {
        transitionStart() {
          const swiper = this;
          app.tab.show(swiper.slides.eq(swiper.activeIndex));
        },
      },
    });
  }

  app.swiper.create($swiperEl[0], params);
}

export default {
  name: 'swiper',
  static: {
    Swiper,
  },
  create() {
    const app = this;
    app.swiper = ConstructorMethods({
      defaultSelector: '.swiper-container',
      constructor: Swiper,
      domProp: 'swiper',
    });
  },
  on: {
    pageBeforeRemove(page) {
      const app = this;
      page.$el.find('.swiper-init, .tabs-swipeable-wrap').each((index, swiperEl) => {
        app.swiper.destroy(swiperEl);
      });
    },
    pageMounted(page) {
      const app = this;
      page.$el.find('.tabs-swipeable-wrap').each((index, swiperEl) => {
        initSwipers.call(app, swiperEl);
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.swiper-init, .tabs-swipeable-wrap').each((index, swiperEl) => {
        initSwipers.call(app, swiperEl);
      });
    },
    pageReinit(page) {
      const app = this;
      page.$el.find('.swiper-init, .tabs-swipeable-wrap').each((index, swiperEl) => {
        const swiper = app.swiper.get(swiperEl);
        if (swiper && swiper.update) swiper.update();
      });
    },
  },
};
