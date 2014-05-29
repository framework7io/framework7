/*=======================================
************   Plugins API   ************
=======================================*/
var _plugins = [];
// Initialize plugins
for (var plugin in app.plugins) {
    if (app.params[plugin]) {
        var p = app.plugins[plugin](app, app.params[plugin]);
        if (p) _plugins.push(p);
    }
}
// Plugin Hooks
app.pluginHook = function (hook, args) {
    if (!args) args = {};
    for (var i = 0; i < _plugins.length; i++) {
        if (_plugins[i].hooks && hook in _plugins[i].hooks) {
            _plugins[i].hooks[hook](args);
        }
    }
};
// Prevented by plugin
app.pluginPrevent = function (action, args) {
    var prevent = false;
    for (var i = 0; i < _plugins.length; i++) {
        if (_plugins[i].prevents && action in _plugins[i].prevents) {
            if (_plugins[i].prevents[action](args)) prevent = true;
        }
    }
    return prevent;
};
// Preprocess content by plugin
app.pluginProcess = function (process, data) {
    var processed = data;
    for (var i = 0; i < _plugins.length; i++) {
        if (_plugins[i].process && process in _plugins[i].prevents) {
            processed = _plugins[i].prevents[process](processed);
        }
    }
    return processed;
};
