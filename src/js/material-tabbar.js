/*======================================================
************   Material Tabbar   ************
======================================================*/
app.materialTabbarSetHighlight = function (tabbar, activeLink) {
    tabbar = $(tabbar);
    activeLink = activeLink || tabbar.find('.tab-link.active');

    var tabLinkWidth, highlightTranslate;
    if (tabbar.hasClass('tabbar-scrollable')) {
        tabLinkWidth = activeLink[0].offsetWidth + 'px';
        highlightTranslate = (app.rtl ? - activeLink[0].offsetLeft: activeLink[0].offsetLeft) + 'px';
    }
    else {
        tabLinkWidth = 1 / tabbar.find('.tab-link').length * 100 + '%';
        highlightTranslate = (app.rtl ? - activeLink.index(): activeLink.index()) * 100 + '%';
    }

    tabbar.find('.tab-link-highlight')
        .css({width: tabLinkWidth})
        .transform('translate3d(' + highlightTranslate + ',0,0)');
};
app.initPageMaterialTabbar = function (pageContainer) {
    pageContainer = $(pageContainer);
    var tabbar = $(pageContainer).find('.tabbar');

    function tabbarSetHighlight() {
        app.materialTabbarSetHighlight(tabbar);
    }
    if (tabbar.length > 0) {
        if (tabbar.find('.tab-link-highlight').length === 0) {
            tabbar.find('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
        }

        tabbarSetHighlight();
        $(window).on('resize', tabbarSetHighlight);
        pageContainer.once('pageBeforeRemove', function () {
            $(window).off('resize', tabbarSetHighlight);
        });
    }
};