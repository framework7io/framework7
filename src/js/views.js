/*======================================================
************   Views   ************
======================================================*/
app.views = [];
app.addView = function (viewSelector, viewParams) {
    if (!viewSelector) return;
    var container = $(viewSelector)[0];
    var view = {
        container: container,
        selector: viewSelector,
        params: viewParams || {},
        history: [],
        url: '',
        pagesContainer: $('.pages', container)[0],
        main: $(container).hasClass('view-main'),
        loadPage: function (url) {
            app.loadPage(view, url);
        },
        goBack: function (url) {
            app.goBack(view, url);
        },
        hideNavbar: function () {
            app.hideNavbar(container);
        },
        showNavbar: function () {
            app.showNavbar(container);
        },
        hideToolbar: function () {
            app.hideToolbar(container);
        },
        showToolbar: function () {
            app.showToolbar(container);
        }
    };
    // Store to history main view's url
    if (view.main) {
        view.url = document.location.href;
        view.history.push(view.url);
    }
    // Store View in element for easy access
    container.f7View = view;

    // Add view to app
    app.views.push(view);

    // Init View's events
    app.initViewEvents(view);

    // Return view object
    return view;
};

// Live Events on view links
app.initViewEvents = function (view) {
    if (!app.params.swipeBackPage) return;
    // Swipe Back to previous page
    var viewContainer = $(view.container),
        isTouched = false,
        isMoved = false,
        touchesStart = {},
        isScrolling,
        activePage,
        previousPage,
        viewContainerWidth,
        touchesDiff,
        allowViewTouchMove = true,
        touchStartTime,
        activeNavbar,
        previousNavbar,
        activeNavElements,
        previousNavElements,
        i,
        dynamicNavbar,
        el;

    function handleTouchStart(e) {
        if (!allowViewTouchMove || !app.params.swipeBackPage || isTouched || app.swipeoutOpenedEl) return;
        isMoved = false;
        isTouched = true;
        isScrolling = undefined;
        touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        touchStartTime = (new Date()).getTime();
        dynamicNavbar = view.params.dynamicNavbar && viewContainer.find('.navbar-inner').length > 1;
    }
    
    function handleTouchMove(e) {
        if (!isTouched) return;
        var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        if (typeof isScrolling === 'undefined') {
            isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
        }
        if (isScrolling) {
            isTouched = false;
            return;
        }

        if (!isMoved) {
            var cancel = false;
            // Calc values during first move fired
            viewContainerWidth = viewContainer.width();
            activePage = $(e.target).is('.page') ? $(e.target) : $(e.target).parents('.page');
            previousPage = viewContainer.find('.page-on-left');
            if (touchesStart.x - viewContainer.offset().left > app.params.swipeBackPageActiveArea) cancel = true;
            if (previousPage.length === 0 || activePage.length === 0) cancel = true;
            if (cancel) {
                isTouched = false;
                return;
            }
            if (dynamicNavbar) {
                activeNavbar = viewContainer.find('.navbar-on-center');
                previousNavbar = viewContainer.find('.navbar-on-left');
                activeNavElements = activeNavbar.find('.left, .center, .right');
                previousNavElements = previousNavbar.find('.left, .center, .right');
            }
        }
        isMoved = true;

        e.preventDefault();
        touchesDiff = pageX - touchesStart.x - app.params.swipeBackPageThreshold;
        if (touchesDiff < 0) touchesDiff = 0;
        var percentage = touchesDiff / viewContainerWidth;

        // Transform pages
        activePage.transform('translate3d(' + touchesDiff + 'px,0,0)');
        if (app.params.swipeBackPageBoxShadow && app.device.os !== 'android') activePage[0].style.boxShadow = '0px 0px 12px rgba(0,0,0,' + (0.5 - 0.5 * percentage) + ')';
        previousPage.transform('translate3d(' + (touchesDiff / 5 - viewContainerWidth / 5) + 'px,0,0)');
        previousPage[0].style.opacity = 0.9 + 0.1 * percentage;

        // Dynamic Navbars Animation
        if (dynamicNavbar) {
            for (i = 0; i < activeNavElements.length; i++) {
                el = $(activeNavElements[i]);
                el[0].style.opacity = (1 - percentage * 1.3);
                if (el[0].className.indexOf('sliding') >= 0) {
                    el.transform('translate3d(' + (percentage * el[0].f7NavbarRightOffset) + 'px,0,0)');
                }
            }
            for (i = 0; i < previousNavElements.length; i++) {
                el = $(previousNavElements[i]);
                el[0].style.opacity = percentage * 1.3 - 0.3;
                if (el[0].className.indexOf('sliding') >= 0) {
                    el.transform('translate3d(' + (el[0].f7NavbarLeftOffset * (1 - percentage)) + 'px,0,0)');
                }
            }
        }

    }
    function handleTouchEnd(e) {
        if (!isTouched || !isMoved) {
            isTouched = false;
            isMoved = false;
            return;
        }
        isTouched = false;
        isMoved = false;
        var timeDiff = (new Date()).getTime() - touchStartTime;
        var pageChanged = false;
        // Swipe back to previous page
        if (
                timeDiff < 300 && touchesDiff > 10 ||
                timeDiff >= 300 && touchesDiff > viewContainerWidth / 2
            ) {
            activePage.removeClass('page-on-center').addClass('page-on-right');
            previousPage.removeClass('page-on-left').addClass('page-on-center');
            if (dynamicNavbar) {
                activeNavbar.removeClass('navbar-on-center').addClass('navbar-on-right');
                previousNavbar.removeClass('navbar-on-left').addClass('navbar-on-center');
            }
            pageChanged = true;
        }
        // Reset custom styles
        // Add transitioning class for transition-duration
        $([activePage[0], previousPage[0]]).transform('').css({opacity: '', boxShadow: ''}).addClass('page-transitioning');
        if (dynamicNavbar) {
            activeNavElements.css({opacity: ''})
            .each(function () {
                var translate = pageChanged ? this.f7NavbarRightOffset : 0;
                $(this).transform('translate3d(' + translate + 'px,0,0)');
            }).addClass('page-transitioning');

            previousNavElements.transform('').css({opacity: ''}).each(function () {
                var translate = pageChanged ? 0 : this.f7NavbarLeftOffset;
                $(this).transform('translate3d(' + translate + 'px,0,0)');
            }).addClass('page-transitioning');
        }
        allowViewTouchMove = false;
        app.allowPageChange = false;

        if (pageChanged) {
            // Update View's URL
            var url = view.history[view.history.length - 2];
            view.url = url;
            
            // Page before animation callback
            app.pageAnimCallbacks('before', view, {pageContainer: previousPage[0], url: url, position: 'left', newPage: previousPage, oldPage: activePage});
        }

        activePage.transitionEnd(function () {
            $([activePage[0], previousPage[0]]).removeClass('page-transitioning');
            if (dynamicNavbar) {
                activeNavElements.removeClass('page-transitioning');
                activeNavElements.transform('').css({opacity: ''});
                previousNavElements.removeClass('page-transitioning');
                previousNavElements.transform('').css({opacity: ''});
            }
            allowViewTouchMove = true;
            app.allowPageChange = true;
            if (pageChanged) app.afterGoBack(view, activePage, previousPage);
        });
    }

    viewContainer.on(app.touchEvents.start, handleTouchStart);
    viewContainer.on(app.touchEvents.move, handleTouchMove);
    viewContainer.on(app.touchEvents.end, handleTouchEnd);
};