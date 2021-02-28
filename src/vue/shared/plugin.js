import Framework7 from 'framework7/lite';
import componentsRouter from './components-router';
import { f7, f7ready, theme, f7initEvents, setTheme } from './f7';

const Framework7Vue = {
  name: 'vuePlugin',
  installed: false,
  install(params = {}) {
    if (Framework7Vue.installed) return;
    Framework7Vue.installed = true;

    f7initEvents();

    const { theme: paramsTheme, userAgent } = params;

    if (paramsTheme === 'md') theme.md = true;
    if (paramsTheme === 'ios') theme.ios = true;
    if (paramsTheme === 'aurora') theme.aurora = true;

    // eslint-disable-next-line
    const needThemeCalc = typeof window === 'undefined' ? !!userAgent : true;
    if (needThemeCalc && (!paramsTheme || paramsTheme === 'auto')) {
      const device = Framework7.getDevice({ userAgent }, true);
      theme.ios = !!device.ios;
      theme.aurora = device.desktop && device.electron;
      theme.md = !theme.ios && !theme.aurora;
    }
    f7ready(() => {
      setTheme();
    });

    Framework7.Router.use(componentsRouter);
  },
};

export { f7ready, f7, theme };
export default Framework7Vue;
