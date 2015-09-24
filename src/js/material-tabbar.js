/*======================================================
************   Material Preloader   ************
======================================================*/
app.initPageMaterialTabbar = function (pageContainer) {
    pageContainer = $(pageContainer);
    var tabbar = $(pageContainer).find('.tabbar');

    if (tabbar.length > 0 && tabbar.find('.tab-link-highlight').length === 0) {
        tabbar.find('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
        var tabLinkWidth = 1 / tabbar.find('.tab-link').length * 100;
        var highlightTranslate = (app.rtl ? - tabbar.find('.tab-link.active').index(): tabbar.find('.tab-link.active').index()) * 100;
        tabbar.find('.tab-link-highlight')
            .css({width: tabLinkWidth + '%'})
            .transform('translate3d(' + highlightTranslate + '%,0,0)');
    }
};