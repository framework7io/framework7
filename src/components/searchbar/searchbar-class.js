import $ from 'dom7';
import Utils from '../../utils/utils';
import FrameworkClass from '../../utils/class';

class Searchbar extends FrameworkClass {
  constructor(app, params = {}) {
    super(params, [app]);

    const sb = this;

    const defaults = {
      el: undefined,
      inputEl: undefined,
      disableButton: true,
      disableButtonEl: undefined,
      backdropEl: undefined,
      searchContainer: undefined, // container to search, HTMLElement or CSS selector
      searchItem: 'li', // single item selector, CSS selector
      searchIn: undefined, // where to search in item, CSS selector
      ignore: '.searchbar-ignore',
      foundEl: '.searchbar-found',
      notFoundEl: '.searchbar-not-found',
      backdrop: true,
      removeDiacritics: false,
      customSearch: false,
      hideDividers: true,
      hideGroups: true,
      disableOnBackdropClick: true,
      expandable: false,
    };

    // Extend defaults with modules params
    sb.useInstanceModulesParams(defaults);

    sb.params = Utils.extend(defaults, params);

    const $el = $(sb.params.el);
    if ($el.length === 0) return sb;

    $el[0].f7Searchbar = sb;

    let $pageEl;
    let $navbarEl;
    if ($el.parents('.page').length > 0) {
      $pageEl = $el.parents('.page');
    } else {
      $navbarEl = $el.parents('.navbar-inner');
      if ($navbarEl.length > 0) {
        if ($navbarEl[0].f7Page) {
          $pageEl = $navbarEl[0].f7Page.$el;
        } else {
          const $currentPageEl = $el.parents('.view').find('.page-current');
          if ($currentPageEl[0] && $currentPageEl[0].f7Page && $currentPageEl[0].f7Page.navbarEl === $navbarEl[0]) {
            $pageEl = $currentPageEl;
          }
        }
      }
    }

    let $foundEl;
    if (params.foundEl) {
      $foundEl = $(params.foundEl);
    } else if ($pageEl) {
      $foundEl = $pageEl.find(sb.params.foundEl);
    }

    let $notFoundEl;
    if (params.notFoundEl) {
      $notFoundEl = $(params.notFoundEl);
    } else if ($pageEl) {
      $notFoundEl = $pageEl.find(sb.params.notFoundEl);
    }

    let $backdropEl;
    if (sb.params.backdrop) {
      if (sb.params.backdropEl) {
        $backdropEl = $(sb.params.backdropEl);
      } else if ($pageEl && $pageEl.length > 0) {
        $backdropEl = $pageEl.find('.searchbar-backdrop');
      } else {
        $backdropEl = $el.siblings('.searchbar-backdrop');
      }
      if ($backdropEl.length === 0) {
        $backdropEl = $('<div class="searchbar-backdrop"></div>');
        if ($pageEl && $pageEl.length) {
          if ($el.parents($pageEl).length > 0 && $navbarEl && $el.parents($navbarEl).length === 0) {
            $backdropEl.insertBefore($el);
          } else {
            $backdropEl.insertBefore($pageEl.find('.page-content').eq(0));
          }
        } else {
          $backdropEl.insertBefore($el);
        }
      }
    }

    let $searchContainer;
    if (sb.params.searchContainer) {
      $searchContainer = $(sb.params.searchContainer);
    }

    let $inputEl;
    if (sb.params.inputEl) {
      $inputEl = $(sb.params.inputEl);
    } else {
      $inputEl = $el.find('input[type="search"]').eq(0);
    }

    let $disableButtonEl;
    if (sb.params.disableButton) {
      if (sb.params.disableButtonEl) {
        $disableButtonEl = $(sb.params.disableButtonEl);
      } else {
        $disableButtonEl = $el.find('.searchbar-disable-button');
      }
    }

    Utils.extend(sb, {
      app,
      $el,
      el: $el[0],
      $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      $searchContainer,
      searchContainer: $searchContainer && $searchContainer[0],
      $inputEl,
      inputEl: $inputEl[0],
      $disableButtonEl,
      disableButtonEl: $disableButtonEl[0],
      disableButtonHasMargin: false,
      $pageEl,
      pageEl: $pageEl && $pageEl[0],
      $foundEl,
      foundEl: $foundEl && $foundEl[0],
      $notFoundEl,
      notFoundEl: $notFoundEl && $notFoundEl[0],
      previousQuery: '',
      query: '',
      isVirtualList: $searchContainer && $searchContainer.hasClass('virtual-list'),
      virtualList: undefined,
      enabled: false,
      expandable: sb.params.expandable || $el.hasClass('searchbar-expandable'),
    });

    // Events
    function preventSubmit(e) {
      e.preventDefault();
    }
    function onInputFocus(e) {
      sb.enable(e);
    }
    function onInputChange() {
      const value = sb.$inputEl.val().trim();
      if (
          ((sb.$searchContainer && sb.$searchContainer.length > 0) || sb.params.customSearch) &&
          (sb.params.searchIn || sb.isVirtualList)
        ) {
        sb.search(value, true);
      }
    }
    function onInputClear(e, previousValue) {
      sb.$el.trigger('searchbar:clear', previousValue);
      sb.emit('searchbarClear', previousValue);
    }
    function disableOnClick(e) {
      sb.disable(e);
    }
    sb.attachEvents = function attachEvents() {
      $el.on('submit', preventSubmit);
      if (sb.params.disableButton) {
        sb.$disableButtonEl.on('click', disableOnClick);
      }
      if (sb.params.disableOnBackdropClick && sb.$backdropEl) {
        sb.$backdropEl.on('click', disableOnClick);
      }
      sb.$inputEl.on('focus', onInputFocus);
      sb.$inputEl.on('change input compositionend', onInputChange);
      sb.$inputEl.on('input:clear', onInputClear);
    };
    sb.detachEvents = function detachEvents() {
      $el.off('submit', preventSubmit);
      if (sb.params.disableButton) {
        sb.$disableButtonEl.off('click', disableOnClick);
      }
      if (sb.params.disableOnBackdropClick && sb.$backdropEl) {
        sb.$backdropEl.off('click', disableOnClick);
      }
      sb.$inputEl.off('focus', onInputFocus);
      sb.$inputEl.off('change input compositionend', onInputChange);
      sb.$inputEl.off('input:clear', onInputClear);
    };

    // Install Modules
    sb.useInstanceModules();

    // Init
    sb.init();

    return sb;
  }
  clear(e) {
    const sb = this;
    if (!sb.query && e && $(e.target).hasClass('searchbar-clear')) {
      sb.disable();
      return sb;
    }
    const previousQuery = sb.value;
    sb.$inputEl.val('').trigger('change').focus();
    sb.$el.trigger('searchbar:clear', previousQuery);
    sb.emit('searchbarClear', previousQuery);
    return sb;
  }
  setDisableButtonMargin() {
    const sb = this;
    if (sb.expandable) return;
    const app = sb.app;
    sb.$disableButtonEl.transition(0).show();
    sb.$disableButtonEl.css(`margin-${app.rtl ? 'left' : 'right'}`, `${-sb.disableButtonEl.offsetWidth}px`);
    const clientLeft = sb.$disableButtonEl[0].clientLeft;
    sb.$disableButtonEl.transition('');
    sb.disableButtonHasMargin = true;
  }
  enable(setFocus) {
    const sb = this;
    if (sb.enabled) return sb;
    const app = sb.app;
    sb.enabled = true;
    function enable() {
      if (sb.$backdropEl && ((sb.$searchContainer && sb.$searchContainer.length) || sb.params.customSearch) && !sb.$el.hasClass('searchbar-enabled') && !sb.query) {
        sb.$backdropEl.addClass('searchbar-backdrop-in');
      }
      sb.$el.addClass('searchbar-enabled');
      if (!sb.expandable && sb.$disableButtonEl && sb.$disableButtonEl.length > 0 && app.theme === 'ios') {
        if (!sb.disableButtonHasMargin) {
          sb.setDisableButtonMargin();
        }
        sb.$disableButtonEl.css(`margin-${app.rtl ? 'left' : 'right'}`, '0px');
      }
      sb.$el.trigger('searchbar:enable');
      sb.emit('searchbarEnable');
    }
    let needsFocus = false;
    if (setFocus === true) {
      if (document.activeElement !== sb.inputEl) {
        needsFocus = true;
      }
    }
    const isIos = app.device.ios && app.theme === 'ios';
    if (isIos) {
      if (sb.expandable) {
        if (needsFocus) sb.$inputEl.focus();
        enable();
      } else {
        if (needsFocus) sb.$inputEl.focus();
        if (setFocus && (setFocus.type === 'focus' || setFocus === true)) {
          Utils.nextTick(() => {
            enable();
          }, 400);
        } else {
          enable();
        }
      }
    } else {
      if (needsFocus) sb.$inputEl.focus();
      enable();
    }
    return sb;
  }
  disable() {
    const sb = this;
    if (!sb.enabled) return sb;
    const app = sb.app;
    sb.$inputEl.val('').trigger('change');
    sb.$el.removeClass('searchbar-enabled');
    if (!sb.expandable && sb.$disableButtonEl && sb.$disableButtonEl.length > 0 && app.theme === 'ios') {
      sb.$disableButtonEl.css(`margin-${app.rtl ? 'left' : 'right'}`, `${-sb.disableButtonEl.offsetWidth}px`);
    }

    if (sb.$backdropEl && ((sb.$searchContainer && sb.$searchContainer.length) || sb.params.customSearch)) {
      sb.$backdropEl.removeClass('searchbar-backdrop-in');
    }

    sb.enabled = false;

    sb.$inputEl.blur();

    sb.$el.trigger('searchbar:disable');
    sb.emit('searchbarDisable');
    return sb;
  }
  toggle() {
    const sb = this;
    if (sb.enabled) sb.disable();
    else sb.enable(true);
    return sb;
  }
  search(query, internal) {
    const sb = this;
    if (sb.previousQuery && query.trim() === sb.previousQuery) return sb;
    if (typeof (sb.previousQuery) !== 'undefined' && sb.previousQuery.trim() === '' && query.trim() === '') return sb;
    sb.previousQuery = query.trim();

    if (!internal) {
      if (!sb.enabled) {
        sb.enable();
      }
      sb.$inputEl.val(query);
    }
    sb.query = query;
    sb.value = query;

    const { $searchContainer, $el, $backdropEl, $foundEl, $notFoundEl, isVirtualList } = sb;

    // Add active/inactive classes on overlay
    if (query.length === 0) {
      if ($searchContainer && $searchContainer.length && $el.hasClass('searchbar-enabled') && $backdropEl) $backdropEl.addClass('searchbar-backdrop-in');
    } else if ($searchContainer && $searchContainer.length && $el.hasClass('searchbar-enabled')) {
      $backdropEl.removeClass('searchbar-backdrop-in');
    }

    if (sb.params.customSearch) {
      $el.trigger('searhbar:search', query);
      sb.emit('searhbarSearch', query);
      return sb;
    }

    let foundItems = [];
    let vlQuery;
    if (isVirtualList) {
      sb.virtualList = $searchContainer[0].f7VirtualList;
      if (query.trim() === '') {
        sb.virtualList.resetFilter();
        if ($notFoundEl) $notFoundEl.hide();
        if ($foundEl) $foundEl.show();
        return sb;
      }
      vlQuery = sb.params.removeDiacritics ? Utils.removeDiacritics(query) : query;
      if (sb.virtualList.params.searchAll) {
        foundItems = sb.virtualList.params.searchAll(vlQuery, sb.virtualList.items) || [];
      } else if (sb.virtualList.params.searchByItem) {
        for (let i = 0; i < sb.virtualList.items.length; i += 1) {
          if (sb.virtualList.params.searchByItem(vlQuery, i, sb.virtualList.params.items[i])) {
            foundItems.push(i);
          }
        }
      }
    } else {
      let values;
      if (sb.params.removeDiacritics) values = Utils.removeDiacritics(query.trim().toLowerCase()).split(' ');
      else {
        values = query.trim().toLowerCase().split(' ');
      }
      $searchContainer.find(sb.params.searchItem).removeClass('hidden-by-searchbar').each((itemIndex, itemEl) => {
        const $itemEl = $(itemEl);
        let compareWithText = [];
        $itemEl.find(sb.params.searchIn).each((searchInIndex, searchInEl) => {
          let itemText = $(searchInEl).text().trim().toLowerCase();
          if (sb.params.removeDiacritics) itemText = Utils.removeDiacritics(itemText);
          compareWithText.push(itemText);
        });
        compareWithText = compareWithText.join(' ');
        let wordsMatch = 0;
        for (let i = 0; i < values.length; i += 1) {
          if (compareWithText.indexOf(values[i]) >= 0) wordsMatch += 1;
        }
        if (wordsMatch !== values.length && !(sb.params.ignore && $itemEl.is(sb.params.ignore))) {
          $itemEl.addClass('hidden-by-searchbar');
        } else {
          foundItems.push($itemEl[0]);
        }
      });

      if (sb.params.hideDividers) {
        $searchContainer.find('.item-divider, .list-group-title').each((titleIndex, titleEl) => {
          const $titleEl = $(titleEl);
          const $nextElements = $titleEl.nextAll('li');
          let hide = true;
          for (let i = 0; i < $nextElements.length; i += 1) {
            const $nextEl = $nextElements.eq(i);
            if ($nextEl.hasClass('list-group-title') || $nextEl.hasClass('item-divider')) break;
            if (!$nextEl.hasClass('hidden-by-searchbar')) {
              hide = false;
            }
          }
          const ignore = sb.params.ignore && $titleEl.is(sb.params.ignore);
          if (hide && !ignore) $titleEl.addClass('hidden-by-searchbar');
          else $titleEl.removeClass('hidden-by-searchbar');
        });
      }
      if (sb.params.hideGroups) {
        $searchContainer.find('.list-group').each((groupIndex, groupEl) => {
          const $groupEl = $(groupEl);
          const ignore = sb.params.ignore && $groupEl.is(sb.params.ignore);
          const notHidden = $groupEl.find('li:not(.hidden-by-searchbar)');
          if (notHidden.length === 0 && !ignore) {
            $groupEl.addClass('hidden-by-searchbar');
          } else {
            $groupEl.removeClass('hidden-by-searchbar');
          }
        });
      }
    }
    $el.trigger('searchbar:search', query, foundItems);
    sb.emit('searchbarSearch', query, foundItems);
    if (foundItems.length === 0) {
      if ($notFoundEl) $notFoundEl.show();
      if ($foundEl) $foundEl.hide();
    } else {
      if ($notFoundEl) $notFoundEl.hide();
      if ($foundEl) $foundEl.show();
    }
    if (isVirtualList && sb.virtualList) {
      sb.virtualList.filterItems(foundItems);
    }
    return sb;
  }
  init() {
    const sb = this;
    sb.attachEvents();
  }
  destroy() {
    const sb = this;
    sb.emit('searchbarBeforeDestroy', sb);
    sb.$el.trigger('searchbar:beforedestroy', sb);
    sb.detachEvents();
    delete sb.$el.f7Searchbar;
    Utils.deleteProps(sb);
  }
}

export default Searchbar;
