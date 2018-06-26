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

var _ssrWindow = require('ssr-window');

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

var Searchbar = function (_FrameworkClass) {
  _inherits(Searchbar, _FrameworkClass);

  function Searchbar(app) {
    var _ret, _ret2;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Searchbar);

    var _this = _possibleConstructorReturn(this, (Searchbar.__proto__ || Object.getPrototypeOf(Searchbar)).call(this, params, [app]));

    var sb = _this;

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
      expandable: false
    };

    // Extend defaults with modules params
    sb.useModulesParams(defaults);

    sb.params = _utils2.default.extend(defaults, params);

    var $el = (0, _dom2.default)(sb.params.el);
    if ($el.length === 0) return _ret = sb, _possibleConstructorReturn(_this, _ret);

    $el[0].f7Searchbar = sb;

    var $pageEl = void 0;
    var $navbarEl = void 0;
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

    var $foundEl = void 0;
    if (params.foundEl) {
      $foundEl = (0, _dom2.default)(params.foundEl);
    } else if (typeof sb.params.foundEl === 'string' && $pageEl) {
      $foundEl = $pageEl.find(sb.params.foundEl);
    }

    var $notFoundEl = void 0;
    if (params.notFoundEl) {
      $notFoundEl = (0, _dom2.default)(params.notFoundEl);
    } else if (typeof sb.params.notFoundEl === 'string' && $pageEl) {
      $notFoundEl = $pageEl.find(sb.params.notFoundEl);
    }

    var $hideOnEnableEl = void 0;
    if (params.hideOnEnableEl) {
      $hideOnEnableEl = (0, _dom2.default)(params.hideOnEnableEl);
    } else if (typeof sb.params.hideOnEnableEl === 'string' && $pageEl) {
      $hideOnEnableEl = $pageEl.find(sb.params.hideOnEnableEl);
    }

    var $hideOnSearchEl = void 0;
    if (params.hideOnSearchEl) {
      $hideOnSearchEl = (0, _dom2.default)(params.hideOnSearchEl);
    } else if (typeof sb.params.hideOnSearchEl === 'string' && $pageEl) {
      $hideOnSearchEl = $pageEl.find(sb.params.hideOnSearchEl);
    }

    var $backdropEl = void 0;
    if (sb.params.backdrop) {
      if (sb.params.backdropEl) {
        $backdropEl = (0, _dom2.default)(sb.params.backdropEl);
      } else if ($pageEl && $pageEl.length > 0) {
        $backdropEl = $pageEl.find('.searchbar-backdrop');
      } else {
        $backdropEl = $el.siblings('.searchbar-backdrop');
      }
      if ($backdropEl.length === 0) {
        $backdropEl = (0, _dom2.default)('<div class="searchbar-backdrop"></div>');
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

    var $searchContainer = void 0;
    if (sb.params.searchContainer) {
      $searchContainer = (0, _dom2.default)(sb.params.searchContainer);
    }

    var $inputEl = void 0;
    if (sb.params.inputEl) {
      $inputEl = (0, _dom2.default)(sb.params.inputEl);
    } else {
      $inputEl = $el.find('input[type="search"]').eq(0);
    }

    var $disableButtonEl = void 0;
    if (sb.params.disableButton) {
      if (sb.params.disableButtonEl) {
        $disableButtonEl = (0, _dom2.default)(sb.params.disableButtonEl);
      } else {
        $disableButtonEl = $el.find('.searchbar-disable-button');
      }
    }

    _utils2.default.extend(sb, {
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
      expandable: sb.params.expandable || $el.hasClass('searchbar-expandable')
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
      if (sb.$searchContainer && sb.$searchContainer.length > 0 && (sb.params.searchIn || sb.isVirtualList || sb.params.searchIn === sb.params.searchItem) || sb.params.customSearch) {
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
      if (!sb || sb && !sb.$el) return;
      if (sb.enabled) {
        sb.$el.removeClass('searchbar-enabled');
      }
    }
    function onPageBeforeIn() {
      if (!sb || sb && !sb.$el) return;
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

    return _ret2 = sb, _possibleConstructorReturn(_this, _ret2);
  }

  _createClass(Searchbar, [{
    key: 'clear',
    value: function clear(e) {
      var sb = this;
      if (!sb.query && e && (0, _dom2.default)(e.target).hasClass('searchbar-clear')) {
        sb.disable();
        return sb;
      }
      var previousQuery = sb.value;
      sb.$inputEl.val('').trigger('change').focus();
      sb.$el.trigger('searchbar:clear', previousQuery);
      sb.emit('local::clear searchbarClear', sb, previousQuery);
      return sb;
    }
  }, {
    key: 'setDisableButtonMargin',
    value: function setDisableButtonMargin() {
      var sb = this;
      if (sb.expandable) return;
      var app = sb.app;
      sb.$disableButtonEl.transition(0).show();
      sb.$disableButtonEl.css('margin-' + (app.rtl ? 'left' : 'right'), -sb.disableButtonEl.offsetWidth + 'px');
      /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */
      sb._clientLeft = sb.$disableButtonEl[0].clientLeft;
      sb.$disableButtonEl.transition('');
      sb.disableButtonHasMargin = true;
    }
  }, {
    key: 'enable',
    value: function enable(setFocus) {
      var sb = this;
      if (sb.enabled) return sb;
      var app = sb.app;
      sb.enabled = true;
      function enable() {
        if (sb.$backdropEl && (sb.$searchContainer && sb.$searchContainer.length || sb.params.customSearch) && !sb.$el.hasClass('searchbar-enabled') && !sb.query) {
          sb.backdropShow();
        }
        sb.$el.addClass('searchbar-enabled');
        if (!sb.expandable && sb.$disableButtonEl && sb.$disableButtonEl.length > 0 && app.theme === 'ios') {
          if (!sb.disableButtonHasMargin) {
            sb.setDisableButtonMargin();
          }
          sb.$disableButtonEl.css('margin-' + (app.rtl ? 'left' : 'right'), '0px');
        }
        if (sb.$hideOnEnableEl) sb.$hideOnEnableEl.addClass('hidden-by-searchbar');
        sb.$el.trigger('searchbar:enable');
        sb.emit('local::enable searchbarEnable', sb);
      }
      var needsFocus = false;
      if (setFocus === true) {
        if (_ssrWindow.document.activeElement !== sb.inputEl) {
          needsFocus = true;
        }
      }
      var isIos = app.device.ios && app.theme === 'ios';
      if (isIos) {
        if (sb.expandable) {
          if (needsFocus) sb.$inputEl.focus();
          enable();
        } else {
          if (needsFocus) sb.$inputEl.focus();
          if (setFocus && (setFocus.type === 'focus' || setFocus === true)) {
            _utils2.default.nextTick(function () {
              enable();
            }, 400);
          } else {
            enable();
          }
        }
      } else {
        if (needsFocus) sb.$inputEl.focus();
        if (app.theme === 'md' && sb.expandable) {
          sb.$el.parents('.page, .view, .navbar-inner').scrollLeft(0);
        }
        enable();
      }
      return sb;
    }
  }, {
    key: 'disable',
    value: function disable() {
      var sb = this;
      if (!sb.enabled) return sb;
      var app = sb.app;
      sb.$inputEl.val('').trigger('change');
      sb.$el.removeClass('searchbar-enabled');
      sb.$el.removeClass('searchbar-focused');
      if (!sb.expandable && sb.$disableButtonEl && sb.$disableButtonEl.length > 0 && app.theme === 'ios') {
        sb.$disableButtonEl.css('margin-' + (app.rtl ? 'left' : 'right'), -sb.disableButtonEl.offsetWidth + 'px');
      }

      if (sb.$backdropEl && (sb.$searchContainer && sb.$searchContainer.length || sb.params.customSearch)) {
        sb.backdropHide();
      }

      sb.enabled = false;

      sb.$inputEl.blur();

      if (sb.$hideOnEnableEl) sb.$hideOnEnableEl.removeClass('hidden-by-searchbar');

      sb.$el.trigger('searchbar:disable');
      sb.emit('local::disable searchbarDisable', sb);
      return sb;
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      var sb = this;
      if (sb.enabled) sb.disable();else sb.enable(true);
      return sb;
    }
  }, {
    key: 'backdropShow',
    value: function backdropShow() {
      var sb = this;
      if (sb.$backdropEl) {
        sb.$backdropEl.addClass('searchbar-backdrop-in');
      }
      return sb;
    }
  }, {
    key: 'backdropHide',
    value: function backdropHide() {
      var sb = this;
      if (sb.$backdropEl) {
        sb.$backdropEl.removeClass('searchbar-backdrop-in');
      }
      return sb;
    }
  }, {
    key: 'search',
    value: function search(query, internal) {
      var sb = this;
      if (sb.previousQuery && query.trim() === sb.previousQuery) return sb;
      if (typeof sb.previousQuery !== 'undefined' && sb.previousQuery.trim() === '' && query.trim() === '') return sb;
      sb.previousQuery = query.trim();

      if (!internal) {
        if (!sb.enabled) {
          sb.enable();
        }
        sb.$inputEl.val(query);
      }
      sb.query = query;
      sb.value = query;

      var $searchContainer = sb.$searchContainer,
          $el = sb.$el,
          $foundEl = sb.$foundEl,
          $notFoundEl = sb.$notFoundEl,
          $hideOnSearchEl = sb.$hideOnSearchEl,
          isVirtualList = sb.isVirtualList;

      // Hide on search element

      if (query.length > 0 && $hideOnSearchEl) {
        $hideOnSearchEl.addClass('hidden-by-searchbar');
      } else if ($hideOnSearchEl) {
        $hideOnSearchEl.removeClass('hidden-by-searchbar');
      }
      // Add active/inactive classes on overlay
      if ($searchContainer && $searchContainer.length && $el.hasClass('searchbar-enabled') || sb.params.customSearch && $el.hasClass('searchbar-enabled')) {
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
      var vlQuery = void 0;
      if (isVirtualList) {
        sb.virtualList = $searchContainer[0].f7VirtualList;
        if (query.trim() === '') {
          sb.virtualList.resetFilter();
          if ($notFoundEl) $notFoundEl.hide();
          if ($foundEl) $foundEl.show();
          return sb;
        }
        vlQuery = sb.params.removeDiacritics ? _utils2.default.removeDiacritics(query) : query;
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
        var values = void 0;
        if (sb.params.removeDiacritics) values = _utils2.default.removeDiacritics(query.trim().toLowerCase()).split(' ');else {
          values = query.trim().toLowerCase().split(' ');
        }
        $searchContainer.find(sb.params.searchItem).removeClass('hidden-by-searchbar').each(function (itemIndex, itemEl) {
          var $itemEl = (0, _dom2.default)(itemEl);
          var compareWithText = [];
          var $searchIn = sb.params.searchIn ? $itemEl.find(sb.params.searchIn) : $itemEl;
          if (sb.params.searchIn === sb.params.searchItem) {
            $searchIn = $itemEl;
          }
          $searchIn.each(function (searchInIndex, searchInEl) {
            var itemText = (0, _dom2.default)(searchInEl).text().trim().toLowerCase();
            if (sb.params.removeDiacritics) itemText = _utils2.default.removeDiacritics(itemText);
            compareWithText.push(itemText);
          });
          compareWithText = compareWithText.join(' ');
          var wordsMatch = 0;
          for (var _i = 0; _i < values.length; _i += 1) {
            if (compareWithText.indexOf(values[_i]) >= 0) wordsMatch += 1;
          }
          if (wordsMatch !== values.length && !(sb.params.ignore && $itemEl.is(sb.params.ignore))) {
            $itemEl.addClass('hidden-by-searchbar');
          } else {
            foundItems.push($itemEl[0]);
          }
        });

        if (sb.params.hideDividers) {
          $searchContainer.find('.item-divider, .list-group-title').each(function (titleIndex, titleEl) {
            var $titleEl = (0, _dom2.default)(titleEl);
            var $nextElements = $titleEl.nextAll('li');
            var hide = true;
            for (var _i2 = 0; _i2 < $nextElements.length; _i2 += 1) {
              var $nextEl = $nextElements.eq(_i2);
              if ($nextEl.hasClass('list-group-title') || $nextEl.hasClass('item-divider')) break;
              if (!$nextEl.hasClass('hidden-by-searchbar')) {
                hide = false;
              }
            }
            var ignore = sb.params.ignore && $titleEl.is(sb.params.ignore);
            if (hide && !ignore) $titleEl.addClass('hidden-by-searchbar');else $titleEl.removeClass('hidden-by-searchbar');
          });
        }
        if (sb.params.hideGroups) {
          $searchContainer.find('.list-group').each(function (groupIndex, groupEl) {
            var $groupEl = (0, _dom2.default)(groupEl);
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
        if ($notFoundEl) $notFoundEl.show();
        if ($foundEl) $foundEl.hide();
      } else {
        if ($notFoundEl) $notFoundEl.hide();
        if ($foundEl) $foundEl.show();
      }
      if (isVirtualList && sb.virtualList) {
        sb.virtualList.filterItems(foundItems);
      }

      $el.trigger('searchbar:search', query, sb.previousQuery, foundItems);
      sb.emit('local::search searchbarSearch', sb, query, sb.previousQuery, foundItems);

      return sb;
    }
  }, {
    key: 'init',
    value: function init() {
      var sb = this;
      sb.attachEvents();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var sb = this;
      sb.emit('local::beforeDestroy searchbarBeforeDestroy', sb);
      sb.$el.trigger('searchbar:beforedestroy', sb);
      sb.detachEvents();
      delete sb.$el.f7Searchbar;
      _utils2.default.deleteProps(sb);
    }
  }]);

  return Searchbar;
}(_class2.default);

exports.default = Searchbar;