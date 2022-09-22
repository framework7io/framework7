import { getWindow, getDocument } from 'ssr-window';
import $ from '../../shared/dom7.js';
import { extend, serializeObject } from '../../shared/utils.js';

// Form Data
const FormData = {
  store(form, data) {
    const app = this;
    const window = getWindow();
    let formId = form;

    const $formEl = $(form);
    if ($formEl.length && $formEl.is('form') && $formEl.attr('id')) {
      formId = $formEl.attr('id');
    }
    // Store form data in app.formsData
    app.form.data[`form-${formId}`] = data;

    // Store form data in local storage also
    window.localStorage[`f7form-${formId}`] = JSON.stringify(data);
  },
  get(form) {
    const app = this;
    const window = getWindow();
    let formId = form;

    const $formEl = $(form);
    if ($formEl.length && $formEl.is('form') && $formEl.attr('id')) {
      formId = $formEl.attr('id');
    }

    if (window.localStorage[`f7form-${formId}`]) {
      return JSON.parse(window.localStorage[`f7form-${formId}`]);
    }
    if (app.form.data[`form-${formId}`]) {
      return app.form.data[`form-${formId}`];
    }
    return undefined;
  },
  remove(form) {
    const app = this;
    const window = getWindow();
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
    if (window.localStorage[`f7form-${formId}`]) {
      window.localStorage[`f7form-${formId}`] = '';
      window.localStorage.removeItem(`f7form-${formId}`);
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
  $formEl.find('input, select, textarea').each((inputEl) => {
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
      $formEl.find(`select[name="${name}"] option`).each((el) => {
        if (el.selected) data[name].push(el.value);
      });
    } else {
      switch (type) {
        case 'checkbox':
          skipNames.push(name);
          data[name] = [];
          $formEl.find(`input[name="${name}"]`).each((el) => {
            if (el.checked) data[name].push(el.value);
          });
          break;
        case 'radio':
          skipNames.push(name);
          $formEl.find(`input[name="${name}"]`).each((el) => {
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

  $formEl.find('input, select, textarea').each((inputEl) => {
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
      $formEl.find(`select[name="${name}"] option`).each((el) => {
        const selectEl = el;
        if (data[name].indexOf(el.value) >= 0) selectEl.selected = true;
        else selectEl.selected = false;
      });
    } else {
      switch (type) {
        case 'checkbox':
          skipNames.push(name);
          $formEl.find(`input[name="${name}"]`).each((el) => {
            const checkboxEl = el;
            if (data[name].indexOf(el.value) >= 0) checkboxEl.checked = true;
            else checkboxEl.checked = false;
          });
          break;
        case 'radio':
          skipNames.push(name);
          $formEl.find(`input[name="${name}"]`).each((el) => {
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
  const window = getWindow();
  const document = getDocument();

  function onSubmitChange(e, fromData) {
    const $formEl = $(this);
    if (e.type === 'change' && !$formEl.hasClass('form-ajax-submit-onchange')) return;
    if (e.type === 'submit') e.preventDefault();

    if (e.type === 'change' && fromData === 'fromdata') return;

    const method = ($formEl.attr('method') || 'GET').toUpperCase();
    const contentType = $formEl.attr('enctype') || $formEl.prop('enctype');

    let url = $formEl.attr('action');
    if (!url) return;

    let data;
    if (method === 'POST') {
      if (
        contentType === 'application/x-www-form-urlencoded' ||
        contentType === 'application/json'
      ) {
        data = app.form.convertToData($formEl[0]);
        if (contentType === 'application/json') {
          data = JSON.stringify(data);
        }
      } else {
        data = new window.FormData($formEl[0]);
      }
    } else {
      data = serializeObject(app.form.convertToData($formEl[0]));
      if (url.includes('?')) {
        url += `&${data}`;
      } else {
        url += `?${data}`;
      }
    }

    $formEl.trigger('formajax:beforesend', { data });
    app.emit('formAjaxBeforeSend', $formEl[0], data);

    fetch(url, {
      method,
      headers: { 'Content-Type': contentType || 'application/x-www-form-urlencoded' },
      ...(method === 'POST' || method === 'PUT' ? { body: data } : {}),
    })
      .then((response) => {
        $formEl.trigger('formajax:complete', { data, response });
        app.emit('formAjaxComplete', $formEl[0], data, response);

        $formEl.trigger('formajax:success', { data, response });
        app.emit('formAjaxSuccess', $formEl[0], data, response);
      })
      .catch((error) => {
        $formEl.trigger('formajax:error', { data, error });
        app.emit('formAjaxError', $formEl[0], data, error);
      });
  }
  $(document).on(
    'submit change',
    'form.form-ajax-submit, form.form-ajax-submit-onchange',
    onSubmitChange,
  );
}

export default {
  name: 'form',
  create() {
    const app = this;
    extend(app, {
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
      $(tabEl)
        .find('.form-store-data')
        .each((formEl) => {
          app.form.storage.destroy(formEl);
        });
    },
    tabMounted(tabEl) {
      const app = this;
      $(tabEl)
        .find('.form-store-data')
        .each((formEl) => {
          app.form.storage.init(formEl);
        });
    },
    pageBeforeRemove(page) {
      const app = this;
      page.$el.find('.form-store-data').each((formEl) => {
        app.form.storage.destroy(formEl);
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.form-store-data').each((formEl) => {
        app.form.storage.init(formEl);
      });
    },
  },
};
