/* eslint-disable max-classes-per-file */
import { getWindow, getDocument } from 'ssr-window';
import { extend, serializeObject } from './utils';

const globals = {};
let jsonpRequests = 0;

class RequestResponse {
  constructor(obj) {
    Object.assign(this, obj);
  }
}

class RequestError extends Error {
  constructor(obj) {
    super();
    Object.assign(this, obj);
  }
}

const request = (requestOptions) =>
  new Promise((resolve, reject) => {
    const window = getWindow();
    const document = getDocument();
    const globalsNoCallbacks = extend({}, globals);
    'beforeCreate beforeOpen beforeSend error complete success statusCode'
      .split(' ')
      .forEach((callbackName) => {
        delete globalsNoCallbacks[callbackName];
      });
    const defaults = extend(
      {
        url: window.location.toString(),
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
        timeout: 0,
      },
      globalsNoCallbacks,
    );

    let proceedRequest;

    const options = extend({}, defaults, requestOptions);
    if (requestOptions.abortController) {
      options.abortController = requestOptions.abortController;
    }

    if (options.abortController && options.abortController.canceled) {
      reject(new RequestError({ options, status: 'canceled', message: 'canceled' }));
      return;
    }

    // Function to run XHR callbacks and events
    function fireCallback(callbackName, ...data) {
      /*
      Callbacks:
      beforeCreate (options),
      beforeOpen (xhr, options),
      beforeSend (xhr, options),
      error (xhr, status, message),
      complete (xhr, status),
      success (response, status, xhr),
      statusCode ()
    */
      let globalCallbackValue;
      let optionCallbackValue;
      if (globals[callbackName]) {
        globalCallbackValue = globals[callbackName](...data);
      }
      if (options[callbackName]) {
        optionCallbackValue = options[callbackName](...data);
      }
      if (typeof globalCallbackValue !== 'boolean') globalCallbackValue = true;
      if (typeof optionCallbackValue !== 'boolean') optionCallbackValue = true;
      if (
        options.abortController &&
        options.abortController.canceled &&
        (callbackName === 'beforeCreate' ||
          callbackName === 'beforeOpen' ||
          callbackName === 'beforeSend')
      ) {
        return false;
      }
      return globalCallbackValue && optionCallbackValue;
    }

    // Before create callback
    proceedRequest = fireCallback('beforeCreate', options);
    if (proceedRequest === false) {
      reject(new RequestError({ options, status: 'canceled', message: 'canceled' }));
      return;
    }

    // For jQuery guys
    if (options.type) options.method = options.type;

    // Parameters Prefix
    let paramsPrefix = options.url.indexOf('?') >= 0 ? '&' : '?';

    // UC method
    const method = options.method.toUpperCase();

    // Data to modify GET URL
    if (
      (method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'DELETE') &&
      options.data
    ) {
      let stringData;
      if (typeof options.data === 'string') {
        // Should be key=value string
        if (options.data.indexOf('?') >= 0) stringData = options.data.split('?')[1];
        else stringData = options.data;
      } else {
        // Should be key=value object
        stringData = serializeObject(options.data);
      }
      if (stringData.length) {
        options.url += paramsPrefix + stringData;
        if (paramsPrefix === '?') paramsPrefix = '&';
      }
    }

    // JSONP
    if (options.dataType === 'json' && options.url.indexOf('callback=') >= 0) {
      const callbackName = `f7jsonp_${Date.now() + (jsonpRequests += 1)}`;
      let abortTimeout;
      const callbackSplit = options.url.split('callback=');
      let requestUrl = `${callbackSplit[0]}callback=${callbackName}`;
      if (callbackSplit[1].indexOf('&') >= 0) {
        const addVars = callbackSplit[1]
          .split('&')
          .filter((el) => el.indexOf('=') > 0)
          .join('&');
        if (addVars.length > 0) requestUrl += `&${addVars}`;
      }

      // Create script
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.onerror = function onerror() {
        clearTimeout(abortTimeout);
        fireCallback('error', null, 'scripterror', 'scripterror');
        reject(new RequestError({ options, status: 'scripterror', message: 'scripterror' }));
        fireCallback('complete', null, 'scripterror');
      };
      script.src = requestUrl;

      // Handler
      window[callbackName] = function jsonpCallback(data) {
        clearTimeout(abortTimeout);
        fireCallback('success', data);
        script.parentNode.removeChild(script);
        script = null;
        delete window[callbackName];
        resolve(new RequestResponse({ options, data }));
      };
      document.querySelector('head').appendChild(script);

      if (options.timeout > 0) {
        abortTimeout = setTimeout(() => {
          script.parentNode.removeChild(script);
          script = null;
          fireCallback('error', null, 'timeout', 'timeout');
          reject(new RequestError({ options, status: 'timeout', message: 'timeout' }));
        }, options.timeout);
      }

      return;
    }

    // Cache for GET/HEAD requests
    if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'DELETE') {
      if (options.cache === false) {
        options.url += `${paramsPrefix}_nocache${Date.now()}`;
      }
    }

    // Create XHR
    const xhr = new XMLHttpRequest();

    if (options.abortController) {
      let aborted = false;
      options.abortController.onAbort = () => {
        if (aborted) return;
        aborted = true;
        xhr.abort();
        reject(new RequestError({ options, xhr, status: 'canceled', message: 'canceled' }));
      };
    }

    // Save Request URL
    xhr.requestUrl = options.url;
    xhr.requestParameters = options;

    // Before open callback
    proceedRequest = fireCallback('beforeOpen', xhr, options);
    if (proceedRequest === false) {
      reject(new RequestError({ options, xhr, status: 'canceled', message: 'canceled' }));
      return;
    }

    // Open XHR
    xhr.open(method, options.url, options.async, options.user, options.password);

    // Create POST Data
    let postData = null;

    if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && options.data) {
      if (options.processData) {
        const postDataInstances = [ArrayBuffer, Blob, Document, FormData];
        // Post Data
        if (postDataInstances.indexOf(options.data.constructor) >= 0) {
          postData = options.data;
        } else {
          // POST Headers
          const boundary = `---------------------------${Date.now().toString(16)}`;

          if (options.contentType === 'multipart/form-data') {
            xhr.setRequestHeader('Content-Type', `multipart/form-data; boundary=${boundary}`);
          } else {
            xhr.setRequestHeader('Content-Type', options.contentType);
          }
          postData = '';
          let data = serializeObject(options.data);
          if (options.contentType === 'multipart/form-data') {
            data = data.split('&');
            const newData = [];
            for (let i = 0; i < data.length; i += 1) {
              newData.push(
                `Content-Disposition: form-data; name="${data[i].split('=')[0]}"\r\n\r\n${
                  data[i].split('=')[1]
                }\r\n`,
              );
            }
            postData = `--${boundary}\r\n${newData.join(`--${boundary}\r\n`)}--${boundary}--\r\n`;
          } else if (options.contentType === 'application/json') {
            postData = JSON.stringify(options.data);
          } else {
            postData = data;
          }
        }
      } else {
        postData = options.data;
        xhr.setRequestHeader('Content-Type', options.contentType);
      }
    }
    if (options.dataType === 'json' && (!options.headers || !options.headers.Accept)) {
      xhr.setRequestHeader('Accept', 'application/json');
    }

    // Additional headers
    if (options.headers) {
      Object.keys(options.headers).forEach((headerName) => {
        if (typeof options.headers[headerName] === 'undefined') return;
        xhr.setRequestHeader(headerName, options.headers[headerName]);
      });
    }

    // Check for crossDomain
    if (typeof options.crossDomain === 'undefined') {
      options.crossDomain =
        // eslint-disable-next-line
        /^([\w-]+:)?\/\/([^\/]+)/.test(options.url) && RegExp.$2 !== window.location.host;
    }

    if (!options.crossDomain) {
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }

    if (options.xhrFields) {
      extend(xhr, options.xhrFields);
    }

    // Handle XHR
    xhr.onload = function onload() {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
        let responseData;
        if (options.dataType === 'json') {
          let parseError;
          try {
            responseData = JSON.parse(xhr.responseText);
          } catch (err) {
            parseError = true;
          }
          if (!parseError) {
            fireCallback('success', responseData, xhr.status, xhr);
            resolve(new RequestResponse({ options, data: responseData, status: xhr.status, xhr }));
          } else {
            fireCallback('error', xhr, 'parseerror', 'parseerror');
            reject(new RequestError({ options, xhr, status: 'parseerror', message: 'parseerror' }));
          }
        } else {
          responseData =
            xhr.responseType === 'text' || xhr.responseType === ''
              ? xhr.responseText
              : xhr.response;
          fireCallback('success', responseData, xhr.status, xhr);
          resolve(new RequestResponse({ options, data: responseData, status: xhr.status, xhr }));
        }
      } else {
        fireCallback('error', xhr, xhr.status, xhr.statusText);
        reject(new RequestError({ options, xhr, status: xhr.status, message: xhr.statusText }));
      }
      if (options.statusCode) {
        if (globals.statusCode && globals.statusCode[xhr.status])
          globals.statusCode[xhr.status](xhr);
        if (options.statusCode[xhr.status]) options.statusCode[xhr.status](xhr);
      }
      fireCallback('complete', xhr, xhr.status);
    };

    xhr.onerror = function onerror() {
      fireCallback('error', xhr, xhr.status, xhr.status);
      reject(new RequestError({ options, xhr, status: xhr.status, message: xhr.statusText }));
      fireCallback('complete', xhr, 'error');
    };

    // Timeout
    if (options.timeout > 0) {
      xhr.timeout = options.timeout;
      xhr.ontimeout = () => {
        fireCallback('error', xhr, 'timeout', 'timeout');
        reject(new RequestError({ options, xhr, status: 'timeout', message: 'timeout' }));
        fireCallback('complete', xhr, 'timeout');
      };
    }

    // Ajax start callback
    proceedRequest = fireCallback('beforeSend', xhr, options);
    if (proceedRequest === false) {
      reject(new RequestError({ options, xhr, status: 'canceled', message: 'canceled' }));
      return;
    }

    // Send XHR
    xhr.send(postData);
  });

function requestShortcut(method, ...args) {
  let [url, data, success, error, dataType] = [];
  if (typeof args[1] === 'function') {
    [url, success, error, dataType] = args;
  } else {
    [url, data, success, error, dataType] = args;
  }
  [success, error].forEach((callback) => {
    if (typeof callback === 'string') {
      dataType = callback;
      if (callback === success) success = undefined;
      else error = undefined;
    }
  });
  dataType = dataType || (method === 'json' || method === 'postJSON' ? 'json' : undefined);
  const requestOptions = {
    url,
    method: method === 'post' || method === 'postJSON' ? 'POST' : 'GET',
    data,
    success,
    error,
    dataType,
  };
  if (method === 'postJSON') {
    extend(requestOptions, {
      contentType: 'application/json',
      processData: false,
      crossDomain: true,
      data: typeof data === 'string' ? data : JSON.stringify(data),
    });
  }
  return request(requestOptions);
}

Object.assign(request, {
  get: (...args) => requestShortcut('get', ...args),
  post: (...args) => requestShortcut('post', ...args),
  json: (...args) => requestShortcut('json', ...args),
  getJSON: (...args) => requestShortcut('json', ...args),
  postJSON: (...args) => requestShortcut('postJSON', ...args),
});

request.abortController = () => {
  const contoller = {
    canceled: false,
    onAbort: null,
    abort() {
      contoller.canceled = true;
      if (contoller.onAbort) contoller.onAbort();
    },
  };
  return contoller;
};

request.setup = function setup(options) {
  if (options.type && !options.method) {
    extend(options, { method: options.type });
  }
  extend(globals, options);
};

export default request;
