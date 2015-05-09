/*===========================
Features Support Detection
===========================*/
Framework7.prototype.support = (function () {
    var support = {
        touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
    };

    // Export object
    return support;
})();
