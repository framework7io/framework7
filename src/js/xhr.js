/*======================================================
************   XHR   ************
======================================================*/
// XHR Caching
app.cache = [];
app.removeFromCache = function(url) {
    var index = false;
    for (var i=0; i<app.cache.length; i++) {
        if (app.cache[i].url === url) index = i;
    }
    if (index!==false) app.cache.splice(index,1);
};

// XHR
app.xhr = false;
app.get = function (url, callback) {
    if (app.params.cache) {
        // Check is the url cached
        for (var i=0; i<app.cache.length; i++) {
            if (app.cache[i].url === url) {
                // Check expiration
                if ( (new Date()).getTime() - app.cache[i].time < app.params.cacheDuration ) {
                    // Load from cache
                    callback(app.cache[i].data);
                    return false;
                }
            }
        }
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function(e) {
        if (callback) {
            if (this.status === 200) {
                callback(this.responseText, false);
                if (app.params.cache) {
                    app.removeFromCache(url);
                    app.cache.push({
                        url: url,
                        time: (new Date()).getTime(),
                        data: this.responseText
                    });
                }
            }
            else {
                callback(this.responseText, true);
            }
        }
    };
    xhr.send();
    app.xhr = xhr;
    return xhr;
};