/*======================================================
************   Pages   ************
======================================================*/
// Page Callbacks API
app.pageCallbacks = {};

app.onPage = function (callbackName, pageName, callback) {
    if (pageName && pageName.split(' ').length > 1) {
        var pageNames = pageName.split(' ');
        var returnCallbacks = [];
        for (var i = 0; i < pageNames.length; i++) {
            returnCallbacks.push(app.onPage(callbackName, pageNames[i], callback));
        }
        returnCallbacks.remove = function () {
            for (var i = 0; i < returnCallbacks.length; i++) {
                returnCallbacks[i].remove();
            }
        };
        returnCallbacks.trigger = function () {
            for (var i = 0; i < returnCallbacks.length; i++) {
                returnCallbacks[i].trigger();
            }
        };
        return returnCallbacks;
    }
    var callbacks = app.pageCallbacks[callbackName][pageName];
    if (!callbacks) {
        callbacks = app.pageCallbacks[callbackName][pageName] = [];
    }
    app.pageCallbacks[callbackName][pageName].push(callback);
    return {
        remove: function () {
            var removeIndex;
            for (var i = 0; i < callbacks.length; i++) {
                if (callbacks[i].toString() === callback.toString()) {
                    removeIndex = i;
                }
            }
            if (typeof removeIndex !== 'undefined') callbacks.splice(removeIndex, 1);
        },
        trigger: callback
    };
};

//Create callbacks methods dynamically
function createPageCallback(callbackName) {
    var capitalized = callbackName.replace(/^./, function (match) {
        return match.toUpperCase();
    });
    app['onPage' + capitalized] = function (pageName, callback) {
        return app.onPage(callbackName, pageName, callback);
    };
}

var pageCallbacksNames = ('beforeInit init reinit beforeAnimation afterAnimation back afterBack beforeRemove').split(' ');
for (var i = 0; i < pageCallbacksNames.length; i++) {
    app.pageCallbacks[pageCallbacksNames[i]] = {};
    createPageCallback(pageCallbacksNames[i]);
}

app.triggerPageCallbacks = function (callbackName, pageName, pageData) {
    var allPagesCallbacks = app.pageCallbacks[callbackName]['*'];
    if (allPagesCallbacks) {
        for (var j = 0; j < allPagesCallbacks.length; j++) {
            allPagesCallbacks[j](pageData);
        }
    }
    var callbacks = app.pageCallbacks[callbackName][pageName];
    if (!callbacks || callbacks.length === 0) return;
    for (var i = 0; i < callbacks.length; i++) {
        callbacks[i](pageData);
    }
};

// On Page Init Callback
app.pageInitCallback = function (view, params) {
    var pageContainer = params.pageContainer;
    if (pageContainer.f7PageInitialized && !view.params.domCache) return;

    // Page Data
    var pageData = {
        container: pageContainer,
        url: params.url,
        query: params.query || $.parseUrlQuery(params.url || ''),
        name: $(pageContainer).attr('data-page'),
        view: view,
        from: params.position,
        context: params.context,
        navbarInnerContainer: params.navbarInnerContainer,
        fromPage: params.fromPage
    };

    if (pageContainer.f7PageInitialized && view.params.domCache) {
        // Reinit Page
        app.reinitPage(pageContainer);

        // Callbacks
        app.pluginHook('pageReinit', pageData);
        if (app.params.onPageReinit) app.params.onPageBeforeInit(app, pageData);
        app.triggerPageCallbacks('reinit', pageData.name, pageData);
        $(pageData.container).trigger('pageReinit', {page: pageData});
        return;
    }
    pageContainer.f7PageInitialized = true;

    // Store pagedata in page
    pageContainer.f7PageData = pageData;

    // Update View's activePage
    if (view && !params.preloadOnly) view.activePage = pageData;

    // Before Init Callbacks
    app.pluginHook('pageBeforeInit', pageData);
    if (app.params.onPageBeforeInit) app.params.onPageBeforeInit(app, pageData);
    app.triggerPageCallbacks('beforeInit', pageData.name, pageData);
    $(pageData.container).trigger('pageBeforeInit', {page: pageData});

    // Init page
    app.initPage(pageContainer);

    // Init Callback
    app.pluginHook('pageInit', pageData);
    if (app.params.onPageInit) app.params.onPageInit(app, pageData);
    app.triggerPageCallbacks('init', pageData.name, pageData);
    $(pageData.container).trigger('pageInit', {page: pageData});
};
app.pageRemoveCallback = function (view, pageContainer, position) {
    var pageContext;
    if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;
    // Page Data
    var pageData = {
        container: pageContainer,
        name: $(pageContainer).attr('data-page'),
        view: view,
        url: pageContainer.f7PageData && pageContainer.f7PageData.url,
        query: pageContainer.f7PageData && pageContainer.f7PageData.query,
        from: position,
        context: pageContext
    };
    // Before Init Callback
    app.pluginHook('pageBeforeRemove', pageData);
    if (app.params.onPageBeforeRemove) app.params.onPageBeforeRemove(app, pageData);
    app.triggerPageCallbacks('beforeRemove', pageData.name, pageData);
    $(pageData.container).trigger('pageBeforeRemove', {page: pageData});
};
app.pageBackCallbacks = function (callback, view, params) {
    // Page Data
    var pageContainer = params.pageContainer;
    var pageContext;
    if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;

    var pageData = {
        container: pageContainer,
        name: $(pageContainer).attr('data-page'),
        url: pageContainer.f7PageData && pageContainer.f7PageData.url,
        query: pageContainer.f7PageData && pageContainer.f7PageData.query,
        view: view,
        from: params.position,
        context: pageContext,
        swipeBack: params.swipeBack
    };

    if (callback === 'after') {
        app.pluginHook('pageAfterBack', pageData);
        if (app.params.onPageAfterBack) app.params.onPageAfterBack(app, pageData);
        app.triggerPageCallbacks('afterBack', pageData.name, pageData);
        $(pageContainer).trigger('pageAfterBack', {page: pageData});

    }
    if (callback === 'before') {
        app.pluginHook('pageBack', pageData);
        if (app.params.onPageBack) app.params.onPageBack(app, pageData);
        app.triggerPageCallbacks('back', pageData.name, pageData);
        $(pageData.container).trigger('pageBack', {page: pageData});
    }
};
app.pageAnimCallbacks = function (callback, view, params) {
    var pageContainer = params.pageContainer;
    var pageContext;
    if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;
    // Page Data
    var pageData = {
        container: pageContainer,
        url: params.url,
        query: params.query || $.parseUrlQuery(params.url || ''),
        name: $(pageContainer).attr('data-page'),
        view: view,
        from: params.position,
        context: pageContext,
        swipeBack: params.swipeBack,
        fromPage: params.fromPage
    };
    var oldPage = params.oldPage,
        newPage = params.newPage;

    // Update page date
    pageContainer.f7PageData = pageData;

    if (callback === 'after') {
        app.pluginHook('pageAfterAnimation', pageData);
        if (app.params.onPageAfterAnimation) app.params.onPageAfterAnimation(app, pageData);
        app.triggerPageCallbacks('afterAnimation', pageData.name, pageData);
        $(pageData.container).trigger('pageAfterAnimation', {page: pageData});

    }
    if (callback === 'before') {
        // Add data-page on view
        $(view.container).attr('data-page', pageData.name);

        // Update View's activePage
        if (view) view.activePage = pageData;

        // Hide/show navbar dynamically
        if (newPage.hasClass('no-navbar') && !oldPage.hasClass('no-navbar')) {
            view.hideNavbar();
        }
        if (!newPage.hasClass('no-navbar') && (oldPage.hasClass('no-navbar') || oldPage.hasClass('no-navbar-by-scroll'))) {
            view.showNavbar();
        }
        // Hide/show navbar toolbar
        if (newPage.hasClass('no-toolbar') && !oldPage.hasClass('no-toolbar')) {
            view.hideToolbar();
        }
        if (!newPage.hasClass('no-toolbar') && (oldPage.hasClass('no-toolbar') || oldPage.hasClass('no-toolbar-by-scroll'))) {
            view.showToolbar();
        }
        // Hide/show tabbar
        var tabBar;
        if (newPage.hasClass('no-tabbar') && !oldPage.hasClass('no-tabbar')) {
            tabBar = $(view.container).find('.tabbar');
            if (tabBar.length === 0) tabBar = $(view.container).parents('.' + app.params.viewsClass).find('.tabbar');
            app.hideToolbar(tabBar);
        }
        if (!newPage.hasClass('no-tabbar') && (oldPage.hasClass('no-tabbar') || oldPage.hasClass('no-tabbar-by-scroll'))) {
            tabBar = $(view.container).find('.tabbar');
            if (tabBar.length === 0) tabBar = $(view.container).parents('.' + app.params.viewsClass).find('.tabbar');
            app.showToolbar(tabBar);
        }

        oldPage.removeClass('no-navbar-by-scroll no-toolbar-by-scroll');
        // Callbacks
        app.pluginHook('pageBeforeAnimation', pageData);
        if (app.params.onPageBeforeAnimation) app.params.onPageBeforeAnimation(app, pageData);
        app.triggerPageCallbacks('beforeAnimation', pageData.name, pageData);
        $(pageData.container).trigger('pageBeforeAnimation', {page: pageData});
    }
};

// Init Page Events and Manipulations
app.initPage = function (pageContainer) {
    // Size navbars on page load
    if (app.sizeNavbars) app.sizeNavbars($(pageContainer).parents('.' + app.params.viewClass)[0]);
    // Init messages
    if (app.initMessages) app.initMessages(pageContainer);
    // Init forms storage
    if (app.initFormsStorage) app.initFormsStorage(pageContainer);
    // Init smart select
    if (app.initSmartSelects) app.initSmartSelects(pageContainer);
    // Init slider
    if (app.initSlider) app.initSlider(pageContainer);
    if (app.initSwiper) app.initSwiper(pageContainer);
    // Init pull to refres
    if (app.initPullToRefresh) app.initPullToRefresh(pageContainer);
    // Init infinite scroll
    if (app.initInfiniteScroll) app.initInfiniteScroll(pageContainer);
    // Init searchbar
    if (app.initSearchbar) app.initSearchbar(pageContainer);
    // Init message bar
    if (app.initMessagebar) app.initMessagebar(pageContainer);
    // Init scroll toolbars
    if (app.initScrollToolbars) app.initScrollToolbars(pageContainer);
    // Init scroll toolbars
    if (app.initImagesLazyLoad) app.initImagesLazyLoad(pageContainer);
};
app.reinitPage = function (pageContainer) {
    // Size navbars on page reinit
    if (app.sizeNavbars) app.sizeNavbars($(pageContainer).parents('.' + app.params.viewClass)[0]);
    // Reinit slider
    if (app.reinitSlider) app.reinitSlider(pageContainer);
    if (app.reinitSwiper) app.reinitSwiper(pageContainer);
    // Reinit lazy load
    if (app.reinitLazyLoad) app.reinitLazyLoad(pageContainer);
};