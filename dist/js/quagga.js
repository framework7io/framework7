(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        //Allow using this built library as an AMD module
        //in another project. That other project will only
        //see this AMD call, not the internal modules in
        //the closure below.
        define([], factory);
    } else {
        //Browser globals case. Just assign the
        //result to a property on the global.
        root.Quagga = factory();
    }
}(this, function () {/**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                name = baseParts.concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("almond", function(){});

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
    'barcode_reader',[],function() {
        
        
        function BarcodeReader() {
            this._row = [];
            return this;
        }
        
        BarcodeReader.prototype._nextUnset = function(line, start) {
            var i;
            
            if (start === undefined) {
                start = 0;
            }
            for (i = start; i < line.length; i++) {
                if (!line[i]) {
                    return i;
                }
            }
            return line.length;
        };
        
        BarcodeReader.prototype._matchPattern = function(counter, code) {
            var i,
                error = 0;
                
            for (i = 0; i < counter.length; i++) {
                error += Math.abs(code[i] - counter[i]);
            }
            return error;
        };

        BarcodeReader.prototype._nextSet = function(line) {
            var i;
            
            for (i = 0; i < line.length; i++) {
                if (line[i]) {
                    return i;
                }
            }
            return line.length;
        };

        BarcodeReader.prototype._normalize = function(counter, modulo) {
            var i,
                self = this,
                sum = 0,
                ratio,
                numOnes = 0,
                normalized = [],
                norm = 0;
                
            if (!modulo) {
                modulo = self.MODULO;
            }
            for (i = 0; i < counter.length; i++) {
                if (counter[i] === 1) {
                    numOnes++;
                } else {
                    sum += counter[i];
                }
            }
            ratio = sum / (modulo - numOnes);
            if (ratio > 1.0) {
                for (i = 0; i < counter.length; i++) {
                    norm = counter[i] === 1 ? counter[i] : counter[i] / ratio;
                    normalized.push(norm);
                }
            } else {
                ratio = (sum + numOnes)/modulo;
                for (i = 0; i < counter.length; i++) {
                    norm = counter[i] / ratio;
                    normalized.push(norm);
                }
            }
            return normalized;
        };

        BarcodeReader.prototype._matchTrace = function(cmpCounter, epsilon) {
            var counter = [],
                i,
                self = this,
                offset = self._nextSet(self._row),
                isWhite = !self._row[offset],
                counterPos = 0,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : 0
                },
                error;

            if (cmpCounter) {
                for ( i = 0; i < cmpCounter.length; i++) {
                    counter.push(0);
                }
                for ( i = offset; i < self._row.length; i++) {
                    if (self._row[i] ^ isWhite) {
                        counter[counterPos]++;
                    } else {
                        if (counterPos === counter.length - 1) {
                            error = self._matchPattern(counter, cmpCounter);

                            if (error < epsilon) {
                                bestMatch.start = i - offset;
                                bestMatch.end = i;
                                bestMatch.counter = counter;
                                return bestMatch;
                            } else {
                                return null;
                            }
                        } else {
                            counterPos++;
                        }
                        counter[counterPos] = 1;
                        isWhite = !isWhite;
                    }
                }
            } else {
                counter.push(0);
                for ( i = offset; i < self._row.length; i++) {
                    if (self._row[i] ^ isWhite) {
                        counter[counterPos]++;
                    } else {
                        counterPos++;
                        counter.push(0);
                        counter[counterPos] = 1;
                        isWhite = !isWhite;
                    }
                }
            }

            // if cmpCounter was not given
            bestMatch.start = offset;
            bestMatch.end = self._row.length - 1;
            bestMatch.counter = counter;
            return bestMatch;
        };
        
        BarcodeReader.prototype.decodePattern = function(pattern) {
            var self = this,
                result;
            
            self._row = pattern;
            result = self._decode();
            if (result === null) {
                self._row.reverse();
                result = self._decode();
                if (result) {
                    result.direction = BarcodeReader.DIRECTION.REVERSE;
                    result.start = self._row.length - result.start;
                    result.end = self._row.length - result.end;
                }
            } else {
                result.direction = BarcodeReader.DIRECTION.FORWARD;
            }
            return result;
        };
        
        BarcodeReader.DIRECTION = {
            FORWARD : 1,
            REVERSE : -1
        };
        
        BarcodeReader.Exception = {
            StartNotFoundException : "Start-Info was not found!",
            CodeNotFoundException : "Code could not be found!",
            PatternNotFoundException : "Pattern could not be found!"
        };
        
        return (BarcodeReader);
    }
);

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
     'code_128_reader',[
        "./barcode_reader"
    ],
    function(BarcodeReader) {
        
        
        function Code128Reader() {
            BarcodeReader.call(this);
        }
        
        var properties = {
            CODE_SHIFT : {value: 98},
            CODE_C : {value: 99},
            CODE_B : {value: 100},
            CODE_A : {value: 101},
            START_CODE_A : {value: 103},
            START_CODE_B : {value: 104},
            START_CODE_C : {value: 105},
            STOP_CODE : {value: 106},
            MODULO : {value: 11},
            CODE_PATTERN : {value: [
                [2, 1, 2, 2, 2, 2],
                [2, 2, 2, 1, 2, 2],
                [2, 2, 2, 2, 2, 1],
                [1, 2, 1, 2, 2, 3],
                [1, 2, 1, 3, 2, 2],
                [1, 3, 1, 2, 2, 2],
                [1, 2, 2, 2, 1, 3],
                [1, 2, 2, 3, 1, 2],
                [1, 3, 2, 2, 1, 2],
                [2, 2, 1, 2, 1, 3],
                [2, 2, 1, 3, 1, 2],
                [2, 3, 1, 2, 1, 2],
                [1, 1, 2, 2, 3, 2],
                [1, 2, 2, 1, 3, 2],
                [1, 2, 2, 2, 3, 1],
                [1, 1, 3, 2, 2, 2],
                [1, 2, 3, 1, 2, 2],
                [1, 2, 3, 2, 2, 1],
                [2, 2, 3, 2, 1, 1],
                [2, 2, 1, 1, 3, 2],
                [2, 2, 1, 2, 3, 1],
                [2, 1, 3, 2, 1, 2],
                [2, 2, 3, 1, 1, 2],
                [3, 1, 2, 1, 3, 1],
                [3, 1, 1, 2, 2, 2],
                [3, 2, 1, 1, 2, 2],
                [3, 2, 1, 2, 2, 1],
                [3, 1, 2, 2, 1, 2],
                [3, 2, 2, 1, 1, 2],
                [3, 2, 2, 2, 1, 1],
                [2, 1, 2, 1, 2, 3],
                [2, 1, 2, 3, 2, 1],
                [2, 3, 2, 1, 2, 1],
                [1, 1, 1, 3, 2, 3],
                [1, 3, 1, 1, 2, 3],
                [1, 3, 1, 3, 2, 1],
                [1, 1, 2, 3, 1, 3],
                [1, 3, 2, 1, 1, 3],
                [1, 3, 2, 3, 1, 1],
                [2, 1, 1, 3, 1, 3],
                [2, 3, 1, 1, 1, 3],
                [2, 3, 1, 3, 1, 1],
                [1, 1, 2, 1, 3, 3],
                [1, 1, 2, 3, 3, 1],
                [1, 3, 2, 1, 3, 1],
                [1, 1, 3, 1, 2, 3],
                [1, 1, 3, 3, 2, 1],
                [1, 3, 3, 1, 2, 1],
                [3, 1, 3, 1, 2, 1],
                [2, 1, 1, 3, 3, 1],
                [2, 3, 1, 1, 3, 1],
                [2, 1, 3, 1, 1, 3],
                [2, 1, 3, 3, 1, 1],
                [2, 1, 3, 1, 3, 1],
                [3, 1, 1, 1, 2, 3],
                [3, 1, 1, 3, 2, 1],
                [3, 3, 1, 1, 2, 1],
                [3, 1, 2, 1, 1, 3],
                [3, 1, 2, 3, 1, 1],
                [3, 3, 2, 1, 1, 1],
                [3, 1, 4, 1, 1, 1],
                [2, 2, 1, 4, 1, 1],
                [4, 3, 1, 1, 1, 1],
                [1, 1, 1, 2, 2, 4],
                [1, 1, 1, 4, 2, 2],
                [1, 2, 1, 1, 2, 4],
                [1, 2, 1, 4, 2, 1],
                [1, 4, 1, 1, 2, 2],
                [1, 4, 1, 2, 2, 1],
                [1, 1, 2, 2, 1, 4],
                [1, 1, 2, 4, 1, 2],
                [1, 2, 2, 1, 1, 4],
                [1, 2, 2, 4, 1, 1],
                [1, 4, 2, 1, 1, 2],
                [1, 4, 2, 2, 1, 1],
                [2, 4, 1, 2, 1, 1],
                [2, 2, 1, 1, 1, 4],
                [4, 1, 3, 1, 1, 1],
                [2, 4, 1, 1, 1, 2],
                [1, 3, 4, 1, 1, 1],
                [1, 1, 1, 2, 4, 2],
                [1, 2, 1, 1, 4, 2],
                [1, 2, 1, 2, 4, 1],
                [1, 1, 4, 2, 1, 2],
                [1, 2, 4, 1, 1, 2],
                [1, 2, 4, 2, 1, 1],
                [4, 1, 1, 2, 1, 2],
                [4, 2, 1, 1, 1, 2],
                [4, 2, 1, 2, 1, 1],
                [2, 1, 2, 1, 4, 1],
                [2, 1, 4, 1, 2, 1],
                [4, 1, 2, 1, 2, 1],
                [1, 1, 1, 1, 4, 3],
                [1, 1, 1, 3, 4, 1],
                [1, 3, 1, 1, 4, 1],
                [1, 1, 4, 1, 1, 3],
                [1, 1, 4, 3, 1, 1],
                [4, 1, 1, 1, 1, 3],
                [4, 1, 1, 3, 1, 1],
                [1, 1, 3, 1, 4, 1],
                [1, 1, 4, 1, 3, 1],
                [3, 1, 1, 1, 4, 1],
                [4, 1, 1, 1, 3, 1],
                [2, 1, 1, 4, 1, 2],
                [2, 1, 1, 2, 1, 4],
                [2, 1, 1, 2, 3, 2],
                [2, 3, 3, 1, 1, 1, 2]
            ]}
        };
        
        Code128Reader.prototype = Object.create(BarcodeReader.prototype, properties);
        Code128Reader.prototype.constructor = Code128Reader;
        
        Code128Reader.prototype._decodeCode = function(start) {
            var counter = [0, 0, 0, 0, 0, 0],
                i,
                self = this,
                offset = start,
                isWhite = !self._row[offset],
                counterPos = 0,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : start,
                    end : start
                },
                code,
                error,
                normalized;

            for ( i = offset; i < self._row.length; i++) {
                if (self._row[i] ^ isWhite) {
                    counter[counterPos]++;
                } else {
                    if (counterPos === counter.length - 1) {
                        normalized = self._normalize(counter);
                        for ( code = 0; code < self.CODE_PATTERN.length; code++) {
                            error = self._matchPattern(normalized, self.CODE_PATTERN[code]);
                            if (error < bestMatch.error) {
                                bestMatch.code = code;
                                bestMatch.error = error;
                            }
                        }
                        bestMatch.end = i;
                        return bestMatch;
                    } else {
                        counterPos++;
                    }
                    counter[counterPos] = 1;
                    isWhite = !isWhite;
                }
            }
            return null;
        };
        
        Code128Reader.prototype._findEnd = function() {
            var counter = [0, 0, 0, 0, 0, 0, 0],
                i,
                self = this,
                offset = self._nextSet(self._row),
                isWhite = !self._row[offset],
                counterPos = 0,
                    bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : 0,
                    end : 0
                },
                error,
                j,
                sum,
                normalized;
                
            for ( i = offset; i < self._row.length; i++) {
                if (self._row[i] ^ isWhite) {
                    counter[counterPos]++;
                } else {
                    if (counterPos === counter.length - 1) {
                        sum = 0;
                        for ( j = 0; j < counter.length; j++) {
                            sum += counter[j];
                        }
                        normalized = self._normalize(counter, 13);
                        error = self._matchPattern(normalized, self.CODE_PATTERN[self.STOP_CODE]);
                        if (error < 3) {
                            bestMatch.error = error;
                            bestMatch.start = i - sum;
                            bestMatch.end = i;
                            return bestMatch;
                        }

                        for ( j = 0; j < 5; j++) {
                            counter[j] = counter[j + 2];
                        }
                        counter[5] = 0;
                        counter[6] = 0;
                        counterPos--;
                    } else {
                        counterPos++;
                    }
                    counter[counterPos] = 1;
                    isWhite = !isWhite;
                }
            }
            return null;
        };

        Code128Reader.prototype._findStart = function() {
            var counter = [0, 0, 0, 0, 0, 0],
                i,
                self = this,
                offset = self._nextSet(self._row),
                isWhite = false,
                counterPos = 0,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : 0,
                    end : 0
                },
                code,
                error,
                j,
                sum,
                normalized;
                
            for ( i = offset; i < self._row.length; i++) {
                if (self._row[i] ^ isWhite) {
                    counter[counterPos]++;
                } else {
                    if (counterPos === counter.length - 1) {
                        sum = 0;
                        for ( j = 0; j < counter.length; j++) {
                            sum += counter[j];
                        }
                        normalized = self._normalize(counter);
                        for ( code = self.START_CODE_A; code <= self.START_CODE_C; code++) {
                            error = self._matchPattern(normalized, self.CODE_PATTERN[code]);
                            if (error < bestMatch.error) {
                                bestMatch.code = code;
                                bestMatch.error = error;
                            }
                        }
                        if (bestMatch.error < 3) {
                            bestMatch.start = i - sum;
                            bestMatch.end = i;
                            return bestMatch;
                        }

                        for ( j = 0; j < 4; j++) {
                            counter[j] = counter[j + 2];
                        }
                        counter[4] = 0;
                        counter[5] = 0;
                        counterPos--;
                    } else {
                        counterPos++;
                    }
                    counter[counterPos] = 1;
                    isWhite = !isWhite;
                }
            }
            return null;
        };

        Code128Reader.prototype._decode = function() {
            var self = this,
                startInfo = self._findStart(),
                code = null,
                done = false,
                result = [],
                multiplier = 0,
                checksum = 0,
                codeset,
                rawResult = [],
                decodedCodes = [],
                shiftNext = false,
                unshift,
                lastCharacterWasPrintable;

            if (startInfo === null) {
                return null;
            }
            code = {
                code : startInfo.code,
                start : startInfo.start,
                end : startInfo.end
            };
            decodedCodes.push(code);
            checksum = code.code;
            switch(code.code) {
            case self.START_CODE_A:
                codeset = self.CODE_A;
                break;
            case self.START_CODE_B:
                codeset = self.CODE_B;
                break;
            case self.START_CODE_C:
                codeset = self.CODE_C;
                break;
            default:
                return null;
            }

            while (!done) {
                unshift = shiftNext;
                shiftNext = false;
                code = self._decodeCode(code.end);
                if (code !== null) {
                    if (code.code !== self.STOP_CODE) {
                        rawResult.push(code.code);
                        multiplier++;
                        checksum += multiplier * code.code;
                    }
                    decodedCodes.push(code);

                    switch(codeset) {
                    case self.CODE_A:
                        if (code.code < 64) {
                            result.push(String.fromCharCode(32 + code.code));
                        } else if (code.code < 96) {
                            result.push(String.fromCharCode(code.code - 64));
                        } else {
                            switch (code.code) {
                            case self.CODE_SHIFT:
                                shiftNext = true;
                                codeset = self.CODE_B;
                                break;
                            case self.CODE_B:
                                codeset = self.CODE_B;
                                break;
                            case self.CODE_C:
                                codeset = self.CODE_C;
                                break;
                            case self.STOP_CODE:
                                done = true;
                                break;
                            }
                        }
                        break;
                    case self.CODE_B:
                        if (code.code < 96) {
                            result.push(String.fromCharCode(32 + code.code));
                        } else {
                            if (code.code != self.STOP_CODE) {
                                lastCharacterWasPrintable = false;
                            }
                            switch (code.code) {
                            case self.CODE_SHIFT:
                                shiftNext = true;
                                codeset = self.CODE_A;
                                break;
                            case self.CODE_A:
                                codeset = self.CODE_A;
                                break;
                            case self.CODE_C:
                                codeset = self.CODE_C;
                                break;
                            case self.STOP_CODE:
                                done = true;
                                break;
                            }
                        }
                        break;
                    case self.CODE_C:
                        if (code.code < 100) {
                            result.push(code.code < 10 ? "0" + code.code : code.code);
                        }
                        switch (code.code) {
                        case self.CODE_A:
                            codeset = self.CODE_A;
                            break;
                        case self.CODE_B:
                            codeset = self.CODE_B;
                            break;
                        case self.STOP_CODE:
                            done = true;
                            break;
                        }
                        break;
                    }
                } else {
                    done = true;
                }
                if (unshift) {
                    codeset = codeset == self.CODE_A ? self.CODE_B : self.CODE_A;
                }
            }

            if (code === null) {
                return null;
            }

            // find end bar
            code.end = self._nextUnset(self._row, code.end);
            if (code.end === self._row.length) {
                return null;
            }

            // checksum
            // Does not work correctly yet!!! startcode - endcode?
            checksum -= multiplier * rawResult[rawResult.length - 1];
            if (checksum % 103 != rawResult[rawResult.length - 1]) {
                return null;
            }

            // remove last code from result (checksum)
            result.splice(result.length - 1, 1);

            return {
                code : result.join(""),
                start : startInfo.start,
                end : code.end,
                codeset : codeset,
                startInfo : startInfo,
                decodedCodes : decodedCodes,
                endInfo : code
            };
        };
        
        return (Code128Reader);
    }
);
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(
     'ean_reader',[
        "./barcode_reader"
    ],
    function(BarcodeReader) {
        
        
        function EANReader() {
            BarcodeReader.call(this);
        }
        
        var properties = {
            CODE_L_START : {value: 0},
            MODULO : {value: 7},
            CODE_G_START : {value: 10},
            START_PATTERN : {value: [1 / 3 * 7, 1 / 3 * 7, 1 / 3 * 7]},
            STOP_PATTERN : {value: [1 / 3 * 7, 1 / 3 * 7, 1 / 3 * 7]},
            MIDDLE_PATTERN : {value: [1 / 5 * 7, 1 / 5 * 7, 1 / 5 * 7, 1 / 5 * 7, 1 / 5 * 7]},
            CODE_PATTERN : {value: [
                [3, 2, 1, 1],
                [2, 2, 2, 1],
                [2, 1, 2, 2],
                [1, 4, 1, 1],
                [1, 1, 3, 2],
                [1, 2, 3, 1],
                [1, 1, 1, 4],
                [1, 3, 1, 2],
                [1, 2, 1, 3],
                [3, 1, 1, 2],
                [1, 1, 2, 3],
                [1, 2, 2, 2],
                [2, 2, 1, 2],
                [1, 1, 4, 1],
                [2, 3, 1, 1],
                [1, 3, 2, 1],
                [4, 1, 1, 1],
                [2, 1, 3, 1],
                [3, 1, 2, 1],
                [2, 1, 1, 3]
            ]},
            CODE_FREQUENCY : {value: [0, 11, 13, 14, 19, 25, 28, 21, 22, 26]}
        };
        
        EANReader.prototype = Object.create(BarcodeReader.prototype, properties);
        EANReader.prototype.constructor = EANReader;
        
        EANReader.prototype._decodeCode = function(start, coderange) {
            var counter = [0, 0, 0, 0],
                i,
                self = this,
                offset = start,
                isWhite = !self._row[offset],
                counterPos = 0,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : start,
                    end : start
                },
                code,
                error,
                normalized;

            if (!coderange) {
                coderange = self.CODE_PATTERN.length;
            }

            for ( i = offset; i < self._row.length; i++) {
                if (self._row[i] ^ isWhite) {
                    counter[counterPos]++;
                } else {
                    if (counterPos === counter.length - 1) {
                        normalized = self._normalize(counter);
                        for ( code = 0; code < coderange; code++) {
                            error = self._matchPattern(normalized, self.CODE_PATTERN[code]);
                            if (error < bestMatch.error) {
                                bestMatch.code = code;
                                bestMatch.error = error;
                            }
                        }
                        bestMatch.end = i;
                        return bestMatch;
                    } else {
                        counterPos++;
                    }
                    counter[counterPos] = 1;
                    isWhite = !isWhite;
                }
            }
            throw BarcodeReader.CodeNotFoundException;
        };

        EANReader.prototype._findPattern = function(pattern, offset, isWhite, tryHarder, epsilon) {
            var counter = [],
                self = this,
                i,
                counterPos = 0,
                bestMatch = {
                    error : Number.MAX_VALUE,
                    code : -1,
                    start : 0,
                    end : 0
                },
                error,
                j,
                sum,
                normalized;

            if (!offset) {
                offset = self._nextSet(self._row);
            }

            if (isWhite === undefined) {
                isWhite = false;
            }

            if (tryHarder === undefined) {
                tryHarder = true;
            }

            if ( epsilon === undefined) {
                epsilon = 1.5;
            }

            for ( i = 0; i < pattern.length; i++) {
                counter[i] = 0;
            }

            for ( i = offset; i < self._row.length; i++) {
                if (self._row[i] ^ isWhite) {
                    counter[counterPos]++;
                } else {
                    if (counterPos === counter.length - 1) {
                        sum = 0;
                        for ( j = 0; j < counter.length; j++) {
                            sum += counter[j];
                        }
                        normalized = self._normalize(counter);
                        error = self._matchPattern(normalized, pattern);

                        if (error < epsilon) {
                            bestMatch.error = error;
                            bestMatch.start = i - sum;
                            bestMatch.end = i;
                            return bestMatch;
                        }
                        if (tryHarder) {
                            for ( j = 0; j < counter.length - 2; j++) {
                                counter[j] = counter[j + 2];
                            }
                            counter[counter.length - 2] = 0;
                            counter[counter.length - 1] = 0;
                            counterPos--;
                        } else {
                            throw BarcodeReader.PatternNotFoundException;
                        }
                    } else {
                        counterPos++;
                    }
                    counter[counterPos] = 1;
                    isWhite = !isWhite;
                }
            }
            throw BarcodeReader.PatternNotFoundException;
        };

        EANReader.prototype._decode = function() {
            var startInfo,
                self = this,
                code = null, 
                result = [],
                i,
                codeFrequency = 0x0,
                decodedCodes = [];

            try {
                startInfo = self._findPattern(self.START_PATTERN);
                code = {
                    code : startInfo.code,
                    start : startInfo.start,
                    end : startInfo.end
                };
                decodedCodes.push(code);
                for ( i = 0; i < 6; i++) {
                    code = self._decodeCode(code.end);
                    if (code.code >= self.CODE_G_START) {
                        code.code = code.code - self.CODE_G_START;
                        codeFrequency |= 1 << (5 - i);
                    } else {
                        codeFrequency |= 0 << (5 - i);
                    }
                    result.push(code.code);
                    decodedCodes.push(code);
                }

                for ( i = 0; i < self.CODE_FREQUENCY.length; i++) {
                    if (codeFrequency === self.CODE_FREQUENCY[i]) {
                        result.unshift(i);
                        break;
                    }
                }

                code = self._findPattern(self.MIDDLE_PATTERN, code.end, true);
                if (code === null) {
                    return null;
                }
                decodedCodes.push(code);

                for ( i = 0; i < 6; i++) {
                    code = self._decodeCode(code.end, self.CODE_G_START);
                    decodedCodes.push(code);
                    result.push(code.code);
                }

                code = self._findPattern(self.STOP_PATTERN, code.end);
                decodedCodes.push(code);

                // Checksum
                if (!self._checksum(result)) {
                    return null;
                }
            } catch (exc) {
                return null;
            }

            return {
                code : result.join(""),
                start : startInfo.start,
                end : code.end,
                codeset : "",
                startInfo : startInfo,
                decodedCodes : decodedCodes
            };
        };

        EANReader.prototype._checksum = function(result) {
            var sum = 0, i;

            for ( i = result.length - 2; i >= 0; i -= 2) {
                sum += result[i];
            }
            sum *= 3;
            for ( i = result.length - 1; i >= 0; i -= 2) {
                sum += result[i];
            }
            return sum % 10 === 0;
        };
        
        return (EANReader);
    }
);
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('image_loader',[],function() {
    

    var ImageLoader = {};
    ImageLoader.load = function(directory, callback, offset, size, sequence) {
        var htmlImagesSrcArray = new Array(size),
            htmlImagesArray = new Array(htmlImagesSrcArray.length),
            i,
            img,
            num;
            
        if (sequence === false) {
            htmlImagesSrcArray[0] = directory;
        } else {
            for ( i = 0; i < htmlImagesSrcArray.length; i++) {
                num = (offset + i);
                htmlImagesSrcArray[i] = directory + "image-" + ("00" + num).slice(-3) + ".jpg";
            }
        }
        htmlImagesArray.notLoaded = [];
        htmlImagesArray.addImage = function(img) {
            htmlImagesArray.notLoaded.push(img);
        };
        htmlImagesArray.loaded = function(loadedImg) {
            var notloadedImgs = htmlImagesArray.notLoaded;
            for (var x = 0; x < notloadedImgs.length; x++) {
                if (notloadedImgs[x] == loadedImg) {
                    notloadedImgs.splice(x, 1);
                    for (var y = 0; y < htmlImagesSrcArray.length; y++) {
                        var imgName = htmlImagesSrcArray[y].substr(htmlImagesSrcArray[y].lastIndexOf("/"));
                        if (loadedImg.src.lastIndexOf(imgName) != -1) {
                            htmlImagesArray[y] = loadedImg;
                            break;
                        }
                    }
                    break;
                }
            }
            if (notloadedImgs.length === 0) {
                console.log("Images loaded");
                callback.apply(null, [htmlImagesArray]);
            }
        };
        
        for ( i = 0; i < htmlImagesSrcArray.length; i++) {
            img = new Image();
            htmlImagesArray.addImage(img);
            addOnloadHandler(img, htmlImagesArray);
            img.src = htmlImagesSrcArray[i];
        }
    };
    
    function addOnloadHandler(img, htmlImagesArray) {
        img.onload = function() {
            htmlImagesArray.loaded(this);
        };
    }

    return (ImageLoader);
});

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('input_stream',["image_loader"], function(ImageLoader) {
    

    var InputStream = {};
    InputStream.createVideoStream = function(video) {
        var that = {},
            _config = null,
            _eventNames = ['canrecord', 'ended'],
            _eventHandlers = {};

        that.getRealWidth = function() {
            return video.videoWidth;
        };

        that.getRealHeight = function() {
            return video.videoHeight;
        };

        that.getWidth = function() {
            return _config.halfSample ? video.videoWidth / 2 : video.videoWidth;
        };

        that.getHeight = function() {
            return _config.halfSample ? video.videoHeight / 2 : video.videoHeight;
        };

        that.setInputStream = function(config) {
            _config = config;
            video.src = config.src;
        };

        that.ended = function() {
            return video.ended;
        };

        that.getConfig = function() {
            return _config;
        };

        that.setAttribute = function(name, value) {
            video.setAttribute(name, value);
        };

        that.pause = function() {
            video.pause();
        };

        that.play = function() {
            video.play();
        };

        that.setCurrentTime = function(time) {
            if (_config.type !== "LiveStream")
                video.currentTime = time;
        };

        that.addEventListener = function(event, f, bool) {
            if (_eventNames.indexOf(event) !== -1) {
                if (!_eventHandlers[event]) {
                    _eventHandlers[event] = [];
                }
                _eventHandlers[event].push(f);
            } else {
                video.addEventListener(event, f, bool);
            }
        };

        that.trigger = function(eventName, args) {
            var j,
                handlers = _eventHandlers[eventName];
                
            if (handlers && handlers.length > 0) {
                for ( j = 0; j < handlers.length; j++) {
                    handlers[j].apply(that, args);
                }
            }
        };

        that.getFrame = function() {
            return video;
        };

        return that;
    };

    InputStream.createLiveStream = function(video) {
        video.setAttribute("autoplay", true);
        var that = InputStream.createVideoStream(video);

        that.ended = function() {
            return false;
        };

        that.getWidth = function() {
            return this.getConfig().halfSample ? video.videoWidth / 2 : video.videoWidth;
        };

        that.getHeight = function() {
            return this.getConfig().halfSample ? video.videoHeight / 2 : video.videoHeight;
        };

        return that;
    };

    InputStream.createImageStream = function() {
        var that = {};
        var _config = null;

        var width = 0,
            height = 0,
            frameIdx = 0,
            paused = true,
            loaded = false,
            imgArray = null,
            size = 0,
            offset = 1,
            baseUrl = null,
            ended = false,
            _eventNames = ['canrecord', 'ended'],
            _eventHandlers = {};

        function loadImages() {
            loaded = false;
            ImageLoader.load(baseUrl, function(imgs) {
                imgArray = imgs;
                width = imgs[0].width;
                height = imgs[0].height;
                loaded = true;
                frameIdx = 0;
                setTimeout(function() {
                    publishEvent("canrecord", []);
                }, 0);
            }, offset, size, _config.sequence);
        }

        function publishEvent(eventName, args) {
            var j,
                handlers = _eventHandlers[eventName];
                
            if (handlers && handlers.length > 0) {
                for ( j = 0; j < handlers.length; j++) {
                    handlers[j].apply(that, args);
                }
            }
        }


        that.trigger = publishEvent;

        that.getWidth = function() {
            return _config.size ? width/height > 1 ? _config.size : (width/height) * _config.size : width;
        };

        that.getHeight = function() {
            return _config.size ? width/height > 1 ? (height/width) * _config.size : _config.size : height;
        };

        that.getRealWidth = function() {
            return width;
        };

        that.getRealHeight = function() {
            return height;
        };

        that.setInputStream = function(stream) {
            _config = stream;
            if (stream.sequence === false) {
                baseUrl = stream.src;
                size = 1;
            } else {
                baseUrl = stream.src;
                size = stream.length;
            }
            loadImages();
        };

        that.ended = function() {
            return ended;
        };

        that.setAttribute = function() {};

        that.getConfig = function() {
            return _config;
        };

        that.pause = function() {
            paused = true;
        };

        that.play = function() {
            paused = false;
        };

        that.setCurrentTime = function(time) {
            frameIdx = time;
        };

        that.addEventListener = function(event, f) {
            if (_eventNames.indexOf(event) !== -1) {
                if (!_eventHandlers[event]) {
                    _eventHandlers[event] = [];
                }
                _eventHandlers[event].push(f);
            }
        };

        that.getFrame = function() {
            var frame;
            
            if (!loaded){
                return null;
            }
            if (!paused) {
                frame = imgArray[frameIdx];
                if (frameIdx < (size - 1)) {
                    frameIdx++;
                } else {
                    setTimeout(function() {
                        ended = true;
                        publishEvent("ended", []);
                    }, 0);
                }
            }
            return frame;
        };

        return that;
    };

    return (InputStream);
});

/*
 * typedefs.js
 * Normalizes browser-specific prefixes
 */

glMatrixArrayType = Float32Array;
if (typeof window !== 'undefined') {
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
}

define("typedefs", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.typedefs;
    };
}(this)));

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('subImage',["typedefs"], function() {
    

    /**
     * Construct representing a part of another {ImageWrapper}. Shares data
     * between the parent and the child.
     * @param from {ImageRef} The position where to start the {SubImage} from. (top-left corner)
     * @param size {ImageRef} The size of the resulting image
     * @param I {ImageWrapper} The {ImageWrapper} to share from
     * @returns {SubImage} A shared part of the original image
     */
    function SubImage(from, size, I) {
        if (!I) {
            I = {
                data : null,
                size : size
            };
        }
        this.data = I.data;
        this.originalSize = I.size;
        this.I = I;

        this.from = from;
        this.size = size;
    }

    /**
     * Displays the {SubImage} in a given canvas
     * @param canvas {Canvas} The canvas element to write to
     * @param scale {Number} Scale which is applied to each pixel-value
     */
    SubImage.prototype.show = function(canvas, scale) {
        var ctx,
            frame,
            data,
            current,
            y,
            x,
            pixel;
            
        if (!scale) {
            scale = 1.0;
        }
        ctx = canvas.getContext('2d');
        canvas.width = this.size.x;
        canvas.height = this.size.y;
        frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        data = frame.data;
        current = 0;
        for (y = 0; y < this.size.y; y++) {
            for (x = 0; x < this.size.x; x++) {
                pixel = y * this.size.x + x;
                current = this.get(x, y) * scale;
                data[pixel * 4 + 0] = current;
                data[pixel * 4 + 1] = current;
                data[pixel * 4 + 2] = current;
                data[pixel * 4 + 3] = 255;
            }
        }
        frame.data = data;
        ctx.putImageData(frame, 0, 0);
    };

    /**
     * Retrieves a given pixel position from the {SubImage}
     * @param x {Number} The x-position
     * @param y {Number} The y-position
     * @returns {Number} The grayscale value at the pixel-position
     */
    SubImage.prototype.get = function(x, y) {
        return this.data[(this.from.y + y) * this.originalSize.x + this.from.x + x];
    };

    /**
     * Updates the underlying data from a given {ImageWrapper}
     * @param image {ImageWrapper} The updated image
     */
    SubImage.prototype.updateData = function(image) {
        this.originalSize = image.size;
        this.data = image.data;
    };

    /**
     * Updates the position of the shared area
     * @param from {x,y} The new location
     * @returns {SubImage} returns {this} for possible chaining
     */
    SubImage.prototype.updateFrom = function(from) {
        this.from = from;
        return this;
    };
    
    return (SubImage);
}); 
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define, vec2 */

define('cluster',[],function() {
    
    
    /**
     * Creates a cluster for grouping similar orientations of datapoints 
     */
    var Cluster = {
        create : function(point, threshold) {
            var points = [], center = {
                rad : 0,
                vec : vec2.create([0, 0])
            }, pointMap = {};

            function init() {
                add(point);
                updateCenter();
            }

            function add(point) {
                pointMap[point.id] = point;
                points.push(point);
            }

            function updateCenter() {
                var i, sum = 0;
                for ( i = 0; i < points.length; i++) {
                    sum += points[i].rad;
                }
                center.rad = sum / points.length;
                center.vec = vec2.create([Math.cos(center.rad), Math.sin(center.rad)]);
            }

            init();

            return {
                add : function(point) {
                    if (!pointMap[point.id]) {
                        add(point);
                        updateCenter();
                    }
                },
                fits : function(point) {
                    // check cosine similarity to center-angle
                    var similarity = Math.abs(vec2.dot(point.point.vec, center.vec));
                    if (similarity > threshold) {
                        return true;
                    }
                    return false;
                },
                getPoints : function() {
                    return points;
                },
                getCenter : function() {
                    return center;
                }
            };
        },
        createPoint : function(point, id, property) {
            return {
                rad : point[property],
                point : point,
                id : id
            };
        }
    };

    return (Cluster);
});

/* 
 * glMatrix.js - High performance matrix and vector operations for WebGL
 * version 0.9.6
 */
 
/*
 * Copyright (c) 2011 Brandon Jones
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */



/*
 * vec3 - 3 Dimensional Vector
 */
var vec3 = {};

/*
 * vec3.create
 * Creates a new instance of a vec3 using the default array type
 * Any javascript array containing at least 3 numeric elements can serve as a vec3
 *
 * Params:
 * vec - Optional, vec3 containing values to initialize with
 *
 * Returns:
 * New vec3
 */
vec3.create = function(vec) {	
	var dest;
	if(vec) {
		dest = new glMatrixArrayType(3);
		dest[0] = vec[0];
		dest[1] = vec[1];
		dest[2] = vec[2];
	} else {
		if(glMatrixArrayType === Array)
			dest = new glMatrixArrayType([0,0,0]);
		else
			dest = new glMatrixArrayType(3);
	}
	
	return dest;
};

/*
 * vec3.set
 * Copies the values of one vec3 to another
 *
 * Params:
 * vec - vec3 containing values to copy
 * dest - vec3 receiving copied values
 *
 * Returns:
 * dest
 */
vec3.set = function(vec, dest) {
	dest[0] = vec[0];
	dest[1] = vec[1];
	dest[2] = vec[2];
	
	return dest;
};

/*
 * vec3.add
 * Performs a vector addition
 *
 * Params:
 * vec - vec3, first operand
 * vec2 - vec3, second operand
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.add = function(vec, vec2, dest) {
	if(!dest || vec == dest) {
		vec[0] += vec2[0];
		vec[1] += vec2[1];
		vec[2] += vec2[2];
		return vec;
	}
	
	dest[0] = vec[0] + vec2[0];
	dest[1] = vec[1] + vec2[1];
	dest[2] = vec[2] + vec2[2];
	return dest;
};

/*
 * vec3.subtract
 * Performs a vector subtraction
 *
 * Params:
 * vec - vec3, first operand
 * vec2 - vec3, second operand
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.subtract = function(vec, vec2, dest) {
	if(!dest || vec == dest) {
		vec[0] -= vec2[0];
		vec[1] -= vec2[1];
		vec[2] -= vec2[2];
		return vec;
	}
	
	dest[0] = vec[0] - vec2[0];
	dest[1] = vec[1] - vec2[1];
	dest[2] = vec[2] - vec2[2];
	return dest;
};

/*
 * vec3.negate
 * Negates the components of a vec3
 *
 * Params:
 * vec - vec3 to negate
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.negate = function(vec, dest) {
	if(!dest) { dest = vec; }
	
	dest[0] = -vec[0];
	dest[1] = -vec[1];
	dest[2] = -vec[2];
	return dest;
};

/*
 * vec3.scale
 * Multiplies the components of a vec3 by a scalar value
 *
 * Params:
 * vec - vec3 to scale
 * val - Numeric value to scale by
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.scale = function(vec, val, dest) {
	if(!dest || vec == dest) {
		vec[0] *= val;
		vec[1] *= val;
		vec[2] *= val;
		return vec;
	}
	
	dest[0] = vec[0]*val;
	dest[1] = vec[1]*val;
	dest[2] = vec[2]*val;
	return dest;
};

/*
 * vec3.normalize
 * Generates a unit vector of the same direction as the provided vec3
 * If vector length is 0, returns [0, 0, 0]
 *
 * Params:
 * vec - vec3 to normalize
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.normalize = function(vec, dest) {
	if(!dest) { dest = vec; }
	
	var x = vec[0], y = vec[1], z = vec[2];
	var len = Math.sqrt(x*x + y*y + z*z);
	
	if (!len) {
		dest[0] = 0;
		dest[1] = 0;
		dest[2] = 0;
		return dest;
	} else if (len == 1) {
		dest[0] = x;
		dest[1] = y;
		dest[2] = z;
		return dest;
	}
	
	len = 1 / len;
	dest[0] = x*len;
	dest[1] = y*len;
	dest[2] = z*len;
	return dest;
};

/*
 * vec3.cross
 * Generates the cross product of two vec3s
 *
 * Params:
 * vec - vec3, first operand
 * vec2 - vec3, second operand
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.cross = function(vec, vec2, dest){
	if(!dest) { dest = vec; }
	
	var x = vec[0], y = vec[1], z = vec[2];
	var x2 = vec2[0], y2 = vec2[1], z2 = vec2[2];
	
	dest[0] = y*z2 - z*y2;
	dest[1] = z*x2 - x*z2;
	dest[2] = x*y2 - y*x2;
	return dest;
};

/*
 * vec3.length
 * Caclulates the length of a vec3
 *
 * Params:
 * vec - vec3 to calculate length of
 *
 * Returns:
 * Length of vec
 */
vec3.length = function(vec){
	var x = vec[0], y = vec[1], z = vec[2];
	return Math.sqrt(x*x + y*y + z*z);
};

/*
 * vec3.dot
 * Caclulates the dot product of two vec3s
 *
 * Params:
 * vec - vec3, first operand
 * vec2 - vec3, second operand
 *
 * Returns:
 * Dot product of vec and vec2
 */
vec3.dot = function(vec, vec2){
	return vec[0]*vec2[0] + vec[1]*vec2[1] + vec[2]*vec2[2];
};

/*
 * vec3.direction
 * Generates a unit vector pointing from one vector to another
 *
 * Params:
 * vec - origin vec3
 * vec2 - vec3 to point to
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.direction = function(vec, vec2, dest) {
	if(!dest) { dest = vec; }
	
	var x = vec[0] - vec2[0];
	var y = vec[1] - vec2[1];
	var z = vec[2] - vec2[2];
	
	var len = Math.sqrt(x*x + y*y + z*z);
	if (!len) { 
		dest[0] = 0; 
		dest[1] = 0; 
		dest[2] = 0;
		return dest; 
	}
	
	len = 1 / len;
	dest[0] = x * len; 
	dest[1] = y * len; 
	dest[2] = z * len;
	return dest; 
};

/*
 * vec3.lerp
 * Performs a linear interpolation between two vec3
 *
 * Params:
 * vec - vec3, first vector
 * vec2 - vec3, second vector
 * lerp - interpolation amount between the two inputs
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.lerp = function(vec, vec2, lerp, dest){
    if(!dest) { dest = vec; }
    
    dest[0] = vec[0] + lerp * (vec2[0] - vec[0]);
    dest[1] = vec[1] + lerp * (vec2[1] - vec[1]);
    dest[2] = vec[2] + lerp * (vec2[2] - vec[2]);
    
    return dest;
};

/*
 * vec3.str
 * Returns a string representation of a vector
 *
 * Params:
 * vec - vec3 to represent as a string
 *
 * Returns:
 * string representation of vec
 */
vec3.str = function(vec) {
	return '[' + vec[0] + ', ' + vec[1] + ', ' + vec[2] + ']'; 
};

/*
 * mat3 - 3x3 Matrix
 */
var mat3 = {};

/*
 * mat3.create
 * Creates a new instance of a mat3 using the default array type
 * Any javascript array containing at least 9 numeric elements can serve as a mat3
 *
 * Params:
 * mat - Optional, mat3 containing values to initialize with
 *
 * Returns:
 * New mat3
 */
mat3.create = function(mat) {
	var dest;
	
	if(mat) {
		dest = new glMatrixArrayType(9);
		dest[0] = mat[0];
		dest[1] = mat[1];
		dest[2] = mat[2];
		dest[3] = mat[3];
		dest[4] = mat[4];
		dest[5] = mat[5];
		dest[6] = mat[6];
		dest[7] = mat[7];
		dest[8] = mat[8];
	} else {
		if(glMatrixArrayType === Array)
			dest = new glMatrixArrayType([0,0,0,0,0,0,0,0,0]);
		else
			dest = new glMatrixArrayType(9);
	}
	
	return dest;
};

/*
 * mat3.set
 * Copies the values of one mat3 to another
 *
 * Params:
 * mat - mat3 containing values to copy
 * dest - mat3 receiving copied values
 *
 * Returns:
 * dest
 */
mat3.set = function(mat, dest) {
	dest[0] = mat[0];
	dest[1] = mat[1];
	dest[2] = mat[2];
	dest[3] = mat[3];
	dest[4] = mat[4];
	dest[5] = mat[5];
	dest[6] = mat[6];
	dest[7] = mat[7];
	dest[8] = mat[8];
	return dest;
};

/*
 * mat3.identity
 * Sets a mat3 to an identity matrix
 *
 * Params:
 * dest - mat3 to set
 *
 * Returns:
 * dest
 */
mat3.identity = function(dest) {
	dest[0] = 1;
	dest[1] = 0;
	dest[2] = 0;
	dest[3] = 0;
	dest[4] = 1;
	dest[5] = 0;
	dest[6] = 0;
	dest[7] = 0;
	dest[8] = 1;
	return dest;
};

/*
 * mat4.transpose
 * Transposes a mat3 (flips the values over the diagonal)
 *
 * Params:
 * mat - mat3 to transpose
 * dest - Optional, mat3 receiving transposed values. If not specified result is written to mat
 *
 * Returns:
 * dest is specified, mat otherwise
 */
mat3.transpose = function(mat, dest) {
	// If we are transposing ourselves we can skip a few steps but have to cache some values
	if(!dest || mat == dest) { 
		var a01 = mat[1], a02 = mat[2];
		var a12 = mat[5];
		
        mat[1] = mat[3];
        mat[2] = mat[6];
        mat[3] = a01;
        mat[5] = mat[7];
        mat[6] = a02;
        mat[7] = a12;
		return mat;
	}
	
	dest[0] = mat[0];
	dest[1] = mat[3];
	dest[2] = mat[6];
	dest[3] = mat[1];
	dest[4] = mat[4];
	dest[5] = mat[7];
	dest[6] = mat[2];
	dest[7] = mat[5];
	dest[8] = mat[8];
	return dest;
};

/*
 * mat3.toMat4
 * Copies the elements of a mat3 into the upper 3x3 elements of a mat4
 *
 * Params:
 * mat - mat3 containing values to copy
 * dest - Optional, mat4 receiving copied values
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
mat3.toMat4 = function(mat, dest) {
	if(!dest) { dest = mat4.create(); }
	
	dest[0] = mat[0];
	dest[1] = mat[1];
	dest[2] = mat[2];
	dest[3] = 0;

	dest[4] = mat[3];
	dest[5] = mat[4];
	dest[6] = mat[5];
	dest[7] = 0;

	dest[8] = mat[6];
	dest[9] = mat[7];
	dest[10] = mat[8];
	dest[11] = 0;

	dest[12] = 0;
	dest[13] = 0;
	dest[14] = 0;
	dest[15] = 1;
	
	return dest;
};

/*
 * mat3.str
 * Returns a string representation of a mat3
 *
 * Params:
 * mat - mat3 to represent as a string
 *
 * Returns:
 * string representation of mat
 */
mat3.str = function(mat) {
	return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] + 
		', ' + mat[3] + ', '+ mat[4] + ', ' + mat[5] + 
		', ' + mat[6] + ', ' + mat[7] + ', '+ mat[8] + ']';
};

/*
 * mat4 - 4x4 Matrix
 */
var mat4 = {};

/*
 * mat4.create
 * Creates a new instance of a mat4 using the default array type
 * Any javascript array containing at least 16 numeric elements can serve as a mat4
 *
 * Params:
 * mat - Optional, mat4 containing values to initialize with
 *
 * Returns:
 * New mat4
 */
mat4.create = function(mat) {
	var dest;
	
	if(mat) {
		dest = new glMatrixArrayType(16);
		dest[0] = mat[0];
		dest[1] = mat[1];
		dest[2] = mat[2];
		dest[3] = mat[3];
		dest[4] = mat[4];
		dest[5] = mat[5];
		dest[6] = mat[6];
		dest[7] = mat[7];
		dest[8] = mat[8];
		dest[9] = mat[9];
		dest[10] = mat[10];
		dest[11] = mat[11];
		dest[12] = mat[12];
		dest[13] = mat[13];
		dest[14] = mat[14];
		dest[15] = mat[15];
	} else {
		if(glMatrixArrayType === Array)
			dest = new glMatrixArrayType([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
		else
			dest = new glMatrixArrayType(16);
	}
	
	return dest;
};

/*
 * mat4.set
 * Copies the values of one mat4 to another
 *
 * Params:
 * mat - mat4 containing values to copy
 * dest - mat4 receiving copied values
 *
 * Returns:
 * dest
 */
mat4.set = function(mat, dest) {
	dest[0] = mat[0];
	dest[1] = mat[1];
	dest[2] = mat[2];
	dest[3] = mat[3];
	dest[4] = mat[4];
	dest[5] = mat[5];
	dest[6] = mat[6];
	dest[7] = mat[7];
	dest[8] = mat[8];
	dest[9] = mat[9];
	dest[10] = mat[10];
	dest[11] = mat[11];
	dest[12] = mat[12];
	dest[13] = mat[13];
	dest[14] = mat[14];
	dest[15] = mat[15];
	return dest;
};

/*
 * mat4.identity
 * Sets a mat4 to an identity matrix
 *
 * Params:
 * dest - mat4 to set
 *
 * Returns:
 * dest
 */
mat4.identity = function(dest) {
	dest[0] = 1;
	dest[1] = 0;
	dest[2] = 0;
	dest[3] = 0;
	dest[4] = 0;
	dest[5] = 1;
	dest[6] = 0;
	dest[7] = 0;
	dest[8] = 0;
	dest[9] = 0;
	dest[10] = 1;
	dest[11] = 0;
	dest[12] = 0;
	dest[13] = 0;
	dest[14] = 0;
	dest[15] = 1;
	return dest;
};

/*
 * mat4.transpose
 * Transposes a mat4 (flips the values over the diagonal)
 *
 * Params:
 * mat - mat4 to transpose
 * dest - Optional, mat4 receiving transposed values. If not specified result is written to mat
 *
 * Returns:
 * dest is specified, mat otherwise
 */
mat4.transpose = function(mat, dest) {
	// If we are transposing ourselves we can skip a few steps but have to cache some values
	if(!dest || mat == dest) { 
		var a01 = mat[1], a02 = mat[2], a03 = mat[3];
		var a12 = mat[6], a13 = mat[7];
		var a23 = mat[11];
		
		mat[1] = mat[4];
		mat[2] = mat[8];
		mat[3] = mat[12];
		mat[4] = a01;
		mat[6] = mat[9];
		mat[7] = mat[13];
		mat[8] = a02;
		mat[9] = a12;
		mat[11] = mat[14];
		mat[12] = a03;
		mat[13] = a13;
		mat[14] = a23;
		return mat;
	}
	
	dest[0] = mat[0];
	dest[1] = mat[4];
	dest[2] = mat[8];
	dest[3] = mat[12];
	dest[4] = mat[1];
	dest[5] = mat[5];
	dest[6] = mat[9];
	dest[7] = mat[13];
	dest[8] = mat[2];
	dest[9] = mat[6];
	dest[10] = mat[10];
	dest[11] = mat[14];
	dest[12] = mat[3];
	dest[13] = mat[7];
	dest[14] = mat[11];
	dest[15] = mat[15];
	return dest;
};

/*
 * mat4.determinant
 * Calculates the determinant of a mat4
 *
 * Params:
 * mat - mat4 to calculate determinant of
 *
 * Returns:
 * determinant of mat
 */
mat4.determinant = function(mat) {
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
	var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
	var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];

	return	a30*a21*a12*a03 - a20*a31*a12*a03 - a30*a11*a22*a03 + a10*a31*a22*a03 +
			a20*a11*a32*a03 - a10*a21*a32*a03 - a30*a21*a02*a13 + a20*a31*a02*a13 +
			a30*a01*a22*a13 - a00*a31*a22*a13 - a20*a01*a32*a13 + a00*a21*a32*a13 +
			a30*a11*a02*a23 - a10*a31*a02*a23 - a30*a01*a12*a23 + a00*a31*a12*a23 +
			a10*a01*a32*a23 - a00*a11*a32*a23 - a20*a11*a02*a33 + a10*a21*a02*a33 +
			a20*a01*a12*a33 - a00*a21*a12*a33 - a10*a01*a22*a33 + a00*a11*a22*a33;
};

/*
 * mat4.inverse
 * Calculates the inverse matrix of a mat4
 *
 * Params:
 * mat - mat4 to calculate inverse of
 * dest - Optional, mat4 receiving inverse matrix. If not specified result is written to mat
 *
 * Returns:
 * dest is specified, mat otherwise
 */
mat4.inverse = function(mat, dest) {
	if(!dest) { dest = mat; }
	
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
	var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
	var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
	
	var b00 = a00*a11 - a01*a10;
	var b01 = a00*a12 - a02*a10;
	var b02 = a00*a13 - a03*a10;
	var b03 = a01*a12 - a02*a11;
	var b04 = a01*a13 - a03*a11;
	var b05 = a02*a13 - a03*a12;
	var b06 = a20*a31 - a21*a30;
	var b07 = a20*a32 - a22*a30;
	var b08 = a20*a33 - a23*a30;
	var b09 = a21*a32 - a22*a31;
	var b10 = a21*a33 - a23*a31;
	var b11 = a22*a33 - a23*a32;
	
	// Calculate the determinant (inlined to avoid double-caching)
	var invDet = 1/(b00*b11 - b01*b10 + b02*b09 + b03*b08 - b04*b07 + b05*b06);
	
	dest[0] = (a11*b11 - a12*b10 + a13*b09)*invDet;
	dest[1] = (-a01*b11 + a02*b10 - a03*b09)*invDet;
	dest[2] = (a31*b05 - a32*b04 + a33*b03)*invDet;
	dest[3] = (-a21*b05 + a22*b04 - a23*b03)*invDet;
	dest[4] = (-a10*b11 + a12*b08 - a13*b07)*invDet;
	dest[5] = (a00*b11 - a02*b08 + a03*b07)*invDet;
	dest[6] = (-a30*b05 + a32*b02 - a33*b01)*invDet;
	dest[7] = (a20*b05 - a22*b02 + a23*b01)*invDet;
	dest[8] = (a10*b10 - a11*b08 + a13*b06)*invDet;
	dest[9] = (-a00*b10 + a01*b08 - a03*b06)*invDet;
	dest[10] = (a30*b04 - a31*b02 + a33*b00)*invDet;
	dest[11] = (-a20*b04 + a21*b02 - a23*b00)*invDet;
	dest[12] = (-a10*b09 + a11*b07 - a12*b06)*invDet;
	dest[13] = (a00*b09 - a01*b07 + a02*b06)*invDet;
	dest[14] = (-a30*b03 + a31*b01 - a32*b00)*invDet;
	dest[15] = (a20*b03 - a21*b01 + a22*b00)*invDet;
	
	return dest;
};

/*
 * mat4.toRotationMat
 * Copies the upper 3x3 elements of a mat4 into another mat4
 *
 * Params:
 * mat - mat4 containing values to copy
 * dest - Optional, mat4 receiving copied values
 *
 * Returns:
 * dest is specified, a new mat4 otherwise
 */
mat4.toRotationMat = function(mat, dest) {
	if(!dest) { dest = mat4.create(); }
	
	dest[0] = mat[0];
	dest[1] = mat[1];
	dest[2] = mat[2];
	dest[3] = mat[3];
	dest[4] = mat[4];
	dest[5] = mat[5];
	dest[6] = mat[6];
	dest[7] = mat[7];
	dest[8] = mat[8];
	dest[9] = mat[9];
	dest[10] = mat[10];
	dest[11] = mat[11];
	dest[12] = 0;
	dest[13] = 0;
	dest[14] = 0;
	dest[15] = 1;
	
	return dest;
};

/*
 * mat4.toMat3
 * Copies the upper 3x3 elements of a mat4 into a mat3
 *
 * Params:
 * mat - mat4 containing values to copy
 * dest - Optional, mat3 receiving copied values
 *
 * Returns:
 * dest is specified, a new mat3 otherwise
 */
mat4.toMat3 = function(mat, dest) {
	if(!dest) { dest = mat3.create(); }
	
	dest[0] = mat[0];
	dest[1] = mat[1];
	dest[2] = mat[2];
	dest[3] = mat[4];
	dest[4] = mat[5];
	dest[5] = mat[6];
	dest[6] = mat[8];
	dest[7] = mat[9];
	dest[8] = mat[10];
	
	return dest;
};

/*
 * mat4.toInverseMat3
 * Calculates the inverse of the upper 3x3 elements of a mat4 and copies the result into a mat3
 * The resulting matrix is useful for calculating transformed normals
 *
 * Params:
 * mat - mat4 containing values to invert and copy
 * dest - Optional, mat3 receiving values
 *
 * Returns:
 * dest is specified, a new mat3 otherwise
 */
mat4.toInverseMat3 = function(mat, dest) {
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2];
	var a10 = mat[4], a11 = mat[5], a12 = mat[6];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10];
	
	var b01 = a22*a11-a12*a21;
	var b11 = -a22*a10+a12*a20;
	var b21 = a21*a10-a11*a20;
		
	var d = a00*b01 + a01*b11 + a02*b21;
	if (!d) { return null; }
	var id = 1/d;
	
	if(!dest) { dest = mat3.create(); }
	
	dest[0] = b01*id;
	dest[1] = (-a22*a01 + a02*a21)*id;
	dest[2] = (a12*a01 - a02*a11)*id;
	dest[3] = b11*id;
	dest[4] = (a22*a00 - a02*a20)*id;
	dest[5] = (-a12*a00 + a02*a10)*id;
	dest[6] = b21*id;
	dest[7] = (-a21*a00 + a01*a20)*id;
	dest[8] = (a11*a00 - a01*a10)*id;
	
	return dest;
};

/*
 * mat4.multiply
 * Performs a matrix multiplication
 *
 * Params:
 * mat - mat4, first operand
 * mat2 - mat4, second operand
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.multiply = function(mat, mat2, dest) {
	if(!dest) { dest = mat; }
	
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
	var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
	var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
	
	var b00 = mat2[0], b01 = mat2[1], b02 = mat2[2], b03 = mat2[3];
	var b10 = mat2[4], b11 = mat2[5], b12 = mat2[6], b13 = mat2[7];
	var b20 = mat2[8], b21 = mat2[9], b22 = mat2[10], b23 = mat2[11];
	var b30 = mat2[12], b31 = mat2[13], b32 = mat2[14], b33 = mat2[15];
	
	dest[0] = b00*a00 + b01*a10 + b02*a20 + b03*a30;
	dest[1] = b00*a01 + b01*a11 + b02*a21 + b03*a31;
	dest[2] = b00*a02 + b01*a12 + b02*a22 + b03*a32;
	dest[3] = b00*a03 + b01*a13 + b02*a23 + b03*a33;
	dest[4] = b10*a00 + b11*a10 + b12*a20 + b13*a30;
	dest[5] = b10*a01 + b11*a11 + b12*a21 + b13*a31;
	dest[6] = b10*a02 + b11*a12 + b12*a22 + b13*a32;
	dest[7] = b10*a03 + b11*a13 + b12*a23 + b13*a33;
	dest[8] = b20*a00 + b21*a10 + b22*a20 + b23*a30;
	dest[9] = b20*a01 + b21*a11 + b22*a21 + b23*a31;
	dest[10] = b20*a02 + b21*a12 + b22*a22 + b23*a32;
	dest[11] = b20*a03 + b21*a13 + b22*a23 + b23*a33;
	dest[12] = b30*a00 + b31*a10 + b32*a20 + b33*a30;
	dest[13] = b30*a01 + b31*a11 + b32*a21 + b33*a31;
	dest[14] = b30*a02 + b31*a12 + b32*a22 + b33*a32;
	dest[15] = b30*a03 + b31*a13 + b32*a23 + b33*a33;
	
	return dest;
};

/*
 * mat4.multiplyVec3
 * Transforms a vec3 with the given matrix
 * 4th vector component is implicitly '1'
 *
 * Params:
 * mat - mat4 to transform the vector with
 * vec - vec3 to transform
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
mat4.multiplyVec3 = function(mat, vec, dest) {
	if(!dest) { dest = vec; }
	
	var x = vec[0], y = vec[1], z = vec[2];
	
	dest[0] = mat[0]*x + mat[4]*y + mat[8]*z + mat[12];
	dest[1] = mat[1]*x + mat[5]*y + mat[9]*z + mat[13];
	dest[2] = mat[2]*x + mat[6]*y + mat[10]*z + mat[14];
	
	return dest;
};

/*
 * mat4.multiplyVec4
 * Transforms a vec4 with the given matrix
 *
 * Params:
 * mat - mat4 to transform the vector with
 * vec - vec4 to transform
 * dest - Optional, vec4 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
mat4.multiplyVec4 = function(mat, vec, dest) {
	if(!dest) { dest = vec; }
	
	var x = vec[0], y = vec[1], z = vec[2], w = vec[3];
	
	dest[0] = mat[0]*x + mat[4]*y + mat[8]*z + mat[12]*w;
	dest[1] = mat[1]*x + mat[5]*y + mat[9]*z + mat[13]*w;
	dest[2] = mat[2]*x + mat[6]*y + mat[10]*z + mat[14]*w;
	dest[3] = mat[3]*x + mat[7]*y + mat[11]*z + mat[15]*w;
	
	return dest;
};

/*
 * mat4.translate
 * Translates a matrix by the given vector
 *
 * Params:
 * mat - mat4 to translate
 * vec - vec3 specifying the translation
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.translate = function(mat, vec, dest) {
	var x = vec[0], y = vec[1], z = vec[2];
	
	if(!dest || mat == dest) {
		mat[12] = mat[0]*x + mat[4]*y + mat[8]*z + mat[12];
		mat[13] = mat[1]*x + mat[5]*y + mat[9]*z + mat[13];
		mat[14] = mat[2]*x + mat[6]*y + mat[10]*z + mat[14];
		mat[15] = mat[3]*x + mat[7]*y + mat[11]*z + mat[15];
		return mat;
	}
	
	var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
	var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
	
	dest[0] = a00;
	dest[1] = a01;
	dest[2] = a02;
	dest[3] = a03;
	dest[4] = a10;
	dest[5] = a11;
	dest[6] = a12;
	dest[7] = a13;
	dest[8] = a20;
	dest[9] = a21;
	dest[10] = a22;
	dest[11] = a23;
	
	dest[12] = a00*x + a10*y + a20*z + mat[12];
	dest[13] = a01*x + a11*y + a21*z + mat[13];
	dest[14] = a02*x + a12*y + a22*z + mat[14];
	dest[15] = a03*x + a13*y + a23*z + mat[15];
	return dest;
};

/*
 * mat4.scale
 * Scales a matrix by the given vector
 *
 * Params:
 * mat - mat4 to scale
 * vec - vec3 specifying the scale for each axis
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.scale = function(mat, vec, dest) {
	var x = vec[0], y = vec[1], z = vec[2];
	
	if(!dest || mat == dest) {
		mat[0] *= x;
		mat[1] *= x;
		mat[2] *= x;
		mat[3] *= x;
		mat[4] *= y;
		mat[5] *= y;
		mat[6] *= y;
		mat[7] *= y;
		mat[8] *= z;
		mat[9] *= z;
		mat[10] *= z;
		mat[11] *= z;
		return mat;
	}
	
	dest[0] = mat[0]*x;
	dest[1] = mat[1]*x;
	dest[2] = mat[2]*x;
	dest[3] = mat[3]*x;
	dest[4] = mat[4]*y;
	dest[5] = mat[5]*y;
	dest[6] = mat[6]*y;
	dest[7] = mat[7]*y;
	dest[8] = mat[8]*z;
	dest[9] = mat[9]*z;
	dest[10] = mat[10]*z;
	dest[11] = mat[11]*z;
	dest[12] = mat[12];
	dest[13] = mat[13];
	dest[14] = mat[14];
	dest[15] = mat[15];
	return dest;
};

/*
 * mat4.rotate
 * Rotates a matrix by the given angle around the specified axis
 * If rotating around a primary axis (X,Y,Z) one of the specialized rotation functions should be used instead for performance
 *
 * Params:
 * mat - mat4 to rotate
 * angle - angle (in radians) to rotate
 * axis - vec3 representing the axis to rotate around 
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.rotate = function(mat, angle, axis, dest) {
	var x = axis[0], y = axis[1], z = axis[2];
	var len = Math.sqrt(x*x + y*y + z*z);
	if (!len) { return null; }
	if (len != 1) {
		len = 1 / len;
		x *= len; 
		y *= len; 
		z *= len;
	}
	
	var s = Math.sin(angle);
	var c = Math.cos(angle);
	var t = 1-c;
	
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
	var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
	
	// Construct the elements of the rotation matrix
	var b00 = x*x*t + c, b01 = y*x*t + z*s, b02 = z*x*t - y*s;
	var b10 = x*y*t - z*s, b11 = y*y*t + c, b12 = z*y*t + x*s;
	var b20 = x*z*t + y*s, b21 = y*z*t - x*s, b22 = z*z*t + c;
	
	if(!dest) { 
		dest = mat; 
	} else if(mat != dest) { // If the source and destination differ, copy the unchanged last row
		dest[12] = mat[12];
		dest[13] = mat[13];
		dest[14] = mat[14];
		dest[15] = mat[15];
	}
	
	// Perform rotation-specific matrix multiplication
	dest[0] = a00*b00 + a10*b01 + a20*b02;
	dest[1] = a01*b00 + a11*b01 + a21*b02;
	dest[2] = a02*b00 + a12*b01 + a22*b02;
	dest[3] = a03*b00 + a13*b01 + a23*b02;
	
	dest[4] = a00*b10 + a10*b11 + a20*b12;
	dest[5] = a01*b10 + a11*b11 + a21*b12;
	dest[6] = a02*b10 + a12*b11 + a22*b12;
	dest[7] = a03*b10 + a13*b11 + a23*b12;
	
	dest[8] = a00*b20 + a10*b21 + a20*b22;
	dest[9] = a01*b20 + a11*b21 + a21*b22;
	dest[10] = a02*b20 + a12*b21 + a22*b22;
	dest[11] = a03*b20 + a13*b21 + a23*b22;
	return dest;
};

/*
 * mat4.rotateX
 * Rotates a matrix by the given angle around the X axis
 *
 * Params:
 * mat - mat4 to rotate
 * angle - angle (in radians) to rotate
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.rotateX = function(mat, angle, dest) {
	var s = Math.sin(angle);
	var c = Math.cos(angle);
	
	// Cache the matrix values (makes for huge speed increases!)
	var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];

	if(!dest) { 
		dest = mat; 
	} else if(mat != dest) { // If the source and destination differ, copy the unchanged rows
		dest[0] = mat[0];
		dest[1] = mat[1];
		dest[2] = mat[2];
		dest[3] = mat[3];
		
		dest[12] = mat[12];
		dest[13] = mat[13];
		dest[14] = mat[14];
		dest[15] = mat[15];
	}
	
	// Perform axis-specific matrix multiplication
	dest[4] = a10*c + a20*s;
	dest[5] = a11*c + a21*s;
	dest[6] = a12*c + a22*s;
	dest[7] = a13*c + a23*s;
	
	dest[8] = a10*-s + a20*c;
	dest[9] = a11*-s + a21*c;
	dest[10] = a12*-s + a22*c;
	dest[11] = a13*-s + a23*c;
	return dest;
};

/*
 * mat4.rotateY
 * Rotates a matrix by the given angle around the Y axis
 *
 * Params:
 * mat - mat4 to rotate
 * angle - angle (in radians) to rotate
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.rotateY = function(mat, angle, dest) {
	var s = Math.sin(angle);
	var c = Math.cos(angle);
	
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
	var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
	
	if(!dest) { 
		dest = mat; 
	} else if(mat != dest) { // If the source and destination differ, copy the unchanged rows
		dest[4] = mat[4];
		dest[5] = mat[5];
		dest[6] = mat[6];
		dest[7] = mat[7];
		
		dest[12] = mat[12];
		dest[13] = mat[13];
		dest[14] = mat[14];
		dest[15] = mat[15];
	}
	
	// Perform axis-specific matrix multiplication
	dest[0] = a00*c + a20*-s;
	dest[1] = a01*c + a21*-s;
	dest[2] = a02*c + a22*-s;
	dest[3] = a03*c + a23*-s;
	
	dest[8] = a00*s + a20*c;
	dest[9] = a01*s + a21*c;
	dest[10] = a02*s + a22*c;
	dest[11] = a03*s + a23*c;
	return dest;
};

/*
 * mat4.rotateZ
 * Rotates a matrix by the given angle around the Z axis
 *
 * Params:
 * mat - mat4 to rotate
 * angle - angle (in radians) to rotate
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.rotateZ = function(mat, angle, dest) {
	var s = Math.sin(angle);
	var c = Math.cos(angle);
	
	// Cache the matrix values (makes for huge speed increases!)
	var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
	var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
	
	if(!dest) { 
		dest = mat; 
	} else if(mat != dest) { // If the source and destination differ, copy the unchanged last row
		dest[8] = mat[8];
		dest[9] = mat[9];
		dest[10] = mat[10];
		dest[11] = mat[11];
		
		dest[12] = mat[12];
		dest[13] = mat[13];
		dest[14] = mat[14];
		dest[15] = mat[15];
	}
	
	// Perform axis-specific matrix multiplication
	dest[0] = a00*c + a10*s;
	dest[1] = a01*c + a11*s;
	dest[2] = a02*c + a12*s;
	dest[3] = a03*c + a13*s;
	
	dest[4] = a00*-s + a10*c;
	dest[5] = a01*-s + a11*c;
	dest[6] = a02*-s + a12*c;
	dest[7] = a03*-s + a13*c;
	
	return dest;
};

/*
 * mat4.frustum
 * Generates a frustum matrix with the given bounds
 *
 * Params:
 * left, right - scalar, left and right bounds of the frustum
 * bottom, top - scalar, bottom and top bounds of the frustum
 * near, far - scalar, near and far bounds of the frustum
 * dest - Optional, mat4 frustum matrix will be written into
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
mat4.frustum = function(left, right, bottom, top, near, far, dest) {
	if(!dest) { dest = mat4.create(); }
	var rl = (right - left);
	var tb = (top - bottom);
	var fn = (far - near);
	dest[0] = (near*2) / rl;
	dest[1] = 0;
	dest[2] = 0;
	dest[3] = 0;
	dest[4] = 0;
	dest[5] = (near*2) / tb;
	dest[6] = 0;
	dest[7] = 0;
	dest[8] = (right + left) / rl;
	dest[9] = (top + bottom) / tb;
	dest[10] = -(far + near) / fn;
	dest[11] = -1;
	dest[12] = 0;
	dest[13] = 0;
	dest[14] = -(far*near*2) / fn;
	dest[15] = 0;
	return dest;
};

/*
 * mat4.perspective
 * Generates a perspective projection matrix with the given bounds
 *
 * Params:
 * fovy - scalar, vertical field of view
 * aspect - scalar, aspect ratio. typically viewport width/height
 * near, far - scalar, near and far bounds of the frustum
 * dest - Optional, mat4 frustum matrix will be written into
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
mat4.perspective = function(fovy, aspect, near, far, dest) {
	var top = near*Math.tan(fovy*Math.PI / 360.0);
	var right = top*aspect;
	return mat4.frustum(-right, right, -top, top, near, far, dest);
};

/*
 * mat4.ortho
 * Generates a orthogonal projection matrix with the given bounds
 *
 * Params:
 * left, right - scalar, left and right bounds of the frustum
 * bottom, top - scalar, bottom and top bounds of the frustum
 * near, far - scalar, near and far bounds of the frustum
 * dest - Optional, mat4 frustum matrix will be written into
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
mat4.ortho = function(left, right, bottom, top, near, far, dest) {
	if(!dest) { dest = mat4.create(); }
	var rl = (right - left);
	var tb = (top - bottom);
	var fn = (far - near);
	dest[0] = 2 / rl;
	dest[1] = 0;
	dest[2] = 0;
	dest[3] = 0;
	dest[4] = 0;
	dest[5] = 2 / tb;
	dest[6] = 0;
	dest[7] = 0;
	dest[8] = 0;
	dest[9] = 0;
	dest[10] = -2 / fn;
	dest[11] = 0;
	dest[12] = -(left + right) / rl;
	dest[13] = -(top + bottom) / tb;
	dest[14] = -(far + near) / fn;
	dest[15] = 1;
	return dest;
};

/*
 * mat4.ortho
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * Params:
 * eye - vec3, position of the viewer
 * center - vec3, point the viewer is looking at
 * up - vec3 pointing "up"
 * dest - Optional, mat4 frustum matrix will be written into
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
mat4.lookAt = function(eye, center, up, dest) {
	if(!dest) { dest = mat4.create(); }
	
	var eyex = eye[0],
		eyey = eye[1],
		eyez = eye[2],
		upx = up[0],
		upy = up[1],
		upz = up[2],
		centerx = center[0],
		centery = center[1],
		centerz = center[2];

	if (eyex == centerx && eyey == centery && eyez == centerz) {
		return mat4.identity(dest);
	}
	
	var z0,z1,z2,x0,x1,x2,y0,y1,y2,len;
	
	//vec3.direction(eye, center, z);
	z0 = eyex - center[0];
	z1 = eyey - center[1];
	z2 = eyez - center[2];
	
	// normalize (no check needed for 0 because of early return)
	len = 1/Math.sqrt(z0*z0 + z1*z1 + z2*z2);
	z0 *= len;
	z1 *= len;
	z2 *= len;
	
	//vec3.normalize(vec3.cross(up, z, x));
	x0 = upy*z2 - upz*z1;
	x1 = upz*z0 - upx*z2;
	x2 = upx*z1 - upy*z0;
	len = Math.sqrt(x0*x0 + x1*x1 + x2*x2);
	if (!len) {
		x0 = 0;
		x1 = 0;
		x2 = 0;
	} else {
		len = 1/len;
		x0 *= len;
		x1 *= len;
		x2 *= len;
	};
	
	//vec3.normalize(vec3.cross(z, x, y));
	y0 = z1*x2 - z2*x1;
	y1 = z2*x0 - z0*x2;
	y2 = z0*x1 - z1*x0;
	
	len = Math.sqrt(y0*y0 + y1*y1 + y2*y2);
	if (!len) {
		y0 = 0;
		y1 = 0;
		y2 = 0;
	} else {
		len = 1/len;
		y0 *= len;
		y1 *= len;
		y2 *= len;
	}
	
	dest[0] = x0;
	dest[1] = y0;
	dest[2] = z0;
	dest[3] = 0;
	dest[4] = x1;
	dest[5] = y1;
	dest[6] = z1;
	dest[7] = 0;
	dest[8] = x2;
	dest[9] = y2;
	dest[10] = z2;
	dest[11] = 0;
	dest[12] = -(x0*eyex + x1*eyey + x2*eyez);
	dest[13] = -(y0*eyex + y1*eyey + y2*eyez);
	dest[14] = -(z0*eyex + z1*eyey + z2*eyez);
	dest[15] = 1;
	
	return dest;
};

/*
 * mat4.str
 * Returns a string representation of a mat4
 *
 * Params:
 * mat - mat4 to represent as a string
 *
 * Returns:
 * string representation of mat
 */
mat4.str = function(mat) {
	return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] + ', ' + mat[3] + 
		',\n '+ mat[4] + ', ' + mat[5] + ', ' + mat[6] + ', ' + mat[7] + 
		',\n '+ mat[8] + ', ' + mat[9] + ', ' + mat[10] + ', ' + mat[11] + 
		',\n '+ mat[12] + ', ' + mat[13] + ', ' + mat[14] + ', ' + mat[15] + ']';
};

/*
 * quat4 - Quaternions 
 */
quat4 = {};

/*
 * quat4.create
 * Creates a new instance of a quat4 using the default array type
 * Any javascript array containing at least 4 numeric elements can serve as a quat4
 *
 * Params:
 * quat - Optional, quat4 containing values to initialize with
 *
 * Returns:
 * New quat4
 */
quat4.create = function(quat) {
	var dest;
	
	if(quat) {
		dest = new glMatrixArrayType(4);
		dest[0] = quat[0];
		dest[1] = quat[1];
		dest[2] = quat[2];
		dest[3] = quat[3];
	} else {
		if(glMatrixArrayType === Array)
			dest = new glMatrixArrayType([0,0,0,0]);
		else
			dest = new glMatrixArrayType(4);
	}
	
	return dest;
};

/*
 * quat4.set
 * Copies the values of one quat4 to another
 *
 * Params:
 * quat - quat4 containing values to copy
 * dest - quat4 receiving copied values
 *
 * Returns:
 * dest
 */
quat4.set = function(quat, dest) {
	dest[0] = quat[0];
	dest[1] = quat[1];
	dest[2] = quat[2];
	dest[3] = quat[3];
	
	return dest;
};

/*
 * quat4.calculateW
 * Calculates the W component of a quat4 from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length. 
 * Any existing W component will be ignored. 
 *
 * Params:
 * quat - quat4 to calculate W component of
 * dest - Optional, quat4 receiving calculated values. If not specified result is written to quat
 *
 * Returns:
 * dest if specified, quat otherwise
 */
quat4.calculateW = function(quat, dest) {
	var x = quat[0], y = quat[1], z = quat[2];

	if(!dest || quat == dest) {
		quat[3] = -Math.sqrt(Math.abs(1.0 - x*x - y*y - z*z));
		return quat;
	}
	dest[0] = x;
	dest[1] = y;
	dest[2] = z;
	dest[3] = -Math.sqrt(Math.abs(1.0 - x*x - y*y - z*z));
	return dest;
};

/*
 * quat4.inverse
 * Calculates the inverse of a quat4
 *
 * Params:
 * quat - quat4 to calculate inverse of
 * dest - Optional, quat4 receiving inverse values. If not specified result is written to quat
 *
 * Returns:
 * dest if specified, quat otherwise
 */
quat4.inverse = function(quat, dest) {
	if(!dest || quat == dest) {
		quat[0] *= -1;
		quat[1] *= -1;
		quat[2] *= -1;
		return quat;
	}
	dest[0] = -quat[0];
	dest[1] = -quat[1];
	dest[2] = -quat[2];
	dest[3] = quat[3];
	return dest;
};

/*
 * quat4.length
 * Calculates the length of a quat4
 *
 * Params:
 * quat - quat4 to calculate length of
 *
 * Returns:
 * Length of quat
 */
quat4.length = function(quat) {
	var x = quat[0], y = quat[1], z = quat[2], w = quat[3];
	return Math.sqrt(x*x + y*y + z*z + w*w);
};

/*
 * quat4.normalize
 * Generates a unit quaternion of the same direction as the provided quat4
 * If quaternion length is 0, returns [0, 0, 0, 0]
 *
 * Params:
 * quat - quat4 to normalize
 * dest - Optional, quat4 receiving operation result. If not specified result is written to quat
 *
 * Returns:
 * dest if specified, quat otherwise
 */
quat4.normalize = function(quat, dest) {
	if(!dest) { dest = quat; }
	
	var x = quat[0], y = quat[1], z = quat[2], w = quat[3];
	var len = Math.sqrt(x*x + y*y + z*z + w*w);
	if(len == 0) {
		dest[0] = 0;
		dest[1] = 0;
		dest[2] = 0;
		dest[3] = 0;
		return dest;
	}
	len = 1/len;
	dest[0] = x * len;
	dest[1] = y * len;
	dest[2] = z * len;
	dest[3] = w * len;
	
	return dest;
};

/*
 * quat4.multiply
 * Performs a quaternion multiplication
 *
 * Params:
 * quat - quat4, first operand
 * quat2 - quat4, second operand
 * dest - Optional, quat4 receiving operation result. If not specified result is written to quat
 *
 * Returns:
 * dest if specified, quat otherwise
 */
quat4.multiply = function(quat, quat2, dest) {
	if(!dest) { dest = quat; }
	
	var qax = quat[0], qay = quat[1], qaz = quat[2], qaw = quat[3];
	var qbx = quat2[0], qby = quat2[1], qbz = quat2[2], qbw = quat2[3];
	
	dest[0] = qax*qbw + qaw*qbx + qay*qbz - qaz*qby;
	dest[1] = qay*qbw + qaw*qby + qaz*qbx - qax*qbz;
	dest[2] = qaz*qbw + qaw*qbz + qax*qby - qay*qbx;
	dest[3] = qaw*qbw - qax*qbx - qay*qby - qaz*qbz;
	
	return dest;
};

/*
 * quat4.multiplyVec3
 * Transforms a vec3 with the given quaternion
 *
 * Params:
 * quat - quat4 to transform the vector with
 * vec - vec3 to transform
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
quat4.multiplyVec3 = function(quat, vec, dest) {
	if(!dest) { dest = vec; }
	
	var x = vec[0], y = vec[1], z = vec[2];
	var qx = quat[0], qy = quat[1], qz = quat[2], qw = quat[3];

	// calculate quat * vec
	var ix = qw*x + qy*z - qz*y;
	var iy = qw*y + qz*x - qx*z;
	var iz = qw*z + qx*y - qy*x;
	var iw = -qx*x - qy*y - qz*z;
	
	// calculate result * inverse quat
	dest[0] = ix*qw + iw*-qx + iy*-qz - iz*-qy;
	dest[1] = iy*qw + iw*-qy + iz*-qx - ix*-qz;
	dest[2] = iz*qw + iw*-qz + ix*-qy - iy*-qx;
	
	return dest;
};

/*
 * quat4.toMat3
 * Calculates a 3x3 matrix from the given quat4
 *
 * Params:
 * quat - quat4 to create matrix from
 * dest - Optional, mat3 receiving operation result
 *
 * Returns:
 * dest if specified, a new mat3 otherwise
 */
quat4.toMat3 = function(quat, dest) {
	if(!dest) { dest = mat3.create(); }
	
	var x = quat[0], y = quat[1], z = quat[2], w = quat[3];

	var x2 = x + x;
	var y2 = y + y;
	var z2 = z + z;

	var xx = x*x2;
	var xy = x*y2;
	var xz = x*z2;

	var yy = y*y2;
	var yz = y*z2;
	var zz = z*z2;

	var wx = w*x2;
	var wy = w*y2;
	var wz = w*z2;

	dest[0] = 1 - (yy + zz);
	dest[1] = xy - wz;
	dest[2] = xz + wy;

	dest[3] = xy + wz;
	dest[4] = 1 - (xx + zz);
	dest[5] = yz - wx;

	dest[6] = xz - wy;
	dest[7] = yz + wx;
	dest[8] = 1 - (xx + yy);
	
	return dest;
};

/*
 * quat4.toMat4
 * Calculates a 4x4 matrix from the given quat4
 *
 * Params:
 * quat - quat4 to create matrix from
 * dest - Optional, mat4 receiving operation result
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
quat4.toMat4 = function(quat, dest) {
	if(!dest) { dest = mat4.create(); }
	
	var x = quat[0], y = quat[1], z = quat[2], w = quat[3];

	var x2 = x + x;
	var y2 = y + y;
	var z2 = z + z;

	var xx = x*x2;
	var xy = x*y2;
	var xz = x*z2;

	var yy = y*y2;
	var yz = y*z2;
	var zz = z*z2;

	var wx = w*x2;
	var wy = w*y2;
	var wz = w*z2;

	dest[0] = 1 - (yy + zz);
	dest[1] = xy - wz;
	dest[2] = xz + wy;
	dest[3] = 0;

	dest[4] = xy + wz;
	dest[5] = 1 - (xx + zz);
	dest[6] = yz - wx;
	dest[7] = 0;

	dest[8] = xz - wy;
	dest[9] = yz + wx;
	dest[10] = 1 - (xx + yy);
	dest[11] = 0;

	dest[12] = 0;
	dest[13] = 0;
	dest[14] = 0;
	dest[15] = 1;
	
	return dest;
};

/*
 * quat4.slerp
 * Performs a spherical linear interpolation between two quat4
 *
 * Params:
 * quat - quat4, first quaternion
 * quat2 - quat4, second quaternion
 * slerp - interpolation amount between the two inputs
 * dest - Optional, quat4 receiving operation result. If not specified result is written to quat
 *
 * Returns:
 * dest if specified, quat otherwise
 */
quat4.slerp = function(quat, quat2, slerp, dest) {
    if(!dest) { dest = quat; }
    
	var cosHalfTheta =  quat[0]*quat2[0] + quat[1]*quat2[1] + quat[2]*quat2[2] + quat[3]*quat2[3];
	
	if (Math.abs(cosHalfTheta) >= 1.0){
	    if(dest != quat) {
		    dest[0] = quat[0];
		    dest[1] = quat[1];
		    dest[2] = quat[2];
		    dest[3] = quat[3];
		}
		return dest;
	}
	
	var halfTheta = Math.acos(cosHalfTheta);
	var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta*cosHalfTheta);

	if (Math.abs(sinHalfTheta) < 0.001){
		dest[0] = (quat[0]*0.5 + quat2[0]*0.5);
		dest[1] = (quat[1]*0.5 + quat2[1]*0.5);
		dest[2] = (quat[2]*0.5 + quat2[2]*0.5);
		dest[3] = (quat[3]*0.5 + quat2[3]*0.5);
		return dest;
	}
	
	var ratioA = Math.sin((1 - slerp)*halfTheta) / sinHalfTheta;
	var ratioB = Math.sin(slerp*halfTheta) / sinHalfTheta; 
	
	dest[0] = (quat[0]*ratioA + quat2[0]*ratioB);
	dest[1] = (quat[1]*ratioA + quat2[1]*ratioB);
	dest[2] = (quat[2]*ratioA + quat2[2]*ratioB);
	dest[3] = (quat[3]*ratioA + quat2[3]*ratioB);
	
	return dest;
};


/*
 * quat4.str
 * Returns a string representation of a quaternion
 *
 * Params:
 * quat - quat4 to represent as a string
 *
 * Returns:
 * string representation of quat
 */
quat4.str = function(quat) {
	return '[' + quat[0] + ', ' + quat[1] + ', ' + quat[2] + ', ' + quat[3] + ']'; 
};


define("glMatrix", ["typedefs"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.glMatrix;
    };
}(this)));

/*
<augmentedJS: A javascript library for natural feature tracking>
Copyright (C) 2011 
 - Christoph Oberhofer (ar.oberhofer@gmail.com)
 - Jens Grubert (jg@jensgrubert.de)
 - Gerhard Reitmayr (reitmayr@icg.tugraz.at)
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


/*
 * glMatrixAddon.js
 * Extension to the glMatrix library. The original glMatrix library
 * was created by Brandon Jones.
 */


mat4.xVec4 = function(mat, vec, dest){
	if(!dest) { dest = vec; }	
	var x = vec[0], y = vec[1], z = vec[2], w = vec[3];
	
	dest[0] = mat[0]*x + mat[1]*y + mat[2]*z + mat[3]*w;
	dest[1] = mat[4]*x + mat[5]*y + mat[6]*z + mat[7]*w;
	dest[2] = mat[8]*x + mat[9]*y + mat[10]*z + mat[11]*w;
	dest[3] = mat[12]*x + mat[13]*y + mat[14]*z + mat[15]*w;
	
	return dest;
};

mat3.scale = function(mat, scalar, dest){
	if(!dest || mat == dest) {
		mat[0] *= scalar;
		mat[1] *= scalar;
		mat[2] *= scalar;
		mat[3] *= scalar;
		mat[4] *= scalar;
		mat[5] *= scalar;
		mat[6] *= scalar;
		mat[7] *= scalar;
		mat[8] *= scalar;
		return mat;
	}
	dest = mat3.create();
	dest[0] = mat[0]*scalar;
	dest[1] = mat[1]*scalar;
	dest[2] = mat[2]*scalar;
	dest[3] = mat[3]*scalar;
	dest[4] = mat[4]*scalar;
	dest[5] = mat[5]*scalar;
	dest[6] = mat[6]*scalar;
	dest[7] = mat[7]*scalar;
	dest[8] = mat[8]*scalar;
	return dest;
};

mat3.inverse = function(mat, dest){
	if(!dest) { dest = mat; }
	
	var ha00 = mat[0], ha01 = mat[1], ha02 = mat[2];
	var ha10 = mat[3], ha11 = mat[4], ha12 = mat[5];
	var ha20 = mat[6], ha21 = mat[7], ha22 = mat[8];
	
	var invDetA = 1/(ha00*ha11*ha22 + ha01*ha12*ha20 + ha02*ha10*ha21 - ha02*ha11*ha20 - ha01*ha10*ha22 - ha00*ha12*ha21);
	dest[0] = (ha11*ha22 - ha12*ha21)*invDetA;
	dest[1] = (ha02*ha21 - ha01*ha22)*invDetA;
	dest[2] = (ha01*ha12 - ha02*ha11)*invDetA;
	dest[3] = (ha12*ha20 - ha10*ha22)*invDetA;
	dest[4] = (ha00*ha22 - ha02*ha20)*invDetA;
	dest[5] = (ha02*ha10 - ha00*ha12)*invDetA;
	dest[6] = (ha10*ha21 - ha11*ha20)*invDetA;
	dest[7] = (ha01*ha20 - ha00*ha21)*invDetA;
	dest[8] = (ha00*ha11 - ha01*ha10)*invDetA;
	return dest;
};

mat3.multiply = function(mat, mat2, dest) {
	if(!dest) { dest = mat; }
	
	var ha00 = mat[0], ha01 = mat[1], ha02 = mat[2];
	var ha10 = mat[3], ha11 = mat[4], ha12 = mat[5];
	var ha20 = mat[6], ha21 = mat[7], ha22 = mat[8];
	
	var hb00 = mat2[0], hb01 = mat2[1], hb02 = mat2[2];
	var hb10 = mat2[3], hb11 = mat2[4], hb12 = mat2[5];
	var hb20 = mat2[6], hb21 = mat2[7], hb22 = mat2[8];
	
	dest[0] = ha00*hb00 + ha01*hb10 + ha02*hb20;
	dest[1] = ha00*hb01 + ha01*hb11 + ha02*hb21;
	dest[2] = ha00*hb02 + ha01*hb12 + ha02*hb22;
	
	dest[3] = ha10*hb00 + ha11*hb10 + ha12*hb20;
	dest[4] = ha10*hb01 + ha11*hb11 + ha12*hb21;
	dest[5] = ha10*hb02 + ha11*hb12 + ha12*hb22;
	
	dest[6] = ha20*hb00 + ha21*hb10 + ha22*hb20;
	dest[7] = ha20*hb01 + ha21*hb11 + ha22*hb21;
	dest[8] = ha20*hb02 + ha21*hb12 + ha22*hb22;
	return dest;
};

mat3.xVec3 = function(mat, vec, dest){
	if(!dest) { dest = vec; }
	var x = vec[0], y = vec[1], z = vec[2];
	
	dest[0] = mat[0]*x + mat[1]*y + mat[2]*z;
	dest[1] = mat[3]*x + mat[4]*y + mat[5]*z;
	dest[2] = mat[6]*x + mat[7]*y + mat[8]*z;
	
	return dest;
};

var vec4={};

vec4.create = function(vec){
	var dest;
	
	if(vec) {
		dest = new glMatrixArrayType(4);
		dest[0] = vec[0];
		dest[1] = vec[1];
		dest[2] = vec[2];
		dest[3] = vec[3];
	} else {
		if(glMatrixArrayType === Array)
			dest = new glMatrixArrayType([0,0,0,0]);
		else
			dest = new glMatrixArrayType(4);
	}
	
	return dest;
};

vec4.project = function(vec, dest){
	if(!dest) { dest = vec; }
	
	dest[0] = vec[0]/vec[3];
	dest[1] = vec[1]/vec[3];
	dest[2] = vec[2]/vec[3];
	return dest;
};

vec4.scale = function(vec, val, dest){
	if(!dest || vec == dest) {
		vec[0] *= val;
		vec[1] *= val;
		vec[2] *= val;
		vec[4] *= val;
		return vec;
	}
	
	dest[0] = vec[0]*val;
	dest[1] = vec[1]*val;
	dest[2] = vec[2]*val;
	dest[3] = vec[3]*val;
	return dest;
};

vec4.xMat4 = function(vec, mat, dest){
	if(!dest) { dest = vec; }
	
	var x = vec[0], y = vec[1], z = vec[2], w = vec[3];
	
	dest[0] = mat[0]*x + mat[4]*y + mat[8]*z + mat[12]*w;
	dest[1] = mat[1]*x + mat[5]*y + mat[9]*z + mat[13]*w;
	dest[2] = mat[2]*x + mat[6]*y + mat[10]*z + mat[14]*w;
	dest[3] = mat[3]*x + mat[7]*y + mat[11]*z + mat[15]*w;
	
	return dest;
};


var mat2 = {};

mat2.create = function(mat){
	var dest;
	
	if(mat) {
		dest = new glMatrixArrayType(4);
		dest[0] = mat[0];
		dest[1] = mat[1];
		dest[2] = mat[2];
		dest[3] = mat[3];
	} else {
		if(glMatrixArrayType === Array)
			dest  = new glMatrixArrayType([0,0,0,0]);
		else
			dest = new glMatrixArrayType(4);
	}
	
	return dest;
};

mat2.xVec2 = function(mat, vec, dest){
	if(!dest) { dest = vec; }
	var x = vec[0], y = vec[1];
	
	dest[0] = mat[0]*x + mat[1]*y;
	dest[1] = mat[2]*x + mat[3]*y;
	
	return dest;
};

mat2.scale = function(mat, scale, dest){
	if(!dest || mat == dest) {
		mat[0] *= scale;
		mat[1] *= scale;
		mat[2] *= scale;
		mat[3] *= scale;
		return mat;
	}
	
	dest[0] = mat[0]*scale;
	dest[1] = mat[1]*scale;
	dest[2] = mat[2]*scale;
	dest[3] = mat[3]*scale;
	return dest;
};

mat2.determinant = function(mat){
	return mat[0]*mat[3] - mat[1]*mat[2];
};

mat2.inverse = function(mat){
  var scale = 1/(mat2.determinant(mat));
  var a = mat[3]*scale,
      b = -mat[1]*scale,
      c = -mat[2]*scale,
      d = mat[0];
  mat[0] = a;
  mat[1] = b;
  mat[2] = c;
  mat[3] = d;
  return mat;
};

var vec2 = {};
vec2.create = function(vec){
	var dest;
	
	if(vec) {
		dest = new glMatrixArrayType(2);
		dest[0] = vec[0];
		dest[1] = vec[1];
	} else {
		if(glMatrixArrayType === Array)
			dest = new glMatrixArrayType([0,0]);
		else
			dest = new glMatrixArrayType(2);
	}
	
	return dest;
};

vec2.subtract = function(vec, vec2, dest) {
	if(!dest || vec == dest) {
		vec[0] -= vec2[0];
		vec[1] -= vec2[1];
		return vec;
	}
	
	dest[0] = vec[0] - vec2[0];
	dest[1] = vec[1] - vec2[1];
	return dest;
};

vec2.add = function(vec, vec2, dest) {
	if(!dest || vec == dest) {
		vec[0] += vec2[0];
		vec[1] += vec2[1];
		return vec;
	}
	
	dest[0] = vec[0] + vec2[0];
	dest[1] = vec[1] + vec2[1];
	return dest;
};

vec2.scale = function(vec, val, dest) {
	if(!dest || vec == dest) {
		vec[0] *= val;
		vec[1] *= val;
		return vec;
	}
	
	dest[0] = vec[0]*val;
	dest[1] = vec[1]*val;
	return dest;
};

vec2.normalize = function(vec, dest) {
  if(!dest) { dest = vec; }
  
  var x = vec[0], y = vec[1];
  var len = Math.sqrt(x*x + y*y);
  
  if (!len) {
    dest[0] = 0;
    dest[1] = 0;
    return dest;
  } else if (len == 1) {
    dest[0] = x;
    dest[1] = y;
    return dest;
  }
  
  len = 1 / len;
  dest[0] = x*len;
  dest[1] = y*len;
  return dest;
};

vec2.dot = function(vec, vec2){
  return vec[0]*vec2[0] + vec[1]*vec2[1];
};

vec2.multiply = function(vec, vec2, dest){
  if(!dest) { dest = vec; }
  
  dest[0] = vec[0]*vec2[0];
  dest[1] = vec[1]*vec2[1];
  return dest;
};

/**
 * @param vec vec2 to be unprojected [x,y] -> [x,y,1]
 * @returns vec3 unprojected vector
 */
vec2.unproject = function(vec){
	return vec3.create([vec[0], vec[1], 1]);
};

vec2.length = function(vec){
  return Math.sqrt(vec[0]*vec[0] + vec[1]*vec[1]);
};

vec2.perspectiveProject = function(vec){
  var result = vec2.create(vec);
  return vec2.scale(result, 1/vec[2]);
};

/**
 * @param vec vec3 to be projected [x,y,z] -> [x/z,y/z]
 * @returns vec2 projected vector
 */
vec3.project = function(vec){
	return vec2.scale(vec2.create(vec), 1/vec[2]);
};

var vec6 = {};
vec6.scale = function(vec, val, dest){
	if(!dest || vec == dest) {
		vec[0] *= val;
		vec[1] *= val;
		vec[2] *= val;
		vec[3] *= val;
		vec[4] *= val;
		vec[5] *= val;
		return vec;
	}
	
	dest[0] = vec[0]*val;
	dest[1] = vec[1]*val;
	dest[2] = vec[2]*val;
	dest[3] = vec[3]*val;
	dest[4] = vec[4]*val;
	dest[5] = vec[5]*val;
	return dest;
};

vec6.subtract = function(vec, vec2, dest){
	if(!dest || vec == dest) {
		vec[0] -= vec2[0];
		vec[1] -= vec2[1];
		vec[2] -= vec2[2];
		vec[3] -= vec2[3];
		vec[4] -= vec2[4];
		vec[5] -= vec2[5];
		return vec;
	}
	
	dest[0] = vec[0] - vec2[0];
	dest[1] = vec[1] - vec2[1];
	dest[2] = vec[2] - vec2[2];
	dest[3] = vec[3] - vec2[3];
	dest[4] = vec[4] - vec2[4];
	dest[5] = vec[5] - vec2[5];
	return dest;
};

vec6.dot = function(vec, vec2){
	return vec[0]*vec2[0] + vec[1]*vec2[1] + vec[2]*vec2[2] + vec[3]*vec2[3] + vec[4]*vec2[4] + vec[5]*vec2[5];
};

var mat6 = {};
mat6.xVec6 = function(mat, vec, dest){
	if(!dest) { dest = vec; }	
	var x = vec[0], y = vec[1], z = vec[2], u = vec[3], w = vec[4], v = vec[5];
	
	dest[0] = mat[0]*x + mat[1]*y + mat[2]*z + mat[3]*u + mat[4]*w + mat[5]*v;
	dest[1] = mat[6]*x + mat[7]*y + mat[8]*z + mat[9]*u + mat[10]*w + mat[11]*v;
	dest[2] = mat[12]*x + mat[13]*y + mat[14]*z + mat[15]*u + mat[16]*w + mat[17]*v;
	dest[3] = mat[18]*x + mat[19]*y + mat[20]*z + mat[21]*u + mat[22]*w + mat[23]*v;
	dest[4] = mat[24]*x + mat[25]*y + mat[26]*z + mat[27]*u + mat[28]*w + mat[29]*v;
	dest[5] = mat[30]*x + mat[31]*y + mat[32]*z + mat[33]*u + mat[34]*w + mat[35]*v;
	
	return dest;
};

mat3.xVec3 = function(mat, vec, dest){
	if(!dest) { dest = vec; }	
	var x = vec[0], y = vec[1], z = vec[2];
	
	dest[0] = mat[0]*x + mat[1]*y + mat[2]*z;
	dest[1] = mat[3]*x + mat[4]*y + mat[5]*z;
	dest[2] = mat[6]*x + mat[7]*y + mat[8]*z;
	
	return dest;
};
define("glMatrixAddon", ["glMatrix"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.glMatrixAddon;
    };
}(this)));

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('array_helper',[],function() {
    

    return {
        init : function(arr, val) {
            var l = arr.length;
            while (l--) {
                arr[l] = val;
            }
        },

        /**
         * Shuffles the content of an array
         * @return {Array} the array itself shuffled
         */
        shuffle : function(arr) {
            var i = arr.length - 1, j, x;
            for (i; i >= 0; i--) {
                j = Math.floor(Math.random() * i);
                x = arr[i];
                arr[i] = arr[j];
                arr[j] = x;
            }
            return arr;
        },

        toPointList : function(arr) {
            var i, j, row = [], rows = [];
            for ( i = 0; i < arr.length; i++) {
                row = [];
                for ( j = 0; j < arr[i].length; j++) {
                    row[j] = arr[i][j];
                }
                rows[i] = "[" + row.join(",") + "]";
            }
            return "[" + rows.join(",\r\n") + "]";
        },

        /**
         * returns the elements which's score is bigger than the threshold
         * @return {Array} the reduced array
         */
        threshold : function(arr, threshold, scoreFunc) {
            var i, queue = [];
            for ( i = 0; i < arr.length; i++) {
                if (scoreFunc.apply(arr, [arr[i]]) >= threshold) {
                    queue.push(arr[i]);
                }
            }
            return queue;
        },

        maxIndex : function(arr) {
            var i, max = 0;
            for ( i = 0; i < arr.length; i++) {
                if (arr[i] > arr[max]) {
                    max = i;
                }
            }
            return max;
        },

        max : function(arr) {
            var i, max = 0;
            for ( i = 0; i < arr.length; i++) {
                if (arr[i] > max) {
                    max = arr[i];
                }
            }
            return max;
        }
    };
}); 
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define, vec2, vec3 */

define('cv_utils',['cluster', 'glMatrixAddon', "array_helper"], function(Cluster2, glMatrixAddon, ArrayHelper) {

    
    /*
    * cv_utils.js
    * Collection of CV functions and libraries
    */

    /**
     * Namespace for various CV alorithms
     * @class Represents a collection of useful CV algorithms/functions
     */

    var CVUtils = {};

    /**
     * @param x x-coordinate
     * @param y y-coordinate
     * @return ImageReference {x,y} Coordinate
     */
    CVUtils.imageRef = function(x, y) {
        var that = {
            x : x,
            y : y,
            toVec2 : function() {
                return vec2.create([this.x, this.y]);
            },
            toVec3 : function() {
                return vec3.create([this.x, this.y, 1]);
            },
            round : function() {
                this.x = this.x > 0.0 ? Math.floor(this.x + 0.5) : Math.floor(this.x - 0.5);
                this.y = this.y > 0.0 ? Math.floor(this.y + 0.5) : Math.floor(this.y - 0.5);
                return this;
            }
        };
        return that;
    };

    /**
     * Computes an integral image of a given grayscale image.
     * @param imageDataContainer {ImageDataContainer} the image to be integrated
     */
    CVUtils.computeIntegralImage2 = function(imageWrapper, integralWrapper) {
        var imageData = imageWrapper.data;
        var width = imageWrapper.size.x;
        var height = imageWrapper.size.y;
        var integralImageData = integralWrapper.data;
        var sum = 0, posA = 0, posB = 0, posC = 0, posD = 0, x, y;

        // sum up first column
        posB = width;
        sum = 0;
        for ( y = 1; y < height; y++) {
            sum += imageData[posA];
            integralImageData[posB] += sum;
            posA += width;
            posB += width;
        }

        posA = 0;
        posB = 1;
        sum = 0;
        for ( x = 1; x < width; x++) {
            sum += imageData[posA];
            integralImageData[posB] += sum;
            posA++;
            posB++;
        }

        for ( y = 1; y < height; y++) {
            posA = y * width + 1;
            posB = (y - 1) * width + 1;
            posC = y * width;
            posD = (y - 1) * width;
            for ( x = 1; x < width; x++) {
                integralImageData[posA] += imageData[posA] + integralImageData[posB] + integralImageData[posC] - integralImageData[posD];
                posA++;
                posB++;
                posC++;
                posD++;
            }
        }
    };

    CVUtils.computeIntegralImage = function(imageWrapper, integralWrapper) {
        var imageData = imageWrapper.data;
        var width = imageWrapper.size.x;
        var height = imageWrapper.size.y;
        var integralImageData = integralWrapper.data;
        var sum = 0;

        // sum up first row
        for (var i = 0; i < width; i++) {
            sum += imageData[i];
            integralImageData[i] = sum;
        }

        for (var v = 1; v < height; v++) {
            sum = 0;
            for (var u = 0; u < width; u++) {
                sum += imageData[v * width + u];
                integralImageData[((v) * width) + u] = sum + integralImageData[(v - 1) * width + u];
            }
        }
    };

    CVUtils.thresholdImage = function(imageWrapper, threshold, targetWrapper) {
        if (!targetWrapper) {
            targetWrapper = imageWrapper;
        }
        var imageData = imageWrapper.data, length = imageData.length, targetData = targetWrapper.data;

        while (length--) {
            targetData[length] = imageData[length] < threshold ? 1 : 0;
        }
    };

    CVUtils.computeHistogram = function(imageWrapper) {
        var imageData = imageWrapper.data, length = imageData.length, i, hist = new Int32Array(256);

        // init histogram
        for ( i = 0; i < 256; i++) {
            hist[i] = 0;
        }

        while (length--) {
            hist[imageData[length]]++;
        }
        return hist;
    };

    CVUtils.otsuThreshold = function(imageWrapper, targetWrapper) {
        var hist, threshold;

        function px(init, end) {
            var sum = 0, i;
            for ( i = init; i <= end; i++) {
                sum += hist[i];
            }
            return sum;
        }

        function mx(init, end) {
            var i, sum = 0;

            for ( i = init; i <= end; i++) {
                sum += i * hist[i];
            }

            return sum;
        }

        function determineThreshold() {
            var vet = [0], p1, p2, p12, k, m1, m2, m12;

            hist = CVUtils.computeHistogram(imageWrapper);
            for ( k = 1; k < 255; k++) {
                p1 = px(0, k);
                p2 = px(k + 1, 255);
                p12 = p1 * p2;
                if (p12 === 0) {
                    p12 = 1;
                }
                m1 = mx(0, k) * p2;
                m2 = mx(k + 1, 255) * p1;
                m12 = m1 - m2;
                vet[k] = m12 * m12 / p12;
            }
            return ArrayHelper.maxIndex(vet);
        }

        threshold = determineThreshold();
        CVUtils.thresholdImage(imageWrapper, threshold, targetWrapper);
        return threshold;
    };

    // local thresholding
    CVUtils.computeBinaryImage = function(imageWrapper, integralWrapper, targetWrapper) {
        CVUtils.computeIntegralImage(imageWrapper, integralWrapper);

        if (!targetWrapper) {
            targetWrapper = imageWrapper;
        }
        var imageData = imageWrapper.data;
        var targetData = targetWrapper.data;
        var width = imageWrapper.size.x;
        var height = imageWrapper.size.y;
        var integralImageData = integralWrapper.data;
        var sum = 0, v, u, kernel = 3, A, B, C, D, avg, size = (kernel * 2 + 1) * (kernel * 2 + 1);

        // clear out top & bottom-border
        for ( v = 0; v <= kernel; v++) {
            for ( u = 0; u < width; u++) {
                targetData[((v) * width) + u] = 0;
                targetData[(((height - 1) - v) * width) + u] = 0;
            }
        }

        // clear out left & right border
        for ( v = kernel; v < height - kernel; v++) {
            for ( u = 0; u <= kernel; u++) {
                targetData[((v) * width) + u] = 0;
                targetData[((v) * width) + (width - 1 - u)] = 0;
            }
        }

        for ( v = kernel + 1; v < height - kernel - 1; v++) {
            for ( u = kernel + 1; u < width - kernel; u++) {
                A = integralImageData[(v - kernel - 1) * width + (u - kernel - 1)];
                B = integralImageData[(v - kernel - 1) * width + (u + kernel)];
                C = integralImageData[(v + kernel) * width + (u - kernel - 1)];
                D = integralImageData[(v + kernel) * width + (u + kernel)];
                sum = D - C - B + A;
                avg = sum / (size);
                targetData[v * width + u] = imageData[v * width + u] > (avg + 5) ? 0 : 1;
            }
        }
    };

    CVUtils.cluster = function(points, threshold, property) {
        var i, k, cluster, point, clusters = [];

        if (!property) {
            property = "rad";
        }

        function addToCluster(point) {
            var found = false;
            for ( k = 0; k < clusters.length; k++) {
                cluster = clusters[k];
                if (cluster.fits(point)) {
                    cluster.add(point);
                    found = true;
                }
            }
            return found;
        }

        // iterate over each cloud
        for ( i = 0; i < points.length; i++) {
            point = Cluster2.createPoint(points[i], i, property);
            if (!addToCluster(point)) {
                clusters.push(Cluster2.create(point, threshold));
            }
        }

        return clusters;

    };

    CVUtils.Tracer = {
        trace : function(points, vec) {
            var iteration, maxIterations = 10, top = [], result = [], centerPos = 0, currentPos = 0;

            function trace(idx, forward) {
                var from, to, toIdx, predictedPos, thresholdX = 1, thresholdY = Math.abs(vec[1] / 10), found = false;

                function match(pos, predicted) {
                    if (pos.x > (predicted.x - thresholdX) && pos.x < (predicted.x + thresholdX) && pos.y > (predicted.y - thresholdY) && pos.y < (predicted.y + thresholdY)) {
                        return true;
                    } else {
                        return false;
                    }
                }

                // check if the next index is within the vec specifications
                // if not, check as long as the threshold is met

                from = points[idx];
                if (forward) {
                    predictedPos = {
                        x : from.x + vec[0],
                        y : from.y + vec[1]
                    };
                } else {
                    predictedPos = {
                        x : from.x - vec[0],
                        y : from.y - vec[1]
                    };
                }

                toIdx = forward ? idx + 1 : idx - 1;
                to = points[toIdx];
                while (to && ( found = match(to, predictedPos)) !== true && (Math.abs(to.y - from.y) < vec[1])) {
                    toIdx = forward ? toIdx + 1 : toIdx - 1;
                    to = points[toIdx];
                }

                return found ? toIdx : null;
            }

            for ( iteration = 0; iteration < maxIterations; iteration++) {
                // randomly select point to start with
                centerPos = Math.floor(Math.random() * points.length);

                // trace forward
                top = [];
                currentPos = centerPos;
                top.push(points[currentPos]);
                while (( currentPos = trace(currentPos, true)) !== null) {
                    top.push(points[currentPos]);
                }
                if (centerPos > 0) {
                    currentPos = centerPos;
                    while (( currentPos = trace(currentPos, false)) !== null) {
                        top.push(points[currentPos]);
                    }
                }

                if (top.length > result.length) {
                    result = top;
                }
            }

            return result;

        }
    };

    CVUtils.DILATE = 1;
    CVUtils.ERODE = 2;

    CVUtils.dilate = function(inImageWrapper, outImageWrapper) {
        var v, u, inImageData = inImageWrapper.data, outImageData = outImageWrapper.data, height = inImageWrapper.size.y, width = inImageWrapper.size.x, sum, yStart1, yStart2, xStart1, xStart2;

        for ( v = 1; v < height - 1; v++) {
            for ( u = 1; u < width - 1; u++) {
                yStart1 = v - 1;
                yStart2 = v + 1;
                xStart1 = u - 1;
                xStart2 = u + 1;
                sum = inImageData[yStart1 * width + xStart1]/* +   inImageData[yStart1*width+u] */ + inImageData[yStart1 * width + xStart2] +
                /* inImageData[v*width+xStart1]  + */
                inImageData[v * width + u] + /* inImageData[v*width+xStart2] +*/
                inImageData[yStart2 * width + xStart1]/* +   inImageData[yStart2*width+u]*/ + inImageData[yStart2 * width + xStart2];
                outImageData[v * width + u] = sum > 0 ? 1 : 0;
            }
        }
    };

    CVUtils.erode = function(inImageWrapper, outImageWrapper) {
        var v, u, inImageData = inImageWrapper.data, outImageData = outImageWrapper.data, height = inImageWrapper.size.y, width = inImageWrapper.size.x, sum, yStart1, yStart2, xStart1, xStart2;

        for ( v = 1; v < height - 1; v++) {
            for ( u = 1; u < width - 1; u++) {
                yStart1 = v - 1;
                yStart2 = v + 1;
                xStart1 = u - 1;
                xStart2 = u + 1;
                sum = inImageData[yStart1 * width + xStart1]/* +   inImageData[yStart1*width+u] */ + inImageData[yStart1 * width + xStart2] +
                /* inImageData[v*width+xStart1]  + */
                inImageData[v * width + u] + /* inImageData[v*width+xStart2] +*/
                inImageData[yStart2 * width + xStart1]/* +   inImageData[yStart2*width+u]*/ + inImageData[yStart2 * width + xStart2];
                outImageData[v * width + u] = sum === 5 ? 1 : 0;
            }
        }
    };

    CVUtils.subtract = function(aImageWrapper, bImageWrapper, resultImageWrapper) {
        if (!resultImageWrapper) {
            resultImageWrapper = aImageWrapper;
        }
        var length = aImageWrapper.data.length, aImageData = aImageWrapper.data, bImageData = bImageWrapper.data, cImageData = resultImageWrapper.data;

        while (length--) {
            cImageData[length] = aImageData[length] - bImageData[length];
        }
    };

    CVUtils.bitwiseOr = function(aImageWrapper, bImageWrapper, resultImageWrapper) {
        if (!resultImageWrapper) {
            resultImageWrapper = aImageWrapper;
        }
        var length = aImageWrapper.data.length, aImageData = aImageWrapper.data, bImageData = bImageWrapper.data, cImageData = resultImageWrapper.data;

        while (length--) {
            cImageData[length] = aImageData[length] || bImageData[length];
        }
    };

    CVUtils.countNonZero = function(imageWrapper) {
        var length = imageWrapper.data.length, data = imageWrapper.data, sum = 0;

        while (length--) {
            sum += data[length];
        }
        return sum;
    };

    CVUtils.topGeneric = function(list, top, scoreFunc) {
        var i, minIdx = 0, min = 0, queue = [], score, hit, pos;

        for ( i = 0; i < top; i++) {
            queue[i] = {
                score : 0,
                item : null
            };
        }

        for ( i = 0; i < list.length; i++) {
            score = scoreFunc.apply(this, [list[i]]);
            if (score > min) {
                hit = queue[minIdx];
                hit.score = score;
                hit.item = list[i];
                min = Number.MAX_VALUE;
                for ( pos = 0; pos < top; pos++) {
                    if (queue[pos].score < min) {
                        min = queue[pos].score;
                        minIdx = pos;
                    }
                }
            }
        }

        return queue;
    };

    CVUtils.grayArrayFromImage = function(htmlImage, offsetX, ctx, array) {
        ctx.drawImage(htmlImage, offsetX, 0, htmlImage.width, htmlImage.height);
        var ctxData = ctx.getImageData(offsetX, 0, htmlImage.width, htmlImage.height).data;
        CVUtils.computeGray(ctxData, array);
    };

    CVUtils.grayArrayFromContext = function(ctx, size, offset, array) {
        var ctxData = ctx.getImageData(offset.x, offset.y, size.x, size.y).data;
        CVUtils.computeGray(ctxData, array);
    };

    CVUtils.grayAndHalfSampleFromCanvasData = function(canvasData, size, outArray) {
        var topRowIdx = 0;
        var bottomRowIdx = size.x;
        var endIdx = Math.floor(canvasData.length / 4);
        var outWidth = size.x / 2;
        var outImgIdx = 0;
        var inWidth = size.x;
        var i;

        while (bottomRowIdx < endIdx) {
            for ( i = 0; i < outWidth; i++) {
                outArray[outImgIdx] = Math.floor(((0.299 * canvasData[topRowIdx * 4 + 0] + 0.587 * canvasData[topRowIdx * 4 + 1] + 0.114 * canvasData[topRowIdx * 4 + 2]) + (0.299 * canvasData[(topRowIdx + 1) * 4 + 0] + 0.587 * canvasData[(topRowIdx + 1) * 4 + 1] + 0.114 * canvasData[(topRowIdx + 1) * 4 + 2]) + (0.299 * canvasData[(bottomRowIdx) * 4 + 0] + 0.587 * canvasData[(bottomRowIdx) * 4 + 1] + 0.114 * canvasData[(bottomRowIdx) * 4 + 2]) + (0.299 * canvasData[(bottomRowIdx + 1) * 4 + 0] + 0.587 * canvasData[(bottomRowIdx + 1) * 4 + 1] + 0.114 * canvasData[(bottomRowIdx + 1) * 4 + 2])) / 4);
                outImgIdx++;
                topRowIdx = topRowIdx + 2;
                bottomRowIdx = bottomRowIdx + 2;
            }
            topRowIdx = topRowIdx + inWidth;
            bottomRowIdx = bottomRowIdx + inWidth;
        }

    };

    CVUtils.computeGray = function(imageData, outArray) {
        var l = imageData.length / 4;
        var i = 0;
        for ( i = 0; i < l; i++) {
            //outArray[i] = (0.299*imageData[i*4+0] + 0.587*imageData[i*4+1] + 0.114*imageData[i*4+2]);

            outArray[i] = Math.floor(0.299 * imageData[i * 4 + 0] + 0.587 * imageData[i * 4 + 1] + 0.114 * imageData[i * 4 + 2]);
        }
    };

    CVUtils.loadImageArray = function(src, callback, canvas) {
        if (!canvas)
            canvas = document.createElement('canvas');
        var img = new Image();
        img.callback = callback;
        img.onload = function() {
            canvas.width = this.width;
            canvas.height = this.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(this, 0, 0);
            var array = new Uint8Array(this.width * this.height);
            ctx.drawImage(this, 0, 0);
            var data = ctx.getImageData(0, 0, this.width, this.height).data;
            CVUtils.computeGray(data, array);
            this.callback(array, {
                x : this.width,
                y : this.height
            }, this);
        };
        img.src = src;
    };

    /**
     * @param inImg {ImageWrapper} input image to be sampled
     * @param outImg {ImageWrapper} to be stored in
     */
    CVUtils.halfSample = function(inImgWrapper, outImgWrapper) {
        var inImg = inImgWrapper.data;
        var inWidth = inImgWrapper.size.x;
        var outImg = outImgWrapper.data;
        var topRowIdx = 0;
        var bottomRowIdx = inWidth;
        var endIdx = inImg.length;
        var outWidth = inWidth / 2;
        var outImgIdx = 0;
        while (bottomRowIdx < endIdx) {
            for (var i = 0; i < outWidth; i++) {
                outImg[outImgIdx] = Math.floor((inImg[topRowIdx] + inImg[topRowIdx + 1] + inImg[bottomRowIdx] + inImg[bottomRowIdx + 1]) / 4);
                outImgIdx++;
                topRowIdx = topRowIdx + 2;
                bottomRowIdx = bottomRowIdx + 2;
            }
            topRowIdx = topRowIdx + inWidth;
            bottomRowIdx = bottomRowIdx + inWidth;
        }
    };

    CVUtils.hsv2rgb = function(hsv, rgb) {
        var h = hsv[0], s = hsv[1], v = hsv[2], c = v * s, x = c * (1 - Math.abs((h / 60) % 2 - 1)), m = v - c, r = 0, g = 0, b = 0;
        rgb = rgb || [0, 0, 0];

        if (h < 60) {
            r = c;
            g = x;
        } else if (h < 120) {
            r = x;
            g = c;
        } else if (h < 180) {
            g = c;
            b = x;
        } else if (h < 240) {
            g = x;
            b = c;
        } else if (h < 300) {
            r = x;
            b = c;
        } else if (h < 360) {
            r = c;
            b = x;
        }
        rgb[0] = ((r + m) * 255) | 0;
        rgb[1] = ((g + m) * 255) | 0;
        rgb[2] = ((b + m) * 255) | 0;
        return rgb;
    };

    return (CVUtils);
});


/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define, vec2, mat2  */

define('image_wrapper',[
    "subImage",
    "cv_utils",
    "array_helper"
    ], 
    function(SubImage, CVUtils, ArrayHelper) {
    
    

    /**
     * Represents a basic image combining the data and size.
     * In addition, some methods for manipulation are contained.
     * @param size {x,y} The size of the image in pixel
     * @param data {Array} If given, a flat array containing the pixel data
     * @param ArrayType {Type} If given, the desired DataType of the Array (may be typed/non-typed)
     * @param initialize {Boolean} Indicating if the array should be initialized on creation.
     * @returns {ImageWrapper}
     */
    function ImageWrapper(size, data, ArrayType, initialize) {
        if (!data) {
            if (ArrayType) {
                this.data = new ArrayType(size.x * size.y);
                if (ArrayType === Array && initialize) {
                    ArrayHelper.init(this.data, 0);
                }
            } else {
                this.data = new Uint8Array(size.x * size.y);
                if (Uint8Array === Array && initialize) {
                    ArrayHelper.init(this.data, 0);
                }
            }

        } else {
            this.data = data;
        }
        this.size = size;
    }

    /**
     * tests if a position is within the image with a given offset
     * @param imgRef {x, y} The location to test
     * @param border Number the padding value in pixel
     * @returns {Boolean} true if location inside the image's border, false otherwise
     * @see cvd/image.h
     */
    ImageWrapper.prototype.inImageWithBorder = function(imgRef, border) {
        return (imgRef.x >= border) && (imgRef.y >= border) && (imgRef.x < (this.size.x - border)) && (imgRef.y < (this.size.y - border));
    };

    /**
     * Transforms an image according to the given affine-transformation matrix.
     * @param inImg ImageWrapper a image containing the information to be extracted.
     * @param outImg ImageWrapper the image to be filled.  The whole image out image is filled by the in image.
     * @param M mat2 the matrix used to map point in the out matrix to those in the in matrix
     * @param inOrig vec2 origin in the in image
     * @param outOrig vec2 origin in the out image
     * @returns Number the number of pixels not in the in image
     * @see cvd/vision.h
     */
    ImageWrapper.transform = function(inImg, outImg, M, inOrig, outOrig) {
        var w = outImg.size.x, h = outImg.size.y, iw = inImg.size.x, ih = inImg.size.y;
        var across = vec2.create([M[0], M[2]]);
        var down = vec2.create([M[1], M[3]]);
        var defaultValue = 0;

        var p0 = vec2.subtract(inOrig, mat2.xVec2(M, outOrig, vec2.create()), vec2.create());

        var min_x = p0[0], min_y = p0[1];
        var max_x = min_x, max_y = min_y;
        var p, i, j;

        var sampleFunc = ImageWrapper.sample;

        if (across[0] < 0)
            min_x += w * across[0];
        else
            max_x += w * across[0];

        if (down[0] < 0)
            min_x += h * down[0];
        else
            max_x += h * down[0];

        if (across[1] < 0)
            min_y += w * across[1];
        else
            max_y += w * across[1];

        if (down[1] < 0)
            min_y += h * down[1];
        else
            max_y += h * down[1];

        var carrigeReturn = vec2.subtract(down, vec2.scale(across, w, vec2.create()), vec2.create());

        if (min_x >= 0 && min_y >= 0 && max_x < iw - 1 && max_y < ih - 1) {
            p = p0;
            for ( i = 0; i < h; ++i, vec2.add(p, carrigeReturn))
                for ( j = 0; j < w; ++j, vec2.add(p, across))
                    outImg.set(j, i, sampleFunc(inImg, p[0], p[1]));
            return 0;
        } else {
            var x_bound = iw - 1;
            var y_bound = ih - 1;
            var count = 0;
            p = p0;
            for ( i = 0; i < h; ++i, vec2.add(p, carrigeReturn)) {
                for ( j = 0; j < w; ++j, vec2.add(p, across)) {
                    if (0 <= p[0] && 0 <= p[1] && p[0] < x_bound && p[1] < y_bound) {
                        outImg.set(j, i, sampleFunc(inImg, p[0], p[1]));
                    } else {
                        outImg.set(j, i, defaultValue); ++count;
                    }
                }
            }
            return count;
        }
    };

    /**
     * Performs bilinear sampling
     * @param inImg Image to extract sample from
     * @param x the x-coordinate
     * @param y the y-coordinate
     * @returns the sampled value
     * @see cvd/vision.h
     */
    ImageWrapper.sample = function(inImg, x, y) {
        var lx = Math.floor(x);
        var ly = Math.floor(y);
        var w = inImg.size.x;
        var base = ly * inImg.size.x + lx;
        var a = inImg.data[base + 0];
        var b = inImg.data[base + 1];
        var c = inImg.data[base + w];
        var d = inImg.data[base + w + 1];
        var e = a - b;
        x -= lx;
        y -= ly;

        var result = Math.floor(x * (y * (e - c + d) - e) + y * (c - a) + a);
        return result;
    };

    /**
     * Initializes a given array. Sets each element to zero.
     * @param array {Array} The array to initialize
     */
    ImageWrapper.clearArray = function(array) {
        var l = array.length;
        while (l--) {
            array[l] = 0;
        }
    };

    /**
     * Creates a {SubImage} from the current image ({this}).
     * @param from {ImageRef} The position where to start the {SubImage} from. (top-left corner)
     * @param size {ImageRef} The size of the resulting image
     * @returns {SubImage} A shared part of the original image
     */
    ImageWrapper.prototype.subImage = function(from, size) {
        return new SubImage(from, size, this);
    };

    /**
     * Creates an {ImageWrapper) and copies the needed underlying image-data area
     * @param imageWrapper {ImageWrapper} The target {ImageWrapper} where the data should be copied
     * @param from {ImageRef} The location where to copy from (top-left location)
     */
    ImageWrapper.prototype.subImageAsCopy = function(imageWrapper, from) {
        var sizeY = imageWrapper.size.y, sizeX = imageWrapper.size.x;
        var x, y;
        for ( x = 0; x < sizeX; x++) {
            for ( y = 0; y < sizeY; y++) {
                imageWrapper.data[y * sizeX + x] = this.data[(from.y + y) * this.size.x + from.x + x];
            }
        }
    };

    ImageWrapper.prototype.copyTo = function(imageWrapper) {
        var length = this.data.length, srcData = this.data, dstData = imageWrapper.data;

        while (length--) {
            dstData[length] = srcData[length];
        }
    };

    /**
     * Retrieves a given pixel position from the image
     * @param x {Number} The x-position
     * @param y {Number} The y-position
     * @returns {Number} The grayscale value at the pixel-position
     */
    ImageWrapper.prototype.get = function(x, y) {
        return this.data[y * this.size.x + x];
    };

    /**
     * Retrieves a given pixel position from the image
     * @param x {Number} The x-position
     * @param y {Number} The y-position
     * @returns {Number} The grayscale value at the pixel-position
     */
    ImageWrapper.prototype.getSafe = function(x, y) {
        var i;
        
        if (!this.indexMapping) {
            this.indexMapping = {
                x : [],
                y : []
            };
            for (i = 0; i < this.size.x; i++) {
                this.indexMapping.x[i] = i;
                this.indexMapping.x[i + this.size.x] = i;
            }
            for (i = 0; i < this.size.y; i++) {
                this.indexMapping.y[i] = i;
                this.indexMapping.y[i + this.size.y] = i;
            }
        }
        return this.data[(this.indexMapping.y[y + this.size.y]) * this.size.x + this.indexMapping.x[x + this.size.x]];
    };

    /**
     * Sets a given pixel position in the image
     * @param x {Number} The x-position
     * @param y {Number} The y-position
     * @param value {Number} The grayscale value to set
     * @returns {ImageWrapper} The Image itself (for possible chaining)
     */
    ImageWrapper.prototype.set = function(x, y, value) {
        this.data[y * this.size.x + x] = value;
        return this;
    };

    /**
     * Sets the border of the image (1 pixel) to zero
     */
    ImageWrapper.prototype.zeroBorder = function() {
        var i, width = this.size.x, height = this.size.y, data = this.data;
        for ( i = 0; i < width; i++) {
            data[i] = data[(height - 1) * width + i] = 0;
        }
        for ( i = 1; i < height - 1; i++) {
            data[i * width] = data[i * width + (width - 1)] = 0;
        }
    };

    /**
     * Inverts a binary image in place
     */
    ImageWrapper.prototype.invert = function() {
        var data = this.data, length = data.length;

        while (length--) {
            data[length] = data[length] ? 0 : 1;
        }

    };

    ImageWrapper.prototype.convolve = function(kernel) {
        var x, y, kx, ky, kSize = (kernel.length / 2) | 0, accu = 0;
        for ( y = 0; y < this.size.y; y++) {
            for ( x = 0; x < this.size.x; x++) {
                accu = 0;
                for ( ky = -kSize; ky <= kSize; ky++) {
                    for ( kx = -kSize; kx <= kSize; kx++) {
                        accu += kernel[ky+kSize][kx + kSize] * this.getSafe(x + kx, y + ky);
                    }
                }
                this.data[y * this.size.x + x] = accu;
            }
        }
    };

    ImageWrapper.prototype.moments = function(labelcount) {
        var data = this.data,
            x,
            y,
            height = this.size.y,
            width = this.size.x,
            val,
            ysq,
            labelsum = [],
            i,
            label,
            mu11,
            mu02,
            mu20,
            x_,
            y_,
            tmp,
            result = [],
            PI = Math.PI,
            PI_4 = PI / 4;

        if (labelcount <= 0) {
            return result;
        }

        for ( i = 0; i < labelcount; i++) {
            labelsum[i] = {
                m00 : 0,
                m01 : 0,
                m10 : 0,
                m11 : 0,
                m02 : 0,
                m20 : 0,
                theta : 0,
                rad : 0
            };
        }

        for ( y = 0; y < height; y++) {
            ysq = y * y;
            for ( x = 0; x < width; x++) {
                val = data[y * width + x];
                if (val > 0) {
                    label = labelsum[val - 1];
                    label.m00 += 1;
                    label.m01 += y;
                    label.m10 += x;
                    label.m11 += x * y;
                    label.m02 += ysq;
                    label.m20 += x * x;
                }
            }
        }

        for ( i = 0; i < labelcount; i++) {
            label = labelsum[i];
            if (!isNaN(label.m00) && label.m00 !== 0) {
                x_ = label.m10 / label.m00;
                y_ = label.m01 / label.m00;
                mu11 = label.m11 / label.m00 - x_ * y_;
                mu02 = label.m02 / label.m00 - y_ * y_;
                mu20 = label.m20 / label.m00 - x_ * x_;
                tmp = (mu02 - mu20) / (2 * mu11);
                tmp = 0.5 * Math.atan(tmp) + (mu11 >= 0 ? PI_4 : -PI_4 ) + PI;
                label.theta = (tmp * 180 / PI + 90) % 180 - 90;
                if (label.theta < 0) {
                    label.theta += 180;
                }
                label.rad = tmp > PI ? tmp - PI : tmp;
                label.vec = vec2.create([Math.cos(tmp), Math.sin(tmp)]);
                result.push(label);
            }
        }

        return result;
    };

    /**
     * Displays the {ImageWrapper} in a given canvas
     * @param canvas {Canvas} The canvas element to write to
     * @param scale {Number} Scale which is applied to each pixel-value
     */
    ImageWrapper.prototype.show = function(canvas, scale) {
        var ctx,
            frame,
            data,
            current,
            pixel,
            x,
            y;
        
        if (!scale) {
            scale = 1.0;
        }
        ctx = canvas.getContext('2d');
        canvas.width = this.size.x;
        canvas.height = this.size.y;
        frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        data = frame.data;
        current = 0;
        for (y = 0; y < this.size.y; y++) {
            for (x = 0; x < this.size.x; x++) {
                pixel = y * this.size.x + x;
                current = this.get(x, y) * scale;
                data[pixel * 4 + 0] = current;
                data[pixel * 4 + 1] = current;
                data[pixel * 4 + 2] = current;
                data[pixel * 4 + 3] = 255;
            }
        }
        //frame.data = data;
        ctx.putImageData(frame, 0, 0);
    };

    /**
     * Displays the {SubImage} in a given canvas
     * @param canvas {Canvas} The canvas element to write to
     * @param scale {Number} Scale which is applied to each pixel-value
     */
    ImageWrapper.prototype.overlay = function(canvas, scale, from) {
        if (!scale || scale < 0 || scale > 360) {
            scale = 360;
        }
        var hsv = [0, 1, 1];
        var rgb = [0, 0, 0];
        var whiteRgb = [255, 255, 255];
        var blackRgb = [0, 0, 0];
        var result = [];
        var ctx = canvas.getContext('2d');
        var frame = ctx.getImageData(from.x, from.y, this.size.x, this.size.y);
        var data = frame.data;
        var length = this.data.length;
        while (length--) {
            hsv[0] = this.data[length] * scale;
            result = hsv[0] <= 0 ? whiteRgb : hsv[0] >= 360 ? blackRgb : CVUtils.hsv2rgb(hsv, rgb);
            data[length * 4 + 0] = result[0];
            data[length * 4 + 1] = result[1];
            data[length * 4 + 2] = result[2];
            data[length * 4 + 3] = 255;
        }
        ctx.putImageData(frame, from.x, from.y);
    };

    return (ImageWrapper);
}); 
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

/**
 * http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
 */
define('tracer',[],function() {
    
    
    var Tracer = {
        searchDirections : [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]],
        create : function(imageWrapper, labelWrapper) {
            var imageData = imageWrapper.data,
                labelData = labelWrapper.data,
                searchDirections = this.searchDirections,
                width = imageWrapper.size.x,
                pos;

            function trace(current, color, label, edgelabel) {
                var i,
                    y,
                    x;

                for ( i = 0; i < 7; i++) {
                    y = current.cy + searchDirections[current.dir][0];
                    x = current.cx + searchDirections[current.dir][1];
                    pos = y * width + x;
                    if ((imageData[pos] === color) && ((labelData[pos] === 0) || (labelData[pos] === label))) {
                        labelData[pos] = label;
                        current.cy = y;
                        current.cx = x;
                        return true;
                    } else {
                        if (labelData[pos] === 0) {
                            labelData[pos] = edgelabel;
                        }
                        current.dir = (current.dir + 1) % 8;
                    }
                }
                return false;
            }

            function vertex2D(x, y, dir) {
                return {
                    dir : dir,
                    x : x,
                    y : y,
                    next : null,
                    prev : null
                };
            }

            function contourTracing(sy, sx, label, color, edgelabel) {
                var Fv = null,
                    Cv,
                    P,
                    ldir,
                    current = {
                        cx : sx,
                        cy : sy,
                        dir : 0
                    };

                if (trace(current, color, label, edgelabel)) {
                    Fv = vertex2D(sx, sy, current.dir);
                    Cv = Fv;
                    ldir = current.dir;
                    P = vertex2D(current.cx, current.cy, 0);
                    P.prev = Cv;
                    Cv.next = P;
                    P.next = null;
                    Cv = P;
                    do {
                        current.dir = (current.dir + 6) % 8;
                        trace(current, color, label, edgelabel);
                        if (ldir != current.dir) {
                            Cv.dir = current.dir;
                            P = vertex2D(current.cx, current.cy, 0);
                            P.prev = Cv;
                            Cv.next = P;
                            P.next = null;
                            Cv = P;
                        } else {
                            Cv.dir = ldir;
                            Cv.x = current.cx;
                            Cv.y = current.cy;
                        }
                        ldir = current.dir;
                    } while(current.cx != sx || current.cy != sy);
                    Fv.prev = Cv.prev;
                    Cv.prev.next = Fv;
                }
                return Fv;
            }

            return {
                trace : function(current, color, label, edgelabel) {
                    return trace(current, color, label, edgelabel);
                },
                contourTracing : function(sy, sx, label, color, edgelabel) {
                    return contourTracing(sy, sx, label, color, edgelabel);
                }
            };
        }
    };

    return (Tracer);
});

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

/**
 * http://www.codeproject.com/Tips/407172/Connected-Component-Labeling-and-Vectorization
 */
define('rasterizer',["tracer"], function(Tracer) {
    

    var Rasterizer = {
        createContour2D : function() {
            return {
                dir : null,
                index : null,
                firstVertex : null,
                insideContours : null,
                nextpeer : null,
                prevpeer : null
            };
        },
        CONTOUR_DIR : {
            CW_DIR : 0,
            CCW_DIR : 1,
            UNKNOWN_DIR : 2
        },
        DIR : {
            OUTSIDE_EDGE : -32767,
            INSIDE_EDGE : -32766
        },
        create : function(imageWrapper, labelWrapper) {
            var imageData = imageWrapper.data,
                labelData = labelWrapper.data,
                width = imageWrapper.size.x,
                height = imageWrapper.size.y,
                tracer = Tracer.create(imageWrapper, labelWrapper);

            return {
                rasterize : function(depthlabel) {
                    var color,
                        bc,
                        lc,
                        labelindex,
                        cx,
                        cy,
                        colorMap = [],
                        vertex,
                        p,
                        cc,
                        sc,
                        pos,
                        connectedCount = 0,
                        i;

                    for ( i = 0; i < 400; i++) {
                        colorMap[i] = 0;
                    }

                    colorMap[0] = imageData[0];
                    cc = null;
                    for ( cy = 1; cy < height - 1; cy++) {
                        labelindex = 0;
                        bc = colorMap[0];
                        for ( cx = 1; cx < width - 1; cx++) {
                            pos = cy * width + cx;
                            if (labelData[pos] === 0) {
                                color = imageData[pos];
                                if (color !== bc) {
                                    if (labelindex === 0) {
                                        lc = connectedCount + 1;
                                        colorMap[lc] = color;
                                        bc = color;
                                        vertex = tracer.contourTracing(cy, cx, lc, color, Rasterizer.DIR.OUTSIDE_EDGE);
                                        if (vertex !== null) {
                                            connectedCount++;
                                            labelindex = lc;
                                            p = Rasterizer.createContour2D();
                                            p.dir = Rasterizer.CONTOUR_DIR.CW_DIR;
                                            p.index = labelindex;
                                            p.firstVertex = vertex;
                                            p.nextpeer = cc;
                                            p.insideContours = null;
                                            if (cc !== null) {
                                                cc.prevpeer = p;
                                            }
                                            cc = p;
                                        }
                                    } else {
                                        vertex = tracer.contourTracing(cy, cx, Rasterizer.DIR.INSIDE_EDGE, color, labelindex);
                                        if (vertex !== null) {
                                            p = Rasterizer.createContour2D();
                                            p.firstVertex = vertex;
                                            p.insideContours = null;
                                            if (depthlabel === 0) {
                                                p.dir = Rasterizer.CONTOUR_DIR.CCW_DIR;
                                            } else {
                                                p.dir = Rasterizer.CONTOUR_DIR.CW_DIR;
                                            }
                                            p.index = depthlabel;
                                            sc = cc;
                                            while ((sc !== null) && sc.index !== labelindex) {
                                                sc = sc.nextpeer;
                                            }
                                            if (sc !== null) {
                                                p.nextpeer = sc.insideContours;
                                                if (sc.insideContours !== null) {
                                                    sc.insideContours.prevpeer = p;
                                                }
                                                sc.insideContours = p;
                                            }
                                        }
                                    }
                                } else {
                                    labelData[pos] = labelindex;
                                }
                            } else if (labelData[pos] === Rasterizer.DIR.OUTSIDE_EDGE || labelData[pos] === Rasterizer.DIR.INSIDE_EDGE) {
                                labelindex = 0;
                                if (labelData[pos] === Rasterizer.DIR.INSIDE_EDGE) {
                                    bc = imageData[pos];
                                } else {
                                    bc = colorMap[0];
                                }
                            } else {
                                labelindex = labelData[pos];
                                bc = colorMap[labelindex];
                            }
                        }
                    }
                    sc = cc;
                    while (sc !== null) {
                        sc.index = depthlabel;
                        sc = sc.nextpeer;
                    }
                    return {
                        cc : cc,
                        count : connectedCount
                    };
                },
                debug: {
                    drawContour : function(canvas, firstContour) {
                        var ctx = canvas.getContext("2d"),
                            pq = firstContour,
                            iq,
                            q,
                            p;
                            
                        ctx.strokeStyle = "red";
                        ctx.fillStyle = "red";
                        ctx.lineWidth = 1;
    
                        if (pq !== null) {
                            iq = pq.insideContours;
                        } else {
                            iq = null;
                        }
    
                        while (pq !== null) {
                            if (iq !== null) {
                                q = iq;
                                iq = iq.nextpeer;
                            } else {
                                q = pq;
                                pq = pq.nextpeer;
                                if (pq !== null) {
                                    iq = pq.insideContours;
                                } else {
                                    iq = null;
                                }
                            }
    
                            switch(q.dir) {
                            case Rasterizer.CONTOUR_DIR.CW_DIR:
                                ctx.strokeStyle = "red";
                                break;
                            case Rasterizer.CONTOUR_DIR.CCW_DIR:
                                ctx.strokeStyle = "blue";
                                break;
                            case Rasterizer.CONTOUR_DIR.UNKNOWN_DIR:
                                ctx.strokeStyle = "green";
                                break;
                            }
    
                            p = q.firstVertex;
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            do {
                                p = p.next;
                                ctx.lineTo(p.x, p.y);
                            } while(p !== q.firstVertex);
                            ctx.stroke();
                        }
                    }
                }
            };
        }
    };

    return (Rasterizer);
});

/* jshint undef: true, unused: true, browser:true, devel: true, -W041: false */
/* global define */

define('skeletonizer',[],function() {
    

    function Skeletonizer(stdlib, foreign, buffer) {
        "use asm";

        var images = new stdlib.Uint8Array(buffer),
            size = foreign.size | 0,
            imul = stdlib.Math.imul;

        function erode(inImagePtr, outImagePtr) {
            inImagePtr = inImagePtr | 0;
            outImagePtr = outImagePtr | 0;

            var v = 0,
                u = 0,
                sum = 0,
                yStart1 = 0,
                yStart2 = 0,
                xStart1 = 0,
                xStart2 = 0,
                offset = 0;

            for ( v = 1; (v | 0) < ((size - 1) | 0); v = (v + 1) | 0) {
                offset = (offset + size) | 0;
                for ( u = 1; (u | 0) < ((size - 1) | 0); u = (u + 1) | 0) {
                    yStart1 = (offset - size) | 0;
                    yStart2 = (offset + size) | 0;
                    xStart1 = (u - 1) | 0;
                    xStart2 = (u + 1) | 0;
                    sum = ((images[(inImagePtr + yStart1 + xStart1) | 0] | 0) + (images[(inImagePtr + yStart1 + xStart2) | 0] | 0) + (images[(inImagePtr + offset + u) | 0] | 0) + (images[(inImagePtr + yStart2 + xStart1) | 0] | 0) + (images[(inImagePtr + yStart2 + xStart2) | 0] | 0)) | 0;
                    if ((sum | 0) == (5 | 0)) {
                        images[(outImagePtr + offset + u) | 0] = 1;
                    } else {
                        images[(outImagePtr + offset + u) | 0] = 0;
                    }
                }
            }
            return;
        }

        function subtract(aImagePtr, bImagePtr, outImagePtr) {
            aImagePtr = aImagePtr | 0;
            bImagePtr = bImagePtr | 0;
            outImagePtr = outImagePtr | 0;

            var length = 0;

            length = imul(size, size) | 0;

            while ((length | 0) > 0) {
                length = (length - 1) | 0;
                images[(outImagePtr + length) | 0] = ((images[(aImagePtr + length) | 0] | 0) - (images[(bImagePtr + length) | 0] | 0)) | 0;
            }
        }

        function bitwiseOr(aImagePtr, bImagePtr, outImagePtr) {
            aImagePtr = aImagePtr | 0;
            bImagePtr = bImagePtr | 0;
            outImagePtr = outImagePtr | 0;

            var length = 0;

            length = imul(size, size) | 0;

            while ((length | 0) > 0) {
                length = (length - 1) | 0;
                images[(outImagePtr + length) | 0] = ((images[(aImagePtr + length) | 0] | 0) | (images[(bImagePtr + length) | 0] | 0)) | 0;
            }
        }

        function countNonZero(imagePtr) {
            imagePtr = imagePtr | 0;

            var sum = 0,
                length = 0;

            length = imul(size, size) | 0;

            while ((length | 0) > 0) {
                length = (length - 1) | 0;
                sum = ((sum | 0) + (images[(imagePtr + length) | 0] | 0)) | 0;
            }

            return (sum | 0);
        }

        function init(imagePtr, value) {
            imagePtr = imagePtr | 0;
            value = value | 0;

            var length = 0;

            length = imul(size, size) | 0;

            while ((length | 0) > 0) {
                length = (length - 1) | 0;
                images[(imagePtr + length) | 0] = value;
            }
        }

        function dilate(inImagePtr, outImagePtr) {
            inImagePtr = inImagePtr | 0;
            outImagePtr = outImagePtr | 0;

            var v = 0,
                u = 0,
                sum = 0,
                yStart1 = 0,
                yStart2 = 0,
                xStart1 = 0,
                xStart2 = 0,
                offset = 0;

            for ( v = 1; (v | 0) < ((size - 1) | 0); v = (v + 1) | 0) {
                offset = (offset + size) | 0;
                for ( u = 1; (u | 0) < ((size - 1) | 0); u = (u + 1) | 0) {
                    yStart1 = (offset - size) | 0;
                    yStart2 = (offset + size) | 0;
                    xStart1 = (u - 1) | 0;
                    xStart2 = (u + 1) | 0;
                    sum = ((images[(inImagePtr + yStart1 + xStart1) | 0] | 0) + (images[(inImagePtr + yStart1 + xStart2) | 0] | 0) + (images[(inImagePtr + offset + u) | 0] | 0) + (images[(inImagePtr + yStart2 + xStart1) | 0] | 0) + (images[(inImagePtr + yStart2 + xStart2) | 0] | 0)) | 0;
                    if ((sum | 0) > (0 | 0)) {
                        images[(outImagePtr + offset + u) | 0] = 1;
                    } else {
                        images[(outImagePtr + offset + u) | 0] = 0;
                    }
                }
            }
            return;
        }

        function memcpy(srcImagePtr, dstImagePtr) {
            srcImagePtr = srcImagePtr | 0;
            dstImagePtr = dstImagePtr | 0;

            var length = 0;

            length = imul(size, size) | 0;

            while ((length | 0) > 0) {
                length = (length - 1) | 0;
                images[(dstImagePtr + length) | 0] = (images[(srcImagePtr + length) | 0] | 0);
            }
        }

        function zeroBorder(imagePtr) {
            imagePtr = imagePtr | 0;

            var x = 0,
                y = 0;

            for ( x = 0; (x | 0) < ((size - 1) | 0); x = (x + 1) | 0) {
                images[(imagePtr + x) | 0] = 0;
                images[(imagePtr + y) | 0] = 0;
                y = ((y + size) - 1) | 0;
                images[(imagePtr + y) | 0] = 0;
                y = (y + 1) | 0;
            }
            for ( x = 0; (x | 0) < (size | 0); x = (x + 1) | 0) {
                images[(imagePtr + y) | 0] = 0;
                y = (y + 1) | 0;
            }
        }

        function skeletonize() {
            var subImagePtr = 0,
                erodedImagePtr = 0,
                tempImagePtr = 0,
                skelImagePtr = 0,
                sum = 0,
                done = 0;
                
            erodedImagePtr = imul(size, size) | 0;
            tempImagePtr = (erodedImagePtr + erodedImagePtr) | 0;
            skelImagePtr = (tempImagePtr + erodedImagePtr) | 0;

            // init skel-image
            init(skelImagePtr, 0);
            zeroBorder(subImagePtr);

            do {
                erode(subImagePtr, erodedImagePtr);
                dilate(erodedImagePtr, tempImagePtr);
                subtract(subImagePtr, tempImagePtr, tempImagePtr);
                bitwiseOr(skelImagePtr, tempImagePtr, skelImagePtr);
                memcpy(erodedImagePtr, subImagePtr);
                sum = countNonZero(subImagePtr) | 0;
                done = ((sum | 0) == 0 | 0);
            } while(!done);
        }

        return {
            skeletonize : skeletonize
        };
    }

    return Skeletonizer;
});

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('image_debug',[],function() {
    
    
    return {
        drawRect: function(pos, size, ctx, style){
            ctx.strokeStyle = style.color;
            ctx.fillStyle = style.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.strokeRect(pos.x, pos.y, size.x, size.y);
        },
        drawPath: function(path, def, ctx, style) {
            ctx.strokeStyle = style.color;
            ctx.fillStyle = style.color;
            ctx.lineWidth = style.lineWidth;
            ctx.beginPath();
            ctx.moveTo(path[0][def.x], path[0][def.y]);
            for (var j = 1; j < path.length; j++) {
                ctx.lineTo(path[j][def.x], path[j][def.y]);
            }
            ctx.closePath();
            ctx.stroke();
        }
    };
    
});

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define, mat2, vec2 */

define('barcode_locator',["image_wrapper", "cv_utils", "rasterizer", "tracer", "skeletonizer", "array_helper", "image_debug"],
function(ImageWrapper, CVUtils, Rasterizer, Tracer, skeletonizer, ArrayHelper, ImageDebug) {
    
    
    var _config,
        _currentImageWrapper,
        _skelImageWrapper,
        _subImageWrapper,
        _labelImageWrapper,
        _patchGrid,
        _patchLabelGrid,
        _imageToPatchGrid,
        _binaryImageWrapper,
        _patchSize,
        _canvasContainer = {
            ctx : {
                binary : null
            },
            dom : {
                binary : null
            }
        },
        _numPatches = {x: 0, y: 0},
        _inputImageWrapper,
        _skeletonizer,
        self = this;

    function initBuffers() {
        var skeletonImageData;
        
        if (_config.halfSample) {
            _currentImageWrapper = new ImageWrapper({
                x : _inputImageWrapper.size.x / 2 | 0,
                y : _inputImageWrapper.size.y / 2 | 0
            });
        } else {
            _currentImageWrapper = _inputImageWrapper;
        }

        _patchSize = {
            x : 16 * ( _config.halfSample ? 1 : 2),
            y : 16 * ( _config.halfSample ? 1 : 2)
        };

        _numPatches.x = _currentImageWrapper.size.x / _patchSize.x | 0;
        _numPatches.y = _currentImageWrapper.size.y / _patchSize.y | 0;

        _binaryImageWrapper = new ImageWrapper(_currentImageWrapper.size, undefined, Uint8Array, false);

        _labelImageWrapper = new ImageWrapper(_patchSize, undefined, Array, true);

        skeletonImageData = new ArrayBuffer(64*1024);
        _subImageWrapper = new ImageWrapper(_patchSize, new Uint8Array(skeletonImageData, 0, _patchSize.x * _patchSize.y));
        _skelImageWrapper = new ImageWrapper(_patchSize, new Uint8Array(skeletonImageData, _patchSize.x * _patchSize.y * 3, _patchSize.x * _patchSize.y), undefined, true);
        _skeletonizer = skeletonizer(self, {
            size : _patchSize.x
        }, skeletonImageData);

        _imageToPatchGrid = new ImageWrapper({
            x : (_currentImageWrapper.size.x / _subImageWrapper.size.x) | 0,
            y : (_currentImageWrapper.size.y / _subImageWrapper.size.y) | 0
        }, undefined, Array, true);
        _patchGrid = new ImageWrapper(_imageToPatchGrid.size, undefined, undefined, true);
        _patchLabelGrid = new ImageWrapper(_imageToPatchGrid.size, undefined, Int32Array, true);
    }

    function initCanvas() {
        if (_config.useWorker || typeof document === 'undefined') {
            return;
        }
        _canvasContainer.dom.binary = document.createElement("canvas");
        _canvasContainer.dom.binary.className = "binaryBuffer";
        if (_config.showCanvas === true) {
            document.querySelector("#debug").appendChild(_canvasContainer.dom.binary);
        }
        _canvasContainer.ctx.binary = _canvasContainer.dom.binary.getContext("2d");
        _canvasContainer.dom.binary.width = _binaryImageWrapper.size.x;
        _canvasContainer.dom.binary.height = _binaryImageWrapper.size.y;
    }

    /**
     * Creates a bounding box which encloses all the given patches
     * @returns {Array} The minimal bounding box 
     */
    function boxFromPatches(patches) {
        var overAvg, i, j, patch, transMat, minx = _binaryImageWrapper.size.x, miny = _binaryImageWrapper.size.y, maxx = -_binaryImageWrapper.size.x, maxy = -_binaryImageWrapper.size.y, box, scale;

        // draw all patches which are to be taken into consideration
        overAvg = 0;
        for ( i = 0; i < patches.length; i++) {
            patch = patches[i];
            overAvg += patch.rad;
            if (_config.showPatches) {
                ImageDebug.drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, {color: "red"});
            }
        }

        overAvg /= patches.length;
        overAvg = (overAvg * 180 / Math.PI + 90) % 180 - 90;
        if (overAvg < 0) {
            overAvg += 180;
        }

        //console.log(overAvg);
        overAvg = (180 - overAvg) * Math.PI / 180;
        transMat = mat2.create([Math.cos(overAvg), -Math.sin(overAvg), Math.sin(overAvg), Math.cos(overAvg)]);

        // iterate over patches and rotate by angle
        for ( i = 0; i < patches.length; i++) {
            patch = patches[i];
            for ( j = 0; j < 4; j++) {
                mat2.xVec2(transMat, patch.box[j]);
            }

            if (_config.boxFromPatches.showTransformed) {
                ImageDebug.drawPath(patch.box, {x: 0, y: 1}, _canvasContainer.ctx.binary, {color: '#99ff00', lineWidth: 2});
            }
        }

        // find bounding box
        for ( i = 0; i < patches.length; i++) {
            patch = patches[i];
            for ( j = 0; j < 4; j++) {
                if (patch.box[j][0] < minx) {
                    minx = patch.box[j][0];
                }
                if (patch.box[j][0] > maxx) {
                    maxx = patch.box[j][0];
                }
                if (patch.box[j][1] < miny) {
                    miny = patch.box[j][1];
                }
                if (patch.box[j][1] > maxy) {
                    maxy = patch.box[j][1];
                }
            }
        }

        box = [[minx, miny], [maxx, miny], [maxx, maxy], [minx, maxy]];

        if (_config.boxFromPatches.showTransformedBox) {
            ImageDebug.drawPath(box, {x: 0, y: 1}, _canvasContainer.ctx.binary, {color: '#ff0000', lineWidth: 2});
        }

        scale = _config.halfSample ? 2 : 1;
        // reverse rotation;
        transMat = mat2.inverse(transMat);
        for ( j = 0; j < 4; j++) {
            mat2.xVec2(transMat, box[j]);
        }

        if (_config.boxFromPatches.showBB) {
            ImageDebug.drawPath(box, {x: 0, y: 1}, _canvasContainer.ctx.binary, {color: '#ff0000', lineWidth: 2});
        }
        
        for ( j = 0; j < 4; j++) {
            vec2.scale(box[j], scale);
        }

        return box;
    }

    /**
     * Creates a binary image of the current image
     */
    function binarizeImage() {
        CVUtils.otsuThreshold(_currentImageWrapper, _binaryImageWrapper);
        _binaryImageWrapper.zeroBorder();
        if (_config.showCanvas) {
            _binaryImageWrapper.show(_canvasContainer.dom.binary, 255);
        }
    }
    
    /**
     * Iterate over the entire image
     * extract patches
     */
    function findPatches() {
        var i,
            j,
            x,
            y,
            moments,
            patchesFound = [],
            rasterizer,
            rasterResult,
            patch;
        for ( i = 0; i < _numPatches.x; i++) {
            for ( j = 0; j < _numPatches.y; j++) {

                x = _subImageWrapper.size.x * i;
                y = _subImageWrapper.size.y * j;

                // seperate parts
                skeletonize(x, y);

                // Rasterize, find individual bars
                _skelImageWrapper.zeroBorder();
                ArrayHelper.init(_labelImageWrapper.data, 0);
                rasterizer = Rasterizer.create(_skelImageWrapper, _labelImageWrapper);
                rasterResult = rasterizer.rasterize(0);

                if (_config.showLabels) {
                    _labelImageWrapper.overlay(_canvasContainer.dom.binary, Math.floor(360 / rasterResult.count), {x : x, y : y});
                }

                // calculate moments from the skeletonized patch
                moments = _labelImageWrapper.moments(rasterResult.count);

                // extract eligible patches
                patchesFound = patchesFound.concat(describePatch(moments, [i, j], x, y));
            }
        }
        
        if (_config.showFoundPatches) {
            for ( i = 0; i < patchesFound.length; i++) {
                patch = patchesFound[i];
                ImageDebug.drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, {color: "#99ff00", lineWidth: 2});
            }
        }
        
        return patchesFound;
    }
    
    /**
     * Finds those connected areas which contain at least 6 patches
     * and returns them ordered DESC by the number of contained patches
     * @param {Number} maxLabel 
     */
    function findBiggestConnectedAreas(maxLabel){
        var i,
            sum,
            labelHist = [],
            topLabels = [];
            
        for ( i = 0; i < maxLabel; i++) {
            labelHist.push(0);
        }
        sum = _patchLabelGrid.data.length;
        while (sum--) {
            if (_patchLabelGrid.data[sum] > 0) {
                labelHist[_patchLabelGrid.data[sum] - 1]++;
            }
        }

        labelHist = labelHist.map(function(val, idx) {
            return {
                val : val,
                label : idx + 1
            };
        });

        labelHist.sort(function(a, b) {
            return b.val - a.val;
        });

        // extract top areas with at least 6 patches present
        topLabels = labelHist.filter(function(el) {
            return el.val >= 5;
        });
        
        return topLabels;
    }
    
    /**
     * 
     */
    function findBoxes(topLabels, maxLabel) {
        var i,
            j,
            sum,
            patches = [],
            patch,
            box,
            boxes = [],
            hsv = [0, 1, 1],
            rgb = [0, 0, 0];
            
        for ( i = 0; i < topLabels.length; i++) {
            sum = _patchLabelGrid.data.length;
            patches.length = 0;
            while (sum--) {
                if (_patchLabelGrid.data[sum] === topLabels[i].label) {
                    patch = _imageToPatchGrid.data[sum];
                    patches.push(patch);
                }
            }
            box = boxFromPatches(patches);
            if (box) {
                boxes.push(box);

                // draw patch-labels if requested
                if (_config.showRemainingPatchLabels) {
                    for ( j = 0; j < patches.length; j++) {
                        patch = patches[j];
                        hsv[0] = (topLabels[i].label / (maxLabel + 1)) * 360;
                        CVUtils.hsv2rgb(hsv, rgb);
                        ImageDebug.drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, {color: "rgb(" + rgb.join(",") + ")", lineWidth: 2});
                    }
                }
            }
        }
        return boxes;
    }

    /**
     * Find similar moments (via cluster)
     * @param {Object} moments
     */
    function similarMoments(moments) {
        var clusters = CVUtils.cluster(moments, 0.90);
        var topCluster = CVUtils.topGeneric(clusters, 1, function(e) {
            return e.getPoints().length;
        });
        var points = [], result = [];
        if (topCluster.length === 1) {
            points = topCluster[0].item.getPoints();
            for (var i = 0; i < points.length; i++) {
                result.push(points[i].point);
            }
        }
        return result;
    }

    function skeletonize(x, y) {
        _binaryImageWrapper.subImageAsCopy(_subImageWrapper, CVUtils.imageRef(x, y));
        _skeletonizer.skeletonize();
        
        // Show skeleton if requested
        if (_config.showSkeleton) {
            _skelImageWrapper.overlay(_canvasContainer.dom.binary, 360, CVUtils.imageRef(x, y));
        }
    }

    /**
     * Extracts and describes those patches which seem to contain a barcode pattern
     * @param {Array} moments
     * @param {Object} patchPos,
     * @param {Number} x
     * @param {Number} y
     * @returns {Array} list of patches
     */
    function describePatch(moments, patchPos, x, y) {
        var k, avg, sum = 0, eligibleMoments = [], matchingMoments, patch, patchesFound = [];
        if (moments.length >= 2) {
            // only collect moments which's area covers at least 6 pixels.
            for ( k = 0; k < moments.length; k++) {
                if (moments[k].m00 > 6) {
                    eligibleMoments.push(moments[k]);
                }
            }

            // if at least 2 moments are found which have 6pixels covered
            if (eligibleMoments.length >= 2) {
                sum = eligibleMoments.length;
                matchingMoments = similarMoments(eligibleMoments);
                avg = 0;
                // determine the similarity of the moments
                for ( k = 0; k < matchingMoments.length; k++) {
                    avg += matchingMoments[k].rad;
                }

                // Only two of the moments are allowed not to fit into the equation
                // add the patch to the set
                if (matchingMoments.length > 1 && matchingMoments.length >= (eligibleMoments.length / 4) * 3 && matchingMoments.length > moments.length / 4) {
                    avg /= matchingMoments.length;
                    patch = {
                        index : patchPos[1] * _numPatches.x + patchPos[0],
                        pos : {
                            x : x,
                            y : y
                        },
                        box : [vec2.create([x, y]), vec2.create([x + _subImageWrapper.size.x, y]), vec2.create([x + _subImageWrapper.size.x, y + _subImageWrapper.size.y]), vec2.create([x, y + _subImageWrapper.size.y])],
                        moments : matchingMoments,
                        rad : avg,
                        vec : vec2.create([Math.cos(avg), Math.sin(avg)])
                    };
                    patchesFound.push(patch);
                }
            }
        }
        return patchesFound;
    }

    /**
     * finds patches which are connected and share the same orientation
     * @param {Object} patchesFound
     */
    function rasterizeAngularSimilarity(patchesFound) {
        var label = 0,
            threshold = 0.95,
            currIdx = 0,
            j,
            patch,
            hsv = [0, 1, 1],
            rgb = [0, 0, 0];

        function notYetProcessed() {
            var i;
            for ( i = 0; i < _patchLabelGrid.data.length; i++) {
                if (_patchLabelGrid.data[i] === 0 && _patchGrid.data[i] === 1) {
                    return i;
                }
            }
            return _patchLabelGrid.length;
        }

        function trace(currentIdx) {
            var x, y, currentPatch, patch, idx, dir, current = {
                x : currentIdx % _patchLabelGrid.size.x,
                y : (currentIdx / _patchLabelGrid.size.x) | 0
            }, similarity;

            if (currentIdx < _patchLabelGrid.data.length) {
                currentPatch = _imageToPatchGrid.data[currentIdx];
                // assign label
                _patchLabelGrid.data[currentIdx] = label;
                for ( dir = 0; dir < Tracer.searchDirections.length; dir++) {
                    y = current.y + Tracer.searchDirections[dir][0];
                    x = current.x + Tracer.searchDirections[dir][1];
                    idx = y * _patchLabelGrid.size.x + x;

                    // continue if patch empty
                    if (_patchGrid.data[idx] === 0) {
                        _patchLabelGrid.data[idx] = Number.MAX_VALUE;
                        continue;
                    }

                    patch = _imageToPatchGrid.data[idx];
                    if (_patchLabelGrid.data[idx] === 0) {
                        similarity = Math.abs(vec2.dot(patch.vec, currentPatch.vec));
                        if (similarity > threshold) {
                            trace(idx);
                        }
                    }
                }
            }
        }
        
        // prepare for finding the right patches
        ArrayHelper.init(_patchGrid.data, 0);
        ArrayHelper.init(_patchLabelGrid.data, 0);
        ArrayHelper.init(_imageToPatchGrid.data, null);

        for ( j = 0; j < patchesFound.length; j++) {
            patch = patchesFound[j];
            _imageToPatchGrid.data[patch.index] = patch;
            _patchGrid.data[patch.index] = 1;
        }

        // rasterize the patches found to determine area
        _patchGrid.zeroBorder();

        while (( currIdx = notYetProcessed()) < _patchLabelGrid.data.length) {
            label++;
            trace(currIdx);
        }
        
        // draw patch-labels if requested
        if (_config.showPatchLabels) {
            for ( j = 0; j < _patchLabelGrid.data.length; j++) {
                if (_patchLabelGrid.data[j] > 0 && _patchLabelGrid.data[j] <= label) {
                    patch = _imageToPatchGrid.data[j];
                    hsv[0] = (_patchLabelGrid.data[j] / (label + 1)) * 360;
                    CVUtils.hsv2rgb(hsv, rgb);
                    ImageDebug.drawRect(patch.pos, _subImageWrapper.size, _canvasContainer.ctx.binary, {color: "rgb(" + rgb.join(",") + ")", lineWidth: 2});
                }
            }
        }
        
        return label;
    }

    return {
        init : function(inputImageWrapper, config) {
            _config = config;
            _inputImageWrapper = inputImageWrapper;

            initBuffers();
            initCanvas();
        },
        locate : function() {
            var patchesFound,
            topLabels = [],
            boxes = [];

            if (_config.halfSample) {
                CVUtils.halfSample(_inputImageWrapper, _currentImageWrapper);
            }

            binarizeImage();
            patchesFound = findPatches();
            // return unless 5% or more patches are found
            if (patchesFound.length < _numPatches.x * _numPatches.y * 0.05) {
                return null;
            }

            // rasterrize area by comparing angular similarity;
            var maxLabel = rasterizeAngularSimilarity(patchesFound);
            if (maxLabel <= 1) {
                return null;
            }

            // search for area with the most patches (biggest connected area)
            topLabels = findBiggestConnectedAreas(maxLabel);
            if (topLabels.length === 0) {
                return null;
            }

            boxes = findBoxes(topLabels, maxLabel);
            return boxes;
        }
    };
});


/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('bresenham',[],function() {
    
    var Bresenham = {};

    var Slope = {
        DIR : {
            UP : 1,
            DOWN : -1
        }
    };
    /**
     * Scans a line of the given image from point p1 to p2 and returns a result object containing 
     * gray-scale values (0-255) of the underlying pixels in addition to the min
     * and max values.
     * @param {Object} imageWrapper
     * @param {Object} p1 The start point {x,y}
     * @param {Object} p2 The end point {x,y}
     * @returns {line, min, max}
     */
    Bresenham.getBarcodeLine = function(imageWrapper, p1, p2) {
        var x0 = p1.x | 0,
            y0 = p1.y | 0,
            x1 = p2.x | 0,
            y1 = p2.y | 0,
            steep = Math.abs(y1 - y0) > Math.abs(x1 - x0),
            deltax,
            deltay,
            error,
            ystep,
            y,
            tmp,
            x,
            line = [],
            imageData = imageWrapper.data,
            width = imageWrapper.size.x,
            sum = 0,
            val,
            min = 255,
            max = 0;

        function read(a, b) {
            val = imageData[b * width + a];
            sum += val;
            min = val < min ? val : min;
            max = val > max ? val : max;
            line.push(val);
        }

        if (steep) {
            tmp = x0;
            x0 = y0;
            y0 = tmp;

            tmp = x1;
            x1 = y1;
            y1 = tmp;
        }
        if (x0 > x1) {
            tmp = x0;
            x0 = x1;
            x1 = tmp;

            tmp = y0;
            y0 = y1;
            y1 = tmp;
        }
        deltax = x1 - x0;
        deltay = Math.abs(y1 - y0);
        error = (deltax / 2) | 0;
        y = y0;
        ystep = y0 < y1 ? 1 : -1;
        for ( x = x0; x < x1; x++) {
            if(steep){
                read(y, x);
            } else {
                read(x, y);
            }
            error = error - deltay;
            if (error < 0) {
                y = y + ystep;
                error = error + deltax;
            }
        }

        return {
            line : line,
            min : min,
            max : max
        };
    };
    
    /**
     * Converts the result from getBarcodeLine into a binary representation 
     * also considering the frequency and slope of the signal for more robust results
     * @param {Object} result {line, min, max}
     */
    Bresenham.toBinaryLine = function(result) {

        var min = result.min,
            max = result.max,
            line = result.line,
            slope,
            center = min + (max - min) / 2,
            extrema = [],
            currentDir,
            dir,
            threshold = (max - min) / 8,
            rThreshold = -threshold,
            i,
            j;

        // 1. find extrema
        currentDir = line[0] > center ? Slope.DIR.DOWN : Slope.DIR.UP;
        extrema.push({
            pos : 0,
            val : line[0]
        });
        for ( i = 0; i < line.length - 1; i++) {
            slope = (line[i + 1] - line[i]);
            if (slope < rThreshold) {
                dir = Slope.DIR.UP;
            } else if (slope > threshold) {
                dir = Slope.DIR.DOWN;
            } else {
                dir = currentDir;
            }

            if (currentDir !== dir) {
                extrema.push({
                    pos : i,
                    val : line[i]
                });
                currentDir = dir;
            }
        }
        extrema.push({
            pos : line.length,
            val : line[line.length - 1]
        });

        for ( j = extrema[0].pos; j < extrema[1].pos; j++) {
            line[j] = line[j] > center ? 0 : 1;
        }

        // iterate over extrema and convert to binary based on avg between minmax
        for ( i = 1; i < extrema.length - 1; i++) {
            if (extrema[i + 1].val > extrema[i].val) {
                threshold = (extrema[i].val + (extrema[i + 1].val - extrema[i].val) / 2) | 0;
            } else {
                threshold = (extrema[i + 1].val + (extrema[i].val - extrema[i + 1].val) / 2) | 0;
            }

            for ( j = extrema[i].pos; j < extrema[i + 1].pos; j++) {
                line[j] = line[j] > threshold ? 0 : 1;
            }
        }

        return {
            line : line,
            threshold : threshold
        };
    };
    
    /**
     * Used for development only 
     */
    Bresenham.debug = {
        printFrequency: function(line, canvas) {
            var i,
                ctx = canvas.getContext("2d");
            canvas.width = line.length;
            canvas.height = 256;
    
            ctx.beginPath();
            ctx.strokeStyle = "blue";
            for ( i = 0; i < line.length; i++) {
                ctx.moveTo(i, 255);
                ctx.lineTo(i, 255 - line[i]);
            }
            ctx.stroke();
            ctx.closePath();
        },
        
        printPattern: function(line, canvas) {
            var ctx = canvas.getContext("2d"), i;
    
            canvas.width = line.length;
            ctx.fillColor = "black";
            for ( i = 0; i < line.length; i++) {
                if (line[i] === 1) {
                    ctx.fillRect(i, 0, 1, 100);
                }
            }
        }
    };

    return (Bresenham);
}); 
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('barcode_decoder',["bresenham", "image_debug", 'code_128_reader', 'ean_reader'], function(Bresenham, ImageDebug, Code128Reader, EANReader) {
    
    
    var readers = {
        code_128_reader: Code128Reader,
        ean_reader: EANReader
    };
    var BarcodeDecoder = {
        create : function(config, inputImageWrapper) {
            var _canvas = {
                ctx : {
                        frequency : null,
                        pattern : null,
                        overlay : null
                    },
                    dom : {
                        frequency : null,
                        pattern : null,
                        overlay : null
                    }
                },
                _barcodeReaders = [],
                _barcodeReader = null;
            
            initCanvas();
            initReaders();
            initConfig();

            function initCanvas() {
                if (typeof document !== 'undefined') {
                    var $debug = document.querySelector("#debug.detection");
                    _canvas.dom.frequency = document.querySelector("canvas.frequency");
                    if (!_canvas.dom.frequency) {
                        _canvas.dom.frequency = document.createElement("canvas");
                        _canvas.dom.frequency.className = "frequency";
                        if($debug) {
                            $debug.appendChild(_canvas.dom.frequency);
                        }
                    }
                    _canvas.ctx.frequency = _canvas.dom.frequency.getContext("2d");

                    _canvas.dom.pattern = document.querySelector("canvas.patternBuffer");
                    if (!_canvas.dom.pattern) {
                        _canvas.dom.pattern = document.createElement("canvas");
                        _canvas.dom.pattern.className = "patternBuffer";
                        if($debug) {
                            $debug.appendChild(_canvas.dom.pattern);
                        }
                    }
                    _canvas.ctx.pattern = _canvas.dom.pattern.getContext("2d");

                    _canvas.dom.overlay = document.querySelector("canvas.drawingBuffer");
                    if (_canvas.dom.overlay) {
                        _canvas.ctx.overlay = _canvas.dom.overlay.getContext("2d");
                    }
                }
            }

            function initReaders() {
                var i;
                for ( i = 0; i < config.readers.length; i++) {
                    console.log(config.readers[i]);
                    _barcodeReaders.push(new readers[config.readers[i]]());
                }
            }

            function initConfig() {
                if (typeof document !== 'undefined') {
                    var i,
                        vis = [{
                            node : _canvas.dom.frequency,
                            prop : config.showFrequency
                        }, {
                            node : _canvas.dom.pattern,
                            prop : config.showPattern
                        }];

                    for (i = 0; i < vis.length; i++) {
                        if (vis[i].prop === true) {
                            vis[i].node.style.display = "block";
                        } else {
                            vis[i].node.style.display = "none";
                        }
                    }
                }
            }

            /**
             * extend the line on both ends 
             * @param {Array} line
             * @param {Number} angle 
             */
            function getExtendedLine(line, angle, ext) {
                var extension = {
                        y : ext * Math.sin(angle),
                        x : ext * Math.cos(angle)
                    };
                    
                line[0].y -= extension.y;
                line[0].x -= extension.x;
                line[1].y += extension.y;
                line[1].x += extension.x;

                // check if inside image
                if (!inputImageWrapper.inImageWithBorder(line[0], 0) || !inputImageWrapper.inImageWithBorder(line[1], 0)) {
                    return null;
                }
                return line;
            }
            
            function getLine(box) {
                return [{
                    x : (box[1][0] - box[0][0]) / 2 + box[0][0],
                    y : (box[1][1] - box[0][1]) / 2 + box[0][1]
                }, {
                    x : (box[3][0] - box[2][0]) / 2 + box[2][0],
                    y : (box[3][1] - box[2][1]) / 2 + box[2][1]
                }];
            }
            
            function tryDecode(line) {
                var result = null,
                    i,
                    barcodeLine = Bresenham.getBarcodeLine(inputImageWrapper, line[0], line[1]);
                    
                if (config.showFrequency) {
                    ImageDebug.drawPath(line, {x: 'x', y: 'y'}, _canvas.ctx.overlay, {color: 'red', lineWidth: 3});
                    Bresenham.debug.printFrequency(barcodeLine.line, _canvas.dom.frequency);
                }
                Bresenham.toBinaryLine(barcodeLine);
                if (config.showPattern) {
                    Bresenham.debug.printPattern(barcodeLine.line, _canvas.dom.pattern);
                }
                
                for ( i = 0; i < _barcodeReaders.length && result === null; i++) {
                    result = _barcodeReaders[i].decodePattern(barcodeLine.line);
                    if (result !== null) {
                        _barcodeReader = _barcodeReaders[i];
                    }
                }
                if(result === null){
                    return null;
                }
                return {
                    codeResult: result,
                    barcodeLine: barcodeLine
                };
                
            }
            
            /**
             * This method slices the given area apart and tries to detect a barcode-pattern
             * for each slice. It returns the decoded barcode, or null if nothing was found
             * @param {Array} box
             * @param {Array} line
             * @param {Number} lineAngle 
             */
            function tryDecodeBruteForce(box, line, lineAngle) {
                var sideLength = Math.sqrt(Math.pow(box[1][0] - box[0][0], 2) + Math.pow((box[1][1] - box[0][1]), 2)),
                    i,
                    slices = 16,
                    result = null,
                    dir,
                    extension,
                    xdir = Math.sin(lineAngle),
                    ydir = Math.cos(lineAngle);
                    
                for ( i = 1; i < slices && result === null; i++) {
                    // move line perpendicular to angle
                    dir = sideLength / slices * i * (i % 2 === 0 ? -1 : 1);
                    extension = {
                        y : dir * xdir,
                        x : dir * ydir
                    };
                    line[0].y += extension.x;
                    line[0].x -= extension.y;
                    line[1].y += extension.x;
                    line[1].x -= extension.y;

                    result = tryDecode(line);
                }
                return result;
            }

            /**
             * With the help of the configured readers (Code128 or EAN) this function tries to detect a 
             * valid barcode pattern within the given area.
             * @param {Object} box The area to search in
             * @returns {Object} the result {codeResult, line, angle, pattern, threshold}
             */
            function decodeFromBoundingBox(box) {
                var line,
                    lineAngle,
                    ctx = _canvas.ctx.overlay,
                    result;

                if (config.drawBoundingBox && ctx) {
                    ImageDebug.drawPath(box, {x: 0, y: 1}, ctx, {color: "blue", lineWidth: 2});
                }

                line = getLine(box);
                lineAngle = Math.atan2(line[1].y - line[0].y, line[1].x - line[0].x);
                line = getExtendedLine(line, lineAngle, 10);
                if(line === null){
                    return null;
                }

                result = tryDecode(line);
                if(result === null) {
                    result = tryDecodeBruteForce(box, line, lineAngle);
                }
                
                if(result === null) {
                    return null;
                }

                if (result && config.drawScanline && ctx) {
                    ImageDebug.drawPath(line, {x: 'x', y: 'y'}, ctx, {color: 'red', lineWidth: 3});
                }

                return {
                    codeResult : result.codeResult,
                    line : line,
                    angle : lineAngle,
                    pattern : result.barcodeLine.line,
                    threshold : result.barcodeLine.threshold
                };
            }

            return {
                decodeFromBoundingBox : function(box) {
                    return decodeFromBoundingBox(box);
                },
                decodeFromBoundingBoxes : function(boxes) {
                    var i, result;
                    for ( i = 0; i < boxes.length; i++) {
                        result = decodeFromBoundingBox(boxes[i]);
                        if (result && result.codeResult) {
                            result.box = boxes[i];
                            return result;
                        }
                    }
                },
                setReaders: function(readers) {
                    config.readers = readers;
                    _barcodeReaders.length = 0;
                    initReaders();
                }
            };
        }
    };

    return (BarcodeDecoder);
}); 
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('frame_grabber',["cv_utils"], function(CVUtils) {
    

    var FrameGrabber = {};

    FrameGrabber.create = function(inputStream, canvas) {
        var _that = {},
            _streamConfig = inputStream.getConfig(),
            _video_size = CVUtils.imageRef(inputStream.getRealWidth(), inputStream.getRealHeight()),
            _size =_streamConfig.size ? CVUtils.imageRef(_streamConfig.size, _streamConfig.size) : _video_size,
            _sx = 0,
            _sy = 0,
            _dx = 0,
            _dy = 0,
            _sWidth,
            _dWidth,
            _sHeight,
            _dHeight,
            _canvas = null,
            _ctx = null,
            _data = null;

        // Check if size is given
        if (_streamConfig.size) {
            if (_video_size.x/_video_size.y > 1) {
                _size.x = _streamConfig.size;
                _size.y = (_video_size.y/_video_size.x)*_streamConfig.size;
            } else {
                _size.y = _streamConfig.size;
                _size.x = (_video_size.x/_video_size.y)*_streamConfig.size;
            }
        }
        
        _sWidth = _video_size.x;
        _dWidth = _size.x;
        _sHeight = _video_size.y;
        _dHeight = _size.y;

        _canvas = canvas ? canvas : document.createElement("canvas");
        _canvas.width = _size.x;
        _canvas.height = _size.y;
        _ctx = _canvas.getContext("2d");
        _data = new Uint8Array(_size.x * _size.y);

        /**
         * Uses the given array as frame-buffer 
         */
        _that.attachData = function(data) {
            _data = data;
        };

        /**
         * Returns the used frame-buffer
         */
        _that.getData = function() {
            return _data;
        };

        /**
         * Fetches a frame from the input-stream and puts into the frame-buffer.
         * The image-data is converted to gray-scale and then half-sampled if configured.
         */
        _that.grab = function() {
            var doHalfSample = _streamConfig.halfSample,
                frame = inputStream.getFrame(),
                ctxData;
            if (frame) {
                _ctx.drawImage(frame, _sx, _sy, _sWidth, _sHeight, _dx, _dy, _dWidth, _dHeight);
                ctxData = _ctx.getImageData(0, 0, _size.x, _size.y).data;
                if(doHalfSample){
                    CVUtils.grayAndHalfSampleFromCanvasData(ctxData, _size, _data);
                } else {
                    CVUtils.computeGray(ctxData, _data);
                }
                return true;
            } else {
                return false;
            }
        };

        _that.getSize = function() {
            return _size;
        };

        return _that;
    };

    return (FrameGrabber);
});

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('html_utils',[], function() {
    

    function createNode(htmlStr) {
        var temp = document.createElement('div');
        
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            return temp.firstChild;
        }
    }

    function mergeObjects(obj1, obj2) {
        for (var p in obj2) {
            try {
                if (obj2[p].constructor == Object) {
                    obj1[p] = mergeObjects(obj1[p], obj2[p]);
                } else {
                    obj1[p] = obj2[p];
                }
            } catch(e) {
                obj1[p] = obj2[p];
            }
        }

        return obj1;
    }

    return {
        createNode : function(htmlStr) {
            return createNode(htmlStr);
        },
        mergeObjects : function(obj1, obj2) {
            return mergeObjects(obj1, obj2);
        }
    };
}); 
/**
 * The basic configuration 
 */

define('config',[],function(){
  var config = {
      inputStream: { name: "Live",
          type: "LiveStream",
          constraints: {
              width: 640,
              height: 480,
              facing: "environment" // or user
          }
      },
      tracking: false,
      debug: false,
      controls: false,
      locate: true,
      numOfWorkers: 4,
      scriptName: 'quagga.js',
      visual: {
        show: true
      },
      decoder:{
        drawBoundingBox: false,
        showFrequency: false,
        drawScanline: false,
        showPattern: false,
        readers: [
          'code_128_reader'
        ]
      },
      locator: {
        halfSample: true,
        showCanvas: false,
        showPatches: false,
        showFoundPatches: false,
        showSkeleton: false,
        showLabels: false,
        showPatchLabels: false,
        showRemainingPatchLabels: false,
        boxFromPatches: {
          showTransformed: false,
          showTransformedBox: false,
          showBB: false
        }
      }
   };
   
   return config;
});
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define('events',[],function() {
    

    var _events = function() {
        var events = {};

        function getEvent(eventName) {
            if (!events[eventName]) {
                events[eventName] = {
                    subscribers : []
                };
            }
            return events[eventName];
        }
        
        function clearEvents(){
            events = {};
        }

        function publishSubscription(subscription, data) {
            if (subscription.async) {
                setTimeout(function() {
                    subscription.callback(data);
                }, 4);
            } else {
                subscription.callback(data);
            }
        }
        
        function subscribe(event, callback, async) {
            var subscription;

            if ( typeof callback === "function") {
                subscription = {
                    callback : callback,
                    async : async
                };
            } else {
                subscription = callback;
                if (!subscription.callback) {
                    throw "Callback was not specified on options";
                }
            }

            getEvent(event).subscribers.push(subscription);
        }

        return {
            subscribe : function(event, callback, async) {
                return subscribe(event, callback, async);
            },
            publish : function(eventName, data) {
                var event = getEvent(eventName),
                    subscribers = event.subscribers;
                    
                event.subscribers = subscribers.filter(function(subscriber) {
                    publishSubscription(subscriber, data);
                    return !subscriber.once;
                });
            },
            once: function(event, callback, async) {
                subscribe(event, {
                    callback: callback,
                    async: async,
                    once: true
                });
            },
            unsubscribe: function(eventName, callback) {
                var event;
                
                if (eventName) {
                    event = getEvent(eventName);
                    if (event && callback) {
                        event.subscribers = event.subscribers.filter(function(subscriber){
                            return subscriber.callback !== callback;
                        });
                    } else {
                        event.subscribers = [];
                    }
                } else {
                    clearEvents();
                }
            }
        };
    }();

    return _events;
}); 
/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define, MediaStreamTrack */

define('camera_access',["html_utils"], function(HtmlUtils) {
    
    var streamRef;
    
    /**
     * Wraps browser-specific getUserMedia
     * @param {Object} constraints
     * @param {Object} success Callback
     * @param {Object} failure Callback
     */
    function getUserMedia(constraints, success, failure) {
        navigator.getUserMedia(constraints, function(stream) {
            streamRef = stream;
            var videoSrc = (window.URL && window.URL.createObjectURL(stream)) || stream;
            success.apply(null, [videoSrc]);
        }, failure);
    }

    /**
     * Tries to attach the camer-stream to a given video-element
     * and calls the callback function when the content is ready
     * @param {Object} constraints
     * @param {Object} video
     * @param {Object} callback
     */
    function initCamera(constraints, video, callback) {
        getUserMedia(constraints, function(src) {
            video.src = src;
            video.addEventListener('loadeddata', function() {
                var attempts = 10;

                function checkVideo() {
                    if (attempts > 0) {
                        if (video.videoWidth > 0 && video.videoHeight > 0) {
                            console.log(video.videoWidth + "px x " + video.videoHeight + "px");
                            callback();
                        } else {
                            window.setTimeout(checkVideo, 500);
                        }
                    } else {
                        callback('Unable to play video stream. Is webcam working?');
                    }
                    attempts--;
                }

                checkVideo();
            }, false);
            video.play();
        }, function(e) {
            console.log(e);
        });
    }

    function normalizeConstraints(config, cb) {
        var constraints = {
                audio: false,
                video: true
            },
            videoConstraints = HtmlUtils.mergeObjects({
                width: 640,
                height: 480,
                facing: "environment"
            }, config);

        if ( typeof MediaStreamTrack.getSources !== 'undefined') {
            MediaStreamTrack.getSources(function(sourceInfos) {
                var videoSourceId;
                for (var i = 0; i != sourceInfos.length; ++i) {
                    var sourceInfo = sourceInfos[i];
                    if (sourceInfo.kind == "video" && sourceInfo.facing == videoConstraints.facing) {
                        videoSourceId = sourceInfo.id;
                    }
                }
                constraints.video = {
                    mandatory: {
                        minWidth: videoConstraints.width,
                        minHeight: videoConstraints.height
                    },
                    optional: [{
                        sourceId: videoSourceId
                    }]
                };
                return cb(constraints);
            });
        } else {
            constraints.video = {
                mediaSource: "camera",
                width: { min: videoConstraints.width, max: videoConstraints.width },
                height: { min: videoConstraints.height, max: videoConstraints.height },
                require: ["width", "height"]
            };
            return cb(constraints);
        }
    }

    /**
     * Requests the back-facing camera of the user. The callback is called
     * whenever the stream is ready to be consumed, or if an error occures.
     * @param {Object} video
     * @param {Object} callback
     */
    function request(video, videoConstraints, callback) {
        normalizeConstraints(videoConstraints, function(constraints) {
            initCamera(constraints, video, callback);
        });
    }

    return {
        request : function(video, constraints, callback) {
            request(video, constraints, callback);
        },
        release : function() {
            var tracks = streamRef && streamRef.getVideoTracks();
            if (tracks.length) {
                tracks[0].stop();
            }
            streamRef = null;
        }
    };
}); 
/*!
 * async
 * https://github.com/caolan/async
 *
 * Copyright 2010-2014 Caolan McMahon
 * Released under the MIT license
 */
/*jshint onevar: false, indent:4 */
/*global setImmediate: false, setTimeout: false, console: false */
(function () {

    var async = {};

    // global on the server, window in the browser
    var root, previous_async;

    root = this;
    if (root != null) {
      previous_async = root.async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    function only_once(fn) {
        var called = false;
        return function() {
            if (called) throw new Error("Callback was already called.");
            called = true;
            fn.apply(root, arguments);
        }
    }

    //// cross-browser compatiblity functions ////

    var _toString = Object.prototype.toString;

    var _isArray = Array.isArray || function (obj) {
        return _toString.call(obj) === '[object Array]';
    };

    var _each = function (arr, iterator) {
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    var _map = function (arr, iterator) {
        if (arr.map) {
            return arr.map(iterator);
        }
        var results = [];
        _each(arr, function (x, i, a) {
            results.push(iterator(x, i, a));
        });
        return results;
    };

    var _reduce = function (arr, iterator, memo) {
        if (arr.reduce) {
            return arr.reduce(iterator, memo);
        }
        _each(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    };

    var _keys = function (obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////
    if (typeof process === 'undefined' || !(process.nextTick)) {
        if (typeof setImmediate === 'function') {
            async.nextTick = function (fn) {
                // not a direct alias for IE10 compatibility
                setImmediate(fn);
            };
            async.setImmediate = async.nextTick;
        }
        else {
            async.nextTick = function (fn) {
                setTimeout(fn, 0);
            };
            async.setImmediate = async.nextTick;
        }
    }
    else {
        async.nextTick = process.nextTick;
        if (typeof setImmediate !== 'undefined') {
            async.setImmediate = function (fn) {
              // not a direct alias for IE10 compatibility
              setImmediate(fn);
            };
        }
        else {
            async.setImmediate = async.nextTick;
        }
    }

    async.each = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        _each(arr, function (x) {
            iterator(x, only_once(done) );
        });
        function done(err) {
          if (err) {
              callback(err);
              callback = function () {};
          }
          else {
              completed += 1;
              if (completed >= arr.length) {
                  callback();
              }
          }
        }
    };
    async.forEach = async.each;

    async.eachSeries = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback();
                    }
                    else {
                        iterate();
                    }
                }
            });
        };
        iterate();
    };
    async.forEachSeries = async.eachSeries;

    async.eachLimit = function (arr, limit, iterator, callback) {
        var fn = _eachLimit(limit);
        fn.apply(null, [arr, iterator, callback]);
    };
    async.forEachLimit = async.eachLimit;

    var _eachLimit = function (limit) {

        return function (arr, iterator, callback) {
            callback = callback || function () {};
            if (!arr.length || limit <= 0) {
                return callback();
            }
            var completed = 0;
            var started = 0;
            var running = 0;

            (function replenish () {
                if (completed >= arr.length) {
                    return callback();
                }

                while (running < limit && started < arr.length) {
                    started += 1;
                    running += 1;
                    iterator(arr[started - 1], function (err) {
                        if (err) {
                            callback(err);
                            callback = function () {};
                        }
                        else {
                            completed += 1;
                            running -= 1;
                            if (completed >= arr.length) {
                                callback();
                            }
                            else {
                                replenish();
                            }
                        }
                    });
                }
            })();
        };
    };


    var doParallel = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.each].concat(args));
        };
    };
    var doParallelLimit = function(limit, fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [_eachLimit(limit)].concat(args));
        };
    };
    var doSeries = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.eachSeries].concat(args));
        };
    };


    var _asyncMap = function (eachfn, arr, iterator, callback) {
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        if (!callback) {
            eachfn(arr, function (x, callback) {
                iterator(x.value, function (err) {
                    callback(err);
                });
            });
        } else {
            var results = [];
            eachfn(arr, function (x, callback) {
                iterator(x.value, function (err, v) {
                    results[x.index] = v;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };
    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);
    async.mapLimit = function (arr, limit, iterator, callback) {
        return _mapLimit(limit)(arr, iterator, callback);
    };

    var _mapLimit = function(limit) {
        return doParallelLimit(limit, _asyncMap);
    };

    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.reduce = function (arr, memo, iterator, callback) {
        async.eachSeries(arr, function (x, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err, memo);
        });
    };
    // inject alias
    async.inject = async.reduce;
    // foldl alias
    async.foldl = async.reduce;

    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, function (x) {
            return x;
        }).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };
    // foldr alias
    async.foldr = async.reduceRight;

    var _filter = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.filter = doParallel(_filter);
    async.filterSeries = doSeries(_filter);
    // select alias
    async.select = async.filter;
    async.selectSeries = async.filterSeries;

    var _reject = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (!v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.reject = doParallel(_reject);
    async.rejectSeries = doSeries(_reject);

    var _detect = function (eachfn, arr, iterator, main_callback) {
        eachfn(arr, function (x, callback) {
            iterator(x, function (result) {
                if (result) {
                    main_callback(x);
                    main_callback = function () {};
                }
                else {
                    callback();
                }
            });
        }, function (err) {
            main_callback();
        });
    };
    async.detect = doParallel(_detect);
    async.detectSeries = doSeries(_detect);

    async.some = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (v) {
                    main_callback(true);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(false);
        });
    };
    // any alias
    async.any = async.some;

    async.every = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (!v) {
                    main_callback(false);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(true);
        });
    };
    // all alias
    async.all = async.every;

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                var fn = function (left, right) {
                    var a = left.criteria, b = right.criteria;
                    return a < b ? -1 : a > b ? 1 : 0;
                };
                callback(null, _map(results.sort(fn), function (x) {
                    return x.value;
                }));
            }
        });
    };

    async.auto = function (tasks, callback) {
        callback = callback || function () {};
        var keys = _keys(tasks);
        var remainingTasks = keys.length
        if (!remainingTasks) {
            return callback();
        }

        var results = {};

        var listeners = [];
        var addListener = function (fn) {
            listeners.unshift(fn);
        };
        var removeListener = function (fn) {
            for (var i = 0; i < listeners.length; i += 1) {
                if (listeners[i] === fn) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        };
        var taskComplete = function () {
            remainingTasks--
            _each(listeners.slice(0), function (fn) {
                fn();
            });
        };

        addListener(function () {
            if (!remainingTasks) {
                var theCallback = callback;
                // prevent final callback from calling itself if it errors
                callback = function () {};

                theCallback(null, results);
            }
        });

        _each(keys, function (k) {
            var task = _isArray(tasks[k]) ? tasks[k]: [tasks[k]];
            var taskCallback = function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (args.length <= 1) {
                    args = args[0];
                }
                if (err) {
                    var safeResults = {};
                    _each(_keys(results), function(rkey) {
                        safeResults[rkey] = results[rkey];
                    });
                    safeResults[k] = args;
                    callback(err, safeResults);
                    // stop subsequent errors hitting callback multiple times
                    callback = function () {};
                }
                else {
                    results[k] = args;
                    async.setImmediate(taskComplete);
                }
            };
            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
            var ready = function () {
                return _reduce(requires, function (a, x) {
                    return (a && results.hasOwnProperty(x));
                }, true) && !results.hasOwnProperty(k);
            };
            if (ready()) {
                task[task.length - 1](taskCallback, results);
            }
            else {
                var listener = function () {
                    if (ready()) {
                        removeListener(listener);
                        task[task.length - 1](taskCallback, results);
                    }
                };
                addListener(listener);
            }
        });
    };

    async.retry = function(times, task, callback) {
        var DEFAULT_TIMES = 5;
        var attempts = [];
        // Use defaults if times not passed
        if (typeof times === 'function') {
            callback = task;
            task = times;
            times = DEFAULT_TIMES;
        }
        // Make sure times is a number
        times = parseInt(times, 10) || DEFAULT_TIMES;
        var wrappedTask = function(wrappedCallback, wrappedResults) {
            var retryAttempt = function(task, finalAttempt) {
                return function(seriesCallback) {
                    task(function(err, result){
                        seriesCallback(!err || finalAttempt, {err: err, result: result});
                    }, wrappedResults);
                };
            };
            while (times) {
                attempts.push(retryAttempt(task, !(times-=1)));
            }
            async.series(attempts, function(done, data){
                data = data[data.length - 1];
                (wrappedCallback || callback)(data.err, data.result);
            });
        }
        // If a callback is passed, run this as a controll flow
        return callback ? wrappedTask() : wrappedTask
    };

    async.waterfall = function (tasks, callback) {
        callback = callback || function () {};
        if (!_isArray(tasks)) {
          var err = new Error('First argument to waterfall must be an array of functions');
          return callback(err);
        }
        if (!tasks.length) {
            return callback();
        }
        var wrapIterator = function (iterator) {
            return function (err) {
                if (err) {
                    callback.apply(null, arguments);
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    async.setImmediate(function () {
                        iterator.apply(null, args);
                    });
                }
            };
        };
        wrapIterator(async.iterator(tasks))();
    };

    var _parallel = function(eachfn, tasks, callback) {
        callback = callback || function () {};
        if (_isArray(tasks)) {
            eachfn.map(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            eachfn.each(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.parallel = function (tasks, callback) {
        _parallel({ map: async.map, each: async.each }, tasks, callback);
    };

    async.parallelLimit = function(tasks, limit, callback) {
        _parallel({ map: _mapLimit(limit), each: _eachLimit(limit) }, tasks, callback);
    };

    async.series = function (tasks, callback) {
        callback = callback || function () {};
        if (_isArray(tasks)) {
            async.mapSeries(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.eachSeries(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.iterator = function (tasks) {
        var makeCallback = function (index) {
            var fn = function () {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            };
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        };
        return makeCallback(0);
    };

    async.apply = function (fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(
                null, args.concat(Array.prototype.slice.call(arguments))
            );
        };
    };

    var _concat = function (eachfn, arr, fn, callback) {
        var r = [];
        eachfn(arr, function (x, cb) {
            fn(x, function (err, y) {
                r = r.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, r);
        });
    };
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        if (test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.whilst(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.doWhilst = function (iterator, test, callback) {
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            var args = Array.prototype.slice.call(arguments, 1);
            if (test.apply(null, args)) {
                async.doWhilst(iterator, test, callback);
            }
            else {
                callback();
            }
        });
    };

    async.until = function (test, iterator, callback) {
        if (!test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.until(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.doUntil = function (iterator, test, callback) {
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            var args = Array.prototype.slice.call(arguments, 1);
            if (!test.apply(null, args)) {
                async.doUntil(iterator, test, callback);
            }
            else {
                callback();
            }
        });
    };

    async.queue = function (worker, concurrency) {
        if (concurrency === undefined) {
            concurrency = 1;
        }
        function _insert(q, data, pos, callback) {
          if (!q.started){
            q.started = true;
          }
          if (!_isArray(data)) {
              data = [data];
          }
          if(data.length == 0) {
             // call drain immediately if there are no tasks
             return async.setImmediate(function() {
                 if (q.drain) {
                     q.drain();
                 }
             });
          }
          _each(data, function(task) {
              var item = {
                  data: task,
                  callback: typeof callback === 'function' ? callback : null
              };

              if (pos) {
                q.tasks.unshift(item);
              } else {
                q.tasks.push(item);
              }

              if (q.saturated && q.tasks.length === q.concurrency) {
                  q.saturated();
              }
              async.setImmediate(q.process);
          });
        }

        var workers = 0;
        var q = {
            tasks: [],
            concurrency: concurrency,
            saturated: null,
            empty: null,
            drain: null,
            started: false,
            paused: false,
            push: function (data, callback) {
              _insert(q, data, false, callback);
            },
            kill: function () {
              q.drain = null;
              q.tasks = [];
            },
            unshift: function (data, callback) {
              _insert(q, data, true, callback);
            },
            process: function () {
                if (!q.paused && workers < q.concurrency && q.tasks.length) {
                    var task = q.tasks.shift();
                    if (q.empty && q.tasks.length === 0) {
                        q.empty();
                    }
                    workers += 1;
                    var next = function () {
                        workers -= 1;
                        if (task.callback) {
                            task.callback.apply(task, arguments);
                        }
                        if (q.drain && q.tasks.length + workers === 0) {
                            q.drain();
                        }
                        q.process();
                    };
                    var cb = only_once(next);
                    worker(task.data, cb);
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            },
            idle: function() {
                return q.tasks.length + workers === 0;
            },
            pause: function () {
                if (q.paused === true) { return; }
                q.paused = true;
            },
            resume: function () {
                if (q.paused === false) { return; }
                q.paused = false;
                // Need to call q.process once per concurrent
                // worker to preserve full concurrency after pause
                for (var w = 1; w <= q.concurrency; w++) {
                    async.setImmediate(q.process);
                }
            }
        };
        return q;
    };

    async.priorityQueue = function (worker, concurrency) {

        function _compareTasks(a, b){
          return a.priority - b.priority;
        };

        function _binarySearch(sequence, item, compare) {
          var beg = -1,
              end = sequence.length - 1;
          while (beg < end) {
            var mid = beg + ((end - beg + 1) >>> 1);
            if (compare(item, sequence[mid]) >= 0) {
              beg = mid;
            } else {
              end = mid - 1;
            }
          }
          return beg;
        }

        function _insert(q, data, priority, callback) {
          if (!q.started){
            q.started = true;
          }
          if (!_isArray(data)) {
              data = [data];
          }
          if(data.length == 0) {
             // call drain immediately if there are no tasks
             return async.setImmediate(function() {
                 if (q.drain) {
                     q.drain();
                 }
             });
          }
          _each(data, function(task) {
              var item = {
                  data: task,
                  priority: priority,
                  callback: typeof callback === 'function' ? callback : null
              };

              q.tasks.splice(_binarySearch(q.tasks, item, _compareTasks) + 1, 0, item);

              if (q.saturated && q.tasks.length === q.concurrency) {
                  q.saturated();
              }
              async.setImmediate(q.process);
          });
        }

        // Start with a normal queue
        var q = async.queue(worker, concurrency);

        // Override push to accept second parameter representing priority
        q.push = function (data, priority, callback) {
          _insert(q, data, priority, callback);
        };

        // Remove unshift function
        delete q.unshift;

        return q;
    };

    async.cargo = function (worker, payload) {
        var working     = false,
            tasks       = [];

        var cargo = {
            tasks: tasks,
            payload: payload,
            saturated: null,
            empty: null,
            drain: null,
            drained: true,
            push: function (data, callback) {
                if (!_isArray(data)) {
                    data = [data];
                }
                _each(data, function(task) {
                    tasks.push({
                        data: task,
                        callback: typeof callback === 'function' ? callback : null
                    });
                    cargo.drained = false;
                    if (cargo.saturated && tasks.length === payload) {
                        cargo.saturated();
                    }
                });
                async.setImmediate(cargo.process);
            },
            process: function process() {
                if (working) return;
                if (tasks.length === 0) {
                    if(cargo.drain && !cargo.drained) cargo.drain();
                    cargo.drained = true;
                    return;
                }

                var ts = typeof payload === 'number'
                            ? tasks.splice(0, payload)
                            : tasks.splice(0, tasks.length);

                var ds = _map(ts, function (task) {
                    return task.data;
                });

                if(cargo.empty) cargo.empty();
                working = true;
                worker(ds, function () {
                    working = false;

                    var args = arguments;
                    _each(ts, function (data) {
                        if (data.callback) {
                            data.callback.apply(null, args);
                        }
                    });

                    process();
                });
            },
            length: function () {
                return tasks.length;
            },
            running: function () {
                return working;
            }
        };
        return cargo;
    };

    var _console_fn = function (name) {
        return function (fn) {
            var args = Array.prototype.slice.call(arguments, 1);
            fn.apply(null, args.concat([function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (typeof console !== 'undefined') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _each(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            }]));
        };
    };
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        var queues = {};
        hasher = hasher || function (x) {
            return x;
        };
        var memoized = function () {
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (key in memo) {
                async.nextTick(function () {
                    callback.apply(null, memo[key]);
                });
            }
            else if (key in queues) {
                queues[key].push(callback);
            }
            else {
                queues[key] = [callback];
                fn.apply(null, args.concat([function () {
                    memo[key] = arguments;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                      q[i].apply(null, arguments);
                    }
                }]));
            }
        };
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
    };

    async.unmemoize = function (fn) {
      return function () {
        return (fn.unmemoized || fn).apply(null, arguments);
      };
    };

    async.times = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.map(counter, iterator, callback);
    };

    async.timesSeries = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.mapSeries(counter, iterator, callback);
    };

    async.seq = function (/* functions... */) {
        var fns = arguments;
        return function () {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            async.reduce(fns, args, function (newargs, fn, cb) {
                fn.apply(that, newargs.concat([function () {
                    var err = arguments[0];
                    var nextargs = Array.prototype.slice.call(arguments, 1);
                    cb(err, nextargs);
                }]))
            },
            function (err, results) {
                callback.apply(that, [err].concat(results));
            });
        };
    };

    async.compose = function (/* functions... */) {
      return async.seq.apply(null, Array.prototype.reverse.call(arguments));
    };

    var _applyEach = function (eachfn, fns /*args...*/) {
        var go = function () {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            return eachfn(fns, function (fn, cb) {
                fn.apply(that, args.concat([cb]));
            },
            callback);
        };
        if (arguments.length > 2) {
            var args = Array.prototype.slice.call(arguments, 2);
            return go.apply(this, args);
        }
        else {
            return go;
        }
    };
    async.applyEach = doParallel(_applyEach);
    async.applyEachSeries = doSeries(_applyEach);

    async.forever = function (fn, callback) {
        function next(err) {
            if (err) {
                if (callback) {
                    return callback(err);
                }
                throw err;
            }
            fn(next);
        }
        next();
    };

    // Node.js
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
    }
    // AMD / RequireJS
    else if (typeof define !== 'undefined' && define.amd) {
        define('async',[], function () {
            return async;
        });
    }
    // included directly via <script> tag
    else {
        root.async = async;
    }

}());

/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define,  vec2, importScripts */

define('quagga',["code_128_reader", "ean_reader", "input_stream", "image_wrapper", "barcode_locator", "barcode_decoder", "frame_grabber", "html_utils", "config", "events", "camera_access", "async", "image_debug"],
function(Code128Reader, EANReader, InputStream, ImageWrapper, BarcodeLocator, BarcodeDecoder, FrameGrabber, HtmlUtils, _config, Events, CameraAccess, async, ImageDebug) {
    
    
    var _inputStream,
        _framegrabber,
        _stopped,
        _canvasContainer = {
            ctx : {
                image : null,
                overlay : null
            },
            dom : {
                image : null,
                overlay : null
            }
        },
        _inputImageWrapper,
        _boxSize,
        _decoder,
        _workerPool = [],
        _onUIThread = true;

    function initializeData(imageWrapper) {
        initBuffers(imageWrapper);
        _decoder = BarcodeDecoder.create(_config.decoder, _inputImageWrapper);
    }

    function initConfig() {
        var vis = [{
            node : document.querySelector("div[data-controls]"),
            prop : _config.controls
        }, {
            node : _canvasContainer.dom.overlay,
            prop : _config.visual.show
        }];

        for (var i = 0; i < vis.length; i++) {
            if (vis[i].node) {
                if (vis[i].prop === true) {
                    vis[i].node.style.display = "block";
                } else {
                    vis[i].node.style.display = "none";
                }
            }
        }
    }

    function initInputStream(cb) {
        var video;
        if (_config.inputStream.type == "VideoStream") {
            video = document.createElement("video");
            _inputStream = InputStream.createVideoStream(video);
        } else if (_config.inputStream.type == "ImageStream") {
            _inputStream = InputStream.createImageStream();
        } else if (_config.inputStream.type == "LiveStream") {
            video = document.createElement("video");
            var $viewport = document.querySelector("#interactive.viewport");
            if($viewport) {
                $viewport.appendChild(video);
            }
            _inputStream = InputStream.createLiveStream(video);
            CameraAccess.request(video, _config.inputStream.constraints, function(err) {
                if (!err) {
                    _inputStream.trigger("canrecord");
                } else {
                    console.log(err);
                }
            });
        }

        _inputStream.setAttribute("preload", "auto");
        _inputStream.setAttribute("autoplay", true);
        _inputStream.setInputStream(_config.inputStream);
        _inputStream.addEventListener("canrecord", canRecord.bind(undefined, cb));
    }

    function canRecord(cb) {
        initCanvas();
        _framegrabber = FrameGrabber.create(_inputStream, _canvasContainer.dom.image);
        initConfig();

        if (_config.numOfWorkers > 0) {
            initWorkers(function() {
                console.log("Workers created");
                ready(cb);
            });
        } else {
            initializeData();
            ready(cb);
        }
    }

    function ready(cb){
        _inputStream.play();
        cb();
    }

    function initCanvas() {
        var $viewport = document.querySelector("#interactive.viewport");
        _canvasContainer.dom.image = document.querySelector("canvas.imgBuffer");
        if (!_canvasContainer.dom.image) {
            _canvasContainer.dom.image = document.createElement("canvas");
            _canvasContainer.dom.image.className = "imgBuffer";
            if($viewport && _config.inputStream.type == "ImageStream") {
                $viewport.appendChild(_canvasContainer.dom.image);
            }
        }
        _canvasContainer.ctx.image = _canvasContainer.dom.image.getContext("2d");
        _canvasContainer.dom.image.width = _inputStream.getWidth();
        _canvasContainer.dom.image.height = _inputStream.getHeight();

        _canvasContainer.dom.overlay = document.querySelector("canvas.drawingBuffer");
        if (!_canvasContainer.dom.overlay) {
            _canvasContainer.dom.overlay = document.createElement("canvas");
            _canvasContainer.dom.overlay.className = "drawingBuffer";
            if($viewport) {
                $viewport.appendChild(_canvasContainer.dom.overlay);
            }
            var clearFix = document.createElement("br");
            clearFix.setAttribute("clear", "all");
            if($viewport) {
                $viewport.appendChild(clearFix);
            }
        }
        _canvasContainer.ctx.overlay = _canvasContainer.dom.overlay.getContext("2d");
        _canvasContainer.dom.overlay.width = _inputStream.getWidth();
        _canvasContainer.dom.overlay.height = _inputStream.getHeight();
    }

    function initBuffers(imageWrapper) {
        if (imageWrapper) {
            _inputImageWrapper = imageWrapper;
        } else {
            _inputImageWrapper = new ImageWrapper({
                x : _inputStream.getWidth(),
                y : _inputStream.getHeight()
            });
        }

        console.log(_inputImageWrapper.size);
        _boxSize = [
                vec2.create([20, _inputImageWrapper.size.y / 2 - 100]),
                vec2.create([20, _inputImageWrapper.size.y / 2 + 100]),
                vec2.create([_inputImageWrapper.size.x - 20, _inputImageWrapper.size.y / 2 + 100]),
                vec2.create([_inputImageWrapper.size.x - 20, _inputImageWrapper.size.y / 2 - 100])
            ];
        BarcodeLocator.init(_inputImageWrapper, _config.locator);
    }

    function getBoundingBoxes() {
        if (_config.locate) {
            return BarcodeLocator.locate();
        } else {
            return [_boxSize];
        }
    }

    function locateAndDecode() {
        var result,
            boxes;

        boxes = getBoundingBoxes();
        if (boxes) {
            result = _decoder.decodeFromBoundingBoxes(boxes);
            result = result || {};
            result.boxes = boxes;
            Events.publish("processed", result);
            if (result && result.codeResult) {
                Events.publish("detected", result);
            }
        } else {
            Events.publish("processed");
        }

    }

    function update() {
        var availableWorker;

        if (_onUIThread) {
            if (_workerPool.length > 0) {
                availableWorker = _workerPool.filter(function(workerThread) {
                    return !workerThread.busy;
                })[0];
                if (availableWorker) {
                    _framegrabber.attachData(availableWorker.imageData);
                } else {
                    return; // all workers are busy
                }
            } else {
                _framegrabber.attachData(_inputImageWrapper.data);
            }
            if (_framegrabber.grab()) {
                if (availableWorker) {
                    availableWorker.busy = true;
                    availableWorker.worker.postMessage({
                        cmd: 'process',
                        imageData: availableWorker.imageData
                    }, [availableWorker.imageData.buffer]);
                } else {
                    locateAndDecode();
                }
            }
        } else {
            locateAndDecode();
        }
    }

    function start() {
        _stopped = false;
        ( function frame() {
            if (!_stopped) {
                update();
                if (_onUIThread && _config.inputStream.type == "LiveStream") {
                    window.requestAnimFrame(frame);
                }
            }
        }());
    }

    function initWorkers(cb) {
        _workerPool = [];

        async.times(_config.numOfWorkers, function(n, next) {
            initWorker(function(workerThread) {
                _workerPool.push(workerThread);
                next(null);
            });
        }, cb);
    }

    function initWorker(cb) {
        var blobURL,
            workerThread = {
                worker: null,
                imageData: new Uint8Array(_inputStream.getWidth() * _inputStream.getHeight()),
                busy: true
            };

        blobURL = generateWorkerBlob();
        workerThread.worker = new Worker(blobURL);
        URL.revokeObjectURL(blobURL);

        workerThread.worker.onmessage = function(e) {
            if (e.data.event === 'initialized') {
                workerThread.busy = false;
                workerThread.imageData = new Uint8Array(e.data.imageData);
                console.log("Worker initialized");
                return cb(workerThread);
            } else if (e.data.event === 'processed') {
                workerThread.imageData = new Uint8Array(e.data.imageData);
                workerThread.busy = false;
                Events.publish("processed", e.data.result);
                if (e.data.result && e.data.result.codeResult) {
                    Events.publish("detected", e.data.result);
                }
            }
        };

        workerThread.worker.postMessage({
            cmd: 'init',
            size: {x: _inputStream.getWidth(), y: _inputStream.getHeight()},
            imageData: workerThread.imageData,
            config: _config
        }, [workerThread.imageData.buffer]);
    }


    function workerInterface(scriptUrl) {
        importScripts(scriptUrl);
        /* jshint ignore:start */
        var imageWrapper;

        self.onmessage = function(e) {
            if (e.data.cmd === 'init') {
                var config = e.data.config;
                config.numOfWorkers = 0;
                imageWrapper = new Quagga.ImageWrapper({
                    x : e.data.size.x,
                    y : e.data.size.y
                }, new Uint8Array(e.data.imageData));
                Quagga.init(config, ready, imageWrapper);
                Quagga.onProcessed(onProcessed);
            } else if (e.data.cmd === 'process') {
                imageWrapper.data = new Uint8Array(e.data.imageData);
                Quagga.start();
            } else if (e.data.cmd === 'setReaders') {
                Quagga.setReaders(e.data.readers);
            }
        };

        function onProcessed(result) {
            self.postMessage({'event': 'processed', imageData: imageWrapper.data, result: result}, [imageWrapper.data.buffer]);
        }

        function ready() {
            self.postMessage({'event': 'initialized', imageData: imageWrapper.data}, [imageWrapper.data.buffer]);
        }
        /* jshint ignore:end */
    }

    function generateWorkerBlob() {
        var blob,
            quaggaAbsoluteUrl,
            scripts = document.getElementsByTagName('script'),
            regex = new RegExp('\/' + _config.scriptName + '$');

        quaggaAbsoluteUrl = Array.prototype.slice.apply(scripts).filter(function(script) {
            return script.src && script.src.match(regex);
        }).map(function(script) {
            return script.src;
        })[0];


        blob = new Blob(['(' + workerInterface.toString() + ')("' + quaggaAbsoluteUrl + '");'],
            {type : 'text/javascript'});

        return window.URL.createObjectURL(blob);
    }

    function setReaders(readers) {
        if (_decoder) {
            _decoder.setReaders(readers);
        } else if (_onUIThread && _workerPool.length > 0) {
            _workerPool.forEach(function(workerThread) {
                workerThread.worker.postMessage({cmd: 'setReaders', readers: readers});
            });
        }
    }

    return {
        init : function(config, cb, imageWrapper) {
            _config = HtmlUtils.mergeObjects(_config, config);
            if (imageWrapper) {
                _onUIThread = false;
                initializeData(imageWrapper);
                return cb();
            } else {
                initInputStream(cb);
            }
        },
        start : function() {
            start();
        },
        stop : function() {
            _stopped = true;
            if (_config.inputStream.type === "LiveStream") {
                CameraAccess.release();
            }
        },
        onDetected : function(callback) {
            Events.subscribe("detected", callback);
        },
        onProcessed: function(callback) {
            Events.subscribe("processed", callback);
        },
        setReaders: function(readers) {
            setReaders(readers);
        },
        canvas : _canvasContainer,
        decodeSingle : function(config, resultCallback) {
            config.inputStream = {
                type : "ImageStream",
                src : config.src,
                sequence : false,
                size: 800
            };
            config.numOfWorkers = 1;
            this.init(config, function() {
                Events.once("detected", function(result) {
                    _stopped = true;
                    resultCallback.call(null, result);
                }, true);
                start();
            });
        },
        Reader: {
          EANReader : EANReader,
          Code128Reader : Code128Reader
        },
        ImageWrapper: ImageWrapper,
        ImageDebug: ImageDebug
    };
});

    return require('quagga');
}));