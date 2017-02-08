/*======================================================
************   Material Tabbar   ************
======================================================*/
app.materialTabbarSetHighlight = function (tabbar, activeLink) {
    tabbar = $(tabbar);
    activeLink = activeLink || tabbar.find('.tab-link.active');

    if (activeLink && activeLink.length > 0) {
        var tabLinkWidth, highlightTranslate;
        if (tabbar.hasClass('tabbar-scrollable')) {
            tabLinkWidth = activeLink[0].offsetWidth + 'px';
            highlightTranslate = activeLink[0].offsetLeft + 'px';
        }
        else {
            tabLinkWidth = 1 / tabbar.find('.tab-link').length * 100 + '%';
            highlightTranslate = (app.rtl ? - activeLink.index(): activeLink.index()) * 100 + '%';
        }

        tabbar.find('.tab-link-highlight')
            .css({width: tabLinkWidth})
            .transform('translate3d(' + highlightTranslate + ',0,0)');
    }
};
app.initPageMaterialTabbar = function (pageContainer) {
    pageContainer = $(pageContainer);
    var tabbar = pageContainer.find('.tabbar');
    if (tabbar.length === 0 && pageContainer.hasClass('tabbar')) tabbar = pageContainer;

    function tabbarSetHighlight() {
        app.materialTabbarSetHighlight(tabbar);
    }
    if (tabbar.length > 0) {
        if (tabbar.find('.tab-link-highlight').length === 0) {
            tabbar.find('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
        }

        tabbarSetHighlight();
        $(window).on('resize', tabbarSetHighlight);
        pageContainer.once('page:beforeremove', function () {
            $(window).off('resize', tabbarSetHighlight);
        });
    }
};
app.initMaterialTabbar = function (tabbar) {
    return app.initPageMaterialTabbar(tabbar);
};