/* ===============================================================================
************   Tabs   ************
=============================================================================== */
app.showTab = function (tab, tabLink, force) {
    var newTab = $(tab);
    if (arguments.length === 2) {
        if (typeof tabLink === 'boolean') {
            force = tabLink;
        }
    }
    if (newTab.length === 0) return false;
    if (newTab.hasClass('active')) {
        if (force) newTab.trigger('show');
        return false;
    }
    var tabs = newTab.parent('.tabs');
    if (tabs.length === 0) return false;

    // Return swipeouts in hidden tabs
    app.allowSwipeout = true;

    // Animated tabs
    var isAnimatedTabs = tabs.parent().hasClass('tabs-animated-wrap');
    if (isAnimatedTabs) {
        var tabTranslate = (app.rtl ? newTab.index() : -newTab.index()) * 100;
        tabs.transform('translate3d(' + tabTranslate + '%,0,0)');
    }

    // Swipeable tabs
    var isSwipeableTabs = tabs.parent().hasClass('tabs-swipeable-wrap'), swiper;
    if (isSwipeableTabs) {
        swiper = tabs.parent()[0].swiper;
        if (swiper.activeIndex !== newTab.index()) swiper.slideTo(newTab.index(), undefined, false);
    }

    // Remove active class from old tabs
    var oldTab = tabs.children('.tab.active').removeClass('active').trigger('hide');
    // Add active class to new tab
    newTab.addClass('active');
    // Trigger 'show' event on new tab
    newTab.trigger('show');

    // Update navbars in new tab
    if (!isAnimatedTabs && !isSwipeableTabs && newTab.find('.navbar').length > 0) {
        // Find tab's view
        var viewContainer;
        if (newTab.hasClass(app.params.viewClass)) viewContainer = newTab[0];
        else viewContainer = newTab.parents('.' + app.params.viewClass)[0];
        app.sizeNavbars(viewContainer);
    }

    // Find related link for new tab
    if (tabLink) tabLink = $(tabLink);
    else {
        // Search by id
        if (typeof tab === 'string') tabLink = $('.tab-link[href="' + tab + '"]');
        else tabLink = $('.tab-link[href="#' + newTab.attr('id') + '"]');
        // Search by data-tab
        if (!tabLink || tabLink && tabLink.length === 0) {
            $('[data-tab]').each(function () {
                if (newTab.is($(this).attr('data-tab'))) tabLink = $(this);
            });
        }
    }
    if (tabLink.length === 0) return;

    // Find related link for old tab
    var oldTabLink;
    if (oldTab && oldTab.length > 0) {
        // Search by id
        var oldTabId = oldTab.attr('id');
        if (oldTabId) oldTabLink = $('.tab-link[href="#' + oldTabId + '"]');
        // Search by data-tab
        if (!oldTabLink || oldTabLink && oldTabLink.length === 0) {
            $('[data-tab]').each(function () {
                if (oldTab.is($(this).attr('data-tab'))) oldTabLink = $(this);
            });
        }
    }

    // Update links' classes
    if (tabLink && tabLink.length > 0) {
        tabLink.addClass('active');
        // Material Highlight
        if (app.params.material) {
            var tabbar = tabLink.parents('.tabbar');
            if (tabbar.length > 0) {
                if (tabbar.find('.tab-link-highlight').length === 0) {
                    tabbar.find('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
                }
                app.materialTabbarSetHighlight(tabbar, tabLink);
            }
        }
    }
    if (oldTabLink && oldTabLink.length > 0) oldTabLink.removeClass('active');

    return true;
};