/*===========================
 Features Support Detection
 ===========================*/
Framework7.prototype.support = (function () {
    // Export object
    return {
        touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
    };
})();
