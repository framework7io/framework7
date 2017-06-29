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
var appResizeCallbacks = [];
app.getSize = function () {
    var offset = app.root.offset();
    app.width = app.root[0].offsetWidth;
    app.height = app.root[0].offsetHeight;
    app.left = offset.left;
    app.top = offset.top;
};
app.onResize = function (callback) {
    appResizeCallbacks.push(callback);
};
app.offResize = function (callback) {
    for (var i = 0; i < appResizeCallbacks.length; i++) {
        if (appResizeCallbacks[i] === callback) {
            appResizeCallbacks.splice(i, 1);
        }
    }
};
app.resize = function () {
    _fixIpadBodyScrolLeft();
    app.getSize();
    if (app.sizeNavbars) app.sizeNavbars();
    for (var i = 0; i < appResizeCallbacks.length; i++) {
        appResizeCallbacks[i]();
    }
};
app.orientationchange = function () {
    if (app.device && app.device.minimalUi) {
        if (window.orientation === 90 || window.orientation === -90) document.body.scrollTop = 0;
    }
    _fixIpadBodyScrolLeft();
};
app.initResize = function () {
    $(window).on('resize', app.resize);
    $(window).on('orientationchange', app.orientationchange);
    app.getSize();
};
