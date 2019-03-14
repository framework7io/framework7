import $ from 'dom7';
import { window, document } from 'ssr-window';
import Utils from '../../utils/utils';

// Form Data
const FormData = {
  store(form, data) {
    const app = this;
    let formId = form;

    const $formEl = $(form);
    if ($formEl.length && $formEl.is('form') && $formEl.attr('id')) {
      formId = $formEl.attr('id');
    }
    // Store form data in app.formsData
    app.form.data[`form-${formId}`] = data;

    // Store form data in local storage also
    try {
      window.localStorage[`f7form-${formId}`] = JSON.stringify(data);
    } catch (e) {
      throw e;
    }
  },
  get(form) {
    const app = this;
    let formId = form;

    const $formEl = $(form);
    if ($formEl.length && $formEl.is('form') && $formEl.attr('id')) {
      formId = $formEl.attr('id');
    }

    try {
      if (window.localStorage[`f7form-${formId}`]) {
        return JSON.parse(window.localStorage[`f7form-${formId}`]);
      }
    } catch (e) {
      throw e;
    }
    if (app.form.data[`form-${formId}`]) {
      return app.form.data[`form-${formId}`];
    }
    return undefined;
  },
  remove(form) {
    const app = this;
    let formId = form;

    const $formEl = $(form);
    if ($formEl.length && $formEl.is('form') && $formEl.attr('id')) {
      formId = $formEl.attr('id');
    }

    // Delete form data from app.formsData
    if (app.form.data[`form-${formId}`]) {
      app.form.data[`form-${formId}`] = '';
      delete app.form.data[`form-${formId}`];
    }

    // Delete form data from local storage also
    try {
      if (window.localStorage[`f7form-${formId}`]) {
        window.localStorage[`f7form-${formId}`] = '';
        window.localStorage.removeItem(`f7form-${formId}`);
      }
    } catch (e) {
      throw e;
    }
  },
};

// Form Storage
const FormStorage = {
  init(formEl) {
    const app = this;
    const $formEl = $(formEl);
    const formId = $formEl.attr('id');
    if (!formId) return;
    const initialData = app.form.getFormData(formId);
    if (initialData) {
      app.form.fillFromData($formEl, initialData);
    }
    function store() {
      const data = app.form.convertToData($formEl);
      if (!data) return;
      app.form.storeFormData(formId, data);
      $formEl.trigger('form:storedata', data);
      app.emit('formStoreData', $formEl[0], data);
    }
    $formEl.on('change submit', store);
  },
  destroy(formEl) {
    const $formEl = $(formEl);
    $formEl.off('change submit');
  },
};

// Form To/From Data
function formToData(formEl) {
  const app = this;
  const $formEl = $(formEl).eq(0);
  if ($formEl.length === 0) return undefined;

  // Form data
  const data = {};

  // Skip input types
  const skipTypes = ['submit', 'image', 'button', 'file'];
  const skipNames = [];
  $formEl.find('input, select, textarea').each((inputIndex, inputEl) => {
    const $inputEl = $(inputEl);
    if ($inputEl.hasClass('ignore-store-data') || $inputEl.hasClass('no-store-data')) {
      return;
    }
    const name = $inputEl.attr('name');
    const type = $inputEl.attr('type');
    const tag = inputEl.nodeName.toLowerCase();
    if (skipTypes.indexOf(type) >= 0) return;
    if (skipNames.indexOf(name) >= 0 || !name) return;
    if (tag === 'select' && $inputEl.prop('multiple')) {
      skipNames.push(name);
      data[name] = [];
      $formEl.find(`select[name="${name}"] option`).each((index, el) => {
        if (el.selected) data[name].push(el.value);
      });
    } else {
      switch (type) {
        case 'checkbox':
          skipNames.push(name);
          data[name] = [];
          $formEl.find(`input[name="${name}"]`).each((index, el) => {
            if (el.checked) data[name].push(el.value);
          });
          break;
        case 'radio':
          skipNames.push(name);
          $formEl.find(`input[name="${name}"]`).each((index, el) => {
            if (el.checked) data[name] = el.value;
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
  const app = this;
  const $formEl = $(formEl).eq(0);
  if (!$formEl.length) return;

  let data = formData;
  const formId = $formEl.attr('id');

  if (!data && formId) {
    data = app.form.getFormData(formId);
  }

  if (!data) return;

  // Skip input types
  const skipTypes = ['submit', 'image', 'button', 'file'];
  const skipNames = [];

  $formEl.find('input, select, textarea').each((inputIndex, inputEl) => {
    const $inputEl = $(inputEl);
    if ($inputEl.hasClass('ignore-store-data') || $inputEl.hasClass('no-store-data')) {
      return;
    }
    const name = $inputEl.attr('name');
    const type = $inputEl.attr('type');
    const tag = inputEl.nodeName.toLowerCase();
    if (typeof data[name] === 'undefined' || data[name] === null) return;
    if (skipTypes.indexOf(type) >= 0) return;
    if (skipNames.indexOf(name) >= 0 || !name) return;
    if (tag === 'select' && $inputEl.prop('multiple')) {
      skipNames.push(name);
      $formEl.find(`select[name="${name}"] option`).each((index, el) => {
        const selectEl = el;
        if (data[name].indexOf(el.value) >= 0) selectEl.selected = true;
        else selectEl.selected = false;
      });
    } else {
      switch (type) {
        case 'checkbox':
          skipNames.push(name);
          $formEl.find(`input[name="${name}"]`).each((index, el) => {
            const checkboxEl = el;
            if (data[name].indexOf(el.value) >= 0) checkboxEl.checked = true;
            else checkboxEl.checked = false;
          });
          break;
        case 'radio':
          skipNames.push(name);
          $formEl.find(`input[name="${name}"]`).each((index, el) => {
            const radioEl = el;
            if (data[name] === el.value) radioEl.checked = true;
            else radioEl.checked = false;
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
  const app = this;

  function onSubmitChange(e, fromData) {
    const $formEl = $(this);
    if (e.type === 'change' && !$formEl.hasClass('form-ajax-submit-onchange')) return;
    if (e.type === 'submit') e.preventDefault();

    if (e.type === 'change' && fromData === 'fromdata') return;

    const method = ($formEl.attr('method') || 'GET').toUpperCase();
    const contentType = $formEl.prop('enctype') || $formEl.attr('enctype');

    const url = $formEl.attr('action');
    if (!url) return;

    let data;
    if (method === 'POST') {
      if (contentType === 'application/x-www-form-urlencoded') {
        data = app.form.convertToData($formEl[0]);
      } else {
        data = new window.FormData($formEl[0]);
      }
    } else {
      data = Utils.serializeObject(app.form.convertToData($formEl[0]));
    }

    app.request({
      method,
      url,
      contentType,
      data,
      beforeSend(xhr) {
        $formEl.trigger('formajax:beforesend', { data, xhr });
        app.emit('formAjaxBeforeSend', $formEl[0], data, xhr);
      },
      error(xhr) {
        $formEl.trigger('formajax:error', { data, xhr });
        app.emit('formAjaxError', $formEl[0], data, xhr);
      },
      complete(xhr) {
        $formEl.trigger('formajax:complete', { data, xhr });
        app.emit('formAjaxComplete', $formEl[0], data, xhr);
      },
      success(response, status, xhr) {
        $formEl.trigger('formajax:success', { data, xhr });
        app.emit('formAjaxSuccess', $formEl[0], data, xhr);
      },
    });
  }
  $(document).on('submit change', 'form.form-ajax-submit, form.form-ajax-submit-onchange', onSubmitChange);
}

export default {
  name: 'form',
  create() {
    const app = this;
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
    init() {
      const app = this;
      initAjaxForm.call(app);
    },
    tabBeforeRemove(tabEl) {
      const app = this;
      $(tabEl).find('.form-store-data').each((index, formEl) => {
        app.form.storage.destroy(formEl);
      });
    },
    tabMounted(tabEl) {
      const app = this;
      $(tabEl).find('.form-store-data').each((index, formEl) => {
        app.form.storage.init(formEl);
      });
    },
    pageBeforeRemove(page) {
      const app = this;
      page.$el.find('.form-store-data').each((index, formEl) => {
        app.form.storage.destroy(formEl);
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.form-store-data').each((index, formEl) => {
        app.form.storage.init(formEl);
      });
    },
  },
};
