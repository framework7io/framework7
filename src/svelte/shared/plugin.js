// eslint-disable-next-line
import componentsRouter from './components-router.js';
import { f7ready, theme, app, f7initEvents, setTheme } from './f7.js';

const Framework7Svelte = {
  name: 'sveltePlugin',
  installed: false,
  install(params = {}) {
    const Framework7 = this;
    app.Framework7 = Framework7;

    if (Framework7Svelte.installed) return;
    Framework7Svelte.installed = true;

    f7initEvents();

    const { theme: paramsTheme, userAgent } = params;

    if (paramsTheme === 'md') {
      app.theme.md = true;
      theme.md = true;
    }
    if (paramsTheme === 'ios') {
      app.theme.md = true;
      theme.ios = true;
    }

    // eslint-disable-next-line
    const needThemeCalc = typeof window === 'undefined' ? !!userAgent : true;
    if (needThemeCalc && (!paramsTheme || paramsTheme === 'auto')) {
      const device = Framework7.getDevice({ userAgent }, true);
      app.theme.ios = !!device.ios;
      theme.ios = app.theme.ios;
      app.theme.md = !app.theme.ios;
      theme.md = app.theme.md;
    }
    f7ready(() => {
      setTheme();
    });

    Framework7.Router.use(componentsRouter);
  },
};

export default Framework7Svelte;
