/*======================================================
************   App Init   ************
======================================================*/
app.init = function () {
    // Init Click events
    app.initClickEvents();
    // Init Swipeouts events
    app.initSwipeout();
    // Detect statusbar
    app.detectStatusBar();
    // Init Pull To Refresh
    app.initPullToRefresh();
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