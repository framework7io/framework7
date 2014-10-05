/*===========================
Compile Template7 Templates On App Init
===========================*/
app.initTemplate7Templates = function () {
    if (!window.Template7) return;
    Template7.templates = Template7.templates || {};
    $('script[type="text/template7"]').each(function () {
        var id = $(this).attr('id');
        if (!id) return;
        Template7.templates[id] = Template7.compile($(this).html());
    });
    app.templates = Template7.templates;
};
