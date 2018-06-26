'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TouchRipple = function () {
  function TouchRipple($el, x, y) {
    _classCallCheck(this, TouchRipple);

    var ripple = this;
    if (!$el) return undefined;
    var box = $el[0].getBoundingClientRect();
    var center = {
      x: x - box.left,
      y: y - box.top
    };
    var width = box.width;
    var height = box.height;
    var diameter = Math.max((height ** 2 + width ** 2) ** 0.5, 48);

    ripple.$rippleWaveEl = (0, _dom2.default)('<div class="ripple-wave" style="width: ' + diameter + 'px; height: ' + diameter + 'px; margin-top:-' + diameter / 2 + 'px; margin-left:-' + diameter / 2 + 'px; left:' + center.x + 'px; top:' + center.y + 'px;"></div>');

    $el.prepend(ripple.$rippleWaveEl);

    /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */
    ripple._clientLeft = ripple.$rippleWaveEl[0].clientLeft;

    ripple.rippleTransform = 'translate3d(' + (-center.x + width / 2) + 'px, ' + (-center.y + height / 2) + 'px, 0) scale(1)';

    ripple.$rippleWaveEl.transform(ripple.rippleTransform);

    return ripple;
  }

  _createClass(TouchRipple, [{
    key: 'onRemove',
    value: function onRemove() {
      var ripple = this;
      if (ripple.$rippleWaveEl) {
        ripple.$rippleWaveEl.remove();
      }
      Object.keys(ripple).forEach(function (key) {
        ripple[key] = null;
        delete ripple[key];
      });
      ripple = null;
    }
  }, {
    key: 'remove',
    value: function remove() {
      var ripple = this;
      if (ripple.removing) return;
      var $rippleWaveEl = this.$rippleWaveEl;
      var rippleTransform = this.rippleTransform;
      var removeTimeout = _utils2.default.nextTick(function () {
        ripple.onRemove();
      }, 400);
      ripple.removing = true;
      $rippleWaveEl.addClass('ripple-wave-fill').transform(rippleTransform.replace('scale(1)', 'scale(1.01)')).transitionEnd(function () {
        clearTimeout(removeTimeout);
        _utils2.default.nextFrame(function () {
          $rippleWaveEl.addClass('ripple-wave-out').transform(rippleTransform.replace('scale(1)', 'scale(1.01)'));

          removeTimeout = _utils2.default.nextTick(function () {
            ripple.onRemove();
          }, 700);

          $rippleWaveEl.transitionEnd(function () {
            clearTimeout(removeTimeout);
            ripple.onRemove();
          });
        });
      });
    }
  }]);

  return TouchRipple;
}();

exports.default = TouchRipple;