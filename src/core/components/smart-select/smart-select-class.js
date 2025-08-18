import $ from '../../shared/dom7.js';
import { extend, deleteProps, id, nextTick } from '../../shared/utils.js';
import Framework7Class from '../../shared/class.js';
import removeDiacritics from '../searchbar/remove-diacritics.js';

/** @jsx $jsx */
import $jsx from '../../shared/$jsx.js';

class SmartSelect extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);
    const ss = this;

    const defaults = extend(
      {
        on: {},
      },
      app.params.smartSelect,
    );

    // Extend defaults with modules params
    ss.useModulesParams(defaults);

    ss.params = extend({}, defaults, params);

    ss.app = app;

    const $el = $(ss.params.el).eq(0);
    if ($el.length === 0) return ss;

    if ($el[0].f7SmartSelect) return $el[0].f7SmartSelect;

    const $selectEl = $el.find('select').eq(0);
    if ($selectEl.length === 0) return ss;

    let $valueEl;
    if (ss.params.setValueText) {
      $valueEl = $(ss.params.valueEl);
      if ($valueEl.length === 0) {
        $valueEl = $el.find('.item-after');
      }
      if ($valueEl.length === 0) {
        $valueEl = $('<div class="item-after"></div>');
        $valueEl.insertAfter($el.find('.item-title'));
      }
    }

    // Url
    let url = params.url;
    if (!url) {
      if ($el.attr('href') && $el.attr('href') !== '#') url = $el.attr('href');
      else if ($selectEl.attr('name')) url = `${$selectEl.attr('name').toLowerCase()}-select/`;
    }
    if (!url) url = ss.params.url;

    const multiple = $selectEl[0].multiple;
    const inputType = multiple ? 'checkbox' : 'radio';
    const selectId = id();

    extend(ss, {
      $el,
      el: $el[0],
      $selectEl,
      selectEl: $selectEl[0],
      $valueEl,
      valueEl: $valueEl && $valueEl[0],
      url,
      multiple,
      inputType,
      id: selectId,
      inputName: `${inputType}-${selectId}`,
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
      ss.$el.trigger('smartselect:change', value);
      ss.emit('local::change smartSelectChange', ss, value);
      if (ss.vl) {
        ss.vl.clearCache();
      }
      ss.setValueText();
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
            displayAs = optionEl.dataset
              ? optionEl.dataset.displayAs
              : $(optionEl).data('display-value-as');
            text = displayAs && typeof displayAs !== 'undefined' ? displayAs : optionEl.textContent;
            optionText.push(text.trim());
          }
        }
        if (ss.maxLength) {
          ss.checkMaxLength();
        }
      } else {
        optionEl = ss.$selectEl.find(`option[value="${value}"]`)[0];
        if (!optionEl) {
          optionEl = ss.$selectEl.find('option').filter((optEl) => optEl.value === value)[0];
        }
        displayAs = optionEl.dataset ? optionEl.dataset.displayAs : $(optionEl).data('display-as');
        text = displayAs && typeof displayAs !== 'undefined' ? displayAs : optionEl.textContent;
        optionText = [text];
        ss.selectEl.value = value;
      }

      ss.$selectEl.trigger('change');
      if (ss.params.setValueText) {
        ss.formatValueTextContent(optionText);
      }
      if (ss.params.closeOnSelect && ss.inputType === 'radio') {
        ss.close();
      }
    }

    ss.attachInputsEvents = function attachInputsEvents() {
      ss.$containerEl.on(
        'change',
        'input[type="checkbox"], input[type="radio"]',
        handleInputChange,
      );
    };
    ss.detachInputsEvents = function detachInputsEvents() {
      ss.$containerEl.off(
        'change',
        'input[type="checkbox"], input[type="radio"]',
        handleInputChange,
      );
    };

    // Install Modules
    ss.useModules();

    // Init
    ss.init();

    return ss;
  }

  setValue(value) {
    const ss = this;
    let newValue = value;
    let optionText = [];
    let optionEl;
    let displayAs;
    let text;
    if (ss.multiple) {
      if (!Array.isArray(newValue)) newValue = [newValue];
      for (let i = 0; i < ss.selectEl.options.length; i += 1) {
        optionEl = ss.selectEl.options[i];
        if (newValue.indexOf(optionEl.value) >= 0) {
          optionEl.selected = true;
        } else {
          optionEl.selected = false;
        }
        if (optionEl.selected) {
          displayAs = optionEl.dataset
            ? optionEl.dataset.displayAs
            : $(optionEl).data('display-value-as');
          text = displayAs && typeof displayAs !== 'undefined' ? displayAs : optionEl.textContent;
          optionText.push(text.trim());
        }
      }
    } else {
      optionEl = ss.$selectEl.find(`option[value="${newValue}"]`)[0];
      if (optionEl) {
        displayAs = optionEl.dataset ? optionEl.dataset.displayAs : $(optionEl).data('display-as');
        text = displayAs && typeof displayAs !== 'undefined' ? displayAs : optionEl.textContent;
        optionText = [text];
      }
      ss.selectEl.value = newValue;
    }
    if (ss.params.setValueText) {
      ss.formatValueTextContent(optionText);
    }
    ss.$selectEl.trigger('change');
    return ss;
  }

  unsetValue() {
    const ss = this;
    if (ss.params.setValueText) {
      ss.formatValueTextContent([]);
    }
    ss.$selectEl.find('option').each((optionEl) => {
      optionEl.selected = false;
      optionEl.checked = false;
    });
    ss.$selectEl[0].value = null;

    if (ss.$containerEl) {
      ss.$containerEl
        .find(
          `input[name="${ss.inputName}"][type="checkbox"], input[name="${ss.inputName}"][type="radio"]`,
        )
        .prop('checked', false);
    }
    ss.$selectEl.trigger('change');
  }

  getValue() {
    const ss = this;
    return ss.$selectEl.val();
  }

  get view() {
    const { params, $el } = this;
    let view;
    if (params.view) {
      view = params.view;
    }
    if (!view) {
      view = $el.parents('.view').length && $el.parents('.view')[0].f7View;
    }
    if (!view && params.openIn === 'page') {
      throw Error('Smart Select requires initialized View');
    }
    return view;
  }

  checkMaxLength() {
    const ss = this;
    const $containerEl = ss.$containerEl;
    if (ss.selectEl.selectedOptions.length >= ss.maxLength) {
      $containerEl.find('input[type="checkbox"]').each((inputEl) => {
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

  formatValueTextContent(values) {
    const ss = this;
    const valueFormatted = ss.formatValueText(values);
    if (valueFormatted.includes('<') && valueFormatted.includes('>')) {
      ss.$valueEl.html(valueFormatted);
    } else {
      ss.$valueEl.text(valueFormatted);
    }
  }

  formatValueText(values) {
    const ss = this;
    let textValue;
    if (ss.params.formatValueText) {
      textValue = ss.params.formatValueText.call(ss, values, ss);
    } else {
      textValue = values.join(', ');
    }
    return textValue;
  }

  setValueText(value) {
    const ss = this;
    let valueArray = [];
    if (typeof value !== 'undefined') {
      if (Array.isArray(value)) {
        valueArray = value;
      } else {
        valueArray = [value];
      }
    } else {
      ss.$selectEl.find('option').each((optionEl) => {
        const $optionEl = $(optionEl);
        if (optionEl.selected) {
          const displayAs = optionEl.dataset
            ? optionEl.dataset.displayAs
            : $optionEl.data('display-value-as');
          if (displayAs && typeof displayAs !== 'undefined') {
            valueArray.push(displayAs);
          } else {
            valueArray.push(optionEl.textContent.trim());
          }
        }
      });
    }
    if (ss.params.setValueText) {
      ss.formatValueTextContent(valueArray);
    }
  }

  getItemsData() {
    const ss = this;
    const theme = ss.app.theme;
    const items = [];
    let previousGroupEl;
    ss.$selectEl.find('option').each((optionEl) => {
      const $optionEl = $(optionEl);
      const optionData = $optionEl.dataset();
      const optionImage = optionData.optionImage || ss.params.optionImage;
      const optionIcon = optionData.optionIcon || ss.params.optionIcon;
      const optionIconIos =
        theme === 'ios' && (optionData.optionIconIos || ss.params.optionIconIos);
      const optionIconMd = theme === 'md' && (optionData.optionIconMd || ss.params.optionIconMd);
      const optionInputIconPosition =
        optionData.inputIconPosition || ss.params.inputIconPosition || '';

      const optionHasMedia = optionImage || optionIcon || optionIconIos || optionIconMd;
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
        iconIos: optionIconIos,
        iconMd: optionIconMd,
        inputIconPosition: optionInputIconPosition,
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
    return (
      <form class="searchbar">
        <div class="searchbar-inner">
          <div class="searchbar-input-wrap">
            <input
              type="search"
              spellcheck={ss.params.searchbarSpellcheck || 'false'}
              placeholder={ss.params.searchbarPlaceholder}
            />
            <i class="searchbar-icon"></i>
            <span class="input-clear-button"></span>
          </div>
          {ss.params.searchbarDisableButton && (
            <span class="searchbar-disable-button">{ss.params.searchbarDisableText}</span>
          )}
        </div>
      </form>
    );
  }

  renderItem(item, index) {
    const ss = this;
    if (ss.params.renderItem) return ss.params.renderItem.call(ss, item, index);

    function getIconContent(iconValue = '') {
      if (iconValue.indexOf(':') >= 0) {
        return iconValue.split(':')[1];
      }
      return '';
    }
    function getIconClass(iconValue = '') {
      if (iconValue.indexOf(':') >= 0) {
        let className = iconValue.split(':')[0];
        if (className === 'f7') className = 'f7-icons';
        if (className === 'material') className = 'material-icons';
        return className;
      }
      return iconValue;
    }

    let itemHtml;
    if (item.isLabel) {
      itemHtml = `<li class="list-group-title">${item.groupLabel}</li>`;
    } else {
      let selected = item.selected;
      let disabled;
      if (ss.params.virtualList) {
        const ssValue = ss.getValue();
        selected = ss.multiple ? ssValue.indexOf(item.value) >= 0 : ssValue === item.value;
        if (ss.multiple) {
          disabled = ss.multiple && !selected && ssValue.length === parseInt(ss.maxLength, 10);
        }
      }

      const { icon, iconIos, iconMd } = item;
      const hasIcon = icon || iconIos || iconMd;
      const iconContent = getIconContent(icon || iconIos || iconMd || '');
      const iconClass = getIconClass(icon || iconIos || iconMd || '');

      itemHtml = (
        <li class={`${item.className || ''}${disabled ? ' disabled' : ''}`}>
          <label
            class={`item-${item.inputType} ${
              item.inputIconPosition ? `item-${item.inputType}-icon-${item.inputIconPosition}` : ''
            } item-content`}
          >
            <input
              type={item.inputType}
              name={item.inputName}
              value={item.value}
              _checked={selected}
            />
            <i class={`icon icon-${item.inputType}`}></i>
            {item.hasMedia && (
              <div class="item-media">
                {hasIcon && <i class={`icon ${iconClass}`}>{iconContent}</i>}
                {item.image && <img src={item.image} />}
              </div>
            )}
            <div class="item-inner">
              <div class={`item-title${item.color ? ` text-color-${item.color}` : ''}`}>
                {item.text}
              </div>
            </div>
          </label>
        </li>
      );
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
      const $itemTitleEl = ss.$el.find('.item-title');
      pageTitle = $itemTitleEl.length ? $itemTitleEl.text().trim() : '';
    }
    const cssClass = ss.params.cssClass;
    return (
      <div
        class={`page smart-select-page ${cssClass}`}
        data-name="smart-select-page"
        data-select-name={ss.selectName}
      >
        <div
          class={`navbar ${
            ss.params.navbarColorTheme ? `color-${ss.params.navbarColorTheme}` : ''
          }`}
        >
          <div class="navbar-bg"></div>
          <div
            class={`navbar-inner sliding ${
              ss.params.navbarColorTheme ? `color-${ss.params.navbarColorTheme}` : ''
            }`}
          >
            <div class="left">
              <a class="link back">
                <i class="icon icon-back"></i>
                <span class="if-not-md">{ss.params.pageBackLinkText}</span>
              </a>
            </div>
            {pageTitle && <div class="title">{pageTitle}</div>}
            {ss.params.searchbar && <div class="subnavbar">{ss.renderSearchbar()}</div>}
          </div>
        </div>
        {ss.params.searchbar && <div class="searchbar-backdrop"></div>}
        <div class="page-content">
          <div
            class={`list list-outline-ios list-strong-ios list-dividers-ios smart-select-list smart-select-list-${
              ss.id
            } ${ss.params.virtualList ? ' virtual-list' : ''} ${
              ss.params.formColorTheme ? `color-${ss.params.formColorTheme}` : ''
            }`}
          >
            <ul>{!ss.params.virtualList && ss.renderItems(ss.items)}</ul>
          </div>
        </div>
      </div>
    );
  }

  renderPopup() {
    const ss = this;
    if (ss.params.renderPopup) return ss.params.renderPopup.call(ss, ss.items);
    let pageTitle = ss.params.pageTitle;
    if (typeof pageTitle === 'undefined') {
      const $itemTitleEl = ss.$el.find('.item-title');
      pageTitle = $itemTitleEl.length ? $itemTitleEl.text().trim() : '';
    }
    const cssClass = ss.params.cssClass || '';
    return (
      <div
        class={`popup smart-select-popup ${cssClass} ${
          ss.params.popupTabletFullscreen ? 'popup-tablet-fullscreen' : ''
        }`}
        data-select-name={ss.selectName}
      >
        <div class="view">
          <div
            class={`page smart-select-page ${ss.params.searchbar ? 'page-with-subnavbar' : ''}`}
            data-name="smart-select-page"
          >
            <div
              class={`navbar ${
                ss.params.navbarColorTheme ? `color-${ss.params.navbarColorTheme}` : ''
              }`}
            >
              <div class="navbar-bg"></div>
              <div class="navbar-inner sliding">
                {pageTitle && <div class="title">{pageTitle}</div>}
                <div class="right">
                  <a
                    class="link popup-close"
                    data-popup={`.smart-select-popup[data-select-name='${ss.selectName}']`}
                  >
                    {ss.params.popupCloseLinkText}
                  </a>
                </div>
                {ss.params.searchbar && <div class="subnavbar">{ss.renderSearchbar()}</div>}
              </div>
            </div>
            {ss.params.searchbar && <div class="searchbar-backdrop"></div>}
            <div class="page-content">
              <div
                class={`list list-outline-ios list-strong-ios list-dividers-ios smart-select-list smart-select-list-${
                  ss.id
                } ${ss.params.virtualList ? ' virtual-list' : ''} ${
                  ss.params.formColorTheme ? `color-${ss.params.formColorTheme}` : ''
                }`}
              >
                <ul>{!ss.params.virtualList && ss.renderItems(ss.items)}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderSheet() {
    const ss = this;
    if (ss.params.renderSheet) return ss.params.renderSheet.call(ss, ss.items);
    const cssClass = ss.params.cssClass;
    // prettier-ignore
    return (
      <div class={`sheet-modal smart-select-sheet ${cssClass}`} data-select-name={ss.selectName}>
        <div class={`toolbar toolbar-top ${ss.params.toolbarColorTheme ? `color-${ss.params.toolbarColorTheme}` : ''}`}>
          <div class="toolbar-inner">
            <div class="left"></div>
            <div class="right">
              <a class="link sheet-close">{ss.params.sheetCloseLinkText}</a>
            </div>
          </div>
        </div>
        <div class="sheet-modal-inner">
          <div class="page-content">
            <div class={`list list-strong-ios list-dividers-ios smart-select-list smart-select-list-${ss.id} ${ss.params.virtualList ? ' virtual-list' : ''} ${ss.params.formColorTheme ? `color-${ss.params.formColorTheme}` : ''}`}>
              <ul>{!ss.params.virtualList && ss.renderItems(ss.items)}</ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderPopover() {
    const ss = this;
    if (ss.params.renderPopover) return ss.params.renderPopover.call(ss, ss.items);
    const cssClass = ss.params.cssClass;
    // prettier-ignore
    return (
      <div class={`popover smart-select-popover ${cssClass}`} data-select-name={ss.selectName}>
        <div class="popover-inner">
          <div class={`list list-strong-ios list-dividers-ios smart-select-list smart-select-list-${ss.id} ${ss.params.virtualList ? ' virtual-list' : ''} ${ss.params.formColorTheme ? `color-${ss.params.formColorTheme}` : ''}`}>
            <ul>{!ss.params.virtualList && ss.renderItems(ss.items)}</ul>
          </div>
        </div>
      </div>

    )
  }

  scrollToSelectedItem() {
    const ss = this;
    const { params, $containerEl } = ss;
    if (!ss.opened) return ss;
    if (params.virtualList) {
      let selectedIndex;
      ss.vl.items.forEach((item, index) => {
        if (typeof selectedIndex === 'undefined' && item.selected) {
          selectedIndex = index;
        }
      });
      if (typeof selectedIndex !== 'undefined') {
        ss.vl.scrollToItem(selectedIndex);
      }
    } else {
      const $selectedItemEl = $containerEl.find('input:checked').parents('li');
      if (!$selectedItemEl.length) return ss;
      const $scrollableEl = $containerEl.find('.page-content, .popover-inner');
      if (!$scrollableEl.length) return ss;
      $scrollableEl.scrollTop(
        $selectedItemEl.offset().top -
          $scrollableEl.offset().top -
          parseInt($scrollableEl.css('padding-top'), 10),
      );
    }
    return ss;
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
          if (
            item.text &&
            removeDiacritics(item.text).toLowerCase().indexOf(query.trim().toLowerCase()) >= 0
          )
            return true;
          return false;
        },
      });
    }
    if (ss.params.scrollToSelectedItem) {
      ss.scrollToSelectedItem();
    }

    // Init SB
    if (ss.params.searchbar) {
      let $searchbarEl = $containerEl.find('.searchbar');
      if (type === 'page' && app.theme === 'ios') {
        $searchbarEl = $(app.navbar.getElByPage($containerEl)).find('.searchbar');
      }

      if (ss.params.appendSearchbarNotFound && (type === 'page' || type === 'popup')) {
        let $notFoundEl = null;

        if (typeof ss.params.appendSearchbarNotFound === 'string') {
          $notFoundEl = $(
            `<div class="block searchbar-not-found">${ss.params.appendSearchbarNotFound}</div>`,
          );
        } else if (typeof ss.params.appendSearchbarNotFound === 'boolean') {
          $notFoundEl = $('<div class="block searchbar-not-found">Nothing found</div>');
        } else {
          $notFoundEl = ss.params.appendSearchbarNotFound;
        }

        if ($notFoundEl) {
          $containerEl.find('.page-content').append($notFoundEl[0]);
        }
      }

      const searchbarParams = extend(
        {
          el: $searchbarEl,
          backdropEl: $containerEl.find('.searchbar-backdrop'),
          searchContainer: `.smart-select-list-${ss.id}`,
          searchIn: '.item-title',
        },
        typeof ss.params.searchbar === 'object' ? ss.params.searchbar : {},
      );

      ss.searchbar = app.searchbar.create(searchbarParams);
    }

    // Check for max length
    if (ss.maxLength) {
      ss.checkMaxLength();
    }

    // Close on select
    if (ss.params.closeOnSelect) {
      ss.$containerEl
        .find(`input[type="radio"][name="${ss.inputName}"]:checked`)
        .parents('label')
        .once('click', () => {
          ss.close();
        });
    }

    // Attach input events
    ss.attachInputsEvents();

    ss.$el.trigger('smartselect:open');
    ss.emit('local::open smartSelectOpen', ss);
  }

  onOpened() {
    const ss = this;

    ss.$el.trigger('smartselect:opened');
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

    ss.$el.trigger('smartselect:close');
    ss.emit('local::close smartSelectClose', ss);
  }

  onClosed() {
    const ss = this;
    if (ss.destroyed) return;
    ss.opened = false;
    ss.$containerEl = null;
    delete ss.$containerEl;

    ss.$el.trigger('smartselect:closed');
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
      push: ss.params.popupPush,
      swipeToClose: ss.params.popupSwipeToClose,
      closeByBackdropClick: ss.params.closeByBackdropClick,
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

    if (ss.params.routableModals && ss.view) {
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
      backdrop: ss.params.sheetBackdrop,
      scrollToEl: ss.$el,
      closeByOutsideClick: true,
      push: ss.params.sheetPush,
      swipeToClose: ss.params.sheetSwipeToClose,
      closeByBackdropClick: ss.params.closeByBackdropClick,
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

    if (ss.params.routableModals && ss.view) {
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
      closeByBackdropClick: ss.params.closeByBackdropClick,
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
    if (ss.params.routableModals && ss.view) {
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
    let prevented = false;
    function prevent() {
      prevented = true;
    }
    if (ss.$el) {
      ss.$el.trigger('smartselect:beforeopen', { prevent });
    }
    ss.emit('local::beforeOpen smartSelectBeforeOpen', ss, prevent);
    if (prevented) return ss;
    const openIn = type || ss.params.openIn;
    ss[
      `open${openIn
        .split('')
        .map((el, index) => {
          if (index === 0) return el.toUpperCase();
          return el;
        })
        .join('')}`
    ]();
    return ss;
  }

  close() {
    const ss = this;
    if (!ss.opened) return ss;
    if ((ss.params.routableModals && ss.view) || ss.openedIn === 'page') {
      ss.view.router.back();
    } else {
      ss.modal.once('modalClosed', () => {
        nextTick(() => {
          if (ss.destroyed) return;
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
    ss.setValueText();
  }

  destroy() {
    const ss = this;
    ss.emit('local::beforeDestroy smartSelectBeforeDestroy', ss);
    ss.$el.trigger('smartselect:beforedestroy');
    ss.detachEvents();
    delete ss.$el[0].f7SmartSelect;
    deleteProps(ss);
    ss.destroyed = true;
  }
}

export default SmartSelect;
