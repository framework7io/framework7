import { h } from 'vue';
import Popup from '../components/popup';
import View from '../components/view';
import LoginScreen from '../components/login-screen';
import Sheet from '../components/sheet';
import Popover from '../components/popover';
import Panel from '../components/panel';

export const routerOpenIn = (router, url, options) => {
  const navigateOptions = {
    url,
    route: {
      path: url,
      options: {
        ...options,
        openIn: undefined,
      },
    },
  };
  const params = {
    ...options,
  };

  if (options.openIn === 'popup') {
    params.component = {
      setup() {
        return () =>
          h(Popup, { class: 'popup-router-open-in', 'data-url': url }, [
            h(View, { linksView: router.view.selector, url, ignoreOpenIn: true }),
          ]);
      },
    };
    navigateOptions.route.popup = params;
  }
  if (options.openIn === 'loginScreen') {
    params.component = {
      setup() {
        return () =>
          h(LoginScreen, { class: 'login-screen-router-open-in', 'data-url': url }, [
            h(View, { linksView: router.view.selector, url, ignoreOpenIn: true }),
          ]);
      },
    };
    navigateOptions.route.loginScreen = params;
  }
  if (options.openIn === 'sheet') {
    params.component = {
      setup() {
        return () =>
          h(Sheet, { class: 'sheet-modal-router-open-in', 'data-url': url }, [
            h(View, { linksView: router.view.selector, url, ignoreOpenIn: true }),
          ]);
      },
    };
    navigateOptions.route.sheet = params;
  }
  if (options.openIn === 'popover') {
    params.targetEl = options.clickedEl || options.targetEl;
    params.component = {
      setup() {
        return () =>
          h(
            Popover,
            {
              class: 'popover-router-open-in',
              'data-url': url,
              targetEl: options.clickedEl || options.targetEl,
            },
            [h(View, { linksView: router.view.selector, url, ignoreOpenIn: true })],
          );
      },
    };
    navigateOptions.route.popover = params;
  }
  if (options.openIn.indexOf('panel') >= 0) {
    const parts = options.openIn.split(':');
    const side = parts[1] || 'left';
    const effect = parts[2] || 'cover';
    params.targetEl = options.clickedEl || options.targetEl;
    params.component = {
      setup() {
        return () =>
          h(Panel, { class: 'panel-router-open-in', 'data-url': url, side, effect }, [
            h(View, { linksView: router.view.selector, url, ignoreOpenIn: true }),
          ]);
      },
    };
    navigateOptions.route.panel = params;
  }
  return router.navigate(navigateOptions);
};
