
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

  var Searchbar = (function (FrameworkClass) {
    function Searchbar(app, params) {
      if ( params === void 0 ) params = {};

      FrameworkClass.call(this, params, [app]);

      var sb = this;

      var defaults = {
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
        hideOnEnableEl: '.searchbar-hide-on-enable',
        hideOnSearchEl: '.searchbar-hide-on-search',
        backdrop: true,
        removeDiacritics: true,
        customSearch: false,
        hideDividers: true,
        hideGroups: true,
        disableOnBackdropClick: true,
        expandable: false,
      };

      // Extend defaults with modules params
      sb.useModulesParams(defaults);

      sb.params = Utils.extend(defaults, params);

      var $el = $(sb.params.el);
      if ($el.length === 0) { return sb; }

      if ($el[0].f7Searchbar) { return $el[0].f7Searchbar; }

      $el[0].f7Searchbar = sb;

      var $pageEl;
      var $navbarEl;
      if ($el.parents('.page').length > 0) {
        $pageEl = $el.parents('.page');
      } else {
        $navbarEl = $el.parents('.navbar-inner');
        if ($navbarEl.length > 0) {
          if ($navbarEl[0].f7Page) {
            $pageEl = $navbarEl[0].f7Page.$el;
          } else {
            var $currentPageEl = $el.parents('.view').find('.page-current');
            if ($currentPageEl[0] && $currentPageEl[0].f7Page && $currentPageEl[0].f7Page.navbarEl === $navbarEl[0]) {
              $pageEl = $currentPageEl;
            }
          }
        }
      }

      var $foundEl;
      if (params.foundEl) {
        $foundEl = $(params.foundEl);
      } else if (typeof sb.params.foundEl === 'string' && $pageEl) {
        $foundEl = $pageEl.find(sb.params.foundEl);
      }

      var $notFoundEl;
      if (params.notFoundEl) {
        $notFoundEl = $(params.notFoundEl);
      } else if (typeof sb.params.notFoundEl === 'string' && $pageEl) {
        $notFoundEl = $pageEl.find(sb.params.notFoundEl);
      }

      var $hideOnEnableEl;
      if (params.hideOnEnableEl) {
        $hideOnEnableEl = $(params.hideOnEnableEl);
      } else if (typeof sb.params.hideOnEnableEl === 'string' && $pageEl) {
        $hideOnEnableEl = $pageEl.find(sb.params.hideOnEnableEl);
      }

      var $hideOnSearchEl;
      if (params.hideOnSearchEl) {
        $hideOnSearchEl = $(params.hideOnSearchEl);
      } else if (typeof sb.params.hideOnSearchEl === 'string' && $pageEl) {
        $hideOnSearchEl = $pageEl.find(sb.params.hideOnSearchEl);
      }

      var $backdropEl;
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

      var $searchContainer;
      if (sb.params.searchContainer) {
        $searchContainer = $(sb.params.searchContainer);
      }

      var $inputEl;
      if (sb.params.inputEl) {
        $inputEl = $(sb.params.inputEl);
      } else {
        $inputEl = $el.find('input[type="search"]').eq(0);
      }

      var $disableButtonEl;
      if (sb.params.disableButton) {
        if (sb.params.disableButtonEl) {
          $disableButtonEl = $(sb.params.disableButtonEl);
        } else {
          $disableButtonEl = $el.find('.searchbar-disable-button');
        }
      }

      Utils.extend(sb, {
        app: app,
        view: app.views.get($el.parents('.view')),
        $el: $el,
        el: $el[0],
        $backdropEl: $backdropEl,
        backdropEl: $backdropEl && $backdropEl[0],
        $searchContainer: $searchContainer,
        searchContainer: $searchContainer && $searchContainer[0],
        $inputEl: $inputEl,
        inputEl: $inputEl[0],
        $disableButtonEl: $disableButtonEl,
        disableButtonEl: $disableButtonEl && $disableButtonEl[0],
        disableButtonHasMargin: false,
        $pageEl: $pageEl,
        pageEl: $pageEl && $pageEl[0],
        $navbarEl: $navbarEl,
        navbarEl: $navbarEl && $navbarEl[0],
        $foundEl: $foundEl,
        foundEl: $foundEl && $foundEl[0],
        $notFoundEl: $notFoundEl,
        notFoundEl: $notFoundEl && $notFoundEl[0],
        $hideOnEnableEl: $hideOnEnableEl,
        hideOnEnableEl: $hideOnEnableEl && $hideOnEnableEl[0],
        $hideOnSearchEl: $hideOnSearchEl,
        hideOnSearchEl: $hideOnSearchEl && $hideOnSearchEl[0],
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
        sb.$el.addClass('searchbar-focused');
      }
      function onInputBlur() {
        sb.$el.removeClass('searchbar-focused');
      }
      function onInputChange() {
        var value = sb.$inputEl.val().trim();
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
        if (!sb || (sb && !sb.$el)) { return; }
        if (sb.enabled) {
          sb.$el.removeClass('searchbar-enabled');
        }
      }
      function onPageBeforeIn() {
        if (!sb || (sb && !sb.$el)) { return; }
        if (sb.enabled) {
          sb.$el.addClass('searchbar-enabled');
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
        if (sb.expandable && app.theme === 'ios' && sb.view && $navbarEl && sb.$pageEl) {
          sb.$pageEl.on('page:beforeout', onPageBeforeOut);
          sb.$pageEl.on('page:beforein', onPageBeforeIn);
        }
        sb.$inputEl.on('focus', onInputFocus);
        sb.$inputEl.on('blur', onInputBlur);
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
        if (sb.expandable && app.theme === 'ios' && sb.view && $navbarEl && sb.$pageEl) {
          sb.$pageEl.off('page:beforeout', onPageBeforeOut);
          sb.$pageEl.off('page:beforein', onPageBeforeIn);
        }
        sb.$inputEl.off('focus', onInputFocus);
        sb.$inputEl.off('blur', onInputBlur);
        sb.$inputEl.off('change input compositionend', onInputChange);
        sb.$inputEl.off('input:clear', onInputClear);
      };

      // Install Modules
      sb.useModules();

      // Init
      sb.init();

      return sb;
    }

    if ( FrameworkClass ) Searchbar.__proto__ = FrameworkClass;
    Searchbar.prototype = Object.create( FrameworkClass && FrameworkClass.prototype );
    Searchbar.prototype.constructor = Searchbar;

    Searchbar.prototype.clear = function clear (e) {
      var sb = this;
      if (!sb.query && e && $(e.target).hasClass('searchbar-clear')) {
        sb.disable();
        return sb;
      }
      var previousQuery = sb.value;
      sb.$inputEl.val('').trigger('change').focus();
      sb.$el.trigger('searchbar:clear', previousQuery);
      sb.emit('local::clear searchbarClear', sb, previousQuery);
      return sb;
    };

    Searchbar.prototype.setDisableButtonMargin = function setDisableButtonMargin () {
      var sb = this;
      if (sb.expandable) { return; }
      var app = sb.app;
      sb.$disableButtonEl.transition(0).show();
      sb.$disableButtonEl.css(("margin-" + (app.rtl ? 'left' : 'right')), ((-sb.disableButtonEl.offsetWidth) + "px"));
      /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */
      // sb._clientLeft = sb.$disableButtonEl[0].clientLeft;
      Utils.nextFrame(function () {
        sb.$disableButtonEl.transition('');
        sb.disableButtonHasMargin = true;
      });
    };

    Searchbar.prototype.enable = function enable (setFocus) {
      var sb = this;
      if (sb.enabled) { return sb; }
      var app = sb.app;
      sb.enabled = true;
      function enable() {
        if (sb.$backdropEl && ((sb.$searchContainer && sb.$searchContainer.length) || sb.params.customSearch) && !sb.$el.hasClass('searchbar-enabled') && !sb.query) {
          sb.backdropShow();
        }
        sb.$el.addClass('searchbar-enabled');
        if (!sb.$disableButtonEl || (sb.$disableButtonEl && sb.$disableButtonEl.length === 0)) {
          sb.$el.addClass('searchbar-enabled-no-disable-button');
        }
        if (!sb.expandable && sb.$disableButtonEl && sb.$disableButtonEl.length > 0 && app.theme === 'ios') {
          if (!sb.disableButtonHasMargin) {
            sb.setDisableButtonMargin();
          }
          sb.$disableButtonEl.css(("margin-" + (app.rtl ? 'left' : 'right')), '0px');
        }
        if (sb.$hideOnEnableEl) { sb.$hideOnEnableEl.addClass('hidden-by-searchbar'); }
        sb.$el.trigger('searchbar:enable');
        sb.emit('local::enable searchbarEnable', sb);
      }
      var needsFocus = false;
      if (setFocus === true) {
        if (doc.activeElement !== sb.inputEl) {
          needsFocus = true;
        }
      }
      var isIos = app.device.ios && app.theme === 'ios';
      if (isIos) {
        if (sb.expandable) {
          if (needsFocus) { sb.$inputEl.focus(); }
          enable();
        } else {
          if (needsFocus) { sb.$inputEl.focus(); }
          if (setFocus && (setFocus.type === 'focus' || setFocus === true)) {
            Utils.nextTick(function () {
              enable();
            }, 400);
          } else {
            enable();
          }
        }
      } else {
        if (needsFocus) { sb.$inputEl.focus(); }
        if (app.theme === 'md' && sb.expandable) {
          sb.$el.parents('.page, .view, .navbar-inner').scrollLeft(0);
        }
        enable();
      }
      return sb;
    };

    Searchbar.prototype.disable = function disable () {
      var sb = this;
      if (!sb.enabled) { return sb; }
      var app = sb.app;
      sb.$inputEl.val('').trigger('change');
      sb.$el.removeClass('searchbar-enabled searchbar-focused searchbar-enabled-no-disable-button');
      if (!sb.expandable && sb.$disableButtonEl && sb.$disableButtonEl.length > 0 && app.theme === 'ios') {
        sb.$disableButtonEl.css(("margin-" + (app.rtl ? 'left' : 'right')), ((-sb.disableButtonEl.offsetWidth) + "px"));
      }

      if (sb.$backdropEl && ((sb.$searchContainer && sb.$searchContainer.length) || sb.params.customSearch)) {
        sb.backdropHide();
      }

      sb.enabled = false;

      sb.$inputEl.blur();

      if (sb.$hideOnEnableEl) { sb.$hideOnEnableEl.removeClass('hidden-by-searchbar'); }

      sb.$el.trigger('searchbar:disable');
      sb.emit('local::disable searchbarDisable', sb);
      return sb;
    };

    Searchbar.prototype.toggle = function toggle () {
      var sb = this;
      if (sb.enabled) { sb.disable(); }
      else { sb.enable(true); }
      return sb;
    };

    Searchbar.prototype.backdropShow = function backdropShow () {
      var sb = this;
      if (sb.$backdropEl) {
        sb.$backdropEl.addClass('searchbar-backdrop-in');
      }
      return sb;
    };

    Searchbar.prototype.backdropHide = function backdropHide () {
      var sb = this;
      if (sb.$backdropEl) {
        sb.$backdropEl.removeClass('searchbar-backdrop-in');
      }
      return sb;
    };

    Searchbar.prototype.search = function search (query, internal) {
      var sb = this;
      sb.previousQuery = sb.query || '';
      if (query === sb.previousQuery) { return sb; }

      if (!internal) {
        if (!sb.enabled) {
          sb.enable();
        }
        sb.$inputEl.val(query);
        sb.$inputEl.trigger('input');
      }
      sb.query = query;
      sb.value = query;

      var $searchContainer = sb.$searchContainer;
      var $el = sb.$el;
      var $foundEl = sb.$foundEl;
      var $notFoundEl = sb.$notFoundEl;
      var $hideOnSearchEl = sb.$hideOnSearchEl;
      var isVirtualList = sb.isVirtualList;

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
        $el.trigger('searchbar:search', query, sb.previousQuery);
        sb.emit('local::search searchbarSearch', sb, query, sb.previousQuery);
        return sb;
      }

      var foundItems = [];
      var vlQuery;
      if (isVirtualList) {
        sb.virtualList = $searchContainer[0].f7VirtualList;
        if (query.trim() === '') {
          sb.virtualList.resetFilter();
          if ($notFoundEl) { $notFoundEl.hide(); }
          if ($foundEl) { $foundEl.show(); }
          $el.trigger('searchbar:search', query, sb.previousQuery);
          sb.emit('local::search searchbarSearch', sb, query, sb.previousQuery);
          return sb;
        }
        vlQuery = sb.params.removeDiacritics ? Utils.removeDiacritics(query) : query;
        if (sb.virtualList.params.searchAll) {
          foundItems = sb.virtualList.params.searchAll(vlQuery, sb.virtualList.items) || [];
        } else if (sb.virtualList.params.searchByItem) {
          for (var i = 0; i < sb.virtualList.items.length; i += 1) {
            if (sb.virtualList.params.searchByItem(vlQuery, sb.virtualList.params.items[i], i)) {
              foundItems.push(i);
            }
          }
        }
      } else {
        var values;
        if (sb.params.removeDiacritics) { values = Utils.removeDiacritics(query.trim().toLowerCase()).split(' '); }
        else {
          values = query.trim().toLowerCase().split(' ');
        }
        $searchContainer.find(sb.params.searchItem).removeClass('hidden-by-searchbar').each(function (itemIndex, itemEl) {
          var $itemEl = $(itemEl);
          var compareWithText = [];
          var $searchIn = sb.params.searchIn ? $itemEl.find(sb.params.searchIn) : $itemEl;
          if (sb.params.searchIn === sb.params.searchItem) {
            $searchIn = $itemEl;
          }
          $searchIn.each(function (searchInIndex, searchInEl) {
            var itemText = $(searchInEl).text().trim().toLowerCase();
            if (sb.params.removeDiacritics) { itemText = Utils.removeDiacritics(itemText); }
            compareWithText.push(itemText);
          });
          compareWithText = compareWithText.join(' ');
          var wordsMatch = 0;
          for (var i = 0; i < values.length; i += 1) {
            if (compareWithText.indexOf(values[i]) >= 0) { wordsMatch += 1; }
          }
          if (wordsMatch !== values.length && !(sb.params.ignore && $itemEl.is(sb.params.ignore))) {
            $itemEl.addClass('hidden-by-searchbar');
          } else {
            foundItems.push($itemEl[0]);
          }
        });

        if (sb.params.hideDividers) {
          $searchContainer.find('.item-divider, .list-group-title').each(function (titleIndex, titleEl) {
            var $titleEl = $(titleEl);
            var $nextElements = $titleEl.nextAll('li');
            var hide = true;
            for (var i = 0; i < $nextElements.length; i += 1) {
              var $nextEl = $nextElements.eq(i);
              if ($nextEl.hasClass('list-group-title') || $nextEl.hasClass('item-divider')) { break; }
              if (!$nextEl.hasClass('hidden-by-searchbar')) {
                hide = false;
              }
            }
            var ignore = sb.params.ignore && $titleEl.is(sb.params.ignore);
            if (hide && !ignore) { $titleEl.addClass('hidden-by-searchbar'); }
            else { $titleEl.removeClass('hidden-by-searchbar'); }
          });
        }
        if (sb.params.hideGroups) {
          $searchContainer.find('.list-group').each(function (groupIndex, groupEl) {
            var $groupEl = $(groupEl);
            var ignore = sb.params.ignore && $groupEl.is(sb.params.ignore);
            var notHidden = $groupEl.find('li:not(.hidden-by-searchbar)');
            if (notHidden.length === 0 && !ignore) {
              $groupEl.addClass('hidden-by-searchbar');
            } else {
              $groupEl.removeClass('hidden-by-searchbar');
            }
          });
        }
      }

      if (foundItems.length === 0) {
        if ($notFoundEl) { $notFoundEl.show(); }
        if ($foundEl) { $foundEl.hide(); }
      } else {
        if ($notFoundEl) { $notFoundEl.hide(); }
        if ($foundEl) { $foundEl.show(); }
      }
      if (isVirtualList && sb.virtualList) {
        sb.virtualList.filterItems(foundItems);
      }

      $el.trigger('searchbar:search', query, sb.previousQuery, foundItems);
      sb.emit('local::search searchbarSearch', sb, query, sb.previousQuery, foundItems);

      return sb;
    };

    Searchbar.prototype.init = function init () {
      var sb = this;
      sb.attachEvents();
    };

    Searchbar.prototype.destroy = function destroy () {
      var sb = this;
      sb.emit('local::beforeDestroy searchbarBeforeDestroy', sb);
      sb.$el.trigger('searchbar:beforedestroy', sb);
      sb.detachEvents();
      if (sb.$el[0]) {
        sb.$el[0].f7Searchbar = null;
        delete sb.$el[0].f7Searchbar;
      }
      Utils.deleteProps(sb);
    };

    return Searchbar;
  }(Framework7Class));

  var searchbar = {
    name: 'searchbar',
    static: {
      Searchbar: Searchbar,
    },
    create: function create() {
      var app = this;
      app.searchbar = ConstructorMethods({
        defaultSelector: '.searchbar',
        constructor: Searchbar,
        app: app,
        domProp: 'f7Searchbar',
        addMethods: 'clear enable disable toggle search'.split(' '),
      });
    },
    on: {
      tabMounted: function tabMounted(tabEl) {
        var app = this;
        $(tabEl).find('.searchbar-init').each(function (index, searchbarEl) {
          var $searchbarEl = $(searchbarEl);
          app.searchbar.create(Utils.extend($searchbarEl.dataset(), { el: searchbarEl }));
        });
      },
      tabBeforeRemove: function tabBeforeRemove(tabEl) {
        $(tabEl).find('.searchbar-init').each(function (index, searchbarEl) {
          if (searchbarEl.f7Searchbar && searchbarEl.f7Searchbar.destroy) {
            searchbarEl.f7Searchbar.destroy();
          }
        });
      },
      pageInit: function pageInit(page) {
        var app = this;
        page.$el.find('.searchbar-init').each(function (index, searchbarEl) {
          var $searchbarEl = $(searchbarEl);
          app.searchbar.create(Utils.extend($searchbarEl.dataset(), { el: searchbarEl }));
        });
        if (app.theme === 'ios' && page.view && page.view.router.separateNavbar && page.$navbarEl && page.$navbarEl.length > 0) {
          page.$navbarEl.find('.searchbar-init').each(function (index, searchbarEl) {
            var $searchbarEl = $(searchbarEl);
            app.searchbar.create(Utils.extend($searchbarEl.dataset(), { el: searchbarEl }));
          });
        }
      },
      pageBeforeRemove: function pageBeforeRemove(page) {
        var app = this;
        page.$el.find('.searchbar-init').each(function (index, searchbarEl) {
          if (searchbarEl.f7Searchbar && searchbarEl.f7Searchbar.destroy) {
            searchbarEl.f7Searchbar.destroy();
          }
        });
        if (app.theme === 'ios' && page.view && page.view.router.separateNavbar && page.$navbarEl && page.$navbarEl.length > 0) {
          page.$navbarEl.find('.searchbar-init').each(function (index, searchbarEl) {
            if (searchbarEl.f7Searchbar && searchbarEl.f7Searchbar.destroy) {
              searchbarEl.f7Searchbar.destroy();
            }
          });
        }
      },
    },
    clicks: {
      '.searchbar-clear': function clear($clickedEl, data) {
        if ( data === void 0 ) data = {};

        var app = this;
        var sb = app.searchbar.get(data.searchbar);
        if (sb) { sb.clear(); }
      },
      '.searchbar-enable': function enable($clickedEl, data) {
        if ( data === void 0 ) data = {};

        var app = this;
        var sb = app.searchbar.get(data.searchbar);
        if (sb) { sb.enable(true); }
      },
      '.searchbar-disable': function disable($clickedEl, data) {
        if ( data === void 0 ) data = {};

        var app = this;
        var sb = app.searchbar.get(data.searchbar);
        if (sb) { sb.disable(); }
      },
      '.searchbar-toggle': function toggle($clickedEl, data) {
        if ( data === void 0 ) data = {};

        var app = this;
        var sb = app.searchbar.get(data.searchbar);
        if (sb) { sb.toggle(); }
      },
    },
    vnode: {
      'searchbar-init': {
        insert: function insert(vnode) {
          var app = this;
          var searchbarEl = vnode.elm;
          var $searchbarEl = $(searchbarEl);
          app.searchbar.create(Utils.extend($searchbarEl.dataset(), { el: searchbarEl }));
        },
        destroy: function destroy(vnode) {
          var searchbarEl = vnode.elm;
          if (searchbarEl.f7Searchbar && searchbarEl.f7Searchbar.destroy) {
            searchbarEl.f7Searchbar.destroy();
          }
        },
      },
    },
  };

  return searchbar;
}
framework7ComponentLoader.componentName = 'searchbar';

