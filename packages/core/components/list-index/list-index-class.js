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

var ListIndex = function (_Framework7Class) {
  _inherits(ListIndex, _Framework7Class);

  function ListIndex(app) {
    var _ret3;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ListIndex);

    var _this = _possibleConstructorReturn(this, (ListIndex.__proto__ || Object.getPrototypeOf(ListIndex)).call(this, params, [app]));

    var index = _this;

    var defaults = {
      el: null, // where to render indexes
      listEl: null, // list el to generate indexes
      indexes: 'auto', // or array of indexes
      iosItemHeight: 14,
      mdItemHeight: 14,
      scrollList: true,
      label: false,
      // eslint-disable-next-line
      renderItem: function renderItem(itemContent, itemIndex) {
        return ('\n          <li>' + itemContent + '</li>\n        ').trim();
      },
      renderSkipPlaceholder: function renderSkipPlaceholder() {
        return '<li class="list-index-skip-placeholder"></li>';
      },

      on: {}
    };

    // Extend defaults with modules params
    index.useModulesParams(defaults);

    index.params = _utils2.default.extend(defaults, params);

    var $el = void 0;
    var $listEl = void 0;
    var $pageContentEl = void 0;
    var $ul = void 0;

    if (index.params.el) {
      $el = (0, _dom2.default)(index.params.el);
    } else {
      var _ret;

      return _ret = index, _possibleConstructorReturn(_this, _ret);
    }

    $ul = $el.find('ul');
    if ($ul.length === 0) {
      $ul = (0, _dom2.default)('<ul></ul>');
      $el.append($ul);
    }

    if (index.params.listEl) {
      $listEl = (0, _dom2.default)(index.params.listEl);
    }

    if (index.params.indexes === 'auto' && !$listEl) {
      var _ret2;

      return _ret2 = index, _possibleConstructorReturn(_this, _ret2);
    }

    if ($listEl) {
      $pageContentEl = $listEl.parents('.page-content').eq(0);
    } else {
      $pageContentEl = $el.siblings('.page-content').eq(0);
      if ($pageContentEl.length === 0) {
        $pageContentEl = $el.parents('.page').eq(0).find('.page-content').eq(0);
      }
    }

    $el[0].f7ListIndex = index;

    _utils2.default.extend(index, {
      app: app,
      $el: $el,
      el: $el && $el[0],
      $ul: $ul,
      ul: $ul && $ul[0],
      $listEl: $listEl,
      listEl: $listEl && $listEl[0],
      $pageContentEl: $pageContentEl,
      pageContentEl: $pageContentEl && $pageContentEl[0],
      indexes: params.indexes,
      height: 0,
      skipRate: 0
    });

    // Install Modules
    index.useModules();

    // Attach events
    function handleResize() {
      var height = { index: index };
      index.calcSize();
      if (height !== index.height) {
        index.render();
      }
    }

    function handleClick(e) {
      var $clickedLi = (0, _dom2.default)(e.target).closest('li');
      if (!$clickedLi.length) return;

      var itemIndex = $clickedLi.index();
      if (index.skipRate > 0) {
        var percentage = itemIndex / ($clickedLi.siblings('li').length - 1);
        itemIndex = Math.round((index.indexes.length - 1) * percentage);
      }
      var itemContent = index.indexes[itemIndex];

      index.$el.trigger('listindex:click', itemContent, itemIndex);
      index.emit('local::click listIndexClick', index, itemContent, itemIndex);
      index.$el.trigger('listindex:select', itemContent, itemIndex);
      index.emit('local::select listIndexSelect', index, itemContent, itemIndex);

      if (index.$listEl && index.params.scrollList) {
        index.scrollListToIndex(itemContent, itemIndex);
      }
    }

    var touchesStart = {};
    var isTouched = void 0;
    var isMoved = void 0;
    var topPoint = void 0;
    var bottomPoint = void 0;
    var $labelEl = void 0;
    var previousIndex = null;
    function handleTouchStart(e) {
      var $children = $ul.children();
      if (!$children.length) return;
      topPoint = $children[0].getBoundingClientRect().top;
      bottomPoint = $children[$children.length - 1].getBoundingClientRect().top + $children[0].offsetHeight;

      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      isTouched = true;
      isMoved = false;
      previousIndex = null;
    }
    function handleTouchMove(e) {
      if (!isTouched) return;
      if (!isMoved && index.params.label) {
        $labelEl = (0, _dom2.default)('<span class="list-index-label"></span>');
        $el.append($labelEl);
      }
      isMoved = true;
      var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      e.preventDefault();

      var percentage = (pageY - topPoint) / (bottomPoint - topPoint);
      percentage = Math.min(Math.max(percentage, 0), 1);

      var itemIndex = Math.round((index.indexes.length - 1) * percentage);
      var itemContent = index.indexes[itemIndex];

      var ulHeight = bottomPoint - topPoint;
      var bubbleBottom = (index.height - ulHeight) / 2 + (1 - percentage) * ulHeight;

      if (itemIndex !== previousIndex) {
        if (index.params.label) {
          $labelEl.html(itemContent).transform('translateY(-' + bubbleBottom + 'px)');
        }

        if (index.$listEl && index.params.scrollList) {
          index.scrollListToIndex(itemContent, itemIndex);
        }
      }

      previousIndex = itemIndex;

      index.$el.trigger('listindex:select', index);
      index.emit('local::select listIndexSelect', index, itemContent, itemIndex);
    }
    function handleTouchEnd() {
      if (!isTouched) return;
      isTouched = false;
      isMoved = false;
      if (index.params.label) {
        if ($labelEl) $labelEl.remove();
        $labelEl = undefined;
      }
    }
    var passiveListener = app.support.passiveListener ? { passive: true } : false;
    index.attachEvents = function attachEvents() {
      $el.parents('.tab').on('tab:show', handleResize);
      $el.parents('.page').on('page:reinit', handleResize);
      $el.parents('.panel').on('panel:open', handleResize);
      $el.parents('.sheet-modal, .actions-modal, .popup, .popover, .login-screen, .dialog, .toast').on('modal:open', handleResize);
      app.on('resize', handleResize);

      $el.on('click', handleClick);
      $el.on(app.touchEvents.start, handleTouchStart, passiveListener);
      app.on('touchmove:active', handleTouchMove);
      app.on('touchend:passive', handleTouchEnd);
    };
    index.detachEvents = function attachEvents() {
      $el.parents('.tab').off('tab:show', handleResize);
      $el.parents('.page').off('page:reinit', handleResize);
      $el.parents('.panel').off('panel:open', handleResize);
      $el.parents('.sheet-modal, .actions-modal, .popup, .popover, .login-screen, .dialog, .toast').off('modal:open', handleResize);
      app.off('resize', handleResize);

      $el.off('click', handleClick);
      $el.off(app.touchEvents.start, handleTouchStart, passiveListener);
      app.off('touchmove:active', handleTouchMove);
      app.off('touchend:passive', handleTouchEnd);
    };
    // Init
    index.init();

    return _ret3 = index, _possibleConstructorReturn(_this, _ret3);
  }
  // eslint-disable-next-line


  _createClass(ListIndex, [{
    key: 'scrollListToIndex',
    value: function scrollListToIndex(itemContent, itemIndex) {
      var index = this;
      var $listEl = index.$listEl,
          $pageContentEl = index.$pageContentEl;

      if (!$listEl || !$pageContentEl || $pageContentEl.length === 0) return index;

      var $scrollToEl = void 0;
      $listEl.find('.list-group-title, .item-divider').each(function (elIndex, el) {
        if ($scrollToEl) return;
        var $el = (0, _dom2.default)(el);
        if ($el.text() === itemContent) {
          $scrollToEl = $el;
        }
      });
      if (!$scrollToEl || $scrollToEl.length === 0) return index;

      var parentTop = $scrollToEl.parent().offset().top;
      var paddingTop = parseInt($pageContentEl.css('padding-top'), 10);
      var scrollTop = $pageContentEl[0].scrollTop;
      var scrollToElTop = $scrollToEl.offset().top;

      if (parentTop <= paddingTop) {
        $pageContentEl.scrollTop(parentTop + scrollTop - paddingTop);
      } else {
        $pageContentEl.scrollTop(scrollToElTop + scrollTop - paddingTop);
      }
      return index;
    }
  }, {
    key: 'renderSkipPlaceholder',
    value: function renderSkipPlaceholder() {
      var index = this;
      return index.params.renderSkipPlaceholder.call(index);
    }
  }, {
    key: 'renderItem',
    value: function renderItem(itemContent, itemIndex) {
      var index = this;
      return index.params.renderItem.call(index, itemContent, itemIndex);
    }
  }, {
    key: 'render',
    value: function render() {
      var index = this;
      var $ul = index.$ul,
          indexes = index.indexes,
          skipRate = index.skipRate;

      var wasSkipped = void 0;

      var html = indexes.map(function (itemContent, itemIndex) {
        if (itemIndex % skipRate !== 0 && skipRate > 0) {
          wasSkipped = true;
          return '';
        }
        var itemHtml = index.renderItem(itemContent, itemIndex);
        if (wasSkipped) {
          itemHtml = index.renderSkipPlaceholder() + itemHtml;
        }
        wasSkipped = false;
        return itemHtml;
      }).join('');

      $ul.html(html);

      return index;
    }
  }, {
    key: 'calcSize',
    value: function calcSize() {
      var index = this;
      var app = index.app,
          params = index.params,
          el = index.el,
          indexes = index.indexes;

      var height = el.offsetHeight;
      var itemHeight = app.theme === 'ios' ? params.iosItemHeight : params.mdItemHeight;
      var maxItems = Math.floor(height / itemHeight);
      var items = indexes.length;
      var skipRate = 0;
      if (items > maxItems) {
        skipRate = Math.ceil((items * 2 - 1) / maxItems);
      }

      index.height = height;
      index.skipRate = skipRate;

      return index;
    }
  }, {
    key: 'calcIndexes',
    value: function calcIndexes() {
      var index = this;
      if (index.params.indexes === 'auto') {
        index.indexes = [];

        index.$listEl.find('.list-group-title, .item-divider').each(function (elIndex, el) {
          var elContent = (0, _dom2.default)(el).text();
          if (index.indexes.indexOf(elContent) < 0) {
            index.indexes.push(elContent);
          }
        });
      } else {
        index.indexes = index.params.indexes;
      }
      return index;
    }
  }, {
    key: 'update',
    value: function update() {
      var index = this;
      index.calcIndexes();
      index.calcSize();
      index.render();

      return index;
    }
  }, {
    key: 'init',
    value: function init() {
      var index = this;
      index.calcIndexes();
      index.calcSize();
      index.render();
      index.attachEvents();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var index = this;
      index.$el.trigger('listindex:beforedestroy', index);
      index.emit('local::beforeDestroy listIndexBeforeDestroy', index);
      index.detachEvents();
      index.$el[0].f7ListIndex = null;
      delete index.$el[0].f7ListIndex;
      _utils2.default.deleteProps(index);
      index = null;
    }
  }]);

  return ListIndex;
}(_class2.default);

exports.default = ListIndex;