
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

  function pickerColumn (colEl, updateItems) {
    var picker = this;
    var app = picker.app;
    var $colEl = $(colEl);
    var colIndex = $colEl.index();
    var col = picker.cols[colIndex];
    if (col.divider) { return; }

    col.$el = $colEl;
    col.el = $colEl[0];
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
            var item = $(itemEl).children('span');
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
          var $itemEl = $(itemEl);
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
      var value = $(this).attr('data-picker-value');
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
  }

  var Picker = (function (Framework7Class$$1) {
    function Picker(app, params) {
      if ( params === void 0 ) params = {};

      Framework7Class$$1.call(this, params, [app]);
      var picker = this;
      picker.params = Utils.extend({}, app.params.picker, params);

      var $containerEl;
      if (picker.params.containerEl) {
        $containerEl = $(picker.params.containerEl);
        if ($containerEl.length === 0) { return picker; }
      }

      var $inputEl;
      if (picker.params.inputEl) {
        $inputEl = $(picker.params.inputEl);
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
        needsOriginFix: app.device.ios || ((win.navigator.userAgent.toLowerCase().indexOf('safari') >= 0 && win.navigator.userAgent.toLowerCase().indexOf('chrome') < 0) && !app.device.android),
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
        var $targetEl = $(e.target);
        if (picker.isPopover()) { return; }
        if (!picker.opened) { return; }
        if ($targetEl.closest('[class*="backdrop"]').length) { return; }
        if ($inputEl && $inputEl.length > 0) {
          if ($targetEl[0] !== $inputEl[0] && $targetEl.closest('.sheet-modal').length === 0) {
            picker.close();
          }
        } else if ($(e.target).closest('.sheet-modal').length === 0) {
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
        if (app.device.ios) {
          return !!app.device.ipad;
        } if (app.width >= 768) {
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
      picker.emit('local::change pickerChange', picker, picker.value, picker.displayValue);
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
      var $colEl = $(colEl);
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
          (!initialized && params.value)
          || (initialized && value)
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
        picker.$el = $(picker.render());
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

  var picker = {
    name: 'picker',
    static: {
      Picker: Picker,
    },
    create: function create() {
      var app = this;
      app.picker = ConstructorMethods({
        defaultSelector: '.picker',
        constructor: Picker,
        app: app,
        domProp: 'f7Picker',
      });
      app.picker.close = function close(el) {
        if ( el === void 0 ) el = '.picker';

        var $el = $(el);
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
        renderToolbar: null,
        render: null,
      },
    },
  };

  return picker;
}
framework7ComponentLoader.componentName = 'picker';

