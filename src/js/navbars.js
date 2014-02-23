/*======================================================
************   Navbars   ************
======================================================*/
app.sizeNavbars = function(viewContainer){
    var navbarInner = viewContainer ? $(viewContainer).find('.navbar .navbar-inner') : $('.navbar .navbar-inner');
    $('.navbar .navbar-inner').each(function(){
        var tt = $(this),
            left = tt.find('.left'),
            right = tt.find('.right'),
            center = tt.find('.center'),
            leftWidth = left.outerWidth(true),
            rightWidth = right.outerWidth(true),
            centerWidth = center.outerWidth(true),
            navbarWidth = tt.width(),
            noLeft = left.length===0,
            noRight = right.length===0,
            currLeft = (navbarWidth - rightWidth - centerWidth + leftWidth)/2,
            diff;
        if (noRight) {
            currLeft = navbarWidth - centerWidth;
        }
        if (noLeft) {
            currLeft = 0;   
        }
        var requiredLeft = (navbarWidth-centerWidth)/2;
        if (navbarWidth - leftWidth - rightWidth > centerWidth) {
            if (requiredLeft<leftWidth) {
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
        tt.find('.center').css({left: diff+'px'});
    });
};