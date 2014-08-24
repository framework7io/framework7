/*===========================
Template7 Template engine
===========================*/
window.Template7 = (function () {
    'use strict';
    function isArray(arr) {
        return Object.prototype.toString.apply(arr) === '[object Array]';
    }
    function isObject(obj) {
        return obj instanceof Object;
    }
    function isFunction(func) {
        return typeof func === 'function';
    }
    var cache = {};
    function stringToBlocks(string) {
        var blocks = [], i, j, k;
        if (!string) return [];
        var _blocks = string.split(/({{[^{^}]*}})/);
        for (i = 0; i < _blocks.length; i++) {
            var block = _blocks[i];
            if (block === '') continue;
            if (block.indexOf('{{') < 0) {
                blocks.push({
                    type: 'plain',
                    content: block
                });
            }
            else {
                if (block.indexOf('{/') >= 0) {
                    continue;
                }
                if (block.indexOf('{#') < 0 && block.indexOf(' ') < 0 && block.indexOf('else') < 0) {
                    // Simple variable
                    blocks.push({
                        type: 'variable',
                        contextName: block.replace(/[{}]/g, '')
                    });
                    continue;
                }
                // Helpers
                var helperSlices = block.replace(/[{}#}]/g, '').split(' ');
                var helperName = helperSlices[0];
                var helperContext = helperSlices[1];
                var helperHash = {};

                if (helperSlices.length > 2) {
                    var hashRes;
                    var reg = new RegExp(/\b(\w+)=["']([^"']+)(?=["'])/g);
                    while ((hashRes = reg.exec(block)) !== null) {
                        helperHash[hashRes[1]] = hashRes[2] === 'false' ? false : hashRes[2];
                    }
                }
                    
                if (block.indexOf('{#') >= 0) {
                    // Condition/Helper
                    var helperStartIndex = i;
                    var helperContent = '';
                    var elseContent = '';
                    var toSkip = 0;
                    var shiftIndex;
                    var foundClosed = false, foundElse = false, foundClosedElse = false, depth = 0;
                    for (j = i + 1; j < _blocks.length; j++) {
                        if (_blocks[j].indexOf('{{#') >= 0) {
                            depth ++;
                        }
                        if (_blocks[j].indexOf('{{/') >= 0) {
                            depth --;
                        }
                        if (_blocks[j].indexOf('{{#' + helperName) >= 0) {
                            helperContent += _blocks[j];
                            if (foundElse) elseContent += _blocks[j];
                            toSkip ++;
                        }
                        else if (_blocks[j].indexOf('{{/' + helperName) >= 0) {
                            if (toSkip > 0) {
                                toSkip--;
                                helperContent += _blocks[j];
                                if (foundElse) elseContent += _blocks[j];
                            }
                            else {
                                shiftIndex = j;
                                foundClosed = true;
                                break;
                            }
                        }
                        else if (_blocks[j].indexOf('else') >= 0 && depth === 0) {
                            foundElse = true;
                        }
                        else {
                            if (!foundElse) helperContent += _blocks[j];
                            if (foundElse) elseContent += _blocks[j];
                        }

                    }
                    if (foundClosed) {
                        if (shiftIndex) i = shiftIndex;
                        blocks.push({
                            type: 'helper',
                            helperName: helperName,
                            contextName: helperContext,
                            content: helperContent,
                            inverseContent: elseContent,
                            hash: helperHash
                        });
                    }
                }
                else if (block.indexOf(' ') > 0) {
                    blocks.push({
                        type: 'helper',
                        helperName: helperName,
                        contextName: helperContext,
                        hash: helperHash
                    });
                }
            }
        }
        return blocks;
    }
    var Template7 = function (template, data) {
        var t = this;
        t.template = template;
        t.context = data;
        
        function getContext(contextName, context, privateData) {
            if (contextName === 'this' || typeof contextName === 'undefined') {
                return context;
            }

            if (contextName.indexOf('@') >= 0) {
                //private data
                var privateVarName = contextName.replace(/[@ ]/g, '');
                if (privateData && typeof privateData[privateVarName] !== 'undefined') return privateData[privateVarName];
            }
            
            if (contextName.indexOf('.') > 0 && contextName.indexOf('../') < 0) {
                var dataPath = contextName.split('.');
                var _context = context;
                for (var j = 0; j < dataPath.length; j++) {
                    if (dataPath[j] === 'this') {
                        _context = context;
                    }
                    else if (typeof _context !== 'undefined' && isObject(context) && dataPath[j] in _context) {
                        _context = _context[dataPath[j]];
                    }
                    else {
                        _context = undefined;
                    }
                }
                context = _context;
            }
            else if (contextName.indexOf('../') >= 0) {
            }
            else if (context[contextName]) {
                context = context[contextName];
            }
            else {
                context = undefined;
            }
            return context;
        }
        function createOptions(block, privateData) {
            return {
                fn: function (newContext, privateData) {
                    return render(block.content, newContext, privateData);
                },
                inverse: function (newContext, privateData) {
                    return block.inverseContent ? render(block.inverseContent, newContext, privateData) : '';
                },
                hash: block.hash || {},
                helpers: t.helpers,
                data: privateData
            };
        }
        function render(template, data, privateData) {
            template = template || t.template;
            if (typeof template !== 'string') {
                throw new Error('Template7: Template must be a string');
            }
            var scope = data || t.context;
            var blocks = stringToBlocks(template);
            var resultString = '';
            var i, j, context;
            for (i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                // Plain block
                if (block.type === 'plain') {
                    resultString += block.content;
                    continue;
                }
                // Variable block
                if (block.type === 'variable') {
                    context = getContext(block.contextName, scope, privateData);
                    if (typeof context !== 'undefined') {
                        resultString += context.toString();
                    }
                }
                // Helpers block
                if (block.type === 'helper') {
                    context = getContext(block.contextName, scope, privateData);
                    // Create options
                    var options = createOptions(block, privateData);
                    var helperResult;
                    var helperName = block.helperName;
                    if (block.helperName in t.helpers) {
                        helperResult = t.helpers[helperName].call(scope, context, options);
                    }
                    else {
                        if (!block.contextName && (helperName === 'this' || (isObject(context) && helperName in context))) {
                            var _context = helperName === 'this' ? context : context[helperName];
                            if (isArray(_context)) helperResult = t.helpers.each.call(scope, context[helperName], options);
                            else helperResult = render(block.content, context[helperName]);
                        }
                        else {
                            throw new Error('Template7: Missing helper: "' + helperName + '"');
                        }
                    }
                    if (typeof helperResult !== 'undefined') {
                        resultString += helperResult.toString();
                    }
                }
            }
            return resultString;
        }

        var depth = 0;
        function getCompileFn(block) {
            if (block.content) return compile(block.content);
            else return function () {return ''; };
        }
        function getCompileInverse(block) {
            if (block.inverseContent) return compile(block.inverseContent);
            else return function () {return ''; };
        }
        function getCompileVar(name) {
            var variable = name === 'this' ? 'ctx' : 'ctx.' + name;
            if (name && name.indexOf('@') >= 0) {
                variable = '(data && data.' + name.replace('@', '') + ')';
            }
            return variable;
        }
        function compile(template) {
            template = template || t.template;
            if (typeof template !== 'string') {
                throw new Error('Template7: Template must be a string');
            }
            var blocks = stringToBlocks(template);
            if (blocks.length === 0) {
                return function () { return ''; };
            }
            var resultString = '(function (ctx, data) {\n';
            if (depth === 0) {
                resultString += 'function c(val) {if (typeof val !== "undefined") return val; else return ""}\n';
                resultString += 'function isArray(arr){return Object.prototype.toString.apply(arr) === \'[object Array]\';}\n';
            }
            depth ++;
            resultString += 'var ret = \'\';\n';
            var i, j, context;
            for (i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                // Plain block
                if (block.type === 'plain') {
                    resultString += 'ret +=\'' + (block.content).replace(/\n/g, '\\n').replace(/'/g, '\\' + '\'') + '\';';
                    continue;
                }
                var variable;
                // Variable block
                if (block.type === 'variable') {
                    variable = getCompileVar(block.contextName);
                    resultString += 'ret += c(' + variable + ');';
                }
                // Helpers block
                if (block.type === 'helper') {
                    if (block.helperName in t.helpers) {
                        variable = getCompileVar(block.contextName);
                        resultString += 'ret += (Template7.helpers.' + block.helperName + ').call(ctx, ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block) + ', inverse: ' + getCompileInverse(block) + '});';
                    }
                    else {
                        if (block.contextName) {
                            throw new Error('Template7: Missing helper: "' + block.helperName + '"');
                        }
                        else {
                            variable = getCompileVar(block.helperName);
                            resultString += 'if (' + variable + ') {';
                            resultString += 'if (isArray(' + variable + ')) {';
                            resultString += 'ret += (Template7.helpers.each).call(ctx, ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block) + ', inverse: ' + getCompileInverse(block) + '});';
                            resultString += '}else {';
                            resultString += 'ret += (Template7.helpers.with).call(ctx, ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block) + ', inverse: ' + getCompileInverse(block) + '});';
                            resultString += '}}';
                        }
                    }
                }
            }
            resultString += '\nreturn ret;})';
            return eval.call(window, resultString);
        }
        t.compile = function (template) {
            if (!t.compiled) {
                t.compiled = compile(template);
            }
            return t.compiled;
        };
        t.render = function (data) {
            t.context = data;
            t.prevContext = undefined;
            var rendered, cached, id;
            if (t.options.cache) {
                for (var key in cache) {
                    if (key.indexOf('template_') >= 0 && cache[key] === t.template) {
                        id = key.split('template_')[1];
                        if (cache['data_' + id] === JSON.stringify(data)) cached = cache['rendered_' + id];
                    }
                }
                if (cached) return cached;
            }
            rendered = render(t.template, data);
            if (t.options.cache) {
                id = new Date().getTime();
                cache['template_' + id] = t.template;
                cache['data_' + id] = JSON.stringify(data);
                cache['rendered_' + id] = rendered;
            }
            return rendered;
        };
    };
    Template7.prototype = {
        options: {
            cache: false
        },
        helpers: {
            'if': function (context, options) {
                if (isFunction(context)) { context = context.call(this); }
                if (context) {
                    return options.fn(this, options.data);
                }
                else {
                    return options.inverse(this, options.data);
                }
            },
            'unless': function (context, options) {
                if (isFunction(context)) { context = context.call(this); }
                if (!context) {
                    return options.fn(this, options.data);
                }
                else {
                    return options.inverse(this, options.data);
                }
            },
            'each': function (context, options) {
                var ret = '', i = 0;
                if (isFunction(context)) { context = context.call(this); }
                if (isArray(context)) {
                    if (options.hash.reverse && !context.t7Reversed) {
                        context = context.reverse();
                        context.t7Reversed = true;
                    }
                    if (!options.hash.reverse && context.t7Reversed) {
                        context = context.reverse();
                        context.t7Reversed = false;
                    }
                    for (i = 0; i < context.length; i++) {
                        ret += options.fn(context[i], {first: i === 0, last: i === context.length - 1, index: i});
                    }
                }
                else {
                    for (var key in context) {
                        i++;
                        ret += options.fn(context[key], {key: key});
                    }
                }
                if (i > 0) return ret;
                else return options.inverse(this);
            },
            'with': function (context, options) {
                if (isFunction(context)) { context = context.call(this); }
                return options.fn(context);
            },
            'join': function (context, options) {
                if (isFunction(context)) { context = context.call(this); }
                return context.join(options.hash.delimeter);
            }
        }
    };
    var t7 = function (template, data) {
        if (arguments.length === 2) {
            var instance = new Template7(template);
            var rendered = instance.render(data);
            instance = null;
            return (rendered);
        }
        else return new Template7(template);
    };
    t7.registerHelper = function (name, fn) {
        Template7.prototype.helpers[name] = fn;
    };
    t7.render = function (template, data) {
        var instance = t7(template, data);
    };
    t7.compile = function (template) {
        var instance = new Template7(template);
        return instance.compile();
    };
    t7.cache = cache;
    t7.clearCache = function (arg) {
        if (arguments.length === 0) {
            cache = {};
            return;
        }
        var key, id;
        // Clear by passed data
        for (key in cache) {
            var lookFor = typeof arg === 'string' ? 'template_' : 'data_';
            var compareWith = typeof arg === 'string' ? arg : JSON.strigify(arg);
            if (key.indexOf(lookFor) >= 0 && cache[key] === arg) {
                id = key.split('_')[1];
            }
        }
        if (id) {
            delete cache['template_' + id];
            delete cache['data_' + id];
            delete cache['rendered_' + id];
        }
    };
    t7.options = Template7.prototype.options;
    t7.helpers = Template7.prototype.helpers;
    return t7;
})();