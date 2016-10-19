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
    if (!pageContainer) return;
    if (pageContainer.f7PageInitialized && view && !view.params.domCache) return;

    var pageQuery = params.query;
    if (!pageQuery) {
        if (params.url && params.url.indexOf('?') > 0) {
            pageQuery = $.parseUrlQuery(params.url || '');
        }
        else if (pageContainer.f7PageData && pageContainer.f7PageData.query) {
            pageQuery = pageContainer.f7PageData.query;
        }
        else {
            pageQuery = {};
        }
    }

    // Page Data
    var pageData = {
        container: pageContainer,
        url: params.url,
        query: pageQuery,
        name: $(pageContainer).attr('data-page'),
        view: view,
        from: params.position,
        context: params.context,
        navbarInnerContainer: params.navbarInnerContainer,
        fromPage: params.fromPage
    };
    if (params.fromPage && !params.fromPage.navbarInnerContainer && params.oldNavbarInnerContainer) {
        params.fromPage.navbarInnerContainer = params.oldNavbarInnerContainer;
    }

    if (pageContainer.f7PageInitialized && ((view && view.params.domCache) || (!view && $(pageContainer).parents('.popup, .popover, .login-screen, .modal, .actions-modal, .picker-modal').length > 0))) {
        // Reinit Page
        app.reinitPage(pageContainer);

        // Callbacks
        app.pluginHook('pageReinit', pageData);
        if (app.params.onPageReinit) app.params.onPageReinit(app, pageData);
        app.triggerPageCallbacks('reinit', pageData.name, pageData);
        $(pageData.container).trigger('pageReinit', {page: pageData});
        return;
    }
    pageContainer.f7PageInitialized = true;

    // Store pagedata in page
    pageContainer.f7PageData = pageData;

    // Update View's activePage
    if (view && !params.preloadOnly && !params.reloadPrevious) {
        // Add data-page on view
        $(view.container).attr('data-page', pageData.name);
        // Update View active page data
        view.activePage = pageData;
    }

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
    if (!pageContainer) return;
    if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;
    // Page Data
    var pageData = {
        container: pageContainer,
        name: $(pageContainer).attr('data-page'),
        view: view,
        url: pageContainer.f7PageData && pageContainer.f7PageData.url,
        query: pageContainer.f7PageData && pageContainer.f7PageData.query,
        navbarInnerContainer: pageContainer.f7PageData && pageContainer.f7PageData.navbarInnerContainer,
        from: position,
        context: pageContext
    };
    // Before Init Callback
    app.pluginHook('pageBeforeRemove', pageData);
    if (app.params.onPageBeforeRemove) app.params.onPageBeforeRemove(app, pageData);
    app.triggerPageCallbacks('beforeRemove', pageData.name, pageData);
    $(pageData.container).trigger('pageBeforeRemove', {page: pageData});
    pageData = null;
};
app.pageBackCallback = function (callback, view, params) {
    // Page Data
    var pageContainer = params.pageContainer;
    var pageContext;
    if (!pageContainer) return;
    if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;

    var pageData = {
        container: pageContainer,
        name: $(pageContainer).attr('data-page'),
        url: pageContainer.f7PageData && pageContainer.f7PageData.url,
        query: pageContainer.f7PageData && pageContainer.f7PageData.query,
        view: view,
        from: params.position,
        context: pageContext,
        navbarInnerContainer: pageContainer.f7PageData && pageContainer.f7PageData.navbarInnerContainer,
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
app.pageAnimCallback = function (callback, view, params) {
    var pageContainer = params.pageContainer;
    var pageContext;
    if (!pageContainer) return;
    if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;

    var pageQuery = params.query;
    if (!pageQuery) {
        if (params.url && params.url.indexOf('?') > 0) {
            pageQuery = $.parseUrlQuery(params.url || '');
        }
        else if (pageContainer.f7PageData && pageContainer.f7PageData.query) {
            pageQuery = pageContainer.f7PageData.query;
        }
        else {
            pageQuery = {};
        }
    }
    // Page Data
    var pageData = {
        container: pageContainer,
        url: params.url,
        query: pageQuery,
        name: $(pageContainer).attr('data-page'),
        view: view,
        from: params.position,
        context: pageContext,
        swipeBack: params.swipeBack,
        navbarInnerContainer: pageContainer.f7PageData && pageContainer.f7PageData.navbarInnerContainer,
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
    pageContainer = $(pageContainer);
    if (pageContainer.length === 0) return;
    // Size navbars on page load
    if (app.sizeNavbars) app.sizeNavbars(pageContainer.parents('.' + app.params.viewClass)[0]);
    // Init messages
    if (app.initPageMessages) app.initPageMessages(pageContainer);
    // Init forms storage
    if (app.initFormsStorage) app.initFormsStorage(pageContainer);
    // Init smart select
    if (app.initSmartSelects) app.initSmartSelects(pageContainer);
    // Init slider
    if (app.initPageSwiper) app.initPageSwiper(pageContainer);
    // Init pull to refres
    if (app.initPullToRefresh) app.initPullToRefresh(pageContainer);
    // Init infinite scroll
    if (app.initPageInfiniteScroll) app.initPageInfiniteScroll(pageContainer);
    // Init searchbar
    if (app.initSearchbar) app.initSearchbar(pageContainer);
    // Init message bar
    if (app.initPageMessagebar) app.initPageMessagebar(pageContainer);
    // Init scroll toolbars
    if (app.initPageScrollToolbars) app.initPageScrollToolbars(pageContainer);
    // Init lazy images
    if (app.initImagesLazyLoad) app.initImagesLazyLoad(pageContainer);
    // Init progress bars
    if (app.initPageProgressbar) app.initPageProgressbar(pageContainer);
    // Init resizeable textareas
    if (app.initPageResizableTextarea) app.initPageResizableTextarea(pageContainer);
    // Init Material Preloader
    if (app.params.material && app.initPageMaterialPreloader) app.initPageMaterialPreloader(pageContainer);
    // Init Material Inputs
    if (app.params.material && app.initPageMaterialInputs) app.initPageMaterialInputs(pageContainer);
    // Init Material Tabbar
    if (app.params.material && app.initPageMaterialTabbar) app.initPageMaterialTabbar(pageContainer);
};
app.reinitPage = function (pageContainer) {
    pageContainer = $(pageContainer);
    if (pageContainer.length === 0) return;
    // Size navbars on page reinit
    if (app.sizeNavbars) app.sizeNavbars(pageContainer.parents('.' + app.params.viewClass)[0]);
    // Reinit slider
    if (app.reinitPageSwiper) app.reinitPageSwiper(pageContainer);
    // Reinit lazy load
    if (app.reinitLazyLoad) app.reinitLazyLoad(pageContainer);
};
app.initPageWithCallback = function (pageContainer) {
    pageContainer = $(pageContainer);
    var viewContainer = pageContainer.parents('.' + app.params.viewClass);
    if (viewContainer.length === 0) return;
    var view = viewContainer[0].f7View || undefined;
    var url = view && view.url ? view.url : undefined;
    if (viewContainer && pageContainer.attr('data-page')) {
        viewContainer.attr('data-page', pageContainer.attr('data-page'));
    }
    app.pageInitCallback(view, {pageContainer: pageContainer[0], url: url, position: 'center'});
};