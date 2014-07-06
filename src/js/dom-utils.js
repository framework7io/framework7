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
$.fn = Dom7.prototype;

$.fn.scrollTop = function (top, duration) {
    var dom = this;
    if (typeof top === 'undefined') {
        if (dom.length > 0) return dom[0].scrollTop;
        else return null;
    }
    return dom.each(function () {
        var el = this;
        var currentTop = el.scrollTop;
        if (!duration) {
            el.scrollTop = top;
            return;
        }
        var maxTop = el.scrollHeight - el.offsetHeight;
        var newTop = Math.max(Math.min(top, maxTop), 0);
        var startTime = null;
        if (newTop === currentTop) return;
        function render(time) {
            if (time === undefined) {
                time = new Date().getTime();
            }
            if (startTime === null) {
                startTime = time;
            }
            var scrollTop = currentTop + ((time - startTime) / duration * (newTop - currentTop));
            if (newTop > currentTop && scrollTop >= newTop)  {
                el.scrollTop = newTop;
                return;
            }
            if (newTop < currentTop && scrollTop <= newTop)  {
                el.scrollTop = newTop;
                return;
            }
            el.scrollTop = scrollTop;
            $.requestAnimationFrame(render);
        }
        $.requestAnimationFrame(render);
    });
};
