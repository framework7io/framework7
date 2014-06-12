/*======================================================
************   Notifications   ************
======================================================*/
var _tempNotificationElement;
app.addNotification = function (params) {
    if (!params) return;
    /*
    {
        title, //string
        subtitle, //string
        message, //string
        media, //string
        hold, //number
        onClose, //func
        onClick, //func
        closeOnClick: true,//boolean
        custom, //string
        closeIcon: true //boolean
        additionalClass, //string
    }
    */
    if (typeof params.media === 'undefined') params.media = app.params.notificationMedia;
    if (typeof params.title === 'undefined') params.title = app.params.notificationTitle;
    if (typeof params.subtitle === 'undefined') params.subtitle = app.params.notificationSubtitle;
    if (typeof params.closeIcon === 'undefined') params.closeIcon = app.params.notificationCloseIcon;
    if (typeof params.hold === 'undefined') params.hold = app.params.notificationHold;
    if (typeof params.closeOnClick === 'undefined') params.closeOnClick = app.params.notificationCloseOnClick;

    if (!_tempNotificationElement) _tempNotificationElement = document.createElement('div');

    var container = $('.notifications');
    if (container.length === 0) {
        $('body').append('<div class="notifications list-block media-list"><ul></ul></div>');
        container = $('.notifications');
    }
    var list = container.children('ul');

    var itemHTML;
    if (params.custom) {
        itemHTML = '<li>' + params.custom + '</li>';
    }
    else {
        itemHTML = '<li class="notification-item notification-hidden"><div class="item-content">' +
                        (params.media ?
                        '<div class="item-media">' +
                            params.media +
                        '</div>' : '') +
                        '<div class="item-inner">' +
                            '<div class="item-title-row">' +
                                (params.title ? '<div class="item-title">' + params.title + '</div>' : '') +
                                (params.closeIcon ? '<div class="item-after"><a href="#" class="close-notification"><span></span></a></div>' : '') +
                            '</div>' +
                            (params.subtitle ? '<div class="item-subtitle">' + params.subtitle + '</div>' : '') +
                            (params.message ? '<div class="item-text">' + params.message + '</div>' : '') +
                        '</div>' +
                    '</div></li>';
    }
    _tempNotificationElement.innerHTML = itemHTML;

    var item = $(_tempNotificationElement).children();

    item.on('click', function (e) {
        if (params.onClick) params.onClick(e, item[0]);
        if (params.closeOnClick) app.closeNotification(item[0]);
        else if ($(e.target).is('.close-notification') || $(e.target).parents('.close-notification').length > 0) app.closeNotification(item[0]);
    });
    if (params.onClose) {
        item.data('f7NotificationOnClose', function () {
            params.onClose(item[0]);
        });
    }
    if (params.additionalClass) {
        item.addClass(params.additionalClass);
    }
    if (params.hold) {
        setTimeout(function () {
            if (item.length > 0) app.closeNotification(item[0]);
        }, params.hold);
    }

    list.prepend(item[0]);
    container.show();
    
    var itemHeight = item.height();
    if (container[0].offsetHeight === container[0].scrollHeight) {
        container.transform('translate3d(0, -' + itemHeight + 'px,0)').transition(0);
    }
    else {
        list.transform('translate3d(0, -' + itemHeight + 'px,0)').transition(0);
    }

    var clientLeft = item[0].clientLeft;

    container.transform('translate3d(0, 0,0)').transition('');
    list.transform('translate3d(0, 0,0)').transition('');
    item.removeClass('notification-hidden');

    return item[0];
};
app.closeNotification = function (item) {
    item = $(item);
    if (item.length === 0) return;
    var container = $('.notifications');

    var itemHeight = item.height();
    item.css('height', itemHeight + 'px').transition(0);
    var clientLeft = item[0].clientLeft;

    item.css('height', '0px').transition('');
    if (item.data('f7NotificationOnClose')) item.data('f7NotificationOnClose')();
    item.addClass('notification-hidden').transitionEnd(function () {
        item.remove();
        if (container.find('.notification-item').length === 0) container.hide();
    });
};