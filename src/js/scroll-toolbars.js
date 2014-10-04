/*=============================================================
************   Hide/show Toolbar/Navbar on scroll   ************
=============================================================*/
app.initScrollToolbars = function (pageContainer) {
    pageContainer = $(pageContainer);
    var scrollContent = pageContainer.find('.page-content');
    if (scrollContent.length === 0) return;
    var hideNavbar = app.params.hideNavbarOnPageScroll || scrollContent.hasClass('hide-navbar-on-scroll') || scrollContent.hasClass('hide-bars-on-scroll');
    var hideToolbar = app.params.hideToolbarOnPageScroll || scrollContent.hasClass('hide-toolbar-on-scroll') || scrollContent.hasClass('hide-bars-on-scroll');
    if (!(hideNavbar || hideToolbar)) return;
    
    var viewContainer = scrollContent.parents('.' + app.params.viewClass);
    if (viewContainer.length === 0) return;

    var hasNavbar = viewContainer.find('.navbar').length > 0;
    var hasToolbar = viewContainer.find('.toolbar').length > 0;

    var previousScroll, currentScroll;
        previousScroll = currentScroll = scrollContent[0].scrollTop;

    var scrollHeight, offsetHeight, reachEnd, action, navbarHidden, toolbarHidden;

    var toolbarHeight = (hasToolbar && hideToolbar) ? viewContainer.find('.toolbar')[0].offsetHeight : 0;

    function handleScroll(e) {
        if (pageContainer.hasClass('page-on-left')) return;
        currentScroll = scrollContent[0].scrollTop;
        scrollHeight = scrollContent[0].scrollHeight;
        offsetHeight = scrollContent[0].offsetHeight;
        reachEnd = app.params.showBarsOnPageScrollEnd && (currentScroll + offsetHeight >= scrollHeight - toolbarHeight);
        navbarHidden = viewContainer.hasClass('hidden-navbar');
        toolbarHidden = viewContainer.hasClass('hidden-toolbar');

        if (previousScroll > currentScroll || reachEnd) {
            action = 'show';
        }
        else {
            if (currentScroll > 44) {
                action = 'hide';
            }
            else {
                action = 'show';
            }
        }

        if (action === 'show') {
            if (hasNavbar && hideNavbar && navbarHidden) {
                app.showNavbar(viewContainer);
                pageContainer.removeClass('no-navbar-by-scroll'); 
                navbarHidden = false;
            }
            if (hasToolbar && hideToolbar && toolbarHidden) {
                app.showToolbar(viewContainer);
                pageContainer.removeClass('no-toolbar-by-scroll'); 
                toolbarHidden = false;
            }
        }
        else {
            if (hasNavbar && hideNavbar && !navbarHidden) {
                app.hideNavbar(viewContainer);
                pageContainer.addClass('no-navbar-by-scroll'); 
                navbarHidden = true;
            }
            if (hasToolbar && hideToolbar && !toolbarHidden) {
                app.hideToolbar(viewContainer);
                pageContainer.addClass('no-toolbar-by-scroll'); 
                toolbarHidden = true;
            }
        }
            
        previousScroll = currentScroll;
    }
    scrollContent.on('scroll', handleScroll);
    scrollContent[0].f7ScrollToolbarsHandler = handleScroll;
};
app.destroyScrollToolbars = function (pageContainer) {
    pageContainer = $(pageContainer);
    var scrollContent = pageContainer.find('.page-content');
    if (scrollContent.length === 0) return;
    var handler = scrollContent[0].f7ScrollToolbarsHandler;
    if (!handler) return;
    scrollContent.off('scroll', scrollContent[0].f7ScrollToolbarsHandler);
};