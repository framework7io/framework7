/* eslint "no-useless-escape": "off" */
import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

class Autocomplete extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);

    const ac = this;
    ac.app = app;

    const defaults = Utils.extend({
      on: {},
    }, app.params.autocomplete);


    // Extend defaults with modules params
    ac.useModulesParams(defaults);

    ac.params = Utils.extend(defaults, params);

    let $openerEl;
    if (ac.params.openerEl) {
      $openerEl = $(ac.params.openerEl);
      if ($openerEl.length) $openerEl[0].f7Autocomplete = ac;
    }

    let $inputEl;
    if (ac.params.inputEl) {
      $inputEl = $(ac.params.inputEl);
      if ($inputEl.length) $inputEl[0].f7Autocomplete = ac;
    }

    let view;
    if (ac.params.view) {
      view = ac.params.view;
    } else if ($openerEl || $inputEl) {
      view = app.views.get($openerEl || $inputEl);
    }
    if (!view) view = app.views.main;

    const id = Utils.id();

    let url = params.url;
    if (!url && $openerEl && $openerEl.length) {
      if ($openerEl.attr('href')) url = $openerEl.attr('href');
      else if ($openerEl.find('a').length > 0) {
        url = $openerEl.find('a').attr('href');
      }
    }
    if (!url || url === '#' || url === '') url = ac.params.url;

    const inputType = ac.params.multiple ? 'checkbox' : 'radio';

    Utils.extend(ac, {
      $openerEl,
      openerEl: $openerEl && $openerEl[0],
      $inputEl,
      inputEl: $inputEl && $inputEl[0],
      id,
      view,
      url,
      value: ac.params.value || [],
      inputType,
      inputName: `${inputType}-${id}`,
      $modalEl: undefined,
      $dropdownEl: undefined,
    });

    let previousQuery = '';
    function onInputChange() {
      let query = ac.$inputEl.val().trim();

      if (!ac.params.source) return;
      ac.params.source.call(ac, query, (items) => {
        let itemsHTML = '';
        const limit = ac.params.limit ? Math.min(ac.params.limit, items.length) : items.length;
        ac.items = items;
        let regExp;
        if (ac.params.highlightMatches) {
          query = query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
          regExp = new RegExp(`(${query})`, 'i');
        }

        let firstValue;
        let firstItem;
        for (let i = 0; i < limit; i += 1) {
          const itemValue = typeof items[i] === 'object' ? items[i][ac.params.valueProperty] : items[i];
          const itemText = typeof items[i] === 'object' ? items[i][ac.params.textProperty] : items[i];
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

          const previousValue = typeof ac.value[0] === 'object' ? ac.value[0][ac.params.valueProperty] : ac.value[0];
          if (!previousValue || firstValue.toLowerCase() !== previousValue.toLowerCase()) {
            ac.value = [firstItem];
            ac.emit('local::change autocompleteChange', [firstItem]);
          }
        }

        previousQuery = query;
      });
    }
    function onPageInputChange() {
      const input = this;
      const value = input.value;
      const isValues = $(input).parents('.autocomplete-values').length > 0;
      let item;
      let itemValue;
      let aValue;
      if (isValues) {
        if (ac.inputType === 'checkbox' && !input.checked) {
          for (let i = 0; i < ac.value.length; i += 1) {
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
      for (let i = 0; i < ac.items.length; i += 1) {
        itemValue = typeof ac.items[i] === 'object' ? ac.items[i][ac.params.valueProperty] : ac.items[i];
        if (itemValue === value || itemValue * 1 === value * 1) item = ac.items[i];
      }
      if (ac.inputType === 'radio') {
        ac.value = [item];
      } else if (input.checked) {
        ac.value.push(item);
      } else {
        for (let i = 0; i < ac.value.length; i += 1) {
          aValue = typeof ac.value[i] === 'object' ? ac.value[i][ac.params.valueProperty] : ac.value[i];
          if (aValue === value || aValue * 1 === value * 1) {
            ac.value.splice(i, 1);
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
      const $targetEl = $(e.target);
      if ($targetEl.is(ac.$inputEl[0]) || (ac.$dropdownEl && $targetEl.closest(ac.$dropdownEl[0]).length)) return;
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
      const $clickedEl = $(this);
      let clickedItem;
      for (let i = 0; i < ac.items.length; i += 1) {
        const itemValue = typeof ac.items[i] === 'object' ? ac.items[i][ac.params.valueProperty] : ac.items[i];
        const value = $clickedEl.attr('data-value');
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
        ac.$el.once('click', '.list label', () => {
          Utils.nextTick(() => {
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

  positionDropdown() {
    const ac = this;
    const { $inputEl, app, $dropdownEl } = ac;

    const $pageContentEl = $inputEl.parents('.page-content');
    if ($pageContentEl.length === 0) return;
    const inputOffset = $inputEl.offset();
    const inputOffsetWidth = $inputEl[0].offsetWidth;
    const inputOffsetHeight = $inputEl[0].offsetHeight;
    const $listEl = $inputEl.parents('.list');

    let $listParent;
    $listEl.parents().each((index, parentEl) => {
      if ($listParent) return;
      const $parentEl = $(parentEl);
      if ($parentEl.parent($pageContentEl).length) $listParent = $parentEl;
    });

    const listOffset = $listEl.offset();
    const paddingBottom = parseInt($pageContentEl.css('padding-bottom'), 10);
    const listOffsetLeft = $listEl.length > 0 ? listOffset.left - $pageContentEl.offset().left : 0;
    const inputOffsetLeft = inputOffset.left - ($listEl.length > 0 ? listOffset.left : 0) - (app.rtl ? 0 : 0);
    const inputOffsetTop = inputOffset.top - ($pageContentEl.offset().top - $pageContentEl[0].scrollTop);

    const maxHeight = $pageContentEl[0].scrollHeight - paddingBottom - (inputOffsetTop + $pageContentEl[0].scrollTop) - $inputEl[0].offsetHeight;

    const paddingProp = app.rtl ? 'padding-right' : 'padding-left';
    let paddingValue;
    if ($listEl.length && !ac.params.expandInput) {
      paddingValue = (app.rtl ? $listEl[0].offsetWidth - inputOffsetLeft - inputOffsetWidth : inputOffsetLeft) - (app.theme === 'md' ? 16 : 15);
    }

    $dropdownEl.css({
      left: `${$listEl.length > 0 ? listOffsetLeft : inputOffsetLeft}px`,
      top: `${inputOffsetTop + $pageContentEl[0].scrollTop + inputOffsetHeight}px`,
      width: `${$listEl.length > 0 ? $listEl[0].offsetWidth : inputOffsetWidth}px`,
    });
    $dropdownEl.children('.autocomplete-dropdown-inner').css({
      maxHeight: `${maxHeight}px`,
      [paddingProp]: $listEl.length > 0 && !ac.params.expandInput ? `${paddingValue}px` : '',
    });
  }

  focus() {
    const ac = this;
    ac.$el.find('input[type=search]').focus();
  }

  source(query) {
    const ac = this;
    if (!ac.params.source) return;

    const { $el } = ac;

    ac.params.source.call(ac, query, (items) => {
      let itemsHTML = '';
      const limit = ac.params.limit ? Math.min(ac.params.limit, items.length) : items.length;
      ac.items = items;
      for (let i = 0; i < limit; i += 1) {
        let selected = false;
        const itemValue = typeof items[i] === 'object' ? items[i][ac.params.valueProperty] : items[i];
        for (let j = 0; j < ac.value.length; j += 1) {
          const aValue = typeof ac.value[j] === 'object' ? ac.value[j][ac.params.valueProperty] : ac.value[j];
          if (aValue === itemValue || aValue * 1 === itemValue * 1) selected = true;
        }
        itemsHTML += ac.renderItem({
          value: itemValue,
          text: typeof items[i] === 'object' ? items[i][ac.params.textProperty] : items[i],
          inputType: ac.inputType,
          id: ac.id,
          inputName: ac.inputName,
          selected,
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

  updateValues() {
    const ac = this;
    let valuesHTML = '';
    for (let i = 0; i < ac.value.length; i += 1) {
      valuesHTML += ac.renderItem({
        value: typeof ac.value[i] === 'object' ? ac.value[i][ac.params.valueProperty] : ac.value[i],
        text: typeof ac.value[i] === 'object' ? ac.value[i][ac.params.textProperty] : ac.value[i],
        inputType: ac.inputType,
        id: ac.id,
        inputName: `${ac.inputName}-checked}`,
        selected: true,
      }, i);
    }
    ac.$el.find('.autocomplete-values ul').html(valuesHTML);
  }

  preloaderHide() {
    const ac = this;
    if (ac.params.openIn === 'dropdown' && ac.$dropdownEl) {
      ac.$dropdownEl.find('.autocomplete-preloader').removeClass('autocomplete-preloader-visible');
    } else {
      $('.autocomplete-preloader').removeClass('autocomplete-preloader-visible');
    }
  }

  preloaderShow() {
    const ac = this;
    if (ac.params.openIn === 'dropdown' && ac.$dropdownEl) {
      ac.$dropdownEl.find('.autocomplete-preloader').addClass('autocomplete-preloader-visible');
    } else {
      $('.autocomplete-preloader').addClass('autocomplete-preloader-visible');
    }
  }

  renderPreloader() {
    const ac = this;
    return `
      <div class="autocomplete-preloader preloader ${ac.params.preloaderColor ? `color-${ac.params.preloaderColor}` : ''}">${ac.app.theme === 'md' ? Utils.mdPreloaderContent : ''}</div>
    `.trim();
  }

  renderSearchbar() {
    const ac = this;
    if (ac.params.renderSearchbar) return ac.params.renderSearchbar.call(ac);
    const searchbarHTML = `
      <form class="searchbar">
        <div class="searchbar-inner">
          <div class="searchbar-input-wrap">
            <input type="search" placeholder="${ac.params.searchbarPlaceholder}"/>
            <i class="searchbar-icon"></i>
            <span class="input-clear-button"></span>
          </div>
          <span class="searchbar-disable-button">${ac.params.searchbarDisableText}</span>
        </div>
      </form>
    `.trim();
    return searchbarHTML;
  }

  renderItem(item, index) {
    const ac = this;
    if (ac.params.renderItem) return ac.params.renderItem.call(ac, item, index);
    let itemHtml;
    const itemValue = item.value && typeof item.value === 'string' ? item.value.replace(/"/g, '&quot;') : item.value;
    if (ac.params.openIn !== 'dropdown') {
      itemHtml = `
        <li>
          <label class="item-${item.inputType} item-content">
            <input type="${item.inputType}" name="${item.inputName}" value="${itemValue}" ${item.selected ? 'checked' : ''}>
            <i class="icon icon-${item.inputType}"></i>
            <div class="item-inner">
              <div class="item-title">${item.text}</div>
            </div>
          </label>
        </li>
      `;
    } else if (!item.placeholder) {
      // Dropdown
      itemHtml = `
        <li>
          <label class="item-radio item-content" data-value="${itemValue}">
            <div class="item-inner">
              <div class="item-title">${item.text}</div>
            </div>
          </label>
        </li>
      `;
    } else {
      // Dropwdown placeholder
      itemHtml = `
        <li class="autocomplete-dropdown-placeholder">
          <label class="item-content">
            <div class="item-inner">
              <div class="item-title">${item.text}</div>
            </div>
          </label>
        </li>
      `;
    }
    return itemHtml.trim();
  }

  renderNavbar() {
    const ac = this;
    if (ac.params.renderNavbar) return ac.params.renderNavbar.call(ac);
    let pageTitle = ac.params.pageTitle;
    if (typeof pageTitle === 'undefined' && ac.$openerEl && ac.$openerEl.length) {
      pageTitle = ac.$openerEl.find('.item-title').text().trim();
    }
    const navbarHtml = `
      <div class="navbar ${ac.params.navbarColorTheme ? `color-theme-${ac.params.navbarColorTheme}` : ''}">
        <div class="navbar-inner ${ac.params.navbarColorTheme ? `color-theme-${ac.params.navbarColorTheme}` : ''}">
          <div class="left sliding">
            <a href="#" class="link ${ac.params.openIn === 'page' ? 'back' : 'popup-close'}" ${ac.params.openIn === 'popup' ? 'data-popup=".autocomplete-popup"' : ''}>
              <i class="icon icon-back"></i>
              <span class="ios-only">${ac.params.openIn === 'page' ? ac.params.pageBackLinkText : ac.params.popupCloseLinkText}</span>
            </a>
          </div>
          ${pageTitle ? `<div class="title sliding">${pageTitle}</div>` : ''}
          ${ac.params.preloader ? `
          <div class="right">
            ${ac.renderPreloader()}
          </div>
          ` : ''}
          <div class="subnavbar sliding">${ac.renderSearchbar()}</div>
        </div>
      </div>
    `.trim();
    return navbarHtml;
  }

  renderDropdown() {
    const ac = this;
    if (ac.params.renderDropdown) return ac.params.renderDropdown.call(ac, ac.items);
    const dropdownHtml = `
      <div class="autocomplete-dropdown">
        <div class="autocomplete-dropdown-inner">
          <div class="list ${!ac.params.expandInput ? 'no-ios-edge' : ''}">
            <ul></ul>
          </div>
        </div>
        ${ac.params.preloader ? ac.renderPreloader() : ''}
      </div>
    `.trim();
    return dropdownHtml;
  }

  renderPage() {
    const ac = this;
    if (ac.params.renderPage) return ac.params.renderPage.call(ac, ac.items);

    const pageHtml = `
      <div class="page page-with-subnavbar autocomplete-page" data-name="autocomplete-page">
        ${ac.renderNavbar()}
        <div class="searchbar-backdrop"></div>
        <div class="page-content">
          <div class="list autocomplete-list autocomplete-found autocomplete-list-${ac.id} ${ac.params.formColorTheme ? `color-theme-${ac.params.formColorTheme}` : ''}">
            <ul></ul>
          </div>
          <div class="list autocomplete-not-found">
            <ul>
              <li class="item-content"><div class="item-inner"><div class="item-title">${ac.params.notFoundText}</div></div></li>
            </ul>
          </div>
          <div class="list autocomplete-values">
            <ul></ul>
          </div>
        </div>
      </div>
    `.trim();
    return pageHtml;
  }

  renderPopup() {
    const ac = this;
    if (ac.params.renderPopup) return ac.params.renderPopup.call(ac, ac.items);
    const popupHtml = `
      <div class="popup autocomplete-popup">
        <div class="view">
          ${ac.renderPage()};
        </div>
      </div>
    `.trim();
    return popupHtml;
  }

  onOpen(type, el) {
    const ac = this;
    const app = ac.app;
    const $el = $(el);
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
      let $searchbarEl = $el.find('.searchbar');
      if (ac.params.openIn === 'page' && app.theme === 'ios' && $searchbarEl.length === 0) {
        $searchbarEl = $(app.navbar.getElByPage($el)).find('.searchbar');
      }
      ac.searchbar = app.searchbar.create({
        el: $searchbarEl,
        backdropEl: $el.find('.searchbar-backdrop'),
        customSearch: true,
        on: {
          search(sb, query) {
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
      if (ac.params.requestSourceOnOpen) ac.source('');
    }

    ac.emit('local::open autocompleteOpen', ac);
  }

  autoFocus() {
    const ac = this;
    if (ac.searchbar && ac.searchbar.$inputEl) {
      ac.searchbar.$inputEl.focus();
    }
    return ac;
  }

  onOpened() {
    const ac = this;
    if (ac.params.openIn !== 'dropdown' && ac.params.autoFocus) {
      ac.autoFocus();
    }
    ac.emit('local::opened autocompleteOpened', ac);
  }

  onClose() {
    const ac = this;
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

  onClosed() {
    const ac = this;
    if (ac.destroyed) return;
    ac.opened = false;
    ac.$el = null;
    ac.el = null;
    delete ac.$el;
    delete ac.el;

    ac.emit('local::closed autocompleteClosed', ac);
  }

  openPage() {
    const ac = this;
    if (ac.opened) return ac;
    const pageHtml = ac.renderPage();
    ac.view.router.navigate({
      url: ac.url,
      route: {
        content: pageHtml,
        path: ac.url,
        on: {
          pageBeforeIn(e, page) {
            ac.onOpen('page', page.el);
          },
          pageAfterIn(e, page) {
            ac.onOpened('page', page.el);
          },
          pageBeforeOut(e, page) {
            ac.onClose('page', page.el);
          },
          pageAfterOut(e, page) {
            ac.onClosed('page', page.el);
          },
        },
        options: {
          animate: ac.params.animate,
        },
      },
    });
    return ac;
  }

  openPopup() {
    const ac = this;
    if (ac.opened) return ac;
    const popupHtml = ac.renderPopup();

    const popupParams = {
      content: popupHtml,
      animate: ac.params.animate,
      on: {
        popupOpen(popup) {
          ac.onOpen('popup', popup.el);
        },
        popupOpened(popup) {
          ac.onOpened('popup', popup.el);
        },
        popupClose(popup) {
          ac.onClose('popup', popup.el);
        },
        popupClosed(popup) {
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
  }

  openDropdown() {
    const ac = this;

    if (!ac.$dropdownEl) {
      ac.$dropdownEl = $(ac.renderDropdown());
    }
    const $listEl = ac.$inputEl.parents('.list');
    if ($listEl.length && ac.$inputEl.parents('.item-content').length > 0 && ac.params.expandInput) {
      ac.$inputEl.parents('.item-content').addClass('item-content-dropdown-expanded');
    }

    const $pageContentEl = ac.$inputEl.parents('.page-content');
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
  }

  open() {
    const ac = this;
    if (ac.opened) return ac;
    const openIn = ac.params.openIn;
    ac[`open${openIn.split('').map((el, index) => {
      if (index === 0) return el.toUpperCase();
      return el;
    }).join('')}`]();
    return ac;
  }

  close() {
    const ac = this;
    if (!ac.opened) return ac;
    if (ac.params.openIn === 'dropdown') {
      ac.onClose();
      ac.onClosed();
    } else if (ac.params.routableModals || ac.openedIn === 'page') {
      ac.view.router.back({ animate: ac.params.animate });
    } else {
      ac.modal.once('modalClosed', () => {
        Utils.nextTick(() => {
          ac.modal.destroy();
          delete ac.modal;
        });
      });
      ac.modal.close();
    }
    return ac;
  }

  init() {
    const ac = this;
    ac.attachEvents();
  }

  destroy() {
    const ac = this;
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
  }
}

export default Autocomplete;
