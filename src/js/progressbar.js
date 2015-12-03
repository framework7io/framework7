/*===============================================================================
************   Progress Bar   ************
===============================================================================*/
app.setProgressbar = function (container, progress, speed) {
    container = $(container || 'body');
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
app.showProgressbar = function (container, progress) {
    if (typeof container === 'number') {
        container = 'body';
        progress = arguments[0];
    }
    container = $(container || 'body');
    if (container.length === 0) return;
    var progressbar;
    if (container.hasClass('progressbar')) progressbar = container;
    else {
        progressbar = container.children('.progressbar:not(.progressbar-out), .progressbar-infinite:not(.progressbar-out)');
        if (progressbar.length === 0) {
            console.log('wtf?!');
            // Create one
            if (typeof progress !== 'undefined') {
                // Determined
                progressbar = $('<span class="progressbar progressbar-in"><span></span></span>');
            }
            else {
                // Infinite
                progressbar = $('<span class="progressbar progressbar-infinite progressbar-in"></span>');
            }
            container.append(progressbar);
        }
    }
    if (progress) app.setProgressbar(container, progress);
    return progressbar[0];
};
app.hideProgressbar = function (container) {
    container = $(container || 'body');
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