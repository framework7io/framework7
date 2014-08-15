// Ajax
var _jsonpRequests = 0;
$.ajax = function (options) {
    var defaults = {
        method: 'GET',
        data: false,
        async: true,
        cache: true,
        user: '',
        password: '',
        headers: {},
        xhrFields: {},
        statusCode: {},
        processData: true,
        dataType: 'text',
        contentType: 'application/x-www-form-urlencoded'
    };

    //For jQuery guys
    if (options.type) options.type = options.method;

    // Merge options and defaults
    for (var prop in defaults) {
        if (!(prop in options)) options[prop] = defaults[prop];
    }

    // Default URL
    if (!options.url) {
        options.url = window.location.toString();
    }

    // Data to modify GET URL
    if ((options.method === 'GET' || options.method === 'HEAD') && options.data) {
        var stringData;
        if (typeof options.data === 'string') {
            // Should be key=value string
            if (options.data.indexOf('?') >= 0) stringData = options.data.split('?')[1];
            else stringData = options.data;
        }
        else {
            // Should be key=value object
            stringData = $.serializeObject(options.data);
        }
        if (options.url.indexOf('?') >= 0) options.url += '&' + stringData;
        else options.url += '?' + stringData;
    }
    // JSONP
    if (options.dataType === 'json' && options.url.indexOf('callback=') >= 0) {
        
        var callbackName = 'f7jsonp_' + Date.now() + (_jsonpRequests++);
        var requestURL;
        var callbackSplit = options.url.split('callback=');
        if (callbackSplit[1].indexOf('&') >= 0) {
            var addVars = callbackSplit[1].split('&').filter(function (el) { return el.indexOf('=') > 0; }).join('&');
            requestURL = callbackSplit[0] + 'callback=' + callbackName + (addVars.length > 0 ? '&' + addVars : '');
        }
        else {
            requestURL = callbackSplit[0] + 'callback=' + callbackName;
        }

        // Create script
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = requestURL;

        // Handler
        window[callbackName] = function (data) {
            if (options.success) options.success(data);
            script.parentNode.removeChild(script);
            script = null;
            delete window[callbackName];
        };
        document.querySelector('head').appendChild(script);

        return;
    }

    // Cache for GET/HEAD requests
    if (options.method === 'GET' || options.method === 'HEAD') {
        if (options.cache === false) options.url += ('_nocache=' + Date.now());
    }

    // Create XHR
    var xhr = new XMLHttpRequest();

    // Open XHR
    xhr.open(options.method, options.url, options.async, options.user, options.password);

    // Create POST Data
    var postData = null;
    
    if ((options.method === 'POST' || options.method === 'PUT') && options.data) {
        if (options.processData) {
            var postDataInstances = [ArrayBuffer, Blob, Document, FormData];
            // Post Data
            if (postDataInstances.indexOf(options.data.constructor) >= 0) {
                postData = options.data;
            }
            else {
                // POST Headers
                var boundary = '---------------------------' + Date.now().toString(16);

                if (options.contentType === 'multipart\/form-data') {
                    xhr.setRequestHeader('Content-Type', 'multipart\/form-data; boundary=' + boundary);
                }
                else {
                    xhr.setRequestHeader('Content-Type', options.contentType);
                }
                postData = '';
                var _data = $.serializeObject(options.data);
                if (options.contentType === 'multipart\/form-data') {
                    boundary = '---------------------------' + Date.now().toString(16);
                    _data = _data.split('&');
                    var _newData = [];
                    for (var i = 0; i < _data.length; i++) {
                        _newData.push('Content-Disposition: form-data; name="' + _data[i].split('=')[0] + '"\r\n\r\n' + _data[i].split('=')[1] + '\r\n');
                    }
                    postData = '--' + boundary + '\r\n' + _newData.join('--' + boundary + '\r\n') + '--' + boundary + '--\r\n';
                }
                else {
                    postData = options.contentType === 'application/x-www-form-urlencoded' ? _data : _data.replace(/&/g, '\r\n');
                }
            }
        }
        else {
            postData = options.data;
        }
            
    }

    // Additional headers
    if (options.headers) {
        for (var header in options.headers) {
            xhr.setRequestHeader(header, options.headers[header]);
        }
    }

    // Check for crossDomain
    if (typeof options.crossDomain === 'undefined') {
        options.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(options.url) && RegExp.$2 !== window.location.host;
    }

    if (!options.crossDomain) {
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }

    if (options.xhrFields) {
        for (var field in options.xhrFields) {
            xhr[field] = options.xhrFields[field];
        }
    }

    // Handle XHR
    xhr.onload = function (e) {
        if (xhr.status === 200 || xhr.status === 0) {
            $(document).trigger('ajaxSuccess', {xhr: xhr});
            if (options.success) {
                var responseData = xhr.responseText;

                if (options.dataType === 'json') responseData = JSON.parse(responseData);
                options.success(responseData, xhr.status, xhr);
            }
        }
        if (options.statusCode) {
            if (options.statusCode[xhr.status]) options.statusCode[xhr.status](xhr);
        }
        if (options.complete) {
            options.complete(xhr);
        }
        $(document).trigger('ajaxComplete', {xhr: xhr});
    };
    
    xhr.onerror = function (e) {
        $(document).trigger('ajaxError', {xhr: xhr});
        if (options.error) options.error(xhr);
    };

    // Ajax start callback
    if (options.start) options.start(xhr);

    // Send XHR
    $(document).trigger('ajaxStart', {xhr: xhr});
    xhr.send(postData);

    // Return XHR object
    return xhr;
};
// Shrotcuts
(function () {
    var methods = ('get post getJSON').split(' ');
    function createMethod(method) {
        $[method] = function (url, data, success) {
            return $.ajax({
                url: url,
                method: method === 'post' ? 'POST' : 'GET',
                data: typeof data === 'function' ? undefined : data,
                success: typeof data === 'function' ? data : success,
                dataType: method === 'getJSON' ? 'json' : undefined
            });
        };
    }
    for (var i = 0; i < methods.length; i++) {
        createMethod(methods[i]);
    }
})();