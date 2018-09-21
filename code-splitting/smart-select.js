
function framework7ComponentLoader(chunks) {
  var doc = document;
  var win = window;
  var $ = chunks.$;
  var Template7 = chunks.Template7;
  var Utils = chunks.Utils;
  var Device = chunks.Device;
  var Support = chunks.Support;
  var ConstructorMethods = chunks.ConstructorMethods;
  var ModalMethods = chunks.ModalMethods;
  var Framework7Class = chunks.Framework7Class;
  var Modal = chunks.Modal;

  var SmartSelect = (function (Framework7Class$$1) {
    function SmartSelect(app, params) {
      if ( params === void 0 ) params = {};

      Framework7Class$$1.call(this, params, [app]);
      var ss = this;

      var defaults = Utils.extend({
        on: {},
      }, app.params.smartSelect);

      // Extend defaults with modules params
      ss.useModulesParams(defaults);

      ss.params = Utils.extend({}, defaults, params);

      ss.app = app;

      var $el = $(ss.params.el).eq(0);
      if ($el.length === 0) { return ss; }

      if ($el[0].f7SmartSelect) { return $el[0].f7SmartSelect; }

      var $selectEl = $el.find('select').eq(0);
      if ($selectEl.length === 0) { return ss; }

      var $valueEl = $(ss.params.valueEl);
      if ($valueEl.length === 0) {
        $valueEl = $el.find('.item-after');
      }
      if ($valueEl.length === 0) {
        $valueEl = $('<div class="item-after"></div>');
        $valueEl.insertAfter($el.find('.item-title'));
      }

      // View
      var view;

      // Url
      var url = params.url;
      if (!url) {
        if ($el.attr('href') && $el.attr('href') !== '#') { url = $el.attr('href'); }
        else if ($selectEl.attr('name')) { url = ($selectEl.attr('name').toLowerCase()) + "-select/"; }
      }
      if (!url) { url = ss.params.url; }

      var multiple = $selectEl[0].multiple;
      var inputType = multiple ? 'checkbox' : 'radio';
      var id = Utils.id();

      Utils.extend(ss, {
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
        inputName: (inputType + "-" + id),
        selectName: $selectEl.attr('name'),
        maxLength: $selectEl.attr('maxlength') || params.maxLength,
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
        var optionEl;
        var text;
        var inputEl = this;
        var value = inputEl.value;
        var optionText = [];
        var displayAs;
        if (inputEl.type === 'checkbox') {
          for (var i = 0; i < ss.selectEl.options.length; i += 1) {
            optionEl = ss.selectEl.options[i];
            if (optionEl.value === value) {
              optionEl.selected = inputEl.checked;
            }
            if (optionEl.selected) {
              displayAs = optionEl.dataset ? optionEl.dataset.displayAs : $(optionEl).data('display-value-as');
              text = displayAs && typeof displayAs !== 'undefined' ? displayAs : optionEl.textContent;
              optionText.push(text.trim());
            }
          }
          if (ss.maxLength) {
            ss.checkMaxLength();
          }
        } else {
          optionEl = ss.$selectEl.find(("option[value=\"" + value + "\"]"))[0];
          displayAs = optionEl.dataset ? optionEl.dataset.displayAs : $(optionEl).data('display-as');
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

      return ss;
    }

    if ( Framework7Class$$1 ) SmartSelect.__proto__ = Framework7Class$$1;
    SmartSelect.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
    SmartSelect.prototype.constructor = SmartSelect;

    SmartSelect.prototype.getView = function getView () {
      var ss = this;
      var view = ss.view || ss.params.view;
      if (!view) {
        view = ss.$el.parents('.view').length && ss.$el.parents('.view')[0].f7View;
      }
      if (!view) {
        throw Error('Smart Select requires initialized View');
      }
      ss.view = view;
      return view;
    };

    SmartSelect.prototype.checkMaxLength = function checkMaxLength () {
      var ss = this;
      var $containerEl = ss.$containerEl;
      if (ss.selectEl.selectedOptions.length >= ss.maxLength) {
        $containerEl.find('input[type="checkbox"]').each(function (index, inputEl) {
          if (!inputEl.checked) {
            $(inputEl).parents('li').addClass('disabled');
          } else {
            $(inputEl).parents('li').removeClass('disabled');
          }
        });
      } else {
        $containerEl.find('.disabled').removeClass('disabled');
      }
    };

    SmartSelect.prototype.setValue = function setValue (value) {
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
          var $optionEl = $(optionEl);
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
    };

    SmartSelect.prototype.getItemsData = function getItemsData () {
      var ss = this;
      var items = [];
      var previousGroupEl;
      ss.$selectEl.find('option').each(function (index, optionEl) {
        var $optionEl = $(optionEl);
        var optionData = $optionEl.dataset();
        var optionImage = optionData.optionImage || ss.params.optionImage;
        var optionIcon = optionData.optionIcon || ss.params.optionIcon;
        var optionHasMedia = optionImage || optionIcon;
        // if (material) optionHasMedia = optionImage || optionIcon;
        var optionColor = optionData.optionColor;

        var optionClassName = optionData.optionClass || '';
        if ($optionEl[0].disabled) { optionClassName += ' disabled'; }

        var optionGroupEl = $optionEl.parent('optgroup')[0];
        var optionGroupLabel = optionGroupEl && optionGroupEl.label;
        var optionIsLabel = false;
        if (optionGroupEl && optionGroupEl !== previousGroupEl) {
          optionIsLabel = true;
          previousGroupEl = optionGroupEl;
          items.push({
            groupLabel: optionGroupLabel,
            isLabel: optionIsLabel,
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
          inputType: ss.inputType,
        });
      });
      ss.items = items;
      return items;
    };

    SmartSelect.prototype.renderSearchbar = function renderSearchbar () {
      var ss = this;
      if (ss.params.renderSearchbar) { return ss.params.renderSearchbar.call(ss); }
      var searchbarHTML = "\n      <form class=\"searchbar\">\n        <div class=\"searchbar-inner\">\n          <div class=\"searchbar-input-wrap\">\n            <input type=\"search\" placeholder=\"" + (ss.params.searchbarPlaceholder) + "\"/>\n            <i class=\"searchbar-icon\"></i>\n            <span class=\"input-clear-button\"></span>\n          </div>\n          <span class=\"searchbar-disable-button\">" + (ss.params.searchbarDisableText) + "</span>\n        </div>\n      </form>\n    ";
      return searchbarHTML;
    };

    SmartSelect.prototype.renderItem = function renderItem (item, index) {
      var ss = this;
      if (ss.params.renderItem) { return ss.params.renderItem.call(ss, item, index); }
      var itemHtml;
      if (item.isLabel) {
        itemHtml = "<li class=\"item-divider\">" + (item.groupLabel) + "</li>";
      } else {
        itemHtml = "\n        <li class=\"" + (item.className || '') + "\">\n          <label class=\"item-" + (item.inputType) + " item-content\">\n            <input type=\"" + (item.inputType) + "\" name=\"" + (item.inputName) + "\" value=\"" + (item.value) + "\" " + (item.selected ? 'checked' : '') + "/>\n            <i class=\"icon icon-" + (item.inputType) + "\"></i>\n            " + (item.hasMedia ? ("\n              <div class=\"item-media\">\n                " + (item.icon ? ("<i class=\"icon " + (item.icon) + "\"></i>") : '') + "\n                " + (item.image ? ("<img src=\"" + (item.image) + "\">") : '') + "\n              </div>\n            ") : '') + "\n            <div class=\"item-inner\">\n              <div class=\"item-title" + (item.color ? (" color-" + (item.color)) : '') + "\">" + (item.text) + "</div>\n            </div>\n          </label>\n        </li>\n      ";
      }
      return itemHtml;
    };

    SmartSelect.prototype.renderItems = function renderItems () {
      var ss = this;
      if (ss.params.renderItems) { return ss.params.renderItems.call(ss, ss.items); }
      var itemsHtml = "\n      " + (ss.items.map(function (item, index) { return ("" + (ss.renderItem(item, index))); }).join('')) + "\n    ";
      return itemsHtml;
    };

    SmartSelect.prototype.renderPage = function renderPage () {
      var ss = this;
      if (ss.params.renderPage) { return ss.params.renderPage.call(ss, ss.items); }
      var pageTitle = ss.params.pageTitle;
      if (typeof pageTitle === 'undefined') {
        var $itemTitleEl = ss.$el.find('.item-title');
        pageTitle = $itemTitleEl.length ? $itemTitleEl.text().trim() : '';
      }
      var cssClass = ss.params.cssClass;
      var pageHtml = "\n      <div class=\"page smart-select-page " + cssClass + "\" data-name=\"smart-select-page\" data-select-name=\"" + (ss.selectName) + "\">\n        <div class=\"navbar " + (ss.params.navbarColorTheme ? ("color-theme-" + (ss.params.navbarColorTheme)) : '') + "\">\n          <div class=\"navbar-inner sliding " + (ss.params.navbarColorTheme ? ("color-theme-" + (ss.params.navbarColorTheme)) : '') + "\">\n            <div class=\"left\">\n              <a href=\"#\" class=\"link back\">\n                <i class=\"icon icon-back\"></i>\n                <span class=\"ios-only\">" + (ss.params.pageBackLinkText) + "</span>\n              </a>\n            </div>\n            " + (pageTitle ? ("<div class=\"title\">" + pageTitle + "</div>") : '') + "\n            " + (ss.params.searchbar ? ("<div class=\"subnavbar\">" + (ss.renderSearchbar()) + "</div>") : '') + "\n          </div>\n        </div>\n        " + (ss.params.searchbar ? '<div class="searchbar-backdrop"></div>' : '') + "\n        <div class=\"page-content\">\n          <div class=\"list smart-select-list-" + (ss.id) + " " + (ss.params.virtualList ? ' virtual-list' : '') + " " + (ss.params.formColorTheme ? ("color-theme-" + (ss.params.formColorTheme)) : '') + "\">\n            <ul>" + (!ss.params.virtualList && ss.renderItems(ss.items)) + "</ul>\n          </div>\n        </div>\n      </div>\n    ";
      return pageHtml;
    };

    SmartSelect.prototype.renderPopup = function renderPopup () {
      var ss = this;
      if (ss.params.renderPopup) { return ss.params.renderPopup.call(ss, ss.items); }
      var pageTitle = ss.params.pageTitle;
      if (typeof pageTitle === 'undefined') {
        var $itemTitleEl = ss.$el.find('.item-title');
        pageTitle = $itemTitleEl.length ? $itemTitleEl.text().trim() : '';
      }
      var cssClass = ss.params.cssClass || '';
      var popupHtml = "\n      <div class=\"popup smart-select-popup " + cssClass + " " + (ss.params.popupTabletFullscreen ? 'popup-tablet-fullscreen' : '') + "\" data-select-name=\"" + (ss.selectName) + "\">\n        <div class=\"view\">\n          <div class=\"page smart-select-page " + (ss.params.searchbar ? 'page-with-subnavbar' : '') + "\" data-name=\"smart-select-page\">\n            <div class=\"navbar " + (ss.params.navbarColorTheme ? ("color-theme-" + (ss.params.navbarColorTheme)) : '') + "\">\n              <div class=\"navbar-inner sliding\">\n                <div class=\"left\">\n                  <a href=\"#\" class=\"link popup-close\" data-popup=\".smart-select-popup[data-select-name='" + (ss.selectName) + "']\">\n                    <i class=\"icon icon-back\"></i>\n                    <span class=\"ios-only\">" + (ss.params.popupCloseLinkText) + "</span>\n                  </a>\n                </div>\n                " + (pageTitle ? ("<div class=\"title\">" + pageTitle + "</div>") : '') + "\n                " + (ss.params.searchbar ? ("<div class=\"subnavbar\">" + (ss.renderSearchbar()) + "</div>") : '') + "\n              </div>\n            </div>\n            " + (ss.params.searchbar ? '<div class="searchbar-backdrop"></div>' : '') + "\n            <div class=\"page-content\">\n              <div class=\"list smart-select-list-" + (ss.id) + " " + (ss.params.virtualList ? ' virtual-list' : '') + " " + (ss.params.formColorTheme ? ("color-theme-" + (ss.params.formColorTheme)) : '') + "\">\n                <ul>" + (!ss.params.virtualList && ss.renderItems(ss.items)) + "</ul>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ";
      return popupHtml;
    };

    SmartSelect.prototype.renderSheet = function renderSheet () {
      var ss = this;
      if (ss.params.renderSheet) { return ss.params.renderSheet.call(ss, ss.items); }
      var cssClass = ss.params.cssClass;
      var sheetHtml = "\n      <div class=\"sheet-modal smart-select-sheet " + cssClass + "\" data-select-name=\"" + (ss.selectName) + "\">\n        <div class=\"toolbar " + (ss.params.toolbarColorTheme ? ("theme-" + (ss.params.toolbarColorTheme)) : '') + "\">\n          <div class=\"toolbar-inner\">\n            <div class=\"left\"></div>\n            <div class=\"right\">\n              <a class=\"link sheet-close\">" + (ss.params.sheetCloseLinkText) + "</a>\n            </div>\n          </div>\n        </div>\n        <div class=\"sheet-modal-inner\">\n          <div class=\"page-content\">\n            <div class=\"list smart-select-list-" + (ss.id) + " " + (ss.params.virtualList ? ' virtual-list' : '') + " " + (ss.params.formColorTheme ? ("color-theme-" + (ss.params.formColorTheme)) : '') + "\">\n              <ul>" + (!ss.params.virtualList && ss.renderItems(ss.items)) + "</ul>\n            </div>\n          </div>\n        </div>\n      </div>\n    ";
      return sheetHtml;
    };

    SmartSelect.prototype.renderPopover = function renderPopover () {
      var ss = this;
      if (ss.params.renderPopover) { return ss.params.renderPopover.call(ss, ss.items); }
      var cssClass = ss.params.cssClass;
      var popoverHtml = "\n      <div class=\"popover smart-select-popover " + cssClass + "\" data-select-name=\"" + (ss.selectName) + "\">\n        <div class=\"popover-inner\">\n          <div class=\"list smart-select-list-" + (ss.id) + " " + (ss.params.virtualList ? ' virtual-list' : '') + " " + (ss.params.formColorTheme ? ("color-theme-" + (ss.params.formColorTheme)) : '') + "\">\n            <ul>" + (!ss.params.virtualList && ss.renderItems(ss.items)) + "</ul>\n          </div>\n        </div>\n      </div>\n    ";
      return popoverHtml;
    };

    SmartSelect.prototype.onOpen = function onOpen (type, containerEl) {
      var ss = this;
      var app = ss.app;
      var $containerEl = $(containerEl);
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
            if (item.text && item.text.toLowerCase().indexOf(query.trim().toLowerCase()) >= 0) { return true; }
            return false;
          },
        });
      }

      // Init SB
      if (ss.params.searchbar) {
        var $searchbarEl = $containerEl.find('.searchbar');
        if (type === 'page' && app.theme === 'ios') {
          $searchbarEl = $(app.navbar.getElByPage($containerEl)).find('.searchbar');
        }

        if (ss.params.appendSearchbarNotFound && (type === 'page' || type === 'popup')) {
          var $notFoundEl = null;

          if (typeof ss.params.appendSearchbarNotFound === 'string') {
            $notFoundEl = $(("<div class=\"block searchbar-not-found\">" + (ss.params.appendSearchbarNotFound) + "</div>"));
          } else if (typeof ss.params.appendSearchbarNotFound === 'boolean') {
            $notFoundEl = $('<div class="block searchbar-not-found">Nothing found</div>');
          } else {
            $notFoundEl = ss.params.appendSearchbarNotFound;
          }

          if ($notFoundEl) {
            $containerEl.find('.page-content').append($notFoundEl[0]);
          }
        }

        var searchbarParams = Utils.extend({
          el: $searchbarEl,
          backdropEl: $containerEl.find('.searchbar-backdrop'),
          searchContainer: (".smart-select-list-" + (ss.id)),
          searchIn: '.item-title',
        }, typeof ss.params.searchbar === 'object' ? ss.params.searchbar : {});

        ss.searchbar = app.searchbar.create(searchbarParams);
      }

      // Check for max length
      if (ss.maxLength) {
        ss.checkMaxLength();
      }

      // Close on select
      if (ss.params.closeOnSelect) {
        ss.$containerEl.find(("input[type=\"radio\"][name=\"" + (ss.inputName) + "\"]:checked")).parents('label').once('click', function () {
          ss.close();
        });
      }

      // Attach input events
      ss.attachInputsEvents();

      ss.$el.trigger('smartselect:open', ss);
      ss.emit('local::open smartSelectOpen', ss);
    };

    SmartSelect.prototype.onOpened = function onOpened () {
      var ss = this;

      ss.$el.trigger('smartselect:opened', ss);
      ss.emit('local::opened smartSelectOpened', ss);
    };

    SmartSelect.prototype.onClose = function onClose () {
      var ss = this;
      if (ss.destroyed) { return; }

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
    };

    SmartSelect.prototype.onClosed = function onClosed () {
      var ss = this;
      if (ss.destroyed) { return; }
      ss.opened = false;
      ss.$containerEl = null;
      delete ss.$containerEl;

      ss.$el.trigger('smartselect:closed', ss);
      ss.emit('local::closed smartSelectClosed', ss);
    };

    SmartSelect.prototype.openPage = function openPage () {
      var ss = this;
      if (ss.opened) { return ss; }
      ss.getItemsData();
      var pageHtml = ss.renderPage(ss.items);
      var view = ss.getView();

      view.router.navigate({
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
            },
          },
        },
      });
      return ss;
    };

    SmartSelect.prototype.openPopup = function openPopup () {
      var ss = this;
      if (ss.opened) { return ss; }
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
          },
        },
      };

      if (ss.params.routableModals) {
        var view = ss.getView();
        view.router.navigate({
          url: ss.url,
          route: {
            path: ss.url,
            popup: popupParams,
          },
        });
      } else {
        ss.modal = ss.app.popup.create(popupParams).open();
      }
      return ss;
    };

    SmartSelect.prototype.openSheet = function openSheet () {
      var ss = this;
      if (ss.opened) { return ss; }
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
          },
        },
      };

      if (ss.params.routableModals) {
        var view = ss.getView();
        view.router.navigate({
          url: ss.url,
          route: {
            path: ss.url,
            sheet: sheetParams,
          },
        });
      } else {
        ss.modal = ss.app.sheet.create(sheetParams).open();
      }
      return ss;
    };

    SmartSelect.prototype.openPopover = function openPopover () {
      var ss = this;
      if (ss.opened) { return ss; }
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
          },
        },
      };
      if (ss.params.routableModals) {
        var view = ss.getView();
        view.router.navigate({
          url: ss.url,
          route: {
            path: ss.url,
            popover: popoverParams,
          },
        });
      } else {
        ss.modal = ss.app.popover.create(popoverParams).open();
      }
      return ss;
    };

    SmartSelect.prototype.open = function open (type) {
      var ss = this;
      if (ss.opened) { return ss; }
      var openIn = type || ss.params.openIn;
      ss[("open" + (openIn.split('').map(function (el, index) {
        if (index === 0) { return el.toUpperCase(); }
        return el;
      }).join('')))]();
      return ss;
    };

    SmartSelect.prototype.close = function close () {
      var ss = this;
      if (!ss.opened) { return ss; }
      if (ss.params.routableModals || ss.openedIn === 'page') {
        var view = ss.getView();
        view.router.back();
      } else {
        ss.modal.once('modalClosed', function () {
          Utils.nextTick(function () {
            ss.modal.destroy();
            delete ss.modal;
          });
        });
        ss.modal.close();
      }
      return ss;
    };

    SmartSelect.prototype.init = function init () {
      var ss = this;
      ss.attachEvents();
      ss.setValue();
    };

    SmartSelect.prototype.destroy = function destroy () {
      var ss = this;
      ss.emit('local::beforeDestroy smartSelectBeforeDestroy', ss);
      ss.$el.trigger('smartselect:beforedestroy', ss);
      ss.detachEvents();
      delete ss.$el[0].f7SmartSelect;
      Utils.deleteProps(ss);
      ss.destroyed = true;
    };

    return SmartSelect;
  }(Framework7Class));

  var smartSelect = {
    name: 'smartSelect',
    params: {
      smartSelect: {
        el: undefined,
        valueEl: undefined,
        openIn: 'page', // or 'popup' or 'sheet' or 'popover'
        pageTitle: undefined,
        pageBackLinkText: 'Back',
        popupCloseLinkText: 'Close',
        popupTabletFullscreen: false,
        sheetCloseLinkText: 'Done',
        searchbar: false,
        searchbarPlaceholder: 'Search',
        searchbarDisableText: 'Cancel',
        closeOnSelect: false,
        virtualList: false,
        virtualListHeight: undefined,
        formColorTheme: undefined,
        navbarColorTheme: undefined,
        routableModals: true,
        url: 'select/',
        cssClass: '',
        /*
          Custom render functions
        */
        renderPage: undefined,
        renderPopup: undefined,
        renderSheet: undefined,
        renderPopover: undefined,
        renderItems: undefined,
        renderItem: undefined,
        renderSearchbar: undefined,
      },
    },
    static: {
      SmartSelect: SmartSelect,
    },
    create: function create() {
      var app = this;
      app.smartSelect = Utils.extend(
        ConstructorMethods({
          defaultSelector: '.smart-select',
          constructor: SmartSelect,
          app: app,
          domProp: 'f7SmartSelect',
        }),
        {
          open: function open(smartSelectEl) {
            var ss = app.smartSelect.get(smartSelectEl);
            if (ss && ss.open) { return ss.open(); }
            return undefined;
          },
          close: function close(smartSelectEl) {
            var ss = app.smartSelect.get(smartSelectEl);
            if (ss && ss.close) { return ss.close(); }
            return undefined;
          },
        }
      );
    },

    on: {
      tabMounted: function tabMounted(tabEl) {
        var app = this;
        $(tabEl).find('.smart-select-init').each(function (index, smartSelectEl) {
          app.smartSelect.create(Utils.extend({ el: smartSelectEl }, $(smartSelectEl).dataset()));
        });
      },
      tabBeforeRemove: function tabBeforeRemove(tabEl) {
        $(tabEl).find('.smart-select-init').each(function (index, smartSelectEl) {
          if (smartSelectEl.f7SmartSelect && smartSelectEl.f7SmartSelect.destroy) {
            smartSelectEl.f7SmartSelect.destroy();
          }
        });
      },
      pageInit: function pageInit(page) {
        var app = this;
        page.$el.find('.smart-select-init').each(function (index, smartSelectEl) {
          app.smartSelect.create(Utils.extend({ el: smartSelectEl }, $(smartSelectEl).dataset()));
        });
      },
      pageBeforeRemove: function pageBeforeRemove(page) {
        page.$el.find('.smart-select-init').each(function (index, smartSelectEl) {
          if (smartSelectEl.f7SmartSelect && smartSelectEl.f7SmartSelect.destroy) {
            smartSelectEl.f7SmartSelect.destroy();
          }
        });
      },
    },
    clicks: {
      '.smart-select': function open($clickedEl, data) {
        var app = this;
        if (!$clickedEl[0].f7SmartSelect) {
          var ss = app.smartSelect.create(Utils.extend({ el: $clickedEl }, data));
          ss.open();
        }
      },
    },
    vnode: {
      'smart-select-init': {
        insert: function insert(vnode) {
          var app = this;
          var smartSelectEl = vnode.elm;
          app.smartSelect.create(Utils.extend({ el: smartSelectEl }, $(smartSelectEl).dataset()));
        },
        destroy: function destroy(vnode) {
          var smartSelectEl = vnode.elm;
          if (smartSelectEl.f7SmartSelect && smartSelectEl.f7SmartSelect.destroy) {
            smartSelectEl.f7SmartSelect.destroy();
          }
        },
      },
    },
  };

  return smartSelect;
}
framework7ComponentLoader.componentName = 'smartSelect';

