/* ===============================================================================
************   Tabs   ************
=============================================================================== */
app.showTab = function (tab, tabLink) {
    var newTab = $(tab);
    if (newTab.hasClass('active')) return false;
    if (newTab.length === 0) return false;
    var tabs = newTab.parent('.tabs');
    if (tabs.length === 0) return false;

    // Return swipeouts in hidden tabs
    app.allowSwipeout = true;

    // Animated tabs
    var isAnimatedTabs = tabs.parent().hasClass('tabs-animated-wrap');
    if (isAnimatedTabs) {
        tabs.transform('translate3d(' + -newTab.index() * 100 + '%,0,0)');
    }

    // Remove active class from old tabs
    tabs.children('.tab.active').removeClass('active');
    // Add active class to new tab
    newTab.addClass('active');
    // Trigger 'show' event on new tab
    newTab.trigger('show');

    // Update navbars in new tab
    if (!isAnimatedTabs && newTab.find('.navbar').length > 0) {
        // Find tab's view
        var viewContainer;
        if (newTab.hasClass(app.params.viewClass)) viewContainer = newTab[0];
        else viewContainer = newTab.parents('.' + app.params.viewClass)[0];
        app.sizeNavbars(viewContainer);
    }

    // Update class on tab-links
    if (tabLink) tabLink = $(tabLink);
    else {
        if (typeof tab === 'string') tabLink = $('.tab-link[href="' + tab + '"]');
        else tabLink = $('.tab-link[href="#' + newTab.attr('id') + '"]');
    }
    if (tabLink.length === 0) return;

    tabLink.parent().find('.active').removeClass('active');
    tabLink.addClass('active');
    
    return true;
};