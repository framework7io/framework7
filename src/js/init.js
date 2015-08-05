/*======================================================
************   App Init   ************
======================================================*/
app.init = function () {
    // Compile Template7 templates on app load
    if (app.initTemplate7Templates) app.initTemplate7Templates();
    
    // Init Plugins
    if (app.initPlugins) app.initPlugins();
    
    // Init Device
    if (app.getDeviceInfo) app.getDeviceInfo();
    
    // Init Click events
    if (app.initFastClicks && app.params.fastClicks) app.initFastClicks();
    if (app.initClickEvents) app.initClickEvents();

    // Init each page callbacks
    $('.page:not(.cached)').each(function () {
        app.initPageWithCallback(this);
    });

    // Init each navbar callbacks
    $('.navbar:not(.cached)').each(function () {
        app.initNavbarWithCallback(this); 
    });
    
    // Init resize events
    if (app.initResize) app.initResize();

    // Init push state
    if (app.initPushState && app.params.pushState) app.initPushState();

    // Init Live Swipeouts events
    if (app.initSwipeout && app.params.swipeout) app.initSwipeout();

    // Init Live Sortable events
    if (app.initSortable && app.params.sortable) app.initSortable();

    // Init Live Swipe Panels
    if (app.initSwipePanels && (app.params.swipePanel || app.params.swipePanelOnlyClose)) app.initSwipePanels();
    
    // Init Material Inputs
    if (app.params.material && app.initMaterialWatchInputs) app.initMaterialWatchInputs();
    
    // App Init callback
    if (app.params.onAppInit) app.params.onAppInit();

    // Plugin app init hook
    app.pluginHook('appInit');
};
if (app.params.init) app.init();
