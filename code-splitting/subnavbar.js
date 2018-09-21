
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

  var subnavbar = {
    name: 'subnavbar',
    on: {
      pageInit: function pageInit(page) {
        if (page.$navbarEl && page.$navbarEl.length && page.$navbarEl.find('.subnavbar').length) {
          page.$el.addClass('page-with-subnavbar');
        }
        if (page.$el.find('.subnavbar').length) {
          page.$el.addClass('page-with-subnavbar');
        }
      },
    },
  };

  return subnavbar;
}
framework7ComponentLoader.componentName = 'subnavbar';

