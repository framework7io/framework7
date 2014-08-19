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

var pageCallbacksNames = ('beforeInit init beforeAnimation afterAnimation beforeRemove').split(' ');
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
app.pageInitCallback = function (view, pageContainer, url, position, navbarInnerContainer) {
    if (pageContainer.f7PageInitialized) return;
    pageContainer.f7PageInitialized = true;
    // Page Data
    var pageData = {
        container: pageContainer,
        url: url,
        query: $.parseUrlQuery(url || ''),
        name: $(pageContainer).attr('data-page'),
        view: view,
        from: position,
        navbarInnerContainer: navbarInnerContainer
    };

    // Store pagedata in page
    pageContainer.f7PageData = pageData;

    // Update View's activePage
    if (view) view.activePage = pageData;

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
    // Page Data
    var pageData = {
        container: pageContainer,
        name: $(pageContainer).attr('data-page'),
        view: view,
        from: position
    };
    // Before Init Callback
    app.pluginHook('pageBeforeRemove', pageData);
    if (app.params.onPageBeforeRemove) app.params.onPageBeforeRemove(app, pageData);
    app.triggerPageCallbacks('beforeRemove', pageData.name, pageData);
    $(pageData.container).trigger('pageBeforeRemove', {page: pageData});
};
app.pageAnimCallbacks = function (callback, view, params) {
    // Page Data
    var pageData = {
        container: params.pageContainer,
        url: params.url,
        query: $.parseUrlQuery(params.url || ''),
        name: $(params.pageContainer).attr('data-page'),
        view: view,
        from: params.position,
        swipeBack: params.swipeBack
    };
    var oldPage = params.oldPage,
        newPage = params.newPage;

    // Update page date
    params.pageContainer.f7PageData = pageData;

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
        if (!newPage.hasClass('no-navbar') && oldPage.hasClass('no-navbar')) {
            view.showNavbar();
        }
        // Hide/show navbar toolbar
        if (newPage.hasClass('no-toolbar') && !oldPage.hasClass('no-toolbar')) {
            view.hideToolbar();
        }
        if (!newPage.hasClass('no-toolbar') && oldPage.hasClass('no-toolbar')) {
            view.showToolbar();
        }
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
    // Init pull to refres
    if (app.initPullToRefresh) app.initPullToRefresh(pageContainer);
    // Init infinite scroll
    if (app.initInfiniteScroll) app.initInfiniteScroll(pageContainer);
    // Init searchbar
    if (app.initSearchbar) app.initSearchbar(pageContainer);
    // Init message bar
    if (app.initMessagebar) app.initMessagebar(pageContainer);
};

// Load Page
app.allowPageChange = true;
app._tempDomElement = document.createElement('div');

// Search required element in parsed content in related view
function _findElement(selector, container, view) {
    container = $(container);
    var found = container.find(selector);
    if (found.length > 1) {
        if (typeof view.selector === 'string') {
            // Search in related view
            found = container.find(view.selector + ' ' + selector);
        }
        if (found.length > 1) {
            // Search in main view
            found = container.find('.' + app.params.viewMainClass + ' ' + selector);
        }
    }
    if (found.length === 1) return found;
    else {
        return undefined;
    }
}

// Set pages classess for animation
function _animatePages(leftPage, rightPage, direction, view) {
    // Loading new page
    if (direction === 'to-left') {
        leftPage.removeClass('page-on-center').addClass('page-from-center-to-left');
        rightPage.addClass('page-from-right-to-center');
    }
    // Go back
    if (direction === 'to-right') {
        leftPage.removeClass('page-on-left').addClass('page-from-left-to-center');
        rightPage.removeClass('page-on-center').addClass('page-from-center-to-right');
    }
}

// Set navbars classess for animation
function _animateNavbars(leftNavbarInner, rightNavbarInner, direction, view) {
    // Loading new page
    if (direction === 'to-left') {
        rightNavbarInner.removeClass('navbar-on-right').addClass('navbar-from-right-to-center');
        rightNavbarInner.find('.sliding').each(function () {
            var sliding = $(this);
            sliding.transform('translate3d(0px,0,0)');
            if (app.params.animateNavBackIcon) {
                if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                    sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                }
            }
        });

        leftNavbarInner.removeClass('navbar-on-center').addClass('navbar-from-center-to-left');
        leftNavbarInner.find('.sliding').each(function () {
            var sliding = $(this);
            if (app.params.animateNavBackIcon) {
                if (sliding.hasClass('center') && rightNavbarInner.find('.sliding.left .back .icon').length > 0) {
                    this.f7NavbarLeftOffset += rightNavbarInner.find('.sliding.left .back span')[0].offsetLeft;
                }
                if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                    sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarLeftOffset) + 'px,0,0)');
                }
            }
            sliding.transform('translate3d(' + (this.f7NavbarLeftOffset) + 'px,0,0)');
        });
    }
    // Go back
    if (direction === 'to-right') {
        leftNavbarInner.removeClass('navbar-on-left').addClass('navbar-from-left-to-center');
        leftNavbarInner.find('.sliding').each(function () {
            var sliding = $(this);
            sliding.transform('translate3d(0px,0,0)');
            if (app.params.animateNavBackIcon) {
                if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                    sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                }
            }
        });

        rightNavbarInner.removeClass('navbar-on-center').addClass('navbar-from-center-to-right');
        rightNavbarInner.find('.sliding').each(function () {
            var sliding = $(this);
            if (app.params.animateNavBackIcon) {
                if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                    sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarRightOffset) + 'px,0,0)');
                }
            }
            sliding.transform('translate3d(' + (this.f7NavbarRightOffset) + 'px,0,0)');
        });
    }
}
function _load(view, url, content, animatePages) {
    var viewContainer = $(view.container), pagesContainer = $(view.pagesContainer),
        newPage, oldPage, pagesInView, i, oldNavbarInner, newNavbarInner, navbar, dynamicNavbar;

    if (typeof animatePages === 'undefined') animatePages = view.params.animatePages;

    // Plugin hook
    app.pluginHook('loadPage', view, url, content);

    app._tempDomElement.innerHTML = '';

    // Parse DOM
    if (url || (typeof content === 'string')) {
        app._tempDomElement.innerHTML = content;
    } else {
        if ('length' in content && content.length > 1) {
            for (var ci = 0; ci < content.length; ci++) {
                $(app._tempDomElement).append(content[ci]);
            }
        } else {
            $(app._tempDomElement).append(content);
        }
    }

    // Find new page
    newPage = _findElement('.page', app._tempDomElement, view);

    // If page not found exit
    if (!newPage) {
        view.allowPageChange = true;
        return;
    }

    newPage.addClass('page-on-right');

    // Find old page (should be the last one) and remove older pages
    pagesInView = pagesContainer.children('.page:not(.cached)');
    if (pagesInView.length > 1) {
        for (i = 0; i < pagesInView.length - 2; i++) {
            if (!view.params.domCache) {
                app.pageRemoveCallback(view, pagesInView[i], 'left');
                $(pagesInView[i]).remove();
            }
            else {
                $(pagesInView[i]).addClass('cached');
            }
        }
        if (!view.params.domCache) {
            app.pageRemoveCallback(view, pagesInView[i], 'left');
            $(pagesInView[i]).remove();
        }
        else {
            $(pagesInView[i]).addClass('cached');
        }
    }

    oldPage = pagesContainer.children('.page:not(.cached)');

    // Dynamic navbar
    if (view.params.dynamicNavbar) {
        dynamicNavbar = true;
        // Find navbar
        newNavbarInner = _findElement('.navbar-inner', app._tempDomElement, view);
        if (!newNavbarInner) {
            dynamicNavbar = false;
        }
        navbar = viewContainer.find('.navbar');
        oldNavbarInner = navbar.find('.navbar-inner:not(.cached)');
        if (oldNavbarInner.length > 0) {
            for (i = 0; i < oldNavbarInner.length - 1; i++) {
                if (!view.params.domCache)
                    $(oldNavbarInner[i]).remove();
                else
                    $(oldNavbarInner[i]).addClass('cached');
            }
            if (!newNavbarInner && oldNavbarInner.length === 1) {
                if (!view.params.domCache)
                    $(oldNavbarInner[0]).remove();
                else
                    $(oldNavbarInner[0]).addClass('cached');
            }
            oldNavbarInner = navbar.find('.navbar-inner:not(.cached)');
        }
    }
    if (dynamicNavbar) {
        newNavbarInner.addClass('navbar-on-right');
        navbar.append(newNavbarInner[0]);
    }

    // save content areas into view's cache
    if (!url) {
        url = '#content-' + view.history.length;

        if (!view.params.domCache) {
            if (view.history.length === 1) {
                view.contentCache[view.history[0]] = { nav: oldNavbarInner, page: oldPage };
            }
            view.contentCache[url] = { nav: newNavbarInner, page: newPage };
        }
    }

    // Update View history
    view.url = url;
    view.history.push(url);

    // Append Old Page and add classes for animation
    pagesContainer.append(newPage[0]);

    // Page Init Events
    app.pageInitCallback(view, newPage[0], url, 'right', dynamicNavbar ? newNavbarInner[0] : undefined);

    // Navbar init event
    if (dynamicNavbar) {
        app.navbarInitCallback(view, newPage[0], navbar[0], newNavbarInner[0], url, 'right');
    }

    if (dynamicNavbar && animatePages) {
        newNavbarInner.find('.sliding').each(function () {
            var sliding = $(this);
            sliding.transform('translate3d(' + (this.f7NavbarRightOffset) + 'px,0,0)');
            if (app.params.animateNavBackIcon) {
                if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                    sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarRightOffset) + 'px,0,0)');
                }
            }
        });
    }
    // Force reLayout
    var clientLeft = newPage[0].clientLeft;

    // Before Anim Callback
    app.pageAnimCallbacks('before', view, {pageContainer: newPage[0], url: url, position: 'right', oldPage: oldPage, newPage: newPage});

    function afterAnimation() {
        view.allowPageChange = true;
        newPage.removeClass('page-from-right-to-center page-on-right').addClass('page-on-center');
        oldPage.removeClass('page-from-center-to-left page-on-center').addClass('page-on-left');
        if (dynamicNavbar) {
            newNavbarInner.removeClass('navbar-from-right-to-center navbar-on-right').addClass('navbar-on-center');
            oldNavbarInner.removeClass('navbar-from-center-to-left navbar-on-center').addClass('navbar-on-left');
        }
        app.pageAnimCallbacks('after', view, {pageContainer: newPage[0], url: url, position: 'right', oldPage: oldPage, newPage: newPage});
        if (app.params.pushState) app.pushStateClearQueue();
    }

    if (animatePages) {
        // Set pages before animation
        _animatePages(oldPage, newPage, 'to-left', view);

        // Dynamic navbar animation
        if (dynamicNavbar) {
            setTimeout(function () {
                _animateNavbars(oldNavbarInner, newNavbarInner, 'to-left', view);
            }, 0);

        }
        newPage.animationEnd(function (e) {
            afterAnimation();
        });
    }
    else {
        afterAnimation();
    }
}
function preprocess(content, url, next) {
    //Modified by Greg Keys, added callback
    
    // Plugin hook
    app.pluginHook('preprocess', content, url, next);
    
    // Preprocess by plugin
    content = app.pluginProcess('preprocess', content);

    if (app.params.preprocess) {
        content = app.params.preprocess(content, url, next);
        //this should handle backwards compatibility
        //@NOTE if using loadPage from within preprocess it may be necessary to set myApp.allowPageChange = true;
        if (typeof content !== 'undefined') {
            next(content);
        }
    } else {//we need to call the callback function if there is no preprocessing
        next(content);
    }
}
app.loadContent = function (view, content, animatePages, pushState) {
    if (!view.allowPageChange) return false;
    view.allowPageChange = false;
    if (app.xhr && view.xhr && view.xhr === app.xhr) {
        app.xhr.abort();
        app.xhr = false;
    }
    if (app.params.pushState)  {
        if (typeof pushState === 'undefined') pushState = true;
        var pushStateRoot = app.params.pushStateRoot || '';
        if (pushState) history.pushState({content: content, url: '#content-' + view.history.length}, '', pushStateRoot + app.params.pushStateSeparator + '#content-' + view.history.length);
    }
    preprocess(content, null, function (content) {
        _load(view, null, content, animatePages);
    });
};
app.loadPage = function (view, url, animatePages, pushState) {
    if (!view.allowPageChange) return false;
    if (view.url === url) return false;
    view.allowPageChange = false;
    if (app.xhr && view.xhr && view.xhr === app.xhr) {
        app.xhr.abort();
        app.xhr = false;
    }
    app.get(url, view, function (data, error) {
        if (error) {
            view.allowPageChange = true;
            return;
        }
        if (app.params.pushState)  {
            if (typeof pushState === 'undefined') pushState = true;
            var pushStateRoot = app.params.pushStateRoot || '';
            if (pushState) history.pushState({url: url}, '', pushStateRoot + app.params.pushStateSeparator + url);
        }
        
        preprocess(data, url, function (data) {
            _load(view, url, data, animatePages);
        });
    });
};
app.goBack = function (view, url, animatePages, preloadOnly, pushState) {
    if (!view.allowPageChange) return false;

    view.allowPageChange = false;
    if (app.xhr && view.xhr && view.xhr === app.xhr) {
        app.xhr.abort();
        app.xhr = false;
    }
    app.pluginHook('goBack', view, url, preloadOnly);

    if (app.params.pushState)  {
        if (typeof pushState === 'undefined') pushState = true;
        if (!preloadOnly && history.state && pushState) {
            history.back();
        }
    }

    var viewContainer = $(view.container),
        pagesContainer = $(view.pagesContainer),
        pagesInView = pagesContainer.children('.page'),
        oldPage, newPage, oldNavbarInner, newNavbarInner, navbar, dynamicNavbar;

    if (typeof animatePages === 'undefined') animatePages = view.params.animatePages;

    function _animate() {
        // Page before animation callback
        app.pageAnimCallbacks('before', view, {pageContainer: newPage[0], url: url, position: 'left', oldPage: oldPage, newPage: newPage});

        function afterAnimation() {
            app.afterGoBack(view, oldPage[0], newPage[0]);
            app.pageAnimCallbacks('after', view, {pageContainer: newPage[0], url: url, position: 'left', oldPage: oldPage, newPage: newPage});
        }

        if (animatePages) {
            // Set pages before animation
            _animatePages(newPage, oldPage, 'to-right', view);

            // Dynamic navbar animation
            if (dynamicNavbar) {
                setTimeout(function () {
                    _animateNavbars(newNavbarInner, oldNavbarInner, 'to-right', view);
                }, 0);
            }
            
            newPage.animationEnd(function () {
                afterAnimation();
            });
        }
        else {
            newNavbarInner.find('.sliding, .sliding .back .icon').transform('');
            afterAnimation();
        }
    }
    function _preload() {
        newPage = _findElement('.page', app._tempDomElement, view);

        // If pages not found or there are still more than one, exit
        if (!newPage) {
            view.allowPageChange = true;
            return;
        }
        newPage.addClass('page-on-left');

        // Find old page (should be the only one)
        oldPage = $(pagesInView[0]);

        // Dynamic navbar
        if (view.params.dynamicNavbar) {
            dynamicNavbar = true;
            // Find navbar
            newNavbarInner = _findElement('.navbar-inner', app._tempDomElement, view);
            if (!newNavbarInner) {
                dynamicNavbar = false;
            }
            
        }

        if (dynamicNavbar) {
            navbar = viewContainer.find('.navbar');
            oldNavbarInner = navbar.find('.navbar-inner');
            newNavbarInner.addClass(oldNavbarInner.length > 0 ? 'navbar-on-left' : 'navbar-on-center');
            if (oldNavbarInner.length > 1) {
                $(oldNavbarInner[0]).remove();
                oldNavbarInner = navbar.find('.navbar-inner');
            }
            navbar.prepend(newNavbarInner[0]);
            
        }
        // Prepend new Page and add classes for animation
        pagesContainer.prepend(newPage[0]);

        // Page Init Events
        app.pageInitCallback(view, newPage[0], url, 'left', dynamicNavbar ? newNavbarInner[0] : undefined);

        // Navbar init event
        if (dynamicNavbar) {
            app.navbarInitCallback(view, newPage[0], navbar[0], newNavbarInner[0], url, 'right');
        }

        if (dynamicNavbar && newNavbarInner.hasClass('navbar-on-left') && animatePages) {
            newNavbarInner.find('.sliding').each(function () {
                var sliding = $(this);
                if (app.params.animateNavBackIcon) {
                    if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                        sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarLeftOffset) + 'px,0,0)');
                    }
                    if (sliding.hasClass('center') && oldNavbarInner.find('.left .back .icon').length > 0) {
                        this.f7NavbarLeftOffset += oldNavbarInner.find('.left .back span')[0].offsetLeft;
                    }
                }
                sliding.transform('translate3d(' + (this.f7NavbarLeftOffset) + 'px,0,0)');
            });
        }

        // Exit if we need only to preload page
        if (preloadOnly) {
            newPage.addClass('page-on-left');
            view.allowPageChange = true;
            return;
        }

        // Update View's URL
        view.url = url;

        // Force reLayout
        var clientLeft = newPage[0].clientLeft;

        _animate();
    }

    if (pagesInView.length > 1) {
        // Exit if only preloadOnly
        if (preloadOnly) {
            view.allowPageChange = true;
            return;
        }
        // Update View's URL
        view.url = view.history[view.history.length - 2];

        // Define old and new pages
        newPage = $(pagesInView[pagesInView.length - 2]);
        oldPage = $(pagesInView[pagesInView.length - 1]);

        // Dynamic navbar
        if (view.params.dynamicNavbar) {
            dynamicNavbar = true;
            // Find navbar
            var inners = viewContainer.find('.navbar-inner:not(.cached)');
            newNavbarInner = $(inners[0]);
            oldNavbarInner = $(inners[1]);
        }
        _animate();
    }
    else {
        if (url && url.indexOf('#') === 0) url = undefined;
        if (view.history.length > 1) {
            url = view.history[view.history.length - 2];
        }
        if (!url) {
            view.allowPageChange = true;
            return;
        }
        
        // Check current url is in cache?
        if (!view.params.domCache && (url in view.contentCache)) {
            var _cache = view.contentCache[url];
            app._tempDomElement.innerHTML = '';
            $(app._tempDomElement).append(_cache.nav[0]).append(_cache.page[0]);
            _preload();
            return;
        }

        app.get(url, view, function (data, error) {
            if (error) {
                view.allowPageChange = true;
                return;
            }
            preprocess(data, null, function (data) {
                app._tempDomElement.innerHTML = data;
                _preload();
            });
        });
    }
};
app.afterGoBack = function (view, oldPage, newPage) {
    // Remove old page and set classes on new one
    oldPage = $(oldPage);
    newPage = $(newPage);
    app.pageRemoveCallback(view, oldPage[0], 'right');
    oldPage.remove();
    newPage.removeClass('page-from-left-to-center page-on-left').addClass('page-on-center');
    view.allowPageChange = true;
    // Updated dynamic navbar
    if (view.params.dynamicNavbar) {
        var inners = $(view.container).find('.navbar-inner:not(.cached)');
        var oldNavbar = $(inners[1]).remove();
        var newNavbar = $(inners[0]).removeClass('navbar-on-left navbar-from-left-to-center').addClass('navbar-on-center');

        if (app.params.preloadPreviousPage && view.params.domCache) {
            var cachedNavs = $(view.container).find('.navbar-inner.cached');
            $(cachedNavs[cachedNavs.length - 1]).removeClass('cached');
        }
    }
    // Update View's History
    var previousURL = view.history.pop();
    
    // Check previous page is content based only and remove it from content cache
    if (!view.params.domCache && previousURL && previousURL.indexOf('#content-') > -1 && (previousURL in view.contentCache)) {
        view.contentCache[previousURL] = null;
        delete view.contentCache[previousURL];
    }
    
    if (app.params.pushState) app.pushStateClearQueue();

    // Preload previous page
    if (app.params.preloadPreviousPage) {
        if (view.params.domCache) {
            var cachedPages = $(view.container).find('.page.cached');
            $(cachedPages[cachedPages.length - 1]).removeClass('cached');
        }
        app.goBack(view, false, undefined, true);
    }

};
