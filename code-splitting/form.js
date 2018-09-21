
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

  // Form Data
  var FormData = {
    store: function store(form, data) {
      var app = this;
      var formId = form;

      var $formEl = $(form);
      if ($formEl.length && $formEl.is('form') && $formEl.attr('id')) {
        formId = $formEl.attr('id');
      }
      // Store form data in app.formsData
      app.form.data[("form-" + formId)] = data;

      // Store form data in local storage also
      try {
        win.localStorage[("f7form-" + formId)] = JSON.stringify(data);
      } catch (e) {
        throw e;
      }
    },
    get: function get(form) {
      var app = this;
      var formId = form;

      var $formEl = $(form);
      if ($formEl.length && $formEl.is('form') && $formEl.attr('id')) {
        formId = $formEl.attr('id');
      }

      try {
        if (win.localStorage[("f7form-" + formId)]) {
          return JSON.parse(win.localStorage[("f7form-" + formId)]);
        }
      } catch (e) {
        throw e;
      }
      if (app.form.data[("form-" + formId)]) {
        return app.form.data[("form-" + formId)];
      }
      return undefined;
    },
    remove: function remove(form) {
      var app = this;
      var formId = form;

      var $formEl = $(form);
      if ($formEl.length && $formEl.is('form') && $formEl.attr('id')) {
        formId = $formEl.attr('id');
      }

      // Delete form data from app.formsData
      if (app.form.data[("form-" + formId)]) {
        app.form.data[("form-" + formId)] = '';
        delete app.form.data[("form-" + formId)];
      }

      // Delete form data from local storage also
      try {
        if (win.localStorage[("f7form-" + formId)]) {
          win.localStorage[("f7form-" + formId)] = '';
          win.localStorage.removeItem(("f7form-" + formId));
        }
      } catch (e) {
        throw e;
      }
    },
  };

  // Form Storage
  var FormStorage = {
    init: function init(formEl) {
      var app = this;
      var $formEl = $(formEl);
      var formId = $formEl.attr('id');
      if (!formId) { return; }
      var initialData = app.form.getFormData(formId);
      if (initialData) {
        app.form.fillFromData($formEl, initialData);
      }
      function store() {
        var data = app.form.convertToData($formEl);
        if (!data) { return; }
        app.form.storeFormData(formId, data);
        $formEl.trigger('form:storedata', data);
        app.emit('formStoreData', $formEl[0], data);
      }
      $formEl.on('change submit', store);
    },
    destroy: function destroy(formEl) {
      var $formEl = $(formEl);
      $formEl.off('change submit');
    },
  };

  // Form To/From Data
  function formToData(formEl) {
    var app = this;
    var $formEl = $(formEl).eq(0);
    if ($formEl.length === 0) { return undefined; }

    // Form data
    var data = {};

    // Skip input types
    var skipTypes = ['submit', 'image', 'button', 'file'];
    var skipNames = [];
    $formEl.find('input, select, textarea').each(function (inputIndex, inputEl) {
      var $inputEl = $(inputEl);
      if ($inputEl.hasClass('ignore-store-data') || $inputEl.hasClass('no-store-data')) {
        return;
      }
      var name = $inputEl.attr('name');
      var type = $inputEl.attr('type');
      var tag = inputEl.nodeName.toLowerCase();
      if (skipTypes.indexOf(type) >= 0) { return; }
      if (skipNames.indexOf(name) >= 0 || !name) { return; }
      if (tag === 'select' && $inputEl.prop('multiple')) {
        skipNames.push(name);
        data[name] = [];
        $formEl.find(("select[name=\"" + name + "\"] option")).each(function (index, el) {
          if (el.selected) { data[name].push(el.value); }
        });
      } else {
        switch (type) {
          case 'checkbox':
            skipNames.push(name);
            data[name] = [];
            $formEl.find(("input[name=\"" + name + "\"]")).each(function (index, el) {
              if (el.checked) { data[name].push(el.value); }
            });
            break;
          case 'radio':
            skipNames.push(name);
            $formEl.find(("input[name=\"" + name + "\"]")).each(function (index, el) {
              if (el.checked) { data[name] = el.value; }
            });
            break;
          default:
            data[name] = $inputEl.val();
            break;
        }
      }
    });
    $formEl.trigger('form:todata', data);
    app.emit('formToData', $formEl[0], data);

    return data;
  }
  function formFromData(formEl, formData) {
    var app = this;
    var $formEl = $(formEl).eq(0);
    if (!$formEl.length) { return; }

    var data = formData;
    var formId = $formEl.attr('id');

    if (!data && formId) {
      data = app.form.getFormData(formId);
    }

    if (!data) { return; }

    // Skip input types
    var skipTypes = ['submit', 'image', 'button', 'file'];
    var skipNames = [];

    $formEl.find('input, select, textarea').each(function (inputIndex, inputEl) {
      var $inputEl = $(inputEl);
      if ($inputEl.hasClass('ignore-store-data') || $inputEl.hasClass('no-store-data')) {
        return;
      }
      var name = $inputEl.attr('name');
      var type = $inputEl.attr('type');
      var tag = inputEl.nodeName.toLowerCase();
      if (typeof data[name] === 'undefined' || data[name] === null) { return; }
      if (skipTypes.indexOf(type) >= 0) { return; }
      if (skipNames.indexOf(name) >= 0 || !name) { return; }
      if (tag === 'select' && $inputEl.prop('multiple')) {
        skipNames.push(name);
        $formEl.find(("select[name=\"" + name + "\"] option")).each(function (index, el) {
          var selectEl = el;
          if (data[name].indexOf(el.value) >= 0) { selectEl.selected = true; }
          else { selectEl.selected = false; }
        });
      } else {
        switch (type) {
          case 'checkbox':
            skipNames.push(name);
            $formEl.find(("input[name=\"" + name + "\"]")).each(function (index, el) {
              var checkboxEl = el;
              if (data[name].indexOf(el.value) >= 0) { checkboxEl.checked = true; }
              else { checkboxEl.checked = false; }
            });
            break;
          case 'radio':
            skipNames.push(name);
            $formEl.find(("input[name=\"" + name + "\"]")).each(function (index, el) {
              var radioEl = el;
              if (data[name] === el.value) { radioEl.checked = true; }
              else { radioEl.checked = false; }
            });
            break;
          default:
            $inputEl.val(data[name]);
            break;
        }
      }
      if (tag === 'select' || tag === 'input' || tag === 'textarea') {
        $inputEl.trigger('change', 'fromdata');
      }
    });
    $formEl.trigger('form:fromdata', data);
    app.emit('formFromData', $formEl[0], data);
  }

  function initAjaxForm() {
    var app = this;

    function onSubmitChange(e, fromData) {
      var $formEl = $(this);
      if (e.type === 'change' && !$formEl.hasClass('form-ajax-submit-onchange')) { return; }
      if (e.type === 'submit') { e.preventDefault(); }

      if (e.type === 'change' && fromData === 'fromdata') { return; }

      var method = ($formEl.attr('method') || 'GET').toUpperCase();
      var contentType = $formEl.prop('enctype') || $formEl.attr('enctype');

      var url = $formEl.attr('action');
      if (!url) { return; }

      var data;
      if (method === 'POST') {
        if (contentType === 'application/x-www-form-urlencoded') {
          data = app.form.convertToData($formEl[0]);
        } else {
          data = new win.FormData($formEl[0]);
        }
      } else {
        data = Utils.serializeObject(app.form.convertToData($formEl[0]));
      }

      app.request({
        method: method,
        url: url,
        contentType: contentType,
        data: data,
        beforeSend: function beforeSend(xhr) {
          $formEl.trigger('formajax:beforesend', data, xhr);
          app.emit('formAjaxBeforeSend', $formEl[0], data, xhr);
        },
        error: function error(xhr) {
          $formEl.trigger('formajax:error', data, xhr);
          app.emit('formAjaxError', $formEl[0], data, xhr);
        },
        complete: function complete(xhr) {
          $formEl.trigger('formajax:complete', data, xhr);
          app.emit('formAjaxComplete', $formEl[0], data, xhr);
        },
        success: function success(response, status, xhr) {
          $formEl.trigger('formajax:success', data, xhr);
          app.emit('formAjaxSuccess', $formEl[0], data, xhr);
        },
      });
    }
    $(doc).on('submit change', 'form.form-ajax-submit, form.form-ajax-submit-onchange', onSubmitChange);
  }

  var form = {
    name: 'form',
    create: function create() {
      var app = this;
      Utils.extend(app, {
        form: {
          data: {},
          storeFormData: FormData.store.bind(app),
          getFormData: FormData.get.bind(app),
          removeFormData: FormData.remove.bind(app),
          convertToData: formToData.bind(app),
          fillFromData: formFromData.bind(app),
          storage: {
            init: FormStorage.init.bind(app),
            destroy: FormStorage.destroy.bind(app),
          },
        },
      });
    },
    on: {
      init: function init() {
        var app = this;
        initAjaxForm.call(app);
      },
      tabBeforeRemove: function tabBeforeRemove(tabEl) {
        var app = this;
        $(tabEl).find('.form-store-data').each(function (index, formEl) {
          app.form.storage.destroy(formEl);
        });
      },
      tabMounted: function tabMounted(tabEl) {
        var app = this;
        $(tabEl).find('.form-store-data').each(function (index, formEl) {
          app.form.storage.init(formEl);
        });
      },
      pageBeforeRemove: function pageBeforeRemove(page) {
        var app = this;
        page.$el.find('.form-store-data').each(function (index, formEl) {
          app.form.storage.destroy(formEl);
        });
      },
      pageInit: function pageInit(page) {
        var app = this;
        page.$el.find('.form-store-data').each(function (index, formEl) {
          app.form.storage.init(formEl);
        });
      },
    },
  };

  return form;
}
framework7ComponentLoader.componentName = 'form';

