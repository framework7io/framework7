/*======================================================
************   App Init   ************
======================================================*/
app.init = function () {
    // Init Click events
    app.initClickEvents();
    // Init each page callbacks
    $('.page').each(function () {
        app.initPage(this);
    });
    // App resize events
    $(window).on('resize', app.onResize);
    // App Init callback
    if (app.params.onAppInit) app.params.onAppInit();
};
app.init();