'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _class = require('../../utils/class');

var _class2 = _interopRequireDefault(_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint "no-useless-escape": "off" */


var Autocomplete = function (_Framework7Class) {
  _inherits(Autocomplete, _Framework7Class);

  function Autocomplete(app) {
    var _ret;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Autocomplete);

    var _this = _possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call(this, params, [app]));

    var ac = _this;
    ac.app = app;

    var defaults = _utils2.default.extend({
      on: {}
    }, app.params.autocomplete);

    // Extend defaults with modules params
    ac.useModulesParams(defaults);

    ac.params = _utils2.default.extend(defaults, params);

    var $openerEl = void 0;
    if (ac.params.openerEl) {
      $openerEl = (0, _dom2.default)(ac.params.openerEl);
      if ($openerEl.length) $openerEl[0].f7Autocomplete = ac;
    }

    var $inputEl = void 0;
    if (ac.params.inputEl) {
      $inputEl = (0, _dom2.default)(ac.params.inputEl);
      if ($inputEl.length) $inputEl[0].f7Autocomplete = ac;
    }

    var view = void 0;
    if (ac.params.view) {
      view = ac.params.view;
    } else if ($openerEl || $inputEl) {
      view = app.views.get($openerEl || $inputEl);
    }
    if (!view) view = app.views.main;

    var id = _utils2.default.now();

    var url = params.url;
    if (!url && $openerEl && $openerEl.length) {
      if ($openerEl.attr('href')) url = $openerEl.attr('href');else if ($openerEl.find('a').length > 0) {
        url = $openerEl.find('a').attr('href');
      }
    }
    if (!url || url === '#' || url === '') url = ac.params.url;

    var inputType = ac.params.multiple ? 'checkbox' : 'radio';

    _utils2.default.extend(ac, {
      $openerEl: $openerEl,
      openerEl: $openerEl && $openerEl[0],
      $inputEl: $inputEl,
      inputEl: $inputEl && $inputEl[0],
      id: id,
      view: view,
      url: url,
      value: ac.params.value || [],
      inputType: inputType,
      inputName: inputType + '-' + id,
      $modalEl: undefined,
      $dropdownEl: undefined
    });

    var previousQuery = '';
    function onInputChange() {
      var query = ac.$inputEl.val().trim();

      if (!ac.params.source) return;
      ac.params.source.call(ac, query, function (items) {
        var itemsHTML = '';
        var limit = ac.params.limit ? Math.min(ac.params.limit, items.length) : items.length;
        ac.items = items;
        var regExp = void 0;
        if (ac.params.highlightMatches) {
          query = query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
          regExp = new RegExp('(' + query + ')', 'i');
        }

        var firstValue = void 0;
        var firstItem = void 0;
        for (var i = 0; i < limit; i += 1) {
          var itemValue = _typeof(items[i]) === 'object' ? items[i][ac.params.valueProperty] : items[i];
          var itemText = _typeof(items[i]) === 'object' ? items[i][ac.params.textProperty] : items[i];
          if (i === 0) {
            firstValue = itemValue;
            firstItem = ac.items[i];
          }
          itemsHTML += ac.renderItem({
            value: itemValue,
            text: ac.params.highlightMatches ? itemText.replace(regExp, '<b>$1</b>') : itemText
          }, i);
        }
        if (itemsHTML === '' && query === '' && ac.params.dropdownPlaceholderText) {
          itemsHTML += ac.renderItem({
            placeholder: true,
            text: ac.params.dropdownPlaceholderText
          });
        }
        ac.$dropdownEl.find('ul').html(itemsHTML);
        if (ac.params.typeahead) {
          if (!firstValue || !firstItem) {
            return;
          }
          if (firstValue.toLowerCase().indexOf(query.toLowerCase()) !== 0) {
            return;
          }
          if (previousQuery.toLowerCase() === query.toLowerCase()) {
            ac.value = [];
            return;
          }

          if (previousQuery.toLowerCase().indexOf(query.toLowerCase()) === 0) {
            previousQuery = query;
            ac.value = [];
            return;
          }
          $inputEl.val(firstValue);
          $inputEl[0].setSelectionRange(query.length, firstValue.length);

          var previousValue = _typeof(ac.value[0]) === 'object' ? ac.value[0][ac.params.valueProperty] : ac.value[0];
          if (!previousValue || firstValue.toLowerCase() !== previousValue.toLowerCase()) {
            ac.value = [firstItem];
            ac.emit('local::change autocompleteChange', [firstItem]);
          }
        }

        previousQuery = query;
      });
    }
    function onPageInputChange() {
      var input = this;
      var value = input.value;
      var isValues = (0, _dom2.default)(input).parents('.autocomplete-values').length > 0;
      var item = void 0;
      var itemValue = void 0;
      var aValue = void 0;
      if (isValues) {
        if (ac.inputType === 'checkbox' && !input.checked) {
          for (var i = 0; i < ac.value.length; i += 1) {
            aValue = typeof ac.value[i] === 'string' ? ac.value[i] : ac.value[i][ac.params.valueProperty];
            if (aValue === value || aValue * 1 === value * 1) {
              ac.value.splice(i, 1);
            }
          }
          ac.updateValues();
          ac.emit('local::change autocompleteChange', ac.value);
        }
        return;
      }

      // Find Related Item
      for (var _i = 0; _i < ac.items.length; _i += 1) {
        itemValue = _typeof(ac.items[_i]) === 'object' ? ac.items[_i][ac.params.valueProperty] : ac.items[_i];
        if (itemValue === value || itemValue * 1 === value * 1) item = ac.items[_i];
      }
      if (ac.inputType === 'radio') {
        ac.value = [item];
      } else if (input.checked) {
        ac.value.push(item);
      } else {
        for (var _i2 = 0; _i2 < ac.value.length; _i2 += 1) {
          aValue = _typeof(ac.value[_i2]) === 'object' ? ac.value[_i2][ac.params.valueProperty] : ac.value[_i2];
          if (aValue === value || aValue * 1 === value * 1) {
            ac.value.splice(_i2, 1);
          }
        }
      }

      // Update Values Block
      ac.updateValues();

      // On Select Callback
      if (ac.inputType === 'radio' && input.checked || ac.inputType === 'checkbox') {
        ac.emit('local::change autocompleteChange', ac.value);
      }
    }
    function onHtmlClick(e) {
      var $targetEl = (0, _dom2.default)(e.target);
      if ($targetEl.is(ac.$inputEl[0]) || ac.$dropdownEl && $targetEl.closest(ac.$dropdownEl[0]).length) return;
      ac.close();
    }
    function onOpenerClick() {
      ac.open();
    }
    function onInputFocus() {
      ac.open();
    }
    function onInputBlur() {
      if (ac.$dropdownEl.find('label.active-state').length > 0) return;
      ac.close();
    }
    function onResize() {
      ac.positionDropdown();
    }

    function onKeyDown(e) {
      if (ac.opened && e.keyCode === 13) {
        e.preventDefault();
        ac.$inputEl.blur();
      }
    }
    function onDropdownclick() {
      var $clickedEl = (0, _dom2.default)(this);
      var clickedItem = void 0;
      for (var i = 0; i < ac.items.length; i += 1) {
        var itemValue = _typeof(ac.items[i]) === 'object' ? ac.items[i][ac.params.valueProperty] : ac.items[i];
        var value = $clickedEl.attr('data-value');
        if (itemValue === value || itemValue * 1 === value * 1) {
          clickedItem = ac.items[i];
        }
      }
      if (ac.params.updateInputValueOnSelect) {
        ac.$inputEl.val((typeof clickedItem === 'undefined' ? 'undefined' : _typeof(clickedItem)) === 'object' ? clickedItem[ac.params.valueProperty] : clickedItem);
        ac.$inputEl.trigger('input change');
      }
      ac.value = [clickedItem];
      ac.emit('local::change autocompleteChange', [clickedItem]);

      ac.close();
    }

    ac.attachEvents = function attachEvents() {
      if (ac.params.openIn !== 'dropdown' && ac.$openerEl) {
        ac.$openerEl.on('click', onOpenerClick);
      }
      if (ac.params.openIn === 'dropdown' && ac.$inputEl) {
        ac.$inputEl.on('focus', onInputFocus);
        ac.$inputEl.on(ac.params.inputEvents, onInputChange);
        if (app.device.android) {
          (0, _dom2.default)('html').on('click', onHtmlClick);
        } else {
          ac.$inputEl.on('blur', onInputBlur);
        }
        if (ac.params.typeahead) {
          ac.$inputEl.on('keydown', onKeyDown);
        }
      }
    };
    ac.detachEvents = function attachEvents() {
      if (ac.params.openIn !== 'dropdown' && ac.$openerEl) {
        ac.$openerEl.off('click', onOpenerClick);
      }
      if (ac.params.openIn === 'dropdown' && ac.$inputEl) {
        ac.$inputEl.off('focus', onInputFocus);
        ac.$inputEl.off(ac.params.inputEvents, onInputChange);
        if (app.device.android) {
          (0, _dom2.default)('html').off('click', onHtmlClick);
        } else {
          ac.$inputEl.off('blur', onInputBlur);
        }
        if (ac.params.typeahead) {
          ac.$inputEl.off('keydown', onKeyDown);
        }
      }
    };
    ac.attachDropdownEvents = function attachDropdownEvents() {
      ac.$dropdownEl.on('click', 'label', onDropdownclick);
      app.on('resize', onResize);
    };
    ac.detachDropdownEvents = function detachDropdownEvents() {
      ac.$dropdownEl.off('click', 'label', onDropdownclick);
      app.off('resize', onResize);
    };

    ac.attachPageEvents = function attachPageEvents() {
      ac.$el.on('change', 'input[type="radio"], input[type="checkbox"]', onPageInputChange);
      if (ac.params.closeOnSelect && !ac.params.multiple) {
        ac.$el.once('click', '.list label', function () {
          _utils2.default.nextTick(function () {
            ac.close();
          });
        });
      }
    };
    ac.detachPageEvents = function detachPageEvents() {
      ac.$el.off('change', 'input[type="radio"], input[type="checkbox"]', onPageInputChange);
    };

    // Install Modules
    ac.useModules();

    // Init
    ac.init();

    return _ret = ac, _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Autocomplete, [{
    key: 'positionDropdown',
    value: function positionDropdown() {
      var ac = this;
      var $inputEl = ac.$inputEl,
          app = ac.app,
          $dropdownEl = ac.$dropdownEl;


      var $pageContentEl = $inputEl.parents('.page-content');
      if ($pageContentEl.length === 0) return;
      var inputOffset = $inputEl.offset();
      var inputOffsetWidth = $inputEl[0].offsetWidth;
      var inputOffsetHeight = $inputEl[0].offsetHeight;
      var $listEl = $inputEl.parents('.list');

      var $listParent = void 0;
      $listEl.parents().each(function (index, parentEl) {
        if ($listParent) return;
        var $parentEl = (0, _dom2.default)(parentEl);
        if ($parentEl.parent($pageContentEl).length) $listParent = $parentEl;
      });

      var listOffset = $listEl.offset();
      var paddingBottom = parseInt($pageContentEl.css('padding-bottom'), 10);
      var listOffsetLeft = $listEl.length > 0 ? listOffset.left - $pageContentEl.offset().left : 0;
      var inputOffsetLeft = inputOffset.left - ($listEl.length > 0 ? listOffset.left : 0) - (app.rtl ? 0 : 0);
      var inputOffsetTop = inputOffset.top - ($pageContentEl.offset().top - $pageContentEl[0].scrollTop);

      var maxHeight = $pageContentEl[0].scrollHeight - paddingBottom - (inputOffsetTop + $pageContentEl[0].scrollTop) - $inputEl[0].offsetHeight;

      var paddingProp = app.rtl ? 'padding-right' : 'padding-left';
      var paddingValue = void 0;
      if ($listEl.length && !ac.params.expandInput) {
        paddingValue = (app.rtl ? $listEl[0].offsetWidth - inputOffsetLeft - inputOffsetWidth : inputOffsetLeft) - (app.theme === 'md' ? 16 : 15);
      }

      $dropdownEl.css({
        left: ($listEl.length > 0 ? listOffsetLeft : inputOffsetLeft) + 'px',
        top: inputOffsetTop + $pageContentEl[0].scrollTop + inputOffsetHeight + 'px',
        width: ($listEl.length > 0 ? $listEl[0].offsetWidth : inputOffsetWidth) + 'px'
      });
      $dropdownEl.children('.autocomplete-dropdown-inner').css(_defineProperty({
        maxHeight: maxHeight + 'px'
      }, paddingProp, $listEl.length > 0 && !ac.params.expandInput ? paddingValue + 'px' : ''));
    }
  }, {
    key: 'focus',
    value: function focus() {
      var ac = this;
      ac.$el.find('input[type=search]').focus();
    }
  }, {
    key: 'source',
    value: function source(query) {
      var ac = this;
      if (!ac.params.source) return;

      var $el = ac.$el;


      ac.params.source.call(ac, query, function (items) {
        var itemsHTML = '';
        var limit = ac.params.limit ? Math.min(ac.params.limit, items.length) : items.length;
        ac.items = items;
        for (var i = 0; i < limit; i += 1) {
          var selected = false;
          var itemValue = _typeof(items[i]) === 'object' ? items[i][ac.params.valueProperty] : items[i];
          for (var j = 0; j < ac.value.length; j += 1) {
            var aValue = _typeof(ac.value[j]) === 'object' ? ac.value[j][ac.params.valueProperty] : ac.value[j];
            if (aValue === itemValue || aValue * 1 === itemValue * 1) selected = true;
          }
          itemsHTML += ac.renderItem({
            value: itemValue,
            text: _typeof(items[i]) === 'object' ? items[i][ac.params.textProperty] : items[i],
            inputType: ac.inputType,
            id: ac.id,
            inputName: ac.inputName,
            selected: selected
          }, i);
        }
        $el.find('.autocomplete-found ul').html(itemsHTML);
        if (items.length === 0) {
          if (query.length !== 0) {
            $el.find('.autocomplete-not-found').show();
            $el.find('.autocomplete-found, .autocomplete-values').hide();
          } else {
            $el.find('.autocomplete-values').show();
            $el.find('.autocomplete-found, .autocomplete-not-found').hide();
          }
        } else {
          $el.find('.autocomplete-found').show();
          $el.find('.autocomplete-not-found, .autocomplete-values').hide();
        }
      });
    }
  }, {
    key: 'updateValues',
    value: function updateValues() {
      var ac = this;
      var valuesHTML = '';
      for (var i = 0; i < ac.value.length; i += 1) {
        valuesHTML += ac.renderItem({
          value: _typeof(ac.value[i]) === 'object' ? ac.value[i][ac.params.valueProperty] : ac.value[i],
          text: _typeof(ac.value[i]) === 'object' ? ac.value[i][ac.params.textProperty] : ac.value[i],
          inputType: ac.inputType,
          id: ac.id,
          inputName: ac.inputName + '-checked}',
          selected: true
        }, i);
      }
      ac.$el.find('.autocomplete-values ul').html(valuesHTML);
    }
  }, {
    key: 'preloaderHide',
    value: function preloaderHide() {
      var ac = this;
      if (ac.params.openIn === 'dropdown' && ac.$dropdownEl) {
        ac.$dropdownEl.find('.autocomplete-preloader').removeClass('autocomplete-preloader-visible');
      } else {
        (0, _dom2.default)('.autocomplete-preloader').removeClass('autocomplete-preloader-visible');
      }
    }
  }, {
    key: 'preloaderShow',
    value: function preloaderShow() {
      var ac = this;
      if (ac.params.openIn === 'dropdown' && ac.$dropdownEl) {
        ac.$dropdownEl.find('.autocomplete-preloader').addClass('autocomplete-preloader-visible');
      } else {
        (0, _dom2.default)('.autocomplete-preloader').addClass('autocomplete-preloader-visible');
      }
    }
  }, {
    key: 'renderPreloader',
    value: function renderPreloader() {
      var ac = this;
      return ('\n      <div class="autocomplete-preloader preloader ' + (ac.params.preloaderColor ? 'color-' + ac.params.preloaderColor : '') + '">' + (ac.app.theme === 'md' ? _utils2.default.mdPreloaderContent : '') + '</div>\n    ').trim();
    }
  }, {
    key: 'renderSearchbar',
    value: function renderSearchbar() {
      var ac = this;
      if (ac.params.renderSearchbar) return ac.params.renderSearchbar.call(ac);
      var searchbarHTML = ('\n      <form class="searchbar">\n        <div class="searchbar-inner">\n          <div class="searchbar-input-wrap">\n            <input type="search" placeholder="' + ac.params.searchbarPlaceholder + '"/>\n            <i class="searchbar-icon"></i>\n            <span class="input-clear-button"></span>\n          </div>\n          <span class="searchbar-disable-button">' + ac.params.searchbarDisableText + '</span>\n        </div>\n      </form>\n    ').trim();
      return searchbarHTML;
    }
  }, {
    key: 'renderItem',
    value: function renderItem(item, index) {
      var ac = this;
      if (ac.params.renderItem) return ac.params.renderItem.call(ac, item, index);
      var itemHtml = void 0;
      var itemValue = item.value ? item.value.replace(/"/g, '&quot;') : item.value;
      if (ac.params.openIn !== 'dropdown') {
        itemHtml = '\n        <li>\n          <label class="item-' + item.inputType + ' item-content">\n            <input type="' + item.inputType + '" name="' + item.inputName + '" value="' + itemValue + '" ' + (item.selected ? 'checked' : '') + '>\n            <i class="icon icon-' + item.inputType + '"></i>\n            <div class="item-inner">\n              <div class="item-title">' + item.text + '</div>\n            </div>\n          </label>\n        </li>\n      ';
      } else if (!item.placeholder) {
        // Dropdown
        itemHtml = '\n        <li>\n          <label class="item-radio item-content" data-value="' + itemValue + '">\n            <div class="item-inner">\n              <div class="item-title">' + item.text + '</div>\n            </div>\n          </label>\n        </li>\n      ';
      } else {
        // Dropwdown placeholder
        itemHtml = '\n        <li class="autocomplete-dropdown-placeholder">\n          <div class="item-content">\n            <div class="item-inner">\n              <div class="item-title">' + item.text + '</div>\n            </div>\n          </label>\n        </li>\n      ';
      }
      return itemHtml.trim();
    }
  }, {
    key: 'renderNavbar',
    value: function renderNavbar() {
      var ac = this;
      if (ac.params.renderNavbar) return ac.params.renderNavbar.call(ac);
      var pageTitle = ac.params.pageTitle;
      if (typeof pageTitle === 'undefined' && ac.$openerEl && ac.$openerEl.length) {
        pageTitle = ac.$openerEl.find('.item-title').text().trim();
      }
      var navbarHtml = ('\n      <div class="navbar ' + (ac.params.navbarColorTheme ? 'color-theme-' + ac.params.navbarColorTheme : '') + '">\n        <div class="navbar-inner ' + (ac.params.navbarColorTheme ? 'color-theme-' + ac.params.navbarColorTheme : '') + '">\n          <div class="left sliding">\n            <a href="#" class="link ' + (ac.params.openIn === 'page' ? 'back' : 'popup-close') + '" ' + (ac.params.openIn === 'popup' ? 'data-popup=".autocomplete-popup"' : '') + '>\n              <i class="icon icon-back"></i>\n              <span class="ios-only">' + (ac.params.openIn === 'page' ? ac.params.pageBackLinkText : ac.params.popupCloseLinkText) + '</span>\n            </a>\n          </div>\n          ' + (pageTitle ? '<div class="title sliding">' + pageTitle + '</div>' : '') + '\n          ' + (ac.params.preloader ? '\n          <div class="right">\n            ' + ac.renderPreloader() + '\n          </div>\n          ' : '') + '\n          <div class="subnavbar sliding">' + ac.renderSearchbar() + '</div>\n        </div>\n      </div>\n    ').trim();
      return navbarHtml;
    }
  }, {
    key: 'renderDropdown',
    value: function renderDropdown() {
      var ac = this;
      if (ac.params.renderDropdown) return ac.params.renderDropdown.call(ac, ac.items);
      var dropdownHtml = ('\n      <div class="autocomplete-dropdown">\n        <div class="autocomplete-dropdown-inner">\n          <div class="list ' + (!ac.params.expandInput ? 'no-ios-edge' : '') + '">\n            <ul></ul>\n          </div>\n        </div>\n        ' + (ac.params.preloader ? ac.renderPreloader() : '') + '\n      </div>\n    ').trim();
      return dropdownHtml;
    }
  }, {
    key: 'renderPage',
    value: function renderPage() {
      var ac = this;
      if (ac.params.renderPage) return ac.params.renderPage.call(ac, ac.items);

      var pageHtml = ('\n      <div class="page page-with-subnavbar autocomplete-page" data-name="autocomplete-page">\n        ' + ac.renderNavbar() + '\n        <div class="searchbar-backdrop"></div>\n        <div class="page-content">\n          <div class="list autocomplete-list autocomplete-found autocomplete-list-' + ac.id + ' ' + (ac.params.formColorTheme ? 'color-theme-' + ac.params.formColorTheme : '') + '">\n            <ul></ul>\n          </div>\n          <div class="list autocomplete-not-found">\n            <ul>\n              <li class="item-content"><div class="item-inner"><div class="item-title">' + ac.params.notFoundText + '</div></div></li>\n            </ul>\n          </div>\n          <div class="list autocomplete-values">\n            <ul></ul>\n          </div>\n        </div>\n      </div>\n    ').trim();
      return pageHtml;
    }
  }, {
    key: 'renderPopup',
    value: function renderPopup() {
      var ac = this;
      if (ac.params.renderPopup) return ac.params.renderPopup.call(ac, ac.items);
      var popupHtml = ('\n      <div class="popup autocomplete-popup">\n        <div class="view">\n          ' + ac.renderPage() + ';\n        </div>\n      </div>\n    ').trim();
      return popupHtml;
    }
  }, {
    key: 'onOpen',
    value: function onOpen(type, el) {
      var ac = this;
      var app = ac.app;
      var $el = (0, _dom2.default)(el);
      ac.$el = $el;
      ac.el = $el[0];
      ac.openedIn = type;
      ac.opened = true;

      if (ac.params.openIn === 'dropdown') {
        ac.attachDropdownEvents();

        ac.$dropdownEl.addClass('autocomplete-dropdown-in');
        ac.$inputEl.trigger('input');
      } else {
        // Init SB
        var $searchbarEl = $el.find('.searchbar');
        if (ac.params.openIn === 'page' && app.theme === 'ios' && $searchbarEl.length === 0) {
          $searchbarEl = (0, _dom2.default)(app.navbar.getElByPage($el)).find('.searchbar');
        }
        ac.searchbar = app.searchbar.create({
          el: $searchbarEl,
          backdropEl: $el.find('.searchbar-backdrop'),
          customSearch: true,
          on: {
            search: function search(sb, query) {
              if (query.length === 0 && ac.searchbar.enabled) {
                ac.searchbar.backdropShow();
              } else {
                ac.searchbar.backdropHide();
              }
              ac.source(query);
            }
          }
        });

        // Attach page events
        ac.attachPageEvents();

        // Update Values On Page Init
        ac.updateValues();

        // Source on load
        if (ac.params.requestSourceOnOpen) ac.source('');
      }

      ac.emit('local::open autocompleteOpen', ac);
    }
  }, {
    key: 'onOpened',
    value: function onOpened() {
      var ac = this;
      if (ac.params.openIn !== 'dropdown' && ac.params.autoFocus) {
        ac.autoFocus();
      }
      ac.emit('local::opened autocompleteOpened', ac);
    }
  }, {
    key: 'onClose',
    value: function onClose() {
      var ac = this;
      if (ac.destroyed) return;

      // Destroy SB
      if (ac.searchbar && ac.searchbar.destroy) {
        ac.searchbar.destroy();
        ac.searchbar = null;
        delete ac.searchbar;
      }

      if (ac.params.openIn === 'dropdown') {
        ac.detachDropdownEvents();
        ac.$dropdownEl.removeClass('autocomplete-dropdown-in').remove();
        ac.$inputEl.parents('.item-content-dropdown-expanded').removeClass('item-content-dropdown-expanded');
      } else {
        ac.detachPageEvents();
      }

      ac.emit('local::close autocompleteClose', ac);
    }
  }, {
    key: 'onClosed',
    value: function onClosed() {
      var ac = this;
      if (ac.destroyed) return;
      ac.opened = false;
      ac.$el = null;
      ac.el = null;
      delete ac.$el;
      delete ac.el;

      ac.emit('local::closed autocompleteClosed', ac);
    }
  }, {
    key: 'openPage',
    value: function openPage() {
      var ac = this;
      if (ac.opened) return ac;
      var pageHtml = ac.renderPage();
      ac.view.router.navigate({
        url: ac.url,
        route: {
          content: pageHtml,
          path: ac.url,
          on: {
            pageBeforeIn: function pageBeforeIn(e, page) {
              ac.onOpen('page', page.el);
            },
            pageAfterIn: function pageAfterIn(e, page) {
              ac.onOpened('page', page.el);
            },
            pageBeforeOut: function pageBeforeOut(e, page) {
              ac.onClose('page', page.el);
            },
            pageAfterOut: function pageAfterOut(e, page) {
              ac.onClosed('page', page.el);
            }
          },
          options: {
            animate: ac.params.animate
          }
        }
      });
      return ac;
    }
  }, {
    key: 'openPopup',
    value: function openPopup() {
      var ac = this;
      if (ac.opened) return ac;
      var popupHtml = ac.renderPopup();

      var popupParams = {
        content: popupHtml,
        animate: ac.params.animate,
        on: {
          popupOpen: function popupOpen(popup) {
            ac.onOpen('popup', popup.el);
          },
          popupOpened: function popupOpened(popup) {
            ac.onOpened('popup', popup.el);
          },
          popupClose: function popupClose(popup) {
            ac.onClose('popup', popup.el);
          },
          popupClosed: function popupClosed(popup) {
            ac.onClosed('popup', popup.el);
          }
        }
      };

      if (ac.params.routableModals) {
        ac.view.router.navigate({
          url: ac.url,
          route: {
            path: ac.url,
            popup: popupParams
          }
        });
      } else {
        ac.modal = ac.app.popup.create(popupParams).open(ac.params.animate);
      }
      return ac;
    }
  }, {
    key: 'openDropdown',
    value: function openDropdown() {
      var ac = this;

      if (!ac.$dropdownEl) {
        ac.$dropdownEl = (0, _dom2.default)(ac.renderDropdown());
      }
      var $listEl = ac.$inputEl.parents('.list');
      if ($listEl.length && ac.$inputEl.parents('.item-content').length > 0 && ac.params.expandInput) {
        ac.$inputEl.parents('.item-content').addClass('item-content-dropdown-expanded');
      }

      var $pageContentEl = ac.$inputEl.parents('.page-content');
      if (ac.params.dropdownContainerEl) {
        (0, _dom2.default)(ac.params.dropdownContainerEl).append(ac.$dropdownEl);
      } else if ($pageContentEl.length === 0) {
        ac.$dropdownEl.insertAfter(ac.$inputEl);
      } else {
        ac.positionDropdown();
        $pageContentEl.append(ac.$dropdownEl);
      }
      ac.onOpen('dropdown', ac.$dropdownEl);
      ac.onOpened('dropdown', ac.$dropdownEl);
    }
  }, {
    key: 'open',
    value: function open() {
      var ac = this;
      if (ac.opened) return ac;
      var openIn = ac.params.openIn;
      ac['open' + openIn.split('').map(function (el, index) {
        if (index === 0) return el.toUpperCase();
        return el;
      }).join('')]();
      return ac;
    }
  }, {
    key: 'close',
    value: function close() {
      var ac = this;
      if (!ac.opened) return ac;
      if (ac.params.openIn === 'dropdown') {
        ac.onClose();
        ac.onClosed();
      } else if (ac.params.routableModals || ac.openedIn === 'page') {
        ac.view.router.back({ animate: ac.params.animate });
      } else {
        ac.modal.once('modalClosed', function () {
          _utils2.default.nextTick(function () {
            ac.modal.destroy();
            delete ac.modal;
          });
        });
        ac.modal.close();
      }
      return ac;
    }
  }, {
    key: 'init',
    value: function init() {
      var ac = this;
      ac.attachEvents();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var ac = this;
      ac.emit('local::beforeDestroy autocompleteBeforeDestroy', ac);
      ac.detachEvents();
      if (ac.$inputEl && ac.$inputEl[0]) {
        delete ac.$inputEl[0].f7Autocomplete;
      }
      if (ac.$openerEl && ac.$openerEl[0]) {
        delete ac.$openerEl[0].f7Autocomplete;
      }
      _utils2.default.deleteProps(ac);
      ac.destroyed = true;
    }
  }]);

  return Autocomplete;
}(_class2.default);

exports.default = Autocomplete;