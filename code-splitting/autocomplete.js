
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

  /* eslint "no-useless-escape": "off" */

  var Autocomplete = (function (Framework7Class$$1) {
    function Autocomplete(app, params) {
      if ( params === void 0 ) params = {};

      Framework7Class$$1.call(this, params, [app]);

      var ac = this;
      ac.app = app;

      var defaults = Utils.extend({
        on: {},
      }, app.params.autocomplete);


      // Extend defaults with modules params
      ac.useModulesParams(defaults);

      ac.params = Utils.extend(defaults, params);

      var $openerEl;
      if (ac.params.openerEl) {
        $openerEl = $(ac.params.openerEl);
        if ($openerEl.length) { $openerEl[0].f7Autocomplete = ac; }
      }

      var $inputEl;
      if (ac.params.inputEl) {
        $inputEl = $(ac.params.inputEl);
        if ($inputEl.length) { $inputEl[0].f7Autocomplete = ac; }
      }

      var view;
      if (ac.params.view) {
        view = ac.params.view;
      } else if ($openerEl || $inputEl) {
        view = app.views.get($openerEl || $inputEl);
      }
      if (!view) { view = app.views.main; }

      var id = Utils.id();

      var url = params.url;
      if (!url && $openerEl && $openerEl.length) {
        if ($openerEl.attr('href')) { url = $openerEl.attr('href'); }
        else if ($openerEl.find('a').length > 0) {
          url = $openerEl.find('a').attr('href');
        }
      }
      if (!url || url === '#' || url === '') { url = ac.params.url; }

      var inputType = ac.params.multiple ? 'checkbox' : 'radio';

      Utils.extend(ac, {
        $openerEl: $openerEl,
        openerEl: $openerEl && $openerEl[0],
        $inputEl: $inputEl,
        inputEl: $inputEl && $inputEl[0],
        id: id,
        view: view,
        url: url,
        value: ac.params.value || [],
        inputType: inputType,
        inputName: (inputType + "-" + id),
        $modalEl: undefined,
        $dropdownEl: undefined,
      });

      var previousQuery = '';
      function onInputChange() {
        var query = ac.$inputEl.val().trim();

        if (!ac.params.source) { return; }
        ac.params.source.call(ac, query, function (items) {
          var itemsHTML = '';
          var limit = ac.params.limit ? Math.min(ac.params.limit, items.length) : items.length;
          ac.items = items;
          var regExp;
          if (ac.params.highlightMatches) {
            query = query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
            regExp = new RegExp(("(" + query + ")"), 'i');
          }

          var firstValue;
          var firstItem;
          for (var i = 0; i < limit; i += 1) {
            var itemValue = typeof items[i] === 'object' ? items[i][ac.params.valueProperty] : items[i];
            var itemText = typeof items[i] === 'object' ? items[i][ac.params.textProperty] : items[i];
            if (i === 0) {
              firstValue = itemValue;
              firstItem = ac.items[i];
            }
            itemsHTML += ac.renderItem({
              value: itemValue,
              text: ac.params.highlightMatches ? itemText.replace(regExp, '<b>$1</b>') : itemText,
            }, i);
          }
          if (itemsHTML === '' && query === '' && ac.params.dropdownPlaceholderText) {
            itemsHTML += ac.renderItem({
              placeholder: true,
              text: ac.params.dropdownPlaceholderText,
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

            var previousValue = typeof ac.value[0] === 'object' ? ac.value[0][ac.params.valueProperty] : ac.value[0];
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
        var isValues = $(input).parents('.autocomplete-values').length > 0;
        var item;
        var itemValue;
        var aValue;
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
        for (var i$1 = 0; i$1 < ac.items.length; i$1 += 1) {
          itemValue = typeof ac.items[i$1] === 'object' ? ac.items[i$1][ac.params.valueProperty] : ac.items[i$1];
          if (itemValue === value || itemValue * 1 === value * 1) { item = ac.items[i$1]; }
        }
        if (ac.inputType === 'radio') {
          ac.value = [item];
        } else if (input.checked) {
          ac.value.push(item);
        } else {
          for (var i$2 = 0; i$2 < ac.value.length; i$2 += 1) {
            aValue = typeof ac.value[i$2] === 'object' ? ac.value[i$2][ac.params.valueProperty] : ac.value[i$2];
            if (aValue === value || aValue * 1 === value * 1) {
              ac.value.splice(i$2, 1);
            }
          }
        }

        // Update Values Block
        ac.updateValues();

        // On Select Callback
        if (((ac.inputType === 'radio' && input.checked) || ac.inputType === 'checkbox')) {
          ac.emit('local::change autocompleteChange', ac.value);
        }
      }
      function onHtmlClick(e) {
        var $targetEl = $(e.target);
        if ($targetEl.is(ac.$inputEl[0]) || (ac.$dropdownEl && $targetEl.closest(ac.$dropdownEl[0]).length)) { return; }
        ac.close();
      }
      function onOpenerClick() {
        ac.open();
      }
      function onInputFocus() {
        ac.open();
      }
      function onInputBlur() {
        if (ac.$dropdownEl.find('label.active-state').length > 0) { return; }
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
        var $clickedEl = $(this);
        var clickedItem;
        for (var i = 0; i < ac.items.length; i += 1) {
          var itemValue = typeof ac.items[i] === 'object' ? ac.items[i][ac.params.valueProperty] : ac.items[i];
          var value = $clickedEl.attr('data-value');
          if (itemValue === value || itemValue * 1 === value * 1) {
            clickedItem = ac.items[i];
          }
        }
        if (ac.params.updateInputValueOnSelect) {
          ac.$inputEl.val(typeof clickedItem === 'object' ? clickedItem[ac.params.valueProperty] : clickedItem);
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
            $('html').on('click', onHtmlClick);
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
            $('html').off('click', onHtmlClick);
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
            Utils.nextTick(function () {
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

      return ac;
    }

    if ( Framework7Class$$1 ) Autocomplete.__proto__ = Framework7Class$$1;
    Autocomplete.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
    Autocomplete.prototype.constructor = Autocomplete;

    Autocomplete.prototype.positionDropdown = function positionDropdown () {
      var obj;

      var ac = this;
      var $inputEl = ac.$inputEl;
      var app = ac.app;
      var $dropdownEl = ac.$dropdownEl;

      var $pageContentEl = $inputEl.parents('.page-content');
      if ($pageContentEl.length === 0) { return; }
      var inputOffset = $inputEl.offset();
      var inputOffsetWidth = $inputEl[0].offsetWidth;
      var inputOffsetHeight = $inputEl[0].offsetHeight;
      var $listEl = $inputEl.parents('.list');

      var $listParent;
      $listEl.parents().each(function (index, parentEl) {
        if ($listParent) { return; }
        var $parentEl = $(parentEl);
        if ($parentEl.parent($pageContentEl).length) { $listParent = $parentEl; }
      });

      var listOffset = $listEl.offset();
      var paddingBottom = parseInt($pageContentEl.css('padding-bottom'), 10);
      var listOffsetLeft = $listEl.length > 0 ? listOffset.left - $pageContentEl.offset().left : 0;
      var inputOffsetLeft = inputOffset.left - ($listEl.length > 0 ? listOffset.left : 0) - (app.rtl ? 0 : 0);
      var inputOffsetTop = inputOffset.top - ($pageContentEl.offset().top - $pageContentEl[0].scrollTop);

      var maxHeight = $pageContentEl[0].scrollHeight - paddingBottom - (inputOffsetTop + $pageContentEl[0].scrollTop) - $inputEl[0].offsetHeight;

      var paddingProp = app.rtl ? 'padding-right' : 'padding-left';
      var paddingValue;
      if ($listEl.length && !ac.params.expandInput) {
        paddingValue = (app.rtl ? $listEl[0].offsetWidth - inputOffsetLeft - inputOffsetWidth : inputOffsetLeft) - (app.theme === 'md' ? 16 : 15);
      }

      $dropdownEl.css({
        left: (($listEl.length > 0 ? listOffsetLeft : inputOffsetLeft) + "px"),
        top: ((inputOffsetTop + $pageContentEl[0].scrollTop + inputOffsetHeight) + "px"),
        width: (($listEl.length > 0 ? $listEl[0].offsetWidth : inputOffsetWidth) + "px"),
      });
      $dropdownEl.children('.autocomplete-dropdown-inner').css(( obj = {
        maxHeight: (maxHeight + "px")
      }, obj[paddingProp] = $listEl.length > 0 && !ac.params.expandInput ? (paddingValue + "px") : '', obj ));
    };

    Autocomplete.prototype.focus = function focus () {
      var ac = this;
      ac.$el.find('input[type=search]').focus();
    };

    Autocomplete.prototype.source = function source (query) {
      var ac = this;
      if (!ac.params.source) { return; }

      var $el = ac.$el;

      ac.params.source.call(ac, query, function (items) {
        var itemsHTML = '';
        var limit = ac.params.limit ? Math.min(ac.params.limit, items.length) : items.length;
        ac.items = items;
        for (var i = 0; i < limit; i += 1) {
          var selected = false;
          var itemValue = typeof items[i] === 'object' ? items[i][ac.params.valueProperty] : items[i];
          for (var j = 0; j < ac.value.length; j += 1) {
            var aValue = typeof ac.value[j] === 'object' ? ac.value[j][ac.params.valueProperty] : ac.value[j];
            if (aValue === itemValue || aValue * 1 === itemValue * 1) { selected = true; }
          }
          itemsHTML += ac.renderItem({
            value: itemValue,
            text: typeof items[i] === 'object' ? items[i][ac.params.textProperty] : items[i],
            inputType: ac.inputType,
            id: ac.id,
            inputName: ac.inputName,
            selected: selected,
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
    };

    Autocomplete.prototype.updateValues = function updateValues () {
      var ac = this;
      var valuesHTML = '';
      for (var i = 0; i < ac.value.length; i += 1) {
        valuesHTML += ac.renderItem({
          value: typeof ac.value[i] === 'object' ? ac.value[i][ac.params.valueProperty] : ac.value[i],
          text: typeof ac.value[i] === 'object' ? ac.value[i][ac.params.textProperty] : ac.value[i],
          inputType: ac.inputType,
          id: ac.id,
          inputName: ((ac.inputName) + "-checked}"),
          selected: true,
        }, i);
      }
      ac.$el.find('.autocomplete-values ul').html(valuesHTML);
    };

    Autocomplete.prototype.preloaderHide = function preloaderHide () {
      var ac = this;
      if (ac.params.openIn === 'dropdown' && ac.$dropdownEl) {
        ac.$dropdownEl.find('.autocomplete-preloader').removeClass('autocomplete-preloader-visible');
      } else {
        $('.autocomplete-preloader').removeClass('autocomplete-preloader-visible');
      }
    };

    Autocomplete.prototype.preloaderShow = function preloaderShow () {
      var ac = this;
      if (ac.params.openIn === 'dropdown' && ac.$dropdownEl) {
        ac.$dropdownEl.find('.autocomplete-preloader').addClass('autocomplete-preloader-visible');
      } else {
        $('.autocomplete-preloader').addClass('autocomplete-preloader-visible');
      }
    };

    Autocomplete.prototype.renderPreloader = function renderPreloader () {
      var ac = this;
      return ("\n      <div class=\"autocomplete-preloader preloader " + (ac.params.preloaderColor ? ("color-" + (ac.params.preloaderColor)) : '') + "\">" + (ac.app.theme === 'md' ? Utils.mdPreloaderContent : '') + "</div>\n    ").trim();
    };

    Autocomplete.prototype.renderSearchbar = function renderSearchbar () {
      var ac = this;
      if (ac.params.renderSearchbar) { return ac.params.renderSearchbar.call(ac); }
      var searchbarHTML = ("\n      <form class=\"searchbar\">\n        <div class=\"searchbar-inner\">\n          <div class=\"searchbar-input-wrap\">\n            <input type=\"search\" placeholder=\"" + (ac.params.searchbarPlaceholder) + "\"/>\n            <i class=\"searchbar-icon\"></i>\n            <span class=\"input-clear-button\"></span>\n          </div>\n          <span class=\"searchbar-disable-button\">" + (ac.params.searchbarDisableText) + "</span>\n        </div>\n      </form>\n    ").trim();
      return searchbarHTML;
    };

    Autocomplete.prototype.renderItem = function renderItem (item, index) {
      var ac = this;
      if (ac.params.renderItem) { return ac.params.renderItem.call(ac, item, index); }
      var itemHtml;
      var itemValue = item.value && typeof item.value === 'string' ? item.value.replace(/"/g, '&quot;') : item.value;
      if (ac.params.openIn !== 'dropdown') {
        itemHtml = "\n        <li>\n          <label class=\"item-" + (item.inputType) + " item-content\">\n            <input type=\"" + (item.inputType) + "\" name=\"" + (item.inputName) + "\" value=\"" + itemValue + "\" " + (item.selected ? 'checked' : '') + ">\n            <i class=\"icon icon-" + (item.inputType) + "\"></i>\n            <div class=\"item-inner\">\n              <div class=\"item-title\">" + (item.text) + "</div>\n            </div>\n          </label>\n        </li>\n      ";
      } else if (!item.placeholder) {
        // Dropdown
        itemHtml = "\n        <li>\n          <label class=\"item-radio item-content\" data-value=\"" + itemValue + "\">\n            <div class=\"item-inner\">\n              <div class=\"item-title\">" + (item.text) + "</div>\n            </div>\n          </label>\n        </li>\n      ";
      } else {
        // Dropwdown placeholder
        itemHtml = "\n        <li class=\"autocomplete-dropdown-placeholder\">\n          <div class=\"item-content\">\n            <div class=\"item-inner\">\n              <div class=\"item-title\">" + (item.text) + "</div>\n            </div>\n          </label>\n        </li>\n      ";
      }
      return itemHtml.trim();
    };

    Autocomplete.prototype.renderNavbar = function renderNavbar () {
      var ac = this;
      if (ac.params.renderNavbar) { return ac.params.renderNavbar.call(ac); }
      var pageTitle = ac.params.pageTitle;
      if (typeof pageTitle === 'undefined' && ac.$openerEl && ac.$openerEl.length) {
        pageTitle = ac.$openerEl.find('.item-title').text().trim();
      }
      var navbarHtml = ("\n      <div class=\"navbar " + (ac.params.navbarColorTheme ? ("color-theme-" + (ac.params.navbarColorTheme)) : '') + "\">\n        <div class=\"navbar-inner " + (ac.params.navbarColorTheme ? ("color-theme-" + (ac.params.navbarColorTheme)) : '') + "\">\n          <div class=\"left sliding\">\n            <a href=\"#\" class=\"link " + (ac.params.openIn === 'page' ? 'back' : 'popup-close') + "\" " + (ac.params.openIn === 'popup' ? 'data-popup=".autocomplete-popup"' : '') + ">\n              <i class=\"icon icon-back\"></i>\n              <span class=\"ios-only\">" + (ac.params.openIn === 'page' ? ac.params.pageBackLinkText : ac.params.popupCloseLinkText) + "</span>\n            </a>\n          </div>\n          " + (pageTitle ? ("<div class=\"title sliding\">" + pageTitle + "</div>") : '') + "\n          " + (ac.params.preloader ? ("\n          <div class=\"right\">\n            " + (ac.renderPreloader()) + "\n          </div>\n          ") : '') + "\n          <div class=\"subnavbar sliding\">" + (ac.renderSearchbar()) + "</div>\n        </div>\n      </div>\n    ").trim();
      return navbarHtml;
    };

    Autocomplete.prototype.renderDropdown = function renderDropdown () {
      var ac = this;
      if (ac.params.renderDropdown) { return ac.params.renderDropdown.call(ac, ac.items); }
      var dropdownHtml = ("\n      <div class=\"autocomplete-dropdown\">\n        <div class=\"autocomplete-dropdown-inner\">\n          <div class=\"list " + (!ac.params.expandInput ? 'no-ios-edge' : '') + "\">\n            <ul></ul>\n          </div>\n        </div>\n        " + (ac.params.preloader ? ac.renderPreloader() : '') + "\n      </div>\n    ").trim();
      return dropdownHtml;
    };

    Autocomplete.prototype.renderPage = function renderPage () {
      var ac = this;
      if (ac.params.renderPage) { return ac.params.renderPage.call(ac, ac.items); }

      var pageHtml = ("\n      <div class=\"page page-with-subnavbar autocomplete-page\" data-name=\"autocomplete-page\">\n        " + (ac.renderNavbar()) + "\n        <div class=\"searchbar-backdrop\"></div>\n        <div class=\"page-content\">\n          <div class=\"list autocomplete-list autocomplete-found autocomplete-list-" + (ac.id) + " " + (ac.params.formColorTheme ? ("color-theme-" + (ac.params.formColorTheme)) : '') + "\">\n            <ul></ul>\n          </div>\n          <div class=\"list autocomplete-not-found\">\n            <ul>\n              <li class=\"item-content\"><div class=\"item-inner\"><div class=\"item-title\">" + (ac.params.notFoundText) + "</div></div></li>\n            </ul>\n          </div>\n          <div class=\"list autocomplete-values\">\n            <ul></ul>\n          </div>\n        </div>\n      </div>\n    ").trim();
      return pageHtml;
    };

    Autocomplete.prototype.renderPopup = function renderPopup () {
      var ac = this;
      if (ac.params.renderPopup) { return ac.params.renderPopup.call(ac, ac.items); }
      var popupHtml = ("\n      <div class=\"popup autocomplete-popup\">\n        <div class=\"view\">\n          " + (ac.renderPage()) + ";\n        </div>\n      </div>\n    ").trim();
      return popupHtml;
    };

    Autocomplete.prototype.onOpen = function onOpen (type, el) {
      var ac = this;
      var app = ac.app;
      var $el = $(el);
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
          $searchbarEl = $(app.navbar.getElByPage($el)).find('.searchbar');
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
            },
          },
        });

        // Attach page events
        ac.attachPageEvents();

        // Update Values On Page Init
        ac.updateValues();

        // Source on load
        if (ac.params.requestSourceOnOpen) { ac.source(''); }
      }

      ac.emit('local::open autocompleteOpen', ac);
    };

    Autocomplete.prototype.autoFocus = function autoFocus () {
      var ac = this;
      if (ac.searchbar && ac.searchbar.$inputEl) {
        ac.searchbar.$inputEl.focus();
      }
      return ac;
    };

    Autocomplete.prototype.onOpened = function onOpened () {
      var ac = this;
      if (ac.params.openIn !== 'dropdown' && ac.params.autoFocus) {
        ac.autoFocus();
      }
      ac.emit('local::opened autocompleteOpened', ac);
    };

    Autocomplete.prototype.onClose = function onClose () {
      var ac = this;
      if (ac.destroyed) { return; }

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
    };

    Autocomplete.prototype.onClosed = function onClosed () {
      var ac = this;
      if (ac.destroyed) { return; }
      ac.opened = false;
      ac.$el = null;
      ac.el = null;
      delete ac.$el;
      delete ac.el;

      ac.emit('local::closed autocompleteClosed', ac);
    };

    Autocomplete.prototype.openPage = function openPage () {
      var ac = this;
      if (ac.opened) { return ac; }
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
            },
          },
          options: {
            animate: ac.params.animate,
          },
        },
      });
      return ac;
    };

    Autocomplete.prototype.openPopup = function openPopup () {
      var ac = this;
      if (ac.opened) { return ac; }
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
          },
        },
      };

      if (ac.params.routableModals) {
        ac.view.router.navigate({
          url: ac.url,
          route: {
            path: ac.url,
            popup: popupParams,
          },
        });
      } else {
        ac.modal = ac.app.popup.create(popupParams).open(ac.params.animate);
      }
      return ac;
    };

    Autocomplete.prototype.openDropdown = function openDropdown () {
      var ac = this;

      if (!ac.$dropdownEl) {
        ac.$dropdownEl = $(ac.renderDropdown());
      }
      var $listEl = ac.$inputEl.parents('.list');
      if ($listEl.length && ac.$inputEl.parents('.item-content').length > 0 && ac.params.expandInput) {
        ac.$inputEl.parents('.item-content').addClass('item-content-dropdown-expanded');
      }

      var $pageContentEl = ac.$inputEl.parents('.page-content');
      if (ac.params.dropdownContainerEl) {
        $(ac.params.dropdownContainerEl).append(ac.$dropdownEl);
      } else if ($pageContentEl.length === 0) {
        ac.$dropdownEl.insertAfter(ac.$inputEl);
      } else {
        ac.positionDropdown();
        $pageContentEl.append(ac.$dropdownEl);
      }
      ac.onOpen('dropdown', ac.$dropdownEl);
      ac.onOpened('dropdown', ac.$dropdownEl);
    };

    Autocomplete.prototype.open = function open () {
      var ac = this;
      if (ac.opened) { return ac; }
      var openIn = ac.params.openIn;
      ac[("open" + (openIn.split('').map(function (el, index) {
        if (index === 0) { return el.toUpperCase(); }
        return el;
      }).join('')))]();
      return ac;
    };

    Autocomplete.prototype.close = function close () {
      var ac = this;
      if (!ac.opened) { return ac; }
      if (ac.params.openIn === 'dropdown') {
        ac.onClose();
        ac.onClosed();
      } else if (ac.params.routableModals || ac.openedIn === 'page') {
        ac.view.router.back({ animate: ac.params.animate });
      } else {
        ac.modal.once('modalClosed', function () {
          Utils.nextTick(function () {
            ac.modal.destroy();
            delete ac.modal;
          });
        });
        ac.modal.close();
      }
      return ac;
    };

    Autocomplete.prototype.init = function init () {
      var ac = this;
      ac.attachEvents();
    };

    Autocomplete.prototype.destroy = function destroy () {
      var ac = this;
      ac.emit('local::beforeDestroy autocompleteBeforeDestroy', ac);
      ac.detachEvents();
      if (ac.$inputEl && ac.$inputEl[0]) {
        delete ac.$inputEl[0].f7Autocomplete;
      }
      if (ac.$openerEl && ac.$openerEl[0]) {
        delete ac.$openerEl[0].f7Autocomplete;
      }
      Utils.deleteProps(ac);
      ac.destroyed = true;
    };

    return Autocomplete;
  }(Framework7Class));

  var autocomplete = {
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
        renderNavbar: undefined,

      },
    },
    static: {
      Autocomplete: Autocomplete,
    },
    create: function create() {
      var app = this;
      app.autocomplete = Utils.extend(
        ConstructorMethods({
          defaultSelector: undefined,
          constructor: Autocomplete,
          app: app,
          domProp: 'f7Autocomplete',
        }),
        {
          open: function open(autocompleteEl) {
            var ac = app.autocomplete.get(autocompleteEl);
            if (ac && ac.open) { return ac.open(); }
            return undefined;
          },
          close: function close(autocompleteEl) {
            var ac = app.autocomplete.get(autocompleteEl);
            if (ac && ac.close) { return ac.close(); }
            return undefined;
          },
        }
      );
    },
  };

  return autocomplete;
}
framework7ComponentLoader.componentName = 'autocomplete';

