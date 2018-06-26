'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ssrWindow = require('ssr-window');

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var globals = {};
var jsonpRequests = 0;

function Request(requestOptions) {
  var globalsNoCallbacks = _utils2.default.extend({}, globals);
  'beforeCreate beforeOpen beforeSend error complete success statusCode'.split(' ').forEach(function (callbackName) {
    delete globalsNoCallbacks[callbackName];
  });
  var defaults = _utils2.default.extend({
    url: _ssrWindow.window.location.toString(),
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
    contentType: 'application/x-www-form-urlencoded',
    timeout: 0
  }, globalsNoCallbacks);

  var options = _utils2.default.extend({}, defaults, requestOptions);
  var proceedRequest = void 0;

  // Function to run XHR callbacks and events
  function fireCallback(callbackName) {
    /*
      Callbacks:
      beforeCreate (options),
      beforeOpen (xhr, options),
      beforeSend (xhr, options),
      error (xhr, status),
      complete (xhr, stautus),
      success (response, status, xhr),
      statusCode ()
    */
    var globalCallbackValue = void 0;
    var optionCallbackValue = void 0;

    for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      data[_key - 1] = arguments[_key];
    }

    if (globals[callbackName]) {
      globalCallbackValue = globals[callbackName].apply(globals, data);
    }
    if (options[callbackName]) {
      optionCallbackValue = options[callbackName].apply(options, data);
    }
    if (typeof globalCallbackValue !== 'boolean') globalCallbackValue = true;
    if (typeof optionCallbackValue !== 'boolean') optionCallbackValue = true;
    return globalCallbackValue && optionCallbackValue;
  }

  // Before create callback
  proceedRequest = fireCallback('beforeCreate', options);
  if (proceedRequest === false) return undefined;

  // For jQuery guys
  if (options.type) options.method = options.type;

  // Parameters Prefix
  var paramsPrefix = options.url.indexOf('?') >= 0 ? '&' : '?';

  // UC method
  var method = options.method.toUpperCase();

  // Data to modify GET URL
  if ((method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'DELETE') && options.data) {
    var stringData = void 0;
    if (typeof options.data === 'string') {
      // Should be key=value string
      if (options.data.indexOf('?') >= 0) stringData = options.data.split('?')[1];else stringData = options.data;
    } else {
      // Should be key=value object
      stringData = _utils2.default.serializeObject(options.data);
    }
    if (stringData.length) {
      options.url += paramsPrefix + stringData;
      if (paramsPrefix === '?') paramsPrefix = '&';
    }
  }

  // JSONP
  if (options.dataType === 'json' && options.url.indexOf('callback=') >= 0) {
    var callbackName = 'f7jsonp_' + (Date.now() + (jsonpRequests += 1));
    var abortTimeout = void 0;
    var callbackSplit = options.url.split('callback=');
    var requestUrl = callbackSplit[0] + 'callback=' + callbackName;
    if (callbackSplit[1].indexOf('&') >= 0) {
      var addVars = callbackSplit[1].split('&').filter(function (el) {
        return el.indexOf('=') > 0;
      }).join('&');
      if (addVars.length > 0) requestUrl += '&' + addVars;
    }

    // Create script
    var script = _ssrWindow.document.createElement('script');
    script.type = 'text/javascript';
    script.onerror = function onerror() {
      clearTimeout(abortTimeout);
      fireCallback('error', null, 'scripterror');
      fireCallback('complete', null, 'scripterror');
    };
    script.src = requestUrl;

    // Handler
    _ssrWindow.window[callbackName] = function jsonpCallback(data) {
      clearTimeout(abortTimeout);
      fireCallback('success', data);
      script.parentNode.removeChild(script);
      script = null;
      delete _ssrWindow.window[callbackName];
    };
    _ssrWindow.document.querySelector('head').appendChild(script);

    if (options.timeout > 0) {
      abortTimeout = setTimeout(function () {
        script.parentNode.removeChild(script);
        script = null;
        fireCallback('error', null, 'timeout');
      }, options.timeout);
    }

    return undefined;
  }

  // Cache for GET/HEAD requests
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'DELETE') {
    if (options.cache === false) {
      options.url += paramsPrefix + '_nocache' + Date.now();
    }
  }

  // Create XHR
  var xhr = new XMLHttpRequest();

  // Save Request URL
  xhr.requestUrl = options.url;
  xhr.requestParameters = options;

  // Before open callback
  proceedRequest = fireCallback('beforeOpen', xhr, options);
  if (proceedRequest === false) return xhr;

  // Open XHR
  xhr.open(method, options.url, options.async, options.user, options.password);

  // Create POST Data
  var postData = null;

  if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && options.data) {
    if (options.processData) {
      var postDataInstances = [ArrayBuffer, Blob, Document, FormData];
      // Post Data
      if (postDataInstances.indexOf(options.data.constructor) >= 0) {
        postData = options.data;
      } else {
        // POST Headers
        var boundary = '---------------------------' + Date.now().toString(16);

        if (options.contentType === 'multipart/form-data') {
          xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
        } else {
          xhr.setRequestHeader('Content-Type', options.contentType);
        }
        postData = '';
        var data = _utils2.default.serializeObject(options.data);
        if (options.contentType === 'multipart/form-data') {
          data = data.split('&');
          var newData = [];
          for (var i = 0; i < data.length; i += 1) {
            newData.push('Content-Disposition: form-data; name="' + data[i].split('=')[0] + '"\r\n\r\n' + data[i].split('=')[1] + '\r\n');
          }
          postData = '--' + boundary + '\r\n' + newData.join('--' + boundary + '\r\n') + '--' + boundary + '--\r\n';
        } else {
          postData = data;
        }
      }
    } else {
      postData = options.data;
      xhr.setRequestHeader('Content-Type', options.contentType);
    }
  }

  // Additional headers
  if (options.headers) {
    Object.keys(options.headers).forEach(function (headerName) {
      xhr.setRequestHeader(headerName, options.headers[headerName]);
    });
  }

  // Check for crossDomain
  if (typeof options.crossDomain === 'undefined') {
    // eslint-disable-next-line
    options.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(options.url) && RegExp.$2 !== _ssrWindow.window.location.host;
  }

  if (!options.crossDomain) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  if (options.xhrFields) {
    _utils2.default.extend(xhr, options.xhrFields);
  }

  var xhrTimeout = void 0;

  // Handle XHR
  xhr.onload = function onload() {
    if (xhrTimeout) clearTimeout(xhrTimeout);
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 0) {
      var responseData = void 0;
      if (options.dataType === 'json') {
        var parseError = void 0;
        try {
          responseData = JSON.parse(xhr.responseText);
        } catch (err) {
          parseError = true;
        }
        if (!parseError) {
          fireCallback('success', responseData, xhr.status, xhr);
        } else {
          fireCallback('error', xhr, 'parseerror');
        }
      } else {
        responseData = xhr.responseType === 'text' || xhr.responseType === '' ? xhr.responseText : xhr.response;
        fireCallback('success', responseData, xhr.status, xhr);
      }
    } else {
      fireCallback('error', xhr, xhr.status);
    }
    if (options.statusCode) {
      if (globals.statusCode && globals.statusCode[xhr.status]) globals.statusCode[xhr.status](xhr);
      if (options.statusCode[xhr.status]) options.statusCode[xhr.status](xhr);
    }
    fireCallback('complete', xhr, xhr.status);
  };

  xhr.onerror = function onerror() {
    if (xhrTimeout) clearTimeout(xhrTimeout);
    fireCallback('error', xhr, xhr.status);
    fireCallback('complete', xhr, 'error');
  };

  // Timeout
  if (options.timeout > 0) {
    xhr.onabort = function onabort() {
      if (xhrTimeout) clearTimeout(xhrTimeout);
    };
    xhrTimeout = setTimeout(function () {
      xhr.abort();
      fireCallback('error', xhr, 'timeout');
      fireCallback('complete', xhr, 'timeout');
    }, options.timeout);
  }

  // Ajax start callback
  proceedRequest = fireCallback('beforeSend', xhr, options);
  if (proceedRequest === false) return xhr;

  // Send XHR
  xhr.send(postData);

  // Return XHR object
  return xhr;
}
function RequestShortcut(method) {
  var _ref = [],
      url = _ref[0],
      data = _ref[1],
      success = _ref[2],
      error = _ref[3],
      dataType = _ref[4];

  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  if (typeof args[1] === 'function') {
    url = args[0];
    success = args[1];
    error = args[2];
    dataType = args[3];
  } else {
    url = args[0];
    data = args[1];
    success = args[2];
    error = args[3];
    dataType = args[4];
  }
  [success, error].forEach(function (callback) {
    if (typeof callback === 'string') {
      dataType = callback;
      if (callback === success) success = undefined;else error = undefined;
    }
  });
  dataType = dataType || (method === 'json' || method === 'postJSON' ? 'json' : undefined);
  var requestOptions = {
    url: url,
    method: method === 'post' || method === 'postJSON' ? 'POST' : 'GET',
    data: data,
    success: success,
    error: error,
    dataType: dataType
  };
  if (method === 'postJSON') {
    _utils2.default.extend(requestOptions, {
      contentType: 'application/json',
      processData: false,
      crossDomain: true,
      data: typeof data === 'string' ? data : JSON.stringify(data)
    });
  }
  return Request(requestOptions);
}
Request.get = function get() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return RequestShortcut.apply(undefined, ['get'].concat(args));
};
Request.post = function post() {
  for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return RequestShortcut.apply(undefined, ['post'].concat(args));
};
Request.json = function json() {
  for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
  }

  return RequestShortcut.apply(undefined, ['json'].concat(args));
};
Request.getJSON = Request.json;
Request.postJSON = function postJSON() {
  for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    args[_key6] = arguments[_key6];
  }

  return RequestShortcut.apply(undefined, ['postJSON'].concat(args));
};
Request.setup = function setup(options) {
  if (options.type && !options.method) {
    _utils2.default.extend(options, { method: options.type });
  }
  _utils2.default.extend(globals, options);
};

exports.default = Request;