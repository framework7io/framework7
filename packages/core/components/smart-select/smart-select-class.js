import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

class SmartSelect extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);
    const ss = this;
    ss.app = app;
    const defaults = Utils.extend({
      on: {},
    }, app.params.smartSelect);

    const $el = $(params.el).eq(0);
    if ($el.length === 0) return ss;

    const $selectEl = $el.find('select').eq(0);
    if ($selectEl.length === 0) return ss;

    let $valueEl = $(params.valueEl);
    if ($valueEl.length === 0) {
      $valueEl = $el.find('.item-after');
    }
    if ($valueEl.length === 0) {
      $valueEl = $('<div class="item-after"></div>');
      $valueEl.insertAfter($el.find('.item-title'));
    }

    // Extend defaults with modules params
    ss.useModulesParams(defaults);

    // View
    let view = params.view;
    if (!view) {
      view = $el.parents('.view').length && $el.parents('.view')[0].f7View;
    }
    if (!view && (params.openIn === 'page' || (params.openIn !== 'page' && params.routableModals === true))) {
      throw Error('Smart Select requires initialized View');
    }

    // Url
    let url = params.url;
    if (!url) {
      if ($el.attr('href') && $el.attr('href') !== '#') url = $el.attr('href');
      else url = `${$selectEl.attr('name').toLowerCase()}-select/`;
    }
    if (!url) url = ss.params.url;

    const multiple = $selectEl[0].multiple;
    const inputType = multiple ? 'checkbox' : 'radio';
    const id = Utils.now();
    Utils.extend(ss, {
      params: Utils.extend(defaults, params),
      $el,
      el: $el[0],
      $selectEl,
      selectEl: $selectEl[0],
      $valueEl,
      valueEl: $valueEl[0],
      url,
      multiple,
      inputType,
      id,
      view,
      inputName: `${inputType}-${id}`,
      selectName: $selectEl.attr('name'),
      maxLength: $selectEl.attr('maxlength') || params.maxLength,
    });
    $el[0].f7SmartSelect = ss;

    // Events
    function onClick() {
      ss.open();
    }
    function onChange() {
      const value = ss.$selectEl.val();
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
      let optionEl;
      let text;
      const inputEl = this;
      const value = inputEl.value;
      let optionText = [];
      let displayAs;
      if (inputEl.type === 'checkbox') {
        for (let i = 0; i < ss.selectEl.options.length; i += 1) {
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
        optionEl = ss.$selectEl.find(`option[value="${value}"]`)[0];
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

  checkMaxLength() {
    const ss = this;
    const $containerEl = ss.$containerEl;
    if (ss.selectEl.selectedOptions.length >= ss.maxLength) {
      $containerEl.find('input[type="checkbox"]').each((index, inputEl) => {
        if (!inputEl.checked) {
          $(inputEl).parents('li').addClass('disabled');
        } else {
          $(inputEl).parents('li').removeClass('disabled');
        }
      });
    } else {
      $containerEl.find('.disabled').removeClass('disabled');
    }
  }

  setValue(value) {
    const ss = this;
    let valueArray = [];
    if (typeof value !== 'undefined') {
      if (Array.isArray(value)) {
        valueArray = value;
      } else {
        valueArray = [value];
      }
    } else {
      ss.$selectEl.find('option').each((optionIndex, optionEl) => {
        const $optionEl = $(optionEl);
        if (optionEl.selected) {
          const displayAs = optionEl.dataset ? optionEl.dataset.displayAs : $optionEl.data('display-value-as');
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

  getItemsData() {
    const ss = this;
    const items = [];
    let previousGroupEl;
    ss.$selectEl.find('option').each((index, optionEl) => {
      const $optionEl = $(optionEl);
      const optionData = $optionEl.dataset();
      const optionImage = optionData.optionImage || ss.params.optionImage;
      const optionIcon = optionData.optionIcon || ss.params.optionIcon;
      const optionHasMedia = optionImage || optionIcon;
      // if (material) optionHasMedia = optionImage || optionIcon;
      const optionColor = optionData.optionColor;

      let optionClassName = optionData.optionClass || '';
      if ($optionEl[0].disabled) optionClassName += ' disabled';

      const optionGroupEl = $optionEl.parent('optgroup')[0];
      const optionGroupLabel = optionGroupEl && optionGroupEl.label;
      let optionIsLabel = false;
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
  }

  renderSearchbar() {
    const ss = this;
    if (ss.params.renderSearchbar) return ss.params.renderSearchbar.call(ss);
    const searchbarHTML = `
      <form class="searchbar">
        <div class="searchbar-inner">
          <div class="searchbar-input-wrap">
            <input type="search" placeholder="${ss.params.searchbarPlaceholder}"/>
            <i class="searchbar-icon"></i>
            <span class="input-clear-button"></span>
          </div>
          <span class="searchbar-disable-button">${ss.params.searchbarDisableText}</span>
        </div>
      </form>
    `;
    return searchbarHTML;
  }

  renderItem(item, index) {
    const ss = this;
    if (ss.params.renderItem) return ss.params.renderItem.call(ss, item, index);
    let itemHtml;
    if (item.isLabel) {
      itemHtml = `<li class="item-divider">${item.groupLabel}</li>`;
    } else {
      itemHtml = `
        <li class="${item.className || ''}">
          <label class="item-${item.inputType} item-content">
            <input type="${item.inputType}" name="${item.inputName}" value="${item.value}" ${item.selected ? 'checked' : ''}/>
            <i class="icon icon-${item.inputType}"></i>
            ${item.hasMedia ? `
              <div class="item-media">
                ${item.icon ? `<i class="icon ${item.icon}"></i>` : ''}
                ${item.image ? `<img src="${item.image}">` : ''}
              </div>
            ` : ''}
            <div class="item-inner">
              <div class="item-title${item.color ? ` color-${item.color}` : ''}">${item.text}</div>
            </div>
          </label>
        </li>
      `;
    }
    return itemHtml;
  }

  renderItems() {
    const ss = this;
    if (ss.params.renderItems) return ss.params.renderItems.call(ss, ss.items);
    const itemsHtml = `
      ${ss.items.map((item, index) => `${ss.renderItem(item, index)}`).join('')}
    `;
    return itemsHtml;
  }

  renderPage() {
    const ss = this;
    if (ss.params.renderPage) return ss.params.renderPage.call(ss, ss.items);
    let pageTitle = ss.params.pageTitle;
    if (typeof pageTitle === 'undefined') {
      pageTitle = ss.$el.find('.item-title').text().trim();
    }
    const pageHtml = `
      <div class="page smart-select-page" data-name="smart-select-page" data-select-name="${ss.selectName}">
        <div class="navbar ${ss.params.navbarColorTheme ? `color-theme-${ss.params.navbarColorTheme}` : ''}">
          <div class="navbar-inner sliding ${ss.params.navbarColorTheme ? `color-theme-${ss.params.navbarColorTheme}` : ''}">
            <div class="left">
              <a href="#" class="link back">
                <i class="icon icon-back"></i>
                <span class="ios-only">${ss.params.pageBackLinkText}</span>
              </a>
            </div>
            ${pageTitle ? `<div class="title">${pageTitle}</div>` : ''}
            ${ss.params.searchbar ? `<div class="subnavbar">${ss.renderSearchbar()}</div>` : ''}
          </div>
        </div>
        ${ss.params.searchbar ? '<div class="searchbar-backdrop"></div>' : ''}
        <div class="page-content">
          <div class="list smart-select-list-${ss.id} ${ss.params.virtualList ? ' virtual-list' : ''} ${ss.params.formColorTheme ? `color-theme-${ss.params.formColorTheme}` : ''}">
            <ul>${!ss.params.virtualList && ss.renderItems(ss.items)}</ul>
          </div>
        </div>
      </div>
    `;
    return pageHtml;
  }

  renderPopup() {
    const ss = this;
    if (ss.params.renderPopup) return ss.params.renderPopup.call(ss, ss.items);
    let pageTitle = ss.params.pageTitle;
    if (typeof pageTitle === 'undefined') {
      pageTitle = ss.$el.find('.item-title').text().trim();
    }
    const popupHtml = `
      <div class="popup smart-select-popup" data-select-name="${ss.selectName}">
        <div class="view">
          <div class="page smart-select-page ${ss.params.searchbar ? 'page-with-subnavbar' : ''}" data-name="smart-select-page">
            <div class="navbar${ss.params.navbarColorTheme ? `theme-${ss.params.navbarColorTheme}` : ''}">
              <div class="navbar-inner sliding">
                <div class="left">
                  <a href="#" class="link popup-close">
                    <i class="icon icon-back"></i>
                    <span class="ios-only">${ss.params.popupCloseLinkText}</span>
                  </a>
                </div>
                ${pageTitle ? `<div class="title">${pageTitle}</div>` : ''}
                ${ss.params.searchbar ? `<div class="subnavbar">${ss.renderSearchbar()}</div>` : ''}
              </div>
            </div>
            ${ss.params.searchbar ? '<div class="searchbar-backdrop"></div>' : ''}
            <div class="page-content">
              <div class="list smart-select-list-${ss.id} ${ss.params.virtualList ? ' virtual-list' : ''}${ss.params.formColorTheme ? `theme-${ss.params.formColorTheme}` : ''}">
                <ul>${!ss.params.virtualList && ss.renderItems(ss.items)}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    return popupHtml;
  }

  renderSheet() {
    const ss = this;
    if (ss.params.renderSheet) return ss.params.renderSheet.call(ss, ss.items);
    const sheetHtml = `
      <div class="sheet-modal smart-select-sheet" data-select-name="${ss.selectName}">
        <div class="toolbar ${ss.params.toolbarColorTheme ? `theme-${ss.params.toolbarColorTheme}` : ''}">
          <div class="toolbar-inner">
            <div class="left"></div>
            <div class="right">
              <a class="link sheet-close">${ss.params.sheetCloseLinkText}</a>
            </div>
          </div>
        </div>
        <div class="sheet-modal-inner">
          <div class="page-content">
            <div class="list smart-select-list-${ss.id} ${ss.params.virtualList ? ' virtual-list' : ''}${ss.params.formColorTheme ? `theme-${ss.params.formColorTheme}` : ''}">
              <ul>${!ss.params.virtualList && ss.renderItems(ss.items)}</ul>
            </div>
          </div>
        </div>
      </div>
    `;
    return sheetHtml;
  }

  renderPopover() {
    const ss = this;
    if (ss.params.renderPopover) return ss.params.renderPopover.call(ss, ss.items);
    const popoverHtml = `
      <div class="popover smart-select-popover" data-select-name="${ss.selectName}">
        <div class="popover-inner">
          <div class="list smart-select-list-${ss.id} ${ss.params.virtualList ? ' virtual-list' : ''}${ss.params.formColorTheme ? `theme-${ss.params.formColorTheme}` : ''}">
            <ul>${!ss.params.virtualList && ss.renderItems(ss.items)}</ul>
          </div>
        </div>
      </div>
    `;
    return popoverHtml;
  }

  onOpen(type, containerEl) {
    const ss = this;
    const app = ss.app;
    const $containerEl = $(containerEl);
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
        searchByItem(query, item) {
          if (item.text && item.text.toLowerCase().indexOf(query.trim().toLowerCase()) >= 0) return true;
          return false;
        },
      });
    }

    // Init SB
    if (ss.params.searchbar) {
      let $searchbarEl = $containerEl.find('.searchbar');
      if (type === 'page' && app.theme === 'ios') {
        $searchbarEl = $(app.navbar.getElByPage($containerEl)).find('.searchbar');
      }
      ss.searchbar = app.searchbar.create({
        el: $searchbarEl,
        backdropEl: $containerEl.find('.searchbar-backdrop'),
        searchContainer: `.smart-select-list-${ss.id}`,
        searchIn: '.item-title',
      });
    }

    // Check for max length
    if (ss.maxLength) {
      ss.checkMaxLength();
    }

    // Close on select
    if (ss.params.closeOnSelect) {
      ss.$containerEl.find(`input[type="radio"][name="${ss.inputName}"]:checked`).parents('label').once('click', () => {
        ss.close();
      });
    }

    // Attach input events
    ss.attachInputsEvents();

    ss.$el.trigger('smartselect:open', ss);
    ss.emit('local::open smartSelectOpen', ss);
  }

  onOpened() {
    const ss = this;

    ss.$el.trigger('smartselect:opened', ss);
    ss.emit('local::opened smartSelectOpened', ss);
  }

  onClose() {
    const ss = this;
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

  onClosed() {
    const ss = this;
    if (ss.destroyed) return;
    ss.opened = false;
    ss.$containerEl = null;
    delete ss.$containerEl;

    ss.$el.trigger('smartselect:closed', ss);
    ss.emit('local::closed smartSelectClosed', ss);
  }

  openPage() {
    const ss = this;
    if (ss.opened) return ss;
    ss.getItemsData();
    const pageHtml = ss.renderPage(ss.items);

    ss.view.router.navigate({
      url: ss.url,
      route: {
        content: pageHtml,
        path: ss.url,
        on: {
          pageBeforeIn(e, page) {
            ss.onOpen('page', page.el);
          },
          pageAfterIn(e, page) {
            ss.onOpened('page', page.el);
          },
          pageBeforeOut(e, page) {
            ss.onClose('page', page.el);
          },
          pageAfterOut(e, page) {
            ss.onClosed('page', page.el);
          },
        },
      },
    });
    return ss;
  }

  openPopup() {
    const ss = this;
    if (ss.opened) return ss;
    ss.getItemsData();
    const popupHtml = ss.renderPopup(ss.items);

    const popupParams = {
      content: popupHtml,
      on: {
        popupOpen(popup) {
          ss.onOpen('popup', popup.el);
        },
        popupOpened(popup) {
          ss.onOpened('popup', popup.el);
        },
        popupClose(popup) {
          ss.onClose('popup', popup.el);
        },
        popupClosed(popup) {
          ss.onClosed('popup', popup.el);
        },
      },
    };

    if (ss.params.routableModals) {
      ss.view.router.navigate({
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
  }

  openSheet() {
    const ss = this;
    if (ss.opened) return ss;
    ss.getItemsData();
    const sheetHtml = ss.renderSheet(ss.items);

    const sheetParams = {
      content: sheetHtml,
      backdrop: false,
      scrollToEl: ss.$el,
      closeByOutsideClick: true,
      on: {
        sheetOpen(sheet) {
          ss.onOpen('sheet', sheet.el);
        },
        sheetOpened(sheet) {
          ss.onOpened('sheet', sheet.el);
        },
        sheetClose(sheet) {
          ss.onClose('sheet', sheet.el);
        },
        sheetClosed(sheet) {
          ss.onClosed('sheet', sheet.el);
        },
      },
    };

    if (ss.params.routableModals) {
      ss.view.router.navigate({
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
  }

  openPopover() {
    const ss = this;
    if (ss.opened) return ss;
    ss.getItemsData();
    const popoverHtml = ss.renderPopover(ss.items);
    const popoverParams = {
      content: popoverHtml,
      targetEl: ss.$el,
      on: {
        popoverOpen(popover) {
          ss.onOpen('popover', popover.el);
        },
        popoverOpened(popover) {
          ss.onOpened('popover', popover.el);
        },
        popoverClose(popover) {
          ss.onClose('popover', popover.el);
        },
        popoverClosed(popover) {
          ss.onClosed('popover', popover.el);
        },
      },
    };
    if (ss.params.routableModals) {
      ss.view.router.navigate({
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
  }

  open(type) {
    const ss = this;
    if (ss.opened) return ss;
    const openIn = type || ss.params.openIn;
    ss[`open${openIn.split('').map((el, index) => {
      if (index === 0) return el.toUpperCase();
      return el;
    }).join('')}`]();
    return ss;
  }

  close() {
    const ss = this;
    if (!ss.opened) return ss;
    if (ss.params.routableModals || ss.openedIn === 'page') {
      ss.view.router.back();
    } else {
      ss.modal.once('modalClosed', () => {
        Utils.nextTick(() => {
          ss.modal.destroy();
          delete ss.modal;
        });
      });
      ss.modal.close();
    }
    return ss;
  }

  init() {
    const ss = this;
    ss.attachEvents();
    ss.setValue();
  }

  destroy() {
    const ss = this;
    ss.emit('local::beforeDestroy smartSelectBeforeDestroy', ss);
    ss.$el.trigger('smartselect:beforedestroy', ss);
    ss.detachEvents();
    delete ss.$el[0].f7SmartSelect;
    Utils.deleteProps(ss);
    ss.destroyed = true;
  }
}

export default SmartSelect;
