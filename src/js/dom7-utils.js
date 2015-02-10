// DOM Library Utilites
$.parseUrlQuery = function (url) {
    var query = {}, i, params, param;
    if (url.indexOf('?') >= 0) url = url.split('?')[1];
    else return query;
    params = url.split('&');
    for (i = 0; i < params.length; i++) {
        param = params[i].split('=');
        query[param[0]] = param[1];
    }
    return query;
};
$.isArray = function (arr) {
    if (Object.prototype.toString.apply(arr) === '[object Array]') return true;
    else return false;
};
$.unique = function (arr) {
    var unique = [];
    for (var i = 0; i < arr.length; i++) {
        if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
    }
    return unique;
};
$.trim = function (str) {
    return str.trim();
};
$.serializeObject = function (obj) {
    if (typeof obj === 'string') return obj;
    var resultArray = [];
    var separator = '&';
    for (var prop in obj) {
        if ($.isArray(obj[prop])) {
            var toPush = [];
            for (var i = 0; i < obj[prop].length; i ++) {
                toPush.push(prop + '=' + obj[prop][i]);
            }
            resultArray.push(toPush.join(separator));
        }
        else {
            // Should be string
            resultArray.push(prop + '=' + obj[prop]);
        }
    }

    return resultArray.join(separator);
};

$.getTranslate = function (el, axis) {
    var matrix, curTransform, curStyle, transformMatrix;

    // automatic axis detection
    if (typeof axis === 'undefined') {
        axis = 'x';
    }

    curStyle = window.getComputedStyle(el, null);
    if (window.WebKitCSSMatrix) {
        // Some old versions of Webkit choke when 'none' is passed; pass
        // empty string instead in this case
        transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
    }
    else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
    }

    if (axis === 'x') {
        //Latest Chrome and webkits Fix
        if (window.WebKitCSSMatrix)
            curTransform = transformMatrix.m41;
        //Crazy IE10 Matrix
        else if (matrix.length === 16)
            curTransform = parseFloat(matrix[12]);
        //Normal Browsers
        else
            curTransform = parseFloat(matrix[4]);
    }
    if (axis === 'y') {
        //Latest Chrome and webkits Fix
        if (window.WebKitCSSMatrix)
            curTransform = transformMatrix.m42;
        //Crazy IE10 Matrix
        else if (matrix.length === 16)
            curTransform = parseFloat(matrix[13]);
        //Normal Browsers
        else
            curTransform = parseFloat(matrix[5]);
    }
    
    return curTransform || 0;
};

$.requestAnimationFrame = function (callback) {
    if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
    else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
    else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
    else {
        return window.setTimeout(callback, 1000 / 60);
    }
};
$.cancelAnimationFrame = function (id) {
    if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id);
    else if (window.webkitCancelAnimationFrame) return window.webkitCancelAnimationFrame(id);
    else if (window.mozCancelAnimationFrame) return window.mozCancelAnimationFrame(id);
    else {
        return window.clearTimeout(id);
    }  
};
$.supportTouch = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);

// Link to prototype
$.fn = Dom7.prototype;

// Plugins
$.fn.scrollTo = function (left, top, duration, easing) {
    return this.each(function () {
        var el = this;
        var currentTop, currentLeft, maxTop, maxLeft, newTop, newLeft, scrollTop, scrollLeft;
        var animateTop = top > 0 || top === 0;
        var animateLeft = left > 0 || left === 0;
        if (typeof easing === 'undefined') {
            easing = 'swing';
        }
        if (animateTop) {
            currentTop = el.scrollTop;
            if (!duration) {
                el.scrollTop = top;
            }
        }
        if (animateLeft) {
            currentLeft = el.scrollLeft;
            if (!duration) {
                el.scrollLeft = left;
            }
        }
        if (!duration) return;
        if (animateTop) {
            maxTop = el.scrollHeight - el.offsetHeight;
            newTop = Math.max(Math.min(top, maxTop), 0);
        }
        if (animateLeft) {
            maxLeft = el.scrollWidth - el.offsetWidth;
            newLeft = Math.max(Math.min(left, maxLeft), 0);
        }
        var startTime = null;
        if (animateTop && newTop === currentTop) animateTop = false;
        if (animateLeft && newLeft === currentLeft) animateLeft = false;
        function render(time) {
            if (time === undefined) {
                time = new Date().getTime();
            }
            if (startTime === null) {
                startTime = time;
            }
            var doneLeft, doneTop, done;
            var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
            var easeProgress = easing === 'linear' ? progress : (0.5 - Math.cos( progress * Math.PI ) / 2);
            if (animateTop) scrollTop = currentTop + (easeProgress * (newTop - currentTop));
            if (animateLeft) scrollLeft = currentLeft + (easeProgress * (newLeft - currentLeft));
            if (animateTop && newTop > currentTop && scrollTop >= newTop)  {
                el.scrollTop = newTop;
                done = true;
            }
            if (animateTop && newTop < currentTop && scrollTop <= newTop)  {
                el.scrollTop = newTop;
                done = true;
            }

            if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft)  {
                el.scrollLeft = newLeft;
                done = true;
            }
            if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft)  {
                el.scrollLeft = newLeft;
                done = true;
            }

            if (done) return;
            if (animateTop) el.scrollTop = scrollTop;
            if (animateLeft) el.scrollLeft = scrollLeft;
            $.requestAnimationFrame(render);
        }
        $.requestAnimationFrame(render);
    });
};
$.fn.scrollTop = function (top, duration, easing) {
    var dom = this;
    if (typeof top === 'undefined') {
        if (dom.length > 0) return dom[0].scrollTop;
        else return null;
    }
    return dom.scrollTo(undefined, top, duration, easing);
};
$.fn.scrollLeft = function (left, duration, easing) {
    var dom = this;
    if (typeof left === 'undefined') {
        if (dom.length > 0) return dom[0].scrollLeft;
        else return null;
    }
    return dom.scrollTo(left, undefined, duration, easing);
};