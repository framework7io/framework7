/*======================================================
************   Material Preloader   ************
======================================================*/
app.initPageMaterialPreloader = function (pageContainer) {
    $(pageContainer).find('.preloader').each(function () {
        if ($(this).children().length === 0) {
            $(this).html(app.params.materialPreloaderHtml);
        }
    });
};