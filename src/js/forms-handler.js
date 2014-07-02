/*===============================================================================
 ************   Store and parse forms data   ************
 ===============================================================================*/
app.formsData = {};
app.formStoreData = function (formId, formJSON) {
    // Store form data in app.formsData
    app.formsData[formId] = formJSON;

    // Store form data in local storage also
    app.ls['f7form-' + formId] = JSON.stringify(formJSON);
};
app.formDeleteData = function (formId) {
    // Delete form data from app.formsData
    if (app.formsData[formId]) {
        app.formsData[formId] = '';
        delete app.formsData[formId];
    }

    // Delete form data from local storage also
    if (app.ls['f7form-' + formId]) {
        app.ls['f7form-' + formId] = '';
        delete app.ls['f7form-' + formId];
    }
};
app.formGetData = function (formId) {
    // First of all check in local storage
    if (app.ls['f7form-' + formId]) {
        return JSON.parse(app.ls['f7form-' + formId]);
    }
    // Try to get it from formsData obj
    else if (app.formsData[formId]) {
        return app.formsData[formId];
    }
};
app.formToJSON = function (form) {
    var formData, skipTypes, skipNames;
    form = $(form);
    if (form.length !== 1) return false;

    // Form data
    formData = {};

    // Skip input types
    skipTypes = ['submit', 'image', 'button', 'file'];
    skipNames = [];
    form.find('input, select, textarea').each(function () {
        var input = $(this),
            name = input.attr('name'),
            type = input.attr('type'),
            tag = this.nodeName.toLowerCase();

        if (skipTypes.indexOf(type) >= 0) {
            return;
        }
        if (skipNames.indexOf(name) >= 0 || !name) {
            return;
        }
        if (tag === 'select' && input.attr('multiple')) {
            skipNames.push(name);
            formData[name] = [];
            form.find('select[name="' + name + '"] option').each(function () {
                if (this.selected) {
                    formData[name].push(this.value);
                }
            });
        }
        else {
            switch (type) {
                case 'checkbox' :
                    skipNames.push(name);
                    formData[name] = [];
                    form.find('input[name="' + name + '"]').each(function () {
                        if (this.checked) {
                            formData[name].push(this.value);
                        }
                    });
                    break;
                case 'radio' :
                    skipNames.push(name);
                    form.find('input[name="' + name + '"]').each(function () {
                        if (this.checked) {
                            formData[name] = this.value;
                        }
                    });
                    break;
                default :
                    formData[name] = input.val();
                    break;
            }
        }

    });

    return formData;
};
app.formFromJSON = function (form, formData) {
    var skipTypes, skipNames;
    form = $(form);
    if (form.length !== 1) {
        return false;
    }

    // Skip input types
    skipTypes = ['submit', 'image', 'button', 'file'];
    skipNames = [];

    form.find('input, select, textarea').each(function () {
        var input = $(this),
            name = input.attr('name'),
            type = input.attr('type'),
            tag = this.nodeName.toLowerCase();

        if (!formData[name]) {
            return;
        }
        if (skipTypes.indexOf(type) >= 0) {
            return;
        }
        if (skipNames.indexOf(name) >= 0 || !name) {
            return;
        }
        if (tag === 'select' && input.attr('multiple')) {
            skipNames.push(name);
            form.find('select[name="' + name + '"] option').each(function () {
                return  this.selected = (formData[name].indexOf(this.value) >= 0);
            });
        }
        else {
            switch (type) {
                case 'checkbox' :
                    skipNames.push(name);
                    form.find('input[name="' + name + '"]').each(function () {
                        return this.checked = (formData[name].indexOf(this.value) >= 0);
                    });
                    break;
                case 'radio' :
                    skipNames.push(name);
                    form.find('input[name="' + name + '"]').each(function () {
                        return this.checked = (formData[name] === this.value);
                    });
                    break;
                default :
                    input.val(formData[name]);
                    break;
            }
        }

    });
};
app.initFormsStorage = function (pageContainer) {
    var forms;
    pageContainer = $(pageContainer);
    if (pageContainer.length === 0) {
        return;
    }

    forms = pageContainer.find('form.store-data');
    if (forms.length === 0) {
        return;
    }

    // Parse forms data and fill form if there is such data
    forms.each(function () {
        var id = this.getAttribute('id'),
            formData;
        if (!id) {
            return;
        }
        formData = app.formGetData(id);
        if (formData) {
            app.formFromJSON(this, formData);
        }
    });
    // Update forms data on inputs change
    function storeForm() {
        /*jshint validthis:true */
        var form = $(this),
            formId = form[0].id,
            formJSON;

        if (!formId) {
            return;
        }
        formJSON = app.formToJSON(form);
        if (!formJSON) {
            return;
        }
        app.formStoreData(formId, formJSON);
        form.trigger('store', {data: formJSON});
    }

    forms.on('change submit', storeForm);

    // Detach Listeners
    function pageBeforeRemove() {
        forms.off('change submit', storeForm);
        pageContainer.off('pageBeforeRemove', pageBeforeRemove);
    }

    pageContainer.on('pageBeforeRemove', pageBeforeRemove);
};

// Ajax submit on forms
$(document).on('submit change', 'form.ajax-submit, form.ajax-submit-onchange', function (e) {
    var form = $(this), method, contentType, url, data, xhr;
    if (e.type === 'change' && !form.hasClass('ajax-submit-onchange')) {
        return;
    }
    if (e.type === 'submit') {
        e.preventDefault();
    }

    method = form.attr('method') || 'GET';
    contentType = form.attr('enctype');

    url = form.attr('action');
    if (!url) {
        return;
    }

    if (method === 'POST') {
        data = new FormData(form[0]);
    }
    else {
        data = $.serializeObject(app.formToJSON(form[0]));
    }

    xhr = $.ajax({
        method: method,
        url: url,
        contentType: contentType,
        data: data,
        success: function (data) {
            form.trigger('submitted', {data: data, xhr: xhr});
        }
    });
});

