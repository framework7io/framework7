'use strict';

var _typeof3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof3(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof3(obj);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var _ssrWindow = require('ssr-window');

var _bezier2 = require('./bezier');

var _bezier3 = _interopRequireDefault(_bezier2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
} /* eslint no-control-regex: "off" */

// Remove Diacritics
var defaultDiacriticsRemovalap = [{ base: 'A', letters: "A\u24B6\uFF21\xC0\xC1\xC2\u1EA6\u1EA4\u1EAA\u1EA8\xC3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\xC4\u01DE\u1EA2\xC5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F" }, { base: 'AA', letters: "\uA732" }, { base: 'AE', letters: "\xC6\u01FC\u01E2" }, { base: 'AO', letters: "\uA734" }, { base: 'AU', letters: "\uA736" }, { base: 'AV', letters: "\uA738\uA73A" }, { base: 'AY', letters: "\uA73C" }, { base: 'B', letters: "B\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181" }, { base: 'C', letters: "C\u24B8\uFF23\u0106\u0108\u010A\u010C\xC7\u1E08\u0187\u023B\uA73E" }, { base: 'D', letters: "D\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779" }, { base: 'DZ', letters: "\u01F1\u01C4" }, { base: 'Dz', letters: "\u01F2\u01C5" }, { base: 'E', letters: "E\u24BA\uFF25\xC8\xC9\xCA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\xCB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E" }, { base: 'F', letters: "F\u24BB\uFF26\u1E1E\u0191\uA77B" }, { base: 'G', letters: "G\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E" }, { base: 'H', letters: "H\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D" }, { base: 'I', letters: "I\u24BE\uFF29\xCC\xCD\xCE\u0128\u012A\u012C\u0130\xCF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197" }, { base: 'J', letters: "J\u24BF\uFF2A\u0134\u0248" }, { base: 'K', letters: "K\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2" }, { base: 'L', letters: "L\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780" }, { base: 'LJ', letters: "\u01C7" }, { base: 'Lj', letters: "\u01C8" }, { base: 'M', letters: "M\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C" }, { base: 'N', letters: "N\u24C3\uFF2E\u01F8\u0143\xD1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4" }, { base: 'NJ', letters: "\u01CA" }, { base: 'Nj', letters: "\u01CB" }, { base: 'O', letters: "O\u24C4\uFF2F\xD2\xD3\xD4\u1ED2\u1ED0\u1ED6\u1ED4\xD5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\xD6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\xD8\u01FE\u0186\u019F\uA74A\uA74C" }, { base: 'OI', letters: "\u01A2" }, { base: 'OO', letters: "\uA74E" }, { base: 'OU', letters: "\u0222" }, { base: 'OE', letters: "\x8C\u0152" }, { base: 'oe', letters: "\x9C\u0153" }, { base: 'P', letters: "P\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754" }, { base: 'Q', letters: "Q\u24C6\uFF31\uA756\uA758\u024A" }, { base: 'R', letters: "R\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782" }, { base: 'S', letters: "S\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784" }, { base: 'T', letters: "T\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786" }, { base: 'TZ', letters: "\uA728" }, { base: 'U', letters: "U\u24CA\uFF35\xD9\xDA\xDB\u0168\u1E78\u016A\u1E7A\u016C\xDC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244" }, { base: 'V', letters: "V\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245" }, { base: 'VY', letters: "\uA760" }, { base: 'W', letters: "W\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72" }, { base: 'X', letters: "X\u24CD\uFF38\u1E8A\u1E8C" }, { base: 'Y', letters: "Y\u24CE\uFF39\u1EF2\xDD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE" }, { base: 'Z', letters: "Z\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762" }, { base: 'a', letters: "a\u24D0\uFF41\u1E9A\xE0\xE1\xE2\u1EA7\u1EA5\u1EAB\u1EA9\xE3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\xE4\u01DF\u1EA3\xE5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250" }, { base: 'aa', letters: "\uA733" }, { base: 'ae', letters: "\xE6\u01FD\u01E3" }, { base: 'ao', letters: "\uA735" }, { base: 'au', letters: "\uA737" }, { base: 'av', letters: "\uA739\uA73B" }, { base: 'ay', letters: "\uA73D" }, { base: 'b', letters: "b\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253" }, { base: 'c', letters: "c\u24D2\uFF43\u0107\u0109\u010B\u010D\xE7\u1E09\u0188\u023C\uA73F\u2184" }, { base: 'd', letters: "d\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A" }, { base: 'dz', letters: "\u01F3\u01C6" }, { base: 'e', letters: "e\u24D4\uFF45\xE8\xE9\xEA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\xEB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD" }, { base: 'f', letters: "f\u24D5\uFF46\u1E1F\u0192\uA77C" }, { base: 'g', letters: "g\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F" }, { base: 'h', letters: "h\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265" }, { base: 'hv', letters: "\u0195" }, { base: 'i', letters: "i\u24D8\uFF49\xEC\xED\xEE\u0129\u012B\u012D\xEF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131" }, { base: 'j', letters: "j\u24D9\uFF4A\u0135\u01F0\u0249" }, { base: 'k', letters: "k\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3" }, { base: 'l', letters: "l\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747" }, { base: 'lj', letters: "\u01C9" }, { base: 'm', letters: "m\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F" }, { base: 'n', letters: "n\u24DD\uFF4E\u01F9\u0144\xF1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5" }, { base: 'nj', letters: "\u01CC" }, { base: 'o', letters: "o\u24DE\uFF4F\xF2\xF3\xF4\u1ED3\u1ED1\u1ED7\u1ED5\xF5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\xF6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\xF8\u01FF\u0254\uA74B\uA74D\u0275" }, { base: 'oi', letters: "\u01A3" }, { base: 'ou', letters: "\u0223" }, { base: 'oo', letters: "\uA74F" }, { base: 'p', letters: "p\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755" }, { base: 'q', letters: "q\u24E0\uFF51\u024B\uA757\uA759" }, { base: 'r', letters: "r\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783" }, { base: 's', letters: "s\u24E2\uFF53\xDF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B" }, { base: 't', letters: "t\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787" }, { base: 'tz', letters: "\uA729" }, { base: 'u', letters: "u\u24E4\uFF55\xF9\xFA\xFB\u0169\u1E79\u016B\u1E7B\u016D\xFC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289" }, { base: 'v', letters: "v\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C" }, { base: 'vy', letters: "\uA761" }, { base: 'w', letters: "w\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73" }, { base: 'x', letters: "x\u24E7\uFF58\u1E8B\u1E8D" }, { base: 'y', letters: "y\u24E8\uFF59\u1EF3\xFD\u0177\u1EF9\u0233\u1E8F\xFF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF" }, { base: 'z', letters: "z\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763" }];

var diacriticsMap = {};
for (var i = 0; i < defaultDiacriticsRemovalap.length; i += 1) {
  var letters = defaultDiacriticsRemovalap[i].letters;
  for (var j = 0; j < letters.length; j += 1) {
    diacriticsMap[letters[j]] = defaultDiacriticsRemovalap[i].base;
  }
}

var createPromise = function createPromise(handler) {
  var resolved = false;
  var rejected = false;
  var resolveArgs = void 0;
  var rejectArgs = void 0;
  var promiseHandlers = {
    then: undefined,
    catch: undefined
  };
  var promise = {
    then: function then(thenHandler) {
      if (resolved) {
        thenHandler.apply(undefined, _toConsumableArray(resolveArgs));
      } else {
        promiseHandlers.then = thenHandler;
      }
      return promise;
    },
    catch: function _catch(catchHandler) {
      if (rejected) {
        catchHandler.apply(undefined, _toConsumableArray(rejectArgs));
      } else {
        promiseHandlers.catch = catchHandler;
      }
      return promise;
    }
  };

  function resolve() {
    resolved = true;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (promiseHandlers.then) promiseHandlers.then.apply(promiseHandlers, args);else resolveArgs = args;
  }
  function reject() {
    rejected = true;

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    if (promiseHandlers.catch) promiseHandlers.catch.apply(promiseHandlers, args);else rejectArgs = args;
  }
  handler(resolve, reject);

  return promise;
};

var Utils = {
  mdPreloaderContent: '\n    <span class="preloader-inner">\n      <span class="preloader-inner-gap"></span>\n      <span class="preloader-inner-left">\n          <span class="preloader-inner-half-circle"></span>\n      </span>\n      <span class="preloader-inner-right">\n          <span class="preloader-inner-half-circle"></span>\n      </span>\n    </span>\n  '.trim(),
  eventNameToColonCase: function eventNameToColonCase(eventName) {
    var hasColon = void 0;
    return eventName.split('').map(function (char, index) {
      if (char.match(/[A-Z]/) && index !== 0 && !hasColon) {
        hasColon = true;
        return ':' + char.toLowerCase();
      }
      return char.toLowerCase();
    }).join('');
  },
  deleteProps: function deleteProps(obj) {
    var object = obj;
    Object.keys(object).forEach(function (key) {
      try {
        object[key] = null;
      } catch (e) {
        // no setter for object
      }
      try {
        delete object[key];
      } catch (e) {
        // something got wrong
      }
    });
  },
  bezier: function bezier() {
    return _bezier3.default.apply(undefined, arguments);
  },
  nextTick: function nextTick(callback) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    return setTimeout(callback, delay);
  },
  nextFrame: function nextFrame(callback) {
    return Utils.requestAnimationFrame(callback);
  },
  now: function now() {
    return Date.now();
  },
  promise: function promise(handler) {
    return _ssrWindow.window.Promise ? new Promise(handler) : createPromise(handler);
  },
  requestAnimationFrame: function requestAnimationFrame(callback) {
    if (_ssrWindow.window.requestAnimationFrame) return _ssrWindow.window.requestAnimationFrame(callback);
    if (_ssrWindow.window.webkitRequestAnimationFrame) return _ssrWindow.window.webkitRequestAnimationFrame(callback);
    return _ssrWindow.window.setTimeout(callback, 1000 / 60);
  },
  cancelAnimationFrame: function cancelAnimationFrame(id) {
    if (_ssrWindow.window.cancelAnimationFrame) return _ssrWindow.window.cancelAnimationFrame(id);
    if (_ssrWindow.window.webkitCancelAnimationFrame) return _ssrWindow.window.webkitCancelAnimationFrame(id);
    return _ssrWindow.window.clearTimeout(id);
  },
  removeDiacritics: function removeDiacritics(str) {
    return str.replace(/[^\u0000-\u007E]/g, function (a) {
      return diacriticsMap[a] || a;
    });
  },
  parseUrlQuery: function parseUrlQuery(url) {
    var query = {};
    var urlToParse = url || _ssrWindow.window.location.href;
    var i = void 0;
    var params = void 0;
    var param = void 0;
    var length = void 0;
    if (typeof urlToParse === 'string' && urlToParse.length) {
      urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
      params = urlToParse.split('&').filter(function (paramsPart) {
        return paramsPart !== '';
      });
      length = params.length;

      for (i = 0; i < length; i += 1) {
        param = params[i].replace(/#\S+/g, '').split('=');
        query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
      }
    }
    return query;
  },
  getTranslate: function getTranslate(el) {
    var axis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'x';

    var matrix = void 0;
    var curTransform = void 0;
    var transformMatrix = void 0;

    var curStyle = _ssrWindow.window.getComputedStyle(el, null);

    if (_ssrWindow.window.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(',').length > 6) {
        curTransform = curTransform.split(', ').map(function (a) {
          return a.replace(',', '.');
        }).join(', ');
      }
      // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case
      transformMatrix = new _ssrWindow.window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
    } else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
      matrix = transformMatrix.toString().split(',');
    }

    if (axis === 'x') {
      // Latest Chrome and webkits Fix
      if (_ssrWindow.window.WebKitCSSMatrix) curTransform = transformMatrix.m41;
      // Crazy IE10 Matrix
      else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
        // Normal Browsers
        else curTransform = parseFloat(matrix[4]);
    }
    if (axis === 'y') {
      // Latest Chrome and webkits Fix
      if (_ssrWindow.window.WebKitCSSMatrix) curTransform = transformMatrix.m42;
      // Crazy IE10 Matrix
      else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
        // Normal Browsers
        else curTransform = parseFloat(matrix[5]);
    }
    return curTransform || 0;
  },
  serializeObject: function serializeObject(obj) {
    var parents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (typeof obj === 'string') return obj;
    var resultArray = [];
    var separator = '&';
    var newParents = void 0;
    function varName(name) {
      if (parents.length > 0) {
        var parentParts = '';
        for (var _j = 0; _j < parents.length; _j += 1) {
          if (_j === 0) parentParts += parents[_j];else parentParts += '[' + encodeURIComponent(parents[_j]) + ']';
        }
        return parentParts + '[' + encodeURIComponent(name) + ']';
      }
      return encodeURIComponent(name);
    }
    function varValue(value) {
      return encodeURIComponent(value);
    }
    Object.keys(obj).forEach(function (prop) {
      var toPush = void 0;
      if (Array.isArray(obj[prop])) {
        toPush = [];
        for (var _i = 0; _i < obj[prop].length; _i += 1) {
          if (!Array.isArray(obj[prop][_i]) && _typeof(obj[prop][_i]) === 'object') {
            newParents = parents.slice();
            newParents.push(prop);
            newParents.push(String(_i));
            toPush.push(Utils.serializeObject(obj[prop][_i], newParents));
          } else {
            toPush.push(varName(prop) + '[]=' + varValue(obj[prop][_i]));
          }
        }
        if (toPush.length > 0) resultArray.push(toPush.join(separator));
      } else if (obj[prop] === null || obj[prop] === '') {
        resultArray.push(varName(prop) + '=');
      } else if (_typeof(obj[prop]) === 'object') {
        // Object, convert to named array
        newParents = parents.slice();
        newParents.push(prop);
        toPush = Utils.serializeObject(obj[prop], newParents);
        if (toPush !== '') resultArray.push(toPush);
      } else if (typeof obj[prop] !== 'undefined' && obj[prop] !== '') {
        // Should be string or plain value
        resultArray.push(varName(prop) + '=' + varValue(obj[prop]));
      } else if (obj[prop] === '') resultArray.push(varName(prop));
    });
    return resultArray.join(separator);
  },
  isObject: function isObject(o) {
    return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && o !== null && o.constructor && o.constructor === Object;
  },
  merge: function merge() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var to = args[0];
    args.splice(0, 1);
    var from = args;

    for (var _i2 = 0; _i2 < from.length; _i2 += 1) {
      var nextSource = args[_i2];
      if (nextSource !== undefined && nextSource !== null) {
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  },
  extend: function extend() {
    var deep = true;
    var to = void 0;
    var from = void 0;

    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    if (typeof args[0] === 'boolean') {
      deep = args[0];
      to = args[1];
      args.splice(0, 2);
      from = args;
    } else {
      to = args[0];
      args.splice(0, 1);
      from = args;
    }
    for (var _i3 = 0; _i3 < from.length; _i3 += 1) {
      var nextSource = args[_i3];
      if (nextSource !== undefined && nextSource !== null) {
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            if (!deep) {
              to[nextKey] = nextSource[nextKey];
            } else if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
              to[nextKey] = {};
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  }
};
exports.default = Utils;