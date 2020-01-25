import { document } from 'ssr-window';
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
      inputEvents: 'change input compositionend',
      disableButton: true,
      disableButtonEl: undefined,
      backdropEl: undefined,
      searchContainer: undefined, // container to search, HTMLElement or CSS selector
      searchItem: 'li', // single item selector, CSS selector
      searchIn: undefined, // where to search in item, CSS selector
      searchGroup: '.list-group',
      searchGroupTitle: '.item-divider, .list-group-title',
      ignore: '.searchbar-ignore',
      foundEl: '.searchbar-found',
      notFoundEl: '.searchbar-not-found',
      hideOnEnableEl: '.searchbar-hide-on-enable',
      hideOnSearchEl: '.searchbar-hide-on-search',
      backdrop: undefined,
      removeDiacritics: true,
      customSearch: false,
      hideDividers: true,
      hideGroups: true,
      disableOnBackdropClick: true,
      expandable: false,
      inline: false,
    };

    // Extend defaults with modules params
    sb.useModulesParams(defaults);

    sb.params = Utils.extend(defaults, params);

    const $el = $(sb.params.el);
    if ($el.length === 0) return sb;

    if ($el[0].f7Searchbar) return $el[0].f7Searchbar;

    $el[0].f7Searchbar = sb;

    let $pageEl;
    const $navbarEl = $el.parents('.navbar');
    if ($el.parents('.page').length > 0) {
      $pageEl = $el.parents('.page');
    } else if ($navbarEl.length > 0) {
      $pageEl = $(app.navbar.getPageByEl($navbarEl[0]));
      if (!$pageEl.length) {
        const $currentPageEl = $el.parents('.view').find('.page-current');
        if ($currentPageEl[0] && $currentPageEl[0].f7Page && $currentPageEl[0].f7Page.navbarEl === $navbarEl[0]) {
          $pageEl = $currentPageEl;
        }
      }
    }

    let $foundEl;
    if (params.foundEl) {
      $foundEl = $(params.foundEl);
    } else if (typeof sb.params.foundEl === 'string' && $pageEl) {
      $foundEl = $pageEl.find(sb.params.foundEl);
    }

    let $notFoundEl;
    if (params.notFoundEl) {
      $notFoundEl = $(params.notFoundEl);
    } else if (typeof sb.params.notFoundEl === 'string' && $pageEl) {
      $notFoundEl = $pageEl.find(sb.params.notFoundEl);
    }

    let $hideOnEnableEl;
    if (params.hideOnEnableEl) {
      $hideOnEnableEl = $(params.hideOnEnableEl);
    } else if (typeof sb.params.hideOnEnableEl === 'string' && $pageEl) {
      $hideOnEnableEl = $pageEl.find(sb.params.hideOnEnableEl);
    }

    let $hideOnSearchEl;
    if (params.hideOnSearchEl) {
      $hideOnSearchEl = $(params.hideOnSearchEl);
    } else if (typeof sb.params.hideOnSearchEl === 'string' && $pageEl) {
      $hideOnSearchEl = $pageEl.find(sb.params.hideOnSearchEl);
    }


    const expandable = sb.params.expandable || $el.hasClass('searchbar-expandable');
    const inline = sb.params.inline || $el.hasClass('searchbar-inline');

    if (typeof sb.params.backdrop === 'undefined') {
      if (!inline) sb.params.backdrop = app.theme !== 'aurora';
      else sb.params.backdrop = false;
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
      view: app.views.get($el.parents('.view')),
      $el,
      el: $el[0],
      $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      $searchContainer,
      searchContainer: $searchContainer && $searchContainer[0],
      $inputEl,
      inputEl: $inputEl[0],
      $disableButtonEl,
      disableButtonEl: $disableButtonEl && $disableButtonEl[0],
      disableButtonHasMargin: false,
      $pageEl,
      pageEl: $pageEl && $pageEl[0],
      $navbarEl,
      navbarEl: $navbarEl && $navbarEl[0],
      $foundEl,
      foundEl: $foundEl && $foundEl[0],
      $notFoundEl,
      notFoundEl: $notFoundEl && $notFoundEl[0],
      $hideOnEnableEl,
      hideOnEnableEl: $hideOnEnableEl && $hideOnEnableEl[0],
      $hideOnSearchEl,
      hideOnSearchEl: $hideOnSearchEl && $hideOnSearchEl[0],
      previousQuery: '',
      query: '',
      isVirtualList: $searchContainer && $searchContainer.hasClass('virtual-list'),
      virtualList: undefined,
      enabled: false,
      expandable,
      inline,
    });

    // Events
    function preventSubmit(e) {
      e.preventDefault();
    }
    function onInputFocus(e) {
      sb.enable(e);
      sb.$el.addClass('searchbar-focused');
    }
    function onInputBlur() {
      sb.$el.removeClass('searchbar-focused');
      if (app.theme === 'aurora' && (!$disableButtonEl || !$disableButtonEl.length || !sb.params.disableButton) && !sb.query) {
        sb.disable();
      }
    }
    function onInputChange() {
      const value = sb.$inputEl.val().trim();
      if (
        (
          (sb.$searchContainer && sb.$searchContainer.length > 0)
          && (sb.params.searchIn || sb.isVirtualList || sb.params.searchIn === sb.params.searchItem)
        )
        || sb.params.customSearch
      ) {
        sb.search(value, true);
      }
    }
    function onInputClear(e, previousValue) {
      sb.$el.trigger('searchbar:clear', previousValue);
      sb.emit('local::clear searchbarClear', sb, previousValue);
    }
    function disableOnClick(e) {
      sb.disable(e);
    }
    function onPageBeforeOut() {
      if (!sb || (sb && !sb.$el)) return;
      if (sb.enabled) {
        sb.$el.removeClass('searchbar-enabled');
        if (sb.expandable) {
          sb.$el.parents('.navbar').removeClass('with-searchbar-expandable-enabled with-searchbar-expandable-enabled-no-transition');
        }
      }
    }
    function onPageBeforeIn() {
      if (!sb || (sb && !sb.$el)) return;
      if (sb.enabled) {
        sb.$el.addClass('searchbar-enabled');
        if (sb.expandable) {
          sb.$el.parents('.navbar').addClass('with-searchbar-expandable-enabled-no-transition');
        }
      }
    }
    sb.attachEvents = function attachEvents() {
      $el.on('submit', preventSubmit);
      if (sb.params.disableButton) {
        sb.$disableButtonEl.on('click', disableOnClick);
      }
      if (sb.params.disableOnBackdropClick && sb.$backdropEl) {
        sb.$backdropEl.on('click', disableOnClick);
      }
      if (sb.expandable && app.theme === 'ios' && sb.view && $navbarEl.length && sb.$pageEl) {
        sb.$pageEl.on('page:beforeout', onPageBeforeOut);
        sb.$pageEl.on('page:beforein', onPageBeforeIn);
      }
      sb.$inputEl.on('focus', onInputFocus);
      sb.$inputEl.on('blur', onInputBlur);
      sb.$inputEl.on(sb.params.inputEvents, onInputChange);
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
      if (sb.expandable && app.theme === 'ios' && sb.view && $navbarEl.length && sb.$pageEl) {
        sb.$pageEl.off('page:beforeout', onPageBeforeOut);
        sb.$pageEl.off('page:beforein', onPageBeforeIn);
      }
      sb.$inputEl.off('focus', onInputFocus);
      sb.$inputEl.off('blur', onInputBlur);
      sb.$inputEl.off(sb.params.inputEvents, onInputChange);
      sb.$inputEl.off('input:clear', onInputClear);
    };

    // Install Modules
    sb.useModules();

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
    sb.emit('local::clear searchbarClear', sb, previousQuery);
    return sb;
  }

  setDisableButtonMargin() {
    const sb = this;
    if (sb.expandable) return;
    const app = sb.app;
    sb.$disableButtonEl.transition(0).show();
    sb.$disableButtonEl.css(`margin-${app.rtl ? 'left' : 'right'}`, `${-sb.disableButtonEl.offsetWidth}px`);
    /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */
    sb._clientLeft = sb.$disableButtonEl[0].clientLeft;
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
        sb.backdropShow();
      }
      sb.$el.addClass('searchbar-enabled');
      if (!sb.$disableButtonEl || (sb.$disableButtonEl && sb.$disableButtonEl.length === 0)) {
        sb.$el.addClass('searchbar-enabled-no-disable-button');
      }
      if (!sb.expandable && sb.$disableButtonEl && sb.$disableButtonEl.length > 0 && app.theme !== 'md') {
        if (!sb.disableButtonHasMargin) {
          sb.setDisableButtonMargin();
        }
        sb.$disableButtonEl.css(`margin-${app.rtl ? 'left' : 'right'}`, '0px');
      }
      if (sb.expandable) {
        if (sb.$el.parents('.navbar').hasClass('navbar-large') && sb.$pageEl) {
          sb.$pageEl.find('.page-content').addClass('with-searchbar-expandable-enabled');
        }
        if (app.theme === 'md' && sb.$el.parents('.navbar').length) {
          sb.$el.parents('.navbar').addClass('with-searchbar-expandable-enabled');
        } else {
          sb.$el.parents('.navbar').addClass('with-searchbar-expandable-enabled');
          sb.$el.parents('.navbar-large').addClass('navbar-large-collapsed');
        }
      }
      if (sb.$hideOnEnableEl) sb.$hideOnEnableEl.addClass('hidden-by-searchbar');
      sb.$el.trigger('searchbar:enable');
      sb.emit('local::enable searchbarEnable', sb);
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
      if (app.theme === 'md' && sb.expandable) {
        sb.$el.parents('.page, .view, .navbar-inner, .navbar').scrollLeft(app.rtl ? 100 : 0);
      }
      enable();
    }
    return sb;
  }

  disable() {
    const sb = this;
    if (!sb.enabled) return sb;
    const app = sb.app;
    sb.$inputEl.val('').trigger('change');
    sb.$el.removeClass('searchbar-enabled searchbar-focused searchbar-enabled-no-disable-button');
    if (sb.expandable) {
      if (sb.$el.parents('.navbar').hasClass('navbar-large') && sb.$pageEl) {
        sb.$pageEl.find('.page-content').removeClass('with-searchbar-expandable-enabled').addClass('with-searchbar-expandable-closing');
        sb.$el.transitionEnd(() => {
          sb.$pageEl.find('.page-content').removeClass('with-searchbar-expandable-closing');
        });
      }
      if (app.theme === 'md' && sb.$el.parents('.navbar').length) {
        sb.$el.parents('.navbar')
          .removeClass('with-searchbar-expandable-enabled with-searchbar-expandable-enabled-no-transition')
          .addClass('with-searchbar-expandable-closing');
        sb.$el.transitionEnd(() => {
          sb.$el.parents('.navbar').removeClass('with-searchbar-expandable-closing');
        });
      } else {
        sb.$el.parents('.navbar')
          .removeClass('with-searchbar-expandable-enabled with-searchbar-expandable-enabled-no-transition')
          .addClass('with-searchbar-expandable-closing');
        sb.$el.transitionEnd(() => {
          sb.$el.parents('.navbar').removeClass('with-searchbar-expandable-closing');
        });
        if (sb.$pageEl) {
          sb.$pageEl.find('.page-content').trigger('scroll');
        }
      }
    }
    if (!sb.expandable && sb.$disableButtonEl && sb.$disableButtonEl.length > 0 && app.theme !== 'md') {
      sb.$disableButtonEl.css(`margin-${app.rtl ? 'left' : 'right'}`, `${-sb.disableButtonEl.offsetWidth}px`);
    }
    if (sb.$backdropEl && ((sb.$searchContainer && sb.$searchContainer.length) || sb.params.customSearch)) {
      sb.backdropHide();
    }

    sb.enabled = false;

    sb.$inputEl.blur();

    if (sb.$hideOnEnableEl) sb.$hideOnEnableEl.removeClass('hidden-by-searchbar');

    sb.$el.trigger('searchbar:disable');
    sb.emit('local::disable searchbarDisable', sb);
    return sb;
  }

  toggle() {
    const sb = this;
    if (sb.enabled) sb.disable();
    else sb.enable(true);
    return sb;
  }

  backdropShow() {
    const sb = this;
    if (sb.$backdropEl) {
      sb.$backdropEl.addClass('searchbar-backdrop-in');
    }
    return sb;
  }

  backdropHide() {
    const sb = this;
    if (sb.$backdropEl) {
      sb.$backdropEl.removeClass('searchbar-backdrop-in');
    }
    return sb;
  }

  search(query, internal) {
    const sb = this;
    sb.previousQuery = sb.query || '';
    if (query === sb.previousQuery) return sb;

    if (!internal) {
      if (!sb.enabled) {
        sb.enable();
      }
      sb.$inputEl.val(query);
      sb.$inputEl.trigger('input');
    }
    sb.query = query;
    sb.value = query;

    const { $searchContainer, $el, $foundEl, $notFoundEl, $hideOnSearchEl, isVirtualList } = sb;

    // Hide on search element
    if (query.length > 0 && $hideOnSearchEl) {
      $hideOnSearchEl.addClass('hidden-by-searchbar');
    } else if ($hideOnSearchEl) {
      $hideOnSearchEl.removeClass('hidden-by-searchbar');
    }
    // Add active/inactive classes on overlay
    if (
      ($searchContainer && $searchContainer.length && $el.hasClass('searchbar-enabled'))
      || (sb.params.customSearch && $el.hasClass('searchbar-enabled'))
    ) {
      if (query.length === 0) {
        sb.backdropShow();
      } else {
        sb.backdropHide();
      }
    }

    if (sb.params.customSearch) {
      $el.trigger('searchbar:search', { query, previousQuery: sb.previousQuery });
      sb.emit('local::search searchbarSearch', sb, query, sb.previousQuery);
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
        $el.trigger('searchbar:search', { query, previousQuery: sb.previousQuery });
        sb.emit('local::search searchbarSearch', sb, query, sb.previousQuery);
        return sb;
      }
      vlQuery = sb.params.removeDiacritics ? Utils.removeDiacritics(query) : query;
      if (sb.virtualList.params.searchAll) {
        foundItems = sb.virtualList.params.searchAll(vlQuery, sb.virtualList.items) || [];
      } else if (sb.virtualList.params.searchByItem) {
        for (let i = 0; i < sb.virtualList.items.length; i += 1) {
          if (sb.virtualList.params.searchByItem(vlQuery, sb.virtualList.params.items[i], i)) {
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
        let $searchIn = sb.params.searchIn ? $itemEl.find(sb.params.searchIn) : $itemEl;
        if (sb.params.searchIn === sb.params.searchItem) {
          $searchIn = $itemEl;
        }
        $searchIn.each((searchInIndex, searchInEl) => {
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
        $searchContainer.find(sb.params.searchGroupTitle).each((titleIndex, titleEl) => {
          const $titleEl = $(titleEl);
          const $nextElements = $titleEl.nextAll(sb.params.searchItem);
          let hide = true;
          for (let i = 0; i < $nextElements.length; i += 1) {
            const $nextEl = $nextElements.eq(i);
            if ($nextEl.is(sb.params.searchGroupTitle)) break;
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
        $searchContainer.find(sb.params.searchGroup).each((groupIndex, groupEl) => {
          const $groupEl = $(groupEl);
          const ignore = sb.params.ignore && $groupEl.is(sb.params.ignore);
          // eslint-disable-next-line
          const notHidden = $groupEl.find(sb.params.searchItem).filter((index, el) => {
            return !$(el).hasClass('hidden-by-searchbar');
          });
          if (notHidden.length === 0 && !ignore) {
            $groupEl.addClass('hidden-by-searchbar');
          } else {
            $groupEl.removeClass('hidden-by-searchbar');
          }
        });
      }
    }

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

    $el.trigger('searchbar:search', { query, previousQuery: sb.previousQuery, foundItems });
    sb.emit('local::search searchbarSearch', sb, query, sb.previousQuery, foundItems);

    return sb;
  }

  init() {
    const sb = this;
    if (sb.expandable && sb.$el) sb.$el.addClass('searchbar-expandable');
    if (sb.inline && sb.$el) sb.$el.addClass('searchbar-inline');
    sb.attachEvents();
  }

  destroy() {
    const sb = this;
    sb.emit('local::beforeDestroy searchbarBeforeDestroy', sb);
    sb.$el.trigger('searchbar:beforedestroy');
    sb.detachEvents();
    if (sb.$el[0]) {
      sb.$el[0].f7Searchbar = null;
      delete sb.$el[0].f7Searchbar;
    }
    Utils.deleteProps(sb);
  }
}

export default Searchbar;
