/*===========================
jQuery-like DOM library
===========================*/
var Dom7 = function (arr) {
    var _this = this, i = 0;
    // Create array-like object
    for (i = 0; i < arr.length; i++) {
        _this[i] = arr[i];
    }
    _this.length = arr.length;
    // Return collection with methods
    return this;
};
Dom7.prototype = {
    // Classes and attriutes
    addClass: function (className) {
        var classes = className.split(' '), i, j;
        for (i = 0; i < classes.length; i++) {
            for (j = 0; j < this.length; j++) {
                this[j].classList.add(classes[i]);
            }
        }
        return this;
    },
    removeClass: function (className) {
        var classes = className.split(' '), i, j;
        for (i = 0; i < classes.length; i++) {
            for (j = 0; j < this.length; j++) {
                this[j].classList.remove(classes[i]);
            }
        }
        return this;
    },
    hasClass: function (className) {
        if (!this[0]) { return false; }
        else { return this[0].classList.contains(className); }
    },
    toggleClass: function (className) {
        var classes = className.split(' '), i, j;
        for (i = 0; i < classes.length; i++) {
            for (j = 0; j < this.length; j++) {
                this[j].classList.toggle(classes[i]);
            }
        }
        return this;
    },
    attr: function (attr, value) {
        var i;
        if (typeof value === 'undefined') {
            if (this[0]) { return this[0].getAttribute(attr); }
            else { return undefined; }
        }
        else {
            for (i = 0; i < this.length; i++) {
                this[i].setAttribute(attr, value);
            }
            return this;
        }
    },
    prop: function (prop, value) {
        var i;
        if (typeof value === 'undefined') {
            if (this[0]) { return this[0][prop]; }
            else { return undefined; }
        }
        else {
            for (i = 0; i < this.length; i++) {
                this[i][prop] = value;
            }
            return this;
        }
    },
    data: function (key, value) {
        var dataKey, i, el;
        if (typeof value === 'undefined') {
            // Get value
            if (this[0]) {
                dataKey = this[0].getAttribute('data-' + key);
                if (dataKey) { return dataKey; }
                else if (this[0].dom7ElementDataStorage && this[0].dom7ElementDataStorage[key]) { return this[0].dom7ElementDataStorage[key]; }
                else { return undefined; }
            }
            else { return undefined; }
        }
        else {
            // Set value
            for (i = 0; i < this.length; i++) {
                el = this[i];
                if (!el.dom7ElementDataStorage) { el.dom7ElementDataStorage = {}; }
                el.dom7ElementDataStorage[key] = value;
            }
            return this;
        }
    },
    val: function (value) {
        var i;
        if (typeof value === 'undefined') {
            if (this[0]) { return this[0].value; }
            else { return null; }
        }
        else {
            for (i = 0; i < this.length; i++) {
                this[i].value = value;
            }
            return this;
        }
    },
    // Transforms
    transform : function (transform) {
        var i, elStyle;
        for (i = 0; i < this.length; i++) {
            elStyle = this[i].style;
            elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
        }
        return this;
    },
    transition: function (duration) {
        var i, elStyle;
        if (typeof duration !== 'string') {
            duration = duration + 'ms';
        }
        for (i = 0; i < this.length; i++) {
            elStyle = this[i].style;
            elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
        }
        return this;
    },
    //Events
    on: function (eventName, targetSelector, listener) {
        var events, i, j;
        function handleLiveEvent(e) {
            var target = e.target, parents, k;
            if ($(target).is(targetSelector)) { listener.call(target, e); }
            else {
                parents = $(target).parents();
                for (k = 0; k < parents.length; k++) {
                    if ($(parents[k]).is(targetSelector)) { listener.call(parents[k], e); }
                }
            }
        }

        events = eventName.split(' ');
        for (i = 0; i < this.length; i++) {
            if (arguments.length === 2 || targetSelector === false) {
                // Usual events
                if (arguments.length === 2) { listener = arguments[1]; }
                for (j = 0; j < events.length; j++) {
                    this[i].addEventListener(events[j], listener, false);
                }
            }
            else {
                //Live events
                for (j = 0; j < events.length; j++) {
                    this[i].addEventListener(events[j], handleLiveEvent, false);
                }
            }
        }

        return this;
    },
    off: function (eventName, listener) {
        var events = eventName.split(' '), i, j;
        for (i = 0; i < events.length; i++) {
            for (j = 0; j < this.length; j++) {
                this[j].removeEventListener(events[i], listener, false);
            }
        }
        return this;
    },
    trigger: function (eventName, eventData) {
        var i, evt;
        for (i = 0; i < this.length; i++) {
            try {
                evt = new CustomEvent(eventName, {detail: eventData, bubbles: true, cancelable: true});
            }
            catch (e) {
                evt = document.createEvent('Event');
                evt.initEvent(eventName, true, true);
                evt.detail = eventData;
            }
            this[i].dispatchEvent(evt);
        }
        return this;
    },
    transitionEnd: function (callback) {
        var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
            j, dom = this;
        function fireCallBack(e) {
            var i;
            /*jshint validthis:true */
            callback.call(this, e);
            for (i = 0; i < events.length; i++) {
                dom.off(events[i], fireCallBack);
            }
        }
        if (callback) {
            for (j = 0; j < events.length; j++) {
                dom.on(events[j], fireCallBack);
            }
        }
        return this;
    },
    animationEnd: function (callback) {
        var events = ['webkitAnimationEnd', 'OAnimationEnd', 'MSAnimationEnd', 'animationend'],
            j, dom = this;
        function fireCallBack(e) {
            var i;
            callback(e);
            for (i = 0; i < events.length; i++) {
                dom.off(events[i], fireCallBack);
            }
        }
        if (callback) {
            for (j = 0; j < events.length; j++) {
                dom.on(events[j], fireCallBack);
            }
        }
        return this;
    },
    // Sizing/Styles
    width: function () {
        if (this[0] === window) {
            return window.innerWidth;
        }
        else {
            if (this.length > 0) {
                return parseFloat(this.css('width')) - parseFloat(this.css('padding-left')) - parseFloat(this.css('padding-right'));
            }
            else {
                return null;
            }
        }
            
    },
    outerWidth: function (margins) {
        if (this.length > 0) {
            if (margins) {
                return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
            }else {
                return this[0].offsetWidth;
            }
        }
        else { return null; }
    },
    height: function () {
        if (this[0] === window) {
            return window.innerHeight;
        }
        else {
            if (this.length > 0) {
                return this[0].offsetHeight - parseFloat(this.css('padding-top')) - parseFloat(this.css('padding-bottom'));
            }
            else {
                return null;
            }
        }
            
    },
    outerHeight: function (margins) {
        if (this.length > 0) {
            if (margins) {
                return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));
            } else {
                return this[0].offsetHeight;
            }
        }
        else { return null; }
    },
    offset: function () {
        var el, box, body, clientTop, clientLeft, scrollTop, scrollLeft;
        if (this.length > 0) {
            el = this[0];
            box = el.getBoundingClientRect();
            body = document.body;
            clientTop  = el.clientTop  || body.clientTop  || 0;
            clientLeft = el.clientLeft || body.clientLeft || 0;
            scrollTop  = window.pageYOffset || el.scrollTop;
            scrollLeft = window.pageXOffset || el.scrollLeft;
            return {
                top: box.top  + scrollTop  - clientTop,
                left: box.left + scrollLeft - clientLeft
            };
        }
        else {
            return null;
        }
    },
    hide: function () {
        var i;
        for (i = 0; i < this.length; i++) {
            this[i].style.display = 'none';
        }
        return this;
    },
    show: function () {
        var i;
        for (i = 0; i < this.length; i++) {
            this[i].style.display = 'block';
        }
        return this;
    },
    css: function (props, value) {
        var i, prop;
        if (arguments.length === 1) {
            if (typeof props === 'string') {
                if (this[0]) { return window.getComputedStyle(this[0], null).getPropertyValue(props); }
            }
            else {
                for (i = 0; i < this.length; i++) {
                    for (prop in props) {
                        this[i].style[prop] = props[prop];
                    }
                }
                return this;
            }
        }
        if (arguments.length === 2 && typeof props === 'string') {
            for (i = 0; i < this.length; i++) {
                this[i].style[props] = value;
            }
            return this;
        }
        return this;
    },
    
    //Dom manipulation
    each: function (callback) {
        var i;
        for (i = 0; i < this.length; i++) {
            callback.call(this[i], i, this[i]);
        }
        return this;
    },
    html: function (html) {
        var i;
        if (typeof html === 'undefined') {
            return this[0] ? this[0].innerHTML : undefined;
        }
        else {
            for (i = 0; i < this.length; i++) {
                this[i].innerHTML = html;
            }
            return this;
        }
    },
    text: function (text) {
        var i;
        if (typeof text === 'undefined') {
            if (this[0]) {
                return this[0].textContent.trim();
            }
            else { return null; }
        }
        else {
            for (i = 0; i < this.length; i++) {
                this[0].textContent = text;
            }
        }
    },
    is: function (selector) {
        var compareWith, i, el ;
        if (!this[0]) { return false; }
        if (typeof selector === 'string') {
            el = this[0];
            if (el === document) { return selector === document; }
            if (el === window) { return selector === window; }

            if (el.matches) { return el.matches(selector); }
            else if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
            else if (el.mozMatchesSelector) { return el.mozMatchesSelector(selector); }
            else if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }
            else {
                compareWith = $(selector);
                for (i = 0; i < compareWith.length; i++) {
                    if (compareWith[i] === this[0]) return true;
                }
                return false;
            }
        }
        else if (selector === document) { return this[0] === document; }
        else if (selector === window) { return this[0] === window; }
        else {
            if (selector.nodeType || selector instanceof Dom7) {
                compareWith = selector.nodeType ? [selector] : selector;
                for (i = 0; i < compareWith.length; i++) {
                    if (compareWith[i] === this[0]) { return true; }
                }
                return false;
            }
            return false;
        }
        
    },
    indexOf: function (el) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === el) { return i; }
        }

        return -1;
    },
    index: function () {
        var child, i;
        if (this[0]) {
            child = this[0];
            i = 0;
            while ((child = child.previousSibling) != null) {
                if (child.nodeType === 1) { i++; }
            }
            return i;
        }
        else { return undefined; }
    },
    eq: function (index) {
        var length, returnIndex;
        if (typeof index === 'undefined') { return this; }
        length = this.length;

        if (index > length - 1) {
            return new Dom7([]);
        }
        if (index < 0) {
            returnIndex = length + index;
            if (returnIndex < 0) { return new Dom7([]); }
            else { return new Dom7([this[returnIndex]]); }
        }
        return new Dom7([this[index]]);
    },
    append: function (newChild) {
        var i, tempDiv;
        for (i = 0; i < this.length; i++) {
            if (typeof newChild === 'string') {
                tempDiv = document.createElement('div');
                tempDiv.innerHTML = newChild;
                while (tempDiv.firstChild) {
                    this[i].appendChild(tempDiv.firstChild);
                }
            }
            else {
                this[i].appendChild(newChild);
            }
        }
        return this;
    },
    prepend: function (newChild) {
        var i, tempDiv, j;
        for (i = 0; i < this.length; i++) {
            if (typeof newChild === 'string') {
                tempDiv = document.createElement('div');
                tempDiv.innerHTML = newChild;
                for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                    this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                }
            }
            else {
                this[i].insertBefore(newChild, this[i].childNodes[0]);
            }
        }
        return this;
    },
    insertBefore: function (selector) {
        var before = $(selector), i, j;
        for (i = 0; i < this.length; i++) {
            if (before.length === 1) {
                before[0].parentNode.insertBefore(this[i], before[0]);
            }
            else if (before.length > 1) {
                for (j = 0; j < before.length; j++) {
                    before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                }
            }
        }
    },
    insertAfter: function (selector) {
        var after = $(selector), i, j;
        for (i = 0; i < this.length; i++) {
            if (after.length === 1) {
                after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
            }
            else if (after.length > 1) {
                for (j = 0; j < after.length; j++) {
                    after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                }
            }
        }
    },
    next: function () {
        if (this.length > 0) {
            if (this[0].nextElementSibling) { return new Dom7([this[0].nextElementSibling]); }
            else { return new Dom7([]); }
        }
        else { return new Dom7([]); }
    },
    nextAll: function (selector) {
        var nextEls = [],
            el = this[0], next;
        if (!el) { return new Dom7([]); }
        while (el.nextElementSibling) {
            next = el.nextElementSibling;
            if (selector && $(next).is(selector)) { nextEls.push(next); }
            else { nextEls.push(next); }
            el = next;
        }
        return new Dom7(nextEls);
    },
    prev: function () {
        if (this.length > 0) {
            if (this[0].previousElementSibling) { return new Dom7([this[0].previousElementSibling]); }
            else { return new Dom7([]); }
        }
        else { return new Dom7([]); }
    },
    prevAll: function (selector) {
        var prevEls = [],
            el = this[0], prev;
        if (!el) { return new Dom7([]); }
        while (el.previousElementSibling) {
            prev = el.previousElementSibling;
            if (selector && $(prev).is(selector)) { prevEls.push(prev); }
            else { prevEls.push(prev); }
            el = prev;
        }
        return new Dom7(prevEls);
    },
    parent: function (selector) {
        var parents = [], i;
        for (i = 0; i < this.length; i++) {
            if (selector) {
                if ($(this[i].parentNode).is(selector)) { parents.push(this[i].parentNode); }
            }
            else {
                parents.push(this[i].parentNode);
            }
        }
        return $($.unique(parents));
    },
    parents: function (selector) {
        var parents = [], i, parent;
        for (i = 0; i < this.length; i++) {
            parent = this[i].parentNode;
            while (parent) {
                if (selector) {
                    if ($(parent).is(selector)) { parents.push(parent); }
                }
                else {
                    parents.push(parent);
                }
                parent = parent.parentNode;
            }
        }
        return $($.unique(parents));
    },
    find : function (selector) {
        var foundElements = [], i, found, j;
        for (i = 0; i < this.length; i++) {
            found = this[i].querySelectorAll(selector);
            for (j = 0; j < found.length; j++) {
                foundElements.push(found[j]);
            }
        }
        return new Dom7(foundElements);
    },
    children: function (selector) {
        var children = [], i, childNodes, j;
        for (i = 0; i < this.length; i++) {
            childNodes = this[i].childNodes;

            for (j = 0; j < childNodes.length; j++) {
                if (!selector) {
                    if (childNodes[j].nodeType === 1) { children.push(childNodes[j]); }
                }
                else {
                    if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) { children.push(childNodes[j]); }
                }
            }
        }
        return new Dom7($.unique(children));
    },
    remove: function () {
        for (var i = 0; i < this.length; i++) {
            if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
        }
        return this;
    }
};
// Shortcuts
(function () {
    var shortcuts = ('click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll').split(' '),
        notTrigger = ('resize scroll').split(' '),
        i;

    function createMethod(name) {
        Dom7.prototype[name] = function (handler) {
            var i;
            if (typeof handler === 'undefined') {
                for (i = 0; i < this.length; i++) {
                    if (notTrigger.indexOf(name) < 0) { this[i][name](); }
                }
                return this;
            }
            else {
                return this.on(name, handler);
            }
        };
    }

    for (i = 0; i < shortcuts.length; i++) {
        createMethod(shortcuts[i]);
    }
})();

// Selector 
var $ = function (selector, context) {
    var arr = [], i = 0, els;
    if (selector) {
        // String
        if (typeof selector === 'string') {
            els = (context || document).querySelectorAll(selector);
            for (i = 0; i < els.length; i++) {
                arr.push(els[i]);
            }
        }
        // Node/element
        else if (selector.nodeType || selector === window || selector === document) {
            arr.push(selector);
        }
        //Array of elements or instance of Dom
        else if (selector.length > 0 && selector[0].nodeType) {
            for (i = 0; i < selector.length; i++) {
                arr.push(selector[i]);
            }
        }
    }
    return new Dom7(arr);
};
