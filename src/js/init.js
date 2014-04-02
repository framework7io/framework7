/*======================================================
************   App Init   ************
======================================================*/
app.init = function () {
    if (app.getDeviceInfo) app.getDeviceInfo();
    // Init Click events
    if (app.initClickEvents) app.initClickEvents();
    // Init Swipeouts events
    if (app.initSwipeout) app.initSwipeout();
    // Init Pull To Refresh
    if (app.initPullToRefresh) app.initPullToRefresh();
    // Init each page callbacks
    $('.page').each(function () {
        app.initPage(this);
    });
    // Init resize events
    if (app.initResize) app.initResize();
    
    // App Init callback
    if (app.params.onAppInit) app.params.onAppInit();
};
app.init();