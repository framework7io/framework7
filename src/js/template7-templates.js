/*===========================
Compile Template7 Templates On App Init
===========================*/
app.initTemplate7Templates = function () {
    if (!window.Template7) return;
    Template7.templates = Template7.templates || app.params.templates || {};
    Template7.data = Template7.data || app.params.template7Data || {};
    Template7.cache = Template7.cache || {};

    app.templates = Template7.templates;
    app.template7Data = Template7.data;
    app.template7Cache = Template7.cache;

    // Precompile templates on app init
    if (!app.params.precompileTemplates) return;
    $('script[type="text/template7"]').each(function () {
        var id = $(this).attr('id');
        if (!id) return;
        Template7.templates[id] = Template7.compile($(this).html());
    });
};
