'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _class = require('../../utils/class');

var _class2 = _interopRequireDefault(_class);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var SmartSelect = function (_Framework7Class) {
  _inherits(SmartSelect, _Framework7Class);

  function SmartSelect(app) {
    var _ret, _ret2, _ret3;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, SmartSelect);

    var _this = _possibleConstructorReturn(this, (SmartSelect.__proto__ || Object.getPrototypeOf(SmartSelect)).call(this, params, [app]));

    var ss = _this;
    ss.app = app;
    var defaults = _utils2.default.extend({
      on: {}
    }, app.params.smartSelect);

    var $el = (0, _dom2.default)(params.el).eq(0);
    if ($el.length === 0) return _ret = ss, _possibleConstructorReturn(_this, _ret);

    var $selectEl = $el.find('select').eq(0);
    if ($selectEl.length === 0) return _ret2 = ss, _possibleConstructorReturn(_this, _ret2);

    var $valueEl = (0, _dom2.default)(params.valueEl);
    if ($valueEl.length === 0) {
      $valueEl = $el.find('.item-after');
    }
    if ($valueEl.length === 0) {
      $valueEl = (0, _dom2.default)('<div class="item-after"></div>');
      $valueEl.insertAfter($el.find('.item-title'));
    }

    // Extend defaults with modules params
    ss.useModulesParams(defaults);

    // View
    var view = params.view;
    if (!view) {
      view = $el.parents('.view').length && $el.parents('.view')[0].f7View;
    }
    if (!view && (params.openIn === 'page' || params.openIn !== 'page' && params.routableModals === true)) {
      throw Error('Smart Select requires initialized View');
    }

    // Url
    var url = params.url;
    if (!url) {
      if ($el.attr('href') && $el.attr('href') !== '#') url = $el.attr('href');else url = $selectEl.attr('name').toLowerCase() + '-select/';
    }
    if (!url) url = ss.params.url;

    var multiple = $selectEl[0].multiple;
    var inputType = multiple ? 'checkbox' : 'radio';
    var id = _utils2.default.now();
    _utils2.default.extend(ss, {
      params: _utils2.default.extend(defaults, params),
      $el: $el,
      el: $el[0],
      $selectEl: $selectEl,
      selectEl: $selectEl[0],
      $valueEl: $valueEl,
      valueEl: $valueEl[0],
      url: url,
      multiple: multiple,
      inputType: inputType,
      id: id,
      view: view,
      inputName: inputType + '-' + id,
      selectName: $selectEl.attr('name'),
      maxLength: $selectEl.attr('maxlength') || params.maxLength
    });
    $el[0].f7SmartSelect = ss;

    // Events
    function onClick() {
      ss.open();
    }
    function onChange() {
      var value = ss.$selectEl.val();
      ss.$el.trigger('smartselect:change', ss, value);
      ss.emit('local::change smartSelectChange', ss, value);
      ss.setValue();
    }
    ss.attachEvents = function attachEvents() {
      $el.on('click', onClick);
      $el.on('change', 'select', onChange);
    };
    ss.detachEvents = function detachEvents() {
      $el.off('click', onClick);
      $el.off('change', 'select', onChange);
    };

    function handleInputChange() {
      var optionEl = void 0;
      var text = void 0;
      var inputEl = this;
      var value = inputEl.value;
      var optionText = [];
      var displayAs = void 0;
      if (inputEl.type === 'checkbox') {
        for (var i = 0; i < ss.selectEl.options.length; i += 1) {
          optionEl = ss.selectEl.options[i];
          if (optionEl.value === value) {
            optionEl.selected = inputEl.checked;
          }
          if (optionEl.selected) {
            displayAs = optionEl.dataset ? optionEl.dataset.displayAs : (0, _dom2.default)(optionEl).data('display-value-as');
            text = displayAs && typeof displayAs !== 'undefined' ? displayAs : optionEl.textContent;
            optionText.push(text.trim());
          }
        }
        if (ss.maxLength) {
          ss.checkMaxLength();
        }
      } else {
        optionEl = ss.$selectEl.find('option[value="' + value + '"]')[0];
        displayAs = optionEl.dataset ? optionEl.dataset.displayAs : (0, _dom2.default)(optionEl).data('display-as');
        text = displayAs && typeof displayAs !== 'undefined' ? displayAs : optionEl.textContent;
        optionText = [text];
        ss.selectEl.value = value;
      }

      ss.$selectEl.trigger('change');
      ss.$valueEl.text(optionText.join(', '));
      if (ss.params.closeOnSelect && ss.inputType === 'radio') {
        ss.close();
      }
    }

    ss.attachInputsEvents = function attachInputsEvents() {
      ss.$containerEl.on('change', 'input[type="checkbox"], input[type="radio"]', handleInputChange);
    };
    ss.detachInputsEvents = function detachInputsEvents() {
      ss.$containerEl.off('change', 'input[type="checkbox"], input[type="radio"]', handleInputChange);
    };

    // Install Modules
    ss.useModules();

    // Init
    ss.init();

    return _ret3 = ss, _possibleConstructorReturn(_this, _ret3);
  }

  _createClass(SmartSelect, [{
    key: 'checkMaxLength',
    value: function checkMaxLength() {
      var ss = this;
      var $containerEl = ss.$containerEl;
      if (ss.selectEl.selectedOptions.length >= ss.maxLength) {
        $containerEl.find('input[type="checkbox"]').each(function (index, inputEl) {
          if (!inputEl.checked) {
            (0, _dom2.default)(inputEl).parents('li').addClass('disabled');
          } else {
            (0, _dom2.default)(inputEl).parents('li').removeClass('disabled');
          }
        });
      } else {
        $containerEl.find('.disabled').removeClass('disabled');
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      var ss = this;
      var valueArray = [];
      if (typeof value !== 'undefined') {
        if (Array.isArray(value)) {
          valueArray = value;
        } else {
          valueArray = [value];
        }
      } else {
        ss.$selectEl.find('option').each(function (optionIndex, optionEl) {
          var $optionEl = (0, _dom2.default)(optionEl);
          if (optionEl.selected) {
            var displayAs = optionEl.dataset ? optionEl.dataset.displayAs : $optionEl.data('display-value-as');
            if (displayAs && typeof displayAs !== 'undefined') {
              valueArray.push(displayAs);
            } else {
              valueArray.push(optionEl.textContent.trim());
            }
          }
        });
      }
      ss.$valueEl.text(valueArray.join(', '));
    }
  }, {
    key: 'getItemsData',
    value: function getItemsData() {
      var ss = this;
      var items = [];
      var previousGroupEl = void 0;
      ss.$selectEl.find('option').each(function (index, optionEl) {
        var $optionEl = (0, _dom2.default)(optionEl);
        var optionData = $optionEl.dataset();
        var optionImage = optionData.optionImage || ss.params.optionImage;
        var optionIcon = optionData.optionIcon || ss.params.optionIcon;
        var optionHasMedia = optionImage || optionIcon;
        // if (material) optionHasMedia = optionImage || optionIcon;
        var optionColor = optionData.optionColor;

        var optionClassName = optionData.optionClass || '';
        if ($optionEl[0].disabled) optionClassName += ' disabled';

        var optionGroupEl = $optionEl.parent('optgroup')[0];
        var optionGroupLabel = optionGroupEl && optionGroupEl.label;
        var optionIsLabel = false;
        if (optionGroupEl && optionGroupEl !== previousGroupEl) {
          optionIsLabel = true;
          previousGroupEl = optionGroupEl;
          items.push({
            groupLabel: optionGroupLabel,
            isLabel: optionIsLabel
          });
        }
        items.push({
          value: $optionEl[0].value,
          text: $optionEl[0].textContent.trim(),
          selected: $optionEl[0].selected,
          groupEl: optionGroupEl,
          groupLabel: optionGroupLabel,
          image: optionImage,
          icon: optionIcon,
          color: optionColor,
          className: optionClassName,
          disabled: $optionEl[0].disabled,
          id: ss.id,
          hasMedia: optionHasMedia,
          checkbox: ss.inputType === 'checkbox',
          radio: ss.inputType === 'radio',
          inputName: ss.inputName,
          inputType: ss.inputType
        });
      });
      ss.items = items;
      return items;
    }
  }, {
    key: 'renderSearchbar',
    value: function renderSearchbar() {
      var ss = this;
      if (ss.params.renderSearchbar) return ss.params.renderSearchbar.call(ss);
      var searchbarHTML = '\n      <form class="searchbar">\n        <div class="searchbar-inner">\n          <div class="searchbar-input-wrap">\n            <input type="search" placeholder="' + ss.params.searchbarPlaceholder + '"/>\n            <i class="searchbar-icon"></i>\n            <span class="input-clear-button"></span>\n          </div>\n          <span class="searchbar-disable-button">' + ss.params.searchbarDisableText + '</span>\n        </div>\n      </form>\n    ';
      return searchbarHTML;
    }
  }, {
    key: 'renderItem',
    value: function renderItem(item, index) {
      var ss = this;
      if (ss.params.renderItem) return ss.params.renderItem.call(ss, item, index);
      var itemHtml = void 0;
      if (item.isLabel) {
        itemHtml = '<li class="item-divider">' + item.groupLabel + '</li>';
      } else {
        itemHtml = '\n        <li class="' + (item.className || '') + '">\n          <label class="item-' + item.inputType + ' item-content">\n            <input type="' + item.inputType + '" name="' + item.inputName + '" value="' + item.value + '" ' + (item.selected ? 'checked' : '') + '/>\n            <i class="icon icon-' + item.inputType + '"></i>\n            ' + (item.hasMedia ? '\n              <div class="item-media">\n                ' + (item.icon ? '<i class="icon ' + item.icon + '"></i>' : '') + '\n                ' + (item.image ? '<img src="' + item.image + '">' : '') + '\n              </div>\n            ' : '') + '\n            <div class="item-inner">\n              <div class="item-title' + (item.color ? ' color-' + item.color : '') + '">' + item.text + '</div>\n            </div>\n          </label>\n        </li>\n      ';
      }
      return itemHtml;
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var ss = this;
      if (ss.params.renderItems) return ss.params.renderItems.call(ss, ss.items);
      var itemsHtml = '\n      ' + ss.items.map(function (item, index) {
        return '' + ss.renderItem(item, index);
      }).join('') + '\n    ';
      return itemsHtml;
    }
  }, {
    key: 'renderPage',
    value: function renderPage() {
      var ss = this;
      if (ss.params.renderPage) return ss.params.renderPage.call(ss, ss.items);
      var pageTitle = ss.params.pageTitle;
      if (typeof pageTitle === 'undefined') {
        pageTitle = ss.$el.find('.item-title').text().trim();
      }
      var pageHtml = '\n      <div class="page smart-select-page" data-name="smart-select-page" data-select-name="' + ss.selectName + '">\n        <div class="navbar ' + (ss.params.navbarColorTheme ? 'color-theme-' + ss.params.navbarColorTheme : '') + '">\n          <div class="navbar-inner sliding ' + (ss.params.navbarColorTheme ? 'color-theme-' + ss.params.navbarColorTheme : '') + '">\n            <div class="left">\n              <a href="#" class="link back">\n                <i class="icon icon-back"></i>\n                <span class="ios-only">' + ss.params.pageBackLinkText + '</span>\n              </a>\n            </div>\n            ' + (pageTitle ? '<div class="title">' + pageTitle + '</div>' : '') + '\n            ' + (ss.params.searchbar ? '<div class="subnavbar">' + ss.renderSearchbar() + '</div>' : '') + '\n          </div>\n        </div>\n        ' + (ss.params.searchbar ? '<div class="searchbar-backdrop"></div>' : '') + '\n        <div class="page-content">\n          <div class="list smart-select-list-' + ss.id + ' ' + (ss.params.virtualList ? ' virtual-list' : '') + ' ' + (ss.params.formColorTheme ? 'color-theme-' + ss.params.formColorTheme : '') + '">\n            <ul>' + (!ss.params.virtualList && ss.renderItems(ss.items)) + '</ul>\n          </div>\n        </div>\n      </div>\n    ';
      return pageHtml;
    }
  }, {
    key: 'renderPopup',
    value: function renderPopup() {
      var ss = this;
      if (ss.params.renderPopup) return ss.params.renderPopup.call(ss, ss.items);
      var pageTitle = ss.params.pageTitle;
      if (typeof pageTitle === 'undefined') {
        pageTitle = ss.$el.find('.item-title').text().trim();
      }
      var popupHtml = '\n      <div class="popup smart-select-popup" data-select-name="' + ss.selectName + '">\n        <div class="view">\n          <div class="page smart-select-page ' + (ss.params.searchbar ? 'page-with-subnavbar' : '') + '" data-name="smart-select-page">\n            <div class="navbar' + (ss.params.navbarColorTheme ? 'theme-' + ss.params.navbarColorTheme : '') + '">\n              <div class="navbar-inner sliding">\n                <div class="left">\n                  <a href="#" class="link popup-close">\n                    <i class="icon icon-back"></i>\n                    <span class="ios-only">' + ss.params.popupCloseLinkText + '</span>\n                  </a>\n                </div>\n                ' + (pageTitle ? '<div class="title">' + pageTitle + '</div>' : '') + '\n                ' + (ss.params.searchbar ? '<div class="subnavbar">' + ss.renderSearchbar() + '</div>' : '') + '\n              </div>\n            </div>\n            ' + (ss.params.searchbar ? '<div class="searchbar-backdrop"></div>' : '') + '\n            <div class="page-content">\n              <div class="list smart-select-list-' + ss.id + ' ' + (ss.params.virtualList ? ' virtual-list' : '') + (ss.params.formColorTheme ? 'theme-' + ss.params.formColorTheme : '') + '">\n                <ul>' + (!ss.params.virtualList && ss.renderItems(ss.items)) + '</ul>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
      return popupHtml;
    }
  }, {
    key: 'renderSheet',
    value: function renderSheet() {
      var ss = this;
      if (ss.params.renderSheet) return ss.params.renderSheet.call(ss, ss.items);
      var sheetHtml = '\n      <div class="sheet-modal smart-select-sheet" data-select-name="' + ss.selectName + '">\n        <div class="toolbar ' + (ss.params.toolbarColorTheme ? 'theme-' + ss.params.toolbarColorTheme : '') + '">\n          <div class="toolbar-inner">\n            <div class="left"></div>\n            <div class="right">\n              <a class="link sheet-close">' + ss.params.sheetCloseLinkText + '</a>\n            </div>\n          </div>\n        </div>\n        <div class="sheet-modal-inner">\n          <div class="page-content">\n            <div class="list smart-select-list-' + ss.id + ' ' + (ss.params.virtualList ? ' virtual-list' : '') + (ss.params.formColorTheme ? 'theme-' + ss.params.formColorTheme : '') + '">\n              <ul>' + (!ss.params.virtualList && ss.renderItems(ss.items)) + '</ul>\n            </div>\n          </div>\n        </div>\n      </div>\n    ';
      return sheetHtml;
    }
  }, {
    key: 'renderPopover',
    value: function renderPopover() {
      var ss = this;
      if (ss.params.renderPopover) return ss.params.renderPopover.call(ss, ss.items);
      var popoverHtml = '\n      <div class="popover smart-select-popover" data-select-name="' + ss.selectName + '">\n        <div class="popover-inner">\n          <div class="list smart-select-list-' + ss.id + ' ' + (ss.params.virtualList ? ' virtual-list' : '') + (ss.params.formColorTheme ? 'theme-' + ss.params.formColorTheme : '') + '">\n            <ul>' + (!ss.params.virtualList && ss.renderItems(ss.items)) + '</ul>\n          </div>\n        </div>\n      </div>\n    ';
      return popoverHtml;
    }
  }, {
    key: 'onOpen',
    value: function onOpen(type, containerEl) {
      var ss = this;
      var app = ss.app;
      var $containerEl = (0, _dom2.default)(containerEl);
      ss.$containerEl = $containerEl;
      ss.openedIn = type;
      ss.opened = true;

      // Init VL
      if (ss.params.virtualList) {
        ss.vl = app.virtualList.create({
          el: $containerEl.find('.virtual-list'),
          items: ss.items,
          renderItem: ss.renderItem.bind(ss),
          height: ss.params.virtualListHeight,
          searchByItem: function searchByItem(query, item) {
            if (item.text && item.text.toLowerCase().indexOf(query.trim().toLowerCase()) >= 0) return true;
            return false;
          }
        });
      }

      // Init SB
      if (ss.params.searchbar) {
        var $searchbarEl = $containerEl.find('.searchbar');
        if (type === 'page' && app.theme === 'ios') {
          $searchbarEl = (0, _dom2.default)(app.navbar.getElByPage($containerEl)).find('.searchbar');
        }
        ss.searchbar = app.searchbar.create({
          el: $searchbarEl,
          backdropEl: $containerEl.find('.searchbar-backdrop'),
          searchContainer: '.smart-select-list-' + ss.id,
          searchIn: '.item-title'
        });
      }

      // Check for max length
      if (ss.maxLength) {
        ss.checkMaxLength();
      }

      // Close on select
      if (ss.params.closeOnSelect) {
        ss.$containerEl.find('input[type="radio"][name="' + ss.inputName + '"]:checked').parents('label').once('click', function () {
          ss.close();
        });
      }

      // Attach input events
      ss.attachInputsEvents();

      ss.$el.trigger('smartselect:open', ss);
      ss.emit('local::open smartSelectOpen', ss);
    }
  }, {
    key: 'onOpened',
    value: function onOpened() {
      var ss = this;

      ss.$el.trigger('smartselect:opened', ss);
      ss.emit('local::opened smartSelectOpened', ss);
    }
  }, {
    key: 'onClose',
    value: function onClose() {
      var ss = this;
      if (ss.destroyed) return;

      // Destroy VL
      if (ss.vl && ss.vl.destroy) {
        ss.vl.destroy();
        ss.vl = null;
        delete ss.vl;
      }

      // Destroy SB
      if (ss.searchbar && ss.searchbar.destroy) {
        ss.searchbar.destroy();
        ss.searchbar = null;
        delete ss.searchbar;
      }
      // Detach events
      ss.detachInputsEvents();

      ss.$el.trigger('smartselect:close', ss);
      ss.emit('local::close smartSelectClose', ss);
    }
  }, {
    key: 'onClosed',
    value: function onClosed() {
      var ss = this;
      if (ss.destroyed) return;
      ss.opened = false;
      ss.$containerEl = null;
      delete ss.$containerEl;

      ss.$el.trigger('smartselect:closed', ss);
      ss.emit('local::closed smartSelectClosed', ss);
    }
  }, {
    key: 'openPage',
    value: function openPage() {
      var ss = this;
      if (ss.opened) return ss;
      ss.getItemsData();
      var pageHtml = ss.renderPage(ss.items);

      ss.view.router.navigate({
        url: ss.url,
        route: {
          content: pageHtml,
          path: ss.url,
          on: {
            pageBeforeIn: function pageBeforeIn(e, page) {
              ss.onOpen('page', page.el);
            },
            pageAfterIn: function pageAfterIn(e, page) {
              ss.onOpened('page', page.el);
            },
            pageBeforeOut: function pageBeforeOut(e, page) {
              ss.onClose('page', page.el);
            },
            pageAfterOut: function pageAfterOut(e, page) {
              ss.onClosed('page', page.el);
            }
          }
        }
      });
      return ss;
    }
  }, {
    key: 'openPopup',
    value: function openPopup() {
      var ss = this;
      if (ss.opened) return ss;
      ss.getItemsData();
      var popupHtml = ss.renderPopup(ss.items);

      var popupParams = {
        content: popupHtml,
        on: {
          popupOpen: function popupOpen(popup) {
            ss.onOpen('popup', popup.el);
          },
          popupOpened: function popupOpened(popup) {
            ss.onOpened('popup', popup.el);
          },
          popupClose: function popupClose(popup) {
            ss.onClose('popup', popup.el);
          },
          popupClosed: function popupClosed(popup) {
            ss.onClosed('popup', popup.el);
          }
        }
      };

      if (ss.params.routableModals) {
        ss.view.router.navigate({
          url: ss.url,
          route: {
            path: ss.url,
            popup: popupParams
          }
        });
      } else {
        ss.modal = ss.app.popup.create(popupParams).open();
      }
      return ss;
    }
  }, {
    key: 'openSheet',
    value: function openSheet() {
      var ss = this;
      if (ss.opened) return ss;
      ss.getItemsData();
      var sheetHtml = ss.renderSheet(ss.items);

      var sheetParams = {
        content: sheetHtml,
        backdrop: false,
        scrollToEl: ss.$el,
        closeByOutsideClick: true,
        on: {
          sheetOpen: function sheetOpen(sheet) {
            ss.onOpen('sheet', sheet.el);
          },
          sheetOpened: function sheetOpened(sheet) {
            ss.onOpened('sheet', sheet.el);
          },
          sheetClose: function sheetClose(sheet) {
            ss.onClose('sheet', sheet.el);
          },
          sheetClosed: function sheetClosed(sheet) {
            ss.onClosed('sheet', sheet.el);
          }
        }
      };

      if (ss.params.routableModals) {
        ss.view.router.navigate({
          url: ss.url,
          route: {
            path: ss.url,
            sheet: sheetParams
          }
        });
      } else {
        ss.modal = ss.app.sheet.create(sheetParams).open();
      }
      return ss;
    }
  }, {
    key: 'openPopover',
    value: function openPopover() {
      var ss = this;
      if (ss.opened) return ss;
      ss.getItemsData();
      var popoverHtml = ss.renderPopover(ss.items);
      var popoverParams = {
        content: popoverHtml,
        targetEl: ss.$el,
        on: {
          popoverOpen: function popoverOpen(popover) {
            ss.onOpen('popover', popover.el);
          },
          popoverOpened: function popoverOpened(popover) {
            ss.onOpened('popover', popover.el);
          },
          popoverClose: function popoverClose(popover) {
            ss.onClose('popover', popover.el);
          },
          popoverClosed: function popoverClosed(popover) {
            ss.onClosed('popover', popover.el);
          }
        }
      };
      if (ss.params.routableModals) {
        ss.view.router.navigate({
          url: ss.url,
          route: {
            path: ss.url,
            popover: popoverParams
          }
        });
      } else {
        ss.modal = ss.app.popover.create(popoverParams).open();
      }
      return ss;
    }
  }, {
    key: 'open',
    value: function open(type) {
      var ss = this;
      if (ss.opened) return ss;
      var openIn = type || ss.params.openIn;
      ss['open' + openIn.split('').map(function (el, index) {
        if (index === 0) return el.toUpperCase();
        return el;
      }).join('')]();
      return ss;
    }
  }, {
    key: 'close',
    value: function close() {
      var ss = this;
      if (!ss.opened) return ss;
      if (ss.params.routableModals || ss.openedIn === 'page') {
        ss.view.router.back();
      } else {
        ss.modal.once('modalClosed', function () {
          _utils2.default.nextTick(function () {
            ss.modal.destroy();
            delete ss.modal;
          });
        });
        ss.modal.close();
      }
      return ss;
    }
  }, {
    key: 'init',
    value: function init() {
      var ss = this;
      ss.attachEvents();
      ss.setValue();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var ss = this;
      ss.emit('local::beforeDestroy smartSelectBeforeDestroy', ss);
      ss.$el.trigger('smartselect:beforedestroy', ss);
      ss.detachEvents();
      delete ss.$el[0].f7SmartSelect;
      _utils2.default.deleteProps(ss);
      ss.destroyed = true;
    }
  }]);

  return SmartSelect;
}(_class2.default);

exports.default = SmartSelect;