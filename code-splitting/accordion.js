
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

  /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */

  var Accordion = {
    toggleClicked: function toggleClicked($clickedEl) {
      var app = this;
      var $accordionItemEl = $clickedEl.closest('.accordion-item').eq(0);
      if (!$accordionItemEl.length) { $accordionItemEl = $clickedEl.parents('li').eq(0); }

      var $accordionContent = $clickedEl.parents('.accordion-item-content').eq(0);
      if ($accordionContent.length) {
        if ($accordionContent.parents($accordionItemEl).length) { return; }
      }

      if ($clickedEl.parents('li').length > 1 && $clickedEl.parents('li')[0] !== $accordionItemEl[0]) { return; }
      app.accordion.toggle($accordionItemEl);
    },
    open: function open(el) {
      var app = this;
      var $el = $(el);
      var $list = $el.parents('.accordion-list').eq(0);
      var $contentEl = $el.children('.accordion-item-content');
      $contentEl.removeAttr('aria-hidden');
      if ($contentEl.length === 0) { $contentEl = $el.find('.accordion-item-content'); }
      if ($contentEl.length === 0) { return; }
      var $openedItem = $list.length > 0 && $el.parent().children('.accordion-item-opened');
      if ($openedItem.length > 0) {
        app.accordion.close($openedItem);
      }
      $contentEl.transitionEnd(function () {
        if ($el.hasClass('accordion-item-opened')) {
          $contentEl.transition(0);
          $contentEl.css('height', 'auto');
          Utils.nextFrame(function () {
            $contentEl.transition('');
          });
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
      var $el = $(el);
      var $contentEl = $el.children('.accordion-item-content');
      if ($contentEl.length === 0) { $contentEl = $el.find('.accordion-item-content'); }
      $el.removeClass('accordion-item-opened');
      $contentEl.attr('aria-hidden', true);
      $contentEl.transition(0);
      $contentEl.css('height', (($contentEl[0].scrollHeight) + "px"));
      // Close
      $contentEl.transitionEnd(function () {
        if ($el.hasClass('accordion-item-opened')) {
          $contentEl.transition(0);
          $contentEl.css('height', 'auto');
          Utils.nextFrame(function () {
            $contentEl.transition('');
          });
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
      var $el = $(el);
      if ($el.length === 0) { return; }
      if ($el.hasClass('accordion-item-opened')) { app.accordion.close(el); }
      else { app.accordion.open(el); }
    },
  };

  var accordion = {
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

  return accordion;
}
framework7ComponentLoader.componentName = 'accordion';

