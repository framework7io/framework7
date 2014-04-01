/*======================================================
************   Navbars && Toolbars   ************
======================================================*/
app.sizeNavbars = function (viewContainer) {
    var navbarInner = viewContainer ? $(viewContainer).find('.navbar .navbar-inner:not(.cached)') : $('.navbar .navbar-inner:not(.cached)');
    navbarInner.each(function () {
        var tt = $(this),
            left = tt.find('.left'),
            right = tt.find('.right'),
            center = tt.find('.center'),
            noLeft = left.length === 0,
            noRight = right.length === 0,
            leftWidth = noLeft ? 0 : left.outerWidth(true),
            rightWidth = noRight ? 0 : right.outerWidth(true),
            centerWidth = center.outerWidth(true),
            navbarWidth = tt.width(),
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
        center.css({left: diff + 'px'});
        if (center.hasClass('sliding')) {
            center[0].f7NavbarLeftOffset = -(currLeft + diff);
            center[0].f7NavbarRightOffset = navbarWidth - currLeft - diff - centerWidth;
        }
        if (!noLeft && left.hasClass('sliding')) {
            left[0].f7NavbarLeftOffset = -leftWidth;
            left[0].f7NavbarRightOffset = (navbarWidth - left.outerWidth()) / 2;
        }
        if (!noRight && right.hasClass('sliding')) {
            right[0].f7NavbarLeftOffset = -(navbarWidth - right.outerWidth()) / 2;
            right[0].f7NavbarRightOffset = rightWidth;
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