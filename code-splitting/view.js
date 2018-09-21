
function framework7ComponentLoader(chunks) {
  var doc = document;
  var win = window;
  var $ = chunks.$;
  var Template7 = chunks.Template7;
  var Utils = chunks.Utils;
  var Device = chunks.Device;
  var Support = chunks.Support;
  var ConstructorMethods = chunks.ConstructorMethods;
  var ModalMethods = chunks.ModalMethods;
  var Framework7Class = chunks.Framework7Class;
  var Modal = chunks.Modal;

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
    // ":test(\\d+)?" => ["test", "\d+", undefined, "?"]
    // "(\\d+)"  => [undefined, undefined, "\d+", undefined]
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
            segment = encode(value[j], token);

            if (!matches[i].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"')
            }

            path += (j === 0 ? token.prefix : token.delimiter) + segment;
          }

          continue
        }

        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          segment = encode(String(value), token);

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
    var start = options.start !== false;
    var end = options.end !== false;
    var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER);
    var delimiters = options.delimiters || DEFAULT_DELIMITERS;
    var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|');
    var route = start ? '^' : '';
    var isEndDelimited = tokens.length === 0;

    // Iterate over the tokens and create our regexp string.
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        route += escapeString(token);
        isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1;
      } else {
        var capture = token.repeat
          ? '(?:' + token.pattern + ')(?:' + escapeString(token.delimiter) + '(?:' + token.pattern + '))*'
          : token.pattern;

        if (keys) { keys.push(token); }

        if (token.optional) {
          if (token.partial) {
            route += escapeString(token.prefix) + '(' + capture + ')?';
          } else {
            route += '(?:' + escapeString(token.prefix) + '(' + capture + '))?';
          }
        } else {
          route += escapeString(token.prefix) + '(' + capture + ')';
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

    return new RegExp(route, flags(options))
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
    initViewState: function initViewState(viewId, viewState) {
      var obj;

      var newState = Utils.extend({}, (History.state || {}), ( obj = {}, obj[viewId] = viewState, obj ));
      History.state = newState;
      win.history.replaceState(newState, '');
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
      win.history.pushState(newState, '', url);
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
      win.history.replaceState(newState, '', url);
    },
    go: function go(index) {
      History.allowChange = false;
      win.history.go(index);
    },
    back: function back() {
      History.allowChange = false;
      win.history.back();
    },
    allowChange: true,
    previousState: {},
    state: win.history.state,
    blockPopstate: true,
    init: function init(app) {
      $(win).on('load', function () {
        setTimeout(function () {
          History.blockPopstate = false;
        }, 0);
      });

      if (doc.readyState && doc.readyState === 'complete') {
        History.blockPopstate = false;
      }

      $(win).on('popstate', History.handle.bind(app));
    },
  };

  function SwipeBack(r) {
    var router = r;
    var $el = router.$el;
    var $navbarEl = router.$navbarEl;
    var app = router.app;
    var params = router.params;
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

    var paramsSwipeBackAnimateShadow = params[((app.theme) + "SwipeBackAnimateShadow")];
    var paramsSwipeBackAnimateOpacity = params[((app.theme) + "SwipeBackAnimateOpacity")];
    var paramsSwipeBackActiveArea = params[((app.theme) + "SwipeBackActiveArea")];
    var paramsSwipeBackThreshold = params[((app.theme) + "SwipeBackThreshold")];

    function handleTouchStart(e) {
      var swipeBackEnabled = params[((app.theme) + "SwipeBack")];
      if (!allowViewTouchMove || !swipeBackEnabled || isTouched || (app.swipeout && app.swipeout.el) || !router.allowPageChange) { return; }
      if ($(e.target).closest('.range-slider, .calendar-months').length > 0) { return; }
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
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x)) || (pageX < touchesStart.x && !app.rtl) || (pageX > touchesStart.x && app.rtl);
      }
      if (isScrolling || e.f7PreventSwipeBack || app.preventSwipeBack) {
        isTouched = false;
        return;
      }
      if (!isMoved) {
        // Calc values during first move fired
        var cancel = false;
        var target = $(e.target);

        var swipeout = target.closest('.swipeout');
        if (swipeout.length > 0) {
          if (!app.rtl && swipeout.find('.swipeout-actions-left').length > 0) { cancel = true; }
          if (app.rtl && swipeout.find('.swipeout-actions-right').length > 0) { cancel = true; }
        }

        currentPage = target.closest('.page');
        if (currentPage.hasClass('no-swipeback') || target.closest('.no-swipeback').length > 0) { cancel = true; }
        previousPage = $el.find('.page-previous:not(.stacked)');

        var notFromBorder = touchesStart.x - $el.offset().left > paramsSwipeBackActiveArea;
        viewContainerWidth = $el.width();
        if (app.rtl) {
          notFromBorder = touchesStart.x < ($el.offset().left - $el[0].scrollLeft) + (viewContainerWidth - paramsSwipeBackActiveArea);
        } else {
          notFromBorder = touchesStart.x - $el.offset().left > paramsSwipeBackActiveArea;
        }
        if (notFromBorder) { cancel = true; }
        if (previousPage.length === 0 || currentPage.length === 0) { cancel = true; }
        if (cancel) {
          isTouched = false;
          return;
        }

        if (paramsSwipeBackAnimateShadow) {
          pageShadow = currentPage.find('.page-shadow-effect');
          if (pageShadow.length === 0) {
            pageShadow = $('<div class="page-shadow-effect"></div>');
            currentPage.append(pageShadow);
          }
        }
        if (paramsSwipeBackAnimateOpacity) {
          pageOpacity = previousPage.find('.page-opacity-effect');
          if (pageOpacity.length === 0) {
            pageOpacity = $('<div class="page-opacity-effect"></div>');
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
          if (params.iosAnimateNavbarBackIcon) {
            if (currentNavbar.hasClass('sliding')) {
              activeNavBackIcon = currentNavbar.children('.left').find('.back .icon');
              activeNavBackIconText = currentNavbar.children('.left').find('.back span').eq(0);
            } else {
              activeNavBackIcon = currentNavbar.children('.left.sliding').find('.back .icon');
              activeNavBackIconText = currentNavbar.children('.left.sliding').find('.back span').eq(0);
            }
            if (previousNavbar.hasClass('sliding')) {
              previousNavBackIcon = previousNavbar.children('.left').find('.back .icon');
            } else {
              previousNavBackIcon = previousNavbar.children('.left.sliding').find('.back .icon');
            }
          }
        }

        // Close/Hide Any Picker
        if ($('.sheet.modal-in').length > 0 && app.sheet) {
          app.sheet.close($('.sheet.modal-in'));
        }
      }
      e.f7PreventPanelSwipe = true;
      isMoved = true;
      app.preventSwipePanelBySwipeBack = true;
      e.preventDefault();

      // RTL inverter
      var inverter = app.rtl ? -1 : 1;

      // Touches diff
      touchesDiff = (pageX - touchesStart.x - paramsSwipeBackThreshold) * inverter;
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

      router.swipeBackActive = true;
      $([currentPage[0], previousPage[0]]).addClass('page-swipeback-active');

      currentPage.transform(("translate3d(" + currentPageTranslate + "px,0,0)"));
      if (paramsSwipeBackAnimateShadow) { pageShadow[0].style.opacity = 1 - (1 * percentage); }

      if (app.theme !== 'md') {
        previousPage.transform(("translate3d(" + previousPageTranslate + "px,0,0)"));
      }
      if (paramsSwipeBackAnimateOpacity) { pageOpacity[0].style.opacity = 1 - (1 * percentage); }

      // Dynamic Navbars Animation
      if (dynamicNavbar) {
        currentNavElements.each(function (index, navEl) {
          var $navEl = $(navEl);
          if (!$navEl.is('.subnavbar')) { $navEl[0].style.opacity = (1 - (Math.pow( percentage, 0.33 ))); }
          if ($navEl[0].className.indexOf('sliding') >= 0 || currentNavbar.hasClass('sliding')) {
            var activeNavTranslate = percentage * $navEl[0].f7NavbarRightOffset;
            if (Device.pixelRatio === 1) { activeNavTranslate = Math.round(activeNavTranslate); }
            $navEl.transform(("translate3d(" + activeNavTranslate + "px,0,0)"));
            if (params.iosAnimateNavbarBackIcon) {
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
          var $navEl = $(navEl);
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
            if (params.iosAnimateNavbarBackIcon) {
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
      router.swipeBackActive = false;
      $([currentPage[0], previousPage[0]]).removeClass('page-swipeback-active');
      if (touchesDiff === 0) {
        $([currentPage[0], previousPage[0]]).transform('');
        if (pageShadow && pageShadow.length > 0) { pageShadow.remove(); }
        if (pageOpacity && pageOpacity.length > 0) { pageOpacity.remove(); }
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
        (timeDiff < 300 && touchesDiff > 10)
        || (timeDiff >= 300 && touchesDiff > viewContainerWidth / 2)
      ) {
        currentPage.removeClass('page-current').addClass(("page-next" + (app.theme === 'md' ? ' page-next-on-right' : '')));
        previousPage.removeClass('page-previous').addClass('page-current').removeAttr('aria-hidden');
        if (pageShadow) { pageShadow[0].style.opacity = ''; }
        if (pageOpacity) { pageOpacity[0].style.opacity = ''; }
        if (dynamicNavbar) {
          currentNavbar.removeClass('navbar-current').addClass('navbar-next');
          previousNavbar.removeClass('navbar-previous').addClass('navbar-current').removeAttr('aria-hidden');
        }
        pageChanged = true;
      }
      // Reset custom styles
      // Add transitioning class for transition-duration
      $([currentPage[0], previousPage[0]]).addClass('page-transitioning page-transitioning-swipeback').transform('');

      if (dynamicNavbar) {
        currentNavElements.css({ opacity: '' })
          .each(function (navElIndex, navEl) {
            var translate = pageChanged ? navEl.f7NavbarRightOffset : 0;
            var sliding = $(navEl);
            var iconTranslate = pageChanged ? -translate : 0;
            if (!separateNavbar && pageChanged) { iconTranslate -= navbarWidth; }
            sliding.transform(("translate3d(" + translate + "px,0,0)"));
            if (params.iosAnimateNavbarBackIcon) {
              if (sliding.hasClass('left') && activeNavBackIcon.length > 0) {
                activeNavBackIcon.addClass('navbar-transitioning').transform(("translate3d(" + iconTranslate + "px,0,0)"));
              }
            }
          }).addClass('navbar-transitioning');

        previousNavElements.transform('').css({ opacity: '' }).each(function (navElIndex, navEl) {
          var translate = pageChanged ? 0 : navEl.f7NavbarLeftOffset;
          var sliding = $(navEl);
          var iconTranslate = pageChanged ? 0 : -translate;
          if (!separateNavbar && !pageChanged) { iconTranslate += navbarWidth / 5; }
          sliding.transform(("translate3d(" + translate + "px,0,0)"));
          if (params.iosAnimateNavbarBackIcon) {
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
        router.pageCallback('beforeOut', currentPage, currentNavbar, 'current', 'next', { route: currentPage[0].f7Page.route, swipeBack: true });
        router.pageCallback('beforeIn', previousPage, previousNavbar, 'previous', 'current', { route: previousPage[0].f7Page.route, swipeBack: true });

        $el.trigger('swipeback:beforechange', callbackData);
        router.emit('swipebackBeforeChange', callbackData);
      } else {
        $el.trigger('swipeback:beforereset', callbackData);
        router.emit('swipebackBeforeReset', callbackData);
      }

      currentPage.transitionEnd(function () {
        $([currentPage[0], previousPage[0]]).removeClass('page-transitioning page-transitioning-swipeback');

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
          if (params.pushState) {
            History.back();
          }

          // Page after animation callback
          router.pageCallback('afterOut', currentPage, currentNavbar, 'current', 'next', { route: currentPage[0].f7Page.route, swipeBack: true });
          router.pageCallback('afterIn', previousPage, previousNavbar, 'previous', 'current', { route: previousPage[0].f7Page.route, swipeBack: true });

          // Remove Old Page
          if (params.stackPages && router.initialPages.indexOf(currentPage[0]) >= 0) {
            currentPage.addClass('stacked');
            if (separateNavbar) {
              currentNavbar.addClass('stacked');
            }
          } else {
            router.pageCallback('beforeRemove', currentPage, currentNavbar, 'next', { swipeBack: true });
            router.removePage(currentPage);
            if (separateNavbar) {
              router.removeNavbar(currentNavbar);
            }
          }

          $el.trigger('swipeback:afterchange', callbackData);
          router.emit('swipebackAfterChange', callbackData);

          router.emit('routeChanged', router.currentRoute, router.previousRoute, router);

          if (params.preloadPreviousPage) {
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
      var passiveListener = (app.touchEvents.start === 'touchstart' && Support.passiveListener) ? { passive: true, capture: false } : false;
      $el.on(app.touchEvents.start, handleTouchStart, passiveListener);
      app.on('touchmove:active', handleTouchMove);
      app.on('touchend:passive', handleTouchEnd);
    }
    function detachEvents() {
      var passiveListener = (app.touchEvents.start === 'touchstart' && Support.passiveListener) ? { passive: true, capture: false } : false;
      $el.off(app.touchEvents.start, handleTouchStart, passiveListener);
      app.off('touchmove:active', handleTouchMove);
      app.off('touchend:passive', handleTouchEnd);
    }

    attachEvents();

    router.on('routerDestroy', detachEvents);
  }

  function redirect (direction, route, options) {
    var router = this;
    var redirect = route.route.redirect;
    if (options.initial && router.params.pushState) {
      options.replaceState = true; // eslint-disable-line
      options.history = true; // eslint-disable-line
    }
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
  }

  function processQueue(router, routerQueue, routeQueue, to, from, resolve, reject) {
    var queue = [];

    if (Array.isArray(routeQueue)) {
      queue.push.apply(queue, routeQueue);
    } else if (routeQueue && typeof routeQueue === 'function') {
      queue.push(routeQueue);
    }
    if (routerQueue) {
      if (Array.isArray(routerQueue)) {
        queue.push.apply(queue, routerQueue);
      } else {
        queue.push(routerQueue);
      }
    }

    function next() {
      if (queue.length === 0) {
        resolve();
        return;
      }
      var queueItem = queue.shift();

      queueItem.call(
        router,
        to,
        from,
        function () {
          next();
        },
        function () {
          reject();
        }
      );
    }
    next();
  }

  function processRouteQueue (to, from, resolve, reject) {
    var router = this;
    function enterNextRoute() {
      if (to && to.route && (router.params.routesBeforeEnter || to.route.beforeEnter)) {
        router.allowPageChange = false;
        processQueue(
          router,
          router.params.routesBeforeEnter,
          to.route.beforeEnter,
          to,
          from,
          function () {
            router.allowPageChange = true;
            resolve();
          },
          function () {
            reject();
          }
        );
      } else {
        resolve();
      }
    }
    function leaveCurrentRoute() {
      if (from && from.route && (router.params.routesBeforeLeave || from.route.beforeLeave)) {
        router.allowPageChange = false;
        processQueue(
          router,
          router.params.routesBeforeLeave,
          from.route.beforeLeave,
          to,
          from,
          function () {
            router.allowPageChange = true;
            enterNextRoute();
          },
          function () {
            reject();
          }
        );
      } else {
        enterNextRoute();
      }
    }
    leaveCurrentRoute();
  }

  function refreshPage() {
    var router = this;
    return router.navigate(router.currentRoute.url, {
      ignoreCache: true,
      reloadCurrent: true,
    });
  }

  function forward(el, forwardOptions) {
    if ( forwardOptions === void 0 ) forwardOptions = {};

    var router = this;
    var app = router.app;
    var view = router.view;

    var options = Utils.extend({
      animate: router.params.animate,
      pushState: true,
      replaceState: false,
      history: true,
      reloadCurrent: router.params.reloadPages,
      reloadPrevious: false,
      reloadAll: false,
      clearPreviousHistory: false,
      on: {},
    }, forwardOptions);

    var currentRouteIsModal = router.currentRoute.modal;
    var modalType;
    if (!currentRouteIsModal) {
      ('popup popover sheet loginScreen actions customModal panel').split(' ').forEach(function (modalLoadProp) {
        if (router.currentRoute && router.currentRoute.route && router.currentRoute.route[modalLoadProp]) {
          currentRouteIsModal = true;
          modalType = modalLoadProp;
        }
      });
    }

    if (currentRouteIsModal) {
      var modalToClose = router.currentRoute.modal
                           || router.currentRoute.route.modalInstance
                           || app[modalType].get();
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

      router.modalRemove(modalToClose);
    }

    var dynamicNavbar = router.dynamicNavbar;
    var separateNavbar = router.separateNavbar;

    var $viewEl = router.$el;
    var $newPage = $(el);
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
        $oldNavbarInner = $(app.navbar.getElByPage($oldPage));
      }
    } else if (options.reloadPrevious) {
      $oldPage = $pagesInView.eq($pagesInView.length - 2);
      if (separateNavbar) {
        // $oldNavbarInner = $navbarsInView.eq($pagesInView.length - 2);
        $oldNavbarInner = $(app.navbar.getElByPage($oldPage));
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
              $(oldNavbarInnerEl).addClass('stacked');
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
    if (router.params.pushState && (options.pushState || options.replaceState) && !options.reloadPrevious) {
      var pushStateRoot = router.params.pushStateRoot || '';
      History[options.reloadCurrent || options.reloadAll || options.replaceState ? 'replace' : 'push'](
        view.id,
        {
          url: options.route.url,
        },
        pushStateRoot + router.params.pushStateSeparator + options.route.url
      );
    }

    if (!options.reloadPrevious) {
      // Current Page & Navbar
      router.currentPageEl = $newPage[0];
      if (dynamicNavbar && $newNavbarInner.length) {
        router.currentNavbarEl = $newNavbarInner[0];
      } else {
        delete router.currentNavbarEl;
      }

      // Current Route
      router.currentRoute = options.route;
    }

    // Update router history
    var url = options.route.url;

    if (options.history) {
      if ((options.reloadCurrent && router.history.length) > 0 || options.replaceState) {
        router.history[router.history.length - (options.reloadPrevious ? 2 : 1)] = url;
      } else if (options.reloadPrevious) {
        router.history[router.history.length - 2] = url;
      } else if (options.reloadAll) {
        router.history = [url];
      } else {
        router.history.push(url);
      }
    }
    router.saveHistory();

    // Insert new page and navbar
    var newPageInDom = $newPage.parents(doc).length > 0;
    var f7Component = $newPage[0].f7Component;
    if (options.reloadPrevious) {
      if (f7Component && !newPageInDom) {
        f7Component.$mount(function (componentEl) {
          $(componentEl).insertBefore($oldPage);
        });
      } else {
        $newPage.insertBefore($oldPage);
      }
      if (separateNavbar && $newNavbarInner.length) {
        if ($oldNavbarInner.length) {
          $newNavbarInner.insertBefore($oldNavbarInner);
        } else {
          if (!router.$navbarEl.parents(doc).length) {
            router.$el.prepend(router.$navbarEl);
          }
          $navbarEl.append($newNavbarInner);
        }
      }
    } else {
      if ($oldPage.next('.page')[0] !== $newPage[0]) {
        if (f7Component && !newPageInDom) {
          f7Component.$mount(function (componentEl) {
            $viewEl.append(componentEl);
          });
        } else {
          $viewEl.append($newPage[0]);
        }
      }
      if (separateNavbar && $newNavbarInner.length) {
        if (!router.$navbarEl.parents(doc).length) {
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
        var $oldPageEl = $(pageEl);
        var $oldNavbarInnerEl = $(app.navbar.getElByPage($oldPageEl));
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
    } else if (options.reloadPrevious) {
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
      if (options.reloadCurrent && options.clearPreviousHistory) { router.clearPreviousHistory(); }
      return router;
    }
    if (options.reloadPrevious) {
      router.allowPageChange = true;
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
      if (options.clearPreviousHistory) { router.clearPreviousHistory(); }
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

    if (!options.reloadCurrent
      && options.route
      && options.route.route
      && options.route.route.parentPath
      && router.currentRoute.route
      && router.currentRoute.route.parentPath === options.route.route.parentPath) {
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
            !(paramName in router.currentRoute.params)
            || (router.currentRoute.params[paramName] !== options.route.params[paramName])
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
      options.route
      && options.route.url
      && router.url === options.route.url
      && !(options.reloadCurrent || options.reloadPrevious)
      && !router.params.allowDuplicateUrls
    ) {
      router.allowPageChange = true;
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
      router.xhrRequest(url, options)
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
    if ( navigateOptions === void 0 ) navigateOptions = {};

    var router = this;
    if (router.swipeBackActive) { return router; }
    var url;
    var createRoute;
    var name;
    var query;
    var params;
    var route;
    if (typeof navigateParams === 'string') {
      url = navigateParams;
    } else {
      url = navigateParams.url;
      createRoute = navigateParams.route;
      name = navigateParams.name;
      query = navigateParams.query;
      params = navigateParams.params;
    }
    if (name) {
      // find route by name
      route = router.findRouteByKey('name', name);
      if (!route) {
        throw new Error(("Framework7: route with name \"" + name + "\" not found"));
      }
      url = router.constructRouteUrl(route, { params: params, query: query });
      if (url) {
        return router.navigate(url, navigateOptions);
      }
      throw new Error(("Framework7: can't construct URL for route with name \"" + name + "\""));
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

    if (options && options.context) {
      route.context = options.context;
      options.route.context = options.context;
    }

    function resolve() {
      var routerLoaded = false;
      ('popup popover sheet loginScreen actions customModal panel').split(' ').forEach(function (modalLoadProp) {
        if (route.route[modalLoadProp] && !routerLoaded) {
          routerLoaded = true;
          router.modalLoad(modalLoadProp, route, options);
        }
      });
      ('url content component pageName el componentUrl template templateUrl').split(' ').forEach(function (pageLoadProp) {
        var obj;

        if (route.route[pageLoadProp] && !routerLoaded) {
          routerLoaded = true;
          router.load(( obj = {}, obj[pageLoadProp] = route.route[pageLoadProp], obj ), options);
        }
      });
      if (routerLoaded) { return; }
      // Async
      function asyncResolve(resolveParams, resolveOptions) {
        router.allowPageChange = false;
        var resolvedAsModal = false;
        if (resolveOptions && resolveOptions.context) {
          if (!route.context) { route.context = resolveOptions.context; }
          else { route.context = Utils.extend({}, route.context, resolveOptions.context); }
          options.route.context = route.context;
        }
        ('popup popover sheet loginScreen actions customModal panel').split(' ').forEach(function (modalLoadProp) {
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
    }
    function reject() {
      router.allowPageChange = true;
    }

    processRouteQueue.call(
      router,
      route,
      router.currentRoute,
      function () {
        resolve();
      },
      function () {
        reject();
      }
    );

    // Return Router
    return router;
  }

  function tabLoad(tabRoute, loadOptions) {
    if ( loadOptions === void 0 ) loadOptions = {};

    var router = this;
    var options = Utils.extend({
      animate: router.params.animate,
      pushState: true,
      history: true,
      parentPageEl: null,
      preload: false,
      on: {},
    }, loadOptions);

    var currentRoute;
    var previousRoute;
    if (options.route) {
      // Set Route
      if (!options.preload && options.route !== router.currentRoute) {
        previousRoute = router.previousRoute;
        router.currentRoute = options.route;
      }
      if (options.preload) {
        currentRoute = options.route;
        previousRoute = router.currentRoute;
      } else {
        currentRoute = router.currentRoute;
        if (!previousRoute) { previousRoute = router.previousRoute; }
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
        router.history[Math.max(router.history.length - 1, 0)] = options.route.url;
        router.saveHistory();
      }
    }

    // Show Tab
    var $parentPageEl = $(options.parentPageEl || router.currentPageEl);
    var tabEl;
    if ($parentPageEl.length && $parentPageEl.find(("#" + (tabRoute.id))).length) {
      tabEl = $parentPageEl.find(("#" + (tabRoute.id))).eq(0);
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

    // Tab Content Loaded
    function onTabLoaded(contentEl) {
      // Remove theme elements
      router.removeThemeElements($newTabEl);

      var tabEventTarget = $newTabEl;
      if (typeof contentEl !== 'string') { tabEventTarget = $(contentEl); }

      tabEventTarget.trigger('tab:init tab:mounted', tabRoute);
      router.emit('tabInit tabMounted', $newTabEl[0], tabRoute);

      if ($oldTabEl && $oldTabEl.length) {
        if (animated) {
          onTabsChanged(function () {
            router.emit('routeChanged', router.currentRoute, router.previousRoute, router);
            if (router.params.unloadTabContent) {
              router.tabRemove($oldTabEl, $newTabEl, tabRoute);
            }
          });
        } else {
          router.emit('routeChanged', router.currentRoute, router.previousRoute, router);
          if (router.params.unloadTabContent) {
            router.tabRemove($oldTabEl, $newTabEl, tabRoute);
          }
        }
      }
    }

    if ($newTabEl[0].f7RouterTabLoaded) {
      if (!$oldTabEl || !$oldTabEl.length) { return router; }
      if (animated) {
        onTabsChanged(function () {
          router.emit('routeChanged', router.currentRoute, router.previousRoute, router);
        });
      } else {
        router.emit('routeChanged', router.currentRoute, router.previousRoute, router);
      }
      return router;
    }

    // Load Tab Content
    function loadTab(loadTabParams, loadTabOptions) {
      // Load Tab Props
      var url = loadTabParams.url;
      var content = loadTabParams.content;
      var el = loadTabParams.el;
      var template = loadTabParams.template;
      var templateUrl = loadTabParams.templateUrl;
      var component = loadTabParams.component;
      var componentUrl = loadTabParams.componentUrl;
      // Component/Template Callbacks
      function resolve(contentEl) {
        router.allowPageChange = true;
        if (!contentEl) { return; }
        if (typeof contentEl === 'string') {
          $newTabEl.html(contentEl);
        } else {
          $newTabEl.html('');
          if (contentEl.f7Component) {
            contentEl.f7Component.$mount(function (componentEl) {
              $newTabEl.append(componentEl);
            });
          } else {
            $newTabEl.append(contentEl);
          }
        }
        $newTabEl[0].f7RouterTabLoaded = true;
        onTabLoaded(contentEl);
      }
      function reject() {
        router.allowPageChange = true;
        return router;
      }

      if (content) {
        resolve(content);
      } else if (template || templateUrl) {
        try {
          router.tabTemplateLoader(template, templateUrl, loadTabOptions, resolve, reject);
        } catch (err) {
          router.allowPageChange = true;
          throw err;
        }
      } else if (el) {
        resolve(el);
      } else if (component || componentUrl) {
        // Load from component (F7/Vue/React/...)
        try {
          router.tabComponentLoader($newTabEl[0], component, componentUrl, loadTabOptions, resolve, reject);
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
        router.xhrRequest(url, loadTabOptions)
          .then(function (tabContent) {
            resolve(tabContent);
          })
          .catch(function () {
            router.allowPageChange = true;
          });
      }
    }

    ('url content component el componentUrl template templateUrl').split(' ').forEach(function (tabLoadProp) {
      var obj;

      if (tabRoute[tabLoadProp]) {
        loadTab(( obj = {}, obj[tabLoadProp] = tabRoute[tabLoadProp], obj ), options);
      }
    });

    // Async
    function asyncResolve(resolveParams, resolveOptions) {
      loadTab(resolveParams, Utils.extend(options, resolveOptions));
    }
    function asyncReject() {
      router.allowPageChange = true;
    }
    if (tabRoute.async) {
      tabRoute.async.call(router, currentRoute, previousRoute, asyncResolve, asyncReject);
    }

    return router;
  }
  function tabRemove($oldTabEl, $newTabEl, tabRoute) {
    var router = this;

    var hasTabComponentChild;
    if ($oldTabEl[0]) {
      $oldTabEl[0].f7RouterTabLoaded = false;
      delete $oldTabEl[0].f7RouterTabLoaded;
    }
    $oldTabEl.children().each(function (index, tabChild) {
      if (tabChild.f7Component) {
        hasTabComponentChild = true;
        $(tabChild).trigger('tab:beforeremove', tabRoute);
        tabChild.f7Component.$destroy();
      }
    });
    if (!hasTabComponentChild) {
      $oldTabEl.trigger('tab:beforeremove', tabRoute);
    }
    router.emit('tabBeforeRemove', $oldTabEl[0], $newTabEl[0], tabRoute);
    router.removeTabContent($oldTabEl[0], tabRoute);
  }

  function modalLoad(modalType, route, loadOptions) {
    if ( loadOptions === void 0 ) loadOptions = {};

    var router = this;
    var app = router.app;
    var isPanel = modalType === 'panel';
    var modalOrPanel = isPanel ? 'panel' : 'modal';

    var options = Utils.extend({
      animate: router.params.animate,
      pushState: true,
      history: true,
      on: {},
    }, loadOptions);

    var modalParams = Utils.extend({}, route.route[modalType]);
    var modalRoute = route.route;

    function onModalLoaded() {
      // Create Modal
      var modal = app[modalType].create(modalParams);
      modalRoute.modalInstance = modal;

      var hasEl = modal.el;

      function closeOnSwipeBack() {
        modal.close();
      }
      modal.on((modalOrPanel + "Open"), function () {
        if (!hasEl) {
          // Remove theme elements
          router.removeThemeElements(modal.el);

          // Emit events
          modal.$el.trigger(((modalType.toLowerCase()) + ":init " + (modalType.toLowerCase()) + ":mounted"), route, modal);
          router.emit(((!isPanel ? 'modalInit' : '') + " " + modalType + "Init " + modalType + "Mounted"), modal.el, route, modal);
        }
        router.once('swipeBackMove', closeOnSwipeBack);
      });
      modal.on((modalOrPanel + "Close"), function () {
        router.off('swipeBackMove', closeOnSwipeBack);
        if (!modal.closeByRouter) {
          router.back();
        }
      });

      modal.on((modalOrPanel + "Closed"), function () {
        modal.$el.trigger(((modalType.toLowerCase()) + ":beforeremove"), route, modal);
        modal.emit(("" + (!isPanel ? 'modalBeforeRemove ' : '') + modalType + "BeforeRemove"), modal.el, route, modal);
        var modalComponent = modal.el.f7Component;
        if (modalComponent) {
          modalComponent.$destroy();
        }
        Utils.nextTick(function () {
          if (modalComponent || modalParams.component) {
            router.removeModal(modal.el);
          }
          modal.destroy();
          delete modal.route;
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
          modal.route = Utils.extend(options.route, { modal: modal });
          router.currentRoute = modal.route;
        }

        // Update Router History
        if (options.history) {
          router.history.push(options.route.url);
          router.saveHistory();
        }
      }

      if (hasEl) {
        // Remove theme elements
        router.removeThemeElements(modal.el);

        // Emit events
        modal.$el.trigger(((modalType.toLowerCase()) + ":init " + (modalType.toLowerCase()) + ":mounted"), route, modal);
        router.emit((modalOrPanel + "Init " + modalType + "Init " + modalType + "Mounted"), modal.el, route, modal);
      }

      // Open
      modal.open();
    }

    // Load Modal Content
    function loadModal(loadModalParams, loadModalOptions) {
      // Load Modal Props
      var url = loadModalParams.url;
      var content = loadModalParams.content;
      var template = loadModalParams.template;
      var templateUrl = loadModalParams.templateUrl;
      var component = loadModalParams.component;
      var componentUrl = loadModalParams.componentUrl;

      // Component/Template Callbacks
      function resolve(contentEl) {
        if (contentEl) {
          if (typeof contentEl === 'string') {
            modalParams.content = contentEl;
          } else if (contentEl.f7Component) {
            contentEl.f7Component.$mount(function (componentEl) {
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

      if (content) {
        resolve(content);
      } else if (template || templateUrl) {
        try {
          router.modalTemplateLoader(template, templateUrl, loadModalOptions, resolve, reject);
        } catch (err) {
          router.allowPageChange = true;
          throw err;
        }
      } else if (component || componentUrl) {
        // Load from component (F7/Vue/React/...)
        try {
          router.modalComponentLoader(app.root[0], component, componentUrl, loadModalOptions, resolve, reject);
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
        router.xhrRequest(url, loadModalOptions)
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

    var foundLoadProp;
    ('url content component el componentUrl template templateUrl').split(' ').forEach(function (modalLoadProp) {
      var obj;

      if (modalParams[modalLoadProp] && !foundLoadProp) {
        foundLoadProp = true;
        loadModal(( obj = {}, obj[modalLoadProp] = modalParams[modalLoadProp], obj ), options);
      }
    });
    if (!foundLoadProp && modalType === 'actions') {
      onModalLoaded();
    }

    // Async
    function asyncResolve(resolveParams, resolveOptions) {
      loadModal(resolveParams, Utils.extend(options, resolveOptions));
    }
    function asyncReject() {
      router.allowPageChange = true;
    }
    if (modalParams.async) {
      modalParams.async.call(router, options.route, router.currentRoute, asyncResolve, asyncReject);
    }
    return router;
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

    var $newPage = $(el);
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
            var $pageToRemove = $(pageToRemove);
            var $navbarToRemove;
            if (separateNavbar) {
              // $navbarToRemove = $oldNavbarInner.prevAll('.navbar-previous').eq(index);
              $navbarToRemove = $(app.navbar.getElByPage($pageToRemove));
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
            $navbarToRemove = $(app.navbar.getElByPage($pageToRemove));
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
    var newPageInDom = $newPage.parents(doc).length > 0;
    var f7Component = $newPage[0].f7Component;

    function insertPage() {
      if ($newPage.next($oldPage).length === 0) {
        if (!newPageInDom && f7Component) {
          f7Component.$mount(function (componentEl) {
            $(componentEl).insertBefore($oldPage);
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
          if (!router.$navbarEl.parents(doc).length) {
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
      // Tab route
      if (options.route.route.tab) {
        router.tabLoad(options.route.route.tab, Utils.extend({}, options, {
          history: false,
          pushState: false,
          preload: true,
        }));
      }
      // Page init and before init events
      router.pageCallback('init', $newPage, $newNavbarInner, 'previous', 'current', options, $oldPage);
      if ($newPage.prevAll('.page-previous:not(.stacked)').length > 0) {
        $newPage.prevAll('.page-previous:not(.stacked)').each(function (index, pageToRemove) {
          var $pageToRemove = $(pageToRemove);
          var $navbarToRemove;
          if (separateNavbar) {
            // $navbarToRemove = $newNavbarInner.prevAll('.navbar-previous:not(.stacked)').eq(index);
            $navbarToRemove = $(app.navbar.getElByPage($pageToRemove));
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
    if (!(Device.ie || Device.edge || (Device.firefox && !Device.ios))) {
      if (router.params.pushState && options.pushState) {
        if (backIndex) { History.go(-backIndex); }
        else { History.back(); }
      }
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

    // History State
    if (Device.ie || Device.edge || (Device.firefox && !Device.ios)) {
      if (router.params.pushState && options.pushState) {
        if (backIndex) { History.go(-backIndex); }
        else { History.back(); }
      }
    }

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
      if (preloadPreviousPage && router.history[router.history.length - 2]) {
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

    if (
      options.route.url
      && router.url === options.route.url
      && !(options.reloadCurrent || options.reloadPrevious)
      && !router.params.allowDuplicateUrls
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
      router.xhrRequest(url, options)
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
    var ref;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var router = this;
    if (router.swipeBackActive) { return router; }
    var navigateUrl;
    var navigateOptions;
    var route;
    if (typeof args[0] === 'object') {
      navigateOptions = args[0] || {};
    } else {
      navigateUrl = args[0];
      navigateOptions = args[1] || {};
    }

    var name = navigateOptions.name;
    var params = navigateOptions.params;
    var query = navigateOptions.query;
    if (name) {
      // find route by name
      route = router.findRouteByKey('name', name);
      if (!route) {
        throw new Error(("Framework7: route with name \"" + name + "\" not found"));
      }
      navigateUrl = router.constructRouteUrl(route, { params: params, query: query });
      if (navigateUrl) {
        return router.back(navigateUrl, Utils.extend({}, navigateOptions, {
          name: null,
          params: null,
          query: null,
        }));
      }
      throw new Error(("Framework7: can't construct URL for route with name \"" + name + "\""));
    }

    var app = router.app;
    if (!router.view) {
      (ref = app.views.main.router).back.apply(ref, args);
      return router;
    }

    var currentRouteIsModal = router.currentRoute.modal;
    var modalType;
    if (!currentRouteIsModal) {
      ('popup popover sheet loginScreen actions customModal panel').split(' ').forEach(function (modalLoadProp) {
        if (router.currentRoute.route[modalLoadProp]) {
          currentRouteIsModal = true;
          modalType = modalLoadProp;
        }
      });
    }
    if (currentRouteIsModal) {
      var modalToClose = router.currentRoute.modal
                           || router.currentRoute.route.modalInstance
                           || app[modalType].get();
      var previousUrl = router.history[router.history.length - 2];
      var previousRoute;
      // check if previous route is modal too
      if (modalToClose && modalToClose.$el) {
        var prevOpenedModals = modalToClose.$el.prevAll('.modal-in');
        if (prevOpenedModals.length && prevOpenedModals[0].f7Modal) {
          previousRoute = prevOpenedModals[0].f7Modal.route;
        }
      }
      if (!previousRoute) {
        previousRoute = router.findMatchingRoute(previousUrl);
      }

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
      if (router.params.pushState
        && $previousPage[0].f7Page
        && router.history[router.history.length - 2] !== $previousPage[0].f7Page.route.url
      ) {
        router.back(
          router.history[router.history.length - 2],
          Utils.extend(navigateOptions, { force: true })
        );
        return router;
      }

      var previousPageRoute = $previousPage[0].f7Page.route;
      processRouteQueue.call(
        router,
        previousPageRoute,
        router.currentRoute,
        function () {
          router.loadBack({ el: $previousPage }, Utils.extend(navigateOptions, {
            route: previousPageRoute,
          }));
        },
        function () {}
      );

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
    route = router.findMatchingRoute(navigateUrl);
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

    if (options && options.context) {
      route.context = options.context;
      options.route.context = options.context;
    }

    var backForceLoaded;
    if (options.force && router.params.stackPages) {
      router.$el.children('.page-previous.stacked').each(function (index, pageEl) {
        if (pageEl.f7Page && pageEl.f7Page.route && pageEl.f7Page.route.url === route.url) {
          backForceLoaded = true;
          router.loadBack({ el: pageEl }, options);
        }
      });
      if (backForceLoaded) {
        return router;
      }
    }
    function resolve() {
      var routerLoaded = false;
      ('url content component pageName el componentUrl template templateUrl').split(' ').forEach(function (pageLoadProp) {
        var obj;

        if (route.route[pageLoadProp] && !routerLoaded) {
          routerLoaded = true;
          router.loadBack(( obj = {}, obj[pageLoadProp] = route.route[pageLoadProp], obj ), options);
        }
      });
      if (routerLoaded) { return; }
      // Async
      function asyncResolve(resolveParams, resolveOptions) {
        router.allowPageChange = false;
        if (resolveOptions && resolveOptions.context) {
          if (!route.context) { route.context = resolveOptions.context; }
          else { route.context = Utils.extend({}, route.context, resolveOptions.context); }
          options.route.context = route.context;
        }
        router.loadBack(resolveParams, Utils.extend(options, resolveOptions), true);
      }
      function asyncReject() {
        router.allowPageChange = true;
      }
      if (route.route.async) {
        router.allowPageChange = false;

        route.route.async.call(router, route, router.currentRoute, asyncResolve, asyncReject);
      }
    }
    function reject() {
      router.allowPageChange = true;
    }

    if (options.preload) {
      resolve();
    } else {
      processRouteQueue.call(
        router,
        route,
        router.currentRoute,
        function () {
          resolve();
        },
        function () {
          reject();
        }
      );
    }

    // Return Router
    return router;
  }

  function clearPreviousHistory() {
    var router = this;
    var app = router.app;
    var separateNavbar = router.separateNavbar;
    var url = router.history[router.history.length - 1];

    var $currentPageEl = $(router.currentPageEl);

    var $pagesToRemove = router.$el
      .children('.page:not(.stacked)')
      .filter(function (index, pageInView) { return pageInView !== $currentPageEl[0]; });

    $pagesToRemove.each(function (index, pageEl) {
      var $oldPageEl = $(pageEl);
      var $oldNavbarInnerEl = $(app.navbar.getElByPage($oldPageEl));
      if (router.params.stackPages && router.initialPages.indexOf($oldPageEl[0]) >= 0) {
        $oldPageEl.addClass('stacked');
        if (separateNavbar) {
          $oldNavbarInnerEl.addClass('stacked');
        }
      } else {
        // Page remove event
        router.pageCallback('beforeRemove', $oldPageEl, $oldNavbarInnerEl, 'previous', undefined, {});
        router.removePage($oldPageEl);
        if (separateNavbar && $oldNavbarInnerEl.length) {
          router.removeNavbar($oldNavbarInnerEl);
        }
      }
    });

    router.history = [url];
    router.view.history = [url];
    router.saveHistory();
  }

  var Router = (function (Framework7Class$$1) {
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
      router.tempDom = doc.createElement('div');

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
        var $el = $(el);
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
        Utils.nextFrame(function () {
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
        $shadowEl = $('<div class="page-shadow-effect"></div>');
        $opacityEl = $('<div class="page-opacity-effect"></div>');

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
        Utils.requestAnimationFrame(render);
      }

      router.$el.addClass(routerTransitionClass);

      Utils.requestAnimationFrame(render);
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
      var $tabEl = $(tabEl);
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
      var $el = $(el);
      if ($el.length === 0) { return; }
      $el.find('.tab').each(function (tabIndex, tabEl) {
        $(tabEl).children().each(function (index, tabChild) {
          if (tabChild.f7Component) {
            $(tabChild).trigger('tab:beforeremove');
            tabChild.f7Component.$destroy();
          }
        });
      });
      if ($el[0].f7Component && $el[0].f7Component.$destroy) {
        $el[0].f7Component.$destroy();
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
        if ($(content).hasClass('page')) {
          return content;
        }
        router.tempDom.innerHTML = '';
        $(router.tempDom).append(content);
      }

      return router.findElement('.page', router.tempDom);
    };

    Router.prototype.findElement = function findElement (stringSelector, container, notStacked) {
      var router = this;
      var view = router.view;
      var app = router.app;

      // Modals Selector
      var modalsSelector = '.popup, .dialog, .popover, .actions-modal, .sheet-modal, .login-screen, .page';

      var $container = $(container);
      var selector = stringSelector;
      if (notStacked) { selector += ':not(.stacked)'; }

      var found = $container
        .find(selector)
        .filter(function (index, el) { return $(el).parents(modalsSelector).length === 0; });

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
      if (found && found.length > 1) { return $(found[0]); }
      return undefined;
    };

    Router.prototype.flattenRoutes = function flattenRoutes (routes) {
      var this$1 = this;
      if ( routes === void 0 ) routes = this.routes;

      var flattenedRoutes = [];
      routes.forEach(function (route) {
        var hasTabRoutes = false;
        if ('tabs' in route && route.tabs) {
          var mergedPathsRoutes = route.tabs.map(function (tabRoute) {
            var tRoute = Utils.extend({}, route, {
              path: (((route.path) + "/" + (tabRoute.path))).replace('///', '/').replace('//', '/'),
              parentPath: route.path,
              tab: tabRoute,
            });
            delete tRoute.tabs;
            delete tRoute.routes;
            return tRoute;
          });
          hasTabRoutes = true;
          flattenedRoutes = flattenedRoutes.concat(this$1.flattenRoutes(mergedPathsRoutes));
        }
        if ('routes' in route) {
          var mergedPathsRoutes$1 = route.routes.map(function (childRoute) {
            var cRoute = Utils.extend({}, childRoute);
            cRoute.path = (((route.path) + "/" + (cRoute.path))).replace('///', '/').replace('//', '/');
            return cRoute;
          });
          if (hasTabRoutes) {
            flattenedRoutes = flattenedRoutes.concat(this$1.flattenRoutes(mergedPathsRoutes$1));
          } else {
            flattenedRoutes = flattenedRoutes.concat(route, this$1.flattenRoutes(mergedPathsRoutes$1));
          }
        }
        if (!('routes' in route) && !('tabs' in route && route.tabs)) {
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

    // eslint-disable-next-line
    Router.prototype.constructRouteUrl = function constructRouteUrl (route, ref) {
      if ( ref === void 0 ) ref = {};
      var params = ref.params;
      var query = ref.query;

      var path = route.path;
      var toUrl = pathToRegexp_1.compile(path);
      var url;
      try {
        url = toUrl(params || {});
      } catch (error) {
        throw new Error(("Framework7: error constructing route URL from passed params:\nRoute: " + path + "\n" + (error.toString())));
      }

      if (query) {
        if (typeof query === 'string') { url += "?" + query; }
        else { url += "?" + (Utils.serializeObject(query)); }
      }

      return url;
    };

    Router.prototype.findTabRoute = function findTabRoute (tabEl) {
      var router = this;
      var $tabEl = $(tabEl);
      var parentPath = router.currentRoute.route.parentPath;
      var tabId = $tabEl.attr('id');
      var flattenedRoutes = router.flattenRoutes(router.routes);
      var foundTabRoute;
      flattenedRoutes.forEach(function (route) {
        if (
          route.parentPath === parentPath
          && route.tab
          && route.tab.id === tabId
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
            if (typeof keyObj.name === 'number') { return; }
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

    Router.prototype.xhrRequest = function xhrRequest (requestUrl, options) {
      var router = this;
      var params = router.params;
      var ignoreCache = options.ignoreCache;
      var url = requestUrl;

      var hasQuery = url.indexOf('?') >= 0;
      if (params.passRouteQueryToRequest
        && options
        && options.route
        && options.route.query
        && Object.keys(options.route.query).length
      ) {
        url += "" + (hasQuery ? '&' : '?') + (Utils.serializeObject(options.route.query));
        hasQuery = true;
      }

      if (params.passRouteParamsToRequest
        && options
        && options.route
        && options.route.params
        && Object.keys(options.route.params).length
      ) {
        url += "" + (hasQuery ? '&' : '?') + (Utils.serializeObject(options.route.params));
        hasQuery = true;
      }

      if (url.indexOf('{{') >= 0
        && options
        && options.route
        && options.route.params
        && Object.keys(options.route.params).length
      ) {
        Object.keys(options.route.params).forEach(function (paramName) {
          var regExp = new RegExp(("{{" + paramName + "}}"), 'g');
          url = url.replace(regExp, options.route.params[paramName] || '');
        });
      }
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
          beforeSend: function beforeSend(xhr) {
            router.emit('routerAjaxStart', xhr, options);
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
              router.emit('routerAjaxSuccess', xhr, options);
              resolve(xhr.responseText);
            } else {
              router.emit('routerAjaxError', xhr, options);
              reject(xhr);
            }
          },
          error: function error(xhr) {
            router.emit('routerAjaxError', xhr, options);
            reject(xhr);
          },
        });
      });
    };

    // Remove theme elements
    Router.prototype.removeThemeElements = function removeThemeElements (el) {
      var router = this;
      var theme = router.app.theme;
      $(el).find(("." + (theme === 'md' ? 'ios' : 'md') + "-only, .if-" + (theme === 'md' ? 'ios' : 'md'))).remove();
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
          .xhrRequest(templateUrl, options)
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
      var app = router.app;
      var url = typeof component === 'string' ? component : componentUrl;
      function compile(componentOptions) {
        var context = options.context || {};
        if (typeof context === 'function') { context = context.call(router); }
        else if (typeof context === 'string') {
          try {
            context = JSON.parse(context);
          } catch (err) {
            reject();
            throw (err);
          }
        }
        var extendContext = Utils.merge(
          {},
          context,
          {
            $route: options.route,
            $router: router,
            $theme: {
              ios: app.theme === 'ios',
              md: app.theme === 'md',
            },
          }
        );
        var createdComponent = app.component.create(componentOptions, extendContext);
        resolve(createdComponent.el);
      }
      var cachedComponent;
      if (url) {
        router.cache.components.forEach(function (cached) {
          if (cached.url === url) { cachedComponent = cached.component; }
        });
      }
      if (url && cachedComponent) {
        compile(cachedComponent);
      } else if (url && !cachedComponent) {
        // Load via XHR
        if (router.xhr) {
          router.xhr.abort();
          router.xhr = false;
        }
        router
          .xhrRequest(url, options)
          .then(function (loadedComponent) {
            var parsedComponent = app.component.parse(loadedComponent);
            router.cache.components.push({
              url: url,
              component: parsedComponent,
            });
            compile(parsedComponent);
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
      var $pageEl = $(pageEl);
      var $navbarEl = $(navbarEl);
      var currentPage = $pageEl[0].f7Page || {};
      var direction;
      var pageFrom;
      if ((from === 'next' && to === 'current') || (from === 'current' && to === 'previous')) { direction = 'forward'; }
      if ((from === 'current' && to === 'next') || (from === 'previous' && to === 'current')) { direction = 'backward'; }
      if (currentPage && !currentPage.fromPage) {
        var $pageFromEl = $(pageFromEl);
        if ($pageFromEl.length) {
          pageFrom = $pageFromEl[0].f7Page;
        }
      }
      pageFrom = currentPage.pageFrom || pageFrom;
      if (pageFrom && pageFrom.pageFrom) {
        pageFrom.pageFrom = null;
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
        pageFrom: pageFrom,
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
      var $pageEl = $(pageEl);
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
      page.swipeBack = !!options.swipeBack;

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
        if (restoreScrollTopOnBack && (from === 'previous' || !from) && to === 'current' && router.scrollHistory[page.route.url] && !$pageEl.hasClass('no-restore-scroll')) {
          var $pageContent = $pageEl.find('.page-content');
          if ($pageContent.length > 0) {
            // eslint-disable-next-line
            $pageContent = $pageContent.filter(function (pageContentIndex, pageContentEl) {
              return (
                $(pageContentEl).parents('.tab:not(.tab-active)').length === 0
                && !$(pageContentEl).is('.tab:not(.tab-active)')
              );
            });
          }
          $pageContent.scrollTop(router.scrollHistory[page.route.url]);
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
        var $pageContent$1 = $pageEl.find('.page-content');
        if ($pageContent$1.length > 0) {
          // eslint-disable-next-line
          $pageContent$1 = $pageContent$1.filter(function (pageContentIndex, pageContentEl) {
            return (
              $(pageContentEl).parents('.tab:not(.tab-active)').length === 0
              && !$(pageContentEl).is('.tab:not(.tab-active)')
            );
          });
        }
        router.scrollHistory[page.route.url] = $pageContent$1.scrollTop();
      }
      if (restoreScrollTopOnBack && callback === 'beforeOut' && from === 'current' && to === 'next') {
        // Delete scroll position
        delete router.scrollHistory[page.route.url];
      }

      $pageEl.trigger(colonName, page);
      router.emit(camelName, page);

      if (callback === 'beforeRemove') {
        detachEvents();
        if ($pageEl[0].f7Page && $pageEl[0].f7Page.navbarEl) {
          delete $pageEl[0].f7Page.navbarEl.f7Page;
        }
        $pageEl[0].f7Page = null;
      }
    };

    Router.prototype.saveHistory = function saveHistory () {
      var router = this;
      router.view.history = router.history;
      if (router.params.pushState) {
        win.localStorage[("f7router-" + (router.view.id) + "-history")] = JSON.stringify(router.history);
      }
    };

    Router.prototype.restoreHistory = function restoreHistory () {
      var router = this;
      if (router.params.pushState && win.localStorage[("f7router-" + (router.view.id) + "-history")]) {
        router.history = JSON.parse(win.localStorage[("f7router-" + (router.view.id) + "-history")]);
        router.view.history = router.history;
      }
    };

    Router.prototype.clearHistory = function clearHistory () {
      var router = this;
      router.history = [];
      if (router.view) { router.view.history = []; }
      router.saveHistory();
    };

    Router.prototype.updateCurrentUrl = function updateCurrentUrl (newUrl) {
      var router = this;
      // Update history
      if (router.history.length) {
        router.history[router.history.length - 1] = newUrl;
      } else {
        router.history.push(newUrl);
      }

      // Update current route params
      var ref = router.parseRouteUrl(newUrl);
      var query = ref.query;
      var hash = ref.hash;
      var params = ref.params;
      var url = ref.url;
      var path = ref.path;
      if (router.currentRoute) {
        Utils.extend(router.currentRoute, {
          query: query,
          hash: hash,
          params: params,
          url: url,
          path: path,
        });
      }

      if (router.params.pushState) {
        var pushStateRoot = router.params.pushStateRoot || '';
        History.replace(
          router.view.id,
          {
            url: newUrl,
          },
          pushStateRoot + router.params.pushStateSeparator + newUrl
        );
      }

      // Save History
      router.saveHistory();

      router.emit('routeUrlUpdate', router.currentRoute, router);
    };

    Router.prototype.init = function init () {
      var router = this;
      var app = router.app;
      var view = router.view;

      // Init Swipeback
      {
        if (
          (view && router.params.iosSwipeBack && app.theme === 'ios')
          || (view && router.params.mdSwipeBack && app.theme === 'md')
        ) {
          SwipeBack(router);
        }
      }

      // Dynamic not separated navbbar
      if (router.dynamicNavbar && !router.separateNavbar) {
        router.$el.addClass('router-dynamic-navbar-inside');
      }

      var initUrl = router.params.url;
      var documentUrl = doc.location.href.split(doc.location.origin)[1];
      var historyRestored;
      var ref = router.params;
      var pushState = ref.pushState;
      var pushStateOnLoad = ref.pushStateOnLoad;
      var pushStateSeparator = ref.pushStateSeparator;
      var pushStateAnimateOnLoad = ref.pushStateAnimateOnLoad;
      var ref$1 = router.params;
      var pushStateRoot = ref$1.pushStateRoot;
      if (win.cordova && pushState && !pushStateSeparator && !pushStateRoot && doc.location.pathname.indexOf('index.html')) {
        // eslint-disable-next-line
        console.warn('Framework7: wrong or not complete pushState configuration, trying to guess pushStateRoot');
        pushStateRoot = doc.location.pathname.split('index.html')[0];
      }

      if (!pushState || !pushStateOnLoad) {
        if (!initUrl) {
          initUrl = documentUrl;
        }
        if (doc.location.search && initUrl.indexOf('?') < 0) {
          initUrl += doc.location.search;
        }
        if (doc.location.hash && initUrl.indexOf('#') < 0) {
          initUrl += doc.location.hash;
        }
      } else {
        if (pushStateRoot && documentUrl.indexOf(pushStateRoot) >= 0) {
          documentUrl = documentUrl.split(pushStateRoot)[1];
          if (documentUrl === '') { documentUrl = '/'; }
        }
        if (pushStateSeparator.length > 0 && documentUrl.indexOf(pushStateSeparator) >= 0) {
          initUrl = documentUrl.split(pushStateSeparator)[1];
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
          router.history = [documentUrl.split(pushStateSeparator)[0] || '/', initUrl];
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
          var $pageEl = $(pageEl);
          router.initialPages.push($pageEl[0]);
          if (router.separateNavbar && $pageEl.children('.navbar').length > 0) {
            router.initialNavbars.push($pageEl.children('.navbar').find('.navbar-inner')[0]);
          }
        });
      }

      if (router.$el.children('.page:not(.stacked)').length === 0 && initUrl) {
        // No pages presented in DOM, reload new page
        router.navigate(initUrl, {
          initial: true,
          reloadCurrent: true,
          pushState: false,
        });
      } else {
        // Init current DOM page
        var hasTabRoute;
        router.currentRoute = currentRoute;
        router.$el.children('.page:not(.stacked)').each(function (index, pageEl) {
          var $pageEl = $(pageEl);
          var $navbarInnerEl;
          $pageEl.addClass('page-current');
          if (router.separateNavbar) {
            $navbarInnerEl = $pageEl.children('.navbar').children('.navbar-inner');
            if ($navbarInnerEl.length > 0) {
              if (!router.$navbarEl.parents(doc).length) {
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
            hasTabRoute = true;
            router.tabLoad(initOptions.route.route.tab, Utils.extend({}, initOptions));
          }
          router.pageCallback('init', $pageEl, $navbarInnerEl, 'current', undefined, initOptions);
        });
        if (historyRestored) {
          router.navigate(initUrl, {
            initial: true,
            pushState: false,
            history: false,
            animate: pushStateAnimateOnLoad,
            once: {
              pageAfterIn: function pageAfterIn() {
                if (router.history.length > 2) {
                  router.back({ preload: true });
                }
              },
            },
          });
        }
        if (!historyRestored && !hasTabRoute) {
          router.history.push(initUrl);
          router.saveHistory();
        }
      }
      if (initUrl && pushState && pushStateOnLoad && (!History.state || !History.state[view.id])) {
        History.initViewState(view.id, {
          url: initUrl,
        });
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

  // Load
  Router.prototype.forward = forward;
  Router.prototype.load = load;
  Router.prototype.navigate = navigate;
  Router.prototype.refreshPage = refreshPage;
  // Tab
  Router.prototype.tabLoad = tabLoad;
  Router.prototype.tabRemove = tabRemove;
  // Modal
  Router.prototype.modalLoad = modalLoad;
  Router.prototype.modalRemove = modalRemove;
  // Back
  Router.prototype.backward = backward;
  Router.prototype.loadBack = loadBack;
  Router.prototype.back = back;
  // Clear history
  Router.prototype.clearPreviousHistory = clearPreviousHistory;

  var Router$1 = {
    name: 'router',
    static: {
      Router: Router,
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
          instance.router = new Router(instance.app, instance);
        }
      } else {
        // App Router
        instance.router = new Router(instance);
      }
    },
  };

  var View = (function (Framework7Class$$1) {
    function View(appInstance, el, viewParams) {
      if ( viewParams === void 0 ) viewParams = {};

      Framework7Class$$1.call(this, viewParams, [appInstance]);

      var app = appInstance;
      var $el = $(el);
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
          $navbarEl = $('<div class="navbar"></div>');
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
        view.$el.trigger('view:init', view);
        view.emit('local::init viewInit', view);
      }
    };

    return View;
  }(Framework7Class));

  // Use Router
  View.use(Router$1);

  function getCurrentView(app) {
    var popoverView = $('.popover.modal-in .view');
    var popupView = $('.popup.modal-in .view');
    var panelView = $('.panel.panel-active .view');
    var appViews = $('.views');
    if (appViews.length === 0) { appViews = app.root; }
    // Find active view as tab
    var appView = appViews.children('.view');
    // Propably in tabs or split view
    if (appView.length > 1) {
      if (appView.hasClass('tab')) {
        // Tabs
        appView = appViews.children('.view.tab-active');
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

  var view = {
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
        allowDuplicateUrls: false,
        reloadPages: false,
        removeElements: true,
        removeElementsWithTimeout: false,
        removeElementsTimeout: 0,
        restoreScrollTopOnBack: true,
        unloadTabContent: true,
        passRouteQueryToRequest: true,
        passRouteParamsToRequest: false,
        // Swipe Back
        iosSwipeBack: true,
        iosSwipeBackAnimateShadow: true,
        iosSwipeBackAnimateOpacity: true,
        iosSwipeBackActiveArea: 30,
        iosSwipeBackThreshold: 0,
        mdSwipeBack: false,
        mdSwipeBackAnimateShadow: true,
        mdSwipeBackAnimateOpacity: false,
        mdSwipeBackActiveArea: 30,
        mdSwipeBackThreshold: 0,
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
        // Routes hooks
        routesBeforeEnter: null,
        routesBeforeLeave: null,
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
            var $viewEl = $(viewEl);
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
        $('.view-init').each(function (index, viewEl) {
          if (viewEl.f7View) { return; }
          var viewParams = $(viewEl).dataset();
          app.views.create(viewEl, viewParams);
        });
      },
      modalOpen: function modalOpen(modal) {
        var app = this;
        modal.$el.find('.view-init').each(function (index, viewEl) {
          if (viewEl.f7View) { return; }
          var viewParams = $(viewEl).dataset();
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

  return view;
}
framework7ComponentLoader.componentName = 'view';

