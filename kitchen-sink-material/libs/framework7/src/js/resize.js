/*======================================================
************   App Resize Actions   ************
======================================================*/
// Prevent iPad horizontal body scrolling when soft keyboard is opened
function _fixIpadBodyScrolLeft() {
    if (app.device.ipad) {
        document.body.scrollLeft = 0;
        setTimeout(function () {
            document.body.scrollLeft = 0;
        }, 0);
    }
}
app.initResize = function () {
    $(window).on('resize', app.resize);
    $(window).on('orientationchange', app.orientationchange);
};
app.resize = function () {
    if (app.sizeNavbars) app.sizeNavbars();
    _fixIpadBodyScrolLeft();
    
};
app.orientationchange = function () {
    if (app.device && app.device.minimalUi) {
        if (window.orientation === 90 || window.orientation === -90) document.body.scrollTop = 0;
    }
    _fixIpadBodyScrolLeft();
};
