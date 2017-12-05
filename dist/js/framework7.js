/**
 * Framework7 2.0.2
 * Full featured mobile HTML framework for building iOS & Android apps
 * http://framework7.io/
 *
 * Copyright 2014-2017 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: December 5, 2017
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Framework7 = factory());
}(this, (function () { 'use strict';

/**
 * Template7 1.3.1
 * Mobile-first HTML template engine
 * 
 * http://www.idangero.us/template7/
 * 
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: October 25, 2017
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
            if (helperContext[0]) { helperContext[0] = "\"" + (helperContext[0].replace(/"|'/g, '')) + "\""; }
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
    return expression.split(/([+ -*/^])/g).map(function (part) {
      if (part.indexOf(replace) < 0) { return part; }
      if (!object) { return JSON.stringify(''); }
      var variable = object;
      if (part.indexOf((replace + ".")) >= 0) {
        part.split((replace + "."))[1].split('.').forEach(function (partName) {
          if (variable[partName]) { variable = variable[partName]; }
          else { variable = 'undefined'; }
        });
      }
      return JSON.stringify(variable);
    }).join('');
  },
  parseJsParents: function parseJsParents(expression, parents) {
    return expression.split(/([+ -*^])/g).map(function (part) {
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
      } else if (isFinite(part)) {
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

var Template7Helpers = {
  _partial: function _partial(partialName, options) {
    var p = Template7Class.partials[partialName];
    if (!p || (p && !p.template)) { return ''; }
    if (!p.compiled) {
      p.compiled = new Template7Class(p.template).compile();
    }
    var ctx = this;
    for (var hashName in options.hash) {
      ctx[hashName] = options.hash[hashName];
    }
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
    return eval.call(this, func).call(this);
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
      execute = Template7Utils.parseJsVariable(execute, '@global', Template7Class.global);
    }
    if (execute.indexOf('../') >= 0) {
      execute = Template7Utils.parseJsParents(execute, options.parents);
    }
    if (execute.indexOf('return') >= 0) {
      func = "(function(){" + execute + "})";
    } else {
      func = "(function(){return (" + execute + ")})";
    }
    var condition = eval.call(this, func).call(this);
    if (condition) {
      return options.fn(this, options.data);
    }

    return options.inverse(this, options.data);
  },
};
Template7Helpers.js_compare = Template7Helpers.js_if;

var Template7Options = {};
var Template7Partials = {};
var script = Template7Context.document.createElement('script');
Template7Context.document.head.appendChild(script);

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
      if (block.helperName in Template7Helpers) {
        compiledArguments = getCompiledArguments(block.contextName, ctx, data);
        resultString += "r += (Template7.helpers." + (block.helperName) + ").call(" + ctx + ", " + (compiledArguments && ((compiledArguments + ", "))) + "{hash:" + (JSON.stringify(block.hash)) + ", data: " + data + " || {}, fn: " + (getCompileFn(block, depth + 1)) + ", inverse: " + (getCompileInverse(block, depth + 1)) + ", root: root, parents: " + parents + "});";
      } else if (block.contextName.length > 0) {
        throw new Error(("Template7: Missing helper: \"" + (block.helperName) + "\""));
      } else {
        variable = getCompileVar(block.helperName, ctx, data);
        resultString += "if (" + variable + ") {";
        resultString += "if (isArray(" + variable + ")) {";
        resultString += "r += (Template7.helpers.each).call(" + ctx + ", " + variable + ", {hash:" + (JSON.stringify(block.hash)) + ", data: " + data + " || {}, fn: " + (getCompileFn(block, depth + 1)) + ", inverse: " + (getCompileInverse(block, depth + 1)) + ", root: root, parents: " + parents + "});";
        resultString += '}else {';
        resultString += "r += (Template7.helpers.with).call(" + ctx + ", " + variable + ", {hash:" + (JSON.stringify(block.hash)) + ", data: " + data + " || {}, fn: " + (getCompileFn(block, depth + 1)) + ", inverse: " + (getCompileInverse(block, depth + 1)) + ", root: root, parents: " + parents + "});";
        resultString += '}}';
      }
    }
  }
  resultString += '\nreturn r;})';

  if (depth === 1) {
    t.compiled = eval.call(Template7Context, resultString);
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

/**
 * Dom7 2.0.1
 * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
 * http://framework7.io/docs/dom.html
 *
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: October 2, 2017
 */
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

function $$1$1(selector, context) {
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

$$1$1.fn = Dom7.prototype;
$$1$1.Class = Dom7;
$$1$1.Dom7 = Dom7;

function unique(arr) {
  var uniqueArray = [];
  for (var i = 0; i < arr.length; i += 1) {
    if (uniqueArray.indexOf(arr[i]) === -1) { uniqueArray.push(arr[i]); }
  }
  return uniqueArray;
}
function toCamelCase(string) {
  return string.toLowerCase().replace(/-(.)/g, function (match, group1) { return group1.toUpperCase(); });
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

// Classes and attributes
function addClass(className) {
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
}
function removeClass(className) {
  var this$1 = this;

  var classes = className.split(' ');
  for (var i = 0; i < classes.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.remove(classes[i]); }
    }
  }
  return this;
}
function hasClass(className) {
  if (!this[0]) { return false; }
  return this[0].classList.contains(className);
}
function toggleClass(className) {
  var this$1 = this;

  var classes = className.split(' ');
  for (var i = 0; i < classes.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.toggle(classes[i]); }
    }
  }
  return this;
}
function attr(attrs, value) {
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
      // eslint-disable-next-line
      for (var attrName in attrs) {
        this$1[i][attrName] = attrs[attrName];
        this$1[i].setAttribute(attrName, attrs[attrName]);
      }
    }
  }
  return this;
}
// eslint-disable-next-line
function removeAttr(attr) {
  var this$1 = this;

  for (var i = 0; i < this.length; i += 1) {
    this$1[i].removeAttribute(attr);
  }
  return this;
}
// eslint-disable-next-line
function prop(props, value) {
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
        // eslint-disable-next-line
        for (var propName in props) {
          this$1[i][propName] = props[propName];
        }
      }
    }
    return this;
  }
}
function data(key, value) {
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
}
function removeData(key) {
  var this$1 = this;

  for (var i = 0; i < this.length; i += 1) {
    var el = this$1[i];
    if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
      el.dom7ElementDataStorage[key] = null;
      delete el.dom7ElementDataStorage[key];
    }
  }
}
function dataset() {
  var el = this[0];
  if (!el) { return undefined; }
  var dataset = {}; // eslint-disable-line
  if (el.dataset) {
    // eslint-disable-next-line
    for (var dataKey in el.dataset) {
      dataset[dataKey] = el.dataset[dataKey];
    }
  } else {
    for (var i = 0; i < el.attributes.length; i += 1) {
      // eslint-disable-next-line
      var attr = el.attributes[i];
      if (attr.name.indexOf('data-') >= 0) {
        dataset[toCamelCase(attr.name.split('data-')[1])] = attr.value;
      }
    }
  }
  // eslint-disable-next-line
  for (var key in dataset) {
    if (dataset[key] === 'false') { dataset[key] = false; }
    else if (dataset[key] === 'true') { dataset[key] = true; }
    else if (parseFloat(dataset[key]) === dataset[key] * 1) { dataset[key] *= 1; }
  }
  return dataset;
}
function val(value) {
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
}
// Transforms
// eslint-disable-next-line
function transform(transform) {
  var this$1 = this;

  for (var i = 0; i < this.length; i += 1) {
    var elStyle = this$1[i].style;
    elStyle.webkitTransform = transform;
    elStyle.transform = transform;
  }
  return this;
}
function transition(duration) {
  var this$1 = this;

  if (typeof duration !== 'string') {
    duration = duration + "ms"; // eslint-disable-line
  }
  for (var i = 0; i < this.length; i += 1) {
    var elStyle = this$1[i].style;
    elStyle.webkitTransitionDuration = duration;
    elStyle.transitionDuration = duration;
  }
  return this;
}
// Events
function on() {
  var this$1 = this;
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var eventType = args[0];
  var targetSelector = args[1];
  var listener = args[2];
  var capture = args[3];
  if (typeof args[1] === 'function') {
    var assign;
    (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
    targetSelector = undefined;
  }
  if (!capture) { capture = false; }

  function handleLiveEvent(e) {
    var target = e.target;
    if (!target) { return; }
    var eventData = e.target.dom7EventData || [];
    eventData.unshift(e);
    if ($$1$1(target).is(targetSelector)) { listener.apply(target, eventData); }
    else {
      var parents = $$1$1(target).parents(); // eslint-disable-line
      for (var k = 0; k < parents.length; k += 1) {
        if ($$1$1(parents[k]).is(targetSelector)) { listener.apply(parents[k], eventData); }
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
}
function off() {
  var this$1 = this;
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var eventType = args[0];
  var targetSelector = args[1];
  var listener = args[2];
  var capture = args[3];
  if (typeof args[1] === 'function') {
    var assign;
    (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
    targetSelector = undefined;
  }
  if (!capture) { capture = false; }

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
}
function once() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var dom = this;
  var eventName = args[0];
  var targetSelector = args[1];
  var listener = args[2];
  var capture = args[3];
  if (typeof args[1] === 'function') {
    var assign;
    (assign = args, eventName = assign[0], listener = assign[1], capture = assign[2]);
    targetSelector = undefined;
  }
  function proxy(e) {
    var eventData = e.target.dom7EventData || [];
    listener.apply(this, eventData);
    dom.off(eventName, targetSelector, proxy, capture);
  }
  return dom.on(eventName, targetSelector, proxy, capture);
}
function trigger() {
  var this$1 = this;
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var events = args[0].split(' ');
  var eventData = args[1];
  for (var i = 0; i < events.length; i += 1) {
    for (var j = 0; j < this.length; j += 1) {
      var evt = (void 0);
      try {
        evt = new window.CustomEvent(events[i], {
          detail: eventData,
          bubbles: true,
          cancelable: true,
        });
      } catch (e) {
        evt = document.createEvent('Event');
        evt.initEvent(events[i], true, true);
        evt.detail = eventData;
      }
      // eslint-disable-next-line
      this$1[j].dom7EventData = args.filter(function (data, dataIndex) { return dataIndex > 0; });
      this$1[j].dispatchEvent(evt);
      this$1[j].dom7EventData = [];
      delete this$1[j].dom7EventData;
    }
  }
  return this;
}
function transitionEnd(callback) {
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
}
function animationEnd(callback) {
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
}
// Sizing/Styles
function width() {
  if (this[0] === window) {
    return window.innerWidth;
  }

  if (this.length > 0) {
    return parseFloat(this.css('width'));
  }

  return null;
}
function outerWidth(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      // eslint-disable-next-line
      var styles = this.styles();
      return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
    }
    return this[0].offsetWidth;
  }
  return null;
}
function height() {
  if (this[0] === window) {
    return window.innerHeight;
  }

  if (this.length > 0) {
    return parseFloat(this.css('height'));
  }

  return null;
}
function outerHeight(includeMargins) {
  if (this.length > 0) {
    if (includeMargins) {
      // eslint-disable-next-line
      var styles = this.styles();
      return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
    }
    return this[0].offsetHeight;
  }
  return null;
}
function offset() {
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
}
function hide() {
  var this$1 = this;

  for (var i = 0; i < this.length; i += 1) {
    this$1[i].style.display = 'none';
  }
  return this;
}
function show() {
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
}
function styles() {
  if (this[0]) { return window.getComputedStyle(this[0], null); }
  return {};
}
function css(props, value) {
  var this$1 = this;

  var i;
  if (arguments.length === 1) {
    if (typeof props === 'string') {
      if (this[0]) { return window.getComputedStyle(this[0], null).getPropertyValue(props); }
    } else {
      for (i = 0; i < this.length; i += 1) {
        // eslint-disable-next-line
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
}

// Dom manipulation
function toArray() {
  var this$1 = this;

  var arr = [];
  for (var i = 0; i < this.length; i += 1) {
    arr.push(this$1[i]);
  }
  return arr;
}
// Iterate over the collection passing elements to `callback`
function each(callback) {
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
}
function forEach(callback) {
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
}
function filter(callback) {
  var matchedItems = [];
  var dom = this;
  for (var i = 0; i < dom.length; i += 1) {
    if (callback.call(dom[i], i, dom[i])) { matchedItems.push(dom[i]); }
  }
  return new Dom7(matchedItems);
}
function map(callback) {
  var modifiedItems = [];
  var dom = this;
  for (var i = 0; i < dom.length; i += 1) {
    modifiedItems.push(callback.call(dom[i], i, dom[i]));
  }
  return new Dom7(modifiedItems);
}
// eslint-disable-next-line
function html(html) {
  var this$1 = this;

  if (typeof html === 'undefined') {
    return this[0] ? this[0].innerHTML : undefined;
  }

  for (var i = 0; i < this.length; i += 1) {
    this$1[i].innerHTML = html;
  }
  return this;
}
// eslint-disable-next-line
function text(text) {
  var this$1 = this;

  if (typeof text === 'undefined') {
    if (this[0]) {
      return this[0].textContent.trim();
    }
    return null;
  }

  for (var i = 0; i < this.length; i += 1) {
    this$1[i].textContent = text;
  }
  return this;
}
function is(selector) {
  var el = this[0];
  var compareWith;
  var i;
  if (!el || typeof selector === 'undefined') { return false; }
  if (typeof selector === 'string') {
    if (el.matches) { return el.matches(selector); }
    else if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
    else if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }

    compareWith = $$1$1(selector);
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
}
function indexOf(el) {
  var this$1 = this;

  for (var i = 0; i < this.length; i += 1) {
    if (this$1[i] === el) { return i; }
  }
  return -1;
}
function index() {
  var child = this[0];
  var i;
  if (child) {
    i = 0;
    // eslint-disable-next-line
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1) { i += 1; }
    }
    return i;
  }
  return undefined;
}
// eslint-disable-next-line
function eq(index) {
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
}
function append() {
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
}
 // eslint-disable-next-line
function appendTo(parent) {
  $$1$1(parent).append(this);
  return this;
}
function prepend(newChild) {
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
}
 // eslint-disable-next-line
function prependTo(parent) {
  $$1$1(parent).prepend(this);
  return this;
}
function insertBefore(selector) {
  var this$1 = this;

  var before = $$1$1(selector);
  for (var i = 0; i < this.length; i += 1) {
    if (before.length === 1) {
      before[0].parentNode.insertBefore(this$1[i], before[0]);
    } else if (before.length > 1) {
      for (var j = 0; j < before.length; j += 1) {
        before[j].parentNode.insertBefore(this$1[i].cloneNode(true), before[j]);
      }
    }
  }
}
function insertAfter(selector) {
  var this$1 = this;

  var after = $$1$1(selector);
  for (var i = 0; i < this.length; i += 1) {
    if (after.length === 1) {
      after[0].parentNode.insertBefore(this$1[i], after[0].nextSibling);
    } else if (after.length > 1) {
      for (var j = 0; j < after.length; j += 1) {
        after[j].parentNode.insertBefore(this$1[i].cloneNode(true), after[j].nextSibling);
      }
    }
  }
}
function next(selector) {
  if (this.length > 0) {
    if (selector) {
      if (this[0].nextElementSibling && $$1$1(this[0].nextElementSibling).is(selector)) {
        return new Dom7([this[0].nextElementSibling]);
      }
      return new Dom7([]);
    }

    if (this[0].nextElementSibling) { return new Dom7([this[0].nextElementSibling]); }
    return new Dom7([]);
  }
  return new Dom7([]);
}
function nextAll(selector) {
  var nextEls = [];
  var el = this[0];
  if (!el) { return new Dom7([]); }
  while (el.nextElementSibling) {
    var next = el.nextElementSibling; // eslint-disable-line
    if (selector) {
      if ($$1$1(next).is(selector)) { nextEls.push(next); }
    } else { nextEls.push(next); }
    el = next;
  }
  return new Dom7(nextEls);
}
function prev(selector) {
  if (this.length > 0) {
    var el = this[0];
    if (selector) {
      if (el.previousElementSibling && $$1$1(el.previousElementSibling).is(selector)) {
        return new Dom7([el.previousElementSibling]);
      }
      return new Dom7([]);
    }

    if (el.previousElementSibling) { return new Dom7([el.previousElementSibling]); }
    return new Dom7([]);
  }
  return new Dom7([]);
}
function prevAll(selector) {
  var prevEls = [];
  var el = this[0];
  if (!el) { return new Dom7([]); }
  while (el.previousElementSibling) {
    var prev = el.previousElementSibling; // eslint-disable-line
    if (selector) {
      if ($$1$1(prev).is(selector)) { prevEls.push(prev); }
    } else { prevEls.push(prev); }
    el = prev;
  }
  return new Dom7(prevEls);
}
function siblings(selector) {
  return this.nextAll(selector).add(this.prevAll(selector));
}
function parent(selector) {
  var this$1 = this;

  var parents = []; // eslint-disable-line
  for (var i = 0; i < this.length; i += 1) {
    if (this$1[i].parentNode !== null) {
      if (selector) {
        if ($$1$1(this$1[i].parentNode).is(selector)) { parents.push(this$1[i].parentNode); }
      } else {
        parents.push(this$1[i].parentNode);
      }
    }
  }
  return $$1$1(unique(parents));
}
function parents(selector) {
  var this$1 = this;

  var parents = []; // eslint-disable-line
  for (var i = 0; i < this.length; i += 1) {
    var parent = this$1[i].parentNode; // eslint-disable-line
    while (parent) {
      if (selector) {
        if ($$1$1(parent).is(selector)) { parents.push(parent); }
      } else {
        parents.push(parent);
      }
      parent = parent.parentNode;
    }
  }
  return $$1$1(unique(parents));
}
function closest(selector) {
  var closest = this; // eslint-disable-line
  if (typeof selector === 'undefined') {
    return new Dom7([]);
  }
  if (!closest.is(selector)) {
    closest = closest.parents(selector).eq(0);
  }
  return closest;
}
function find(selector) {
  var this$1 = this;

  var foundElements = [];
  for (var i = 0; i < this.length; i += 1) {
    var found = this$1[i].querySelectorAll(selector);
    for (var j = 0; j < found.length; j += 1) {
      foundElements.push(found[j]);
    }
  }
  return new Dom7(foundElements);
}
function children(selector) {
  var this$1 = this;

  var children = []; // eslint-disable-line
  for (var i = 0; i < this.length; i += 1) {
    var childNodes = this$1[i].childNodes;

    for (var j = 0; j < childNodes.length; j += 1) {
      if (!selector) {
        if (childNodes[j].nodeType === 1) { children.push(childNodes[j]); }
      } else if (childNodes[j].nodeType === 1 && $$1$1(childNodes[j]).is(selector)) {
        children.push(childNodes[j]);
      }
    }
  }
  return new Dom7(unique(children));
}
function remove() {
  var this$1 = this;

  for (var i = 0; i < this.length; i += 1) {
    if (this$1[i].parentNode) { this$1[i].parentNode.removeChild(this$1[i]); }
  }
  return this;
}
function detach() {
  return this.remove();
}
function add() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var dom = this;
  var i;
  var j;
  for (i = 0; i < args.length; i += 1) {
    var toAdd = $$1$1(args[i]);
    for (j = 0; j < toAdd.length; j += 1) {
      dom[dom.length] = toAdd[j];
      dom.length += 1;
    }
  }
  return dom;
}
function empty() {
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
}




var Methods = Object.freeze({
	addClass: addClass,
	removeClass: removeClass,
	hasClass: hasClass,
	toggleClass: toggleClass,
	attr: attr,
	removeAttr: removeAttr,
	prop: prop,
	data: data,
	removeData: removeData,
	dataset: dataset,
	val: val,
	transform: transform,
	transition: transition,
	on: on,
	off: off,
	once: once,
	trigger: trigger,
	transitionEnd: transitionEnd,
	animationEnd: animationEnd,
	width: width,
	outerWidth: outerWidth,
	height: height,
	outerHeight: outerHeight,
	offset: offset,
	hide: hide,
	show: show,
	styles: styles,
	css: css,
	toArray: toArray,
	each: each,
	forEach: forEach,
	filter: filter,
	map: map,
	html: html,
	text: text,
	is: is,
	indexOf: indexOf,
	index: index,
	eq: eq,
	append: append,
	appendTo: appendTo,
	prepend: prepend,
	prependTo: prependTo,
	insertBefore: insertBefore,
	insertAfter: insertAfter,
	next: next,
	nextAll: nextAll,
	prev: prev,
	prevAll: prevAll,
	siblings: siblings,
	parent: parent,
	parents: parents,
	closest: closest,
	find: find,
	children: children,
	remove: remove,
	detach: detach,
	add: add,
	empty: empty
});

function scrollTo() {
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
    var scrollTop; // eslint-disable-line
    var scrollLeft; // eslint-disable-line
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
}
// scrollTop(top, duration, easing, callback) {
function scrollTop() {
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
}
function scrollLeft() {
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
}




var Scroll = Object.freeze({
	scrollTo: scrollTo,
	scrollTop: scrollTop,
	scrollLeft: scrollLeft
});

function animate(initialProps, initialParams) {
  var els = this;
  var a = {
    props: $$1$1.extend({}, initialProps),
    params: $$1$1.extend({
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
          // eslint-disable-next-line
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




var Animate = Object.freeze({
	animate: animate,
	stop: stop
});

var noTrigger = ('resize scroll').split(' ');
function eventShortcut(name) {
  var this$1 = this;
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  if (typeof args[0] === 'undefined') {
    for (var i = 0; i < this.length; i += 1) {
      if (noTrigger.indexOf(name) < 0) {
        if (name in this$1[i]) { this$1[i][name](); }
        else {
          $$1$1(this$1[i]).trigger(name);
        }
      }
    }
    return this;
  }
  return (ref = this).on.apply(ref, [ name ].concat( args ));
  var ref;
}

function click() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'click' ].concat( args ));
}
function blur() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'blur' ].concat( args ));
}
function focus() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'focus' ].concat( args ));
}
function focusin() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'focusin' ].concat( args ));
}
function focusout() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'focusout' ].concat( args ));
}
function keyup() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'keyup' ].concat( args ));
}
function keydown() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'keydown' ].concat( args ));
}
function keypress() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'keypress' ].concat( args ));
}
function submit() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'submit' ].concat( args ));
}
function change() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'change' ].concat( args ));
}
function mousedown() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'mousedown' ].concat( args ));
}
function mousemove() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'mousemove' ].concat( args ));
}
function mouseup() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'mouseup' ].concat( args ));
}
function mouseenter() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'mouseenter' ].concat( args ));
}
function mouseleave() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'mouseleave' ].concat( args ));
}
function mouseout() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'mouseout' ].concat( args ));
}
function mouseover() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'mouseover' ].concat( args ));
}
function touchstart() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'touchstart' ].concat( args ));
}
function touchend() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'touchend' ].concat( args ));
}
function touchmove() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'touchmove' ].concat( args ));
}
function resize() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'resize' ].concat( args ));
}
function scroll() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return eventShortcut.bind(this).apply(void 0, [ 'scroll' ].concat( args ));
}




var eventShortcuts = Object.freeze({
	click: click,
	blur: blur,
	focus: focus,
	focusin: focusin,
	focusout: focusout,
	keyup: keyup,
	keydown: keydown,
	keypress: keypress,
	submit: submit,
	change: change,
	mousedown: mousedown,
	mousemove: mousemove,
	mouseup: mouseup,
	mouseenter: mouseenter,
	mouseleave: mouseleave,
	mouseout: mouseout,
	mouseover: mouseover,
	touchstart: touchstart,
	touchend: touchend,
	touchmove: touchmove,
	resize: resize,
	scroll: scroll
});

[Methods, Scroll, Animate, eventShortcuts].forEach(function (group) {
  Object.keys(group).forEach(function (methodName) {
    $$1$1.fn[methodName] = group[methodName];
  });
});

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

/* eslint-disable */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
function C (aA1)      { return 3.0 * aA1; }

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

function binarySubdivide (aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
 for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
   var currentSlope = getSlope(aGuessT, mX1, mX2);
   if (currentSlope === 0.0) {
     return aGuessT;
   }
   var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
   aGuessT -= currentX / currentSlope;
 }
 return aGuessT;
}

function bezier (mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  if (mX1 !== mY1 || mX2 !== mY2) {
    for (var i = 0; i < kSplineTableSize; ++i) {
      sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    }
  }

  function getTForX (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing (x) {
    if (mX1 === mY1 && mX2 === mY2) {
      return x; // linear
    }
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
}

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

var createPromise = function createPromise(handler) {
  var resolved = false;
  var rejected = false;
  var resolveArgs;
  var rejectArgs;
  var promiseHandlers = {
    then: undefined,
    catch: undefined,
  };
  var promise = {
    then: function then(thenHandler) {
      if (resolved) {
        thenHandler.apply(void 0, resolveArgs);
      } else {
        promiseHandlers.then = thenHandler;
      }
      return promise;
    },
    catch: function catch$1(catchHandler) {
      if (rejected) {
        catchHandler.apply(void 0, rejectArgs);
      } else {
        promiseHandlers.catch = catchHandler;
      }
      return promise;
    },
  };

  function resolve() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    resolved = true;
    if (promiseHandlers.then) { promiseHandlers.then.apply(promiseHandlers, args); }
    else { resolveArgs = args; }
  }
  function reject() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    rejected = true;
    if (promiseHandlers.catch) { promiseHandlers.catch.apply(promiseHandlers, args); }
    else { rejectArgs = args; }
  }
  handler(resolve, reject);

  return promise;
};

var Utils = {
  mdPreloaderContent: "\n    <span class=\"preloader-inner\">\n      <span class=\"preloader-inner-gap\"></span>\n      <span class=\"preloader-inner-left\">\n          <span class=\"preloader-inner-half-circle\"></span>\n      </span>\n      <span class=\"preloader-inner-right\">\n          <span class=\"preloader-inner-half-circle\"></span>\n      </span>\n    </span>\n  ".trim(),
  eventNameToColonCase: function eventNameToColonCase(eventName) {
    var hasColon;
    return eventName.split('').map(function (char, index) {
      if (char.match(/[A-Z]/) && index !== 0 && !hasColon) {
        hasColon = true;
        return (":" + (char.toLowerCase()));
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
        // no getter for object
      }
      try {
        delete object[key];
      } catch (e) {
        // something got wrong
      }
    });
  },
  bezier: function bezier$1() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    return bezier.apply(void 0, args);
  },
  nextTick: function nextTick(callback, delay) {
    if ( delay === void 0 ) delay = 0;

    return setTimeout(callback, delay);
  },
  nextFrame: function nextFrame(callback) {
    return Utils.requestAnimationFrame(callback);
  },
  now: function now() {
    return Date.now();
  },
  promise: function promise(handler) {
    return window.Promise ? new Promise(handler) : createPromise(handler);
  },
  requestAnimationFrame: function requestAnimationFrame(callback) {
    if (window.requestAnimationFrame) { return window.requestAnimationFrame(callback); }
    else if (window.webkitRequestAnimationFrame) { return window.webkitRequestAnimationFrame(callback); }
    return window.setTimeout(callback, 1000 / 60);
  },
  cancelAnimationFrame: function cancelAnimationFrame(id) {
    if (window.cancelAnimationFrame) { return window.cancelAnimationFrame(id); }
    else if (window.webkitCancelAnimationFrame) { return window.webkitCancelAnimationFrame(id); }
    return window.clearTimeout(id);
  },
  removeDiacritics: function removeDiacritics(str) {
    return str.replace(/[^\u0000-\u007E]/g, function (a) { return diacriticsMap[a] || a; });
  },
  parseUrlQuery: function parseUrlQuery(url) {
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
  },
  getTranslate: function getTranslate(el, axis) {
    if ( axis === void 0 ) axis = 'x';

    var matrix;
    var curTransform;
    var transformMatrix;

    var curStyle = window.getComputedStyle(el, null);

    if (window.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(',').length > 6) {
        curTransform = curTransform.split(', ').map(function (a) { return a.replace(',', '.'); }).join(', ');
      }
      // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case
      transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
    } else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
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
  serializeObject: function serializeObject(obj, parents) {
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
            toPush.push(Utils.serializeObject(obj[prop][i], newParents));
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
        toPush = Utils.serializeObject(obj[prop], newParents);
        if (toPush !== '') { resultArray.push(toPush); }
      } else if (typeof obj[prop] !== 'undefined' && obj[prop] !== '') {
        // Should be string or plain value
        resultArray.push(((varName(prop)) + "=" + (varValue(obj[prop]))));
      } else if (obj[prop] === '') { resultArray.push(varName(prop)); }
    });
    return resultArray.join(separator);
  },
  isObject: function isObject(o) {
    return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
  },
  extend: function extend() {
    var args = [], len$1 = arguments.length;
    while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];

    var deep = true;
    var to;
    var from;
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
    for (var i = 0; i < from.length; i += 1) {
      var nextSource = args[i];
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
  },
};

var Device = (function Device() {
  var ua = window.navigator.userAgent;

  var device = {
    ios: false,
    android: false,
    androidChrome: false,
    desktop: false,
    windows: false,
    iphone: false,
    iphoneX: false,
    ipod: false,
    ipad: false,
    cordova: window.cordova || window.phonegap,
    phonegap: window.cordova || window.phonegap,
  };

  var windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  var iphoneX = iphone && window.screen.width === 375 && window.screen.height === 812;


  // Windows
  if (windows) {
    device.os = 'windows';
    device.osVersion = windows[2];
    device.windows = true;
  }
  // Android
  if (android && !windows) {
    device.os = 'android';
    device.osVersion = android[2];
    device.android = true;
    device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
  }
  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  }
  // iOS
  if (iphone && !ipod) {
    device.osVersion = iphone[2].replace(/_/g, '.');
    device.iphone = true;
    device.iphoneX = iphoneX;
  }
  if (ipad) {
    device.osVersion = ipad[2].replace(/_/g, '.');
    device.ipad = true;
  }
  if (ipod) {
    device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    device.iphone = true;
  }
  // iOS 8+ changed UA
  if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
    if (device.osVersion.split('.')[0] === '10') {
      device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
    }
  }

  // Webview
  device.webView = (iphone || ipad || ipod) && (ua.match(/.*AppleWebKit(?!.*Safari)/i) || window.navigator.standalone);

  // Desktop
  device.desktop = !(device.os || device.android || device.webView);

  // Minimal UI
  if (device.os && device.os === 'ios') {
    var osVersionArr = device.osVersion.split('.');
    var metaViewport = document.querySelector('meta[name="viewport"]');
    device.minimalUi =
      !device.webView &&
      (ipod || iphone) &&
      (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
      metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
  }

  // Check for status bar and fullscreen app mode
  device.needsStatusbarOverlay = function needsStatusbarOverlay() {
    if (device.webView && (window.innerWidth * window.innerHeight === window.screen.width * window.screen.height)) {
      if (device.iphoneX && (window.orientation === 90 || window.orientation === -90)) {
        return false;
      }
      return true;
    }
    return false;
  };
  device.statusbar = device.needsStatusbarOverlay();

  // Pixel Ratio
  device.pixelRatio = window.devicePixelRatio || 1;

  // Export object
  return device;
}());

var Framework7Class = function Framework7Class(params, parents) {
  if ( params === void 0 ) params = {};
  if ( parents === void 0 ) parents = [];

  var self = this;
  self.params = params;

  // Events
  self.eventsParents = parents;
  self.eventsListeners = {};

  if (self.params && self.params.on) {
    Object.keys(self.params.on).forEach(function (eventName) {
      self.on(eventName, self.params.on[eventName]);
    });
  }
};

var staticAccessors$1 = { components: { configurable: true } };
Framework7Class.prototype.on = function on (events, handler) {
  var self = this;
  if (typeof handler !== 'function') { return self; }
  events.split(' ').forEach(function (event) {
    if (!self.eventsListeners[event]) { self.eventsListeners[event] = []; }
    self.eventsListeners[event].push(handler);
  });
  return self;
};
Framework7Class.prototype.once = function once (events, handler) {
  var self = this;
  if (typeof handler !== 'function') { return self; }
  function onceHandler() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

    handler.apply(self, args);
    self.off(events, onceHandler);
  }
  return self.on(events, onceHandler);
};
Framework7Class.prototype.off = function off (events, handler) {
  var self = this;
  if (!self.eventsListeners) { return self; }
  events.split(' ').forEach(function (event) {
    if (typeof handler === 'undefined') {
      self.eventsListeners[event] = [];
    } else {
      self.eventsListeners[event].forEach(function (eventHandler, index) {
        if (eventHandler === handler) {
          self.eventsListeners[event].splice(index, 1);
        }
      });
    }
  });
  return self;
};
Framework7Class.prototype.emit = function emit () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

  var self = this;
  if (!self.eventsListeners) { return self; }
  var events;
  var data;
  var context;
  var eventsParents;
  if (typeof args[0] === 'string' || Array.isArray(args[0])) {
    events = args[0];
    data = args.slice(1, args.length);
    context = self;
    eventsParents = self.eventsParents;
  } else {
    events = args[0].events;
    data = args[0].data;
    context = args[0].context || self;
    eventsParents = args[0].local ? [] : args[0].parents || self.eventsParents;
  }
  var eventsArray = Array.isArray(events) ? events : events.split(' ');
  var localEvents = eventsArray.map(function (eventName) { return eventName.replace('local::', ''); });
  var parentEvents = eventsArray.filter(function (eventName) { return eventName.indexOf('local::') < 0; });

  localEvents.forEach(function (event) {
    if (self.eventsListeners[event]) {
      var handlers = [];
      self.eventsListeners[event].forEach(function (eventHandler) {
        handlers.push(eventHandler);
      });
      handlers.forEach(function (eventHandler) {
        eventHandler.apply(context, data);
      });
    }
  });
  if (eventsParents && eventsParents.length > 0) {
    eventsParents.forEach(function (eventsParent) {
      eventsParent.emit.apply(eventsParent, [ parentEvents ].concat( data ));
    });
  }
  return self;
};
Framework7Class.prototype.useModulesParams = function useModulesParams (instanceParams) {
  var instance = this;
  if (!instance.modules) { return; }
  Object.keys(instance.modules).forEach(function (moduleName) {
    var module = instance.modules[moduleName];
    // Extend params
    if (module.params) {
      Utils.extend(instanceParams, module.params);
    }
  });
};
Framework7Class.prototype.useModules = function useModules (modulesParams) {
    if ( modulesParams === void 0 ) modulesParams = {};

  var instance = this;
  if (!instance.modules) { return; }
  Object.keys(instance.modules).forEach(function (moduleName) {
    var module = instance.modules[moduleName];
    var moduleParams = modulesParams[moduleName] || {};
    // Extend instance methods and props
    if (module.instance) {
      Object.keys(module.instance).forEach(function (modulePropName) {
        var moduleProp = module.instance[modulePropName];
        if (typeof moduleProp === 'function') {
          instance[modulePropName] = moduleProp.bind(instance);
        } else {
          instance[modulePropName] = moduleProp;
        }
      });
    }
    // Add event listeners
    if (module.on && instance.on) {
      Object.keys(module.on).forEach(function (moduleEventName) {
        instance.on(moduleEventName, module.on[moduleEventName]);
      });
    }

    // Module create callback
    if (module.create) {
      module.create.bind(instance)(moduleParams);
    }
  });
};
staticAccessors$1.components.set = function (components) {
  var Class = this;
  if (!Class.use) { return; }
  Class.use(components);
};
Framework7Class.installModule = function installModule (module) {
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

  var Class = this;
  if (!Class.prototype.modules) { Class.prototype.modules = {}; }
  var name = module.name || (((Object.keys(Class.prototype.modules).length) + "_" + (Utils.now())));
  Class.prototype.modules[name] = module;
  // Prototype
  if (module.proto) {
    Object.keys(module.proto).forEach(function (key) {
      Class.prototype[key] = module.proto[key];
    });
  }
  // Class
  if (module.static) {
    Object.keys(module.static).forEach(function (key) {
      Class[key] = module.static[key];
    });
  }
  // Callback
  if (module.install) {
    module.install.apply(Class, params);
  }
  return Class;
};
Framework7Class.use = function use (module) {
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

  var Class = this;
  if (Array.isArray(module)) {
    module.forEach(function (m) { return Class.installModule(m); });
    return Class;
  }
  return Class.installModule.apply(Class, [ module ].concat( params ));
};

Object.defineProperties( Framework7Class, staticAccessors$1 );

var Framework7$1 = (function (Framework7Class$$1) {
  function Framework7(params) {
    Framework7Class$$1.call(this, params);

    var passedParams = Utils.extend({}, params);

    // App Instance
    var app = this;

    // Default
    var defaults = {
      version: '1.0.0',
      id: 'io.framework7.testapp',
      root: 'body',
      theme: 'auto',
      language: window.navigator.language,
      routes: [],
      name: 'Framework7',
      initOnDeviceReady: true,
      init: true,
    };

    // Extend defaults with modules params
    app.useModulesParams(defaults);


    // Extend defaults with passed params
    app.params = Utils.extend(defaults, params);

    var $rootEl = $$1$1(app.params.root);

    Utils.extend(app, {
      // App Id
      id: app.params.id,
      // App Name
      name: app.params.name,
      // App version
      version: app.params.version,
      // Routes
      routes: app.params.routes,
      // Lang
      language: app.params.language,
      // Root
      root: $rootEl,
      // Local Storage
      ls: window.localStorage,
      // RTL
      rtl: $rootEl.css('direction') === 'rtl',
      // Theme
      theme: (function getTheme() {
        if (app.params.theme === 'auto') {
          return Device.ios ? 'ios' : 'md';
        }
        return app.params.theme;
      }()),
      // Initially passed parameters
      passedParams: passedParams,
    });

    // Save Root
    app.root[0].f7 = app;

    // Install Modules
    app.useModules();

    // Init
    if (app.params.init) {
      if (Device.cordova && app.params.initOnDeviceReady) {
        $$1$1(document).on('deviceready', function () {
          app.init();
        });
      } else {
        app.init();
      }
    }

    // Return app instance
    return app;
  }

  if ( Framework7Class$$1 ) Framework7.__proto__ = Framework7Class$$1;
  Framework7.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Framework7.prototype.constructor = Framework7;

  var prototypeAccessors = { $: { configurable: true },t7: { configurable: true } };
  var staticAccessors = { Dom7: { configurable: true },$: { configurable: true },Template7: { configurable: true },Class: { configurable: true } };
  Framework7.prototype.init = function init () {
    var app = this;
    if (app.initialized) { return; }

    app.root.addClass('framework7-initializing');

    // RTL attr
    if (app.rtl) {
      $$1$1('html').attr('dir', 'rtl');
    }

    // Root class
    app.root.addClass('framework7-root');

    // Theme class
    $$1$1('html').removeClass('ios md').addClass(app.theme);

    // Data
    app.data = {};
    if (app.params.data && typeof app.params.data === 'function') {
      Utils.extend(app.data, app.params.data.bind(app)());
    } else if (app.params.data) {
      Utils.extend(app.data, app.params.data);
    }
    // Methods
    app.methods = {};
    if (app.params.methods) {
      Utils.extend(app.methods, app.params.methods);
    }
    // Init class
    Utils.nextFrame(function () {
      app.root.removeClass('framework7-initializing');
    });
    // Emit, init other modules
    app.initialized = true;
    app.emit('init');
  };
  // eslint-disable-next-line
  prototypeAccessors.$.get = function () {
    return $$1$1;
  };
  // eslint-disable-next-line
  prototypeAccessors.t7.get = function () {
    return Template7;
  };
  staticAccessors.Dom7.get = function () {
    return $$1$1;
  };
  staticAccessors.$.get = function () {
    return $$1$1;
  };
  staticAccessors.Template7.get = function () {
    return Template7;
  };
  staticAccessors.Class.get = function () {
    return Framework7Class$$1;
  };

  Object.defineProperties( Framework7.prototype, prototypeAccessors );
  Object.defineProperties( Framework7, staticAccessors );

  return Framework7;
}(Framework7Class));

var Device$2 = {
  name: 'device',
  proto: {
    device: Device,
  },
  static: {
    device: Device,
  },
  on: {
    init: function init() {
      var classNames = [];
      var html = document.querySelector('html');
      // Pixel Ratio
      classNames.push(("device-pixel-ratio-" + (Math.floor(Device.pixelRatio))));
      if (Device.pixelRatio >= 2) {
        classNames.push('device-retina');
      }
      // OS classes
      if (Device.os) {
        classNames.push(
          ("device-" + (Device.os)),
          ("device-" + (Device.os) + "-" + (Device.osVersion.split('.')[0])),
          ("device-" + (Device.os) + "-" + (Device.osVersion.replace(/\./g, '-')))
        );
        if (Device.os === 'ios') {
          var major = parseInt(Device.osVersion.split('.')[0], 10);
          for (var i = major - 1; i >= 6; i -= 1) {
            classNames.push(("device-ios-gt-" + i));
          }
          if (Device.iphoneX) {
            classNames.push('device-iphone-x');
          }
        }
      } else if (Device.desktop) {
        classNames.push('device-desktop');
      }
      // Status bar classes
      if (Device.statusbar) {
        classNames.push('with-statusbar');
      } else {
        html.classList.remove('with-statusbar');
      }

      // Add html classes
      classNames.forEach(function (className) {
        html.classList.add(className);
      });
    },
  },
};

var Support$1 = (function Support() {
  var positionSticky = (function supportPositionSticky() {
    var support = false;
    var div = document.createElement('div');
    ('sticky -webkit-sticky -moz-sticky').split(' ').forEach(function (prop) {
      if (support) { return; }
      div.style.position = prop;
      if (div.style.position === prop) {
        support = true;
      }
    });
    return support;
  }());

  return {
    positionSticky: positionSticky,
    touch: (function checkTouch() {
      return !!(('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch));
    }()),

    transforms3d: (function checkTransforms3d() {
      var div = document.createElement('div').style;
      return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
    }()),

    flexbox: (function checkFlexbox() {
      var div = document.createElement('div').style;
      var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
      for (var i = 0; i < styles.length; i += 1) {
        if (styles[i] in div) { return true; }
      }
      return false;
    }()),

    observer: (function checkObserver() {
      return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
    }()),

    passiveListener: (function checkPassiveListener() {
      var supportsPassive = false;
      try {
        var opts = Object.defineProperty({}, 'passive', {
          // eslint-disable-next-line
          get: function get() {
            supportsPassive = true;
          },
        });
        window.addEventListener('testPassiveListener', null, opts);
      } catch (e) {
        // No support
      }
      return supportsPassive;
    }()),

    gestures: (function checkGestures() {
      return 'ongesturestart' in window;
    }()),
  };
}());

var Support = {
  name: 'support',
  proto: {
    support: Support$1,
  },
  static: {
    support: Support$1,
  },
  on: {
    init: function init() {
      var html = document.querySelector('html');
      var classNames = [];
      if (Support$1.positionSticky) {
        classNames.push('support-position-sticky');
      }
      // Add html classes
      classNames.forEach(function (className) {
        html.classList.add(className);
      });
    },
  },
};

var Utils$2 = {
  name: 'utils',
  proto: {
    utils: Utils,
  },
  static: {
    utils: Utils,
  },
};

var Resize = {
  name: 'resize',
  instance: {
    getSize: function getSize() {
      var app = this;
      var offset = app.root.offset();
      var ref = [app.root[0].offsetWidth, app.root[0].offsetHeight, offset.left, offset.top];
      var width = ref[0];
      var height = ref[1];
      var left = ref[2];
      var top = ref[3];
      app.width = width;
      app.height = height;
      app.left = left;
      app.top = top;
      return { width: width, height: height, left: left, top: top };
    },
  },
  on: {
    init: function init() {
      var app = this;

      // Get Size
      app.getSize();

      // Emit resize
      window.addEventListener('resize', function () {
        app.emit('resize');
      }, false);

      // Emit orientationchange
      window.addEventListener('orientationchange', function () {
        app.emit('orientationchange');
      });
    },
    orientationchange: function orientationchange() {
      var app = this;
      if (app.device && app.device.minimalUi) {
        if (window.orientation === 90 || window.orientation === -90) {
          document.body.scrollTop = 0;
        }
      }
      // Fix iPad weird body scroll
      if (app.device.ipad) {
        document.body.scrollLeft = 0;
        setTimeout(function () {
          document.body.scrollLeft = 0;
        }, 0);
      }
    },
    resize: function resize() {
      var app = this;
      app.getSize();
    },
  },
};

var globals = {};
var jsonpRequests = 0;

function Request$1(requestOptions) {
  var globalsNoCallbacks = Utils.extend({}, globals);
  ('beforeCreate beforeOpen beforeSend error complete success statusCode').split(' ').forEach(function (callbackName) {
    delete globalsNoCallbacks[callbackName];
  });
  var defaults = Utils.extend({
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
  }, globalsNoCallbacks);

  var options = Utils.extend({}, defaults, requestOptions);

  // Function to run XHR callbacks and events
  function fireCallback(callbackName) {
    var data = [], len = arguments.length - 1;
    while ( len-- > 0 ) data[ len ] = arguments[ len + 1 ];

    /*
      Callbacks:
      beforeCreate (xhr, options),
      beforeOpen (xhr, options),
      beforeSend (xhr, options),
      error (xhr, status),
      complete (xhr, stautus),
      success (response, status, xhr),
      statusCode ()
    */
    if (globals[callbackName]) { globals[callbackName].apply(globals, data); }
    if (options[callbackName]) { options[callbackName].apply(options, data); }
  }

  // Before create callback
  fireCallback('beforeCreate', options);

  // For jQuery guys
  if (options.type) { options.method = options.type; }

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
      stringData = Utils.serializeObject(options.data);
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
      fireCallback('error', null, 'scripterror');
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
    };
    document.querySelector('head').appendChild(script);

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
      options.url += paramsPrefix + "_nocache" + (Date.now());
    }
  }

  // Create XHR
  var xhr = new XMLHttpRequest();

  // Save Request URL
  xhr.requestUrl = options.url;
  xhr.requestParameters = options;

  // Before open callback
  fireCallback('beforeOpen', xhr, options);

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
        var data$1 = Utils.serializeObject(options.data);
        if (options.contentType === 'multipart/form-data') {
          data$1 = data$1.split('&');
          var newData = [];
          for (var i = 0; i < data$1.length; i += 1) {
            newData.push(("Content-Disposition: form-data; name=\"" + (data$1[i].split('=')[0]) + "\"\r\n\r\n" + (data$1[i].split('=')[1]) + "\r\n"));
          }
          postData = "--" + boundary + "\r\n" + (newData.join(("--" + boundary + "\r\n"))) + "--" + boundary + "--\r\n";
        } else {
          postData = data$1;
        }
      }
    } else {
      postData = options.data;
    }
  }

  // Additional headers
  if (options.headers) {
    Object.keys(options.headers).forEach(function (headerName) {
      xhr.setRequestHeader(headerName, options[headerName]);
    });
  }

  // Check for crossDomain
  if (typeof options.crossDomain === 'undefined') {
    // eslint-disable-next-line
    options.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(options.url) && RegExp.$2 !== window.location.host;
  }

  if (!options.crossDomain) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  if (options.xhrFields) {
    Utils.extend(xhr, options.xhrFields);
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
          fireCallback('success', responseData, xhr.status, xhr);
        } catch (err) {
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
      if (globals.statusCode && globals.statusCode[xhr.status]) { globals.statusCode[xhr.status](xhr); }
      if (options.statusCode[xhr.status]) { options.statusCode[xhr.status](xhr); }
    }
    fireCallback('complete', xhr, xhr.status);
  };

  xhr.onerror = function onerror() {
    if (xhrTimeout) { clearTimeout(xhrTimeout); }
    fireCallback('error', xhr, xhr.status);
    fireCallback('complete', xhr, 'error');
  };

  // Timeout
  if (options.timeout > 0) {
    xhr.onabort = function onabort() {
      if (xhrTimeout) { clearTimeout(xhrTimeout); }
    };
    xhrTimeout = setTimeout(function () {
      xhr.abort();
      fireCallback('error', xhr, 'timeout');
      fireCallback('complete', xhr, 'timeout');
    }, options.timeout);
  }

  // Ajax start callback
  fireCallback('beforeSend', xhr, options);

  // Send XHR
  xhr.send(postData);

  // Return XHR object
  return xhr;
}
function RequestShortcut(method) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var ref = [];
  var url = ref[0];
  var data = ref[1];
  var success = ref[2];
  var error = ref[3];
  var dataType = ref[4];
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
  dataType = dataType || (method === 'json' ? 'json' : undefined);
  return Request$1({
    url: url,
    method: method === 'post' ? 'POST' : 'GET',
    data: data,
    success: success,
    error: error,
    dataType: dataType,
  });
}
Request$1.get = function get() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return RequestShortcut.apply(void 0, [ 'get' ].concat( args ));
};
Request$1.post = function post() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return RequestShortcut.apply(void 0, [ 'post' ].concat( args ));
};
Request$1.json = function json() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return RequestShortcut.apply(void 0, [ 'json' ].concat( args ));
};
Request$1.setup = function setup(options) {
  if (options.type && !options.method) {
    Utils.extend(options, { method: options.type });
  }
  Utils.extend(globals, options);
};

/* eslint no-param-reassign: "off" */
var Request = {
  name: 'request',
  create: function create() {
    var app = this;
    app.request = Request$1;
  },
  static: {
    request: Request$1,
  },
};

function initTouch() {
  var app = this;
  var params = app.params.touch;
  var useRipple = app.theme === 'md' && params.materialRipple;

  if (Device.ios && Device.webView) {
    // Strange hack required for iOS 8 webview to work on inputs
    window.addEventListener('touchstart', function () {});
  }

  var touchStartX;
  var touchStartY;
  var touchStartTime;
  var targetElement;
  var trackClick;
  var activeSelection;
  var scrollParent;
  var lastClickTime;
  var isMoved;
  var tapHoldFired;
  var tapHoldTimeout;

  var activableElement;
  var activeTimeout;

  var needsFastClick;
  var needsFastClickTimeOut;

  var rippleWave;
  var rippleTarget;
  var rippleTimeout;

  function findActivableElement(el) {
    var target = $$1$1(el);
    var parents = target.parents(params.activeStateElements);
    var activable;
    if (target.is(params.activeStateElements)) {
      activable = target;
    }
    if (parents.length > 0) {
      activable = activable ? activable.add(parents) : parents;
    }
    return activable || target;
  }

  function isInsideScrollableView(el) {
    var pageContent = el.parents('.page-content, .panel');

    if (pageContent.length === 0) {
      return false;
    }

    // This event handler covers the "tap to stop scrolling".
    if (pageContent.prop('scrollHandlerSet') !== 'yes') {
      pageContent.on('scroll', function () {
        clearTimeout(activeTimeout);
        clearTimeout(rippleTimeout);
      });
      pageContent.prop('scrollHandlerSet', 'yes');
    }

    return true;
  }
  function addActive() {
    if (!activableElement) { return; }
    activableElement.addClass('active-state');
  }
  function removeActive() {
    if (!activableElement) { return; }
    activableElement.removeClass('active-state');
    activableElement = null;
  }
  function isFormElement(el) {
    var nodes = ('input select textarea label').split(' ');
    if (el.nodeName && nodes.indexOf(el.nodeName.toLowerCase()) >= 0) { return true; }
    return false;
  }
  function androidNeedsBlur(el) {
    var noBlur = ('button input textarea select').split(' ');
    if (document.activeElement && el !== document.activeElement && document.activeElement !== document.body) {
      if (noBlur.indexOf(el.nodeName.toLowerCase()) >= 0) {
        return false;
      }
      return true;
    }
    return false;
  }
  function targetNeedsFastClick(el) {
    /*
    if (
      Device.ios
      &&
      (
        Device.osVersion.split('.')[0] > 9
        ||
        (Device.osVersion.split('.')[0] * 1 === 9 && Device.osVersion.split('.')[1] >= 1)
      )
    ) {
      return false;
    }
    */
    var $el = $$1$1(el);
    if (el.nodeName.toLowerCase() === 'input' && (el.type === 'file' || el.type === 'range')) { return false; }
    if (el.nodeName.toLowerCase() === 'select' && Device.android) { return false; }
    if ($el.hasClass('no-fastclick') || $el.parents('.no-fastclick').length > 0) { return false; }
    if (params.fastClicksExclude && $el.is(params.fastClicksExclude)) { return false; }
    return true;
  }
  function targetNeedsFocus(el) {
    if (document.activeElement === el) {
      return false;
    }
    var tag = el.nodeName.toLowerCase();
    var skipInputs = ('button checkbox file image radio submit').split(' ');
    if (el.disabled || el.readOnly) { return false; }
    if (tag === 'textarea') { return true; }
    if (tag === 'select') {
      if (Device.android) { return false; }
      return true;
    }
    if (tag === 'input' && skipInputs.indexOf(el.type) < 0) { return true; }
    return false;
  }
  function targetNeedsPrevent(el) {
    var $el = $$1$1(el);
    var prevent = true;
    if ($el.is('label') || $el.parents('label').length > 0) {
      if (Device.android) {
        prevent = false;
      } else if (Device.ios && $el.is('input')) {
        prevent = true;
      } else { prevent = false; }
    }
    return prevent;
  }

  // Ripple handlers
  function findRippleElement(el) {
    var rippleElements = params.materialRippleElements;
    var $el = $$1$1(el);
    if ($el.is(rippleElements)) {
      if ($el.hasClass('no-ripple')) {
        return false;
      }
      return $el;
    } else if ($el.parents(rippleElements).length > 0) {
      var rippleParent = $el.parents(rippleElements).eq(0);
      if (rippleParent.hasClass('no-ripple')) {
        return false;
      }
      return rippleParent;
    }
    return false;
  }
  function createRipple($el, x, y) {
    if (!$el) { return; }
    rippleWave = app.touchRipple.create($el, x, y);
  }

  function removeRipple() {
    if (!rippleWave) { return; }
    rippleWave.remove();
    rippleWave = undefined;
    rippleTarget = undefined;
  }
  function rippleTouchStart(el) {
    rippleTarget = findRippleElement(el);
    if (!rippleTarget || rippleTarget.length === 0) {
      rippleTarget = undefined;
      return;
    }
    if (!isInsideScrollableView(rippleTarget)) {
      createRipple(rippleTarget, touchStartX, touchStartY);
    } else {
      rippleTimeout = setTimeout(function () {
        createRipple(rippleTarget, touchStartX, touchStartY);
      }, 80);
    }
  }
  function rippleTouchMove() {
    clearTimeout(rippleTimeout);
    removeRipple();
  }
  function rippleTouchEnd() {
    if (rippleWave) {
      removeRipple();
    } else if (rippleTarget && !isMoved) {
      clearTimeout(rippleTimeout);
      createRipple(rippleTarget, touchStartX, touchStartY);
      setTimeout(removeRipple, 0);
    } else {
      removeRipple();
    }
  }

  // Mouse Handlers
  function handleMouseDown(e) {
    findActivableElement(e.target).addClass('active-state');
    if ('which' in e && e.which === 3) {
      setTimeout(function () {
        $$1$1('.active-state').removeClass('active-state');
      }, 0);
    }
    if (useRipple) {
      touchStartX = e.pageX;
      touchStartY = e.pageY;
      rippleTouchStart(e.target, e.pageX, e.pageY);
    }
  }
  function handleMouseMove() {
    $$1$1('.active-state').removeClass('active-state');
    if (useRipple) {
      rippleTouchMove();
    }
  }
  function handleMouseUp() {
    $$1$1('.active-state').removeClass('active-state');
    if (useRipple) {
      rippleTouchEnd();
    }
  }

  // Send Click
  function sendClick(e) {
    var touch = e.changedTouches[0];
    var evt = document.createEvent('MouseEvents');
    var eventType = 'click';
    if (Device.android && targetElement.nodeName.toLowerCase() === 'select') {
      eventType = 'mousedown';
    }
    evt.initMouseEvent(eventType, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    evt.forwardedTouchEvent = true;

    if (app.device.ios && window.navigator.standalone) {
      // Fix the issue happens in iOS home screen apps where the wrong element is selected during a momentum scroll.
      // Upon tapping, we give the scrolling time to stop, then we grab the element based where the user tapped.
      setTimeout(function () {
        targetElement = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        targetElement.dispatchEvent(evt);
      }, 10);
    } else {
      targetElement.dispatchEvent(evt);
    }
  }

  // Touch Handlers
  function handleTouchStart(e) {
    var this$1 = this;

    isMoved = false;
    tapHoldFired = false;
    if (e.targetTouches.length > 1) {
      if (activableElement) { removeActive(); }
      return true;
    }
    if (e.touches.length > 1 && activableElement) {
      removeActive();
    }
    if (params.tapHold) {
      if (tapHoldTimeout) { clearTimeout(tapHoldTimeout); }
      tapHoldTimeout = setTimeout(function () {
        if (e && e.touches && e.touches.length > 1) { return; }
        tapHoldFired = true;
        e.preventDefault();
        $$1$1(e.target).trigger('taphold');
      }, params.tapHoldDelay);
    }
    if (needsFastClickTimeOut) { clearTimeout(needsFastClickTimeOut); }
    needsFastClick = targetNeedsFastClick(e.target);

    if (!needsFastClick) {
      trackClick = false;
      return true;
    }
    if (Device.ios || (Device.android && 'getSelection' in window)) {
      var selection = window.getSelection();
      if (
        selection.rangeCount &&
        selection.focusNode !== document.body &&
        (!selection.isCollapsed || document.activeElement === selection.focusNode)
      ) {
        activeSelection = true;
        return true;
      }

      activeSelection = false;
    }
    if (Device.android) {
      if (androidNeedsBlur(e.target)) {
        document.activeElement.blur();
      }
    }

    trackClick = true;
    targetElement = e.target;
    touchStartTime = (new Date()).getTime();
    touchStartX = e.targetTouches[0].pageX;
    touchStartY = e.targetTouches[0].pageY;

    // Detect scroll parent
    if (Device.ios) {
      scrollParent = undefined;
      $$1$1(targetElement).parents().each(function () {
        var parent = this$1;
        if (parent.scrollHeight > parent.offsetHeight && !scrollParent) {
          scrollParent = parent;
          scrollParent.f7ScrollTop = scrollParent.scrollTop;
        }
      });
    }
    if ((e.timeStamp - lastClickTime) < params.fastClicksDelayBetweenClicks) {
      e.preventDefault();
    }

    if (params.activeState) {
      activableElement = findActivableElement(targetElement);
      // If it's inside a scrollable view, we don't trigger active-state yet,
      // because it can be a scroll instead. Based on the link:
      // http://labnote.beedesk.com/click-scroll-and-pseudo-active-on-mobile-webk
      if (!isInsideScrollableView(activableElement)) {
        addActive();
      } else {
        activeTimeout = setTimeout(addActive, 80);
      }
    }
    if (useRipple) {
      rippleTouchStart(targetElement, touchStartX, touchStartY);
    }
    return true;
  }
  function handleTouchMove(e) {
    if (!trackClick) { return; }
    var distance = params.fastClicksDistanceThreshold;
    if (distance) {
      var pageX = e.targetTouches[0].pageX;
      var pageY = e.targetTouches[0].pageY;
      if (Math.abs(pageX - touchStartX) > distance || Math.abs(pageY - touchStartY) > distance) {
        isMoved = true;
      }
    } else {
      isMoved = true;
    }
    if (isMoved) {
      trackClick = false;
      targetElement = null;
      isMoved = true;
      if (params.tapHold) {
        clearTimeout(tapHoldTimeout);
      }
      if (params.activeState) {
        clearTimeout(activeTimeout);
        removeActive();
      }
      if (useRipple) {
        rippleTouchMove();
      }
    }
  }
  function handleTouchEnd(e) {
    clearTimeout(activeTimeout);
    clearTimeout(tapHoldTimeout);

    if (!trackClick) {
      if (!activeSelection && needsFastClick) {
        if (!(Device.android && !e.cancelable) && e.cancelable) {
          e.preventDefault();
        }
      }
      return true;
    }

    if (document.activeElement === e.target) {
      if (params.activeState) { removeActive(); }
      if (useRipple) {
        rippleTouchEnd();
      }
      return true;
    }

    if (!activeSelection) {
      e.preventDefault();
    }

    if ((e.timeStamp - lastClickTime) < params.fastClicksDelayBetweenClicks) {
      setTimeout(removeActive, 0);
      return true;
    }

    lastClickTime = e.timeStamp;

    trackClick = false;

    if (Device.ios && scrollParent) {
      if (scrollParent.scrollTop !== scrollParent.f7ScrollTop) {
        return false;
      }
    }

    // Add active-state here because, in a very fast tap, the timeout didn't
    // have the chance to execute. Removing active-state in a timeout gives
    // the chance to the animation execute.
    if (params.activeState) {
      addActive();
      setTimeout(removeActive, 0);
    }
    // Remove Ripple
    if (useRipple) {
      rippleTouchEnd();
    }

    // Trigger focus when required
    if (targetNeedsFocus(targetElement)) {
      if (Device.ios && Device.webView) {
        if ((e.timeStamp - touchStartTime) > 159) {
          targetElement = null;
          return false;
        }
        targetElement.focus();
        return false;
      }

      targetElement.focus();
    }

    // Blur active elements
    if (document.activeElement && targetElement !== document.activeElement && document.activeElement !== document.body && targetElement.nodeName.toLowerCase() !== 'label') {
      document.activeElement.blur();
    }

    // Send click
    e.preventDefault();
    sendClick(e);
    return false;
  }
  function handleTouchCancel() {
    trackClick = false;
    targetElement = null;

    // Remove Active State
    clearTimeout(activeTimeout);
    clearTimeout(tapHoldTimeout);
    if (params.activeState) {
      removeActive();
    }

    // Remove Ripple
    if (useRipple) {
      rippleTouchEnd();
    }
  }

  function handleClick(e) {
    var allowClick = false;

    if (trackClick) {
      targetElement = null;
      trackClick = false;
      return true;
    }
    if ((e.target.type === 'submit' && e.detail === 0) || e.target.type === 'file') {
      return true;
    }
    if (!targetElement) {
      if (!isFormElement(e.target)) {
        allowClick = true;
      }
    }
    if (!needsFastClick) {
      allowClick = true;
    }
    if (document.activeElement === targetElement) {
      allowClick = true;
    }
    if (e.forwardedTouchEvent) {
      allowClick = true;
    }
    if (!e.cancelable) {
      allowClick = true;
    }
    if (params.tapHold && params.tapHoldPreventClicks && tapHoldFired) {
      allowClick = false;
    }
    if (!allowClick) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      if (targetElement) {
        if (targetNeedsPrevent(targetElement) || isMoved) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
      targetElement = null;
    }
    needsFastClickTimeOut = setTimeout(function () {
      needsFastClick = false;
    }, (Device.ios || Device.androidChrome ? 100 : 400));

    if (params.tapHold) {
      tapHoldTimeout = setTimeout(function () {
        tapHoldFired = false;
      }, (Device.ios || Device.androidChrome ? 100 : 400));
    }

    return allowClick;
  }

  function emitAppTouchEvent(name, e) {
    app.emit({
      events: name,
      data: [e],
    });
  }
  function appClick(e) {
    emitAppTouchEvent('click', e);
  }
  function appTouchStartActive(e) {
    emitAppTouchEvent('touchstart touchstart:active', e);
  }
  function appTouchMoveActive(e) {
    emitAppTouchEvent('touchmove touchmove:active', e);
  }
  function appTouchEndActive(e) {
    emitAppTouchEvent('touchend touchend:active', e);
  }
  function appTouchStartPassive(e) {
    emitAppTouchEvent('touchstart:passive', e);
  }
  function appTouchMovePassive(e) {
    emitAppTouchEvent('touchmove:passive', e);
  }
  function appTouchEndPassive(e) {
    emitAppTouchEvent('touchend:passive', e);
  }

  var passiveListener = Support$1.passiveListener ? { passive: true } : false;
  var activeListener = Support$1.passiveListener ? { passive: false } : false;

  document.addEventListener('click', appClick, true);

  if (Support$1.passiveListener) {
    document.addEventListener(app.touchEvents.start, appTouchStartActive, activeListener);
    document.addEventListener(app.touchEvents.move, appTouchMoveActive, activeListener);
    document.addEventListener(app.touchEvents.end, appTouchEndActive, activeListener);

    document.addEventListener(app.touchEvents.start, appTouchStartPassive, passiveListener);
    document.addEventListener(app.touchEvents.move, appTouchMovePassive, passiveListener);
    document.addEventListener(app.touchEvents.end, appTouchEndPassive, passiveListener);
  } else {
    document.addEventListener(app.touchEvents.start, function (e) {
      appTouchStartActive(e);
      appTouchStartPassive(e);
    }, false);
    document.addEventListener(app.touchEvents.move, function (e) {
      appTouchMoveActive(e);
      appTouchMovePassive(e);
    }, false);
    document.addEventListener(app.touchEvents.end, function (e) {
      appTouchEndActive(e);
      appTouchEndPassive(e);
    }, false);
  }

  if (Support$1.touch) {
    app.on('click', handleClick);
    app.on('touchstart', handleTouchStart);
    app.on('touchmove', handleTouchMove);
    app.on('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchCancel, { passive: true });
  } else if (params.activeState) {
    app.on('touchstart', handleMouseDown);
    app.on('touchmove', handleMouseMove);
    app.on('touchend', handleMouseUp);
  }
  document.addEventListener('contextmenu', function (e) {
    if (params.disableContextMenu && (Device.ios || Device.android || Device.cordova)) {
      e.preventDefault();
    }
    if (useRipple) {
      if (activableElement) { removeActive(); }
      rippleTouchEnd();
    }
  });
}

var Touch = {
  name: 'touch',
  params: {
    touch: {
      // Fast clicks
      fastClicks: true,
      fastClicksDistanceThreshold: 10,
      fastClicksDelayBetweenClicks: 50,
      fastClicksExclude: '', // CSS selector
      // ContextMenu
      disableContextMenu: true,
      // Tap Hold
      tapHold: false,
      tapHoldDelay: 750,
      tapHoldPreventClicks: true,
      // Active State
      activeState: true,
      activeStateElements: 'a, button, label, span, .actions-button',
      materialRipple: true,
      materialRippleElements: '.ripple, .link, .item-link, .links-list a, .button, button, .input-clear-button, .dialog-button, .tab-link, .item-radio, .item-checkbox, .actions-button, .searchbar-disable-button, .fab a, .checkbox, .radio, .data-table .sortable-cell, .notification-close-button',
    },
  },
  instance: {
    touchEvents: {
      start: Support$1.touch ? 'touchstart' : 'mousedown',
      move: Support$1.touch ? 'touchmove' : 'mousemove',
      end: Support$1.touch ? 'touchend' : 'mouseup',
    },
  },
  on: {
    init: initTouch,
  },
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * Default configs.
 */
var DEFAULT_DELIMITER = '/';
var DEFAULT_DELIMITERS = './';

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined]
  '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER;
  var delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS;
  var pathEscaped = false;
  var res;

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      pathEscaped = true;
      continue
    }

    var prev = '';
    var next = str[index];
    var name = res[2];
    var capture = res[3];
    var group = res[4];
    var modifier = res[5];

    if (!pathEscaped && path.length) {
      var k = path.length - 1;

      if (delimiters.indexOf(path[k]) > -1) {
        prev = path[k];
        path = path.slice(0, k);
      }
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
      pathEscaped = false;
    }

    var partial = prev !== '' && next !== undefined && next !== prev;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = prev || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
    });
  }

  // Push any remaining characters.
  if (path || index < str.length) {
    tokens.push(path + str.substr(index));
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (data, options) {
    var path = '';
    var encode = (options && options.encode) || encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;
        continue
      }

      var value = data ? data[token.name] : undefined;
      var segment;

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array')
        }

        if (value.length === 0) {
          if (token.optional) { continue }

          throw new TypeError('Expected "' + token.name + '" to not be empty')
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value));

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"')
        }

        path += token.prefix + segment;
        continue
      }

      if (token.optional) {
        // Prepend partial segment prefixes.
        if (token.partial) { path += token.prefix; }

        continue
      }

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'))
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$/()])/g, '\\$1')
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  if (!keys) { return path }

  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        pattern: null
      });
    }
  }

  return path
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options))
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER);
  var delimiters = options.delimiters || DEFAULT_DELIMITERS;
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|');
  var route = '';
  var isEndDelimited = false;

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
      isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1;
    } else {
      var prefix = escapeString(token.prefix);
      var capture = token.repeat
        ? '(?:' + token.pattern + ')(?:' + prefix + '(?:' + token.pattern + '))*'
        : token.pattern;

      if (keys) { keys.push(token); }

      if (token.optional) {
        if (token.partial) {
          route += prefix + '(' + capture + ')?';
        } else {
          route += '(?:' + prefix + '(' + capture + '))?';
        }
      } else {
        route += prefix + '(' + capture + ')';
      }
    }
  }

  if (end) {
    if (!strict) { route += '(?:' + delimiter + ')?'; }

    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')';
  } else {
    if (!strict) { route += '(?:' + delimiter + '(?=' + endsWith + '))?'; }
    if (!isEndDelimited) { route += '(?=' + delimiter + '|' + endsWith + ')'; }
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys)
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), keys, options)
  }

  return stringToRegexp(/** @type {string} */ (path), keys, options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

var tempDom = document.createElement('div');

var Framework7Component = function Framework7Component(c, extendContext) {
  if ( extendContext === void 0 ) extendContext = {};

  var context = Utils.extend({}, extendContext);
  var component = Utils.extend(this, c, { context: context });

  // Apply context
  ('beforeCreate created beforeMount mounted beforeDestroy destroyed').split(' ').forEach(function (cycleKey) {
    if (component[cycleKey]) { component[cycleKey] = component[cycleKey].bind(context); }
  });

  if (component.data) {
    component.data = component.data.bind(context);
    // Data
    Utils.extend(context, component.data());
  }
  if (component.render) { component.render = component.render.bind(context); }
  if (component.methods) {
    Object.keys(component.methods).forEach(function (methodName) {
      context[methodName] = component.methods[methodName].bind(context);
    });
  }

  // Bind Events
  if (component.on) {
    Object.keys(component.on).forEach(function (eventName) {
      component.on[eventName] = component.on[eventName].bind(context);
    });
  }
  if (component.once) {
    Object.keys(component.once).forEach(function (eventName) {
      component.once[eventName] = component.once[eventName].bind(context);
    });
  }

  if (component.beforeCreate) { component.beforeCreate(); }

  // Watchers
  if (component.watch) {
    Object.keys(component.watch).forEach(function (watchKey) {
      var dataKeyValue = component.context[watchKey];
      Object.defineProperty(component.context, watchKey, {
        enumerable: true,
        configurable: true,
        set: function set(newValue) {
          dataKeyValue = newValue;
          component.watch[watchKey].call(context, dataKeyValue);
        },
        get: function get() {
          return dataKeyValue;
        },
      });
    });
  }

  // Render template
  var html = '';
  if (component.render) {
    html = component.render();
  } else if (component.template) {
    if (typeof component.template === 'string') {
      try {
        html = Template7.compile(component.template)(context);
      } catch (err) {
        throw err;
      }
    } else {
      // Supposed to be function
      html = component.template(context);
    }
  }

  // Make Dom
  if (html && typeof html === 'string') {
    html = html.trim();
    tempDom.innerHTML = html;
  } else if (html) {
    tempDom.innerHTML = '';
    tempDom.appendChild(html);
  }

  // Extend context with $el
  var el = tempDom.children[0];
  var $el = $$1$1(el);
  context.$el = $el;
  context.el = el;
  component.el = el;

  // Find Events
  var events = [];
  $$1$1(tempDom).find('*').each(function (index, element) {
    for (var i = 0; i < element.attributes.length; i += 1) {
      var attr = element.attributes[i];
      if (attr.name.indexOf('@') === 0) {
        var event = attr.name.replace('@', '');
        var name = event;
        var stop = false;
        var prevent = false;
        var once = false;
        if (event.indexOf('.') >= 0) {
          event.split('.').forEach(function (eventNamePart, eventNameIndex) {
            if (eventNameIndex === 0) { name = eventNamePart; }
            else {
              if (eventNamePart === 'stop') { stop = true; }
              if (eventNamePart === 'prevent') { prevent = true; }
              if (eventNamePart === 'once') { once = true; }
            }
          });
        }

        var value = attr.value;
        element.removeAttribute(attr.name);
        events.push({
          el: element,
          name: name,
          once: once,
          handler: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            var e = args[0];
            if (stop) { e.stopPropagation(); }
            if (prevent) { e.preventDefault(); }
            var methodName;
            var method;
            var customArgs = [];
            if (value.indexOf('(') < 0) {
              customArgs = args;
              methodName = value;
            } else {
              methodName = value.split('(')[0];
              value.split('(')[1].split(')')[0].split(',').forEach(function (argument) {
                var arg = argument.trim();
                // eslint-disable-next-line
                if (!isNaN(arg)) { arg = parseFloat(arg); }
                else if (arg === 'true') { arg = true; }
                else if (arg === 'false') { arg = false; }
                else if (arg === 'null') { arg = null; }
                else if (arg === 'undefined') { arg = undefined; }
                else if (arg[0] === '"') { arg = arg.replace(/"/g, ''); }
                else if (arg[0] === '\'') { arg = arg.replace(/'/g, ''); }
                else if (arg.indexOf('.') > 0) {
                  var deepArg;
                  arg.split('.').forEach(function (path) {
                    if (!deepArg) { deepArg = context; }
                    deepArg = deepArg[path];
                  });
                  arg = deepArg;
                } else {
                  arg = context[arg];
                }
                customArgs.push(arg);
              });
            }
            if (methodName.indexOf('.') >= 0) {
              methodName.split('.').forEach(function (path, pathIndex) {
                if (!method) { method = context; }
                if (method[path]) { method = method[path]; }
                else {
                  throw new Error(("Component doesn't have method \"" + (methodName.split('.').slice(0, pathIndex + 1).join('.')) + "\""));
                }
              });
            } else {
              if (!context[methodName]) {
                throw new Error(("Component doesn't have method \"" + methodName + "\""));
              }
              method = context[methodName];
            }
            method.apply(void 0, customArgs);
          },
        });
      }
    }
  });

  // Set styles scope ID
  var styleEl;
  if (component.style) {
    styleEl = document.createElement('style');
    styleEl.innerHTML = component.style;
  }
  if (component.styleScopeId) {
    el.setAttribute('data-scope', component.styleScopeId);
  }

  // Attach events
  function attachEvents() {
    if (component.on) {
      Object.keys(component.on).forEach(function (eventName) {
        $el.on(Utils.eventNameToColonCase(eventName), component.on[eventName]);
      });
    }
    if (component.once) {
      Object.keys(component.once).forEach(function (eventName) {
        $el.once(Utils.eventNameToColonCase(eventName), component.once[eventName]);
      });
    }
    events.forEach(function (event) {
      $$1$1(event.el)[event.once ? 'once' : 'on'](event.name, event.handler);
    });
  }

  function detachEvents() {
    if (component.on) {
      Object.keys(component.on).forEach(function (eventName) {
        $el.off(Utils.eventNameToColonCase(eventName), component.on[eventName]);
      });
    }
    if (component.once) {
      Object.keys(component.once).forEach(function (eventName) {
        $el.off(Utils.eventNameToColonCase(eventName), component.once[eventName]);
      });
    }
    events.forEach(function (event) {
      $$1$1(event.el).off(event.name, event.handler);
    });
  }

  attachEvents();

  // Created callback
  if (component.created) { component.created(); }

  // Mount
  component.mount = function mount(mountMethod) {
    if (component.beforeMount) { component.beforeMount(); }
    if (styleEl) { $$1$1('head').append(styleEl); }
    if (mountMethod) { mountMethod(el); }
    if (component.mounted) { component.mounted(); }
  };

  // Destroy
  component.destroy = function destroy() {
    if (component.beforeDestroy) { component.beforeDestroy(); }
    if (styleEl) { $$1$1(styleEl).remove(); }
    detachEvents();
    if (component.destroyed) { component.destroyed(); }
    // Store component instance
    if (el && el.f7Component) {
      el.f7Component = null;
      delete el.f7Component;
    }
    component = null;
  };

  // Store component instance
  for (var i = 0; i < tempDom.children.length; i += 1) {
    tempDom.children[i].f7Component = component;
  }

  return component;
};


var Component = {
  parse: function parse(componentString) {
    var callbackName = "f7_component_callback_" + (new Date().getTime());

    // Template
    var template;
    if (componentString.indexOf('<template>') >= 0) {
      template = componentString
        .split('<template>')
        .filter(function (item, index) { return index > 0; })
        .join('<template>')
        .split('</template>')
        .filter(function (item, index, arr) { return index < arr.length - 1; })
        .join('</template>')
        .replace(/{{#raw}}([ \n]*)<template/g, '{{#raw}}<template')
        .replace(/\/template>([ \n]*){{\/raw}}/g, '/template>{{/raw}}')
        .replace(/([ \n])<template/g, '$1{{#raw}}<template')
        .replace(/\/template>([ \n])/g, '/template>{{/raw}}$1');
    }

    // Styles
    var style;
    var styleScopeId = Utils.now();
    if (componentString.indexOf('<style>') >= 0) {
      style = componentString.split('<style>')[1].split('</style>')[0];
    } else if (componentString.indexOf('<style scoped>') >= 0) {
      style = componentString.split('<style scoped>')[1].split('</style>')[0];
      style = style.split('\n').map(function (line) {
        if (line.indexOf('{') >= 0) {
          if (line.indexOf('{{this}}') >= 0) {
            return line.replace('{{this}}', ("[data-scope=\"" + styleScopeId + "\"]"));
          }
          return ("[data-scope=\"" + styleScopeId + "\"] " + (line.trim()));
        }
        return line;
      }).join('\n');
    }

    var scriptContent;
    if (componentString.indexOf('<script>') >= 0) {
      var scripts = componentString.split('<script>');
      scriptContent = scripts[scripts.length - 1].split('</script>')[0].trim();
    } else {
      scriptContent = 'return {}';
    }
    scriptContent = "window." + callbackName + " = function () {" + scriptContent + "}";

    // Insert Script El
    var scriptEl = document.createElement('script');
    scriptEl.innerHTML = scriptContent;
    $$1$1('head').append(scriptEl);

    var component = window[callbackName]();

    // Remove Script El
    $$1$1(scriptEl).remove();

    if (!component.template && !component.render) {
      component.template = template;
    }
    if (style) {
      component.style = style;
      component.styleScopeId = styleScopeId;
    }
    return component;
  },
  create: function create(c, extendContext) {
    if ( extendContext === void 0 ) extendContext = {};

    return new Framework7Component(c, extendContext);
  },
};

var History = {
  queue: [],
  clearQueue: function clearQueue() {
    if (History.queue.length === 0) { return; }
    var currentQueue = History.queue.shift();
    currentQueue();
  },
  routerQueue: [],
  clearRouterQueue: function clearRouterQueue() {
    if (History.routerQueue.length === 0) { return; }
    var currentQueue = History.routerQueue.pop();
    var router = currentQueue.router;
    var stateUrl = currentQueue.stateUrl;
    var action = currentQueue.action;

    var animate = router.params.animate;
    if (router.params.pushStateAnimate === false) { animate = false; }

    if (action === 'back') {
      router.back({ animate: animate, pushState: false });
    }
    if (action === 'load') {
      router.navigate(stateUrl, { animate: animate, pushState: false });
    }
  },
  handle: function handle(e) {
    if (History.blockPopstate) { return; }
    var app = this;
    // const mainView = app.views.main;
    var state = e.state;
    History.previousState = History.state;
    History.state = state;

    History.allowChange = true;
    History.clearQueue();

    state = History.state;
    if (!state) { state = {}; }

    app.views.forEach(function (view) {
      var router = view.router;
      var viewState = state[view.id];
      if (!viewState && view.params.pushState) {
        viewState = {
          url: view.router.history[0],
        };
      }
      if (!viewState) { return; }
      var stateUrl = viewState.url || undefined;

      var animate = router.params.animate;
      if (router.params.pushStateAnimate === false) { animate = false; }

      if (stateUrl !== router.url) {
        if (router.history.indexOf(stateUrl) >= 0) {
          // Go Back
          if (router.allowPageChange) {
            router.back({ animate: animate, pushState: false });
          } else {
            History.routerQueue.push({
              action: 'back',
              router: router,
            });
          }
        } else if (router.allowPageChange) {
          // Load page
          router.navigate(stateUrl, { animate: animate, pushState: false });
        } else {
          History.routerQueue.unshift({
            action: 'load',
            stateUrl: stateUrl,
            router: router,
          });
        }
      }
    });
  },
  push: function push(viewId, viewState, url) {
    var obj;

    if (!History.allowChange) {
      History.queue.push(function () {
        History.push(viewId, viewState, url);
      });
      return;
    }
    History.previousState = History.state;
    var newState = Utils.extend({}, (History.previousState || {}), ( obj = {}, obj[viewId] = viewState, obj ));
    History.state = newState;
    window.history.pushState(newState, '', url);
  },
  replace: function replace(viewId, viewState, url) {
    var obj;

    if (!History.allowChange) {
      History.queue.push(function () {
        History.replace(viewId, viewState, url);
      });
      return;
    }
    History.previousState = History.state;
    var newState = Utils.extend({}, (History.previousState || {}), ( obj = {}, obj[viewId] = viewState, obj ));
    History.state = newState;
    window.history.replaceState(newState, '', url);
  },
  go: function go(index) {
    History.allowChange = false;
    window.history.go(index);
  },
  back: function back() {
    History.allowChange = false;
    window.history.back();
  },
  allowChange: true,
  previousState: {},
  state: window.history.state,
  blockPopstate: true,
  init: function init(app) {
    $$1$1(window).on('load', function () {
      setTimeout(function () {
        History.blockPopstate = false;
      }, 0);
    });

    if (document.readyState && document.readyState === 'complete') {
      History.blockPopstate = false;
    }

    $$1$1(window).on('popstate', History.handle.bind(app));
  },
};

function SwipeBack(r) {
  var router = r;
  var $el = router.$el;
  var $navbarEl = router.$navbarEl;
  var app = router.app;
  var isTouched = false;
  var isMoved = false;
  var touchesStart = {};
  var isScrolling;
  var currentPage = [];
  var previousPage = [];
  var viewContainerWidth;
  var touchesDiff;
  var allowViewTouchMove = true;
  var touchStartTime;
  var currentNavbar = [];
  var previousNavbar = [];
  var currentNavElements;
  var previousNavElements;
  var activeNavBackIcon;
  var activeNavBackIconText;
  var previousNavBackIcon;
  // let previousNavBackIconText;
  var dynamicNavbar;
  var separateNavbar;
  var pageShadow;
  var pageOpacity;
  var navbarWidth;

  function handleTouchStart(e) {
    if (!allowViewTouchMove || !router.params.iosSwipeBack || isTouched || (app.swipeout && app.swipeout.el) || !router.allowPageChange) { return; }
    if ($$1$1(e.target).closest('.range-slider, .calendar-months').length > 0) { return; }
    isMoved = false;
    isTouched = true;
    isScrolling = undefined;
    touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    touchStartTime = Utils.now();
    dynamicNavbar = router.dynamicNavbar;
    separateNavbar = router.separateNavbar;
  }
  function handleTouchMove(e) {
    if (!isTouched) { return; }
    var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
    if (typeof isScrolling === 'undefined') {
      isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x)) || pageX < touchesStart.x;
    }
    if (isScrolling || e.f7PreventSwipeBack || app.preventSwipeBack) {
      isTouched = false;
      return;
    }
    if (!isMoved) {
      // Calc values during first move fired
      var cancel = false;
      var target = $$1$1(e.target);

      var swipeout = target.closest('.swipeout');
      if (swipeout.length > 0) {
        if (!app.rtl && swipeout.find('.swipeout-actions-left').length > 0) { cancel = true; }
        if (app.rtl && swipeout.find('.swipeout-actions-right').length > 0) { cancel = true; }
      }

      currentPage = target.closest('.page');
      if (currentPage.hasClass('no-swipeback')) { cancel = true; }
      previousPage = $el.find('.page-previous:not(.stacked)');

      var notFromBorder = touchesStart.x - $el.offset().left > router.params.iosSwipeBackActiveArea;
      viewContainerWidth = $el.width();
      if (app.rtl) {
        notFromBorder = touchesStart.x < ($el.offset().left - $el[0].scrollLeft) + (viewContainerWidth - router.params.iosSwipeBackActiveArea);
      } else {
        notFromBorder = touchesStart.x - $el.offset().left > router.params.iosSwipeBackActiveArea;
      }
      if (notFromBorder) { cancel = true; }
      if (previousPage.length === 0 || currentPage.length === 0) { cancel = true; }
      if (cancel) {
        isTouched = false;
        return;
      }

      if (router.params.iosSwipeBackAnimateShadow) {
        pageShadow = currentPage.find('.page-shadow-effect');
        if (pageShadow.length === 0) {
          pageShadow = $$1$1('<div class="page-shadow-effect"></div>');
          currentPage.append(pageShadow);
        }
      }
      if (router.params.iosSwipeBackAnimateOpacity) {
        pageOpacity = previousPage.find('.page-opacity-effect');
        if (pageOpacity.length === 0) {
          pageOpacity = $$1$1('<div class="page-opacity-effect"></div>');
          previousPage.append(pageOpacity);
        }
      }

      if (dynamicNavbar) {
        if (separateNavbar) {
          currentNavbar = $navbarEl.find('.navbar-current:not(.stacked)');
          previousNavbar = $navbarEl.find('.navbar-previous:not(.stacked)');
        } else {
          currentNavbar = currentPage.children('.navbar').children('.navbar-inner');
          previousNavbar = previousPage.children('.navbar').children('.navbar-inner');
        }
        navbarWidth = $navbarEl[0].offsetWidth;
        currentNavElements = currentNavbar.children('.left, .title, .right, .subnavbar, .fading');
        previousNavElements = previousNavbar.children('.left, .title, .right, .subnavbar, .fading');
        if (router.params.iosAnimateNavbarBackIcon) {
          if (currentNavbar.hasClass('sliding')) {
            activeNavBackIcon = currentNavbar.children('.left').find('.back .icon');
            activeNavBackIconText = currentNavbar.children('.left').find('.back span').eq(0);
          } else {
            activeNavBackIcon = currentNavbar.children('.left.sliding').find('.back .icon');
            activeNavBackIconText = currentNavbar.children('.left.sliding').find('.back span').eq(0);
          }
          if (previousNavbar.hasClass('sliding')) {
            previousNavBackIcon = previousNavbar.children('.left').find('.back .icon');
            // previousNavBackIconText = previousNavbar.children('left').find('.back span').eq(0);
          } else {
            previousNavBackIcon = previousNavbar.children('.left.sliding').find('.back .icon');
            // previousNavBackIconText = previousNavbar.children('.left.sliding').find('.back span').eq(0);
          }
        }
      }

      // Close/Hide Any Picker
      if ($$1$1('.sheet.modal-in').length > 0 && app.sheet) {
        app.sheet.close($$1$1('.sheet.modal-in'));
      }
    }
    e.f7PreventPanelSwipe = true;
    isMoved = true;
    app.preventSwipePanelBySwipeBack = true;
    e.preventDefault();

    // RTL inverter
    var inverter = app.rtl ? -1 : 1;

    // Touches diff
    touchesDiff = (pageX - touchesStart.x - router.params.iosSwipeBackThreshold) * inverter;
    if (touchesDiff < 0) { touchesDiff = 0; }
    var percentage = touchesDiff / viewContainerWidth;

    // Swipe Back Callback
    var callbackData = {
      percentage: percentage,
      currentPageEl: currentPage[0],
      previousPageEl: previousPage[0],
      currentNavbarEl: currentNavbar[0],
      previousNavbarEl: previousNavbar[0],
    };
    $el.trigger('swipeback:move', callbackData);
    router.emit('swipebackMove', callbackData);

    // Transform pages
    var currentPageTranslate = touchesDiff * inverter;
    var previousPageTranslate = ((touchesDiff / 5) - (viewContainerWidth / 5)) * inverter;
    if (Device.pixelRatio === 1) {
      currentPageTranslate = Math.round(currentPageTranslate);
      previousPageTranslate = Math.round(previousPageTranslate);
    }

    currentPage.transform(("translate3d(" + currentPageTranslate + "px,0,0)"));
    if (router.params.iosSwipeBackAnimateShadow) { pageShadow[0].style.opacity = 1 - (1 * percentage); }

    previousPage.transform(("translate3d(" + previousPageTranslate + "px,0,0)"));
    if (router.params.iosSwipeBackAnimateOpacity) { pageOpacity[0].style.opacity = 1 - (1 * percentage); }

    // Dynamic Navbars Animation
    if (dynamicNavbar) {
      currentNavElements.each(function (index, navEl) {
        var $navEl = $$1$1(navEl);
        if (!$navEl.is('.subnavbar')) { $navEl[0].style.opacity = (1 - (Math.pow( percentage, 0.33 ))); }
        if ($navEl[0].className.indexOf('sliding') >= 0 || currentNavbar.hasClass('sliding')) {
          var activeNavTranslate = percentage * $navEl[0].f7NavbarRightOffset;
          if (Device.pixelRatio === 1) { activeNavTranslate = Math.round(activeNavTranslate); }
          $navEl.transform(("translate3d(" + activeNavTranslate + "px,0,0)"));
          if (router.params.iosAnimateNavbarBackIcon) {
            if ($navEl[0].className.indexOf('left') >= 0 && activeNavBackIcon.length > 0) {
              var iconTranslate = -activeNavTranslate;
              if (!separateNavbar) {
                iconTranslate -= navbarWidth * percentage;
              }
              activeNavBackIcon.transform(("translate3d(" + iconTranslate + "px,0,0)"));
            }
          }
        }
      });
      previousNavElements.each(function (index, navEl) {
        var $navEl = $$1$1(navEl);
        if (!$navEl.is('.subnavbar')) { $navEl[0].style.opacity = (Math.pow( percentage, 3 )); }
        if ($navEl[0].className.indexOf('sliding') >= 0 || previousNavbar.hasClass('sliding')) {
          var previousNavTranslate = $navEl[0].f7NavbarLeftOffset * (1 - percentage);
          if ($navEl[0].className.indexOf('title') >= 0 && activeNavBackIcon && activeNavBackIcon.length && activeNavBackIconText.length) {
            previousNavTranslate = ($navEl[0].f7NavbarLeftOffset + activeNavBackIconText[0].offsetLeft) * (1 - percentage);
          } else {
            previousNavTranslate = $navEl[0].f7NavbarLeftOffset * (1 - percentage);
          }
          if (Device.pixelRatio === 1) { previousNavTranslate = Math.round(previousNavTranslate); }
          $navEl.transform(("translate3d(" + previousNavTranslate + "px,0,0)"));
          if (router.params.iosAnimateNavbarBackIcon) {
            if ($navEl[0].className.indexOf('left') >= 0 && previousNavBackIcon.length > 0) {
              var iconTranslate = -previousNavTranslate;
              if (!separateNavbar) {
                iconTranslate += (navbarWidth / 5) * (1 - percentage);
              }
              previousNavBackIcon.transform(("translate3d(" + iconTranslate + "px,0,0)"));
            }
          }
        }
      });
    }
  }
  function handleTouchEnd() {
    app.preventSwipePanelBySwipeBack = false;
    if (!isTouched || !isMoved) {
      isTouched = false;
      isMoved = false;
      return;
    }
    isTouched = false;
    isMoved = false;
    if (touchesDiff === 0) {
      $$1$1([currentPage[0], previousPage[0]]).transform('');
      if (dynamicNavbar) {
        currentNavElements.transform('').css({ opacity: '' });
        previousNavElements.transform('').css({ opacity: '' });
        if (activeNavBackIcon && activeNavBackIcon.length > 0) { activeNavBackIcon.transform(''); }
        if (previousNavBackIcon && activeNavBackIcon.length > 0) { previousNavBackIcon.transform(''); }
      }
      return;
    }
    var timeDiff = Utils.now() - touchStartTime;
    var pageChanged = false;
    // Swipe back to previous page
    if (
      (timeDiff < 300 && touchesDiff > 10) ||
      (timeDiff >= 300 && touchesDiff > viewContainerWidth / 2)
    ) {
      currentPage.removeClass('page-current').addClass('page-next');
      previousPage.removeClass('page-previous').addClass('page-current');
      if (pageShadow) { pageShadow[0].style.opacity = ''; }
      if (pageOpacity) { pageOpacity[0].style.opacity = ''; }
      if (dynamicNavbar) {
        currentNavbar.removeClass('navbar-current').addClass('navbar-next');
        previousNavbar.removeClass('navbar-previous').addClass('navbar-current');
      }
      pageChanged = true;
    }
    // Reset custom styles
    // Add transitioning class for transition-duration
    $$1$1([currentPage[0], previousPage[0]]).addClass('page-transitioning').transform('');
    if (dynamicNavbar) {
      currentNavElements.css({ opacity: '' })
        .each(function (navElIndex, navEl) {
          var translate = pageChanged ? navEl.f7NavbarRightOffset : 0;
          var sliding = $$1$1(navEl);
          var iconTranslate = pageChanged ? -translate : 0;
          if (!separateNavbar && pageChanged) { iconTranslate -= navbarWidth; }
          sliding.transform(("translate3d(" + translate + "px,0,0)"));
          if (router.params.iosAnimateNavbarBackIcon) {
            if (sliding.hasClass('left') && activeNavBackIcon.length > 0) {
              activeNavBackIcon.addClass('navbar-transitioning').transform(("translate3d(" + iconTranslate + "px,0,0)"));
            }
          }
        }).addClass('navbar-transitioning');

      previousNavElements.transform('').css({ opacity: '' }).each(function (navElIndex, navEl) {
        var translate = pageChanged ? 0 : navEl.f7NavbarLeftOffset;
        var sliding = $$1$1(navEl);
        var iconTranslate = pageChanged ? 0 : -translate;
        if (!separateNavbar && !pageChanged) { iconTranslate += navbarWidth / 5; }
        sliding.transform(("translate3d(" + translate + "px,0,0)"));
        if (router.params.iosAnimateNavbarBackIcon) {
          if (sliding.hasClass('left') && previousNavBackIcon.length > 0) {
            previousNavBackIcon.addClass('navbar-transitioning').transform(("translate3d(" + iconTranslate + "px,0,0)"));
          }
        }
      }).addClass('navbar-transitioning');
    }
    allowViewTouchMove = false;
    router.allowPageChange = false;

    // Swipe Back Callback
    var callbackData = {
      currentPage: currentPage[0],
      previousPage: previousPage[0],
      currentNavbar: currentNavbar[0],
      previousNavbar: previousNavbar[0],
    };

    if (pageChanged) {
      // Update Route
      router.currentRoute = previousPage[0].f7Page.route;
      router.currentPage = previousPage[0];

      // Page before animation callback
      router.pageCallback('beforeOut', currentPage, currentNavbar, 'current', 'next', { route: currentPage[0].f7Page.route });
      router.pageCallback('beforeIn', previousPage, previousNavbar, 'previous', 'current', { route: previousPage[0].f7Page.route });

      $el.trigger('swipeback:beforechange', callbackData);
      router.emit('swipebackBeforeChange', callbackData);
    } else {
      $el.trigger('swipeback:beforereset', callbackData);
      router.emit('swipebackBeforeReset', callbackData);
    }

    currentPage.transitionEnd(function () {
      $$1$1([currentPage[0], previousPage[0]]).removeClass('page-transitioning');
      if (dynamicNavbar) {
        currentNavElements.removeClass('navbar-transitioning').css({ opacity: '' }).transform('');
        previousNavElements.removeClass('navbar-transitioning').css({ opacity: '' }).transform('');
        if (activeNavBackIcon && activeNavBackIcon.length > 0) { activeNavBackIcon.removeClass('navbar-transitioning'); }
        if (previousNavBackIcon && previousNavBackIcon.length > 0) { previousNavBackIcon.removeClass('navbar-transitioning'); }
      }
      allowViewTouchMove = true;
      router.allowPageChange = true;
      if (pageChanged) {
        // Update History
        if (router.history.length === 1) {
          router.history.unshift(router.url);
        }
        router.history.pop();
        router.saveHistory();

        // Update push state
        if (router.params.pushState) {
          History.back();
        }

        // Page after animation callback
        router.pageCallback('afterOut', currentPage, currentNavbar, 'current', 'next', { route: currentPage[0].f7Page.route });
        router.pageCallback('afterIn', previousPage, previousNavbar, 'previous', 'current', { route: previousPage[0].f7Page.route });

        // Remove Old Page
        if (router.params.stackPages && router.initialPages.indexOf(currentPage[0]) >= 0) {
          currentPage.addClass('stacked');
          if (separateNavbar) {
            currentNavbar.addClass('stacked');
          }
        } else {
          router.pageCallback('beforeRemove', currentPage, currentNavbar, 'next');
          router.removePage(currentPage);
          if (separateNavbar) {
            router.removeNavbar(currentNavbar);
          }
        }

        $el.trigger('swipeback:afterchange', callbackData);
        router.emit('swipebackAfterChange', callbackData);

        router.emit('routeChanged', router.currentRoute, router.previousRoute, router);

        if (router.params.preloadPreviousPage) {
          router.back(router.history[router.history.length - 2], { preload: true });
        }
      } else {
        $el.trigger('swipeback:afterreset', callbackData);
        router.emit('swipebackAfterReset', callbackData);
      }
      if (pageShadow && pageShadow.length > 0) { pageShadow.remove(); }
      if (pageOpacity && pageOpacity.length > 0) { pageOpacity.remove(); }
    });
  }

  function attachEvents() {
    var passiveListener = (app.touchEvents.start === 'touchstart' && Support$1.passiveListener) ? { passive: true, capture: false } : false;
    $el.on(app.touchEvents.start, handleTouchStart, passiveListener);
    app.on('touchmove:active', handleTouchMove);
    app.on('touchend:passive', handleTouchEnd);
  }
  function detachEvents() {
    var passiveListener = (app.touchEvents.start === 'touchstart' && Support$1.passiveListener) ? { passive: true, capture: false } : false;
    $el.off(app.touchEvents.start, handleTouchStart, passiveListener);
    app.off('touchmove:active', handleTouchMove);
    app.off('touchend:passive', handleTouchEnd);
  }

  attachEvents();

  router.on('routerDestroy', detachEvents);
}

var redirect = function (direction, route, options) {
  var router = this;
  var redirect = route.route.redirect;
  function redirectResolve(redirectUrl, redirectOptions) {
    if ( redirectOptions === void 0 ) redirectOptions = {};

    router.allowPageChange = true;
    router[direction](redirectUrl, Utils.extend({}, options, redirectOptions));
  }
  function redirectReject() {
    router.allowPageChange = true;
  }
  if (typeof redirect === 'function') {
    router.allowPageChange = false;
    var redirectUrl = redirect.call(router, route, redirectResolve, redirectReject);
    if (redirectUrl && typeof redirectUrl === 'string') {
      router.allowPageChange = true;
      return router[direction](redirectUrl, options);
    }
    return router;
  }
  return router[direction](redirect, options);
};

function forward(el, forwardOptions) {
  if ( forwardOptions === void 0 ) forwardOptions = {};

  var router = this;
  var app = router.app;
  var view = router.view;

  var options = Utils.extend({
    animate: router.params.animate,
    pushState: true,
    history: true,
    reloadCurrent: router.params.reloadPages,
    reloadPrevious: false,
    reloadAll: false,
    on: {},
  }, forwardOptions);

  var dynamicNavbar = router.dynamicNavbar;
  var separateNavbar = router.separateNavbar;

  var $viewEl = router.$el;
  var $newPage = $$1$1(el);
  var reload = options.reloadPrevious || options.reloadCurrent || options.reloadAll;
  var $oldPage;

  var $navbarEl;
  var $newNavbarInner;
  var $oldNavbarInner;

  if ($newPage.length) {
    // Remove theme elements
    router.removeThemeElements($newPage);
  }

  if (dynamicNavbar) {
    $newNavbarInner = $newPage.children('.navbar').children('.navbar-inner');
    if (separateNavbar) {
      $navbarEl = router.$navbarEl;
      if ($newNavbarInner.length > 0) {
        $newPage.children('.navbar').remove();
      }
      if ($newNavbarInner.length === 0 && $newPage[0].f7Page) {
        // Try from pageData
        $newNavbarInner = $newPage[0].f7Page.$navbarEl;
      }
    }
  }

  router.allowPageChange = false;
  if ($newPage.length === 0) {
    router.allowPageChange = true;
    return router;
  }

  // Pages In View
  var $pagesInView = $viewEl
    .children('.page:not(.stacked)')
    .filter(function (index, pageInView) { return pageInView !== $newPage[0]; });

  // Navbars In View
  var $navbarsInView;
  if (separateNavbar) {
    $navbarsInView = $navbarEl
      .children('.navbar-inner:not(.stacked)')
      .filter(function (index, navbarInView) { return navbarInView !== $newNavbarInner[0]; });
  }

  // Exit when reload previous and only 1 page in view so nothing ro reload
  if (options.reloadPrevious && $pagesInView.length < 2) {
    router.allowPageChange = true;
    return router;
  }

  // New Page
  var newPagePosition = 'next';
  if (options.reloadCurrent || options.reloadAll) {
    newPagePosition = 'current';
  } else if (options.reloadPrevious) {
    newPagePosition = 'previous';
  }
  $newPage
    .addClass(("page-" + newPagePosition))
    .removeClass('stacked');

  if (dynamicNavbar && $newNavbarInner.length) {
    $newNavbarInner
      .addClass(("navbar-" + newPagePosition))
      .removeClass('stacked');
  }

  // Find Old Page
  if (options.reloadCurrent) {
    $oldPage = $pagesInView.eq($pagesInView.length - 1);
    if (separateNavbar) {
      // $oldNavbarInner = $navbarsInView.eq($pagesInView.length - 1);
      $oldNavbarInner = $$1$1(app.navbar.getElByPage($oldPage));
    }
  } else if (options.reloadPrevious) {
    $oldPage = $pagesInView.eq($pagesInView.length - 2);
    if (separateNavbar) {
      // $oldNavbarInner = $navbarsInView.eq($pagesInView.length - 2);
      $oldNavbarInner = $$1$1(app.navbar.getElByPage($oldPage));
    }
  } else if (options.reloadAll) {
    $oldPage = $pagesInView.filter(function (index, pageEl) { return pageEl !== $newPage[0]; });
    if (separateNavbar) {
      $oldNavbarInner = $navbarsInView.filter(function (index, navbarEl) { return navbarEl !== $newNavbarInner[0]; });
    }
  } else {
    if ($pagesInView.length > 1) {
      var i = 0;
      for (i = 0; i < $pagesInView.length - 1; i += 1) {
        var oldNavbarInnerEl = app.navbar.getElByPage($pagesInView.eq(i));
        if (router.params.stackPages) {
          $pagesInView.eq(i).addClass('stacked');
          if (separateNavbar) {
            // $navbarsInView.eq(i).addClass('stacked');
            $$1$1(oldNavbarInnerEl).addClass('stacked');
          }
        } else {
          // Page remove event
          router.pageCallback('beforeRemove', $pagesInView[i], $navbarsInView && $navbarsInView[i], 'previous', undefined, options);
          router.removePage($pagesInView[i]);
          if (separateNavbar && oldNavbarInnerEl) {
            router.removeNavbar(oldNavbarInnerEl);
          }
        }
      }
    }
    $oldPage = $viewEl
      .children('.page:not(.stacked)')
      .filter(function (index, page) { return page !== $newPage[0]; });
    if (separateNavbar) {
      $oldNavbarInner = $navbarEl
        .children('.navbar-inner:not(.stacked)')
        .filter(function (index, navbarInner) { return navbarInner !== $newNavbarInner[0]; });
    }
  }
  if (dynamicNavbar && !separateNavbar) {
    $oldNavbarInner = $oldPage.children('.navbar').children('.navbar-inner');
  }

  // Push State
  if (router.params.pushState && options.pushState && !options.reloadPrevious) {
    var pushStateRoot = router.params.pushStateRoot || '';
    History[options.reloadCurrent || options.reloadAll ? 'replace' : 'push'](
      view.id,
      {
        url: options.route.url,
      },
      pushStateRoot + router.params.pushStateSeparator + options.route.url
    );
  }

  // Current Page & Navbar
  router.currentPageEl = $newPage[0];
  if (dynamicNavbar && $newNavbarInner.length) {
    router.currentNavbarEl = $newNavbarInner[0];
  } else {
    delete router.currentNavbarEl;
  }

  // Current Route
  router.currentRoute = options.route;

  // Update router history
  var url = options.route.url;
  if (options.history) {
    if (options.reloadCurrent && router.history.length > 0) {
      router.history[router.history.length - (options.reloadPrevious ? 2 : 1)] = url;
    } else if (options.reloadAll) {
      router.history = [url];
    } else {
      router.history.push(url);
    }
  }
  router.saveHistory();

  // Insert new page and navbar
  var newPageInDom = $newPage.parents(document).length > 0;
  var f7Component = $newPage[0].f7Component;
  if (options.reloadPrevious) {
    if (f7Component && !newPageInDom) {
      f7Component.mount(function (componentEl) {
        $$1$1(componentEl).insertBefore($oldPage);
      });
    } else {
      $newPage.insertBefore($oldPage);
    }
    if (separateNavbar && $newNavbarInner.length) {
      if ($oldNavbarInner.length) {
        $newNavbarInner.insertBefore($oldNavbarInner);
      } else {
        if (!router.$navbarEl.parents(document).length) {
          router.$el.prepend(router.$navbarEl);
        }
        $navbarEl.append($newNavbarInner);
      }
    }
  } else {
    if ($oldPage.next('.page')[0] !== $newPage[0]) {
      if (f7Component && !newPageInDom) {
        f7Component.mount(function (componentEl) {
          $viewEl.append(componentEl);
        });
      } else {
        $viewEl.append($newPage[0]);
      }
    }
    if (separateNavbar && $newNavbarInner.length) {
      if (!router.$navbarEl.parents(document).length) {
        router.$el.prepend(router.$navbarEl);
      }
      $navbarEl.append($newNavbarInner[0]);
    }
  }
  if (!newPageInDom) {
    router.pageCallback('mounted', $newPage, $newNavbarInner, newPagePosition, reload ? newPagePosition : 'current', options, $oldPage);
  }

  // Remove old page
  if (options.reloadCurrent && $oldPage.length > 0) {
    if (router.params.stackPages && router.initialPages.indexOf($oldPage[0]) >= 0) {
      $oldPage.addClass('stacked');
      if (separateNavbar) {
        $oldNavbarInner.addClass('stacked');
      }
    } else {
      // Page remove event
      router.pageCallback('beforeRemove', $oldPage, $oldNavbarInner, 'previous', undefined, options);
      router.removePage($oldPage);
      if (separateNavbar && $oldNavbarInner && $oldNavbarInner.length) {
        router.removeNavbar($oldNavbarInner);
      }
    }
  } else if (options.reloadAll) {
    $oldPage.each(function (index, pageEl) {
      var $oldPageEl = $$1$1(pageEl);
      var $oldNavbarInnerEl = $$1$1(app.navbar.getElByPage($oldPageEl));
      if (router.params.stackPages && router.initialPages.indexOf($oldPageEl[0]) >= 0) {
        $oldPageEl.addClass('stacked');
        if (separateNavbar) {
          $oldNavbarInnerEl.addClass('stacked');
        }
      } else {
        // Page remove event
        router.pageCallback('beforeRemove', $oldPageEl, $oldNavbarInner && $oldNavbarInner.eq(index), 'previous', undefined, options);
        router.removePage($oldPageEl);
        if (separateNavbar && $oldNavbarInnerEl.length) {
          router.removeNavbar($oldNavbarInnerEl);
        }
      }
    });
  }

  // Load Tab
  if (options.route.route.tab) {
    router.tabLoad(options.route.route.tab, Utils.extend({}, options, {
      history: false,
      pushState: false,
    }));
  }

  // Page init and before init events
  router.pageCallback('init', $newPage, $newNavbarInner, newPagePosition, reload ? newPagePosition : 'current', options, $oldPage);

  if (options.reloadCurrent || options.reloadAll) {
    router.allowPageChange = true;
    router.pageCallback('beforeIn', $newPage, $newNavbarInner, newPagePosition, 'current', options);
    router.pageCallback('afterIn', $newPage, $newNavbarInner, newPagePosition, 'current', options);
    return router;
  }

  // Before animation event
  router.pageCallback('beforeIn', $newPage, $newNavbarInner, 'next', 'current', options);
  router.pageCallback('beforeOut', $oldPage, $oldNavbarInner, 'current', 'previous', options);

  // Animation
  function afterAnimation() {
    var pageClasses = 'page-previous page-current page-next';
    var navbarClasses = 'navbar-previous navbar-current navbar-next';
    $newPage.removeClass(pageClasses).addClass('page-current').removeAttr('aria-hidden');
    $oldPage.removeClass(pageClasses).addClass('page-previous').attr('aria-hidden', 'true');
    if (dynamicNavbar) {
      $newNavbarInner.removeClass(navbarClasses).addClass('navbar-current').removeAttr('aria-hidden');
      $oldNavbarInner.removeClass(navbarClasses).addClass('navbar-previous').attr('aria-hidden', 'true');
    }
    // After animation event
    router.allowPageChange = true;
    router.pageCallback('afterIn', $newPage, $newNavbarInner, 'next', 'current', options);
    router.pageCallback('afterOut', $oldPage, $oldNavbarInner, 'current', 'previous', options);

    var keepOldPage = app.theme === 'ios' ? (router.params.preloadPreviousPage || router.params.iosSwipeBack) : router.params.preloadPreviousPage;
    if (!keepOldPage) {
      if ($newPage.hasClass('smart-select-page') || $newPage.hasClass('photo-browser-page') || $newPage.hasClass('autocomplete-page')) {
        keepOldPage = true;
      }
    }
    if (!keepOldPage) {
      if (router.params.stackPages) {
        $oldPage.addClass('stacked');
        if (separateNavbar) {
          $oldNavbarInner.addClass('stacked');
        }
      } else if (!($newPage.attr('data-name') && $newPage.attr('data-name') === 'smart-select-page')) {
        // Remove event
        router.pageCallback('beforeRemove', $oldPage, $oldNavbarInner, 'previous', undefined, options);
        router.removePage($oldPage);
        if (separateNavbar && $oldNavbarInner.length) {
          router.removeNavbar($oldNavbarInner);
        }
      }
    }
    router.emit('routeChanged', router.currentRoute, router.previousRoute, router);

    if (router.params.pushState) {
      History.clearRouterQueue();
    }
  }
  function setPositionClasses() {
    var pageClasses = 'page-previous page-current page-next';
    var navbarClasses = 'navbar-previous navbar-current navbar-next';
    $oldPage.removeClass(pageClasses).addClass('page-current').removeAttr('aria-hidden');
    $newPage.removeClass(pageClasses).addClass('page-next').removeAttr('aria-hidden');
    if (dynamicNavbar) {
      $oldNavbarInner.removeClass(navbarClasses).addClass('navbar-current').removeAttr('aria-hidden');
      $newNavbarInner.removeClass(navbarClasses).addClass('navbar-next').removeAttr('aria-hidden');
    }
  }
  if (options.animate) {
    var delay = router.app.theme === 'md' ? router.params.materialPageLoadDelay : router.params.iosPageLoadDelay;
    if (delay) {
      setTimeout(function () {
        setPositionClasses();
        router.animate($oldPage, $newPage, $oldNavbarInner, $newNavbarInner, 'forward', function () {
          afterAnimation();
        });
      }, delay);
    } else {
      setPositionClasses();
      router.animate($oldPage, $newPage, $oldNavbarInner, $newNavbarInner, 'forward', function () {
        afterAnimation();
      });
    }
  } else {
    afterAnimation();
  }
  return router;
}
function load(loadParams, loadOptions, ignorePageChange) {
  if ( loadParams === void 0 ) loadParams = {};
  if ( loadOptions === void 0 ) loadOptions = {};

  var router = this;
  if (!router.allowPageChange && !ignorePageChange) { return router; }
  var params = loadParams;
  var options = loadOptions;
  var url = params.url;
  var content = params.content;
  var el = params.el;
  var pageName = params.pageName;
  var template = params.template;
  var templateUrl = params.templateUrl;
  var component = params.component;
  var componentUrl = params.componentUrl;
  var ignoreCache = options.ignoreCache;

  if (options.route &&
    options.route.route &&
    options.route.route.parentPath &&
    router.currentRoute.route &&
    router.currentRoute.route.parentPath === options.route.route.parentPath) {
    // Do something nested
    if (options.route.url === router.url) {
      return false;
    }
    // Check for same params
    var sameParams = Object.keys(options.route.params).length === Object.keys(router.currentRoute.params).length;
    if (sameParams) {
      // Check for equal params name
      Object.keys(options.route.params).forEach(function (paramName) {
        if (
          !(paramName in router.currentRoute.params) ||
          (router.currentRoute.params[paramName] !== options.route.params[paramName])
        ) {
          sameParams = false;
        }
      });
    }
    if (sameParams) {
      if (options.route.route.tab) {
        return router.tabLoad(options.route.route.tab, options);
      }
      return false;
    }
  }

  if (
    options.route &&
    options.route.url &&
    router.url === options.route.url &&
    !(options.reloadCurrent || options.reloadPrevious) &&
    !router.params.allowDuplicateUrls
  ) {
    return false;
  }

  if (!options.route && url) {
    options.route = router.parseRouteUrl(url);
    Utils.extend(options.route, { route: { url: url, path: url } });
  }

  // Component Callbacks
  function resolve(pageEl, newOptions) {
    return router.forward(pageEl, Utils.extend(options, newOptions));
  }
  function reject() {
    router.allowPageChange = true;
    return router;
  }

  if (url || templateUrl || componentUrl) {
    router.allowPageChange = false;
  }

  // Proceed
  if (content) {
    router.forward(router.getPageEl(content), options);
  } else if (template || templateUrl) {
    // Parse template and send page element
    try {
      router.pageTemplateLoader(template, templateUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (el) {
    // Load page from specified HTMLElement or by page name in pages container
    router.forward(router.getPageEl(el), options);
  } else if (pageName) {
    // Load page by page name in pages container
    router.forward(router.$el.children((".page[data-name=\"" + pageName + "\"]")).eq(0), options);
  } else if (component || componentUrl) {
    // Load from component (F7/Vue/React/...)
    try {
      router.pageComponentLoader(router.el, component, componentUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (url) {
    // Load using XHR
    if (router.xhr) {
      router.xhr.abort();
      router.xhr = false;
    }
    router.xhrRequest(url, ignoreCache)
      .then(function (pageContent) {
        router.forward(router.getPageEl(pageContent), options);
      })
      .catch(function () {
        router.allowPageChange = true;
      });
  }
  return router;
}
function navigate(navigateParams, navigateOptions) {
  var obj;

  if ( navigateOptions === void 0 ) navigateOptions = {};
  var router = this;
  var url;
  var createRoute;
  if (typeof navigateParams === 'string') {
    url = navigateParams;
  } else {
    url = navigateParams.url;
    createRoute = navigateParams.route;
  }
  var app = router.app;
  if (!router.view) {
    if (app.views.main) {
      app.views.main.router.navigate(url, navigateOptions);
    }
    return router;
  }
  if (url === '#' || url === '') {
    return router;
  }

  var navigateUrl = url.replace('./', '');
  if (navigateUrl[0] !== '/' && navigateUrl.indexOf('#') !== 0) {
    var currentPath = router.currentRoute.parentPath || router.currentRoute.path;
    navigateUrl = ((currentPath ? (currentPath + "/") : '/') + navigateUrl)
      .replace('///', '/')
      .replace('//', '/');
  }
  var route;
  if (createRoute) {
    route = Utils.extend(router.parseRouteUrl(navigateUrl), {
      route: Utils.extend({}, createRoute),
    });
  } else {
    route = router.findMatchingRoute(navigateUrl);
  }

  if (!route) {
    return router;
  }

  if (route.route.redirect) {
    return redirect.call(router, 'navigate', route, navigateOptions);
  }

  var options = {};
  if (route.route.options) {
    Utils.extend(options, route.route.options, navigateOptions, { route: route });
  } else {
    Utils.extend(options, navigateOptions, { route: route });
  }
  ('popup popover sheet loginScreen actions customModal').split(' ').forEach(function (modalLoadProp) {
    if (route.route[modalLoadProp]) {
      router.modalLoad(modalLoadProp, route, options);
    }
  });
  ('url content component pageName el componentUrl template templateUrl').split(' ').forEach(function (pageLoadProp) {
    if (route.route[pageLoadProp]) {
      router.load(( obj = {}, obj[pageLoadProp] = route.route[pageLoadProp], obj ), options);
    }
  });
  // Async
  function asyncResolve(resolveParams, resolveOptions) {
    router.allowPageChange = false;
    var resolvedAsModal = false;
    ('popup popover sheet loginScreen actions customModal').split(' ').forEach(function (modalLoadProp) {
      if (resolveParams[modalLoadProp]) {
        resolvedAsModal = true;
        var modalRoute = Utils.extend({}, route, { route: resolveParams });
        router.allowPageChange = true;
        router.modalLoad(modalLoadProp, modalRoute, Utils.extend(options, resolveOptions));
      }
    });
    if (resolvedAsModal) { return; }
    router.load(resolveParams, Utils.extend(options, resolveOptions), true);
  }
  function asyncReject() {
    router.allowPageChange = true;
  }
  if (route.route.async) {
    router.allowPageChange = false;

    route.route.async.call(router, route, router.currentRoute, asyncResolve, asyncReject);
  }
  // Retur Router
  return router;
}

function tabLoad(tabRoute, loadOptions) {
  if ( loadOptions === void 0 ) loadOptions = {};

  var router = this;
  var options = Utils.extend({
    animate: router.params.animate,
    pushState: true,
    history: true,
    on: {},
  }, loadOptions);

  var ignoreCache = options.ignoreCache;
  if (options.route) {
    // Set Route
    if (options.route !== router.currentRoute) {
      router.currentRoute = options.route;
    }

    // Update Browser History
    if (router.params.pushState && options.pushState && !options.reloadPrevious) {
      History.replace(
        router.view.id,
        {
          url: options.route.url,
        },
        (router.params.pushStateRoot || '') + router.params.pushStateSeparator + options.route.url
      );
    }

    // Update Router History
    if (options.history) {
      router.history[router.history.length - 1] = options.route.url;
      router.saveHistory();
    }
  }

  // Show Tab
  var $currentPageEl = $$1$1(router.currentPageEl);
  var tabEl;
  if ($currentPageEl.length && $currentPageEl.find(("#" + (tabRoute.id))).length) {
    tabEl = $currentPageEl.find(("#" + (tabRoute.id))).eq(0);
  } else if (router.view.selector) {
    tabEl = (router.view.selector) + " #" + (tabRoute.id);
  } else {
    tabEl = "#" + (tabRoute.id);
  }
  var tabShowResult = router.app.tab.show({
    tabEl: tabEl,
    animate: options.animate,
    tabRoute: options.route,
  });

  var $newTabEl = tabShowResult.$newTabEl;
  var $oldTabEl = tabShowResult.$oldTabEl;
  var animated = tabShowResult.animated;
  var onTabsChanged = tabShowResult.onTabsChanged;

  if ($newTabEl && $newTabEl.parents('.page').length > 0 && options.route) {
    var tabParentPageData = $newTabEl.parents('.page')[0].f7Page;
    if (tabParentPageData && options.route) {
      tabParentPageData.route = options.route;
    }
  }

  // Load Tab Content
  var url = tabRoute.url;
  var content = tabRoute.content;
  var el = tabRoute.el;
  var template = tabRoute.template;
  var templateUrl = tabRoute.templateUrl;
  var component = tabRoute.component;
  var componentUrl = tabRoute.componentUrl;

  function onTabLoaded() {
    // Remove theme elements
    router.removeThemeElements($newTabEl);

    $newTabEl.trigger('tab:init tab:mounted', tabRoute);
    router.emit('tabInit tabMounted', $newTabEl[0], tabRoute);

    if ($oldTabEl && router.params.unloadTabContent) {
      if (animated) {
        onTabsChanged(function () {
          router.tabRemove($oldTabEl, $newTabEl, tabRoute);
        });
      } else {
        router.tabRemove($oldTabEl, $newTabEl, tabRoute);
      }
    }
  }
  if (!router.params.unloadTabContent) {
    if ($newTabEl[0].f7RouterTabLoaded) { return; }
  }

  var on = tabRoute.on; if ( on === void 0 ) on = {};
  var once = tabRoute.once; if ( once === void 0 ) once = {};
  if (options.on) {
    Utils.extend(on, options.on);
  }
  if (options.once) {
    Utils.extend(once, options.once);
  }

  // Component/Template Callbacks
  function resolve(contentEl) {
    if (!contentEl) { return; }
    if (typeof contentEl === 'string') {
      $newTabEl.html(contentEl);
    } else {
      $newTabEl.html('');
      if (contentEl.f7Component) {
        contentEl.f7Component.mount(function (componentEl) {
          $newTabEl.append(componentEl);
        });
      } else {
        $newTabEl.append(contentEl);
      }
    }
    if (!router.params.unloadTabContent) {
      $newTabEl[0].f7RouterTabLoaded = true;
    }
    onTabLoaded();
  }
  function reject() {
    router.allowPageChange = true;
    return router;
  }

  if (content) {
    resolve(content);
  } else if (template || templateUrl) {
    try {
      router.tabTemplateLoader(template, templateUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (el) {
    resolve(el);
  } else if (component || componentUrl) {
    // Load from component (F7/Vue/React/...)
    try {
      router.tabComponentLoader($newTabEl[0], component, componentUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (url) {
    // Load using XHR
    if (router.xhr) {
      router.xhr.abort();
      router.xhr = false;
    }
    router.xhrRequest(url, ignoreCache)
      .then(function (tabContent) {
        resolve(tabContent);
      })
      .catch(function () {
        router.allowPageChange = true;
      });
  }
}
function tabRemove($oldTabEl, $newTabEl, tabRoute) {
  var router = this;
  $oldTabEl.trigger('tab:beforeremove', tabRoute);
  router.emit('tabBeforeRemove', $oldTabEl[0], $newTabEl[0], tabRoute);
  $oldTabEl.children().each(function (index, tabChild) {
    if (tabChild.f7Component) {
      tabChild.f7Component.destroy();
    }
  });
  router.removeTabContent($oldTabEl[0], tabRoute);
}

function modalLoad(modalType, route, loadOptions) {
  if ( loadOptions === void 0 ) loadOptions = {};

  var router = this;
  var app = router.app;
  var options = Utils.extend({
    animate: router.params.animate,
    pushState: true,
    history: true,
    on: {},
  }, loadOptions);

  var modalParams = route.route[modalType];
  var modalRoute = route.route;

  var ignoreCache = options.ignoreCache;

  // Load Modal Props
  var url = modalParams.url;
  var template = modalParams.template;
  var templateUrl = modalParams.templateUrl;
  var component = modalParams.component;
  var componentUrl = modalParams.componentUrl;

  function onModalLoaded() {
    // Create Modal
    var modal = app[modalType].create(modalParams);
    modalRoute.modalInstance = modal;

    function closeOnSwipeBack() {
      modal.close();
    }
    modal.on('modalOpen', function () {
      router.once('swipeBackMove', closeOnSwipeBack);
    });
    modal.on('modalClose', function () {
      router.off('swipeBackMove', closeOnSwipeBack);
      if (!modal.closeByRouter) {
        router.back();
      }
    });

    modal.on('modalClosed', function () {
      modal.$el.trigger(((modalType.toLowerCase()) + ":beforeremove"), route, modal);
      modal.emit((modalType + "BeforeRemove"), modal.el, route, modal);
      var modalComponent = modal.el.f7Component;
      if (modalComponent) {
        modalComponent.destroy();
      }
      Utils.nextTick(function () {
        if (modalComponent) {
          router.removeModal(modal.el);
        }
        modal.destroy();
        delete modalRoute.modalInstance;
      });
    });

    if (options.route) {
      // Update Browser History
      if (router.params.pushState && options.pushState) {
        History.push(
          router.view.id,
          {
            url: options.route.url,
            modal: modalType,
          },
          (router.params.pushStateRoot || '') + router.params.pushStateSeparator + options.route.url
        );
      }

      // Set Route
      if (options.route !== router.currentRoute) {
        router.currentRoute = Utils.extend(options.route, { modal: modal });
      }

      // Update Router History
      if (options.history) {
        router.history.push(options.route.url);
        router.saveHistory();
      }
    }

    // Remove theme elements
    router.removeThemeElements(modal.el);

    // Emit events
    modal.$el.trigger(((modalType.toLowerCase()) + ":init " + (modalType.toLowerCase()) + ":mounted"), route, modal);
    router.emit((modalType + "Init " + modalType + "Mounted"), modal.el, route, modal);
    // Open
    modal.open();
  }

  // Component/Template Callbacks
  function resolve(contentEl) {
    if (contentEl) {
      if (typeof contentEl === 'string') {
        modalParams.content = contentEl;
      } else if (contentEl.f7Component) {
        contentEl.f7Component.mount(function (componentEl) {
          modalParams.el = componentEl;
          app.root.append(componentEl);
        });
      } else {
        modalParams.el = contentEl;
      }
      onModalLoaded();
    }
  }
  function reject() {
    router.allowPageChange = true;
    return router;
  }

  if (template || templateUrl) {
    try {
      router.modalTemplateLoader(template, templateUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (component || componentUrl) {
    // Load from component (F7/Vue/React/...)
    try {
      router.modalComponentLoader(app.root[0], component, componentUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (url) {
    // Load using XHR
    if (router.xhr) {
      router.xhr.abort();
      router.xhr = false;
    }
    router.xhrRequest(url, ignoreCache)
      .then(function (modalContent) {
        modalParams.content = modalContent;
        onModalLoaded();
      })
      .catch(function () {
        router.allowPageChange = true;
      });
  } else {
    onModalLoaded();
  }
}
function modalRemove(modal) {
  Utils.extend(modal, { closeByRouter: true });
  modal.close();
}

function backward(el, backwardOptions) {
  var router = this;
  var app = router.app;
  var view = router.view;

  var options = Utils.extend({
    animate: router.params.animate,
    pushState: true,
  }, backwardOptions);

  var dynamicNavbar = router.dynamicNavbar;
  var separateNavbar = router.separateNavbar;

  var $newPage = $$1$1(el);
  var $oldPage = router.$el.children('.page-current');

  if ($newPage.length) {
    // Remove theme elements
    router.removeThemeElements($newPage);
  }

  var $navbarEl;
  var $newNavbarInner;
  var $oldNavbarInner;

  if (dynamicNavbar) {
    $newNavbarInner = $newPage.children('.navbar').children('.navbar-inner');
    if (separateNavbar) {
      $navbarEl = router.$navbarEl;
      if ($newNavbarInner.length > 0) {
        $newPage.children('.navbar').remove();
      }
      if ($newNavbarInner.length === 0 && $newPage[0].f7Page) {
        // Try from pageData
        $newNavbarInner = $newPage[0].f7Page.$navbarEl;
      }
      $oldNavbarInner = $navbarEl.find('.navbar-current');
    } else {
      $oldNavbarInner = $oldPage.children('.navbar').children('.navbar-inner');
    }
  }

  router.allowPageChange = false;
  if ($newPage.length === 0 || $oldPage.length === 0) {
    router.allowPageChange = true;
    return router;
  }

  // Remove theme elements
  router.removeThemeElements($newPage);

  // New Page
  $newPage
    .addClass('page-previous')
    .removeClass('stacked')
    .removeAttr('aria-hidden');

  if (dynamicNavbar && $newNavbarInner.length > 0) {
    $newNavbarInner
      .addClass('navbar-previous')
      .removeClass('stacked')
      .removeAttr('aria-hidden');
  }


  // Remove previous page in case of "forced"
  var backIndex;
  if (options.force) {
    if ($oldPage.prev('.page-previous:not(.stacked)').length > 0 || $oldPage.prev('.page-previous').length === 0) {
      if (router.history.indexOf(options.route.url) >= 0) {
        backIndex = router.history.length - router.history.indexOf(options.route.url) - 1;
        router.history = router.history.slice(0, router.history.indexOf(options.route.url) + 2);
        view.history = router.history;
      } else if (router.history[[router.history.length - 2]]) {
        router.history[router.history.length - 2] = options.route.url;
      } else {
        router.history.unshift(router.url);
      }

      if (backIndex && router.params.stackPages) {
        $oldPage.prevAll('.page-previous').each(function (index, pageToRemove) {
          var $pageToRemove = $$1$1(pageToRemove);
          var $navbarToRemove;
          if (separateNavbar) {
            // $navbarToRemove = $oldNavbarInner.prevAll('.navbar-previous').eq(index);
            $navbarToRemove = $$1$1(app.navbar.getElByPage($pageToRemove));
          }
          if ($pageToRemove[0] !== $newPage[0] && $pageToRemove.index() > $newPage.index()) {
            if (router.initialPages.indexOf($pageToRemove[0]) >= 0) {
              $pageToRemove.addClass('stacked');
              if (separateNavbar) {
                $navbarToRemove.addClass('stacked');
              }
            } else {
              router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined, options);
              router.removePage($pageToRemove);
              if (separateNavbar && $navbarToRemove.length > 0) {
                router.removeNavbar($navbarToRemove);
              }
            }
          }
        });
      } else {
        var $pageToRemove = $oldPage.prev('.page-previous:not(.stacked)');
        var $navbarToRemove;
        if (separateNavbar) {
          // $navbarToRemove = $oldNavbarInner.prev('.navbar-inner:not(.stacked)');
          $navbarToRemove = $$1$1(app.navbar.getElByPage($pageToRemove));
        }
        if (router.params.stackPages && router.initialPages.indexOf($pageToRemove[0]) >= 0) {
          $pageToRemove.addClass('stacked');
          $navbarToRemove.addClass('stacked');
        } else if ($pageToRemove.length > 0) {
          router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined, options);
          router.removePage($pageToRemove);
          if (separateNavbar && $navbarToRemove.length) {
            router.removeNavbar($navbarToRemove);
          }
        }
      }
    }
  }

  // Insert new page
  var newPageInDom = $newPage.parents(document).length > 0;
  var f7Component = $newPage[0].f7Component;

  function insertPage() {
    if ($newPage.next($oldPage).length === 0) {
      if (!newPageInDom && f7Component) {
        f7Component.mount(function (componentEl) {
          $$1$1(componentEl).insertBefore($oldPage);
        });
      } else {
        $newPage.insertBefore($oldPage);
      }
    }
    if (separateNavbar && $newNavbarInner.length) {
      $newNavbarInner.insertBefore($oldNavbarInner);
      if ($oldNavbarInner.length > 0) {
        $newNavbarInner.insertBefore($oldNavbarInner);
      } else {
        if (!router.$navbarEl.parents(document).length) {
          router.$el.prepend(router.$navbarEl);
        }
        $navbarEl.append($newNavbarInner);
      }
    }
    if (!newPageInDom) {
      router.pageCallback('mounted', $newPage, $newNavbarInner, 'previous', 'current', options, $oldPage);
    }
  }

  if (options.preload) {
    // Insert Page
    insertPage();
    // Page init and before init events
    router.pageCallback('init', $newPage, $newNavbarInner, 'previous', 'current', options, $oldPage);
    if ($newPage.prevAll('.page-previous:not(.stacked)').length > 0) {
      $newPage.prevAll('.page-previous:not(.stacked)').each(function (index, pageToRemove) {
        var $pageToRemove = $$1$1(pageToRemove);
        var $navbarToRemove;
        if (separateNavbar) {
          // $navbarToRemove = $newNavbarInner.prevAll('.navbar-previous:not(.stacked)').eq(index);
          $navbarToRemove = $$1$1(app.navbar.getElByPage($pageToRemove));
        }
        if (router.params.stackPages && router.initialPages.indexOf(pageToRemove) >= 0) {
          $pageToRemove.addClass('stacked');
          if (separateNavbar) {
            $navbarToRemove.addClass('stacked');
          }
        } else {
          router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined);
          router.removePage($pageToRemove);
          if (separateNavbar && $navbarToRemove.length) {
            router.removeNavbar($navbarToRemove);
          }
        }
      });
    }
    router.allowPageChange = true;
    return router;
  }

  // History State
  if (router.params.pushState && options.pushState) {
    if (backIndex) { History.go(-backIndex); }
    else { History.back(); }
  }

  // Update History
  if (router.history.length === 1) {
    router.history.unshift(router.url);
  }
  router.history.pop();
  router.saveHistory();

  // Current Page & Navbar
  router.currentPageEl = $newPage[0];
  if (dynamicNavbar && $newNavbarInner.length) {
    router.currentNavbarEl = $newNavbarInner[0];
  } else {
    delete router.currentNavbarEl;
  }

  // Current Route
  router.currentRoute = options.route;

  // Insert Page
  insertPage();

  // Load Tab
  if (options.route.route.tab) {
    router.tabLoad(options.route.route.tab, Utils.extend({}, options, {
      history: false,
      pushState: false,
    }));
  }

  // Page init and before init events
  router.pageCallback('init', $newPage, $newNavbarInner, 'previous', 'current', options, $oldPage);

  // Before animation callback
  router.pageCallback('beforeIn', $newPage, $newNavbarInner, 'previous', 'current', options);
  router.pageCallback('beforeOut', $oldPage, $oldNavbarInner, 'current', 'next', options);

  // Animation
  function afterAnimation() {
    // Set classes
    var pageClasses = 'page-previous page-current page-next';
    var navbarClasses = 'navbar-previous navbar-current navbar-next';
    $newPage.removeClass(pageClasses).addClass('page-current').removeAttr('aria-hidden');
    $oldPage.removeClass(pageClasses).addClass('page-next').attr('aria-hidden', 'true');
    if (dynamicNavbar) {
      $newNavbarInner.removeClass(navbarClasses).addClass('navbar-current').removeAttr('aria-hidden');
      $oldNavbarInner.removeClass(navbarClasses).addClass('navbar-next').attr('aria-hidden', 'true');
    }

    // After animation event
    router.pageCallback('afterIn', $newPage, $newNavbarInner, 'previous', 'current', options);
    router.pageCallback('afterOut', $oldPage, $oldNavbarInner, 'current', 'next', options);

    // Remove Old Page
    if (router.params.stackPages && router.initialPages.indexOf($oldPage[0]) >= 0) {
      $oldPage.addClass('stacked');
      if (separateNavbar) {
        $oldNavbarInner.addClass('stacked');
      }
    } else {
      router.pageCallback('beforeRemove', $oldPage, $oldNavbarInner, 'next', undefined, options);
      router.removePage($oldPage);
      if (separateNavbar && $oldNavbarInner.length) {
        router.removeNavbar($oldNavbarInner);
      }
    }

    router.allowPageChange = true;
    router.emit('routeChanged', router.currentRoute, router.previousRoute, router);

    // Preload previous page
    var preloadPreviousPage = app.theme === 'ios' ? (router.params.preloadPreviousPage || router.params.iosSwipeBack) : router.params.preloadPreviousPage;
    if (preloadPreviousPage) {
      router.back(router.history[router.history.length - 2], { preload: true });
    }
    if (router.params.pushState) {
      History.clearRouterQueue();
    }
  }

  function setPositionClasses() {
    var pageClasses = 'page-previous page-current page-next';
    var navbarClasses = 'navbar-previous navbar-current navbar-next';
    $oldPage.removeClass(pageClasses).addClass('page-current');
    $newPage.removeClass(pageClasses).addClass('page-previous').removeAttr('aria-hidden');
    if (dynamicNavbar) {
      $oldNavbarInner.removeClass(navbarClasses).addClass('navbar-current');
      $newNavbarInner.removeClass(navbarClasses).addClass('navbar-previous').removeAttr('aria-hidden');
    }
  }

  if (options.animate) {
    setPositionClasses();
    router.animate($oldPage, $newPage, $oldNavbarInner, $newNavbarInner, 'backward', function () {
      afterAnimation();
    });
  } else {
    afterAnimation();
  }

  return router;
}
function loadBack(backParams, backOptions, ignorePageChange) {
  var router = this;

  if (!router.allowPageChange && !ignorePageChange) { return router; }
  var params = backParams;
  var options = backOptions;
  var url = params.url;
  var content = params.content;
  var el = params.el;
  var pageName = params.pageName;
  var template = params.template;
  var templateUrl = params.templateUrl;
  var component = params.component;
  var componentUrl = params.componentUrl;
  var ignoreCache = options.ignoreCache;

  if (
    options.route.url &&
    router.url === options.route.url &&
    !(options.reloadCurrent || options.reloadPrevious) &&
    !router.params.allowDuplicateUrls
  ) {
    return false;
  }

  if (!options.route && url) {
    options.route = router.parseRouteUrl(url);
  }

  // Component Callbacks
  function resolve(pageEl, newOptions) {
    return router.backward(pageEl, Utils.extend(options, newOptions));
  }
  function reject() {
    router.allowPageChange = true;
    return router;
  }

  if (url || templateUrl || componentUrl) {
    router.allowPageChange = false;
  }

  // Proceed
  if (content) {
    router.backward(router.getPageEl(content), options);
  } else if (template || templateUrl) {
    // Parse template and send page element
    try {
      router.pageTemplateLoader(template, templateUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (el) {
    // Load page from specified HTMLElement or by page name in pages container
    router.backward(router.getPageEl(el), options);
  } else if (pageName) {
    // Load page by page name in pages container
    router.backward(router.$el.children((".page[data-name=\"" + pageName + "\"]")).eq(0), options);
  } else if (component || componentUrl) {
    // Load from component (F7/Vue/React/...)
    try {
      router.pageComponentLoader(router.el, component, componentUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (url) {
    // Load using XHR
    if (router.xhr) {
      router.xhr.abort();
      router.xhr = false;
    }
    router.xhrRequest(url, ignoreCache)
      .then(function (pageContent) {
        router.backward(router.getPageEl(pageContent), options);
      })
      .catch(function () {
        router.allowPageChange = true;
      });
  }
  return router;
}
function back() {
  var obj;

  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];
  var navigateUrl;
  var navigateOptions;
  if (typeof args[0] === 'object') {
    navigateOptions = args[0] || {};
  } else {
    navigateUrl = args[0];
    navigateOptions = args[1] || {};
  }

  var router = this;
  var app = router.app;
  if (!router.view) {
    app.views.main.router.back(navigateUrl, navigateOptions);
    return router;
  }

  var currentRouteIsModal = router.currentRoute.modal;
  var modalType;
  if (!currentRouteIsModal) {
    ('popup popover sheet loginScreen actions customModal').split(' ').forEach(function (modalLoadProp) {
      if (router.currentRoute.route[modalLoadProp]) {
        currentRouteIsModal = true;
        modalType = modalLoadProp;
      }
    });
  }
  if (currentRouteIsModal) {
    var modalToClose = router.currentRoute.modal ||
                         router.currentRoute.route.modalInstance ||
                         app[modalType].get();
    var previousUrl = router.history[router.history.length - 2];
    var previousRoute = router.findMatchingRoute(previousUrl);
    if (!previousRoute && previousUrl) {
      previousRoute = {
        url: previousUrl,
        path: previousUrl.split('?')[0],
        query: Utils.parseUrlQuery(previousUrl),
        route: {
          path: previousUrl.split('?')[0],
          url: previousUrl,
        },
      };
    }
    if (!previousRoute || !modalToClose) {
      return router;
    }
    if (router.params.pushState && navigateOptions.pushState !== false) {
      History.back();
    }
    router.currentRoute = previousRoute;
    router.history.pop();
    router.saveHistory();
    router.modalRemove(modalToClose);
    return router;
  }
  var $previousPage = router.$el.children('.page-current').prevAll('.page-previous').eq(0);
  if (!navigateOptions.force && $previousPage.length > 0) {
    if (router.params.pushState && $previousPage[0].f7Page && router.history[router.history.length - 2] !== $previousPage[0].f7Page.route.url) {
      router.back(router.history[router.history.length - 2], Utils.extend(navigateOptions, { force: true }));
      return router;
    }
    router.loadBack({ el: $previousPage }, Utils.extend(navigateOptions, {
      route: $previousPage[0].f7Page.route,
    }));
    return router;
  }

  // Navigate URL
  if (navigateUrl === '#') {
    navigateUrl = undefined;
  }
  if (navigateUrl && navigateUrl[0] !== '/' && navigateUrl.indexOf('#') !== 0) {
    navigateUrl = ((router.path || '/') + navigateUrl).replace('//', '/');
  }
  if (!navigateUrl && router.history.length > 1) {
    navigateUrl = router.history[router.history.length - 2];
  }

  // Find route to load
  var route = router.findMatchingRoute(navigateUrl);
  if (!route) {
    if (navigateUrl) {
      route = {
        url: navigateUrl,
        path: navigateUrl.split('?')[0],
        query: Utils.parseUrlQuery(navigateUrl),
        route: {
          path: navigateUrl.split('?')[0],
          url: navigateUrl,
        },
      };
    }
  }
  if (!route) {
    return router;
  }

  if (route.route.redirect) {
    return redirect.call(router, 'back', route, navigateOptions);
  }

  var options = {};
  if (route.route.options) {
    Utils.extend(options, route.route.options, navigateOptions, { route: route });
  } else {
    Utils.extend(options, navigateOptions, { route: route });
  }

  if (options.force && router.params.stackPages) {
    router.$el.children('.page-previous.stacked').each(function (index, pageEl) {
      if (pageEl.f7Page && pageEl.f7Page.route && pageEl.f7Page.route.url === route.url) {
        router.loadBack({ el: pageEl }, options);
      }
    });
  }

  ('url content component pageName el componentUrl template templateUrl').split(' ').forEach(function (pageLoadProp) {
    if (route.route[pageLoadProp]) {
      router.loadBack(( obj = {}, obj[pageLoadProp] = route.route[pageLoadProp], obj ), options);
    }
  });
  // Async
  function asyncResolve(resolveParams, resolveOptions) {
    router.allowPageChange = false;
    router.loadBack(resolveParams, Utils.extend(options, resolveOptions), true);
  }
  function asyncReject() {
    router.allowPageChange = true;
  }
  if (route.route.async) {
    router.allowPageChange = false;

    route.route.async.call(router, route, router.currentRoute, asyncResolve, asyncReject);
  }
  // Return Router
  return router;
}

var Router$1 = (function (Framework7Class$$1) {
  function Router(app, view) {
    Framework7Class$$1.call(this, {}, [typeof view === 'undefined' ? app : view]);
    var router = this;

    // Is App Router
    router.isAppRouter = typeof view === 'undefined';

    if (router.isAppRouter) {
      // App Router
      Utils.extend(false, router, {
        app: app,
        params: app.params.view,
        routes: app.routes || [],
        cache: app.cache,
      });
    } else {
      // View Router
      Utils.extend(false, router, {
        app: app,
        view: view,
        viewId: view.id,
        params: view.params,
        routes: view.routes,
        $el: view.$el,
        el: view.el,
        $navbarEl: view.$navbarEl,
        navbarEl: view.navbarEl,
        history: view.history,
        scrollHistory: view.scrollHistory,
        cache: app.cache,
        dynamicNavbar: app.theme === 'ios' && view.params.iosDynamicNavbar,
        separateNavbar: app.theme === 'ios' && view.params.iosDynamicNavbar && view.params.iosSeparateDynamicNavbar,
        initialPages: [],
        initialNavbars: [],
      });
    }

    // Install Modules
    router.useModules();

    // Temporary Dom
    router.tempDom = document.createElement('div');

    // AllowPageChage
    router.allowPageChange = true;

    // Current Route
    var currentRoute = {};
    var previousRoute = {};
    Object.defineProperty(router, 'currentRoute', {
      enumerable: true,
      configurable: true,
      set: function set(newRoute) {
        if ( newRoute === void 0 ) newRoute = {};

        previousRoute = Utils.extend({}, currentRoute);
        currentRoute = newRoute;
        if (!currentRoute) { return; }
        router.url = currentRoute.url;
        router.emit('routeChange', newRoute, previousRoute, router);
      },
      get: function get() {
        return currentRoute;
      },
    });
    Object.defineProperty(router, 'previousRoute', {
      enumerable: true,
      configurable: true,
      get: function get() {
        return previousRoute;
      },
      set: function set(newRoute) {
        previousRoute = newRoute;
      },
    });

    Utils.extend(router, {
      // Load
      forward: forward,
      load: load,
      navigate: navigate,
      // Tab
      tabLoad: tabLoad,
      tabRemove: tabRemove,
      // Modal
      modalLoad: modalLoad,
      modalRemove: modalRemove,
      // Back
      backward: backward,
      loadBack: loadBack,
      back: back,
    });

    return router;
  }

  if ( Framework7Class$$1 ) Router.__proto__ = Framework7Class$$1;
  Router.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Router.prototype.constructor = Router;
  Router.prototype.animatableNavElements = function animatableNavElements (newNavbarInner, oldNavbarInner) {
    var router = this;
    var dynamicNavbar = router.dynamicNavbar;
    var animateIcon = router.params.iosAnimateNavbarBackIcon;

    var newNavEls;
    var oldNavEls;
    function animatableNavEl(el, navbarInner) {
      var $el = $$1$1(el);
      var isSliding = $el.hasClass('sliding') || navbarInner.hasClass('sliding');
      var isSubnavbar = $el.hasClass('subnavbar');
      var needsOpacityTransition = isSliding ? !isSubnavbar : true;
      var hasIcon = isSliding && animateIcon && $el.hasClass('left') && $el.find('.back .icon').length > 0;
      var $iconEl;
      if (hasIcon) { $iconEl = $el.find('.back .icon'); }
      return {
        $el: $el,
        $iconEl: $iconEl,
        hasIcon: hasIcon,
        leftOffset: $el[0].f7NavbarLeftOffset,
        rightOffset: $el[0].f7NavbarRightOffset,
        isSliding: isSliding,
        isSubnavbar: isSubnavbar,
        needsOpacityTransition: needsOpacityTransition,
      };
    }
    if (dynamicNavbar) {
      newNavEls = [];
      oldNavEls = [];
      newNavbarInner.children('.left, .right, .title, .subnavbar').each(function (index, navEl) {
        newNavEls.push(animatableNavEl(navEl, newNavbarInner));
      });
      oldNavbarInner.children('.left, .right, .title, .subnavbar').each(function (index, navEl) {
        oldNavEls.push(animatableNavEl(navEl, oldNavbarInner));
      });
      [oldNavEls, newNavEls].forEach(function (navEls) {
        navEls.forEach(function (navEl) {
          var n = navEl;
          var isSliding = navEl.isSliding;
          var $el = navEl.$el;
          var otherEls = navEls === oldNavEls ? newNavEls : oldNavEls;
          if (!(isSliding && $el.hasClass('title') && otherEls)) { return; }
          otherEls.forEach(function (otherNavEl) {
            if (otherNavEl.$el.hasClass('left') && otherNavEl.hasIcon) {
              var iconTextEl = otherNavEl.$el.find('.back span')[0];
              n.leftOffset += iconTextEl ? iconTextEl.offsetLeft : 0;
            }
          });
        });
      });
    }

    return { newNavEls: newNavEls, oldNavEls: oldNavEls };
  };
  Router.prototype.animateWithCSS = function animateWithCSS (oldPage, newPage, oldNavbarInner, newNavbarInner, direction, callback) {
    var router = this;
    var dynamicNavbar = router.dynamicNavbar;
    var separateNavbar = router.separateNavbar;
    var ios = router.app.theme === 'ios';
    // Router Animation class
    var routerTransitionClass = "router-transition-" + direction + " router-transition-css-" + direction;

    var newNavEls;
    var oldNavEls;
    var navbarWidth = 0;

    if (ios && dynamicNavbar) {
      if (!separateNavbar) {
        navbarWidth = newNavbarInner[0].offsetWidth;
      }
      var navEls = router.animatableNavElements(newNavbarInner, oldNavbarInner);
      newNavEls = navEls.newNavEls;
      oldNavEls = navEls.oldNavEls;
    }

    function animateNavbars(progress) {
      if (ios && dynamicNavbar) {
        newNavEls.forEach(function (navEl) {
          var $el = navEl.$el;
          var offset = direction === 'forward' ? navEl.rightOffset : navEl.leftOffset;
          if (navEl.isSliding) {
            $el.transform(("translate3d(" + (offset * (1 - progress)) + "px,0,0)"));
          }
          if (navEl.hasIcon) {
            if (direction === 'forward') {
              navEl.$iconEl.transform(("translate3d(" + ((-offset - navbarWidth) * (1 - progress)) + "px,0,0)"));
            } else {
              navEl.$iconEl.transform(("translate3d(" + ((-offset + (navbarWidth / 5)) * (1 - progress)) + "px,0,0)"));
            }
          }
        });
        oldNavEls.forEach(function (navEl) {
          var $el = navEl.$el;
          var offset = direction === 'forward' ? navEl.leftOffset : navEl.rightOffset;
          if (navEl.isSliding) {
            $el.transform(("translate3d(" + (offset * (progress)) + "px,0,0)"));
          }
          if (navEl.hasIcon) {
            if (direction === 'forward') {
              navEl.$iconEl.transform(("translate3d(" + ((-offset + (navbarWidth / 5)) * (progress)) + "px,0,0)"));
            } else {
              navEl.$iconEl.transform(("translate3d(" + ((-offset - navbarWidth) * (progress)) + "px,0,0)"));
            }
          }
        });
      }
    }

    // AnimationEnd Callback
    function onDone() {
      if (router.dynamicNavbar) {
        if (newNavbarInner.hasClass('sliding')) {
          newNavbarInner.find('.title, .left, .right, .left .icon, .subnavbar').transform('');
        } else {
          newNavbarInner.find('.sliding').transform('');
        }
        if (oldNavbarInner.hasClass('sliding')) {
          oldNavbarInner.find('.title, .left, .right, .left .icon, .subnavbar').transform('');
        } else {
          oldNavbarInner.find('.sliding').transform('');
        }
      }
      router.$el.removeClass(routerTransitionClass);
      if (callback) { callback(); }
    }

    (direction === 'forward' ? newPage : oldPage).animationEnd(function () {
      onDone();
    });

    // Animate
    if (dynamicNavbar) {
      // Prepare Navbars
      animateNavbars(0);
      Utils.nextTick(function () {
        // Add class, start animation
        animateNavbars(1);
        router.$el.addClass(routerTransitionClass);
      });
    } else {
      // Add class, start animation
      router.$el.addClass(routerTransitionClass);
    }
  };
  Router.prototype.animateWithJS = function animateWithJS (oldPage, newPage, oldNavbarInner, newNavbarInner, direction, callback) {
    var router = this;
    var dynamicNavbar = router.dynamicNavbar;
    var separateNavbar = router.separateNavbar;
    var ios = router.app.theme === 'ios';
    var duration = ios ? 400 : 250;
    var routerTransitionClass = "router-transition-" + direction + " router-transition-js-" + direction;

    var startTime = null;
    var done = false;

    var newNavEls;
    var oldNavEls;
    var navbarWidth = 0;

    if (ios && dynamicNavbar) {
      if (!separateNavbar) {
        navbarWidth = newNavbarInner[0].offsetWidth;
      }
      var navEls = router.animatableNavElements(newNavbarInner, oldNavbarInner);
      newNavEls = navEls.newNavEls;
      oldNavEls = navEls.oldNavEls;
    }

    var $shadowEl;
    var $opacityEl;

    if (ios) {
      $shadowEl = $$1$1('<div class="page-shadow-effect"></div>');
      $opacityEl = $$1$1('<div class="page-opacity-effect"></div>');

      if (direction === 'forward') {
        newPage.append($shadowEl);
        oldPage.append($opacityEl);
      } else {
        newPage.append($opacityEl);
        oldPage.append($shadowEl);
      }
    }
    var easing = Utils.bezier(0.25, 0.1, 0.25, 1);

    function onDone() {
      newPage.transform('').css('opacity', '');
      oldPage.transform('').css('opacity', '');
      if (ios) {
        $shadowEl.remove();
        $opacityEl.remove();
        if (dynamicNavbar) {
          newNavEls.forEach(function (navEl) {
            navEl.$el.transform('');
            navEl.$el.css('opacity', '');
          });
          oldNavEls.forEach(function (navEl) {
            navEl.$el.transform('');
            navEl.$el.css('opacity', '');
          });
          newNavEls = [];
          oldNavEls = [];
        }
      }

      router.$el.removeClass(routerTransitionClass);

      if (callback) { callback(); }
    }

    function render() {
      var time = Utils.now();
      if (!startTime) { startTime = time; }
      var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
      var easeProgress = easing(progress);

      if (progress >= 1) {
        done = true;
      }
      var inverter = router.app.rtl ? -1 : 1;
      if (ios) {
        if (direction === 'forward') {
          newPage.transform(("translate3d(" + ((1 - easeProgress) * 100 * inverter) + "%,0,0)"));
          oldPage.transform(("translate3d(" + (-easeProgress * 20 * inverter) + "%,0,0)"));
          $shadowEl[0].style.opacity = easeProgress;
          $opacityEl[0].style.opacity = easeProgress;
        } else {
          newPage.transform(("translate3d(" + (-(1 - easeProgress) * 20 * inverter) + "%,0,0)"));
          oldPage.transform(("translate3d(" + (easeProgress * 100 * inverter) + "%,0,0)"));
          $shadowEl[0].style.opacity = 1 - easeProgress;
          $opacityEl[0].style.opacity = 1 - easeProgress;
        }
        if (dynamicNavbar) {
          newNavEls.forEach(function (navEl) {
            var $el = navEl.$el;
            var offset = direction === 'forward' ? navEl.rightOffset : navEl.leftOffset;
            if (navEl.needsOpacityTransition) {
              $el[0].style.opacity = easeProgress;
            }
            if (navEl.isSliding) {
              $el.transform(("translate3d(" + (offset * (1 - easeProgress)) + "px,0,0)"));
            }
            if (navEl.hasIcon) {
              if (direction === 'forward') {
                navEl.$iconEl.transform(("translate3d(" + ((-offset - navbarWidth) * (1 - easeProgress)) + "px,0,0)"));
              } else {
                navEl.$iconEl.transform(("translate3d(" + ((-offset + (navbarWidth / 5)) * (1 - easeProgress)) + "px,0,0)"));
              }
            }
          });
          oldNavEls.forEach(function (navEl) {
            var $el = navEl.$el;
            var offset = direction === 'forward' ? navEl.leftOffset : navEl.rightOffset;
            if (navEl.needsOpacityTransition) {
              $el[0].style.opacity = (1 - easeProgress);
            }
            if (navEl.isSliding) {
              $el.transform(("translate3d(" + (offset * (easeProgress)) + "px,0,0)"));
            }
            if (navEl.hasIcon) {
              if (direction === 'forward') {
                navEl.$iconEl.transform(("translate3d(" + ((-offset + (navbarWidth / 5)) * (easeProgress)) + "px,0,0)"));
              } else {
                navEl.$iconEl.transform(("translate3d(" + ((-offset - navbarWidth) * (easeProgress)) + "px,0,0)"));
              }
            }
          });
        }
      } else if (direction === 'forward') {
        newPage.transform(("translate3d(0, " + ((1 - easeProgress) * 56) + "px,0)"));
        newPage.css('opacity', easeProgress);
      } else {
        oldPage.transform(("translate3d(0, " + (easeProgress * 56) + "px,0)"));
        oldPage.css('opacity', 1 - easeProgress);
      }

      if (done) {
        onDone();
        return;
      }
      Utils.nextFrame(render);
    }

    router.$el.addClass(routerTransitionClass);

    Utils.nextFrame(render);
  };
  Router.prototype.animate = function animate () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    // Args: oldPage, newPage, oldNavbarInner, newNavbarInner, direction, callback
    var router = this;
    if (router.params.animateCustom) {
      router.params.animateCustom.apply(router, args);
    } else if (router.params.animateWithJS) {
      router.animateWithJS.apply(router, args);
    } else {
      router.animateWithCSS.apply(router, args);
    }
  };
  Router.prototype.removeModal = function removeModal (modalEl) {
    var router = this;
    router.removeEl(modalEl);
  };
  // eslint-disable-next-line
  Router.prototype.removeTabContent = function removeTabContent (tabEl) {
    var $tabEl = $$1$1(tabEl);
    $tabEl.html('');
  };
  Router.prototype.removeNavbar = function removeNavbar (el) {
    var router = this;
    router.removeEl(el);
  };
  Router.prototype.removePage = function removePage (el) {
    var router = this;
    router.removeEl(el);
  };
  Router.prototype.removeEl = function removeEl (el) {
    if (!el) { return; }
    var router = this;
    var $el = $$1$1(el);
    if ($el.length === 0) { return; }
    if ($el[0].f7Component && $el[0].f7Component.destroy) {
      $el[0].f7Component.destroy();
    }
    if (!router.params.removeElements) {
      return;
    }
    if (router.params.removeElementsWithTimeout) {
      setTimeout(function () {
        $el.remove();
      }, router.params.removeElementsTimeout);
    } else {
      $el.remove();
    }
  };
  Router.prototype.getPageEl = function getPageEl (content) {
    var router = this;
    if (typeof content === 'string') {
      router.tempDom.innerHTML = content;
    } else {
      if ($$1$1(content).hasClass('page')) {
        return content;
      }
      router.tempDom.innerHTML = '';
      $$1$1(router.tempDom).append(content);
    }

    return router.findElement('.page', router.tempDom);
  };
  Router.prototype.findElement = function findElement (stringSelector, container, notStacked) {
    var router = this;
    var view = router.view;
    var app = router.app;

    // Modals Selector
    var modalsSelector = '.popup, .dialog, .popover, .actions-modal, .sheet-modal, .login-screen, .page';

    var $container = $$1$1(container);
    var selector = stringSelector;
    if (notStacked) { selector += ':not(.stacked)'; }

    var found = $container
      .find(selector)
      .filter(function (index, el) { return $$1$1(el).parents(modalsSelector).length === 0; });

    if (found.length > 1) {
      if (typeof view.selector === 'string') {
        // Search in related view
        found = $container.find(((view.selector) + " " + selector));
      }
      if (found.length > 1) {
        // Search in main view
        found = $container.find(("." + (app.params.viewMainClass) + " " + selector));
      }
    }
    if (found.length === 1) { return found; }

    // Try to find not stacked
    if (!notStacked) { found = router.findElement(selector, $container, true); }
    if (found && found.length === 1) { return found; }
    if (found && found.length > 1) { return $$1$1(found[0]); }
    return undefined;
  };
  Router.prototype.flattenRoutes = function flattenRoutes (routes) {
    var this$1 = this;
    if ( routes === void 0 ) routes = this.routes;

    var flattenedRoutes = [];
    routes.forEach(function (route) {
      if ('routes' in route) {
        var mergedPathsRoutes = route.routes.map(function (childRoute) {
          var cRoute = Utils.extend({}, childRoute);
          cRoute.path = (((route.path) + "/" + (cRoute.path))).replace('///', '/').replace('//', '/');
          return cRoute;
        });
        flattenedRoutes = flattenedRoutes.concat(route, this$1.flattenRoutes(mergedPathsRoutes));
      } else if ('tabs' in route && route.tabs) {
        var mergedPathsRoutes$1 = route.tabs.map(function (tabRoute) {
          var tRoute = Utils.extend({}, route, {
            path: (((route.path) + "/" + (tabRoute.path))).replace('///', '/').replace('//', '/'),
            parentPath: route.path,
            tab: tabRoute,
          });
          delete tRoute.tabs;
          return tRoute;
        });
        flattenedRoutes = flattenedRoutes.concat(this$1.flattenRoutes(mergedPathsRoutes$1));
      } else {
        flattenedRoutes.push(route);
      }
    });
    return flattenedRoutes;
  };
  // eslint-disable-next-line
  Router.prototype.parseRouteUrl = function parseRouteUrl (url) {
    if (!url) { return {}; }
    var query = Utils.parseUrlQuery(url);
    var hash = url.split('#')[1];
    var params = {};
    var path = url.split('#')[0].split('?')[0];
    return {
      query: query,
      hash: hash,
      params: params,
      url: url,
      path: path,
    };
  };
  Router.prototype.findTabRoute = function findTabRoute (tabEl) {
    var router = this;
    var $tabEl = $$1$1(tabEl);
    var parentPath = router.currentRoute.route.parentPath;
    var tabId = $tabEl.attr('id');
    var flattenedRoutes = router.flattenRoutes(router.routes);
    var foundTabRoute;
    flattenedRoutes.forEach(function (route) {
      if (
        route.parentPath === parentPath &&
        route.tab &&
        route.tab.id === tabId
      ) {
        foundTabRoute = route;
      }
    });
    return foundTabRoute;
  };
  Router.prototype.findRouteByKey = function findRouteByKey (key, value) {
    var router = this;
    var routes = router.routes;
    var flattenedRoutes = router.flattenRoutes(routes);
    var matchingRoute;

    flattenedRoutes.forEach(function (route) {
      if (matchingRoute) { return; }
      if (route[key] === value) {
        matchingRoute = route;
      }
    });
    return matchingRoute;
  };
  Router.prototype.findMatchingRoute = function findMatchingRoute (url) {
    if (!url) { return undefined; }
    var router = this;
    var routes = router.routes;
    var flattenedRoutes = router.flattenRoutes(routes);
    var ref = router.parseRouteUrl(url);
    var path = ref.path;
    var query = ref.query;
    var hash = ref.hash;
    var params = ref.params;
    var matchingRoute;
    flattenedRoutes.forEach(function (route) {
      if (matchingRoute) { return; }
      var keys = [];

      var pathsToMatch = [route.path];
      if (route.alias) {
        if (typeof route.alias === 'string') { pathsToMatch.push(route.alias); }
        else if (Array.isArray(route.alias)) {
          route.alias.forEach(function (aliasPath) {
            pathsToMatch.push(aliasPath);
          });
        }
      }

      var matched;
      pathsToMatch.forEach(function (pathToMatch) {
        if (matched) { return; }
        matched = pathToRegexp_1(pathToMatch, keys).exec(path);
      });

      if (matched) {
        keys.forEach(function (keyObj, index) {
          var paramValue = matched[index + 1];
          params[keyObj.name] = paramValue;
        });

        var parentPath;
        if (route.parentPath) {
          parentPath = path.split('/').slice(0, route.parentPath.split('/').length - 1).join('/');
        }

        matchingRoute = {
          query: query,
          hash: hash,
          params: params,
          url: url,
          path: path,
          parentPath: parentPath,
          route: route,
          name: route.name,
        };
      }
    });
    return matchingRoute;
  };
  Router.prototype.removeFromXhrCache = function removeFromXhrCache (url) {
    var router = this;
    var xhrCache = router.cache.xhr;
    var index = false;
    for (var i = 0; i < xhrCache.length; i += 1) {
      if (xhrCache[i].url === url) { index = i; }
    }
    if (index !== false) { xhrCache.splice(index, 1); }
  };
  Router.prototype.xhrRequest = function xhrRequest (requestUrl, ignoreCache) {
    var router = this;
    var params = router.params;
    var url = requestUrl;
    // should we ignore get params or not
    if (params.xhrCacheIgnoreGetParameters && url.indexOf('?') >= 0) {
      url = url.split('?')[0];
    }

    return Utils.promise(function (resolve, reject) {
      if (params.xhrCache && !ignoreCache && url.indexOf('nocache') < 0 && params.xhrCacheIgnore.indexOf(url) < 0) {
        for (var i = 0; i < router.cache.xhr.length; i += 1) {
          var cachedUrl = router.cache.xhr[i];
          if (cachedUrl.url === url) {
            // Check expiration
            if (Utils.now() - cachedUrl.time < params.xhrCacheDuration) {
              // Load from cache
              resolve(cachedUrl.content);
              return;
            }
          }
        }
      }
      router.xhr = router.app.request({
        url: url,
        method: 'GET',
        beforeSend: function beforeSend() {
          router.emit('routerAjaxStart', router.xhr);
        },
        complete: function complete(xhr, status) {
          router.emit('routerAjaxComplete', xhr);
          if ((status !== 'error' && status !== 'timeout' && (xhr.status >= 200 && xhr.status < 300)) || xhr.status === 0) {
            if (params.xhrCache && xhr.responseText !== '') {
              router.removeFromXhrCache(url);
              router.cache.xhr.push({
                url: url,
                time: Utils.now(),
                content: xhr.responseText,
              });
            }
            router.emit('routerAjaxSuccess', xhr);
            resolve(xhr.responseText);
          } else {
            router.emit('routerAjaxError', xhr);
            reject(xhr);
          }
        },
        error: function error(xhr) {
          router.emit('routerAjaxError', xhr);
          reject(xhr);
        },
      });
    });
  };
  // Remove theme elements
  Router.prototype.removeThemeElements = function removeThemeElements (el) {
    var router = this;
    var theme = router.app.theme;
    $$1$1(el).find(("." + (theme === 'md' ? 'ios' : 'md') + "-only, .if-" + (theme === 'md' ? 'ios' : 'md'))).remove();
  };
  Router.prototype.templateLoader = function templateLoader (template, templateUrl, options, resolve, reject) {
    var router = this;
    function compile(t) {
      var compiledHtml;
      var context;
      try {
        context = options.context || {};
        if (typeof context === 'function') { context = context.call(router); }
        else if (typeof context === 'string') {
          try {
            context = JSON.parse(context);
          } catch (err) {
            reject();
            throw (err);
          }
        }
        if (typeof t === 'function') {
          compiledHtml = t(context);
        } else {
          compiledHtml = Template7.compile(t)(Utils.extend({}, context || {}, {
            $app: router.app,
            $root: Utils.extend({}, router.app.data, router.app.methods),
            $route: options.route,
            $router: router,
            $theme: {
              ios: router.app.theme === 'ios',
              md: router.app.theme === 'md',
            },
          }));
        }
      } catch (err) {
        reject();
        throw (err);
      }
      resolve(compiledHtml, { context: context });
    }
    if (templateUrl) {
      // Load via XHR
      if (router.xhr) {
        router.xhr.abort();
        router.xhr = false;
      }
      router
        .xhrRequest(templateUrl)
        .then(function (templateContent) {
          compile(templateContent);
        })
        .catch(function () {
          reject();
        });
    } else {
      compile(template);
    }
  };
  Router.prototype.modalTemplateLoader = function modalTemplateLoader (template, templateUrl, options, resolve, reject) {
    var router = this;
    return router.templateLoader(template, templateUrl, options, function (html) {
      resolve(html);
    }, reject);
  };
  Router.prototype.tabTemplateLoader = function tabTemplateLoader (template, templateUrl, options, resolve, reject) {
    var router = this;
    return router.templateLoader(template, templateUrl, options, function (html) {
      resolve(html);
    }, reject);
  };
  Router.prototype.pageTemplateLoader = function pageTemplateLoader (template, templateUrl, options, resolve, reject) {
    var router = this;
    return router.templateLoader(template, templateUrl, options, function (html, newOptions) {
      if ( newOptions === void 0 ) newOptions = {};

      resolve(router.getPageEl(html), newOptions);
    }, reject);
  };
  Router.prototype.componentLoader = function componentLoader (component, componentUrl, options, resolve, reject) {
    if ( options === void 0 ) options = {};

    var router = this;
    var url = typeof component === 'string' ? component : componentUrl;
    function compile(c) {
      var extendContext = Utils.extend(
        {},
        options.context || {},
        {
          $: $$1$1,
          $$: $$1$1,
          $app: router.app,
          $root: Utils.extend({}, router.app.data, router.app.methods),
          $route: options.route,
          $router: router,
          $dom7: $$1$1,
          $theme: {
            ios: router.app.theme === 'ios',
            md: router.app.theme === 'md',
          },
        }
      );
      var createdComponent = Component.create(c, extendContext);
      resolve(createdComponent.el);
    }
    if (url) {
      // Load via XHR
      if (router.xhr) {
        router.xhr.abort();
        router.xhr = false;
      }
      router
        .xhrRequest(url)
        .then(function (loadedComponent) {
          compile(Component.parse(loadedComponent));
        })
        .catch(function (err) {
          reject();
          throw (err);
        });
    } else {
      compile(component);
    }
  };
  Router.prototype.modalComponentLoader = function modalComponentLoader (rootEl, component, componentUrl, options, resolve, reject) {
    var router = this;
    router.componentLoader(component, componentUrl, options, function (el) {
      resolve(el);
    }, reject);
  };
  Router.prototype.tabComponentLoader = function tabComponentLoader (tabEl, component, componentUrl, options, resolve, reject) {
    var router = this;
    router.componentLoader(component, componentUrl, options, function (el) {
      resolve(el);
    }, reject);
  };
  Router.prototype.pageComponentLoader = function pageComponentLoader (routerEl, component, componentUrl, options, resolve, reject) {
    var router = this;
    router.componentLoader(component, componentUrl, options, function (el, newOptions) {
      if ( newOptions === void 0 ) newOptions = {};

      resolve(el, newOptions);
    }, reject);
  };
  Router.prototype.getPageData = function getPageData (pageEl, navbarEl, from, to, route, pageFromEl) {
    if ( route === void 0 ) route = {};

    var router = this;
    var $pageEl = $$1$1(pageEl);
    var $navbarEl = $$1$1(navbarEl);
    var currentPage = $pageEl[0].f7Page || {};
    var direction;
    var pageFrom;
    if ((from === 'next' && to === 'current') || (from === 'current' && to === 'previous')) { direction = 'forward'; }
    if ((from === 'current' && to === 'next') || (from === 'previous' && to === 'current')) { direction = 'backward'; }
    if (currentPage && !currentPage.fromPage) {
      var $pageFromEl = $$1$1(pageFromEl);
      if ($pageFromEl.length) {
        pageFrom = $pageFromEl[0].f7Page;
      }
    }
    var page = {
      app: router.app,
      view: router.view,
      router: router,
      $el: $pageEl,
      el: $pageEl[0],
      $pageEl: $pageEl,
      pageEl: $pageEl[0],
      $navbarEl: $navbarEl,
      navbarEl: $navbarEl[0],
      name: $pageEl.attr('data-name'),
      position: from,
      from: from,
      to: to,
      direction: direction,
      route: currentPage.route ? currentPage.route : route,
      pageFrom: currentPage.pageFrom || pageFrom,
    };

    if ($navbarEl && $navbarEl[0]) {
      $navbarEl[0].f7Page = page;
    }
    $pageEl[0].f7Page = page;
    return page;
  };
  // Callbacks
  Router.prototype.pageCallback = function pageCallback (callback, pageEl, navbarEl, from, to, options, pageFromEl) {
    if ( options === void 0 ) options = {};

    if (!pageEl) { return; }
    var router = this;
    var $pageEl = $$1$1(pageEl);
    if (!$pageEl.length) { return; }
    var route = options.route;
    var restoreScrollTopOnBack = router.params.restoreScrollTopOnBack;

    var camelName = "page" + (callback[0].toUpperCase() + callback.slice(1, callback.length));
    var colonName = "page:" + (callback.toLowerCase());

    var page = {};
    if (callback === 'beforeRemove' && $pageEl[0].f7Page) {
      page = Utils.extend($pageEl[0].f7Page, { from: from, to: to, position: from });
    } else {
      page = router.getPageData(pageEl, navbarEl, from, to, route, pageFromEl);
    }

    var ref = options.route ? options.route.route : {};
    var on = ref.on; if ( on === void 0 ) on = {};
    var once = ref.once; if ( once === void 0 ) once = {};
    if (options.on) {
      Utils.extend(on, options.on);
    }
    if (options.once) {
      Utils.extend(once, options.once);
    }

    function attachEvents() {
      if ($pageEl[0].f7RouteEventsAttached) { return; }
      $pageEl[0].f7RouteEventsAttached = true;
      if (on && Object.keys(on).length > 0) {
        $pageEl[0].f7RouteEventsOn = on;
        Object.keys(on).forEach(function (eventName) {
          on[eventName] = on[eventName].bind(router);
          $pageEl.on(Utils.eventNameToColonCase(eventName), on[eventName]);
        });
      }
      if (once && Object.keys(once).length > 0) {
        $pageEl[0].f7RouteEventsOnce = once;
        Object.keys(once).forEach(function (eventName) {
          once[eventName] = once[eventName].bind(router);
          $pageEl.once(Utils.eventNameToColonCase(eventName), once[eventName]);
        });
      }
    }

    function detachEvents() {
      if (!$pageEl[0].f7RouteEventsAttached) { return; }
      if ($pageEl[0].f7RouteEventsOn) {
        Object.keys($pageEl[0].f7RouteEventsOn).forEach(function (eventName) {
          $pageEl.off(Utils.eventNameToColonCase(eventName), $pageEl[0].f7RouteEventsOn[eventName]);
        });
      }
      if ($pageEl[0].f7RouteEventsOnce) {
        Object.keys($pageEl[0].f7RouteEventsOnce).forEach(function (eventName) {
          $pageEl.off(Utils.eventNameToColonCase(eventName), $pageEl[0].f7RouteEventsOnce[eventName]);
        });
      }
      $pageEl[0].f7RouteEventsAttached = null;
      $pageEl[0].f7RouteEventsOn = null;
      $pageEl[0].f7RouteEventsOnce = null;
      delete $pageEl[0].f7RouteEventsAttached;
      delete $pageEl[0].f7RouteEventsOn;
      delete $pageEl[0].f7RouteEventsOnce;
    }

    if (callback === 'mounted') {
      attachEvents();
    }
    if (callback === 'init') {
      if (restoreScrollTopOnBack && (from === 'previous' || !from) && to === 'current' && router.scrollHistory[page.route.url]) {
        $pageEl.find('.page-content').scrollTop(router.scrollHistory[page.route.url]);
      }
      attachEvents();
      if ($pageEl[0].f7PageInitialized) {
        $pageEl.trigger('page:reinit', page);
        router.emit('pageReinit', page);
        return;
      }
      $pageEl[0].f7PageInitialized = true;
    }
    if (restoreScrollTopOnBack && callback === 'beforeOut' && from === 'current' && to === 'previous') {
      // Save scroll position
      router.scrollHistory[page.route.url] = $pageEl.find('.page-content').scrollTop();
    }
    if (restoreScrollTopOnBack && callback === 'beforeOut' && from === 'current' && to === 'next') {
      // Delete scroll position
      delete router.scrollHistory[page.route.url];
    }

    $pageEl.trigger(colonName, page);
    router.emit(camelName, page);

    if (callback === 'beforeRemove') {
      detachEvents();
      $pageEl[0].f7Page = null;
    }
  };
  Router.prototype.saveHistory = function saveHistory () {
    var router = this;
    router.view.history = router.history;
    if (router.params.pushState) {
      window.localStorage[("f7router-" + (router.view.id) + "-history")] = JSON.stringify(router.history);
    }
  };
  Router.prototype.restoreHistory = function restoreHistory () {
    var router = this;
    if (router.params.pushState && window.localStorage[("f7router-" + (router.view.id) + "-history")]) {
      router.history = JSON.parse(window.localStorage[("f7router-" + (router.view.id) + "-history")]);
      router.view.history = router.history;
    }
  };
  Router.prototype.clearHistory = function clearHistory () {
    var router = this;
    router.history = [];
    router.saveHistory();
  };
  Router.prototype.init = function init () {
    var router = this;
    var app = router.app;
    var view = router.view;

    // Init Swipeback
    {
      if (view && router.params.iosSwipeBack && app.theme === 'ios') {
        SwipeBack(router);
      }
    }

    // Dynamic not separated navbbar
    if (router.dynamicNavbar && !router.separateNavbar) {
      router.$el.addClass('router-dynamic-navbar-inside');
    }

    var initUrl = router.params.url;
    var documentUrl = document.location.href.split(document.location.origin)[1];
    var historyRestored;
    if (!router.params.pushState) {
      if (!initUrl) {
        initUrl = documentUrl;
      }
      if (document.location.search && initUrl.indexOf('?') < 0) {
        initUrl += document.location.search;
      }
      if (document.location.hash && initUrl.indexOf('#') < 0) {
        initUrl += document.location.hash;
      }
    } else {
      if (router.params.pushStateRoot && documentUrl.indexOf(router.params.pushStateRoot) >= 0) {
        documentUrl = documentUrl.split(router.params.pushStateRoot)[1];
        if (documentUrl === '') { documentUrl = '/'; }
      }
      if (router.params.pushStateSeparator.length > 0 && documentUrl.indexOf(router.params.pushStateSeparator) >= 0) {
        initUrl = documentUrl.split(router.params.pushStateSeparator)[1];
      } else {
        initUrl = documentUrl;
      }
      router.restoreHistory();
      if (router.history.indexOf(initUrl) >= 0) {
        router.history = router.history.slice(0, router.history.indexOf(initUrl) + 1);
      } else if (router.params.url === initUrl) {
        router.history = [initUrl];
      } else if (History.state && History.state[view.id] && History.state[view.id].url === router.history[router.history.length - 1]) {
        initUrl = router.history[router.history.length - 1];
      } else {
        router.history = [documentUrl.split(router.params.pushStateSeparator)[0] || '/', initUrl];
      }
      if (router.history.length > 1) {
        historyRestored = true;
      } else {
        router.history = [];
      }
      router.saveHistory();
    }
    var currentRoute;
    if (router.history.length > 1) {
      // Will load page
      currentRoute = router.findMatchingRoute(router.history[0]);
      if (!currentRoute) {
        currentRoute = Utils.extend(router.parseRouteUrl(router.history[0]), {
          route: {
            url: router.history[0],
            path: router.history[0].split('?')[0],
          },
        });
      }
    } else {
      // Don't load page
      currentRoute = router.findMatchingRoute(initUrl);
      if (!currentRoute) {
        currentRoute = Utils.extend(router.parseRouteUrl(initUrl), {
          route: {
            url: initUrl,
            path: initUrl.split('?')[0],
          },
        });
      }
    }

    if (router.params.stackPages) {
      router.$el.children('.page').each(function (index, pageEl) {
        var $pageEl = $$1$1(pageEl);
        router.initialPages.push($pageEl[0]);
        if (router.separateNavbar && $pageEl.children('.navbar').length > 0) {
          router.initialNavbars.push($pageEl.children('.navbar').find('.navbar-inner')[0]);
        }
      });
    }

    if (router.$el.children('.page:not(.stacked)').length === 0 && initUrl) {
      // No pages presented in DOM, reload new page
      router.navigate(initUrl, {
        reloadCurrent: true,
        pushState: false,
      });
    } else {
      // Init current DOM page
      router.currentRoute = currentRoute;
      router.$el.children('.page:not(.stacked)').each(function (index, pageEl) {
        var $pageEl = $$1$1(pageEl);
        var $navbarInnerEl;
        $pageEl.addClass('page-current');
        if (router.separateNavbar) {
          $navbarInnerEl = $pageEl.children('.navbar').children('.navbar-inner');
          if ($navbarInnerEl.length > 0) {
            if (!router.$navbarEl.parents(document).length) {
              router.$el.prepend(router.$navbarEl);
            }
            router.$navbarEl.append($navbarInnerEl);
            $pageEl.children('.navbar').remove();
          } else {
            router.$navbarEl.addClass('navbar-hidden');
          }
        }
        var initOptions = {
          route: router.currentRoute,
        };
        if (router.currentRoute && router.currentRoute.route && router.currentRoute.route.options) {
          Utils.extend(initOptions, router.currentRoute.route.options);
        }
        router.currentPageEl = $pageEl[0];
        if (router.dynamicNavbar && $navbarInnerEl.length) {
          router.currentNavbarEl = $navbarInnerEl[0];
        }
        router.removeThemeElements($pageEl);
        if (router.dynamicNavbar && $navbarInnerEl.length) {
          router.removeThemeElements($navbarInnerEl);
        }
        if (initOptions.route.route.tab) {
          router.tabLoad(initOptions.route.route.tab, Utils.extend({}, initOptions));
        }
        router.pageCallback('init', $pageEl, $navbarInnerEl, 'current', undefined, initOptions);
      });
      if (historyRestored) {
        router.navigate(initUrl, {
          pushState: false,
          history: false,
          animate: router.params.pushStateAnimateOnLoad,
          once: {
            pageAfterIn: function pageAfterIn() {
              if (router.history.length > 2) {
                router.back({ preload: true });
              }
            },
          },
        });
      } else {
        router.history.push(initUrl);
        router.saveHistory();
      }
    }
    router.emit('local::init routerInit', router);
  };
  Router.prototype.destroy = function destroy () {
    var router = this;

    router.emit('local::destroy routerDestroy', router);

    // Delete props & methods
    Object.keys(router).forEach(function (routerProp) {
      router[routerProp] = null;
      delete router[routerProp];
    });

    router = null;
  };

  return Router;
}(Framework7Class));

var Router = {
  name: 'router',
  static: {
    Router: Router$1,
  },
  instance: {
    cache: {
      xhr: [],
      templates: [],
      components: [],
    },
  },
  create: function create() {
    var instance = this;
    if (instance.app) {
      // View Router
      if (instance.params.router) {
        instance.router = new Router$1(instance.app, instance);
      }
    } else {
      // App Router
      instance.router = new Router$1(instance);
    }
  },
};

var View = (function (Framework7Class$$1) {
  function View(appInstance, el, viewParams) {
    if ( viewParams === void 0 ) viewParams = {};

    Framework7Class$$1.call(this, viewParams, [appInstance]);

    var app = appInstance;
    var $el = $$1$1(el);
    var view = this;

    var defaults = {
      routes: [],
      routesAdd: [],
    };

    // Default View params
    view.params = Utils.extend(defaults, app.params.view, viewParams);

    // Routes
    if (view.params.routes.length > 0) {
      view.routes = view.params.routes;
    } else {
      view.routes = [].concat(app.routes, view.params.routesAdd);
    }

    // Selector
    var selector;
    if (typeof el === 'string') { selector = el; }
    else {
      // Supposed to be HTMLElement or Dom7
      selector = ($el.attr('id') ? ("#" + ($el.attr('id'))) : '') + ($el.attr('class') ? ("." + ($el.attr('class').replace(/ /g, '.').replace('.active', ''))) : '');
    }

    // DynamicNavbar
    var $navbarEl;
    if (app.theme === 'ios' && view.params.iosDynamicNavbar && view.params.iosSeparateDynamicNavbar) {
      $navbarEl = $el.children('.navbar').eq(0);
      if ($navbarEl.length === 0) {
        $navbarEl = $$1$1('<div class="navbar"></div>');
      }
    }

    // View Props
    Utils.extend(false, view, {
      app: app,
      $el: $el,
      el: $el[0],
      name: view.params.name,
      main: view.params.main || $el.hasClass('view-main'),
      $navbarEl: $navbarEl,
      navbarEl: $navbarEl ? $navbarEl[0] : undefined,
      selector: selector,
      history: [],
      scrollHistory: {},
    });

    // Save in DOM
    $el[0].f7View = view;

    // Install Modules
    view.useModules();

    // Add to app
    app.views.push(view);
    if (view.main) {
      app.views.main = view;
    }
    if (view.name) {
      app.views[view.name] = view;
    }

    // Index
    view.index = app.views.indexOf(view);

    // View ID
    var viewId;
    if (view.name) {
      viewId = "view_" + (view.name);
    } else if (view.main) {
      viewId = 'view_main';
    } else {
      viewId = "view_" + (view.index);
    }
    view.id = viewId;

    // Init View
    if (app.initialized) {
      view.init();
    } else {
      app.on('init', function () {
        view.init();
      });
    }

    return view;
  }

  if ( Framework7Class$$1 ) View.__proto__ = Framework7Class$$1;
  View.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  View.prototype.constructor = View;
  View.prototype.destroy = function destroy () {
    var view = this;
    var app = view.app;

    view.$el.trigger('view:beforedestroy', view);
    view.emit('local::beforeDestroy viewBeforeDestroy', view);

    if (view.main) {
      app.views.main = null;
      delete app.views.main;
    } else if (view.name) {
      app.views[view.name] = null;
      delete app.views[view.name];
    }
    view.$el[0].f7View = null;
    delete view.$el[0].f7View;

    app.views.splice(app.views.indexOf(view), 1);

    // Destroy Router
    if (view.params.router && view.router) {
      view.router.destroy();
    }

    view.emit('local::destroy viewDestroy', view);

    // Delete props & methods
    Object.keys(view).forEach(function (viewProp) {
      view[viewProp] = null;
      delete view[viewProp];
    });

    view = null;
  };
  View.prototype.init = function init () {
    var view = this;
    if (view.params.router) {
      view.router.init();
    }
  };

  return View;
}(Framework7Class));

// Use Router
View.use(Router);

function initClicks(app) {
  function handleClicks(e) {
    var clicked = $$1$1(e.target);
    var clickedLink = clicked.closest('a');
    var isLink = clickedLink.length > 0;
    var url = isLink && clickedLink.attr('href');
    var isTabLink = isLink && clickedLink.hasClass('tab-link') && (clickedLink.attr('data-tab') || (url && url.indexOf('#') === 0));

    // Check if link is external
    if (isLink) {
      // eslint-disable-next-line
      if (clickedLink.is(app.params.clicks.externalLinks) || (url && url.indexOf('javascript:') >= 0)) {
        var target = clickedLink.attr('target');
        if (url && (target === '_system' || target === '_blank')) {
          e.preventDefault();
          if (window.cordova && window.cordova.InAppBrowser) {
            window.cordova.InAppBrowser.open(url, target);
          } else {
            window.open(url, target);
          }
        }
        return;
      }
    }

    // Modules Clicks
    Object.keys(app.modules).forEach(function (moduleName) {
      var moduleClicks = app.modules[moduleName].clicks;
      if (!moduleClicks) { return; }
      Object.keys(moduleClicks).forEach(function (clickSelector) {
        var matchingClickedElement = clicked.closest(clickSelector).eq(0);
        if (matchingClickedElement.length > 0) {
          moduleClicks[clickSelector].call(app, matchingClickedElement, matchingClickedElement.dataset());
        }
      });
    });

    // Load Page
    var clickedLinkData = {};
    if (isLink) {
      e.preventDefault();
      clickedLinkData = clickedLink.dataset();
    }
    var validUrl = url && url.length > 0 && url !== '#' && !isTabLink;
    var template = clickedLinkData.template;
    if (validUrl || clickedLink.hasClass('back') || template) {
      var view;
      if (clickedLinkData.view) {
        view = $$1$1(clickedLinkData.view)[0].f7View;
      } else {
        view = clicked.parents('.view')[0] && clicked.parents('.view')[0].f7View;
        if (view && view.params.linksView) {
          if (typeof view.params.linksView === 'string') { view = $$1$1(view.params.linksView)[0].f7View; }
          else if (view.params.linksView instanceof View) { view = view.params.linksView; }
        }
      }
      if (!view) {
        if (app.views.main) { view = app.views.main; }
      }
      if (!view || !view.router) { return; }
      if (clickedLink.hasClass('back')) { view.router.back(url, clickedLinkData); }
      else { view.router.navigate(url, clickedLinkData); }
    }
  }

  app.on('click', handleClicks);

  // Prevent scrolling on overlays
  function preventScrolling(e) {
    e.preventDefault();
  }
  if (Support$1.touch && !Device.android) {
    var activeListener = Support$1.passiveListener ? { passive: false, capture: false } : false;
    $$1$1(document).on((app.params.fastClicks ? 'touchstart' : 'touchmove'), '.panel-backdrop, .dialog-backdrop, .preloader-backdrop, .popup-backdrop, .searchbar-backdrop', preventScrolling, activeListener);
  }
}
var Clicks = {
  name: 'clicks',
  params: {
    clicks: {
      // External Links
      externalLinks: '.external',
    },
  },
  on: {
    init: function init() {
      var app = this;
      initClicks(app);
    },
  },
};

var History$2 = {
  name: 'history',
  static: {
    history: History,
  },
  on: {
    init: function init() {
      History.init(this);
    },
  },
};

var keyPrefix = 'f7storage-';
var Storage = {
  get: function get(key) {
    return Utils.promise(function (resolve, reject) {
      try {
        var value = JSON.parse(window.localStorage.getItem(("" + keyPrefix + key)));
        resolve(value);
      } catch (e) {
        reject(e);
      }
    });
  },
  set: function set(key, value) {
    return Utils.promise(function (resolve, reject) {
      try {
        window.localStorage.setItem(("" + keyPrefix + key), JSON.stringify(value));
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
  remove: function remove(key) {
    return Utils.promise(function (resolve, reject) {
      try {
        window.localStorage.removeItem(("" + keyPrefix + key));
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
  clear: function clear() {

  },
  length: function length() {

  },
  keys: function keys() {
    return Utils.promise(function (resolve, reject) {
      try {
        var keys = Object.keys(window.localStorage)
          .filter(function (keyName) { return keyName.indexOf(keyPrefix) === 0; })
          .map(function (keyName) { return keyName.replace(keyPrefix, ''); });
        resolve(keys);
      } catch (e) {
        reject(e);
      }
    });
  },
  forEach: function forEach(callback) {
    return Utils.promise(function (resolve, reject) {
      try {
        Object.keys(window.localStorage)
          .filter(function (keyName) { return keyName.indexOf(keyPrefix) === 0; })
          .forEach(function (keyName, index) {
            var key = keyName.replace(keyPrefix, '');
            Storage.get(key).then(function (value) {
              callback(key, value, index);
            });
          });
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  },
};

var Storage$1 = {
  name: 'storage',
  static: {
    Storage: Storage,
    storage: Storage,
  },
};

var Statusbar = {
  hide: function hide() {
    $$1$1('html').removeClass('with-statusbar');
    if (Device.cordova && window.StatusBar) {
      window.StatusBar.hide();
    }
  },
  show: function show() {
    if (Device.cordova && window.StatusBar) {
      window.StatusBar.show();
      Utils.nextTick(function () {
        if (Device.needsStatusbarOverlay()) {
          $$1$1('html').addClass('with-statusbar');
        }
      });
      return;
    }
    $$1$1('html').addClass('with-statusbar');
  },
  onClick: function onClick() {
    var app = this;
    var pageContent;
    if ($$1$1('.popup.modal-in').length > 0) {
      // Check for opened popup
      pageContent = $$1$1('.popup.modal-in').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else if ($$1$1('.panel.panel-active').length > 0) {
      // Check for opened panel
      pageContent = $$1$1('.panel.panel-active').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else if ($$1$1('.views > .view.tab-active').length > 0) {
      // View in tab bar app layout
      pageContent = $$1$1('.views > .view.tab-active').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else if ($$1$1('.views').length > 0) {
      pageContent = $$1$1('.views').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else {
      pageContent = app.root.children('.view').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    }

    if (pageContent && pageContent.length > 0) {
      // Check for tab
      if (pageContent.hasClass('tab')) {
        pageContent = pageContent.parent('.tabs').children('.page-content.tab-active');
      }
      if (pageContent.length > 0) { pageContent.scrollTop(0, 300); }
    }
  },
  setIosTextColor: function setIosTextColor(color) {
    if (Device.cordova && window.StatusBar) {
      if (color === 'white') {
        window.StatusBar.styleLightContent();
      } else {
        window.StatusBar.styleDefault();
      }
    }
  },
  setBackgroundColor: function setBackgroundColor(color) {
    $$1$1('.statusbar').css('background-color', color);
    if (Device.cordova && window.StatusBar) {
      window.StatusBar.backgroundColorByHexString(color);
    }
  },
  isVisible: function isVisible() {
    if (Device.cordova && window.StatusBar) {
      return window.StatusBar.isVisible;
    }
    return false;
  },
  iosOverlaysWebView: function iosOverlaysWebView(overlays) {
    if ( overlays === void 0 ) overlays = true;

    if (!Device.ios) { return; }
    if (Device.cordova && window.StatusBar) {
      window.StatusBar.overlaysWebView(overlays);
      if (overlays) {
        $$1$1('html').addClass('with-statusbar');
      } else {
        $$1$1('html').removeClass('with-statusbar');
      }
    }
  },
  checkOverlay: function checkOverlay() {
    if (Device.needsStatusbarOverlay()) {
      $$1$1('html').addClass('with-statusbar');
    } else {
      $$1$1('html').removeClass('with-statusbar');
    }
  },
  init: function init() {
    var app = this;
    var params = app.params.statusbar;

    if (params.overlay === 'auto') {
      if (Device.needsStatusbarOverlay()) {
        $$1$1('html').addClass('with-statusbar');
      }

      if (Device.ios && (Device.cordova || Device.webView)) {
        if (window.orientation === 0) {
          app.once('resize', function () {
            Statusbar.checkOverlay();
          });
        }

        $$1$1(document).on('resume', function () {
          Statusbar.checkOverlay();
        }, false);

        app.on('orientationchange resize', function () {
          Statusbar.checkOverlay();
        });
      }
    } else if (params.overlay === true) {
      $$1$1('html').addClass('with-statusbar');
    } else if (params.overlay === false) {
      $$1$1('html').removeClass('with-statusbar');
    }

    if (Device.cordova && window.StatusBar) {
      if (params.scrollTopOnClick) {
        $$1$1(window).on('statusTap', Statusbar.onClick.bind(app));
      }
      if (params.iosOverlaysWebView) {
        window.StatusBar.overlaysWebView(true);
      } else {
        window.StatusBar.overlaysWebView(false);
      }

      if (params.iosTextColor === 'white') {
        window.StatusBar.styleLightContent();
      } else {
        window.StatusBar.styleDefault();
      }
    }
    if (params.iosBackgroundColor && app.theme === 'ios') {
      Statusbar.setBackgroundColor(params.iosBackgroundColor);
    }
    if (params.materialBackgroundColor && app.theme === 'md') {
      Statusbar.setBackgroundColor(params.materialBackgroundColor);
    }
  },
};

var Statusbar$1 = {
  name: 'statusbar',
  params: {
    statusbar: {
      overlay: 'auto',
      scrollTopOnClick: true,
      iosOverlaysWebView: true,
      iosTextColor: 'black',
      iosBackgroundColor: null,
      materialBackgroundColor: null,
    },
  },
  create: function create() {
    var app = this;
    Utils.extend(app, {
      statusbar: {
        checkOverlay: Statusbar.checkOverlay,
        hide: Statusbar.hide,
        show: Statusbar.show,
        iosOverlaysWebView: Statusbar.iosOverlaysWebView,
        setIosTextColor: Statusbar.setIosTextColor,
        setBackgroundColor: Statusbar.setBackgroundColor,
        isVisible: Statusbar.isVisible,
        init: Statusbar.init.bind(app),
      },
    });
  },
  on: {
    init: function init() {
      var app = this;
      Statusbar.init.call(app);
    },
  },
  clicks: {
    '.statusbar': function onStatusbarClick() {
      var app = this;
      if (!app.params.statusbar.scrollTopOnClick) { return; }
      Statusbar.onClick.call(app);
    },
  },
};

function getCurrentView(app) {
  var popoverView = $$1$1('.popover.modal-in .view');
  var popupView = $$1$1('.popup.modal-in .view');
  var panelView = $$1$1('.panel.panel-active .view');
  var appViews = $$1$1('.views');
  if (appViews.length === 0) { appViews = app.root; }
  // Find active view as tab
  var appView = appViews.children('.view');
  // Propably in tabs or split view
  if (appView.length > 1) {
    if (appView.hasClass('tab')) {
      // Tabs
      appView = appViews.children('.view.tab-active');
    } else {
      // Split View, leave appView intact
    }
  }
  if (popoverView.length > 0 && popoverView[0].f7View) { return popoverView[0].f7View; }
  if (popupView.length > 0 && popupView[0].f7View) { return popupView[0].f7View; }
  if (panelView.length > 0 && panelView[0].f7View) { return panelView[0].f7View; }
  if (appView.length > 0) {
    if (appView.length === 1 && appView[0].f7View) { return appView[0].f7View; }
    if (appView.length > 1) {
      return app.views.main;
    }
  }
  return undefined;
}

var View$2 = {
  name: 'view',
  params: {
    view: {
      name: undefined,
      main: false,
      router: true,
      linksView: null,
      stackPages: false,
      xhrCache: true,
      xhrCacheIgnore: [],
      xhrCacheIgnoreGetParameters: false,
      xhrCacheDuration: 1000 * 60 * 10, // Ten minutes
      preloadPreviousPage: true,
      uniqueHistory: false,
      uniqueHistoryIgnoreGetParameters: false,
      allowDuplicateUrls: false,
      reloadPages: false,
      removeElements: true,
      removeElementsWithTimeout: false,
      removeElementsTimeout: 0,
      restoreScrollTopOnBack: true,
      unloadTabContent: true,
      // Swipe Back
      iosSwipeBack: true,
      iosSwipeBackAnimateShadow: true,
      iosSwipeBackAnimateOpacity: true,
      iosSwipeBackActiveArea: 30,
      iosSwipeBackThreshold: 0,
      // Push State
      pushState: false,
      pushStateRoot: undefined,
      pushStateAnimate: true,
      pushStateAnimateOnLoad: false,
      pushStateSeparator: '#!',
      pushStateOnLoad: true,
      // Animate Pages
      animate: true,
      animateWithJS: false,
      // iOS Dynamic Navbar
      iosDynamicNavbar: true,
      iosSeparateDynamicNavbar: true,
      // Animate iOS Navbar Back Icon
      iosAnimateNavbarBackIcon: true,
      // Delays
      iosPageLoadDelay: 0,
      materialPageLoadDelay: 0,
    },
  },
  static: {
    View: View,
  },
  create: function create() {
    var app = this;
    Utils.extend(app, {
      views: Utils.extend([], {
        create: function create(el, params) {
          return new View(app, el, params);
        },
        get: function get(viewEl) {
          var $viewEl = $$1$1(viewEl);
          if ($viewEl.length && $viewEl[0].f7View) { return $viewEl[0].f7View; }
          return undefined;
        },
      }),
    });
    Object.defineProperty(app.views, 'current', {
      enumerable: true,
      configurable: true,
      get: function get() {
        return getCurrentView(app);
      },
    });
    // Alias
    app.view = app.views;
  },
  on: {
    init: function init() {
      var app = this;
      $$1$1('.view-init').each(function (index, viewEl) {
        if (viewEl.f7View) { return; }
        var viewParams = $$1$1(viewEl).dataset();
        app.views.create(viewEl, viewParams);
      });
    },
    modalOpen: function modalOpen(modal) {
      var app = this;
      modal.$el.find('.view-init').each(function (index, viewEl) {
        if (viewEl.f7View) { return; }
        var viewParams = $$1$1(viewEl).dataset();
        app.views.create(viewEl, viewParams);
      });
    },
    modalBeforeDestroy: function modalBeforeDestroy(modal) {
      if (!modal || !modal.$el) { return; }
      modal.$el.find('.view-init').each(function (index, viewEl) {
        var view = viewEl.f7View;
        if (!view) { return; }
        view.destroy();
      });
    },
  },
};

var Navbar = {
  size: function size(el) {
    var app = this;
    if (app.theme !== 'ios') { return; }
    var $el = $$1$1(el);
    if ($el.hasClass('navbar')) {
      $el = $el.children('.navbar-inner').each(function (index, navbarEl) {
        app.navbar.size(navbarEl);
      });
      return;
    }
    if (
      $el.hasClass('stacked') ||
      $el.parents('.stacked').length > 0 ||
      $el.parents('.tab:not(.tab-active)').length > 0 ||
      $el.parents('.popup:not(.modal-in)').length > 0
    ) {
      return;
    }
    var $viewEl = $el.parents('.view').eq(0);
    var left = app.rtl ? $el.children('.right') : $el.children('.left');
    var right = app.rtl ? $el.children('.left') : $el.children('.right');
    var title = $el.children('.title');
    var subnavbar = $el.children('.subnavbar');
    var noLeft = left.length === 0;
    var noRight = right.length === 0;
    var leftWidth = noLeft ? 0 : left.outerWidth(true);
    var rightWidth = noRight ? 0 : right.outerWidth(true);
    var titleWidth = title.outerWidth(true);
    var navbarStyles = $el.styles();
    var navbarWidth = $el[0].offsetWidth;
    var navbarInnerWidth = navbarWidth - parseInt(navbarStyles.paddingLeft, 10) - parseInt(navbarStyles.paddingRight, 10);
    var isPrevious = $el.hasClass('navbar-previous');
    var sliding = $el.hasClass('sliding');

    var router;
    var dynamicNavbar;
    var separateNavbar;
    var separateNavbarRightOffset = 0;
    var separateNavbarLeftOffset = 0;

    if ($viewEl.length > 0 && $viewEl[0].f7View) {
      router = $viewEl[0].f7View.router;
      dynamicNavbar = router && router.dynamicNavbar;
      separateNavbar = router && router.separateNavbar;
      if (!separateNavbar) {
        separateNavbarRightOffset = navbarWidth;
        separateNavbarLeftOffset = navbarWidth / 5;
      }
    }

    var currLeft;
    var diff;
    if (noRight) {
      currLeft = navbarInnerWidth - titleWidth;
    }
    if (noLeft) {
      currLeft = 0;
    }
    if (!noLeft && !noRight) {
      currLeft = ((navbarInnerWidth - rightWidth - titleWidth) + leftWidth) / 2;
    }
    var requiredLeft = (navbarInnerWidth - titleWidth) / 2;
    if (navbarInnerWidth - leftWidth - rightWidth > titleWidth) {
      if (requiredLeft < leftWidth) {
        requiredLeft = leftWidth;
      }
      if (requiredLeft + titleWidth > navbarInnerWidth - rightWidth) {
        requiredLeft = navbarInnerWidth - rightWidth - titleWidth;
      }
      diff = requiredLeft - currLeft;
    } else {
      diff = 0;
    }

    // RTL inverter
    var inverter = app.rtl ? -1 : 1;

    if (dynamicNavbar) {
      if (title.hasClass('sliding') || (title.length > 0 && sliding)) {
        var titleLeftOffset = (-(currLeft + diff) * inverter) + separateNavbarLeftOffset;
        var titleRightOffset = ((navbarInnerWidth - currLeft - diff - titleWidth) * inverter) - separateNavbarRightOffset;

        if (isPrevious) {
          if (router && router.params.iosAnimateNavbarBackIcon) {
            var activeNavbarBackLink = $el.parent().find('.navbar-current').children('.left.sliding').find('.back .icon ~ span');
            if (activeNavbarBackLink.length > 0) {
              titleLeftOffset += activeNavbarBackLink[0].offsetLeft;
            }
          }
        }
        title[0].f7NavbarLeftOffset = titleLeftOffset;
        title[0].f7NavbarRightOffset = titleRightOffset;
      }
      if (!noLeft && (left.hasClass('sliding') || sliding)) {
        if (app.rtl) {
          left[0].f7NavbarLeftOffset = (-(navbarInnerWidth - left[0].offsetWidth) / 2) * inverter;
          left[0].f7NavbarRightOffset = leftWidth * inverter;
        } else {
          left[0].f7NavbarLeftOffset = -leftWidth + separateNavbarLeftOffset;
          left[0].f7NavbarRightOffset = ((navbarInnerWidth - left[0].offsetWidth) / 2) - separateNavbarRightOffset;
          if (router && router.params.iosAnimateNavbarBackIcon && left.find('.back .icon').length > 0) {
            left[0].f7NavbarRightOffset -= left.find('.back .icon')[0].offsetWidth;
          }
        }
      }
      if (!noRight && (right.hasClass('sliding') || sliding)) {
        if (app.rtl) {
          right[0].f7NavbarLeftOffset = -rightWidth * inverter;
          right[0].f7NavbarRightOffset = ((navbarInnerWidth - right[0].offsetWidth) / 2) * inverter;
        } else {
          right[0].f7NavbarLeftOffset = (-(navbarInnerWidth - right[0].offsetWidth) / 2) + separateNavbarLeftOffset;
          right[0].f7NavbarRightOffset = rightWidth - separateNavbarRightOffset;
        }
      }
      if (subnavbar.length && (subnavbar.hasClass('sliding') || sliding)) {
        subnavbar[0].f7NavbarLeftOffset = app.rtl ? subnavbar[0].offsetWidth : (-subnavbar[0].offsetWidth + separateNavbarLeftOffset);
        subnavbar[0].f7NavbarRightOffset = (-subnavbar[0].f7NavbarLeftOffset - separateNavbarRightOffset) + separateNavbarLeftOffset;
      }
    }

    // Title left
    if (app.params.navbar.iosCenterTitle) {
      var titleLeft = diff;
      if (app.rtl && noLeft && noRight && title.length > 0) { titleLeft = -titleLeft; }
      title.css({ left: (titleLeft + "px") });
    }
  },
  hide: function hide(el, animate) {
    if ( animate === void 0 ) animate = true;

    var $el = $$1$1(el);
    if ($el.hasClass('navbar-inner')) { $el = $el.parents('.navbar'); }
    if (!$el.length) { return; }
    if ($el.hasClass('navbar-hidden')) { return; }
    var className = "navbar-hidden" + (animate ? ' navbar-transitioning' : '');
    $el.transitionEnd(function () {
      $el.removeClass('navbar-transitioning');
    });
    $el.addClass(className);
  },
  show: function show(el, animate) {
    if ( el === void 0 ) el = '.navbar-hidden';
    if ( animate === void 0 ) animate = true;

    var $el = $$1$1(el);
    if ($el.hasClass('navbar-inner')) { $el = $el.parents('.navbar'); }
    if (!$el.length) { return; }
    if (!$el.hasClass('navbar-hidden')) { return; }
    if (animate) {
      $el.addClass('navbar-transitioning');
      $el.transitionEnd(function () {
        $el.removeClass('navbar-transitioning');
      });
    }
    $el.removeClass('navbar-hidden');
  },
  getElByPage: function getElByPage(page) {
    var $pageEl;
    var $navbarEl;
    var pageData;
    if (page.$navbarEl || page.$el) {
      pageData = page;
      $pageEl = page.$el;
    } else {
      $pageEl = $$1$1(page);
      if ($pageEl.length > 0) { pageData = $pageEl[0].f7Page; }
    }
    if (pageData && pageData.$navbarEl && pageData.$navbarEl.length > 0) {
      $navbarEl = pageData.$navbarEl;
    } else if ($pageEl) {
      $navbarEl = $pageEl.children('.navbar').children('.navbar-inner');
    }
    if (!$navbarEl || ($navbarEl && $navbarEl.length === 0)) { return undefined; }
    return $navbarEl[0];
  },
  getPageByEl: function getPageByEl(navbarInnerEl) {
    var $navbarInnerEl = $$1$1(navbarInnerEl);
    if ($navbarInnerEl.hasClass('navbar')) {
      $navbarInnerEl = $navbarInnerEl.find('.navbar-inner');
      if ($navbarInnerEl.length > 1) { return undefined; }
    }
    return $navbarInnerEl[0].f7Page;
  },
  initHideNavbarOnScroll: function initHideNavbarOnScroll(pageEl, navbarInnerEl) {
    var app = this;
    var $pageEl = $$1$1(pageEl);
    var $navbarEl = $$1$1(navbarInnerEl || app.navbar.getElByPage(pageEl)).closest('.navbar');

    var previousScrollTop;
    var currentScrollTop;

    var scrollHeight;
    var offsetHeight;
    var reachEnd;
    var action;
    var navbarHidden;
    function handleScroll() {
      var scrollContent = this;
      if ($pageEl.hasClass('page-previous')) { return; }
      currentScrollTop = scrollContent.scrollTop;
      scrollHeight = scrollContent.scrollHeight;
      offsetHeight = scrollContent.offsetHeight;
      reachEnd = currentScrollTop + offsetHeight >= scrollHeight;
      navbarHidden = $navbarEl.hasClass('navbar-hidden');

      if (reachEnd) {
        if (app.params.navbar.showOnPageScrollEnd) {
          action = 'show';
        }
      } else if (previousScrollTop > currentScrollTop) {
        if (app.params.navbar.showOnPageScrollTop || currentScrollTop <= 44) {
          action = 'show';
        } else {
          action = 'hide';
        }
      } else if (currentScrollTop > 44) {
        action = 'hide';
      } else {
        action = 'show';
      }

      if (action === 'show' && navbarHidden) {
        app.navbar.show($navbarEl);
        navbarHidden = false;
      } else if (action === 'hide' && !navbarHidden) {
        app.navbar.hide($navbarEl);
        navbarHidden = true;
      }

      previousScrollTop = currentScrollTop;
    }
    $pageEl.on('scroll', '.page-content', handleScroll, true);
    $pageEl[0].f7ScrollNavbarHandler = handleScroll;
  },
};
var Navbar$1 = {
  name: 'navbar',
  create: function create() {
    var app = this;
    Utils.extend(app, {
      navbar: {
        size: Navbar.size.bind(app),
        hide: Navbar.hide.bind(app),
        show: Navbar.show.bind(app),
        getElByPage: Navbar.getElByPage.bind(app),
        initHideNavbarOnScroll: Navbar.initHideNavbarOnScroll.bind(app),
      },
    });
  },
  params: {
    navbar: {
      scrollTopOnTitleClick: true,
      iosCenterTitle: true,
      hideOnPageScroll: false,
      showOnPageScrollEnd: true,
      showOnPageScrollTop: true,
    },
  },
  on: {
    'panelBreakpoint resize': function onResize() {
      var app = this;
      if (app.theme !== 'ios') { return; }
      $$1$1('.navbar').each(function (index, navbarEl) {
        app.navbar.size(navbarEl);
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      if (page.$el[0].f7ScrollNavbarHandler) {
        page.$el.off('scroll', '.page-content', page.$el[0].f7ScrollNavbarHandler, true);
      }
    },
    pageBeforeIn: function pageBeforeIn(page) {
      var app = this;
      if (app.theme !== 'ios') { return; }
      var $navbarEl;
      var view = page.$el.parents('.view')[0].f7View;
      var navbarInnerEl = app.navbar.getElByPage(page);
      if (!navbarInnerEl) {
        $navbarEl = page.$el.parents('.view').children('.navbar');
      } else {
        $navbarEl = $$1$1(navbarInnerEl).parents('.navbar');
      }
      if (page.$el.hasClass('no-navbar') || (view.router.dynamicNavbar && !navbarInnerEl)) {
        var animate = !!(page.pageFrom && page.router.history.length > 0);
        app.navbar.hide($navbarEl, animate);
      } else {
        app.navbar.show($navbarEl);
      }
    },
    pageReinit: function pageReinit(page) {
      var app = this;
      if (app.theme !== 'ios') { return; }
      var $navbarEl = $$1$1(app.navbar.getElByPage(page));
      if (!$navbarEl || $navbarEl.length === 0) { return; }
      app.navbar.size($navbarEl);
    },
    pageInit: function pageInit(page) {
      var app = this;
      var $navbarEl = $$1$1(app.navbar.getElByPage(page));
      if (!$navbarEl || $navbarEl.length === 0) { return; }
      if (app.theme === 'ios') {
        app.navbar.size($navbarEl);
      }
      if (app.params.navbar.hideOnPageScroll || page.$el.find('.hide-navbar-on-scroll').length || page.$el.hasClass('hide-navbar-on-scroll') || page.$el.find('.hide-bars-on-scroll').length) {
        if (page.$el.find('.keep-navbar-on-scroll').length || page.$el.find('.keep-bars-on-scroll').length) { return; }
        app.navbar.initHideNavbarOnScroll(page.el, $navbarEl[0]);
      }
    },
    modalOpen: function modalOpen(modal) {
      var app = this;
      if (app.theme !== 'ios') { return; }
      modal.$el.find('.navbar:not(.navbar-previous):not(.stacked)').each(function (index, navbarEl) {
        app.navbar.size(navbarEl);
      });
    },
    panelOpen: function panelOpen(panel) {
      var app = this;
      if (app.theme !== 'ios') { return; }
      panel.$el.find('.navbar:not(.navbar-previous):not(.stacked)').each(function (index, navbarEl) {
        app.navbar.size(navbarEl);
      });
    },
    panelSwipeOpen: function panelSwipeOpen(panel) {
      var app = this;
      if (app.theme !== 'ios') { return; }
      panel.$el.find('.navbar:not(.navbar-previous):not(.stacked)').each(function (index, navbarEl) {
        app.navbar.size(navbarEl);
      });
    },
    tabShow: function tabShow(tabEl) {
      var app = this;
      $$1$1(tabEl).find('.navbar:not(.navbar-previous):not(.stacked)').each(function (index, navbarEl) {
        app.navbar.size(navbarEl);
      });
    },
  },
  clicks: {
    '.navbar .title': function onTitleClick($clickedEl) {
      var app = this;
      if (!app.params.navbar.scrollTopOnTitleClick) { return; }
      if ($clickedEl.closest('a').length > 0) {
        return;
      }
      var pageContent;
      // Find active page
      var navbar = $clickedEl.parents('.navbar');

      // Static Layout
      pageContent = navbar.parents('.page-content');

      if (pageContent.length === 0) {
        // Fixed Layout
        if (navbar.parents('.page').length > 0) {
          pageContent = navbar.parents('.page').find('.page-content');
        }
        // Through Layout
        if (pageContent.length === 0) {
          if (navbar.nextAll('.page-current:not(.stacked)').length > 0) {
            pageContent = navbar.nextAll('.page-current:not(.stacked)').find('.page-content');
          }
        }
      }
      if (pageContent && pageContent.length > 0) {
        // Check for tab
        if (pageContent.hasClass('tab')) {
          pageContent = pageContent.parent('.tabs').children('.page-content.tab-active');
        }
        if (pageContent.length > 0) { pageContent.scrollTop(0, 300); }
      }
    },
  },
};

var Toolbar = {
  setHighlight: function setHighlight(tabbarEl) {
    var app = this;
    if (app.theme !== 'md') { return; }

    var $tabbarEl = $$1$1(tabbarEl);

    if ($tabbarEl.length === 0 || !($tabbarEl.hasClass('tabbar') || $tabbarEl.hasClass('tabbar-labels'))) { return; }

    if ($tabbarEl.find('.tab-link-highlight').length === 0) {
      $tabbarEl.children('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
    }

    var $highlightEl = $tabbarEl.find('.tab-link-highlight');
    var $activeLink = $tabbarEl.find('.tab-link-active');
    var highlightWidth;
    var highlightTranslate;

    if ($tabbarEl.hasClass('tabbar-scrollable')) {
      highlightWidth = ($activeLink[0].offsetWidth) + "px";
      highlightTranslate = ($activeLink[0].offsetLeft) + "px";
    } else {
      var activeIndex = $activeLink.index();
      var tabLinksCount = $tabbarEl.find('.tab-link').length;
      highlightWidth = (100 / tabLinksCount) + "%";
      highlightTranslate = ((app.rtl ? -activeIndex : activeIndex) * 100) + "%";
    }

    $highlightEl
      .css('width', highlightWidth)
      .transform(("translate3d(" + highlightTranslate + ",0,0)"));
  },
  init: function init(tabbarEl) {
    var app = this;
    app.toolbar.setHighlight(tabbarEl);
  },
  hide: function hide(el, animate) {
    if ( animate === void 0 ) animate = true;

    var $el = $$1$1(el);
    if ($el.hasClass('toolbar-hidden')) { return; }
    var className = "toolbar-hidden" + (animate ? ' toolbar-transitioning' : '');
    $el.transitionEnd(function () {
      $el.removeClass('toolbar-transitioning');
    });
    $el.addClass(className);
  },
  show: function show(el, animate) {
    if ( animate === void 0 ) animate = true;

    var $el = $$1$1(el);
    if (!$el.hasClass('toolbar-hidden')) { return; }
    if (animate) {
      $el.addClass('toolbar-transitioning');
      $el.transitionEnd(function () {
        $el.removeClass('toolbar-transitioning');
      });
    }
    $el.removeClass('toolbar-hidden');
  },
  initHideToolbarOnScroll: function initHideToolbarOnScroll(pageEl) {
    var app = this;
    var $pageEl = $$1$1(pageEl);
    var $toolbarEl = $pageEl.parents('.view').children('.toolbar');
    if ($toolbarEl.length === 0) {
      $toolbarEl = $pageEl.find('.toolbar');
    }
    if ($toolbarEl.length === 0) {
      return;
    }

    var previousScrollTop;
    var currentScrollTop;

    var scrollHeight;
    var offsetHeight;
    var reachEnd;
    var action;
    var toolbarHidden;
    function handleScroll() {
      var scrollContent = this;
      if ($pageEl.hasClass('page-previous')) { return; }
      currentScrollTop = scrollContent.scrollTop;
      scrollHeight = scrollContent.scrollHeight;
      offsetHeight = scrollContent.offsetHeight;
      reachEnd = currentScrollTop + offsetHeight >= scrollHeight;
      toolbarHidden = $toolbarEl.hasClass('toolbar-hidden');

      if (reachEnd) {
        if (app.params.toolbar.showOnPageScrollEnd) {
          action = 'show';
        }
      } else if (previousScrollTop > currentScrollTop) {
        if (app.params.toolbar.showOnPageScrollTop || currentScrollTop <= 44) {
          action = 'show';
        } else {
          action = 'hide';
        }
      } else if (currentScrollTop > 44) {
        action = 'hide';
      } else {
        action = 'show';
      }

      if (action === 'show' && toolbarHidden) {
        app.toolbar.show($toolbarEl);
        toolbarHidden = false;
      } else if (action === 'hide' && !toolbarHidden) {
        app.toolbar.hide($toolbarEl);
        toolbarHidden = true;
      }

      previousScrollTop = currentScrollTop;
    }
    $pageEl.on('scroll', '.page-content', handleScroll, true);
    $pageEl[0].f7ScrollToolbarHandler = handleScroll;
  },
};
var Toolbar$1 = {
  name: 'toolbar',
  create: function create() {
    var app = this;
    Utils.extend(app, {
      toolbar: {
        hide: Toolbar.hide.bind(app),
        show: Toolbar.show.bind(app),
        setHighlight: Toolbar.setHighlight.bind(app),
        initHideToolbarOnScroll: Toolbar.initHideToolbarOnScroll.bind(app),
        init: Toolbar.init.bind(app),
      },
    });
  },
  params: {
    toolbar: {
      hideOnPageScroll: false,
      showOnPageScrollEnd: true,
      showOnPageScrollTop: true,
    },
  },
  on: {
    pageBeforeRemove: function pageBeforeRemove(page) {
      if (page.$el[0].f7ScrollToolbarHandler) {
        page.$el.off('scroll', '.page-content', page.$el[0].f7ScrollToolbarHandler, true);
      }
    },
    pageBeforeIn: function pageBeforeIn(page) {
      var app = this;
      if (app.theme !== 'ios') { return; }
      var $toolbarEl = page.$el.parents('.view').children('.toolbar');
      if ($toolbarEl.length === 0) {
        $toolbarEl = page.$el.find('.toolbar');
      }
      if ($toolbarEl.length === 0) {
        return;
      }
      if (page.$el.hasClass('no-toolbar')) {
        app.toolbar.hide($toolbarEl);
      } else {
        app.toolbar.show($toolbarEl);
      }
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.tabbar, .tabbar-labels').each(function (index, tabbarEl) {
        app.toolbar.init(tabbarEl);
      });
      if (app.params.toolbar.hideOnPageScroll || page.$el.find('.hide-toolbar-on-scroll').length || page.$el.hasClass('hide-toolbar-on-scroll') || page.$el.find('.hide-bars-on-scroll').length) {
        if (page.$el.find('.keep-toolbar-on-scroll').length || page.$el.find('.keep-bars-on-scroll').length) { return; }
        app.toolbar.initHideToolbarOnScroll(page.el);
      }
    },
    init: function init() {
      var app = this;
      app.root.find('.tabbar, .tabbar-labels').each(function (index, tabbarEl) {
        app.toolbar.init(tabbarEl);
      });
    },
  },
};

var Subnavbar = {
  name: 'subnavbar',
  on: {
    pageInit: function pageInit(page) {
      if (page.$navbarEl && page.$navbarEl.length && page.$navbarEl.find('.subnavbar').length) {
        page.$el.addClass('page-with-subnavbar');
      }
      if (page.$el.find('.subnavbar').length) {
        page.$el.addClass('page-with-subnavbar');
      }
    },
  },
};

var TouchRipple$1 = function TouchRipple($el, x, y) {
  var ripple = this;
  if (!$el) { return undefined; }
  var box = $el[0].getBoundingClientRect();
  var center = {
    x: x - box.left,
    y: y - box.top,
  };
  var width = box.width;
  var height = box.height;
  var diameter = Math.max((Math.pow( ((Math.pow( height, 2 )) + (Math.pow( width, 2 ))), 0.5 )), 48);

  ripple.$rippleWaveEl = $$1$1(("<div class=\"ripple-wave\" style=\"width: " + diameter + "px; height: " + diameter + "px; margin-top:-" + (diameter / 2) + "px; margin-left:-" + (diameter / 2) + "px; left:" + (center.x) + "px; top:" + (center.y) + "px;\"></div>"));

  $el.prepend(ripple.$rippleWaveEl);

  /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */
  ripple._clientLeft = ripple.$rippleWaveEl[0].clientLeft;

  ripple.rippleTransform = "translate3d(" + (-center.x + (width / 2)) + "px, " + (-center.y + (height / 2)) + "px, 0) scale(1)";

  ripple.$rippleWaveEl.transform(ripple.rippleTransform);

  return ripple;
};
TouchRipple$1.prototype.onRemove = function onRemove () {
  var ripple = this;
  ripple.$rippleWaveEl.remove();
  Object.keys(ripple).forEach(function (key) {
    ripple[key] = null;
    delete ripple[key];
  });
  ripple = null;
};
TouchRipple$1.prototype.remove = function remove () {
  var ripple = this;
  if (ripple.removing) { return; }
  var $rippleWaveEl = this.$rippleWaveEl;
  var rippleTransform = this.rippleTransform;
  var removeTimeout = Utils.nextTick(function () {
    ripple.onRemove();
  }, 400);
  ripple.removing = true;
  $rippleWaveEl
    .addClass('ripple-wave-fill')
    .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'))
    .transitionEnd(function () {
      clearTimeout(removeTimeout);
      Utils.nextFrame(function () {
        $rippleWaveEl
          .addClass('ripple-wave-out')
          .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'));

        removeTimeout = Utils.nextTick(function () {
          ripple.onRemove();
        }, 700);

        $rippleWaveEl.transitionEnd(function () {
          clearTimeout(removeTimeout);
          ripple.onRemove();
        });
      });
    });
};

var TouchRipple = {
  name: 'touch-ripple',
  static: {
    TouchRipple: TouchRipple$1,
  },
  create: function create() {
    var app = this;
    app.touchRipple = {
      create: function create() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( TouchRipple$1, [ null ].concat( args) ));
      },
    };
  },
};

var openedModals = [];
var dialogsQueue = [];
function clearDialogsQueue() {
  if (dialogsQueue.length === 0) { return; }
  var dialog = dialogsQueue.shift();
  dialog.open();
}
var Modal$1 = (function (Framework7Class$$1) {
  function Modal(app, params) {
    Framework7Class$$1.call(this, params, [app]);

    var modal = this;

    var defaults = {};

    // Extend defaults with modules params
    modal.useModulesParams(defaults);

    modal.params = Utils.extend(defaults, params);

    // Install Modules
    modal.useModules();

    return this;
  }

  if ( Framework7Class$$1 ) Modal.__proto__ = Framework7Class$$1;
  Modal.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Modal.prototype.constructor = Modal;
  Modal.prototype.onOpen = function onOpen () {
    var modal = this;
    openedModals.push(modal);
    $$1$1('html').addClass(("with-modal-" + (modal.type.toLowerCase())));
    modal.$el.trigger(("modal:open " + (modal.type.toLowerCase()) + ":open"), modal);
    modal.emit(("local::open modalOpen " + (modal.type) + "Open"), modal);
  };
  Modal.prototype.onOpened = function onOpened () {
    var modal = this;
    modal.$el.trigger(("modal:opened " + (modal.type.toLowerCase()) + ":opened"), modal);
    modal.emit(("local::opened modalOpened " + (modal.type) + "Opened"), modal);
  };
  Modal.prototype.onClose = function onClose () {
    var modal = this;
    if (!modal.type || !modal.$el) { return; }
    openedModals.splice(openedModals.indexOf(modal), 1);
    $$1$1('html').removeClass(("with-modal-" + (modal.type.toLowerCase())));
    modal.$el.trigger(("modal:close " + (modal.type.toLowerCase()) + ":close"), modal);
    modal.emit(("local::close modalClose " + (modal.type) + "Close"), modal);
  };
  Modal.prototype.onClosed = function onClosed () {
    var modal = this;
    if (!modal.type || !modal.$el) { return; }
    modal.$el.removeClass('modal-out');
    modal.$el.hide();
    modal.$el.trigger(("modal:closed " + (modal.type.toLowerCase()) + ":closed"), modal);
    modal.emit(("local::closed modalClosed " + (modal.type) + "Closed"), modal);
  };
  Modal.prototype.open = function open (animateModal) {
    var modal = this;
    var app = modal.app;
    var $el = modal.$el;
    var $backdropEl = modal.$backdropEl;
    var type = modal.type;
    var animate = true;
    if (typeof animateModal !== 'undefined') { animate = animateModal; }
    else if (typeof modal.params.animate !== 'undefined') {
      animate = modal.params.animate;
    }

    if (!$el || $el.hasClass('modal-in')) {
      return modal;
    }

    if (type === 'dialog' && app.params.modal.queueDialogs) {
      var pushToQueue;
      if ($$1$1('.dialog.modal-in').length > 0) {
        pushToQueue = true;
      } else if (openedModals.length > 0) {
        openedModals.forEach(function (openedModal) {
          if (openedModal.type === 'dialog') { pushToQueue = true; }
        });
      }
      if (pushToQueue) {
        dialogsQueue.push(modal);
        return modal;
      }
    }

    var $modalParentEl = $el.parent();
    var wasInDom = $el.parents(document).length > 0;
    if (app.params.modal.moveToRoot && !$modalParentEl.is(app.root)) {
      app.root.append($el);
      modal.once((type + "Closed"), function () {
        if (wasInDom) {
          $modalParentEl.append($el);
        } else {
          $el.remove();
        }
      });
    }
    // Show Modal
    $el.show();

    // Set Dialog offset
    if (type === 'dialog') {
      $el.css({
        marginTop: ((-Math.round($el.outerHeight() / 2)) + "px"),
      });
    }

    // Emit open
    /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */
    modal._clientLeft = $el[0].clientLeft;

    // Backdrop
    if ($backdropEl) {
      $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');
      $backdropEl.addClass('backdrop-in');
    }
    // Modal
    function transitionEnd() {
      if ($el.hasClass('modal-out')) {
        modal.onClosed();
      } else {
        modal.onOpened();
      }
    }
    if (animate) {
      $el
        .animationEnd(function () {
          transitionEnd();
        });
      $el
        .transitionEnd(function () {
          transitionEnd();
        });
      $el
        .removeClass('modal-out not-animated')
        .addClass('modal-in');
      modal.onOpen();
    } else {
      $el.removeClass('modal-out').addClass('modal-in not-animated');
      modal.onOpen();
      modal.onOpened();
    }

    return modal;
  };
  Modal.prototype.close = function close (animateModal) {
    var modal = this;
    var $el = modal.$el;
    var $backdropEl = modal.$backdropEl;

    var animate = true;
    if (typeof animateModal !== 'undefined') { animate = animateModal; }
    else if (typeof modal.params.animate !== 'undefined') {
      animate = modal.params.animate;
    }

    if (!$el || !$el.hasClass('modal-in')) {
      return modal;
    }

    // backdrop
    if ($backdropEl) {
      $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');
      $backdropEl.removeClass('backdrop-in');
    }

    // Modal
    $el[animate ? 'removeClass' : 'addClass']('not-animated');
    function transitionEnd() {
      if ($el.hasClass('modal-out')) {
        modal.onClosed();
      } else {
        modal.onOpened();
      }
    }
    if (animate) {
      $el
        .animationEnd(function () {
          transitionEnd();
        });
      $el
        .transitionEnd(function () {
          transitionEnd();
        });
      $el
        .removeClass('modal-in')
        .addClass('modal-out');
      // Emit close
      modal.onClose();
    } else {
      $el
        .addClass('not-animated')
        .removeClass('modal-in')
        .addClass('modal-out');
      // Emit close
      modal.onClose();
      modal.onClosed();
    }

    if (modal.type === 'dialog') {
      clearDialogsQueue();
    }

    return modal;
  };
  Modal.prototype.destroy = function destroy () {
    var modal = this;
    if (modal.destroyed) { return; }
    modal.emit(("local::beforeDestroy modalBeforeDestroy " + (modal.type) + "BeforeDestroy"), modal);
    if (modal.$el) {
      modal.$el.trigger(("modal:beforedestroy " + (modal.type.toLowerCase()) + ":beforedestroy"), modal);
      if (modal.$el.length && modal.$el[0].f7Modal) {
        delete modal.$el[0].f7Modal;
      }
    }
    Utils.deleteProps(modal);
    modal.destroyed = true;
  };

  return Modal;
}(Framework7Class));

var CustomModal = (function (Modal) {
  function CustomModal(app, params) {
    var extendedParams = Utils.extend({
      backdrop: true,
      closeByBackdropClick: true,
      on: {},
    }, params);

    // Extends with open/close Modal methods;
    Modal.call(this, app, extendedParams);

    var customModal = this;

    customModal.params = extendedParams;

    // Find Element
    var $el;
    if (!customModal.params.el) {
      $el = $$1$1(customModal.params.content);
    } else {
      $el = $$1$1(customModal.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return customModal.destroy();
    }
    var $backdropEl;
    if (customModal.params.backdrop) {
      $backdropEl = app.root.children('.custom-modal-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = $$1$1('<div class="custom-modal-backdrop"></div>');
        app.root.append($backdropEl);
      }
    }

    function handleClick(e) {
      if (!customModal || customModal.destroyed) { return; }
      if ($backdropEl && e.target === $backdropEl[0]) {
        customModal.close();
      }
    }

    customModal.on('customModalOpened', function () {
      if (customModal.params.closeByBackdropClick && customModal.params.backdrop) {
        app.on('click', handleClick);
      }
    });
    customModal.on('customModalClose', function () {
      if (customModal.params.closeByBackdropClick && customModal.params.backdrop) {
        app.off('click', handleClick);
      }
    });

    Utils.extend(customModal, {
      app: app,
      $el: $el,
      el: $el[0],
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'customModal',
    });

    $el[0].f7Modal = customModal;

    return customModal;
  }

  if ( Modal ) CustomModal.__proto__ = Modal;
  CustomModal.prototype = Object.create( Modal && Modal.prototype );
  CustomModal.prototype.constructor = CustomModal;

  return CustomModal;
}(Modal$1));

var Modal = {
  name: 'modal',
  static: {
    Modal: Modal$1,
    CustomModal: CustomModal,
  },
  create: function create() {
    var app = this;
    app.customModal = {
      create: function create(params) {
        return new CustomModal(app, params);
      },
    };
  },
  params: {
    modal: {
      moveToRoot: true,
      queueDialogs: true,
    },
  },
};

var Dialog$1 = (function (Modal) {
  function Dialog(app, params) {
    var extendedParams = Utils.extend({
      title: app.params.dialog.title,
      text: undefined,
      content: '',
      buttons: [],
      verticalButtons: false,
      onClick: undefined,
      cssClass: undefined,
      on: {},
    }, params);

    // Extends with open/close Modal methods;
    Modal.call(this, app, extendedParams);

    var dialog = this;

    var title = extendedParams.title;
    var text = extendedParams.text;
    var content = extendedParams.content;
    var buttons = extendedParams.buttons;
    var verticalButtons = extendedParams.verticalButtons;
    var cssClass = extendedParams.cssClass;

    dialog.params = extendedParams;

    // Find Element
    var $el;
    if (!dialog.params.el) {
      var dialogClasses = ['dialog'];
      if (buttons.length === 0) { dialogClasses.push('dialog-no-buttons'); }
      if (buttons.length > 0) { dialogClasses.push(("dialog-buttons-" + (buttons.length))); }
      if (verticalButtons) { dialogClasses.push('dialog-buttons-vertical'); }
      if (cssClass) { dialogClasses.push(cssClass); }

      var buttonsHTML = '';
      if (buttons.length > 0) {
        buttonsHTML = "\n          <div class=\"dialog-buttons\">\n            " + (buttons.map(function (button) { return ("\n              <span class=\"dialog-button" + (button.bold ? ' dialog-button-bold' : '') + (button.color ? (" color-" + (button.color)) : '') + (button.cssClass ? (" " + (button.cssClass)) : '') + "\">" + (button.text) + "</span>\n            "); }).join('')) + "\n          </div>\n        ";
      }

      var dialogHtml = "\n        <div class=\"" + (dialogClasses.join(' ')) + "\">\n          <div class=\"dialog-inner\">\n            " + (title ? ("<div class=\"dialog-title\">" + title + "</div>") : '') + "\n            " + (text ? ("<div class=\"dialog-text\">" + text + "</div>") : '') + "\n            " + content + "\n          </div>\n          " + buttonsHTML + "\n        </div>\n      ";
      $el = $$1$1(dialogHtml);
    } else {
      $el = $$1$1(dialog.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return dialog.destroy();
    }

    var $backdropEl = app.root.children('.dialog-backdrop');
    if ($backdropEl.length === 0) {
      $backdropEl = $$1$1('<div class="dialog-backdrop"></div>');
      app.root.append($backdropEl);
    }

    // Assign events
    function buttonOnClick(e) {
      var buttonEl = this;
      var index = $$1$1(buttonEl).index();
      var button = buttons[index];
      if (button.onClick) { button.onClick(dialog, e); }
      if (dialog.params.onClick) { dialog.params.onClick(dialog, index); }
      if (button.close !== false) { dialog.close(); }
    }
    if (buttons && buttons.length > 0) {
      $el.find('.dialog-button').each(function (index, buttonEl) {
        $$1$1(buttonEl).on('click', buttonOnClick);
      });
      dialog.on('close', function () {
        $el.find('.dialog-button').each(function (index, buttonEl) {
          $$1$1(buttonEl).off('click', buttonOnClick);
        });
      });
    }
    Utils.extend(dialog, {
      app: app,
      $el: $el,
      el: $el[0],
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl[0],
      type: 'dialog',
      setProgress: function setProgress(progress, duration) {
        app.progressbar.set($el.find('.progressbar'), progress, duration);
        return dialog;
      },
      setText: function setText(newText) {
        var $textEl = $el.find('.dialog-text');
        if ($textEl.length === 0) {
          $textEl = $$1$1('<div class="dialog-text"></div>');
          if (typeof title !== 'undefined') {
            $textEl.insertAfter($el.find('.dialog-title'));
          } else {
            $el.find('.dialog-inner').prepend($textEl);
          }
        }
        $textEl.html(newText);
        dialog.params.text = newText;
        return dialog;
      },
      setTitle: function setTitle(newTitle) {
        var $titleEl = $el.find('.dialog-title');
        if ($titleEl.length === 0) {
          $titleEl = $$1$1('<div class="dialog-title"></div>');
          $el.find('.dialog-inner').prepend($titleEl);
        }
        $titleEl.html(newTitle);
        dialog.params.title = newTitle;
        return dialog;
      },
    });

    $el[0].f7Modal = dialog;

    return dialog;
  }

  if ( Modal ) Dialog.__proto__ = Modal;
  Dialog.prototype = Object.create( Modal && Modal.prototype );
  Dialog.prototype.constructor = Dialog;

  return Dialog;
}(Modal$1));

var ConstructorMethods = function (parameters) {
  if ( parameters === void 0 ) parameters = {};

  var defaultSelector = parameters.defaultSelector;
  var constructor = parameters.constructor;
  var domProp = parameters.domProp;
  var app = parameters.app;
  var addMethods = parameters.addMethods;
  var methods = {
    create: function create() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (app) { return new (Function.prototype.bind.apply( constructor, [ null ].concat( [app], args) )); }
      return new (Function.prototype.bind.apply( constructor, [ null ].concat( args) ));
    },
    get: function get(el) {
      if ( el === void 0 ) el = defaultSelector;

      if (el instanceof constructor) { return el; }
      var $el = $$1$1(el);
      if ($el.length === 0) { return undefined; }
      return $el[0][domProp];
    },
    destroy: function destroy(el) {
      var instance = methods.get(el);
      if (instance && instance.destroy) { return instance.destroy(); }
      return undefined;
    },
  };
  if (addMethods && Array.isArray(addMethods)) {
    addMethods.forEach(function (methodName) {
      methods[methodName] = function (el) {
        if ( el === void 0 ) el = defaultSelector;
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        var instance = methods.get(el);
        if (instance && instance[methodName]) { return instance[methodName].apply(instance, args); }
        return undefined;
      };
    });
  }
  return methods;
};

var ModalMethods = function (parameters) {
  if ( parameters === void 0 ) parameters = {};

  var defaultSelector = parameters.defaultSelector;
  var constructor = parameters.constructor;
  var app = parameters.app;
  var methods = Utils.extend(
    ConstructorMethods({
      defaultSelector: defaultSelector,
      constructor: constructor,
      app: app,
      domProp: 'f7Modal',
    }),
    {
      open: function open(el, animate) {
        var $el = $$1$1(el);
        var instance = $el[0].f7Modal;
        if (!instance) { instance = new constructor(app, { el: $el }); }
        return instance.open(animate);
      },
      close: function close(el, animate) {
        if ( el === void 0 ) el = defaultSelector;

        var $el = $$1$1(el);
        if ($el.length === 0) { return undefined; }
        var instance = $el[0].f7Modal;
        if (!instance) { instance = new constructor(app, { el: $el }); }
        return instance.close(animate);
      },
    }
  );
  return methods;
};

var Dialog = {
  name: 'dialog',
  params: {
    dialog: {
      title: undefined,
      buttonOk: 'OK',
      buttonCancel: 'Cancel',
      usernamePlaceholder: 'Username',
      passwordPlaceholder: 'Password',
      preloaderTitle: 'Loading... ',
      progressTitle: 'Loading... ',
      closeByBackdropClick: false,
    },
  },
  static: {
    Dialog: Dialog$1,
  },
  create: function create() {
    var app = this;
    var defaultDialogTitle = app.params.dialog.title || app.name;
    app.dialog = Utils.extend(
      ModalMethods({
        app: app,
        constructor: Dialog$1,
        defaultSelector: '.dialog.modal-in',
      }),
      {
        // Shortcuts
        alert: function alert() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          var text = args[0];
          var title = args[1];
          var callbackOk = args[2];
          if (args.length === 2 && typeof args[1] === 'function') {
            var assign;
            (assign = args, text = assign[0], callbackOk = assign[1], title = assign[2]);
          }
          return new Dialog$1(app, {
            title: typeof title === 'undefined' ? defaultDialogTitle : title,
            text: text,
            buttons: [{
              text: app.params.dialog.buttonOk,
              bold: true,
              onClick: callbackOk,
            }],
          }).open();
        },
        prompt: function prompt() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          var text = args[0];
          var title = args[1];
          var callbackOk = args[2];
          var callbackCancel = args[3];
          if (typeof args[1] === 'function') {
            var assign;
            (assign = args, text = assign[0], callbackOk = assign[1], callbackCancel = assign[2], title = assign[3]);
          }
          return new Dialog$1(app, {
            title: typeof title === 'undefined' ? defaultDialogTitle : title,
            text: text,
            content: '<div class="dialog-input-field item-input"><div class="item-input-wrap"><input type="text" class="dialog-input"></div></div>',
            buttons: [
              {
                text: app.params.dialog.buttonCancel,
              },
              {
                text: app.params.dialog.buttonOk,
                bold: true,
              } ],
            onClick: function onClick(dialog, index) {
              var inputValue = dialog.$el.find('.dialog-input').val();
              if (index === 0 && callbackCancel) { callbackCancel(inputValue); }
              if (index === 1 && callbackOk) { callbackOk(inputValue); }
            },
          }).open();
        },
        confirm: function confirm() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          var text = args[0];
          var title = args[1];
          var callbackOk = args[2];
          var callbackCancel = args[3];
          if (typeof args[1] === 'function') {
            var assign;
            (assign = args, text = assign[0], callbackOk = assign[1], callbackCancel = assign[2], title = assign[3]);
          }
          return new Dialog$1(app, {
            title: typeof title === 'undefined' ? defaultDialogTitle : title,
            text: text,
            buttons: [
              {
                text: app.params.dialog.buttonCancel,
                onClick: callbackCancel,
              },
              {
                text: app.params.dialog.buttonOk,
                bold: true,
                onClick: callbackOk,
              } ],
          }).open();
        },
        login: function login() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          var text = args[0];
          var title = args[1];
          var callbackOk = args[2];
          var callbackCancel = args[3];
          if (typeof args[1] === 'function') {
            var assign;
            (assign = args, text = assign[0], callbackOk = assign[1], callbackCancel = assign[2], title = assign[3]);
          }
          return new Dialog$1(app, {
            title: typeof title === 'undefined' ? defaultDialogTitle : title,
            text: text,
            content: ("\n              <div class=\"dialog-input-field dialog-input-double item-input\">\n                <div class=\"item-input-wrap\">\n                  <input type=\"text\" name=\"dialog-username\" placeholder=\"" + (app.params.dialog.usernamePlaceholder) + "\" class=\"dialog-input\">\n                </div>\n              </div>\n              <div class=\"dialog-input-field dialog-input-double item-input\">\n                <div class=\"item-input-wrap\">\n                  <input type=\"password\" name=\"dialog-password\" placeholder=\"" + (app.params.dialog.passwordPlaceholder) + "\" class=\"dialog-input\">\n                </div>\n              </div>"),
            buttons: [
              {
                text: app.params.dialog.buttonCancel,
              },
              {
                text: app.params.dialog.buttonOk,
                bold: true,
              } ],
            onClick: function onClick(dialog, index) {
              var username = dialog.$el.find('[name="dialog-username"]').val();
              var password = dialog.$el.find('[name="dialog-password"]').val();
              if (index === 0 && callbackCancel) { callbackCancel(username, password); }
              if (index === 1 && callbackOk) { callbackOk(username, password); }
            },
          }).open();
        },
        password: function password() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          var text = args[0];
          var title = args[1];
          var callbackOk = args[2];
          var callbackCancel = args[3];
          if (typeof args[1] === 'function') {
            var assign;
            (assign = args, text = assign[0], callbackOk = assign[1], callbackCancel = assign[2], title = assign[3]);
          }
          return new Dialog$1(app, {
            title: typeof title === 'undefined' ? defaultDialogTitle : title,
            text: text,
            content: ("\n              <div class=\"dialog-input-field item-input\">\n                <div class=\"item-input-wrap\">\n                  <input type=\"password\" name=\"dialog-password\" placeholder=\"" + (app.params.dialog.passwordPlaceholder) + "\" class=\"dialog-input\">\n                </div>\n              </div>"),
            buttons: [
              {
                text: app.params.dialog.buttonCancel,
              },
              {
                text: app.params.dialog.buttonOk,
                bold: true,
              } ],
            onClick: function onClick(dialog, index) {
              var password = dialog.$el.find('[name="dialog-password"]').val();
              if (index === 0 && callbackCancel) { callbackCancel(password); }
              if (index === 1 && callbackOk) { callbackOk(password); }
            },
          }).open();
        },
        preloader: function preloader(title) {
          var preloaderInner = app.theme !== 'md' ? '' : Utils.mdPreloaderContent;
          return new Dialog$1(app, {
            title: typeof title === 'undefined' ? app.params.dialog.preloaderTitle : title,
            content: ("<div class=\"preloader\">" + preloaderInner + "</div>"),
            cssClass: 'dialog-preloader',
          }).open();
        },
        progress: function progress() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          var title = args[0];
          var progress = args[1];
          var color = args[2];
          if (args.length === 2) {
            if (typeof args[0] === 'number') {
              var assign;
              (assign = args, progress = assign[0], color = assign[1], title = assign[2]);
            } else if (typeof args[0] === 'string' && typeof args[1] === 'string') {
              var assign$1;
              (assign$1 = args, title = assign$1[0], color = assign$1[1], progress = assign$1[2]);
            }
          } else if (args.length === 1) {
            if (typeof args[0] === 'number') {
              var assign$2;
              (assign$2 = args, progress = assign$2[0], title = assign$2[1], color = assign$2[2]);
            }
          }
          var infinite = typeof progress === 'undefined';
          var dialog = new Dialog$1(app, {
            title: typeof title === 'undefined' ? app.params.dialog.progressTitle : title,
            cssClass: 'dialog-progress',
            content: ("\n              <div class=\"progressbar" + (infinite ? '-infinite' : '') + (color ? (" color-" + color) : '') + "\">\n                " + (!infinite ? '<span></span>' : '') + "\n              </div>\n            "),
          });
          if (!infinite) { dialog.setProgress(progress); }
          return dialog.open();
        },
      }
    );
  },
  clicks: {
    '.dialog-backdrop': function closeDialog() {
      var app = this;
      if (!app.params.dialog.closeByBackdropClick) { return; }
      app.dialog.close();
    },
  },
};

var Popup$1 = (function (Modal) {
  function Popup(app, params) {
    var extendedParams = Utils.extend(
      { on: {} },
      app.params.popup,
      params
    );

    // Extends with open/close Modal methods;
    Modal.call(this, app, extendedParams);

    var popup = this;

    popup.params = extendedParams;

    // Find Element
    var $el;
    if (!popup.params.el) {
      $el = $$1$1(popup.params.content);
    } else {
      $el = $$1$1(popup.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return popup.destroy();
    }

    var $backdropEl;
    if (popup.params.backdrop) {
      $backdropEl = app.root.children('.popup-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = $$1$1('<div class="popup-backdrop"></div>');
        app.root.append($backdropEl);
      }
    }

    Utils.extend(popup, {
      app: app,
      $el: $el,
      el: $el[0],
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'popup',
    });

    $el[0].f7Modal = popup;

    return popup;
  }

  if ( Modal ) Popup.__proto__ = Modal;
  Popup.prototype = Object.create( Modal && Modal.prototype );
  Popup.prototype.constructor = Popup;

  return Popup;
}(Modal$1));

var Popup = {
  name: 'popup',
  params: {
    popup: {
      backdrop: true,
      closeByBackdropClick: true,
    },
  },
  static: {
    Popup: Popup$1,
  },
  create: function create() {
    var app = this;
    app.popup = ModalMethods({
      app: app,
      constructor: Popup$1,
      defaultSelector: '.popup.modal-in',
    });
  },
  clicks: {
    '.popup-open': function openPopup($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.popup.open(data.popup, data.animate);
    },
    '.popup-close': function closePopup($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.popup.close(data.popup, data.animate);
    },
    '.popup-backdrop': function closePopup() {
      var app = this;
      if (!app.params.popup.closeByBackdropClick) { return; }
      app.popup.close();
    },
  },
};

var LoginScreen$1 = (function (Modal) {
  function LoginScreen(app, params) {
    var extendedParams = Utils.extend({
      on: {},
    }, params);

    // Extends with open/close Modal methods;
    Modal.call(this, app, extendedParams);

    var loginScreen = this;

    loginScreen.params = extendedParams;

    // Find Element
    var $el;
    if (!loginScreen.params.el) {
      $el = $$1$1(loginScreen.params.content);
    } else {
      $el = $$1$1(loginScreen.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return loginScreen.destroy();
    }

    Utils.extend(loginScreen, {
      app: app,
      $el: $el,
      el: $el[0],
      type: 'loginScreen',
    });

    $el[0].f7Modal = loginScreen;

    return loginScreen;
  }

  if ( Modal ) LoginScreen.__proto__ = Modal;
  LoginScreen.prototype = Object.create( Modal && Modal.prototype );
  LoginScreen.prototype.constructor = LoginScreen;

  return LoginScreen;
}(Modal$1));

var LoginScreen = {
  name: 'loginScreen',
  static: {
    LoginScreen: LoginScreen$1,
  },
  create: function create() {
    var app = this;
    app.loginScreen = ModalMethods({
      app: app,
      constructor: LoginScreen$1,
      defaultSelector: '.login-screen.modal-in',
    });
  },
  clicks: {
    '.login-screen-open': function openLoginScreen($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.loginScreen.open(data.loginScreen, data.animate);
    },
    '.login-screen-close': function closeLoginScreen($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.loginScreen.close(data.loginScreen, data.animate);
    },
  },
};

var Popover$1 = (function (Modal) {
  function Popover(app, params) {
    var extendedParams = Utils.extend(
      { on: {} },
      app.params.popover,
      params
    );

    // Extends with open/close Modal methods;
    Modal.call(this, app, extendedParams);

    var popover = this;

    popover.params = extendedParams;

    // Find Element
    var $el;
    if (!popover.params.el) {
      $el = $$1$1(popover.params.content);
    } else {
      $el = $$1$1(popover.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    // Find Target
    var $targetEl = $$1$1(popover.params.targetEl).eq(0);

    if ($el.length === 0) {
      return popover.destroy();
    }

    // Backdrop
    var $backdropEl;
    if (popover.params.backdrop) {
      $backdropEl = app.root.children('.popover-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = $$1$1('<div class="popover-backdrop"></div>');
        app.root.append($backdropEl);
      }
    }

    // Find Angle
    var $angleEl;
    if ($el.find('.popover-angle').length === 0) {
      $angleEl = $$1$1('<div class="popover-angle"></div>');
      $el.prepend($angleEl);
    } else {
      $angleEl = $el.find('.popover-angle');
    }

    // Open
    var originalOpen = popover.open;

    Utils.extend(popover, {
      app: app,
      $el: $el,
      el: $el[0],
      $targetEl: $targetEl,
      targetEl: $targetEl[0],
      $angleEl: $angleEl,
      angleEl: $angleEl[0],
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'popover',
      open: function open() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var targetEl = args[0];
        var animate = args[1];
        if (typeof args[0] === 'boolean') { var assign;
          (assign = args, animate = assign[0], targetEl = assign[1]); }
        if (targetEl) {
          popover.$targetEl = $$1$1(targetEl);
          popover.targetEl = popover.$targetEl[0];
        }
        originalOpen.call(popover, animate);
      },
    });

    function handleResize() {
      popover.resize();
    }
    popover.on('popoverOpen', function () {
      popover.resize();
      app.on('resize', handleResize);
      popover.on('popoverClose popoverBeforeDestroy', function () {
        app.off('resize', handleResize);
      });
    });

    function handleClick(e) {
      var target = e.target;
      if ($$1$1(target).closest(popover.el).length === 0) {
        popover.close();
      }
    }

    popover.on('popoverOpened', function () {
      if (popover.params.closeByOutsideClick && !popover.params.backdrop) {
        app.on('click', handleClick);
      }
    });
    popover.on('popoverClose', function () {
      if (popover.params.closeByOutsideClick && !popover.params.backdrop) {
        app.off('click', handleClick);
      }
    });

    $el[0].f7Modal = popover;

    return popover;
  }

  if ( Modal ) Popover.__proto__ = Modal;
  Popover.prototype = Object.create( Modal && Modal.prototype );
  Popover.prototype.constructor = Popover;
  Popover.prototype.resize = function resize () {
    var popover = this;
    var app = popover.app;
    var $el = popover.$el;
    var $targetEl = popover.$targetEl;
    var $angleEl = popover.$angleEl;
    var ref = popover.params;
    var targetX = ref.targetX;
    var targetY = ref.targetY;
    $el.css({ left: '', top: '' });
    var ref$1 = [$el.width(), $el.height()];
    var width = ref$1[0];
    var height = ref$1[1];
    var angleSize = 0;
    var angleLeft;
    var angleTop;
    if (app.theme === 'ios') {
      $angleEl.removeClass('on-left on-right on-top on-bottom').css({ left: '', top: '' });
      angleSize = $angleEl.width() / 2;
    } else {
      $el.removeClass('popover-on-left popover-on-right popover-on-top popover-on-bottom').css({ left: '', top: '' });
    }

    var targetWidth;
    var targetHeight;
    var targetOffsetLeft;
    var targetOffsetTop;
    if ($targetEl && $targetEl.length > 0) {
      targetWidth = $targetEl.outerWidth();
      targetHeight = $targetEl.outerHeight();

      var targetOffset = $targetEl.offset();
      targetOffsetLeft = targetOffset.left - app.left;
      targetOffsetTop = targetOffset.top - app.top;

      var targetParentPage = $targetEl.parents('.page');
      if (targetParentPage.length > 0) {
        targetOffsetTop -= targetParentPage[0].scrollTop;
      }
    } else if (typeof targetX !== 'undefined' && targetY !== 'undefined') {
      targetOffsetLeft = targetX;
      targetOffsetTop = targetY;
      targetWidth = popover.params.targetWidth || 0;
      targetHeight = popover.params.targetHeight || 0;
    }

    var ref$2 = [0, 0, 0];
    var left = ref$2[0];
    var top = ref$2[1];
    var diff = ref$2[2];
    // Top Position
    var position = app.theme === 'md' ? 'bottom' : 'top';
    if (app.theme === 'md') {
      if (height < app.height - targetOffsetTop - targetHeight) {
        // On bottom
        position = 'bottom';
        top = targetOffsetTop;
      } else if (height < targetOffsetTop) {
        // On top
        top = (targetOffsetTop - height) + targetHeight;
        position = 'top';
      } else {
        // On middle
        position = 'bottom';
        top = targetOffsetTop;
      }

      if (top <= 0) {
        top = 8;
      } else if (top + height >= app.height) {
        top = app.height - height - 8;
      }

      // Horizontal Position
      left = (targetOffsetLeft + targetWidth) - width - 8;
      if (left + width >= app.width - 8) {
        left = (targetOffsetLeft + targetWidth) - width - 8;
      }
      if (left < 8) {
        left = 8;
      }
      if (position === 'top') {
        $el.addClass('popover-on-top');
      }
      if (position === 'bottom') {
        $el.addClass('popover-on-bottom');
      }
    } else {
      if ((height + angleSize) < targetOffsetTop) {
        // On top
        top = targetOffsetTop - height - angleSize;
      } else if ((height + angleSize) < app.height - targetOffsetTop - targetHeight) {
        // On bottom
        position = 'bottom';
        top = targetOffsetTop + targetHeight + angleSize;
      } else {
        // On middle
        position = 'middle';
        top = ((targetHeight / 2) + targetOffsetTop) - (height / 2);
        diff = top;
        if (top <= 0) {
          top = 5;
        } else if (top + height >= app.height) {
          top = app.height - height - 5;
        }
        diff -= top;
      }

      // Horizontal Position
      if (position === 'top' || position === 'bottom') {
        left = ((targetWidth / 2) + targetOffsetLeft) - (width / 2);
        diff = left;
        if (left < 5) { left = 5; }
        if (left + width > app.width) { left = app.width - width - 5; }
        if (left < 0) { left = 0; }
        if (position === 'top') {
          $angleEl.addClass('on-bottom');
        }
        if (position === 'bottom') {
          $angleEl.addClass('on-top');
        }
        diff -= left;
        angleLeft = ((width / 2) - angleSize) + diff;
        angleLeft = Math.max(Math.min(angleLeft, width - (angleSize * 2) - 13), 13);
        $angleEl.css({ left: (angleLeft + "px") });
      } else if (position === 'middle') {
        left = targetOffsetLeft - width - angleSize;
        $angleEl.addClass('on-right');
        if (left < 5 || (left + width > app.width)) {
          if (left < 5) { left = targetOffsetLeft + targetWidth + angleSize; }
          if (left + width > app.width) { left = app.width - width - 5; }
          $angleEl.removeClass('on-right').addClass('on-left');
        }
        angleTop = ((height / 2) - angleSize) + diff;
        angleTop = Math.max(Math.min(angleTop, height - (angleSize * 2) - 13), 13);
        $angleEl.css({ top: (angleTop + "px") });
      }
    }

    // Apply Styles
    $el.css({ top: (top + "px"), left: (left + "px") });
  };

  return Popover;
}(Modal$1));

var Popover = {
  name: 'popover',
  params: {
    popover: {
      closeByBackdropClick: true,
      closeByOutsideClick: true,
      backdrop: true,
    },
  },
  static: {
    Popover: Popover$1,
  },
  create: function create() {
    var app = this;
    app.popover = Utils.extend(
      ModalMethods({
        app: app,
        constructor: Popover$1,
        defaultSelector: '.popover.modal-in',
      }),
      {
        open: function open(popoverEl, targetEl, animate) {
          var $popoverEl = $$1$1(popoverEl);
          var popover = $popoverEl[0].f7Modal;
          if (!popover) { popover = new Popover$1(app, { el: $popoverEl, targetEl: targetEl }); }
          return popover.open(targetEl, animate);
        },
      }
    );
  },
  clicks: {
    '.popover-open': function openPopover($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.popover.open(data.popover, $clickedEl, data.animate);
    },
    '.popover-close': function closePopover($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.popover.close(data.popover, data.animate);
    },
    '.popover-backdrop': function closePopover() {
      var app = this;
      if (!app.params.popover.closeByBackdropClick) { return; }
      app.popover.close();
    },
  },
};

/* eslint indent: ["off"] */
var Actions$1 = (function (Modal) {
  function Actions(app, params) {
    var extendedParams = Utils.extend(
      { on: {} },
      app.params.actions,
      params
    );

    // Extends with open/close Modal methods;
    Modal.call(this, app, extendedParams);

    var actions = this;

    actions.params = extendedParams;

    // Buttons
    var groups;
    if (actions.params.buttons) {
      groups = actions.params.buttons;
      if (!Array.isArray(groups[0])) { groups = [groups]; }
    }
    actions.groups = groups;

    // Find Element
    var $el;
    if (actions.params.el) {
      $el = $$1$1(actions.params.el);
    } else if (actions.params.content) {
      $el = $$1$1(actions.params.content);
    } else if (actions.params.buttons) {
      if (actions.params.convertToPopover) {
        actions.popoverHtml = actions.renderPopover();
      }
      actions.actionsHtml = actions.render();
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el && $el.length === 0 && !(actions.actionsHtml || actions.popoverHtml)) {
      return actions.destroy();
    }

    // Backdrop
    var $backdropEl;
    if (actions.params.backdrop) {
      $backdropEl = app.root.children('.actions-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = $$1$1('<div class="actions-backdrop"></div>');
        app.root.append($backdropEl);
      }
    }

    var originalOpen = actions.open;
    var originalClose = actions.close;

    var popover;
    function buttonOnClick(e) {
      var buttonEl = this;
      var buttonIndex;
      var groupIndex;
      if ($$1$1(buttonEl).hasClass('item-link')) {
        buttonIndex = $$1$1(buttonEl).parents('li').index();
        groupIndex = $$1$1(buttonEl).parents('.list').index();
      } else {
        buttonIndex = $$1$1(buttonEl).index();
        groupIndex = $$1$1(buttonEl).parents('.actions-group').index();
      }
      var button = groups[groupIndex][buttonIndex];
      if (button.onClick) { button.onClick(actions, e); }
      if (actions.params.onClick) { actions.params.onClick(actions, e); }
      if (button.close !== false) { actions.close(); }
    }
    actions.open = function open(animate) {
      var convertToPopover = false;
      var ref = actions.params;
      var targetEl = ref.targetEl;
      var targetX = ref.targetX;
      var targetY = ref.targetY;
      var targetWidth = ref.targetWidth;
      var targetHeight = ref.targetHeight;
      if (actions.params.convertToPopover && (targetEl || (targetX !== undefined && targetY !== undefined))) {
        // Popover
        if (
          actions.params.forceToPopover ||
          (app.device.ios && app.device.ipad) ||
          app.width >= 768
        ) {
          convertToPopover = true;
        }
      }
      if (convertToPopover) {
        popover = app.popover.create({
          content: actions.popoverHtml,
          backdrop: actions.params.backdrop,
          targetEl: targetEl,
          targetX: targetX,
          targetY: targetY,
          targetWidth: targetWidth,
          targetHeight: targetHeight,
        });
        popover.open(animate);
        popover.once('popoverOpened', function () {
          popover.$el.find('.item-link').each(function (groupIndex, buttonEl) {
            $$1$1(buttonEl).on('click', buttonOnClick);
          });
        });
        popover.once('popoverClosed', function () {
          popover.$el.find('.item-link').each(function (groupIndex, buttonEl) {
            $$1$1(buttonEl).off('click', buttonOnClick);
          });
          Utils.nextTick(function () {
            popover.destroy();
            popover = undefined;
          });
        });
      } else {
        actions.$el = $$1$1(actions.actionsHtml);
        actions.$el[0].f7Modal = actions;
        actions.$el.find('.actions-button').each(function (groupIndex, buttonEl) {
          $$1$1(buttonEl).on('click', buttonOnClick);
        });
        actions.once('actionsClosed', function () {
          actions.$el.find('.list-button').each(function (groupIndex, buttonEl) {
            $$1$1(buttonEl).off('click', buttonOnClick);
          });
        });
        originalOpen.call(actions, animate);
      }
      return actions;
    };

    actions.close = function close(animate) {
      if (popover) {
        popover.close(animate);
      } else {
        originalClose.call(actions, animate);
      }
      return actions;
    };

    Utils.extend(actions, {
      app: app,
      $el: $el,
      el: $el ? $el[0] : undefined,
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'actions',
    });

    if ($el) {
      $el[0].f7Modal = actions;
    }

    return actions;
  }

  if ( Modal ) Actions.__proto__ = Modal;
  Actions.prototype = Object.create( Modal && Modal.prototype );
  Actions.prototype.constructor = Actions;
  Actions.prototype.render = function render () {
    var actions = this;
    if (actions.params.render) { return actions.params.render.call(actions, actions); }
    var groups = actions.groups;
    return ("\n      <div class=\"actions-modal" + (actions.params.grid ? ' actions-grid' : '') + "\">\n        " + (groups.map(function (group) { return ("<div class=\"actions-group\">\n            " + (group.map(function (button) {
              var buttonClasses = [("actions-" + (button.label ? 'label' : 'button'))];
              var color = button.color;
              var bg = button.bg;
              var bold = button.bold;
              var disabled = button.disabled;
              var label = button.label;
              var text = button.text;
              var icon = button.icon;
              if (color) { buttonClasses.push(("color-" + color)); }
              if (bg) { buttonClasses.push(("bg-" + color)); }
              if (bold) { buttonClasses.push('actions-button-bold'); }
              if (disabled) { buttonClasses.push('disabled'); }
              if (label) {
                return ("<div class=\"" + (buttonClasses.join(' ')) + "\">" + text + "</div>");
              }
              return ("\n                <div class=\"" + (buttonClasses.join(' ')) + "\">\n                  " + (icon ? ("<div class=\"actions-button-media\">" + icon + "</div>") : '') + "\n                  <div class=\"actions-button-text\">" + text + "</div>\n                </div>").trim();
            }).join('')) + "\n          </div>"); }).join('')) + "\n      </div>\n    ").trim();
  };
  Actions.prototype.renderPopover = function renderPopover () {
    var actions = this;
    if (actions.params.renderPopover) { return actions.params.renderPopover.call(actions, actions); }
    var groups = actions.groups;
    return ("\n      <div class=\"popover popover-from-actions\">\n        <div class=\"popover-inner\">\n          " + (groups.map(function (group) { return ("\n            <div class=\"list\">\n              <ul>\n                " + (group.map(function (button) {
                  var itemClasses = [];
                  var color = button.color;
                  var bg = button.bg;
                  var bold = button.bold;
                  var disabled = button.disabled;
                  var label = button.label;
                  var text = button.text;
                  var icon = button.icon;
                  if (color) { itemClasses.push(("color-" + color)); }
                  if (bg) { itemClasses.push(("bg-" + bg)); }
                  if (bold) { itemClasses.push('popover-from-actions-bold'); }
                  if (disabled) { itemClasses.push('disabled'); }
                  if (label) {
                    itemClasses.push('popover-from-actions-label');
                    return ("<li class=\"" + (itemClasses.join(' ')) + "\">" + text + "</li>");
                  }
                  itemClasses.push('item-link');
                  if (icon) {
                    itemClasses.push('item-content');
                    return ("\n                      <li>\n                        <a class=\"" + (itemClasses.join(' ')) + "\">\n                          <div class=\"item-media\">\n                            " + icon + "\n                          </div>\n                          <div class=\"item-inner\">\n                            <div class=\"item-title\">\n                              " + text + "\n                            </div>\n                          </div>\n                        </a>\n                      </li>\n                    ");
                  }
                  itemClasses.push('list-button');
                  return ("\n                    <li>\n                      <a href=\"#\" class=\"list-button " + (itemClasses.join(' ')) + "\">" + text + "</a>\n                    </li>\n                  ");
                }).join('')) + "\n              </ul>\n            </div>\n          "); }).join('')) + "\n        </div>\n      </div>\n    ").trim();
  };

  return Actions;
}(Modal$1));

var Actions = {
  name: 'actions',
  params: {
    actions: {
      convertToPopover: true,
      forceToPopover: false,
      closeByBackdropClick: true,
      render: null,
      renderPopover: null,
      backdrop: true,
    },
  },
  static: {
    Actions: Actions$1,
  },
  create: function create() {
    var app = this;
    app.actions = ModalMethods({
      app: app,
      constructor: Actions$1,
      defaultSelector: '.actions-modal.modal-in',
    });
  },
  clicks: {
    '.actions-open': function openActions($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.actions.open(data.actions, data.animate);
    },
    '.actions-close': function closeActions($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.actions.close(data.actions, data.animate);
    },
    '.actions-backdrop': function closeActions() {
      var app = this;
      if (!app.params.actions.closeByBackdropClick) { return; }
      app.actions.close();
    },
  },
};

var Sheet$1 = (function (Modal) {
  function Sheet(app, params) {
    var extendedParams = Utils.extend({
      backdrop: app.theme === 'md',
      closeByOutsideClick: app.params.sheet.closeByOutsideClick,
      on: {},
    }, params);

    // Extends with open/close Modal methods;
    Modal.call(this, app, extendedParams);

    var sheet = this;

    sheet.params = extendedParams;

    // Find Element
    var $el;
    if (!sheet.params.el) {
      $el = $$1$1(sheet.params.content);
    } else {
      $el = $$1$1(sheet.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return sheet.destroy();
    }
    var $backdropEl;
    if (sheet.params.backdrop) {
      $backdropEl = app.root.children('.sheet-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = $$1$1('<div class="sheet-backdrop"></div>');
        app.root.append($backdropEl);
      }
    }

    var $pageContentEl;
    function scrollToOpen() {
      var $scrollEl = $$1$1(sheet.params.scrollToEl).eq(0);
      if ($scrollEl.length === 0) { return; }
      $pageContentEl = $scrollEl.parents('.page-content');
      if ($pageContentEl.length === 0) { return; }

      var paddingTop = parseInt($pageContentEl.css('padding-top'), 10);
      var paddingBottom = parseInt($pageContentEl.css('padding-bottom'), 10);
      var pageHeight = $pageContentEl[0].offsetHeight - paddingTop - $el.height();
      var pageScrollHeight = $pageContentEl[0].scrollHeight - paddingTop - $el.height();
      var pageScroll = $pageContentEl.scrollTop();

      var newPaddingBottom;

      var scrollElTop = ($scrollEl.offset().top - paddingTop) + $scrollEl[0].offsetHeight;
      if (scrollElTop > pageHeight) {
        var scrollTop = (pageScroll + scrollElTop) - pageHeight;
        if (scrollTop + pageHeight > pageScrollHeight) {
          newPaddingBottom = ((scrollTop + pageHeight) - pageScrollHeight) + paddingBottom;
          if (pageHeight === pageScrollHeight) {
            newPaddingBottom = $el.height();
          }
          $pageContentEl.css({
            'padding-bottom': (newPaddingBottom + "px"),
          });
        }
        $pageContentEl.scrollTop(scrollTop, 300);
      }
    }

    function scrollToClose() {
      if ($pageContentEl && $pageContentEl.length > 0) {
        $pageContentEl.css({
          'padding-bottom': '',
        });
      }
    }
    function handleClick(e) {
      var target = e.target;
      if ($$1$1(target).closest(sheet.el).length === 0) {
        sheet.close();
      }
    }

    sheet.on('sheetOpen', function () {
      if (sheet.params.scrollToEl) {
        scrollToOpen();
      }
    });
    sheet.on('sheetOpened', function () {
      if (sheet.params.closeByOutsideClick && !sheet.params.backdrop) {
        app.on('click', handleClick);
      }
    });
    sheet.on('sheetClose', function () {
      if (sheet.params.scrollToEl) {
        scrollToClose();
      }
      if (sheet.params.closeByOutsideClick && !sheet.params.backdrop) {
        app.off('click', handleClick);
      }
    });

    Utils.extend(sheet, {
      app: app,
      $el: $el,
      el: $el[0],
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'sheet',
    });

    $el[0].f7Modal = sheet;

    return sheet;
  }

  if ( Modal ) Sheet.__proto__ = Modal;
  Sheet.prototype = Object.create( Modal && Modal.prototype );
  Sheet.prototype.constructor = Sheet;

  return Sheet;
}(Modal$1));

var Sheet = {
  name: 'sheet',
  params: {
    sheet: {
      closeByBackdropClick: true,
      closeByOutsideClick: false,
    },
  },
  static: {
    Sheet: Sheet$1,
  },
  create: function create() {
    var app = this;
    app.sheet = Utils.extend(
      {},
      ModalMethods({
        app: app,
        constructor: Sheet$1,
        defaultSelector: '.sheet-modal.modal-in',
      })
    );
  },
  clicks: {
    '.sheet-open': function openSheet($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      if ($$1$1('.sheet-modal.modal-in').length > 0 && data.sheet && $$1$1(data.sheet)[0] !== $$1$1('.sheet-modal.modal-in')[0]) {
        app.sheet.close('.sheet-modal.modal-in');
      }
      app.sheet.open(data.sheet, data.animate);
    },
    '.sheet-close': function closeSheet($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.sheet.close(data.sheet, data.animate);
    },
    '.sheet-backdrop': function closeSheet() {
      var app = this;
      if (!app.params.sheet.closeByBackdropClick) { return; }
      app.sheet.close();
    },
  },
};

var Toast$1 = (function (Modal) {
  function Toast(app, params) {
    var extendedParams = Utils.extend({
      on: {},
    }, app.params.toast, params);

    // Extends with open/close Modal methods;
    Modal.call(this, app, extendedParams);

    var toast = this;

    toast.app = app;

    toast.params = extendedParams;

    var ref = toast.params;
    var closeButton = ref.closeButton;
    var closeTimeout = ref.closeTimeout;

    var $el;
    if (!toast.params.el) {
      // Find Element
      var toastHtml = toast.render();

      $el = $$1$1(toastHtml);
    } else {
      $el = $$1$1(toast.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return toast.destroy();
    }

    Utils.extend(toast, {
      $el: $el,
      el: $el[0],
      type: 'toast',
    });

    $el[0].f7Modal = toast;

    if (closeButton) {
      $el.find('.toast-button').on('click', function () {
        toast.emit('local::closeButtonClick toastCloseButtonClick', toast);
        toast.close();
      });

      toast.on('beforeDestroy', function () {
        $el.find('.toast-button').off('click');
      });
    }

    var timeoutId;
    toast.on('open', function () {
      $$1$1('.toast.modal-in').each(function (index, openedEl) {
        var toastInstance = app.toast.get(openedEl);
        if (openedEl !== toast.el && toastInstance) {
          toastInstance.close();
        }
      });
      if (closeTimeout) {
        timeoutId = Utils.nextTick(function () {
          toast.close();
        }, closeTimeout);
      }
    });
    toast.on('close', function () {
      window.clearTimeout(timeoutId);
    });

    return toast;
  }

  if ( Modal ) Toast.__proto__ = Modal;
  Toast.prototype = Object.create( Modal && Modal.prototype );
  Toast.prototype.constructor = Toast;
  Toast.prototype.render = function render () {
    var toast = this;
    var app = toast.app;
    if (toast.params.render) { return toast.params.render.call(toast, toast); }
    var ref = toast.params;
    var position = ref.position;
    var cssClass = ref.cssClass;
    var icon = ref.icon;
    var text = ref.text;
    var closeButton = ref.closeButton;
    var closeButtonColor = ref.closeButtonColor;
    var closeButtonText = ref.closeButtonText;
    return ("\n      <div class=\"toast toast-" + position + " " + (cssClass || '') + " " + (icon ? 'toast-with-icon' : '') + "\">\n        <div class=\"toast-content\">\n          " + (icon ? ("<div class=\"toast-icon\">" + icon + "</div>") : '') + "\n          <div class=\"toast-text\">" + text + "</div>\n          " + (closeButton && !icon ? ("\n          <a class=\"toast-button " + (app.theme === 'md' ? 'button' : 'link') + " " + (closeButtonColor ? ("color-" + closeButtonColor) : '') + "\">" + closeButtonText + "</a>\n          ").trim() : '') + "\n        </div>\n      </div>\n    ").trim();
  };

  return Toast;
}(Modal$1));

var Toast = {
  name: 'toast',
  static: {
    Toast: Toast$1,
  },
  create: function create() {
    var app = this;
    app.toast = Utils.extend(
      {},
      ModalMethods({
        app: app,
        constructor: Toast$1,
        defaultSelector: '.toast.modal-in',
      })
    );
  },
  params: {
    toast: {
      icon: null,
      text: null,
      position: 'bottom',
      closeButton: false,
      closeButtonColor: null,
      closeButtonText: 'Ok',
      closeTimeout: null,
      cssClass: null,
      render: null,
    },
  },
};

var Preloader = {
  init: function init(el) {
    var app = this;
    if (app.theme !== 'md') { return; }
    var $el = $$1$1(el);
    if ($el.length === 0 || $el.children('.preloader-inner').length > 0) { return; }
    $el.append(Utils.mdPreloaderContent);
  },
  // Modal
  visible: false,
  show: function show(color) {
    if ( color === void 0 ) color = 'white';

    var app = this;
    if (Preloader.visible) { return; }
    var preloaderInner = app.theme !== 'md' ? '' : Utils.mdPreloaderContent;
    $$1$1('html').addClass('with-modal-preloader');
    app.root.append(("\n      <div class=\"preloader-backdrop\"></div>\n      <div class=\"preloader-modal\">\n        <div class=\"preloader color-" + color + "\">" + preloaderInner + "</div>\n      </div>\n    "));
    Preloader.visible = true;
  },
  hide: function hide() {
    var app = this;
    if (!Preloader.visible) { return; }
    $$1$1('html').removeClass('with-modal-preloader');
    app.root.find('.preloader-backdrop, .preloader-modal').remove();
    Preloader.visible = false;
  },
};
var Preloader$1 = {
  name: 'preloader',
  create: function create() {
    var app = this;
    Utils.extend(app, {
      preloader: {
        init: Preloader.init.bind(app),
        show: Preloader.show.bind(app),
        hide: Preloader.hide.bind(app),
      },
    });
  },
  on: {
    photoBrowserOpen: function photoBrowserOpen(pb) {
      var app = this;
      if (app.theme !== 'md') { return; }
      pb.$containerEl.find('.preloader').each(function (index, preloaderEl) {
        app.preloader.init(preloaderEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      if (app.theme !== 'md') { return; }
      page.$el.find('.preloader').each(function (index, preloaderEl) {
        app.preloader.init(preloaderEl);
      });
    },
  },
};

var Progressbar = {
  set: function set() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var app = this;
    var el = args[0];
    var progress = args[1];
    var duration = args[2];
    if (typeof args[0] === 'number') {
      var assign;
      (assign = args, progress = assign[0], duration = assign[1]);
      el = app.root;
    }
    if (typeof progress === 'undefined' || progress === null) { return el; }
    if (!progress) { progress = 0; }

    var $el = $$1$1(el || app.root);
    if ($el.length === 0) {
      return el;
    }
    var progressNormalized = Math.min(Math.max(progress, 0), 100);
    var $progressbarEl;
    if ($el.hasClass('progressbar')) { $progressbarEl = $el.eq(0); }
    else {
      $progressbarEl = $el.children('.progressbar');
    }
    if ($progressbarEl.length === 0 || $progressbarEl.hasClass('progressbar-infinite')) {
      return $progressbarEl;
    }
    var $progressbarLine = $progressbarEl.children('span');
    if ($progressbarLine.length === 0) {
      $progressbarLine = $$1$1('<span></span>');
      $progressbarEl.append($progressbarLine);
    }
    $progressbarLine
      .transition(typeof duration !== 'undefined' ? duration : '')
      .transform(("translate3d(" + ((-100 + progressNormalized)) + "%,0,0)"));

    return $progressbarEl[0];
  },
  show: function show() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var app = this;

    // '.page', 50, 'multi'
    var el = args[0];
    var progress = args[1];
    var color = args[2];
    var type = 'determined';

    if (args.length === 2) {
      if ((typeof args[0] === 'string' || typeof args[0] === 'object') && typeof args[1] === 'string') {
        // '.page', 'multi'
        var assign;
        (assign = args, el = assign[0], color = assign[1], progress = assign[2]);
        type = 'infinite';
      } else if (typeof args[0] === 'number' && typeof args[1] === 'string') {
        // 50, 'multi'
        var assign$1;
        (assign$1 = args, progress = assign$1[0], color = assign$1[1]);
        el = app.root;
      }
    } else if (args.length === 1) {
      if (typeof args[0] === 'number') {
        el = app.root;
        progress = args[0];
      } else if (typeof args[0] === 'string') {
        type = 'infinite';
        el = app.root;
        color = args[0];
      }
    } else if (args.length === 0) {
      type = 'infinite';
      el = app.root;
    }

    var $el = $$1$1(el);
    if ($el.length === 0) { return undefined; }

    var $progressbarEl;
    if ($el.hasClass('progressbar') || $el.hasClass('progressbar-infinite')) {
      $progressbarEl = $el;
    } else {
      $progressbarEl = $el.children('.progressbar:not(.progressbar-out), .progressbar-infinite:not(.progressbar-out)');
      if ($progressbarEl.length === 0) {
        $progressbarEl = $$1$1(("\n          <span class=\"progressbar" + (type === 'infinite' ? '-infinite' : '') + (color ? (" color-" + color) : '') + " progressbar-in\">\n            " + (type === 'infinite' ? '' : '<span></span>') + "\n          </span>"));
        $el.append($progressbarEl);
      }
    }

    if (typeof progress !== 'undefined') {
      app.progressbar.set($progressbarEl, progress);
    }

    return $progressbarEl[0];
  },
  hide: function hide(el, removeAfterHide) {
    if ( removeAfterHide === void 0 ) removeAfterHide = true;

    var app = this;
    var $el = $$1$1(el || app.root);
    if ($el.length === 0) { return undefined; }
    var $progressbarEl;
    if ($el.hasClass('progressbar') || $el.hasClass('progressbar-infinite')) {
      $progressbarEl = $el;
    } else {
      $progressbarEl = $el.children('.progressbar, .progressbar-infinite');
    }
    if ($progressbarEl.length === 0 || !$progressbarEl.hasClass('progressbar-in') || $progressbarEl.hasClass('progressbar-out')) {
      return $progressbarEl;
    }
    $progressbarEl
      .removeClass('progressbar-in')
      .addClass('progressbar-out')
      .animationEnd(function () {
        if (removeAfterHide) {
          $progressbarEl.remove();
        }
      });
    return $progressbarEl;
  },
};

var Progressbar$1 = {
  name: 'progressbar',
  create: function create() {
    var app = this;
    Utils.extend(app, {
      progressbar: {
        set: Progressbar.set.bind(app),
        show: Progressbar.show.bind(app),
        hide: Progressbar.hide.bind(app),
      },
    });
  },
  on: {
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.progressbar').each(function (index, progressbarEl) {
        var $progressbarEl = $$1$1(progressbarEl);
        app.progressbar.set($progressbarEl, $progressbarEl.attr('data-progress'));
      });
    },
  },
};

var Sortable = {
  init: function init() {
    var app = this;
    var isTouched;
    var isMoved;
    var touchStartY;
    var touchesDiff;
    var $sortingEl;
    var $sortingItems;
    var $sortableContainer;
    var sortingElHeight;
    var minTop;
    var maxTop;
    var $insertAfterEl;
    var $insertBeforeEl;
    var indexFrom;
    var $pageEl;
    var $pageContentEl;
    var pageHeight;
    var pageOffset;
    var sortingElOffsetLocal;
    var sortingElOffsetTop;
    var initialScrollTop;

    function handleTouchStart(e) {
      isMoved = false;
      isTouched = true;
      touchStartY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      $sortingEl = $$1$1(this).parent('li');
      indexFrom = $sortingEl.index();
      $sortableContainer = $sortingEl.parents('.sortable');
      $sortingItems = $sortableContainer.children('ul').children('li');
      if (app.panel) { app.panel.allowOpen = false; }
      if (app.swipeout) { app.swipeout.allow = false; }
    }
    function handleTouchMove(e) {
      if (!isTouched || !$sortingEl) { return; }
      var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      if (!isMoved) {
        $pageEl = $sortingEl.parents('.page');
        $pageContentEl = $sortingEl.parents('.page-content');
        var paddingTop = parseInt($pageContentEl.css('padding-top'), 10);
        var paddingBottom = parseInt($pageContentEl.css('padding-bottom'), 10);
        initialScrollTop = $pageContentEl[0].scrollTop;
        pageOffset = $pageEl.offset().top + paddingTop;
        pageHeight = $pageEl.height() - paddingTop - paddingBottom;
        $sortingEl.addClass('sorting');
        $sortableContainer.addClass('sortable-sorting');
        sortingElOffsetLocal = $sortingEl[0].offsetTop;
        minTop = $sortingEl[0].offsetTop;
        maxTop = $sortingEl.parent().height() - sortingElOffsetLocal - $sortingEl.height();
        sortingElHeight = $sortingEl[0].offsetHeight;
        sortingElOffsetTop = $sortingEl.offset().top;
      }
      isMoved = true;

      e.preventDefault();
      e.f7PreventSwipePanel = true;

      touchesDiff = pageY - touchStartY;

      var translateScrollOffset = $pageContentEl[0].scrollTop - initialScrollTop;
      var translate = Math.min(Math.max(touchesDiff + translateScrollOffset, -minTop), maxTop);
      $sortingEl.transform(("translate3d(0," + translate + "px,0)"));

      var scrollAddition = 44;
      var allowScroll = true;
      if ((touchesDiff + translateScrollOffset) + scrollAddition < -minTop) {
        allowScroll = false;
      }
      if ((touchesDiff + translateScrollOffset) - scrollAddition > maxTop) {
        allowScroll = false;
      }

      $insertBeforeEl = undefined;
      $insertAfterEl = undefined;

      var scrollDiff;
      if (allowScroll) {
        if (sortingElOffsetTop + touchesDiff + sortingElHeight + scrollAddition > pageOffset + pageHeight) {
          // To Bottom
          scrollDiff = (sortingElOffsetTop + touchesDiff + sortingElHeight + scrollAddition) - (pageOffset + pageHeight);
        }
        if (sortingElOffsetTop + touchesDiff < pageOffset + scrollAddition) {
          // To Top
          scrollDiff = (sortingElOffsetTop + touchesDiff) - pageOffset - scrollAddition;
        }
        if (scrollDiff) {
          $pageContentEl[0].scrollTop += scrollDiff;
        }
      }

      $sortingItems.each(function (index, el) {
        var $currentEl = $$1$1(el);
        if ($currentEl[0] === $sortingEl[0]) { return; }
        var currentElOffset = $currentEl[0].offsetTop;
        var currentElHeight = $currentEl.height();
        var sortingElOffset = sortingElOffsetLocal + translate;

        if ((sortingElOffset >= currentElOffset - (currentElHeight / 2)) && $sortingEl.index() < $currentEl.index()) {
          $currentEl.transform(("translate3d(0, " + (-sortingElHeight) + "px,0)"));
          $insertAfterEl = $currentEl;
          $insertBeforeEl = undefined;
        } else if ((sortingElOffset <= currentElOffset + (currentElHeight / 2)) && $sortingEl.index() > $currentEl.index()) {
          $currentEl.transform(("translate3d(0, " + sortingElHeight + "px,0)"));
          $insertAfterEl = undefined;
          if (!$insertBeforeEl) { $insertBeforeEl = $currentEl; }
        } else {
          $currentEl.transform('translate3d(0, 0%,0)');
        }
      });
    }
    function handleTouchEnd() {
      if (!isTouched || !isMoved) {
        isTouched = false;
        isMoved = false;
        if (isTouched && !isMoved) {
          if (app.panel) { app.panel.allowOpen = true; }
          if (app.swipeout) { app.swipeout.allow = true; }
        }
        return;
      }
      if (app.panel) { app.panel.allowOpen = true; }
      if (app.swipeout) { app.swipeout.allow = true; }

      $sortingItems.transform('');
      $sortingEl.removeClass('sorting');
      $sortableContainer.removeClass('sortable-sorting');

      var virtualList;
      var oldIndex;
      var newIndex;
      if ($insertAfterEl) {
        $sortingEl.insertAfter($insertAfterEl);
      }
      if ($insertBeforeEl) {
        $sortingEl.insertBefore($insertBeforeEl);
      }

      $sortingEl.trigger('sortable:sort', { from: indexFrom, to: $sortingEl.index() });
      app.emit('sortableSort', $sortingEl[0], { from: indexFrom, to: $sortingEl.index() });

      if (($insertAfterEl || $insertBeforeEl) && $sortableContainer.hasClass('virtual-list')) {
        virtualList = $sortableContainer[0].f7VirtualList;
        oldIndex = $sortingEl[0].f7VirtualListIndex;
        newIndex = $insertBeforeEl ? $insertBeforeEl[0].f7VirtualListIndex : $insertAfterEl[0].f7VirtualListIndex;
        if (virtualList) { virtualList.moveItem(oldIndex, newIndex); }
      }
      $insertBeforeEl = undefined;
      $insertAfterEl = undefined;
      isTouched = false;
      isMoved = false;
    }

    var activeListener = app.support.passiveListener ? { passive: false, capture: false } : false;

    $$1$1(document).on(app.touchEvents.start, '.list.sortable .sortable-handler', handleTouchStart, activeListener);
    app.on('touchmove:active', handleTouchMove);
    app.on('touchend:passive', handleTouchEnd);
  },
  enable: function enable(el) {
    if ( el === void 0 ) el = '.list.sortable';

    var app = this;
    var $el = $$1$1(el);
    if ($el.length === 0) { return; }
    $el.addClass('sortable-enabled');
    $el.trigger('sortable:enable');
    app.emit('sortableEnable', $el[0]);
  },
  disable: function disable(el) {
    if ( el === void 0 ) el = '.list.sortable';

    var app = this;
    var $el = $$1$1(el);
    if ($el.length === 0) { return; }
    $el.removeClass('sortable-enabled');
    $el.trigger('sortable:disable');
    app.emit('sortableDisable', $el[0]);
  },
  toggle: function toggle(el) {
    if ( el === void 0 ) el = '.list.sortable';

    var app = this;
    var $el = $$1$1(el);
    if ($el.length === 0) { return; }
    if ($el.hasClass('sortable-enabled')) {
      app.sortable.disable($el);
    } else {
      app.sortable.enable($el);
    }
  },
};
var Sortable$1 = {
  name: 'sortable',
  params: {
    sortable: true,
  },
  create: function create() {
    var app = this;
    Utils.extend(app, {
      sortable: {
        init: Sortable.init.bind(app),
        enable: Sortable.enable.bind(app),
        disable: Sortable.disable.bind(app),
        toggle: Sortable.toggle.bind(app),
      },
    });
  },
  on: {
    init: function init() {
      var app = this;
      if (app.params.sortable) { app.sortable.init(); }
    },
  },
  clicks: {
    '.sortable-enable': function enable($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.sortable.enable(data.sortable);
    },
    '.sortable-disable': function disable($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.sortable.disable(data.sortable);
    },
    '.sortable-toggle': function toggle($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.sortable.toggle(data.sortable);
    },
  },
};

var Swipeout = {
  init: function init() {
    var app = this;
    var touchesStart = {};
    var isTouched;
    var isMoved;
    var isScrolling;
    var touchStartTime;
    var touchesDiff;
    var $swipeoutEl;
    var $swipeoutContent;
    var $actionsRight;
    var $actionsLeft;
    var actionsLeftWidth;
    var actionsRightWidth;
    var translate;
    var opened;
    var openedActionsSide;
    var $leftButtons;
    var $rightButtons;
    var direction;
    var $overswipeLeftButton;
    var $overswipeRightButton;
    var overswipeLeft;
    var overswipeRight;

    function handleTouchStart(e) {
      if (!Swipeout.allow) { return; }
      isMoved = false;
      isTouched = true;
      isScrolling = undefined;
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      touchStartTime = (new Date()).getTime();
      $swipeoutEl = $$1$1(this);
    }
    function handleTouchMove(e) {
      if (!isTouched) { return; }
      var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      if (isScrolling) {
        isTouched = false;
        return;
      }

      if (!isMoved) {
        if ($$1$1('.list.sortable-opened').length > 0) { return; }
        $swipeoutContent = $swipeoutEl.find('.swipeout-content');
        $actionsRight = $swipeoutEl.find('.swipeout-actions-right');
        $actionsLeft = $swipeoutEl.find('.swipeout-actions-left');
        actionsLeftWidth = null;
        actionsRightWidth = null;
        $leftButtons = null;
        $rightButtons = null;
        $overswipeRightButton = null;
        $overswipeLeftButton = null;
        if ($actionsLeft.length > 0) {
          actionsLeftWidth = $actionsLeft.outerWidth();
          $leftButtons = $actionsLeft.children('a');
          $overswipeLeftButton = $actionsLeft.find('.swipeout-overswipe');
        }
        if ($actionsRight.length > 0) {
          actionsRightWidth = $actionsRight.outerWidth();
          $rightButtons = $actionsRight.children('a');
          $overswipeRightButton = $actionsRight.find('.swipeout-overswipe');
        }
        opened = $swipeoutEl.hasClass('swipeout-opened');
        if (opened) {
          openedActionsSide = $swipeoutEl.find('.swipeout-actions-left.swipeout-actions-opened').length > 0 ? 'left' : 'right';
        }
        $swipeoutEl.removeClass('swipeout-transitioning');
        if (!app.params.swipeout.noFollow) {
          $swipeoutEl.find('.swipeout-actions-opened').removeClass('swipeout-actions-opened');
          $swipeoutEl.removeClass('swipeout-opened');
        }
      }
      isMoved = true;
      e.preventDefault();

      touchesDiff = pageX - touchesStart.x;
      translate = touchesDiff;

      if (opened) {
        if (openedActionsSide === 'right') { translate -= actionsRightWidth; }
        else { translate += actionsLeftWidth; }
      }

      if (
        (translate > 0 && $actionsLeft.length === 0)
        ||
        (translate < 0 && $actionsRight.length === 0)
      ) {
        if (!opened) {
          isTouched = false;
          isMoved = false;
          $swipeoutContent.transform('');
          if ($rightButtons && $rightButtons.length > 0) {
            $rightButtons.transform('');
          }
          if ($leftButtons && $leftButtons.length > 0) {
            $leftButtons.transform('');
          }
          return;
        }
        translate = 0;
      }

      if (translate < 0) { direction = 'to-left'; }
      else if (translate > 0) { direction = 'to-right'; }
      else if (!direction) { direction = 'to-left'; }

      var buttonOffset;
      var progress;

      e.f7PreventSwipePanel = true;
      if (app.params.swipeout.noFollow) {
        if (opened) {
          if (openedActionsSide === 'right' && touchesDiff > 0) {
            app.swipeout.close($swipeoutEl);
          }
          if (openedActionsSide === 'left' && touchesDiff < 0) {
            app.swipeout.close($swipeoutEl);
          }
        } else {
          if (touchesDiff < 0 && $actionsRight.length > 0) {
            app.swipeout.open($swipeoutEl, 'right');
          }
          if (touchesDiff > 0 && $actionsLeft.length > 0) {
            app.swipeout.open($swipeoutEl, 'left');
          }
        }
        isTouched = false;
        isMoved = false;
        return;
      }
      overswipeLeft = false;
      overswipeRight = false;
      if ($actionsRight.length > 0) {
        // Show right actions
        var buttonTranslate = translate;
        progress = buttonTranslate / actionsRightWidth;
        if (buttonTranslate < -actionsRightWidth) {
          buttonTranslate = -actionsRightWidth - (Math.pow( (-buttonTranslate - actionsRightWidth), 0.8 ));
          translate = buttonTranslate;
          if ($overswipeRightButton.length > 0) {
            overswipeRight = true;
          }
        }
        if (direction !== 'to-left') {
          progress = 0;
          buttonTranslate = 0;
        }
        $rightButtons.each(function (index, buttonEl) {
          var $buttonEl = $$1$1(buttonEl);
          if (typeof buttonEl.f7SwipeoutButtonOffset === 'undefined') {
            $buttonEl[0].f7SwipeoutButtonOffset = buttonEl.offsetLeft;
          }
          buttonOffset = buttonEl.f7SwipeoutButtonOffset;
          if ($overswipeRightButton.length > 0 && $buttonEl.hasClass('swipeout-overswipe') && direction === 'to-left') {
            $buttonEl.css({ left: ((overswipeRight ? -buttonOffset : 0) + "px") });
            if (overswipeRight) {
              $buttonEl.addClass('swipeout-overswipe-active');
            } else {
              $buttonEl.removeClass('swipeout-overswipe-active');
            }
          }
          $buttonEl.transform(("translate3d(" + (buttonTranslate - (buttonOffset * (1 + Math.max(progress, -1)))) + "px,0,0)"));
        });
      }
      if ($actionsLeft.length > 0) {
        // Show left actions
        var buttonTranslate$1 = translate;
        progress = buttonTranslate$1 / actionsLeftWidth;
        if (buttonTranslate$1 > actionsLeftWidth) {
          buttonTranslate$1 = actionsLeftWidth + (Math.pow( (buttonTranslate$1 - actionsLeftWidth), 0.8 ));
          translate = buttonTranslate$1;
          if ($overswipeLeftButton.length > 0) {
            overswipeLeft = true;
          }
        }
        if (direction !== 'to-right') {
          buttonTranslate$1 = 0;
          progress = 0;
        }
        $leftButtons.each(function (index, buttonEl) {
          var $buttonEl = $$1$1(buttonEl);
          if (typeof buttonEl.f7SwipeoutButtonOffset === 'undefined') {
            $buttonEl[0].f7SwipeoutButtonOffset = actionsLeftWidth - buttonEl.offsetLeft - buttonEl.offsetWidth;
          }
          buttonOffset = buttonEl.f7SwipeoutButtonOffset;
          if ($overswipeLeftButton.length > 0 && $buttonEl.hasClass('swipeout-overswipe') && direction === 'to-right') {
            $buttonEl.css({ left: ((overswipeLeft ? buttonOffset : 0) + "px") });
            if (overswipeLeft) {
              $buttonEl.addClass('swipeout-overswipe-active');
            } else {
              $buttonEl.removeClass('swipeout-overswipe-active');
            }
          }
          if ($leftButtons.length > 1) {
            $buttonEl.css('z-index', $leftButtons.length - index);
          }
          $buttonEl.transform(("translate3d(" + (buttonTranslate$1 + (buttonOffset * (1 - Math.min(progress, 1)))) + "px,0,0)"));
        });
      }
      $swipeoutEl.trigger('swipeout', progress);
      app.emit('swipeout', $swipeoutEl[0], progress);
      $swipeoutContent.transform(("translate3d(" + translate + "px,0,0)"));
    }
    function handleTouchEnd() {
      if (!isTouched || !isMoved) {
        isTouched = false;
        isMoved = false;
        return;
      }

      isTouched = false;
      isMoved = false;
      var timeDiff = (new Date()).getTime() - touchStartTime;
      var $actions = direction === 'to-left' ? $actionsRight : $actionsLeft;
      var actionsWidth = direction === 'to-left' ? actionsRightWidth : actionsLeftWidth;
      var action;
      var $buttons;
      var i;

      if (
        (
          timeDiff < 300
          &&
          (
            (touchesDiff < -10 && direction === 'to-left')
            ||
            (touchesDiff > 10 && direction === 'to-right')
          )
        )
        ||
        (
          timeDiff >= 300
          &&
          (Math.abs(translate) > actionsWidth / 2)
        )
      ) {
        action = 'open';
      } else {
        action = 'close';
      }
      if (timeDiff < 300) {
        if (Math.abs(translate) === 0) { action = 'close'; }
        if (Math.abs(translate) === actionsWidth) { action = 'open'; }
      }

      if (action === 'open') {
        Swipeout.el = $swipeoutEl[0];
        $swipeoutEl.trigger('swipeout:open');
        app.emit('swipeoutOpen', $swipeoutEl[0]);
        $swipeoutEl.addClass('swipeout-opened swipeout-transitioning');
        var newTranslate = direction === 'to-left' ? -actionsWidth : actionsWidth;
        $swipeoutContent.transform(("translate3d(" + newTranslate + "px,0,0)"));
        $actions.addClass('swipeout-actions-opened');
        $buttons = direction === 'to-left' ? $rightButtons : $leftButtons;
        if ($buttons) {
          for (i = 0; i < $buttons.length; i += 1) {
            $$1$1($buttons[i]).transform(("translate3d(" + newTranslate + "px,0,0)"));
          }
        }
        if (overswipeRight) {
          $actionsRight.find('.swipeout-overswipe')[0].click();
        }
        if (overswipeLeft) {
          $actionsLeft.find('.swipeout-overswipe')[0].click();
        }
      } else {
        $swipeoutEl.trigger('swipeout:close');
        app.emit('swipeoutClose', $swipeoutEl[0]);
        Swipeout.el = undefined;
        $swipeoutEl.addClass('swipeout-transitioning').removeClass('swipeout-opened');
        $swipeoutContent.transform('');
        $actions.removeClass('swipeout-actions-opened');
      }

      var buttonOffset;
      if ($leftButtons && $leftButtons.length > 0 && $leftButtons !== $buttons) {
        $leftButtons.each(function (index, buttonEl) {
          var $buttonEl = $$1$1(buttonEl);
          buttonOffset = buttonEl.f7SwipeoutButtonOffset;
          if (typeof buttonOffset === 'undefined') {
            $buttonEl[0].f7SwipeoutButtonOffset = actionsLeftWidth - buttonEl.offsetLeft - buttonEl.offsetWidth;
          }
          $buttonEl.transform(("translate3d(" + buttonOffset + "px,0,0)"));
        });
      }
      if ($rightButtons && $rightButtons.length > 0 && $rightButtons !== $buttons) {
        $rightButtons.each(function (index, buttonEl) {
          var $buttonEl = $$1$1(buttonEl);
          buttonOffset = buttonEl.f7SwipeoutButtonOffset;
          if (typeof buttonOffset === 'undefined') {
            $buttonEl[0].f7SwipeoutButtonOffset = buttonEl.offsetLeft;
          }
          $buttonEl.transform(("translate3d(" + (-buttonOffset) + "px,0,0)"));
        });
      }
      $swipeoutContent.transitionEnd(function () {
        if ((opened && action === 'open') || (!opened && action === 'close')) { return; }
        $swipeoutEl.trigger(action === 'open' ? 'swipeout:opened' : 'swipeout:closed');
        app.emit(action === 'open' ? 'swipeoutOpened' : 'swipeoutClosed', $swipeoutEl[0]);
        $swipeoutEl.removeClass('swipeout-transitioning');
        if (opened && action === 'close') {
          if ($actionsRight.length > 0) {
            $rightButtons.transform('');
          }
          if ($actionsLeft.length > 0) {
            $leftButtons.transform('');
          }
        }
      });
    }

    var passiveListener = app.support.passiveListener ? { passive: true } : false;

    app.on('touchstart', function (e) {
      if (Swipeout.el) {
        var $targetEl = $$1$1(e.target);
        if (!(
          $$1$1(Swipeout.el).is($targetEl[0]) ||
          $targetEl.parents('.swipeout').is(Swipeout.el) ||
          $targetEl.hasClass('modal-in') ||
          $targetEl[0].className.indexOf('-backdrop') > 0 ||
          $targetEl.hasClass('actions-modal') ||
          $targetEl.parents('.actions-modal.modal-in, .dialog.modal-in').length > 0
        )) {
          app.swipeout.close(Swipeout.el);
        }
      }
    });
    $$1$1(document).on(app.touchEvents.start, 'li.swipeout', handleTouchStart, passiveListener);
    app.on('touchmove:active', handleTouchMove);
    app.on('touchend:passive', handleTouchEnd);
  },
  allow: true,
  el: undefined,
  open: function open() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var app = this;
    var el = args[0];
    var side = args[1];
    var callback = args[2];
    if (typeof args[1] === 'function') {
      var assign;
      (assign = args, el = assign[0], callback = assign[1], side = assign[2]);
    }
    var $el = $$1$1(el).eq(0);

    if ($el.length === 0) { return; }
    if (!$el.hasClass('swipeout') || $el.hasClass('swipeout-opened')) { return; }
    if (!side) {
      if ($el.find('.swipeout-actions-right').length > 0) { side = 'right'; }
      else { side = 'left'; }
    }
    var $swipeoutActions = $el.find((".swipeout-actions-" + side));
    var $swipeoutContent = $el.find('.swipeout-content');
    if ($swipeoutActions.length === 0) { return; }
    $el.trigger('swipeout:open').addClass('swipeout-opened').removeClass('swipeout-transitioning');
    app.emit('swipeoutOpen', $el[0]);
    $swipeoutActions.addClass('swipeout-actions-opened');
    var $buttons = $swipeoutActions.children('a');
    var swipeoutActionsWidth = $swipeoutActions.outerWidth();
    var translate = side === 'right' ? -swipeoutActionsWidth : swipeoutActionsWidth;
    if ($buttons.length > 1) {
      $buttons.each(function (buttonIndex, buttonEl) {
        var $buttonEl = $$1$1(buttonEl);
        if (side === 'right') {
          $buttonEl.transform(("translate3d(" + (-buttonEl.offsetLeft) + "px,0,0)"));
        } else {
          $buttonEl.css('z-index', $buttons.length - buttonIndex).transform(("translate3d(" + (swipeoutActionsWidth - buttonEl.offsetWidth - buttonEl.offsetLeft) + "px,0,0)"));
        }
      });
    }
    $el.addClass('swipeout-transitioning');
    $swipeoutContent.transitionEnd(function () {
      $el.trigger('swipeout:opened');
      app.emit('swipeoutOpened', $el[0]);
      if (callback) { callback.call($el[0]); }
    });
    Utils.nextFrame(function () {
      $buttons.transform(("translate3d(" + translate + "px,0,0)"));
      $swipeoutContent.transform(("translate3d(" + translate + "px,0,0)"));
    });
    Swipeout.el = $el[0];
  },
  close: function close(el, callback) {
    var app = this;
    var $el = $$1$1(el).eq(0);
    if ($el.length === 0) { return; }
    if (!$el.hasClass('swipeout-opened')) { return; }
    var side = $el.find('.swipeout-actions-opened').hasClass('swipeout-actions-right') ? 'right' : 'left';
    var $swipeoutActions = $el.find('.swipeout-actions-opened').removeClass('swipeout-actions-opened');
    var $buttons = $swipeoutActions.children('a');
    var swipeoutActionsWidth = $swipeoutActions.outerWidth();
    Swipeout.allow = false;
    $el.trigger('swipeout:close');
    app.emit('swipeoutClose', $el[0]);
    $el.removeClass('swipeout-opened').addClass('swipeout-transitioning');

    var closeTimeout;
    function onSwipeoutClose() {
      Swipeout.allow = true;
      if ($el.hasClass('swipeout-opened')) { return; }
      $el.removeClass('swipeout-transitioning');
      $buttons.transform('');
      $el.trigger('swipeout:closed');
      app.emit('swipeoutClosed', $el[0]);
      if (callback) { callback.call($el[0]); }
      if (closeTimeout) { clearTimeout(closeTimeout); }
    }
    $el.find('.swipeout-content').transform('').transitionEnd(onSwipeoutClose);
    closeTimeout = setTimeout(onSwipeoutClose, 500);

    $buttons.each(function (index, buttonEl) {
      var $buttonEl = $$1$1(buttonEl);
      if (side === 'right') {
        $buttonEl.transform(("translate3d(" + (-buttonEl.offsetLeft) + "px,0,0)"));
      } else {
        $buttonEl.transform(("translate3d(" + (swipeoutActionsWidth - buttonEl.offsetWidth - buttonEl.offsetLeft) + "px,0,0)"));
      }
      $buttonEl.css({ left: '0px' }).removeClass('swipeout-overswipe-active');
    });
    if (Swipeout.el && Swipeout.el === $el[0]) { Swipeout.el = undefined; }
  },
  delete: function delete$1(el, callback) {
    var app = this;
    var $el = $$1$1(el).eq(0);
    if ($el.length === 0) { return; }
    Swipeout.el = undefined;
    $el.trigger('swipeout:delete');
    app.emit('swipeoutDelete', $el[0]);
    $el.css({ height: (($el.outerHeight()) + "px") });
    $el.transitionEnd(function () {
      $el.trigger('swipeout:deleted');
      app.emit('swipeoutDeleted', $el[0]);
      if (callback) { callback.call($el[0]); }
      if ($el.parents('.virtual-list').length > 0) {
        var virtualList = $el.parents('.virtual-list')[0].f7VirtualList;
        var virtualIndex = $el[0].f7VirtualListIndex;
        if (virtualList && typeof virtualIndex !== 'undefined') { virtualList.deleteItem(virtualIndex); }
      } else if (app.params.swipeout.removeElements) {
        if (app.params.swipeout.removeElementsWithTimeout) {
          setTimeout(function () {
            $el.remove();
          }, app.params.swipeout.removeElementsTimeout);
        } else {
          $el.remove();
        }
      } else {
        $el.removeClass('swipeout-deleting swipeout-transitioning');
      }
    });
    Utils.nextFrame(function () {
      $el
        .addClass('swipeout-deleting swipeout-transitioning')
        .css({ height: '0px' })
        .find('.swipeout-content')
        .transform('translate3d(-100%,0,0)');
    });
  },
};
var Swipeout$1 = {
  name: 'swipeout',
  params: {
    swipeout: {
      actionsNoFold: false,
      noFollow: false,
      removeElements: true,
      removeElementsWithTimeout: false,
      removeElementsTimeout: 0,
    },
  },
  create: function create() {
    var app = this;
    Utils.extend(app, {
      swipeout: {
        init: Swipeout.init.bind(app),
        open: Swipeout.open.bind(app),
        close: Swipeout.close.bind(app),
        delete: Swipeout.delete.bind(app),
      },
    });
    Object.defineProperty(app.swipeout, 'el', {
      enumerable: true,
      configurable: true,
      get: function () { return Swipeout.el; },
      set: function set(el) {
        Swipeout.el = el;
      },
    });
    Object.defineProperty(app.swipeout, 'allow', {
      enumerable: true,
      configurable: true,
      get: function () { return Swipeout.allow; },
      set: function set(allow) {
        Swipeout.allow = allow;
      },
    });
  },
  clicks: {
    '.swipeout-open': function openSwipeout($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.swipeout.open(data.swipeout, data.side);
    },
    '.swipeout-close': function closeSwipeout($clickedEl) {
      var app = this;
      var $swipeoutEl = $clickedEl.closest('.swipeout');
      if ($swipeoutEl.length === 0) { return; }
      app.swipeout.close($swipeoutEl);
    },
    '.swipeout-delete': function deleteSwipeout($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      var $swipeoutEl = $clickedEl.closest('.swipeout');
      if ($swipeoutEl.length === 0) { return; }
      var confirm = data.confirm;
      var confirmTitle = data.confirmTitle;
      if (data.confirm) {
        app.dialog.confirm(confirm, confirmTitle, function () {
          app.swipeout.delete($swipeoutEl);
        });
      } else {
        app.swipeout.delete($swipeoutEl);
      }
    },
  },
  on: {
    init: function init() {
      var app = this;
      if (!app.params.swipeout) { return; }
      app.swipeout.init();
    },
  },
};

var Accordion = {
  toggleClicked: function toggleClicked($clickedEl) {
    var app = this;
    var $accordionItemEl = $clickedEl.closest('.accordion-item').eq(0);
    if (!$accordionItemEl.length) { $accordionItemEl = $clickedEl.parents('li').eq(0); }
    app.accordion.toggle($accordionItemEl);
  },
  open: function open(el) {
    var app = this;
    var $el = $$1$1(el);
    var $list = $el.parents('.accordion-list').eq(0);
    var $contentEl = $el.children('.accordion-item-content');
    if ($contentEl.length === 0) { $contentEl = $el.find('.accordion-item-content'); }
    if ($contentEl.length === 0) { return; }
    var $openedItem = $list.length > 0 && $el.parent().children('.accordion-item-opened');
    if ($openedItem.length > 0) {
      app.accordion.close($openedItem);
    }
    $contentEl.transitionEnd(function () {
      if ($el.hasClass('accordion-item-opened')) {
        $contentEl.css('height', '');
        $contentEl.transition('');
        $el.trigger('accordion:opened');
        app.emit('accordionOpened', $el[0]);
      } else {
        $contentEl.css('height', '');
        $el.trigger('accordion:closed');
        app.emit('accordionClosed', $el[0]);
      }
    });
    $contentEl.css('height', (($contentEl[0].scrollHeight) + "px"));
    $el.trigger('accordion:open');
    $el.addClass('accordion-item-opened');
    app.emit('accordionOpen', $el[0]);
  },
  close: function close(el) {
    var app = this;
    var $el = $$1$1(el);
    var $contentEl = $el.children('.accordion-item-content');
    if ($contentEl.length === 0) { $contentEl = $el.find('.accordion-item-content'); }
    $el.removeClass('accordion-item-opened');
    $contentEl.transition(0);
    $contentEl.css('height', (($contentEl[0].scrollHeight) + "px"));
    // Close
    $contentEl.transitionEnd(function () {
      if ($el.hasClass('accordion-item-opened')) {
        $contentEl.css('height', '');
        $contentEl.transition('');
        $el.trigger('accordion:opened');
        app.emit('accordionOpened', $el[0]);
      } else {
        $contentEl.css('height', '');
        $el.trigger('accordion:closed');
        app.emit('accordionClosed', $el[0]);
      }
    });
    Utils.nextFrame(function () {
      $contentEl.transition('');
      $contentEl.css('height', '');
      $el.trigger('accordion:close');
      app.emit('accordionClose');
    });
  },
  toggle: function toggle(el) {
    var app = this;
    var $el = $$1$1(el);
    if ($el.length === 0) { return; }
    if ($el.hasClass('accordion-item-opened')) { app.accordion.close(el); }
    else { app.accordion.open(el); }
  },
};

var Accordion$1 = {
  name: 'accordion',
  create: function create() {
    var app = this;
    Utils.extend(app, {
      accordion: {
        open: Accordion.open.bind(app),
        close: Accordion.close.bind(app),
        toggle: Accordion.toggle.bind(app),
      },
    });
  },
  clicks: {
    '.accordion-item .item-link, .accordion-item-toggle, .links-list.accordion-list > ul > li > a': function open($clickedEl) {
      var app = this;
      Accordion.toggleClicked.call(app, $clickedEl);
    },
  },
};

var VirtualList$1 = (function (Framework7Class$$1) {
  function VirtualList(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);
    var vl = this;

    var defaults = {
      cols: 1,
      height: app.theme === 'md' ? 48 : 44,
      cache: true,
      dynamicHeightBufferSize: 1,
      showFilteredItemsOnly: false,
      renderExternal: undefined,
      setListHeight: true,
      searchByItem: undefined,
      searchAll: undefined,
      itemTemplate: undefined,
      renderItem: function renderItem(item) {
        return ("\n          <li>\n            <div class=\"item-content\">\n              <div class=\"item-inner\">\n                <div class=\"item-title\">" + item + "</div>\n              </div>\n            </div>\n          </li>\n        ").trim();
      },
      on: {},
    };

    // Extend defaults with modules params
    vl.useModulesParams(defaults);

    vl.params = Utils.extend(defaults, params);
    if (vl.params.height === undefined || !vl.params.height) {
      vl.params.height = app.theme === 'md' ? 48 : 44;
    }

    vl.$el = $$1$1(params.el);
    vl.el = vl.$el[0];

    if (vl.$el.length === 0) { return undefined; }
    vl.$el[0].f7VirtualList = vl;

    vl.items = vl.params.items;
    if (vl.params.showFilteredItemsOnly) {
      vl.filteredItems = [];
    }
    if (vl.params.itemTemplate) {
      if (typeof vl.params.itemTemplate === 'string') { vl.renderItem = Template7.compile(vl.params.itemTemplate); }
      else if (typeof vl.params.itemTemplate === 'function') { vl.renderItem = vl.params.itemTemplate; }
    } else if (vl.params.renderItem) {
      vl.renderItem = vl.params.renderItem;
    }
    vl.$pageContentEl = vl.$el.parents('.page-content');

    // Bad scroll
    if (typeof vl.params.updatableScroll !== 'undefined') {
      vl.updatableScroll = vl.params.updatableScroll;
    } else {
      vl.updatableScroll = true;
      if (Device.ios && Device.osVersion.split('.')[0] < 8) {
        vl.updatableScroll = false;
      }
    }

    // Append <ul>
    vl.$ul = vl.params.ul ? $$1$1(vl.params.ul) : vl.$el.children('ul');
    if (vl.$ul.length === 0) {
      vl.$el.append('<ul></ul>');
      vl.$ul = vl.$el.children('ul');
    }
    vl.ul = vl.$ul[0];

    Utils.extend(vl, {
      // DOM cached items
      domCache: {},
      displayDomCache: {},
      // Temporary DOM Element
      tempDomElement: document.createElement('ul'),
      // Last repain position
      lastRepaintY: null,
      // Fragment
      fragment: document.createDocumentFragment(),
      // Props
      pageHeight: undefined,
      rowsPerScreen: undefined,
      rowsBefore: undefined,
      rowsAfter: undefined,
      rowsToRender: undefined,
      maxBufferHeight: 0,
      listHeight: undefined,
      dynamicHeight: typeof vl.params.height === 'function',
    });

    // Install Modules
    vl.useModules();

    // Attach events
    var handleScrollBound = vl.handleScroll.bind(vl);
    var handleResizeBound = vl.handleResize.bind(vl);
    var $pageEl;
    var $tabEl;
    var $panelEl;
    var $popupEl;
    vl.attachEvents = function attachEvents() {
      $pageEl = vl.$el.parents('.page').eq(0);
      $tabEl = vl.$el.parents('.tab').eq(0);
      $panelEl = vl.$el.parents('.panel').eq(0);
      $popupEl = vl.$el.parents('.popup').eq(0);

      vl.$pageContentEl.on('scroll', handleScrollBound);
      if ($pageEl) { $pageEl.on('page:reinit', handleResizeBound); }
      if ($tabEl) { $tabEl.on('tab:show', handleResizeBound); }
      if ($panelEl) { $panelEl.on('panel:open', handleResizeBound); }
      if ($popupEl) { $popupEl.on('popup:open', handleResizeBound); }
      app.on('resize', handleResizeBound);
    };
    vl.detachEvents = function attachEvents() {
      vl.$pageContentEl.off('scroll', handleScrollBound);
      if ($pageEl) { $pageEl.off('page:reinit', handleResizeBound); }
      if ($tabEl) { $tabEl.off('tab:show', handleResizeBound); }
      if ($panelEl) { $panelEl.off('panel:open', handleResizeBound); }
      if ($popupEl) { $popupEl.off('popup:open', handleResizeBound); }
      app.off('resize', handleResizeBound);
    };
    // Init
    vl.init();

    return vl;
  }

  if ( Framework7Class$$1 ) VirtualList.__proto__ = Framework7Class$$1;
  VirtualList.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  VirtualList.prototype.constructor = VirtualList;
  VirtualList.prototype.setListSize = function setListSize () {
    var vl = this;
    var items = vl.filteredItems || vl.items;
    vl.pageHeight = vl.$pageContentEl[0].offsetHeight;
    if (vl.dynamicHeight) {
      vl.listHeight = 0;
      vl.heights = [];
      for (var i = 0; i < items.length; i += 1) {
        var itemHeight = vl.params.height(items[i]);
        vl.listHeight += itemHeight;
        vl.heights.push(itemHeight);
      }
    } else {
      vl.listHeight = Math.ceil(items.length / vl.params.cols) * vl.params.height;
      vl.rowsPerScreen = Math.ceil(vl.pageHeight / vl.params.height);
      vl.rowsBefore = vl.params.rowsBefore || vl.rowsPerScreen * 2;
      vl.rowsAfter = vl.params.rowsAfter || vl.rowsPerScreen;
      vl.rowsToRender = (vl.rowsPerScreen + vl.rowsBefore + vl.rowsAfter);
      vl.maxBufferHeight = (vl.rowsBefore / 2) * vl.params.height;
    }

    if (vl.updatableScroll || vl.params.setListHeight) {
      vl.$ul.css({ height: ((vl.listHeight) + "px") });
    }
  };
  VirtualList.prototype.render = function render (force, forceScrollTop) {
    var vl = this;
    if (force) { vl.lastRepaintY = null; }

    var scrollTop = -(vl.$el[0].getBoundingClientRect().top - vl.$pageContentEl[0].getBoundingClientRect().top);

    if (typeof forceScrollTop !== 'undefined') { scrollTop = forceScrollTop; }
    if (vl.lastRepaintY === null || Math.abs(scrollTop - vl.lastRepaintY) > vl.maxBufferHeight || (!vl.updatableScroll && (vl.$pageContentEl[0].scrollTop + vl.pageHeight >= vl.$pageContentEl[0].scrollHeight))) {
      vl.lastRepaintY = scrollTop;
    } else {
      return;
    }

    var items = vl.filteredItems || vl.items;
    var fromIndex;
    var toIndex;
    var heightBeforeFirstItem = 0;
    var heightBeforeLastItem = 0;
    if (vl.dynamicHeight) {
      var itemTop = 0;
      var itemHeight;
      vl.maxBufferHeight = vl.pageHeight;

      for (var j = 0; j < vl.heights.length; j += 1) {
        itemHeight = vl.heights[j];
        if (typeof fromIndex === 'undefined') {
          if (itemTop + itemHeight >= scrollTop - (vl.pageHeight * 2 * vl.params.dynamicHeightBufferSize)) { fromIndex = j; }
          else { heightBeforeFirstItem += itemHeight; }
        }

        if (typeof toIndex === 'undefined') {
          if (itemTop + itemHeight >= scrollTop + (vl.pageHeight * 2 * vl.params.dynamicHeightBufferSize) || j === vl.heights.length - 1) { toIndex = j + 1; }
          heightBeforeLastItem += itemHeight;
        }
        itemTop += itemHeight;
      }
      toIndex = Math.min(toIndex, items.length);
    } else {
      fromIndex = (parseInt(scrollTop / vl.params.height, 10) - vl.rowsBefore) * vl.params.cols;
      if (fromIndex < 0) {
        fromIndex = 0;
      }
      toIndex = Math.min(fromIndex + (vl.rowsToRender * vl.params.cols), items.length);
    }

    var topPosition;
    var renderExternalItems = [];
    vl.reachEnd = false;
    var i;
    for (i = fromIndex; i < toIndex; i += 1) {
      var itemEl = (void 0);
      // Define real item index
      var index = vl.items.indexOf(items[i]);

      if (i === fromIndex) { vl.currentFromIndex = index; }
      if (i === toIndex - 1) { vl.currentToIndex = index; }
      if (vl.filteredItems) {
        if (vl.items[index] === vl.filteredItems[vl.filteredItems.length - 1]) { vl.reachEnd = true; }
      } else if (index === vl.items.length - 1) { vl.reachEnd = true; }

      // Find items
      if (vl.params.renderExternal) {
        renderExternalItems.push(items[i]);
      } else if (vl.domCache[index]) {
        itemEl = vl.domCache[index];
        itemEl.f7VirtualListIndex = index;
      } else {
        if (vl.renderItem) {
          vl.tempDomElement.innerHTML = vl.renderItem(items[i], index).trim();
        } else {
          vl.tempDomElement.innerHTML = items[i].toString().trim();
        }
        itemEl = vl.tempDomElement.childNodes[0];
        if (vl.params.cache) { vl.domCache[index] = itemEl; }
        itemEl.f7VirtualListIndex = index;
      }

      // Set item top position
      if (i === fromIndex) {
        if (vl.dynamicHeight) {
          topPosition = heightBeforeFirstItem;
        } else {
          topPosition = ((i * vl.params.height) / vl.params.cols);
        }
      }
      if (!vl.params.renderExternal) {
        itemEl.style.top = topPosition + "px";

        // Before item insert
        vl.emit({
          events: 'itemBeforeInsert',
          data: [itemEl, items[i]],
          parents: [],
        });
        vl.emit('vlItemBeforeInsert', vl, itemEl, items[i]);

        // Append item to fragment
        vl.fragment.appendChild(itemEl);
      }
    }

    // Update list height with not updatable scroll
    if (!vl.updatableScroll) {
      if (vl.dynamicHeight) {
        vl.ul.style.height = heightBeforeLastItem + "px";
      } else {
        vl.ul.style.height = ((i * vl.params.height) / vl.params.cols) + "px";
      }
    }

    // Update list html
    if (vl.params.renderExternal) {
      if (items && items.length === 0) {
        vl.reachEnd = true;
      }
    } else {
      vl.emit({
        events: 'beforeClear',
        data: [vl.fragment],
        parents: [],
      });
      vl.emit('vlBeforeClear', vl, vl.fragment);
      vl.ul.innerHTML = '';

      vl.emit({
        events: 'itemsBeforeInsert',
        data: [vl.fragment],
        parents: [],
      });
      vl.emit('vlItemsBeforeInsert', vl, vl.fragment);

      if (items && items.length === 0) {
        vl.reachEnd = true;
        if (vl.params.emptyTemplate) { vl.ul.innerHTML = vl.params.emptyTemplate; }
      } else {
        vl.ul.appendChild(vl.fragment);
      }

      vl.emit({
        events: 'itemsAfterInsert',
        data: [vl.fragment],
        parents: [],
      });
      vl.emit('vlItemsAfterInsert', vl, vl.fragment);
    }

    if (typeof forceScrollTop !== 'undefined' && force) {
      vl.$pageContentEl.scrollTop(forceScrollTop, 0);
    }
    if (vl.params.renderExternal) {
      vl.params.renderExternal(vl, {
        fromIndex: fromIndex,
        toIndex: toIndex,
        listHeight: vl.listHeight,
        topPosition: topPosition,
        items: renderExternalItems,
      });
    }
  };
  // Filter
  VirtualList.prototype.filterItems = function filterItems (indexes, resetScrollTop) {
    if ( resetScrollTop === void 0 ) resetScrollTop = true;

    var vl = this;
    vl.filteredItems = [];
    for (var i = 0; i < indexes.length; i += 1) {
      vl.filteredItems.push(vl.items[indexes[i]]);
    }
    if (resetScrollTop) {
      vl.$pageContentEl[0].scrollTop = 0;
    }
    vl.update();
  };
  VirtualList.prototype.resetFilter = function resetFilter () {
    var vl = this;
    if (vl.params.showFilteredItemsOnly) {
      vl.filteredItems = [];
    } else {
      vl.filteredItems = null;
      delete vl.filteredItems;
    }
    vl.update();
  };
  VirtualList.prototype.scrollToItem = function scrollToItem (index) {
    var vl = this;
    if (index > vl.items.length) { return false; }
    var itemTop = 0;
    if (vl.dynamicHeight) {
      for (var i = 0; i < index; i += 1) {
        itemTop += vl.heights[i];
      }
    } else {
      itemTop = index * vl.params.height;
    }
    var listTop = vl.$el[0].offsetTop;
    vl.render(true, (listTop + itemTop) - parseInt(vl.$pageContentEl.css('padding-top'), 10));
    return true;
  };
  VirtualList.prototype.handleScroll = function handleScroll () {
    var vl = this;
    vl.render();
  };
  // Handle resize event
  VirtualList.prototype.isVisible = function isVisible () {
    var vl = this;
    return !!(vl.el.offsetWidth || vl.el.offsetHeight || vl.el.getClientRects().length);
  };
  VirtualList.prototype.handleResize = function handleResize () {
    var vl = this;
    if (vl.isVisible()) {
      vl.setListSize();
      vl.render(true);
    }
  };
  // Append
  VirtualList.prototype.appendItems = function appendItems (items) {
    var vl = this;
    for (var i = 0; i < items.length; i += 1) {
      vl.items.push(items[i]);
    }
    vl.update();
  };
  VirtualList.prototype.appendItem = function appendItem (item) {
    var vl = this;
    vl.appendItems([item]);
  };
  // Replace
  VirtualList.prototype.replaceAllItems = function replaceAllItems (items) {
    var vl = this;
    vl.items = items;
    delete vl.filteredItems;
    vl.domCache = {};
    vl.update();
  };
  VirtualList.prototype.replaceItem = function replaceItem (index, item) {
    var vl = this;
    vl.items[index] = item;
    if (vl.params.cache) { delete vl.domCache[index]; }
    vl.update();
  };
  // Prepend
  VirtualList.prototype.prependItems = function prependItems (items) {
    var vl = this;
    for (var i = items.length - 1; i >= 0; i -= 1) {
      vl.items.unshift(items[i]);
    }
    if (vl.params.cache) {
      var newCache = {};
      Object.keys(vl.domCache).forEach(function (cached) {
        newCache[parseInt(cached, 10) + items.length] = vl.domCache[cached];
      });
      vl.domCache = newCache;
    }
    vl.update();
  };
  VirtualList.prototype.prependItem = function prependItem (item) {
    var vl = this;
    vl.prependItems([item]);
  };

  // Move
  VirtualList.prototype.moveItem = function moveItem (from, to) {
    var vl = this;
    var fromIndex = from;
    var toIndex = to;
    if (fromIndex === toIndex) { return; }
    // remove item from array
    var item = vl.items.splice(fromIndex, 1)[0];
    if (toIndex >= vl.items.length) {
      // Add item to the end
      vl.items.push(item);
      toIndex = vl.items.length - 1;
    } else {
    // Add item to new index
      vl.items.splice(toIndex, 0, item);
    }
    // Update cache
    if (vl.params.cache) {
      var newCache = {};
      Object.keys(vl.domCache).forEach(function (cached) {
        var cachedIndex = parseInt(cached, 10);
        var leftIndex = fromIndex < toIndex ? fromIndex : toIndex;
        var rightIndex = fromIndex < toIndex ? toIndex : fromIndex;
        var indexShift = fromIndex < toIndex ? -1 : 1;
        if (cachedIndex < leftIndex || cachedIndex > rightIndex) { newCache[cachedIndex] = vl.domCache[cachedIndex]; }
        if (cachedIndex === leftIndex) { newCache[rightIndex] = vl.domCache[cachedIndex]; }
        if (cachedIndex > leftIndex && cachedIndex <= rightIndex) { newCache[cachedIndex + indexShift] = vl.domCache[cachedIndex]; }
      });
      vl.domCache = newCache;
    }
    vl.update();
  };
  // Insert before
  VirtualList.prototype.insertItemBefore = function insertItemBefore (index, item) {
    var vl = this;
    if (index === 0) {
      vl.prependItem(item);
      return;
    }
    if (index >= vl.items.length) {
      vl.appendItem(item);
      return;
    }
    vl.items.splice(index, 0, item);
    // Update cache
    if (vl.params.cache) {
      var newCache = {};
      Object.keys(vl.domCache).forEach(function (cached) {
        var cachedIndex = parseInt(cached, 10);
        if (cachedIndex >= index) {
          newCache[cachedIndex + 1] = vl.domCache[cachedIndex];
        }
      });
      vl.domCache = newCache;
    }
    vl.update();
  };
  // Delete
  VirtualList.prototype.deleteItems = function deleteItems (indexes) {
    var vl = this;
    var prevIndex;
    var indexShift = 0;
    var loop = function ( i ) {
      var index = indexes[i];
      if (typeof prevIndex !== 'undefined') {
        if (index > prevIndex) {
          indexShift = -i;
        }
      }
      index += indexShift;
      prevIndex = indexes[i];
      // Delete item
      var deletedItem = vl.items.splice(index, 1)[0];

      // Delete from filtered
      if (vl.filteredItems && vl.filteredItems.indexOf(deletedItem) >= 0) {
        vl.filteredItems.splice(vl.filteredItems.indexOf(deletedItem), 1);
      }
      // Update cache
      if (vl.params.cache) {
        var newCache = {};
        Object.keys(vl.domCache).forEach(function (cached) {
          var cachedIndex = parseInt(cached, 10);
          if (cachedIndex === index) {
            delete vl.domCache[index];
          } else if (parseInt(cached, 10) > index) {
            newCache[cachedIndex - 1] = vl.domCache[cached];
          } else {
            newCache[cachedIndex] = vl.domCache[cached];
          }
        });
        vl.domCache = newCache;
      }
    };

    for (var i = 0; i < indexes.length; i += 1) loop( i );
    vl.update();
  };
  VirtualList.prototype.deleteAllItems = function deleteAllItems () {
    var vl = this;
    vl.items = [];
    delete vl.filteredItems;
    if (vl.params.cache) { vl.domCache = {}; }
    vl.update();
  };
  VirtualList.prototype.deleteItem = function deleteItem (index) {
    var vl = this;
    vl.deleteItems([index]);
  };
  // Clear cache
  VirtualList.prototype.clearCachefunction = function clearCachefunction () {
    var vl = this;
    vl.domCache = {};
  };
  // Update Virtual List
  VirtualList.prototype.update = function update () {
    var vl = this;
    vl.setListSize();
    vl.render(true);
  };
  VirtualList.prototype.init = function init () {
    var vl = this;
    vl.attachEvents();
    vl.setListSize();
    vl.render();
  };
  VirtualList.prototype.destroy = function destroy () {
    var vl = this;
    vl.detachEvents();
    vl.$el[0].f7VirtualList = null;
    delete vl.$el[0].f7VirtualList;
    Utils.deleteProps(vl);
    vl = null;
  };

  return VirtualList;
}(Framework7Class));

var VirtualList = {
  name: 'virtualList',
  static: {
    VirtualList: VirtualList$1,
  },
  create: function create() {
    var app = this;
    app.virtualList = ConstructorMethods({
      defaultSelector: '.virtual-list',
      constructor: VirtualList$1,
      app: app,
      domProp: 'f7VirtualList',
    });
  },
};

var Timeline = {
  name: 'timeline',
};

var Tab = {
  show: function show() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var app = this;
    var tabEl;
    var tabLinkEl;
    var animate;
    var tabRoute;
    if (args.length === 1 && args[0].constructor === Object) {
      tabEl = args[0].tabEl;
      tabLinkEl = args[0].tabLinkEl;
      animate = args[0].animate;
      tabRoute = args[0].tabRoute;
    } else {
      var assign;
      (assign = args, tabEl = assign[0], tabLinkEl = assign[1], animate = assign[2], tabRoute = assign[3]);
      if (typeof args[1] === 'boolean') {
        var assign$1;
        (assign$1 = args, tabEl = assign$1[0], animate = assign$1[1], tabLinkEl = assign$1[2], tabRoute = assign$1[3]);
        if (args.length > 2 && tabLinkEl.constructor === Object) {
          var assign$2;
          (assign$2 = args, tabEl = assign$2[0], animate = assign$2[1], tabRoute = assign$2[2], tabLinkEl = assign$2[3]);
        }
      }
    }
    if (typeof animate === 'undefined') { animate = true; }

    var $newTabEl = $$1$1(tabEl);

    if ($newTabEl.length === 0 || $newTabEl.hasClass('tab-active')) {
      return {
        $newTabEl: $newTabEl,
        newTabEl: $newTabEl[0],
      };
    }

    var $tabLinkEl;
    if (tabLinkEl) { $tabLinkEl = $$1$1(tabLinkEl); }

    var $tabsEl = $newTabEl.parent('.tabs');
    if ($tabsEl.length === 0) {
      return {
        $newTabEl: $newTabEl,
        newTabEl: $newTabEl[0],
      };
    }

    // Release swipeouts in hidden tabs
    if (app.swipeout) { app.swipeout.allowOpen = true; }

    // Animated tabs
    var tabsChangedCallbacks = [];

    function onTabsChanged(callback) {
      tabsChangedCallbacks.push(callback);
    }
    function tabsChanged() {
      tabsChangedCallbacks.forEach(function (callback) {
        callback();
      });
    }

    var animated = false;

    if ($tabsEl.parent().hasClass('tabs-animated-wrap')) {
      $tabsEl.parent()[animate ? 'removeClass' : 'addClass']('not-animated');

      var transitionDuration = parseFloat($tabsEl.css('transition-duration').replace(',', '.'));
      if (animate && transitionDuration) {
        $tabsEl.transitionEnd(tabsChanged);
        animated = true;
      }

      var tabsTranslate = (app.rtl ? $newTabEl.index() : -$newTabEl.index()) * 100;
      $tabsEl.transform(("translate3d(" + tabsTranslate + "%,0,0)"));
    }

    // Swipeable tabs
    if ($tabsEl.parent().hasClass('tabs-swipeable-wrap') && app.swiper) {
      var swiper = $tabsEl.parent()[0].swiper;
      if (swiper && swiper.activeIndex !== $newTabEl.index()) {
        animated = true;
        swiper
          .once('slideChangeTransitionEnd', function () {
            tabsChanged();
          })
          .slideTo($newTabEl.index(), animate ? undefined : 0);
      }
    }

    // Remove active class from old tabs
    var $oldTabEl = $tabsEl.children('.tab-active');
    $oldTabEl
      .removeClass('tab-active')
      .trigger('tab:hide');
    app.emit('tabHide', $oldTabEl[0]);

    // Trigger 'show' event on new tab
    $newTabEl
      .addClass('tab-active')
      .trigger('tab:show');
    app.emit('tabShow', $newTabEl[0]);

    // Find related link for new tab
    if (!$tabLinkEl) {
      // Search by id
      if (typeof tabEl === 'string') { $tabLinkEl = $$1$1((".tab-link[href=\"" + tabEl + "\"]")); }
      else { $tabLinkEl = $$1$1((".tab-link[href=\"#" + ($newTabEl.attr('id')) + "\"]")); }
      // Search by data-tab
      if (!$tabLinkEl || ($tabLinkEl && $tabLinkEl.length === 0)) {
        $$1$1('[data-tab]').each(function (index, el) {
          if ($newTabEl.is($$1$1(el).attr('data-tab'))) { $tabLinkEl = $$1$1(el); }
        });
      }
      if (tabRoute && (!$tabLinkEl || ($tabLinkEl && $tabLinkEl.length === 0))) {
        $tabLinkEl = $$1$1(("[data-route-tab-id=\"" + (tabRoute.route.tab.id) + "\"]"));
        if ($tabLinkEl.length === 0) {
          $tabLinkEl = $$1$1((".tab-link[href=\"" + (tabRoute.url) + "\"]"));
        }
      }
      if ($tabLinkEl.length > 1 && $newTabEl.parents('.page').length) {
        // eslint-disable-next-line
        $tabLinkEl = $tabLinkEl.filter(function (index, tabLinkElement) {
          return $$1$1(tabLinkElement).parents('.page')[0] === $newTabEl.parents('.page')[0];
        });
      }
    }
    if ($tabLinkEl.length > 0) {
      // Find related link for old tab
      var $oldTabLinkEl;
      if ($oldTabEl && $oldTabEl.length > 0) {
        // Search by id
        var oldTabId = $oldTabEl.attr('id');
        if (oldTabId) { $oldTabLinkEl = $$1$1((".tab-link[href=\"#" + oldTabId + "\"]")); }
        // Search by data-tab
        if (!$oldTabLinkEl || ($oldTabLinkEl && $oldTabLinkEl.length === 0)) {
          $$1$1('[data-tab]').each(function (index, tabLinkElement) {
            if ($oldTabEl.is($$1$1(tabLinkElement).attr('data-tab'))) { $oldTabLinkEl = $$1$1(tabLinkElement); }
          });
        }
        if (!$oldTabLinkEl || ($oldTabLinkEl && $oldTabLinkEl.length === 0)) {
          $oldTabLinkEl = $tabLinkEl.siblings('.tab-link-active');
        }
      } else if (tabRoute) {
        $oldTabLinkEl = $tabLinkEl.siblings('.tab-link-active');
      }

      if ($oldTabLinkEl && $oldTabLinkEl.length > 1 && $oldTabEl && $oldTabEl.parents('.page').length) {
        // eslint-disable-next-line
        $oldTabLinkEl = $oldTabLinkEl.filter(function (index, tabLinkElement) {
          return $$1$1(tabLinkElement).parents('.page')[0] === $oldTabEl.parents('.page')[0];
        });
      }

      if ($oldTabLinkEl && $oldTabLinkEl.length > 0) { $oldTabLinkEl.removeClass('tab-link-active'); }

      // Update links' classes
      if ($tabLinkEl && $tabLinkEl.length > 0) {
        $tabLinkEl.addClass('tab-link-active');
        // Material Highlight
        if (app.theme === 'md' && app.toolbar) {
          var $tabbarEl = $tabLinkEl.parents('.tabbar, .tabbar-labels');
          if ($tabbarEl.length > 0) {
            app.toolbar.setHighlight($tabbarEl);
          }
        }
      }
    }
    return {
      $newTabEl: $newTabEl,
      newTabEl: $newTabEl[0],
      $oldTabEl: $oldTabEl,
      oldTabEl: $oldTabEl[0],
      onTabsChanged: onTabsChanged,
      animated: animated,
    };
  },
};
var Tabs = {
  name: 'tabs',
  create: function create() {
    var app = this;
    Utils.extend(app, {
      tab: {
        show: Tab.show.bind(app),
      },
    });
  },
  clicks: {
    '.tab-link': function tabLinkClick($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      if (($clickedEl.attr('href') && $clickedEl.attr('href').indexOf('#') === 0) || $clickedEl.attr('data-tab')) {
        app.tab.show({
          tabEl: data.tab || $clickedEl.attr('href'),
          tabLinkEl: $clickedEl,
          animate: data.animate,
        });
      }
    },
  },
};

function swipePanel$1(panel) {
  var app = panel.app;
  Utils.extend(panel, {
    swipeable: true,
    swipeInitialized: true,
  });
  var params = app.params.panel;
  var $el = panel.$el;
  var $backdropEl = panel.$backdropEl;
  var side = panel.side;
  var effect = panel.effect;
  var otherPanel;

  var isTouched;
  var isMoved;
  var isScrolling;
  var touchesStart = {};
  var touchStartTime;
  var touchesDiff;
  var translate;
  var backdropOpacity;
  var panelWidth;
  var direction;

  var $viewEl;

  var touchMoves = 0;
  function handleTouchStart(e) {
    if (!panel.swipeable) { return; }
    if (!app.panel.allowOpen || (!params.swipe && !params.swipeOnlyClose) || isTouched) { return; }
    if ($$1$1('.modal-in, .photo-browser-in').length > 0) { return; }
    otherPanel = app.panel[side === 'left' ? 'right' : 'left'] || {};
    if (!panel.opened && otherPanel.opened) { return; }
    if (!(params.swipeCloseOpposite || params.swipeOnlyClose)) {
      if (otherPanel.opened) { return; }
    }
    if (e.target && e.target.nodeName.toLowerCase() === 'input' && e.target.type === 'range') { return; }
    if ($$1$1(e.target).closest('.range-slider, .tabs-swipeable-wrap, .calendar-months').length > 0) { return; }
    touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    if (params.swipeOnlyClose && !panel.opened) {
      return;
    }
    if (params.swipe !== 'both' && params.swipeCloseOpposite && params.swipe !== side && !panel.opened) {
      return;
    }
    if (params.swipeActiveArea && !panel.opened) {
      if (side === 'left') {
        if (touchesStart.x > params.swipeActiveArea) { return; }
      }
      if (side === 'right') {
        if (touchesStart.x < app.width - params.swipeActiveArea) { return; }
      }
    }
    touchMoves = 0;
    $viewEl = $$1$1(panel.getViewEl());
    isMoved = false;
    isTouched = true;
    isScrolling = undefined;

    touchStartTime = Utils.now();
    direction = undefined;
  }
  function handleTouchMove(e) {
    if (!isTouched) { return; }
    touchMoves += 1;
    if (touchMoves < 2) { return; }
    if (e.f7PreventSwipePanel || app.preventSwipePanelBySwipeBack || app.preventSwipePanel) {
      isTouched = false;
      return;
    }
    var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
    if (typeof isScrolling === 'undefined') {
      isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
    }
    if (isScrolling) {
      isTouched = false;
      return;
    }
    if (!direction) {
      if (pageX > touchesStart.x) {
        direction = 'to-right';
      } else {
        direction = 'to-left';
      }

      if (params.swipe === 'both') {
        if (params.swipeActiveArea > 0) {
          if (side === 'left' && touchesStart.x > params.swipeActiveArea) {
            isTouched = false;
            return;
          }
          if (side === 'right' && touchesStart.x < app.width - params.swipeActiveArea) {
            isTouched = false;
            return;
          }
        }
      }
      if ($el.hasClass('panel-visible-by-breakpoint')) {
        isTouched = false;
        return;
      }

      if (
        (side === 'left' &&
          (
            direction === 'to-left' && !$el.hasClass('panel-active')
          )
        )
        ||
        (side === 'right' &&
          (
            direction === 'to-right' && !$el.hasClass('panel-active')
          )
        )
      ) {
        isTouched = false;
        return;
      }
    }

    if (params.swipeNoFollow) {
      var timeDiff = (new Date()).getTime() - touchStartTime;
      if (timeDiff < 300) {
        if (direction === 'to-left') {
          if (side === 'right') { app.openPanel(side); }
          if (side === 'left' && $el.hasClass('panel-active')) { app.closePanel(); }
        }
        if (direction === 'to-right') {
          if (side === 'left') { app.openPanel(side); }
          if (side === 'right' && $el.hasClass('panel-active')) { app.closePanel(); }
        }
      }
      isTouched = false;
      isMoved = false;
      return;
    }

    if (!isMoved) {
      if (!panel.opened) {
        $el.show();
        $backdropEl.show();
        $el.trigger('panel:swipeopen', panel);
        panel.emit('local::swipeOpen panelSwipeOpen', panel);
      }
      panelWidth = $el[0].offsetWidth;
      $el.transition(0);
    }

    isMoved = true;

    e.preventDefault();
    var threshold = panel.opened ? 0 : -params.swipeThreshold;
    if (side === 'right') { threshold = -threshold; }

    touchesDiff = (pageX - touchesStart.x) + threshold;

    if (side === 'right') {
      if (effect === 'cover') {
        translate = touchesDiff + (panel.opened ? 0 : panelWidth);
        if (translate < 0) { translate = 0; }
        if (translate > panelWidth) {
          translate = panelWidth;
        }
      } else {
        translate = touchesDiff - (panel.opened ? panelWidth : 0);
        if (translate > 0) { translate = 0; }
        if (translate < -panelWidth) {
          translate = -panelWidth;
        }
      }
    } else {
      translate = touchesDiff + (panel.opened ? panelWidth : 0);
      if (translate < 0) { translate = 0; }
      if (translate > panelWidth) {
        translate = panelWidth;
      }
    }
    if (effect === 'reveal') {
      $viewEl.transform(("translate3d(" + translate + "px,0,0)")).transition(0);
      $backdropEl.transform(("translate3d(" + translate + "px,0,0)")).transition(0);

      $el.trigger('panel:swipe', panel, Math.abs(translate / panelWidth));
      panel.emit('local::swipe panelSwipe', panel, Math.abs(translate / panelWidth));
    } else {
      if (side === 'left') { translate -= panelWidth; }
      $el.transform(("translate3d(" + translate + "px,0,0)")).transition(0);

      $backdropEl.transition(0);
      backdropOpacity = 1 - Math.abs(translate / panelWidth);
      $backdropEl.css({ opacity: backdropOpacity });

      $el.trigger('panel:swipe', panel, Math.abs(translate / panelWidth));
      panel.emit('local::swipe panelSwipe', panel, Math.abs(translate / panelWidth));
    }
  }
  function handleTouchEnd() {
    if (!isTouched || !isMoved) {
      isTouched = false;
      isMoved = false;
      return;
    }
    isTouched = false;
    isMoved = false;
    var timeDiff = (new Date()).getTime() - touchStartTime;
    var action;
    var edge = (translate === 0 || Math.abs(translate) === panelWidth);

    if (!panel.opened) {
      if (effect === 'cover') {
        if (translate === 0) {
          action = 'swap'; // open
        } else if (timeDiff < 300 && Math.abs(translate) > 0) {
          action = 'swap'; // open
        } else if (timeDiff >= 300 && Math.abs(translate) < panelWidth / 2) {
          action = 'swap'; // open
        } else {
          action = 'reset'; // close
        }
      } else if (translate === 0) {
        action = 'reset';
      } else if (
        (timeDiff < 300 && Math.abs(translate) > 0)
        ||
        (timeDiff >= 300 && (Math.abs(translate) >= panelWidth / 2))
      ) {
        action = 'swap';
      } else {
        action = 'reset';
      }
    } else if (effect === 'cover') {
      if (translate === 0) {
        action = 'reset'; // open
      } else if (timeDiff < 300 && Math.abs(translate) > 0) {
        action = 'swap'; // open
      } else if (timeDiff >= 300 && Math.abs(translate) < panelWidth / 2) {
        action = 'reset'; // open
      } else {
        action = 'swap'; // close
      }
    } else if (translate === -panelWidth) {
      action = 'reset';
    } else if (
      (timeDiff < 300 && Math.abs(translate) >= 0)
      ||
      (timeDiff >= 300 && (Math.abs(translate) <= panelWidth / 2))
    ) {
      if (side === 'left' && translate === panelWidth) { action = 'reset'; }
      else { action = 'swap'; }
    } else {
      action = 'reset';
    }
    if (action === 'swap') {
      if (panel.opened) {
        panel.close(!edge);
      } else {
        panel.open(!edge);
      }
    }
    if (action === 'reset') {
      if (!panel.opened) {
        if (edge) {
          $el.css({ display: '' });
        } else {
          var target = effect === 'reveal' ? $viewEl : $el;
          $$1$1('html').addClass('with-panel-transitioning');
          target.transitionEnd(function () {
            if ($el.hasClass('panel-active')) { return; }
            $el.css({ display: '' });
            $$1$1('html').removeClass('with-panel-transitioning');
          });
        }
      }
    }
    if (effect === 'reveal') {
      Utils.nextFrame(function () {
        $viewEl.transition('');
        $viewEl.transform('');
      });
    }
    $el.transition('').transform('');
    $backdropEl.css({ display: '' }).transform('').transition('').css('opacity', '');
  }

  // Add Events
  app.on('touchstart:passive', handleTouchStart);
  app.on('touchmove:active', handleTouchMove);
  app.on('touchend:passive', handleTouchEnd);
  panel.on('panelDestroy', function () {
    app.off('touchstart:passive', handleTouchStart);
    app.off('touchmove:active', handleTouchMove);
    app.off('touchend:passive', handleTouchEnd);
  });
}

var Panel$1 = (function (Framework7Class$$1) {
  function Panel(app, params) {
    var obj;

    if ( params === void 0 ) params = {};
    Framework7Class$$1.call(this, params, [app]);
    var panel = this;

    var el = params.el;
    var $el = $$1$1(el);
    if ($el.length === 0) { return panel; }
    if ($el[0].f7Panel) { return $el[0].f7Panel; }

    $el[0].f7Panel = panel;

    var opened = params.opened;
    var side = params.side;
    var effect = params.effect;
    if (typeof opened === 'undefined') { opened = $el.hasClass('panel-active'); }
    if (typeof side === 'undefined') { side = $el.hasClass('panel-left') ? 'left' : 'right'; }
    if (typeof effect === 'undefined') { effect = $el.hasClass('panel-cover') ? 'cover' : 'reveal'; }

    if (!app.panel[side]) {
      Utils.extend(app.panel, ( obj = {}, obj[side] = panel, obj ));
    }

    var $backdropEl = $$1$1('.panel-backdrop');
    if ($backdropEl.length === 0) {
      $backdropEl = $$1$1('<div class="panel-backdrop"></div>');
      $backdropEl.insertBefore($el);
    }

    Utils.extend(panel, {
      app: app,
      side: side,
      effect: effect,
      $el: $el,
      el: $el[0],
      opened: opened,
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl[0],
    });

    // Install Modules
    panel.useModules();

    // Init
    panel.init();

    return panel;
  }

  if ( Framework7Class$$1 ) Panel.__proto__ = Framework7Class$$1;
  Panel.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Panel.prototype.constructor = Panel;
  Panel.prototype.init = function init () {
    var panel = this;
    var app = panel.app;
    if (app.params.panel[((panel.side) + "Breakpoint")]) {
      panel.initBreakpoints();
    }
    {
      if (
        (app.params.panel.swipe === panel.side)
        ||
        (app.params.panel.swipe === 'both')
        ||
        (app.params.panel.swipe && app.params.panel.swipe !== panel.side && app.params.panel.swipeCloseOpposite)
      ) {
        panel.initSwipePanel();
      }
    }
  };
  Panel.prototype.getViewEl = function getViewEl () {
    var panel = this;
    var app = panel.app;
    var viewEl;
    if (app.root.children('.views').length > 0) {
      viewEl = app.root.children('.views')[0];
    } else {
      viewEl = app.root.children('.view')[0];
    }
    return viewEl;
  };
  Panel.prototype.setBreakpoint = function setBreakpoint () {
    var obj, obj$1;

    var panel = this;
    var app = panel.app;
    var side = panel.side;
    var $el = panel.$el;
    var $viewEl = $$1$1(panel.getViewEl());
    var breakpoint = app.params.panel[(side + "Breakpoint")];
    var wasVisible = $el.hasClass('panel-visible-by-breakpoint');

    if (app.width >= breakpoint) {
      if (!wasVisible) {
        $$1$1('html').removeClass(("with-panel-" + side + "-reveal with-panel-" + side + "-cover with-panel"));
        $el.css('display', '').addClass('panel-visible-by-breakpoint').removeClass('panel-active');
        panel.onOpen();
        panel.onOpened();
        $viewEl.css(( obj = {}, obj[("margin-" + side)] = (($el.width()) + "px"), obj ));
        app.allowPanelOpen = true;
        app.emit('local::breakpoint panelBreakpoint');
        panel.$el.trigger('panel:breakpoint', panel);
      }
    } else if (wasVisible) {
      $el.css('display', '').removeClass('panel-visible-by-breakpoint panel-active');
      panel.onClose();
      panel.onClosed();
      $viewEl.css(( obj$1 = {}, obj$1[("margin-" + side)] = '', obj$1 ));
      app.emit('local::breakpoint panelBreakpoint');
      panel.$el.trigger('panel:breakpoint', panel);
    }
  };
  Panel.prototype.initBreakpoints = function initBreakpoints () {
    var panel = this;
    var app = panel.app;
    panel.resizeHandler = function resizeHandler() {
      panel.setBreakpoint();
    };
    if (app.params.panel[((panel.side) + "Breakpoint")]) {
      app.on('resize', panel.resizeHandler);
    }
    panel.setBreakpoint();
    return panel;
  };
  Panel.prototype.initSwipePanel = function initSwipePanel () {
    {
      swipePanel$1(this);
    }
  };
  Panel.prototype.destroy = function destroy () {
    var panel = this;
    var app = panel.app;

    panel.emit('local::beforeDestroy panelBeforeDestroy', panel);
    panel.$el.trigger('panel:beforedestroy', panel);

    if (panel.resizeHandler) {
      app.off('resize', panel.resizeHandler);
    }
    panel.$el.trigger('panel:destroy', panel);
    panel.emit('local::destroy panelDestroy');
    delete app.panel[panel.side];
    delete panel.el.f7Panel;
    Utils.deleteProps(panel);
    panel = null;
  };
  Panel.prototype.open = function open (animate) {
    if ( animate === void 0 ) animate = true;

    var panel = this;
    var app = panel.app;
    if (!app.panel.allowOpen) { return false; }

    var side = panel.side;
    var effect = panel.effect;
    var $el = panel.$el;
    var $backdropEl = panel.$backdropEl;
    var opened = panel.opened;

    // Ignore if opened
    if (opened || $el.hasClass('panel-visible-by-breakpoint') || $el.hasClass('panel-active')) { return false; }

    // Close if some panel is opened
    app.panel.close(side === 'left' ? 'right' : 'left', animate);

    app.panel.allowOpen = false;

    $el[animate ? 'removeClass' : 'addClass']('not-animated');
    $el
      .css({ display: 'block' })
      .addClass('panel-active');

    $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');
    $backdropEl.show();

    /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */
    panel._clientLeft = $el[0].clientLeft;

    $$1$1('html').addClass(("with-panel with-panel-" + side + "-" + effect));
    panel.onOpen();

    // Transition End;
    var transitionEndTarget = effect === 'reveal' ? $el.nextAll('.view, .views').eq(0) : $el;

    function panelTransitionEnd() {
      transitionEndTarget.transitionEnd(function (e) {
        if ($$1$1(e.target).is(transitionEndTarget)) {
          if ($el.hasClass('panel-active')) {
            panel.onOpened();
            $backdropEl.css({ display: '' });
          } else {
            panel.onClosed();
            $backdropEl.css({ display: '' });
          }
        } else { panelTransitionEnd(); }
      });
    }
    if (animate) {
      panelTransitionEnd();
    } else {
      panel.onOpened();
      $backdropEl.css({ display: '' });
    }

    return true;
  };
  Panel.prototype.close = function close (animate) {
    if ( animate === void 0 ) animate = true;

    var panel = this;
    var app = panel.app;

    var side = panel.side;
    var effect = panel.effect;
    var $el = panel.$el;
    var $backdropEl = panel.$backdropEl;
    var opened = panel.opened;

    if (!opened || $el.hasClass('panel-visible-by-breakpoint') || !$el.hasClass('panel-active')) { return false; }

    $el[animate ? 'removeClass' : 'addClass']('not-animated');
    $el.removeClass('panel-active');

    $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');

    var transitionEndTarget = effect === 'reveal' ? $el.nextAll('.view, .views').eq(0) : $el;

    panel.onClose();
    app.panel.allowOpen = false;

    if (animate) {
      transitionEndTarget.transitionEnd(function () {
        if ($el.hasClass('panel-active')) { return; }
        $el.css({ display: '' });
        $$1$1('html').removeClass('with-panel-transitioning');
        panel.onClosed();
      });
      $$1$1('html')
        .removeClass(("with-panel with-panel-" + side + "-" + effect))
        .addClass('with-panel-transitioning');
    } else {
      $el.css({ display: '' });
      $el.removeClass('not-animated');
      $$1$1('html').removeClass(("with-panel with-panel-transitioning with-panel-" + side + "-" + effect));
      panel.onClosed();
    }
    return true;
  };
  Panel.prototype.onOpen = function onOpen () {
    var panel = this;
    panel.opened = true;
    panel.$el.trigger('panel:open', panel);
    panel.emit('local::open panelOpen', panel);
  };
  Panel.prototype.onOpened = function onOpened () {
    var panel = this;
    var app = panel.app;
    app.panel.allowOpen = true;

    panel.$el.trigger('panel:opened', panel);
    panel.emit('local::opened panelOpened', panel);
  };
  Panel.prototype.onClose = function onClose () {
    var panel = this;
    panel.opened = false;
    panel.$el.addClass('panel-closing');
    panel.$el.trigger('panel:close', panel);
    panel.emit('local::close panelClose', panel);
  };
  Panel.prototype.onClosed = function onClosed () {
    var panel = this;
    var app = panel.app;
    app.panel.allowOpen = true;
    panel.$el.removeClass('panel-closing');
    panel.$el.trigger('panel:closed', panel);
    panel.emit('local::closed panelClosed', panel);
  };

  return Panel;
}(Framework7Class));

var Panel = {
  name: 'panel',
  params: {
    panel: {
      leftBreakpoint: 0,
      rightBreakpoint: 0,
      swipe: undefined, // or 'left' or 'right' or 'both'
      swipeActiveArea: 0,
      swipeCloseOpposite: true,
      swipeOnlyClose: false,
      swipeNoFollow: false,
      swipeThreshold: 0,
      closeByBackdropClick: true,
    },
  },
  static: {
    Panel: Panel$1,
  },
  instance: {
    panel: {
      allowOpen: true,
    },
  },
  create: function create() {
    var app = this;
    Utils.extend(app.panel, {
      disableSwipe: function disableSwipe(panel) {
        if ( panel === void 0 ) panel = 'both';

        var side;
        var panels = [];
        if (typeof panel === 'string') {
          if (panel === 'both') {
            side = 'both';
            panels = [app.panel.left, app.panel.right];
          } else {
            side = panel;
            panels = app.panel[side];
          }
        } else {
          panels = [panel];
        }
        panels.forEach(function (panelInstance) {
          if (panelInstance) { Utils.extend(panelInstance, { swipeable: false }); }
        });
      },
      enableSwipe: function enableSwipe(panel) {
        if ( panel === void 0 ) panel = 'both';

        var panels = [];
        var side;
        if (typeof panel === 'string') {
          side = panel;
          if (
            (app.params.panel.swipe === 'left' && side === 'right') ||
            (app.params.panel.swipe === 'right' && side === 'left') ||
            side === 'both'
          ) {
            side = 'both';
            app.params.panel.swipe = side;
            panels = [app.panel.left, app.panel.right];
          } else {
            app.params.panel.swipe = side;
            panels.push(app.panel[side]);
          }
        } else if (panel) {
          panels.push(panel);
        }
        if (panels.length) {
          panels.forEach(function (panelInstance) {
            if (!panelInstance) { return; }
            if (!panelInstance.swipeInitialized) {
              panelInstance.initSwipePanel();
            } else {
              Utils.extend(panelInstance, { swipeable: true });
            }
          });
        }
      },
      create: function create(params) {
        return new Panel$1(app, params);
      },

      open: function open(side, animate) {
        var panelSide = side;
        if (!panelSide) {
          if ($$1$1('.panel').length > 1) {
            return false;
          }
          panelSide = $$1$1('.panel').hasClass('panel-left') ? 'left' : 'right';
        }
        if (!panelSide) { return false; }
        if (app.panel[panelSide]) {
          return app.panel[panelSide].open(animate);
        }
        var $panelEl = $$1$1((".panel-" + panelSide));
        if ($panelEl.length > 0) {
          return app.panel.create({ el: $panelEl }).open(animate);
        }
        return false;
      },
      close: function close(side, animate) {
        var $panelEl;
        var panelSide;
        if (panelSide) {
          panelSide = side;
          $panelEl = $$1$1((".panel-" + panelSide));
        } else {
          $panelEl = $$1$1('.panel.panel-active');
          panelSide = $panelEl.hasClass('panel-left') ? 'left' : 'right';
        }
        if (!panelSide) { return false; }
        if (app.panel[panelSide]) {
          return app.panel[panelSide].close(animate);
        }
        if ($panelEl.length > 0) {
          return app.panel.create({ el: $panelEl }).close(animate);
        }
        return false;
      },
      get: function get(side) {
        var panelSide = side;
        if (!panelSide) {
          if ($$1$1('.panel').length > 1) {
            return undefined;
          }
          panelSide = $$1$1('.panel').hasClass('panel-left') ? 'left' : 'right';
        }
        if (!panelSide) { return undefined; }
        if (app.panel[panelSide]) {
          return app.panel[panelSide];
        }
        var $panelEl = $$1$1((".panel-" + panelSide));
        if ($panelEl.length > 0) {
          return app.panel.create({ el: $panelEl });
        }
        return undefined;
      },
    });
  },
  on: {
    init: function init() {
      var app = this;

      // Create Panels
      $$1$1('.panel').each(function (index, panelEl) {
        var side = $$1$1(panelEl).hasClass('panel-left') ? 'left' : 'right';
        app.panel[side] = app.panel.create({ el: panelEl, side: side });
      });
    },
  },
  clicks: {
    '.panel-open': function open(clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      var side = 'left';
      if (data.panel === 'right' || ($$1$1('.panel').length === 1 && $$1$1('.panel').hasClass('panel-right'))) {
        side = 'right';
      }
      app.panel.open(side, data.animate);
    },
    '.panel-close': function close(clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      var side = data.panel;
      app.panel.close(side, data.animate);
    },
    '.panel-backdrop': function close() {
      var app = this;
      $$1$1('.panel-active').trigger('panel:backdrop-click');
      app.emit('panelBackdropClick', $$1$1('.panel-active')[0]);
      if (app.params.panel.closeByBackdropClick) { app.panel.close(); }
    },
  },
};

var Card = {
  name: 'card',
};

var Chip = {
  name: 'chip',
};

// Form Data
var FormData$1 = {
  store: function store(form, data) {
    var app = this;
    var formId = form;

    var $formEl = $$1$1(form);
    if ($formEl.length && $formEl.is('form') && $formEl.attr('id')) {
      formId = $formEl.attr('id');
    }
    // Store form data in app.formsData
    app.form.data[("form-" + formId)] = data;

    // Store form data in local storage also
    try {
      window.localStorage[("f7form-" + formId)] = JSON.stringify(data);
    } catch (e) {
      throw e;
    }
  },
  get: function get(form) {
    var app = this;
    var formId = form;

    var $formEl = $$1$1(form);
    if ($formEl.length && $formEl.is('form') && $formEl.attr('id')) {
      formId = $formEl.attr('id');
    }

    try {
      if (window.localStorage[("f7form-" + formId)]) {
        return JSON.parse(window.localStorage[("f7form-" + formId)]);
      }
    } catch (e) {
      throw e;
    }
    if (app.form.data[("form-" + formId)]) {
      return app.form.data[("form-" + formId)];
    }
    return undefined;
  },
  remove: function remove(form) {
    var app = this;
    var formId = form;

    var $formEl = $$1$1(form);
    if ($formEl.length && $formEl.is('form') && $formEl.attr('id')) {
      formId = $formEl.attr('id');
    }

    // Delete form data from app.formsData
    if (app.form.data[("form-" + formId)]) {
      app.form.data[("form-" + formId)] = '';
      delete app.form.data[("form-" + formId)];
    }

    // Delete form data from local storage also
    try {
      if (window.localStorage[("f7form-" + formId)]) {
        window.localStorage[("f7form-" + formId)] = '';
        window.localStorage.removeItem(("f7form-" + formId));
      }
    } catch (e) {
      throw e;
    }
  },
};

// Form Storage
var FormStorage = {
  init: function init(formEl) {
    var app = this;
    var $formEl = $$1$1(formEl);
    var formId = $formEl.attr('id');
    if (!formId) { return; }
    var initialData = app.form.getFormData(formId);
    if (initialData) {
      app.form.fillFromData($formEl, initialData);
    }
    function store() {
      var data = app.form.convertToData($formEl);
      if (!data) { return; }
      app.form.storeFormData(formId, data);
      $formEl.trigger('form:storedata', data);
      app.emit('formStoreData', $formEl[0], data);
    }
    $formEl.on('change submit', store);
  },
  destroy: function destroy(formEl) {
    var $formEl = $$1$1(formEl);
    $formEl.off('change submit');
  },
};

// Form To/From Data
function formToData(formEl) {
  var app = this;
  var $formEl = $$1$1(formEl).eq(0);
  if ($formEl.length === 0) { return undefined; }

  // Form data
  var data = {};

  // Skip input types
  var skipTypes = ['submit', 'image', 'button', 'file'];
  var skipNames = [];
  $formEl.find('input, select, textarea').each(function (inputIndex, inputEl) {
    var $inputEl = $$1$1(inputEl);
    var name = $inputEl.attr('name');
    var type = $inputEl.attr('type');
    var tag = inputEl.nodeName.toLowerCase();
    if (skipTypes.indexOf(type) >= 0) { return; }
    if (skipNames.indexOf(name) >= 0 || !name) { return; }
    if (tag === 'select' && $inputEl.prop('multiple')) {
      skipNames.push(name);
      data[name] = [];
      $formEl.find(("select[name=\"" + name + "\"] option")).each(function (index, el) {
        if (el.selected) { data[name].push(el.value); }
      });
    } else {
      switch (type) {
        case 'checkbox':
          skipNames.push(name);
          data[name] = [];
          $formEl.find(("input[name=\"" + name + "\"]")).each(function (index, el) {
            if (el.checked) { data[name].push(el.value); }
          });
          break;
        case 'radio':
          skipNames.push(name);
          $formEl.find(("input[name=\"" + name + "\"]")).each(function (index, el) {
            if (el.checked) { data[name] = el.value; }
          });
          break;
        default:
          data[name] = $inputEl.val();
          break;
      }
    }
  });
  $formEl.trigger('form:todata', data);
  app.emit('formToData', $formEl[0], data);

  return data;
}
function formFromData(formEl, formData) {
  var app = this;
  var $formEl = $$1$1(formEl).eq(0);
  if (!$formEl.length) { return; }

  var data = formData;
  var formId = $formEl.attr('id');

  if (!data && formId) {
    data = app.form.getFormData(formId);
  }

  if (!data) { return; }

  // Skip input types
  var skipTypes = ['submit', 'image', 'button', 'file'];
  var skipNames = [];

  $formEl.find('input, select, textarea').each(function (inputIndex, inputEl) {
    var $inputEl = $$1$1(inputEl);
    var name = $inputEl.attr('name');
    var type = $inputEl.attr('type');
    var tag = inputEl.nodeName.toLowerCase();
    if (typeof data[name] === 'undefined' || data[name] === null) { return; }
    if (skipTypes.indexOf(type) >= 0) { return; }
    if (skipNames.indexOf(name) >= 0 || !name) { return; }
    if (tag === 'select' && $inputEl.prop('multiple')) {
      skipNames.push(name);
      $formEl.find(("select[name=\"" + name + "\"] option")).each(function (index, el) {
        var selectEl = el;
        if (data[name].indexOf(el.value) >= 0) { selectEl.selected = true; }
        else { selectEl.selected = false; }
      });
    } else {
      switch (type) {
        case 'checkbox':
          skipNames.push(name);
          $formEl.find(("input[name=\"" + name + "\"]")).each(function (index, el) {
            var checkboxEl = el;
            if (data[name].indexOf(el.value) >= 0) { checkboxEl.checked = true; }
            else { checkboxEl.checked = false; }
          });
          break;
        case 'radio':
          skipNames.push(name);
          $formEl.find(("input[name=\"" + name + "\"]")).each(function (index, el) {
            var radioEl = el;
            if (data[name] === el.value) { radioEl.checked = true; }
            else { radioEl.checked = false; }
          });
          break;
        default:
          $inputEl.val(data[name]);
          break;
      }
    }
    if (tag === 'select' || tag === 'input' || tag === 'textarea') {
      $inputEl.trigger('change', 'fromdata');
    }
  });
  $formEl.trigger('form:fromdata', data);
  app.emit('formFromData', $formEl[0], data);
}

function initAjaxForm() {
  var app = this;

  function onSubmitChange(e, fromData) {
    var $formEl = $$1$1(this);
    if (e.type === 'change' && !$formEl.hasClass('form-ajax-submit-onchange')) { return; }
    if (e.type === 'submit') { e.preventDefault(); }

    if (e.type === 'change' && fromData === 'fromdata') { return; }

    var method = ($formEl.attr('method') || 'GET').toUpperCase();
    var contentType = $formEl.prop('enctype') || $formEl.attr('enctype');

    var url = $formEl.attr('action');
    if (!url) { return; }

    var data;
    if (method === 'POST') { data = new FormData$1($formEl[0]); }
    else { data = Utils.serializeObject(app.form.convertToData($formEl[0])); }

    var xhr = app.request({
      method: method,
      url: url,
      contentType: contentType,
      data: data,
      beforeSend: function beforeSend() {
        $formEl.trigger('formajax:beforesend', data, xhr);
        app.emit('formAjaxBeforeSend', $formEl[0], data, xhr);
      },
      error: function error() {
        $formEl.trigger('formajax:error', data, xhr);
        app.emit('formAjaxError', $formEl[0], data, xhr);
      },
      complete: function complete() {
        $formEl.trigger('formajax:complete', data, xhr);
        app.emit('formAjaxComplete', $formEl[0], data, xhr);
      },
      success: function success() {
        $formEl.trigger('formajax:success', data, xhr);
        app.emit('formAjaxSuccess', $formEl[0], data, xhr);
      },
    });
  }
  $$1$1(document).on('submit change', 'form.form-ajax-submit, form.form-ajax-submit-onchange', onSubmitChange);
}

var Form = {
  name: 'form',
  create: function create() {
    var app = this;
    Utils.extend(app, {
      form: {
        data: {},
        storeFormData: FormData$1.store.bind(app),
        getFormData: FormData$1.get.bind(app),
        removeFormData: FormData$1.remove.bind(app),
        convertToData: formToData.bind(app),
        fillFromData: formFromData.bind(app),
        storage: {
          init: FormStorage.init.bind(app),
          destroy: FormStorage.destroy.bind(app),
        },
      },
    });
  },
  on: {
    init: function init() {
      var app = this;
      initAjaxForm.call(app);
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var app = this;
      $$1$1(tabEl).find('.form-store-data').each(function (index, formEl) {
        app.form.storage.destroy(formEl);
      });
    },
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      $$1$1(tabEl).find('.form-store-data').each(function (index, formEl) {
        app.form.storage.init(formEl);
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.form-store-data').each(function (index, formEl) {
        app.form.storage.destroy(formEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.form-store-data').each(function (index, formEl) {
        app.form.storage.init(formEl);
      });
    },
  },
};

var Input = {
  ignoreTypes: ['checkbox', 'button', 'submit', 'range', 'radio', 'image'],
  createTextareaResizableShadow: function createTextareaResizableShadow() {
    var $shadowEl = $$1$1(document.createElement('textarea'));
    $shadowEl.addClass('textarea-resizable-shadow');
    $shadowEl.prop({
      disabled: true,
      readonly: true,
    });
    Input.textareaResizableShadow = $shadowEl;
  },
  textareaResizableShadow: undefined,
  resizeTextarea: function resizeTextarea(textareaEl) {
    var app = this;
    var $textareaEl = $$1$1(textareaEl);
    if (!Input.textareaResizableShadow) {
      Input.createTextareaResizableShadow();
    }
    var $shadowEl = Input.textareaResizableShadow;
    if (!$textareaEl.length) { return; }
    if (!$textareaEl.hasClass('resizable')) { return; }
    if (Input.textareaResizableShadow.parents().length === 0) {
      app.root.append($shadowEl);
    }

    var styles = window.getComputedStyle($textareaEl[0]);
    ('padding margin width font-size font-family font-style font-weight line-height font-variant text-transform letter-spacing border box-sizing display').split(' ').forEach(function (style) {
      var styleValue = styles[style];
      if (('font-size line-height letter-spacing width').split(' ').indexOf(style) >= 0) {
        styleValue = styleValue.replace(',', '.');
      }
      $shadowEl.css(style, styleValue);
    });
    var currentHeight = $textareaEl[0].clientHeight;

    $shadowEl.val('');
    var initialHeight = $shadowEl[0].scrollHeight;

    $shadowEl.val($textareaEl.val());
    $shadowEl.css('height', 0);
    var scrollHeight = $shadowEl[0].scrollHeight;

    if (currentHeight !== scrollHeight) {
      if (scrollHeight > initialHeight) {
        $textareaEl.css('height', (scrollHeight + "px"));
        $textareaEl.trigger('textarea:resize', initialHeight, currentHeight, scrollHeight);
      } else if (scrollHeight < currentHeight) {
        $textareaEl.css('height', '');
        $textareaEl.trigger('textarea:resize', initialHeight, currentHeight, initialHeight);
      }
    }
  },
  validate: function validate(inputEl) {
    var $inputEl = $$1$1(inputEl);
    if (!$inputEl.length) { return; }
    var $itemInputEl = $inputEl.parents('.item-input');
    var validity = $inputEl[0].validity;
    var validationMessage = $inputEl.dataset().errorMessage || $inputEl[0].validationMessage || '';
    if (!validity) { return; }
    if (!validity.valid) {
      var $errorEl = $inputEl.nextAll('.item-input-error-message');
      if (validationMessage) {
        if ($errorEl.length === 0) {
          $errorEl = $$1$1('<div class="item-input-error-message"></div>');
          $errorEl.insertAfter($inputEl);
        }
        $errorEl.text(validationMessage);
      }
      if ($errorEl.length > 0) {
        $itemInputEl.addClass('item-input-with-error-message');
      }
      $itemInputEl.addClass('item-input-invalid');
      $inputEl.addClass('input-invalid');
    } else {
      $itemInputEl.removeClass('item-input-invalid item-input-with-error-message');
      $inputEl.removeClass('input-invalid');
    }
  },
  validateInputs: function validateInputs(el) {
    var app = this;
    $$1$1(el).find('input, textarea, select').each(function (index, inputEl) {
      app.input.validate(inputEl);
    });
  },
  focus: function focus(inputEl) {
    var $inputEl = $$1$1(inputEl);
    var type = $inputEl.attr('type');
    if (Input.ignoreTypes.indexOf(type) >= 0) { return; }
    var $itemInputEl = $inputEl.parents('.item-input');
    $itemInputEl.addClass('item-input-focused');
    $inputEl.addClass('input-focused');
  },
  blur: function blur(inputEl) {
    $$1$1(inputEl).parents('.item-input').removeClass('item-input-focused');
    $$1$1(inputEl).removeClass('input-focused');
  },
  checkEmptyState: function checkEmptyState(inputEl) {
    var $inputEl = $$1$1(inputEl);
    var value = $inputEl.val();
    var $itemInputEl = $inputEl.parents('.item-input');
    if ((value && (typeof value === 'string' && value.trim() !== '')) || (Array.isArray(value) && value.length > 0)) {
      $itemInputEl.addClass('item-input-with-value');
      $inputEl.addClass('input-with-value');
      $inputEl.trigger('input:notempty');
    } else {
      $itemInputEl.removeClass('item-input-with-value');
      $inputEl.removeClass('input-with-value');
      $inputEl.trigger('input:empty');
    }
  },
  scrollIntoView: function scrollIntoView(inputEl, duration, centered) {
    if ( duration === void 0 ) duration = 0;

    var $inputEl = $$1$1(inputEl);
    var $scrollableEl = $inputEl.parents('.page-content, .panel').eq(0);
    if (!$scrollableEl.length) {
      return false;
    }
    var contentHeight = $scrollableEl[0].offsetHeight;
    var contentScrollTop = $scrollableEl[0].scrollTop;
    var contentPaddingTop = parseInt($scrollableEl.css('padding-top'), 10);
    var contentPaddingBottom = parseInt($scrollableEl.css('padding-bottom'), 10);
    var contentOffsetTop = $scrollableEl.offset().top - contentScrollTop;

    var inputOffsetTop = $inputEl.offset().top - contentOffsetTop;
    var inputHeight = $inputEl[0].offsetHeight;

    var min = (inputOffsetTop + contentScrollTop) - contentPaddingTop;
    var max = ((inputOffsetTop + contentScrollTop) - contentHeight) + contentPaddingBottom + inputHeight;
    var centeredPosition = min + ((max - min) / 2);

    if (contentScrollTop > min) {
      $scrollableEl.scrollTop(centered ? centeredPosition : min, duration);
      return true;
    } else if (contentScrollTop < max) {
      $scrollableEl.scrollTop(centered ? centeredPosition : max, duration);
      return true;
    }
    return false;
  },
  init: function init() {
    var app = this;
    Input.createTextareaResizableShadow();
    function onFocus() {
      var inputEl = this;
      if (app.params.input.scrollIntoViewOnFocus) {
        if (Device.android) {
          $$1$1(window).once('resize', function () {
            if (document && document.activeElement === inputEl) {
              app.input.scrollIntoView(inputEl, app.params.input.scrollIntoViewCentered);
            }
          });
        } else {
          app.input.scrollIntoView(inputEl, app.params.input.scrollIntoViewCentered);
        }
      }
      app.input.focus(inputEl);
    }
    function onBlur() {
      var $inputEl = $$1$1(this);
      var tag = $inputEl[0].nodeName.toLowerCase();
      app.input.blur($inputEl);
      if ($inputEl.dataset().validate || $inputEl.attr('validate') !== null) {
        app.input.validate($inputEl);
      }
      // Resize textarea
      if (tag === 'textarea' && $inputEl.hasClass('resizable')) {
        if (Input.textareaResizableShadow) { Input.textareaResizableShadow.remove(); }
      }
    }
    function onChange() {
      var $inputEl = $$1$1(this);
      var type = $inputEl.attr('type');
      var tag = $inputEl[0].nodeName.toLowerCase();
      if (Input.ignoreTypes.indexOf(type) >= 0) { return; }

      // Check Empty State
      app.input.checkEmptyState($inputEl);

      // Check validation
      if ($inputEl.dataset().validate || $inputEl.attr('validate') !== null) {
        app.input.validate($inputEl);
      }

      // Resize textarea
      if (tag === 'textarea' && $inputEl.hasClass('resizable')) {
        app.input.resizeTextarea($inputEl);
      }
    }
    function onInvalid(e) {
      var $inputEl = $$1$1(this);
      if ($inputEl.dataset().validate || $inputEl.attr('validate') !== null) {
        e.preventDefault();
        app.input.validate($inputEl);
      }
    }
    function clearInput() {
      var $clicked = $$1$1(this);
      var $inputEl = $clicked.siblings('input, textarea').eq(0);
      var previousValue = $inputEl.val();
      $inputEl
        .val('')
        .trigger('change')
        .focus()
        .trigger('input:clear', previousValue);
    }
    $$1$1(document).on('click', '.input-clear-button', clearInput);
    $$1$1(document).on('change input', 'input, textarea, select', onChange, true);
    $$1$1(document).on('focus', 'input, textarea, select', onFocus, true);
    $$1$1(document).on('blur', 'input, textarea, select', onBlur, true);
    $$1$1(document).on('invalid', 'input, textarea, select', onInvalid, true);
  },
};

var Input$1 = {
  name: 'input',
  params: {
    input: {
      scrollIntoViewOnFocus: Device.android,
      scrollIntoViewCentered: false,
    },
  },
  create: function create() {
    var app = this;
    Utils.extend(app, {
      input: {
        scrollIntoView: Input.scrollIntoView.bind(app),
        focus: Input.focus.bind(app),
        blur: Input.blur.bind(app),
        validate: Input.validate.bind(app),
        validateInputs: Input.validate.bind(app),
        checkEmptyState: Input.checkEmptyState.bind(app),
        resizeTextarea: Input.resizeTextarea.bind(app),
        init: Input.init.bind(app),
      },
    });
  },
  on: {
    init: function init() {
      var app = this;
      app.input.init();
    },
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      var $tabEl = $$1$1(tabEl);
      $tabEl.find('.item-input').each(function (itemInputIndex, itemInputEl) {
        var $itemInputEl = $$1$1(itemInputEl);
        $itemInputEl.find('input, select, textarea').each(function (inputIndex, inputEl) {
          var $inputEl = $$1$1(inputEl);
          if (Input.ignoreTypes.indexOf($inputEl.attr('type')) >= 0) { return; }
          app.input.checkEmptyState($inputEl);
        });
      });
      $tabEl.find('textarea.resizable').each(function (textareaIndex, textareaEl) {
        app.input.resizeTextarea(textareaEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      var $pageEl = page.$el;
      $pageEl.find('.item-input').each(function (itemInputIndex, itemInputEl) {
        var $itemInputEl = $$1$1(itemInputEl);
        $itemInputEl.find('input, select, textarea').each(function (inputIndex, inputEl) {
          var $inputEl = $$1$1(inputEl);
          if (Input.ignoreTypes.indexOf($inputEl.attr('type')) >= 0) { return; }
          app.input.checkEmptyState($inputEl);
        });
      });
      $pageEl.find('textarea.resizable').each(function (textareaIndex, textareaEl) {
        app.input.resizeTextarea(textareaEl);
      });
    },
  },
};

var Checkbox = {
  name: 'checkbox',
};

var Radio = {
  name: 'radio',
};

var Toggle$1 = (function (Framework7Class$$1) {
  function Toggle(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);
    var toggle = this;

    var defaults = {};

    // Extend defaults with modules params
    toggle.useModulesParams(defaults);

    toggle.params = Utils.extend(defaults, params);

    var el = toggle.params.el;
    if (!el) { return toggle; }

    var $el = $$1$1(el);
    if ($el.length === 0) { return toggle; }


    var $inputEl = $el.children('input[type="checkbox"]');

    Utils.extend(toggle, {
      app: app,
      $el: $el,
      el: $el[0],
      $inputEl: $inputEl,
      inputEl: $inputEl[0],
      disabled: $el.hasClass('disabled') || $inputEl.hasClass('disabled') || $inputEl.attr('disabled') || $inputEl[0].disabled,
    });

    Object.defineProperty(toggle, 'checked', {
      enumerable: true,
      configurable: true,
      set: function set(checked) {
        if (!toggle || typeof toggle.$inputEl === 'undefined') { return; }
        if (toggle.checked === checked) { return; }
        $inputEl[0].checked = checked;
        toggle.$inputEl.trigger('change');
      },
      get: function get() {
        return $inputEl[0].checked;
      },
    });

    $el[0].f7Toggle = toggle;

    var isTouched;
    var touchesStart = {};
    var isScrolling;
    var touchesDiff;
    var toggleWidth;
    var touchStartTime;
    var touchStartChecked;
    function handleTouchStart(e) {
      if (isTouched || toggle.disabled) { return; }
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      touchesDiff = 0;

      isTouched = true;
      isScrolling = undefined;
      touchStartTime = Utils.now();
      touchStartChecked = toggle.checked;

      toggleWidth = $el[0].offsetWidth;
      Utils.nextTick(function () {
        if (isTouched) {
          $el.addClass('toggle-active-state');
        }
      });
    }
    function handleTouchMove(e) {
      if (!isTouched || toggle.disabled) { return; }
      var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      var inverter = app.rtl ? -1 : 1;

      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      if (isScrolling) {
        isTouched = false;
        return;
      }
      e.preventDefault();

      touchesDiff = pageX - touchesStart.x;


      var changed;
      if (touchesDiff * inverter < 0 && Math.abs(touchesDiff) > toggleWidth / 3 && touchStartChecked) {
        changed = true;
      }
      if (touchesDiff * inverter > 0 && Math.abs(touchesDiff) > toggleWidth / 3 && !touchStartChecked) {
        changed = true;
      }
      if (changed) {
        touchesStart.x = pageX;
        toggle.checked = !touchStartChecked;
        touchStartChecked = !touchStartChecked;
      }
    }
    function handleTouchEnd() {
      if (!isTouched || toggle.disabled) {
        if (isScrolling) { $el.removeClass('toggle-active-state'); }
        isTouched = false;
        return;
      }
      var inverter = app.rtl ? -1 : 1;
      isTouched = false;

      $el.removeClass('toggle-active-state');

      var changed;
      if ((Utils.now() - touchStartTime) < 300) {
        if (touchesDiff * inverter < 0 && touchStartChecked) {
          changed = true;
        }
        if (touchesDiff * inverter > 0 && !touchStartChecked) {
          changed = true;
        }
        if (changed) {
          toggle.checked = !touchStartChecked;
        }
      }
    }
    function handleInputChange() {
      toggle.$el.trigger('toggle:change', toggle);
      toggle.emit('local::change toggleChange', toggle);
    }
    toggle.attachEvents = function attachEvents() {
      {
        if (!Support$1.touch) { return; }
        var passive = Support$1.passiveListener ? { passive: true } : false;
        $el.on(app.touchEvents.start, handleTouchStart, passive);
        app.on('touchmove', handleTouchMove);
        app.on('touchend:passive', handleTouchEnd);
      }
      toggle.$inputEl.on('change', handleInputChange);
    };
    toggle.detachEvents = function detachEvents() {
      {
        if (!Support$1.touch) { return; }
        var passive = Support$1.passiveListener ? { passive: true } : false;
        $el.off(app.touchEvents.start, handleTouchStart, passive);
        app.off('touchmove', handleTouchMove);
        app.off('touchend:passive', handleTouchEnd);
      }
      toggle.$inputEl.off('change', handleInputChange);
    };


    // Install Modules
    toggle.useModules();

    // Init
    toggle.init();
  }

  if ( Framework7Class$$1 ) Toggle.__proto__ = Framework7Class$$1;
  Toggle.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Toggle.prototype.constructor = Toggle;
  Toggle.prototype.toggle = function toggle () {
    var toggle = this;
    toggle.checked = !toggle.checked;
  };
  Toggle.prototype.init = function init () {
    var toggle = this;
    toggle.attachEvents();
  };
  Toggle.prototype.destroy = function destroy () {
    var toggle = this;
    toggle.$el.trigger('toggle:beforedestroy', toggle);
    toggle.emit('local::beforeDestroy toggleBeforeDestroy', toggle);
    delete toggle.$el[0].f7Toggle;
    toggle.detachEvents();
    Utils.deleteProps(toggle);
    toggle = null;
  };

  return Toggle;
}(Framework7Class));

var Toggle = {
  name: 'toggle',
  create: function create() {
    var app = this;
    app.toggle = ConstructorMethods({
      defaultSelector: '.toggle',
      constructor: Toggle$1,
      app: app,
      domProp: 'f7Toggle',
    });
  },
  static: {
    Toggle: Toggle$1,
  },
  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      $$1$1(tabEl).find('.toggle-init').each(function (index, toggleEl) { return app.toggle.create({ el: toggleEl }); });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      $$1$1(tabEl).find('.toggle-init').each(function (index, toggleEl) {
        if (toggleEl.f7Toggle) { toggleEl.f7Toggle.destroy(); }
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.toggle-init').each(function (index, toggleEl) { return app.toggle.create({ el: toggleEl }); });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      page.$el.find('.toggle-init').each(function (index, toggleEl) {
        if (toggleEl.f7Toggle) { toggleEl.f7Toggle.destroy(); }
      });
    },
  },
};

var Range$1 = (function (Framework7Class$$1) {
  function Range(app, params) {
    Framework7Class$$1.call(this, params, [app]);
    var range = this;
    var defaults = {
      dual: false,
      step: 1,
      label: false,
    };

    // Extend defaults with modules params
    range.useModulesParams(defaults);

    range.params = Utils.extend(defaults, params);

    var el = range.params.el;
    if (!el) { return range; }

    var $el = $$1$1(el);
    if ($el.length === 0) { return range; }

    var dataset = $el.dataset();

    ('step min max value').split(' ').forEach(function (paramName) {
      if (typeof params[paramName] === 'undefined' && typeof dataset[paramName] !== 'undefined') {
        range.params[paramName] = parseFloat(dataset[paramName]);
      }
    });
    ('dual label').split(' ').forEach(function (paramName) {
      if (typeof params[paramName] === 'undefined' && typeof dataset[paramName] !== 'undefined') {
        range.params[paramName] = dataset[paramName];
      }
    });


    if (!range.params.value) {
      if (typeof dataset.value !== 'undefined') { range.params.value = dataset.value; }
      if (typeof dataset.valueLeft !== 'undefined' && typeof dataset.valueRight !== 'undefined') {
        range.params.value = [parseFloat(dataset.valueLeft), parseFloat(dataset.valueRight)];
      }
    }

    var $inputEl;
    if (!range.params.dual) {
      if (range.params.inputEl) {
        $inputEl = $$1$1(range.params.inputEl);
      } else if ($el.find('input[type="range"]').length) {
        $inputEl = $el.find('input[type="range"]').eq(0);
      }
    }


    Utils.extend(range, range.params, {
      $el: $el,
      el: $el[0],
      $inputEl: $inputEl,
      inputEl: $inputEl ? $inputEl[0] : undefined,
    });

    if ($inputEl) {
      ('step min max').split(' ').forEach(function (paramName) {
        if (!params[paramName] && $inputEl.attr(paramName)) {
          range.params[paramName] = parseFloat($inputEl.attr(paramName));
          range[paramName] = parseFloat($inputEl.attr(paramName));
        }
        if (typeof $inputEl.val() !== 'undefined') {
          range.params.value = parseFloat($inputEl.val());
          range.value = parseFloat($inputEl.val());
        }
      });
    }

    // Dual
    if (range.dual) {
      $el.addClass('range-slider-dual');
    }
    if (range.label) {
      $el.addClass('range-slider-label');
    }

    // Check for layout
    var $barEl = $$1$1('<div class="range-bar"></div>');
    var $barActiveEl = $$1$1('<div class="range-bar-active"></div>');
    $barEl.append($barActiveEl);

    // Create Knobs
    var knobHTML = "\n      <div class=\"range-knob-wrap\">\n        <div class=\"range-knob\"></div>\n        " + (range.label ? '<div class="range-knob-label"></div>' : '') + "\n      </div>\n    ";
    var knobs = [$$1$1(knobHTML)];
    var labels = [];

    if (range.dual) {
      knobs.push($$1$1(knobHTML));
    }

    $el.append($barEl);
    knobs.forEach(function ($knobEl) {
      $el.append($knobEl);
    });

    // Labels
    if (range.label) {
      labels.push(knobs[0].find('.range-knob-label'));
      if (range.dual) {
        labels.push(knobs[1].find('.range-knob-label'));
      }
    }

    Utils.extend(range, {
      app: app,
      knobs: knobs,
      labels: labels,
      $barEl: $barEl,
      $barActiveEl: $barActiveEl,
    });

    $el[0].f7Range = range;

    // Touch Events
    var isTouched;
    var touchesStart = {};
    var isScrolling;
    var rangeOffsetLeft;
    var $touchedKnobEl;
    var dualValueIndex;

    function handleTouchStart(e) {
      if (isTouched) { return; }
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;

      isTouched = true;
      isScrolling = undefined;
      rangeOffsetLeft = $el.offset().left;

      var progress;
      if (range.app.rtl) {
        progress = ((rangeOffsetLeft + range.rangeWidth) - touchesStart.x) / range.rangeWidth;
      } else {
        progress = (touchesStart.x - rangeOffsetLeft) / range.rangeWidth;
      }

      var newValue = (progress * (range.max - range.min)) + range.min;
      if (range.dual) {
        if (Math.abs(range.value[0] - newValue) < Math.abs(range.value[1] - newValue)) {
          dualValueIndex = 0;
          $touchedKnobEl = range.knobs[0];
          newValue = [newValue, range.value[1]];
        } else {
          dualValueIndex = 1;
          $touchedKnobEl = range.knobs[1];
          newValue = [range.value[0], newValue];
        }
      } else {
        $touchedKnobEl = range.knobs[0];
        newValue = (progress * (range.max - range.min)) + range.min;
      }
      Utils.nextTick(function () {
        if (isTouched) { $touchedKnobEl.addClass('range-knob-active-state'); }
      }, 70);
      range.setValue(newValue);
    }
    function handleTouchMove(e) {
      if (!isTouched) { return; }
      var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      if (isScrolling) {
        isTouched = false;
        return;
      }
      e.preventDefault();

      var progress;
      if (range.app.rtl) {
        progress = ((rangeOffsetLeft + range.rangeWidth) - pageX) / range.rangeWidth;
      } else {
        progress = (pageX - rangeOffsetLeft) / range.rangeWidth;
      }

      var newValue = (progress * (range.max - range.min)) + range.min;
      if (range.dual) {
        var leftValue;
        var rightValue;
        if (dualValueIndex === 0) {
          leftValue = newValue;
          rightValue = range.value[1];
          if (leftValue > rightValue) {
            rightValue = leftValue;
          }
        } else {
          leftValue = range.value[0];
          rightValue = newValue;
          if (rightValue < leftValue) {
            leftValue = rightValue;
          }
        }
        newValue = [leftValue, rightValue];
      }
      range.setValue(newValue);
    }
    function handleTouchEnd() {
      if (!isTouched) {
        if (isScrolling) { $touchedKnobEl.removeClass('range-knob-active-state'); }
        isTouched = false;
        return;
      }
      isTouched = false;
      $touchedKnobEl.removeClass('range-knob-active-state');
    }

    function handleResize() {
      range.calcSize();
      range.layout();
    }
    range.attachEvents = function attachEvents() {
      var passive = Support$1.passiveListener ? { passive: true } : false;
      range.$el.on(app.touchEvents.start, handleTouchStart, passive);
      app.on('touchmove', handleTouchMove);
      app.on('touchend:passive', handleTouchEnd);
      app.on('tabShow', handleResize);
      app.on('resize', handleResize);
    };
    range.detachEvents = function detachEvents() {
      var passive = Support$1.passiveListener ? { passive: true } : false;
      range.$el.off(app.touchEvents.start, handleTouchStart, passive);
      app.off('touchmove', handleTouchMove);
      app.off('touchend:passive', handleTouchEnd);
      app.off('tabShow', handleResize);
      app.off('resize', handleResize);
    };

    // Install Modules
    range.useModules();

    // Init
    range.init();

    return range;
  }

  if ( Framework7Class$$1 ) Range.__proto__ = Framework7Class$$1;
  Range.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Range.prototype.constructor = Range;
  Range.prototype.calcSize = function calcSize () {
    var range = this;
    var width = range.$el.outerWidth();
    if (width === 0) { return; }
    range.rangeWidth = width;
    range.knobWidth = range.knobs[0].outerWidth();
  };
  Range.prototype.layout = function layout () {
    var obj;

    var range = this;
    var app = range.app;
    var knobWidth = range.knobWidth;
    var rangeWidth = range.rangeWidth;
    var min = range.min;
    var max = range.max;
    var knobs = range.knobs;
    var $barActiveEl = range.$barActiveEl;
    var value = range.value;
    var label = range.label;
    var labels = range.labels;
    var positionProperty = app.rtl ? 'right' : 'left';
    if (range.dual) {
      var progress = [((value[0] - min) / (max - min)), ((value[1] - min) / (max - min))];
      $barActiveEl.css(( obj = {}, obj[positionProperty] = ((progress[0] * 100) + "%"), obj.width = (((progress[1] - progress[0]) * 100) + "%"), obj ));
      knobs.forEach(function ($knobEl, knobIndex) {
        var leftPos = rangeWidth * progress[knobIndex];
        var realLeft = (rangeWidth * progress[knobIndex]) - (knobWidth / 2);
        if (realLeft < 0) { leftPos = knobWidth / 2; }
        if ((realLeft + knobWidth) > rangeWidth) { leftPos = rangeWidth - (knobWidth / 2); }
        $knobEl.css(positionProperty, (leftPos + "px"));
        if (label) { labels[knobIndex].text(value[knobIndex]); }
      });
    } else {
      var progress$1 = ((value - min) / (max - min));
      $barActiveEl.css('width', ((progress$1 * 100) + "%"));

      var leftPos = rangeWidth * progress$1;
      var realLeft = (rangeWidth * progress$1) - (knobWidth / 2);
      if (realLeft < 0) { leftPos = knobWidth / 2; }
      if ((realLeft + knobWidth) > rangeWidth) { leftPos = rangeWidth - (knobWidth / 2); }
      knobs[0].css(positionProperty, (leftPos + "px"));
      if (label) { labels[0].text(value); }
    }
    if ((range.dual && value.indexOf(min) >= 0) || (!range.dual && value === min)) {
      range.$el.addClass('range-slider-min');
    } else {
      range.$el.removeClass('range-slider-min');
    }
    if ((range.dual && value.indexOf(max) >= 0) || (!range.dual && value === max)) {
      range.$el.addClass('range-slider-max');
    } else {
      range.$el.removeClass('range-slider-max');
    }
  };
  Range.prototype.setValue = function setValue (newValue) {
    var range = this;
    var step = range.step;
    var min = range.min;
    var max = range.max;
    if (range.dual) {
      var newValues = newValue;
      if (!Array.isArray(newValues)) { newValues = [newValue, newValue]; }
      if (newValue[0] > newValue[1]) {
        newValues = [newValues[0], newValues[0]];
      }
      newValues = newValues.map(function (value) { return Math.max(Math.min(Math.round(value / step) * step, max), min); });
      if (newValues[0] === range.value[0] && newValues[1] === range.value[1]) {
        return range;
      }
      newValues.forEach(function (value, valueIndex) {
        range.value[valueIndex] = value;
      });
      range.layout();
    } else {
      var value = Math.max(Math.min(Math.round(newValue / step) * step, max), min);
      range.value = value;
      range.layout();
    }
    // Events
    range.$el.trigger('range:change', range, range.value);
    if (range.$inputEl && !range.dual) {
      range.$inputEl.val(range.value).trigger('input change');
    }
    range.emit('local::change rangeChange', range, range.value);
    return range;
  };
  Range.prototype.getValue = function getValue () {
    return this.value;
  };
  Range.prototype.init = function init () {
    var range = this;
    range.calcSize();
    range.layout();
    range.attachEvents();
    return range;
  };
  Range.prototype.destroy = function destroy () {
    var range = this;
    range.$el.trigger('range:beforedestroy', range);
    range.emit('local::beforeDestroy rangeBeforeDestroy', range);
    delete range.$el[0].f7Range;
    range.detachEvents();
    Utils.deleteProps(range);
    range = null;
  };

  return Range;
}(Framework7Class));

var Range = {
  name: 'range',
  create: function create() {
    var app = this;
    app.range = Utils.extend(
      ConstructorMethods({
        defaultSelector: '.range-slider',
        constructor: Range$1,
        app: app,
        domProp: 'f7Range',
      }),
      {
        getValue: function getValue(el) {
          if ( el === void 0 ) el = '.range-slider';

          var range = app.range.get(el);
          if (range) { return range.getValue(); }
          return undefined;
        },
        setValue: function setValue(el, value) {
          if ( el === void 0 ) el = '.range-slider';

          var range = app.range.get(el);
          if (range) { return range.setValue(value); }
          return undefined;
        },
      }
    );
  },
  static: {
    Range: Range$1,
  },
  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      $$1$1(tabEl).find('.range-slider-init').each(function (index, rangeEl) { return new Range$1(app, {
        el: rangeEl,
      }); });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      $$1$1(tabEl).find('.range-slider-init').each(function (index, rangeEl) {
        if (rangeEl.f7Range) { rangeEl.f7Range.destroy(); }
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.range-slider-init').each(function (index, rangeEl) { return new Range$1(app, {
        el: rangeEl,
      }); });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      page.$el.find('.range-slider-init').each(function (index, rangeEl) {
        if (rangeEl.f7Range) { rangeEl.f7Range.destroy(); }
      });
    },
  },
};

var SmartSelect$1 = (function (Framework7Class$$1) {
  function SmartSelect(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);
    var ss = this;
    ss.app = app;
    var defaults = Utils.extend({
      on: {},
    }, app.params.smartSelect);

    var $el = $$1$1(params.el).eq(0);
    if ($el.length === 0) { return ss; }

    var $selectEl = $el.find('select').eq(0);
    if ($selectEl.length === 0) { return ss; }

    var $valueEl = $$1$1(params.valueEl);
    if ($valueEl.length === 0) {
      $valueEl = $$1$1('<div class="item-after"></div>');
      $valueEl.insertAfter($el.find('.item-title'));
    }

    // Extend defaults with modules params
    ss.useModulesParams(defaults);

    // View
    var view = $el.parents('.view').length && $el.parents('.view')[0].f7View;
    if (!view) {
      throw Error('Smart Select requires initialized View');
    }

    // Url
    var url = params.url;
    if (!url) {
      if ($el.attr('href') && $el.attr('href') !== '#') { url = $el.attr('href'); }
      else { url = ($selectEl.attr('name').toLowerCase()) + "-select/"; }
    }
    if (!url) { url = ss.params.url; }

    var multiple = $selectEl[0].multiple;
    var inputType = multiple ? 'checkbox' : 'radio';
    var id = Utils.now();
    Utils.extend(ss, {
      params: Utils.extend(defaults, params),
      $el: $el,
      el: $el[0],
      $selectEl: $selectEl,
      selectEl: $selectEl[0],
      $valueEl: $valueEl,
      valueEl: $valueEl[0],
      url: url,
      multiple: multiple,
      inputType: inputType,
      id: id,
      view: view,
      inputName: (inputType + "-" + id),
      selectName: $selectEl.attr('name'),
      maxLength: $selectEl.attr('maxlength') || params.maxLength,
    });
    $el[0].f7SmartSelect = ss;

    // Events
    function onClick() {
      ss.open();
    }
    function onChange() {
      ss.setValue();
    }
    ss.attachEvents = function attachEvents() {
      $el.on('click', onClick);
      $el.on('change', 'input[type="checkbox"], input[type="radio"]', onChange);
    };
    ss.detachEvents = function detachEvents() {
      $el.off('click', onClick);
      $el.off('change', 'input[type="checkbox"], input[type="radio"]', onChange);
    };

    function handleInputChange() {
      var optionEl;
      var text;
      var inputEl = this;
      var value = inputEl.value;
      var optionText = [];
      var displayAs;
      if (inputEl.type === 'checkbox') {
        for (var i = 0; i < ss.selectEl.options.length; i += 1) {
          optionEl = ss.selectEl.options[i];
          if (optionEl.value === value) {
            optionEl.selected = inputEl.checked;
          }
          if (optionEl.selected) {
            displayAs = optionEl.dataset ? optionEl.dataset.displayAs : $$1$1(optionEl).data('display-value-as');
            text = displayAs && typeof displayAs !== 'undefined' ? displayAs : optionEl.textContent;
            optionText.push(text.trim());
          }
        }
        if (ss.maxLength) {
          ss.checkMaxLength();
        }
      } else {
        optionEl = ss.$selectEl.find(("option[value=\"" + value + "\"]"))[0];
        displayAs = optionEl.dataset ? optionEl.dataset.displayAs : $$1$1(optionEl).data('display-as');
        text = displayAs && typeof displayAs !== 'undefined' ? displayAs : optionEl.textContent;
        optionText = [text];
        ss.selectEl.value = value;
      }

      ss.$selectEl.trigger('change');
      ss.$valueEl.text(optionText.join(', '));
      if (ss.params.closeOnSelect && ss.inputType === 'radio') {
        ss.close();
      }
    }

    ss.attachInputsEvents = function attachInputsEvents() {
      ss.$containerEl.on('change', 'input[type="checkbox"], input[type="radio"]', handleInputChange);
    };
    ss.detachInputsEvents = function detachInputsEvents() {
      ss.$containerEl.off('change', 'input[type="checkbox"], input[type="radio"]', handleInputChange);
    };

    // Install Modules
    ss.useModules();

    // Init
    ss.init();

    return ss;
  }

  if ( Framework7Class$$1 ) SmartSelect.__proto__ = Framework7Class$$1;
  SmartSelect.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  SmartSelect.prototype.constructor = SmartSelect;
  SmartSelect.prototype.checkMaxLength = function checkMaxLength () {
    var ss = this;
    var $containerEl = ss.$containerEl;
    if (ss.selectEl.selectedOptions.length >= ss.maxLength) {
      $containerEl.find('input[type="checkbox"]').each(function (index, inputEl) {
        if (!inputEl.checked) {
          $$1$1(inputEl).parents('li').addClass('disabled');
        } else {
          $$1$1(inputEl).parents('li').removeClass('disabled');
        }
      });
    } else {
      $containerEl.find('.disabled').removeClass('disabled');
    }
  };
  SmartSelect.prototype.setValue = function setValue (value) {
    var ss = this;
    var valueArray = [];
    if (typeof value !== 'undefined') {
      if (Array.isArray(value)) {
        valueArray = value;
      } else {
        valueArray = [value];
      }
    } else {
      ss.$selectEl.find('option').each(function (optionIndex, optionEl) {
        var $optionEl = $$1$1(optionEl);
        if (optionEl.selected) {
          var displayAs = optionEl.dataset ? optionEl.dataset.displayAs : $optionEl.data('display-value-as');
          if (displayAs && typeof displayAs !== 'undefined') {
            valueArray.push(displayAs);
          } else {
            valueArray.push(optionEl.textContent.trim());
          }
        }
      });
    }
    ss.$valueEl.text(valueArray.join(', '));
  };
  SmartSelect.prototype.getItemsData = function getItemsData () {
    var ss = this;
    var items = [];
    var previousGroupEl;
    ss.$selectEl.find('option').each(function (index, optionEl) {
      var $optionEl = $$1$1(optionEl);
      var optionData = $optionEl.dataset();
      var optionImage = optionData.optionImage || ss.params.optionImage;
      var optionIcon = optionData.optionIcon || ss.params.optionIcon;
      var optionHasMedia = optionImage || optionIcon;
      // if (material) optionHasMedia = optionImage || optionIcon;
      var optionColor = optionData.optionColor;

      var optionClassName = optionData.optionClass || '';
      if ($optionEl[0].disabled) { optionClassName += ' disabled'; }

      var optionGroupEl = $optionEl.parent('optgroup')[0];
      var optionGroupLabel = optionGroupEl && optionGroupEl.label;
      var optionIsLabel = false;
      if (optionGroupEl && optionGroupEl !== previousGroupEl) {
        optionIsLabel = true;
        previousGroupEl = optionGroupEl;
        items.push({
          groupLabel: optionGroupLabel,
          isLabel: optionIsLabel,
        });
      }
      items.push({
        value: $optionEl[0].value,
        text: $optionEl[0].textContent.trim(),
        selected: $optionEl[0].selected,
        groupEl: optionGroupEl,
        groupLabel: optionGroupLabel,
        image: optionImage,
        icon: optionIcon,
        color: optionColor,
        className: optionClassName,
        disabled: $optionEl[0].disabled,
        id: ss.id,
        hasMedia: optionHasMedia,
        checkbox: ss.inputType === 'checkbox',
        radio: ss.inputType === 'radio',
        inputName: ss.inputName,
        inputType: ss.inputType,
      });
    });
    ss.items = items;
    return items;
  };
  SmartSelect.prototype.renderSearchbar = function renderSearchbar () {
    var ss = this;
    if (ss.params.renderSearchbar) { return ss.params.renderSearchbar.call(ss); }
    var searchbarHTML = "\n      <form class=\"searchbar\">\n        <div class=\"searchbar-inner\">\n          <div class=\"searchbar-input-wrap\">\n            <input type=\"search\" placeholder=\"" + (ss.params.searchbarPlaceholder) + "\"/>\n            <i class=\"searchbar-icon\"></i>\n            <span class=\"input-clear-button\"></span>\n          </div>\n          <span class=\"searchbar-disable-button\">" + (ss.params.searchbarDisableText) + "</span>\n        </div>\n      </form>\n    ";
    return searchbarHTML;
  };
  SmartSelect.prototype.renderItem = function renderItem (item, index) {
    var ss = this;
    if (ss.params.renderItem) { return ss.params.renderItem.call(ss, item, index); }
    var itemHtml;
    if (item.isLabel) {
      itemHtml = "<li class=\"item-divider\">" + (item.groupLabel) + "</li>";
    } else {
      itemHtml = "\n        <li class=\"" + (item.className || '') + "\">\n          <label class=\"item-" + (item.inputType) + " item-content\">\n            <input type=\"" + (item.inputType) + "\" name=\"" + (item.inputName) + "\" value=\"" + (item.value) + "\" " + (item.selected ? 'checked' : '') + "/>\n            <i class=\"icon icon-" + (item.inputType) + "\"></i>\n            " + (item.hasMedia ? ("\n              <div class=\"item-media\">\n                " + (item.icon ? ("<i class=\"icon " + (item.icon) + "\"></i>") : '') + "\n                " + (item.image ? ("<img src=\"" + (item.image) + "\">") : '') + "\n              </div>\n            ") : '') + "\n            <div class=\"item-inner\">\n              <div class=\"item-title" + (item.color ? (" color-" + (item.color)) : '') + "\">" + (item.text) + "</div>\n            </div>\n          </label>\n        </li>\n      ";
    }
    return itemHtml;
  };
  SmartSelect.prototype.renderItems = function renderItems () {
    var ss = this;
    if (ss.params.renderItems) { return ss.params.renderItems.call(ss, ss.items); }
    var itemsHtml = "\n      " + (ss.items.map(function (item, index) { return ("" + (ss.renderItem(item, index))); }).join('')) + "\n    ";
    return itemsHtml;
  };
  SmartSelect.prototype.renderPage = function renderPage () {
    var ss = this;
    if (ss.params.renderPage) { return ss.params.renderPage.call(ss, ss.items); }
    var pageTitle = ss.params.pageTitle;
    if (typeof pageTitle === 'undefined') {
      pageTitle = ss.$el.find('.item-title').text().trim();
    }
    var pageHtml = "\n      <div class=\"page smart-select-page\" data-name=\"smart-select-page\" data-select-name=\"" + (ss.selectName) + "\">\n        <div class=\"navbar " + (ss.params.navbarColorTheme ? ("color-theme-" + (ss.params.navbarColorTheme)) : '') + "\">\n          <div class=\"navbar-inner sliding " + (ss.params.navbarColorTheme ? ("color-theme-" + (ss.params.navbarColorTheme)) : '') + "\">\n            <div class=\"left\">\n              <a href=\"#\" class=\"link back\">\n                <i class=\"icon icon-back\"></i>\n                <span class=\"ios-only\">" + (ss.params.pageBackLinkText) + "</span>\n              </a>\n            </div>\n            " + (pageTitle ? ("<div class=\"title\">" + pageTitle + "</div>") : '') + "\n            " + (ss.params.searchbar ? ("<div class=\"subnavbar\">" + (ss.renderSearchbar()) + "</div>") : '') + "\n          </div>\n        </div>\n        " + (ss.params.searchbar ? '<div class="searchbar-backdrop"></div>' : '') + "\n        <div class=\"page-content\">\n          <div class=\"list smart-select-list-" + (ss.id) + " " + (ss.params.virtualList ? ' virtual-list' : '') + " " + (ss.params.formColorTheme ? ("color-theme-" + (ss.params.formColorTheme)) : '') + "\">\n            <ul>" + (!ss.params.virtualList && ss.renderItems(ss.items)) + "</ul>\n          </div>\n        </div>\n      </div>\n    ";
    return pageHtml;
  };
  SmartSelect.prototype.renderPopup = function renderPopup () {
    var ss = this;
    if (ss.params.renderPopup) { return ss.params.renderPopup.call(ss, ss.items); }
    var pageTitle = ss.params.pageTitle;
    if (typeof pageTitle === 'undefined') {
      pageTitle = ss.$el.find('.item-title').text().trim();
    }
    var popupHtml = "\n      <div class=\"popup smart-select-popup\" data-select-name=\"" + (ss.selectName) + "\">\n        <div class=\"view\">\n          <div class=\"page smart-select-page " + (ss.params.searchbar ? 'page-with-subnavbar' : '') + "\" data-name=\"smart-select-page\">\n            <div class=\"navbar" + (ss.params.navbarColorTheme ? ("theme-" + (ss.params.navbarColorTheme)) : '') + "\">\n              <div class=\"navbar-inner sliding\">\n                <div class=\"left\">\n                  <a href=\"#\" class=\"link popup-close\">\n                    <i class=\"icon icon-back\"></i>\n                    <span class=\"ios-only\">" + (ss.params.popupCloseLinkText) + "</span>\n                  </a>\n                </div>\n                " + (pageTitle ? ("<div class=\"title\">" + pageTitle + "</div>") : '') + "\n                " + (ss.params.searchbar ? ("<div class=\"subnavbar\">" + (ss.renderSearchbar()) + "</div>") : '') + "\n              </div>\n            </div>\n            " + (ss.params.searchbar ? '<div class="searchbar-backdrop"></div>' : '') + "\n            <div class=\"page-content\">\n              <div class=\"list smart-select-list-" + (ss.id) + " " + (ss.params.virtualList ? ' virtual-list' : '') + (ss.params.formColorTheme ? ("theme-" + (ss.params.formColorTheme)) : '') + "\">\n                <ul>" + (!ss.params.virtualList && ss.renderItems(ss.items)) + "</ul>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ";
    return popupHtml;
  };
  SmartSelect.prototype.renderSheet = function renderSheet () {
    var ss = this;
    if (ss.params.renderSheet) { return ss.params.renderSheet.call(ss, ss.items); }
    var sheetHtml = "\n      <div class=\"sheet-modal smart-select-sheet\" data-select-name=\"" + (ss.selectName) + "\">\n        <div class=\"toolbar " + (ss.params.toolbarColorTheme ? ("theme-" + (ss.params.toolbarColorTheme)) : '') + "\">\n          <div class=\"toolbar-inner\">\n            <div class=\"left\"></div>\n            <div class=\"right\">\n              <a class=\"link sheet-close\">" + (ss.params.sheetCloseLinkText) + "</a>\n            </div>\n          </div>\n        </div>\n        <div class=\"sheet-modal-inner\">\n          <div class=\"page-content\">\n            <div class=\"list smart-select-list-" + (ss.id) + " " + (ss.params.virtualList ? ' virtual-list' : '') + (ss.params.formColorTheme ? ("theme-" + (ss.params.formColorTheme)) : '') + "\">\n              <ul>" + (!ss.params.virtualList && ss.renderItems(ss.items)) + "</ul>\n            </div>\n          </div>\n        </div>\n      </div>\n    ";
    return sheetHtml;
  };
  SmartSelect.prototype.renderPopover = function renderPopover () {
    var ss = this;
    if (ss.params.renderPopover) { return ss.params.renderPopover.call(ss, ss.items); }
    var popoverHtml = "\n      <div class=\"popover smart-select-popover\" data-select-name=\"" + (ss.selectName) + "\">\n        <div class=\"popover-inner\">\n          <div class=\"list smart-select-list-" + (ss.id) + " " + (ss.params.virtualList ? ' virtual-list' : '') + (ss.params.formColorTheme ? ("theme-" + (ss.params.formColorTheme)) : '') + "\">\n            <ul>" + (!ss.params.virtualList && ss.renderItems(ss.items)) + "</ul>\n          </div>\n        </div>\n      </div>\n    ";
    return popoverHtml;
  };
  SmartSelect.prototype.onOpen = function onOpen (type, containerEl) {
    var ss = this;
    var app = ss.app;
    var $containerEl = $$1$1(containerEl);
    ss.$containerEl = $containerEl;
    ss.openedIn = type;
    ss.opened = true;

    // Init VL
    if (ss.params.virtualList) {
      ss.vl = app.virtualList.create({
        el: $containerEl.find('.virtual-list'),
        items: ss.items,
        renderItem: ss.renderItem.bind(ss),
        height: ss.params.virtualListHeight,
        searchByItem: function searchByItem(query, item) {
          if (item.text && item.text.toLowerCase().indexOf(query.trim().toLowerCase()) >= 0) { return true; }
          return false;
        },
      });
    }

    // Init SB
    if (ss.params.searchbar) {
      ss.searchbar = app.searchbar.create({
        el: $containerEl.find('.searchbar'),
        backdropEl: $containerEl.find('.searchbar-backdrop'),
        searchContainer: (".smart-select-list-" + (ss.id)),
        searchIn: '.item-title',
      });
    }

    // Check for max length
    if (ss.maxLength) {
      ss.checkMaxLength();
    }

    // Close on select
    if (ss.params.closeOnSelect) {
      ss.$containerEl.find(("input[type=\"radio\"][name=\"" + (ss.inputName) + "\"]:checked")).parents('label').once('click', function () {
        ss.close();
      });
    }

    // Attach input events
    ss.attachInputsEvents();

    ss.$el.trigger('smartselect:open', ss);
    ss.emit('local::open smartSelectOpen', ss);
  };
  SmartSelect.prototype.onOpened = function onOpened () {
    var ss = this;

    ss.$el.trigger('smartselect:opened', ss);
    ss.emit('local::opened smartSelectOpened', ss);
  };
  SmartSelect.prototype.onClose = function onClose () {
    var ss = this;
    if (ss.destroyed) { return; }

    // Destroy VL
    if (ss.vl && ss.vl.destroy) {
      ss.vl.destroy();
      ss.vl = null;
      delete ss.vl;
    }

    // Destroy SB
    if (ss.searchbar && ss.searchbar.destroy) {
      ss.searchbar.destroy();
      ss.searchbar = null;
      delete ss.searchbar;
    }
    // Detach events
    ss.detachInputsEvents();

    ss.$el.trigger('smartselect:close', ss);
    ss.emit('local::close smartSelectClose', ss);
  };
  SmartSelect.prototype.onClosed = function onClosed () {
    var ss = this;
    if (ss.destroyed) { return; }
    ss.opened = false;
    ss.$containerEl = null;
    delete ss.$containerEl;

    ss.$el.trigger('smartselect:closed', ss);
    ss.emit('local::closed smartSelectClosed', ss);
  };
  SmartSelect.prototype.openPage = function openPage () {
    var ss = this;
    if (ss.opened) { return ss; }
    ss.getItemsData();
    var pageHtml = ss.renderPage(ss.items);

    ss.view.router.navigate({
      url: ss.url,
      route: {
        content: pageHtml,
        path: ss.url,
        on: {
          pageBeforeIn: function pageBeforeIn(e, page) {
            ss.onOpen('page', page.el);
          },
          pageAfterIn: function pageAfterIn(e, page) {
            ss.onOpened('page', page.el);
          },
          pageBeforeOut: function pageBeforeOut(e, page) {
            ss.onClose('page', page.el);
          },
          pageAfterOut: function pageAfterOut(e, page) {
            ss.onClosed('page', page.el);
          },
        },
      },
    });
    return ss;
  };
  SmartSelect.prototype.openPopup = function openPopup () {
    var ss = this;
    if (ss.opened) { return ss; }
    ss.getItemsData();
    var popupHtml = ss.renderPopup(ss.items);

    var popupParams = {
      content: popupHtml,
      on: {
        popupOpen: function popupOpen(popup) {
          ss.onOpen('popup', popup.el);
        },
        popupOpened: function popupOpened(popup) {
          ss.onOpened('popup', popup.el);
        },
        popupClose: function popupClose(popup) {
          ss.onClose('popup', popup.el);
        },
        popupClosed: function popupClosed(popup) {
          ss.onClosed('popup', popup.el);
        },
      },
    };

    if (ss.params.routableModals) {
      ss.view.router.navigate({
        url: ss.url,
        route: {
          path: ss.url,
          popup: popupParams,
        },
      });
    } else {
      ss.modal = ss.app.popup.create(popupParams).open();
    }
    return ss;
  };
  SmartSelect.prototype.openSheet = function openSheet () {
    var ss = this;
    if (ss.opened) { return ss; }
    ss.getItemsData();
    var sheetHtml = ss.renderSheet(ss.items);

    var sheetParams = {
      content: sheetHtml,
      backdrop: false,
      scrollToEl: ss.$el,
      closeByOutsideClick: true,
      on: {
        sheetOpen: function sheetOpen(sheet) {
          ss.onOpen('sheet', sheet.el);
        },
        sheetOpened: function sheetOpened(sheet) {
          ss.onOpened('sheet', sheet.el);
        },
        sheetClose: function sheetClose(sheet) {
          ss.onClose('sheet', sheet.el);
        },
        sheetClosed: function sheetClosed(sheet) {
          ss.onClosed('sheet', sheet.el);
        },
      },
    };

    if (ss.params.routableModals) {
      ss.view.router.navigate({
        url: ss.url,
        route: {
          path: ss.url,
          sheet: sheetParams,
        },
      });
    } else {
      ss.modal = ss.app.sheet.create(sheetParams).open();
    }
    return ss;
  };
  SmartSelect.prototype.openPopover = function openPopover () {
    var ss = this;
    if (ss.opened) { return ss; }
    ss.getItemsData();
    var popoverHtml = ss.renderPopover(ss.items);
    var popoverParams = {
      content: popoverHtml,
      targetEl: ss.$el,
      on: {
        popoverOpen: function popoverOpen(popover) {
          ss.onOpen('popover', popover.el);
        },
        popoverOpened: function popoverOpened(popover) {
          ss.onOpened('popover', popover.el);
        },
        popoverClose: function popoverClose(popover) {
          ss.onClose('popover', popover.el);
        },
        popoverClosed: function popoverClosed(popover) {
          ss.onClosed('popover', popover.el);
        },
      },
    };
    if (ss.params.routableModals) {
      ss.view.router.navigate({
        url: ss.url,
        route: {
          path: ss.url,
          popover: popoverParams,
        },
      });
    } else {
      ss.modal = ss.app.popover.create(popoverParams).open();
    }
    return ss;
  };
  SmartSelect.prototype.open = function open (type) {
    var ss = this;
    if (ss.opened) { return ss; }
    var openIn = type || ss.params.openIn;
    ss[("open" + (openIn.split('').map(function (el, index) {
      if (index === 0) { return el.toUpperCase(); }
      return el;
    }).join('')))]();
    return ss;
  };
  SmartSelect.prototype.close = function close () {
    var ss = this;
    if (!ss.opened) { return ss; }
    if (ss.params.routableModals || ss.openedIn === 'page') {
      ss.view.router.back();
    } else {
      ss.modal.once('modalClosed', function () {
        Utils.nextTick(function () {
          ss.modal.destroy();
          delete ss.modal;
        });
      });
      ss.modal.close();
    }
    return ss;
  };
  SmartSelect.prototype.init = function init () {
    var ss = this;
    ss.attachEvents();
    ss.setValue();
  };
  SmartSelect.prototype.destroy = function destroy () {
    var ss = this;
    ss.emit('local::beforeDestroy smartSelectBeforeDestroy', ss);
    ss.$el.trigger('smartselect:beforedestroy', ss);
    ss.detachEvents();
    delete ss.$el[0].f7SmartSelect;
    Utils.deleteProps(ss);
    ss.destroyed = true;
  };

  return SmartSelect;
}(Framework7Class));

var SmartSelect = {
  name: 'smartSelect',
  params: {
    smartSelect: {
      el: undefined,
      valueEl: undefined,
      openIn: 'page', // or 'popup' or 'sheet' or 'popover'
      pageTitle: undefined,
      pageBackLinkText: 'Back',
      popupCloseLinkText: 'Close',
      sheetCloseLinkText: 'Done',
      searchbar: false,
      searchbarPlaceholder: 'Search',
      searchbarDisableText: 'Cancel',
      closeOnSelect: false,
      virtualList: false,
      virtualListHeight: undefined,
      formColorTheme: undefined,
      navbarColorTheme: undefined,
      routableModals: true,
      url: 'select/',
      /*
        Custom render functions
      */
      renderPage: undefined,
      renderPopup: undefined,
      renderSheet: undefined,
      renderPopover: undefined,
      renderItems: undefined,
      renderItem: undefined,
      renderSearchbar: undefined,
    },
  },
  static: {
    SmartSelect: SmartSelect$1,
  },
  create: function create() {
    var app = this;
    app.smartSelect = Utils.extend(
      ConstructorMethods({
        defaultSelector: '.smart-select',
        constructor: SmartSelect$1,
        app: app,
        domProp: 'f7SmartSelect',
      }),
      {
        open: function open(smartSelectEl) {
          var ss = app.smartSelect.get(smartSelectEl);
          if (ss && ss.open) { return ss.open(); }
          return undefined;
        },
        close: function close(smartSelectEl) {
          var ss = app.smartSelect.get(smartSelectEl);
          if (ss && ss.close) { return ss.close(); }
          return undefined;
        },
      }
    );
  },

  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      $$1$1(tabEl).find('.smart-select-init').each(function (index, smartSelectEl) {
        app.smartSelect.create(Utils.extend({ el: smartSelectEl }, $$1$1(smartSelectEl).dataset()));
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      $$1$1(tabEl).find('.smart-select-init').each(function (index, smartSelectEl) {
        if (smartSelectEl.f7SmartSelect && smartSelectEl.f7SmartSelect.destroy) {
          smartSelectEl.f7SmartSelect.destroy();
        }
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.smart-select-init').each(function (index, smartSelectEl) {
        app.smartSelect.create(Utils.extend({ el: smartSelectEl }, $$1$1(smartSelectEl).dataset()));
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      page.$el.find('.smart-select-init').each(function (index, smartSelectEl) {
        if (smartSelectEl.f7SmartSelect && smartSelectEl.f7SmartSelect.destroy) {
          smartSelectEl.f7SmartSelect.destroy();
        }
      });
    },
  },
  clicks: {
    '.smart-select': function open($clickedEl, data) {
      var app = this;
      if (!$clickedEl[0].f7SmartSelect) {
        var ss = app.smartSelect.create(Utils.extend({ el: $clickedEl }, data));
        ss.open();
      }
    },
  },
};

var Calendar$1 = (function (Framework7Class$$1) {
  function Calendar(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);
    var calendar = this;
    calendar.params = Utils.extend({}, app.params.calendar, params);

    var $containerEl;
    if (calendar.params.containerEl) {
      $containerEl = $$1$1(calendar.params.containerEl);
      if ($containerEl.length === 0) { return calendar; }
    }

    var $inputEl;
    if (calendar.params.inputEl) {
      $inputEl = $$1$1(calendar.params.inputEl);
    }

    var view;
    if ($inputEl) {
      view = $inputEl.parents('.view').length && $inputEl.parents('.view')[0].f7View;
    }
    if (!view) { view = app.views.main; }

    var isHorizontal = calendar.params.direction === 'horizontal';

    var inverter = 1;
    if (isHorizontal) {
      inverter = app.rtl ? -1 : 1;
    }

    Utils.extend(calendar, {
      app: app,
      $containerEl: $containerEl,
      containerEl: $containerEl && $containerEl[0],
      inline: $containerEl && $containerEl.length > 0,
      $inputEl: $inputEl,
      inputEl: $inputEl && $inputEl[0],
      initialized: false,
      opened: false,
      url: calendar.params.url,
      isHorizontal: isHorizontal,
      inverter: inverter,
      view: view,
      animating: false,
    });

    function onInputClick() {
      calendar.open();
    }
    function onInputFocus(e) {
      e.preventDefault();
    }
    function onHtmlClick(e) {
      var $targetEl = $$1$1(e.target);
      if (calendar.isPopover()) { return; }
      if (!calendar.opened) { return; }
      if ($targetEl.closest('[class*="backdrop"]').length) { return; }
      if ($inputEl && $inputEl.length > 0) {
        if ($targetEl[0] !== $inputEl[0] && $targetEl.closest('.sheet-modal, .calendar-modal').length === 0) {
          calendar.close();
        }
      } else if ($$1$1(e.target).closest('.sheet-modal, .calendar-modal').length === 0) {
        calendar.close();
      }
    }

    // Events
    Utils.extend(calendar, {
      attachInputEvents: function attachInputEvents() {
        calendar.$inputEl.on('click', onInputClick);
        if (calendar.params.inputReadOnly) {
          calendar.$inputEl.on('focus mousedown', onInputFocus);
        }
      },
      detachInputEvents: function detachInputEvents() {
        calendar.$inputEl.off('click', onInputClick);
        if (calendar.params.inputReadOnly) {
          calendar.$inputEl.off('focus mousedown', onInputFocus);
        }
      },
      attachHtmlEvents: function attachHtmlEvents() {
        app.on('click', onHtmlClick);
      },
      detachHtmlEvents: function detachHtmlEvents() {
        app.off('click', onHtmlClick);
      },
    });
    calendar.attachCalendarEvents = function attachCalendarEvents() {
      var allowItemClick = true;
      var isTouched;
      var isMoved;
      var touchStartX;
      var touchStartY;
      var touchCurrentX;
      var touchCurrentY;
      var touchStartTime;
      var touchEndTime;
      var currentTranslate;
      var wrapperWidth;
      var wrapperHeight;
      var percentage;
      var touchesDiff;
      var isScrolling;

      var $el = calendar.$el;
      var $wrapperEl = calendar.$wrapperEl;

      function handleTouchStart(e) {
        if (isMoved || isTouched) { return; }
        isTouched = true;
        touchStartX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchCurrentX = touchStartX;
        touchStartY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        touchCurrentY = touchStartY;
        touchStartTime = (new Date()).getTime();
        percentage = 0;
        allowItemClick = true;
        isScrolling = undefined;
        currentTranslate = calendar.monthsTranslate;
      }
      function handleTouchMove(e) {
        if (!isTouched) { return; }
        var isH = calendar.isHorizontal;

        touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        if (typeof isScrolling === 'undefined') {
          isScrolling = !!(isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX));
        }
        if (isH && isScrolling) {
          isTouched = false;
          return;
        }
        e.preventDefault();
        if (calendar.animating) {
          isTouched = false;
          return;
        }
        allowItemClick = false;
        if (!isMoved) {
          // First move
          isMoved = true;
          wrapperWidth = $wrapperEl[0].offsetWidth;
          wrapperHeight = $wrapperEl[0].offsetHeight;
          $wrapperEl.transition(0);
        }

        touchesDiff = isH ? touchCurrentX - touchStartX : touchCurrentY - touchStartY;
        percentage = touchesDiff / (isH ? wrapperWidth : wrapperHeight);
        currentTranslate = ((calendar.monthsTranslate * calendar.inverter) + percentage) * 100;

        // Transform wrapper
        $wrapperEl.transform(("translate3d(" + (isH ? currentTranslate : 0) + "%, " + (isH ? 0 : currentTranslate) + "%, 0)"));
      }
      function handleTouchEnd() {
        if (!isTouched || !isMoved) {
          isTouched = false;
          isMoved = false;
          return;
        }
        isTouched = false;
        isMoved = false;

        touchEndTime = new Date().getTime();
        if (touchEndTime - touchStartTime < 300) {
          if (Math.abs(touchesDiff) < 10) {
            calendar.resetMonth();
          } else if (touchesDiff >= 10) {
            if (app.rtl) { calendar.nextMonth(); }
            else { calendar.prevMonth(); }
          } else if (app.rtl) { calendar.prevMonth(); }
          else { calendar.nextMonth(); }
        } else if (percentage <= -0.5) {
          if (app.rtl) { calendar.prevMonth(); }
          else { calendar.nextMonth(); }
        } else if (percentage >= 0.5) {
          if (app.rtl) { calendar.nextMonth(); }
          else { calendar.prevMonth(); }
        } else {
          calendar.resetMonth();
        }

        // Allow click
        setTimeout(function () {
          allowItemClick = true;
        }, 100);
      }

      function handleDayClick(e) {
        if (!allowItemClick) { return; }
        var $dayEl = $$1$1(e.target).parents('.calendar-day');
        if ($dayEl.length === 0 && $$1$1(e.target).hasClass('calendar-day')) {
          $dayEl = $$1$1(e.target);
        }
        if ($dayEl.length === 0) { return; }
        if ($dayEl.hasClass('calendar-day-disabled')) { return; }
        if (!calendar.params.rangePicker) {
          if ($dayEl.hasClass('calendar-day-next')) { calendar.nextMonth(); }
          if ($dayEl.hasClass('calendar-day-prev')) { calendar.prevMonth(); }
        }
        var dateYear = $dayEl.attr('data-year');
        var dateMonth = $dayEl.attr('data-month');
        var dateDay = $dayEl.attr('data-day');
        calendar.emit(
          'local::dayClick calendarDayClick',
          calendar,
          $dayEl[0],
          dateYear,
          dateMonth,
          dateDay
        );
        if (!$dayEl.hasClass('calendar-day-selected') || calendar.params.multiple || calendar.params.rangePicker) {
          calendar.addValue(new Date(dateYear, dateMonth, dateDay, 0, 0, 0));
        }
        if (calendar.params.closeOnSelect) {
          if (
            (calendar.params.rangePicker && calendar.value.length === 2) ||
            !calendar.params.rangePicker
          ) {
            calendar.close();
          }
        }
      }
      function onNextMonthClick() {
        calendar.nextMonth();
      }
      function onPrevMonthClick() {
        calendar.prevMonth();
      }
      function onNextYearClick() {
        calendar.nextYear();
      }
      function onPrevYearClick() {
        calendar.prevYear();
      }

      var passiveListener = app.touchEvents.start === 'touchstart' && app.support.passiveListener ? { passive: true, capture: false } : false;
      // Selectors clicks
      $el.find('.calendar-prev-month-button').on('click', onPrevMonthClick);
      $el.find('.calendar-next-month-button').on('click', onNextMonthClick);
      $el.find('.calendar-prev-year-button').on('click', onPrevYearClick);
      $el.find('.calendar-next-year-button').on('click', onNextYearClick);
      // Day clicks
      $wrapperEl.on('click', handleDayClick);
      // Touch events
      {
        if (calendar.params.touchMove) {
          $wrapperEl.on(app.touchEvents.start, handleTouchStart, passiveListener);
          app.on('touchmove:active', handleTouchMove);
          app.on('touchend:passive', handleTouchEnd);
        }
      }

      calendar.detachCalendarEvents = function detachCalendarEvents() {
        $el.find('.calendar-prev-month-button').off('click', onPrevMonthClick);
        $el.find('.calendar-next-month-button').off('click', onNextMonthClick);
        $el.find('.calendar-prev-year-button').off('click', onPrevYearClick);
        $el.find('.calendar-next-year-button').off('click', onNextYearClick);
        $wrapperEl.off('click', handleDayClick);
        {
          if (calendar.params.touchMove) {
            $wrapperEl.off(app.touchEvents.start, handleTouchStart, passiveListener);
            app.off('touchmove:active', handleTouchMove);
            app.off('touchend:passive', handleTouchEnd);
          }
        }
      };
    };

    calendar.init();

    return calendar;
  }

  if ( Framework7Class$$1 ) Calendar.__proto__ = Framework7Class$$1;
  Calendar.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Calendar.prototype.constructor = Calendar;
  Calendar.prototype.initInput = function initInput () {
    var calendar = this;
    if (!calendar.$inputEl) { return; }
    if (calendar.params.inputReadOnly) { calendar.$inputEl.prop('readOnly', true); }
  };
  Calendar.prototype.isPopover = function isPopover () {
    var calendar = this;
    var app = calendar.app;
    var modal = calendar.modal;
    var params = calendar.params;
    if (params.openIn === 'sheet') { return false; }
    if (modal && modal.type !== 'popover') { return false; }

    if (!calendar.inline && calendar.inputEl) {
      if (params.openIn === 'popover') { return true; }
      else if (app.device.ios) {
        return !!app.device.ipad;
      } else if (app.width >= 768) {
        return true;
      }
    }
    return false;
  };
  Calendar.prototype.formatDate = function formatDate (d) {
    var calendar = this;
    var date = new Date(d);
    var year = date.getFullYear();
    var month = date.getMonth();
    var month1 = month + 1;
    var day = date.getDate();
    var weekDay = date.getDay();
    var ref = calendar.params;
    var dateFormat = ref.dateFormat;
    var monthNames = ref.monthNames;
    var monthNamesShort = ref.monthNamesShort;
    var dayNames = ref.dayNames;
    var dayNamesShort = ref.dayNamesShort;

    return dateFormat
      .replace(/yyyy/g, year)
      .replace(/yy/g, String(year).substring(2))
      .replace(/mm/g, month1 < 10 ? ("0" + month1) : month1)
      .replace(/m(\W+)/g, (month1 + "$1"))
      .replace(/MM/g, monthNames[month])
      .replace(/M(\W+)/g, ((monthNamesShort[month]) + "$1"))
      .replace(/dd/g, day < 10 ? ("0" + day) : day)
      .replace(/d(\W+)/g, (day + "$1"))
      .replace(/DD/g, dayNames[weekDay])
      .replace(/D(\W+)/g, ((dayNamesShort[weekDay]) + "$1"));
  };
  Calendar.prototype.formatValue = function formatValue () {
    var calendar = this;
    var value = calendar.value;
    if (calendar.params.formatValue) {
      return calendar.params.formatValue.call(calendar, value);
    }
    return value
      .map(function (v) { return calendar.formatDate(v); })
      .join(calendar.params.rangePicker ? ' - ' : ', ');
  };
  Calendar.prototype.addValue = function addValue (newValue) {
    var calendar = this;
    var ref = calendar.params;
    var multiple = ref.multiple;
    var rangePicker = ref.rangePicker;
    if (multiple) {
      if (!calendar.value) { calendar.value = []; }
      var inValuesIndex;
      for (var i = 0; i < calendar.value.length; i += 1) {
        if (new Date(newValue).getTime() === new Date(calendar.value[i]).getTime()) {
          inValuesIndex = i;
        }
      }
      if (typeof inValuesIndex === 'undefined') {
        calendar.value.push(newValue);
      } else {
        calendar.value.splice(inValuesIndex, 1);
      }
      calendar.updateValue();
    } else if (rangePicker) {
      if (!calendar.value) { calendar.value = []; }
      if (calendar.value.length === 2 || calendar.value.length === 0) {
        calendar.value = [];
      }
      if (calendar.value[0] !== newValue) { calendar.value.push(newValue); }
      else { calendar.value = []; }
      calendar.value.sort(function (a, b) { return a - b; });
      calendar.updateValue();
    } else {
      calendar.value = [newValue];
      calendar.updateValue();
    }
  };
  Calendar.prototype.setValue = function setValue (values) {
    var calendar = this;
    calendar.value = values;
    calendar.updateValue();
  };
  Calendar.prototype.getValue = function getValue () {
    var calendar = this;
    return calendar.value;
  };
  Calendar.prototype.updateValue = function updateValue (onlyHeader) {
    var calendar = this;
    var $el = calendar.$el;
    var $wrapperEl = calendar.$wrapperEl;
    var $inputEl = calendar.$inputEl;
    var value = calendar.value;
    var params = calendar.params;
    var i;
    if ($el && $el.length > 0) {
      $wrapperEl.find('.calendar-day-selected').removeClass('calendar-day-selected');
      var valueDate;
      if (params.rangePicker && value.length === 2) {
        for (i = new Date(value[0]).getTime(); i <= new Date(value[1]).getTime(); i += 24 * 60 * 60 * 1000) {
          valueDate = new Date(i);
          $wrapperEl.find((".calendar-day[data-date=\"" + (valueDate.getFullYear()) + "-" + (valueDate.getMonth()) + "-" + (valueDate.getDate()) + "\"]")).addClass('calendar-day-selected');
        }
      } else {
        for (i = 0; i < calendar.value.length; i += 1) {
          valueDate = new Date(value[i]);
          $wrapperEl.find((".calendar-day[data-date=\"" + (valueDate.getFullYear()) + "-" + (valueDate.getMonth()) + "-" + (valueDate.getDate()) + "\"]")).addClass('calendar-day-selected');
        }
      }
    }

    calendar.emit('local::change calendarChange', calendar, value);

    if (($inputEl && $inputEl.length) || params.header) {
      var inputValue = calendar.formatValue(value);
      if (params.header && $el && $el.length) {
        $el.find('.calendar-selected-date').text(inputValue);
      }
      if ($inputEl && $inputEl.length && !onlyHeader) {
        $inputEl.val(inputValue);
        $inputEl.trigger('change');
      }
    }
  };
  Calendar.prototype.updateCurrentMonthYear = function updateCurrentMonthYear (dir) {
    var calendar = this;
    var $months = calendar.$months;
    var $el = calendar.$el;
    var params = calendar.params;
    if (typeof dir === 'undefined') {
      calendar.currentMonth = parseInt($months.eq(1).attr('data-month'), 10);
      calendar.currentYear = parseInt($months.eq(1).attr('data-year'), 10);
    } else {
      calendar.currentMonth = parseInt($months.eq(dir === 'next' ? ($months.length - 1) : 0).attr('data-month'), 10);
      calendar.currentYear = parseInt($months.eq(dir === 'next' ? ($months.length - 1) : 0).attr('data-year'), 10);
    }
    $el.find('.current-month-value').text(params.monthNames[calendar.currentMonth]);
    $el.find('.current-year-value').text(calendar.currentYear);
  };
  Calendar.prototype.update = function update () {
    var calendar = this;
    var currentYear = calendar.currentYear;
    var currentMonth = calendar.currentMonth;
    var $wrapperEl = calendar.$wrapperEl;
    var currentDate = new Date(currentYear, currentMonth);
    var prevMonthHtml = calendar.renderMonth(currentDate, 'prev');
    var currentMonthHtml = calendar.renderMonth(currentDate);
    var nextMonthHtml = calendar.renderMonth(currentDate, 'next');

    $wrapperEl
      .html(("" + prevMonthHtml + currentMonthHtml + nextMonthHtml))
      .transform('translate3d(0,0,0)');
    calendar.$months = $wrapperEl.find('.calendar-month');
    calendar.monthsTranslate = 0;
    calendar.setMonthsTranslate();
    calendar.$months.each(function (index, monthEl) {
      calendar.emit(
        'local::monthAdd calendarMonthAdd',
        monthEl
      );
    });
  };
  Calendar.prototype.onMonthChangeStart = function onMonthChangeStart (dir) {
    var calendar = this;
    var $months = calendar.$months;
    var currentYear = calendar.currentYear;
    var currentMonth = calendar.currentMonth;
    calendar.updateCurrentMonthYear(dir);
    $months.removeClass('calendar-month-current calendar-month-prev calendar-month-next');
    var currentIndex = dir === 'next' ? $months.length - 1 : 0;

    $months.eq(currentIndex).addClass('calendar-month-current');
    $months.eq(dir === 'next' ? currentIndex - 1 : currentIndex + 1).addClass(dir === 'next' ? 'calendar-month-prev' : 'calendar-month-next');

    calendar.emit(
      'local::monthYearChangeStart calendarMonthYearChangeStart',
      calendar,
      currentYear,
      currentMonth
    );
  };
  Calendar.prototype.onMonthChangeEnd = function onMonthChangeEnd (dir, rebuildBoth) {
    var calendar = this;
    var currentYear = calendar.currentYear;
    var currentMonth = calendar.currentMonth;
    var $wrapperEl = calendar.$wrapperEl;
    var monthsTranslate = calendar.monthsTranslate;
    calendar.animating = false;
    var nextMonthHtml;
    var prevMonthHtml;
    var currentMonthHtml;
    $wrapperEl
      .find('.calendar-month:not(.calendar-month-prev):not(.calendar-month-current):not(.calendar-month-next)')
      .remove();

    if (typeof dir === 'undefined') {
      dir = 'next'; // eslint-disable-line
      rebuildBoth = true; // eslint-disable-line
    }
    if (!rebuildBoth) {
      currentMonthHtml = calendar.renderMonth(new Date(currentYear, currentMonth), dir);
    } else {
      $wrapperEl.find('.calendar-month-next, .calendar-month-prev').remove();
      prevMonthHtml = calendar.renderMonth(new Date(currentYear, currentMonth), 'prev');
      nextMonthHtml = calendar.renderMonth(new Date(currentYear, currentMonth), 'next');
    }
    if (dir === 'next' || rebuildBoth) {
      $wrapperEl.append(currentMonthHtml || nextMonthHtml);
    }
    if (dir === 'prev' || rebuildBoth) {
      $wrapperEl.prepend(currentMonthHtml || prevMonthHtml);
    }
    var $months = $wrapperEl.find('.calendar-month');
    calendar.$months = $months;
    calendar.setMonthsTranslate(monthsTranslate);
    calendar.emit(
      'local::monthAdd calendarMonthAdd',
      calendar,
      dir === 'next' ? $months.eq($months.length - 1)[0] : $months.eq(0)[0]
    );
    calendar.emit(
      'local::monthYearChangeEnd calendarMonthYearChangeEnd',
      calendar,
      currentYear,
      currentMonth
    );
  };
  Calendar.prototype.setMonthsTranslate = function setMonthsTranslate (translate) {
    var calendar = this;
    var $months = calendar.$months;
    var isH = calendar.isHorizontal;
    var inverter = calendar.inverter;
    // eslint-disable-next-line
    translate = translate || calendar.monthsTranslate || 0;
    if (typeof calendar.monthsTranslate === 'undefined') {
      calendar.monthsTranslate = translate;
    }
    $months.removeClass('calendar-month-current calendar-month-prev calendar-month-next');
    var prevMonthTranslate = -(translate + 1) * 100 * inverter;
    var currentMonthTranslate = -translate * 100 * inverter;
    var nextMonthTranslate = -(translate - 1) * 100 * inverter;
    $months.eq(0)
      .transform(("translate3d(" + (isH ? prevMonthTranslate : 0) + "%, " + (isH ? 0 : prevMonthTranslate) + "%, 0)"))
      .addClass('calendar-month-prev');
    $months.eq(1)
      .transform(("translate3d(" + (isH ? currentMonthTranslate : 0) + "%, " + (isH ? 0 : currentMonthTranslate) + "%, 0)"))
      .addClass('calendar-month-current');
    $months.eq(2)
      .transform(("translate3d(" + (isH ? nextMonthTranslate : 0) + "%, " + (isH ? 0 : nextMonthTranslate) + "%, 0)"))
      .addClass('calendar-month-next');
  };
  Calendar.prototype.nextMonth = function nextMonth (transition) {
    var calendar = this;
    var params = calendar.params;
    var $wrapperEl = calendar.$wrapperEl;
    var inverter = calendar.inverter;
    var isH = calendar.isHorizontal;
    if (typeof transition === 'undefined' || typeof transition === 'object') {
      transition = ''; // eslint-disable-line
      if (!params.animate) { transition = 0; } // eslint-disable-line
    }
    var nextMonth = parseInt(calendar.$months.eq(calendar.$months.length - 1).attr('data-month'), 10);
    var nextYear = parseInt(calendar.$months.eq(calendar.$months.length - 1).attr('data-year'), 10);
    var nextDate = new Date(nextYear, nextMonth);
    var nextDateTime = nextDate.getTime();
    var transitionEndCallback = !calendar.animating;
    if (params.maxDate) {
      if (nextDateTime > new Date(params.maxDate).getTime()) {
        calendar.resetMonth();
        return;
      }
    }
    calendar.monthsTranslate -= 1;
    if (nextMonth === calendar.currentMonth) {
      var nextMonthTranslate = -(calendar.monthsTranslate) * 100 * inverter;
      var nextMonthHtml = $$1$1(calendar.renderMonth(nextDateTime, 'next'))
        .transform(("translate3d(" + (isH ? nextMonthTranslate : 0) + "%, " + (isH ? 0 : nextMonthTranslate) + "%, 0)"))
        .addClass('calendar-month-next');
      $wrapperEl.append(nextMonthHtml[0]);
      calendar.$months = $wrapperEl.find('.calendar-month');
      calendar.emit(
        'local::monthAdd calendarMonthAdd',
        calendar.$months.eq(calendar.$months.length - 1)[0]
      );
    }
    calendar.animating = true;
    calendar.onMonthChangeStart('next');
    var translate = (calendar.monthsTranslate * 100) * inverter;

    $wrapperEl.transition(transition).transform(("translate3d(" + (isH ? translate : 0) + "%, " + (isH ? 0 : translate) + "%, 0)"));
    if (transitionEndCallback) {
      $wrapperEl.transitionEnd(function () {
        calendar.onMonthChangeEnd('next');
      });
    }
    if (!params.animate) {
      calendar.onMonthChangeEnd('next');
    }
  };
  Calendar.prototype.prevMonth = function prevMonth (transition) {
    var calendar = this;
    var params = calendar.params;
    var $wrapperEl = calendar.$wrapperEl;
    var inverter = calendar.inverter;
    var isH = calendar.isHorizontal;
    if (typeof transition === 'undefined' || typeof transition === 'object') {
      transition = ''; // eslint-disable-line
      if (!params.animate) { transition = 0; } // eslint-disable-line
    }
    var prevMonth = parseInt(calendar.$months.eq(0).attr('data-month'), 10);
    var prevYear = parseInt(calendar.$months.eq(0).attr('data-year'), 10);
    var prevDate = new Date(prevYear, prevMonth + 1, -1);
    var prevDateTime = prevDate.getTime();
    var transitionEndCallback = !calendar.animating;
    if (params.minDate) {
      if (prevDateTime < new Date(params.minDate).getTime()) {
        calendar.resetMonth();
        return;
      }
    }
    calendar.monthsTranslate += 1;
    if (prevMonth === calendar.currentMonth) {
      var prevMonthTranslate = -(calendar.monthsTranslate) * 100 * inverter;
      var prevMonthHtml = $$1$1(calendar.renderMonth(prevDateTime, 'prev'))
        .transform(("translate3d(" + (isH ? prevMonthTranslate : 0) + "%, " + (isH ? 0 : prevMonthTranslate) + "%, 0)"))
        .addClass('calendar-month-prev');
      $wrapperEl.prepend(prevMonthHtml[0]);
      calendar.$months = $wrapperEl.find('.calendar-month');
      calendar.emit(
        'local::monthAdd calendarMonthAdd',
        calendar.$months.eq(0)[0]
      );
    }
    calendar.animating = true;
    calendar.onMonthChangeStart('prev');
    var translate = (calendar.monthsTranslate * 100) * inverter;
    $wrapperEl
      .transition(transition)
      .transform(("translate3d(" + (isH ? translate : 0) + "%, " + (isH ? 0 : translate) + "%, 0)"));
    if (transitionEndCallback) {
      $wrapperEl.transitionEnd(function () {
        calendar.onMonthChangeEnd('prev');
      });
    }
    if (!params.animate) {
      calendar.onMonthChangeEnd('prev');
    }
  };
  Calendar.prototype.resetMonth = function resetMonth (transition) {
    if ( transition === void 0 ) transition = '';

    var calendar = this;
    var $wrapperEl = calendar.$wrapperEl;
    var inverter = calendar.inverter;
    var isH = calendar.isHorizontal;
    var monthsTranslate = calendar.monthsTranslate;
    var translate = (monthsTranslate * 100) * inverter;
    $wrapperEl
      .transition(transition)
      .transform(("translate3d(" + (isH ? translate : 0) + "%, " + (isH ? 0 : translate) + "%, 0)"));
  };
  // eslint-disable-next-line
  Calendar.prototype.setYearMonth = function setYearMonth (year, month, transition) {
    var calendar = this;
    var params = calendar.params;
    var isH = calendar.isHorizontal;
    var $wrapperEl = calendar.$wrapperEl;
    var inverter = calendar.inverter;
    // eslint-disable-next-line
    if (typeof year === 'undefined') { year = calendar.currentYear; }
    // eslint-disable-next-line
    if (typeof month === 'undefined') { month = calendar.currentMonth; }
    if (typeof transition === 'undefined' || typeof transition === 'object') {
      // eslint-disable-next-line
      transition = '';
      // eslint-disable-next-line
      if (!params.animate) { transition = 0; }
    }
    var targetDate;
    if (year < calendar.currentYear) {
      targetDate = new Date(year, month + 1, -1).getTime();
    } else {
      targetDate = new Date(year, month).getTime();
    }
    if (params.maxDate && targetDate > new Date(params.maxDate).getTime()) {
      return false;
    }
    if (params.minDate && targetDate < new Date(params.minDate).getTime()) {
      return false;
    }
    var currentDate = new Date(calendar.currentYear, calendar.currentMonth).getTime();
    var dir = targetDate > currentDate ? 'next' : 'prev';
    var newMonthHTML = calendar.renderMonth(new Date(year, month));
    calendar.monthsTranslate = calendar.monthsTranslate || 0;
    var prevTranslate = calendar.monthsTranslate;
    var monthTranslate;
    var transitionEndCallback = !calendar.animating;
    if (targetDate > currentDate) {
      // To next
      calendar.monthsTranslate -= 1;
      if (!calendar.animating) { calendar.$months.eq(calendar.$months.length - 1).remove(); }
      $wrapperEl.append(newMonthHTML);
      calendar.$months = $wrapperEl.find('.calendar-month');
      monthTranslate = -(prevTranslate - 1) * 100 * inverter;
      calendar.$months
        .eq(calendar.$months.length - 1)
        .transform(("translate3d(" + (isH ? monthTranslate : 0) + "%, " + (isH ? 0 : monthTranslate) + "%, 0)"))
        .addClass('calendar-month-next');
    } else {
      // To prev
      calendar.monthsTranslate += 1;
      if (!calendar.animating) { calendar.$months.eq(0).remove(); }
      $wrapperEl.prepend(newMonthHTML);
      calendar.$months = $wrapperEl.find('.calendar-month');
      monthTranslate = -(prevTranslate + 1) * 100 * inverter;
      calendar.$months
        .eq(0)
        .transform(("translate3d(" + (isH ? monthTranslate : 0) + "%, " + (isH ? 0 : monthTranslate) + "%, 0)"))
        .addClass('calendar-month-prev');
    }
    calendar.emit(
      'local::monthAdd calendarMonthAdd',
      dir === 'next'
        ? calendar.$months.eq(calendar.$months.length - 1)[0]
        : calendar.$months.eq(0)[0]
    );

    calendar.animating = true;
    calendar.onMonthChangeStart(dir);
    var wrapperTranslate = (calendar.monthsTranslate * 100) * inverter;
    $wrapperEl
      .transition(transition)
      .transform(("translate3d(" + (isH ? wrapperTranslate : 0) + "%, " + (isH ? 0 : wrapperTranslate) + "%, 0)"));
    if (transitionEndCallback) {
      $wrapperEl.transitionEnd(function () {
        calendar.onMonthChangeEnd(dir, true);
      });
    }
    if (!params.animate) {
      calendar.onMonthChangeEnd(dir);
    }
  };
  Calendar.prototype.nextYear = function nextYear () {
    var calendar = this;
    calendar.setYearMonth(calendar.currentYear + 1);
  };
  Calendar.prototype.prevYear = function prevYear () {
    var calendar = this;
    calendar.setYearMonth(calendar.currentYear - 1);
  };
  // eslint-disable-next-line
  Calendar.prototype.dateInRange = function dateInRange (dayDate, range) {
    var match = false;
    var i;
    if (!range) { return false; }
    if (Array.isArray(range)) {
      for (i = 0; i < range.length; i += 1) {
        if (range[i].from || range[i].to) {
          if (range[i].from && range[i].to) {
            if ((dayDate <= new Date(range[i].to).getTime()) && (dayDate >= new Date(range[i].from).getTime())) {
              match = true;
            }
          } else if (range[i].from) {
            if (dayDate >= new Date(range[i].from).getTime()) {
              match = true;
            }
          } else if (range[i].to) {
            if (dayDate <= new Date(range[i].to).getTime()) {
              match = true;
            }
          }
        } else if (dayDate === new Date(range[i]).getTime()) {
          match = true;
        }
      }
    } else if (range.from || range.to) {
      if (range.from && range.to) {
        if ((dayDate <= new Date(range.to).getTime()) && (dayDate >= new Date(range.from).getTime())) {
          match = true;
        }
      } else if (range.from) {
        if (dayDate >= new Date(range.from).getTime()) {
          match = true;
        }
      } else if (range.to) {
        if (dayDate <= new Date(range.to).getTime()) {
          match = true;
        }
      }
    } else if (typeof range === 'function') {
      match = range(new Date(dayDate));
    }
    return match;
  };
  // eslint-disable-next-line
  Calendar.prototype.daysInMonth = function daysInMonth (date) {
    var d = new Date(date);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  };
  Calendar.prototype.renderMonths = function renderMonths (date) {
    var calendar = this;
    if (calendar.params.renderMonths) {
      return calendar.params.renderMonths.call(calendar, date);
    }
    return ("\n      <div class=\"calendar-months-wrapper\">\n        " + (calendar.renderMonth(date, 'prev')) + "\n        " + (calendar.renderMonth(date)) + "\n        " + (calendar.renderMonth(date, 'next')) + "\n      </div>\n    ").trim();
  };
  Calendar.prototype.renderMonth = function renderMonth (d, offset) {
    var calendar = this;
    var params = calendar.params;
    var value = calendar.value;
    if (params.renderMonth) {
      return params.renderMonth.call(calendar, d, offset);
    }
    var date = new Date(d);
    var year = date.getFullYear();
    var month = date.getMonth();

    if (offset === 'next') {
      if (month === 11) { date = new Date(year + 1, 0); }
      else { date = new Date(year, month + 1, 1); }
    }
    if (offset === 'prev') {
      if (month === 0) { date = new Date(year - 1, 11); }
      else { date = new Date(year, month - 1, 1); }
    }
    if (offset === 'next' || offset === 'prev') {
      month = date.getMonth();
      year = date.getFullYear();
    }

    var currentValues = [];
    var today = new Date().setHours(0, 0, 0, 0);
    var minDate = params.minDate ? new Date(params.minDate).getTime() : null;
    var maxDate = params.maxDate ? new Date(params.maxDate).getTime() : null;
    var rows = 6;
    var cols = 7;
    var daysInPrevMonth = calendar.daysInMonth(new Date(date.getFullYear(), date.getMonth()).getTime() - (10 * 24 * 60 * 60 * 1000));
    var daysInMonth = calendar.daysInMonth(date);
    var minDayNumber = params.firstDay === 6 ? 0 : 1;

    var monthHtml = '';
    var dayIndex = 0 + (params.firstDay - 1);
    var disabled;
    var hasEvent;
    var firstDayOfMonthIndex = new Date(date.getFullYear(), date.getMonth()).getDay();
    if (firstDayOfMonthIndex === 0) { firstDayOfMonthIndex = 7; }

    if (value && value.length) {
      for (var i = 0; i < value.length; i += 1) {
        currentValues.push(new Date(value[i]).setHours(0, 0, 0, 0));
      }
    }

    for (var row = 1; row <= rows; row += 1) {
      var rowHtml = '';
      for (var col = 1; col <= cols; col += 1) {
        dayIndex += 1;
        var dayDate = (void 0);
        var dayNumber = dayIndex - firstDayOfMonthIndex;
        var addClass = '';
        if (row === 1 && col === 1 && dayNumber > minDayNumber && params.firstDay !== 1) {
          dayIndex -= 7;
          dayNumber = dayIndex - firstDayOfMonthIndex;
        }

        var weekDayIndex = ((col - 1) + params.firstDay > 6)
          ? ((col - 1 - 7) + params.firstDay)
          : ((col - 1) + params.firstDay);

        if (dayNumber < 0) {
          dayNumber = daysInPrevMonth + dayNumber + 1;
          addClass += ' calendar-day-prev';
          dayDate = new Date(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, dayNumber).getTime();
        } else {
          dayNumber += 1;
          if (dayNumber > daysInMonth) {
            dayNumber -= daysInMonth;
            addClass += ' calendar-day-next';
            dayDate = new Date(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, dayNumber).getTime();
          } else {
            dayDate = new Date(year, month, dayNumber).getTime();
          }
        }
        // Today
        if (dayDate === today) { addClass += ' calendar-day-today'; }

        // Selected
        if (params.rangePicker && currentValues.length === 2) {
          if (dayDate >= currentValues[0] && dayDate <= currentValues[1]) { addClass += ' calendar-day-selected'; }
        } else if (currentValues.indexOf(dayDate) >= 0) { addClass += ' calendar-day-selected'; }
        // Weekend
        if (params.weekendDays.indexOf(weekDayIndex) >= 0) {
          addClass += ' calendar-day-weekend';
        }
        // Has Events
        hasEvent = false;
        if (params.events) {
          if (calendar.dateInRange(dayDate, params.events)) {
            hasEvent = true;
          }
        }
        if (hasEvent) {
          addClass += ' calendar-day-has-events';
        }
        // Custom Ranges
        if (params.rangesClasses) {
          for (var k = 0; k < params.rangesClasses.length; k += 1) {
            if (calendar.dateInRange(dayDate, params.rangesClasses[k].range)) {
              addClass += " " + (params.rangesClasses[k].cssClass);
            }
          }
        }
        // Disabled
        disabled = false;
        if ((minDate && dayDate < minDate) || (maxDate && dayDate > maxDate)) {
          disabled = true;
        }
        if (params.disabled) {
          if (calendar.dateInRange(dayDate, params.disabled)) {
            disabled = true;
          }
        }
        if (disabled) {
          addClass += ' calendar-day-disabled';
        }

        dayDate = new Date(dayDate);
        var dayYear = dayDate.getFullYear();
        var dayMonth = dayDate.getMonth();
        rowHtml += ("\n          <div data-year=\"" + dayYear + "\" data-month=\"" + dayMonth + "\" data-day=\"" + dayNumber + "\" class=\"calendar-day" + addClass + "\" data-date=\"" + dayYear + "-" + dayMonth + "-" + dayNumber + "\">\n            <span>" + dayNumber + "</span>\n          </div>").trim();
      }
      monthHtml += "<div class=\"calendar-row\">" + rowHtml + "</div>";
    }
    monthHtml = "<div class=\"calendar-month\" data-year=\"" + year + "\" data-month=\"" + month + "\">" + monthHtml + "</div>";
    return monthHtml;
  };
  Calendar.prototype.renderWeekHeader = function renderWeekHeader () {
    var calendar = this;
    if (calendar.params.renderWeekHeader) {
      return calendar.params.renderWeekHeader.call(calendar);
    }
    var params = calendar.params;
    var weekDaysHtml = '';
    for (var i = 0; i < 7; i += 1) {
      var dayIndex = (i + params.firstDay > 6)
        ? ((i - 7) + params.firstDay)
        : (i + params.firstDay);
      var dayName = params.dayNamesShort[dayIndex];
      weekDaysHtml += "<div class=\"calendar-week-day\">" + dayName + "</div>";
    }
    return ("\n      <div class=\"calendar-week-header\">\n        " + weekDaysHtml + "\n      </div>\n    ").trim();
  };
  Calendar.prototype.renderMonthSelector = function renderMonthSelector () {
    var calendar = this;
    var app = calendar.app;
    if (calendar.params.renderMonthSelector) {
      return calendar.params.renderMonthSelector.call(calendar);
    }

    var needsBlackIcon;
    if (calendar.inline && calendar.$containerEl.closest('.theme-dark').length === 0) {
      needsBlackIcon = true;
    } else if (app.root.closest('.theme-dark').length === 0) {
      needsBlackIcon = true;
    }

    var iconColor = app.theme === 'md' && needsBlackIcon ? 'color-black' : '';
    return ("\n      <div class=\"calendar-month-selector\">\n        <a href=\"#\" class=\"link icon-only calendar-prev-month-button\">\n          <i class=\"icon icon-prev " + iconColor + "\"></i>\n        </a>\n        <span class=\"current-month-value\"></span>\n        <a href=\"#\" class=\"link icon-only calendar-next-month-button\">\n          <i class=\"icon icon-next " + iconColor + "\"></i>\n        </a>\n      </div>\n    ").trim();
  };
  Calendar.prototype.renderYearSelector = function renderYearSelector () {
    var calendar = this;
    var app = calendar.app;
    if (calendar.params.renderYearSelector) {
      return calendar.params.renderYearSelector.call(calendar);
    }

    var needsBlackIcon;
    if (calendar.inline && calendar.$containerEl.closest('.theme-dark').length === 0) {
      needsBlackIcon = true;
    } else if (app.root.closest('.theme-dark').length === 0) {
      needsBlackIcon = true;
    }

    var iconColor = app.theme === 'md' && needsBlackIcon ? 'color-black' : '';
    return ("\n      <div class=\"calendar-year-selector\">\n        <a href=\"#\" class=\"link icon-only calendar-prev-year-button\">\n          <i class=\"icon icon-prev " + iconColor + "\"></i>\n        </a>\n        <span class=\"current-year-value\"></span>\n        <a href=\"#\" class=\"link icon-only calendar-next-year-button\">\n          <i class=\"icon icon-next " + iconColor + "\"></i>\n        </a>\n      </div>\n    ").trim();
  };
  Calendar.prototype.renderHeader = function renderHeader () {
    var calendar = this;
    if (calendar.params.renderHeader) {
      return calendar.params.renderHeader.call(calendar);
    }
    return ("\n      <div class=\"calendar-header\">\n        <div class=\"calendar-selected-date\">" + (calendar.params.headerPlaceholder) + "</div>\n      </div>\n    ").trim();
  };
  Calendar.prototype.renderFooter = function renderFooter () {
    var calendar = this;
    var app = calendar.app;
    if (calendar.params.renderFooter) {
      return calendar.params.renderFooter.call(calendar);
    }
    return ("\n      <div class=\"calendar-footer\">\n        <a href=\"#\" class=\"" + (app.theme === 'md' ? 'button' : 'link') + " calendar-close sheet-close popover-close\">" + (calendar.params.toolbarCloseText) + "</a>\n      </div>\n    ").trim();
  };
  Calendar.prototype.renderToolbar = function renderToolbar () {
    var calendar = this;
    if (calendar.params.renderToolbar) {
      return calendar.params.renderToolbar.call(calendar, calendar);
    }
    return ("\n      <div class=\"toolbar no-shadow\">\n        <div class=\"toolbar-inner\">\n          " + (calendar.renderMonthSelector()) + "\n          " + (calendar.renderYearSelector()) + "\n        </div>\n      </div>\n    ").trim();
  };
  // eslint-disable-next-line
  Calendar.prototype.renderInline = function renderInline () {
    var calendar = this;
    var ref = calendar.params;
    var cssClass = ref.cssClass;
    var toolbar = ref.toolbar;
    var header = ref.header;
    var footer = ref.footer;
    var rangePicker = ref.rangePicker;
    var weekHeader = ref.weekHeader;
    var value = calendar.value;
    var date = value && value.length ? value[0] : new Date().setHours(0, 0, 0);
    var inlineHtml = ("\n      <div class=\"calendar calendar-inline " + (rangePicker ? 'calendar-range' : '') + " " + (cssClass || '') + "\">\n        " + (header ? calendar.renderHeader() : '') + "\n        " + (toolbar ? calendar.renderToolbar() : '') + "\n        " + (weekHeader ? calendar.renderWeekHeader() : '') + "\n        <div class=\"calendar-months\">\n          " + (calendar.renderMonths(date)) + "\n        </div>\n        " + (footer ? calendar.renderFooter() : '') + "\n      </div>\n    ").trim();

    return inlineHtml;
  };
  Calendar.prototype.renderCustomModal = function renderCustomModal () {
    var calendar = this;
    var ref = calendar.params;
    var cssClass = ref.cssClass;
    var toolbar = ref.toolbar;
    var header = ref.header;
    var footer = ref.footer;
    var rangePicker = ref.rangePicker;
    var weekHeader = ref.weekHeader;
    var value = calendar.value;
    var date = value && value.length ? value[0] : new Date().setHours(0, 0, 0);
    var sheetHtml = ("\n      <div class=\"calendar calendar-modal " + (rangePicker ? 'calendar-range' : '') + " " + (cssClass || '') + "\">\n        " + (header ? calendar.renderHeader() : '') + "\n        " + (toolbar ? calendar.renderToolbar() : '') + "\n        " + (weekHeader ? calendar.renderWeekHeader() : '') + "\n        <div class=\"calendar-months\">\n          " + (calendar.renderMonths(date)) + "\n        </div>\n        " + (footer ? calendar.renderFooter() : '') + "\n      </div>\n    ").trim();

    return sheetHtml;
  };
  Calendar.prototype.renderSheet = function renderSheet () {
    var calendar = this;
    var ref = calendar.params;
    var cssClass = ref.cssClass;
    var toolbar = ref.toolbar;
    var header = ref.header;
    var footer = ref.footer;
    var rangePicker = ref.rangePicker;
    var weekHeader = ref.weekHeader;
    var value = calendar.value;
    var date = value && value.length ? value[0] : new Date().setHours(0, 0, 0);
    var sheetHtml = ("\n      <div class=\"sheet-modal calendar calendar-sheet " + (rangePicker ? 'calendar-range' : '') + " " + (cssClass || '') + "\">\n        " + (header ? calendar.renderHeader() : '') + "\n        " + (toolbar ? calendar.renderToolbar() : '') + "\n        " + (weekHeader ? calendar.renderWeekHeader() : '') + "\n        <div class=\"sheet-modal-inner calendar-months\">\n          " + (calendar.renderMonths(date)) + "\n        </div>\n        " + (footer ? calendar.renderFooter() : '') + "\n      </div>\n    ").trim();

    return sheetHtml;
  };
  Calendar.prototype.renderPopover = function renderPopover () {
    var calendar = this;
    var ref = calendar.params;
    var cssClass = ref.cssClass;
    var toolbar = ref.toolbar;
    var header = ref.header;
    var footer = ref.footer;
    var rangePicker = ref.rangePicker;
    var weekHeader = ref.weekHeader;
    var value = calendar.value;
    var date = value && value.length ? value[0] : new Date().setHours(0, 0, 0);
    var popoverHtml = ("\n      <div class=\"popover calendar-popover\">\n        <div class=\"popover-inner\">\n          <div class=\"calendar " + (rangePicker ? 'calendar-range' : '') + " " + (cssClass || '') + "\">\n            " + (header ? calendar.renderHeader() : '') + "\n            " + (toolbar ? calendar.renderToolbar() : '') + "\n            " + (weekHeader ? calendar.renderWeekHeader() : '') + "\n            <div class=\"calendar-months\">\n              " + (calendar.renderMonths(date)) + "\n            </div>\n            " + (footer ? calendar.renderFooter() : '') + "\n          </div>\n        </div>\n      </div>\n    ").trim();

    return popoverHtml;
  };
  Calendar.prototype.render = function render () {
    var calendar = this;
    var params = calendar.params;
    if (params.render) { return params.render.call(calendar); }
    if (!calendar.inline) {
      var modalType = params.openIn;
      if (modalType === 'auto') { modalType = calendar.isPopover() ? 'popover' : 'sheet'; }

      if (modalType === 'popover') { return calendar.renderPopover(); }
      else if (modalType === 'sheet') { return calendar.renderSheet(); }
      return calendar.renderCustomModal();
    }
    return calendar.renderInline();
  };
  Calendar.prototype.onOpen = function onOpen () {
    var calendar = this;
    var initialized = calendar.initialized;
    var $el = calendar.$el;
    var app = calendar.app;
    var $inputEl = calendar.$inputEl;
    var inline = calendar.inline;
    var value = calendar.value;
    var params = calendar.params;
    calendar.opened = true;

    // Init main events
    calendar.attachCalendarEvents();

    var updateValue = !value && params.value;

    // Set value
    if (!initialized) {
      if (value) { calendar.setValue(value, 0); }
      else if (params.value) {
        calendar.setValue(params.value, 0);
      }
    } else if (value) {
      calendar.setValue(value, 0);
    }

    // Update current month and year
    calendar.updateCurrentMonthYear();

    // Set initial translate
    calendar.monthsTranslate = 0;
    calendar.setMonthsTranslate();

    // Update input value
    if (updateValue) { calendar.updateValue(); }
    else if (app.theme === 'md' && value) { calendar.updateValue(true); }

    // Extra focus
    if (!inline && $inputEl.length && app.theme === 'md') {
      $inputEl.trigger('focus');
    }

    calendar.initialized = true;

    calendar.$months.each(function (index, monthEl) {
      calendar.emit('local::monthAdd calendarMonthAdd', monthEl);
    });

    // Trigger events
    if ($el) {
      $el.trigger('calendar:open', calendar);
    }
    if ($inputEl) {
      $inputEl.trigger('calendar:open', calendar);
    }
    calendar.emit('local::open calendarOpen', calendar);
  };
  Calendar.prototype.onOpened = function onOpened () {
    var calendar = this;
    if (calendar.$el) {
      calendar.$el.trigger('calendar:opened', calendar);
    }
    if (calendar.$inputEl) {
      calendar.$inputEl.trigger('calendar:opened', calendar);
    }
    calendar.emit('local::opened calendarOpened', calendar);
  };
  Calendar.prototype.onClose = function onClose () {
    var calendar = this;
    var app = calendar.app;

    if (calendar.$inputEl && app.theme === 'md') {
      calendar.$inputEl.trigger('blur');
    }
    if (calendar.detachCalendarEvents) {
      calendar.detachCalendarEvents();
    }

    if (calendar.$el) {
      calendar.$el.trigger('calendar:close', calendar);
    }
    if (calendar.$inputEl) {
      calendar.$inputEl.trigger('calendar:close', calendar);
    }
    calendar.emit('local::close calendarClose', calendar);
  };
  Calendar.prototype.onClosed = function onClosed () {
    var calendar = this;
    calendar.opened = false;

    if (!calendar.inline) {
      Utils.nextTick(function () {
        if (calendar.modal && calendar.modal.el && calendar.modal.destroy) {
          if (!calendar.params.routableModals) {
            calendar.modal.destroy();
          }
        }
        delete calendar.modal;
      });
    }
    if (calendar.$el) {
      calendar.$el.trigger('calendar:closed', calendar);
    }
    if (calendar.$inputEl) {
      calendar.$inputEl.trigger('calendar:closed', calendar);
    }
    calendar.emit('local::closed calendarClosed', calendar);
  };
  Calendar.prototype.open = function open () {
    var obj;

    var calendar = this;
    var app = calendar.app;
    var opened = calendar.opened;
    var inline = calendar.inline;
    var $inputEl = calendar.$inputEl;
    var params = calendar.params;
    if (opened) { return; }

    if (inline) {
      calendar.$el = $$1$1(calendar.render());
      calendar.$el[0].f7Calendar = calendar;
      calendar.$wrapperEl = calendar.$el.find('.calendar-months-wrapper');
      calendar.$months = calendar.$wrapperEl.find('.calendar-month');
      calendar.$containerEl.append(calendar.$el);
      calendar.onOpen();
      calendar.onOpened();
      return;
    }
    var modalType = params.openIn;
    if (modalType === 'auto') {
      modalType = calendar.isPopover() ? 'popover' : 'sheet';
    }
    var modalContent = calendar.render();

    var modalParams = {
      targetEl: $inputEl,
      scrollToEl: calendar.params.scrollToInput ? $inputEl : undefined,
      content: modalContent,
      backdrop: modalType !== 'sheet',
      on: {
        open: function open() {
          var modal = this;
          calendar.modal = modal;
          calendar.$el = modalType === 'popover' ? modal.$el.find('.calendar') : modal.$el;
          calendar.$wrapperEl = calendar.$el.find('.calendar-months-wrapper');
          calendar.$months = calendar.$wrapperEl.find('.calendar-month');
          calendar.$el[0].f7Calendar = calendar;
          if (modalType === 'customModal') {
            $$1$1(calendar.$el).find('.calendar-close').once('click', function () {
              calendar.close();
            });
          }
          calendar.onOpen();
        },
        opened: function opened() { calendar.onOpened(); },
        close: function close() { calendar.onClose(); },
        closed: function closed() { calendar.onClosed(); },
      },
    };
    if (calendar.params.routableModals) {
      calendar.view.router.navigate({
        url: calendar.url,
        route: ( obj = {
          path: calendar.url
        }, obj[modalType] = modalParams, obj ),
      });
    } else {
      calendar.modal = app[modalType].create(modalParams);
      calendar.modal.open();
    }
  };
  Calendar.prototype.close = function close () {
    var calendar = this;
    var opened = calendar.opened;
    var inline = calendar.inline;
    if (!opened) { return; }
    if (inline) {
      calendar.onClose();
      calendar.onClosed();
      return;
    }
    if (calendar.params.routableModals) {
      calendar.view.router.back();
    } else {
      calendar.modal.close();
    }
  };
  Calendar.prototype.init = function init () {
    var calendar = this;

    calendar.initInput();

    if (calendar.inline) {
      calendar.open();
      calendar.emit('local::init calendarInit', calendar);
      return;
    }

    if (!calendar.initialized && calendar.params.value) {
      calendar.setValue(calendar.params.value);
    }

    // Attach input Events
    if (calendar.$inputEl) {
      calendar.attachInputEvents();
    }
    if (calendar.params.closeByOutsideClick) {
      calendar.attachHtmlEvents();
    }
    calendar.emit('local::init calendarInit', calendar);
  };
  Calendar.prototype.destroy = function destroy () {
    var calendar = this;
    if (calendar.destroyed) { return; }
    var $el = calendar.$el;
    calendar.emit('local::beforeDestroy calendarBeforeDestroy', calendar);
    if ($el) { $el.trigger('calendar:beforedestroy', calendar); }

    calendar.close();

    // Detach Events
    if (calendar.$inputEl) {
      calendar.detachInputEvents();
    }
    if (calendar.params.closeByOutsideClick) {
      calendar.detachHtmlEvents();
    }

    if ($el && $el.length) { delete calendar.$el[0].f7Calendar; }
    Utils.deleteProps(calendar);
    calendar.destroyed = true;
  };

  return Calendar;
}(Framework7Class));

var Calendar = {
  name: 'calendar',
  static: {
    Calendar: Calendar$1,
  },
  create: function create() {
    var app = this;
    app.calendar = ConstructorMethods({
      defaultSelector: '.calendar',
      constructor: Calendar$1,
      app: app,
      domProp: 'f7Calendar',
    });
    app.calendar.close = function close(el) {
      if ( el === void 0 ) el = '.calendar';

      var $el = $$1$1(el);
      if ($el.length === 0) { return; }
      var calendar = $el[0].f7Calendar;
      if (!calendar || (calendar && !calendar.opened)) { return; }
      calendar.close();
    };
  },
  params: {
    calendar: {
      // Calendar settings
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      firstDay: 1, // First day of the week, Monday
      weekendDays: [0, 6], // Sunday and Saturday
      multiple: false,
      rangePicker: false,
      dateFormat: 'yyyy-mm-dd',
      direction: 'horizontal', // or 'vertical'
      minDate: null,
      maxDate: null,
      disabled: null, // dates range of disabled days
      events: null, // dates range of days with events
      rangesClasses: null, // array with custom classes date ranges
      touchMove: true,
      animate: true,
      closeOnSelect: false,
      monthSelector: true,
      yearSelector: true,
      weekHeader: true,
      value: null,
      // Common opener settings
      containerEl: null,
      openIn: 'auto', // or 'popover' or 'sheet' or 'customModal'
      formatValue: null,
      inputEl: null,
      inputReadOnly: true,
      closeByOutsideClick: true,
      scrollToInput: true,
      header: false,
      headerPlaceholder: 'Select date',
      footer: false,
      toolbar: true,
      toolbarCloseText: 'Done',
      cssClass: null,
      routableModals: true,
      view: null,
      url: 'date/',
      // Render functions
      renderWeekHeader: null,
      renderMonths: null,
      renderMonth: null,
      renderMonthSelector: null,
      renderYearSelector: null,
      renderHeader: null,
      renderFooter: null,
      renderToolbar: null,
      renderInline: null,
      renderPopover: null,
      renderSheet: null,
      render: null,
    },
  },
};

var pickerColumn = function (colEl, updateItems) {
  var picker = this;
  var app = picker.app;
  var $colEl = $$1$1(colEl);
  var colIndex = $colEl.index();
  var col = picker.cols[colIndex];
  if (col.divider) { return; }

  col.$el = $colEl;
  col.$itemsEl = col.$el.find('.picker-items');
  col.items = col.$itemsEl.find('.picker-item');

  var itemHeight;
  var itemsHeight;
  var minTranslate;
  var maxTranslate;
  var animationFrameId;

  function updateDuringScroll() {
    animationFrameId = Utils.requestAnimationFrame(function () {
      col.updateItems(undefined, undefined, 0);
      updateDuringScroll();
    });
  }

  col.replaceValues = function replaceColValues(values, displayValues) {
    col.detachEvents();
    col.values = values;
    col.displayValues = displayValues;
    col.$itemsEl.html(picker.renderColumn(col, true));
    col.items = col.$itemsEl.find('.picker-item');
    col.calcSize();
    col.setValue(col.values[0], 0, true);
    col.attachEvents();
  };
  col.calcSize = function calcColSize() {
    if (picker.params.rotateEffect) {
      col.$el.removeClass('picker-column-absolute');
      if (!col.width) { col.$el.css({ width: '' }); }
    }
    var colWidth = 0;
    var colHeight = col.$el[0].offsetHeight;
    itemHeight = col.items[0].offsetHeight;
    itemsHeight = itemHeight * col.items.length;
    minTranslate = ((colHeight / 2) - itemsHeight) + (itemHeight / 2);
    maxTranslate = (colHeight / 2) - (itemHeight / 2);
    if (col.width) {
      colWidth = col.width;
      if (parseInt(colWidth, 10) === colWidth) { colWidth += 'px'; }
      col.$el.css({ width: colWidth });
    }
    if (picker.params.rotateEffect) {
      if (!col.width) {
        col.items.each(function (index, itemEl) {
          var item = $$1$1(itemEl).children('span');
          colWidth = Math.max(colWidth, item[0].offsetWidth);
        });
        col.$el.css({ width: ((colWidth + 2) + "px") });
      }
      col.$el.addClass('picker-column-absolute');
    }
  };

  col.setValue = function setColValue(newValue, transition, valueCallbacks) {
    if ( transition === void 0 ) transition = '';

    var newActiveIndex = col.$itemsEl.find((".picker-item[data-picker-value=\"" + newValue + "\"]")).index();
    if (typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
      return;
    }
    var newTranslate = (-newActiveIndex * itemHeight) + maxTranslate;
    // Update wrapper
    col.$itemsEl.transition(transition);
    col.$itemsEl.transform(("translate3d(0," + newTranslate + "px,0)"));

    // Watch items
    if (picker.params.updateValuesOnMomentum && col.activeIndex && col.activeIndex !== newActiveIndex) {
      Utils.cancelAnimationFrame(animationFrameId);
      col.$itemsEl.transitionEnd(function () {
        Utils.cancelAnimationFrame(animationFrameId);
      });
      updateDuringScroll();
    }

    // Update items
    col.updateItems(newActiveIndex, newTranslate, transition, valueCallbacks);
  };

  col.updateItems = function updateColItems(activeIndex, translate, transition, valueCallbacks) {
    if (typeof translate === 'undefined') {
      // eslint-disable-next-line
      translate = Utils.getTranslate(col.$itemsEl[0], 'y');
    }
    // eslint-disable-next-line
    if (typeof activeIndex === 'undefined') { activeIndex = -Math.round((translate - maxTranslate) / itemHeight); }
    // eslint-disable-next-line
    if (activeIndex < 0) { activeIndex = 0; }
    // eslint-disable-next-line
    if (activeIndex >= col.items.length) { activeIndex = col.items.length - 1; }
    var previousActiveIndex = col.activeIndex;
    col.activeIndex = activeIndex;
    col.$itemsEl.find('.picker-item-selected').removeClass('picker-item-selected');

    col.items.transition(transition);

    var selectedItem = col.items.eq(activeIndex).addClass('picker-item-selected').transform('');

    // Set 3D rotate effect
    if (picker.params.rotateEffect) {
      col.items.each(function (index, itemEl) {
        var $itemEl = $$1$1(itemEl);
        var itemOffsetTop = $itemEl.index() * itemHeight;
        var translateOffset = maxTranslate - translate;
        var itemOffset = itemOffsetTop - translateOffset;
        var percentage = itemOffset / itemHeight;
        var itemsFit = Math.ceil(col.height / itemHeight / 2) + 1;

        var angle = (-18 * percentage);
        if (angle > 180) { angle = 180; }
        if (angle < -180) { angle = -180; }
        if (Math.abs(percentage) > itemsFit) {
          $itemEl.addClass('picker-item-far');
        } else {
          $itemEl.removeClass('picker-item-far');
        }
        $itemEl.transform(("translate3d(0, " + (-translate + maxTranslate) + "px, " + (picker.needsOriginFix ? -110 : 0) + "px) rotateX(" + angle + "deg)"));
      });
    }

    if (valueCallbacks || typeof valueCallbacks === 'undefined') {
      // Update values
      col.value = selectedItem.attr('data-picker-value');
      col.displayValue = col.displayValues ? col.displayValues[activeIndex] : col.value;
      // On change callback
      if (previousActiveIndex !== activeIndex) {
        if (col.onChange) {
          col.onChange(picker, col.value, col.displayValue);
        }
        picker.updateValue();
      }
    }
  };

  var allowItemClick = true;
  var isTouched;
  var isMoved;
  var touchStartY;
  var touchCurrentY;
  var touchStartTime;
  var touchEndTime;
  var startTranslate;
  var returnTo;
  var currentTranslate;
  var prevTranslate;
  var velocityTranslate;
  function handleTouchStart(e) {
    if (isMoved || isTouched) { return; }
    e.preventDefault();
    isTouched = true;
    touchStartY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    touchCurrentY = touchStartY;
    touchStartTime = (new Date()).getTime();

    allowItemClick = true;
    startTranslate = Utils.getTranslate(col.$itemsEl[0], 'y');
    currentTranslate = startTranslate;
  }
  function handleTouchMove(e) {
    if (!isTouched) { return; }
    e.preventDefault();
    allowItemClick = false;
    touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
    if (!isMoved) {
      // First move
      Utils.cancelAnimationFrame(animationFrameId);
      isMoved = true;
      startTranslate = Utils.getTranslate(col.$itemsEl[0], 'y');
      currentTranslate = startTranslate;
      col.$itemsEl.transition(0);
    }

    var diff = touchCurrentY - touchStartY;
    currentTranslate = startTranslate + diff;
    returnTo = undefined;

    // Normalize translate
    if (currentTranslate < minTranslate) {
      currentTranslate = minTranslate - (Math.pow( (minTranslate - currentTranslate), 0.8 ));
      returnTo = 'min';
    }
    if (currentTranslate > maxTranslate) {
      currentTranslate = maxTranslate + (Math.pow( (currentTranslate - maxTranslate), 0.8 ));
      returnTo = 'max';
    }
    // Transform wrapper
    col.$itemsEl.transform(("translate3d(0," + currentTranslate + "px,0)"));

    // Update items
    col.updateItems(undefined, currentTranslate, 0, picker.params.updateValuesOnTouchmove);

    // Calc velocity
    velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
    prevTranslate = currentTranslate;
  }
  function handleTouchEnd() {
    if (!isTouched || !isMoved) {
      isTouched = false;
      isMoved = false;
      return;
    }
    isTouched = false;
    isMoved = false;
    col.$itemsEl.transition('');
    if (returnTo) {
      if (returnTo === 'min') {
        col.$itemsEl.transform(("translate3d(0," + minTranslate + "px,0)"));
      } else { col.$itemsEl.transform(("translate3d(0," + maxTranslate + "px,0)")); }
    }
    touchEndTime = new Date().getTime();
    var newTranslate;
    if (touchEndTime - touchStartTime > 300) {
      newTranslate = currentTranslate;
    } else {
      newTranslate = currentTranslate + (velocityTranslate * picker.params.momentumRatio);
    }

    newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);

    // Active Index
    var activeIndex = -Math.floor((newTranslate - maxTranslate) / itemHeight);

    // Normalize translate
    if (!picker.params.freeMode) { newTranslate = (-activeIndex * itemHeight) + maxTranslate; }

    // Transform wrapper
    col.$itemsEl.transform(("translate3d(0," + (parseInt(newTranslate, 10)) + "px,0)"));

    // Update items
    col.updateItems(activeIndex, newTranslate, '', true);

    // Watch items
    if (picker.params.updateValuesOnMomentum) {
      updateDuringScroll();
      col.$itemsEl.transitionEnd(function () {
        Utils.cancelAnimationFrame(animationFrameId);
      });
    }

    // Allow click
    setTimeout(function () {
      allowItemClick = true;
    }, 100);
  }

  function handleClick() {
    if (!allowItemClick) { return; }
    Utils.cancelAnimationFrame(animationFrameId);
    var value = $$1$1(this).attr('data-picker-value');
    col.setValue(value);
  }

  var activeListener = app.support.passiveListener ? { passive: false, capture: false } : false;
  col.attachEvents = function attachColEvents() {
    col.$el.on(app.touchEvents.start, handleTouchStart, activeListener);
    app.on('touchmove:active', handleTouchMove);
    app.on('touchend:passive', handleTouchEnd);
    col.items.on('click', handleClick);
  };
  col.detachEvents = function detachColEvents() {
    col.$el.off(app.touchEvents.start, handleTouchStart, activeListener);
    app.off('touchmove:active', handleTouchMove);
    app.off('touchend:passive', handleTouchEnd);
    col.items.off('click', handleClick);
  };

  col.init = function initCol() {
    col.calcSize();
    col.$itemsEl.transform(("translate3d(0," + maxTranslate + "px,0)")).transition(0);
    if (colIndex === 0) { col.$el.addClass('picker-column-first'); }
    if (colIndex === picker.cols.length - 1) { col.$el.addClass('picker-column-last'); }
    // Update items on init
    if (updateItems) { col.updateItems(0, maxTranslate, 0); }

    col.attachEvents();
  };

  col.destroy = function destroyCol() {
    col.detachEvents();
  };

  col.init();
};

var Picker$1 = (function (Framework7Class$$1) {
  function Picker(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);
    var picker = this;
    picker.params = Utils.extend({}, app.params.picker, params);

    var $containerEl;
    if (picker.params.containerEl) {
      $containerEl = $$1$1(picker.params.containerEl);
      if ($containerEl.length === 0) { return picker; }
    }

    var $inputEl;
    if (picker.params.inputEl) {
      $inputEl = $$1$1(picker.params.inputEl);
    }

    var view;
    if ($inputEl) {
      view = $inputEl.parents('.view').length && $inputEl.parents('.view')[0].f7View;
    }
    if (!view) { view = app.views.main; }

    Utils.extend(picker, {
      app: app,
      $containerEl: $containerEl,
      containerEl: $containerEl && $containerEl[0],
      inline: $containerEl && $containerEl.length > 0,
      needsOriginFix: app.device.ios || ((window.navigator.userAgent.toLowerCase().indexOf('safari') >= 0 && window.navigator.userAgent.toLowerCase().indexOf('chrome') < 0) && !app.device.android),
      cols: [],
      $inputEl: $inputEl,
      inputEl: $inputEl && $inputEl[0],
      initialized: false,
      opened: false,
      url: picker.params.url,
      view: view,
    });

    function onResize() {
      picker.resizeCols();
    }
    function onInputClick() {
      picker.open();
    }
    function onInputFocus(e) {
      e.preventDefault();
    }
    function onHtmlClick(e) {
      var $targetEl = $$1$1(e.target);
      if (picker.isPopover()) { return; }
      if (!picker.opened) { return; }
      if ($targetEl.closest('[class*="backdrop"]').length) { return; }
      if ($inputEl && $inputEl.length > 0) {
        if ($targetEl[0] !== $inputEl[0] && $targetEl.closest('.sheet-modal').length === 0) {
          picker.close();
        }
      } else if ($$1$1(e.target).closest('.sheet-modal').length === 0) {
        picker.close();
      }
    }

    // Events
    Utils.extend(picker, {
      attachResizeEvent: function attachResizeEvent() {
        app.on('resize', onResize);
      },
      detachResizeEvent: function detachResizeEvent() {
        app.off('resize', onResize);
      },
      attachInputEvents: function attachInputEvents() {
        picker.$inputEl.on('click', onInputClick);
        if (picker.params.inputReadOnly) {
          picker.$inputEl.on('focus mousedown', onInputFocus);
        }
      },
      detachInputEvents: function detachInputEvents() {
        picker.$inputEl.off('click', onInputClick);
        if (picker.params.inputReadOnly) {
          picker.$inputEl.off('focus mousedown', onInputFocus);
        }
      },
      attachHtmlEvents: function attachHtmlEvents() {
        app.on('click', onHtmlClick);
      },
      detachHtmlEvents: function detachHtmlEvents() {
        app.off('click', onHtmlClick);
      },
    });

    picker.init();

    return picker;
  }

  if ( Framework7Class$$1 ) Picker.__proto__ = Framework7Class$$1;
  Picker.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Picker.prototype.constructor = Picker;
  Picker.prototype.initInput = function initInput () {
    var picker = this;
    if (!picker.$inputEl) { return; }
    if (picker.params.inputReadOnly) { picker.$inputEl.prop('readOnly', true); }
  };
  Picker.prototype.resizeCols = function resizeCols () {
    var picker = this;
    if (!picker.opened) { return; }
    for (var i = 0; i < picker.cols.length; i += 1) {
      if (!picker.cols[i].divider) {
        picker.cols[i].calcSize();
        picker.cols[i].setValue(picker.cols[i].value, 0, false);
      }
    }
  };
  Picker.prototype.isPopover = function isPopover () {
    var picker = this;
    var app = picker.app;
    var modal = picker.modal;
    var params = picker.params;
    if (params.openIn === 'sheet') { return false; }
    if (modal && modal.type !== 'popover') { return false; }

    if (!picker.inline && picker.inputEl) {
      if (params.openIn === 'popover') { return true; }
      else if (app.device.ios) {
        return !!app.device.ipad;
      } else if (app.width >= 768) {
        return true;
      }
    }
    return false;
  };
  Picker.prototype.formatValue = function formatValue () {
    var picker = this;
    var value = picker.value;
    var displayValue = picker.displayValue;
    if (picker.params.formatValue) {
      return picker.params.formatValue.call(picker, value, displayValue);
    }
    return value.join(' ');
  };
  Picker.prototype.setValue = function setValue (values, transition) {
    var picker = this;
    var valueIndex = 0;
    if (picker.cols.length === 0) {
      picker.value = values;
      picker.updateValue(values);
      return;
    }
    for (var i = 0; i < picker.cols.length; i += 1) {
      if (picker.cols[i] && !picker.cols[i].divider) {
        picker.cols[i].setValue(values[valueIndex], transition);
        valueIndex += 1;
      }
    }
  };
  Picker.prototype.getValue = function getValue () {
    var picker = this;
    return picker.value;
  };
  Picker.prototype.updateValue = function updateValue (forceValues) {
    var picker = this;
    var newValue = forceValues || [];
    var newDisplayValue = [];
    var column;
    if (picker.cols.length === 0) {
      var noDividerColumns = picker.params.cols.filter(function (c) { return !c.divider; });
      for (var i = 0; i < noDividerColumns.length; i += 1) {
        column = noDividerColumns[i];
        if (column.displayValues !== undefined && column.values !== undefined && column.values.indexOf(newValue[i]) !== -1) {
          newDisplayValue.push(column.displayValues[column.values.indexOf(newValue[i])]);
        } else {
          newDisplayValue.push(newValue[i]);
        }
      }
    } else {
      for (var i$1 = 0; i$1 < picker.cols.length; i$1 += 1) {
        if (!picker.cols[i$1].divider) {
          newValue.push(picker.cols[i$1].value);
          newDisplayValue.push(picker.cols[i$1].displayValue);
        }
      }
    }

    if (newValue.indexOf(undefined) >= 0) {
      return;
    }
    picker.value = newValue;
    picker.displayValue = newDisplayValue;
    if (picker.params.onChange) {
      picker.emit('local::change pickerChange', picker, picker.value, picker.displayValue);
    }
    if (picker.inputEl) {
      picker.$inputEl.val(picker.formatValue());
      picker.$inputEl.trigger('change');
    }
  };
  Picker.prototype.initColumn = function initColumn (colEl, updateItems) {
    var picker = this;
    pickerColumn.call(picker, colEl, updateItems);
  };
  // eslint-disable-next-line
  Picker.prototype.destroyColumn = function destroyColumn (colEl) {
    var picker = this;
    var $colEl = $$1$1(colEl);
    var index = $colEl.index();
    if (picker.cols[index] && picker.cols[index].destroy) {
      picker.cols[index].destroy();
    }
  };
  Picker.prototype.renderToolbar = function renderToolbar () {
    var picker = this;
    if (picker.params.renderToolbar) { return picker.params.renderToolbar.call(picker, picker); }
    return ("\n      <div class=\"toolbar no-shadow\">\n        <div class=\"toolbar-inner\">\n          <div class=\"left\"></div>\n          <div class=\"right\">\n            <a href=\"#\" class=\"link sheet-close popover-close\">" + (picker.params.toolbarCloseText) + "</a>\n          </div>\n        </div>\n      </div>\n    ").trim();
  };
  // eslint-disable-next-line
  Picker.prototype.renderColumn = function renderColumn (col, onlyItems) {
    var colClasses = "picker-column " + (col.textAlign ? ("picker-column-" + (col.textAlign)) : '') + " " + (col.cssClass || '');
    var columnHtml;
    var columnItemsHtml;

    if (col.divider) {
      columnHtml = "\n        <div class=\"" + colClasses + " picker-column-divider\">" + (col.content) + "</div>\n      ";
    } else {
      columnItemsHtml = col.values.map(function (value, index) { return ("\n        <div class=\"picker-item\" data-picker-value=\"" + value + "\">\n          <span>" + (col.displayValues ? col.displayValues[index] : value) + "</span>\n        </div>\n      "); }).join('');
      columnHtml = "\n        <div class=\"" + colClasses + "\">\n          <div class=\"picker-items\">" + columnItemsHtml + "</div>\n        </div>\n      ";
    }

    return onlyItems ? columnItemsHtml.trim() : columnHtml.trim();
  };
  Picker.prototype.renderInline = function renderInline () {
    var picker = this;
    var ref = picker.params;
    var rotateEffect = ref.rotateEffect;
    var cssClass = ref.cssClass;
    var toolbar = ref.toolbar;
    var inlineHtml = ("\n      <div class=\"picker picker-inline " + (rotateEffect ? 'picker-3d' : '') + " " + (cssClass || '') + "\">\n        " + (toolbar ? picker.renderToolbar() : '') + "\n        <div class=\"picker-columns\">\n          " + (picker.cols.map(function (col) { return picker.renderColumn(col); }).join('')) + "\n          <div class=\"picker-center-highlight\"></div>\n        </div>\n      </div>\n    ").trim();

    return inlineHtml;
  };
  Picker.prototype.renderSheet = function renderSheet () {
    var picker = this;
    var ref = picker.params;
    var rotateEffect = ref.rotateEffect;
    var cssClass = ref.cssClass;
    var toolbar = ref.toolbar;
    var sheetHtml = ("\n      <div class=\"sheet-modal picker picker-sheet " + (rotateEffect ? 'picker-3d' : '') + " " + (cssClass || '') + "\">\n        " + (toolbar ? picker.renderToolbar() : '') + "\n        <div class=\"sheet-modal-inner picker-columns\">\n          " + (picker.cols.map(function (col) { return picker.renderColumn(col); }).join('')) + "\n          <div class=\"picker-center-highlight\"></div>\n        </div>\n      </div>\n    ").trim();

    return sheetHtml;
  };
  Picker.prototype.renderPopover = function renderPopover () {
    var picker = this;
    var ref = picker.params;
    var rotateEffect = ref.rotateEffect;
    var cssClass = ref.cssClass;
    var toolbar = ref.toolbar;
    var popoverHtml = ("\n      <div class=\"popover picker-popover\">\n        <div class=\"popover-inner\">\n          <div class=\"picker " + (rotateEffect ? 'picker-3d' : '') + " " + (cssClass || '') + "\">\n            " + (toolbar ? picker.renderToolbar() : '') + "\n            <div class=\"picker-columns\">\n              " + (picker.cols.map(function (col) { return picker.renderColumn(col); }).join('')) + "\n              <div class=\"picker-center-highlight\"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ").trim();

    return popoverHtml;
  };
  Picker.prototype.render = function render () {
    var picker = this;
    if (picker.params.render) { return picker.params.render.call(picker); }
    if (!picker.inline) {
      if (picker.isPopover()) { return picker.renderPopover(); }
      return picker.renderSheet();
    }
    return picker.renderInline();
  };
  Picker.prototype.onOpen = function onOpen () {
    var picker = this;
    var initialized = picker.initialized;
    var $el = picker.$el;
    var app = picker.app;
    var $inputEl = picker.$inputEl;
    var inline = picker.inline;
    var value = picker.value;
    var params = picker.params;
    picker.opened = true;

    // Init main events
    picker.attachResizeEvent();

    // Init cols
    $el.find('.picker-column').each(function (index, colEl) {
      var updateItems = true;
      if (
        (!initialized && params.value) ||
        (initialized && value)
      ) {
        updateItems = false;
      }
      picker.initColumn(colEl, updateItems);
    });

    // Set value
    if (!initialized) {
      if (value) { picker.setValue(value, 0); }
      else if (params.value) {
        picker.setValue(params.value, 0);
      }
    } else if (value) {
      picker.setValue(value, 0);
    }

    // Extra focus
    if (!inline && $inputEl.length && app.theme === 'md') {
      $inputEl.trigger('focus');
    }

    picker.initialized = true;

    // Trigger events
    if ($el) {
      $el.trigger('picker:open', picker);
    }
    if ($inputEl) {
      $inputEl.trigger('picker:open', picker);
    }
    picker.emit('local::open pickerOpen', picker);
  };
  Picker.prototype.onOpened = function onOpened () {
    var picker = this;

    if (picker.$el) {
      picker.$el.trigger('picker:opened', picker);
    }
    if (picker.$inputEl) {
      picker.$inputEl.trigger('picker:opened', picker);
    }
    picker.emit('local::opened pickerOpened', picker);
  };
  Picker.prototype.onClose = function onClose () {
    var picker = this;
    var app = picker.app;

    // Detach events
    picker.detachResizeEvent();

    picker.cols.forEach(function (col) {
      if (col.destroy) { col.destroy(); }
    });
    if (picker.$inputEl && app.theme === 'md') {
      picker.$inputEl.trigger('blur');
    }

    if (picker.$el) {
      picker.$el.trigger('picker:close', picker);
    }
    if (picker.$inputEl) {
      picker.$inputEl.trigger('picker:close', picker);
    }
    picker.emit('local::close pickerClose', picker);
  };
  Picker.prototype.onClosed = function onClosed () {
    var picker = this;
    picker.opened = false;

    if (!picker.inline) {
      Utils.nextTick(function () {
        if (picker.modal && picker.modal.el && picker.modal.destroy) {
          if (!picker.params.routableModals) {
            picker.modal.destroy();
          }
        }
        delete picker.modal;
      });
    }

    if (picker.$el) {
      picker.$el.trigger('picker:closed', picker);
    }
    if (picker.$inputEl) {
      picker.$inputEl.trigger('picker:closed', picker);
    }
    picker.emit('local::closed pickerClosed', picker);
  };
  Picker.prototype.open = function open () {
    var obj;

    var picker = this;
    var app = picker.app;
    var opened = picker.opened;
    var inline = picker.inline;
    var $inputEl = picker.$inputEl;
    if (opened) { return; }
    if (picker.cols.length === 0 && picker.params.cols.length) {
      picker.params.cols.forEach(function (col) {
        picker.cols.push(col);
      });
    }
    if (inline) {
      picker.$el = $$1$1(picker.render());
      picker.$el[0].f7Picker = picker;
      picker.$containerEl.append(picker.$el);
      picker.onOpen();
      picker.onOpened();
      return;
    }
    var isPopover = picker.isPopover();
    var modalType = isPopover ? 'popover' : 'sheet';
    var modalParams = {
      targetEl: $inputEl,
      scrollToEl: picker.params.scrollToInput ? $inputEl : undefined,
      content: picker.render(),
      backdrop: isPopover,
      on: {
        open: function open() {
          var modal = this;
          picker.modal = modal;
          picker.$el = isPopover ? modal.$el.find('.picker') : modal.$el;
          picker.$el[0].f7Picker = picker;
          picker.onOpen();
        },
        opened: function opened() { picker.onOpened(); },
        close: function close() { picker.onClose(); },
        closed: function closed() { picker.onClosed(); },
      },
    };
    if (picker.params.routableModals) {
      picker.view.router.navigate({
        url: picker.url,
        route: ( obj = {
          path: picker.url
        }, obj[modalType] = modalParams, obj ),
      });
    } else {
      picker.modal = app[modalType].create(modalParams);
      picker.modal.open();
    }
  };
  Picker.prototype.close = function close () {
    var picker = this;
    var opened = picker.opened;
    var inline = picker.inline;
    if (!opened) { return; }
    if (inline) {
      picker.onClose();
      picker.onClosed();
      return;
    }
    if (picker.params.routableModals) {
      picker.view.router.back();
    } else {
      picker.modal.close();
    }
  };
  Picker.prototype.init = function init () {
    var picker = this;

    picker.initInput();

    if (picker.inline) {
      picker.open();
      picker.emit('local::init pickerInit', picker);
      return;
    }

    if (!picker.initialized && picker.params.value) {
      picker.setValue(picker.params.value);
    }

    // Attach input Events
    if (picker.$inputEl) {
      picker.attachInputEvents();
    }
    if (picker.params.closeByOutsideClick) {
      picker.attachHtmlEvents();
    }
    picker.emit('local::init pickerInit', picker);
  };
  Picker.prototype.destroy = function destroy () {
    var picker = this;
    if (picker.destroyed) { return; }
    var $el = picker.$el;
    picker.emit('local::beforeDestroy pickerBeforeDestroy', picker);
    if ($el) { $el.trigger('picker:beforedestroy', picker); }

    picker.close();

    // Detach Events
    if (picker.$inputEl) {
      picker.detachInputEvents();
    }
    if (picker.params.closeByOutsideClick) {
      picker.detachHtmlEvents();
    }

    if ($el && $el.length) { delete picker.$el[0].f7Picker; }
    Utils.deleteProps(picker);
    picker.destroyed = true;
  };

  return Picker;
}(Framework7Class));

var Picker = {
  name: 'picker',
  static: {
    Picker: Picker$1,
  },
  create: function create() {
    var app = this;
    app.picker = ConstructorMethods({
      defaultSelector: '.picker',
      constructor: Picker$1,
      app: app,
      domProp: 'f7Picker',
    });
    app.picker.close = function close(el) {
      if ( el === void 0 ) el = '.picker';

      var $el = $$1$1(el);
      if ($el.length === 0) { return; }
      var picker = $el[0].f7Picker;
      if (!picker || (picker && !picker.opened)) { return; }
      picker.close();
    };
  },
  params: {
    picker: {
      // Picker settings
      updateValuesOnMomentum: false,
      updateValuesOnTouchmove: true,
      rotateEffect: false,
      momentumRatio: 7,
      freeMode: false,
      cols: [],
      // Common opener settings
      containerEl: null,
      openIn: 'auto', // or 'popover' or 'sheet'
      formatValue: null,
      inputEl: null,
      inputReadOnly: true,
      closeByOutsideClick: true,
      scrollToInput: true,
      toolbar: true,
      toolbarCloseText: 'Done',
      cssClass: null,
      routableModals: true,
      view: null,
      url: 'select/',
      // Render functions
      renderColumn: null,
      renderToolbar: null,
      renderInline: null,
      renderPopover: null,
      renderSheet: null,
      render: null,
    },
  },
};

var InfiniteScroll = {
  handleScroll: function handleScroll(el, e) {
    var app = this;
    var $el = $$1$1(el);
    var scrollTop = $el[0].scrollTop;
    var scrollHeight = $el[0].scrollHeight;
    var height = $el[0].offsetHeight;
    var distance = $el[0].getAttribute('data-infinite-distance');

    var virtualListContainer = $el.find('.virtual-list');
    var virtualList;

    var onTop = $el.hasClass('infinite-scroll-top');
    if (!distance) { distance = 50; }
    if (typeof distance === 'string' && distance.indexOf('%') >= 0) {
      distance = (parseInt(distance, 10) / 100) * height;
    }
    if (distance > height) { distance = height; }
    if (onTop) {
      if (scrollTop < distance) {
        $el.trigger('infinite', e);
        app.emit('infinite', $el[0], e);
      }
    } else if (scrollTop + height >= scrollHeight - distance) {
      if (virtualListContainer.length > 0) {
        virtualList = virtualListContainer.eq(-1)[0].f7VirtualList;
        if (virtualList && !virtualList.reachEnd && !virtualList.params.updatableScroll) {
          return;
        }
      }
      $el.trigger('infinite', e);
      app.emit('infinite', $el[0], e);
    }
  },
  create: function create(el) {
    var $el = $$1$1(el);
    var app = this;
    $el.on('scroll', function handle(e) {
      app.infiniteScroll.handle(this, e);
    });
  },
  destroy: function destroy(el) {
    var $el = $$1$1(el);
    $el.off('scroll');
  },
};
var InfiniteScroll$1 = {
  name: 'infiniteScroll',
  create: function create() {
    var app = this;
    Utils.extend(app, {
      infiniteScroll: {
        handle: InfiniteScroll.handleScroll.bind(app),
        create: InfiniteScroll.create.bind(app),
        destroy: InfiniteScroll.destroy.bind(app),
      },
    });
  },
  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      var $tabEl = $$1$1(tabEl);
      $tabEl.find('.infinite-scroll-content').each(function (index, el) {
        app.infiniteScroll.create(el);
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var $tabEl = $$1$1(tabEl);
      var app = this;
      $tabEl.find('.infinite-scroll-content').each(function (index, el) {
        app.infiniteScroll.destroy(el);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.infinite-scroll-content').each(function (index, el) {
        app.infiniteScroll.create(el);
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.infinite-scroll-content').each(function (index, el) {
        app.infiniteScroll.destroy(el);
      });
    },
  },
};

var PullToRefresh$1 = (function (Framework7Class$$1) {
  function PullToRefresh(app, el) {
    Framework7Class$$1.call(this, {}, [app]);
    var ptr = this;
    var $el = $$1$1(el);
    var $preloaderEl = $el.find('.ptr-preloader');

    ptr.$el = $el;
    ptr.el = $el[0];

    // Extend defaults with modules params
    ptr.useModulesParams({});

    var isMaterial = app.theme === 'md';

    // Done
    ptr.done = function done() {
      var $transitionTarget = isMaterial ? $preloaderEl : $el;
      $transitionTarget.transitionEnd(function () {
        $el.removeClass('ptr-transitioning ptr-pull-up ptr-pull-down');
        $el.trigger('ptr:done');
        ptr.emit('local::done ptrDone', $el[0]);
      });
      $el.removeClass('ptr-refreshing').addClass('ptr-transitioning');
      return ptr;
    };

    ptr.refresh = function refresh() {
      if ($el.hasClass('ptr-refreshing')) { return ptr; }
      $el.addClass('ptr-transitioning ptr-refreshing');
      $el.trigger('ptr:refresh', ptr.done);
      ptr.emit('local::refresh ptrRefresh', $el[0], ptr.done);
      return ptr;
    };

    // Events handling
    var touchId;
    var isTouched;
    var isMoved;
    var touchesStart = {};
    var isScrolling;
    var touchesDiff;
    var refresh = false;
    var useTranslate = false;
    var startTranslate = 0;
    var translate;
    var scrollTop;
    var wasScrolled;
    var triggerDistance;
    var dynamicTriggerDistance;
    var pullStarted;
    var hasNavbar = false;
    var $pageEl = $el.parents('.page');

    if ($pageEl.find('.navbar').length > 0 || $pageEl.parents('.view').children('.navbar').length > 0) { hasNavbar = true; }
    if ($pageEl.hasClass('no-navbar')) { hasNavbar = false; }
    if (!hasNavbar) { $el.addClass('ptr-no-navbar'); }

    // Define trigger distance
    if ($el.attr('data-ptr-distance')) {
      dynamicTriggerDistance = true;
    } else {
      triggerDistance = isMaterial ? 66 : 44;
    }

    function handleTouchStart(e) {
      if (isTouched) {
        if (Device.os === 'android') {
          if ('targetTouches' in e && e.targetTouches.length > 1) { return; }
        } else { return; }
      }

      if ($el.hasClass('ptr-refreshing')) {
        return;
      }
      if ($$1$1(e.target).closest('.sortable-handler').length) { return; }

      isMoved = false;
      pullStarted = false;
      isTouched = true;
      isScrolling = undefined;
      wasScrolled = undefined;
      if (e.type === 'touchstart') { touchId = e.targetTouches[0].identifier; }
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    }

    function handleTouchMove(e) {
      if (!isTouched) { return; }
      var pageX;
      var pageY;
      var touch;
      if (e.type === 'touchmove') {
        if (touchId && e.touches) {
          for (var i = 0; i < e.touches.length; i += 1) {
            if (e.touches[i].identifier === touchId) {
              touch = e.touches[i];
            }
          }
        }
        if (!touch) { touch = e.targetTouches[0]; }
        pageX = touch.pageX;
        pageY = touch.pageY;
      } else {
        pageX = e.pageX;
        pageY = e.pageY;
      }
      if (!pageX || !pageY) { return; }


      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      if (!isScrolling) {
        isTouched = false;
        return;
      }

      scrollTop = $el[0].scrollTop;
      if (typeof wasScrolled === 'undefined' && scrollTop !== 0) { wasScrolled = true; }

      if (!isMoved) {
        $el.removeClass('ptr-transitioning');
        if (scrollTop > $el[0].offsetHeight) {
          isTouched = false;
          return;
        }
        if (dynamicTriggerDistance) {
          triggerDistance = $el.attr('data-ptr-distance');
          if (triggerDistance.indexOf('%') >= 0) { triggerDistance = ($el[0].offsetHeight * parseInt(triggerDistance, 10)) / 100; }
        }
        startTranslate = $el.hasClass('ptr-refreshing') ? triggerDistance : 0;
        if ($el[0].scrollHeight === $el[0].offsetHeight || Device.os !== 'ios' || isMaterial) {
          useTranslate = true;
        } else {
          useTranslate = false;
        }
      }
      isMoved = true;
      touchesDiff = pageY - touchesStart.y;

      if ((touchesDiff > 0 && scrollTop <= 0) || scrollTop < 0) {
        // iOS 8 fix
        if (Device.os === 'ios' && parseInt(Device.osVersion.split('.')[0], 10) > 7 && scrollTop === 0 && !wasScrolled) { useTranslate = true; }

        if (useTranslate) {
          e.preventDefault();
          translate = (Math.pow( touchesDiff, 0.85 )) + startTranslate;
          if (isMaterial) {
            $preloaderEl.transform(("translate3d(0," + translate + "px,0)"))
              .find('.ptr-arrow').transform(("rotate(" + ((180 * (touchesDiff / 66)) + 100) + "deg)"));
          } else {
            $el.transform(("translate3d(0," + translate + "px,0)"));
          }
        }
        if ((useTranslate && (Math.pow( touchesDiff, 0.85 )) > triggerDistance) || (!useTranslate && touchesDiff >= triggerDistance * 2)) {
          refresh = true;
          $el.addClass('ptr-pull-up').removeClass('ptr-pull-down');
        } else {
          refresh = false;
          $el.removeClass('ptr-pull-up').addClass('ptr-pull-down');
        }
        if (!pullStarted) {
          $el.trigger('ptr:pullstart');
          ptr.emit('local::pullStart ptrPullStart', $el[0]);
          pullStarted = true;
        }
        $el.trigger('ptr:pullmove', {
          event: e,
          scrollTop: scrollTop,
          translate: translate,
          touchesDiff: touchesDiff,
        });
        ptr.emit('local::pullMove ptrPullMove', $el[0], {
          event: e,
          scrollTop: scrollTop,
          translate: translate,
          touchesDiff: touchesDiff,
        });
      } else {
        pullStarted = false;
        $el.removeClass('ptr-pull-up ptr-pull-down');
        refresh = false;
      }
    }
    function handleTouchEnd(e) {
      if (e.type === 'touchend' && e.changedTouches && e.changedTouches.length > 0 && touchId) {
        if (e.changedTouches[0].identifier !== touchId) {
          isTouched = false;
          isScrolling = false;
          isMoved = false;
          touchId = null;
          return;
        }
      }
      if (!isTouched || !isMoved) {
        isTouched = false;
        isMoved = false;
        return;
      }
      if (translate) {
        $el.addClass('ptr-transitioning');
        translate = 0;
      }
      if (isMaterial) {
        $preloaderEl.transform('')
          .find('.ptr-arrow').transform('');
      } else {
        $el.transform('');
      }

      if (refresh) {
        $el.addClass('ptr-refreshing');
        $el.trigger('ptr:refresh', ptr.done);
        ptr.emit('local::refresh ptrRefresh', $el[0], ptr.done);
      } else {
        $el.removeClass('ptr-pull-down');
      }
      isTouched = false;
      isMoved = false;
      if (pullStarted) {
        $el.trigger('ptr:pullend');
        ptr.emit('local::pullEnd ptrPullEnd', $el[0]);
      }
    }

    if (!$pageEl.length || !$el.length) { return ptr; }

    $el[0].f7PullToRefresh = ptr;

    // Events
    ptr.attachEvents = function attachEvents() {
      var passive = Support$1.passiveListener ? { passive: true } : false;
      $el.on(app.touchEvents.start, handleTouchStart, passive);
      app.on('touchmove', handleTouchMove);
      app.on('touchend:passive', handleTouchEnd);
    };
    ptr.detachEvents = function detachEvents() {
      var passive = Support$1.passiveListener ? { passive: true } : false;
      $el.off(app.touchEvents.start, handleTouchStart, passive);
      app.off('touchmove', handleTouchMove);
      app.off('touchend:passive', handleTouchEnd);
    };

    // Install Modules
    ptr.useModules();

    // Init
    ptr.init();

    return ptr;
  }

  if ( Framework7Class$$1 ) PullToRefresh.__proto__ = Framework7Class$$1;
  PullToRefresh.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  PullToRefresh.prototype.constructor = PullToRefresh;
  PullToRefresh.prototype.init = function init () {
    var ptr = this;
    ptr.attachEvents();
  };
  PullToRefresh.prototype.destroy = function destroy () {
    var ptr = this;
    ptr.emit('local::beforeDestroy ptrBeforeDestroy', ptr);
    ptr.$el.trigger('ptr:beforedestroy', ptr);
    delete ptr.el.f7PullToRefresh;
    ptr.detachEvents();
    Utils.deleteProps(ptr);
    ptr = null;
  };

  return PullToRefresh;
}(Framework7Class));

var PullToRefresh = {
  name: 'pullToRefresh',
  create: function create() {
    var app = this;
    app.ptr = Utils.extend(
      ConstructorMethods({
        defaultSelector: '.ptr-content',
        constructor: PullToRefresh$1,
        app: app,
        domProp: 'f7PullToRefresh',
      }),
      {
        done: function done(el) {
          var ptr = app.ptr.get(el);
          if (ptr) { return ptr.done(); }
          return undefined;
        },
        refresh: function refresh(el) {
          var ptr = app.ptr.get(el);
          if (ptr) { return ptr.refresh(); }
          return undefined;
        },
      }
    );
  },
  static: {
    PullToRefresh: PullToRefresh$1,
  },
  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      var $tabEl = $$1$1(tabEl);
      $tabEl.find('.ptr-content').each(function (index, el) {
        app.ptr.create(el);
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var $tabEl = $$1$1(tabEl);
      var app = this;
      $tabEl.find('.ptr-content').each(function (index, el) {
        app.ptr.destroy(el);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.ptr-content').each(function (index, el) {
        app.ptr.create(el);
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.ptr-content').each(function (index, el) {
        app.ptr.destroy(el);
      });
    },
  },
};

var Lazy = {
  destroy: function destroy(pageEl) {
    var $pageEl = $$1$1(pageEl).closest('.page');
    if (!$pageEl.length) { return; }
    if ($pageEl[0].f7DestroyLazy) {
      $pageEl[0].f7DestroyLazy();
    }
  },
  init: function init(pageEl) {
    var app = this;
    var $pageEl = $$1$1(pageEl).closest('.page').eq(0);

    // Lazy images
    var lazyLoadImages = $pageEl.find('.lazy');
    if (lazyLoadImages.length === 0 && !$pageEl.hasClass('lazy')) { return; }

    // Placeholder
    var placeholderSrc = app.params.lazy.placeholder;

    if (placeholderSrc !== false) {
      lazyLoadImages.each(function (index, lazyEl) {
        if ($$1$1(lazyEl).attr('data-src') && !$$1$1(lazyEl).attr('src')) { $$1$1(lazyEl).attr('src', placeholderSrc); }
      });
    }

    // load image
    var imagesSequence = [];
    var imageIsLoading = false;

    function onImageComplete(lazyEl) {
      if (imagesSequence.indexOf(lazyEl) >= 0) {
        imagesSequence.splice(imagesSequence.indexOf(lazyEl), 1);
      }
      imageIsLoading = false;
      if (app.params.lazy.sequential && imagesSequence.length > 0) {
        imageIsLoading = true;
        app.lazy.loadImage(imagesSequence[0], onImageComplete);
      }
    }

    function lazyHandler() {
      app.lazy.load($pageEl, function (lazyEl) {
        if (app.params.lazy.sequential && imageIsLoading) {
          if (imagesSequence.indexOf(lazyEl) < 0) { imagesSequence.push(lazyEl); }
          return;
        }
        imageIsLoading = true;
        app.lazy.loadImage(lazyEl, onImageComplete);
      });
    }

    function attachEvents() {
      $pageEl.on('lazy', lazyHandler);
      $pageEl.on('scroll', lazyHandler, true);
      $pageEl.find('.tab').on('tab:mounted tab:show', lazyHandler);
      app.on('resize', lazyHandler);
    }
    function detachEvents() {
      $pageEl.off('lazy', lazyHandler);
      $pageEl.off('scroll', lazyHandler, true);
      $pageEl.find('.tab').off('tab:mounted tab:show', lazyHandler);
      app.off('resize', lazyHandler);
    }

    // Store detach function
    $pageEl[0].f7DestroyLazy = detachEvents;

    // Attach events
    attachEvents();

    // Run loader on page load/init
    lazyHandler();
  },
  isInViewport: function isInViewport(lazyEl) {
    var app = this;
    var rect = lazyEl.getBoundingClientRect();
    var threshold = app.params.lazy.threshold || 0;

    return (
      rect.top >= (0 - threshold) &&
      rect.left >= (0 - threshold) &&
      rect.top <= (app.height + threshold) &&
      rect.left <= (app.width + threshold)
    );
  },
  loadImage: function loadImage(imageEl, callback) {
    var app = this;
    var $imageEl = $$1$1(imageEl);

    var bg = $imageEl.attr('data-background');
    var src = bg || $imageEl.attr('data-src');
    if (!src) { return; }
    function onLoad() {
      $imageEl.removeClass('lazy').addClass('lazy-loaded');
      if (bg) {
        $imageEl.css('background-image', ("url(" + src + ")"));
      } else {
        $imageEl.attr('src', src);
      }
      if (callback) { callback(imageEl); }
      $imageEl.trigger('lazy:loaded');
      app.emit('lazyLoaded', $imageEl[0]);
    }

    function onError() {
      $imageEl.removeClass('lazy').addClass('lazy-loaded');
      if (bg) {
        $imageEl.css('background-image', ("url(" + (app.params.lazy.placeholder || '') + ")"));
      } else {
        $imageEl.attr('src', app.params.lazy.placeholder || '');
      }
      if (callback) { callback(imageEl); }
      $imageEl.trigger('lazy:error');
      app.emit('lazyError', $imageEl[0]);
    }
    var image = new window.Image();
    image.onload = onLoad;
    image.onerror = onError;
    image.src = src;

    $imageEl.removeAttr('data-src').removeAttr('data-background');

    // Add loaded callback and events
    $imageEl.trigger('lazy:load');
    app.emit('lazyLoad', $imageEl[0]);
  },
  load: function load(pageEl, callback) {
    var app = this;
    var $pageEl = $$1$1(pageEl);
    if (!$pageEl.hasClass('page')) { $pageEl = $pageEl.parents('.page').eq(0); }
    if ($pageEl.length === 0) {
      return;
    }
    $pageEl.find('.lazy').each(function (index, lazyEl) {
      var $lazyEl = $$1$1(lazyEl);
      if ($lazyEl.parents('.tab:not(.tab-active)').length > 0) {
        return;
      }
      if (app.lazy.isInViewport(lazyEl)) {
        if (callback) { callback(lazyEl); }
        else { app.lazy.loadImage(lazyEl); }
      }
    });
  },

};
var Lazy$1 = {
  name: 'lazy',
  params: {
    lazy: {
      placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXCwsK592mkAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==',
      threshold: 0,
      sequential: true,
    },
  },
  create: function create() {
    var app = this;
    Utils.extend(app, {
      lazy: {
        init: Lazy.init.bind(app),
        destroy: Lazy.destroy.bind(app),
        loadImage: Lazy.loadImage.bind(app),
        load: Lazy.load.bind(app),
        isInViewport: Lazy.isInViewport.bind(app),
      },
    });
  },
  on: {
    pageInit: function pageInit(page) {
      var app = this;
      if (page.$el.find('.lazy').length > 0 || page.$el.hasClass('lazy')) {
        app.lazy.init(page.$el);
      }
    },
    pageAfterIn: function pageAfterIn(page) {
      var app = this;
      if (page.$el.find('.lazy').length > 0 || page.$el.hasClass('lazy')) {
        app.lazy.init(page.$el);
      }
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      if (page.$el.find('.lazy').length > 0 || page.$el.hasClass('lazy')) {
        app.lazy.destroy(page.$el);
      }
    },
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      var $tabEl = $$1$1(tabEl);
      if ($tabEl.find('.lazy').length > 0 || $tabEl.hasClass('lazy')) {
        app.lazy.init($tabEl);
      }
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var app = this;
      var $tabEl = $$1$1(tabEl);
      if ($tabEl.find('.lazy').length > 0 || $tabEl.hasClass('lazy')) {
        app.lazy.destroy($tabEl);
      }
    },
  },
};

var DataTable$1 = (function (Framework7Class$$1) {
  function DataTable(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);

    var table = this;

    var defaults = {

    };

    // Extend defaults with modules params
    table.useModulesParams(defaults);

    table.params = Utils.extend(defaults, params);

    // El
    var $el = $$1$1(table.params.el);
    if ($el.length === 0) { return undefined; }

    table.$el = $el;
    table.el = $el[0];

    if (table.$el[0].f7DataTable) {
      var instance = table.$el[0].f7DataTable;
      table.destroy();
      return instance;
    }

    table.$el[0].f7DataTable = table;

    Utils.extend(table, {
      collapsible: $el.hasClass('data-table-collapsible'),
      // Headers
      $headerEl: $el.find('.data-table-header'),
      $headerSelectedEl: $el.find('.data-table-header-selected'),
    });

    // Events
    function handleChange(e) {
      if (e.detail && e.detail.sentByF7DataTable) {
        // Scripted event, don't do anything
        return;
      }
      var $inputEl = $$1$1(this);
      var checked = $inputEl[0].checked;
      var columnIndex = $inputEl.parents('td,th').index();

      if ($inputEl.parents('thead').length > 0) {
        if (columnIndex === 0) {
          $el
            .find('tbody tr')[checked ? 'addClass' : 'removeClass']('data-table-row-selected');
        }
        $el
          .find(("tbody tr td:nth-child(" + (columnIndex + 1) + ") input"))
          .prop('checked', checked)
          .trigger('change', { sentByF7DataTable: true });
      } else {
        if (columnIndex === 0) {
          $inputEl.parents('tr')[checked ? 'addClass' : 'removeClass']('data-table-row-selected');
        }

        if (!checked) {
          $el.find(("thead .checkbox-cell:nth-child(" + (columnIndex + 1) + ") input[type=\"checkbox\"]")).prop('checked', false);
        } else if ($el.find(("tbody .checkbox-cell:nth-child(" + (columnIndex + 1) + ") input[type=\"checkbox\"]:checked")).length === $el.find('tbody tr').length) {
          $el.find(("thead .checkbox-cell:nth-child(" + (columnIndex + 1) + ") input[type=\"checkbox\"]")).prop('checked', true).trigger('change', { sentByF7DataTable: true });
        }
      }
      table.checkSelectedHeader();
    }
    function handleSortableClick() {
      var $cellEl = $$1$1(this);
      var isActive = $cellEl.hasClass('sortable-cell-active');
      var currentSort;
      if (isActive) {
        currentSort = $cellEl.hasClass('sortable-desc') ? 'desc' : 'asc';
        $cellEl.removeClass('sortable-desc sortable-asc').addClass(("sortable-" + (currentSort === 'desc' ? 'asc' : 'desc')));
      } else {
        $el.find('thead .sortable-cell-active').removeClass('sortable-cell-active');
        $cellEl.addClass('sortable-cell-active');
      }
    }
    table.attachEvents = function attachEvents() {
      table.$el.on('change', '.checkbox-cell input[type="checkbox"]', handleChange);
      table.$el.find('thead .sortable-cell').on('click', handleSortableClick);
    };
    table.detachEvents = function detachEvents() {
      table.$el.off('change', '.checkbox-cell input[type="checkbox"]', handleChange);
      table.$el.find('thead .sortable-cell').off('click', handleSortableClick);
    };

    // Install Modules
    table.useModules();

    // Init
    table.init();

    return table;
  }

  if ( Framework7Class$$1 ) DataTable.__proto__ = Framework7Class$$1;
  DataTable.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  DataTable.prototype.constructor = DataTable;
  DataTable.prototype.setCollapsibleLabels = function setCollapsibleLabels () {
    var table = this;
    if (!table.collapsible) { return; }
    table.$el.find('tbody td:not(.checkbox-cell)').each(function (index, el) {
      var $el = $$1$1(el);
      var elIndex = $el.index();
      var collpsibleTitle = $el.attr('data-collapsible-title');
      if (!collpsibleTitle && collpsibleTitle !== '') {
        $el.attr('data-collapsible-title', table.$el.find('thead th').eq(elIndex).text());
      }
    });
  };
  DataTable.prototype.checkSelectedHeader = function checkSelectedHeader () {
    var table = this;
    if (table.$headerEl.length > 0 && table.$headerSelectedEl.length > 0) {
      var checkedItems = table.$el.find('tbody .checkbox-cell input:checked').length;
      table.$el[checkedItems > 0 ? 'addClass' : 'removeClass']('data-table-has-checked');
      table.$headerSelectedEl.find('.data-table-selected-count').text(checkedItems);
    }
  };
  DataTable.prototype.init = function init () {
    var table = this;
    table.attachEvents();
    table.setCollapsibleLabels();
    table.checkSelectedHeader();
  };
  DataTable.prototype.destroy = function destroy () {
    var table = this;

    table.$el.trigger('datatable:beforedestroy', table);
    table.emit('local::beforeDestroy datatableBeforeDestroy', table);

    table.attachEvents();
    table.$el[0].f7DataTable = null;
    delete table.$el[0].f7DataTable;
    Utils.deleteProps(table);
    table = null;
  };

  return DataTable;
}(Framework7Class));

var DataTable = {
  name: 'dataTable',
  static: {
    DataTable: DataTable$1,
  },
  create: function create() {
    var app = this;
    app.dataTable = ConstructorMethods({
      defaultSelector: '.data-table',
      constructor: DataTable$1,
      app: app,
      domProp: 'f7DataTable',
    });
  },
  on: {
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var app = this;
      $$1$1(tabEl).find('.data-table-init').each(function (index, tableEl) {
        app.dataTable.destroy(tableEl);
      });
    },
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      $$1$1(tabEl).find('.data-table-init').each(function (index, tableEl) {
        app.dataTable.create({ el: tableEl });
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.data-table-init').each(function (index, tableEl) {
        app.dataTable.destroy(tableEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.data-table-init').each(function (index, tableEl) {
        app.dataTable.create({ el: tableEl });
      });
    },
  },
  clicks: {

  },
};

var Fab = {
  morphOpen: function morphOpen(fabEl, targetEl) {
    var app = this;
    var $fabEl = $$1$1(fabEl);
    var $targetEl = $$1$1(targetEl);
    if ($targetEl.length === 0) { return; }

    $targetEl.transition(0).addClass('fab-morph-target-visible');
    var target = {
      width: $targetEl[0].offsetWidth,
      height: $targetEl[0].offsetHeight,
      offset: $targetEl.offset(),
      borderRadius: $targetEl.css('border-radius'),
      zIndex: $targetEl.css('z-index'),
    };
    var fab = {
      width: $fabEl[0].offsetWidth,
      height: $fabEl[0].offsetHeight,
      offset: $fabEl.offset(),
      translateX: Utils.getTranslate($fabEl[0], 'x'),
      translateY: Utils.getTranslate($fabEl[0], 'y'),
    };

    $fabEl[0].f7FabMorphData = {
      $targetEl: $targetEl,
      target: target,
      fab: fab,
    };

    var diffX = (fab.offset.left + (fab.width / 2)) -
                  (target.offset.left + (target.width / 2)) -
                  fab.translateX;
    var diffY = (fab.offset.top + (fab.height / 2)) -
                  (target.offset.top + (target.height / 2)) -
                  fab.translateY;
    var scaleX = target.width / fab.width;
    var scaleY = target.height / fab.height;

    var borderRadius = Math.ceil(parseInt(target.borderRadius, 10) / Math.max(scaleX, scaleY));
    if (borderRadius > 0) { borderRadius += 2; }

    $fabEl[0].f7FabMorphResizeHandler = function resizeHandler() {
      $fabEl.transition(0).transform('');
      $targetEl.transition(0);
      target.width = $targetEl[0].offsetWidth;
      target.height = $targetEl[0].offsetHeight;
      target.offset = $targetEl.offset();
      fab.offset = $fabEl.offset();

      var diffXNew = (fab.offset.left + (fab.width / 2)) -
                      (target.offset.left + (target.width / 2)) -
                      fab.translateX;
      var diffYNew = (fab.offset.top + (fab.height / 2)) -
                      (target.offset.top + (target.height / 2)) -
                      fab.translateY;
      var scaleXNew = target.width / fab.width;
      var scaleYNew = target.height / fab.height;

      $fabEl.transform(("translate3d(" + (-diffXNew) + "px, " + (-diffYNew) + "px, 0) scale(" + scaleXNew + ", " + scaleYNew + ")"));
    };

    $targetEl
      .css('opacity', 0)
      .transform(("scale(" + (1 / scaleX) + ", " + (1 / scaleY) + ")"));
    $fabEl
      .addClass('fab-opened')
      .css('z-index', target.zIndex - 1)
      .transform(("translate3d(" + (-diffX) + "px, " + (-diffY) + "px, 0)"));
    $fabEl.transitionEnd(function () {
      $targetEl.transition('');
      Utils.nextTick(function () {
        $targetEl.css('opacity', 1).transform('scale(1,1)');
      });
      $fabEl.transform(("translate3d(" + (-diffX) + "px, " + (-diffY) + "px, 0) scale(" + scaleX + ", " + scaleY + ")"))
        .css('border-radius', (borderRadius + "px"))
        .css('box-shadow', 'none');
      app.on('resize', $fabEl[0].f7FabMorphResizeHandler);
      if ($targetEl.parents('.page-content').length > 0) {
        $targetEl.parents('.page-content').on('scroll', $fabEl[0].f7FabMorphResizeHandler);
      }
    });
  },
  morphClose: function morphClose(fabEl) {
    var app = this;
    var $fabEl = $$1$1(fabEl);
    var morphData = $fabEl[0].f7FabMorphData;
    if (!morphData) { return; }
    var $targetEl = morphData.$targetEl;
    var target = morphData.target;
    var fab = morphData.fab;
    if ($targetEl.length === 0) { return; }

    var diffX = (fab.offset.left + (fab.width / 2)) -
                  (target.offset.left + (target.width / 2)) -
                  fab.translateX;
    var diffY = (fab.offset.top + (fab.height / 2)) -
                  (target.offset.top + (target.height / 2)) -
                  fab.translateY;
    var scaleX = target.width / fab.width;
    var scaleY = target.height / fab.height;

    app.off('resize', $fabEl[0].f7FabMorphResizeHandler);
    if ($targetEl.parents('.page-content').length > 0) {
      $targetEl.parents('.page-content').off('scroll', $fabEl[0].f7FabMorphResizeHandler);
    }

    $targetEl
      .css('opacity', 0)
      .transform(("scale(" + (1 / scaleX) + ", " + (1 / scaleY) + ")"));
    $fabEl
      .transition('')
      .css('box-shadow', '')
      .css('border-radius', '')
      .transform(("translate3d(" + (-diffX) + "px, " + (-diffY) + "px, 0)"));
    $fabEl.transitionEnd(function () {
      $fabEl
        .css('z-index', '')
        .removeClass('fab-opened')
        .transform('');
      Utils.nextTick(function () {
        $fabEl.transitionEnd(function () {
          $targetEl
            .removeClass('fab-morph-target-visible')
            .css('opacity', '')
            .transform('')
            .transition('');
        });
      });
    });
  },
  open: function open(fabEl, targetEl) {
    var app = this;
    var $fabEl = $$1$1(fabEl).eq(0);
    var $buttonsEl = $fabEl.find('.fab-buttons');
    if (!$fabEl.length) { return; }
    if ($fabEl.hasClass('fab-opened')) { return; }
    if (!$buttonsEl.length && !$fabEl.hasClass('fab-morph')) { return; }

    if (app.fab.openedEl) {
      if (app.fab.openedEl === $fabEl[0]) { return; }
      app.fab.close(app.fab.openedEl);
    }
    app.fab.openedEl = $fabEl[0];
    if ($fabEl.hasClass('fab-morph')) {
      app.fab.morphOpen($fabEl, targetEl || $fabEl.attr('data-morph-to'));
    } else {
      $fabEl.addClass('fab-opened');
    }
    $fabEl.trigger('fab:open');
  },
  close: function close(fabEl) {
    if ( fabEl === void 0 ) fabEl = '.fab-opened';

    var app = this;
    var $fabEl = $$1$1(fabEl).eq(0);
    var $buttonsEl = $fabEl.find('.fab-buttons');
    if (!$fabEl.length) { return; }
    if (!$fabEl.hasClass('fab-opened')) { return; }
    if (!$buttonsEl.length && !$fabEl.hasClass('fab-morph')) { return; }
    app.fab.openedEl = null;
    if ($fabEl.hasClass('fab-morph')) {
      app.fab.morphClose($fabEl);
    } else {
      $fabEl.removeClass('fab-opened');
    }
    $fabEl.trigger('fab:close');
  },
  toggle: function toggle(fabEl) {
    var app = this;
    var $fabEl = $$1$1(fabEl);
    if (!$fabEl.hasClass('fab-opened')) { app.fab.open(fabEl); }
    else { app.fab.close(fabEl); }
  },
};

var Fab$1 = {
  name: 'fab',
  create: function create() {
    var app = this;
    Utils.extend(app, {
      fab: {
        openedEl: null,
        morphOpen: Fab.morphOpen.bind(app),
        morphClose: Fab.morphClose.bind(app),
        open: Fab.open.bind(app),
        close: Fab.close.bind(app),
        toggle: Fab.toggle.bind(app),
      },
    });
  },
  clicks: {
    '.fab > a': function open($clickedEl) {
      var app = this;
      app.fab.toggle($clickedEl.parents('.fab'));
    },
    '.fab-open': function open($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.fab.open(data.fab);
    },
    '.fab-close': function close($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.fab.close(data.fab);
    },
  },
};

var Searchbar$1 = (function (FrameworkClass) {
  function Searchbar(app, params) {
    if ( params === void 0 ) params = {};

    FrameworkClass.call(this, params, [app]);

    var sb = this;

    var defaults = {
      el: undefined,
      inputEl: undefined,
      disableButton: true,
      disableButtonEl: undefined,
      backdropEl: undefined,
      searchContainer: undefined, // container to search, HTMLElement or CSS selector
      searchItem: 'li', // single item selector, CSS selector
      searchIn: undefined, // where to search in item, CSS selector
      ignore: '.searchbar-ignore',
      foundEl: '.searchbar-found',
      notFoundEl: '.searchbar-not-found',
      hideOnEnableEl: '.searchbar-hide-on-enable',
      hideOnSearchEl: '.searchbar-hide-on-search',
      backdrop: true,
      removeDiacritics: true,
      customSearch: false,
      hideDividers: true,
      hideGroups: true,
      disableOnBackdropClick: true,
      expandable: false,
    };

    // Extend defaults with modules params
    sb.useModulesParams(defaults);

    sb.params = Utils.extend(defaults, params);

    var $el = $$1$1(sb.params.el);
    if ($el.length === 0) { return sb; }

    $el[0].f7Searchbar = sb;

    var $pageEl;
    var $navbarEl;
    if ($el.parents('.page').length > 0) {
      $pageEl = $el.parents('.page');
    } else {
      $navbarEl = $el.parents('.navbar-inner');
      if ($navbarEl.length > 0) {
        if ($navbarEl[0].f7Page) {
          $pageEl = $navbarEl[0].f7Page.$el;
        } else {
          var $currentPageEl = $el.parents('.view').find('.page-current');
          if ($currentPageEl[0] && $currentPageEl[0].f7Page && $currentPageEl[0].f7Page.navbarEl === $navbarEl[0]) {
            $pageEl = $currentPageEl;
          }
        }
      }
    }

    var $foundEl;
    if (params.foundEl) {
      $foundEl = $$1$1(params.foundEl);
    } else if (typeof sb.params.foundEl === 'string' && $pageEl) {
      $foundEl = $pageEl.find(sb.params.foundEl);
    }

    var $notFoundEl;
    if (params.notFoundEl) {
      $notFoundEl = $$1$1(params.notFoundEl);
    } else if (typeof sb.params.notFoundEl === 'string' && $pageEl) {
      $notFoundEl = $pageEl.find(sb.params.notFoundEl);
    }

    var $hideOnEnableEl;
    if (params.hideOnEnableEl) {
      $hideOnEnableEl = $$1$1(params.hideOnEnableEl);
    } else if (typeof sb.params.hideOnEnableEl === 'string' && $pageEl) {
      $hideOnEnableEl = $pageEl.find(sb.params.hideOnEnableEl);
    }

    var $hideOnSearchEl;
    if (params.hideOnSearchEl) {
      $hideOnSearchEl = $$1$1(params.hideOnSearchEl);
    } else if (typeof sb.params.hideOnSearchEl === 'string' && $pageEl) {
      $hideOnSearchEl = $pageEl.find(sb.params.hideOnSearchEl);
    }

    var $backdropEl;
    if (sb.params.backdrop) {
      if (sb.params.backdropEl) {
        $backdropEl = $$1$1(sb.params.backdropEl);
      } else if ($pageEl && $pageEl.length > 0) {
        $backdropEl = $pageEl.find('.searchbar-backdrop');
      } else {
        $backdropEl = $el.siblings('.searchbar-backdrop');
      }
      if ($backdropEl.length === 0) {
        $backdropEl = $$1$1('<div class="searchbar-backdrop"></div>');
        if ($pageEl && $pageEl.length) {
          if ($el.parents($pageEl).length > 0 && $navbarEl && $el.parents($navbarEl).length === 0) {
            $backdropEl.insertBefore($el);
          } else {
            $backdropEl.insertBefore($pageEl.find('.page-content').eq(0));
          }
        } else {
          $backdropEl.insertBefore($el);
        }
      }
    }

    var $searchContainer;
    if (sb.params.searchContainer) {
      $searchContainer = $$1$1(sb.params.searchContainer);
    }

    var $inputEl;
    if (sb.params.inputEl) {
      $inputEl = $$1$1(sb.params.inputEl);
    } else {
      $inputEl = $el.find('input[type="search"]').eq(0);
    }

    var $disableButtonEl;
    if (sb.params.disableButton) {
      if (sb.params.disableButtonEl) {
        $disableButtonEl = $$1$1(sb.params.disableButtonEl);
      } else {
        $disableButtonEl = $el.find('.searchbar-disable-button');
      }
    }

    Utils.extend(sb, {
      app: app,
      view: app.views.get($el.parents('.view')),
      $el: $el,
      el: $el[0],
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      $searchContainer: $searchContainer,
      searchContainer: $searchContainer && $searchContainer[0],
      $inputEl: $inputEl,
      inputEl: $inputEl[0],
      $disableButtonEl: $disableButtonEl,
      disableButtonEl: $disableButtonEl[0],
      disableButtonHasMargin: false,
      $pageEl: $pageEl,
      pageEl: $pageEl && $pageEl[0],
      $navbarEl: $navbarEl,
      navbarEl: $navbarEl && $navbarEl[0],
      $foundEl: $foundEl,
      foundEl: $foundEl && $foundEl[0],
      $notFoundEl: $notFoundEl,
      notFoundEl: $notFoundEl && $notFoundEl[0],
      $hideOnEnableEl: $hideOnEnableEl,
      hideOnEnableEl: $hideOnEnableEl && $hideOnEnableEl[0],
      $hideOnSearchEl: $hideOnSearchEl,
      hideOnSearchEl: $hideOnSearchEl && $hideOnSearchEl[0],
      previousQuery: '',
      query: '',
      isVirtualList: $searchContainer && $searchContainer.hasClass('virtual-list'),
      virtualList: undefined,
      enabled: false,
      expandable: sb.params.expandable || $el.hasClass('searchbar-expandable'),
    });

    // Events
    function preventSubmit(e) {
      e.preventDefault();
    }
    function onInputFocus(e) {
      sb.enable(e);
      sb.$el.addClass('searchbar-focused');
    }
    function onInputBlur() {
      sb.$el.removeClass('searchbar-focused');
    }
    function onInputChange() {
      var value = sb.$inputEl.val().trim();
      if (
        (
          (sb.$searchContainer && sb.$searchContainer.length > 0) &&
          (sb.params.searchIn || sb.isVirtualList)
        ) ||
        sb.params.customSearch
      ) {
        sb.search(value, true);
      }
    }
    function onInputClear(e, previousValue) {
      sb.$el.trigger('searchbar:clear', previousValue);
      sb.emit('local::clear searchbarClear', previousValue);
    }
    function disableOnClick(e) {
      sb.disable(e);
    }
    function onPageBeforeOut() {
      if (!sb || (sb && !sb.$el)) { return; }
      if (sb.enabled) {
        sb.$el.removeClass('searchbar-enabled');
      }
    }
    function onPageBeforeIn() {
      if (!sb || (sb && !sb.$el)) { return; }
      if (sb.enabled) {
        sb.$el.addClass('searchbar-enabled');
      }
    }
    sb.attachEvents = function attachEvents() {
      $el.on('submit', preventSubmit);
      if (sb.params.disableButton) {
        sb.$disableButtonEl.on('click', disableOnClick);
      }
      if (sb.params.disableOnBackdropClick && sb.$backdropEl) {
        sb.$backdropEl.on('click', disableOnClick);
      }
      if (sb.expandable && app.theme === 'ios' && sb.view && $navbarEl && sb.$pageEl) {
        sb.$pageEl.on('page:beforeout', onPageBeforeOut);
        sb.$pageEl.on('page:beforein', onPageBeforeIn);
      }
      sb.$inputEl.on('focus', onInputFocus);
      sb.$inputEl.on('blur', onInputBlur);
      sb.$inputEl.on('change input compositionend', onInputChange);
      sb.$inputEl.on('input:clear', onInputClear);
    };
    sb.detachEvents = function detachEvents() {
      $el.off('submit', preventSubmit);
      if (sb.params.disableButton) {
        sb.$disableButtonEl.off('click', disableOnClick);
      }
      if (sb.params.disableOnBackdropClick && sb.$backdropEl) {
        sb.$backdropEl.off('click', disableOnClick);
      }
      if (sb.expandable && app.theme === 'ios' && sb.view && $navbarEl && sb.$pageEl) {
        sb.$pageEl.on('page:beforeout', onPageBeforeOut);
        sb.$pageEl.on('page:beforein', onPageBeforeIn);
      }
      sb.$inputEl.off('focus', onInputFocus);
      sb.$inputEl.off('blur', onInputBlur);
      sb.$inputEl.off('change input compositionend', onInputChange);
      sb.$inputEl.off('input:clear', onInputClear);
    };

    // Install Modules
    sb.useModules();

    // Init
    sb.init();

    return sb;
  }

  if ( FrameworkClass ) Searchbar.__proto__ = FrameworkClass;
  Searchbar.prototype = Object.create( FrameworkClass && FrameworkClass.prototype );
  Searchbar.prototype.constructor = Searchbar;
  Searchbar.prototype.clear = function clear (e) {
    var sb = this;
    if (!sb.query && e && $$1$1(e.target).hasClass('searchbar-clear')) {
      sb.disable();
      return sb;
    }
    var previousQuery = sb.value;
    sb.$inputEl.val('').trigger('change').focus();
    sb.$el.trigger('searchbar:clear', previousQuery);
    sb.emit('local::clear searchbarClear', previousQuery);
    return sb;
  };
  Searchbar.prototype.setDisableButtonMargin = function setDisableButtonMargin () {
    var sb = this;
    if (sb.expandable) { return; }
    var app = sb.app;
    sb.$disableButtonEl.transition(0).show();
    sb.$disableButtonEl.css(("margin-" + (app.rtl ? 'left' : 'right')), ((-sb.disableButtonEl.offsetWidth) + "px"));
    /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */
    sb._clientLeft = sb.$disableButtonEl[0].clientLeft;
    sb.$disableButtonEl.transition('');
    sb.disableButtonHasMargin = true;
  };
  Searchbar.prototype.enable = function enable (setFocus) {
    var sb = this;
    if (sb.enabled) { return sb; }
    var app = sb.app;
    sb.enabled = true;
    function enable() {
      if (sb.$backdropEl && ((sb.$searchContainer && sb.$searchContainer.length) || sb.params.customSearch) && !sb.$el.hasClass('searchbar-enabled') && !sb.query) {
        sb.backdropShow();
      }
      sb.$el.addClass('searchbar-enabled');
      if (!sb.expandable && sb.$disableButtonEl && sb.$disableButtonEl.length > 0 && app.theme === 'ios') {
        if (!sb.disableButtonHasMargin) {
          sb.setDisableButtonMargin();
        }
        sb.$disableButtonEl.css(("margin-" + (app.rtl ? 'left' : 'right')), '0px');
      }
      if (sb.$hideOnEnableEl) { sb.$hideOnEnableEl.hide(); }
      sb.$el.trigger('searchbar:enable');
      sb.emit('local::enable searchbarEnable');
    }
    var needsFocus = false;
    if (setFocus === true) {
      if (document.activeElement !== sb.inputEl) {
        needsFocus = true;
      }
    }
    var isIos = app.device.ios && app.theme === 'ios';
    if (isIos) {
      if (sb.expandable) {
        if (needsFocus) { sb.$inputEl.focus(); }
        enable();
      } else {
        if (needsFocus) { sb.$inputEl.focus(); }
        if (setFocus && (setFocus.type === 'focus' || setFocus === true)) {
          Utils.nextTick(function () {
            enable();
          }, 400);
        } else {
          enable();
        }
      }
    } else {
      if (needsFocus) { sb.$inputEl.focus(); }
      if (app.theme === 'md' && sb.expandable) {
        sb.$el.parents('.navbar-inner').scrollLeft(0);
      }
      enable();
    }
    return sb;
  };
  Searchbar.prototype.disable = function disable () {
    var sb = this;
    if (!sb.enabled) { return sb; }
    var app = sb.app;
    sb.$inputEl.val('').trigger('change');
    sb.$el.removeClass('searchbar-enabled');
    sb.$el.removeClass('searchbar-focused');
    if (!sb.expandable && sb.$disableButtonEl && sb.$disableButtonEl.length > 0 && app.theme === 'ios') {
      sb.$disableButtonEl.css(("margin-" + (app.rtl ? 'left' : 'right')), ((-sb.disableButtonEl.offsetWidth) + "px"));
    }

    if (sb.$backdropEl && ((sb.$searchContainer && sb.$searchContainer.length) || sb.params.customSearch)) {
      sb.backdropHide();
    }

    sb.enabled = false;

    sb.$inputEl.blur();

    if (sb.$hideOnEnableEl) { sb.$hideOnEnableEl.show(); }

    sb.$el.trigger('searchbar:disable');
    sb.emit('local::disable searchbarDisable');
    return sb;
  };
  Searchbar.prototype.toggle = function toggle () {
    var sb = this;
    if (sb.enabled) { sb.disable(); }
    else { sb.enable(true); }
    return sb;
  };
  Searchbar.prototype.backdropShow = function backdropShow () {
    var sb = this;
    if (sb.$backdropEl) {
      sb.$backdropEl.addClass('searchbar-backdrop-in');
    }
    return sb;
  };
  Searchbar.prototype.backdropHide = function backdropHide () {
    var sb = this;
    if (sb.$backdropEl) {
      sb.$backdropEl.removeClass('searchbar-backdrop-in');
    }
    return sb;
  };
  Searchbar.prototype.search = function search (query, internal) {
    var sb = this;
    if (sb.previousQuery && query.trim() === sb.previousQuery) { return sb; }
    if (typeof (sb.previousQuery) !== 'undefined' && sb.previousQuery.trim() === '' && query.trim() === '') { return sb; }
    sb.previousQuery = query.trim();

    if (!internal) {
      if (!sb.enabled) {
        sb.enable();
      }
      sb.$inputEl.val(query);
    }
    sb.query = query;
    sb.value = query;

    var $searchContainer = sb.$searchContainer;
    var $el = sb.$el;
    var $backdropEl = sb.$backdropEl;
    var $foundEl = sb.$foundEl;
    var $notFoundEl = sb.$notFoundEl;
    var $hideOnSearchEl = sb.$hideOnSearchEl;
    var isVirtualList = sb.isVirtualList;

    // Hide on search element
    if (query.length > 0 && $hideOnSearchEl) {
      $hideOnSearchEl.hide();
    } else if ($hideOnSearchEl) {
      $hideOnSearchEl.show();
    }
    // Add active/inactive classes on overlay
    if (query.length === 0) {
      if ($searchContainer && $searchContainer.length && $el.hasClass('searchbar-enabled') && $backdropEl) { sb.backdropShow(); }
    } else if ($searchContainer && $searchContainer.length && $el.hasClass('searchbar-enabled')) {
      sb.backdropHide();
    }

    if (sb.params.customSearch) {
      $el.trigger('searchbar:search', query, sb.previousQuery);
      sb.emit('local::search searchbarSearch', query, sb.previousQuery);
      return sb;
    }

    var foundItems = [];
    var vlQuery;
    if (isVirtualList) {
      sb.virtualList = $searchContainer[0].f7VirtualList;
      if (query.trim() === '') {
        sb.virtualList.resetFilter();
        if ($notFoundEl) { $notFoundEl.hide(); }
        if ($foundEl) { $foundEl.show(); }
        return sb;
      }
      vlQuery = sb.params.removeDiacritics ? Utils.removeDiacritics(query) : query;
      if (sb.virtualList.params.searchAll) {
        foundItems = sb.virtualList.params.searchAll(vlQuery, sb.virtualList.items) || [];
      } else if (sb.virtualList.params.searchByItem) {
        for (var i = 0; i < sb.virtualList.items.length; i += 1) {
          if (sb.virtualList.params.searchByItem(vlQuery, sb.virtualList.params.items[i], i)) {
            foundItems.push(i);
          }
        }
      }
    } else {
      var values;
      if (sb.params.removeDiacritics) { values = Utils.removeDiacritics(query.trim().toLowerCase()).split(' '); }
      else {
        values = query.trim().toLowerCase().split(' ');
      }
      $searchContainer.find(sb.params.searchItem).removeClass('hidden-by-searchbar').each(function (itemIndex, itemEl) {
        var $itemEl = $$1$1(itemEl);
        var compareWithText = [];
        $itemEl.find(sb.params.searchIn).each(function (searchInIndex, searchInEl) {
          var itemText = $$1$1(searchInEl).text().trim().toLowerCase();
          if (sb.params.removeDiacritics) { itemText = Utils.removeDiacritics(itemText); }
          compareWithText.push(itemText);
        });
        compareWithText = compareWithText.join(' ');
        var wordsMatch = 0;
        for (var i = 0; i < values.length; i += 1) {
          if (compareWithText.indexOf(values[i]) >= 0) { wordsMatch += 1; }
        }
        if (wordsMatch !== values.length && !(sb.params.ignore && $itemEl.is(sb.params.ignore))) {
          $itemEl.addClass('hidden-by-searchbar');
        } else {
          foundItems.push($itemEl[0]);
        }
      });

      if (sb.params.hideDividers) {
        $searchContainer.find('.item-divider, .list-group-title').each(function (titleIndex, titleEl) {
          var $titleEl = $$1$1(titleEl);
          var $nextElements = $titleEl.nextAll('li');
          var hide = true;
          for (var i = 0; i < $nextElements.length; i += 1) {
            var $nextEl = $nextElements.eq(i);
            if ($nextEl.hasClass('list-group-title') || $nextEl.hasClass('item-divider')) { break; }
            if (!$nextEl.hasClass('hidden-by-searchbar')) {
              hide = false;
            }
          }
          var ignore = sb.params.ignore && $titleEl.is(sb.params.ignore);
          if (hide && !ignore) { $titleEl.addClass('hidden-by-searchbar'); }
          else { $titleEl.removeClass('hidden-by-searchbar'); }
        });
      }
      if (sb.params.hideGroups) {
        $searchContainer.find('.list-group').each(function (groupIndex, groupEl) {
          var $groupEl = $$1$1(groupEl);
          var ignore = sb.params.ignore && $groupEl.is(sb.params.ignore);
          var notHidden = $groupEl.find('li:not(.hidden-by-searchbar)');
          if (notHidden.length === 0 && !ignore) {
            $groupEl.addClass('hidden-by-searchbar');
          } else {
            $groupEl.removeClass('hidden-by-searchbar');
          }
        });
      }
    }

    if (foundItems.length === 0) {
      if ($notFoundEl) { $notFoundEl.show(); }
      if ($foundEl) { $foundEl.hide(); }
    } else {
      if ($notFoundEl) { $notFoundEl.hide(); }
      if ($foundEl) { $foundEl.show(); }
    }
    if (isVirtualList && sb.virtualList) {
      sb.virtualList.filterItems(foundItems);
    }

    $el.trigger('searchbar:search', query, sb.previousQuery, foundItems);
    sb.emit('local::search searchbarSearch', query, sb.previousQuery, foundItems);

    return sb;
  };
  Searchbar.prototype.init = function init () {
    var sb = this;
    sb.attachEvents();
  };
  Searchbar.prototype.destroy = function destroy () {
    var sb = this;
    sb.emit('local::beforeDestroy searchbarBeforeDestroy', sb);
    sb.$el.trigger('searchbar:beforedestroy', sb);
    sb.detachEvents();
    delete sb.$el.f7Searchbar;
    Utils.deleteProps(sb);
  };

  return Searchbar;
}(Framework7Class));

var Searchbar = {
  name: 'searchbar',
  static: {
    Searchbar: Searchbar$1,
  },
  create: function create() {
    var app = this;
    app.searchbar = ConstructorMethods({
      defaultSelector: '.searchbar',
      constructor: Searchbar$1,
      app: app,
      domProp: 'f7Searchbar',
      addMethods: 'clear enable disable toggle search'.split(' '),
    });
  },
  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      $$1$1(tabEl).find('.searchbar-init').each(function (index, searchbarEl) {
        var $searchbarEl = $$1$1(searchbarEl);
        app.searchbar.create(Utils.extend($searchbarEl.dataset(), { el: searchbarEl }));
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      $$1$1(tabEl).find('.searchbar-init').each(function (index, searchbarEl) {
        if (searchbarEl.f7Searchbar && searchbarEl.f7Searchbar.destroy) {
          searchbarEl.f7Searchbar.destroy();
        }
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.searchbar-init').each(function (index, searchbarEl) {
        var $searchbarEl = $$1$1(searchbarEl);
        app.searchbar.create(Utils.extend($searchbarEl.dataset(), { el: searchbarEl }));
      });
      if (app.theme === 'ios' && page.view && page.view.router.separateNavbar && page.$navbarEl && page.$navbarEl.length > 0) {
        page.$navbarEl.find('.searchbar-init').each(function (index, searchbarEl) {
          var $searchbarEl = $$1$1(searchbarEl);
          app.searchbar.create(Utils.extend($searchbarEl.dataset(), { el: searchbarEl }));
        });
      }
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.searchbar-init').each(function (index, searchbarEl) {
        if (searchbarEl.f7Searchbar && searchbarEl.f7Searchbar.destroy) {
          searchbarEl.f7Searchbar.destroy();
        }
      });
      if (app.theme === 'ios' && page.view && page.view.router.separateNavbar && page.$navbarEl && page.$navbarEl.length > 0) {
        page.$navbarEl.find('.searchbar-init').each(function (index, searchbarEl) {
          if (searchbarEl.f7Searchbar && searchbarEl.f7Searchbar.destroy) {
            searchbarEl.f7Searchbar.destroy();
          }
        });
      }
    },
  },
  clicks: {
    '.searchbar-clear': function clear($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      var sb = app.searchbar.get(data.searchbar);
      if (sb) { sb.clear(); }
    },
    '.searchbar-enable': function enable($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      var sb = app.searchbar.get(data.searchbar);
      if (sb) { sb.enable(true); }
    },
    '.searchbar-disable': function disable($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      var sb = app.searchbar.get(data.searchbar);
      if (sb) { sb.disable(); }
    },
    '.searchbar-toggle': function toggle($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      var sb = app.searchbar.get(data.searchbar);
      if (sb) { sb.toggle(); }
    },
  },
};

var Messages$1 = (function (Framework7Class$$1) {
  function Messages(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);

    var m = this;

    var defaults = {
      autoLayout: true,
      messages: [],
      newMessagesFirst: false,
      scrollMessages: true,
      scrollMessagesOnEdge: true,
      firstMessageRule: undefined,
      lastMessageRule: undefined,
      tailMessageRule: undefined,
      sameNameMessageRule: undefined,
      sameHeaderMessageRule: undefined,
      sameFooterMessageRule: undefined,
      sameAvatarMessageRule: undefined,
      customClassMessageRule: undefined,
      renderMessage: undefined,
    };

    // Extend defaults with modules params
    m.useModulesParams(defaults);

    m.params = Utils.extend(defaults, params);

    var $el = $$1$1(params.el).eq(0);
    if ($el.length === 0) { return m; }

    $el[0].f7Messages = m;

    var $pageContentEl = $el.closest('.page-content').eq(0);

    Utils.extend(m, {
      messages: m.params.messages,
      $el: $el,
      el: $el[0],
      $pageContentEl: $pageContentEl,
      pageContentEl: $pageContentEl[0],

    });
    // Install Modules
    m.useModules();

    // Init
    m.init();

    return m;
  }

  if ( Framework7Class$$1 ) Messages.__proto__ = Framework7Class$$1;
  Messages.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Messages.prototype.constructor = Messages;
  // eslint-disable-next-line
  Messages.prototype.getMessageData = function getMessageData (messageEl) {
    var $messageEl = $$1$1(messageEl);
    var data = {
      name: $messageEl.find('.message-name').html(),
      header: $messageEl.find('.message-header').html(),
      textHeader: $messageEl.find('.message-text-header').html(),
      textFooter: $messageEl.find('.message-text-footer').html(),
      footer: $messageEl.find('.message-footer').html(),
      isTitle: $messageEl.hasClass('messages-title'),
      type: $messageEl.hasClass('message-sent') ? 'sent' : 'received',
      text: $messageEl.find('.message-text').html(),
      image: $messageEl.find('.message-image').html(),
      imageSrc: $messageEl.find('.message-image img').attr('src'),
      typing: $messageEl.hasClass('message-typing'),
    };
    if (data.isTitle) {
      data.text = $messageEl.html();
    }
    if (data.text && data.textHeader) {
      data.text = data.text.replace(("<div class=\"message-text-header\">" + (data.textHeader) + "</div>"), '');
    }
    if (data.text && data.textFooter) {
      data.text = data.text.replace(("<div class=\"message-text-footer\">" + (data.textFooter) + "</div>"), '');
    }
    var avatar = $messageEl.find('.message-avatar').css('background-image');
    if (avatar === 'none' || avatar === '') { avatar = undefined; }
    if (avatar && typeof avatar === 'string') {
      avatar = avatar.replace('url(', '').replace(')', '').replace(/"/g, '').replace(/'/g, '');
    } else {
      avatar = undefined;
    }
    data.avatar = avatar;

    return data;
  };
  Messages.prototype.getMessagesData = function getMessagesData () {
    var m = this;
    var data = [];
    m.$el.find('.message, .messages-title').each(function (index, messageEl) {
      data.push(m.getMessageData(messageEl));
    });
    return data;
  };
  Messages.prototype.renderMessage = function renderMessage (messageToRender) {
    var m = this;
    var message = Utils.extend({
      type: 'sent',
    }, messageToRender);
    if (m.params.renderMessage) {
      return m.params.renderMessage(message);
    }
    if (message.isTitle) {
      return ("<div class=\"messages-title\">" + (message.text) + "</div>");
    }
    return ("\n      <div class=\"message message-" + (message.type) + " " + (message.isTyping ? 'message-typing' : '') + "\">\n        " + (message.avatar ? ("\n        <div class=\"message-avatar\" style=\"background-image:url(" + (message.avatar) + ")\"></div>\n        ") : '') + "\n        <div class=\"message-content\">\n          " + (message.name ? ("<div class=\"message-name\">" + (message.name) + "</div>") : '') + "\n          " + (message.header ? ("<div class=\"message-header\">" + (message.header) + "</div>") : '') + "\n          <div class=\"message-bubble\">\n            " + (message.textHeader ? ("<div class=\"message-text-header\">" + (message.textHeader) + "</div>") : '') + "\n            " + (message.image ? ("<div class=\"message-image\">" + (message.image) + "</div>") : '') + "\n            " + (message.imageSrc && !message.image ? ("<div class=\"message-image\"><img src=\"" + (message.imageSrc) + "\"></div>") : '') + "\n            " + (message.text || message.isTyping ? ("<div class=\"message-text\">" + (message.text || '') + (message.isTyping ? '<div class="message-typing-indicator"><div></div><div></div><div></div></div>' : '') + "</div>") : '') + "\n            " + (message.textFooter ? ("<div class=\"message-text-footer\">" + (message.textFooter) + "</div>") : '') + "\n          </div>\n          " + (message.footer ? ("<div class=\"message-footer\">" + (message.footer) + "</div>") : '') + "\n        </div>\n      </div>\n    ");
  };
  Messages.prototype.renderMessages = function renderMessages (messagesToRender, method) {
    if ( messagesToRender === void 0 ) messagesToRender = this.messages;
    if ( method === void 0 ) method = this.params.newMessagesFirst ? 'prepend' : 'append';

    var m = this;
    var html = messagesToRender.map(function (message) { return m.renderMessage(message); }).join('');
    m.$el[method](html);
  };
  Messages.prototype.isFirstMessage = function isFirstMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    if (m.params.firstMessageRule) { return (ref = m.params).firstMessageRule.apply(ref, args); }
    return false;
    var ref;
  };
  Messages.prototype.isLastMessage = function isLastMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    if (m.params.lastMessageRule) { return (ref = m.params).lastMessageRule.apply(ref, args); }
    return false;
    var ref;
  };
  Messages.prototype.isTailMessage = function isTailMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    if (m.params.tailMessageRule) { return (ref = m.params).tailMessageRule.apply(ref, args); }
    return false;
    var ref;
  };
  Messages.prototype.isSameNameMessage = function isSameNameMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    if (m.params.sameNameMessageRule) { return (ref = m.params).sameNameMessageRule.apply(ref, args); }
    return false;
    var ref;
  };
  Messages.prototype.isSameHeaderMessage = function isSameHeaderMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    if (m.params.sameHeaderMessageRule) { return (ref = m.params).sameHeaderMessageRule.apply(ref, args); }
    return false;
    var ref;
  };
  Messages.prototype.isSameFooterMessage = function isSameFooterMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    if (m.params.sameFooterMessageRule) { return (ref = m.params).sameFooterMessageRule.apply(ref, args); }
    return false;
    var ref;
  };
  Messages.prototype.isSameAvatarMessage = function isSameAvatarMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    if (m.params.sameAvatarMessageRule) { return (ref = m.params).sameAvatarMessageRule.apply(ref, args); }
    return false;
    var ref;
  };
  Messages.prototype.isCustomClassMessage = function isCustomClassMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    if (m.params.customClassMessageRule) { return (ref = m.params).customClassMessageRule.apply(ref, args); }
    return undefined;
    var ref;
  };
  Messages.prototype.layout = function layout () {
    var m = this;
    m.$el.find('.message, .messages-title').each(function (index, messageEl) {
      var $messageEl = $$1$1(messageEl);
      if (!m.messages) {
        m.messages = m.getMessagesData();
      }
      var classes = [];
      var message = m.messages[index];
      var previousMessage = m.messages[index - 1];
      var nextMessage = m.messages[index + 1];
      if (m.isFirstMessage(message, previousMessage, nextMessage)) {
        classes.push('message-first');
      }
      if (m.isLastMessage(message, previousMessage, nextMessage)) {
        classes.push('message-last');
      }
      if (m.isTailMessage(message, previousMessage, nextMessage)) {
        classes.push('message-tail');
      }
      if (m.isSameNameMessage(message, previousMessage, nextMessage)) {
        classes.push('message-same-name');
      }
      if (m.isSameHeaderMessage(message, previousMessage, nextMessage)) {
        classes.push('message-same-header');
      }
      if (m.isSameFooterMessage(message, previousMessage, nextMessage)) {
        classes.push('message-same-footer');
      }
      if (m.isSameAvatarMessage(message, previousMessage, nextMessage)) {
        classes.push('message-same-avatar');
      }
      var customMessageClasses = m.isCustomClassMessage(message, previousMessage, nextMessage);
      if (customMessageClasses && customMessageClasses.length) {
        if (typeof customMessageClasses === 'string') {
          customMessageClasses = customMessageClasses.split(' ');
        }
        customMessageClasses.forEach(function (customClass) {
          classes.push(customClass);
        });
      }
      $messageEl.removeClass('message-first message-last message-tail message-same-name message-same-header message-same-footer message-same-avatar');
      classes.forEach(function (className) {
        $messageEl.addClass(className);
      });
    });
  };
  Messages.prototype.clear = function clear () {
    var m = this;
    m.messages = [];
    m.$el.html('');
  };
  Messages.prototype.removeMessage = function removeMessage (messageToRemove, layout) {
    if ( layout === void 0 ) layout = true;

    var m = this;
    // Index or El
    var index;
    var $el;
    if (typeof messageToRemove === 'number') {
      index = messageToRemove;
      $el = m.$el.find('.message, .messages-title').eq(index);
    } else {
      $el = $$1$1(messageToRemove);
      index = $el.index();
    }
    if ($el.length === 0) {
      return m;
    }
    $el.remove();
    m.messages.splice(index, 1);
    if (m.params.autoLayout && layout) { m.layout(); }
    return m;
  };
  Messages.prototype.removeMessages = function removeMessages (messagesToRemove, layout) {
    if ( layout === void 0 ) layout = true;

    var m = this;
    if (Array.isArray(messagesToRemove)) {
      var messagesToRemoveEls = [];
      messagesToRemove.forEach(function (messageToRemoveIndex) {
        messagesToRemoveEls.push(m.$el.find('.message, .messages-title').eq(messageToRemoveIndex));
      });
      messagesToRemoveEls.forEach(function (messageToRemove) {
        m.removeMessage(messageToRemove, false);
      });
    } else {
      $$1$1(messagesToRemove).each(function (index, messageToRemove) {
        m.removeMessage(messageToRemove, false);
      });
    }
    if (m.params.autoLayout && layout) { m.layout(); }
    return m;
  };

  Messages.prototype.addMessage = function addMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    var messageToAdd;
    var animate;
    var method;
    if (typeof args[1] === 'boolean') {
      var assign;
      (assign = args, messageToAdd = assign[0], animate = assign[1], method = assign[2]);
    } else {
      var assign$1;
      (assign$1 = args, messageToAdd = assign$1[0], method = assign$1[1], animate = assign$1[2]);
    }
    if (typeof animate === 'undefined') {
      animate = true;
    }
    if (typeof method === 'undefined') {
      method = m.params.newMessagesFirst ? 'prepend' : 'append';
    }

    return m.addMessages([messageToAdd], animate, method);
  };
  Messages.prototype.addMessages = function addMessages () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    var messagesToAdd;
    var animate;
    var method;
    if (typeof args[1] === 'boolean') {
      var assign;
      (assign = args, messagesToAdd = assign[0], animate = assign[1], method = assign[2]);
    } else {
      var assign$1;
      (assign$1 = args, messagesToAdd = assign$1[0], method = assign$1[1], animate = assign$1[2]);
    }
    if (typeof animate === 'undefined') {
      animate = true;
    }
    if (typeof method === 'undefined') {
      method = m.params.newMessagesFirst ? 'prepend' : 'append';
    }

    // Define scroll positions before new messages added
    var scrollHeightBefore = m.pageContentEl.scrollHeight;
    var heightBefore = m.pageContentEl.offsetHeight;
    var scrollBefore = m.pageContentEl.scrollTop;

    // Add message to DOM and data
    var messagesHTML = '';
    var typingMessage = m.messages.filter(function (el) { return el.isTyping; })[0];
    messagesToAdd.forEach(function (messageToAdd) {
      if (typingMessage) {
        if (method === 'append') {
          m.messages.splice(m.messages.indexOf(typingMessage), 0, messageToAdd);
        } else {
          m.messages.splice(m.messages.indexOf(typingMessage) + 1, 0, messageToAdd);
        }
      } else {
        m.messages[method === 'append' ? 'push' : 'unshift'](messageToAdd);
      }
      messagesHTML += m.renderMessage(messageToAdd);
    });
    var $messagesEls = $$1$1(messagesHTML);
    if (animate) {
      if (method === 'append' && !m.params.newMessagesFirst) {
        $messagesEls.addClass('message-appear-from-bottom');
      }
      if (method === 'prepend' && m.params.newMessagesFirst) {
        $messagesEls.addClass('message-appear-from-top');
      }
    }
    if (typingMessage) {
      if (method === 'append') {
        $messagesEls.insertBefore(m.$el.find('.message-typing'));
      } else {
        $messagesEls.insertAfter(m.$el.find('.message-typing'));
      }
    } else {
      m.$el[method]($messagesEls);
    }

    // Layout
    if (m.params.autoLayout) { m.layout(); }

    if (method === 'prepend' && !typingMessage) {
      m.pageContentEl.scrollTop = scrollBefore + (m.pageContentEl.scrollHeight - scrollHeightBefore);
    }

    if (m.params.scrollMessages && ((method === 'append' && !m.params.newMessagesFirst) || (method === 'prepend' && m.params.newMessagesFirst && !typingMessage))) {
      if (m.params.scrollMessagesOnEdge) {
        var onEdge = false;
        if (m.params.newMessagesFirst && scrollBefore === 0) {
          onEdge = true;
        }
        if (!m.params.newMessagesFirst && (scrollBefore - (scrollHeightBefore - heightBefore) >= -10)) {
          onEdge = true;
        }
        if (onEdge) { m.scroll(animate ? undefined : 0); }
      } else {
        m.scroll(animate ? undefined : 0);
      }
    }

    return m;
  };
  Messages.prototype.showTyping = function showTyping (message) {
    if ( message === void 0 ) message = {};

    var m = this;
    var typingMessage = m.messages.filter(function (el) { return el.isTyping; })[0];
    if (typingMessage) {
      m.removeMessage(m.messages.indexOf(typingMessage));
    }
    m.addMessage(Utils.extend({
      type: 'received',
      isTyping: true,
    }, message));
    return m;
  };
  Messages.prototype.hideTyping = function hideTyping () {
    var m = this;
    var typingMessageIndex;
    var typingFound;
    m.messages.forEach(function (message, index) {
      if (message.isTyping) { typingMessageIndex = index; }
    });
    if (typeof typingMessageIndex !== 'undefined') {
      if (m.$el.find('.message').eq(typingMessageIndex).hasClass('message-typing')) {
        typingFound = true;
        m.removeMessage(typingMessageIndex);
      }
    }
    if (!typingFound) {
      var $typingMessageEl = m.$el.find('.message-typing');
      if ($typingMessageEl.length) {
        m.removeMessage($typingMessageEl);
      }
    }
    return m;
  };
  Messages.prototype.scroll = function scroll (duration, scrollTop) {
    if ( duration === void 0 ) duration = 300;

    var m = this;
    var currentScroll = m.pageContentEl.scrollTop;
    var newScrollTop;
    if (typeof scrollTop !== 'undefined') { newScrollTop = scrollTop; }
    else {
      newScrollTop = m.params.newMessagesFirst ? 0 : m.pageContentEl.scrollHeight - m.pageContentEl.offsetHeight;
      if (newScrollTop === currentScroll) { return m; }
    }
    m.$pageContentEl.scrollTop(newScrollTop, duration);
    return m;
  };
  Messages.prototype.init = function init () {
    var m = this;
    if (!m.messages || m.messages.length === 0) {
      m.messages = m.getMessagesData();
    }
    if (m.params.messages && m.params.messages.length) {
      m.renderMessages();
    }
    if (m.params.autoLayout) { m.layout(); }
    if (m.params.scrollMessages) { m.scroll(0); }
  };
  Messages.prototype.destroy = function destroy () {
    var m = this;
    m.emit('local::beforeDestroy messagesBeforeDestroy', m);
    m.$el.trigger('messages:beforedestroy', m);
    m.$el[0].f7Messages = null;
    delete m.$el[0].f7Messages;
    Utils.deleteProps(m);
  };

  return Messages;
}(Framework7Class));

var Messages = {
  name: 'messages',
  static: {
    Messages: Messages$1,
  },
  create: function create() {
    var app = this;
    app.messages = ConstructorMethods({
      defaultSelector: '.messages',
      constructor: Messages$1,
      app: app,
      domProp: 'f7Messages',
      addMethods: 'renderMessages layout scroll clear removeMessage removeMessages addMessage addMessages'.split(' '),
    });
  },
  on: {
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var app = this;
      $$1$1(tabEl).find('.messages-init').each(function (index, messagesEl) {
        app.messages.destroy(messagesEl);
      });
    },
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      $$1$1(tabEl).find('.messages-init').each(function (index, messagesEl) {
        app.messages.create({ el: messagesEl });
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.messages-init').each(function (index, messagesEl) {
        app.messages.destroy(messagesEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.messages-init').each(function (index, messagesEl) {
        app.messages.create({ el: messagesEl });
      });
    },
  },
  clicks: {

  },
};

var Messagebar$1 = (function (Framework7Class$$1) {
  function Messagebar(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);

    var messagebar = this;

    var defaults = {
      top: false,
      topOffset: 0,
      bottomOffset: 0,
      attachments: [],
      renderAttachments: undefined,
      renderAttachment: undefined,
      maxHeight: null,
      resizePage: true,
    };

    // Extend defaults with modules params
    messagebar.useModulesParams(defaults);

    messagebar.params = Utils.extend(defaults, params);

    // El
    var $el = $$1$1(messagebar.params.el);
    if ($el.length === 0) { return messagebar; }

    $el[0].f7Messagebar = messagebar;

    // Page and PageContent
    var $pageEl = $el.parents('.page').eq(0);
    var $pageContentEl = $pageEl.find('.page-content').eq(0);

    // Area
    var $areaEl = $el.find('.messagebar-area');

    // Textarea
    var $textareaEl;
    if (messagebar.params.textareaEl) {
      $textareaEl = $$1$1(messagebar.params.textareaEl);
    } else {
      $textareaEl = $el.find('textarea');
    }

    // Attachments & Library
    var $attachmentsEl = $el.find('.messagebar-attachments');
    var $sheetEl = $el.find('.messagebar-sheet');

    if (messagebar.params.top) {
      $el.addClass('messagebar-top');
    }

    Utils.extend(messagebar, {
      $el: $el,
      el: $el[0],
      $areaEl: $areaEl,
      areaEl: $areaEl[0],
      $textareaEl: $textareaEl,
      textareaEl: $textareaEl[0],
      $attachmentsEl: $attachmentsEl,
      attachmentsEl: $attachmentsEl[0],
      attachmentsVisible: $attachmentsEl.hasClass('messagebar-attachments-visible'),
      $sheetEl: $sheetEl,
      sheetEl: $sheetEl[0],
      sheetVisible: $sheetEl.hasClass('messagebar-sheet-visible'),
      $pageEl: $pageEl,
      pageEl: $pageEl[0],
      $pageContentEl: $pageContentEl,
      pageContentEl: $pageContentEl,
      top: $el.hasClass('messagebar-top') || messagebar.params.top,
      attachments: [],
    });

    // Events
    function onAppResize() {
      if (messagebar.params.resizePage) {
        messagebar.resizePage();
      }
    }
    function onSubmit(e) {
      e.preventDefault();
    }
    function onAttachmentClick(e) {
      var index = $$1$1(this).index();
      if ($$1$1(e.target).closest('.messagebar-attachment-delete').length) {
        $$1$1(this).trigger('messagebar:attachmentdelete', index);
        messagebar.emit('local::attachmentDelete messagebarAttachmentDelete', this, index);
      } else {
        $$1$1(this).trigger('messagebar:attachmentclick', index);
        messagebar.emit('local::attachmentClick messagebarAttachmentClick', this, index);
      }
    }
    function onTextareaChange() {
      messagebar.checkEmptyState();
    }
    function onTextareaFocus() {
      messagebar.sheetHide();
    }

    messagebar.attachEvents = function attachEvents() {
      $el.on('textarea:resize', onAppResize);
      $el.on('submit', onSubmit);
      $el.on('click', '.messagebar-attachment', onAttachmentClick);
      $textareaEl.on('change input', onTextareaChange);
      $textareaEl.on('focus', onTextareaFocus);
      app.on('resize', onAppResize);
    };
    messagebar.detachEvents = function detachEvents() {
      $el.off('textarea:resize', onAppResize);
      $el.off('submit', onSubmit);
      $el.off('click', '.messagebar-attachment', onAttachmentClick);
      $textareaEl.off('change input', onTextareaChange);
      $textareaEl.on('focus', onTextareaFocus);
      app.off('resize', onAppResize);
    };


    // Install Modules
    messagebar.useModules();

    // Init
    messagebar.init();

    return messagebar;
  }

  if ( Framework7Class$$1 ) Messagebar.__proto__ = Framework7Class$$1;
  Messagebar.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Messagebar.prototype.constructor = Messagebar;
  Messagebar.prototype.focus = function focus () {
    var messagebar = this;
    messagebar.$textareaEl.focus();
    return messagebar;
  };
  Messagebar.prototype.blur = function blur () {
    var messagebar = this;
    messagebar.$textareaEl.blur();
    return messagebar;
  };
  Messagebar.prototype.clear = function clear () {
    var messagebar = this;
    messagebar.$textareaEl.val('').trigger('change');
    return messagebar;
  };
  Messagebar.prototype.getValue = function getValue () {
    var messagebar = this;
    return messagebar.$textareaEl.val().trim();
  };
  Messagebar.prototype.setValue = function setValue (value) {
    var messagebar = this;
    messagebar.$textareaEl.val(value).trigger('change');
    return messagebar;
  };
  Messagebar.prototype.setPlaceholder = function setPlaceholder (placeholder) {
    var messagebar = this;
    messagebar.$textareaEl.attr('placeholder', placeholder);
    return messagebar;
  };
  Messagebar.prototype.resizePage = function resizePage () {
    var messagebar = this;
    var params = messagebar.params;
    var $el = messagebar.$el;
    var top = messagebar.top;
    var $pageEl = messagebar.$pageEl;
    var $pageContentEl = messagebar.$pageContentEl;
    var $areaEl = messagebar.$areaEl;
    var $textareaEl = messagebar.$textareaEl;
    var $sheetEl = messagebar.$sheetEl;
    var $attachmentsEl = messagebar.$attachmentsEl;
    var elHeight = $el[0].offsetHeight;
    var maxHeight = params.maxHeight;
    if (top) {
      /*
      Disable at the moment
      const requiredPaddingTop = elHeight + params.topOffset;
      const currentPaddingTop = parseInt($pageContentEl.css('padding-top'), 10);
      if (requiredPaddingTop !== currentPaddingTop) {
        if (!maxHeight) {
          maxHeight = $pageEl[0].offsetHeight - currentPaddingTop - $sheetEl.outerHeight() - $attachmentsEl.outerHeight() - parseInt($areaEl.css('margin-top'), 10) - parseInt($areaEl.css('margin-bottom'), 10);
        }
        $textareaEl.css('max-height', `${maxHeight}px`);
        $pageContentEl.css('padding-top', `${requiredPaddingTop}px`);
        $el.trigger('messagebar:resizePage');
        messagebar.emit('local::resizepage messagebarResizePage');
      }
      */
    } else {
      var currentPaddingBottom = parseInt($pageContentEl.css('padding-bottom'), 10);
      var requiredPaddingBottom = elHeight + params.bottomOffset;
      if (requiredPaddingBottom !== currentPaddingBottom && $pageContentEl.length) {
        var currentPaddingTop = parseInt($pageContentEl.css('padding-top'), 10);
        var pageScrollHeight = $pageContentEl[0].scrollHeight;
        var pageOffsetHeight = $pageContentEl[0].offsetHeight;
        var pageScrollTop = $pageContentEl[0].scrollTop;
        var scrollOnBottom = (pageScrollTop === pageScrollHeight - pageOffsetHeight);
        if (!maxHeight) {
          maxHeight = $pageEl[0].offsetHeight - currentPaddingTop - $sheetEl.outerHeight() - $attachmentsEl.outerHeight() - parseInt($areaEl.css('margin-top'), 10) - parseInt($areaEl.css('margin-bottom'), 10);
        }
        $textareaEl.css('max-height', (maxHeight + "px"));
        $pageContentEl.css('padding-bottom', (requiredPaddingBottom + "px"));
        if (scrollOnBottom) {
          $pageContentEl.scrollTop($pageContentEl[0].scrollHeight - pageOffsetHeight);
        }
        $el.trigger('messagebar:resizepage');
        messagebar.emit('local::resizePage messagebarResizePage');
      }
    }
  };
  Messagebar.prototype.checkEmptyState = function checkEmptyState () {
    var messagebar = this;
    var $el = messagebar.$el;
    var $textareaEl = messagebar.$textareaEl;
    var value = $textareaEl.val().trim();
    if (value && value.length) {
      $el.addClass('messagebar-with-value');
    } else {
      $el.removeClass('messagebar-with-value');
    }
  };
  Messagebar.prototype.attachmentsCreate = function attachmentsCreate (innerHTML) {
    if ( innerHTML === void 0 ) innerHTML = '';

    var messagebar = this;
    var $attachmentsEl = $$1$1(("<div class=\"messagebar-attachments\">" + innerHTML + "</div>"));
    $attachmentsEl.insertBefore(messagebar.$textareaEl);
    Utils.extend(messagebar, {
      $attachmentsEl: $attachmentsEl,
      attachmentsEl: $attachmentsEl[0],
    });
    return messagebar;
  };
  Messagebar.prototype.attachmentsShow = function attachmentsShow (innerHTML) {
    if ( innerHTML === void 0 ) innerHTML = '';

    var messagebar = this;
    messagebar.$attachmentsEl = messagebar.$el.find('.messagebar-attachments');
    if (messagebar.$attachmentsEl.length === 0) {
      messagebar.attachmentsCreate(innerHTML);
    }
    messagebar.$el.addClass('messagebar-attachments-visible');
    messagebar.attachmentsVisible = true;
    if (messagebar.params.resizePage) {
      messagebar.resizePage();
    }
    return messagebar;
  };
  Messagebar.prototype.attachmentsHide = function attachmentsHide () {
    var messagebar = this;
    messagebar.$el.removeClass('messagebar-attachments-visible');
    messagebar.attachmentsVisible = false;
    if (messagebar.params.resizePage) {
      messagebar.resizePage();
    }
    return messagebar;
  };
  Messagebar.prototype.attachmentsToggle = function attachmentsToggle () {
    var messagebar = this;
    if (messagebar.attachmentsVisible) {
      messagebar.attachmentsHide();
    } else {
      messagebar.attachmentsShow();
    }
    return messagebar;
  };
  Messagebar.prototype.renderAttachment = function renderAttachment (attachment) {
    var messagebar = this;
    if (messagebar.params.renderAttachment) {
      return messagebar.params.renderAttachment(attachment);
    }
    return ("\n      <div class=\"messagebar-attachment\">\n        <img src=\"" + attachment + "\">\n        <span class=\"messagebar-attachment-delete\"></span>\n      </div>\n    ");
  };
  Messagebar.prototype.renderAttachments = function renderAttachments () {
    var messagebar = this;
    var html;
    if (messagebar.params.renderAttachments) {
      html = messagebar.params.renderAttachments(messagebar.attachments);
    } else {
      html = "" + (messagebar.attachments.map(function (attachment) { return messagebar.renderAttachment(attachment); }).join(''));
    }
    if (messagebar.$attachmentsEl.length === 0) {
      messagebar.attachmentsCreate(html);
    } else {
      messagebar.$attachmentsEl.html(html);
    }
  };
  Messagebar.prototype.sheetCreate = function sheetCreate (innerHTML) {
    if ( innerHTML === void 0 ) innerHTML = '';

    var messagebar = this;
    var $sheetEl = $$1$1(("<div class=\"messagebar-sheet\">" + innerHTML + "</div>"));
    messagebar.$el.append($sheetEl);
    Utils.extend(messagebar, {
      $sheetEl: $sheetEl,
      sheetEl: $sheetEl[0],
    });
    return messagebar;
  };
  Messagebar.prototype.sheetShow = function sheetShow (innerHTML) {
    if ( innerHTML === void 0 ) innerHTML = '';

    var messagebar = this;
    messagebar.$sheetEl = messagebar.$el.find('.messagebar-sheet');
    if (messagebar.$sheetEl.length === 0) {
      messagebar.sheetCreate(innerHTML);
    }
    messagebar.$el.addClass('messagebar-sheet-visible');
    messagebar.sheetVisible = true;
    if (messagebar.params.resizePage) {
      messagebar.resizePage();
    }
    return messagebar;
  };
  Messagebar.prototype.sheetHide = function sheetHide () {
    var messagebar = this;
    messagebar.$el.removeClass('messagebar-sheet-visible');
    messagebar.sheetVisible = false;
    if (messagebar.params.resizePage) {
      messagebar.resizePage();
    }
    return messagebar;
  };
  Messagebar.prototype.sheetToggle = function sheetToggle () {
    var messagebar = this;
    if (messagebar.sheetVisible) {
      messagebar.sheetHide();
    } else {
      messagebar.sheetShow();
    }
    return messagebar;
  };
  Messagebar.prototype.init = function init () {
    var messagebar = this;
    messagebar.attachEvents();
    messagebar.checkEmptyState();
    return messagebar;
  };
  Messagebar.prototype.destroy = function destroy () {
    var messagebar = this;
    messagebar.emit('local::beforeDestroy messagebarBeforeDestroy', messagebar);
    messagebar.$el.trigger('messagebar:beforedestroy', messagebar);
    messagebar.detachEvents();
    messagebar.$el[0].f7Messagebar = null;
    delete messagebar.$el[0].f7Messagebar;
    Utils.deleteProps(messagebar);
  };

  return Messagebar;
}(Framework7Class));

var Messagebar = {
  name: 'messagebar',
  static: {
    Messagebar: Messagebar$1,
  },
  create: function create() {
    var app = this;
    app.messagebar = ConstructorMethods({
      defaultSelector: '.messagebar',
      constructor: Messagebar$1,
      app: app,
      domProp: 'f7Messagebar',
      addMethods: 'clear getValue setValue setPlaceholder resizePage focus blur attachmentsCreate attachmentsShow attachmentsHide attachmentsToggle renderAttachments sheetCreate sheetShow sheetHide sheetToggle'.split(' '),
    });
  },
  on: {
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var app = this;
      $$1$1(tabEl).find('.messagebar-init').each(function (index, messagebarEl) {
        app.messagebar.destroy(messagebarEl);
      });
    },
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      $$1$1(tabEl).find('.messagebar-init').each(function (index, messagebarEl) {
        app.messagebar.create(Utils.extend({ el: messagebarEl }, $$1$1(messagebarEl).dataset()));
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.messagebar-init').each(function (index, messagebarEl) {
        app.messagebar.destroy(messagebarEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.messagebar-init').each(function (index, messagebarEl) {
        app.messagebar.create(Utils.extend({ el: messagebarEl }, $$1$1(messagebarEl).dataset()));
      });
    },
  },
  clicks: {

  },
};

var updateSize = function () {
  var swiper = this;
  var width;
  var height;
  var $el = swiper.$el;
  if (typeof swiper.params.width !== 'undefined') {
    width = swiper.params.width;
  } else {
    width = $el[0].clientWidth;
  }
  if (typeof swiper.params.height !== 'undefined') {
    height = swiper.params.height;
  } else {
    height = $el[0].clientHeight;
  }
  if ((width === 0 && swiper.isHorizontal()) || (height === 0 && swiper.isVertical())) {
    return;
  }

  // Subtract paddings
  width = width - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
  height = height - parseInt($el.css('padding-top'), 10) - parseInt($el.css('padding-bottom'), 10);

  Utils.extend(swiper, {
    width: width,
    height: height,
    size: swiper.isHorizontal() ? width : height,
  });
};

var updateSlides = function () {
  var swiper = this;
  var params = swiper.params;

  var $wrapperEl = swiper.$wrapperEl;
  var swiperSize = swiper.size;
  var rtl = swiper.rtl;
  var wrongRTL = swiper.wrongRTL;
  var slides = $wrapperEl.children(("." + (swiper.params.slideClass)));
  var isVirtual = swiper.virtual && params.virtual.enabled;
  var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  var snapGrid = [];
  var slidesGrid = [];
  var slidesSizesGrid = [];

  var offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === 'function') {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }

  var offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === 'function') {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }

  var previousSlidesLength = slidesLength;
  var previousSnapGridLength = swiper.snapGrid.length;
  var previousSlidesGridLength = swiper.snapGrid.length;

  var spaceBetween = params.spaceBetween;
  var slidePosition = -offsetBefore;
  var prevSlideSize = 0;
  var index = 0;
  if (typeof swiperSize === 'undefined') {
    return;
  }
  if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
    spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiperSize;
  }

  swiper.virtualSize = -spaceBetween;

  // reset margins
  if (rtl) { slides.css({ marginLeft: '', marginTop: '' }); }
  else { slides.css({ marginRight: '', marginBottom: '' }); }

  var slidesNumberEvenToRows;
  if (params.slidesPerColumn > 1) {
    if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
      slidesNumberEvenToRows = slidesLength;
    } else {
      slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
    }
    if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
      slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
    }
  }

  // Calc slides
  var slideSize;
  var slidesPerColumn = params.slidesPerColumn;
  var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
  var numFullColumns = slidesPerRow - ((params.slidesPerColumn * slidesPerRow) - slidesLength);
  for (var i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    var slide = slides.eq(i);
    if (params.slidesPerColumn > 1) {
      // Set slides order
      var newSlideOrderIndex = (void 0);
      var column = (void 0);
      var row = (void 0);
      if (params.slidesPerColumnFill === 'column') {
        column = Math.floor(i / slidesPerColumn);
        row = i - (column * slidesPerColumn);
        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn - 1)) {
          row += 1;
          if (row >= slidesPerColumn) {
            row = 0;
            column += 1;
          }
        }
        newSlideOrderIndex = column + ((row * slidesNumberEvenToRows) / slidesPerColumn);
        slide
          .css({
            '-webkit-box-ordinal-group': newSlideOrderIndex,
            '-moz-box-ordinal-group': newSlideOrderIndex,
            '-ms-flex-order': newSlideOrderIndex,
            '-webkit-order': newSlideOrderIndex,
            order: newSlideOrderIndex,
          });
      } else {
        row = Math.floor(i / slidesPerRow);
        column = i - (row * slidesPerRow);
      }
      slide
        .css(
          ("margin-" + (swiper.isHorizontal() ? 'top' : 'left')),
          (row !== 0 && params.spaceBetween) && (((params.spaceBetween) + "px"))
        )
        .attr('data-swiper-column', column)
        .attr('data-swiper-row', row);
    }
    if (slide.css('display') === 'none') { continue; } // eslint-disable-line
    if (params.slidesPerView === 'auto') {
      slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
      if (params.roundLengths) { slideSize = Math.floor(slideSize); }
    } else {
      slideSize = (swiperSize - ((params.slidesPerView - 1) * spaceBetween)) / params.slidesPerView;
      if (params.roundLengths) { slideSize = Math.floor(slideSize); }

      if (slides[i]) {
        if (swiper.isHorizontal()) {
          slides[i].style.width = slideSize + "px";
        } else {
          slides[i].style.height = slideSize + "px";
        }
      }
    }
    if (slides[i]) {
      slides[i].swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);


    if (params.centeredSlides) {
      slidePosition = slidePosition + (slideSize / 2) + (prevSlideSize / 2) + spaceBetween;
      if (prevSlideSize === 0 && i !== 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
      if (i === 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
      if (Math.abs(slidePosition) < 1 / 1000) { slidePosition = 0; }
      if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
      slidesGrid.push(slidePosition);
    } else {
      if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }

    swiper.virtualSize += slideSize + spaceBetween;

    prevSlideSize = slideSize;

    index += 1;
  }
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  var newSlidesGrid;

  if (
    rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
    $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") });
  }
  if (!Support$1.flexbox || params.setWrapperSize) {
    if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
    else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
  }

  if (params.slidesPerColumn > 1) {
    swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
    swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
    if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
    else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
    if (params.centeredSlides) {
      newSlidesGrid = [];
      for (var i$1 = 0; i$1 < snapGrid.length; i$1 += 1) {
        if (snapGrid[i$1] < swiper.virtualSize + snapGrid[0]) { newSlidesGrid.push(snapGrid[i$1]); }
      }
      snapGrid = newSlidesGrid;
    }
  }

  // Remove last grid elements depending on width
  if (!params.centeredSlides) {
    newSlidesGrid = [];
    for (var i$2 = 0; i$2 < snapGrid.length; i$2 += 1) {
      if (snapGrid[i$2] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(snapGrid[i$2]);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }
  if (snapGrid.length === 0) { snapGrid = [0]; }

  if (params.spaceBetween !== 0) {
    if (swiper.isHorizontal()) {
      if (rtl) { slides.css({ marginLeft: (spaceBetween + "px") }); }
      else { slides.css({ marginRight: (spaceBetween + "px") }); }
    } else { slides.css({ marginBottom: (spaceBetween + "px") }); }
  }

  Utils.extend(swiper, {
    slides: slides,
    snapGrid: snapGrid,
    slidesGrid: slidesGrid,
    slidesSizesGrid: slidesSizesGrid,
  });

  if (slidesLength !== previousSlidesLength) {
    swiper.emit('slidesLengthChange');
  }
  if (snapGrid.length !== previousSnapGridLength) {
    swiper.emit('snapGridLengthChange');
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit('slidesGridLengthChange');
  }

  if (params.watchSlidesProgress || params.watchSlidesVisibility) {
    swiper.updateSlidesOffset();
  }
};

var updateAutoHeight = function () {
  var swiper = this;
  var activeSlides = [];
  var newHeight = 0;
  var i;

  // Find slides currently in view
  if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
    for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
      var index = swiper.activeIndex + i;
      if (index > swiper.slides.length) { break; }
      activeSlides.push(swiper.slides.eq(index)[0]);
    }
  } else {
    activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
  }

  // Find new height from highest slide in view
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== 'undefined') {
      var height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }

  // Update Height
  if (newHeight) { swiper.$wrapperEl.css('height', (newHeight + "px")); }
};

var updateSlidesOffset = function () {
  var swiper = this;
  var slides = swiper.slides;
  for (var i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
  }
};

var updateSlidesProgress = function (translate) {
  if ( translate === void 0 ) translate = this.translate || 0;

  var swiper = this;
  var params = swiper.params;

  var slides = swiper.slides;
  var rtl = swiper.rtl;

  if (slides.length === 0) { return; }
  if (typeof slides[0].swiperSlideOffset === 'undefined') { swiper.updateSlidesOffset(); }

  var offsetCenter = -translate;
  if (rtl) { offsetCenter = translate; }

  // Visible Slides
  slides.removeClass(params.slideVisibleClass);

  for (var i = 0; i < slides.length; i += 1) {
    var slide = slides[i];
    var slideProgress =
      (
        (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0)) - slide.swiperSlideOffset
      ) / (slide.swiperSlideSize + params.spaceBetween);
    if (params.watchSlidesVisibility) {
      var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
      var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
      var isVisible =
                (slideBefore >= 0 && slideBefore < swiper.size) ||
                (slideAfter > 0 && slideAfter <= swiper.size) ||
                (slideBefore <= 0 && slideAfter >= swiper.size);
      if (isVisible) {
        slides.eq(i).addClass(params.slideVisibleClass);
      }
    }
    slide.progress = rtl ? -slideProgress : slideProgress;
  }
};

var updateProgress = function (translate) {
  if ( translate === void 0 ) translate = this.translate || 0;

  var swiper = this;
  var params = swiper.params;

  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  var progress = swiper.progress;
  var isBeginning = swiper.isBeginning;
  var isEnd = swiper.isEnd;
  var wasBeginning = isBeginning;
  var wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate - swiper.minTranslate()) / (translatesDiff);
    isBeginning = progress <= 0;
    isEnd = progress >= 1;
  }
  Utils.extend(swiper, {
    progress: progress,
    isBeginning: isBeginning,
    isEnd: isEnd,
  });

  if (params.watchSlidesProgress || params.watchSlidesVisibility) { swiper.updateSlidesProgress(translate); }

  if (isBeginning && !wasBeginning) {
    swiper.emit('reachBeginning toEdge');
  }
  if (isEnd && !wasEnd) {
    swiper.emit('reachEnd toEdge');
  }
  if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
    swiper.emit('fromEdge');
  }

  swiper.emit('progress', progress);
};

var updateSlidesClasses = function () {
  var swiper = this;

  var slides = swiper.slides;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  var activeIndex = swiper.activeIndex;
  var realIndex = swiper.realIndex;
  var isVirtual = swiper.virtual && params.virtual.enabled;

  slides.removeClass(((params.slideActiveClass) + " " + (params.slideNextClass) + " " + (params.slidePrevClass) + " " + (params.slideDuplicateActiveClass) + " " + (params.slideDuplicateNextClass) + " " + (params.slideDuplicatePrevClass)));

  var activeSlide;
  if (isVirtual) {
    activeSlide = swiper.$wrapperEl.find(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + activeIndex + "\"]"));
  } else {
    activeSlide = slides.eq(activeIndex);
  }

  // Active classes
  activeSlide.addClass(params.slideActiveClass);

  if (params.loop) {
    // Duplicate to all looped slides
    if (activeSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl
        .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + realIndex + "\"]"))
        .addClass(params.slideDuplicateActiveClass);
    } else {
      $wrapperEl
        .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]"))
        .addClass(params.slideDuplicateActiveClass);
    }
  }
  // Next Slide
  var nextSlide = activeSlide.nextAll(("." + (params.slideClass))).eq(0).addClass(params.slideNextClass);
  if (params.loop && nextSlide.length === 0) {
    nextSlide = slides.eq(0);
    nextSlide.addClass(params.slideNextClass);
  }
  // Prev Slide
  var prevSlide = activeSlide.prevAll(("." + (params.slideClass))).eq(0).addClass(params.slidePrevClass);
  if (params.loop && prevSlide.length === 0) {
    prevSlide = slides.eq(-1);
    prevSlide.addClass(params.slidePrevClass);
  }
  if (params.loop) {
    // Duplicate to all looped slides
    if (nextSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl
        .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
        .addClass(params.slideDuplicateNextClass);
    } else {
      $wrapperEl
        .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
        .addClass(params.slideDuplicateNextClass);
    }
    if (prevSlide.hasClass(params.slideDuplicateClass)) {
      $wrapperEl
        .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
        .addClass(params.slideDuplicatePrevClass);
    } else {
      $wrapperEl
        .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
        .addClass(params.slideDuplicatePrevClass);
    }
  }
};

var updateActiveIndex = function (newActiveIndex) {
  var swiper = this;
  var translate = swiper.rtl ? swiper.translate : -swiper.translate;
  var slidesGrid = swiper.slidesGrid;
  var snapGrid = swiper.snapGrid;
  var params = swiper.params;
  var previousIndex = swiper.activeIndex;
  var previousRealIndex = swiper.realIndex;
  var previousSnapIndex = swiper.snapIndex;
  var activeIndex = newActiveIndex;
  var snapIndex;
  if (typeof activeIndex === 'undefined') {
    for (var i = 0; i < slidesGrid.length; i += 1) {
      if (typeof slidesGrid[i + 1] !== 'undefined') {
        if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - ((slidesGrid[i + 1] - slidesGrid[i]) / 2)) {
          activeIndex = i;
        } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
          activeIndex = i + 1;
        }
      } else if (translate >= slidesGrid[i]) {
        activeIndex = i;
      }
    }
    // Normalize slideIndex
    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === 'undefined') { activeIndex = 0; }
    }
  }
  if (snapGrid.indexOf(translate) >= 0) {
    snapIndex = snapGrid.indexOf(translate);
  } else {
    snapIndex = Math.floor(activeIndex / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }
  if (activeIndex === previousIndex) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit('snapIndexChange');
    }
    return;
  }

  // Get real index
  var realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);

  Utils.extend(swiper, {
    snapIndex: snapIndex,
    realIndex: realIndex,
    previousIndex: previousIndex,
    activeIndex: activeIndex,
  });
  swiper.emit('activeIndexChange');
  swiper.emit('snapIndexChange');
  if (previousRealIndex !== realIndex) {
    swiper.emit('realIndexChange');
  }
  swiper.emit('slideChange');
};

var updateClickedSlide = function (e) {
  var swiper = this;
  var params = swiper.params;
  var slide = $$1$1(e.target).closest(("." + (params.slideClass)))[0];
  var slideFound = false;
  if (slide) {
    for (var i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide) { slideFound = true; }
    }
  }

  if (slide && slideFound) {
    swiper.clickedSlide = slide;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt($$1$1(slide).attr('data-swiper-slide-index'), 10);
    } else {
      swiper.clickedIndex = $$1$1(slide).index();
    }
  } else {
    swiper.clickedSlide = undefined;
    swiper.clickedIndex = undefined;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
};

var update = {
  updateSize: updateSize,
  updateSlides: updateSlides,
  updateAutoHeight: updateAutoHeight,
  updateSlidesOffset: updateSlidesOffset,
  updateSlidesProgress: updateSlidesProgress,
  updateProgress: updateProgress,
  updateSlidesClasses: updateSlidesClasses,
  updateActiveIndex: updateActiveIndex,
  updateClickedSlide: updateClickedSlide,
};

var getTranslate = function (axis) {
  if ( axis === void 0 ) axis = this.isHorizontal() ? 'x' : 'y';

  var swiper = this;

  var params = swiper.params;
  var rtl = swiper.rtl;
  var translate = swiper.translate;
  var $wrapperEl = swiper.$wrapperEl;

  if (params.virtualTranslate) {
    return rtl ? -translate : translate;
  }

  var currentTranslate = Utils.getTranslate($wrapperEl[0], axis);
  if (rtl) { currentTranslate = -currentTranslate; }

  return currentTranslate || 0;
};

var setTranslate = function (translate, byController) {
  var swiper = this;
  var rtl = swiper.rtl;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  var progress = swiper.progress;
  var x = 0;
  var y = 0;
  var z = 0;

  if (swiper.isHorizontal()) {
    x = rtl ? -translate : translate;
  } else {
    y = translate;
  }

  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }

  if (!params.virtualTranslate) {
    if (Support$1.transforms3d) { $wrapperEl.transform(("translate3d(" + x + "px, " + y + "px, " + z + "px)")); }
    else { $wrapperEl.transform(("translate(" + x + "px, " + y + "px)")); }
  }

  swiper.translate = swiper.isHorizontal() ? x : y;

  // Check if we need to update progress
  var newProgress;
  var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate - swiper.minTranslate()) / (translatesDiff);
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate);
  }

  swiper.emit('setTranslate', swiper.translate, byController);
};

var minTranslate = function () {
  return (-this.snapGrid[0]);
};

var maxTranslate = function () {
  return (-this.snapGrid[this.snapGrid.length - 1]);
};

var translate = {
  getTranslate: getTranslate,
  setTranslate: setTranslate,
  minTranslate: minTranslate,
  maxTranslate: maxTranslate,
};

var setTransition = function (duration, byController) {
  var swiper = this;

  swiper.$wrapperEl.transition(duration);

  swiper.emit('setTransition', duration, byController);
};

var transitionStart = function (runCallbacks) {
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var activeIndex = swiper.activeIndex;
  var params = swiper.params;
  var previousIndex = swiper.previousIndex;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  swiper.emit('transitionStart');

  if (!runCallbacks) { return; }
  if (activeIndex !== previousIndex) {
    swiper.emit('slideChangeTransitionStart');
    if (activeIndex > previousIndex) {
      swiper.emit('slideNextTransitionStart');
    } else {
      swiper.emit('slidePrevTransitionStart');
    }
  }
};

var transitionEnd$1 = function (runCallbacks) {
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var activeIndex = swiper.activeIndex;
  var previousIndex = swiper.previousIndex;
  swiper.animating = false;
  swiper.setTransition(0);

  swiper.emit('transitionEnd');
  if (runCallbacks) {
    if (activeIndex !== previousIndex) {
      swiper.emit('slideChangeTransitionEnd');
      if (activeIndex > previousIndex) {
        swiper.emit('slideNextTransitionEnd');
      } else {
        swiper.emit('slidePrevTransitionEnd');
      }
    }
  }
};

var transition$1 = {
  setTransition: setTransition,
  transitionStart: transitionStart,
  transitionEnd: transitionEnd$1,
};

var Browser = (function Browser() {
  function isIE9() {
    // create temporary DIV
    var div = document.createElement('div');
    // add content to tmp DIV which is wrapped into the IE HTML conditional statement
    div.innerHTML = '<!--[if lte IE 9]><i></i><![endif]-->';
    // return true / false value based on what will browser render
    return div.getElementsByTagName('i').length === 1;
  }
  function isSafari() {
    var ua = window.navigator.userAgent.toLowerCase();
    return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
  }
  return {
    isSafari: isSafari(),
    isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
    ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
    ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) ||
             (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1),
    lteIE9: isIE9(),
  };
}());

var slideTo = function (index, speed, runCallbacks, internal) {
  if ( index === void 0 ) index = 0;
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var slideIndex = index;
  if (slideIndex < 0) { slideIndex = 0; }

  var params = swiper.params;
  var snapGrid = swiper.snapGrid;
  var slidesGrid = swiper.slidesGrid;
  var previousIndex = swiper.previousIndex;
  var activeIndex = swiper.activeIndex;
  var rtl = swiper.rtl;
  var $wrapperEl = swiper.$wrapperEl;

  var snapIndex = Math.floor(slideIndex / params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }

  if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
    swiper.emit('beforeSlideChangeStart');
  }

  var translate = -snapGrid[snapIndex];

  // Update progress
  swiper.updateProgress(translate);

  // Normalize slideIndex
  if (params.normalizeSlideIndex) {
    for (var i = 0; i < slidesGrid.length; i += 1) {
      if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
        slideIndex = i;
      }
    }
  }

  // Directions locks
  if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
    return false;
  }
  if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
    if ((activeIndex || 0) !== slideIndex) { return false; }
  }

  // Update Index
  if ((rtl && -translate === swiper.translate) || (!rtl && translate === swiper.translate)) {
    swiper.updateActiveIndex(slideIndex);
    // Update Height
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== 'slide') {
      swiper.setTranslate(translate);
    }
    return false;
  }

  if (speed === 0 || Browser.lteIE9) {
    swiper.setTransition(0);
    swiper.setTranslate(translate);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit('beforeTransitionStart', speed, internal);
    swiper.transitionStart(runCallbacks);
    swiper.transitionEnd(runCallbacks);
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(translate);
    swiper.updateActiveIndex(slideIndex);
    swiper.updateSlidesClasses();
    swiper.emit('beforeTransitionStart', speed, internal);
    swiper.transitionStart(runCallbacks);
    if (!swiper.animating) {
      swiper.animating = true;
      $wrapperEl.transitionEnd(function () {
        if (!swiper || swiper.destroyed) { return; }
        swiper.transitionEnd(runCallbacks);
      });
    }
  }

  return true;
};

/* eslint no-unused-vars: "off" */
var slideNext = function (speed, runCallbacks, internal) {
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var params = swiper.params;
  var animating = swiper.animating;
  if (params.loop) {
    if (animating) { return false; }
    swiper.loopFix();
    // eslint-disable-next-line
    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
};

/* eslint no-unused-vars: "off" */
var slidePrev = function (speed, runCallbacks, internal) {
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  var params = swiper.params;
  var animating = swiper.animating;

  if (params.loop) {
    if (animating) { return false; }
    swiper.loopFix();
    // eslint-disable-next-line
    swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    return swiper.slideTo(swiper.activeIndex - 1, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex - 1, speed, runCallbacks, internal);
};

/* eslint no-unused-vars: "off" */
var slideReset = function (speed, runCallbacks, internal) {
  if ( speed === void 0 ) speed = this.params.speed;
  if ( runCallbacks === void 0 ) runCallbacks = true;

  var swiper = this;
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
};

var slideToClickedSlide = function () {
  var swiper = this;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;

  var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  var slideToIndex = swiper.clickedIndex;
  var realIndex;
  if (params.loop) {
    if (swiper.animating) { return; }
    realIndex = parseInt($$1$1(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
    if (params.centeredSlides) {
      if (
        (slideToIndex < swiper.loopedSlides - (slidesPerView / 2)) ||
        (slideToIndex > (swiper.slides.length - swiper.loopedSlides) + (slidesPerView / 2))
      ) {
        swiper.loopFix();
        slideToIndex = $wrapperEl
          .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
          .eq(0)
          .index();

        Utils.nextTick(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else if (slideToIndex > swiper.slides.length - slidesPerView) {
      swiper.loopFix();
      slideToIndex = $wrapperEl
        .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
        .eq(0)
        .index();

      Utils.nextTick(function () {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
};

var slide = {
  slideTo: slideTo,
  slideNext: slideNext,
  slidePrev: slidePrev,
  slideReset: slideReset,
  slideToClickedSlide: slideToClickedSlide,
};

var loopCreate = function () {
  var swiper = this;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  // Remove duplicated slides
  $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();

  var slides = $wrapperEl.children(("." + (params.slideClass)));

  if (params.loopFillGroupWithBlank) {
    var blankSlidesNum = params.slidesPerGroup - (slides.length % params.slidesPerGroup);
    if (blankSlidesNum !== params.slidesPerGroup) {
      for (var i = 0; i < blankSlidesNum; i += 1) {
        var blankNode = $$1$1(document.createElement('div')).addClass(((params.slideClass) + " " + (params.slideBlankClass)));
        $wrapperEl.append(blankNode);
      }
      slides = $wrapperEl.children(("." + (params.slideClass)));
    }
  }

  if (params.slidesPerView === 'auto' && !params.loopedSlides) { params.loopedSlides = slides.length; }

  swiper.loopedSlides = parseInt(params.loopedSlides || params.slidesPerView, 10);
  swiper.loopedSlides += params.loopAdditionalSlides;
  if (swiper.loopedSlides > slides.length) {
    swiper.loopedSlides = slides.length;
  }

  var prependSlides = [];
  var appendSlides = [];
  slides.each(function (index, el) {
    var slide = $$1$1(el);
    if (index < swiper.loopedSlides) { appendSlides.push(el); }
    if (index < slides.length && index >= slides.length - swiper.loopedSlides) { prependSlides.push(el); }
    slide.attr('data-swiper-slide-index', index);
  });
  for (var i$1 = 0; i$1 < appendSlides.length; i$1 += 1) {
    $wrapperEl.append($$1$1(appendSlides[i$1].cloneNode(true)).addClass(params.slideDuplicateClass));
  }
  for (var i$2 = prependSlides.length - 1; i$2 >= 0; i$2 -= 1) {
    $wrapperEl.prepend($$1$1(prependSlides[i$2].cloneNode(true)).addClass(params.slideDuplicateClass));
  }
};

var loopFix = function () {
  var swiper = this;
  var params = swiper.params;
  var activeIndex = swiper.activeIndex;
  var slides = swiper.slides;
  var loopedSlides = swiper.loopedSlides;
  var allowSlidePrev = swiper.allowSlidePrev;
  var allowSlideNext = swiper.allowSlideNext;
  var newIndex;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  // Fix For Negative Oversliding
  if (activeIndex < loopedSlides) {
    newIndex = (slides.length - (loopedSlides * 3)) + activeIndex;
    newIndex += loopedSlides;
    swiper.slideTo(newIndex, 0, false, true);
  } else if ((params.slidesPerView === 'auto' && activeIndex >= loopedSlides * 2) || (activeIndex > slides.length - (params.slidesPerView * 2))) {
    // Fix For Positive Oversliding
    newIndex = -slides.length + activeIndex + loopedSlides;
    newIndex += loopedSlides;
    swiper.slideTo(newIndex, 0, false, true);
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
};

var loopDestroy = function () {
  var swiper = this;
  var $wrapperEl = swiper.$wrapperEl;
  var params = swiper.params;
  var slides = swiper.slides;
  $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();
  slides.removeAttr('data-swiper-slide-index');
};

var loop = {
  loopCreate: loopCreate,
  loopFix: loopFix,
  loopDestroy: loopDestroy,
};

var setGrabCursor = function (moving) {
  var swiper = this;
  if (Support$1.touch || !swiper.params.simulateTouch) { return; }
  var el = swiper.el;
  el.style.cursor = 'move';
  el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
  el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
  el.style.cursor = moving ? 'grabbing' : 'grab';
};

var unsetGrabCursor = function () {
  var swiper = this;
  if (Support$1.touch) { return; }
  swiper.el.style.cursor = '';
};

var grabCursor = {
  setGrabCursor: setGrabCursor,
  unsetGrabCursor: unsetGrabCursor,
};

var appendSlide = function (slides) {
  var swiper = this;
  var $wrapperEl = swiper.$wrapperEl;
  var params = swiper.params;
  if (params.loop) {
    swiper.loopDestroy();
  }
  if (typeof slides === 'object' && 'length' in slides) {
    for (var i = 0; i < slides.length; i += 1) {
      if (slides[i]) { $wrapperEl.append(slides[i]); }
    }
  } else {
    $wrapperEl.append(slides);
  }
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!(params.observer && Support$1.observer)) {
    swiper.update();
  }
};

var prependSlide = function (slides) {
  var swiper = this;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  var activeIndex = swiper.activeIndex;

  if (params.loop) {
    swiper.loopDestroy();
  }
  var newActiveIndex = activeIndex + 1;
  if (typeof slides === 'object' && 'length' in slides) {
    for (var i = 0; i < slides.length; i += 1) {
      if (slides[i]) { $wrapperEl.prepend(slides[i]); }
    }
    newActiveIndex = activeIndex + slides.length;
  } else {
    $wrapperEl.prepend(slides);
  }
  if (params.loop) {
    swiper.loopCreate();
  }
  if (!(params.observer && Support$1.observer)) {
    swiper.update();
  }
  swiper.slideTo(newActiveIndex, 0, false);
};

var removeSlide = function (slidesIndexes) {
  var swiper = this;
  var params = swiper.params;
  var $wrapperEl = swiper.$wrapperEl;
  var activeIndex = swiper.activeIndex;

  if (params.loop) {
    swiper.loopDestroy();
    swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
  }
  var newActiveIndex = activeIndex;
  var indexToRemove;

  if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
    for (var i = 0; i < slidesIndexes.length; i += 1) {
      indexToRemove = slidesIndexes[i];
      if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
      if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
    }
    newActiveIndex = Math.max(newActiveIndex, 0);
  } else {
    indexToRemove = slidesIndexes;
    if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
    if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
    newActiveIndex = Math.max(newActiveIndex, 0);
  }

  if (params.loop) {
    swiper.loopCreate();
  }

  if (!(params.observer && Support$1.observer)) {
    swiper.update();
  }
  if (params.loop) {
    swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
  } else {
    swiper.slideTo(newActiveIndex, 0, false);
  }
};

var removeAllSlides = function () {
  var swiper = this;

  var slidesIndexes = [];
  for (var i = 0; i < swiper.slides.length; i += 1) {
    slidesIndexes.push(i);
  }
  swiper.removeSlide(slidesIndexes);
};

var manipulation = {
  appendSlide: appendSlide,
  prependSlide: prependSlide,
  removeSlide: removeSlide,
  removeAllSlides: removeAllSlides,
};

var onTouchStart = function (event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params;
  var touches = swiper.touches;
  var e = event;
  if (e.originalEvent) { e = e.originalEvent; }
  data.isTouchEvent = e.type === 'touchstart';
  if (!data.isTouchEvent && 'which' in e && e.which === 3) { return; }
  if (data.isTouched && data.isMoved) { return; }
  if (params.noSwiping && $$1$1(e.target).closest(("." + (params.noSwipingClass)))[0]) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!$$1$1(e).closest(params.swipeHandler)[0]) { return; }
  }

  touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
  touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
  var startX = touches.currentX;
  var startY = touches.currentY;

  // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

  if (
    Device.ios &&
    !Device.cordova &&
    params.iOSEdgeSwipeDetection &&
    (startX <= params.iOSEdgeSwipeThreshold) &&
    (startX >= window.screen.width - params.iOSEdgeSwipeThreshold)
  ) {
    return;
  }

  Utils.extend(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: undefined,
    startMoving: undefined,
  });

  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = Utils.now();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = undefined;
  if (params.threshold > 0) { data.allowThresholdMove = false; }
  if (e.type !== 'touchstart') {
    var preventDefault = true;
    if ($$1$1(e.target).is(data.formElements)) { preventDefault = false; }
    if (document.activeElement && $$1$1(document.activeElement).is(data.formElements)) {
      document.activeElement.blur();
    }
    if (preventDefault && swiper.allowTouchMove) {
      e.preventDefault();
    }
  }
  swiper.emit('touchStart', e);
};

var onTouchMove = function (event) {
  var swiper = this;
  var data = swiper.touchEventsData;
  var params = swiper.params;
  var touches = swiper.touches;
  var rtl = swiper.rtl;
  var e = event;
  if (e.originalEvent) { e = e.originalEvent; }
  if (data.isTouchEvent && e.type === 'mousemove') { return; }
  var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
  var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    // isMoved = true;
    swiper.allowClick = false;
    if (data.isTouched) {
      Utils.extend(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY,
      });
      data.touchStartTime = Utils.now();
    }
    return;
  }
  if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      // Vertical
      if (
        (pageY < touches.startY && swiper.translate <= swiper.maxTranslate()) ||
        (pageY > touches.startY && swiper.translate >= swiper.minTranslate())
      ) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (
      (pageX < touches.startX && swiper.translate <= swiper.maxTranslate()) ||
      (pageX > touches.startX && swiper.translate >= swiper.minTranslate())
    ) {
      return;
    }
  }
  if (data.isTouchEvent && document.activeElement) {
    if (e.target === document.activeElement && $$1$1(e.target).is(data.formElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit('touchMove', e);
  }
  if (e.targetTouches && e.targetTouches.length > 1) { return; }

  touches.currentX = pageX;
  touches.currentY = pageY;

  var diffX = touches.currentX - touches.startX;
  var diffY = touches.currentY - touches.startY;

  if (typeof data.isScrolling === 'undefined') {
    var touchAngle;
    if ((swiper.isHorizontal() && touches.currentY === touches.startY) || (swiper.isVertical() && touches.currentX === touches.startX)) {
      data.isScrolling = false;
    } else {
      // eslint-disable-next-line
      if ((diffX * diffX) + (diffY * diffY) >= 25) {
        touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : (90 - touchAngle > params.touchAngle);
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit('touchMoveOpposite', e);
  }
  if (typeof startMoving === 'undefined') {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (!data.isTouched) { return; }
  if (data.isScrolling) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  e.preventDefault();
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }

  if (!data.isMoved) {
    if (params.loop) {
      swiper.loopFix();
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
    }
    data.allowMomentumBounce = false;
    // Grab Cursor
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit('sliderFirstMove', e);
  }
  swiper.emit('sliderMove', e);
  data.isMoved = true;

  var diff = swiper.isHorizontal() ? diffX : diffY;
  touches.diff = diff;

  diff *= params.touchRatio;
  if (rtl) { diff = -diff; }

  swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
  data.currentTranslate = diff + data.startTranslate;

  var disableParentSwiper = true;
  var resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if ((diff > 0 && data.currentTranslate > swiper.minTranslate())) {
    disableParentSwiper = false;
    if (params.resistance) { data.currentTranslate = (swiper.minTranslate() - 1) + (Math.pow( (-swiper.minTranslate() + data.startTranslate + diff), resistanceRatio )); }
  } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
    disableParentSwiper = false;
    if (params.resistance) { data.currentTranslate = (swiper.maxTranslate() + 1) - (Math.pow( (swiper.maxTranslate() - data.startTranslate - diff), resistanceRatio )); }
  }

  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }

  // Directions locks
  if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }


  // Threshold
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }

  if (!params.followFinger) { return; }

  // Update active index in free mode
  if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (params.freeMode) {
    // Velocity
    if (data.velocities.length === 0) {
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
        time: data.touchStartTime,
      });
    }
    data.velocities.push({
      position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
      time: Utils.now(),
    });
  }
  // Update progress
  swiper.updateProgress(data.currentTranslate);
  // Update translate
  swiper.setTranslate(data.currentTranslate);
};

var onTouchEnd = function (event) {
  var swiper = this;
  var data = swiper.touchEventsData;

  var params = swiper.params;
  var touches = swiper.touches;
  var rtl = swiper.rtl;
  var $wrapperEl = swiper.$wrapperEl;
  var slidesGrid = swiper.slidesGrid;
  var snapGrid = swiper.snapGrid;
  var e = event;
  if (e.originalEvent) { e = e.originalEvent; }
  if (data.allowTouchCallbacks) {
    swiper.emit('touchEnd', e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) { return; }
  // Return Grab Cursor
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }

  // Time diff
  var touchEndTime = Utils.now();
  var timeDiff = touchEndTime - data.touchStartTime;

  // Tap, doubleTap, Click
  if (swiper.allowClick) {
    swiper.updateClickedSlide(e);
    swiper.emit('tap', e);
    if (timeDiff < 300 && (touchEndTime - data.lastClickTime) > 300) {
      if (data.clickTimeout) { clearTimeout(data.clickTimeout); }
      data.clickTimeout = Utils.nextTick(function () {
        if (!swiper || swiper.destroyed) { return; }
        swiper.emit('click', e);
      }, 300);
    }
    if (timeDiff < 300 && (touchEndTime - data.lastClickTime) < 300) {
      if (data.clickTimeout) { clearTimeout(data.clickTimeout); }
      swiper.emit('doubleTap', e);
    }
  }

  data.lastClickTime = Utils.now();
  Utils.nextTick(function () {
    if (!swiper.destroyed) { swiper.allowClick = true; }
  });

  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
    data.isTouched = false;
    data.isMoved = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;

  var currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.freeMode) {
    if (currentPos < -swiper.minTranslate()) {
      swiper.slideTo(swiper.activeIndex);
      return;
    } else if (currentPos > -swiper.maxTranslate()) {
      if (swiper.slides.length < snapGrid.length) {
        swiper.slideTo(snapGrid.length - 1);
      } else {
        swiper.slideTo(swiper.slides.length - 1);
      }
      return;
    }

    if (params.freeModeMomentum) {
      if (data.velocities.length > 1) {
        var lastMoveEvent = data.velocities.pop();
        var velocityEvent = data.velocities.pop();

        var distance = lastMoveEvent.position - velocityEvent.position;
        var time = lastMoveEvent.time - velocityEvent.time;
        swiper.velocity = distance / time;
        swiper.velocity /= 2;
        if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
          swiper.velocity = 0;
        }
        // this implies that the user stopped moving a finger then released.
        // There would be no events with distance zero, so the last event is stale.
        if (time > 150 || (Utils.now() - lastMoveEvent.time) > 300) {
          swiper.velocity = 0;
        }
      } else {
        swiper.velocity = 0;
      }
      swiper.velocity *= params.freeModeMomentumVelocityRatio;

      data.velocities.length = 0;
      var momentumDuration = 1000 * params.freeModeMomentumRatio;
      var momentumDistance = swiper.velocity * momentumDuration;

      var newPosition = swiper.translate + momentumDistance;
      if (rtl) { newPosition = -newPosition; }
      var doBounce = false;
      var afterBouncePosition;
      var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
      if (newPosition < swiper.maxTranslate()) {
        if (params.freeModeMomentumBounce) {
          if (newPosition + swiper.maxTranslate() < -bounceAmount) {
            newPosition = swiper.maxTranslate() - bounceAmount;
          }
          afterBouncePosition = swiper.maxTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.maxTranslate();
        }
      } else if (newPosition > swiper.minTranslate()) {
        if (params.freeModeMomentumBounce) {
          if (newPosition - swiper.minTranslate() > bounceAmount) {
            newPosition = swiper.minTranslate() + bounceAmount;
          }
          afterBouncePosition = swiper.minTranslate();
          doBounce = true;
          data.allowMomentumBounce = true;
        } else {
          newPosition = swiper.minTranslate();
        }
      } else if (params.freeModeSticky) {
        var nextSlide;
        for (var j = 0; j < snapGrid.length; j += 1) {
          if (snapGrid[j] > -newPosition) {
            nextSlide = j;
            break;
          }
        }
        if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
          newPosition = snapGrid[nextSlide];
        } else {
          newPosition = snapGrid[nextSlide - 1];
        }
        newPosition = -newPosition;
      }
      // Fix duration
      if (swiper.velocity !== 0) {
        if (rtl) {
          momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
        } else {
          momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
        }
      } else if (params.freeModeSticky) {
        swiper.slideReset();
        return;
      }

      if (params.freeModeMomentumBounce && doBounce) {
        swiper.updateProgress(afterBouncePosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart();
        swiper.animating = true;
        $wrapperEl.transitionEnd(function () {
          if (!swiper || swiper.destroyed || !data.allowMomentumBounce) { return; }
          swiper.emit('momentumBounce');

          swiper.setTransition(params.speed);
          swiper.setTranslate(afterBouncePosition);
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed) { return; }
            swiper.transitionEnd();
          });
        });
      } else if (swiper.velocity) {
        swiper.updateProgress(newPosition);
        swiper.setTransition(momentumDuration);
        swiper.setTranslate(newPosition);
        swiper.transitionStart();
        if (!swiper.animating) {
          swiper.animating = true;
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed) { return; }
            swiper.transitionEnd();
          });
        }
      } else {
        swiper.updateProgress(newPosition);
      }

      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
      swiper.updateProgress();
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    return;
  }

  // Find current slide
  var stopIndex = 0;
  var groupSize = swiper.slidesSizesGrid[0];
  for (var i = 0; i < slidesGrid.length; i += params.slidesPerGroup) {
    if (typeof slidesGrid[i + params.slidesPerGroup] !== 'undefined') {
      if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + params.slidesPerGroup]) {
        stopIndex = i;
        groupSize = slidesGrid[i + params.slidesPerGroup] - slidesGrid[i];
      }
    } else if (currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }

  // Find current slide size
  var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;

  if (timeDiff > params.longSwipesMs) {
    // Long touches
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === 'next') {
      if (ratio >= params.longSwipesRatio) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
      else { swiper.slideTo(stopIndex); }
    }
    if (swiper.swipeDirection === 'prev') {
      if (ratio > (1 - params.longSwipesRatio)) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
      else { swiper.slideTo(stopIndex); }
    }
  } else {
    // Short swipes
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === 'next') {
      swiper.slideTo(stopIndex + params.slidesPerGroup);
    }
    if (swiper.swipeDirection === 'prev') {
      swiper.slideTo(stopIndex);
    }
  }
};

var onResize = function () {
  var swiper = this;

  var params = swiper.params;
  var el = swiper.el;

  if (el && el.offsetWidth === 0) { return; }

  // Breakpoints
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }

  // Save locks
  var allowSlideNext = swiper.allowSlideNext;
  var allowSlidePrev = swiper.allowSlidePrev;

  // Disable locks on resize
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;

  swiper.updateSize();
  swiper.updateSlides();

  if (params.freeMode) {
    var newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
    swiper.setTranslate(newTranslate);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();

    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
  } else {
    swiper.updateSlidesClasses();
    if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
      swiper.slideTo(swiper.slides.length - 1, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }
  // Return locks after resize
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
};

var onClick = function (e) {
  var swiper = this;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) { e.preventDefault(); }
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
};

function attachEvents() {
  var swiper = this;

  var params = swiper.params;
  var touchEvents = swiper.touchEvents;
  var el = swiper.el;
  var wrapperEl = swiper.wrapperEl;

  {
    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);
  }

  swiper.onClick = onClick.bind(swiper);

  var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
  var capture = !!params.nested;

  // Touch Events
  {
    if (Browser.ie) {
      target.addEventListener(touchEvents.start, swiper.onTouchStart, false);
      (Support$1.touch ? target : document).addEventListener(touchEvents.move, swiper.onTouchMove, capture);
      (Support$1.touch ? target : document).addEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (Support$1.touch) {
        var passiveListener = touchEvents.start === 'touchstart' && Support$1.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        target.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        target.addEventListener(touchEvents.move, swiper.onTouchMove, Support$1.passiveListener ? { passive: false, capture: capture } : capture);
        target.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support$1.touch && Device.ios)) {
        target.addEventListener('mousedown', swiper.onTouchStart, false);
        document.addEventListener('mousemove', swiper.onTouchMove, capture);
        document.addEventListener('mouseup', swiper.onTouchEnd, false);
      }
    }
    // Prevent Links Clicks
    if (params.preventClicks || params.preventClicksPropagation) {
      target.addEventListener('click', swiper.onClick, true);
    }
  }

  // Resize handler
  swiper.on('resize observerUpdate', onResize);
}

function detachEvents() {
  var swiper = this;

  var params = swiper.params;
  var touchEvents = swiper.touchEvents;
  var el = swiper.el;
  var wrapperEl = swiper.wrapperEl;

  var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
  var capture = !!params.nested;

  // Touch Events
  {
    if (Browser.ie) {
      target.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
      (Support$1.touch ? target : document).removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
      (Support$1.touch ? target : document).removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (Support$1.touch) {
        var passiveListener = touchEvents.start === 'onTouchStart' && Support$1.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        target.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        target.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        target.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support$1.touch && Device.ios)) {
        target.removeEventListener('mousedown', swiper.onTouchStart, false);
        document.removeEventListener('mousemove', swiper.onTouchMove, capture);
        document.removeEventListener('mouseup', swiper.onTouchEnd, false);
      }
    }
    // Prevent Links Clicks
    if (params.preventClicks || params.preventClicksPropagation) {
      target.removeEventListener('click', swiper.onClick, true);
    }
  }

  // Resize handler
  swiper.off('resize observerUpdate', onResize);
}

var events = {
  attachEvents: attachEvents,
  detachEvents: detachEvents,
};

var setBreakpoint = function () {
  var swiper = this;
  var activeIndex = swiper.activeIndex;
  var loopedSlides = swiper.loopedSlides; if ( loopedSlides === void 0 ) loopedSlides = 0;
  var params = swiper.params;
  var breakpoints = params.breakpoints;
  if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) { return; }
  // Set breakpoint for window width and update parameters
  var breakpoint = swiper.getBreakpoint(breakpoints);
  if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
    var breakPointsParams = breakpoint in breakpoints ? breakpoints[breakpoint] : swiper.originalParams;
    var needsReLoop = params.loop && (breakPointsParams.slidesPerView !== params.slidesPerView);

    Utils.extend(swiper.params, breakPointsParams);

    Utils.extend(swiper, {
      allowTouchMove: swiper.params.allowTouchMove,
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
    });

    swiper.currentBreakpoint = breakpoint;

    if (needsReLoop) {
      swiper.loopDestroy();
      swiper.loopCreate();
      swiper.updateSlides();
      swiper.slideTo((activeIndex - loopedSlides) + swiper.loopedSlides, 0, false);
    }
    swiper.emit('breakpoint', breakPointsParams);
  }
};

var getBreakpoint = function (breakpoints) {
  // Get breakpoint for window width
  if (!breakpoints) { return undefined; }
  var breakpoint = false;
  var points = [];
  Object.keys(breakpoints).forEach(function (point) {
    points.push(point);
  });
  points.sort(function (a, b) { return parseInt(a, 10) - parseInt(b, 10); });
  for (var i = 0; i < points.length; i += 1) {
    var point = points[i];
    if (point >= window.innerWidth && !breakpoint) {
      breakpoint = point;
    }
  }
  return breakpoint || 'max';
};

var breakpoints = { setBreakpoint: setBreakpoint, getBreakpoint: getBreakpoint };

var addClasses = function () {
  var swiper = this;
  var classNames = swiper.classNames;
  var params = swiper.params;
  var rtl = swiper.rtl;
  var $el = swiper.$el;
  var suffixes = [];

  suffixes.push(params.direction);

  if (params.freeMode) {
    suffixes.push('free-mode');
  }
  if (!Support$1.flexbox) {
    suffixes.push('no-flexbox');
  }
  if (params.autoHeight) {
    suffixes.push('autoheight');
  }
  if (rtl) {
    suffixes.push('rtl');
  }
  if (params.slidesPerColumn > 1) {
    suffixes.push('multirow');
  }
  if (Device.android) {
    suffixes.push('android');
  }
  if (Device.ios) {
    suffixes.push('ios');
  }
  // WP8 Touch Events Fix
  if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
    suffixes.push(("wp8-" + (params.direction)));
  }

  suffixes.forEach(function (suffix) {
    classNames.push(params.containerModifierClass + suffix);
  });

  $el.addClass(classNames.join(' '));
};

var removeClasses = function () {
  var swiper = this;
  var $el = swiper.$el;
  var classNames = swiper.classNames;

  $el.removeClass(classNames.join(' '));
};

var classes = { addClasses: addClasses, removeClasses: removeClasses };

var loadImage = function (imageEl, src, srcset, sizes, checkForComplete, callback) {
  var image;
  function onReady() {
    if (callback) { callback(); }
  }
  if (!imageEl.complete || !checkForComplete) {
    if (src) {
      image = new window.Image();
      image.onload = onReady;
      image.onerror = onReady;
      if (sizes) {
        image.sizes = sizes;
      }
      if (srcset) {
        image.srcset = srcset;
      }
      if (src) {
        image.src = src;
      }
    } else {
      onReady();
    }
  } else {
    // image already loaded...
    onReady();
  }
};

var preloadImages = function () {
  var swiper = this;
  swiper.imagesToLoad = swiper.$el.find('img');
  function onReady() {
    if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) { return; }
    if (swiper.imagesLoaded !== undefined) { swiper.imagesLoaded += 1; }
    if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
      if (swiper.params.updateOnImagesReady) { swiper.update(); }
      swiper.emit('imagesReady');
    }
  }
  for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
    var imageEl = swiper.imagesToLoad[i];
    swiper.loadImage(
      imageEl,
      imageEl.currentSrc || imageEl.getAttribute('src'),
      imageEl.srcset || imageEl.getAttribute('srcset'),
      imageEl.sizes || imageEl.getAttribute('sizes'),
      true,
      onReady
    );
  }
};

var images = {
  loadImage: loadImage,
  preloadImages: preloadImages,
};

var defaults = {
  init: true,
  direction: 'horizontal',
  touchEventsTarget: 'container',
  initialSlide: 0,
  speed: 300,

  // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
  iOSEdgeSwipeDetection: false,
  iOSEdgeSwipeThreshold: 20,

  // Free mode
  freeMode: false,
  freeModeMomentum: true,
  freeModeMomentumRatio: 1,
  freeModeMomentumBounce: true,
  freeModeMomentumBounceRatio: 1,
  freeModeMomentumVelocityRatio: 1,
  freeModeSticky: false,
  freeModeMinimumVelocity: 0.02,

  // Autoheight
  autoHeight: false,

  // Set wrapper width
  setWrapperSize: false,

  // Virtual Translate
  virtualTranslate: false,

  // Effects
  effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'

  // Breakpoints
  breakpoints: undefined,

  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerColumn: 1,
  slidesPerColumnFill: 'column',
  slidesPerGroup: 1,
  centeredSlides: false,
  slidesOffsetBefore: 0, // in px
  slidesOffsetAfter: 0, // in px
  normalizeSlideIndex: true,

  // Round length
  roundLengths: false,

  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 0,
  touchMoveStopPropagation: true,
  touchReleaseOnEdges: false,

  // Unique Navigation Elements
  uniqueNavElements: true,

  // Resistance
  resistance: true,
  resistanceRatio: 0.85,

  // Progress
  watchSlidesProgress: false,
  watchSlidesVisibility: false,

  // Cursor
  grabCursor: false,

  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,

  // Images
  preloadImages: true,
  updateOnImagesReady: true,

  // loop
  loop: false,
  loopAdditionalSlides: 0,
  loopedSlides: null,
  loopFillGroupWithBlank: false,

  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null, // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: 'swiper-no-swiping',

  // Passive Listeners
  passiveListeners: true,

  // NS
  containerModifierClass: 'swiper-container-', // NEW
  slideClass: 'swiper-slide',
  slideBlankClass: 'swiper-slide-invisible-blank',
  slideActiveClass: 'swiper-slide-active',
  slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
  slideVisibleClass: 'swiper-slide-visible',
  slideDuplicateClass: 'swiper-slide-duplicate',
  slideNextClass: 'swiper-slide-next',
  slideDuplicateNextClass: 'swiper-slide-duplicate-next',
  slidePrevClass: 'swiper-slide-prev',
  slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
  wrapperClass: 'swiper-wrapper',

  // Callbacks
  runCallbacksOnInit: true,
};

var prototypes = {
  update: update,
  translate: translate,
  transition: transition$1,
  slide: slide,
  loop: loop,
  grabCursor: grabCursor,
  manipulation: manipulation,
  events: events,
  breakpoints: breakpoints,
  classes: classes,
  images: images,
};

var extendedDefaults = {};

var Swiper$2 = (function (SwiperClass$$1) {
  function Swiper() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var el;
    var params;
    if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
      params = args[0];
    } else {
      var assign;
      (assign = args, el = assign[0], params = assign[1]);
    }
    if (!params) { params = {}; }

    params = Utils.extend({}, params);
    if (el && !params.el) { params.el = el; }

    SwiperClass$$1.call(this, params);

    Object.keys(prototypes).forEach(function (prototypeGroup) {
      Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
        if (!Swiper.prototype[protoMethod]) {
          Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
        }
      });
    });

    // Swiper Instance
    var swiper = this;
    if (typeof swiper.modules === 'undefined') {
      swiper.modules = {};
    }
    Object.keys(swiper.modules).forEach(function (moduleName) {
      var module = swiper.modules[moduleName];
      if (module.params) {
        var moduleParamName = Object.keys(module.params)[0];
        var moduleParams = module.params[moduleParamName];
        if (typeof moduleParams !== 'object') { return; }
        if (!(moduleParamName in params && 'enabled' in moduleParams)) { return; }
        if (params[moduleParamName] === true) {
          params[moduleParamName] = { enabled: true };
        }
        if (
          typeof params[moduleParamName] === 'object' &&
          !('enabled' in params[moduleParamName])
        ) {
          params[moduleParamName].enabled = true;
        }
        if (!params[moduleParamName]) { params[moduleParamName] = { enabled: false }; }
      }
    });

    // Extend defaults with modules params
    var swiperParams = Utils.extend({}, defaults);
    swiper.useModulesParams(swiperParams);

    // Extend defaults with passed params
    swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = Utils.extend({}, swiper.params);
    swiper.passedParams = Utils.extend({}, params);

    // Find el
    var $el = $$1$1(swiper.params.el);
    el = $el[0];

    if (!el) {
      return undefined;
    }

    if ($el.length > 1) {
      var swipers = [];
      $el.each(function (index, containerEl) {
        var newParams = Utils.extend({}, params, { el: containerEl });
        swipers.push(new Swiper(newParams));
      });
      return swipers;
    }

    el.swiper = swiper;
    $el.data('swiper', swiper);

    // Find Wrapper
    var $wrapperEl = $el.children(("." + (swiper.params.wrapperClass)));

    // Extend Swiper
    Utils.extend(swiper, {
      $el: $el,
      el: el,
      $wrapperEl: $wrapperEl,
      wrapperEl: $wrapperEl[0],

      // Classes
      classNames: [],

      // Slides
      slides: $$1$1(),
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],

      // isDirection
      isHorizontal: function isHorizontal() {
        return swiper.params.direction === 'horizontal';
      },
      isVertical: function isVertical() {
        return swiper.params.direction === 'vertical';
      },
      // RTL
      rtl: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
      wrongRTL: $wrapperEl.css('display') === '-webkit-box',

      // Indexes
      activeIndex: 0,
      realIndex: 0,

      //
      isBeginning: true,
      isEnd: false,

      // Props
      translate: 0,
      progress: 0,
      velocity: 0,
      animating: false,

      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,

      // Touch Events
      touchEvents: (function touchEvents() {
        var touch = ['touchstart', 'touchmove', 'touchend'];
        var desktop = ['mousedown', 'mousemove', 'mouseup'];
        if (window.navigator.pointerEnabled) {
          desktop = ['pointerdown', 'pointermove', 'pointerup'];
        } else if (window.navigator.msPointerEnabled) {
          desktop = ['MSPointerDown', 'MsPointerMove', 'MsPointerUp'];
        }

        return {
          start: Support$1.touch || !swiper.params.simulateTouch ? touch[0] : desktop[0],
          move: Support$1.touch || !swiper.params.simulateTouch ? touch[1] : desktop[1],
          end: Support$1.touch || !swiper.params.simulateTouch ? touch[2] : desktop[2],
        };
      }()),
      touchEventsData: {
        isTouched: undefined,
        isMoved: undefined,
        allowTouchCallbacks: undefined,
        touchStartTime: undefined,
        isScrolling: undefined,
        currentTranslate: undefined,
        startTranslate: undefined,
        allowThresholdMove: undefined,
        // Form elements to match
        formElements: 'input, select, option, textarea, button, video',
        // Last click time
        lastClickTime: Utils.now(),
        clickTimeout: undefined,
        // Velocities
        velocities: [],
        allowMomentumBounce: undefined,
        isTouchEvent: undefined,
        startMoving: undefined,
      },

      // Clicks
      allowClick: true,

      // Touches
      allowTouchMove: swiper.params.allowTouchMove,

      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0,
      },

      // Images
      imagesToLoad: [],
      imagesLoaded: 0,

    });

    // Install Modules
    swiper.useModules();

    // Init
    if (swiper.params.init) {
      swiper.init();
    }

    // Return app instance
    return swiper;
  }

  if ( SwiperClass$$1 ) Swiper.__proto__ = SwiperClass$$1;
  Swiper.prototype = Object.create( SwiperClass$$1 && SwiperClass$$1.prototype );
  Swiper.prototype.constructor = Swiper;

  var staticAccessors = { extendedDefaults: { configurable: true },defaults: { configurable: true },Class: { configurable: true },$: { configurable: true } };
  Swiper.prototype.slidesPerViewDynamic = function slidesPerViewDynamic () {
    var swiper = this;
    var params = swiper.params;
    var slides = swiper.slides;
    var slidesGrid = swiper.slidesGrid;
    var swiperSize = swiper.size;
    var activeIndex = swiper.activeIndex;
    var spv = 1;
    if (params.centeredSlides) {
      var slideSize = slides[activeIndex].swiperSlideSize;
      var breakLoop;
      for (var i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) { breakLoop = true; }
        }
      }
      for (var i$1 = activeIndex - 1; i$1 >= 0; i$1 -= 1) {
        if (slides[i$1] && !breakLoop) {
          slideSize += slides[i$1].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) { breakLoop = true; }
        }
      }
    } else {
      for (var i$2 = activeIndex + 1; i$2 < slides.length; i$2 += 1) {
        if (slidesGrid[i$2] - slidesGrid[activeIndex] < swiperSize) {
          spv += 1;
        }
      }
    }
    return spv;
  };
  Swiper.prototype.update = function update$$1 () {
    var swiper = this;
    if (!swiper || swiper.destroyed) { return; }
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();

    var newTranslate;
    function setTranslate() {
      newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    var translated;
    if (swiper.params.freeMode) {
      setTranslate();
      if (swiper.params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
        translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate();
      }
    }
    swiper.emit('update');
  };
  Swiper.prototype.init = function init () {
    var swiper = this;
    if (swiper.initialized) { return; }

    swiper.emit('beforeInit');

    // Set breakpoint
    if (swiper.params.breakpoints) {
      swiper.setBreakpoint();
    }

    // Add Classes
    swiper.addClasses();

    // Create loop
    if (swiper.params.loop) {
      swiper.loopCreate();
    }

    // Update size
    swiper.updateSize();

    // Update slides
    swiper.updateSlides();

    // Set Grab Cursor
    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }

    if (swiper.params.preloadImages) {
      swiper.preloadImages();
    }

    // Slide To Initial Slide
    if (swiper.params.loop) {
      swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
    }

    // Attach events
    swiper.attachEvents();

    // Init Flag
    swiper.initialized = true;

    // Emit
    swiper.emit('init');
  };
  Swiper.prototype.destroy = function destroy (deleteInstance, cleanStyles) {
    if ( deleteInstance === void 0 ) deleteInstance = true;
    if ( cleanStyles === void 0 ) cleanStyles = true;

    var swiper = this;
    var params = swiper.params;
    var $el = swiper.$el;
    var $wrapperEl = swiper.$wrapperEl;
    var slides = swiper.slides;
    swiper.emit('beforeDestroy');

    // Init Flag
    swiper.initialized = false;

    // Detach events
    swiper.detachEvents();

    // Destroy loop
    if (params.loop) {
      swiper.loopDestroy();
    }

    // Cleanup styles
    if (cleanStyles) {
      swiper.removeClasses();
      $el.removeAttr('style');
      $wrapperEl.removeAttr('style');
      if (slides && slides.length) {
        slides
          .removeClass([
            params.slideVisibleClass,
            params.slideActiveClass,
            params.slideNextClass,
            params.slidePrevClass ].join(' '))
          .removeAttr('style')
          .removeAttr('data-swiper-slide-index')
          .removeAttr('data-swiper-column')
          .removeAttr('data-swiper-row');
      }
    }

    swiper.emit('destroy');

    // Detach emitter events
    Object.keys(swiper.eventsListeners).forEach(function (eventName) {
      swiper.off(eventName);
    });

    if (deleteInstance !== false) {
      swiper.$el[0].swiper = null;
      swiper.$el.data('swiper', null);
      Utils.deleteProps(swiper);
    }
    swiper.destroyed = true;
  };
  Swiper.extendDefaults = function extendDefaults (newDefaults) {
    Utils.extend(extendedDefaults, newDefaults);
  };
  staticAccessors.extendedDefaults.get = function () {
    return extendedDefaults;
  };
  staticAccessors.defaults.get = function () {
    return defaults;
  };
  staticAccessors.Class.get = function () {
    return SwiperClass$$1;
  };
  staticAccessors.$.get = function () {
    return $$1$1;
  };

  Object.defineProperties( Swiper, staticAccessors );

  return Swiper;
}(Framework7Class));

var Device$4 = {
  name: 'device',
  proto: {
    device: Device,
  },
  static: {
    device: Device,
  },
};

var Support$4 = {
  name: 'support',
  proto: {
    support: Support$1,
  },
  static: {
    support: Support$1,
  },
};

var Browser$2 = {
  name: 'browser',
  proto: {
    browser: Browser,
  },
  static: {
    browser: Browser,
  },
};

var Resize$1 = {
  name: 'resize',
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      resize: {
        resizeHandler: function resizeHandler() {
          if (!swiper || !swiper.initialized) { return; }
          swiper.emit('resize');
        },
        orientationChangeHandler: function orientationChangeHandler() {
          if (!swiper || !swiper.initialized) { return; }
          swiper.emit('orientationchange');
        },
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      // Emit resize
      window.addEventListener('resize', swiper.resize.resizeHandler);

      // Emit orientationchange
      window.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    },
    destroy: function destroy() {
      var swiper = this;
      window.removeEventListener('resize', swiper.resize.resizeHandler);
      window.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
    },
  },
};

var Observer = {
  func: window.MutationObserver || window.WebkitMutationObserver,
  attach: function attach(target, options) {
    if ( options === void 0 ) options = {};

    var swiper = this;

    var ObserverFunc = Observer.func;
    var observer = new ObserverFunc(function (mutations) {
      mutations.forEach(function (mutation) {
        swiper.emit('observerUpdate', mutation);
      });
    });

    observer.observe(target, {
      attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
      childList: typeof options.childList === 'undefined' ? true : options.childList,
      characterData: typeof options.characterData === 'undefined' ? true : options.characterData,
    });

    swiper.observer.observers.push(observer);
  },
  init: function init() {
    var swiper = this;
    if (!Support$1.observer || !swiper.params.observer) { return; }
    if (swiper.params.observeParents) {
      var containerParents = swiper.$el.parents();
      for (var i = 0; i < containerParents.length; i += 1) {
        swiper.observer.attach(containerParents[i]);
      }
    }
    // Observe container
    swiper.observer.attach(swiper.$el[0], { childList: false });

    // Observe wrapper
    swiper.observer.attach(swiper.$wrapperEl[0], { attributes: false });
  },
  destroy: function destroy() {
    var swiper = this;
    swiper.observer.observers.forEach(function (observer) {
      observer.disconnect();
    });
    swiper.observer.observers = [];
  },
};

var Observer$1 = {
  name: 'observer',
  params: {
    observer: false,
    observeParents: false,
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      observer: {
        init: Observer.init.bind(swiper),
        attach: Observer.attach.bind(swiper),
        destroy: Observer.destroy.bind(swiper),
        observers: [],
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      swiper.observer.init();
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.observer.destroy();
    },
  },
};

var Virtual = {
  update: function update(force) {
    var swiper = this;
    var ref = swiper.params;
    var slidesPerView = ref.slidesPerView;
    var slidesPerGroup = ref.slidesPerGroup;
    var centeredSlides = ref.centeredSlides;
    var ref$1 = swiper.virtual;
    var previousFrom = ref$1.from;
    var previousTo = ref$1.to;
    var slides = ref$1.slides;
    var previousSlidesGrid = ref$1.slidesGrid;
    var renderSlide = ref$1.renderSlide;
    var previousOffset = ref$1.offset;
    swiper.updateActiveIndex();
    var activeIndex = swiper.activeIndex || 0;

    var offsetProp;
    if (swiper.rtl && swiper.isHorizontal()) { offsetProp = 'right'; }
    else { offsetProp = swiper.isHorizontal() ? 'left' : 'top'; }

    var slidesAfter;
    var slidesBefore;
    if (centeredSlides) {
      slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup;
      slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup;
    } else {
      slidesAfter = slidesPerView + (slidesPerGroup - 1);
      slidesBefore = slidesPerGroup;
    }
    var from = Math.max((activeIndex || 0) - slidesBefore, 0);
    var to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
    var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);

    Utils.extend(swiper.virtual, {
      from: from,
      to: to,
      offset: offset,
      slidesGrid: swiper.slidesGrid,
    });

    function onRendered() {
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();
      if (swiper.lazy && swiper.params.lazy.enabled) {
        swiper.lazy.load();
      }
    }

    if (previousFrom === from && previousTo === to && !force) {
      if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
        swiper.slides.css(offsetProp, (offset + "px"));
      }
      swiper.updateProgress();
      return;
    }
    if (swiper.params.virtual.renderExternal) {
      swiper.params.virtual.renderExternal.call(swiper, {
        offset: offset,
        from: from,
        to: to,
        slides: (function getSlides() {
          var slidesToRender = [];
          for (var i = from; i <= to; i += 1) {
            slidesToRender.push(slides[i]);
          }
          return slidesToRender;
        }()),
      });
      onRendered();
      return;
    }
    var prependIndexes = [];
    var appendIndexes = [];
    if (force) {
      swiper.$wrapperEl.find(("." + (swiper.params.slideClass))).remove();
    } else {
      for (var i = previousFrom; i <= previousTo; i += 1) {
        if (i < from || i > to) {
          swiper.$wrapperEl.find(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + i + "\"]")).remove();
        }
      }
    }
    for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
      if (i$1 >= from && i$1 <= to) {
        if (typeof previousTo === 'undefined' || force) {
          appendIndexes.push(i$1);
        } else {
          if (i$1 > previousTo) { appendIndexes.push(i$1); }
          if (i$1 < previousFrom) { prependIndexes.push(i$1); }
        }
      }
    }
    appendIndexes.forEach(function (index) {
      swiper.$wrapperEl.append(renderSlide(slides[index], index));
    });
    prependIndexes.sort(function (a, b) { return a < b; }).forEach(function (index) {
      swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
    });
    swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, (offset + "px"));
    onRendered();
  },
  renderSlide: function renderSlide(slide, index) {
    var swiper = this;
    var params = swiper.params.virtual;
    if (params.cache && swiper.virtual.cache[index]) {
      return swiper.virtual.cache[index];
    }
    var $slideEl = params.renderSlide
      ? $$1$1(params.renderSlide.call(swiper, slide, index))
      : $$1$1(("<div class=\"" + (swiper.params.slideClass) + "\" data-swiper-slide-index=\"" + index + "\">" + slide + "</div>"));
    if (!$slideEl.attr('data-swiper-slide-index')) { $slideEl.attr('data-swiper-slide-index', index); }
    if (params.cache) { swiper.virtual.cache[index] = $slideEl; }
    return $slideEl;
  },
  appendSlide: function appendSlide(slide) {
    var swiper = this;
    swiper.virtual.slides.push(slide);
    swiper.virtual.update(true);
  },
  prependSlide: function prependSlide(slide) {
    var swiper = this;
    swiper.virtual.slides.unshift(slide);
    if (swiper.params.virtual.cache) {
      var cache = swiper.virtual.cache;
      var newCache = {};
      Object.keys(cache).forEach(function (cachedIndex) {
        newCache[cachedIndex + 1] = cache[cachedIndex];
      });
      swiper.virtual.cache = newCache;
    }
    swiper.virtual.update(true);
    swiper.slideNext(0);
  },
};

var Virtual$1 = {
  name: 'virtual',
  params: {
    virtual: {
      enabled: false,
      slides: [],
      cache: true,
      renderSlide: null,
      renderExternal: null,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      virtual: {
        update: Virtual.update.bind(swiper),
        appendSlide: Virtual.appendSlide.bind(swiper),
        prependSlide: Virtual.prependSlide.bind(swiper),
        renderSlide: Virtual.renderSlide.bind(swiper),
        slides: swiper.params.virtual.slides,
        cache: {},
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (!swiper.params.virtual.enabled) { return; }
      swiper.classNames.push(((swiper.params.containerModifierClass) + "virtual"));
      var overwriteParams = {
        watchSlidesProgress: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);

      swiper.virtual.update();
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (!swiper.params.virtual.enabled) { return; }
      swiper.virtual.update();
    },
  },
};

var Navigation = {
  update: function update() {
    // Update Navigation Buttons
    var swiper = this;
    var params = swiper.params.navigation;

    if (swiper.params.loop) { return; }
    var ref = swiper.navigation;
    var $nextEl = ref.$nextEl;
    var $prevEl = ref.$prevEl;

    if ($prevEl && $prevEl.length > 0) {
      if (swiper.isBeginning) {
        $prevEl.addClass(params.disabledClass);
      } else {
        $prevEl.removeClass(params.disabledClass);
      }
    }
    if ($nextEl && $nextEl.length > 0) {
      if (swiper.isEnd) {
        $nextEl.addClass(params.disabledClass);
      } else {
        $nextEl.removeClass(params.disabledClass);
      }
    }
  },
  init: function init() {
    var swiper = this;
    var params = swiper.params.navigation;
    if (!(params.nextEl || params.prevEl)) { return; }

    var $nextEl;
    var $prevEl;
    if (params.nextEl) {
      $nextEl = $$1$1(params.nextEl);
      if (
        swiper.params.uniqueNavElements &&
        typeof params.nextEl === 'string' &&
        $nextEl.length > 1 &&
        swiper.$el.find(params.nextEl).length === 1
      ) {
        $nextEl = swiper.$el.find(params.nextEl);
      }
    }
    if (params.prevEl) {
      $prevEl = $$1$1(params.prevEl);
      if (
        swiper.params.uniqueNavElements &&
        typeof params.prevEl === 'string' &&
        $prevEl.length > 1 &&
        swiper.$el.find(params.prevEl).length === 1
      ) {
        $prevEl = swiper.$el.find(params.prevEl);
      }
    }

    if ($nextEl && $nextEl.length > 0) {
      $nextEl.on('click', function (e) {
        e.preventDefault();
        if (swiper.isEnd && !swiper.params.loop) { return; }
        swiper.slideNext();
      });
    }
    if ($prevEl && $prevEl.length > 0) {
      $prevEl.on('click', function (e) {
        e.preventDefault();
        if (swiper.isBeginning && !swiper.params.loop) { return; }
        swiper.slidePrev();
      });
    }

    Utils.extend(swiper.navigation, {
      $nextEl: $nextEl,
      nextEl: $nextEl && $nextEl[0],
      $prevEl: $prevEl,
      prevEl: $prevEl && $prevEl[0],
    });
  },
  destroy: function destroy() {
    var swiper = this;
    var ref = swiper.navigation;
    var $nextEl = ref.$nextEl;
    var $prevEl = ref.$prevEl;
    if ($nextEl && $nextEl.length) {
      $nextEl.off('click');
      $nextEl.removeClass(swiper.params.navigation.disabledClass);
    }
    if ($prevEl && $prevEl.length) {
      $prevEl.off('click');
      $prevEl.removeClass(swiper.params.navigation.disabledClass);
    }
  },
};

var Navigation$1 = {
  name: 'navigation',
  params: {
    navigation: {
      nextEl: null,
      prevEl: null,

      hideOnClick: false,
      disabledClass: 'swiper-button-disabled',
      hiddenClass: 'swiper-button-hidden',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      navigation: {
        init: Navigation.init.bind(swiper),
        update: Navigation.update.bind(swiper),
        destroy: Navigation.destroy.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      swiper.navigation.init();
      swiper.navigation.update();
    },
    toEdge: function toEdge() {
      var swiper = this;
      swiper.navigation.update();
    },
    fromEdge: function fromEdge() {
      var swiper = this;
      swiper.navigation.update();
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.navigation.destroy();
    },
    click: function click(e) {
      var swiper = this;
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;
      if (
        swiper.params.navigation.hideOnClick &&
        !$$1$1(e.target).is($prevEl) &&
        !$$1$1(e.target).is($nextEl)
      ) {
        if ($nextEl) { $nextEl.toggleClass(swiper.params.navigation.hiddenClass); }
        if ($prevEl) { $prevEl.toggleClass(swiper.params.navigation.hiddenClass); }
      }
    },
  },
};

var Pagination = {
  update: function update() {
    // Render || Update Pagination bullets/items
    var swiper = this;
    var rtl = swiper.rtl;
    var params = swiper.params.pagination;
    if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
    var $el = swiper.pagination.$el;
    // Current/Total
    var current;
    var total = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
    if (swiper.params.loop) {
      current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
      if (current > slidesLength - 1 - (swiper.loopedSlides * 2)) {
        current -= (slidesLength - (swiper.loopedSlides * 2));
      }
      if (current > total - 1) { current -= total; }
      if (current < 0 && swiper.params.paginationType !== 'bullets') { current = total + current; }
    } else if (typeof swiper.snapIndex !== 'undefined') {
      current = swiper.snapIndex;
    } else {
      current = swiper.activeIndex || 0;
    }
    // Types
    if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
      var bullets = swiper.pagination.bullets;
      if (params.dynamicBullets) {
        swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
        $el.css(swiper.isHorizontal() ? 'width' : 'height', ((swiper.pagination.bulletSize * 5) + "px"));
      }
      bullets.removeClass(((params.bulletActiveClass) + " " + (params.bulletActiveClass) + "-next " + (params.bulletActiveClass) + "-next-next " + (params.bulletActiveClass) + "-prev " + (params.bulletActiveClass) + "-prev-prev"));
      if ($el.length > 1) {
        bullets.each(function (index, bullet) {
          var $bullet = $$1$1(bullet);
          if ($bullet.index() === current) {
            $bullet.addClass(params.bulletActiveClass);
            if (params.dynamicBullets) {
              $bullet
                .prev()
                .addClass(((params.bulletActiveClass) + "-prev"))
                .prev()
                .addClass(((params.bulletActiveClass) + "-prev-prev"));
              $bullet
                .next()
                .addClass(((params.bulletActiveClass) + "-next"))
                .next()
                .addClass(((params.bulletActiveClass) + "-next-next"));
            }
          }
        });
      } else {
        var $bullet = bullets.eq(current);
        $bullet.addClass(params.bulletActiveClass);
        if (params.dynamicBullets) {
          $bullet
            .prev()
            .addClass(((params.bulletActiveClass) + "-prev"))
            .prev()
            .addClass(((params.bulletActiveClass) + "-prev-prev"));
          $bullet
            .next()
            .addClass(((params.bulletActiveClass) + "-next"))
            .next()
            .addClass(((params.bulletActiveClass) + "-next-next"));
        }
      }
      if (params.dynamicBullets) {
        var dynamicBulletsLength = Math.min(bullets.length, 5);
        var bulletsOffset = (((swiper.pagination.bulletSize * dynamicBulletsLength) - (swiper.pagination.bulletSize)) / 2) - (current * swiper.pagination.bulletSize);
        var offsetProp = rtl ? 'right' : 'left';
        bullets.css(swiper.isHorizontal() ? offsetProp : 'top', (bulletsOffset + "px"));
      }
    }
    if (params.type === 'fraction') {
      $el.find(("." + (params.currentClass))).text(current + 1);
      $el.find(("." + (params.totalClass))).text(total);
    }
    if (params.type === 'progressbar') {
      var scale = (current + 1) / total;
      var scaleX = scale;
      var scaleY = 1;
      if (!swiper.isHorizontal()) {
        scaleY = scale;
        scaleX = 1;
      }
      $el.find(("." + (params.progressbarFillClass))).transform(("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")")).transition(swiper.params.speed);
    }
    if (params.type === 'custom' && params.renderCustom) {
      $el.html(params.renderCustom(swiper, current + 1, total));
      swiper.emit('paginationRender', swiper, $el[0]);
    } else {
      swiper.emit('paginationUpdate', swiper, $el[0]);
    }
  },
  render: function render() {
    // Render Container
    var swiper = this;
    var params = swiper.params.pagination;
    if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
    var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;

    var $el = swiper.pagination.$el;
    var paginationHTML = '';
    if (params.type === 'bullets') {
      var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      for (var i = 0; i < numberOfBullets; i += 1) {
        if (params.renderBullet) {
          paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
        } else {
          paginationHTML += "<" + (params.bulletElement) + " class=\"" + (params.bulletClass) + "\"></" + (params.bulletElement) + ">";
        }
      }
      $el.html(paginationHTML);
      swiper.pagination.bullets = $el.find(("." + (params.bulletClass)));
    }
    if (params.type === 'fraction') {
      if (params.renderFraction) {
        paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
      } else {
        paginationHTML =
        "<span class=\"" + (params.currentClass) + "\"></span>" +
        ' / ' +
        "<span class=\"" + (params.totalClass) + "\"></span>";
      }
      $el.html(paginationHTML);
    }
    if (params.type === 'progressbar') {
      if (params.renderProgressbar) {
        paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
      } else {
        paginationHTML = "<span class=\"" + (params.progressbarFillClass) + "\"></span>";
      }
      $el.html(paginationHTML);
    }
    if (params.type !== 'custom') {
      swiper.emit('paginationRender', swiper.pagination.$el[0]);
    }
  },
  init: function init() {
    var swiper = this;
    var params = swiper.params.pagination;
    if (!params.el) { return; }

    var $el = $$1$1(params.el);
    if ($el.length === 0) { return; }

    if (
      swiper.params.uniqueNavElements &&
      typeof params.el === 'string' &&
      $el.length > 1 &&
      swiper.$el.find(params.el).length === 1
    ) {
      $el = swiper.$el.find(params.el);
    }

    if (params.type === 'bullets' && params.clickable) {
      $el.addClass(params.clickableClass);
    }

    $el.addClass(params.modifierClass + params.type);

    if (params.type === 'bullets' && params.dynamicBullets) {
      $el.addClass(("" + (params.modifierClass) + (params.type) + "-dynamic"));
    }

    if (params.clickable) {
      $el.on('click', ("." + (params.bulletClass)), function onClick(e) {
        e.preventDefault();
        var index = $$1$1(this).index() * swiper.params.slidesPerGroup;
        if (swiper.params.loop) { index += swiper.loopedSlides; }
        swiper.slideTo(index);
      });
    }

    Utils.extend(swiper.pagination, {
      $el: $el,
      el: $el[0],
    });
  },
  destroy: function destroy() {
    var swiper = this;
    var params = swiper.params.pagination;
    if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
    var $el = swiper.pagination.$el;

    $el.removeClass(params.hiddenClass);
    $el.removeClass(params.modifierClass + params.type);
    if (swiper.pagination.bullets) { swiper.pagination.bullets.removeClass(params.bulletActiveClass); }
    if (params.clickable) {
      $el.off('click', ("." + (params.bulletClass)));
    }
  },
};

var Pagination$1 = {
  name: 'pagination',
  params: {
    pagination: {
      el: null,
      bulletElement: 'span',
      clickable: false,
      hideOnClick: false,
      renderBullet: null,
      renderProgressbar: null,
      renderFraction: null,
      renderCustom: null,
      type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
      dynamicBullets: false,

      bulletClass: 'swiper-pagination-bullet',
      bulletActiveClass: 'swiper-pagination-bullet-active',
      modifierClass: 'swiper-pagination-', // NEW
      currentClass: 'swiper-pagination-current',
      totalClass: 'swiper-pagination-total',
      hiddenClass: 'swiper-pagination-hidden',
      progressbarFillClass: 'swiper-pagination-progressbar-fill',
      clickableClass: 'swiper-pagination-clickable', // NEW
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      pagination: {
        init: Pagination.init.bind(swiper),
        render: Pagination.render.bind(swiper),
        update: Pagination.update.bind(swiper),
        destroy: Pagination.destroy.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      swiper.pagination.init();
      swiper.pagination.render();
      swiper.pagination.update();
    },
    activeIndexChange: function activeIndexChange() {
      var swiper = this;
      if (swiper.params.loop) {
        swiper.pagination.update();
      } else if (typeof swiper.snapIndex === 'undefined') {
        swiper.pagination.update();
      }
    },
    snapIndexChange: function snapIndexChange() {
      var swiper = this;
      if (!swiper.params.loop) {
        swiper.pagination.update();
      }
    },
    slidesLengthChange: function slidesLengthChange() {
      var swiper = this;
      if (swiper.params.loop) {
        swiper.pagination.render();
        swiper.pagination.update();
      }
    },
    snapGridLengthChange: function snapGridLengthChange() {
      var swiper = this;
      if (!swiper.params.loop) {
        swiper.pagination.render();
        swiper.pagination.update();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.pagination.destroy();
    },
    click: function click(e) {
      var swiper = this;
      if (
        swiper.params.pagination.el &&
        swiper.params.pagination.hideOnClick &&
        swiper.pagination.$el.length > 0 &&
        !$$1$1(e.target).hasClass(swiper.params.pagination.bulletClass)
      ) {
        swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
      }
    },
  },
};

var Scrollbar = {
  setTranslate: function setTranslate() {
    var swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
    var scrollbar = swiper.scrollbar;
    var rtl = swiper.rtl;
    var progress = swiper.progress;
    var dragSize = scrollbar.dragSize;
    var trackSize = scrollbar.trackSize;
    var $dragEl = scrollbar.$dragEl;
    var $el = scrollbar.$el;
    var params = swiper.params.scrollbar;

    var newSize = dragSize;
    var newPos = (trackSize - dragSize) * progress;
    if (rtl && swiper.isHorizontal()) {
      newPos = -newPos;
      if (newPos > 0) {
        newSize = dragSize - newPos;
        newPos = 0;
      } else if (-newPos + dragSize > trackSize) {
        newSize = trackSize + newPos;
      }
    } else if (newPos < 0) {
      newSize = dragSize + newPos;
      newPos = 0;
    } else if (newPos + dragSize > trackSize) {
      newSize = trackSize - newPos;
    }
    if (swiper.isHorizontal()) {
      if (Support$1.transforms3d) {
        $dragEl.transform(("translate3d(" + newPos + "px, 0, 0)"));
      } else {
        $dragEl.transform(("translateX(" + newPos + "px)"));
      }
      $dragEl[0].style.width = newSize + "px";
    } else {
      if (Support$1.transforms3d) {
        $dragEl.transform(("translate3d(0px, " + newPos + "px, 0)"));
      } else {
        $dragEl.transform(("translateY(" + newPos + "px)"));
      }
      $dragEl[0].style.height = newSize + "px";
    }
    if (params.hide) {
      clearTimeout(swiper.scrollbar.timeout);
      $el[0].style.opacity = 1;
      swiper.scrollbar.timeout = setTimeout(function () {
        $el[0].style.opacity = 0;
        $el.transition(400);
      }, 1000);
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
    swiper.scrollbar.$dragEl.transition(duration);
  },
  updateSize: function updateSize() {
    var swiper = this;
    if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }

    var scrollbar = swiper.scrollbar;
    var $dragEl = scrollbar.$dragEl;
    var $el = scrollbar.$el;

    $dragEl[0].style.width = '';
    $dragEl[0].style.height = '';
    var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;

    var divider = swiper.size / swiper.virtualSize;
    var moveDivider = divider * (trackSize / swiper.size);
    var dragSize;
    if (swiper.params.scrollbar.dragSize === 'auto') {
      dragSize = trackSize * divider;
    } else {
      dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
    }

    if (swiper.isHorizontal()) {
      $dragEl[0].style.width = dragSize + "px";
    } else {
      $dragEl[0].style.height = dragSize + "px";
    }

    if (divider >= 1) {
      $el[0].style.display = 'none';
    } else {
      $el[0].style.display = '';
    }
    if (swiper.params.scrollbarHide) {
      $el[0].style.opacity = 0;
    }
    Utils.extend(scrollbar, {
      trackSize: trackSize,
      divider: divider,
      moveDivider: moveDivider,
      dragSize: dragSize,
    });
  },
  setDragPosition: function setDragPosition(e) {
    var swiper = this;
    var scrollbar = swiper.scrollbar;
    var $el = scrollbar.$el;
    var dragSize = scrollbar.dragSize;
    var trackSize = scrollbar.trackSize;

    var pointerPosition;
    if (swiper.isHorizontal()) {
      pointerPosition = ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX);
    } else {
      pointerPosition = ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY);
    }
    var positionRatio;
    positionRatio = ((pointerPosition) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - (dragSize / 2)) / (trackSize - dragSize);
    positionRatio = Math.max(Math.min(positionRatio, 1), 0);
    if (swiper.rtl) {
      positionRatio = 1 - positionRatio;
    }

    var position = swiper.minTranslate() + ((swiper.maxTranslate() - swiper.minTranslate()) * positionRatio);

    swiper.updateProgress(position);
    swiper.setTranslate(position);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  },
  onDragStart: function onDragStart(e) {
    var swiper = this;
    var params = swiper.params.scrollbar;
    var scrollbar = swiper.scrollbar;
    var $wrapperEl = swiper.$wrapperEl;
    var $el = scrollbar.$el;
    var $dragEl = scrollbar.$dragEl;
    swiper.scrollbar.isTouched = true;
    e.preventDefault();
    e.stopPropagation();

    $wrapperEl.transition(100);
    $dragEl.transition(100);
    scrollbar.setDragPosition(e);

    clearTimeout(swiper.scrollbar.dragTimeout);

    $el.transition(0);
    if (params.hide) {
      $el.css('opacity', 1);
    }
    swiper.emit('scrollbarDragStart', e);
  },
  onDragMove: function onDragMove(e) {
    var swiper = this;
    var scrollbar = swiper.scrollbar;
    var $wrapperEl = swiper.$wrapperEl;
    var $el = scrollbar.$el;
    var $dragEl = scrollbar.$dragEl;

    if (!swiper.scrollbar.isTouched) { return; }
    if (e.preventDefault) { e.preventDefault(); }
    else { e.returnValue = false; }
    scrollbar.setDragPosition(e);
    $wrapperEl.transition(0);
    $el.transition(0);
    $dragEl.transition(0);
    swiper.emit('scrollbarDragMove', e);
  },
  onDragEnd: function onDragEnd(e) {
    var swiper = this;

    var params = swiper.params.scrollbar;
    var scrollbar = swiper.scrollbar;
    var $el = scrollbar.$el;

    if (!swiper.scrollbar.isTouched) { return; }
    swiper.scrollbar.isTouched = false;
    if (params.hide) {
      clearTimeout(swiper.scrollbar.dragTimeout);
      swiper.scrollbar.dragTimeout = Utils.nextTick(function () {
        $el.css('opacity', 0);
        $el.transition(400);
      }, 1000);
    }
    swiper.emit('scrollbarDragEnd', e);
    if (params.snapOnRelease) {
      swiper.slideReset();
    }
  },
  enableDraggable: function enableDraggable() {
    var swiper = this;
    if (!swiper.params.scrollbar.el) { return; }
    var scrollbar = swiper.scrollbar;
    var $el = scrollbar.$el;
    var target = Support$1.touch ? $el[0] : document;
    $el.on(swiper.scrollbar.dragEvents.start, swiper.scrollbar.onDragStart);
    $$1$1(target).on(swiper.scrollbar.dragEvents.move, swiper.scrollbar.onDragMove);
    $$1$1(target).on(swiper.scrollbar.dragEvents.end, swiper.scrollbar.onDragEnd);
  },
  disableDraggable: function disableDraggable() {
    var swiper = this;
    if (!swiper.params.scrollbar.el) { return; }
    var scrollbar = swiper.scrollbar;
    var $el = scrollbar.$el;
    var target = Support$1.touch ? $el[0] : document;
    $el.off(swiper.scrollbar.dragEvents.start);
    $$1$1(target).off(swiper.scrollbar.dragEvents.move);
    $$1$1(target).off(swiper.scrollbar.dragEvents.end);
  },
  init: function init() {
    var swiper = this;
    if (!swiper.params.scrollbar.el) { return; }
    var scrollbar = swiper.scrollbar;
    var $swiperEl = swiper.$el;
    var touchEvents = swiper.touchEvents;
    var params = swiper.params.scrollbar;

    var $el = $$1$1(params.el);
    if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
      $el = $swiperEl.find(params.el);
    }

    var $dragEl = $el.find('.swiper-scrollbar-drag');
    if ($dragEl.length === 0) {
      $dragEl = $$1$1('<div class="swiper-scrollbar-drag"></div>');
      $el.append($dragEl);
    }

    swiper.scrollbar.dragEvents = (function dragEvents() {
      if ((swiper.params.simulateTouch === false && !Support$1.touch)) {
        return {
          start: 'mousedown',
          move: 'mousemove',
          end: 'mouseup',
        };
      }
      return touchEvents;
    }());

    Utils.extend(scrollbar, {
      $el: $el,
      el: $el[0],
      $dragEl: $dragEl,
      dragEl: $dragEl[0],
    });

    if (params.draggable) {
      scrollbar.enableDraggable();
    }
  },
  destroy: function destroy() {
    var swiper = this;
    swiper.scrollbar.disableDraggable();
  },
};

var Scrollbar$1 = {
  name: 'scrollbar',
  params: {
    scrollbar: {
      el: null,
      dragSize: 'auto',
      hide: false,
      draggable: false,
      snapOnRelease: true,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      scrollbar: {
        init: Scrollbar.init.bind(swiper),
        destroy: Scrollbar.destroy.bind(swiper),
        updateSize: Scrollbar.updateSize.bind(swiper),
        setTranslate: Scrollbar.setTranslate.bind(swiper),
        setTransition: Scrollbar.setTransition.bind(swiper),
        enableDraggable: Scrollbar.enableDraggable.bind(swiper),
        disableDraggable: Scrollbar.disableDraggable.bind(swiper),
        setDragPosition: Scrollbar.setDragPosition.bind(swiper),
        onDragStart: Scrollbar.onDragStart.bind(swiper),
        onDragMove: Scrollbar.onDragMove.bind(swiper),
        onDragEnd: Scrollbar.onDragEnd.bind(swiper),
        isTouched: false,
        timeout: null,
        dragTimeout: null,
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      swiper.scrollbar.init();
      swiper.scrollbar.updateSize();
      swiper.scrollbar.setTranslate();
    },
    update: function update() {
      var swiper = this;
      swiper.scrollbar.updateSize();
    },
    resize: function resize() {
      var swiper = this;
      swiper.scrollbar.updateSize();
    },
    observerUpdate: function observerUpdate() {
      var swiper = this;
      swiper.scrollbar.updateSize();
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      swiper.scrollbar.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      swiper.scrollbar.setTransition(duration);
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.scrollbar.destroy();
    },
  },
};

var Parallax = {
  setTransform: function setTransform(el, progress) {
    var swiper = this;
    var rtl = swiper.rtl;

    var $el = $$1$1(el);
    var rtlFactor = rtl ? -1 : 1;

    var p = $el.attr('data-swiper-parallax') || '0';
    var x = $el.attr('data-swiper-parallax-x');
    var y = $el.attr('data-swiper-parallax-y');
    var scale = $el.attr('data-swiper-parallax-scale');
    var opacity = $el.attr('data-swiper-parallax-opacity');

    if (x || y) {
      x = x || '0';
      y = y || '0';
    } else if (swiper.isHorizontal()) {
      x = p;
      y = '0';
    } else {
      y = p;
      x = '0';
    }

    if ((x).indexOf('%') >= 0) {
      x = (parseInt(x, 10) * progress * rtlFactor) + "%";
    } else {
      x = (x * progress * rtlFactor) + "px";
    }
    if ((y).indexOf('%') >= 0) {
      y = (parseInt(y, 10) * progress) + "%";
    } else {
      y = (y * progress) + "px";
    }

    if (typeof opacity !== 'undefined' && opacity !== null) {
      var currentOpacity = opacity - ((opacity - 1) * (1 - Math.abs(progress)));
      $el[0].style.opacity = currentOpacity;
    }
    if (typeof scale === 'undefined' || scale === null) {
      $el.transform(("translate3d(" + x + ", " + y + ", 0px)"));
    } else {
      var currentScale = scale - ((scale - 1) * (1 - Math.abs(progress)));
      $el.transform(("translate3d(" + x + ", " + y + ", 0px) scale(" + currentScale + ")"));
    }
  },
  setTranslate: function setTranslate() {
    var swiper = this;
    var $el = swiper.$el;
    var slides = swiper.slides;
    var progress = swiper.progress;
    var snapGrid = swiper.snapGrid;
    $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
      .each(function (index, el) {
        swiper.parallax.setTransform(el, progress);
      });
    slides.each(function (slideIndex, slideEl) {
      var slideProgress = slideEl.progress;
      if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
        slideProgress += Math.ceil(slideIndex / 2) - (progress * (snapGrid.length - 1));
      }
      slideProgress = Math.min(Math.max(slideProgress, -1), 1);
      $$1$1(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
        .each(function (index, el) {
          swiper.parallax.setTransform(el, slideProgress);
        });
    });
  },
  setTransition: function setTransition(duration) {
    if ( duration === void 0 ) duration = this.params.speed;

    var swiper = this;
    var $el = swiper.$el;
    $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]')
      .each(function (index, parallaxEl) {
        var $parallaxEl = $$1$1(parallaxEl);
        var parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
        if (duration === 0) { parallaxDuration = 0; }
        $parallaxEl.transition(parallaxDuration);
      });
  },
};

var Parallax$1 = {
  name: 'parallax',
  params: {
    parallax: {
      enabled: false,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      parallax: {
        setTransform: Parallax.setTransform.bind(swiper),
        setTranslate: Parallax.setTranslate.bind(swiper),
        setTransition: Parallax.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      swiper.params.watchSlidesProgress = true;
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.parallax) { return; }
      swiper.parallax.setTranslate();
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (!swiper.params.parallax) { return; }
      swiper.parallax.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (!swiper.params.parallax) { return; }
      swiper.parallax.setTransition(duration);
    },
  },
};

var Zoom = {
  // Calc Scale From Multi-touches
  getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
    if (e.targetTouches.length < 2) { return 1; }
    var x1 = e.targetTouches[0].pageX;
    var y1 = e.targetTouches[0].pageY;
    var x2 = e.targetTouches[1].pageX;
    var y2 = e.targetTouches[1].pageY;
    var distance = Math.sqrt((Math.pow( (x2 - x1), 2 )) + (Math.pow( (y2 - y1), 2 )));
    return distance;
  },
  // Events
  onGestureStart: function onGestureStart(e) {
    var swiper = this;
    var params = swiper.params.zoom;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    zoom.fakeGestureTouched = false;
    zoom.fakeGestureMoved = false;
    if (!Support$1.gestures) {
      if (e.type !== 'touchstart' || (e.type === 'touchstart' && e.targetTouches.length < 2)) {
        return;
      }
      zoom.fakeGestureTouched = true;
      gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
    }
    if (!gesture.$slideEl || !gesture.$slideEl.length) {
      gesture.$slideEl = $$1$1(this);
      if (gesture.$slideEl.length === 0) { gesture.$slideEl = swiper.slides.eq(swiper.activeIndex); }
      gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
      gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
      gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      if (gesture.$imageWrapEl.length === 0) {
        gesture.$imageEl = undefined;
        return;
      }
    }
    gesture.$imageEl.transition(0);
    swiper.zoom.isScaling = true;
  },
  onGestureChange: function onGestureChange(e) {
    var swiper = this;
    var params = swiper.params.zoom;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    if (!Support$1.gestures) {
      if (e.type !== 'touchmove' || (e.type === 'touchmove' && e.targetTouches.length < 2)) {
        return;
      }
      zoom.fakeGestureMoved = true;
      gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
    }
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    if (Support$1.gestures) {
      swiper.zoom.scale = e.scale * zoom.currentScale;
    } else {
      zoom.scale = (gesture.scaleMove / gesture.scaleStart) * zoom.currentScale;
    }
    if (zoom.scale > gesture.maxRatio) {
      zoom.scale = (gesture.maxRatio - 1) + (Math.pow( ((zoom.scale - gesture.maxRatio) + 1), 0.5 ));
    }
    if (zoom.scale < params.minRatio) {
      zoom.scale = (params.minRatio + 1) - (Math.pow( ((params.minRatio - zoom.scale) + 1), 0.5 ));
    }
    gesture.$imageEl.transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
  },
  onGestureEnd: function onGestureEnd(e) {
    var swiper = this;
    var params = swiper.params.zoom;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    if (!Support$1.gestures) {
      if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
        return;
      }
      if (e.type !== 'touchend' || (e.type === 'touchend' && e.changedTouches.length < 2 && !Device.android)) {
        return;
      }
      zoom.fakeGestureTouched = false;
      zoom.fakeGestureMoved = false;
    }
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
    gesture.$imageEl.transition(swiper.params.speed).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
    zoom.currentScale = zoom.scale;
    zoom.isScaling = false;
    if (zoom.scale === 1) { gesture.$slideEl = undefined; }
  },
  onTouchStart: function onTouchStart(e) {
    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    var image = zoom.image;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    if (image.isTouched) { return; }
    if (Device.android) { e.preventDefault(); }
    image.isTouched = true;
    image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
  },
  onTouchMove: function onTouchMove(e) {
    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    var image = zoom.image;
    var velocity = zoom.velocity;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    swiper.allowClick = false;
    if (!image.isTouched || !gesture.$slideEl) { return; }

    if (!image.isMoved) {
      image.width = gesture.$imageEl[0].offsetWidth;
      image.height = gesture.$imageEl[0].offsetHeight;
      image.startX = Utils.getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
      image.startY = Utils.getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
      gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
      gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
      gesture.$imageWrapEl.transition(0);
      if (swiper.rtl) { image.startX = -image.startX; }
      if (swiper.rtl) { image.startY = -image.startY; }
    }
    // Define if we need image drag
    var scaledWidth = image.width * zoom.scale;
    var scaledHeight = image.height * zoom.scale;

    if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) { return; }

    image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
    image.maxX = -image.minX;
    image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
    image.maxY = -image.minY;

    image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

    if (!image.isMoved && !zoom.isScaling) {
      if (
        swiper.isHorizontal() &&
        (
          (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x) ||
          (Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)
        )
      ) {
        image.isTouched = false;
        return;
      } else if (
        !swiper.isHorizontal() &&
        (
          (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y) ||
          (Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)
        )
      ) {
        image.isTouched = false;
        return;
      }
    }
    e.preventDefault();
    e.stopPropagation();

    image.isMoved = true;
    image.currentX = (image.touchesCurrent.x - image.touchesStart.x) + image.startX;
    image.currentY = (image.touchesCurrent.y - image.touchesStart.y) + image.startY;

    if (image.currentX < image.minX) {
      image.currentX = (image.minX + 1) - (Math.pow( ((image.minX - image.currentX) + 1), 0.8 ));
    }
    if (image.currentX > image.maxX) {
      image.currentX = (image.maxX - 1) + (Math.pow( ((image.currentX - image.maxX) + 1), 0.8 ));
    }

    if (image.currentY < image.minY) {
      image.currentY = (image.minY + 1) - (Math.pow( ((image.minY - image.currentY) + 1), 0.8 ));
    }
    if (image.currentY > image.maxY) {
      image.currentY = (image.maxY - 1) + (Math.pow( ((image.currentY - image.maxY) + 1), 0.8 ));
    }

    // Velocity
    if (!velocity.prevPositionX) { velocity.prevPositionX = image.touchesCurrent.x; }
    if (!velocity.prevPositionY) { velocity.prevPositionY = image.touchesCurrent.y; }
    if (!velocity.prevTime) { velocity.prevTime = Date.now(); }
    velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
    velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
    if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) { velocity.x = 0; }
    if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) { velocity.y = 0; }
    velocity.prevPositionX = image.touchesCurrent.x;
    velocity.prevPositionY = image.touchesCurrent.y;
    velocity.prevTime = Date.now();

    gesture.$imageWrapEl.transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
  },
  onTouchEnd: function onTouchEnd() {
    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    var image = zoom.image;
    var velocity = zoom.velocity;
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
    if (!image.isTouched || !image.isMoved) {
      image.isTouched = false;
      image.isMoved = false;
      return;
    }
    image.isTouched = false;
    image.isMoved = false;
    var momentumDurationX = 300;
    var momentumDurationY = 300;
    var momentumDistanceX = velocity.x * momentumDurationX;
    var newPositionX = image.currentX + momentumDistanceX;
    var momentumDistanceY = velocity.y * momentumDurationY;
    var newPositionY = image.currentY + momentumDistanceY;

    // Fix duration
    if (velocity.x !== 0) { momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x); }
    if (velocity.y !== 0) { momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y); }
    var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

    image.currentX = newPositionX;
    image.currentY = newPositionY;

    // Define if we need image drag
    var scaledWidth = image.width * zoom.scale;
    var scaledHeight = image.height * zoom.scale;
    image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
    image.maxX = -image.minX;
    image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
    image.maxY = -image.minY;
    image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
    image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);

    gesture.$imageWrapEl.transition(momentumDuration).transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
  },
  onTransitionEnd: function onTransitionEnd() {
    var swiper = this;
    var zoom = swiper.zoom;
    var gesture = zoom.gesture;
    if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
      gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
      gesture.$imageWrapEl.transform('translate3d(0,0,0)');
      gesture.$slideEl = undefined;
      gesture.$imageEl = undefined;
      gesture.$imageWrapEl = undefined;

      zoom.scale = 1;
      zoom.currentScale = 1;
    }
  },
  // Toggle Zoom
  toggle: function toggle(e) {
    var swiper = this;
    var zoom = swiper.zoom;

    if (zoom.scale && zoom.scale !== 1) {
      // Zoom Out
      zoom.out();
    } else {
      // Zoom In
      zoom.in(e);
    }
  },
  in: function in$1(e) {
    var swiper = this;

    var zoom = swiper.zoom;
    var params = swiper.params.zoom;
    var gesture = zoom.gesture;
    var image = zoom.image;

    if (!gesture.$slideEl) {
      gesture.$slideEl = swiper.clickedSlide ? $$1$1(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
      gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
      gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
    }
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

    gesture.$slideEl.addClass(("" + (params.zoomedSlideClass)));

    var touchX;
    var touchY;
    var offsetX;
    var offsetY;
    var diffX;
    var diffY;
    var translateX;
    var translateY;
    var imageWidth;
    var imageHeight;
    var scaledWidth;
    var scaledHeight;
    var translateMinX;
    var translateMinY;
    var translateMaxX;
    var translateMaxY;
    var slideWidth;
    var slideHeight;

    if (typeof image.touchesStart.x === 'undefined' && e) {
      touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
      touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
    } else {
      touchX = image.touchesStart.x;
      touchY = image.touchesStart.y;
    }

    zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
    zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
    if (e) {
      slideWidth = gesture.$slideEl[0].offsetWidth;
      slideHeight = gesture.$slideEl[0].offsetHeight;
      offsetX = gesture.$slideEl.offset().left;
      offsetY = gesture.$slideEl.offset().top;
      diffX = (offsetX + (slideWidth / 2)) - touchX;
      diffY = (offsetY + (slideHeight / 2)) - touchY;

      imageWidth = gesture.$imageEl[0].offsetWidth;
      imageHeight = gesture.$imageEl[0].offsetHeight;
      scaledWidth = imageWidth * zoom.scale;
      scaledHeight = imageHeight * zoom.scale;

      translateMinX = Math.min(((slideWidth / 2) - (scaledWidth / 2)), 0);
      translateMinY = Math.min(((slideHeight / 2) - (scaledHeight / 2)), 0);
      translateMaxX = -translateMinX;
      translateMaxY = -translateMinY;

      translateX = diffX * zoom.scale;
      translateY = diffY * zoom.scale;

      if (translateX < translateMinX) {
        translateX = translateMinX;
      }
      if (translateX > translateMaxX) {
        translateX = translateMaxX;
      }

      if (translateY < translateMinY) {
        translateY = translateMinY;
      }
      if (translateY > translateMaxY) {
        translateY = translateMaxY;
      }
    } else {
      translateX = 0;
      translateY = 0;
    }
    gesture.$imageWrapEl.transition(300).transform(("translate3d(" + translateX + "px, " + translateY + "px,0)"));
    gesture.$imageEl.transition(300).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
  },
  out: function out() {
    var swiper = this;

    var zoom = swiper.zoom;
    var params = swiper.params.zoom;
    var gesture = zoom.gesture;

    if (!gesture.$slideEl) {
      gesture.$slideEl = swiper.clickedSlide ? $$1$1(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
      gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
      gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
    }
    if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

    zoom.scale = 1;
    zoom.currentScale = 1;
    gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
    gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
    gesture.$slideEl.removeClass(("" + (params.zoomedSlideClass)));
    gesture.$slideEl = undefined;
  },
  // Attach/Detach Events
  enable: function enable() {
    var swiper = this;
    var zoom = swiper.zoom;
    if (zoom.enabled) { return; }
    zoom.enabled = true;

    var slides = swiper.slides;

    var passiveListener = swiper.touchEvents.start === 'touchstart' && Support$1.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

    // Scale image
    if (Support$1.gestures) {
      slides.on('gesturestart', zoom.onGestureStart, passiveListener);
      slides.on('gesturechange', zoom.onGestureChange, passiveListener);
      slides.on('gestureend', zoom.onGestureEnd, passiveListener);
    } else if (swiper.touchEvents.start === 'touchstart') {
      slides.on(swiper.touchEvents.start, zoom.onGestureStart, passiveListener);
      slides.on(swiper.touchEvents.move, zoom.onGestureChange, passiveListener);
      slides.on(swiper.touchEvents.end, zoom.onGestureEnd, passiveListener);
    }

    // Move image
    swiper.slides.each(function (index, slideEl) {
      var $slideEl = $$1$1(slideEl);
      if ($slideEl.find(("." + (swiper.params.zoom.containerClass))).length > 0) {
        $slideEl.on(swiper.touchEvents.move, zoom.onTouchMove);
      }
    });
  },
  disable: function disable() {
    var swiper = this;
    var zoom = swiper.zoom;
    if (!zoom.enabled) { return; }

    swiper.zoom.enabled = false;

    var slides = swiper.slides;

    var passiveListener = swiper.touchEvents.start === 'touchstart' && Support$1.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;

    // Scale image
    if (Support$1.gestures) {
      slides.off('gesturestart', zoom.onGestureStart, passiveListener);
      slides.off('gesturechange', zoom.onGestureChange, passiveListener);
      slides.off('gestureend', zoom.onGestureEnd, passiveListener);
    } else if (swiper.touchEvents.start === 'touchstart') {
      slides.off(swiper.touchEvents.start, zoom.onGestureStart, passiveListener);
      slides.off(swiper.touchEvents.move, zoom.onGestureChange, passiveListener);
      slides.off(swiper.touchEvents.end, zoom.onGestureEnd, passiveListener);
    }

    // Move image
    swiper.slides.each(function (index, slideEl) {
      var $slideEl = $$1$1(slideEl);
      if ($slideEl.find(("." + (swiper.params.zoom.containerClass))).length > 0) {
        $slideEl.off(swiper.touchEvents.move, zoom.onTouchMove);
      }
    });
  },
};

var Zoom$1 = {
  name: 'zoom',
  params: {
    zoom: {
      enabled: false,
      maxRatio: 3,
      minRatio: 1,
      toggle: true,
      containerClass: 'swiper-zoom-container',
      zoomedSlideClass: 'swiper-slide-zoomed',
    },
  },
  create: function create() {
    var swiper = this;
    var zoom = {
      enabled: false,
      scale: 1,
      currentScale: 1,
      isScaling: false,
      gesture: {
        $slideEl: undefined,
        slideWidth: undefined,
        slideHeight: undefined,
        $imageEl: undefined,
        $imageWrapEl: undefined,
        maxRatio: 3,
      },
      image: {
        isTouched: undefined,
        isMoved: undefined,
        currentX: undefined,
        currentY: undefined,
        minX: undefined,
        minY: undefined,
        maxX: undefined,
        maxY: undefined,
        width: undefined,
        height: undefined,
        startX: undefined,
        startY: undefined,
        touchesStart: {},
        touchesCurrent: {},
      },
      velocity: {
        x: undefined,
        y: undefined,
        prevPositionX: undefined,
        prevPositionY: undefined,
        prevTime: undefined,
      },
    };
    ('onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out').split(' ').forEach(function (methodName) {
      zoom[methodName] = Zoom[methodName].bind(swiper);
    });
    Utils.extend(swiper, {
      zoom: zoom,
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.zoom.enabled) {
        swiper.zoom.enable();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.zoom.disable();
    },
    touchStart: function touchStart(e) {
      var swiper = this;
      if (!swiper.zoom.enabled) { return; }
      swiper.zoom.onTouchStart(e);
    },
    touchEnd: function touchEnd(e) {
      var swiper = this;
      if (!swiper.zoom.enabled) { return; }
      swiper.zoom.onTouchEnd(e);
    },
    doubleTap: function doubleTap(e) {
      var swiper = this;
      if (swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
        swiper.zoom.toggle(e);
      }
    },
    transitionEnd: function transitionEnd() {
      var swiper = this;
      if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
        swiper.zoom.onTransitionEnd();
      }
    },
  },
};

var Lazy$2 = {
  loadInSlide: function loadInSlide(index, loadInDuplicate) {
    if ( loadInDuplicate === void 0 ) loadInDuplicate = true;

    var swiper = this;
    var params = swiper.params.lazy;
    if (typeof index === 'undefined') { return; }
    if (swiper.slides.length === 0) { return; }
    var isVirtual = swiper.virtual && swiper.params.virtual.enabled;

    var $slideEl = isVirtual
      ? swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]"))
      : swiper.slides.eq(index);

    var $images = $slideEl.find(("." + (params.elementClass) + ":not(." + (params.loadedClass) + "):not(." + (params.loadingClass) + ")"));
    if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
      $images = $images.add($slideEl[0]);
    }
    if ($images.length === 0) { return; }

    $images.each(function (imageIndex, imageEl) {
      var $imageEl = $$1$1(imageEl);
      $imageEl.addClass(params.loadingClass);

      var background = $imageEl.attr('data-background');
      var src = $imageEl.attr('data-src');
      var srcset = $imageEl.attr('data-srcset');
      var sizes = $imageEl.attr('data-sizes');

      swiper.loadImage($imageEl[0], (src || background), srcset, sizes, false, function () {
        if (typeof swiper === 'undefined' || swiper === null || !swiper || (swiper && !swiper.params) || swiper.destroyed) { return; }
        if (background) {
          $imageEl.css('background-image', ("url(\"" + background + "\")"));
          $imageEl.removeAttr('data-background');
        } else {
          if (srcset) {
            $imageEl.attr('srcset', srcset);
            $imageEl.removeAttr('data-srcset');
          }
          if (sizes) {
            $imageEl.attr('sizes', sizes);
            $imageEl.removeAttr('data-sizes');
          }
          if (src) {
            $imageEl.attr('src', src);
            $imageEl.removeAttr('data-src');
          }
        }

        $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
        $slideEl.find(("." + (params.preloaderClass))).remove();
        if (swiper.params.loop && loadInDuplicate) {
          var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');
          if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
            var originalSlide = swiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]:not(." + (swiper.params.slideDuplicateClass) + ")"));
            swiper.lazy.loadInSlide(originalSlide.index(), false);
          } else {
            var duplicatedSlide = swiper.$wrapperEl.children(("." + (swiper.params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]"));
            swiper.lazy.loadInSlide(duplicatedSlide.index(), false);
          }
        }
        swiper.emit('lazyImageReady', $slideEl[0], $imageEl[0]);
      });

      swiper.emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
    });
  },
  load: function load() {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var swiperParams = swiper.params;
    var slides = swiper.slides;
    var activeIndex = swiper.activeIndex;
    var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
    var params = swiperParams.lazy;

    var slidesPerView = swiperParams.slidesPerView;
    if (slidesPerView === 'auto') {
      slidesPerView = 0;
    }

    function slideExist(index) {
      if (isVirtual) {
        if ($wrapperEl.children(("." + (swiperParams.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]")).length) {
          return true;
        }
      } else if (slides[index]) { return true; }
      return false;
    }
    function slideIndex(slideEl) {
      if (isVirtual) {
        return $$1$1(slideEl).attr('data-swiper-slide-index');
      }
      return $$1$1(slideEl).index();
    }

    if (!swiper.lazy.initialImageLoaded) { swiper.lazy.initialImageLoaded = true; }
    if (swiper.params.watchSlidesVisibility) {
      $wrapperEl.children(("." + (swiperParams.slideVisibleClass))).each(function (elIndex, slideEl) {
        var index = isVirtual ? $$1$1(slideEl).attr('data-swiper-slide-index') : $$1$1(slideEl).index();
        swiper.lazy.loadInSlide(index);
      });
    } else if (slidesPerView > 1) {
      for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
        if (slideExist(i)) { swiper.lazy.loadInSlide(i); }
      }
    } else {
      swiper.lazy.loadInSlide(activeIndex);
    }
    if (params.loadPrevNext) {
      if (slidesPerView > 1 || (params.loadPrevNextAmount && params.loadPrevNextAmount > 1)) {
        var amount = params.loadPrevNextAmount;
        var spv = slidesPerView;
        var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
        var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0);
        // Next Slides
        for (var i$1 = activeIndex + slidesPerView; i$1 < maxIndex; i$1 += 1) {
          if (slideExist(i$1)) { swiper.lazy.loadInSlide(i$1); }
        }
        // Prev Slides
        for (var i$2 = minIndex; i$2 < activeIndex; i$2 += 1) {
          if (slideExist(i$2)) { swiper.lazy.loadInSlide(i$2); }
        }
      } else {
        var nextSlide = $wrapperEl.children(("." + (swiperParams.slideNextClass)));
        if (nextSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(nextSlide)); }

        var prevSlide = $wrapperEl.children(("." + (swiperParams.slidePrevClass)));
        if (prevSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(prevSlide)); }
      }
    }
  },
};

var Lazy$3 = {
  name: 'lazy',
  params: {
    lazy: {
      enabled: false,
      loadPrevNext: false,
      loadPrevNextAmount: 1,
      loadOnTransitionStart: false,

      elementClass: 'swiper-lazy',
      loadingClass: 'swiper-lazy-loading',
      loadedClass: 'swiper-lazy-loaded',
      preloaderClass: 'swiper-lazy-preloader',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      lazy: {
        initialImageLoaded: false,
        load: Lazy$2.load.bind(swiper),
        loadInSlide: Lazy$2.loadInSlide.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
        swiper.params.preloadImages = false;
      }
    },
    init: function init() {
      var swiper = this;
      if (swiper.params.lazy.enabled && !swiper.params.loop && swiper.params.initialSlide === 0) {
        swiper.lazy.load();
      }
    },
    scroll: function scroll() {
      var swiper = this;
      if (swiper.params.freeMode && !swiper.params.freeModeSticky) {
        swiper.lazy.load();
      }
    },
    resize: function resize() {
      var swiper = this;
      if (swiper.params.lazy.enabled) {
        swiper.lazy.load();
      }
    },
    scrollbarDragMove: function scrollbarDragMove() {
      var swiper = this;
      if (swiper.params.lazy.enabled) {
        swiper.lazy.load();
      }
    },
    transitionStart: function transitionStart() {
      var swiper = this;
      if (swiper.params.lazy.enabled) {
        if (swiper.params.lazy.loadOnTransitionStart || (!swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded)) {
          swiper.lazy.load();
        }
      }
    },
    transitionEnd: function transitionEnd() {
      var swiper = this;
      if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
        swiper.lazy.load();
      }
    },
  },
};

/* eslint no-bitwise: ["error", { "allow": [">>"] }] */
var Controller = {
  LinearSpline: function LinearSpline(x, y) {
    var binarySearch = (function search() {
      var maxIndex;
      var minIndex;
      var guess;
      return function (array, val) {
        minIndex = -1;
        maxIndex = array.length;
        while (maxIndex - minIndex > 1) {
          guess = maxIndex + minIndex >> 1;
          if (array[guess] <= val) {
            minIndex = guess;
          } else {
            maxIndex = guess;
          }
        }
        return maxIndex;
      };
    }());
    this.x = x;
    this.y = y;
    this.lastIndex = x.length - 1;
    // Given an x value (x2), return the expected y2 value:
    // (x1,y1) is the known point before given value,
    // (x3,y3) is the known point after given value.
    var i1;
    var i3;

    this.interpolate = function interpolate(x2) {
      if (!x2) { return 0; }

      // Get the indexes of x1 and x3 (the array indexes before and after given x2):
      i3 = binarySearch(this.x, x2);
      i1 = i3 - 1;

      // We have our indexes i1 & i3, so we can calculate already:
      // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
      return (((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1])) + this.y[i1];
    };
    return this;
  },
  // xxx: for now i will just save one spline function to to
  getInterpolateFunction: function getInterpolateFunction(c) {
    var swiper = this;
    if (!swiper.controller.spline) {
      swiper.controller.spline = swiper.params.loop ?
        new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid) :
        new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
    }
  },
  setTranslate: function setTranslate(setTranslate$1, byController) {
    var swiper = this;
    var controlled = swiper.controller.control;
    var multiplier;
    var controlledTranslate;
    function setControlledTranslate(c) {
      // this will create an Interpolate function based on the snapGrids
      // x is the Grid of the scrolled scroller and y will be the controlled scroller
      // it makes sense to create this only once and recall it for the interpolation
      // the function does a lot of value caching for performance
      var translate = c.rtl && c.params.direction === 'horizontal' ? -swiper.translate : swiper.translate;
      if (swiper.params.controller.by === 'slide') {
        swiper.controller.getInterpolateFunction(c);
        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
        // but it did not work out
        controlledTranslate = -swiper.controller.spline.interpolate(-translate);
      }

      if (!controlledTranslate || swiper.params.controller.by === 'container') {
        multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
        controlledTranslate = ((translate - swiper.minTranslate()) * multiplier) + c.minTranslate();
      }

      if (swiper.params.controller.inverse) {
        controlledTranslate = c.maxTranslate() - controlledTranslate;
      }
      c.updateProgress(controlledTranslate);
      c.setTranslate(controlledTranslate, swiper);
      c.updateActiveIndex();
      c.updateSlidesClasses();
    }
    if (Array.isArray(controlled)) {
      for (var i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper$2) {
          setControlledTranslate(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper$2 && byController !== controlled) {
      setControlledTranslate(controlled);
    }
  },
  setTransition: function setTransition(duration, byController) {
    var swiper = this;
    var controlled = swiper.controller.control;
    var i;
    function setControlledTransition(c) {
      c.setTransition(duration, swiper);
      if (duration !== 0) {
        c.transitionStart();
        c.$wrapperEl.transitionEnd(function () {
          if (!controlled) { return; }
          if (c.params.loop && swiper.params.controller.by === 'slide') {
            c.loopFix();
          }
          c.transitionEnd();
        });
      }
    }
    if (Array.isArray(controlled)) {
      for (i = 0; i < controlled.length; i += 1) {
        if (controlled[i] !== byController && controlled[i] instanceof Swiper$2) {
          setControlledTransition(controlled[i]);
        }
      }
    } else if (controlled instanceof Swiper$2 && byController !== controlled) {
      setControlledTransition(controlled);
    }
  },
};
var Controller$1 = {
  name: 'controller',
  params: {
    controller: {
      control: undefined,
      inverse: false,
      by: 'slide', // or 'container'
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      controller: {
        control: swiper.params.controller.control,
        getInterpolateFunction: Controller.getInterpolateFunction.bind(swiper),
        setTranslate: Controller.setTranslate.bind(swiper),
        setTransition: Controller.setTransition.bind(swiper),
      },
    });
  },
  on: {
    update: function update() {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      if (swiper.controller.spline) {
        swiper.controller.spline = undefined;
        delete swiper.controller.spline;
      }
    },
    resize: function resize() {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      if (swiper.controller.spline) {
        swiper.controller.spline = undefined;
        delete swiper.controller.spline;
      }
    },
    observerUpdate: function observerUpdate() {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      if (swiper.controller.spline) {
        swiper.controller.spline = undefined;
        delete swiper.controller.spline;
      }
    },
    setTranslate: function setTranslate(translate, byController) {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      swiper.controller.setTranslate(translate, byController);
    },
    setTransition: function setTransition(duration, byController) {
      var swiper = this;
      if (!swiper.controller.control) { return; }
      swiper.controller.setTransition(duration, byController);
    },
  },
};

var a11y = {
  makeElFocusable: function makeElFocusable($el) {
    $el.attr('tabIndex', '0');
    return $el;
  },
  addElRole: function addElRole($el, role) {
    $el.attr('role', role);
    return $el;
  },
  addElLabel: function addElLabel($el, label) {
    $el.attr('aria-label', label);
    return $el;
  },
  disableEl: function disableEl($el) {
    $el.attr('aria-disabled', true);
    return $el;
  },
  enableEl: function enableEl($el) {
    $el.attr('aria-disabled', false);
    return $el;
  },
  onEnterKey: function onEnterKey(e) {
    var swiper = this;
    var params = swiper.params.a11y;
    if (e.keyCode !== 13) { return; }
    var $targetEl = $$1$1(e.target);
    if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
      if (!(swiper.isEnd && !swiper.params.loop)) {
        swiper.slideNext();
      }
      if (swiper.isEnd) {
        swiper.a11y.notify(params.lastSlideMessage);
      } else {
        swiper.a11y.notify(params.nextSlideMessage);
      }
    }
    if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
      if (!(swiper.isBeginning && !swiper.params.loop)) {
        swiper.slidePrev();
      }
      if (swiper.isBeginning) {
        swiper.a11y.notify(params.firstSlideMessage);
      } else {
        swiper.a11y.notify(params.prevSlideMessage);
      }
    }
    if (swiper.pagination && $targetEl.is(("." + (swiper.params.pagination.bulletClass)))) {
      $targetEl[0].click();
    }
  },
  notify: function notify(message) {
    var swiper = this;
    var notification = swiper.a11y.liveRegion;
    if (notification.length === 0) { return; }
    notification.html('');
    notification.html(message);
  },
  updateNavigation: function updateNavigation() {
    var swiper = this;

    if (swiper.params.loop) { return; }
    var ref = swiper.navigation;
    var $nextEl = ref.$nextEl;
    var $prevEl = ref.$prevEl;

    if ($prevEl && $prevEl.length > 0) {
      if (swiper.isBeginning) {
        swiper.a11y.disableEl($prevEl);
      } else {
        swiper.a11y.enableEl($prevEl);
      }
    }
    if ($nextEl && $nextEl.length > 0) {
      if (swiper.isEnd) {
        swiper.a11y.disableEl($nextEl);
      } else {
        swiper.a11y.enableEl($nextEl);
      }
    }
  },
  updatePagination: function updatePagination() {
    var swiper = this;
    var params = swiper.params.a11y;
    if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
      swiper.pagination.bullets.each(function (bulletIndex, bulletEl) {
        var $bulletEl = $$1$1(bulletEl);
        swiper.a11y.makeElFocusable($bulletEl);
        swiper.a11y.addElRole($bulletEl, 'button');
        swiper.a11y.addElLabel($bulletEl, params.paginationBulletMessage.replace(/{{index}}/, $bulletEl.index() + 1));
      });
    }
  },
  init: function init() {
    var swiper = this;

    swiper.$el.append(swiper.a11y.liveRegion);

    // Navigation
    var params = swiper.params.a11y;
    var $nextEl;
    var $prevEl;
    if (swiper.navigation && swiper.navigation.$nextEl) {
      $nextEl = swiper.navigation.$nextEl;
    }
    if (swiper.navigation && swiper.navigation.$prevEl) {
      $prevEl = swiper.navigation.$prevEl;
    }
    if ($nextEl) {
      swiper.a11y.makeElFocusable($nextEl);
      swiper.a11y.addElRole($nextEl, 'button');
      swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
      $nextEl.on('keydown', swiper.a11y.onEnterKey);
    }
    if ($prevEl) {
      swiper.a11y.makeElFocusable($prevEl);
      swiper.a11y.addElRole($prevEl, 'button');
      swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
      $prevEl.on('keydown', swiper.a11y.onEnterKey);
    }

    // Pagination
    if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
      swiper.pagination.$el.on('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
    }
  },
  destroy: function destroy() {
    var swiper = this;
    if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) { swiper.a11y.liveRegion.remove(); }

    var $nextEl;
    var $prevEl;
    if (swiper.navigation && swiper.navigation.$nextEl) {
      $nextEl = swiper.navigation.$nextEl;
    }
    if (swiper.navigation && swiper.navigation.$prevEl) {
      $prevEl = swiper.navigation.$prevEl;
    }
    if ($nextEl) {
      $nextEl.off('keydown', swiper.a11y.onEnterKey);
    }
    if ($prevEl) {
      $prevEl.off('keydown', swiper.a11y.onEnterKey);
    }

    // Pagination
    if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
      swiper.pagination.$el.off('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
    }
  },
};
var A11y = {
  name: 'a11y',
  params: {
    a11y: {
      enabled: false,
      notificationClass: 'swiper-notification',
      prevSlideMessage: 'Previous slide',
      nextSlideMessage: 'Next slide',
      firstSlideMessage: 'This is the first slide',
      lastSlideMessage: 'This is the last slide',
      paginationBulletMessage: 'Go to slide {{index}}',
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      a11y: {
        liveRegion: $$1$1(("<span class=\"" + (swiper.params.a11y.notificationClass) + "\" aria-live=\"assertive\" aria-atomic=\"true\"></span>")),
      },
    });
    Object.keys(a11y).forEach(function (methodName) {
      swiper.a11y[methodName] = a11y[methodName].bind(swiper);
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.init();
      swiper.a11y.updateNavigation();
    },
    toEdge: function toEdge() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.updateNavigation();
    },
    fromEdge: function fromEdge() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.updateNavigation();
    },
    paginationUpdate: function paginationUpdate() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.updatePagination();
    },
    destroy: function destroy() {
      var swiper = this;
      if (!swiper.params.a11y.enabled) { return; }
      swiper.a11y.destroy();
    },
  },
};

var Autoplay = {
  run: function run() {
    var swiper = this;
    var $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
    var delay = swiper.params.autoplay.delay;
    if ($activeSlideEl.attr('data-swiper-autoplay')) {
      delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
    }
    swiper.autoplay.timeout = Utils.nextTick(function () {
      if (swiper.params.loop) {
        swiper.loopFix();
        swiper.slideNext(swiper.params.speed, true, true);
        swiper.emit('autoplay');
      } else if (!swiper.isEnd) {
        swiper.slideNext(swiper.params.speed, true, true);
        swiper.emit('autoplay');
      } else if (!swiper.params.autoplay.stopOnLastSlide) {
        swiper.slideTo(0, swiper.params.speed, true, true);
        swiper.emit('autoplay');
      } else {
        swiper.autoplay.stop();
      }
    }, delay);
  },
  start: function start() {
    var swiper = this;
    if (typeof swiper.autoplay.timeout !== 'undefined') { return false; }
    if (swiper.autoplay.running) { return false; }
    swiper.autoplay.running = true;
    swiper.emit('autoplayStart');
    swiper.autoplay.run();
    return true;
  },
  stop: function stop() {
    var swiper = this;
    if (!swiper.autoplay.running) { return false; }
    if (typeof swiper.autoplay.timeout === 'undefined') { return false; }

    if (swiper.autoplay.timeout) {
      clearTimeout(swiper.autoplay.timeout);
      swiper.autoplay.timeout = undefined;
    }
    swiper.autoplay.running = false;
    swiper.emit('autoplayStop');
    return true;
  },
  pause: function pause(speed) {
    var swiper = this;
    if (!swiper.autoplay.running) { return; }
    if (swiper.autoplay.paused) { return; }
    if (swiper.autoplay.timeout) { clearTimeout(swiper.autoplay.timeout); }
    swiper.autoplay.paused = true;
    if (speed === 0) {
      swiper.autoplay.paused = false;
      swiper.autoplay.run();
    } else {
      swiper.$wrapperEl.transitionEnd(function () {
        if (!swiper || swiper.destroyed) { return; }
        swiper.autoplay.paused = false;
        if (!swiper.autoplay.running) {
          swiper.autoplay.stop();
        } else {
          swiper.autoplay.run();
        }
      });
    }
  },
};

var Autoplay$1 = {
  name: 'autoplay',
  params: {
    autoplay: {
      enabled: false,
      delay: 3000,
      disableOnInteraction: true,
      stopOnLastSlide: false,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      autoplay: {
        running: false,
        paused: false,
        run: Autoplay.run.bind(swiper),
        start: Autoplay.start.bind(swiper),
        stop: Autoplay.stop.bind(swiper),
        pause: Autoplay.pause.bind(swiper),
      },
    });
  },
  on: {
    init: function init() {
      var swiper = this;
      if (swiper.params.autoplay.enabled) {
        swiper.autoplay.start();
      }
    },
    beforeTransitionStart: function beforeTransitionStart(speed, internal) {
      var swiper = this;
      if (swiper.autoplay.running) {
        if (internal || !swiper.params.autoplay.disableOnInteraction) {
          swiper.autoplay.pause(speed);
        } else {
          swiper.autoplay.stop();
        }
      }
    },
    sliderFirstMove: function sliderFirstMove() {
      var swiper = this;
      if (swiper.autoplay.running) {
        if (swiper.params.autoplay.disableOnInteraction) {
          swiper.autoplay.stop();
        } else {
          swiper.autoplay.pause();
        }
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.autoplay.running) {
        swiper.autoplay.stop();
      }
    },
  },
};

var Fade = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var slides = swiper.slides;
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = swiper.slides.eq(i);
      var offset = $slideEl[0].swiperSlideOffset;
      var tx = -offset;
      if (!swiper.params.virtualTranslate) { tx -= swiper.translate; }
      var ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      var slideOpacity = swiper.params.fadeEffect.crossFade ?
        Math.max(1 - Math.abs($slideEl[0].progress), 0) :
        1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
      $slideEl
        .css({
          opacity: slideOpacity,
        })
        .transform(("translate3d(" + tx + "px, " + ty + "px, 0px)"));
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    var slides = swiper.slides;
    var $wrapperEl = swiper.$wrapperEl;
    slides.transition(duration);
    if (swiper.params.virtualTranslate && duration !== 0) {
      var eventTriggered = false;
      slides.transitionEnd(function () {
        if (eventTriggered) { return; }
        if (!swiper || swiper.destroyed) { return; }
        eventTriggered = true;
        swiper.animating = false;
        var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
        for (var i = 0; i < triggerEvents.length; i += 1) {
          $wrapperEl.trigger(triggerEvents[i]);
        }
      });
    }
  },
};

var EffectFade = {
  name: 'effect-fade',
  params: {
    fadeEffect: {
      crossFade: false,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      fadeEffect: {
        setTranslate: Fade.setTranslate.bind(swiper),
        setTransition: Fade.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'fade') { return; }
      swiper.classNames.push(((swiper.params.containerModifierClass) + "fade"));
      var overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'fade') { return; }
      swiper.fadeEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'fade') { return; }
      swiper.fadeEffect.setTransition(duration);
    },
  },
};

var Cube = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var $el = swiper.$el;
    var $wrapperEl = swiper.$wrapperEl;
    var slides = swiper.slides;
    var swiperWidth = swiper.width;
    var swiperHeight = swiper.height;
    var rtl = swiper.rtl;
    var swiperSize = swiper.size;
    var params = swiper.params.cubeEffect;
    var isHorizontal = swiper.isHorizontal();
    var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
    var wrapperRotate = 0;
    var $cubeShadowEl;
    if (params.shadow) {
      if (isHorizontal) {
        $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
        if ($cubeShadowEl.length === 0) {
          $cubeShadowEl = $$1$1('<div class="swiper-cube-shadow"></div>');
          $wrapperEl.append($cubeShadowEl);
        }
        $cubeShadowEl.css({ height: (swiperWidth + "px") });
      } else {
        $cubeShadowEl = $el.find('.swiper-cube-shadow');
        if ($cubeShadowEl.length === 0) {
          $cubeShadowEl = $$1$1('<div class="swiper-cube-shadow"></div>');
          $el.append($cubeShadowEl);
        }
      }
    }
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = slides.eq(i);
      var slideIndex = i;
      if (isVirtual) {
        slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
      }
      var slideAngle = slideIndex * 90;
      var round = Math.floor(slideAngle / 360);
      if (rtl) {
        slideAngle = -slideAngle;
        round = Math.floor(-slideAngle / 360);
      }
      var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
      var tx = 0;
      var ty = 0;
      var tz = 0;
      if (slideIndex % 4 === 0) {
        tx = -round * 4 * swiperSize;
        tz = 0;
      } else if ((slideIndex - 1) % 4 === 0) {
        tx = 0;
        tz = -round * 4 * swiperSize;
      } else if ((slideIndex - 2) % 4 === 0) {
        tx = swiperSize + (round * 4 * swiperSize);
        tz = swiperSize;
      } else if ((slideIndex - 3) % 4 === 0) {
        tx = -swiperSize;
        tz = (3 * swiperSize) + (swiperSize * 4 * round);
      }
      if (rtl) {
        tx = -tx;
      }

      if (!isHorizontal) {
        ty = tx;
        tx = 0;
      }

      var transform = "rotateX(" + (isHorizontal ? 0 : -slideAngle) + "deg) rotateY(" + (isHorizontal ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
      if (progress <= 1 && progress > -1) {
        wrapperRotate = (slideIndex * 90) + (progress * 90);
        if (rtl) { wrapperRotate = (-slideIndex * 90) - (progress * 90); }
      }
      $slideEl.transform(transform);
      if (params.slideShadows) {
        // Set shadows
        var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
        if (shadowBefore.length === 0) {
          shadowBefore = $$1$1(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
          $slideEl.append(shadowBefore);
        }
        if (shadowAfter.length === 0) {
          shadowAfter = $$1$1(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
          $slideEl.append(shadowAfter);
        }
        if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
        if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
      }
    }
    $wrapperEl.css({
      '-webkit-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
      '-moz-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
      '-ms-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
      'transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
    });

    if (params.shadow) {
      if (isHorizontal) {
        $cubeShadowEl.transform(("translate3d(0px, " + ((swiperWidth / 2) + params.shadowOffset) + "px, " + (-swiperWidth / 2) + "px) rotateX(90deg) rotateZ(0deg) scale(" + (params.shadowScale) + ")"));
      } else {
        var shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
        var multiplier = 1.5 - (
          (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2) +
          (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
        );
        var scale1 = params.shadowScale;
        var scale2 = params.shadowScale / multiplier;
        var offset = params.shadowOffset;
        $cubeShadowEl.transform(("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + ((swiperHeight / 2) + offset) + "px, " + (-swiperHeight / 2 / scale2) + "px) rotateX(-90deg)"));
      }
    }
    var zFactor = (Browser.isSafari || Browser.isUiWebView) ? (-swiperSize / 2) : 0;
    $wrapperEl
      .transform(("translate3d(0px,0," + zFactor + "px) rotateX(" + (swiper.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (swiper.isHorizontal() ? -wrapperRotate : 0) + "deg)"));
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    var $el = swiper.$el;
    var slides = swiper.slides;
    slides
      .transition(duration)
      .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
      .transition(duration);
    if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
      $el.find('.swiper-cube-shadow').transition(duration);
    }
  },
};

var EffectCube = {
  name: 'effect-cube',
  params: {
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      cubeEffect: {
        setTranslate: Cube.setTranslate.bind(swiper),
        setTransition: Cube.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'cube') { return; }
      swiper.classNames.push(((swiper.params.containerModifierClass) + "cube"));
      swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
      var overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        resistanceRatio: 0,
        spaceBetween: 0,
        centeredSlides: false,
        virtualTranslate: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'cube') { return; }
      swiper.cubeEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'cube') { return; }
      swiper.cubeEffect.setTransition(duration);
    },
  },
};

var Flip = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var slides = swiper.slides;
    for (var i = 0; i < slides.length; i += 1) {
      var $slideEl = slides.eq(i);
      var progress = $slideEl[0].progress;
      if (swiper.params.flipEffect.limitRotation) {
        progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
      }
      var offset = $slideEl[0].swiperSlideOffset;
      var rotate = -180 * progress;
      var rotateY = rotate;
      var rotateX = 0;
      var tx = -offset;
      var ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
        rotateX = -rotateY;
        rotateY = 0;
      } else if (swiper.rtl) {
        rotateY = -rotateY;
      }

      $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

      if (swiper.params.flipEffect.slideShadows) {
        // Set shadows
        var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
        if (shadowBefore.length === 0) {
          shadowBefore = $$1$1(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>"));
          $slideEl.append(shadowBefore);
        }
        if (shadowAfter.length === 0) {
          shadowAfter = $$1$1(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>"));
          $slideEl.append(shadowAfter);
        }
        if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
        if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
      }
      $slideEl
        .transform(("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)"));
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    var slides = swiper.slides;
    var activeIndex = swiper.activeIndex;
    var $wrapperEl = swiper.$wrapperEl;
    slides
      .transition(duration)
      .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
      .transition(duration);
    if (swiper.params.virtualTranslate && duration !== 0) {
      var eventTriggered = false;
      // eslint-disable-next-line
      slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
        if (eventTriggered) { return; }
        if (!swiper || swiper.destroyed) { return; }
        // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;
        eventTriggered = true;
        swiper.animating = false;
        var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
        for (var i = 0; i < triggerEvents.length; i += 1) {
          $wrapperEl.trigger(triggerEvents[i]);
        }
      });
    }
  },
};

var EffectFlip = {
  name: 'effect-flip',
  params: {
    flipEffect: {
      slideShadows: true,
      limitRotation: true,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      flipEffect: {
        setTranslate: Flip.setTranslate.bind(swiper),
        setTransition: Flip.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'flip') { return; }
      swiper.classNames.push(((swiper.params.containerModifierClass) + "flip"));
      swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
      var overwriteParams = {
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: true,
      };
      Utils.extend(swiper.params, overwriteParams);
      Utils.extend(swiper.originalParams, overwriteParams);
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'flip') { return; }
      swiper.flipEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'flip') { return; }
      swiper.flipEffect.setTransition(duration);
    },
  },
};

var Coverflow = {
  setTranslate: function setTranslate() {
    var swiper = this;
    var swiperWidth = swiper.width;
    var swiperHeight = swiper.height;
    var slides = swiper.slides;
    var $wrapperEl = swiper.$wrapperEl;
    var slidesSizesGrid = swiper.slidesSizesGrid;
    var params = swiper.params.coverflowEffect;
    var isHorizontal = swiper.isHorizontal();
    var transform = swiper.translate;
    var center = isHorizontal ? -transform + (swiperWidth / 2) : -transform + (swiperHeight / 2);
    var rotate = isHorizontal ? params.rotate : -params.rotate;
    var translate = params.depth;
    // Each slide offset from center
    for (var i = 0, length = slides.length; i < length; i += 1) {
      var $slideEl = slides.eq(i);
      var slideSize = slidesSizesGrid[i];
      var slideOffset = $slideEl[0].swiperSlideOffset;
      var offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

      var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
      var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
      // var rotateZ = 0
      var translateZ = -translate * Math.abs(offsetMultiplier);

      var translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
      var translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

      // Fix for ultra small values
      if (Math.abs(translateX) < 0.001) { translateX = 0; }
      if (Math.abs(translateY) < 0.001) { translateY = 0; }
      if (Math.abs(translateZ) < 0.001) { translateZ = 0; }
      if (Math.abs(rotateY) < 0.001) { rotateY = 0; }
      if (Math.abs(rotateX) < 0.001) { rotateX = 0; }

      var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

      $slideEl.transform(slideTransform);
      $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
      if (params.slideShadows) {
        // Set shadows
        var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
        var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
        if ($shadowBeforeEl.length === 0) {
          $shadowBeforeEl = $$1$1(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
          $slideEl.append($shadowBeforeEl);
        }
        if ($shadowAfterEl.length === 0) {
          $shadowAfterEl = $$1$1(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
          $slideEl.append($shadowAfterEl);
        }
        if ($shadowBeforeEl.length) { $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0; }
        if ($shadowAfterEl.length) { $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0; }
      }
    }

    // Set correct perspective for IE10
    if (Browser.ie) {
      var ws = $wrapperEl[0].style;
      ws.perspectiveOrigin = center + "px 50%";
    }
  },
  setTransition: function setTransition(duration) {
    var swiper = this;
    swiper.slides
      .transition(duration)
      .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
      .transition(duration);
  },
};

var EffectCoverflow = {
  name: 'effect-coverflow',
  params: {
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  },
  create: function create() {
    var swiper = this;
    Utils.extend(swiper, {
      coverflowEffect: {
        setTranslate: Coverflow.setTranslate.bind(swiper),
        setTransition: Coverflow.setTransition.bind(swiper),
      },
    });
  },
  on: {
    beforeInit: function beforeInit() {
      var swiper = this;
      if (swiper.params.effect !== 'coverflow') { return; }

      swiper.classNames.push(((swiper.params.containerModifierClass) + "coverflow"));
      swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));

      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      if (swiper.params.effect !== 'coverflow') { return; }
      swiper.coverflowEffect.setTranslate();
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (swiper.params.effect !== 'coverflow') { return; }
      swiper.coverflowEffect.setTransition(duration);
    },
  },
};

// Swiper Class
// Core Modules
// Components
Swiper$2.use([
  Device$4,
  Browser$2,
  Support$4,
  Resize$1,
  Observer$1,
  Virtual$1,
  Navigation$1,
  Pagination$1,
  Scrollbar$1,
  Parallax$1,
  Zoom$1,
  Lazy$3,
  Controller$1,
  A11y,
  Autoplay$1,
  EffectFade,
  EffectCube,
  EffectFlip,
  EffectCoverflow ]);

{
  if (!window.Swiper) {
    window.Swiper = Swiper$2;
  }
}

function initSwipers(swiperEl) {
  var app = this;
  var $swiperEl = $$1$1(swiperEl);
  if ($swiperEl.length === 0) { return; }
  if ($swiperEl[0].swiper) { return; }
  var initialSlide;
  var params = {};
  var isTabs;
  var isRoutableTabs;
  if ($swiperEl.hasClass('tabs-swipeable-wrap')) {
    $swiperEl
      .addClass('swiper-container')
      .children('.tabs')
      .addClass('swiper-wrapper')
      .children('.tab')
      .addClass('swiper-slide');
    initialSlide = $swiperEl.children('.tabs').children('.tab-active').index();
    isTabs = true;
    isRoutableTabs = $swiperEl.find('.tabs-routable').length > 0;
  }
  if ($swiperEl.attr('data-swiper')) {
    params = JSON.parse($swiperEl.attr('data-swiper'));
  } else {
    params = $swiperEl.dataset();
    Object.keys(params).forEach(function (key) {
      var value = params[key];
      if (typeof value === 'string' && value.indexOf('{') === 0 && value.indexOf('}') > 0) {
        try {
          params[key] = JSON.parse(value);
        } catch (e) {
          // not JSON
        }
      }
    });
  }
  if (typeof params.initialSlide === 'undefined' && typeof initialSlide !== 'undefined') {
    params.initialSlide = initialSlide;
  }

  var swiper = app.swiper.create($swiperEl[0], params);
  if (isTabs) {
    swiper.on('slideChange', function () {
      if (isRoutableTabs) {
        var view = app.views.get($swiperEl.parents('.view'));
        if (!view) { view = app.views.main; }
        var router = view.router;
        var tabRoute = router.findTabRoute(swiper.slides.eq(swiper.activeIndex)[0]);
        if (tabRoute) { router.navigate(tabRoute.path); }
      } else {
        app.tab.show({
          tabEl: swiper.slides.eq(swiper.activeIndex),
        });
      }
    });
  }
}

var Swiper = {
  name: 'swiper',
  static: {
    Swiper: Swiper$2,
  },
  create: function create() {
    var app = this;
    app.swiper = ConstructorMethods({
      defaultSelector: '.swiper-container',
      constructor: Swiper$2,
      domProp: 'swiper',
    });
  },
  on: {
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.swiper-init, .tabs-swipeable-wrap').each(function (index, swiperEl) {
        app.swiper.destroy(swiperEl);
      });
    },
    pageMounted: function pageMounted(page) {
      var app = this;
      page.$el.find('.tabs-swipeable-wrap').each(function (index, swiperEl) {
        initSwipers.call(app, swiperEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.swiper-init, .tabs-swipeable-wrap').each(function (index, swiperEl) {
        initSwipers.call(app, swiperEl);
      });
    },
    pageReinit: function pageReinit(page) {
      var app = this;
      page.$el.find('.swiper-init, .tabs-swipeable-wrap').each(function (index, swiperEl) {
        var swiper = app.swiper.get(swiperEl);
        if (swiper && swiper.update) { swiper.update(); }
      });
    },
  },
};

/* eslint indent: ["off"] */
var PhotoBrowser$1 = (function (Framework7Class$$1) {
  function PhotoBrowser(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);

    var pb = this;
    pb.app = app;

    var defaults = Utils.extend({
      on: {},
    }, app.params.photoBrowser);

    // Extend defaults with modules params
    pb.useModulesParams(defaults);

    pb.params = Utils.extend(defaults, params);

    Utils.extend(pb, {
      exposed: false,
      opened: false,
      activeIndex: pb.params.swiper.initialSlide,
      url: pb.params.url,
      view: pb.params.view || app.views.main,
      swipeToClose: {
        allow: true,
        isTouched: false,
        diff: undefined,
        start: undefined,
        current: undefined,
        started: false,
        activeSlide: undefined,
        timeStart: undefined,
      },
    });

    // Install Modules
    pb.useModules();

    // Init
    pb.init();
  }

  if ( Framework7Class$$1 ) PhotoBrowser.__proto__ = Framework7Class$$1;
  PhotoBrowser.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  PhotoBrowser.prototype.constructor = PhotoBrowser;
  PhotoBrowser.prototype.onSlideChange = function onSlideChange (swiper) {
    var pb = this;
    pb.activeIndex = swiper.activeIndex;

    var current = swiper.activeIndex + 1;
    var total = pb.params.virtualSlides ? pb.params.photos.length : swiper.slides.length;
    if (swiper.params.loop) {
      total -= 2;
      current -= swiper.loopedSlides;
      if (current < 1) { current = total + current; }
      if (current > total) { current -= total; }
    }

    var $activeSlideEl = pb.params.virtualSlides
      ? swiper.$wrapperEl.find((".swiper-slide[data-swiper-slide-index=\"" + (swiper.activeIndex) + "\"]"))
      : swiper.slides.eq(swiper.activeIndex);
    var $previousSlideEl = pb.params.virtualSlides
      ? swiper.$wrapperEl.find((".swiper-slide[data-swiper-slide-index=\"" + (swiper.previousIndex) + "\"]"))
      : swiper.slides.eq(swiper.previousIndex);

    var $currentEl = pb.$containerEl.find('.photo-browser-current');
    var $totalEl = pb.$containerEl.find('.photo-browser-total');
    if (pb.params.type === 'page' && pb.params.navbar && $currentEl.length === 0 && pb.app.theme === 'ios') {
      var navbarEl = pb.app.navbar.getElByPage(pb.$containerEl);
      if (navbarEl) {
        $currentEl = $$1$1(navbarEl).find('.photo-browser-current');
        $totalEl = $$1$1(navbarEl).find('.photo-browser-total');
      }
    }
    $currentEl.text(current);
    $totalEl.text(total);

    // Update captions
    if (pb.captions.length > 0) {
      var captionIndex = swiper.params.loop ? $activeSlideEl.attr('data-swiper-slide-index') : pb.activeIndex;
      pb.$captionsContainerEl.find('.photo-browser-caption-active').removeClass('photo-browser-caption-active');
      pb.$captionsContainerEl.find(("[data-caption-index=\"" + captionIndex + "\"]")).addClass('photo-browser-caption-active');
    }

    // Stop Video
    var previousSlideVideo = $previousSlideEl.find('video');
    if (previousSlideVideo.length > 0) {
      if ('pause' in previousSlideVideo[0]) { previousSlideVideo[0].pause(); }
    }
  };
  PhotoBrowser.prototype.onTouchStart = function onTouchStart () {
    var pb = this;
    var swipeToClose = pb.swipeToClose;
    if (!swipeToClose.allow) { return; }
    swipeToClose.isTouched = true;
  };
  PhotoBrowser.prototype.onTouchMove = function onTouchMove (e) {
    var pb = this;
    var swipeToClose = pb.swipeToClose;

    if (!swipeToClose.isTouched) { return; }
    if (!swipeToClose.started) {
      swipeToClose.started = true;
      swipeToClose.start = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      if (pb.params.virtualSlides) {
        swipeToClose.activeSlide = pb.swiper.$wrapperEl.children('.swiper-slide-active');
      } else {
        swipeToClose.activeSlide = pb.swiper.slides.eq(pb.swiper.activeIndex);
      }
      swipeToClose.timeStart = Utils.now();
    }
    e.preventDefault();
    swipeToClose.current = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
    swipeToClose.diff = swipeToClose.start - swipeToClose.current;
    var opacity = 1 - (Math.abs(swipeToClose.diff) / 300);
    var color = pb.exposed || pb.params.theme === 'dark' ? 0 : 255;
    swipeToClose.activeSlide.transform(("translate3d(0," + (-swipeToClose.diff) + "px,0)"));
    pb.swiper.$el.css('background-color', ("rgba(" + color + ", " + color + ", " + color + ", " + opacity + ")")).transition(0);
  };
  PhotoBrowser.prototype.onTouchEnd = function onTouchEnd () {
    var pb = this;
    var swipeToClose = pb.swipeToClose;
    swipeToClose.isTouched = false;
    if (!swipeToClose.started) {
      swipeToClose.started = false;
      return;
    }
    swipeToClose.started = false;
    swipeToClose.allow = false;
    var diff = Math.abs(swipeToClose.diff);
    var timeDiff = (new Date()).getTime() - swipeToClose.timeStart;
    if ((timeDiff < 300 && diff > 20) || (timeDiff >= 300 && diff > 100)) {
      Utils.nextTick(function () {
        if (pb.$containerEl) {
          if (swipeToClose.diff < 0) { pb.$containerEl.addClass('swipe-close-to-bottom'); }
          else { pb.$containerEl.addClass('swipe-close-to-top'); }
        }
        pb.emit('local::swipeToClose', pb);
        pb.close();
        swipeToClose.allow = true;
      });
      return;
    }
    if (diff !== 0) {
      swipeToClose.activeSlide.addClass('photo-browser-transitioning').transitionEnd(function () {
        swipeToClose.allow = true;
        swipeToClose.activeSlide.removeClass('photo-browser-transitioning');
      });
    } else {
      swipeToClose.allow = true;
    }
    pb.swiper.$el.transition('').css('background-color', '');
    swipeToClose.activeSlide.transform('');
  };

  // Render Functions
  PhotoBrowser.prototype.renderNavbar = function renderNavbar () {
    var pb = this;
    if (pb.params.renderNavbar) { return pb.params.renderNavbar.call(pb); }

    var iconsColor = pb.params.iconsColor;
    if (!pb.params.iconsColor && pb.params.theme === 'dark') { iconsColor = 'white'; }

    var backLinkText = pb.app.theme === 'ios' && pb.params.backLinkText ? pb.params.backLinkText : '';

    var isPopup = pb.params.type !== 'page';
    var navbarHtml = ("\n      <div class=\"navbar\">\n        <div class=\"navbar-inner sliding\">\n          <div class=\"left\">\n            <a href=\"#\" class=\"link " + (isPopup ? 'popup-close' : '') + " " + (!backLinkText ? 'icon-only' : '') + " " + (!isPopup ? 'back' : '') + "\" " + (isPopup ? 'data-popup=".photo-browser-popup"' : '') + ">\n              <i class=\"icon icon-back " + (iconsColor ? ("color-" + iconsColor) : '') + "\"></i>\n              " + (backLinkText ? ("<span>" + backLinkText + "</span>") : '') + "\n            </a>\n          </div>\n          <div class=\"title\">\n            <span class=\"photo-browser-current\"></span>\n            <span class=\"photo-browser-of\">" + (pb.params.navbarOfText) + "</span>\n            <span class=\"photo-browser-total\"></span>\n          </div>\n          <div class=\"right\"></div>\n        </div>\n      </div>\n    ").trim();
    return navbarHtml;
  };
  PhotoBrowser.prototype.renderToolbar = function renderToolbar () {
    var pb = this;
    if (pb.params.renderToolbar) { return pb.params.renderToolbar.call(pb); }

    var iconsColor = pb.params.iconsColor;
    if (!pb.params.iconsColor && pb.params.theme === 'dark') { iconsColor = 'white'; }

    var toolbarHtml = ("\n      <div class=\"toolbar tabbar toolbar-bottom-md\">\n        <div class=\"toolbar-inner\">\n          <a href=\"#\" class=\"link photo-browser-prev\">\n            <i class=\"icon icon-back " + (iconsColor ? ("color-" + iconsColor) : '') + "\"></i>\n          </a>\n          <a href=\"#\" class=\"link photo-browser-next\">\n            <i class=\"icon icon-forward " + (iconsColor ? ("color-" + iconsColor) : '') + "\"></i>\n          </a>\n        </div>\n      </div>\n    ").trim();
    return toolbarHtml;
  };
  PhotoBrowser.prototype.renderCaption = function renderCaption (caption, index) {
    var pb = this;
    if (pb.params.renderCaption) { return pb.params.renderCaption.call(pb, caption, index); }
    var captionHtml = ("\n      <div class=\"photo-browser-caption\" data-caption-index=\"" + index + "\">\n        " + caption + "\n      </div>\n    ").trim();
    return captionHtml;
  };
  PhotoBrowser.prototype.renderObject = function renderObject (photo, index) {
    var pb = this;
    if (pb.params.renderObject) { return pb.params.renderObject.call(pb, photo, index); }
    var objHtml = "\n      <div class=\"photo-browser-slide photo-browser-object-slide swiper-slide\" data-swiper-slide-index=\"" + index + "\">" + (photo.html ? photo.html : photo) + "</div>\n    ";
    return objHtml;
  };
  PhotoBrowser.prototype.renderLazyPhoto = function renderLazyPhoto (photo, index) {
    var pb = this;
    if (pb.params.renderLazyPhoto) { return pb.params.renderLazyPhoto.call(pb, photo, index); }
    var photoHtml = ("\n      <div class=\"photo-browser-slide photo-browser-slide-lazy swiper-slide\" data-swiper-slide-index=\"" + index + "\">\n          <div class=\"preloader swiper-lazy-preloader " + (pb.params.theme === 'dark' ? 'color-white' : '') + "\">" + (pb.app.theme === 'md' ? Utils.mdPreloaderContent : '') + "</div>\n          <span class=\"swiper-zoom-container\">\n              <img data-src=\"" + (photo.url ? photo.url : photo) + "\" class=\"swiper-lazy\">\n          </span>\n      </div>\n    ").trim();
    return photoHtml;
  };
  PhotoBrowser.prototype.renderPhoto = function renderPhoto (photo, index) {
    var pb = this;
    if (pb.params.renderPhoto) { return pb.params.renderPhoto.call(pb, photo, index); }
    var photoHtml = ("\n      <div class=\"photo-browser-slide swiper-slide\" data-swiper-slide-index=\"" + index + "\">\n        <span class=\"swiper-zoom-container\">\n          <img src=\"" + (photo.url ? photo.url : photo) + "\">\n        </span>\n      </div>\n    ").trim();
    return photoHtml;
  };
  PhotoBrowser.prototype.render = function render () {
    var pb = this;
    if (pb.params.render) { return pb.params.render.call(pb, pb.params); }
    var html = ("\n      <div class=\"photo-browser photo-browser-" + (pb.params.theme) + "\">\n        <div class=\"view\">\n          <div class=\"page photo-browser-page photo-browser-page-" + (pb.params.theme) + " no-toolbar " + (!pb.params.navbar ? 'no-navbar' : '') + "\" data-name=\"photo-browser-page\">\n            " + (pb.params.navbar ? pb.renderNavbar() : '') + "\n            " + (pb.params.toolbar ? pb.renderToolbar() : '') + "\n            <div class=\"photo-browser-captions photo-browser-captions-" + (pb.params.captionsTheme || pb.params.theme) + "\">\n              " + (pb.params.photos.map(function (photo, index) {
                if (photo.caption) { return pb.renderCaption(photo.caption, index); }
                return '';
              }).join(' ')) + "\n            </div>\n            <div class=\"photo-browser-swiper-container swiper-container\">\n              <div class=\"photo-browser-swiper-wrapper swiper-wrapper\">\n                " + (pb.params.virtualSlides ? '' : pb.params.photos.map(function (photo, index) {
                  if (photo.html || ((typeof photo === 'string' || photo instanceof String) && photo.indexOf('<') >= 0 && photo.indexOf('>') >= 0)) {
                    return pb.renderObject(photo, index);
                  } else if (pb.params.swiper.lazy === true || (pb.params.swiper.lazy && pb.params.swiper.lazy.enabled)) {
                    return pb.renderLazyPhoto(photo, index);
                  }
                  return pb.renderPhoto(photo, index);
                }).join(' ')) + "\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ").trim();
    return html;
  };
  PhotoBrowser.prototype.renderStandalone = function renderStandalone () {
    var pb = this;
    if (pb.params.renderStandalone) { return pb.params.renderStandalone.call(pb); }
    var standaloneHtml = "<div class=\"popup photo-browser-popup photo-browser-standalone popup-tablet-fullscreen\">" + (pb.render()) + "</div>";
    return standaloneHtml;
  };
  PhotoBrowser.prototype.renderPage = function renderPage () {
    var pb = this;
    if (pb.params.renderPage) { return pb.params.renderPage.call(pb); }
    var pageHtml = pb.render();

    return pageHtml;
  };
  PhotoBrowser.prototype.renderPopup = function renderPopup () {
    var pb = this;
    if (pb.params.renderPopup) { return pb.params.renderPopup.call(pb); }
    var popupHtml = "<div class=\"popup photo-browser-popup\">" + (pb.render()) + "</div>";

    return popupHtml;
  };

  // Callbacks
  PhotoBrowser.prototype.onOpen = function onOpen (type, containerEl) {
    var pb = this;
    var app = pb.app;
    var $containerEl = $$1$1(containerEl);

    $containerEl[0].f7PhotoBrowser = pb;

    pb.$containerEl = $containerEl;
    pb.openedIn = type;
    pb.opened = true;

    pb.$swiperContainerEl = pb.$containerEl.find('.photo-browser-swiper-container');
    pb.$swiperWrapperEl = pb.$containerEl.find('.photo-browser-swiper-wrapper');
    pb.slides = pb.$containerEl.find('.photo-browser-slide');
    pb.$captionsContainerEl = pb.$containerEl.find('.photo-browser-captions');
    pb.captions = pb.$containerEl.find('.photo-browser-caption');

    // Init Swiper
    var swiperParams = Utils.extend({}, pb.params.swiper, {
      initialSlide: pb.activeIndex,
      on: {
        tap: function tap(e) {
          pb.emit('local::tap', e);
        },
        click: function click(e) {
          if (pb.params.exposition) {
            pb.expositionToggle();
          }
          pb.emit('local::click', e);
        },
        doubleTap: function doubleTap(e) {
          pb.emit('local::doubleTap', e);
        },
        slideChange: function slideChange() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          var swiper = this;
          pb.onSlideChange(swiper);
          pb.emit.apply(pb, [ 'local::slideChange' ].concat( args ));
        },
        transitionStart: function transitionStart() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          pb.emit.apply(pb, [ 'local::transitionStart' ].concat( args ));
        },
        transitionEnd: function transitionEnd() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          pb.emit.apply(pb, [ 'local::transitionEnd' ].concat( args ));
        },
        slideChangeStart: function slideChangeStart() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          pb.emit.apply(pb, [ 'local::slideChangeTransitionStart' ].concat( args ));
        },
        slideChangeEnd: function slideChangeEnd() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          pb.emit.apply(pb, [ 'local::slideChangeTransitionEnd' ].concat( args ));
        },
        lazyImageLoad: function lazyImageLoad() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          pb.emit.apply(pb, [ 'local::lazyImageLoad' ].concat( args ));
        },
        lazyImageReady: function lazyImageReady() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          var slideEl = args[0];
          $$1$1(slideEl).removeClass('photo-browser-slide-lazy');
          pb.emit.apply(pb, [ 'local::lazyImageReady' ].concat( args ));
        },
      },
    });
    if (pb.params.swipeToClose && pb.params.type !== 'page') {
      Utils.extend(swiperParams.on, {
        touchStart: function touchStart(e) {
          pb.onTouchStart(e);
          pb.emit('local::touchStart', e);
        },
        touchMoveOpposite: function touchMoveOpposite(e) {
          pb.onTouchMove(e);
          pb.emit('local::touchMoveOpposite', e);
        },
        touchEnd: function touchEnd(e) {
          pb.onTouchEnd(e);
          pb.emit('local::touchEnd', e);
        },
      });
    }
    if (pb.params.virtualSlides) {
      Utils.extend(swiperParams, {
        virtual: {
          slides: pb.params.photos,
          renderSlide: function renderSlide(photo, index) {
            if (photo.html || ((typeof photo === 'string' || photo instanceof String) && photo.indexOf('<') >= 0 && photo.indexOf('>') >= 0)) {
              return pb.renderObject(photo, index);
            } else if (pb.params.swiper.lazy === true || (pb.params.swiper.lazy && pb.params.swiper.lazy.enabled)) {
              return pb.renderLazyPhoto(photo, index);
            }
            return pb.renderPhoto(photo, index);
          },
        },
      });
    }

    pb.swiper = app.swiper.create(pb.$swiperContainerEl, swiperParams);

    if (pb.activeIndex === 0) {
      pb.onSlideChange(pb.swiper);
    }

    pb.emit('local::open photoBrowserOpen', pb);
  };
  PhotoBrowser.prototype.onOpened = function onOpened () {
    var pb = this;

    pb.emit('local::opened photoBrowserOpened', pb);
  };
  PhotoBrowser.prototype.onClose = function onClose () {
    var pb = this;
    if (pb.destroyed) { return; }

    // Destroy Swiper
    if (pb.swiper && pb.swiper.destroy) {
      pb.swiper.destroy(true, false);
      pb.swiper = null;
      delete pb.swiper;
    }

    pb.emit('local::close photoBrowserClose', pb);
  };
  PhotoBrowser.prototype.onClosed = function onClosed () {
    var pb = this;
    if (pb.destroyed) { return; }
    pb.opened = false;
    pb.$containerEl = null;
    delete pb.$containerEl;

    pb.emit('local::closed photoBrowserClosed', pb);
  };

  // Open
  PhotoBrowser.prototype.openPage = function openPage () {
    var pb = this;
    if (pb.opened) { return pb; }

    var pageHtml = pb.renderPage();

    pb.view.router.navigate({
      url: pb.url,
      route: {
        content: pageHtml,
        path: pb.url,
        on: {
          pageBeforeIn: function pageBeforeIn(e, page) {
            pb.view.$el.addClass(("with-photo-browser-page with-photo-browser-page-" + (pb.params.theme)));
            pb.onOpen('page', page.el);
          },
          pageAfterIn: function pageAfterIn(e, page) {
            pb.onOpened('page', page.el);
          },
          pageBeforeOut: function pageBeforeOut(e, page) {
            pb.view.$el.removeClass(("with-photo-browser-page with-photo-browser-page-exposed with-photo-browser-page-" + (pb.params.theme)));
            pb.onClose('page', page.el);
          },
          pageAfterOut: function pageAfterOut(e, page) {
            pb.onClosed('page', page.el);
          },
        },
      },
    });
    return pb;
  };

  PhotoBrowser.prototype.openStandalone = function openStandalone () {
    var pb = this;
    if (pb.opened) { return pb; }

    var standaloneHtml = pb.renderStandalone();

    var popupParams = {
      backdrop: false,
      content: standaloneHtml,
      on: {
        popupOpen: function popupOpen(popup) {
          pb.onOpen('popup', popup.el);
        },
        popupOpened: function popupOpened(popup) {
          pb.onOpened('popup', popup.el);
        },
        popupClose: function popupClose(popup) {
          pb.onClose('popup', popup.el);
        },
        popupClosed: function popupClosed(popup) {
          pb.onClosed('popup', popup.el);
        },
      },
    };

    if (pb.params.routableModals) {
      pb.view.router.navigate({
        url: pb.url,
        route: {
          path: pb.url,
          popup: popupParams,
        },
      });
    } else {
      pb.modal = pb.app.popup.create(popupParams).open();
    }
    return pb;
  };

  PhotoBrowser.prototype.openPopup = function openPopup () {
    var pb = this;
    if (pb.opened) { return pb; }

    var popupHtml = pb.renderPopup();

    var popupParams = {
      content: popupHtml,
      on: {
        popupOpen: function popupOpen(popup) {
          pb.onOpen('popup', popup.el);
        },
        popupOpened: function popupOpened(popup) {
          pb.onOpened('popup', popup.el);
        },
        popupClose: function popupClose(popup) {
          pb.onClose('popup', popup.el);
        },
        popupClosed: function popupClosed(popup) {
          pb.onClosed('popup', popup.el);
        },
      },
    };

    if (pb.params.routableModals) {
      pb.view.router.navigate({
        url: pb.url,
        route: {
          path: pb.url,
          popup: popupParams,
        },
      });
    } else {
      pb.modal = pb.app.popup.create(popupParams).open();
    }
    return pb;
  };

  // Exposition
  PhotoBrowser.prototype.expositionEnable = function expositionEnable () {
    var pb = this;
    if (pb.params.type === 'page') {
      pb.view.$el.addClass('with-photo-browser-page-exposed');
    }
    if (pb.$containerEl) { pb.$containerEl.addClass('photo-browser-exposed'); }
    if (pb.params.expositionHideCaptions) { pb.$captionsContainerEl.addClass('photo-browser-captions-exposed'); }
    pb.exposed = true;
    return pb;
  };
  PhotoBrowser.prototype.expositionDisable = function expositionDisable () {
    var pb = this;
    if (pb.params.type === 'page') {
      pb.view.$el.removeClass('with-photo-browser-page-exposed');
    }
    if (pb.$containerEl) { pb.$containerEl.removeClass('photo-browser-exposed'); }
    if (pb.params.expositionHideCaptions) { pb.$captionsContainerEl.removeClass('photo-browser-captions-exposed'); }
    pb.exposed = false;
    return pb;
  };
  PhotoBrowser.prototype.expositionToggle = function expositionToggle () {
    var pb = this;
    if (pb.params.type === 'page') {
      pb.view.$el.toggleClass('with-photo-browser-page-exposed');
    }
    if (pb.$containerEl) { pb.$containerEl.toggleClass('photo-browser-exposed'); }
    if (pb.params.expositionHideCaptions) { pb.$captionsContainerEl.toggleClass('photo-browser-captions-exposed'); }
    pb.exposed = !pb.exposed;
    return pb;
  };
  PhotoBrowser.prototype.open = function open (index) {
    var pb = this;
    var type = pb.params.type;
    if (pb.opened) {
      if (pb.swiper && typeof index !== 'undefined') {
        pb.swiper.slideTo(parseInt(index, 10));
      }
      return pb;
    } else if (typeof index !== 'undefined') {
      pb.activeIndex = index;
    }
    if (type === 'standalone') {
      pb.openStandalone();
    }
    if (type === 'page') {
      pb.openPage();
    }
    if (type === 'popup') {
      pb.openPopup();
    }
    return pb;
  };
  PhotoBrowser.prototype.close = function close () {
    var pb = this;
    if (!pb.opened) { return pb; }
    if (pb.params.routableModals || pb.openedIn === 'page') {
      if (pb.view) { pb.view.router.back(); }
    } else {
      pb.modal.once('modalClosed', function () {
        Utils.nextTick(function () {
          pb.modal.destroy();
          delete pb.modal;
        });
      });
      pb.modal.close();
    }
    return pb;
  };
  // eslint-disable-next-line
  PhotoBrowser.prototype.init = function init () {};
  PhotoBrowser.prototype.destroy = function destroy () {
    var pb = this;
    pb.emit('local::beforeDestroy photoBrowserBeforeDestroy', pb);
    if (pb.$containerEl) {
      pb.$containerEl.trigger('photobrowser:beforedestroy');
      delete pb.$containerEl[0].f7PhotoBrowser;
    }
    Utils.deleteProps(pb);
    pb = null;
  };

  return PhotoBrowser;
}(Framework7Class));

var PhotoBrowser = {
  name: 'photoBrowser',
  params: {
    photoBrowser: {
      photos: [],
      exposition: true,
      expositionHideCaptions: false,
      type: 'standalone',
      navbar: true,
      toolbar: true,
      theme: 'light',
      captionsTheme: undefined,
      iconsColor: undefined,
      swipeToClose: true,
      backLinkText: 'Close',
      navbarOfText: 'of',
      view: undefined,
      url: 'photos/',
      routableModals: true,
      virtualSlides: true,

      renderNavbar: undefined,
      renderToolbar: undefined,
      renderCaption: undefined,
      renderObject: undefined,
      renderLazyPhoto: undefined,
      renderPhoto: undefined,
      renderPage: undefined,
      renderPopup: undefined,
      renderStandalone: undefined,

      swiper: {
        initialSlide: 0,
        spaceBetween: 20,
        speed: 300,
        loop: false,
        preloadImages: true,
        navigation: {
          nextEl: '.photo-browser-next',
          prevEl: '.photo-browser-prev',
        },
        zoom: {
          enabled: true,
          maxRatio: 3,
          minRatio: 1,
        },
        lazy: {
          enabled: true,
        },
      },
    },
  },
  create: function create() {
    var app = this;
    app.photoBrowser = ConstructorMethods({
      defaultSelector: '.photo-browser',
      constructor: PhotoBrowser$1,
      app: app,
      domProp: 'f7PhotoBrowser',
    });
  },
  static: {
    PhotoBrowser: PhotoBrowser$1,
  },
};

var Notification$1 = (function (Modal) {
  function Notification(app, params) {
    var extendedParams = Utils.extend({
      on: {},
    }, app.params.notification, params);

    // Extends with open/close Modal methods;
    Modal.call(this, app, extendedParams);

    var notification = this;

    notification.app = app;

    notification.params = extendedParams;

    var ref = notification.params;
    var icon = ref.icon;
    var title = ref.title;
    var titleRightText = ref.titleRightText;
    var subtitle = ref.subtitle;
    var text = ref.text;
    var closeButton = ref.closeButton;
    var closeTimeout = ref.closeTimeout;
    var cssClass = ref.cssClass;
    var closeOnClick = ref.closeOnClick;

    var $el;
    if (!notification.params.el) {
      // Find Element
      var notificationHtml = notification.render({
        icon: icon,
        title: title,
        titleRightText: titleRightText,
        subtitle: subtitle,
        text: text,
        closeButton: closeButton,
        cssClass: cssClass,
      });

      $el = $$1$1(notificationHtml);
    } else {
      $el = $$1$1(notification.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return notification.destroy();
    }

    Utils.extend(notification, {
      $el: $el,
      el: $el[0],
      type: 'notification',
    });

    $el[0].f7Modal = notification;

    if (closeButton) {
      $el.find('.notification-close-button').on('click', function () {
        notification.close();
      });
    }
    $el.on('click', function (e) {
      if (closeButton && $$1$1(e.target).closest('.notification-close-button').length) {
        return;
      }
      notification.emit('local::click notificationClick', notification);
      if (closeOnClick) { notification.close(); }
    });

    notification.on('beforeDestroy', function () {
      $el.off('click');
    });

    /* Touch Events */
    var isTouched;
    var isMoved;
    var isScrolling;
    var touchesDiff;
    var touchStartTime;
    var notificationHeight;
    var touchesStart = {};
    function handleTouchStart(e) {
      if (isTouched) { return; }
      isTouched = true;
      isMoved = false;
      isScrolling = undefined;
      touchStartTime = Utils.now();
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    }
    function handleTouchMove(e) {
      if (!isTouched) { return; }
      var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) < Math.abs(pageX - touchesStart.x));
      }
      if (isScrolling) {
        isTouched = false;
        return;
      }
      e.preventDefault();
      if (!isMoved) {
        notification.$el.removeClass('notification-transitioning');
        notification.$el.transition(0);
        notificationHeight = notification.$el[0].offsetHeight / 2;
      }
      isMoved = true;
      touchesDiff = (pageY - touchesStart.y);
      var newTranslate = touchesDiff;
      if (touchesDiff > 0) {
        newTranslate = Math.pow( touchesDiff, 0.8 );
      }
      notification.$el.transform(("translate3d(0, " + newTranslate + "px, 0)"));
    }
    function handleTouchEnd() {
      if (!isTouched || !isMoved) {
        isTouched = false;
        isMoved = false;
        return;
      }
      isTouched = false;
      isMoved = false;
      if (touchesDiff === 0) {
        return;
      }

      var timeDiff = Utils.now() - touchStartTime;
      notification.$el.transition('');
      notification.$el.addClass('notification-transitioning');
      notification.$el.transform('');

      if (
        (touchesDiff < -10 && timeDiff < 300) ||
        (-touchesDiff >= notificationHeight / 1)
      ) {
        notification.close();
      }
    }

    function attachTouchEvents() {
      {
        notification.$el.on(app.touchEvents.start, handleTouchStart, { passive: true });
        app.on('touchmove:active', handleTouchMove);
        app.on('touchend:passive', handleTouchEnd);
      }
    }
    function detachTouchEvents() {
      {
        notification.$el.off(app.touchEvents.start, handleTouchStart, { passive: true });
        app.off('touchmove:active', handleTouchMove);
        app.off('touchend:passive', handleTouchEnd);
      }
    }

    var timeoutId;
    function closeOnTimeout() {
      timeoutId = Utils.nextTick(function () {
        if (isTouched && isMoved) {
          closeOnTimeout();
          return;
        }
        notification.close();
      }, closeTimeout);
    }
    notification.on('open', function () {
      if (notification.params.swipeToClose) {
        attachTouchEvents();
      }
      $$1$1('.notification.modal-in').each(function (index, openedEl) {
        var notificationInstance = app.notification.get(openedEl);
        if (openedEl !== notification.el && notificationInstance) {
          notificationInstance.close();
        }
      });
      if (closeTimeout) {
        closeOnTimeout();
      }
    });
    notification.on('close beforeDestroy', function () {
      if (notification.params.swipeToClose) {
        detachTouchEvents();
      }
      window.clearTimeout(timeoutId);
    });

    return notification;
  }

  if ( Modal ) Notification.__proto__ = Modal;
  Notification.prototype = Object.create( Modal && Modal.prototype );
  Notification.prototype.constructor = Notification;
  Notification.prototype.render = function render () {
    var notification = this;
    if (notification.params.render) { return notification.params.render.call(notification, notification); }
    var ref = notification.params;
    var icon = ref.icon;
    var title = ref.title;
    var titleRightText = ref.titleRightText;
    var subtitle = ref.subtitle;
    var text = ref.text;
    var closeButton = ref.closeButton;
    var cssClass = ref.cssClass;
    return ("\n      <div class=\"notification " + (cssClass || '') + "\">\n        <div class=\"notification-header\">\n          " + (icon ? ("<div class=\"notification-icon\">" + icon + "</div>") : '') + "\n          " + (title ? ("<div class=\"notification-title\">" + title + "</div>") : '') + "\n          " + (titleRightText ? ("<div class=\"notification-title-right-text\">" + titleRightText + "</div>") : '') + "\n          " + (closeButton ? '<span class="notification-close-button"></span>' : '') + "\n        </div>\n        <div class=\"notification-content\">\n          " + (subtitle ? ("<div class=\"notification-subtitle\">" + subtitle + "</div>") : '') + "\n          " + (text ? ("<div class=\"notification-text\">" + text + "</div>") : '') + "\n        </div>\n      </div>\n    ").trim();
  };

  return Notification;
}(Modal$1));

var Notification = {
  name: 'notification',
  static: {
    Notification: Notification$1,
  },
  create: function create() {
    var app = this;
    app.notification = Utils.extend(
      {},
      ModalMethods({
        app: app,
        constructor: Notification$1,
        defaultSelector: '.notification.modal-in',
      })
    );
  },
  params: {
    notification: {
      icon: null,
      title: null,
      titleRightText: null,
      subtitle: null,
      text: null,
      closeButton: false,
      closeTimeout: null,
      closeOnClick: false,
      swipeToClose: true,
      cssClass: null,
      render: null,
    },
  },
};

/* eslint "no-useless-escape": "off" */
var Autocomplete$1 = (function (Framework7Class$$1) {
  function Autocomplete(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);

    var ac = this;
    ac.app = app;

    var defaults = Utils.extend({
      on: {},
    }, app.modules.autocomplete.params.autocomplete);


    // Extend defaults with modules params
    ac.useModulesParams(defaults);

    ac.params = Utils.extend(defaults, params);

    var $openerEl;
    if (ac.params.openerEl) {
      $openerEl = $$1$1(ac.params.openerEl);
      if ($openerEl.length) { $openerEl[0].f7Autocomplete = ac; }
    }

    var $inputEl;
    if (ac.params.inputEl) {
      $inputEl = $$1$1(ac.params.inputEl);
      if ($inputEl.length) { $inputEl[0].f7Autocomplete = ac; }
    }

    var view;
    if (ac.params.view) {
      view = ac.params.view;
    } else if ($openerEl || $inputEl) {
      view = app.views.get($openerEl || $inputEl);
    }
    if (!view) { view = app.views.main; }

    var id = Utils.now();

    var url = params.url;
    if (!url && $openerEl && $openerEl.length) {
      if ($openerEl.attr('href')) { url = $openerEl.attr('href'); }
      else if ($openerEl.find('a').length > 0) {
        url = $openerEl.find('a').attr('href');
      }
    }
    if (!url || url === '#' || url === '') { url = ac.params.url; }

    var inputType = ac.params.multiple ? 'checkbox' : 'radio';

    Utils.extend(ac, {
      $openerEl: $openerEl,
      openerEl: $openerEl && $openerEl[0],
      $inputEl: $inputEl,
      inputEl: $inputEl && $inputEl[0],
      id: id,
      view: view,
      url: url,
      value: ac.params.value || [],
      inputType: inputType,
      inputName: (inputType + "-" + id),
      $modalEl: undefined,
      $dropdownEl: undefined,
    });

    var previousQuery = '';
    function onInputChange() {
      var query = ac.$inputEl.val().trim();

      if (!ac.params.source) { return; }
      ac.params.source.call(ac, query, function (items) {
        var itemsHTML = '';
        var limit = ac.params.limit ? Math.min(ac.params.limit, items.length) : items.length;
        ac.items = items;
        var regExp;
        if (ac.params.highlightMatches) {
          query = query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
          regExp = new RegExp(("(" + query + ")"), 'i');
        }

        var firstValue;
        var firstItem;
        for (var i = 0; i < limit; i += 1) {
          var itemValue = typeof items[i] === 'object' ? items[i][ac.params.valueProperty] : items[i];
          var itemText = typeof items[i] === 'object' ? items[i][ac.params.textProperty] : items[i];
          if (i === 0) {
            firstValue = itemValue;
            firstItem = ac.items[i];
          }
          itemsHTML += ac.renderItem({
            value: itemValue,
            text: ac.params.highlightMatches ? itemText.replace(regExp, '<b>$1</b>') : itemText,
          }, i);
        }
        if (itemsHTML === '' && query === '' && ac.params.dropdownPlaceholderText) {
          itemsHTML += ac.renderItem({
            placeholder: true,
            text: ac.params.dropdownPlaceholderText,
          });
        }
        ac.$dropdownEl.find('ul').html(itemsHTML);
        if (ac.params.typeahead) {
          if (!firstValue || !firstItem) {
            return;
          }
          if (firstValue.toLowerCase().indexOf(query.toLowerCase()) !== 0) {
            return;
          }
          if (previousQuery.toLowerCase() === query.toLowerCase()) {
            ac.value = [];
            return;
          }

          if (previousQuery.toLowerCase().indexOf(query.toLowerCase()) === 0) {
            previousQuery = query;
            ac.value = [];
            return;
          }
          $inputEl.val(firstValue);
          $inputEl[0].setSelectionRange(query.length, firstValue.length);

          var previousValue = typeof ac.value[0] === 'object' ? ac.value[0][ac.params.valueProperty] : ac.value[0];
          if (!previousValue || firstValue.toLowerCase() !== previousValue.toLowerCase()) {
            ac.value = [firstItem];
            ac.emit('local::change autocompleteChange', [firstItem]);
          }
        }

        previousQuery = query;
      });
    }
    function onPageInputChange() {
      var input = this;
      var value = input.value;
      var isValues = $$1$1(input).parents('.autocomplete-values').length > 0;
      var item;
      var itemValue;
      var aValue;
      if (isValues) {
        if (ac.inputType === 'checkbox' && !input.checked) {
          for (var i = 0; i < ac.value.length; i += 1) {
            aValue = typeof ac.value[i] === 'string' ? ac.value[i] : ac.value[i][ac.params.valueProperty];
            if (aValue === value || aValue * 1 === value * 1) {
              ac.value.splice(i, 1);
            }
          }
          ac.updateValues();
          ac.emit('local::change autocompleteChange', ac.value);
        }
        return;
      }

      // Find Related Item
      for (var i$1 = 0; i$1 < ac.items.length; i$1 += 1) {
        itemValue = typeof ac.items[i$1] === 'object' ? ac.items[i$1][ac.params.valueProperty] : ac.items[i$1];
        if (itemValue === value || itemValue * 1 === value * 1) { item = ac.items[i$1]; }
      }
      if (ac.inputType === 'radio') {
        ac.value = [item];
      } else if (input.checked) {
        ac.value.push(item);
      } else {
        for (var i$2 = 0; i$2 < ac.value.length; i$2 += 1) {
          aValue = typeof ac.value[i$2] === 'object' ? ac.value[i$2][ac.params.valueProperty] : ac.value[i$2];
          if (aValue === value || aValue * 1 === value * 1) {
            ac.value.splice(i$2, 1);
          }
        }
      }

      // Update Values Block
      ac.updateValues();

      // On Select Callback
      if (((ac.inputType === 'radio' && input.checked) || ac.inputType === 'checkbox')) {
        ac.emit('local::change autocompleteChange', ac.value);
      }
    }
    function onHtmlClick(e) {
      var $targetEl = $$1$1(e.target);
      if ($targetEl.is(ac.$inputEl[0]) || ($targetEl.closest(ac.$dropdownEl[0]).length)) { return; }
      ac.close();
    }
    function onOpenerClick() {
      ac.open();
    }
    function onInputFocus() {
      ac.open();
    }
    function onInputBlur() {
      if (ac.$dropdownEl.find('label.active-state').length > 0) { return; }
      ac.close();
    }
    function onResize() {
      ac.positionDropDown();
    }

    function onKeyDown(e) {
      if (ac.opened && e.keyCode === 13) {
        e.preventDefault();
        ac.$inputEl.blur();
      }
    }
    function onDropdownclick() {
      var $clickedEl = $$1$1(this);
      var clickedItem;
      for (var i = 0; i < ac.items.length; i += 1) {
        var itemValue = typeof ac.items[i] === 'object' ? ac.items[i][ac.params.valueProperty] : ac.items[i];
        var value = $clickedEl.attr('data-value');
        if (itemValue === value || itemValue * 1 === value * 1) {
          clickedItem = ac.items[i];
        }
      }
      if (ac.params.updateInputValueOnSelect) {
        ac.$inputEl.val(typeof clickedItem === 'object' ? clickedItem[ac.params.valueProperty] : clickedItem);
        ac.$inputEl.trigger('input change');
      }
      ac.value = [clickedItem];
      ac.emit('local::change autocompleteChange', [clickedItem]);

      ac.close();
    }

    ac.attachEvents = function attachEvents() {
      if (ac.params.openIn !== 'dropdown' && ac.$openerEl) {
        ac.$openerEl.on('click', onOpenerClick);
      }
      if (ac.params.openIn === 'dropdown' && ac.$inputEl) {
        ac.$inputEl.on('focus', onInputFocus);
        ac.$inputEl.on('input', onInputChange);
        if (app.device.android) {
          $$1$1('html').on('click', onHtmlClick);
        } else {
          ac.$inputEl.on('blur', onInputBlur);
        }
        if (ac.params.typeahead) {
          ac.$inputEl.on('keydown', onKeyDown);
        }
      }
    };
    ac.detachEvents = function attachEvents() {
      if (ac.params.openIn !== 'dropdown' && ac.$openerEl) {
        ac.$openerEl.off('click', onOpenerClick);
      }
      if (ac.params.openIn === 'dropdown' && ac.$inputEl) {
        ac.$inputEl.off('focus', onInputFocus);
        ac.$inputEl.off('input', onInputChange);
        if (app.device.android) {
          $$1$1('html').off('click', onHtmlClick);
        } else {
          ac.$inputEl.off('blur', onInputBlur);
        }
        if (ac.params.typeahead) {
          ac.$inputEl.off('keydown', onKeyDown);
        }
      }
    };
    ac.attachDropdownEvents = function attachDropdownEvents() {
      ac.$dropdownEl.on('click', 'label', onDropdownclick);
      app.on('resize', onResize);
    };
    ac.detachDropdownEvents = function detachDropdownEvents() {
      ac.$dropdownEl.off('click', 'label', onDropdownclick);
      app.off('resize', onResize);
    };

    ac.attachPageEvents = function attachPageEvents() {
      ac.$containerEl.on('change', 'input[type="radio"], input[type="checkbox"]', onPageInputChange);
      if (ac.params.closeOnSelect && !ac.params.multiple) {
        ac.$containerEl.once('click', '.list label', function () {
          Utils.nextTick(function () {
            ac.close();
          });
        });
      }
    };
    ac.detachPageEvents = function detachPageEvents() {
      ac.$containerEl.off('change', 'input[type="radio"], input[type="checkbox"]', onPageInputChange);
    };

    // Install Modules
    ac.useModules();

    // Init
    ac.init();

    return ac;
  }

  if ( Framework7Class$$1 ) Autocomplete.__proto__ = Framework7Class$$1;
  Autocomplete.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Autocomplete.prototype.constructor = Autocomplete;
  Autocomplete.prototype.positionDropDown = function positionDropDown () {
    var obj;

    var ac = this;
    var $inputEl = ac.$inputEl;
    var app = ac.app;
    var $dropdownEl = ac.$dropdownEl;

    var $pageContentEl = $inputEl.parents('.page-content');
    if ($pageContentEl.length === 0) { return; }
    var inputOffset = $inputEl.offset();
    var inputOffsetWidth = $inputEl[0].offsetWidth;
    var inputOffsetHeight = $inputEl[0].offsetHeight;
    var $listEl = $inputEl.parents('.list');
    var listOffset = $listEl.offset();
    var paddingBottom = parseInt($pageContentEl.css('padding-top'), 10);
    var listOffsetLeft = $listEl.length > 0 ? listOffset.left - $listEl.parent().offset().left : 0;
    var inputOffsetLeft = inputOffset.left - ($listEl.length > 0 ? listOffset.left : 0) - (app.rtl ? 0 : 0);
    var inputOffsetTop = inputOffset.top - ($pageContentEl.offset().top - $pageContentEl[0].scrollTop);
    var maxHeight = $pageContentEl[0].scrollHeight - paddingBottom - (inputOffsetTop + $pageContentEl[0].scrollTop) - $inputEl[0].offsetHeight;

    var paddingProp = app.rtl ? 'padding-right' : 'padding-left';
    var paddingValue;
    if ($listEl.length && !ac.params.expandInput) {
      paddingValue = (app.rtl ? $listEl[0].offsetWidth - inputOffsetLeft - inputOffsetWidth : inputOffsetLeft) - (app.theme === 'md' ? 16 : 15);
    }


    $dropdownEl.css({
      left: (($listEl.length > 0 ? listOffsetLeft : inputOffsetLeft) + "px"),
      top: ((inputOffsetTop + $pageContentEl[0].scrollTop + inputOffsetHeight) + "px"),
      width: (($listEl.length > 0 ? $listEl[0].offsetWidth : inputOffsetWidth) + "px"),
    });
    $dropdownEl.children('.autocomplete-dropdown-inner').css(( obj = {
      maxHeight: (maxHeight + "px")
    }, obj[paddingProp] = $listEl.length > 0 && !ac.params.expandInput ? (paddingValue + "px") : '', obj ));
  };
  Autocomplete.prototype.focus = function focus () {
    var ac = this;
    ac.$containerEl.find('input[type=search]').focus();
  };
  Autocomplete.prototype.source = function source (query) {
    var ac = this;
    if (!ac.params.source) { return; }

    var $containerEl = ac.$containerEl;

    ac.params.source.call(ac, query, function (items) {
      var itemsHTML = '';
      var limit = ac.params.limit ? Math.min(ac.params.limit, items.length) : items.length;
      ac.items = items;
      for (var i = 0; i < limit; i += 1) {
        var selected = false;
        var itemValue = typeof items[i] === 'object' ? items[i][ac.params.valueProperty] : items[i];
        for (var j = 0; j < ac.value.length; j += 1) {
          var aValue = typeof ac.value[j] === 'object' ? ac.value[j][ac.params.valueProperty] : ac.value[j];
          if (aValue === itemValue || aValue * 1 === itemValue * 1) { selected = true; }
        }
        itemsHTML += ac.renderItem({
          value: itemValue,
          text: typeof items[i] === 'object' ? items[i][ac.params.textProperty] : items[i],
          inputType: ac.inputType,
          id: ac.id,
          inputName: ac.inputName,
          selected: selected,
        }, i);
      }
      $containerEl.find('.autocomplete-found ul').html(itemsHTML);
      if (items.length === 0) {
        if (query.length !== 0) {
          $containerEl.find('.autocomplete-not-found').show();
          $containerEl.find('.autocomplete-found, .autocomplete-values').hide();
        } else {
          $containerEl.find('.autocomplete-values').show();
          $containerEl.find('.autocomplete-found, .autocomplete-not-found').hide();
        }
      } else {
        $containerEl.find('.autocomplete-found').show();
        $containerEl.find('.autocomplete-not-found, .autocomplete-values').hide();
      }
    });
  };
  Autocomplete.prototype.updateValues = function updateValues () {
    var ac = this;
    var valuesHTML = '';
    for (var i = 0; i < ac.value.length; i += 1) {
      valuesHTML += ac.renderItem({
        value: typeof ac.value[i] === 'object' ? ac.value[i][ac.params.valueProperty] : ac.value[i],
        text: typeof ac.value[i] === 'object' ? ac.value[i][ac.params.textProperty] : ac.value[i],
        inputType: ac.inputType,
        id: ac.id,
        inputName: ((ac.inputName) + "-checked}"),
        selected: true,
      }, i);
    }
    ac.$containerEl.find('.autocomplete-values ul').html(valuesHTML);
  };
  Autocomplete.prototype.preloaderHide = function preloaderHide () {
    var ac = this;
    if (ac.params.openIn === 'dropdown' && ac.$dropdownEl) {
      ac.$dropdownEl.find('.autocomplete-preloader').removeClass('autocomplete-preloader-visible');
    } else {
      $$1$1('.autocomplete-preloader').removeClass('autocomplete-preloader-visible');
    }
  };
  Autocomplete.prototype.preloaderShow = function preloaderShow () {
    var ac = this;
    if (ac.params.openIn === 'dropdown' && ac.$dropdownEl) {
      ac.$dropdownEl.find('.autocomplete-preloader').addClass('autocomplete-preloader-visible');
    } else {
      $$1$1('.autocomplete-preloader').addClass('autocomplete-preloader-visible');
    }
  };
  Autocomplete.prototype.renderPreloader = function renderPreloader () {
    var ac = this;
    return ("\n      <div class=\"autocomplete-preloader preloader " + (ac.params.preloaderColor ? ("color-" + (ac.params.preloaderColor)) : '') + "\">" + (ac.app.theme === 'md' ? Utils.mdPreloaderContent : '') + "</div>\n    ").trim();
  };
  Autocomplete.prototype.renderSearchbar = function renderSearchbar () {
    var ac = this;
    if (ac.params.renderSearchbar) { return ac.params.renderSearchbar.call(ac); }
    var searchbarHTML = ("\n      <form class=\"searchbar\">\n        <div class=\"searchbar-inner\">\n          <div class=\"searchbar-input-wrap\">\n            <input type=\"search\" placeholder=\"" + (ac.params.searchbarPlaceholder) + "\"/>\n            <i class=\"searchbar-icon\"></i>\n            <span class=\"input-clear-button\"></span>\n          </div>\n          <span class=\"searchbar-disable-button\">" + (ac.params.searchbarDisableText) + "</span>\n        </div>\n      </form>\n    ").trim();
    return searchbarHTML;
  };
  Autocomplete.prototype.renderItem = function renderItem (item, index) {
    var ac = this;
    if (ac.params.renderItem) { return ac.params.renderItem.call(ac, item, index); }
    var itemHtml;
    if (ac.params.openIn !== 'dropdown') {
      itemHtml = "\n        <li>\n          <label class=\"item-" + (item.inputType) + " item-content\">\n            <input type=\"" + (item.inputType) + "\" name=\"" + (item.inputName) + "\" value=\"" + (item.value) + "\" " + (item.selected ? 'checked' : '') + ">\n            <i class=\"icon icon-" + (item.inputType) + "\"></i>\n            <div class=\"item-inner\">\n              <div class=\"item-title\">" + (item.text) + "</div>\n            </div>\n          </label>\n        </li>\n      ";
    } else if (!item.placeholder) {
      // Dropdown
      itemHtml = "\n        <li>\n          <label class=\"item-radio item-content\" data-value=\"" + (item.value) + "\">\n            <div class=\"item-inner\">\n              <div class=\"item-title\">" + (item.text) + "</div>\n            </div>\n          </label>\n        </li>\n      ";
    } else {
      // Dropwdown placeholder
      itemHtml = "\n        <li class=\"autocomplete-dropdown-placeholder\">\n          <div class=\"item-content\">\n            <div class=\"item-inner\">\n              <div class=\"item-title\">" + (item.text) + "</div>\n            </div>\n          </label>\n        </li>\n      ";
    }
    return itemHtml.trim();
  };

  Autocomplete.prototype.renderNavbar = function renderNavbar () {
    var ac = this;
    if (ac.params.renderNavbar) { return ac.params.renderNavbar.call(ac); }
    var pageTitle = ac.params.pageTitle;
    if (typeof pageTitle === 'undefined' && ac.$openerEl && ac.$openerEl.length) {
      pageTitle = ac.$openerEl.find('.item-title').text().trim();
    }
    var navbarHtml = ("\n      <div class=\"navbar " + (ac.params.navbarColorTheme ? ("color-theme-" + (ac.params.navbarColorTheme)) : '') + "\">\n        <div class=\"navbar-inner " + (ac.params.navbarColorTheme ? ("color-theme-" + (ac.params.navbarColorTheme)) : '') + "\">\n          <div class=\"left sliding\">\n            <a href=\"#\" class=\"link " + (ac.params.openIn === 'page' ? 'back' : 'popup-close') + "\">\n              <i class=\"icon icon-back\"></i>\n              <span class=\"ios-only\">" + (ac.params.openIn === 'page' ? ac.params.pageBackLinkText : ac.params.popupCloseLinkText) + "</span>\n            </a>\n          </div>\n          " + (pageTitle ? ("<div class=\"title sliding\">" + pageTitle + "</div>") : '') + "\n          " + (ac.params.preloader ? ("\n          <div class=\"right\">\n            " + (ac.renderPreloader()) + "\n          </div>\n          ") : '') + "\n          <div class=\"subnavbar sliding\">" + (ac.renderSearchbar()) + "</div>\n        </div>\n      </div>\n    ").trim();
    return navbarHtml;
  };
  Autocomplete.prototype.renderDropdown = function renderDropdown () {
    var ac = this;
    if (ac.params.renderDropdown) { return ac.params.renderDropdown.call(ac, ac.items); }
    var dropdownHtml = ("\n      <div class=\"autocomplete-dropdown\">\n        <div class=\"autocomplete-dropdown-inner\">\n          <div class=\"list " + (!ac.params.expandInput ? 'no-ios-edge' : '') + "\">\n            <ul></ul>\n          </div>\n        </div>\n        " + (ac.params.preloader ? ac.renderPreloader() : '') + "\n      </div>\n    ").trim();
    return dropdownHtml;
  };
  Autocomplete.prototype.renderPage = function renderPage () {
    var ac = this;
    if (ac.params.renderPage) { return ac.params.renderPage.call(ac, ac.items); }

    var pageHtml = ("\n      <div class=\"page page-with-subnavbar autocomplete-page\" data-name=\"autocomplete-page\">\n        " + (ac.renderNavbar()) + "\n        <div class=\"searchbar-backdrop\"></div>\n        <div class=\"page-content\">\n          <div class=\"list autocomplete-list autocomplete-found autocomplete-list-" + (ac.id) + " " + (ac.params.formColorTheme ? ("color-theme-" + (ac.params.formColorTheme)) : '') + "\">\n            <ul></ul>\n          </div>\n          <div class=\"list autocomplete-not-found\">\n            <ul>\n              <li class=\"item-content\"><div class=\"item-inner\"><div class=\"item-title\">" + (ac.params.notFoundText) + "</div></div></li>\n            </ul>\n          </div>\n          <div class=\"list autocomplete-values\">\n            <ul></ul>\n          </div>\n        </div>\n      </div>\n    ").trim();
    return pageHtml;
  };
  Autocomplete.prototype.renderPopup = function renderPopup () {
    var ac = this;
    if (ac.params.renderPopup) { return ac.params.renderPopup.call(ac, ac.items); }
    var popupHtml = ("\n      <div class=\"popup autocomplete-popup\">\n        <div class=\"view\">\n          " + (ac.renderPage()) + ";\n        </div>\n      </div>\n    ").trim();
    return popupHtml;
  };
  Autocomplete.prototype.onOpen = function onOpen (type, containerEl) {
    var ac = this;
    var app = ac.app;
    var $containerEl = $$1$1(containerEl);
    ac.$containerEl = $containerEl;
    ac.openedIn = type;
    ac.opened = true;

    if (ac.params.openIn === 'dropdown') {
      ac.attachDropdownEvents();

      ac.$dropdownEl.addClass('autocomplete-dropdown-in');
      ac.$inputEl.trigger('input');
    } else {
      // Init SB
      var $searchbarEl = $containerEl.find('.searchbar');
      if (ac.params.openIn === 'page' && app.theme === 'ios' && $searchbarEl.length === 0) {
        $searchbarEl = $$1$1(app.navbar.getElByPage($containerEl)).find('.searchbar');
      }
      ac.searchbar = app.searchbar.create({
        el: $searchbarEl,
        backdropEl: $containerEl.find('.searchbar-backdrop'),
        customSearch: true,
        on: {
          searchbarSearch: function searchbarSearch(query) {
            if (query.length === 0 && ac.searchbar.enabled) {
              ac.searchbar.backdropShow();
            } else {
              ac.searchbar.backdropHide();
            }
            ac.source(query);
          },
        },
      });

      // Attach page events
      ac.attachPageEvents();

      // Update Values On Page Init
      ac.updateValues();

      // Source on load
      if (ac.params.requestSourceOnOpen) { ac.source(''); }
    }

    ac.emit('local::open autocompleteOpen', ac);
  };
  Autocomplete.prototype.onOpened = function onOpened () {
    var ac = this;
    if (ac.params.openIn !== 'dropdown' && ac.params.autoFocus) {
      ac.autoFocus();
    }
    ac.emit('local::opened autocompleteOpened', ac);
  };
  Autocomplete.prototype.onClose = function onClose () {
    var ac = this;
    if (ac.destroyed) { return; }

    // Destroy SB
    if (ac.searchbar && ac.searchbar.destroy) {
      ac.searchbar.destroy();
      ac.searchbar = null;
      delete ac.searchbar;
    }

    if (ac.params.openIn === 'dropdown') {
      ac.detachDropdownEvents();
      ac.$dropdownEl.removeClass('autocomplete-dropdown-in').remove();
      ac.$inputEl.parents('.item-content-dropdown-expanded').removeClass('item-content-dropdown-expanded');
    } else {
      ac.detachPageEvents();
    }

    ac.emit('local::close autocompleteClose', ac);
  };
  Autocomplete.prototype.onClosed = function onClosed () {
    var ac = this;
    if (ac.destroyed) { return; }
    ac.opened = false;
    ac.$containerEl = null;
    delete ac.$containerEl;

    ac.emit('local::closed autocompleteClosed', ac);
  };
  Autocomplete.prototype.openPage = function openPage () {
    var ac = this;
    if (ac.opened) { return ac; }
    var pageHtml = ac.renderPage();
    ac.view.router.navigate({
      url: ac.url,
      route: {
        content: pageHtml,
        path: ac.url,
        on: {
          pageBeforeIn: function pageBeforeIn(e, page) {
            ac.onOpen('page', page.el);
          },
          pageAfterIn: function pageAfterIn(e, page) {
            ac.onOpened('page', page.el);
          },
          pageBeforeOut: function pageBeforeOut(e, page) {
            ac.onClose('page', page.el);
          },
          pageAfterOut: function pageAfterOut(e, page) {
            ac.onClosed('page', page.el);
          },
        },
        options: {
          animate: ac.params.animate,
        },
      },
    });
    return ac;
  };
  Autocomplete.prototype.openPopup = function openPopup () {
    var ac = this;
    if (ac.opened) { return ac; }
    var popupHtml = ac.renderPopup();

    var popupParams = {
      content: popupHtml,
      animate: ac.params.animate,
      on: {
        popupOpen: function popupOpen(popup) {
          ac.onOpen('popup', popup.el);
        },
        popupOpened: function popupOpened(popup) {
          ac.onOpened('popup', popup.el);
        },
        popupClose: function popupClose(popup) {
          ac.onClose('popup', popup.el);
        },
        popupClosed: function popupClosed(popup) {
          ac.onClosed('popup', popup.el);
        },
      },
    };

    if (ac.params.routableModals) {
      ac.view.router.navigate({
        url: ac.url,
        route: {
          path: ac.url,
          popup: popupParams,
        },
      });
    } else {
      ac.modal = ac.app.popup.create(popupParams).open(ac.params.animate);
    }
    return ac;
  };
  Autocomplete.prototype.openDropdown = function openDropdown () {
    var ac = this;

    if (!ac.$dropdownEl) {
      ac.$dropdownEl = $$1$1(ac.renderDropdown());
    }
    var $listEl = ac.$inputEl.parents('.list');
    if ($listEl.length && ac.$inputEl.parents('.item-content').length > 0 && ac.params.expandInput) {
      ac.$inputEl.parents('.item-content').addClass('item-content-dropdown-expanded');
    }
    ac.positionDropDown();
    var $pageContentEl = ac.$inputEl.parents('.page-content');
    if (ac.params.dropdownContainerEl) {
      $$1$1(ac.params.dropdownContainerEl).append(ac.$dropdownEl);
    } else if ($pageContentEl.length === 0) {
      ac.$dropdownEl.insertAfter(ac.$inputEl);
    } else {
      $pageContentEl.append(ac.$dropdownEl);
    }
    ac.onOpen('dropdown', ac.$dropdownEl);
    ac.onOpened('dropdown', ac.$dropdownEl);
  };
  Autocomplete.prototype.open = function open () {
    var ac = this;
    if (ac.opened) { return ac; }
    var openIn = ac.params.openIn;
    ac[("open" + (openIn.split('').map(function (el, index) {
      if (index === 0) { return el.toUpperCase(); }
      return el;
    }).join('')))]();
    return ac;
  };
  Autocomplete.prototype.close = function close () {
    var ac = this;
    if (!ac.opened) { return ac; }
    if (ac.params.openIn === 'dropdown') {
      ac.onClose();
      ac.onClosed();
    } else if (ac.params.routableModals || ac.openedIn === 'page') {
      ac.view.router.back({ animate: ac.params.animate });
    } else {
      ac.modal.once('modalClosed', function () {
        Utils.nextTick(function () {
          ac.modal.destroy();
          delete ac.modal;
        });
      });
      ac.modal.close();
    }
    return ac;
  };
  Autocomplete.prototype.init = function init () {
    var ac = this;
    ac.attachEvents();
  };
  Autocomplete.prototype.destroy = function destroy () {
    var ac = this;
    ac.emit('local::beforeDestroy autocompleteBeforeDestroy', ac);
    ac.detachEvents();
    if (ac.$inputEl && ac.$inputEl[0]) {
      delete ac.$inputEl[0].f7Autocomplete;
    }
    if (ac.$openerEl && ac.$openerEl[0]) {
      delete ac.$openerEl[0].f7Autocomplete;
    }
    Utils.deleteProps(ac);
    ac.destroyed = true;
  };

  return Autocomplete;
}(Framework7Class));

var Autocomplete = {
  name: 'autocomplete',
  params: {
    autocomplete: {
      openerEl: undefined,
      inputEl: undefined,
      view: undefined,

      // DropDown
      dropdownContainerEl: undefined,
      dropdownPlaceholderText: undefined,
      typeahead: false,
      highlightMatches: true,
      expandInput: false,
      updateInputValueOnSelect: true,

      value: undefined,
      multiple: false,

      source: undefined,
      limit: undefined,
      valueProperty: 'id',
      textProperty: 'text',

      openIn: 'page', // or 'popup' or 'dropdown'
      pageBackLinkText: 'Back',
      popupCloseLinkText: 'Close',
      searchbarPlaceholder: 'Search...',
      searchbarDisableText: 'Cancel',

      animate: true,

      autoFocus: false,
      closeOnSelect: false,
      notFoundText: 'Nothing found',
      requestSourceOnOpen: false,

      // Preloader
      preloaderColor: undefined,
      preloader: false,

      // Colors
      formColorTheme: undefined,
      navbarColorTheme: undefined,

      // Routing
      routableModals: true,
      url: 'select',

      // Custom render functions
      renderDropdown: undefined,
      renderPage: undefined,
      renderPopup: undefined,
      renderItems: undefined,
      renderItem: undefined,
      renderSearchbar: undefined,
      renderNavbar: undefined,

    },
  },
  static: {
    Autocomplete: Autocomplete$1,
  },
  create: function create() {
    var app = this;
    app.autocomplete = Utils.extend(
      ConstructorMethods({
        defaultSelector: undefined,
        constructor: Autocomplete$1,
        app: app,
        domProp: 'f7Autocomplete',
      }),
      {
        open: function open(autocompleteEl) {
          var ac = app.autocomplete.get(autocompleteEl);
          if (ac && ac.open) { return ac.open(); }
          return undefined;
        },
        close: function close(autocompleteEl) {
          var ac = app.autocomplete.get(autocompleteEl);
          if (ac && ac.close) { return ac.close(); }
          return undefined;
        },
      }
    );
  },
};

var ViAd = (function (Framework7Class$$1) {
  function ViAd(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);
    var vi = this;
    if (!window.vi) {
      throw new Error('f7:vi SDK not found.');
    }

    var orientation;
    if (typeof window.orientation !== 'undefined') {
      orientation = window.orientation === -90 || window.orientation === 90 ? 'horizontal' : 'vertical';
    }
    var defaults = Utils.extend(
      {},
      app.params.vi,
      {
        appId: app.id,
        appVer: app.version,
        language: app.language,
        width: app.width,
        height: app.height,
        os: Device.os,
        osVersion: Device.osVersion,
        orientation: orientation,
      }
    );

    // Extend defaults with modules params
    vi.useModulesParams(defaults);

    vi.params = Utils.extend(defaults, params);

    var adParams = {};
    var skipParams = ('on autoplay fallbackOverlay fallbackOverlayText enabled').split(' ');
    Object.keys(vi.params).forEach(function (paramName) {
      if (skipParams.indexOf(paramName) >= 0) { return; }
      var paramValue = vi.params[paramName];
      if ([null, undefined].indexOf(paramValue) >= 0) { return; }
      adParams[paramName] = paramValue;
    });

    if (!vi.params.appId) {
      throw new Error('Framework7:"app.id" is required to display an ad. Make sure you have specified it on app initialization.');
    }
    if (!vi.params.placementId) {
      throw new Error('Framework7:"placementId" is required to display an ad.');
    }

    function onResize() {
      var $viFrame = $$1$1('iframe#viAd');
      if ($viFrame.length === 0) { return; }
      $viFrame
        .css({
          width: ((app.width) + "px"),
          height: ((app.height) + "px"),
        });
    }

    function removeOverlay() {
      if (!vi.$overlayEl) { return; }
      vi.$overlayEl.off('click touchstart');
      vi.$overlayEl.remove();
    }
    function createOverlay(videoEl) {
      if (!videoEl) { return; }
      vi.$overlayEl = $$1$1(("\n        <div class=\"vi-overlay no-fastclick\">\n          " + (vi.params.fallbackOverlayText ? ("<div class=\"vi-overlay-text\">" + (vi.params.fallbackOverlayText) + "</div>") : '') + "\n          <div class=\"vi-overlay-play-button\"></div>\n        </div>\n      ").trim());

      var touchStartTime;
      vi.$overlayEl.on('touchstart', function () {
        touchStartTime = Utils.now();
      });
      vi.$overlayEl.on('click', function () {
        var timeDiff = Utils.now() - touchStartTime;
        if (timeDiff > 300) { return; }
        if (videoEl) {
          videoEl.play();
          removeOverlay();
          return;
        }
        vi.start();
        removeOverlay();
      });
      app.root.append(vi.$overlayEl);
    }

    // Create ad
    vi.ad = new window.vi.Ad(adParams);

    Utils.extend(vi.ad, {
      onAdReady: function onAdReady() {
        app.on('resize', onResize);
        vi.emit('local::ready');
        if (vi.params.autoplay) {
          vi.start();
        }
      },
      onAdStarted: function onAdStarted() {
        vi.emit('local::started');
      },
      onAdClick: function onAdClick(targetUrl) {
        vi.emit('local::click', targetUrl);
      },
      onAdImpression: function onAdImpression() {
        vi.emit('local::impression');
      },
      onAdStopped: function onAdStopped(reason) {
        app.off('resize', onResize);
        removeOverlay();

        vi.emit('local::stopped', reason);
        if (reason === 'complete') {
          vi.emit('local::complete');
        }
        if (reason === 'userexit') {
          vi.emit('local::userexit');
        }
        vi.destroyed = true;
      },
      onAutoPlayFailed: function onAutoPlayFailed(reason, videoEl) {
        vi.emit('local::autoplayFailed', reason, videoEl);
        if (reason && reason.name && reason.name.indexOf('NotAllowedError') !== -1 && vi.params.fallbackOverlay) {
          createOverlay(videoEl);
        }
      },
      onAdError: function onAdError(msg) {
        removeOverlay();
        app.off('resize', onResize);
        vi.emit('local::error', msg);
        vi.destroyed = true;
      },
    });

    vi.init();

    Utils.extend(vi, {
      app: app,
    });
  }

  if ( Framework7Class$$1 ) ViAd.__proto__ = Framework7Class$$1;
  ViAd.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  ViAd.prototype.constructor = ViAd;
  ViAd.prototype.start = function start () {
    var vi = this;
    if (vi.destroyed) { return; }
    if (vi.ad) { vi.ad.startAd(); }
  };
  ViAd.prototype.pause = function pause () {
    var vi = this;
    if (vi.destroyed) { return; }
    if (vi.ad) { vi.ad.pauseAd(); }
  };
  ViAd.prototype.resume = function resume () {
    var vi = this;
    if (vi.destroyed) { return; }
    if (vi.ad) { vi.ad.resumeAd(); }
  };
  ViAd.prototype.stop = function stop () {
    var vi = this;
    if (vi.destroyed) { return; }
    if (vi.ad) { vi.ad.stopAd(); }
  };
  ViAd.prototype.init = function init () {
    var vi = this;
    if (vi.destroyed) { return; }
    if (vi.ad) { vi.ad.initAd(); }
  };
  ViAd.prototype.destroy = function destroy () {
    var vi = this;
    vi.destroyed = true;
    vi.emit('local::beforeDestroy');
    Utils.deleteProps(vi);
  };

  return ViAd;
}(Framework7Class));

var Vi = {
  name: 'vi',
  params: {
    vi: {
      enabled: false,
      autoplay: true,
      fallbackOverlay: true,
      fallbackOverlayText: 'Please watch this ad',
      showMute: true,
      startMuted: (Device.ios || Device.android) && !Device.cordova,
      appId: null,
      appVer: null,
      language: null,
      width: null,
      height: null,
      placementId: 'pltd4o7ibb9rc653x14',
      placementType: 'interstitial',
      videoSlot: null,
      showProgress: true,
      showBranding: true,
      os: null,
      osVersion: null,
      orientation: null,
      age: null,
      gender: null,
      advertiserId: null,
      latitude: null,
      longitude: null,
      accuracy: null,
      storeId: null,
      ip: null,
      manufacturer: null,
      model: null,
      connectionType: null,
      connectionProvider: null,
    },
  },
  create: function create() {
    var app = this;
    app.vi = {
      sdkReady: false,
      createAd: function createAd(adParams) {
        return new ViAd(app, adParams);
      },
      loadSdk: function loadSdk() {
        if (app.vi.skdReady) { return; }
        var script = document.createElement('script');
        script.onload = function onload() {
          app.emit('viSdkReady');
          app.vi.skdReady = true;
        };
        script.src = 'http://c.vi-serve.com/viadshtml/vi.min.js';
        $$1$1('head').append(script);
      },
    };
  },
  on: {
    init: function init() {
      var app = this;
      if (app.params.vi.enabled || (app.passedParams.vi && app.passedParams.vi.enabled !== false)) { app.vi.loadSdk(); }
    },
  },
};

// F7 Class
// Core Modules
// Core Components
{
  // Template7
  if (!window.Template7) { window.Template7 = Template7; }

  // Dom7
  if (!window.Dom7) { window.Dom7 = $$1$1; }
}

// Install Core Modules & Components
Framework7$1.use([
  Device$2,
  Support,
  Utils$2,
  Resize,
  Request,
  Touch,
  Clicks,
  Router,
  History$2,
  Storage$1,
  Statusbar$1,
  View$2,
  Navbar$1,
  Toolbar$1,
  Subnavbar,
  TouchRipple,
  Modal,
  Dialog,
  Popup,
  LoginScreen,
  Popover,
  Actions,
  Sheet,
  Toast,
  Preloader$1,
  Progressbar$1,
  Sortable$1,
  Swipeout$1,
  Accordion$1,
  VirtualList,
  Timeline,
  Tabs,
  Panel,
  Card,
  Chip,
  Form,
  Input$1,
  Checkbox,
  Radio,
  Toggle,
  Range,
  SmartSelect,
  Calendar,
  Picker,
  InfiniteScroll$1,
  PullToRefresh,
  Lazy$1,
  DataTable,
  Fab$1,
  Searchbar,
  Messages,
  Messagebar,
  Swiper,
  PhotoBrowser,
  Notification,
  Autocomplete,
  Vi
]);

return Framework7$1;

})));
