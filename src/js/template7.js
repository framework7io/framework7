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
                
                if (helperSlices.length > 1) {
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
        
        function getCompileFn(block, depth) {
            if (block.content) return compile(block.content, depth);
            else return function () {return ''; };
        }
        function getCompileInverse(block, depth) {
            if (block.inverseContent) return compile(block.inverseContent, depth);
            else return function () {return ''; };
        }
        function getCompileVar(name, ctx) {
            var parents, variable, context;
            
            if (name.indexOf('.') > 0) {
                if (name.indexOf('this') === 0) variable = name.replace('this', ctx);
                else variable = ctx + '.' + name;
            }
            else if (name.indexOf('../') === 0) {
                var levelUp = name.split('../').length - 1;
                var newName = name.split('../')[name.split('../').length - 1];
                var newDepth = ctx.split('_')[1] - levelUp;
                variable = 'ctx_' + (newDepth >= 1 ? newDepth : 1) + '.' + newName;
            }
            else {
                variable = name === 'this' ? ctx : ctx + '.' + name;
            }
            if (name && name.indexOf('@') >= 0) {
                variable = '(data && data.' + name.replace('@', '') + ')';
            }
                
            return variable;
        }
        function compile(template, depth) {
            depth = depth || 1;
            template = template || t.template;
            if (typeof template !== 'string') {
                throw new Error('Template7: Template must be a string');
            }
            var blocks = stringToBlocks(template);
            
            if (blocks.length === 0) {
                return function () { return ''; };
            }
            var ctx = 'ctx_' + depth;
            var resultString = '(function (' + ctx + ', data) {\n';
            if (depth === 1) {
                resultString += 'function isArray(arr){return Object.prototype.toString.apply(arr) === \'[object Array]\';}\n';
                resultString += 'function isFunction(func){return (typeof func === \'function\');}\n';
                resultString += 'function c(val, ctx) {if (typeof val !== "undefined") {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n';
            }
            resultString += 'var r = \'\';\n';
            var i, j, context;
            for (i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                // Plain block
                if (block.type === 'plain') {
                    resultString += 'r +=\'' + (block.content).replace(/\n/g, '\\n').replace(/'/g, '\\' + '\'') + '\';';
                    continue;
                }
                var variable;
                // Variable block
                if (block.type === 'variable') {
                    variable = getCompileVar(block.contextName, ctx);
                    resultString += 'r += c(' + variable + ', ' + ctx + ');';
                }
                // Helpers block
                if (block.type === 'helper') {
                    if (block.helperName in t.helpers) {
                        variable = getCompileVar(block.contextName, ctx);
                        resultString += 'r += (Template7.helpers.' + block.helperName + ').call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + '});';
                    }
                    else {
                        if (block.contextName) {
                            throw new Error('Template7: Missing helper: "' + block.helperName + '"');
                        }
                        else {
                            variable = getCompileVar(block.helperName, ctx);
                            resultString += 'if (' + variable + ') {';
                            resultString += 'if (isArray(' + variable + ')) {';
                            resultString += 'r += (Template7.helpers.each).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + '});';
                            resultString += '}else {';
                            resultString += 'r += (Template7.helpers.with).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + '});';
                            resultString += '}}';
                        }
                    }
                }
            }
            resultString += '\nreturn r;})';
            return eval.call(window, resultString);
        }
        t.compile = function (template) {
            if (!t.compiled) {
                t.compiled = compile(template);
            }
            return t.compiled;
        };
    };
    Template7.prototype = {
        options: {
            // cache: false
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
            var rendered = instance.compile()(data);
            instance = null;
            return (rendered);
        }
        else return new Template7(template);
    };
    t7.registerHelper = function (name, fn) {
        Template7.prototype.helpers[name] = fn;
    };
    
    t7.compile = function (template) {
        var instance = new Template7(template);
        return instance.compile();
    };
    
    t7.options = Template7.prototype.options;
    t7.helpers = Template7.prototype.helpers;
    return t7;
})();