/*======================================================
************   Navigation / Router   ************
======================================================*/
app.router = {
    // Temporary DOM Element
    temporaryDom: document.createElement('div'),

    // Find page or navbar in passed container which are related to View
    findElement: function (selector, container, view, notCached) {
        container = $(container);
        if (notCached) selector = selector + ':not(.cached)';
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
            // Try to find non cached
            if (!notCached) found = app.router.findElement(selector, container, view, true);
            if (found && found.length === 1) return found;
            else return undefined;
        }
    },

    // Set pages classess for animationEnd
    animatePages: function (leftPage, rightPage, direction, view) {
        // Loading new page
        var removeClasses = 'page-on-center page-on-right page-on-left';
        if (direction === 'to-left') {
            // leftPage.removeClass('page-on-center').addClass('page-from-center-to-left');
            // rightPage.removeClass('page-on-left').addClass('page-from-right-to-center');
            leftPage.removeClass(removeClasses).addClass('page-from-center-to-left');
            rightPage.removeClass(removeClasses).addClass('page-from-right-to-center');
        }
        // Go back
        if (direction === 'to-right') {
            // leftPage.removeClass('page-on-left').addClass('page-from-left-to-center');
            // rightPage.removeClass('page-on-center').addClass('page-from-center-to-right');
            leftPage.removeClass(removeClasses).addClass('page-from-left-to-center');
            rightPage.removeClass(removeClasses).addClass('page-from-center-to-right');
            
        }
    },

    // Prepare navbar before animarion
    prepareNavbar: function (newNavbarInner, oldNavbarInner, newNavbarPosition) {
        $(newNavbarInner).find('.sliding').each(function () {
            var sliding = $(this);
            var slidingOffset = newNavbarPosition === 'right' ? this.f7NavbarRightOffset : this.f7NavbarLeftOffset;

            if (app.params.animateNavBackIcon) {
                if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                    sliding.find('.back .icon').transform('translate3d(' + (-slidingOffset) + 'px,0,0)');
                }
                if (newNavbarPosition === 'left' && sliding.hasClass('center') && $(oldNavbarInner).find('.left .back .icon ~ span').length > 0) {
                    slidingOffset += $(oldNavbarInner).find('.left .back span')[0].offsetLeft;
                }
            }

            sliding.transform('translate3d(' + slidingOffset + 'px,0,0)');
        });
    },

    // Set navbars classess for animation
    animateNavbars: function (leftNavbarInner, rightNavbarInner, direction, view) {
        // Loading new page
        var removeClasses = 'navbar-on-right navbar-on-center navbar-on-left';
        if (direction === 'to-left') {
            rightNavbarInner.removeClass(removeClasses).addClass('navbar-from-right-to-center');
            rightNavbarInner.find('.sliding').each(function () {
                var sliding = $(this);
                sliding.transform('translate3d(0px,0,0)');
                if (app.params.animateNavBackIcon) {
                    if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                        sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                    }
                }
            });

            leftNavbarInner.removeClass(removeClasses).addClass('navbar-from-center-to-left');
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
            leftNavbarInner.removeClass(removeClasses).addClass('navbar-from-left-to-center');
            leftNavbarInner.find('.sliding').each(function () {
                var sliding = $(this);
                sliding.transform('translate3d(0px,0,0)');
                if (app.params.animateNavBackIcon) {
                    if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                        sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                    }
                }
            });

            rightNavbarInner.removeClass(removeClasses).addClass('navbar-from-center-to-right');
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
    },

    preprocess: function(content, url, next) {
        // Plugin hook
        app.pluginHook('routerPreprocess', content, url, next);
        
        // Preprocess by plugin
        content = app.pluginProcess('preprocess', content);

        if (app.params.preprocess) {
            content = app.params.preprocess(content, url, next);
            if (typeof content !== 'undefined') {
                next(content);
            }
        } else {
            next(content);
        }
    },

    template7Render: function (view, options) {
        var url = options.url,
            content = options.content, //initial content
            t7_rendered_content = options.content, // will be rendered using Template7
            context = options.context, // Context data for Template7
            contextName = options.contextName, 
            template = options.template, // Template 7 compiled template
            pageName = options.pageName;

        var t7_ctx, t7_template;
        if (typeof content === 'string') {
            if (url) {
                if (app.template7Cache[url]) t7_template = t7.cache[url];
                else {
                    t7_template = t7.compile(content);
                    t7.cache[url] = t7_template;
                }
            }
            else t7_template = t7.compile(content);
        }
        else if (template) {
            t7_template = template;
        }

        if (context) t7_ctx = context;
        else {
            if (contextName) {
                if (contextName.indexOf('.') >= 0) {
                    var _ctx_path = contextName.split('.');
                    var _ctx = t7.data[_ctx_path[0]];
                    for (var i = 1; i < _ctx_path.length; i++) {
                        if (_ctx_path[i]) _ctx = _ctx[_ctx_path[i]];
                    }
                    t7_ctx = _ctx;
                }
                else t7_ctx = t7.data[contextName];
            }
            if (!t7_ctx && url) {
                t7_ctx = t7.data['url:' + url];
            }
            if (!t7_ctx && typeof content === 'string' && !template) {
                //try to find by page name in content
                var pageNameMatch = content.match(/(data-page=["'][^"^']*["'])/);
                if (pageNameMatch) {
                    var page = pageNameMatch[0].split('data-page=')[1].replace(/['"]/g, '');
                    if (page) t7_ctx = t7.data['page:' + page];
                }
            }
            if (!t7_ctx && template && t7.templates) {
                // Try to find matched template name in t7.templates
                for (var templateName in t7.templates) {
                    if (t7.templates[templateName] === template) t7_ctx = t7.data[templateName];
                }
            }
            if (!t7_ctx) t7_ctx = {};
        }

        if (t7_template && t7_ctx) {
            if (typeof t7_ctx === 'function') t7_ctx = t7_ctx();
            if (url) {
                // Extend data with URL query
                var query = $.parseUrlQuery(url);
                t7_ctx.url_query = {};
                for (var key in query) {
                    t7_ctx.url_query[key] = query[key];
                }
            }
            t7_rendered_content = t7_template(t7_ctx);
        }

        return {content: t7_rendered_content, context: t7_ctx};
    }
};


app.router._load = function (view, options) {
    options = options || {};
    
    var url = options.url,
        content = options.content, //initial content
        t7_rendered = {content: options.content},
        template = options.template, // Template 7 compiled template
        pageName = options.pageName,
        viewContainer = $(view.container), 
        pagesContainer = $(view.pagesContainer),
        animatePages = options.animatePages,
        newPage, oldPage, pagesInView, i, oldNavbarInner, newNavbarInner, navbar, dynamicNavbar, reloadPosition,
        isDynamicPage = typeof url === 'undefined' && content || template, 
        pushState = options.pushState;

    if (typeof animatePages === 'undefined') animatePages = view.params.animatePages;

    // Plugin hook
    app.pluginHook('routerLoad', view, options);

    // Render with Template7
    if (app.params.template7Pages && typeof content === 'string' || template) {
        t7_rendered = app.router.template7Render(view, options);
        if (t7_rendered.content && !content) {
            content = t7_rendered.content;
        }
    }

    app.router.temporaryDom.innerHTML = '';

    // Parse DOM
    if (!pageName) {
        if (url || (typeof content === 'string')) {
            app.router.temporaryDom.innerHTML = t7_rendered.content;
        } else {
            if ('length' in content && content.length > 1) {
                for (var ci = 0; ci < content.length; ci++) {
                    $(app.router.temporaryDom).append(content[ci]);
                }
            } else {
                $(app.router.temporaryDom).append(content);
            }
        }
    }

    // Reload position
    reloadPosition = options.reload && (options.reloadPrevious ? 'left' : 'center');

    // Find new page
    if (pageName) newPage = pagesContainer.find('.page[data-page="' + pageName + '"]');
    else {
        newPage = app.router.findElement('.page', app.router.temporaryDom, view);
    }

    // If page not found exit
    if (!newPage || newPage.length === 0 || (pageName && view.activePage && view.activePage.name === pageName)) {
        view.allowPageChange = true;
        return;
    }

    newPage.addClass(options.reload ? 'page-on-' + reloadPosition : 'page-on-right');

    // Find old page (should be the last one) and remove older pages
    pagesInView = pagesContainer.children('.page:not(.cached)');

    if (options.reload && options.reloadPrevious && pagesInView.length === 1)  {
        view.allowPageChange = true;
        return;
    }

    if (options.reload) {
        oldPage = pagesInView.eq(pagesInView.length - 1);
    }
    else {
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
    }
    if(view.params.domCache) newPage.removeClass('cached');

    // Dynamic navbar
    if (view.params.dynamicNavbar) {
        dynamicNavbar = true;
        // Find navbar
        if (pageName) {
            newNavbarInner = viewContainer.find('.navbar-inner[data-page="' + pageName + '"]');
        }
        else {
            newNavbarInner = app.router.findElement('.navbar-inner', app.router.temporaryDom, view);    
        }
        if (!newNavbarInner || newNavbarInner.length === 0) {
            dynamicNavbar = false;
        }
        navbar = viewContainer.find('.navbar');
        if (options.reload) {
            oldNavbarInner = navbar.find('.navbar-inner:not(.cached):last-child');
        }
        else {
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
    }
    if (dynamicNavbar) {
        newNavbarInner.addClass(options.reload ? 'navbar-on-' + reloadPosition : 'navbar-on-right');
        if(view.params.domCache) newNavbarInner.removeClass('cached');
        newPage[0].f7RelatedNavbar = newNavbarInner[0];
        newNavbarInner[0].f7RelatedPage = newPage[0];
    }

    // save content areas into view's cache
    if (!url) {
        var newPageName = pageName || newPage.attr('data-page');
        if (isDynamicPage) url = '#' + app.params.dynamicPageUrl.replace(/{{name}}/g, newPageName).replace(/{{index}}/g, view.history.length - (options.reload ? 1 : 0));
        else url = '#' + newPageName;
        if (!view.params.domCache) {
            view.contentCache[url] = content;
        }
        if (view.params.domCache && pageName) {
            view.pagesCache[url] = pageName;
        }
    }

    // Push State
    if (app.params.pushState && !options.reloadPrevious && view.main)  {
        if (typeof pushState === 'undefined') pushState = true;
        var pushStateRoot = app.params.pushStateRoot || '';
        var method = options.reload ? 'replaceState' : 'pushState';
        if (pushState) {
            if (!isDynamicPage && !pageName) {
                history[method]({url: url, viewIndex: app.views.indexOf(view)}, '', pushStateRoot + app.params.pushStateSeparator + url);
            }
            else if (isDynamicPage && content) {
                history[method]({content: content, url: url, viewIndex: app.views.indexOf(view)}, '', pushStateRoot + app.params.pushStateSeparator + url);
            }
            else if (pageName) {
                history[method]({pageName: pageName, url: url, viewIndex: app.views.indexOf(view)}, '', pushStateRoot + app.params.pushStateSeparator + url);
            }
        }
    }

    // Update View history
    view.url = url;
    if (options.reload) {
        var lastUrl = view.history[view.history.length - (options.reloadPrevious ? 2 : 1)];
        if (lastUrl && lastUrl.indexOf('#') === 0 && lastUrl in view.contentCache && lastUrl !== url) {
            view.contentCache[lastUrl] = null;
            delete view.contentCache[lastUrl];
        }
        view.history[view.history.length - (options.reloadPrevious ? 2 : 1)] = url;
    }
    else {
        view.history.push(url);
    }

    // Unique history
    var historyBecameUnique = false;
    if (view.params.uniqueHistory) {
        var _history = view.history;
        var _url = url;
        if (view.params.uniqueHistoryIgnoreGetParameters) {
            _history = [];
            _url = url.split('?')[0];
            for (i = 0; i < view.history.length; i++) {
                _history.push(view.history[i].split('?')[0]);
            }
        }
        
        if (_history.indexOf(_url) !== _history.lastIndexOf(_url)) {
            view.history = view.history.slice(0, _history.indexOf(_url));
            view.history.push(url);
            historyBecameUnique = true;
        }
    }
    // Dom manipulations
    if (options.reloadPrevious) {
        oldPage = oldPage.prev('.page');
        newPage.insertBefore(oldPage);
        if (dynamicNavbar) {
            oldNavbarInner = oldNavbarInner.prev('.navbar-inner');
            newNavbarInner.insertAfter(oldNavbarInner);
        }
    }
    else {
        pagesContainer.append(newPage[0]);
        if (dynamicNavbar) navbar.append(newNavbarInner[0]);
    }
    // Remove Old Page And Navbar
    if (options.reload) {
        if (view.params.domCache && view.initialPages.indexOf(oldPage[0]) >= 0) {
            oldPage.addClass('cached');
            if (dynamicNavbar) oldNavbarInner.addClass('cached');
        }
        else {
            app.pageRemoveCallback(view, oldPage[0], reloadPosition);
            oldPage.remove();
            if (dynamicNavbar) oldNavbarInner.remove();
        }
    }

    // Page Init Events
    app.pageInitCallback(view, {
        pageContainer: newPage[0], 
        url: url, 
        position: options.reload ? reloadPosition : 'right', 
        navbarInnerContainer: dynamicNavbar ? newNavbarInner[0] : undefined, 
        context: t7_rendered.context,
        query: options.query,
        fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
    });

    // Navbar init event
    if (dynamicNavbar) {
        app.navbarInitCallback(view, newPage[0], navbar[0], newNavbarInner[0], url, options.reload ? reloadPosition : 'right');
    }

    if (options.reload) {
        view.allowPageChange = true;
        if (historyBecameUnique) view.refreshPreviousPage();
        return;
    }

    if (dynamicNavbar && animatePages) {
        app.router.prepareNavbar(newNavbarInner, oldNavbarInner, 'right');
    }
    // Force reLayout
    var clientLeft = newPage[0].clientLeft;

    // Before Anim Callback
    app.pageAnimCallbacks('before', view, {
        pageContainer: newPage[0], 
        url: url, 
        position: 'right', 
        oldPage: oldPage, 
        newPage: newPage, 
        query: options.query,
        fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
    });

    function afterAnimation() {
        view.allowPageChange = true;
        newPage.removeClass('page-from-right-to-center page-on-right').addClass('page-on-center');
        oldPage.removeClass('page-from-center-to-left page-on-center').addClass('page-on-left');
        if (dynamicNavbar) {
            newNavbarInner.removeClass('navbar-from-right-to-center navbar-on-left navbar-on-right').addClass('navbar-on-center');
            oldNavbarInner.removeClass('navbar-from-center-to-left navbar-on-center').addClass('navbar-on-left');
        }
        app.pageAnimCallbacks('after', view, {
            pageContainer: newPage[0], 
            url: url, 
            position: 'right', 
            oldPage: oldPage, 
            newPage: newPage, 
            query: options.query,
            fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
        });
        if (app.params.pushState) app.pushStateClearQueue();
        if (!(view.params.swipeBackPage || view.params.preloadPreviousPage)) {
            if (view.params.domCache) {
                oldPage.addClass('cached');
                oldNavbarInner.addClass('cached');
            }
            else {
                if (!(url.indexOf('#') === 0 && newPage.attr('data-page').indexOf('smart-select-') === 0)) {
                    app.pageRemoveCallback(view, oldPage[0], 'left');
                    oldPage.remove();
                    if (dynamicNavbar) oldNavbarInner.remove();    
                }
            }
        }
        if (view.params.uniqueHistory && historyBecameUnique) {
            view.refreshPreviousPage();
        }
    }

    if (animatePages) {
        // Set pages before animation
        app.router.animatePages(oldPage, newPage, 'to-left', view);

        // Dynamic navbar animation
        if (dynamicNavbar) {
            setTimeout(function () {
                app.router.animateNavbars(oldNavbarInner, newNavbarInner, 'to-left', view);
            }, 0);

        }
        newPage.animationEnd(function (e) {
            afterAnimation();
        });
    }
    else {
        newNavbarInner.find('.sliding, .sliding .back .icon').transform('');
        afterAnimation();
    }
};

app.router.load = function (view, options) {
    options = options || {};
    var url = options.url;
    var content = options.content;
    var pageName = options.pageName;
    if (pageName) {
        if (pageName.indexOf('?') > 0) {
            options.query = $.parseUrlQuery(pageName);
            options.pageName = pageName = pageName.split('?')[0];
        }
    }
    var template = options.template;
    if (view.params.reloadPages === true) options.reload = true;

    if (!view.allowPageChange) return false;
    if (url && view.url === url && !options.reload && !view.params.allowDuplicateUrls) return false;
    view.allowPageChange = false;
    if (app.xhr && view.xhr && view.xhr === app.xhr) {
        app.xhr.abort();
        app.xhr = false;
    }
    function proceed(content) {
        app.router.preprocess(content, url, function (content) {
            options.content = content;
            app.router._load(view, options);
        });
    }
    if (content || pageName) {
        proceed(content);
        return;
    }
    else if (template) {
        app.router._load(view, options);
        return;
    }

    if (!options.url || options.url === '#') {
        view.allowPageChange = true;
        return;
    }
    app.get(options.url, view, options.ignoreCache, function (content, error) {
        if (error) {
            view.allowPageChange = true;
            return;
        }
        proceed(content);
    });
};

app.router._back = function (view, options) {
    options = options || {};
    var url = options.url,
        content = options.content, 
        t7_rendered = {content: options.content}, // will be rendered using Template7
        template = options.template, // Template 7 compiled template
        animatePages = options.animatePages, 
        preloadOnly = options.preloadOnly, 
        pushState = options.pushState, 
        ignoreCache = options.ignoreCache,
        force = options.force,
        pageName = options.pageName;

    var viewContainer = $(view.container),
        pagesContainer = $(view.pagesContainer),
        pagesInView = pagesContainer.children('.page:not(.cached)'),
        oldPage, newPage, oldNavbarInner, newNavbarInner, navbar, navbarInners, dynamicNavbar, manipulateDom = true;

    if (typeof animatePages === 'undefined') animatePages = view.params.animatePages;

    app.pluginHook('routerBack', view, options);

    // Render with Template7
    if (app.params.template7Pages && typeof content === 'string' || template) {
        t7_rendered = app.router.template7Render(view, options);
        if (t7_rendered.content && !content) {
            content = t7_rendered.content;
        }
    }

    // Push state
    if (app.params.pushState)  {
        if (typeof pushState === 'undefined') pushState = true;
        if (!preloadOnly && history.state && pushState) {
            history.back();
        }
    }

    // Animation
    function afterAnimation() {
        app.pageBackCallbacks('after', view, {
            pageContainer: oldPage[0], 
            url: url, 
            position: 'center', 
            oldPage: oldPage, 
            newPage: newPage, 
        });
        app.pageAnimCallbacks('after', view, {
            pageContainer: newPage[0], 
            url: url, 
            position: 'left', 
            oldPage: oldPage, 
            newPage: newPage, 
            query: options.query,
            fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
        });
        app.router.afterBack(view, oldPage[0], newPage[0]);
    }
    function animateBack() {
        // Page before animation callback
        app.pageBackCallbacks('before', view, {
            pageContainer: oldPage[0], 
            url: url, 
            position: 'center', 
            oldPage: oldPage, 
            newPage: newPage, 
        });
        app.pageAnimCallbacks('before', view, {
            pageContainer: newPage[0], 
            url: url, 
            position: 'left', 
            oldPage: oldPage, 
            newPage: newPage, 
            query: options.query,
            fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
        });

        if (animatePages) {
            // Set pages before animation
            app.router.animatePages(newPage, oldPage, 'to-right', view);

            // Dynamic navbar animation
            if (dynamicNavbar) {
                setTimeout(function () {
                    app.router.animateNavbars(newNavbarInner, oldNavbarInner, 'to-right', view);
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

    function parseNewPage() {
        app.router.temporaryDom.innerHTML = '';
        // Parse DOM
        if (url || (typeof content === 'string')) {
            app.router.temporaryDom.innerHTML = t7_rendered.content;
        } else {
            if ('length' in content && content.length > 1) {
                for (var ci = 0; ci < content.length; ci++) {
                    $(app.router.temporaryDom).append(content[ci]);
                }
            } else {
                $(app.router.temporaryDom).append(content);
            }
        }
        newPage = app.router.findElement('.page', app.router.temporaryDom, view);

        if (view.params.dynamicNavbar) {
            // Find navbar
            newNavbarInner = app.router.findElement('.navbar-inner', app.router.temporaryDom, view);
        }
    }
    function setPages() {
        // If pages not found or there are still more than one, exit
        if (!newPage || newPage.length === 0) {
            view.allowPageChange = true;
            return;
        }
        if (view.params.dynamicNavbar && typeof dynamicNavbar === 'undefined') {
            if (!newNavbarInner || newNavbarInner.length === 0) {
                dynamicNavbar = false;
            }
            else {
                dynamicNavbar = true;
            }
        }

        newPage.addClass('page-on-left').removeClass('cached');
        if (dynamicNavbar) {
            navbar = viewContainer.find('.navbar');
            navbarInners = viewContainer.find('.navbar-inner:not(.cached)');
            newNavbarInner.addClass('navbar-on-left').removeClass('cached');
        }
        // Remove/hide previous page in force mode
        if (force) {
            var pageToRemove, navbarToRemove;
            pageToRemove = $(pagesInView[pagesInView.length - 2]);
            
            if (dynamicNavbar) navbarToRemove = $(pageToRemove[0] && pageToRemove[0].f7RelatedNavbar || navbarInners[navbarInners.length - 2]);
            if (view.params.domCache && view.initialPages.indexOf(pageToRemove[0]) >= 0) {
                if (pageToRemove.length && pageToRemove[0] !== newPage[0]) pageToRemove.addClass('cached');
                if (dynamicNavbar && navbarToRemove.length && navbarToRemove[0] !== newNavbarInner[0]) {
                    navbarToRemove.addClass('cached');
                }
            }
            else {
                if (pageToRemove.length) pageToRemove.remove();
                if (dynamicNavbar && navbarToRemove.length) {
                    navbarToRemove.remove();
                } 
            }
            pagesInView = pagesContainer.children('.page:not(.cached)');
            if (dynamicNavbar) {
                navbarInners = viewContainer.find('.navbar-inner:not(.cached)');
            }
            if (view.history.indexOf(url) >= 0) {
                view.history = view.history.slice(0, view.history.indexOf(url) + 2);
            }
            else {
                if (view.history[[view.history.length - 2]]) {
                    view.history[view.history.length - 2] = url;    
                }
                else {
                    view.history.unshift(url);
                }
            }
        }

        oldPage = $(pagesInView[pagesInView.length - 1]);
        if (view.params.domCache) {
            if (oldPage[0] === newPage[0]) {
                oldPage = pagesContainer.children('.page.page-on-center');
                if (oldPage.length === 0 && view.activePage) oldPage = $(view.activePage.container);
            }
        }
            
        if (dynamicNavbar && !oldNavbarInner) {
            oldNavbarInner = $(navbarInners[navbarInners.length - 1]);
            if (view.params.domCache) {
                if (oldNavbarInner[0] === newNavbarInner[0]) {
                    oldNavbarInner = navbar.children('.navbar-inner.navbar-on-center:not(.cached)');
                }
                if (oldNavbarInner.length === 0) {
                    oldNavbarInner = navbar.children('.navbar-inner[data-page="'+oldPage.attr('data-page')+'"]');
                }
            }
            if (oldNavbarInner.length === 0 || newNavbarInner[0] === oldNavbarInner[0]) dynamicNavbar = false;
        }

        if (dynamicNavbar) {
            if (manipulateDom) newNavbarInner.insertBefore(oldNavbarInner);
            newNavbarInner[0].f7RelatedPage = newPage[0];
            newPage[0].f7RelatedNavbar = newNavbarInner[0];
        }
        if (manipulateDom) newPage.insertBefore(oldPage);

        // Page Init Events
        app.pageInitCallback(view, {
            pageContainer: newPage[0], 
            url: url, 
            position: 'left', 
            navbarInnerContainer: dynamicNavbar ? newNavbarInner[0] : undefined, 
            context: t7_rendered.context,
            query: options.query,
            fromPage: oldPage && oldPage.length && oldPage[0].f7PageData,
            preloadOnly: preloadOnly
        });
        if (dynamicNavbar) {
            app.navbarInitCallback(view, newPage[0], navbar[0], newNavbarInner[0], url, 'right');
        }

        if (dynamicNavbar && newNavbarInner.hasClass('navbar-on-left') && animatePages) {
            app.router.prepareNavbar(newNavbarInner,  oldNavbarInner, 'left');
        }

        if (preloadOnly) {
            view.allowPageChange = true;
            return;
        }
        
        // Update View's URL
        view.url = url;

        // Force reLayout
        var clientLeft = newPage[0].clientLeft;

        animateBack();
        return;
    }

    // Simple go back when we have pages on left
    if (pagesInView.length > 1 && !force) {
        // Exit if only preloadOnly
        if (preloadOnly) {
            view.allowPageChange = true;
            return;
        }
        // Update View's URL
        view.url = view.history[view.history.length - 2];
        url = view.url;

        // Define old and new pages
        newPage = $(pagesInView[pagesInView.length - 2]);
        oldPage = $(pagesInView[pagesInView.length - 1]);

        // Dynamic navbar
        if (view.params.dynamicNavbar) {
            dynamicNavbar = true;
            // Find navbar
            navbarInners = viewContainer.find('.navbar-inner:not(.cached)');
            newNavbarInner = $(navbarInners[0]);
            oldNavbarInner = $(navbarInners[1]);
            if (newNavbarInner.length === 0 || oldNavbarInner.length === 0 || oldNavbarInner[0] === newNavbarInner[0]) {
                dynamicNavbar = false;
            }
        }
        manipulateDom = false;
        setPages();
        return;
    }
    
    if (!force) {
        // Go back when there is no pages on left
        if (!preloadOnly) {
            view.url = view.history[view.history.length - 2];
            url = view.url;
        }
            
        if (content) {
            parseNewPage();
            setPages();
            return;
        }
        else if (pageName) {
            // Get dom cached pages
            newPage = $(viewContainer).find('.page[data-page="' + pageName + '"]');
            if (view.params.dynamicNavbar) {
                newNavbarInner = $(viewContainer).find('.navbar-inner[data-page="' + pageName + '"]');
            }
            setPages();
            return;
        }
        else {
            view.allowPageChange = true;
            return;
        }
    }
    else {
        if (url && url === view.url || pageName && view.activePage && view.activePage.name === pageName) {
            view.allowPageChange = true;
            return;
        }
        // Go back with force url
        if (content) {
            parseNewPage();
            setPages();
            return;
        }
        else if (pageName && view.params.domCache) {
            if (pageName) url = '#' + pageName;
            
            newPage = $(viewContainer).find('.page[data-page="' + pageName + '"]');
            if (newPage[0].f7PageData && newPage[0].f7PageData.url) {
                url = newPage[0].f7PageData.url;
            }
            if (view.params.dynamicNavbar) {
                newNavbarInner = $(viewContainer).find('.navbar-inner[data-page="' + pageName + '"]');
                if (newNavbarInner.length === 0) {
                    newNavbarInner = $(newPage[0].f7RelatedNavbar);
                }
            }
            setPages();
            return;
        }
        else {
            view.allowPageChange = true;
            return;
        }
    }
    
};
app.router.back = function (view, options) {
    options = options || {};
    var url = options.url;
    var content = options.content;
    var pageName = options.pageName;
    if (pageName) {
        if (pageName.indexOf('?') > 0) {
            options.query = $.parseUrlQuery(pageName);
            options.pageName = pageName = pageName.split('?')[0];
        }
    }
    var force = options.force;
    if (!view.allowPageChange) return false;
    view.allowPageChange = false;
    if (app.xhr && view.xhr && view.xhr === app.xhr) {
        app.xhr.abort();
        app.xhr = false;
    }
    var pagesInView = $(view.pagesContainer).find('.page:not(.cached)');
    
    function proceed(content) {
        app.router.preprocess(content, url, function (content) {
            options.content = content;
            app.router._back(view, options);
        });
    }
    if (pagesInView.length > 1 && !force) {
        // Simple go back to previos page in view
        app.router._back(view, options);
        return;
    }
    if (!force) {
        url = options.url = view.history[view.history.length - 2];
        if (!url) {
            view.allowPageChange = true;
            return;
        }
        if (url.indexOf('#') === 0 && view.contentCache[url]) {
            proceed(view.contentCache[url]);
            return;
        }
        else if (url.indexOf('#') === 0 && view.params.domCache) {
            if (!pageName) options.pageName = url.split('#')[1];
            proceed();
            return;
        }
        else if (url.indexOf('#') !== 0) {
            // Load ajax page
            app.get(options.url, view, options.ignoreCache, function (content, error) {
                if (error) {
                    view.allowPageChange = true;
                    return;
                }
                proceed(content);
            });
            return;
        }
    }
    else {
        // Go back with force url
        if (!url && content) {
            proceed(content);
            return;
        }
        else if (!url && pageName) {
            if (pageName) url = '#' + pageName;
            proceed();
            return;
        }
        else if (url) {
            app.get(options.url, view, options.ignoreCache, function (content, error) {
                if (error) {
                    view.allowPageChange = true;
                    return;
                }
                proceed(content);
            });
            return;
        }
    }
    view.allowPageChange = true;
    return;
};

app.router.afterBack = function (view, oldPage, newPage) {
    // Remove old page and set classes on new one
    oldPage = $(oldPage);
    newPage = $(newPage);
    
    if (view.params.domCache && view.initialPages.indexOf(oldPage[0]) >= 0) {
        oldPage.removeClass('page-from-center-to-right').addClass('cached');
    }
    else {
        oldPage.remove();
        app.pageRemoveCallback(view, oldPage[0], 'right');
    }
        
    newPage.removeClass('page-from-left-to-center page-on-left').addClass('page-on-center');
    view.allowPageChange = true;

    // Update View's History
    var previousURL = view.history.pop();

    var newNavbar;

    // Updated dynamic navbar
    if (view.params.dynamicNavbar) {
        var inners = $(view.container).find('.navbar-inner:not(.cached)');
        var oldNavbar = $(oldPage[0].f7RelatedNavbar || inners[1]);
        if (view.params.domCache && view.initialNavbars.indexOf(oldNavbar[0]) >= 0) {
            oldNavbar.removeClass('navbar-from-center-to-right').addClass('cached');
        }
        else {
            oldNavbar.remove();
        }
        newNavbar = $(inners[0]).removeClass('navbar-on-left navbar-from-left-to-center').addClass('navbar-on-center');
    }

    // Remove pages in dom cache
    if (view.params.domCache) {
        $(view.container).find('.page.cached').each(function () {
            var page = $(this);
            var index = page.index();
            var pageUrl = page[0].f7PageData && page[0].f7PageData.url;
            if (pageUrl && view.history.indexOf(pageUrl) < 0 && view.initialPages.indexOf(this) < 0) {
                if (page[0].f7RelatedNavbar) $(page[0].f7RelatedNavbar).remove();
                page.remove();
            }
        });
    }
    
    // Check previous page is content based only and remove it from content cache
    if (!view.params.domCache && previousURL && previousURL.indexOf('#') > -1 && (previousURL in view.contentCache)) {
        view.contentCache[previousURL] = null;
        delete view.contentCache[previousURL];
    }
    
    if (app.params.pushState) app.pushStateClearQueue();

    // Preload previous page
    if (view.params.preloadPreviousPage) {
        if (view.params.domCache && view.history.length > 1) {
            var preloadUrl = view.history[view.history.length - 2];
            var previousPage;
            var previousNavbar;
            if (preloadUrl && view.pagesCache[preloadUrl]) {
                // Load by page name
                previousPage = $(view.container).find('.page[data-page="' + view.pagesCache[preloadUrl] + '"]');
                previousPage.insertBefore(newPage);
                if (newNavbar) {
                    previousNavbar = $(view.container).find('.navbar-inner[data-page="' + view.pagesCache[preloadUrl] + '"]');
                    previousNavbar.insertBefore(newNavbar);
                    if(!previousNavbar || previousNavbar.length === 0) previousNavbar = newNavbar.prev('.navbar-inner.cached');
                }
            }
            else {
                // Just load previous page
                previousPage = newPage.prev('.page.cached');
                if (newNavbar) previousNavbar = newNavbar.prev('.navbar-inner.cached');
            }
            if (previousPage && previousPage.length > 0) previousPage.removeClass('cached page-on-right page-on-center').addClass('page-on-left');
            if (previousNavbar && previousNavbar.length > 0) previousNavbar.removeClass('cached navbar-on-right navbar-on-center').addClass('navbar-on-left');
        }
        else {
            app.router.back(view, {preloadOnly: true}); 
        }
    }
};
