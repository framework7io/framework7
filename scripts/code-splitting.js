/* eslint-disable */
const fs = require('fs');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
const getConfig = require('./get-core-config.js');

const config = getConfig();
const env = process.env.NODE_ENV || 'development';
const target = process.env.TARGET || config.target || 'universal';
const format = 'umd';

function toCamelCase(string) {
  return string.toLowerCase().replace(/-(.)/g, (match, group1) => group1.toUpperCase());
}

const intro = `
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

  `;
const outro = `
}
framework7ComponentLoader.componentName = '{{framework7ComponentName}}';
`;

rollup.rollup({
  input: [
    './src/core/components/accordion/accordion.js',
    './src/core/components/actions/actions.js',
    './src/core/components/autocomplete/autocomplete.js',
    './src/core/components/badge/badge.js',
    './src/core/components/block/block.js',
    './src/core/components/button/button.js',
    './src/core/components/calendar/calendar.js',
    './src/core/components/card/card.js',
    './src/core/components/checkbox/checkbox.js',
    './src/core/components/chip/chip.js',
    './src/core/components/contacts-list/contacts-list.js',
    './src/core/components/data-table/data-table.js',
    './src/core/components/dialog/dialog.js',
    './src/core/components/elevation/elevation.js',
    './src/core/components/fab/fab.js',
    './src/core/components/form/form.js',
    './src/core/components/gauge/gauge.js',
    './src/core/components/grid/grid.js',
    './src/core/components/icon/icon.js',
    './src/core/components/infinite-scroll/infinite-scroll.js',
    './src/core/components/input/input.js',
    './src/core/components/lazy/lazy.js',
    './src/core/components/link/link.js',
    './src/core/components/list/list.js',
    './src/core/components/list-index/list-index.js',
    './src/core/components/login-screen/login-screen.js',
    './src/core/components/messagebar/messagebar.js',
    './src/core/components/messages/messages.js',
    './src/core/components/modal/modal.js',
    './src/core/components/navbar/navbar.js',
    './src/core/components/notification/notification.js',
    './src/core/components/page/page.js',
    './src/core/components/panel/panel.js',
    './src/core/components/photo-browser/photo-browser.js',
    './src/core/components/picker/picker.js',
    './src/core/components/popover/popover.js',
    './src/core/components/popup/popup.js',
    './src/core/components/preloader/preloader.js',
    './src/core/components/progressbar/progressbar.js',
    './src/core/components/pull-to-refresh/pull-to-refresh.js',
    './src/core/components/radio/radio.js',
    './src/core/components/range/range.js',
    './src/core/components/searchbar/searchbar.js',
    './src/core/components/sheet/sheet.js',
    './src/core/components/smart-select/smart-select.js',
    './src/core/components/sortable/sortable.js',
    './src/core/components/statusbar/statusbar.js',
    './src/core/components/stepper/stepper.js',
    './src/core/components/subnavbar/subnavbar.js',
    './src/core/components/swipeout/swipeout.js',
    './src/core/components/swiper/swiper.js',
    './src/core/components/tabs/tabs.js',
    './src/core/components/timeline/timeline.js',
    './src/core/components/toast/toast.js',
    './src/core/components/toggle/toggle.js',
    './src/core/components/toolbar/toolbar.js',
    './src/core/components/tooltip/tooltip.js',
    './src/core/components/touch-ripple/touch-ripple.js',
    './src/core/components/typography/typography.js',
    './src/core/components/vi/vi.js',
    './src/core/components/view/view.js',
    './src/core/components/virtual-list/virtual-list.js',
  ],
  experimentalCodeSplitting: true,
  optimizeChunks: true,
  plugins: [
    replace({
      delimiters: ['', ''],
      'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
      'process.env.TARGET': JSON.stringify(target),
      'process.env.FORMAT': JSON.stringify(format),
    }),
    resolve({ jsnext: true }),
    commonjs(),
    buble(),
  ],
})
.then((bundle) => {
  return bundle.write({
    strict: true,
    dir: './code-splitting/',
    format: 'es',
    exports: 'default',
  });
})
.then(() => {
  const files = fs.readdirSync('./code-splitting/')
    .filter(fileName => fileName.indexOf('chunk-') < 0 && fileName.indexOf('.js') > 0)
    .forEach((fileName) => {
      const componentName = toCamelCase(fileName.split('.js')[0]);
      let fileContent = fs.readFileSync(`./code-splitting/${fileName}`, 'utf8')
        .split('\n')
        .filter(line => line.indexOf('import ') !== 0)
        .map(line => line.trim().length ? `  ${line}` : line)
        .join('\n');

      fileContent = `${intro}${fileContent.trim()}${outro}`;
      fileContent = fileContent
        .replace('export default', 'return')
        .replace('{{framework7ComponentName}}', componentName);

      fs.writeFileSync(`./code-splitting/${fileName}`, `${fileContent}\n`);
    });
})
.catch((err) => {
  console.log(err.toString());
});
