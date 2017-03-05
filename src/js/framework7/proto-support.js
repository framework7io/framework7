/*===========================
Features Support Detection
===========================*/
Framework7.prototype.support = (function () {
    var support = {
        touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch),
        passiveListener: (function () {
            var supportsPassive = false;
            try {
                var opts = Object.defineProperty({}, 'passive', {
                    get: function() {
                        supportsPassive = true;
                    }
                });
                window.addEventListener('testPassiveListener', null, opts);
            } catch (e) {}
            return supportsPassive;
        })()
    };

    // Export object
    return support;
})();
