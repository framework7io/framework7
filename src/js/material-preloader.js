/*======================================================
************   Material Preloader   ************
======================================================*/
app.initPageMaterialPreloader = function (pageContainer) {
    $(pageContainer).find('.preloader').each(function () {
        if ($(this).children('svg').length === 0) {
            $(this).html(app.params.materialPreloaderSvg);
        }
    });
};