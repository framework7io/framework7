
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

  function swipePanel(panel) {
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
      if ($('.modal-in, .photo-browser-in').length > 0) { return; }
      otherPanel = app.panel[side === 'left' ? 'right' : 'left'] || {};
      if (!panel.opened && otherPanel.opened) { return; }
      if (!(params.swipeCloseOpposite || params.swipeOnlyClose)) {
        if (otherPanel.opened) { return; }
      }
      if (e.target && e.target.nodeName.toLowerCase() === 'input' && e.target.type === 'range') { return; }
      if ($(e.target).closest('.range-slider, .tabs-swipeable-wrap, .calendar-months, .no-swipe-panel').length > 0) { return; }
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
      if (params.swipeCloseActiveAreaSide && panel.opened) {
        if (side === 'left') {
          if (touchesStart.x < ($el[0].offsetWidth - params.swipeCloseActiveAreaSide)) { return; }
        }
        if (side === 'right') {
          if (touchesStart.x > ((app.width - $el[0].offsetWidth) + params.swipeCloseActiveAreaSide)) { return; }
        }
      }
      touchMoves = 0;
      $viewEl = $(panel.getViewEl());
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
          if (params.swipeActiveArea > 0 && !panel.opened) {
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
          (side === 'left'
            && (
              direction === 'to-left' && !$el.hasClass('panel-active')
            )
          )
          || (side === 'right'
            && (
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
            if (side === 'right') { app.panel.open(side); }
            if (side === 'left' && $el.hasClass('panel-active')) { app.panel.close(); }
          }
          if (direction === 'to-right') {
            if (side === 'left') { app.panel.open(side); }
            if (side === 'right' && $el.hasClass('panel-active')) { app.panel.close(); }
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

      var threshold = params.swipeThreshold || 0;

      if (!panel.opened) {
        if (Math.abs(touchesDiff) < threshold) {
          action = 'reset';
        } else if (effect === 'cover') {
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
          || (timeDiff >= 300 && (Math.abs(translate) >= panelWidth / 2))
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
        || (timeDiff >= 300 && (Math.abs(translate) <= panelWidth / 2))
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
            $('html').addClass('with-panel-transitioning');
            target.transitionEnd(function () {
              if ($el.hasClass('panel-active')) { return; }
              $el.css({ display: '' });
              $('html').removeClass('with-panel-transitioning');
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

  var Panel = (function (Framework7Class$$1) {
    function Panel(app, params) {
      var obj;

      if ( params === void 0 ) params = {};
      Framework7Class$$1.call(this, params, [app]);
      var panel = this;

      var el = params.el;

      if (!el && params.content) {
        el = params.content;
      }

      var $el = $(el);
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
      } else {
        throw new Error(("Framework7: Can't create panel; app already has a " + side + " panel!"));
      }

      var $backdropEl = $('.panel-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = $('<div class="panel-backdrop"></div>');
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
          || (app.params.panel.swipe === 'both')
          || (app.params.panel.swipe && app.params.panel.swipe !== panel.side && app.params.panel.swipeCloseOpposite)
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
      var $viewEl = $(panel.getViewEl());
      var breakpoint = app.params.panel[(side + "Breakpoint")];
      var wasVisible = $el.hasClass('panel-visible-by-breakpoint');

      if (app.width >= breakpoint) {
        if (!wasVisible) {
          $('html').removeClass(("with-panel-" + side + "-reveal with-panel-" + side + "-cover with-panel"));
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
        swipePanel(this);
      }
    };

    Panel.prototype.destroy = function destroy () {
      var panel = this;
      var app = panel.app;

      if (!panel.$el) {
        // Panel already destroyed
        return;
      }

      panel.emit('local::beforeDestroy panelBeforeDestroy', panel);
      panel.$el.trigger('panel:beforedestroy', panel);

      if (panel.resizeHandler) {
        app.off('resize', panel.resizeHandler);
      }
      panel.$el.trigger('panel:destroy', panel);
      panel.emit('local::destroy panelDestroy');
      delete app.panel[panel.side];
      if (panel.el) {
        panel.el.f7Panel = null;
        delete panel.el.f7Panel;
      }
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

      var $panelParentEl = $el.parent();
      var wasInDom = $el.parents(document).length > 0;

      if (!$panelParentEl.is(app.root)) {
        var $insertBeforeEl = app.root.children('.panel, .views, .view').eq(0);
        var $insertAfterEl = app.root.children('.statusbar').eq(0);

        if ($insertBeforeEl.length) {
          $el.insertBefore($insertBeforeEl);
        } else if ($insertAfterEl.length) {
          $el.insertAfter($insertBeforeEl);
        } else {
          app.root.prepend($el);
        }

        panel.once('panelClosed', function () {
          if (wasInDom) {
            $panelParentEl.append($el);
          } else {
            $el.remove();
          }
        });
      }

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
      // panel._clientLeft = $el[0].clientLeft;

      Utils.nextFrame(function () {
        $('html').addClass(("with-panel with-panel-" + side + "-" + effect));
        panel.onOpen();

        // Transition End;
        var transitionEndTarget = effect === 'reveal' ? $el.nextAll('.view, .views').eq(0) : $el;

        function panelTransitionEnd() {
          transitionEndTarget.transitionEnd(function (e) {
            if ($(e.target).is(transitionEndTarget)) {
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
      });

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
          $('html').removeClass('with-panel-transitioning');
          panel.onClosed();
        });
        $('html')
          .removeClass(("with-panel with-panel-" + side + "-" + effect))
          .addClass('with-panel-transitioning');
      } else {
        $el.css({ display: '' });
        $el.removeClass('not-animated');
        $('html').removeClass(("with-panel with-panel-transitioning with-panel-" + side + "-" + effect));
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

  var panel = {
    name: 'panel',
    params: {
      panel: {
        leftBreakpoint: 0,
        rightBreakpoint: 0,
        swipe: undefined, // or 'left' or 'right' or 'both'
        swipeActiveArea: 0,
        swipeCloseActiveAreaSide: 0,
        swipeCloseOpposite: true,
        swipeOnlyClose: false,
        swipeNoFollow: false,
        swipeThreshold: 0,
        closeByBackdropClick: true,
      },
    },
    static: {
      Panel: Panel,
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
              panels.push(app.panel[side]);
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
              (app.params.panel.swipe === 'left' && side === 'right')
              || (app.params.panel.swipe === 'right' && side === 'left')
              || side === 'both'
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
          return new Panel(app, params);
        },
        open: function open(side, animate) {
          var panelSide = side;
          if (!panelSide) {
            if ($('.panel').length > 1) {
              return false;
            }
            panelSide = $('.panel').hasClass('panel-left') ? 'left' : 'right';
          }
          if (!panelSide) { return false; }
          if (app.panel[panelSide]) {
            return app.panel[panelSide].open(animate);
          }
          var $panelEl = $((".panel-" + panelSide));
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
            $panelEl = $((".panel-" + panelSide));
          } else {
            $panelEl = $('.panel.panel-active');
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
            if ($('.panel').length > 1) {
              return undefined;
            }
            panelSide = $('.panel').hasClass('panel-left') ? 'left' : 'right';
          }
          if (!panelSide) { return undefined; }
          if (app.panel[panelSide]) {
            return app.panel[panelSide];
          }
          var $panelEl = $((".panel-" + panelSide));
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
        $('.panel').each(function (index, panelEl) {
          var side = $(panelEl).hasClass('panel-left') ? 'left' : 'right';
          app.panel[side] = app.panel.create({ el: panelEl, side: side });
        });
      },
    },
    clicks: {
      '.panel-open': function open(clickedEl, data) {
        if ( data === void 0 ) data = {};

        var app = this;
        var side = 'left';
        if (data.panel === 'right' || ($('.panel').length === 1 && $('.panel').hasClass('panel-right'))) {
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
        var $panelEl = $('.panel-active');
        var instance = $panelEl[0] && $panelEl[0].f7Panel;
        $panelEl.trigger('panel:backdrop-click');
        if (instance) {
          instance.emit('backdropClick', instance);
        }
        app.emit('panelBackdropClick', instance || $panelEl[0]);
        if (app.params.panel.closeByBackdropClick) { app.panel.close(); }
      },
    },
  };

  return panel;
}
framework7ComponentLoader.componentName = 'panel';

