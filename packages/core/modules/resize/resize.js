'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ssrWindow = require('ssr-window');

exports.default = {
  name: 'resize',
  instance: {
    getSize: function getSize() {
      var app = this;
      if (!app.root[0]) return { width: 0, height: 0, left: 0, top: 0 };
      var offset = app.root.offset();
      var _ref = [app.root[0].offsetWidth, app.root[0].offsetHeight, offset.left, offset.top],
          width = _ref[0],
          height = _ref[1],
          left = _ref[2],
          top = _ref[3];

      app.width = width;
      app.height = height;
      app.left = left;
      app.top = top;
      return { width: width, height: height, left: left, top: top };
    }
  },
  on: {
    init: function init() {
      var app = this;

      // Get Size
      app.getSize();

      // Emit resize
      _ssrWindow.window.addEventListener('resize', function () {
        app.emit('resize');
      }, false);

      // Emit orientationchange
      _ssrWindow.window.addEventListener('orientationchange', function () {
        app.emit('orientationchange');
      });
    },
    orientationchange: function orientationchange() {
      var app = this;
      if (app.device && app.device.minimalUi) {
        if (_ssrWindow.window.orientation === 90 || _ssrWindow.window.orientation === -90) {
          _ssrWindow.document.body.scrollTop = 0;
        }
      }
      // Fix iPad weird body scroll
      if (app.device.ipad) {
        _ssrWindow.document.body.scrollLeft = 0;
        setTimeout(function () {
          _ssrWindow.document.body.scrollLeft = 0;
        }, 0);
      }
    },
    resize: function resize() {
      var app = this;
      app.getSize();
    }
  }
};