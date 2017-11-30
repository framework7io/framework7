import $ from 'dom7';
import Utils from '../../utils/utils';

const Accordion = {
  toggleClicked($clickedEl) {
    const app = this;
    let $accordionItemEl = $clickedEl.closest('.accordion-item').eq(0);
    if (!$accordionItemEl.length) $accordionItemEl = $clickedEl.parents('li').eq(0);
    app.accordion.toggle($accordionItemEl);
  },
  open(el) {
    const app = this;
    const $el = $(el);
    const $list = $el.parents('.accordion-list').eq(0);
    let $contentEl = $el.children('.accordion-item-content');
    if ($contentEl.length === 0) $contentEl = $el.find('.accordion-item-content');
    if ($contentEl.length === 0) return;
    const $openedItem = $list.length > 0 && $el.parent().children('.accordion-item-opened');
    if ($openedItem.length > 0) {
      app.accordion.close($openedItem);
    }
    $contentEl.transitionEnd(() => {
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
    $contentEl.css('height', `${$contentEl[0].scrollHeight}px`);
    $el.trigger('accordion:open');
    $el.addClass('accordion-item-opened');
    app.emit('accordionOpen', $el[0]);
  },
  close(el) {
    const app = this;
    const $el = $(el);
    let $contentEl = $el.children('.accordion-item-content');
    if ($contentEl.length === 0) $contentEl = $el.find('.accordion-item-content');
    $el.removeClass('accordion-item-opened');
    $contentEl.transition(0);
    $contentEl.css('height', `${$contentEl[0].scrollHeight}px`);
    // Close
    $contentEl.transitionEnd(() => {
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
    Utils.nextFrame(() => {
      $contentEl.transition('');
      $contentEl.css('height', '');
      $el.trigger('accordion:close');
      app.emit('accordionClose');
    });
  },
  toggle(el) {
    const app = this;
    const $el = $(el);
    if ($el.length === 0) return;
    if ($el.hasClass('accordion-item-opened')) app.accordion.close(el);
    else app.accordion.open(el);
  },
};

export default {
  name: 'accordion',
  create() {
    const app = this;
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
      const app = this;
      Accordion.toggleClicked.call(app, $clickedEl);
    },
  },
};
