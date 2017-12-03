import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

class Messagebar extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);

    const messagebar = this;

    const defaults = {
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
    const $el = $(messagebar.params.el);
    if ($el.length === 0) return messagebar;

    $el[0].f7Messagebar = messagebar;

    // Page and PageContent
    const $pageEl = $el.parents('.page').eq(0);
    const $pageContentEl = $pageEl.find('.page-content').eq(0);

    // Area
    const $areaEl = $el.find('.messagebar-area');

    // Textarea
    let $textareaEl;
    if (messagebar.params.textareaEl) {
      $textareaEl = $(messagebar.params.textareaEl);
    } else {
      $textareaEl = $el.find('textarea');
    }

    // Attachments & Library
    const $attachmentsEl = $el.find('.messagebar-attachments');
    const $sheetEl = $el.find('.messagebar-sheet');

    if (messagebar.params.top) {
      $el.addClass('messagebar-top');
    }

    Utils.extend(messagebar, {
      $el,
      el: $el[0],
      $areaEl,
      areaEl: $areaEl[0],
      $textareaEl,
      textareaEl: $textareaEl[0],
      $attachmentsEl,
      attachmentsEl: $attachmentsEl[0],
      attachmentsVisible: $attachmentsEl.hasClass('messagebar-attachments-visible'),
      $sheetEl,
      sheetEl: $sheetEl[0],
      sheetVisible: $sheetEl.hasClass('messagebar-sheet-visible'),
      $pageEl,
      pageEl: $pageEl[0],
      $pageContentEl,
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
      const index = $(this).index();
      if ($(e.target).closest('.messagebar-attachment-delete').length) {
        $(this).trigger('messagebar:attachmentdelete', index);
        messagebar.emit('local::attachmentDelete messagebarAttachmentDelete', this, index);
      } else {
        $(this).trigger('messagebar:attachmentclick', index);
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
  focus() {
    const messagebar = this;
    messagebar.$textareaEl.focus();
    return messagebar;
  }
  blur() {
    const messagebar = this;
    messagebar.$textareaEl.blur();
    return messagebar;
  }
  clear() {
    const messagebar = this;
    messagebar.$textareaEl.val('').trigger('change');
    return messagebar;
  }
  getValue() {
    const messagebar = this;
    return messagebar.$textareaEl.val().trim();
  }
  setValue(value) {
    const messagebar = this;
    messagebar.$textareaEl.val(value).trigger('change');
    return messagebar;
  }
  setPlaceholder(placeholder) {
    const messagebar = this;
    messagebar.$textareaEl.attr('placeholder', placeholder);
    return messagebar;
  }
  resizePage() {
    const messagebar = this;
    const {
      params,
      $el,
      top,
      $pageEl,
      $pageContentEl,
      $areaEl,
      $textareaEl,
      $sheetEl,
      $attachmentsEl,
    } = messagebar;
    const elHeight = $el[0].offsetHeight;
    let maxHeight = params.maxHeight;
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
      const currentPaddingBottom = parseInt($pageContentEl.css('padding-bottom'), 10);
      const requiredPaddingBottom = elHeight + params.bottomOffset;
      if (requiredPaddingBottom !== currentPaddingBottom && $pageContentEl.length) {
        const currentPaddingTop = parseInt($pageContentEl.css('padding-top'), 10);
        const pageScrollHeight = $pageContentEl[0].scrollHeight;
        const pageOffsetHeight = $pageContentEl[0].offsetHeight;
        const pageScrollTop = $pageContentEl[0].scrollTop;
        const scrollOnBottom = (pageScrollTop === pageScrollHeight - pageOffsetHeight);
        if (!maxHeight) {
          maxHeight = $pageEl[0].offsetHeight - currentPaddingTop - $sheetEl.outerHeight() - $attachmentsEl.outerHeight() - parseInt($areaEl.css('margin-top'), 10) - parseInt($areaEl.css('margin-bottom'), 10);
        }
        $textareaEl.css('max-height', `${maxHeight}px`);
        $pageContentEl.css('padding-bottom', `${requiredPaddingBottom}px`);
        if (scrollOnBottom) {
          $pageContentEl.scrollTop($pageContentEl[0].scrollHeight - pageOffsetHeight);
        }
        $el.trigger('messagebar:resizepage');
        messagebar.emit('local::resizePage messagebarResizePage');
      }
    }
  }
  checkEmptyState() {
    const messagebar = this;
    const { $el, $textareaEl } = messagebar;
    const value = $textareaEl.val().trim();
    if (value && value.length) {
      $el.addClass('messagebar-with-value');
    } else {
      $el.removeClass('messagebar-with-value');
    }
  }
  attachmentsCreate(innerHTML = '') {
    const messagebar = this;
    const $attachmentsEl = $(`<div class="messagebar-attachments">${innerHTML}</div>`);
    $attachmentsEl.insertBefore(messagebar.$textareaEl);
    Utils.extend(messagebar, {
      $attachmentsEl,
      attachmentsEl: $attachmentsEl[0],
    });
    return messagebar;
  }
  attachmentsShow(innerHTML = '') {
    const messagebar = this;
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
  }
  attachmentsHide() {
    const messagebar = this;
    messagebar.$el.removeClass('messagebar-attachments-visible');
    messagebar.attachmentsVisible = false;
    if (messagebar.params.resizePage) {
      messagebar.resizePage();
    }
    return messagebar;
  }
  attachmentsToggle() {
    const messagebar = this;
    if (messagebar.attachmentsVisible) {
      messagebar.attachmentsHide();
    } else {
      messagebar.attachmentsShow();
    }
    return messagebar;
  }
  renderAttachment(attachment) {
    const messagebar = this;
    if (messagebar.params.renderAttachment) {
      return messagebar.params.renderAttachment(attachment);
    }
    return `
      <div class="messagebar-attachment">
        <img src="${attachment}">
        <span class="messagebar-attachment-delete"></span>
      </div>
    `;
  }
  renderAttachments() {
    const messagebar = this;
    let html;
    if (messagebar.params.renderAttachments) {
      html = messagebar.params.renderAttachments(messagebar.attachments);
    } else {
      html = `${messagebar.attachments.map(attachment => messagebar.renderAttachment(attachment)).join('')}`;
    }
    if (messagebar.$attachmentsEl.length === 0) {
      messagebar.attachmentsCreate(html);
    } else {
      messagebar.$attachmentsEl.html(html);
    }
  }
  sheetCreate(innerHTML = '') {
    const messagebar = this;
    const $sheetEl = $(`<div class="messagebar-sheet">${innerHTML}</div>`);
    messagebar.$el.append($sheetEl);
    Utils.extend(messagebar, {
      $sheetEl,
      sheetEl: $sheetEl[0],
    });
    return messagebar;
  }
  sheetShow(innerHTML = '') {
    const messagebar = this;
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
  }
  sheetHide() {
    const messagebar = this;
    messagebar.$el.removeClass('messagebar-sheet-visible');
    messagebar.sheetVisible = false;
    if (messagebar.params.resizePage) {
      messagebar.resizePage();
    }
    return messagebar;
  }
  sheetToggle() {
    const messagebar = this;
    if (messagebar.sheetVisible) {
      messagebar.sheetHide();
    } else {
      messagebar.sheetShow();
    }
    return messagebar;
  }
  init() {
    const messagebar = this;
    messagebar.attachEvents();
    messagebar.checkEmptyState();
    return messagebar;
  }
  destroy() {
    const messagebar = this;
    messagebar.emit('local::beforeDestroy messagebarBeforeDestroy', messagebar);
    messagebar.$el.trigger('messagebar:beforedestroy', messagebar);
    messagebar.detachEvents();
    messagebar.$el[0].f7Messagebar = null;
    delete messagebar.$el[0].f7Messagebar;
    Utils.deleteProps(messagebar);
  }
}

export default Messagebar;
