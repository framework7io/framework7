
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

  var Statusbar = {
    hide: function hide() {
      $('html').removeClass('with-statusbar');
      if (Device.cordova && win.StatusBar) {
        win.StatusBar.hide();
      }
    },
    show: function show() {
      if (Device.cordova && win.StatusBar) {
        win.StatusBar.show();
        Utils.nextTick(function () {
          if (Device.needsStatusbarOverlay()) {
            $('html').addClass('with-statusbar');
          }
        });
        return;
      }
      $('html').addClass('with-statusbar');
    },
    onClick: function onClick() {
      var app = this;
      var pageContent;
      if ($('.popup.modal-in').length > 0) {
        // Check for opened popup
        pageContent = $('.popup.modal-in').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
      } else if ($('.panel.panel-active').length > 0) {
        // Check for opened panel
        pageContent = $('.panel.panel-active').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
      } else if ($('.views > .view.tab-active').length > 0) {
        // View in tab bar app layout
        pageContent = $('.views > .view.tab-active').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
      } else if ($('.views').length > 0) {
        pageContent = $('.views').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
      } else {
        pageContent = app.root.children('.view').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
      }

      if (pageContent && pageContent.length > 0) {
        // Check for tab
        if (pageContent.hasClass('tab')) {
          pageContent = pageContent.parent('.tabs').children('.page-content.tab-active');
        }
        if (pageContent.length > 0) { pageContent.scrollTop(0, 300); }
      }
    },
    setIosTextColor: function setIosTextColor(color) {
      if (Device.cordova && win.StatusBar) {
        if (color === 'white') {
          win.StatusBar.styleLightContent();
        } else {
          win.StatusBar.styleDefault();
        }
      }
    },
    setBackgroundColor: function setBackgroundColor(color) {
      $('.statusbar').css('background-color', color);
      if (Device.cordova && win.StatusBar) {
        win.StatusBar.backgroundColorByHexString(color);
      }
    },
    isVisible: function isVisible() {
      if (Device.cordova && win.StatusBar) {
        return win.StatusBar.isVisible;
      }
      return false;
    },
    iosOverlaysWebView: function iosOverlaysWebView(overlays) {
      if ( overlays === void 0 ) overlays = true;

      if (!Device.ios) { return; }
      if (Device.cordova && win.StatusBar) {
        win.StatusBar.overlaysWebView(overlays);
        if (overlays) {
          $('html').addClass('with-statusbar');
        } else {
          $('html').removeClass('with-statusbar');
        }
      }
    },
    checkOverlay: function checkOverlay() {
      if (Device.needsStatusbarOverlay()) {
        $('html').addClass('with-statusbar');
      } else {
        $('html').removeClass('with-statusbar');
      }
    },
    init: function init() {
      var app = this;
      var params = app.params.statusbar;
      if (!params.enabled) { return; }

      if (params.overlay === 'auto') {
        if (Device.needsStatusbarOverlay()) {
          $('html').addClass('with-statusbar');
        } else {
          $('html').removeClass('with-statusbar');
        }

        if (Device.ios && (Device.cordova || Device.webView)) {
          if (win.orientation === 0) {
            app.once('resize', function () {
              Statusbar.checkOverlay();
            });
          }

          $(doc).on('resume', function () {
            Statusbar.checkOverlay();
          }, false);

          app.on(Device.ios ? 'orientationchange' : 'orientationchange resize', function () {
            Statusbar.checkOverlay();
          });
        }
      } else if (params.overlay === true) {
        $('html').addClass('with-statusbar');
      } else if (params.overlay === false) {
        $('html').removeClass('with-statusbar');
      }

      if (Device.cordova && win.StatusBar) {
        if (params.scrollTopOnClick) {
          $(win).on('statusTap', Statusbar.onClick.bind(app));
        }
        if (params.iosOverlaysWebView) {
          win.StatusBar.overlaysWebView(true);
        } else {
          win.StatusBar.overlaysWebView(false);
        }

        if (params.iosTextColor === 'white') {
          win.StatusBar.styleLightContent();
        } else {
          win.StatusBar.styleDefault();
        }
      }
      if (params.iosBackgroundColor && app.theme === 'ios') {
        Statusbar.setBackgroundColor(params.iosBackgroundColor);
      }
      if (params.materialBackgroundColor && app.theme === 'md') {
        Statusbar.setBackgroundColor(params.materialBackgroundColor);
      }
    },
  };

  var statusbar = {
    name: 'statusbar',
    params: {
      statusbar: {
        enabled: true,
        overlay: 'auto',
        scrollTopOnClick: true,
        iosOverlaysWebView: true,
        iosTextColor: 'black',
        iosBackgroundColor: null,
        materialBackgroundColor: null,
      },
    },
    create: function create() {
      var app = this;
      Utils.extend(app, {
        statusbar: {
          checkOverlay: Statusbar.checkOverlay,
          hide: Statusbar.hide,
          show: Statusbar.show,
          iosOverlaysWebView: Statusbar.iosOverlaysWebView,
          setIosTextColor: Statusbar.setIosTextColor,
          setBackgroundColor: Statusbar.setBackgroundColor,
          isVisible: Statusbar.isVisible,
          init: Statusbar.init.bind(app),
        },
      });
    },
    on: {
      init: function init() {
        var app = this;
        Statusbar.init.call(app);
      },
    },
    clicks: {
      '.statusbar': function onStatusbarClick() {
        var app = this;
        if (!app.params.statusbar.enabled) { return; }
        if (!app.params.statusbar.scrollTopOnClick) { return; }
        Statusbar.onClick.call(app);
      },
    },
  };

  return statusbar;
}
framework7ComponentLoader.componentName = 'statusbar';

