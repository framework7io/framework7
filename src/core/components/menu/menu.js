import $ from 'dom7';

export default {
  name: 'menu',
  on: {
    click(e) {
      const openedMenus = $('.menu-item-dropdown-opened');
      if (!openedMenus.length) return;
      openedMenus.each((index, el) => {
        if (!$(e.target).closest('.menu-item-dropdown-opened').length) {
          $(el).removeClass('menu-item-dropdown-opened');
        }
      });
    },
  },
  clicks: {
    '.menu-item-dropdown': function onClick($clickedEl, dataset, e) {
      if ($clickedEl.hasClass('menu-item-dropdown-opened')) {
        if ($(e.target).closest('.menu-dropdown').length) return;
        $clickedEl.removeClass('menu-item-dropdown-opened');
      } else {
        $clickedEl.addClass('menu-item-dropdown-opened');
      }
    },
    '.menu-close': function onClick() {
      $('.menu-item-dropdown-opened').removeClass('menu-item-dropdown-opened');
    },
  },
};
