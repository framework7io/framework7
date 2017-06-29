import $ from 'dom7';
import Utils from '../../utils/utils';
import Device from '../../utils/device';

const Statusbar = {
  hide() {
    $('html').removeClass('with-statusbar');
    if (Device.cordova && window.StatusBar) {
      window.StatusBar.hide();
    }
  },
  show() {
    $('html').addClass('with-statusbar');
    if (Device.cordova && window.StatusBar) {
      window.StatusBar.show();
    }
  },
  onClick() {
    const app = this;
    let pageContent;
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
      if (pageContent.length > 0) pageContent.scrollTop(0, 300);
    }
  },
  setIosTextColor(color) {
    if (Device.cordova && window.StatusBar) {
      if (color === 'white') {
        window.StatusBar.styleLightContent();
      } else {
        window.StatusBar.styleDefault();
      }
    }
  },
  setBackgroundColor(color) {
    if (Device.cordova && window.StatusBar) {
      if (Device.needsStatusbar()) {
        // Change Overlay Color;
        $('.statusbar').css('background-color', color);
      } else {
        // Change Real Status bar color
        window.StatusBar.backgroundColorByHexString(color);
      }
    } else {
      $('.statusbar').css('background-color', color);
    }
  },
  isVisible() {
    if (Device.cordova && window.StatusBar) {
      return window.StatusBar.isVisible;
    }
    return undefined;
  },
  init() {
    const app = this;
    const params = app.params.statusbar;

    if (params.overlay === 'auto') {
      if (Device.needsStatusbar()) {
        $('html').addClass('with-statusbar');
      }
      if (Device.cordova) {
        $(document).on('resume', () => {
          if (Device.needsStatusbar()) {
            $('html').addClass('with-statusbar');
          } else {
            $('html').removeClass('with-statusbar');
          }
        }, false);
      }
    } else if (params.overlay === true) {
      $('html').addClass('with-statusbar');
    } else if (params.overlay === false) {
      $('html').removeClass('with-statusbar');
    }

    if (Device.cordova && window.StatusBar) {
      if (params.scrollTopOnClick) {
        $(window).on('statusTap', Statusbar.onClick.bind(app));
      }
      if (params.iosOverlaysWebView) {
        window.StatusBar.overlaysWebView(true);
      } else {
        window.StatusBar.overlaysWebView(false);
      }

      if (params.iosTextColor === 'white') {
        window.StatusBar.styleLightContent();
      } else {
        window.StatusBar.styleDefault();
      }
    }

    if (params.setBackgroundColor) {
      Statusbar.setBackgroundColor(app.theme === 'ios' ? params.iosBackgroundColor : params.materialBackgroundColor);
    }
  },
};

export default {
  name: 'statusbar',
  params: {
    statusbar: {
      overlay: 'auto',
      scrollTopOnClick: true,
      iosOverlaysWebView: true,
      iosTextColor: 'black',
      setBackgroundColor: true,
      iosBackgroundColor: '#F7F7F8',
      materialBackgroundColor: '#0D47A1',
    },
  },
  create() {
    const app = this;
    Utils.extend(app, {
      statusbar: {
        hide: Statusbar.hide,
        show: Statusbar.show,
        setIosTextColor: Statusbar.setIosTextColor,
        setBackgroundColor: Statusbar.setBackgroundColor,
        isVisible: Statusbar.isVisible,
        init: Statusbar.init.bind(app),
      },
    });
  },
  on: {
    init() {
      const app = this;
      Statusbar.init.call(app);
    },
  },
  clicks: {
    '.statusbar': function onStatusbarClick() {
      const app = this;
      if (!app.params.statusbar.scrollTopOnClick) return;
      Statusbar.onClick.call(app);
    },
  },
};
