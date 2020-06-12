/* eslint no-underscore-dangle: "off" */
import componentsRouter from './components-router';
import f7, { f7Instance } from './f7';
function f7ready(callback) {
  f7.ready(callback);
}
const f7Theme = {};
const Plugin = {
  name: 'phenomePlugin',
  installed: false,
  install(params = {}) {
    if (Plugin.installed) return;
    Plugin.installed = true;
    const Framework7 = this;
    f7.Framework7 = Framework7;
    f7.events = new Framework7.Events();
    // eslint-disable-next-line
    
    const { theme } = params;
    if (theme === 'md') f7Theme.md = true;
    if (theme === 'ios') f7Theme.ios = true;
    if (theme === 'aurora') f7Theme.aurora = true;
    if (!theme || theme === 'auto') {
      f7Theme.ios = !!Framework7.device.ios;
      f7Theme.aurora = Framework7.device.desktop && Framework7.device.electron;
      f7Theme.md = !f7Theme.ios && !f7Theme.aurora;
    }
    f7.ready(() => {
      f7Theme.ios = f7.instance.theme === 'ios';
      f7Theme.md = f7.instance.theme === 'md';
      f7Theme.aurora = f7.instance.theme === 'aurora';
    });
    
    // Extend F7 Router
    Framework7.Router.use(componentsRouter);
  },
};
export { f7ready, f7Instance as f7, f7Theme as theme };
export default Plugin;
