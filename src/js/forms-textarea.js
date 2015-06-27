/*===============================================================================
************   Resizeable textarea   ************
===============================================================================*/
app.resizeTextarea = function (textarea) {
    textarea = $(textarea);
    if (!textarea.hasClass('resizeable')) {
        return;
    }
    textarea.css({'height': ''});
    var height = textarea[0].offsetHeight;
    var diff = height - textarea[0].clientHeight;
    var scrollHeight = textarea[0].scrollHeight;

    if (scrollHeight + diff > height) {
        var newAreaHeight = scrollHeight + diff;
        textarea.css('height', newAreaHeight + 'px');
    }
};
app.resizeableTextarea = function (textarea) {
    textarea = $(textarea);
    if (textarea.length === 0) return;
    var textareaTimeout;
    function handleTextarea() {
        clearTimeout(textareaTimeout);
        textareaTimeout = setTimeout(function () {
            app.resizeTextarea(textarea);
        }, 0);
    }
    return textarea.on('change keydown keypress keyup paste cut', handleTextarea);
};
app.initPageResizeableTextareas = function (pageContainer) {
    pageContainer = $(pageContainer);
    var textareas = pageContainer.find('textarea.resizeable');
    textareas.each(function () {
        app.resizeableTextarea(this);
    });
};