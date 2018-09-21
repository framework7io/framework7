
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

  var Progressbar = {
    set: function set() {
      var assign;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var app = this;
      var el = args[0];
      var progress = args[1];
      var duration = args[2];
      if (typeof args[0] === 'number') {
        (assign = args, progress = assign[0], duration = assign[1]);
        el = app.root;
      }
      if (typeof progress === 'undefined' || progress === null) { return el; }
      if (!progress) { progress = 0; }

      var $el = $(el || app.root);
      if ($el.length === 0) {
        return el;
      }
      var progressNormalized = Math.min(Math.max(progress, 0), 100);
      var $progressbarEl;
      if ($el.hasClass('progressbar')) { $progressbarEl = $el.eq(0); }
      else {
        $progressbarEl = $el.children('.progressbar');
      }
      if ($progressbarEl.length === 0 || $progressbarEl.hasClass('progressbar-infinite')) {
        return $progressbarEl;
      }
      var $progressbarLine = $progressbarEl.children('span');
      if ($progressbarLine.length === 0) {
        $progressbarLine = $('<span></span>');
        $progressbarEl.append($progressbarLine);
      }
      $progressbarLine
        .transition(typeof duration !== 'undefined' ? duration : '')
        .transform(("translate3d(" + ((-100 + progressNormalized)) + "%,0,0)"));

      return $progressbarEl[0];
    },
    show: function show() {
      var assign, assign$1;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var app = this;

      // '.page', 50, 'multi'
      var el = args[0];
      var progress = args[1];
      var color = args[2];
      var type = 'determined';

      if (args.length === 2) {
        if ((typeof args[0] === 'string' || typeof args[0] === 'object') && typeof args[1] === 'string') {
          // '.page', 'multi'
          (assign = args, el = assign[0], color = assign[1], progress = assign[2]);
          type = 'infinite';
        } else if (typeof args[0] === 'number' && typeof args[1] === 'string') {
          // 50, 'multi'
          (assign$1 = args, progress = assign$1[0], color = assign$1[1]);
          el = app.root;
        }
      } else if (args.length === 1) {
        if (typeof args[0] === 'number') {
          el = app.root;
          progress = args[0];
        } else if (typeof args[0] === 'string') {
          type = 'infinite';
          el = app.root;
          color = args[0];
        }
      } else if (args.length === 0) {
        type = 'infinite';
        el = app.root;
      }

      var $el = $(el);
      if ($el.length === 0) { return undefined; }

      var $progressbarEl;
      if ($el.hasClass('progressbar') || $el.hasClass('progressbar-infinite')) {
        $progressbarEl = $el;
      } else {
        $progressbarEl = $el.children('.progressbar:not(.progressbar-out), .progressbar-infinite:not(.progressbar-out)');
        if ($progressbarEl.length === 0) {
          $progressbarEl = $(("\n          <span class=\"progressbar" + (type === 'infinite' ? '-infinite' : '') + (color ? (" color-" + color) : '') + " progressbar-in\">\n            " + (type === 'infinite' ? '' : '<span></span>') + "\n          </span>"));
          $el.append($progressbarEl);
        }
      }

      if (typeof progress !== 'undefined') {
        app.progressbar.set($progressbarEl, progress);
      }

      return $progressbarEl[0];
    },
    hide: function hide(el, removeAfterHide) {
      if ( removeAfterHide === void 0 ) removeAfterHide = true;

      var app = this;
      var $el = $(el || app.root);
      if ($el.length === 0) { return undefined; }
      var $progressbarEl;
      if ($el.hasClass('progressbar') || $el.hasClass('progressbar-infinite')) {
        $progressbarEl = $el;
      } else {
        $progressbarEl = $el.children('.progressbar, .progressbar-infinite');
      }
      if ($progressbarEl.length === 0 || !$progressbarEl.hasClass('progressbar-in') || $progressbarEl.hasClass('progressbar-out')) {
        return $progressbarEl;
      }
      $progressbarEl
        .removeClass('progressbar-in')
        .addClass('progressbar-out')
        .animationEnd(function () {
          if (removeAfterHide) {
            $progressbarEl.remove();
          }
        });
      return $progressbarEl;
    },
  };

  var progressbar = {
    name: 'progressbar',
    create: function create() {
      var app = this;
      Utils.extend(app, {
        progressbar: {
          set: Progressbar.set.bind(app),
          show: Progressbar.show.bind(app),
          hide: Progressbar.hide.bind(app),
        },
      });
    },
    on: {
      pageInit: function pageInit(page) {
        var app = this;
        page.$el.find('.progressbar').each(function (index, progressbarEl) {
          var $progressbarEl = $(progressbarEl);
          app.progressbar.set($progressbarEl, $progressbarEl.attr('data-progress'));
        });
      },
    },
  };

  return progressbar;
}
framework7ComponentLoader.componentName = 'progressbar';

