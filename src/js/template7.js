/*===========================
Template7 Template engine
===========================*/
window.Template7 = (function () {
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
    function helperToSlices(string) {
        var helperParts = string.replace(/[{}#}]/g, '').split(' ');
        var slices = [];
        var shiftIndex, i, j;
        for (i = 0; i < helperParts.length; i++) {
            var part = helperParts[i];
            if (i === 0) slices.push(part);
            else {
                if (part.indexOf('"') === 0) {
                    // Plain String
                    if (part.match(/"/g).length === 2) {
                        // One word string
                        slices.push(part);
                    }
                    else {
                        // Find closed Index
                        shiftIndex = 0;
                        for (j = i + 1; j < helperParts.length; j++) {
                            part += ' ' + helperParts[j];
                            if (helperParts[j].indexOf('"') >= 0) {
                                shiftIndex = j;
                                slices.push(part);
                                break;
                            }
                        }
                        if (shiftIndex) i = shiftIndex;
                    }
                }
                else {
                    if (part.indexOf('=') > 0) {
                        // Hash
                        var hashParts = part.split('=');
                        var hashName = hashParts[0];
                        var hashContent = hashParts[1];
                        if (hashContent.match(/"/g).length !== 2) {
                            shiftIndex = 0;
                            for (j = i + 1; j < helperParts.length; j++) {
                                hashContent += ' ' + helperParts[j];
                                if (helperParts[j].indexOf('"') >= 0) {
                                    shiftIndex = j;
                                    break;
                                }
                            }
                            if (shiftIndex) i = shiftIndex;
                        }
                        var hash = [hashName, hashContent.replace(/"/g,'')];
                        slices.push(hash);
                    }
                    else {
                        // Plain variable
                        slices.push(part);
                    }
                }
            }
        }
        return slices;
    }
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
                var helperSlices = helperToSlices(block);
                var helperName = helperSlices[0];
                var isPartial = helperName === '>';
                var helperContext = [];
                var helperHash = {};
                for (j = 1; j < helperSlices.length; j++) {
                    var slice = helperSlices[j];
                    if (isArray(slice)) {
                        // Hash
                        helperHash[slice[0]] = slice[1] === 'false' ? false : slice[1];
                    }
                    else {
                        helperContext.push(slice);
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
                    if (isPartial) {
                        helperName = '_partial';
                        if (helperContext[0]) helperContext[0] = '"' + helperContext[0].replace(/"|'/g, '') + '"';
                    }
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
    var Template7 = function (template) {
        var t = this;
        t.template = template;
        
        function getCompileFn(block, depth) {
            if (block.content) return compile(block.content, depth);
            else return function () {return ''; };
        }
        function getCompileInverse(block, depth) {
            if (block.inverseContent) return compile(block.inverseContent, depth);
            else return function () {return ''; };
        }
        function getCompileVar(name, ctx) {
            var variable, parts, levelsUp = 0, initialCtx = ctx;
            if (name.indexOf('../') === 0) {
                levelsUp = name.split('../').length - 1;
                var newDepth = ctx.split('_')[1] - levelsUp;
                ctx = 'ctx_' + (newDepth >= 1 ? newDepth : 1);
                parts = name.split('../')[levelsUp].split('.');
            }
            else if (name.indexOf('@global') === 0) {
                ctx = 'Template7.global';
                parts = name.split('@global.')[1].split('.');
            }
            else if (name.indexOf('@root') === 0) {
                ctx = 'ctx_1';
                parts = name.split('@root.')[1].split('.');
            }
            else {
                parts = name.split('.');
            }
            variable = ctx;
            for (var i = 0; i < parts.length; i++) {
                var part = parts[i];
                if (part.indexOf('@') === 0) {
                    if (i > 0) {
                        variable += '[(data && data.' + part.replace('@', '') + ')]';
                    }
                    else {
                        variable = '(data && data.' + name.replace('@', '') + ')';
                    }
                }
                else {
                    if (isFinite(part)) {
                        variable += '[' + part + ']';
                    }
                    else {
                        if (part.indexOf('this') === 0) {
                            variable = part.replace('this', ctx);
                        }
                        else {
                            variable += '.' + part;       
                        }
                    }
                }
            }

            return variable;
        }
        function getCompiledArguments(contextArray, ctx) {
            var arr = [];
            for (var i = 0; i < contextArray.length; i++) {
                if (contextArray[i].indexOf('"') === 0) arr.push(contextArray[i]);
                else {
                    arr.push(getCompileVar(contextArray[i], ctx));
                }
            }
            return arr.join(', ');
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
                    resultString += 'r +=\'' + (block.content).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/'/g, '\\' + '\'') + '\';';
                    continue;
                }
                var variable, compiledArguments;
                // Variable block
                if (block.type === 'variable') {
                    variable = getCompileVar(block.contextName, ctx);
                    resultString += 'r += c(' + variable + ', ' + ctx + ');';
                }
                // Helpers block
                if (block.type === 'helper') {
                    if (block.helperName in t.helpers) {
                        compiledArguments = getCompiledArguments(block.contextName, ctx);
                        resultString += 'r += (Template7.helpers.' + block.helperName + ').call(' + ctx + ', ' + (compiledArguments && (compiledArguments + ', ')) +'{hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + ', root: ctx_1});';
                    }
                    else {
                        if (block.contextName.length > 0) {
                            throw new Error('Template7: Missing helper: "' + block.helperName + '"');
                        }
                        else {
                            variable = getCompileVar(block.helperName, ctx);
                            resultString += 'if (' + variable + ') {';
                            resultString += 'if (isArray(' + variable + ')) {';
                            resultString += 'r += (Template7.helpers.each).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + ', root: ctx_1});';
                            resultString += '}else {';
                            resultString += 'r += (Template7.helpers.with).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + getCompileFn(block, depth+1) + ', inverse: ' + getCompileInverse(block, depth+1) + ', root: ctx_1});';
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
        options: {},
        partials: {},
        helpers: {
            '_partial' : function (partialName, options) {
                var p = Template7.prototype.partials[partialName];
                if (!p || (p && !p.template)) return '';
                if (!p.compiled) {
                    p.compiled = t7.compile(p.template);
                }
                var ctx = this;
                for (var hashName in options.hash) {
                    ctx[hashName] = options.hash[hashName];
                }
                return p.compiled(ctx);
            },
            'escape': function (context, options) {
                if (typeof context !== 'string') {
                    throw new Error('Template7: Passed context to "escape" helper should be a string');
                }
                return context
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;');
            },
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
                    if (options.hash.reverse) {
                        context = context.reverse();
                    }
                    for (i = 0; i < context.length; i++) {
                        ret += options.fn(context[i], {first: i === 0, last: i === context.length - 1, index: i});
                    }
                    if (options.hash.reverse) {
                        context = context.reverse();
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
                return context.join(options.hash.delimiter || options.hash.delimeter);
            },
            'js': function (expression, options) {
                var func;
                if (expression.indexOf('return')>=0) {
                    func = '(function(){'+expression+'})';
                }
                else {
                    func = '(function(){return ('+expression+')})';
                }
                return eval.call(this, func).call(this);
            },
            'js_compare': function (expression, options) {
                var func;
                if (expression.indexOf('return')>=0) {
                    func = '(function(){'+expression+'})';
                }
                else {
                    func = '(function(){return ('+expression+')})';
                }
                var condition = eval.call(this, func).call(this);
                if (condition) {
                    return options.fn(this, options.data);
                }
                else {
                    return options.inverse(this, options.data);   
                }
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
    t7.unregisterHelper = function (name) {
        Template7.prototype.helpers[name] = undefined;  
        delete Template7.prototype.helpers[name];
    };
    t7.registerPartial = function (name, template) {
        Template7.prototype.partials[name] = {template: template};
    };
    t7.unregisterPartial = function (name, template) {
        if (Template7.prototype.partials[name]) {
            Template7.prototype.partials[name] = undefined;
            delete Template7.prototype.partials[name];
        }
    };
    
    t7.compile = function (template, options) {
        var instance = new Template7(template, options);
        return instance.compile();
    };
    
    t7.options = Template7.prototype.options;
    t7.helpers = Template7.prototype.helpers;
    t7.partials = Template7.prototype.partials;
    return t7;
})();