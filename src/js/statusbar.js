/*=====================================================================================
************   Detect that app in fullscreen mode or chopped by statusbar  ************
=====================================================================================*/
app.detectStatusBar = function () {
    var width = $(window).width();
    var height = $(window).height();
    if (
        // iPhone 5
        (width === 320 && height === 568) ||
        (width === 568 && height === 320) ||
        // iPhone 4
        (width === 320 && height === 480) ||
        (width === 480 && height === 320) ||
        // iPad
        (width === 768 && height === 1024) ||
        (width === 1024 && height === 768)
    ) {
        $('body').addClass('with-statusbar-overlay');
    }
    else {
        $('body').removeClass('with-statusbar-overlay');
    }
};