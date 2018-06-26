'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _autocompleteClass = require('./autocomplete-class');

var _autocompleteClass2 = _interopRequireDefault(_autocompleteClass);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
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
      inputEvents: 'input',

      value: undefined,
      multiple: false,

      source: undefined,
      limit: undefined,
      valueProperty: 'id',
      textProperty: 'text',

      openIn: 'page', // or 'popup' or 'dropdown'
      pageBackLinkText: 'Back',
      popupCloseLinkText: 'Close',
      pageTitle: undefined,
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
      url: 'select/',

      // Custom render functions
      renderDropdown: undefined,
      renderPage: undefined,
      renderPopup: undefined,
      renderItem: undefined,
      renderSearchbar: undefined,
      renderNavbar: undefined

    }
  },
  static: {
    Autocomplete: _autocompleteClass2.default
  },
  create: function create() {
    var app = this;
    app.autocomplete = _utils2.default.extend((0, _constructorMethods2.default)({
      defaultSelector: undefined,
      constructor: _autocompleteClass2.default,
      app: app,
      domProp: 'f7Autocomplete'
    }), {
      open: function open(autocompleteEl) {
        var ac = app.autocomplete.get(autocompleteEl);
        if (ac && ac.open) return ac.open();
        return undefined;
      },
      close: function close(autocompleteEl) {
        var ac = app.autocomplete.get(autocompleteEl);
        if (ac && ac.close) return ac.close();
        return undefined;
      }
    });
  }
};