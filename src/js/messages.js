/*======================================================
************   Messages   ************
======================================================*/
var Messages = function (container, params) {
    var defaults = {
        autoLayout: true,
        newMessagesFirst: false,
        messageTemplate: 
            '{{#if day}}' +
            '<div class="messages-date">{{day}} {{#if time}}, <span>{{time}}</span>{{/if}}</div>' +
            '{{/if}}' +
            '<div class="message message-{{type}} {{#if hasImage}}message-pic{{/if}} {{#if avatar}}message-with-avatar{{/if}} message-appear-from-{{position}}">' +
                '{{#if name}}<div class="message-name">{{name}}</div>{{/if}}' +
                '<div class="message-text">{{text}}</div>' +
                '{{#if avatar}}<div class="message-avatar" style="background-image:url({{avatar}})"></div>{{/if}}' +
                '{{#if label}}<div class="message-label">{{label}}</div>{{/if}}' +
            '</div>'
    };
    params = params || {};
    for (var def in defaults) {
        if (typeof params[def] === 'undefined' || params[def] === null) {
            params[def] = defaults[def];
        }
    }

    // Instance
    var m = this;

    // Params
    m.params = params;

    // Container
    m.container = $(container);
    if (m.container.length === 0) return;

    // Autolayout
    if (m.params.autoLayout) m.container.addClass('messages-auto-layout');

    // Is In Page
    m.pageContainer = m.container.parents('.page').eq(0);
    m.pageContent = m.pageContainer.find('.page-content');

    // Compiled template
    m.template = Template7.compile(m.params.messageTemplate);

    // Auto Layout
    m.layout = function () {
        m.container.find('.message').each(function () {
            var message = $(this);
            if (message.find('.message-text img').length > 0) message.addClass('message-pic');
            if (message.find('.message-avatar').length > 0) message.addClass('message-with-avatar');
        });
        m.container.find('.message').each(function () {
            var message = $(this);
            var isSent = message.hasClass('message-sent');
            var next = message.next('.message-' + (isSent ? 'sent' : 'received'));
            var prev = message.prev('.message-' + (isSent ? 'sent' : 'received'));
            if (next.length === 0) {
                message.addClass('message-last message-with-tail');
            }
            else message.removeClass('message-last message-with-tail');

            if (prev.length === 0) {
                message.addClass('message-first');
            }
            else message.removeClass('message-first');

            if (prev.length > 0 && prev.find('.message-name').length > 0 && message.find('.message-name').length > 0) {
                if (prev.find('.message-name').text() !== message.find('.message-name').text()) {
                    prev.addClass('message-last message-with-tail');
                    message.addClass('message-first');
                }
            }
        });
        
    };

    // Add Message
    m.appendMessage = function (props) {
        return m.addMessage(props, 'append');
    };
    m.prependMessage = function (props) {
        return m.addMessage(props, 'prepend');
    };
    m.addMessage = function (props, method) {
        if (typeof method === 'undefined') {
            method = m.params.newMessagesFirst ? 'prepend' : 'append';
        }
        props = props || {};
        props.type = props.type || 'sent';
        if (!props.text) return false;

        props.hasImage = props.text.indexOf('<img') >= 0;
        props.position = method === 'append' ? 'bottom' : 'top';
        
        var messageHTML = m.template(props);
        m.container[method](messageHTML);

        if (m.params.autoLayout) m.layout();
        if ((method === 'append' && !m.params.newMessagesFirst) || (method === 'prepend' && m.params.newMessagesFirst)) {
            m.scrollMessages();
        }
    };

    // Scroll
    m.scrollMessages = function (duration) {
        if (typeof duration === 'undefined') duration = 400;
        var currentScroll = m.pageContent[0].scrollTop;
        var newScroll = m.params.newMessagesFirst ? 0 : m.pageContent[0].scrollHeight - m.pageContent[0].offsetHeight;
        if (newScroll === currentScroll) return;
        m.pageContent.scrollTop(newScroll, duration);
    };

    // Init Destroy
    m.init = function () {
        if (m.params.autoLayout) m.layout();
        m.scrollMessages(0);
    };
    m.destroy = function () {
        m = null;
    };

    // Init
    m.init();

    m.container[0].f7Messagebar = m;
    return m;
};
app.messages = function (container, params) {
    return new Messages (container, params);
};
app.initPageMessages = function (pageContainer) {
    pageContainer = $(pageContainer);
    var messages = pageContainer.find('.messages');
    if (messages.length === 0) return;
    if (!messages.hasClass('messages-init')) {
        return;
    }
    var m = app.messages(messages, {
        autoLayout: messages.data('auto-layout'),
        newMessagesFirst: messages.data('new-messages-first') && (messages.data('new-messages-first') === 'false' ? false : true),
    });

    // Destroy on page remove
    function pageBeforeRemove() {
        m.destroy();
        pageContainer.off('pageBeforeRemove', pageBeforeRemove);
    }
    if (pageContainer.hasClass('page')) {
        pageContainer.on('pageBeforeRemove', pageBeforeRemove);
    }
};
