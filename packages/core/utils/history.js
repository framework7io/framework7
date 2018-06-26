'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ssrWindow = require('ssr-window');

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var History = {
  queue: [],
  clearQueue: function clearQueue() {
    if (History.queue.length === 0) return;
    var currentQueue = History.queue.shift();
    currentQueue();
  },

  routerQueue: [],
  clearRouterQueue: function clearRouterQueue() {
    if (History.routerQueue.length === 0) return;
    var currentQueue = History.routerQueue.pop();
    var router = currentQueue.router,
        stateUrl = currentQueue.stateUrl,
        action = currentQueue.action;


    var animate = router.params.animate;
    if (router.params.pushStateAnimate === false) animate = false;

    if (action === 'back') {
      router.back({ animate: animate, pushState: false });
    }
    if (action === 'load') {
      router.navigate(stateUrl, { animate: animate, pushState: false });
    }
  },
  handle: function handle(e) {
    if (History.blockPopstate) return;
    var app = this;
    // const mainView = app.views.main;
    var state = e.state;
    History.previousState = History.state;
    History.state = state;

    History.allowChange = true;
    History.clearQueue();

    state = History.state;
    if (!state) state = {};

    app.views.forEach(function (view) {
      var router = view.router;
      var viewState = state[view.id];
      if (!viewState && view.params.pushState) {
        viewState = {
          url: view.router.history[0]
        };
      }
      if (!viewState) return;
      var stateUrl = viewState.url || undefined;

      var animate = router.params.animate;
      if (router.params.pushStateAnimate === false) animate = false;

      if (stateUrl !== router.url) {
        if (router.history.indexOf(stateUrl) >= 0) {
          // Go Back
          if (router.allowPageChange) {
            router.back({ animate: animate, pushState: false });
          } else {
            History.routerQueue.push({
              action: 'back',
              router: router
            });
          }
        } else if (router.allowPageChange) {
          // Load page
          router.navigate(stateUrl, { animate: animate, pushState: false });
        } else {
          History.routerQueue.unshift({
            action: 'load',
            stateUrl: stateUrl,
            router: router
          });
        }
      }
    });
  },
  initViewState: function initViewState(viewId, viewState) {
    var newState = _utils2.default.extend({}, History.state || {}, _defineProperty({}, viewId, viewState));
    History.state = newState;
    _ssrWindow.window.history.replaceState(newState, '');
  },
  push: function push(viewId, viewState, url) {
    if (!History.allowChange) {
      History.queue.push(function () {
        History.push(viewId, viewState, url);
      });
      return;
    }
    History.previousState = History.state;
    var newState = _utils2.default.extend({}, History.previousState || {}, _defineProperty({}, viewId, viewState));
    History.state = newState;
    _ssrWindow.window.history.pushState(newState, '', url);
  },
  replace: function replace(viewId, viewState, url) {
    if (!History.allowChange) {
      History.queue.push(function () {
        History.replace(viewId, viewState, url);
      });
      return;
    }
    History.previousState = History.state;
    var newState = _utils2.default.extend({}, History.previousState || {}, _defineProperty({}, viewId, viewState));
    History.state = newState;
    _ssrWindow.window.history.replaceState(newState, '', url);
  },
  go: function go(index) {
    History.allowChange = false;
    _ssrWindow.window.history.go(index);
  },
  back: function back() {
    History.allowChange = false;
    _ssrWindow.window.history.back();
  },

  allowChange: true,
  previousState: {},
  state: _ssrWindow.window.history.state,
  blockPopstate: true,
  init: function init(app) {
    (0, _dom2.default)(_ssrWindow.window).on('load', function () {
      setTimeout(function () {
        History.blockPopstate = false;
      }, 0);
    });

    if (_ssrWindow.document.readyState && _ssrWindow.document.readyState === 'complete') {
      History.blockPopstate = false;
    }

    (0, _dom2.default)(_ssrWindow.window).on('popstate', History.handle.bind(app));
  }
};

exports.default = History;