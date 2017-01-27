/*===============================================================================
************   Ajax submit for forms   ************
===============================================================================*/
// Ajax submit on forms
$(document).on('submit change', 'form.ajax-submit, form.ajax-submit-onchange', function (e) {
    var form = $(this);
    if (e.type === 'change' && !form.hasClass('ajax-submit-onchange')) return;
    if (e.type === 'submit') e.preventDefault();

    var method = (form.attr('method') || 'GET').toUpperCase();
    var contentType = form.prop('enctype') || form.attr('enctype');

    var url = form.attr('action');
    if (!url) return;

    var data;
    if (method === 'POST') data = new FormData(form[0]);
    else data = $.serializeObject(app.formToJSON(form[0]));

    var xhr = $.ajax({
        method: method,
        url: url,
        contentType: contentType,
        data: data,
        beforeSend: function (xhr) {
            form.trigger('beforeSubmit form:beforesend', {data:data, xhr: xhr});
        },
        error: function (xhr) {
            form.trigger('submitError form:error', {data:data, xhr: xhr});
        },
        success: function (data) {
            form.trigger('submitted form:success', {data: data, xhr: xhr});
        }
    });
});

