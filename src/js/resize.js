/*======================================================
************   App Resize Actions   ************
======================================================*/
app.initResize = function () {
    $(window).on('resize', app.resize);
    $(window).on('orientationchange', app.orientationchange);
};
app.resize = function () {
    if (app.sizeNavbars) app.sizeNavbars();
};
app.orientationchange = function () {
    if (app.device && app.device.minimalUi) {
        if (window.orientation === 90 || window.orientation === -90) document.body.scrollTop = 0;
    }
};