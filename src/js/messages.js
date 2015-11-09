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
            '<div class="message message-{{type}} {{#if hasImage}}message-pic{{/if}} {{#if avatar}}message-with-avatar{{/if}} {{#if position}}message-appear-from-{{position}}{{/if}}">' +
                '{{#if name}}<div class="message-name">{{name}}</div>{{/if}}' +
                '<div class="message-text">{{text}}{{#if date}}<div class="message-date">{{date}}</div>{{/if}}</div>' +
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

    // New messages first
    if (m.params.newMessagesFirst) m.container.addClass('messages-new-first');

    // Is In Page
    m.pageContainer = m.container.parents('.page').eq(0);
    m.pageContent = m.pageContainer.find('.page-content');

    // Compiled template
    m.template = Template7.compile(m.params.messageTemplate);

    // Auto Layout
    m.layout = function () {
        if (!m.container.hasClass('messages-auto-layout')) m.container.addClass('messages-auto-layout');
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
    m.appendMessage = function (props, animate) {
        return m.addMessage(props, 'append', animate);
    };
    m.prependMessage = function (props, animate) {
        return m.addMessage(props, 'prepend', animate);
    };
    m.addMessage = function (props, method, animate) {
        return m.addMessages([props], method, animate);
    };
    m.addMessages = function (newMessages, method, animate) {
        if (typeof animate === 'undefined') {
            animate = true;
        }
        if (typeof method === 'undefined') {
            method = m.params.newMessagesFirst ? 'prepend' : 'append';
        }
        var newMessagesHTML = '', i;
        for (i = 0; i < newMessages.length; i++) {
            var props = newMessages[i] || {};
            props.type = props.type || 'sent';
            if (!props.text) continue;
            props.hasImage = props.text.indexOf('<img') >= 0;
            if (animate) props.position = method === 'append' ? 'bottom' : 'top';

            newMessagesHTML += m.template(props);
        }
        var heightBefore, scrollBefore;
        if (method === 'prepend') {
            heightBefore = m.pageContent[0].scrollHeight;
            scrollBefore = m.pageContent[0].scrollTop;
        }
        m.container[method](newMessagesHTML);
        if (m.params.autoLayout) m.layout();
        if (method === 'prepend') {
            m.pageContent[0].scrollTop = scrollBefore + (m.pageContent[0].scrollHeight - heightBefore);
        }
        if ((method === 'append' && !m.params.newMessagesFirst) || (method === 'prepend' && m.params.newMessagesFirst)) {
            m.scrollMessages(animate ? undefined : 0);
        }
        var messages = m.container.find('.message');
        if (newMessages.length === 1) {
            return method === 'append' ? messages[messages.length - 1] : messages[0];
        }
        else {
            var messagesToReturn = [];
            if (method === 'append') {
                for (i = messages.length - newMessages.length; i < messages.length; i++) {
                    messagesToReturn.push(messages[i]);
                }
            }
            else {
                for (i = 0; i < newMessages.length; i++) {
                    messagesToReturn.push(messages[i]);
                }   
            }
            return messagesToReturn;
        }
        
    };
    m.removeMessage = function (message) {
        message = $(message);
        if (message.length === 0) {
            return false;
        }
        else {
            message.remove();
            if (m.params.autoLayout) m.layout();
            return true;
        }
    };
    m.removeMessages = function (messages) {
        m.removeMessage(messages);
    };
    m.clean = function () {
        m.container.html('');
    };

    // Scroll
    m.scrollMessages = function (duration, scrollTop) {
        if (typeof duration === 'undefined') duration = 400;
        var currentScroll = m.pageContent[0].scrollTop;
        var newScroll;
        if (typeof scrollTop !== 'undefined') newScroll = scrollTop;
        else {
            newScroll = m.params.newMessagesFirst ? 0 : m.pageContent[0].scrollHeight - m.pageContent[0].offsetHeight;
            if (newScroll === currentScroll) return;
        }
        m.pageContent.scrollTop(newScroll, duration);
    };

    // Init Destroy
    m.init = function () {
        if (m.params.messages) {
            m.addMessages(m.params.messages, undefined, false);
        }
        else {
            if (m.params.autoLayout) m.layout();    
            m.scrollMessages(0);
        }
        
    };
    m.destroy = function () {
        m = null;
    };

    // Init
    m.init();

    m.container[0].f7Messages = m;
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
    var m = app.messages(messages, messages.dataset());

    // Destroy on page remove
    function pageBeforeRemove() {
        m.destroy();
        pageContainer.off('pageBeforeRemove', pageBeforeRemove);
    }
    if (pageContainer.hasClass('page')) {
        pageContainer.on('pageBeforeRemove', pageBeforeRemove);
    }
};
