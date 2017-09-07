window.Dom7 = (function () {
'use strict';

var Dom7 = function Dom7(arr) {
  var self = this;
  // Create array-like object
  for (var i = 0; i < arr.length; i += 1) {
    self[i] = arr[i];
  }
  self.length = arr.length;
  // Return collection with methods
  return this;
};

function $$1(selector, context) {
  var arr = [];
  var i = 0;
  if (selector && !context) {
    if (selector instanceof Dom7) {
      return selector;
    }
  }
  if (selector) {
      // String
    if (typeof selector === 'string') {
      var els;
      var tempParent;
      var html = selector.trim();
      if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
        var toCreate = 'div';
        if (html.indexOf('<li') === 0) { toCreate = 'ul'; }
        if (html.indexOf('<tr') === 0) { toCreate = 'tbody'; }
        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) { toCreate = 'tr'; }
        if (html.indexOf('<tbody') === 0) { toCreate = 'table'; }
        if (html.indexOf('<option') === 0) { toCreate = 'select'; }
        tempParent = document.createElement(toCreate);
        tempParent.innerHTML = html;
        for (i = 0; i < tempParent.childNodes.length; i += 1) {
          arr.push(tempParent.childNodes[i]);
        }
      } else {
        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
          // Pure ID selector
          els = [document.getElementById(selector.trim().split('#')[1])];
        } else {
          // Other selectors
          els = (context || document).querySelectorAll(selector.trim());
        }
        for (i = 0; i < els.length; i += 1) {
          if (els[i]) { arr.push(els[i]); }
        }
      }
    } else if (selector.nodeType || selector === window || selector === document) {
      // Node/element
      arr.push(selector);
    } else if (selector.length > 0 && selector[0].nodeType) {
      // Array of elements or instance of Dom
      for (i = 0; i < selector.length; i += 1) {
        arr.push(selector[i]);
      }
    }
  }
  return new Dom7(arr);
}

$$1.fn = Dom7.prototype;
$$1.Class = Dom7;

$$1.use = function use() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  args.forEach(function (methods) {
    var isUtils = '__utils' in methods;
    Object.keys(methods).forEach(function (methodName) {
      if (methodName === '__utils') { return; }
      if (isUtils) {
        $$1[methodName] = methods[methodName];
      } else {
        $$1.fn[methodName] = methods[methodName];
      }
    });
  });
};

// Remove Diacritics
var defaultDiacriticsRemovalap = [
  { base: 'A', letters: '\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F' },
  { base: 'AA', letters: '\uA732' },
  { base: 'AE', letters: '\u00C6\u01FC\u01E2' },
  { base: 'AO', letters: '\uA734' },
  { base: 'AU', letters: '\uA736' },
  { base: 'AV', letters: '\uA738\uA73A' },
  { base: 'AY', letters: '\uA73C' },
  { base: 'B', letters: '\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181' },
  { base: 'C', letters: '\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E' },
  { base: 'D', letters: '\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779' },
  { base: 'DZ', letters: '\u01F1\u01C4' },
  { base: 'Dz', letters: '\u01F2\u01C5' },
  { base: 'E', letters: '\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E' },
  { base: 'F', letters: '\u0046\u24BB\uFF26\u1E1E\u0191\uA77B' },
  { base: 'G', letters: '\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E' },
  { base: 'H', letters: '\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D' },
  { base: 'I', letters: '\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197' },
  { base: 'J', letters: '\u004A\u24BF\uFF2A\u0134\u0248' },
  { base: 'K', letters: '\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2' },
  { base: 'L', letters: '\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780' },
  { base: 'LJ', letters: '\u01C7' },
  { base: 'Lj', letters: '\u01C8' },
  { base: 'M', letters: '\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C' },
  { base: 'N', letters: '\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4' },
  { base: 'NJ', letters: '\u01CA' },
  { base: 'Nj', letters: '\u01CB' },
  { base: 'O', letters: '\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C' },
  { base: 'OI', letters: '\u01A2' },
  { base: 'OO', letters: '\uA74E' },
  { base: 'OU', letters: '\u0222' },
  { base: 'OE', letters: '\u008C\u0152' },
  { base: 'oe', letters: '\u009C\u0153' },
  { base: 'P', letters: '\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754' },
  { base: 'Q', letters: '\u0051\u24C6\uFF31\uA756\uA758\u024A' },
  { base: 'R', letters: '\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782' },
  { base: 'S', letters: '\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784' },
  { base: 'T', letters: '\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786' },
  { base: 'TZ', letters: '\uA728' },
  { base: 'U', letters: '\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244' },
  { base: 'V', letters: '\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245' },
  { base: 'VY', letters: '\uA760' },
  { base: 'W', letters: '\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72' },
  { base: 'X', letters: '\u0058\u24CD\uFF38\u1E8A\u1E8C' },
  { base: 'Y', letters: '\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE' },
  { base: 'Z', letters: '\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762' },
  { base: 'a', letters: '\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250' },
  { base: 'aa', letters: '\uA733' },
  { base: 'ae', letters: '\u00E6\u01FD\u01E3' },
  { base: 'ao', letters: '\uA735' },
  { base: 'au', letters: '\uA737' },
  { base: 'av', letters: '\uA739\uA73B' },
  { base: 'ay', letters: '\uA73D' },
  { base: 'b', letters: '\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253' },
  { base: 'c', letters: '\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184' },
  { base: 'd', letters: '\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A' },
  { base: 'dz', letters: '\u01F3\u01C6' },
  { base: 'e', letters: '\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD' },
  { base: 'f', letters: '\u0066\u24D5\uFF46\u1E1F\u0192\uA77C' },
  { base: 'g', letters: '\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F' },
  { base: 'h', letters: '\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265' },
  { base: 'hv', letters: '\u0195' },
  { base: 'i', letters: '\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131' },
  { base: 'j', letters: '\u006A\u24D9\uFF4A\u0135\u01F0\u0249' },
  { base: 'k', letters: '\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3' },
  { base: 'l', letters: '\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747' },
  { base: 'lj', letters: '\u01C9' },
  { base: 'm', letters: '\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F' },
  { base: 'n', letters: '\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5' },
  { base: 'nj', letters: '\u01CC' },
  { base: 'o', letters: '\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275' },
  { base: 'oi', letters: '\u01A3' },
  { base: 'ou', letters: '\u0223' },
  { base: 'oo', letters: '\uA74F' },
  { base: 'p', letters: '\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755' },
  { base: 'q', letters: '\u0071\u24E0\uFF51\u024B\uA757\uA759' },
  { base: 'r', letters: '\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783' },
  { base: 's', letters: '\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B' },
  { base: 't', letters: '\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787' },
  { base: 'tz', letters: '\uA729' },
  { base: 'u', letters: '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289' },
  { base: 'v', letters: '\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C' },
  { base: 'vy', letters: '\uA761' },
  { base: 'w', letters: '\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73' },
  { base: 'x', letters: '\u0078\u24E7\uFF58\u1E8B\u1E8D' },
  { base: 'y', letters: '\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF' },
  { base: 'z', letters: '\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763' } ];

var diacriticsMap = {};
for (var i = 0; i < defaultDiacriticsRemovalap.length; i += 1) {
  var letters = defaultDiacriticsRemovalap[i].letters;
  for (var j = 0; j < letters.length; j += 1) {
    diacriticsMap[letters[j]] = defaultDiacriticsRemovalap[i].base;
  }
}

function parseUrlQuery(url) {
  var query = {};
  var urlToParse = url || window.location.href;
  var i;
  var params;
  var param;
  var length;
  if (typeof urlToParse === 'string' && urlToParse.length) {
    urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
    params = urlToParse.split('&').filter(function (paramsPart) { return paramsPart !== ''; });
    length = params.length;

    for (i = 0; i < length; i += 1) {
      param = params[i].replace(/#\S+/g, '').split('=');
      query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
    }
  }
  return query;
}
function isArray(arr) {
  return Array.isArray(arr);
}
function each(obj, callback) {
  // Check it's iterable
  // TODO: Should probably raise a value error here
  if (typeof obj !== 'object') { return; }
  // Don't bother continuing without a callback
  if (!callback) { return; }
  if (Array.isArray(obj) || obj instanceof Dom7) {
    // Array
    for (var i = 0; i < obj.length; i += 1) {
      // If callback returns false
      if (callback(i, obj[i]) === false) {
        // Break out of the loop
        return;
      }
    }
  } else {
    // Object
    for (var prop in obj) {
      // Check the propertie belongs to the object
      // not it's prototype
      if (obj.hasOwnProperty(prop)) {
        // If the callback returns false
        if (callback(prop, obj[prop]) === false) {
          // Break out of the loop;
          return;
        }
      }
    }
  }
}
function unique(arr) {
  var uniqueArray = [];
  for (var i = 0; i < arr.length; i += 1) {
    if (uniqueArray.indexOf(arr[i]) === -1) { uniqueArray.push(arr[i]); }
  }
  return uniqueArray;
}
function serializeObject(obj, parents) {
  if ( parents === void 0 ) parents = [];

  if (typeof obj === 'string') { return obj; }
  var resultArray = [];
  var separator = '&';
  var newParents;
  function varName(name) {
    if (parents.length > 0) {
      var parentParts = '';
      for (var j = 0; j < parents.length; j += 1) {
        if (j === 0) { parentParts += parents[j]; }
        else { parentParts += "[" + (encodeURIComponent(parents[j])) + "]"; }
      }
      return (parentParts + "[" + (encodeURIComponent(name)) + "]");
    }
    return encodeURIComponent(name);
  }
  function varValue(value) {
    return encodeURIComponent(value);
  }
  Object.keys(obj).forEach(function (prop) {
    var toPush;
    if (Array.isArray(obj[prop])) {
      toPush = [];
      for (var i = 0; i < obj[prop].length; i += 1) {
        if (!Array.isArray(obj[prop][i]) && typeof obj[prop][i] === 'object') {
          newParents = parents.slice();
          newParents.push(prop);
          newParents.push(String(i));
          toPush.push(serializeObject(obj[prop][i], newParents));
        } else {
          toPush.push(((varName(prop)) + "[]=" + (varValue(obj[prop][i]))));
        }
      }
      if (toPush.length > 0) { resultArray.push(toPush.join(separator)); }
    } else if (obj[prop] === null || obj[prop] === '') {
      resultArray.push(((varName(prop)) + "="));
    } else if (typeof obj[prop] === 'object') {
      // Object, convert to named array
      newParents = parents.slice();
      newParents.push(prop);
      toPush = serializeObject(obj[prop], newParents);
      if (toPush !== '') { resultArray.push(toPush); }
    } else if (typeof obj[prop] !== 'undefined' && obj[prop] !== '') {
      // Should be string or plain value
      resultArray.push(((varName(prop)) + "=" + (varValue(obj[prop]))));
    } else if (obj[prop] === '') { resultArray.push(varName(prop)); }
  });
  return resultArray.join(separator);
}
function toCamelCase(string) {
  return string.toLowerCase().replace(/-(.)/g, function (match, group1) { return group1.toUpperCase(); });
}
function dataset(el) {
  return $$1(el).dataset();
}
function requestAnimationFrame(callback) {
  if (window.requestAnimationFrame) { return window.requestAnimationFrame(callback); }
  else if (window.webkitRequestAnimationFrame) { return window.webkitRequestAnimationFrame(callback); }
  return window.setTimeout(callback, 1000 / 60);
}
function cancelAnimationFrame(id) {
  if (window.cancelAnimationFrame) { return window.cancelAnimationFrame(id); }
  else if (window.webkitCancelAnimationFrame) { return window.webkitCancelAnimationFrame(id); }
  return window.clearTimeout(id);
}
function isObject(o) {
  return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
}
function extend() {
  var args = [], len$1 = arguments.length;
  while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];

  var to = Object(args[0]);
  for (var i = 1; i < args.length; i += 1) {
    var nextSource = args[i];
    if (nextSource !== undefined && nextSource !== null) {
      var keysArray = Object.keys(Object(nextSource));
      for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        var nextKey = keysArray[nextIndex];
        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            extend(to[nextKey], nextSource[nextKey]);
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};
            extend(to[nextKey], nextSource[nextKey]);
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}
var Utils = {
  __utils: true,
  parseUrlQuery: parseUrlQuery,
  parseQuery: parseUrlQuery,
  isArray: isArray,
  each: each,
  unique: unique,
  serializeObject: serializeObject,
  param: serializeObject,
  toCamelCase: toCamelCase,
  dataset: dataset,
  requestAnimationFrame: requestAnimationFrame,
  cancelAnimationFrame: cancelAnimationFrame,
  extend: extend,
  removeDiacritics: function removeDiacritics(str) {
    return str.replace(/[^\u0000-\u007E]/g, function (a) { return diacriticsMap[a] || a; });
  },
  getTranslate: function getTranslate(el, axis) {
    if ( axis === void 0 ) axis = 'x';

    var curStyle = window.getComputedStyle(el, null);
    var matrix;
    var curTransform;
    var transformMatrix;

    if (window.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(',').length > 6) {
        curTransform = curTransform.split(', ').map(function map(a) {
          return a.replace(',', '.');
        }).join(', ');
      }
      // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case
      transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
    } else {
      transformMatrix = curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
      matrix = transformMatrix.toString().split(',');
    }

    if (axis === 'x') {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix) { curTransform = transformMatrix.m41; }
      // Crazy IE10 Matrix
      else if (matrix.length === 16) { curTransform = parseFloat(matrix[12]); }
      // Normal Browsers
      else { curTransform = parseFloat(matrix[4]); }
    }
    if (axis === 'y') {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix) { curTransform = transformMatrix.m42; }
      // Crazy IE10 Matrix
      else if (matrix.length === 16) { curTransform = parseFloat(matrix[13]); }
      // Normal Browsers
      else { curTransform = parseFloat(matrix[5]); }
    }

    return curTransform || 0;
  },
};

var Methods = {
  // Classes and attributes
  addClass: function addClass(className) {
    var this$1 = this;

    if (typeof className === 'undefined') {
      return this;
    }
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.add(classes[i]); }
      }
    }
    return this;
  },
  removeClass: function removeClass(className) {
    var this$1 = this;

    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.remove(classes[i]); }
      }
    }
    return this;
  },
  hasClass: function hasClass(className) {
    if (!this[0]) { return false; }
    return this[0].classList.contains(className);
  },
  toggleClass: function toggleClass(className) {
    var this$1 = this;

    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.toggle(classes[i]); }
      }
    }
    return this;
  },
  attr: function attr(attrs, value) {
    var arguments$1 = arguments;
    var this$1 = this;

    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) { return this[0].getAttribute(attrs); }
      return undefined;
    }

    // Set attrs
    for (var i = 0; i < this.length; i += 1) {
      if (arguments$1.length === 2) {
        // String
        this$1[i].setAttribute(attrs, value);
      } else {
        // Object
        for (var attrName in attrs) {
          this$1[i][attrName] = attrs[attrName];
          this$1[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }
    return this;
  },
  removeAttr: function removeAttr(attr) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].removeAttribute(attr);
    }
    return this;
  },
  prop: function prop(props, value) {
    var arguments$1 = arguments;
    var this$1 = this;

    if (arguments.length === 1 && typeof props === 'string') {
      // Get prop
      if (this[0]) { return this[0][props]; }
    } else {
      // Set props
      for (var i = 0; i < this.length; i += 1) {
        if (arguments$1.length === 2) {
          // String
          this$1[i][props] = value;
        } else {
          // Object
          for (var propName in props) {
            this$1[i][propName] = props[propName];
          }
        }
      }
      return this;
    }
  },
  data: function data(key, value) {
    var this$1 = this;

    var el;
    if (typeof value === 'undefined') {
      el = this[0];
      // Get value
      if (el) {
        if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
          return el.dom7ElementDataStorage[key];
        }

        var dataKey = el.getAttribute(("data-" + key));
        if (dataKey) {
          return dataKey;
        }
        return undefined;
      }
      return undefined;
    }

    // Set value
    for (var i = 0; i < this.length; i += 1) {
      el = this$1[i];
      if (!el.dom7ElementDataStorage) { el.dom7ElementDataStorage = {}; }
      el.dom7ElementDataStorage[key] = value;
    }
    return this;
  },
  removeData: function removeData(key) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      var el = this$1[i];
      if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
        el.dom7ElementDataStorage[key] = null;
        delete el.dom7ElementDataStorage[key];
      }
    }
  },
  dataset: function dataset$$1() {
    var el = this[0];
    if (!el) { return undefined; }
    var dataset$$1 = {};
    if (el.dataset) {
      for (var dataKey in el.dataset) {
        dataset$$1[dataKey] = el.dataset[dataKey];
      }
    } else {
      for (var i = 0; i < el.attributes.length; i += 1) {
        var attr = el.attributes[i];
        if (attr.name.indexOf('data-') >= 0) {
          dataset$$1[toCamelCase(attr.name.split('data-')[1])] = attr.value;
        }
      }
    }
    for (var key in dataset$$1) {
      if (dataset$$1[key] === 'false') { dataset$$1[key] = false; }
      else if (dataset$$1[key] === 'true') { dataset$$1[key] = true; }
      else if (parseFloat(dataset$$1[key]) === dataset$$1[key] * 1) { dataset$$1[key] *= 1; }
    }
    return dataset$$1;
  },
  val: function val(value) {
    var this$1 = this;

    if (typeof value === 'undefined') {
      if (this[0]) {
        if (this[0].multiple && this[0].nodeName.toLowerCase() === 'select') {
          var values = [];
          for (var i = 0; i < this[0].selectedOptions.length; i += 1) {
            values.push(this$1[0].selectedOptions[i].value);
          }
          return values;
        }
        return this[0].value;
      }
      return undefined;
    }

    for (var i$1 = 0; i$1 < this.length; i$1 += 1) {
      this$1[i$1].value = value;
    }
    return this;
  },
  // Transforms
  transform: function transform(transform$1) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this$1[i].style;
      elStyle.webkitTransform = transform$1;
      elStyle.transform = transform$1;
    }
    return this;
  },
  transition: function transition(duration) {
    var this$1 = this;

    if (typeof duration !== 'string') {
      duration = duration + "ms";
    }
    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this$1[i].style;
      elStyle.webkitTransitionDuration = duration;
      elStyle.transitionDuration = duration;
    }
    return this;
  },
  // Events
  on: function on() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var eventType = args[0];
    var targetSelector;
    var listener;
    var capture = false;
    if (typeof args[1] === 'function') {
      targetSelector = false;
      listener = args[1];
      capture = args[2];
    } else {
      targetSelector = args[1];
      listener = args[2];
      capture = args[3];
    }
    function handleLiveEvent(e) {
      var target = e.target;
      if (!target) { return; }
      var eventData = e.target.dom7EventData || [];
      eventData.unshift(e);
      if ($$1(target).is(targetSelector)) { listener.apply(target, eventData); }
      else {
        var parents = $$1(target).parents();
        for (var k = 0; k < parents.length; k += 1) {
          if ($$1(parents[k]).is(targetSelector)) { listener.apply(parents[k], eventData); }
        }
      }
    }
    function handleEvent(e) {
      var eventData = e && e.target ? e.target.dom7EventData || [] : [];
      eventData.unshift(e);
      listener.apply(this, eventData);
    }
    var events = eventType.split(' ');
    var j;
    for (var i = 0; i < this.length; i += 1) {
      var el = this$1[i];
      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          if (!el.dom7Listeners) { el.dom7Listeners = []; }
          el.dom7Listeners.push({
            type: eventType,
            listener: listener,
            proxyListener: handleEvent,
          });
          el.addEventListener(events[j], handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          if (!el.dom7LiveListeners) { el.dom7LiveListeners = []; }
          el.dom7LiveListeners.push({
            type: eventType,
            listener: listener,
            proxyListener: handleLiveEvent,
          });
          el.addEventListener(events[j], handleLiveEvent, capture);
        }
      }
    }
    return this;
  },
  off: function off() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var eventType = args[0];
    var targetSelector;
    var listener;
    var capture = false;
    if (typeof args[1] === 'function') {
      targetSelector = false;
      listener = args[1];
      capture = args[2];
    } else {
      targetSelector = args[1];
      listener = args[2];
      capture = args[3];
    }
    var events = eventType.split(' ');
    for (var i = 0; i < events.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        var el = this$1[j];
        if (!targetSelector) {
          if (el.dom7Listeners) {
            for (var k = 0; k < el.dom7Listeners.length; k += 1) {
              if (listener) {
                if (el.dom7Listeners[k].listener === listener) {
                  el.removeEventListener(events[i], el.dom7Listeners[k].proxyListener, capture);
                }
              } else if (el.dom7Listeners[k].type === events[i]) {
                el.removeEventListener(events[i], el.dom7Listeners[k].proxyListener, capture);
              }
            }
          }
        } else if (el.dom7LiveListeners) {
          for (var k$1 = 0; k$1 < el.dom7LiveListeners.length; k$1 += 1) {
            if (listener) {
              if (el.dom7LiveListeners[k$1].listener === listener) {
                el.removeEventListener(events[i], el.dom7LiveListeners[k$1].proxyListener, capture);
              }
            } else if (el.dom7LiveListeners[k$1].type === events[i]) {
              el.removeEventListener(events[i], el.dom7LiveListeners[k$1].proxyListener, capture);
            }
          }
        }
      }
    }
    return this;
  },
  once: function once(eventName, targetSelector, listener, capture) {
    var dom = this;
    if (typeof targetSelector === 'function') {
      listener = arguments[1];
      capture = arguments[2];
      targetSelector = false;
    }
    function proxy(e) {
      var eventData = e.target.dom7EventData || [];
      listener.apply(this, eventData);
      dom.off(eventName, targetSelector, proxy, capture);
    }
    return dom.on(eventName, targetSelector, proxy, capture);
  },
  trigger: function trigger() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var events = args[0].split(' ');
    var eventData = args[1];
    for (var i = 0; i < events.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        var evt = (void 0);
        try {
          evt = new window.CustomEvent(events[i], { detail: eventData, bubbles: true, cancelable: true });
        } catch (e) {
          evt = document.createEvent('Event');
          evt.initEvent(events[i], true, true);
          evt.detail = eventData;
        }
        this$1[j].dom7EventData = args.filter(function (data, dataIndex) { return dataIndex > 0; });
        this$1[j].dispatchEvent(evt);
        this$1[j].dom7EventData = [];
        delete this$1[j].dom7EventData;
      }
    }
    return this;
  },
  transitionEnd: function transitionEnd(callback) {
    var events = ['webkitTransitionEnd', 'transitionend'];
    var dom = this;
    var i;
    function fireCallBack(e) {
      /* jshint validthis:true */
      if (e.target !== this) { return; }
      callback.call(this, e);
      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  },
  animationEnd: function animationEnd(callback) {
    var events = ['webkitAnimationEnd', 'animationend'];
    var dom = this;
    var i;
    function fireCallBack(e) {
      if (e.target !== this) { return; }
      callback.call(this, e);
      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  },
  // Sizing/Styles
  width: function width() {
    if (this[0] === window) {
      return window.innerWidth;
    }

    if (this.length > 0) {
      return parseFloat(this.css('width'));
    }

    return null;
  },
  outerWidth: function outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        var styles = this.styles();
        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
      }
      return this[0].offsetWidth;
    }
    return null;
  },
  height: function height() {
    if (this[0] === window) {
      return window.innerHeight;
    }

    if (this.length > 0) {
      return parseFloat(this.css('height'));
    }

    return null;
  },
  outerHeight: function outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        var styles = this.styles();
        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
      }
      return this[0].offsetHeight;
    }
    return null;
  },
  offset: function offset() {
    if (this.length > 0) {
      var el = this[0];
      var box = el.getBoundingClientRect();
      var body = document.body;
      var clientTop = el.clientTop || body.clientTop || 0;
      var clientLeft = el.clientLeft || body.clientLeft || 0;
      var scrollTop = el === window ? window.scrollY : el.scrollTop;
      var scrollLeft = el === window ? window.scrollX : el.scrollLeft;
      return {
        top: (box.top + scrollTop) - clientTop,
        left: (box.left + scrollLeft) - clientLeft,
      };
    }

    return null;
  },
  hide: function hide() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].style.display = 'none';
    }
    return this;
  },
  show: function show() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      var el = this$1[i];
      if (el.style.display === 'none') {
        el.style.display = '';
      }
      if (window.getComputedStyle(el, null).getPropertyValue('display') === 'none') {
        // Still not visible
        el.style.display = 'block';
      }
    }
    return this;
  },
  styles: function styles() {
    if (this[0]) { return window.getComputedStyle(this[0], null); }
    return {};
  },
  css: function css(props, value) {
    var this$1 = this;

    var i;
    if (arguments.length === 1) {
      if (typeof props === 'string') {
        if (this[0]) { return window.getComputedStyle(this[0], null).getPropertyValue(props); }
      } else {
        for (i = 0; i < this.length; i += 1) {
          for (var prop in props) {
            this$1[i].style[prop] = props[prop];
          }
        }
        return this;
      }
    }
    if (arguments.length === 2 && typeof props === 'string') {
      for (i = 0; i < this.length; i += 1) {
        this$1[i].style[props] = value;
      }
      return this;
    }
    return this;
  },

  // Dom manipulation
  toArray: function toArray() {
    var this$1 = this;

    var arr = [];
    for (var i = 0; i < this.length; i += 1) {
      arr.push(this$1[i]);
    }
    return arr;
  },
  // Iterate over the collection passing elements to `callback`
  each: function each$$1(callback) {
    var this$1 = this;

    // Don't bother continuing without a callback
    if (!callback) { return this; }
    // Iterate over the current collection
    for (var i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this$1[i], i, this$1[i]) === false) {
        // End the loop early
        return this$1;
      }
    }
    // Return `this` to allow chained DOM operations
    return this;
  },
  forEach: function forEach(callback) {
    var this$1 = this;

    // Don't bother continuing without a callback
    if (!callback) { return this; }
    // Iterate over the current collection
    for (var i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this$1[i], this$1[i], i) === false) {
        // End the loop early
        return this$1;
      }
    }
    // Return `this` to allow chained DOM operations
    return this;
  },
  filter: function filter(callback) {
    var matchedItems = [];
    var dom = this;
    for (var i = 0; i < dom.length; i += 1) {
      if (callback.call(dom[i], i, dom[i])) { matchedItems.push(dom[i]); }
    }
    return new Dom7(matchedItems);
  },
  map: function map(callback) {
    var modifiedItems = [];
    var dom = this;
    for (var i = 0; i < dom.length; i += 1) {
      modifiedItems.push(callback.call(dom[i], i, dom[i]));
    }
    return new Dom7(modifiedItems);
  },
  html: function html(html$1) {
    var this$1 = this;

    if (typeof html$1 === 'undefined') {
      return this[0] ? this[0].innerHTML : undefined;
    }

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].innerHTML = html$1;
    }
    return this;
  },
  text: function text(text$1) {
    var this$1 = this;

    if (typeof text$1 === 'undefined') {
      if (this[0]) {
        return this[0].textContent.trim();
      }
      return null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].textContent = text$1;
    }
    return this;
  },
  is: function is(selector) {
    var el = this[0];
    var compareWith;
    var i;
    if (!el || typeof selector === 'undefined') { return false; }
    if (typeof selector === 'string') {
      if (el.matches) { return el.matches(selector); }
      else if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
      else if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }

      compareWith = $$1(selector);
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    } else if (selector === document) { return el === document; }
    else if (selector === window) { return el === window; }

    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    }
    return false;
  },
  indexOf: function indexOf(el) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      if (this$1[i] === el) { return i; }
    }
  },
  index: function index() {
    var child = this[0];
    var i;
    if (child) {
      i = 0;
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) { i += 1; }
      }
      return i;
    }
  },
  eq: function eq(index) {
    if (typeof index === 'undefined') { return this; }
    var length = this.length;
    var returnIndex;
    if (index > length - 1) {
      return new Dom7([]);
    }
    if (index < 0) {
      returnIndex = length + index;
      if (returnIndex < 0) { return new Dom7([]); }
      return new Dom7([this[returnIndex]]);
    }
    return new Dom7([this[index]]);
  },
  append: function append() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var newChild;

    for (var k = 0; k < args.length; k += 1) {
      newChild = args[k];
      for (var i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          var tempDiv = document.createElement('div');
          tempDiv.innerHTML = newChild;
          while (tempDiv.firstChild) {
            this$1[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (var j = 0; j < newChild.length; j += 1) {
            this$1[i].appendChild(newChild[j]);
          }
        } else {
          this$1[i].appendChild(newChild);
        }
      }
    }

    return this;
  },
  appendTo: function appendTo(parent) {
    $$1(parent).append(this);
    return this;
  },
  prepend: function prepend(newChild) {
    var this$1 = this;

    var i;
    var j;
    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = newChild;
        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this$1[i].insertBefore(tempDiv.childNodes[j], this$1[i].childNodes[0]);
        }
      } else if (newChild instanceof Dom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this$1[i].insertBefore(newChild[j], this$1[i].childNodes[0]);
        }
      } else {
        this$1[i].insertBefore(newChild, this$1[i].childNodes[0]);
      }
    }
    return this;
  },
  prependTo: function prependTo(parent) {
    $$1(parent).prepend(this);
    return this;
  },
  insertBefore: function insertBefore(selector) {
    var this$1 = this;

    var before = $$1(selector);
    for (var i = 0; i < this.length; i += 1) {
      if (before.length === 1) {
        before[0].parentNode.insertBefore(this$1[i], before[0]);
      } else if (before.length > 1) {
        for (var j = 0; j < before.length; j += 1) {
          before[j].parentNode.insertBefore(this$1[i].cloneNode(true), before[j]);
        }
      }
    }
  },
  insertAfter: function insertAfter(selector) {
    var this$1 = this;

    var after = $$1(selector);
    for (var i = 0; i < this.length; i += 1) {
      if (after.length === 1) {
        after[0].parentNode.insertBefore(this$1[i], after[0].nextSibling);
      } else if (after.length > 1) {
        for (var j = 0; j < after.length; j += 1) {
          after[j].parentNode.insertBefore(this$1[i].cloneNode(true), after[j].nextSibling);
        }
      }
    }
  },
  next: function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $$1(this[0].nextElementSibling).is(selector)) { return new Dom7([this[0].nextElementSibling]); }
        return new Dom7([]);
      }

      if (this[0].nextElementSibling) { return new Dom7([this[0].nextElementSibling]); }
      return new Dom7([]);
    }
    return new Dom7([]);
  },
  nextAll: function nextAll(selector) {
    var nextEls = [];
    var el = this[0];
    if (!el) { return new Dom7([]); }
    while (el.nextElementSibling) {
      var next = el.nextElementSibling;
      if (selector) {
        if ($$1(next).is(selector)) { nextEls.push(next); }
      } else { nextEls.push(next); }
      el = next;
    }
    return new Dom7(nextEls);
  },
  prev: function prev(selector) {
    if (this.length > 0) {
      var el = this[0];
      if (selector) {
        if (el.previousElementSibling && $$1(el.previousElementSibling).is(selector)) { return new Dom7([el.previousElementSibling]); }
        return new Dom7([]);
      }

      if (el.previousElementSibling) { return new Dom7([el.previousElementSibling]); }
      return new Dom7([]);
    }
    return new Dom7([]);
  },
  prevAll: function prevAll(selector) {
    var prevEls = [];
    var el = this[0];
    if (!el) { return new Dom7([]); }
    while (el.previousElementSibling) {
      var prev = el.previousElementSibling;
      if (selector) {
        if ($$1(prev).is(selector)) { prevEls.push(prev); }
      } else { prevEls.push(prev); }
      el = prev;
    }
    return new Dom7(prevEls);
  },
  siblings: function siblings(selector) {
    return this.nextAll(selector).add(this.prevAll(selector));
  },
  parent: function parent(selector) {
    var this$1 = this;

    var parents = [];
    for (var i = 0; i < this.length; i += 1) {
      if (this$1[i].parentNode !== null) {
        if (selector) {
          if ($$1(this$1[i].parentNode).is(selector)) { parents.push(this$1[i].parentNode); }
        } else {
          parents.push(this$1[i].parentNode);
        }
      }
    }
    return $$1(unique(parents));
  },
  parents: function parents(selector) {
    var this$1 = this;

    var parents = [];
    for (var i = 0; i < this.length; i += 1) {
      var parent = this$1[i].parentNode;
      while (parent) {
        if (selector) {
          if ($$1(parent).is(selector)) { parents.push(parent); }
        } else {
          parents.push(parent);
        }
        parent = parent.parentNode;
      }
    }
    return $$1(unique(parents));
  },
  closest: function closest(selector) {
    var closest = this;
    if (typeof selector === 'undefined') {
      return new Dom7([]);
    }
    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }
    return closest;
  },
  find: function find(selector) {
    var this$1 = this;

    var foundElements = [];
    for (var i = 0; i < this.length; i += 1) {
      var found = this$1[i].querySelectorAll(selector);
      for (var j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }
    return new Dom7(foundElements);
  },
  children: function children(selector) {
    var this$1 = this;

    var children = [];
    for (var i = 0; i < this.length; i += 1) {
      var childNodes = this$1[i].childNodes;

      for (var j = 0; j < childNodes.length; j += 1) {
        if (!selector) {
          if (childNodes[j].nodeType === 1) { children.push(childNodes[j]); }
        } else if (childNodes[j].nodeType === 1 && $$1(childNodes[j]).is(selector)) { children.push(childNodes[j]); }
      }
    }
    return new Dom7(unique(children));
  },
  remove: function remove() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      if (this$1[i].parentNode) { this$1[i].parentNode.removeChild(this$1[i]); }
    }
    return this;
  },
  detach: function detach() {
    return this.remove();
  },
  add: function add() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var dom = this;
    var i;
    var j;
    for (i = 0; i < args.length; i += 1) {
      var toAdd = $$1(args[i]);
      for (j = 0; j < toAdd.length; j += 1) {
        dom[dom.length] = toAdd[j];
        dom.length += 1;
      }
    }
    return dom;
  },
  empty: function empty() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      var el = this$1[i];
      if (el.nodeType === 1) {
        for (var j = 0; j < el.childNodes.length; j += 1) {
          if (el.childNodes[j].parentNode) {
            el.childNodes[j].parentNode.removeChild(el.childNodes[j]);
          }
        }
        el.textContent = '';
      }
    }
    return this;
  },
};

// Shortcuts
var shortcuts = ('click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll').split(' ');
var notTrigger = ('resize scroll').split(' ');
function createMethod(name) {
  Methods[name] = function eventShortcut(targetSelector, listener, capture) {
    var this$1 = this;

    if (typeof targetSelector === 'undefined') {
      for (var i = 0; i < this.length; i += 1) {
        if (notTrigger.indexOf(name) < 0) {
          if (name in this$1[i]) { this$1[i][name](); }
          else {
            $$1(this$1[i]).trigger(name);
          }
        }
      }
      return this;
    }
    return this.on(name, targetSelector, listener, capture);
  };
}
for (var i = 0; i < shortcuts.length; i += 1) {
  createMethod(shortcuts[i]);
}

var Scroll = {
  scrollTo: function scrollTo() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var left = args[0];
    var top = args[1];
    var duration = args[2];
    var easing = args[3];
    var callback = args[4];
    if (args.length === 4 && typeof easing === 'function') {
      callback = easing;
      var assign;
      (assign = args, left = assign[0], top = assign[1], duration = assign[2], callback = assign[3], easing = assign[4]);
    }
    if (typeof easing === 'undefined') { easing = 'swing'; }

    return this.each(function animate() {
      var el = this;
      var currentTop;
      var currentLeft;
      var maxTop;
      var maxLeft;
      var newTop;
      var newLeft;
      var scrollTop;
      var scrollLeft;
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
      if (!duration) { return; }
      if (animateTop) {
        maxTop = el.scrollHeight - el.offsetHeight;
        newTop = Math.max(Math.min(top, maxTop), 0);
      }
      if (animateLeft) {
        maxLeft = el.scrollWidth - el.offsetWidth;
        newLeft = Math.max(Math.min(left, maxLeft), 0);
      }
      var startTime = null;
      if (animateTop && newTop === currentTop) { animateTop = false; }
      if (animateLeft && newLeft === currentLeft) { animateLeft = false; }
      function render(time) {
        if ( time === void 0 ) time = new Date().getTime();

        if (startTime === null) {
          startTime = time;
        }
        var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
        var easeProgress = easing === 'linear' ? progress : (0.5 - (Math.cos(progress * Math.PI) / 2));
        var done;
        if (animateTop) { scrollTop = currentTop + (easeProgress * (newTop - currentTop)); }
        if (animateLeft) { scrollLeft = currentLeft + (easeProgress * (newLeft - currentLeft)); }
        if (animateTop && newTop > currentTop && scrollTop >= newTop) {
          el.scrollTop = newTop;
          done = true;
        }
        if (animateTop && newTop < currentTop && scrollTop <= newTop) {
          el.scrollTop = newTop;
          done = true;
        }
        if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft) {
          el.scrollLeft = newLeft;
          done = true;
        }
        if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft) {
          el.scrollLeft = newLeft;
          done = true;
        }

        if (done) {
          if (callback) { callback(); }
          return;
        }
        if (animateTop) { el.scrollTop = scrollTop; }
        if (animateLeft) { el.scrollLeft = scrollLeft; }
        requestAnimationFrame(render);
      }
      requestAnimationFrame(render);
    });
  },
  // scrollTop(top, duration, easing, callback) {
  scrollTop: function scrollTop() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var top = args[0];
    var duration = args[1];
    var easing = args[2];
    var callback = args[3];
    if (args.length === 3 && typeof easing === 'function') {
      var assign;
      (assign = args, top = assign[0], duration = assign[1], callback = assign[2], easing = assign[3]);
    }
    var dom = this;
    if (typeof top === 'undefined') {
      if (dom.length > 0) { return dom[0].scrollTop; }
      return null;
    }
    return dom.scrollTo(undefined, top, duration, easing, callback);
  },
  scrollLeft: function scrollLeft() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var left = args[0];
    var duration = args[1];
    var easing = args[2];
    var callback = args[3];
    if (args.length === 3 && typeof easing === 'function') {
      var assign;
      (assign = args, left = assign[0], duration = assign[1], callback = assign[2], easing = assign[3]);
    }
    var dom = this;
    if (typeof left === 'undefined') {
      if (dom.length > 0) { return dom[0].scrollLeft; }
      return null;
    }
    return dom.scrollTo(left, undefined, duration, easing, callback);
  },
};

function animate(initialProps, initialParams) {
  var els = this;
  var a = {
    props: $$1.extend({}, initialProps),
    params: $$1.extend({
      duration: 300,
      easing: 'swing', // or 'linear'
      /* Callbacks
      begin(elements)
      complete(elements)
      progress(elements, complete, remaining, start, tweenValue)
      */
    }, initialParams),

    elements: els,
    animating: false,
    que: [],

    easingProgress: function easingProgress(easing, progress) {
      if (easing === 'swing') {
        return 0.5 - (Math.cos(progress * Math.PI) / 2);
      }
      if (typeof easing === 'function') {
        return easing(progress);
      }
      return progress;
    },
    stop: function stop() {
      if (a.frameId) {
        cancelAnimationFrame(a.frameId);
      }
      a.animating = false;
      a.elements.each(function (index, el) {
        var element = el;
        delete element.dom7AnimateInstance;
      });
      a.que = [];
    },
    done: function done(complete) {
      a.animating = false;
      a.elements.each(function (index, el) {
        var element = el;
        delete element.dom7AnimateInstance;
      });
      if (complete) { complete(els); }
      if (a.que.length > 0) {
        var que = a.que.shift();
        a.animate(que[0], que[1]);
      }
    },
    animate: function animate(props, params) {
      if (a.animating) {
        a.que.push([props, params]);
        return a;
      }
      var elements = [];

      // Define & Cache Initials & Units
      a.elements.each(function (index, el) {
        var initialFullValue;
        var initialValue;
        var unit;
        var finalValue;
        var finalFullValue;

        if (!el.dom7AnimateInstance) { a.elements[index].dom7AnimateInstance = a; }

        elements[index] = {
          container: el,
        };
        Object.keys(props).forEach(function (prop) {
          initialFullValue = window.getComputedStyle(el, null).getPropertyValue(prop).replace(',', '.');
          initialValue = parseFloat(initialFullValue);
          unit = initialFullValue.replace(initialValue, '');
          finalValue = parseFloat(props[prop]);
          finalFullValue = props[prop] + unit;
          elements[index][prop] = {
            initialFullValue: initialFullValue,
            initialValue: initialValue,
            unit: unit,
            finalValue: finalValue,
            finalFullValue: finalFullValue,
            currentValue: initialValue,
          };
        });
      });

      var startTime = null;
      var time;
      var elementsDone = 0;
      var propsDone = 0;
      var done;
      var began = false;

      a.animating = true;

      function render() {
        time = new Date().getTime();
        var progress;
        var easeProgress;
        // let el;
        if (!began) {
          began = true;
          if (params.begin) { params.begin(els); }
        }
        if (startTime === null) {
          startTime = time;
        }
        if (params.progress) {
          params.progress(els, Math.max(Math.min((time - startTime) / params.duration, 1), 0), ((startTime + params.duration) - time < 0 ? 0 : (startTime + params.duration) - time), startTime);
        }

        elements.forEach(function (element) {
          var el = element;
          if (done || el.done) { return; }
          Object.keys(props).forEach(function (prop) {
            if (done || el.done) { return; }
            progress = Math.max(Math.min((time - startTime) / params.duration, 1), 0);
            easeProgress = a.easingProgress(params.easing, progress);
            var ref = el[prop];
            var initialValue = ref.initialValue;
            var finalValue = ref.finalValue;
            var unit = ref.unit;
            el[prop].currentValue = initialValue + (easeProgress * (finalValue - initialValue));
            var currentValue = el[prop].currentValue;

            if (
              (finalValue > initialValue && currentValue >= finalValue) ||
              (finalValue < initialValue && currentValue <= finalValue)) {
              el.container.style[prop] = finalValue + unit;
              propsDone += 1;
              if (propsDone === Object.keys(props).length) {
                el.done = true;
                elementsDone += 1;
              }
              if (elementsDone === elements.length) {
                done = true;
              }
            }
            if (done) {
              a.done(params.complete);
              return;
            }
            el.container.style[prop] = currentValue + unit;
          });
        });
        if (done) { return; }
        // Then call
        a.frameId = requestAnimationFrame(render);
      }
      a.frameId = requestAnimationFrame(render);
      return a;
    },
  };

  if (a.elements.length === 0) {
    return els;
  }

  var animateInstance;
  for (var i = 0; i < a.elements.length; i += 1) {
    if (a.elements[i].dom7AnimateInstance) {
      animateInstance = a.elements[i].dom7AnimateInstance;
    } else { a.elements[i].dom7AnimateInstance = a; }
  }
  if (!animateInstance) {
    animateInstance = a;
  }

  if (initialProps === 'stop') {
    animateInstance.stop();
  } else {
    animateInstance.animate(a.props, a.params);
  }

  return els;
}

function stop() {
  var els = this;
  for (var i = 0; i < els.length; i += 1) {
    if (els[i].dom7AnimateInstance) {
      els[i].dom7AnimateInstance.stop();
    }
  }
}

var Animate = {
  animate: animate,
  stop: stop,
};

// Global Ajax Setup
var globalAjaxOptions = {};
function ajaxSetup(options) {
  if (options.type && !options.method) { options.method = options.type; }
  each(options, function (optionName, optionValue) {
    globalAjaxOptions[optionName] = optionValue;
  });
}

// JSONP Requests
var jsonpRequests = 0;

// Ajax
function ajax(options) {
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
    contentType: 'application/x-www-form-urlencoded',
    timeout: 0,
  };
  var callbacks = ['beforeSend', 'error', 'complete', 'success', 'statusCode'];

  // For jQuery guys
  if (options.type) { options.method = options.type; }

  // Global options
  var globals = globalAjaxOptions;

  // Merge global and defaults
  each(globals, function (globalOptionName, globalOptionValue) {
    if (callbacks.indexOf(globalOptionName) < 0) { defaults[globalOptionName] = globalOptionValue; }
  });

  // Function to run XHR callbacks and events
  function fireAjaxCallback(eventName, eventData, callbackName) {
    var a = arguments;
    if (eventName) { $$1(document).trigger(eventName, eventData); }
    if (callbackName) {
      // Global callback
      if (callbackName in globals) { globals[callbackName](a[3], a[4], a[5], a[6]); }
      // Options callback
      if (options[callbackName]) { options[callbackName](a[3], a[4], a[5], a[6]); }
    }
  }

  // Merge options and defaults
  each(defaults, function (prop, defaultValue) {
    if (!(prop in options)) { options[prop] = defaultValue; }
  });

  // Default URL
  if (!options.url) {
    options.url = window.location.toString();
  }
  // Parameters Prefix
  var paramsPrefix = options.url.indexOf('?') >= 0 ? '&' : '?';

  // UC method
  var method = options.method.toUpperCase();

  // Data to modify GET URL
  if ((method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'DELETE') && options.data) {
    var stringData;
    if (typeof options.data === 'string') {
      // Should be key=value string
      if (options.data.indexOf('?') >= 0) { stringData = options.data.split('?')[1]; }
      else { stringData = options.data; }
    } else {
      // Should be key=value object
      stringData = serializeObject(options.data);
    }
    if (stringData.length) {
      options.url += paramsPrefix + stringData;
      if (paramsPrefix === '?') { paramsPrefix = '&'; }
    }
  }
  // JSONP
  if (options.dataType === 'json' && options.url.indexOf('callback=') >= 0) {
    var callbackName = "f7jsonp_" + (Date.now() + ((jsonpRequests += 1)));
    var abortTimeout;
    var callbackSplit = options.url.split('callback=');
    var requestUrl = (callbackSplit[0]) + "callback=" + callbackName;
    if (callbackSplit[1].indexOf('&') >= 0) {
      var addVars = callbackSplit[1].split('&').filter(function (el) { return el.indexOf('=') > 0; }).join('&');
      if (addVars.length > 0) { requestUrl += "&" + addVars; }
    }

    // Create script
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onerror = function onerror() {
      clearTimeout(abortTimeout);
      fireAjaxCallback(undefined, undefined, 'error', null, 'scripterror');
      fireAjaxCallback('ajaxComplete ajax:complete', { scripterror: true }, 'complete', null, 'scripterror');
    };
    script.src = requestUrl;

    // Handler
    window[callbackName] = function jsonpCallback(data) {
      clearTimeout(abortTimeout);
      fireAjaxCallback(undefined, undefined, 'success', data);
      script.parentNode.removeChild(script);
      script = null;
      delete window[callbackName];
    };
    document.querySelector('head').appendChild(script);

    if (options.timeout > 0) {
      abortTimeout = setTimeout(function () {
        script.parentNode.removeChild(script);
        script = null;
        fireAjaxCallback(undefined, undefined, 'error', null, 'timeout');
      }, options.timeout);
    }

    return;
  }

  // Cache for GET/HEAD requests
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'DELETE') {
    if (options.cache === false) {
      options.url += paramsPrefix + "_nocache" + (Date.now());
    }
  }

  // Create XHR
  var xhr = new XMLHttpRequest();

  // Save Request URL
  xhr.requestUrl = options.url;
  xhr.requestParameters = options;

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
        var boundary = "---------------------------" + (Date.now().toString(16));

        if (options.contentType === 'multipart/form-data') {
          xhr.setRequestHeader('Content-Type', ("multipart/form-data; boundary=" + boundary));
        } else {
          xhr.setRequestHeader('Content-Type', options.contentType);
        }
        postData = '';
        var data = serializeObject(options.data);
        if (options.contentType === 'multipart/form-data') {
          data = data.split('&');
          var newData = [];
          for (var i = 0; i < data.length; i += 1) {
            newData.push(("Content-Disposition: form-data; name=\"" + (data[i].split('=')[0]) + "\"\r\n\r\n" + (data[i].split('=')[1]) + "\r\n"));
          }
          postData = "--" + boundary + "\r\n" + (newData.join(("--" + boundary + "\r\n"))) + "--" + boundary + "--\r\n";
        } else {
          postData = data;
        }
      }
    } else {
      postData = options.data;
    }
  }

  // Additional headers
  if (options.headers) {
    each(options.headers, function (headerName, headerCallback) {
      xhr.setRequestHeader(headerName, headerCallback);
    });
  }

  // Check for crossDomain
  if (typeof options.crossDomain === 'undefined') {
    options.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(options.url) && RegExp.$2 !== window.location.host;
  }

  if (!options.crossDomain) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  if (options.xhrFields) {
    each(options.xhrFields, function (fieldName, fieldValue) {
      xhr[fieldName] = fieldValue;
    });
  }

  var xhrTimeout;
  // Handle XHR
  xhr.onload = function onload() {
    if (xhrTimeout) { clearTimeout(xhrTimeout); }
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
      var responseData;
      if (options.dataType === 'json') {
        try {
          responseData = JSON.parse(xhr.responseText);
          fireAjaxCallback('ajaxSuccess ajax:success', { xhr: xhr }, 'success', responseData, xhr.status, xhr);
        } catch (err) {
          fireAjaxCallback('ajaxError ajax:error', { xhr: xhr, parseerror: true }, 'error', xhr, 'parseerror');
        }
      } else {
        responseData = xhr.responseType === 'text' || xhr.responseType === '' ? xhr.responseText : xhr.response;
        fireAjaxCallback('ajaxSuccess ajax:success', { xhr: xhr }, 'success', responseData, xhr.status, xhr);
      }
    } else {
      fireAjaxCallback('ajaxError ajax:error', { xhr: xhr }, 'error', xhr, xhr.status);
    }
    if (options.statusCode) {
      if (globals.statusCode && globals.statusCode[xhr.status]) { globals.statusCode[xhr.status](xhr); }
      if (options.statusCode[xhr.status]) { options.statusCode[xhr.status](xhr); }
    }
    fireAjaxCallback('ajaxComplete ajax:complete', { xhr: xhr }, 'complete', xhr, xhr.status);
  };

  xhr.onerror = function onerror() {
    if (xhrTimeout) { clearTimeout(xhrTimeout); }
    fireAjaxCallback('ajaxError ajax:error', { xhr: xhr }, 'error', xhr, xhr.status);
    fireAjaxCallback('ajaxComplete ajax:complete', { xhr: xhr, error: true }, 'complete', xhr, 'error');
  };

  // Ajax start callback
  fireAjaxCallback('ajaxStart ajax:start', { xhr: xhr }, 'start', xhr);
  fireAjaxCallback(undefined, undefined, 'beforeSend', xhr);

  // Timeout
  if (options.timeout > 0) {
    xhr.onabort = function onabort() {
      if (xhrTimeout) { clearTimeout(xhrTimeout); }
    };
    xhrTimeout = setTimeout(function () {
      xhr.abort();
      fireAjaxCallback('ajaxError ajax:error', { xhr: xhr, timeout: true }, 'error', xhr, 'timeout');
      fireAjaxCallback('ajaxComplete ajax:complete', { xhr: xhr, timeout: true }, 'complete', xhr, 'timeout');
    }, options.timeout);
  }

  // Send XHR
  xhr.send(postData);

  // Return XHR object
  return xhr;
}

function ajaxShortcut(method) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var url;
  var data;
  var success;
  var error;
  var dataType;
  if (typeof args[1] === 'function') {
    var assign;
    (assign = args, url = assign[0], success = assign[1], error = assign[2], dataType = assign[3]);
  } else {
    var assign$1;
    (assign$1 = args, url = assign$1[0], data = assign$1[1], success = assign$1[2], error = assign$1[3], dataType = assign$1[4]);
  }
  [success, error].forEach(function (callback) {
    if (typeof callback === 'string') {
      dataType = callback;
      if (callback === success) { success = undefined; }
      else { error = undefined; }
    }
  });
  dataType = dataType || (method === 'getJSON' ? 'json' : undefined);
  return ajax({
    url: url,
    method: method === 'post' ? 'POST' : 'GET',
    data: data,
    success: success,
    error: error,
    dataType: dataType,
  });
}

function get() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  args.unshift('get');
  return ajaxShortcut.apply(this, args);
}
function post() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  args.unshift('post');
  return ajaxShortcut.apply(this, args);
}
function getJSON() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  args.unshift('getJSON');
  return ajaxShortcut.apply(this, args);
}

var Ajax = {
  __utils: true,
  ajaxSetup: ajaxSetup,
  ajax: ajax,
  get: get,
  post: post,
  getJSON: getJSON,
};

// Utils & Helpers
$$1.use(Utils, Methods, Scroll, Animate, Ajax);

return $$1;

}());
