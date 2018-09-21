
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

  var Preloader = {
    init: function init(el) {
      var app = this;
      if (app.theme !== 'md') { return; }
      var $el = $(el);
      if ($el.length === 0 || $el.children('.preloader-inner').length > 0) { return; }
      $el.append(Utils.mdPreloaderContent);
    },
    // Modal
    visible: false,
    show: function show(color) {
      if ( color === void 0 ) color = 'white';

      var app = this;
      if (Preloader.visible) { return; }
      var preloaderInner = app.theme !== 'md' ? '' : Utils.mdPreloaderContent;
      $('html').addClass('with-modal-preloader');
      app.root.append(("\n      <div class=\"preloader-backdrop\"></div>\n      <div class=\"preloader-modal\">\n        <div class=\"preloader color-" + color + "\">" + preloaderInner + "</div>\n      </div>\n    "));
      Preloader.visible = true;
    },
    hide: function hide() {
      var app = this;
      if (!Preloader.visible) { return; }
      $('html').removeClass('with-modal-preloader');
      app.root.find('.preloader-backdrop, .preloader-modal').remove();
      Preloader.visible = false;
    },
  };
  var preloader = {
    name: 'preloader',
    create: function create() {
      var app = this;
      Utils.extend(app, {
        preloader: {
          init: Preloader.init.bind(app),
          show: Preloader.show.bind(app),
          hide: Preloader.hide.bind(app),
        },
      });
    },
    on: {
      photoBrowserOpen: function photoBrowserOpen(pb) {
        var app = this;
        if (app.theme !== 'md') { return; }
        pb.$el.find('.preloader').each(function (index, preloaderEl) {
          app.preloader.init(preloaderEl);
        });
      },
      pageInit: function pageInit(page) {
        var app = this;
        if (app.theme !== 'md') { return; }
        page.$el.find('.preloader').each(function (index, preloaderEl) {
          app.preloader.init(preloaderEl);
        });
      },
    },
    vnode: {
      preloader: {
        insert: function insert(vnode) {
          var app = this;
          var preloaderEl = vnode.elm;
          if (app.theme !== 'md') { return; }
          app.preloader.init(preloaderEl);
        },
      },
    },
  };

  return preloader;
}
framework7ComponentLoader.componentName = 'preloader';

