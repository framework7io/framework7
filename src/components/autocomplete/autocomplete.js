import $ from 'dom7';
import Utils from '../../utils/utils';
import Autocomplete from './autocomplete-class';

export default {
  name: 'autocomplete',
  params: {
    autocomplete: {
      openerEl: undefined,
      inputEl: undefined,
      view: undefined,

      // DropDown
      dropdownContainerEl: undefined,
      dropdownPlaceholderText: undefined,
      typeahead: false,
      highlightMatches: true,
      expandInput: false,
      updateInputValueOnSelect: true,

      value: undefined,
      multiple: false,

      source: undefined,
      limit: undefined,
      valueProperty: 'id',
      textProperty: 'text',

      openIn: 'page', // or 'popup' or 'dropdown'
      pageBackLinkText: 'Back',
      popupCloseLinkText: 'Close',
      searchbarPlaceholder: 'Search...',
      searchbarDisableText: 'Cancel',

      animate: true,

      autoFocus: false,
      closeOnSelect: false,
      notFoundText: 'Nothing found',
      requestSourceOnOpen: false,

      // Preloader
      preloaderColor: undefined,
      preloader: false,

      // Colors
      formColorTheme: undefined,
      navbarColorTheme: undefined,

      // Routing
      routableModals: true,
      url: 'select',

      // Custom render functions
      renderDropdown: undefined,
      renderPage: undefined,
      renderPopup: undefined,
      renderItems: undefined,
      renderItem: undefined,
      renderSearchbar: undefined,
      renderNavbar: undefined,

    },
  },
  static: {
    Autocomplete,
  },
  create() {
    const app = this;
    Utils.extend(app, {
      autocomplete: {
        create(params) {
          return new Autocomplete(app, params);
        },
        open(autocompleteEl) {
          const ac = app.autocomplete.get(autocompleteEl);
          if (ac && ac.open) return ac.open();
          return undefined;
        },
        close(autocompleteEl) {
          const ac = app.autocomplete.get(autocompleteEl);
          if (ac && ac.close) return ac.close();
          return undefined;
        },
        get(autocompleteEl) {
          if ((autocompleteEl instanceof Autocomplete)) return autocompleteEl;
          const $autocompleteEl = $(autocompleteEl);
          if (!$autocompleteEl.length) return undefined;
          return $autocompleteEl[0].f7Autocomplete;
        },
        destroy(autocompleteEl) {
          const ac = app.autocomplete.get(autocompleteEl);
          if (ac && ac.destroy) return ac.destroy();
          return undefined;
        },
      },
    });
  },

  on: {
    // tabMounted(tabEl) {
    //   const app = this;
    //   $(tabEl).find('.smart-select-init').each((index, smartSelectEl) => {
    //     app.smartSelect.create(Utils.extend({ el: smartSelectEl }, $(smartSelectEl).dataset()));
    //   });
    // },
    // tabBeforeRemove(tabEl) {
    //   $(tabEl).find('.smart-select-init').each((index, smartSelectEl) => {
    //     if (smartSelectEl.f7SmartSelect && smartSelectEl.f7SmartSelect.destroy) {
    //       smartSelectEl.f7SmartSelect.destroy();
    //     }
    //   });
    // },
    // pageInit(page) {
    //   const app = this;
    //   page.$el.find('.smart-select-init').each((index, smartSelectEl) => {
    //     app.smartSelect.create(Utils.extend({ el: smartSelectEl }, $(smartSelectEl).dataset()));
    //   });
    // },
    // pageBeforeRemove(page) {
    //   page.$el.find('.smart-select-init').each((index, smartSelectEl) => {
    //     if (smartSelectEl.f7SmartSelect && smartSelectEl.f7SmartSelect.destroy) {
    //       smartSelectEl.f7SmartSelect.destroy();
    //     }
    //   });
    // },
  },
  clicks: {
    // '.smart-select': function open($clickedEl, data) {
    //   const app = this;
    //   if (!$clickedEl[0].f7SmartSelect) {
    //     const ss = app.smartSelect.create(Utils.extend({ el: $clickedEl }, data));
    //     ss.open();
    //   }
    // },
  },
};
