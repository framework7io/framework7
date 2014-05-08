/*======================================================
************   App Init   ************
======================================================*/
app.init = function () {
    if (app.getDeviceInfo) app.getDeviceInfo();

    // Init Click events
    if (app.initFastClicks && app.params.fastClicks) app.initFastClicks();
    if (app.initClickEvents) app.initClickEvents();

    // Init each page callbacks
    $('.page').each(function () {
        var pageContainer = $(this);
        var viewContainer = pageContainer.parents('.' + app.params.viewClass);
        var view = viewContainer[0].f7View || false;
        var url = view && view.url ? view.url : false;
        if (viewContainer) {
            viewContainer.attr('data-page', pageContainer.attr('data-page') || undefined);
        }
        app.pageInitCallback(view, this, url, 'center');
    });
    
    // Init resize events
    if (app.initResize) app.initResize();

    // Init push state
    if (app.initPushState && app.params.pushState) app.initPushState();

    // Init Swipeouts events
    if (app.initSwipeout && app.params.swipeout) app.initSwipeout();

    // Init Sortable events
    if (app.initSortable && app.params.sortable) app.initSortable();

    // Init Pull To Refresh
    if (app.initPullToRefresh && app.params.pullToRefresh) app.initPullToRefresh();

    // Init Swipe Panels
    if (app.initSwipePanels && app.params.swipePanel) app.initSwipePanels();
    
    // App Init callback
    if (app.params.onAppInit) app.params.onAppInit();
};
if (app.params.init) app.init();
