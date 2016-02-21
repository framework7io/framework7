/*======================================================
************   XHR   ************
======================================================*/
// XHR Caching
app.cache = [];
app.removeFromCache = function (url) {
    var index = false;
    for (var i = 0; i < app.cache.length; i++) {
        if (app.cache[i].url === url) index = i;
    }
    if (index !== false) app.cache.splice(index, 1);
};

// XHR
app.xhr = false;
app.get = function (url, view, ignoreCache, callback) {
    // should we ignore get params or not
    var _url = url;
    if (app.params.cacheIgnoreGetParameters && url.indexOf('?') >= 0) {
        _url = url.split('?')[0];
    }
    if (app.params.cache && !ignoreCache && url.indexOf('nocache') < 0 && app.params.cacheIgnore.indexOf(_url) < 0) {
        // Check is the url cached
        for (var i = 0; i < app.cache.length; i++) {
            if (app.cache[i].url === _url) {
                // Check expiration
                if ((new Date()).getTime() - app.cache[i].time < app.params.cacheDuration) {
                    // Load from cache
                    callback(app.cache[i].content);
                    return false;
                }
            }
        }
    }

    app.xhr = $.ajax({
        url: url,
        method: 'GET',
        beforeSend: app.params.onAjaxStart,
        complete: function (xhr) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
                if (app.params.cache) {
                    app.removeFromCache(_url);
                    app.cache.push({
                        url: _url,
                        time: (new Date()).getTime(),
                        content: xhr.responseText
                    });
                }
                callback(xhr.responseText, false);
            }
            else {
                callback(xhr.responseText, true);
            }
            if (app.params.onAjaxComplete) app.params.onAjaxComplete(xhr);
        },
        error: function (xhr) {
            callback(xhr.responseText, true);
            if (app.params.onAjaxError) app.params.onAjaxError(xhr);
        }
    });
    if (view) view.xhr = app.xhr;

    return app.xhr;
};
