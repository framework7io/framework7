/*======================================================
************   Navbars && Toolbars   ************
======================================================*/
app.sizeNavbars = function(viewContainer) {
    var navbarInner = viewContainer ? $(viewContainer).find('.navbar .navbar-inner') : $('.navbar .navbar-inner');
    navbarInner.each(function() {
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
            center.attr('data-left', -(currLeft + diff));
            center.attr('data-right', navbarWidth - currLeft - diff - centerWidth);
        }
        if (!noLeft && left.hasClass('sliding')) {
            left.attr('data-left', -leftWidth);
            left.attr('data-right', (navbarWidth - left.outerWidth())/2);
        }
        if (!noRight && right.hasClass('sliding')) {
            right.attr('data-left', -(navbarWidth - right.outerWidth())/2);
            right.attr('data-right', rightWidth);
        }
        
    });
};
app.hideNavbar = function(viewContainer) {
    $(viewContainer).addClass('hidden-navbar');
    return true;
};
app.showNavbar = function(viewContainer) {
    var vc = $(viewContainer);
    vc.addClass('hiding-navbar').removeClass('hidden-navbar').find('.navbar').transitionEnd(function(){
        vc.removeClass('hiding-navbar');
    });
    return true;
};
app.hidePageNavbar = function(viewContainer) {
    $(viewContainer).addClass('page-hidden-navbar');
    return true;
};
app.showPageNavbar = function(viewContainer) {
    var vc = $(viewContainer);
    vc.addClass('page-hiding-navbar').removeClass('page-hidden-navbar').find('.navbar').transitionEnd(function(){
        vc.removeClass('page-hiding-navbar');
    });
};
app.hidePageToolbar = function(viewContainer) {
    $(viewContainer).addClass('page-hidden-toolbar');
    return true;
};
app.showPageToolbar = function(viewContainer) {
    var vc = $(viewContainer);
    vc.addClass('page-hiding-toolbar').removeClass('page-hidden-toolbar').find('.toolbar').transitionEnd(function(){
        vc.removeClass('page-hiding-toolbar');
    });
};