
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

  var TouchRipple = function TouchRipple($el, x, y) {
    var ripple = this;
    if (!$el) { return undefined; }
    var box = $el[0].getBoundingClientRect();
    var center = {
      x: x - box.left,
      y: y - box.top,
    };
    var width = box.width;
    var height = box.height;
    var diameter = Math.max((Math.pow( ((Math.pow( height, 2 )) + (Math.pow( width, 2 ))), 0.5 )), 48);

    ripple.$rippleWaveEl = $(("<div class=\"ripple-wave\" style=\"width: " + diameter + "px; height: " + diameter + "px; margin-top:-" + (diameter / 2) + "px; margin-left:-" + (diameter / 2) + "px; left:" + (center.x) + "px; top:" + (center.y) + "px;\"></div>"));

    $el.prepend(ripple.$rippleWaveEl);

    /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */
    // ripple._clientLeft = ripple.$rippleWaveEl[0].clientLeft;
    ripple.rippleTransform = "translate3d(" + (-center.x + (width / 2)) + "px, " + (-center.y + (height / 2)) + "px, 0) scale(1)";

    Utils.nextFrame(function () {
      ripple.$rippleWaveEl.transform(ripple.rippleTransform);
    });

    return ripple;
  };

  TouchRipple.prototype.onRemove = function onRemove () {
    var ripple = this;
    if (ripple.$rippleWaveEl) {
      ripple.$rippleWaveEl.remove();
    }
    Object.keys(ripple).forEach(function (key) {
      ripple[key] = null;
      delete ripple[key];
    });
    ripple = null;
  };

  TouchRipple.prototype.remove = function remove () {
    var ripple = this;
    if (ripple.removing) { return; }
    var $rippleWaveEl = this.$rippleWaveEl;
    var rippleTransform = this.rippleTransform;
    var removeTimeout = Utils.nextTick(function () {
      ripple.onRemove();
    }, 400);
    ripple.removing = true;
    $rippleWaveEl
      .addClass('ripple-wave-fill')
      .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'))
      .transitionEnd(function () {
        clearTimeout(removeTimeout);
        Utils.nextFrame(function () {
          $rippleWaveEl
            .addClass('ripple-wave-out')
            .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'));

          removeTimeout = Utils.nextTick(function () {
            ripple.onRemove();
          }, 700);

          $rippleWaveEl.transitionEnd(function () {
            clearTimeout(removeTimeout);
            ripple.onRemove();
          });
        });
      });
  };

  var touchRipple = {
    name: 'touch-ripple',
    static: {
      TouchRipple: TouchRipple,
    },
    create: function create() {
      var app = this;
      app.touchRipple = {
        create: function create() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          return new (Function.prototype.bind.apply( TouchRipple, [ null ].concat( args) ));
        },
      };
    },
  };

  return touchRipple;
}
framework7ComponentLoader.componentName = 'touchRipple';

