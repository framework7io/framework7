'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ssrWindow = require('ssr-window');

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _support = require('../../utils/support');

var _support2 = _interopRequireDefault(_support);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Observer = {
  func: _ssrWindow.window.MutationObserver || _ssrWindow.window.WebkitMutationObserver,
  attach: function attach(target) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var swiper = this;

    var ObserverFunc = Observer.func;
    var observer = new ObserverFunc(function (mutations) {
      mutations.forEach(function (mutation) {
        swiper.emit('observerUpdate', mutation);
      });
    });

    observer.observe(target, {
      attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
      childList: typeof options.childList === 'undefined' ? true : options.childList,
      characterData: typeof options.characterData === 'undefined' ? true : options.characterData
    });

    swiper.observer.observers.push(observer);
  },
  init: function init() {
    var swiper = this;
    if (!_support2.default.observer || !swiper.params.observer) return;
    if (swiper.params.observeParents) {
      var containerParents = swiper.$el.parents();
      for (var i = 0; i < containerParents.length; i += 1) {
        swiper.observer.attach(containerParents[i]);
      }
    }
    // Observe container
    swiper.observer.attach(swiper.$el[0], { childList: false });

    // Observe wrapper
    swiper.observer.attach(swiper.$wrapperEl[0], { attributes: false });
  },
  destroy: function destroy() {
    var swiper = this;
    swiper.observer.observers.forEach(function (observer) {
      observer.disconnect();
    });
    swiper.observer.observers = [];
  }
};

exports.default = {
  name: 'observer',
  params: {
    observer: false,
    observeParents: false
  },
  create: function create() {
    var swiper = this;
    _utils2.default.extend(swiper, {
      observer: {
        init: Observer.init.bind(swiper),
        attach: Observer.attach.bind(swiper),
        destroy: Observer.destroy.bind(swiper),
        observers: []
      }
    });
  },

  on: {
    init: function init() {
      var swiper = this;
      swiper.observer.init();
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.observer.destroy();
    }
  }
};