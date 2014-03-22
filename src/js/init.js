/*======================================================
************   App Init   ************
======================================================*/
app.init = function () {
    // Init Click events
    app.initClickEvents();
    // Init Swipeouts events
    app.initSwipeOutList();
    // Detect statusbar
    app.detectStatusBar();
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