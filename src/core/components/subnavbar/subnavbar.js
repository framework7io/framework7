import $ from '../../shared/dom7.js';

export default {
  name: 'subnavbar',
  on: {
    pageInit(page) {
      if (page.$navbarEl && page.$navbarEl.length && page.$navbarEl.find('.subnavbar').length) {
        page.$el.addClass('page-with-subnavbar');
      }
      const $innerSubnavbars = page.$el.find('.subnavbar').filter((subnavbarEl) => {
        return $(subnavbarEl).parents('.page')[0] === page.$el[0];
      });
      if ($innerSubnavbars.length) {
        page.$el.addClass('page-with-subnavbar');
      }
    },
  },
};
