/*======================================================
************   Notifications   ************
======================================================*/
var _tempNotificationElement;
app.addNotification = function (params) {
    if (!params) return;
    
    if (typeof params.media === 'undefined') params.media = app.params.notificationMedia;
    if (typeof params.title === 'undefined') params.title = app.params.notificationTitle;
    if (typeof params.subtitle === 'undefined') params.subtitle = app.params.notificationSubtitle;
    if (typeof params.closeIcon === 'undefined') params.closeIcon = app.params.notificationCloseIcon;
    if (typeof params.hold === 'undefined') params.hold = app.params.notificationHold;
    if (typeof params.closeOnClick === 'undefined') params.closeOnClick = app.params.notificationCloseOnClick;
    if (typeof params.button === 'undefined') params.button = app.params.notificationCloseButtonText && {
        text: app.params.notificationCloseButtonText,
        close: true
    };

    if (!_tempNotificationElement) _tempNotificationElement = document.createElement('div');

    params.material = app.params.material;

    var container = $('.notifications');
    if (container.length === 0) {
        app.root.append('<div class="notifications list-block' + (params.material ? '' : ' media-list') + '"><ul></ul></div>');
        container = $('.notifications');
    }
    var list = container.children('ul');
    
    var notificationTemplate = app.params.notificationTemplate || 
        '{{#if custom}}' +
        '<li>{{custom}}</li>' +
        '{{else}}' +
        '<li class="notification-item notification-hidden">' +
            '<div class="item-content">' +
                '{{#if material}}' +
                    '<div class="item-inner">' +
                        '<div class="item-title">{{js "this.message || this.title || this.subtitle"}}</div>' +
                        '{{#if ../button}}{{#button}}' +
                        '<div class="item-after">' +
                            '<a href="#" class="button {{#if color}}color-{{color}}{{/if}} {{#js_compare "this.close !== false"}}close-notification{{/js_compare}}">{{text}}</a>' +
                        '</div>' +
                        '{{/button}}{{/if}}' +
                    '</div>' +
                '{{else}}' +
                    '{{#if media}}' +
                    '<div class="item-media">{{media}}</div>' +
                    '{{/if}}' +
                    '<div class="item-inner">' +
                        '<div class="item-title-row">' +
                            '{{#if title}}' +
                            '<div class="item-title">{{title}}</div>' +
                            '{{/if}}' +
                            '{{#if closeIcon}}' +
                            '<div class="item-after"><a href="#" class="close-notification"><span></span></a></div>' +
                            '{{/if}}' +
                        '</div>' +
                        '{{#if subtitle}}' +
                        '<div class="item-subtitle">{{subtitle}}</div>' +
                        '{{/if}}' +
                        '{{#if message}}' +
                        '<div class="item-text">{{message}}</div>' +
                        '</div>' +
                    '{{/if}}' +
                '{{/if}}' +
            '</div>' +
        '</li>' +
        '{{/if}}';
    if (!app._compiledTemplates.notification) {
        app._compiledTemplates.notification = t7.compile(notificationTemplate);
    }
    _tempNotificationElement.innerHTML = app._compiledTemplates.notification(params);

    var item = $(_tempNotificationElement).children();

    item.on('click', function (e) {
        var close = false;
        var target = $(e.target);
        if (params.material && target.hasClass('button')) {
            if (params.button && params.button.onClick) params.button.onClick.call(target[0], e, item[0]);
        }
        if (target.is('.close-notification') || $(e.target).parents('.close-notification').length > 0) {
            close = true;
        }
        else {
            if (params.onClick) params.onClick(e, item[0]);
            if (params.closeOnClick) close = true;
        }
        if (close) app.closeNotification(item[0], e);
    });
    if (params.onClose) {
        item.data('f7NotificationOnClose', function (e) {
            params.onClose(item[0], e);
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

    if (!app.params.material) {
        app.closeNotification(list.children('li.notification-item:last-child'));
    }
    list.append(item[0]);
    container.show();

    var itemHeight = item.outerHeight(), clientLeft;
    if (params.material) {
        container.transform('translate3d(0, '+itemHeight+'px, 0)');
        container.transition(0);

        clientLeft = item[0].clientLeft;

        container.transform('translate3d(0, 0, 0)');
        container.transition('');
    }
    else {
        item.transform('translate3d(0,' + (-itemHeight) + 'px,0)');
        item.transition(0);

        clientLeft = item[0].clientLeft;

        item.transition('');
        item.transform('translate3d(0,0px,0)');
    }

    container.transform('translate3d(0, 0,0)');
    item.removeClass('notification-hidden');

    return item[0];
};
app.closeNotification = function (item, event) {
    item = $(item);
    if (item.length === 0) return;
    if (item.hasClass('notification-item-removing')) return;
    var container = $('.notifications');

    var itemHeight = item.outerHeight();
    item.css('height', itemHeight + 'px').transition(0).addClass('notification-item-removing');
    var clientLeft = item[0].clientLeft;

    item.css({
        height: '0px',
        marginBottom: '0px'
    }).transition('');

    if (item.data('f7NotificationOnClose')) item.data('f7NotificationOnClose')(event);

    if (container.find('.notification-item:not(.notification-item-removing)').length === 0) {
        container.transform('');
    }

    item.addClass('notification-hidden').transitionEnd(function () {
        item.remove();
        if (container.find('.notification-item').length === 0) {
            container.hide();
        }
    });
};