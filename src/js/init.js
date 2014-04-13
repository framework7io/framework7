/*======================================================
************   App Init   ************
======================================================*/
app.init = function () {
    if (app.getDeviceInfo) app.getDeviceInfo();
    // Init Click events
    if (app.initFastClicks && app.params.fastClicks) app.initFastClicks();
    if (app.initClickEvents) app.initClickEvents();
    // Init Swipeouts events
    if (app.initSwipeout && app.params.swipeout) app.initSwipeout();
    // Init Pull To Refresh
    if (app.initPullToRefresh && app.params.pullToRefresh) app.initPullToRefresh();
    // Init Swipe Panels
    if (app.initSwipePanels && app.params.swipePanel) app.initSwipePanels();
    // Init each page callbacks
    $('.page').each(function () {
        var pageContainer = $(this);
        var viewContainer = pageContainer.parents('.view');
        var view = viewContainer[0].f7View || false;
        var url = view && view.url ? view.url : false;
        if (viewContainer) {
            viewContainer.attr('data-page', pageContainer.attr('data-page') || undefined);
        }
        app.pageInitCallback(view, this, url, 'center');
    });
    // Init resize events
    if (app.initResize) app.initResize();
    
    // App Init callback
    if (app.params.onAppInit) app.params.onAppInit();
};
if (app.params.init) app.init();