/*===============================================================================
************   Accordion   ************
===============================================================================*/
app.accordionToggle = function (item) {
    item = $(item);
    if (item.length === 0) return;
    if (item.hasClass('accordion-item-expanded')) app.accordionClose(item);
    else app.accordionOpen(item);
};
app.accordionOpen = function (item) {
    item = $(item);
    var list = item.parents('.accordion-list').eq(0);
    var content = item.children('.accordion-item-content');
    if (content.length === 0) content = item.find('.accordion-item-content');
    var expandedItem = list.length > 0 && item.parent().children('.accordion-item-expanded');
    if (expandedItem.length > 0) {
        app.accordionClose(expandedItem);
    }
    content.css('height', content[0].scrollHeight + 'px').transitionEnd(function () {
        if (item.hasClass('accordion-item-expanded')) {
            content.transition(0);
            content.css('height', 'auto');
            var clientLeft = content[0].clientLeft;
            content.transition('');
            item.trigger('opened');
        }
        else {
            content.css('height', '');
            item.trigger('closed');
        }
    });
    item.trigger('open');
    item.addClass('accordion-item-expanded');
};
app.accordionClose = function (item) {
    item = $(item);
    var content = item.children('.accordion-item-content');
    if (content.length === 0) content = item.find('.accordion-item-content');
    item.removeClass('accordion-item-expanded');
    content.transition(0);
    content.css('height', content[0].scrollHeight + 'px');
    // Relayout
    var clientLeft = content[0].clientLeft;
    // Close
    content.transition('');
    content.css('height', '').transitionEnd(function () {
        if (item.hasClass('accordion-item-expanded')) {
            content.transition(0);
            content.css('height', 'auto');
            var clientLeft = content[0].clientLeft;
            content.transition('');
            item.trigger('opened');
        }
        else {
            content.css('height', '');
            item.trigger('closed');
        }
    });
    item.trigger('close');
};