/*======================================================
************   Pages   ************
======================================================*/
// On Page Init Callback
app.pageInitCallback = function (view, pageContainer, url, position) {
    if (pageContainer.f7PageInitialized) return;
    pageContainer.f7PageInitialized = true;
    // Page Data
    var pageData = {
        container: pageContainer,
        url: url,
        query: $.parseUrlQuery(url || ''),
        name: $(pageContainer).attr('data-page'),
        view: view,
        from: position
    };
    // Before Init Callback
    if (app.params.onPageBeforeInit) {
        app.params.onPageBeforeInit(pageData);
    }
    if (view.params.onPageBeforeInit) {
        view.params.onPageBeforeInit(pageData);
    }
    $(document).trigger('pageBeforeInit', {page: pageData});
    app.initPage(pageContainer);
    // Init Callback
    if (app.params.onPageInit) {
        app.params.onPageInit(pageData);
    }
    if (view.params.onPageInit) {
        view.params.onPageInit(pageData);
    }
    $(document).trigger('pageInit', {page: pageData});
};
app.pageAnimCallbacks = function (callback, view, params) {
    // Page Data
    var pageData = {
        container: params.pageContainer,
        url: params.url,
        query: $.parseUrlQuery(params.url || ''),
        name: $(params.pageContainer).attr('data-page'),
        view: view,
        from: params.position
    };
    var oldPage = params.oldPage,
        newPage = params.newPage;

    if (callback === 'after') {
        if (app.params.onPageAfterAnimation) {
            app.params.onPageAfterAnimation(pageData);
        }
        if (view.params.onPageAfterAnimation) {
            view.params.onPageAfterAnimation(pageData);
        }
        $(document).trigger('pageAfterAnimation', {page: pageData});

    }
    if (callback === 'before') {
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
        if (app.params.onPageBeforeAnimation) {
            app.params.onPageBeforeAnimation(pageData);
        }
        if (view.params.onPageBeforeAnimation) {
            view.params.onPageBeforeAnimation(pageData);
        }
        $(document).trigger('pageBeforeAnimation', {page: pageData});
    }
};
// Init Page Events and Manipulations
app.initPage = function (pageContainer) {
    // Size navbars on page load
    if (app.sizeNavbars) app.sizeNavbars($(pageContainer).parents('.view')[0]);
    // Init messages
    if (app.initMessages) app.initMessages(pageContainer);
};
// Load Page
app.allowPageChange = true;
app._tempDomElement = document.createElement('div');
app.loadPage = function (view, url) {
    if (!app.allowPageChange) return false;
    if (view.url === url) return false;
    app.allowPageChange = false;
    if (app.xhr) {
        app.xhr.abort();
        app.xhr = false;
    }
    app.get(url, function (data, error) {
        if (error) {
            app.allowPageChange = true;
            return;
        }
        var viewContainer = $(view.container),
            newPage, oldPage, pagesInView, i, oldNavbarInner, newNavbarInner, navbar, dynamicNavbar;

        // Parse DOM to find new page
        app._tempDomElement.innerHTML = data;
        newPage = $('.page', app._tempDomElement);
        if (newPage.length > 1) {
            newPage = $(app._tempDomElement).find('.view-main .page');
        }

        // If pages not found or there are still more than one, exit
        if (newPage.length === 0 || newPage.length > 1) {
            app.allowPageChange = true;
            return;
        }
        newPage.addClass('page-on-right');

        // Update View history
        view.url = url;
        view.history.push(url);

        // Find old page (should be the last one) and remove older pages
        pagesInView = viewContainer.find('.page');
        if (pagesInView.length > 1) {
            for (i = 0; i < pagesInView.length - 2; i++) {
                $(pagesInView[i]).remove();
            }
            $(pagesInView[i]).remove();
        }
        oldPage = viewContainer.find('.page');

        // Dynamic navbar
        if (view.params.dynamicNavbar) {
            dynamicNavbar = true;
            // Find navbar
            newNavbarInner = $('.navbar-inner', app._tempDomElement);
            if (newNavbarInner.length > 1) {
                newNavbarInner = $('.view-main .navbar-inner', app._tempDomElement);
            }
            if (newNavbarInner.length === 0 || newNavbarInner > 1) {
                dynamicNavbar = false;
            }
            navbar = viewContainer.find('.navbar');
            oldNavbarInner = navbar.find('.navbar-inner');
            if (oldNavbarInner.length > 0) {
                for (i = 0; i < oldNavbarInner.length - 1; i++) {
                    $(oldNavbarInner[i]).remove();
                }
                if (newNavbarInner.length === 0 && oldNavbarInner.length === 1) {
                    $(oldNavbarInner[0]).remove();
                }
                oldNavbarInner = navbar.find('.navbar-inner');
            }
        }
        if (dynamicNavbar) {
            newNavbarInner.addClass('navbar-on-right');
            navbar.append(newNavbarInner[0]);
        }

        // Append Old Page and add classes for animation
        $(view.pagesContainer).append(newPage[0]);

        // Page Init Events
        app.pageInitCallback(view, newPage[0], url, 'right');
        
        if (dynamicNavbar) {
            newNavbarInner.find('.sliding').each(function () {
                $(this).transform('translate3d(' + (this.f7NavbarRightOffset) + 'px,0,0)');
            });
        }
        // Force reLayout
        var clientLeft = newPage[0].clientLeft;

        // Before Anim Callback
        app.pageAnimCallbacks('before', view, {pageContainer: newPage[0], url: url, position: 'left', oldPage: oldPage, newPage: newPage});
        
        newPage.addClass('page-from-right-to-center');
        oldPage.addClass('page-from-center-to-left').removeClass('page-on-center');

        // Dynamic navbar animation
        if (dynamicNavbar) {
            newNavbarInner.removeClass('navbar-on-right').addClass('navbar-from-right-to-center');
            newNavbarInner.find('.sliding').each(function () {
                $(this).transform('translate3d(0px,0,0)');
            });
            oldNavbarInner.removeClass('navbar-on-center').addClass('navbar-from-center-to-left');
            oldNavbarInner.find('.sliding').each(function () {
                $(this).transform('translate3d(' + (this.f7NavbarLeftOffset) + 'px,0,0)');
            });
        }

        newPage.animationEnd(function (e) {
            app.allowPageChange = true;
            newPage.toggleClass('page-from-right-to-center page-on-center page-on-right');
            oldPage.toggleClass('page-from-center-to-left page-on-left');
            if (dynamicNavbar) {
                newNavbarInner.toggleClass('navbar-from-right-to-center navbar-on-center');
                oldNavbarInner.toggleClass('navbar-from-center-to-left navbar-on-left');
            }
            app.pageAnimCallbacks('after', view, {pageContainer: newPage[0], url: url, position: 'right', oldPage: oldPage, newPage: newPage});
        });

    });
};
app.goBack = function (view, url, preloadOnly) {
    if (!app.allowPageChange) return false;
    app.allowPageChange = false;
    if (app.xhr) {
        app.xhr.abort();
        app.xhr = false;
    }

    var viewContainer = $(view.container),
        pagesInView = viewContainer.find('.page'),
        oldPage, newPage, oldNavbarInner, newNavbarInner, navbar, dynamicNavbar;
    if (pagesInView.length > 1) {
        // Exit if only preloadOnly
        if (preloadOnly) {
            app.allowPageChange = true;
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
            var inners = viewContainer.find('.navbar-inner');
            newNavbarInner = $(inners[0]);
            oldNavbarInner = $(inners[1]);
        }

        // Page before animation callback
        app.pageAnimCallbacks('before', view, {pageContainer: newPage[0], url: url, position: 'left', oldPage: oldPage, newPage: newPage});

        // Add classes for animation
        newPage.removeClass('page-on-left').addClass('page-from-left-to-center');
        oldPage.removeClass('page-on-center').addClass('page-from-center-to-right');

        // Dynamic navbar animation
        if (dynamicNavbar) {
            newNavbarInner.removeClass('navbar-on-left').addClass('navbar-from-left-to-center');
            newNavbarInner.find('.sliding').each(function () {
                $(this).transform('translate3d(0px,0,0)');
            });

            oldNavbarInner.removeClass('navbar-on-center').addClass('navbar-from-center-to-right');
            oldNavbarInner.find('.sliding').each(function () {
                $(this).transform('translate3d(' + (this.f7NavbarRightOffset) + 'px,0,0)');
            });
        }
        
        newPage.animationEnd(function () {
            app.afterGoBack(view, oldPage[0], newPage[0]);
            app.pageAnimCallbacks('after', view, {pageContainer: newPage[0], url: url, position: 'left', oldPage: oldPage, newPage: newPage});
        });
    }
    else {
        if (url && url.indexOf('#') === 0) url = undefined;
        if (view.history.length > 1) {
            url = view.history[view.history.length - 2];
        }
        if (!url) {
            app.allowPageChange = true;
            return;
        }
        app.get(url, function (data, error) {
            if (error) {
                app.allowPageChange = true;
                return;
            }
            // Parse DOM to find new page
            app._tempDomElement.innerHTML = data;
            newPage = $('.page', app._tempDomElement);
            if (newPage.length > 1) {
                newPage = $(app._tempDomElement).find('.view-main .page');
            }

            // If pages not found or there are still more than one, exit
            if (newPage.length === 0 || newPage.length > 1) {
                app.allowPageChange = true;
                return;
            }
            newPage.addClass('page-on-left');

            // Find old page (should be the only one)
            oldPage = $(viewContainer.find('.page')[0]);

            // Dynamic navbar
            if (view.params.dynamicNavbar) {
                dynamicNavbar = true;
                // Find navbar
                newNavbarInner = $('.navbar-inner', app._tempDomElement);
                if (newNavbarInner.length > 1) {
                    newNavbarInner = $('.view-main .navbar-inner', app._tempDomElement);
                }
                if (newNavbarInner.length === 0 || newNavbarInner > 1) {
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
            $(view.pagesContainer).prepend(newPage[0]);

            // Page Init Events
            app.pageInitCallback(view, newPage[0], url, 'left');

            if (dynamicNavbar && newNavbarInner.hasClass('navbar-on-left')) {
                newNavbarInner.find('.sliding').each(function () {
                    $(this).transform('translate3d(' + (this.f7NavbarLeftOffset) + 'px,0,0)');
                });
            }
            
            // Exit if we need only to preload page
            if (preloadOnly) {
                newPage.addClass('page-on-left');
                app.allowPageChange = true;
                return;
            }

            // Update View's URL
            view.url = url;

            // Force reLayout
            var clientLeft = newPage[0].clientLeft;

            // Before Anim Callback
            app.pageAnimCallbacks('before', view, {pageContainer: newPage[0], url: url, position: 'left', oldPage: oldPage, newPage: newPage});

            newPage.addClass('page-from-left-to-center');
            oldPage.removeClass('page-on-center').addClass('page-from-center-to-right');

            // Dynamic navbar animation
            if (dynamicNavbar) {
                newNavbarInner.removeClass('navbar-on-left').addClass('navbar-from-left-to-center');
                newNavbarInner.find('.sliding').each(function () {
                    $(this).transform('translate3d(0px,0,0)');
                });
                oldNavbarInner.removeClass('navbar-on-center').addClass('navbar-from-center-to-right');
                oldNavbarInner.find('.sliding').each(function () {
                    $(this).transform('translate3d(' + (this.f7NavbarRightOffset) + 'px,0,0)');
                });
            }

            newPage.animationEnd(function () {
                app.afterGoBack(view, oldPage[0], newPage[0]);
                app.pageAnimCallbacks('after', view, {pageContainer: newPage[0], url: url, position: 'left', oldPage: oldPage, newPage: newPage});
            });

        });
    }
};
app.afterGoBack = function (view, oldPage, newPage) {
    // Remove old page and set classes on new one
    oldPage = $(oldPage);
    newPage = $(newPage);
    oldPage.remove();
    newPage.removeClass('page-from-left-to-center page-on-left').addClass('page-on-center');
    app.allowPageChange = true;
    // Updated dynamic navbar
    if (view.params.dynamicNavbar) {
        var inners = $(view.container).find('.navbar-inner');
        var oldNavbar = $(inners[1]).remove();
        var newNavbar = $(inners[0]).removeClass('navbar-on-left navbar-from-left-to-center').addClass('navbar-on-center');
    }
    // Update View's Hitory
    view.history.pop();
    // Preload previous page
    if (app.params.preloadPreviousPage) {
        app.goBack(view, false, true);
    }
};