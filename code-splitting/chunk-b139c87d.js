/**
 * Template7 1.4.0
 * Mobile-first HTML template engine
 * 
 * http://www.idangero.us/template7/
 * 
 * Copyright 2018, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: August 31, 2018
 */
var t7ctx;
if (typeof window !== 'undefined') {
  t7ctx = window;
} else if (typeof global !== 'undefined') {
  t7ctx = global;
} else {
  t7ctx = undefined;
}

var Template7Context = t7ctx;

var Template7Utils = {
  quoteSingleRexExp: new RegExp('\'', 'g'),
  quoteDoubleRexExp: new RegExp('"', 'g'),
  isFunction: function isFunction(func) {
    return typeof func === 'function';
  },
  escape: function escape(string) {
    return (typeof Template7Context !== 'undefined' && Template7Context.escape) ?
      Template7Context.escape(string) :
      string
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
  },
  helperToSlices: function helperToSlices(string) {
    var quoteDoubleRexExp = Template7Utils.quoteDoubleRexExp;
    var quoteSingleRexExp = Template7Utils.quoteSingleRexExp;
    var helperParts = string.replace(/[{}#}]/g, '').trim().split(' ');
    var slices = [];
    var shiftIndex;
    var i;
    var j;
    for (i = 0; i < helperParts.length; i += 1) {
      var part = helperParts[i];
      var blockQuoteRegExp = (void 0);
      var openingQuote = (void 0);
      if (i === 0) { slices.push(part); }
      else if (part.indexOf('"') === 0 || part.indexOf('\'') === 0) {
        blockQuoteRegExp = part.indexOf('"') === 0 ? quoteDoubleRexExp : quoteSingleRexExp;
        openingQuote = part.indexOf('"') === 0 ? '"' : '\'';
        // Plain String
        if (part.match(blockQuoteRegExp).length === 2) {
          // One word string
          slices.push(part);
        } else {
          // Find closed Index
          shiftIndex = 0;
          for (j = i + 1; j < helperParts.length; j += 1) {
            part += " " + (helperParts[j]);
            if (helperParts[j].indexOf(openingQuote) >= 0) {
              shiftIndex = j;
              slices.push(part);
              break;
            }
          }
          if (shiftIndex) { i = shiftIndex; }
        }
      } else if (part.indexOf('=') > 0) {
        // Hash
        var hashParts = part.split('=');
        var hashName = hashParts[0];
        var hashContent = hashParts[1];
        if (!blockQuoteRegExp) {
          blockQuoteRegExp = hashContent.indexOf('"') === 0 ? quoteDoubleRexExp : quoteSingleRexExp;
          openingQuote = hashContent.indexOf('"') === 0 ? '"' : '\'';
        }
        if (hashContent.match(blockQuoteRegExp).length !== 2) {
          shiftIndex = 0;
          for (j = i + 1; j < helperParts.length; j += 1) {
            hashContent += " " + (helperParts[j]);
            if (helperParts[j].indexOf(openingQuote) >= 0) {
              shiftIndex = j;
              break;
            }
          }
          if (shiftIndex) { i = shiftIndex; }
        }
        var hash = [hashName, hashContent.replace(blockQuoteRegExp, '')];
        slices.push(hash);
      } else {
        // Plain variable
        slices.push(part);
      }
    }
    return slices;
  },
  stringToBlocks: function stringToBlocks(string) {
    var blocks = [];
    var i;
    var j;
    if (!string) { return []; }
    var stringBlocks = string.split(/({{[^{^}]*}})/);
    for (i = 0; i < stringBlocks.length; i += 1) {
      var block = stringBlocks[i];
      if (block === '') { continue; }
      if (block.indexOf('{{') < 0) {
        blocks.push({
          type: 'plain',
          content: block,
        });
      } else {
        if (block.indexOf('{/') >= 0) {
          continue;
        }
        block = block
          .replace(/{{([#/])*([ ])*/, '{{$1')
          .replace(/([ ])*}}/, '}}');
        if (block.indexOf('{#') < 0 && block.indexOf(' ') < 0 && block.indexOf('else') < 0) {
          // Simple variable
          blocks.push({
            type: 'variable',
            contextName: block.replace(/[{}]/g, ''),
          });
          continue;
        }
        // Helpers
        var helperSlices = Template7Utils.helperToSlices(block);
        var helperName = helperSlices[0];
        var isPartial = helperName === '>';
        var helperContext = [];
        var helperHash = {};
        for (j = 1; j < helperSlices.length; j += 1) {
          var slice = helperSlices[j];
          if (Array.isArray(slice)) {
            // Hash
            helperHash[slice[0]] = slice[1] === 'false' ? false : slice[1];
          } else {
            helperContext.push(slice);
          }
        }

        if (block.indexOf('{#') >= 0) {
          // Condition/Helper
          var helperContent = '';
          var elseContent = '';
          var toSkip = 0;
          var shiftIndex = (void 0);
          var foundClosed = false;
          var foundElse = false;
          var depth = 0;
          for (j = i + 1; j < stringBlocks.length; j += 1) {
            if (stringBlocks[j].indexOf('{{#') >= 0) {
              depth += 1;
            }
            if (stringBlocks[j].indexOf('{{/') >= 0) {
              depth -= 1;
            }
            if (stringBlocks[j].indexOf(("{{#" + helperName)) >= 0) {
              helperContent += stringBlocks[j];
              if (foundElse) { elseContent += stringBlocks[j]; }
              toSkip += 1;
            } else if (stringBlocks[j].indexOf(("{{/" + helperName)) >= 0) {
              if (toSkip > 0) {
                toSkip -= 1;
                helperContent += stringBlocks[j];
                if (foundElse) { elseContent += stringBlocks[j]; }
              } else {
                shiftIndex = j;
                foundClosed = true;
                break;
              }
            } else if (stringBlocks[j].indexOf('else') >= 0 && depth === 0) {
              foundElse = true;
            } else {
              if (!foundElse) { helperContent += stringBlocks[j]; }
              if (foundElse) { elseContent += stringBlocks[j]; }
            }
          }
          if (foundClosed) {
            if (shiftIndex) { i = shiftIndex; }
            if (helperName === 'raw') {
              blocks.push({
                type: 'plain',
                content: helperContent,
              });
            } else {
              blocks.push({
                type: 'helper',
                helperName: helperName,
                contextName: helperContext,
                content: helperContent,
                inverseContent: elseContent,
                hash: helperHash,
              });
            }
          }
        } else if (block.indexOf(' ') > 0) {
          if (isPartial) {
            helperName = '_partial';
            if (helperContext[0]) {
              if (helperContext[0].indexOf('[') === 0) { helperContext[0] = helperContext[0].replace(/[[\]]/g, ''); }
              else { helperContext[0] = "\"" + (helperContext[0].replace(/"|'/g, '')) + "\""; }
            }
          }
          blocks.push({
            type: 'helper',
            helperName: helperName,
            contextName: helperContext,
            hash: helperHash,
          });
        }
      }
    }
    return blocks;
  },
  parseJsVariable: function parseJsVariable(expression, replace, object) {
    return expression.split(/([+ \-*/^])/g).map(function (part) {
      if (part.indexOf(replace) < 0) { return part; }
      if (!object) { return JSON.stringify(''); }
      var variable = object;
      if (part.indexOf((replace + ".")) >= 0) {
        part.split((replace + "."))[1].split('.').forEach(function (partName) {
          if (partName in variable) { variable = variable[partName]; }
          else { variable = undefined; }
        });
      }
      if (typeof variable === 'string') {
        variable = JSON.stringify(variable);
      }
      if (variable === undefined) { variable = 'undefined'; }
      return variable;
    }).join('');
  },
  parseJsParents: function parseJsParents(expression, parents) {
    return expression.split(/([+ \-*^])/g).map(function (part) {
      if (part.indexOf('../') < 0) { return part; }
      if (!parents || parents.length === 0) { return JSON.stringify(''); }
      var levelsUp = part.split('../').length - 1;
      var parentData = levelsUp > parents.length ? parents[parents.length - 1] : parents[levelsUp - 1];

      var variable = parentData;
      var parentPart = part.replace(/..\//g, '');
      parentPart.split('.').forEach(function (partName) {
        if (variable[partName]) { variable = variable[partName]; }
        else { variable = 'undefined'; }
      });
      return JSON.stringify(variable);
    }).join('');
  },
  getCompileVar: function getCompileVar(name, ctx, data) {
    if ( data === void 0 ) data = 'data_1';

    var variable = ctx;
    var parts;
    var levelsUp = 0;
    var newDepth;
    if (name.indexOf('../') === 0) {
      levelsUp = name.split('../').length - 1;
      newDepth = variable.split('_')[1] - levelsUp;
      variable = "ctx_" + (newDepth >= 1 ? newDepth : 1);
      parts = name.split('../')[levelsUp].split('.');
    } else if (name.indexOf('@global') === 0) {
      variable = 'Template7.global';
      parts = name.split('@global.')[1].split('.');
    } else if (name.indexOf('@root') === 0) {
      variable = 'root';
      parts = name.split('@root.')[1].split('.');
    } else {
      parts = name.split('.');
    }
    for (var i = 0; i < parts.length; i += 1) {
      var part = parts[i];
      if (part.indexOf('@') === 0) {
        var dataLevel = data.split('_')[1];
        if (levelsUp > 0) {
          dataLevel = newDepth;
        }
        if (i > 0) {
          variable += "[(data_" + dataLevel + " && data_" + dataLevel + "." + (part.replace('@', '')) + ")]";
        } else {
          variable = "(data_" + dataLevel + " && data_" + dataLevel + "." + (part.replace('@', '')) + ")";
        }
      } else if (Number.isFinite ? Number.isFinite(part) : Template7Context.isFinite(part)) {
        variable += "[" + part + "]";
      } else if (part === 'this' || part.indexOf('this.') >= 0 || part.indexOf('this[') >= 0 || part.indexOf('this(') >= 0) {
        variable = part.replace('this', ctx);
      } else {
        variable += "." + part;
      }
    }
    return variable;
  },
  getCompiledArguments: function getCompiledArguments(contextArray, ctx, data) {
    var arr = [];
    for (var i = 0; i < contextArray.length; i += 1) {
      if (/^['"]/.test(contextArray[i])) { arr.push(contextArray[i]); }
      else if (/^(true|false|\d+)$/.test(contextArray[i])) { arr.push(contextArray[i]); }
      else {
        arr.push(Template7Utils.getCompileVar(contextArray[i], ctx, data));
      }
    }

    return arr.join(', ');
  },
};

/* eslint no-eval: "off" */
var Template7Helpers = {
  _partial: function _partial(partialName, options) {
    var ctx = this;
    var p = Template7Class.partials[partialName];
    if (!p || (p && !p.template)) { return ''; }
    if (!p.compiled) {
      p.compiled = new Template7Class(p.template).compile();
    }
    Object.keys(options.hash).forEach(function (hashName) {
      ctx[hashName] = options.hash[hashName];
    });
    return p.compiled(ctx, options.data, options.root);
  },
  escape: function escape(context) {
    if (typeof context !== 'string') {
      throw new Error('Template7: Passed context to "escape" helper should be a string');
    }
    return Template7Utils.escape(context);
  },
  if: function if$1(context, options) {
    var ctx = context;
    if (Template7Utils.isFunction(ctx)) { ctx = ctx.call(this); }
    if (ctx) {
      return options.fn(this, options.data);
    }

    return options.inverse(this, options.data);
  },
  unless: function unless(context, options) {
    var ctx = context;
    if (Template7Utils.isFunction(ctx)) { ctx = ctx.call(this); }
    if (!ctx) {
      return options.fn(this, options.data);
    }

    return options.inverse(this, options.data);
  },
  each: function each(context, options) {
    var ctx = context;
    var ret = '';
    var i = 0;
    if (Template7Utils.isFunction(ctx)) { ctx = ctx.call(this); }
    if (Array.isArray(ctx)) {
      if (options.hash.reverse) {
        ctx = ctx.reverse();
      }
      for (i = 0; i < ctx.length; i += 1) {
        ret += options.fn(ctx[i], { first: i === 0, last: i === ctx.length - 1, index: i });
      }
      if (options.hash.reverse) {
        ctx = ctx.reverse();
      }
    } else {
      // eslint-disable-next-line
      for (var key in ctx) {
        i += 1;
        ret += options.fn(ctx[key], { key: key });
      }
    }
    if (i > 0) { return ret; }
    return options.inverse(this);
  },
  with: function with$1(context, options) {
    var ctx = context;
    if (Template7Utils.isFunction(ctx)) { ctx = context.call(this); }
    return options.fn(ctx);
  },
  join: function join(context, options) {
    var ctx = context;
    if (Template7Utils.isFunction(ctx)) { ctx = ctx.call(this); }
    return ctx.join(options.hash.delimiter || options.hash.delimeter);
  },
  js: function js(expression, options) {
    var data = options.data;
    var func;
    var execute = expression;
    ('index first last key').split(' ').forEach(function (prop) {
      if (typeof data[prop] !== 'undefined') {
        var re1 = new RegExp(("this.@" + prop), 'g');
        var re2 = new RegExp(("@" + prop), 'g');
        execute = execute
          .replace(re1, JSON.stringify(data[prop]))
          .replace(re2, JSON.stringify(data[prop]));
      }
    });
    if (options.root && execute.indexOf('@root') >= 0) {
      execute = Template7Utils.parseJsVariable(execute, '@root', options.root);
    }
    if (execute.indexOf('@global') >= 0) {
      execute = Template7Utils.parseJsVariable(execute, '@global', Template7Context.Template7.global);
    }
    if (execute.indexOf('../') >= 0) {
      execute = Template7Utils.parseJsParents(execute, options.parents);
    }
    if (execute.indexOf('return') >= 0) {
      func = "(function(){" + execute + "})";
    } else {
      func = "(function(){return (" + execute + ")})";
    }
    return eval(func).call(this);
  },
  js_if: function js_if(expression, options) {
    var data = options.data;
    var func;
    var execute = expression;
    ('index first last key').split(' ').forEach(function (prop) {
      if (typeof data[prop] !== 'undefined') {
        var re1 = new RegExp(("this.@" + prop), 'g');
        var re2 = new RegExp(("@" + prop), 'g');
        execute = execute
          .replace(re1, JSON.stringify(data[prop]))
          .replace(re2, JSON.stringify(data[prop]));
      }
    });
    if (options.root && execute.indexOf('@root') >= 0) {
      execute = Template7Utils.parseJsVariable(execute, '@root', options.root);
    }
    if (execute.indexOf('@global') >= 0) {
      execute = Template7Utils.parseJsVariable(execute, '@global', Template7Context.Template7.global);
    }
    if (execute.indexOf('../') >= 0) {
      execute = Template7Utils.parseJsParents(execute, options.parents);
    }
    if (execute.indexOf('return') >= 0) {
      func = "(function(){" + execute + "})";
    } else {
      func = "(function(){return (" + execute + ")})";
    }
    var condition = eval(func).call(this);
    if (condition) {
      return options.fn(this, options.data);
    }

    return options.inverse(this, options.data);
  },
};
Template7Helpers.js_compare = Template7Helpers.js_if;

var Template7Options = {};
var Template7Partials = {};

var Template7Class = function Template7Class(template) {
  var t = this;
  t.template = template;
};

var staticAccessors = { options: { configurable: true },partials: { configurable: true },helpers: { configurable: true } };
Template7Class.prototype.compile = function compile (template, depth) {
    if ( template === void 0 ) template = this.template;
    if ( depth === void 0 ) depth = 1;

  var t = this;
  if (t.compiled) { return t.compiled; }

  if (typeof template !== 'string') {
    throw new Error('Template7: Template must be a string');
  }
  var stringToBlocks = Template7Utils.stringToBlocks;
    var getCompileVar = Template7Utils.getCompileVar;
    var getCompiledArguments = Template7Utils.getCompiledArguments;

  var blocks = stringToBlocks(template);
  var ctx = "ctx_" + depth;
  var data = "data_" + depth;
  if (blocks.length === 0) {
    return function empty() { return ''; };
  }

  function getCompileFn(block, newDepth) {
    if (block.content) { return t.compile(block.content, newDepth); }
    return function empty() { return ''; };
  }
  function getCompileInverse(block, newDepth) {
    if (block.inverseContent) { return t.compile(block.inverseContent, newDepth); }
    return function empty() { return ''; };
  }

  var resultString = '';
  if (depth === 1) {
    resultString += "(function (" + ctx + ", " + data + ", root) {\n";
  } else {
    resultString += "(function (" + ctx + ", " + data + ") {\n";
  }
  if (depth === 1) {
    resultString += 'function isArray(arr){return Array.isArray(arr);}\n';
    resultString += 'function isFunction(func){return (typeof func === \'function\');}\n';
    resultString += 'function c(val, ctx) {if (typeof val !== "undefined" && val !== null) {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n';
    resultString += 'root = root || ctx_1 || {};\n';
  }
  resultString += 'var r = \'\';\n';
  var i;
  for (i = 0; i < blocks.length; i += 1) {
    var block = blocks[i];
    // Plain block
    if (block.type === 'plain') {
      // eslint-disable-next-line
      resultString += "r +='" + ((block.content).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/'/g, '\\' + '\'')) + "';";
      continue;
    }
    var variable = (void 0);
    var compiledArguments = (void 0);
    // Variable block
    if (block.type === 'variable') {
      variable = getCompileVar(block.contextName, ctx, data);
      resultString += "r += c(" + variable + ", " + ctx + ");";
    }
    // Helpers block
    if (block.type === 'helper') {
      var parents = (void 0);
      if (ctx !== 'ctx_1') {
        var level = ctx.split('_')[1];
        var parentsString = "ctx_" + (level - 1);
        for (var j = level - 2; j >= 1; j -= 1) {
          parentsString += ", ctx_" + j;
        }
        parents = "[" + parentsString + "]";
      } else {
        parents = "[" + ctx + "]";
      }
      var dynamicHelper = (void 0);
      if (block.helperName.indexOf('[') === 0) {
        block.helperName = getCompileVar(block.helperName.replace(/[[\]]/g, ''), ctx, data);
        dynamicHelper = true;
      }
      if (dynamicHelper || block.helperName in Template7Helpers) {
        compiledArguments = getCompiledArguments(block.contextName, ctx, data);
        resultString += "r += (Template7Helpers" + (dynamicHelper ? ("[" + (block.helperName) + "]") : ("." + (block.helperName))) + ").call(" + ctx + ", " + (compiledArguments && ((compiledArguments + ", "))) + "{hash:" + (JSON.stringify(block.hash)) + ", data: " + data + " || {}, fn: " + (getCompileFn(block, depth + 1)) + ", inverse: " + (getCompileInverse(block, depth + 1)) + ", root: root, parents: " + parents + "});";
      } else if (block.contextName.length > 0) {
        throw new Error(("Template7: Missing helper: \"" + (block.helperName) + "\""));
      } else {
        variable = getCompileVar(block.helperName, ctx, data);
        resultString += "if (" + variable + ") {";
        resultString += "if (isArray(" + variable + ")) {";
        resultString += "r += (Template7Helpers.each).call(" + ctx + ", " + variable + ", {hash:" + (JSON.stringify(block.hash)) + ", data: " + data + " || {}, fn: " + (getCompileFn(block, depth + 1)) + ", inverse: " + (getCompileInverse(block, depth + 1)) + ", root: root, parents: " + parents + "});";
        resultString += '}else {';
        resultString += "r += (Template7Helpers.with).call(" + ctx + ", " + variable + ", {hash:" + (JSON.stringify(block.hash)) + ", data: " + data + " || {}, fn: " + (getCompileFn(block, depth + 1)) + ", inverse: " + (getCompileInverse(block, depth + 1)) + ", root: root, parents: " + parents + "});";
        resultString += '}}';
      }
    }
  }
  resultString += '\nreturn r;})';

  if (depth === 1) {
    // eslint-disable-next-line
    t.compiled = eval(resultString);
    return t.compiled;
  }
  return resultString;
};
staticAccessors.options.get = function () {
  return Template7Options;
};
staticAccessors.partials.get = function () {
  return Template7Partials;
};
staticAccessors.helpers.get = function () {
  return Template7Helpers;
};

Object.defineProperties( Template7Class, staticAccessors );

function Template7() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var template = args[0];
  var data = args[1];
  if (args.length === 2) {
    var instance = new Template7Class(template);
    var rendered = instance.compile()(data);
    instance = null;
    return (rendered);
  }
  return new Template7Class(template);
}
Template7.registerHelper = function registerHelper(name, fn) {
  Template7Class.helpers[name] = fn;
};
Template7.unregisterHelper = function unregisterHelper(name) {
  Template7Class.helpers[name] = undefined;
  delete Template7Class.helpers[name];
};
Template7.registerPartial = function registerPartial(name, template) {
  Template7Class.partials[name] = { template: template };
};
Template7.unregisterPartial = function unregisterPartial(name) {
  if (Template7Class.partials[name]) {
    Template7Class.partials[name] = undefined;
    delete Template7Class.partials[name];
  }
};
Template7.compile = function compile(template, options) {
  var instance = new Template7Class(template, options);
  return instance.compile();
};

Template7.options = Template7Class.options;
Template7.helpers = Template7Class.helpers;
Template7.partials = Template7Class.partials;

export { Template7 as a };
