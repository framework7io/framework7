/*======================================================
************   Navbars && Toolbars   ************
======================================================*/
// On Navbar Init Callback
app.navbarInitCallback = function (view, pageContainer, navbar, navbarInnerContainer, url, position) {
    var _navbar = {
        container: navbar,
        innerContainer: navbarInnerContainer
    };
    var _page = {
        url: url,
        query: $.parseUrlQuery(url || ''),
        container: pageContainer,
        name: $(pageContainer).attr('data-page'),
        view: view,
        from: position
    };
    var eventData = {
        navbar: _navbar,
        page: _page
    };

    // Plugin hook
    app.pluginHook('navbarInit', _navbar, _page);
    
    // Navbar Init Callback
    $(navbarInnerContainer).trigger('navbarInit', eventData);
};
app.sizeNavbars = function (viewContainer) {
    var navbarInner = viewContainer ? $(viewContainer).find('.navbar .navbar-inner:not(.cached)') : $('.navbar .navbar-inner:not(.cached)');
    navbarInner.each(function () {
        var tt = $(this),
            left = app.rtl ? tt.find('.right') : tt.find('.left'),
            right = app.rtl ? tt.find('.left') : tt.find('.right'),
            center = tt.find('.center'),
            noLeft = left.length === 0,
            noRight = right.length === 0,
            leftWidth = noLeft ? 0 : left.outerWidth(true),
            rightWidth = noRight ? 0 : right.outerWidth(true),
            centerWidth = center.outerWidth(true),
            navbarWidth = tt.width(),
            onLeft = tt.hasClass('navbar-on-left'),
            currLeft, diff;

        if (noRight) {
            currLeft = navbarWidth - centerWidth;
        }
        if (noLeft) {
            currLeft = 0;
        }
        if (!noLeft && !noRight) {
            currLeft = (navbarWidth - rightWidth - centerWidth + leftWidth) / 2;
        }
        var requiredLeft = (navbarWidth - centerWidth) / 2;
        if (navbarWidth - leftWidth - rightWidth > centerWidth) {
            if (requiredLeft < leftWidth) {
                requiredLeft = leftWidth;
            }
            if (requiredLeft + centerWidth > navbarWidth - rightWidth) {
                requiredLeft = navbarWidth - rightWidth - centerWidth;
            }
            diff = requiredLeft - currLeft;
        }
        else {
            diff = 0;
        }
        // RTL inverter
        var inverter = app.rtl ? -1 : 1;
        
        // Center left
        var centerLeft = diff;
        if (app.rtl && noLeft && noRight && center.length > 0) centerLeft = -centerLeft;
        center.css({left: centerLeft + 'px'});

        if (center.hasClass('sliding')) {
            center[0].f7NavbarLeftOffset = -(currLeft + diff) * inverter;
            center[0].f7NavbarRightOffset = (navbarWidth - currLeft - diff - centerWidth) * inverter;
            if (onLeft) center.transform('translate3d(' + center[0].f7NavbarLeftOffset + 'px, 0, 0)');
        }
        if (!noLeft && left.hasClass('sliding')) {
            if (app.rtl) {
                left[0].f7NavbarLeftOffset = -(navbarWidth - left.outerWidth()) / 2 * inverter;
                left[0].f7NavbarRightOffset = leftWidth * inverter;
            }
            else {
                left[0].f7NavbarLeftOffset = -leftWidth;
                left[0].f7NavbarRightOffset = (navbarWidth - left.outerWidth()) / 2;
            }
            if (onLeft) left.transform('translate3d(' + left[0].f7NavbarLeftOffset + 'px, 0, 0)');
        }
        if (!noRight && right.hasClass('sliding')) {
            if (app.rtl) {
                right[0].f7NavbarLeftOffset = -rightWidth * inverter;
                right[0].f7NavbarRightOffset = (navbarWidth - right.outerWidth()) / 2 * inverter;
            }
            else {
                right[0].f7NavbarLeftOffset = -(navbarWidth - right.outerWidth()) / 2;
                right[0].f7NavbarRightOffset = rightWidth;
            }
            if (onLeft) right.transform('translate3d(' + right[0].f7NavbarLeftOffset + 'px, 0, 0)');
        }
        
    });
};
app.hideNavbar = function (viewContainer) {
    $(viewContainer).addClass('hidden-navbar');
    return true;
};
app.showNavbar = function (viewContainer) {
    var vc = $(viewContainer);
    vc.addClass('hiding-navbar').removeClass('hidden-navbar').find('.navbar').transitionEnd(function () {
        vc.removeClass('hiding-navbar');
    });
    return true;
};
app.hideToolbar = function (viewContainer) {
    $(viewContainer).addClass('hidden-toolbar');
    return true;
};
app.showToolbar = function (viewContainer) {
    var vc = $(viewContainer);
    vc.addClass('hiding-toolbar').removeClass('hidden-toolbar').find('.toolbar').transitionEnd(function () {
        vc.removeClass('hiding-toolbar');
    });
};
