import $ from 'dom7';
import Utils from '../../utils/utils';
import Swiper from './swiper-class/swiper';

if (!window.Swiper) {
  window.Swiper = Swiper;
}

export default {
  name: 'swiper',
  static: {
    Swiper,
  },
  create() {
    const app = this;
    Utils.extend(app, {
      swiper: {
        create(...args) {
          return new Swiper(...args);
        },
        get(swiperEl) {
          const $swiperEl = $(swiperEl);
          if ($swiperEl.length && $swiperEl[0].swiper) return $swiperEl[0].swiper;
          return undefined;
        },
        destroy(swiperEl) {
          const $swiperEl = $(swiperEl);
          if (!$swiperEl.length) return;
          const swiper = $swiperEl[0].swiper;
          if (swiper && swiper.destroy) swiper.destroy(true);
        },
      },
    });
  },
  on: {
    pageBeforeRemove(page) {
      const app = this;
      page.$el.find('.swiper-init, .tabs-swipeable-wrap').each((index, swiperEl) => {
        app.swiper.destroy(swiperEl);
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.swiper-init, .tabs-swipeable-wrap').each((index, swiperEl) => {
        const $swiperEl = $(swiperEl);
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
              slideChangeStart() {
                const swiper = this;
                app.tab.show(swiper.slides.eq(swiper.activeIndex));
              },
            },
          });
        }

        app.swiper.create($swiperEl[0], params);
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
