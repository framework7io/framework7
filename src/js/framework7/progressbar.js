/*===============================================================================
************   Progress Bar   ************
===============================================================================*/
app.setProgressbar = function (container, progress, speed) {
    container = $(container || app.root);
    if (container.length === 0) return;
    if (progress) progress = Math.min(Math.max(progress, 0), 100);
    var progressbar;
    if (container.hasClass('progressbar')) progressbar = container;
    else {
        progressbar = container.children('.progressbar');
    }
    if (progressbar.length === 0 || progressbar.hasClass('progressbar-infinite')) return;
    var clientLeft = progressbar[0].clientLeft;
    progressbar.children('span').transform('translate3d(' + (-100 + progress) + '%,0,0)');
    if (typeof speed !== 'undefined') {
        progressbar.children('span').transition(speed);
    }
    else {
        progressbar.children('span').transition('');
    }
    return progressbar[0];
};
app.showProgressbar = function (container, progress, color) {
    if (typeof container === 'number') {
        container = app.root;
        progress = arguments[0];
        color = arguments[1];
    }
    if (progress && typeof progress === 'string' && parseFloat(progress) !== progress * 1) {
        color = progress;
        progress = undefined;
    }
    container = $(container || app.root);
    if (container.length === 0) return;
    var progressbar;
    if (container.hasClass('progressbar')) progressbar = container;
    else {
        progressbar = container.children('.progressbar:not(.progressbar-out), .progressbar-infinite:not(.progressbar-out)');
        if (progressbar.length === 0) {
            // Create one
            if (typeof progress !== 'undefined') {
                // Determined
                progressbar = $('<span class="progressbar progressbar-in' + (color ? ' color-' + color : '') + '"><span></span></span>');
            }
            else {
                // Infinite
                progressbar = $('<span class="progressbar-infinite progressbar-in' + (color ? ' color-' + color : '') + '"></span>');
            }
            container.append(progressbar);
        }
    }
    if (progress) app.setProgressbar(container, progress);
    return progressbar[0];
};
app.hideProgressbar = function (container) {
    container = $(container || app.root);
    if (container.length === 0) return;
    var progressbar;
    if (container.hasClass('progressbar')) progressbar = container;
    else {
        progressbar = container.children('.progressbar, .progressbar-infinite');
    }
    if (progressbar.length === 0 || !progressbar.hasClass('progressbar-in') || progressbar.hasClass('progressbar-out')) return;
    progressbar.removeClass('progressbar-in').addClass('progressbar-out').animationEnd(function () {
        progressbar.remove();
        progressbar = null;
    });
    return;
};
app.initPageProgressbar = function (pageContainer) {
    pageContainer = $(pageContainer);
    pageContainer.find('.progressbar').each(function () {
        var p = $(this);
        if (p.children('span').length === 0) p.append('<span></span>');
        if (p.attr('data-progress')) app.setProgressbar(p, p.attr('data-progress'));
    });
};