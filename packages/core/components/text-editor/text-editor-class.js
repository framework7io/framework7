import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

const textEditorButtonsMap = {
  // f7-icon, material-icon, command
  bold: ['bold', 'format_bold', 'bold'],
  italic: ['italic', 'format_italic', 'italic'],
  underline: ['underline', 'format_underline', 'underline'],
  strikeThrough: ['strikethrough', 'strikethrough_s', 'strikeThrough'],
  orderedList: ['list_number', 'format_list_numbered', 'insertOrderedList'],
  unorderedList: ['list_bullet', 'format_list_bulleted', 'insertUnorderedList'],
  link: ['link', 'link', 'createLink'],
  image: ['photo', 'image', 'insertImage'],
  paragraph: ['paragraph', '<i class="icon">¶</i>', 'formatBlock.P'],
  h1: ['<i class="icon">H<sub>1</sub></i>', '<i class="icon">H<sub>1</sub></i>', 'formatBlock.H1'],
  h2: ['<i class="icon">H<sub>2</sub></i>', '<i class="icon">H<sub>2</sub></i>', 'formatBlock.H2'],
  h3: ['<i class="icon">H<sub>3</sub></i>', '<i class="icon">H<sub>3</sub></i>', 'formatBlock.H3'],
  alignLeft: ['text_alignleft', 'format_align_left', 'justifyLeft'],
  alignCenter: ['text_aligncenter', 'format_align_center', 'justifyCenter'],
  alignRight: ['text_alignright', 'format_align_right', 'justifyRight'],
  alignJustify: ['text_justify', 'format_align_justify', 'justifyFull'],
  subscript: ['textformat_subscript', '<i class="icon">A<sub>1</sub></i>', 'subscript'],
  superscript: ['textformat_superscript', '<i class="icon">A<sup>1</sup></i>', 'superscript'],
  indent: ['increase_indent', 'format_indent_increase', 'indent'],
  outdent: ['decrease_indent', 'format_indent_decrease', 'outdent'],
};

class TextEditor extends Framework7Class {
  constructor(app, params) {
    super(params, [app]);
    const self = this;

    const defaults = Utils.extend({}, app.params.textEditor);

    // Extend defaults with modules params
    self.useModulesParams(defaults);

    self.params = Utils.extend(defaults, params);

    const el = self.params.el;
    if (!el) return self;

    const $el = $(el);
    if ($el.length === 0) return self;

    if ($el[0].f7TextEditor) return $el[0].f7TextEditor;

    let $contentEl = $el.children('.text-editor-content');
    if (!$contentEl.length) {
      $el.append('<div class="text-editor-content" contenteditable></div>');
      $contentEl = $el.children('.text-editor-content');
    }

    Utils.extend(self, {
      app,
      $el,
      el: $el[0],
      $contentEl,
      contentEl: $contentEl[0],
    });
    if ('value' in params) {
      self.value = self.params.value;
    }

    if (self.params.mode === 'keyboard-toolbar') {
      if (!app.device.cordova && !app.device.android) {
        self.params.mode = 'popover';
      }
    }

    if (typeof self.params.buttons === 'string') {
      try {
        self.params.buttons = JSON.parse(self.params.buttons);
      } catch (err) {
        throw new Error('Framework7: TextEditor: wrong "buttons" parameter format');
      }
    }

    $el[0].f7TextEditor = self;

    // Bind
    self.onButtonClick = self.onButtonClick.bind(self);
    self.onFocus = self.onFocus.bind(self);
    self.onBlur = self.onBlur.bind(self);
    self.onInput = self.onInput.bind(self);
    self.onPaste = self.onPaste.bind(self);
    self.onSelectionChange = self.onSelectionChange.bind(self);

    // Handle Events
    self.attachEvents = function attachEvents() {
      if (self.params.mode === 'toolbar') {
        self.$el.find('.text-editor-toolbar').on('click', 'button', self.onButtonClick);
      }
      if (self.params.mode === 'keyboard-toolbar') {
        self.$keyboardToolbarEl.on('click', 'button', self.onButtonClick);
      }
      if (self.params.mode === 'popover' && self.popover) {
        self.popover.$el.on('click', 'button', self.onButtonClick);
      }
      self.$contentEl.on('paste', self.onPaste);
      self.$contentEl.on('focus', self.onFocus);
      self.$contentEl.on('blur', self.onBlur);
      self.$contentEl.on('input', self.onInput, true);
      $(document).on('selectionchange', self.onSelectionChange);
    };
    self.detachEvents = function detachEvents() {
      if (self.params.mode === 'toolbar') {
        self.$el.find('.text-editor-toolbar').off('click', 'button', self.onButtonClick);
      }
      if (self.params.mode === 'keyboard-toolbar') {
        self.$keyboardToolbarEl.off('click', 'button', self.onButtonClick);
      }
      if (self.params.mode === 'popover' && self.popover) {
        self.popover.$el.off('click', 'button', self.onButtonClick);
      }
      self.$contentEl.off('paste', self.onPaste);
      self.$contentEl.off('focus', self.onFocus);
      self.$contentEl.off('blur', self.onBlur);
      self.$contentEl.off('input', self.onInput, true);
      $(document).off('selectionchange', self.onSelectionChange);
    };

    // Install Modules
    self.useModules();

    // Init
    self.init();

    return self;
  }

  setValue(newValue) {
    const self = this;
    const currentValue = self.value;
    if (currentValue === newValue) return self;
    self.value = newValue;
    self.$contentEl.html(newValue);
    self.$el.trigger('texteditor:change', self.value);
    self.emit('local::change textEditorChange', self, self.value);
    return self;
  }

  getValue() {
    const self = this;
    return self.value;
  }

  createLink() {
    const self = this;
    const currentSelection = window.getSelection();
    const selectedNodes = [];
    let $selectedLinks;
    if (currentSelection && currentSelection.anchorNode && $(currentSelection.anchorNode).parents(self.$el).length) {
      let anchorNode = currentSelection.anchorNode;
      while (anchorNode) {
        selectedNodes.push(anchorNode);
        if (!anchorNode.nextSibling || anchorNode === currentSelection.focusNode) {
          anchorNode = null;
        }
        if (anchorNode) {
          anchorNode = anchorNode.nextSibling;
        }
      }
      $selectedLinks = $(selectedNodes).closest('a').add($(selectedNodes).children('a'));
    }
    if ($selectedLinks && $selectedLinks.length) {
      $selectedLinks.each((linkIndex, linkNode) => {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(linkNode);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('unlink', false);
        selection.removeAllRanges();
      });
      return self;
    }
    const currentRange = self.getSelectionRange();
    if (!currentRange) return self;
    const dialog = self.app.dialog.prompt(self.params.linkUrlText, '', (link) => {
      if (link && link.trim().length) {
        self.setSelectionRange(currentRange);
        document.execCommand('createLink', false, link.trim());
      }
    });
    dialog.$el.find('input').focus();
    return self;
  }

  insertImage() {
    const self = this;
    const currentRange = self.getSelectionRange();
    if (!currentRange) return self;
    const dialog = self.app.dialog.prompt(self.params.imageUrlText, '', (imageUrl) => {
      if (imageUrl && imageUrl.trim().length) {
        self.setSelectionRange(currentRange);
        document.execCommand('insertImage', false, imageUrl.trim());
      }
    });
    dialog.$el.find('input').focus();
    return self;
  }

  removePlaceholder() {
    const self = this;
    self.$contentEl.find('.text-editor-placeholder').remove();
  }

  insertPlaceholder() {
    const self = this;
    self.$contentEl.append(`<div class="text-editor-placeholder">${self.params.placeholder}</div>`);
  }

  onSelectionChange() {
    const self = this;
    if (self.params.mode === 'toolbar') return;
    const selection = window.getSelection();
    const selectionIsInContent = $(selection.anchorNode).parents(self.contentEl).length || selection.anchorNode === self.contentEl;
    if (self.params.mode === 'keyboard-toolbar') {
      if (!selectionIsInContent) {
        self.closeKeyboardToolbar();
      } else {
        self.openKeyboardToolbar();
      }
      return;
    }
    if (self.params.mode === 'popover') {
      const selectionIsInPopover = $(selection.anchorNode).parents(self.popover.el).length || selection.anchorNode === self.popover.el;
      if (!selectionIsInContent && !selectionIsInPopover) {
        self.closePopover();
        return;
      }
      if (!selection.isCollapsed && selection.rangeCount) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        self.openPopover(rect.x + (window.scrollX || 0), rect.y + (window.scrollY || 0), rect.width, rect.height);
      } else if (selection.isCollapsed) {
        self.closePopover();
      }
    }
  }

  onPaste(e) {
    const self = this;
    if (self.params.clearFormattingOnPaste && e.clipboardData && e.clipboardData.getData) {
      const text = e.clipboardData.getData('text/plain');
      e.preventDefault();
      document.execCommand('insertText', false, text);
    }
  }

  onInput() {
    const self = this;
    const value = self.$contentEl.html();

    self.$el.trigger('texteditor:input');
    self.emit('local:input textEditorInput', self);

    self.value = value;
    self.$el.trigger('texteditor:change', self.value);
    self.emit('local::change textEditorChange', self, self.value);
  }

  onFocus() {
    const self = this;
    self.removePlaceholder();
    self.$contentEl.focus();
    self.$el.trigger('texteditor:focus');
    self.emit('local::focus textEditorFocus', self);
  }

  onBlur() {
    const self = this;
    if (self.params.placeholder && self.$contentEl.html() === '') {
      self.insertPlaceholder();
    }
    if (self.params.mode === 'popover') {
      const selection = window.getSelection();
      const selectionIsInContent = $(selection.anchorNode).parents(self.contentEl).length || selection.anchorNode === self.contentEl;
      const inPopover = document.activeElement && self.popover && $(document.activeElement).closest(self.popover.$el).length;
      if (!inPopover && !selectionIsInContent) {
        self.closePopover();
      }
    }
    if (self.params.mode === 'keyboard-toolbar') {
      const selection = window.getSelection();
      const selectionIsInContent = $(selection.anchorNode).parents(self.contentEl).length || selection.anchorNode === self.contentEl;
      if (!selectionIsInContent) {
        self.closeKeyboardToolbar();
      }
    }
    self.$el.trigger('texteditor:blur');
    self.emit('local::blur textEditorBlur', self);
  }

  onButtonClick(e) {
    const self = this;
    const selection = window.getSelection();
    const selectionIsInContent = $(selection.anchorNode).parents(self.contentEl).length || selection.anchorNode === self.contentEl;
    if (!selectionIsInContent) return;
    const $buttonEl = $(e.target).closest('button');
    if ($buttonEl.parents('form').length) {
      e.preventDefault();
    }
    const button = $buttonEl.attr('data-button');
    const buttonData = self.params.customButtons && self.params.customButtons[button];
    if (!button || !(textEditorButtonsMap[button] || buttonData)) return;
    $buttonEl.trigger('texteditor:buttonclick', button);
    self.emit('local::buttonClick textEditorButtonClick', self, button);
    if (buttonData) {
      if (buttonData.onClick) buttonData.onClick();
      return;
    }
    const command = textEditorButtonsMap[button][2];
    if (command === 'createLink') {
      self.createLink();
      return;
    }
    if (command === 'insertImage') {
      self.insertImage();
      return;
    }
    if (command.indexOf('formatBlock') === 0) {
      const tagName = command.split('.')[1];
      const $anchorNode = $(selection.anchorNode);
      if ($anchorNode.parents(tagName.toLowerCase()).length || $anchorNode.is(tagName)) {
        document.execCommand('formatBlock', false, 'div');
      } else {
        document.execCommand('formatBlock', false, tagName);
      }
      return;
    }
    document.execCommand(command, false);
  }

  // eslint-disable-next-line
  getSelectionRange() {
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        return sel.getRangeAt(0);
      }
    } else if (document.selection && document.selection.createRange) {
      return document.selection.createRange();
    }
    return null;
  }

  // eslint-disable-next-line
  setSelectionRange(range) {
    if (range) {
      if (window.getSelection) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (document.selection && range.select) {
        range.select();
      }
    }
  }

  renderButtons() {
    const self = this;
    let html = '';
    function renderButton(button) {
      const iconClass = self.app.theme === 'md' ? 'material-icons' : 'f7-icons';
      if (self.params.customButtons && self.params.customButtons[button]) {
        const buttonData = self.params.customButtons[button];
        return `<button class="text-editor-button" data-button="${button}">${buttonData.content || ''}</button>`;
      }
      if (!textEditorButtonsMap[button]) return '';
      const iconContent = textEditorButtonsMap[button][self.app.theme === 'md' ? 1 : 0];
      return `<button class="text-editor-button" data-button="${button}">${iconContent.indexOf('<') >= 0 ? iconContent : `<i class="${iconClass}">${iconContent}</i>`}</button>`.trim();
    }
    self.params.buttons.forEach((button, buttonIndex) => {
      if (Array.isArray(button)) {
        button.forEach((b) => {
          html += renderButton(b);
        });
        if (buttonIndex < self.params.buttons.length - 1 && self.params.dividers) {
          html += '<div class="text-editor-button-divider"></div>';
        }
      } else {
        html += renderButton(button);
      }
    });
    return html;
  }

  createToolbar() {
    const self = this;
    self.$el.prepend(`<div class="text-editor-toolbar">${self.renderButtons()}</div>`);
  }

  createKeyboardToolbar() {
    const self = this;
    const isDark = self.$el.closest('.theme-dark').length > 0 || self.app.device.prefersColorScheme() === 'dark';
    self.$keyboardToolbarEl = $(`<div class="toolbar toolbar-bottom text-editor-keyboard-toolbar ${isDark ? 'theme-dark' : ''}"><div class="toolbar-inner">${self.renderButtons()}</div></div>`);
  }

  createPopover() {
    const self = this;
    const isDark = self.$el.closest('.theme-dark').length > 0;
    self.popover = self.app.popover.create({
      content: `
        <div class="popover ${isDark ? 'theme-light' : 'theme-dark'} text-editor-popover">
          <div class="popover-inner">${self.renderButtons()}</div>
        </div>
      `,
      closeByOutsideClick: false,
      backdrop: false,
    });
  }

  openKeyboardToolbar() {
    const self = this;
    if (self.$keyboardToolbarEl.parent(self.app.root).length) return;
    self.$el.trigger('texteditor:keyboardopen');
    self.emit('local::keyboardOpen textEditorKeyboardOpen', self);
    self.app.root.append(self.$keyboardToolbarEl);
  }

  closeKeyboardToolbar() {
    const self = this;
    self.$keyboardToolbarEl.remove();
    self.$el.trigger('texteditor:keyboardclose');
    self.emit('local::keyboardClose textEditorKeyboardClose', self);
  }

  openPopover(targetX, targetY, targetWidth, targetHeight) {
    const self = this;

    if (!self.popover) return;
    Object.assign(self.popover.params, {
      targetX,
      targetY,
      targetWidth,
      targetHeight,
    });
    clearTimeout(self.popoverTimeout);
    self.popoverTimeout = setTimeout(() => {
      if (!self.popover) return;
      if (self.popover.opened) {
        self.popover.resize();
      } else {
        self.$el.trigger('texteditor:popoveropen');
        self.emit('local::popoverOpen textEditorPopoverOpen', self);
        self.popover.open();
      }
    }, 400);
  }

  closePopover() {
    const self = this;
    clearTimeout(self.popoverTimeout);
    if (!self.popover || !self.popover.opened) return;
    self.popoverTimeout = setTimeout(() => {
      if (!self.popover) return;
      self.$el.trigger('texteditor:popoverclose');
      self.emit('local::popoverClose textEditorPopoverClose', self);
      self.popover.close();
    }, 400);
  }

  init() {
    const self = this;
    if (self.value) {
      self.$contentEl.html(self.value);
    } else {
      self.value = self.$contentEl.html();
    }
    if (self.params.placeholder && self.value === '') {
      self.insertPlaceholder();
    }
    if (self.params.mode === 'toolbar') {
      self.createToolbar();
    } else if (self.params.mode === 'popover') {
      self.createPopover();
    } else if (self.params.mode === 'keyboard-toolbar') {
      self.createKeyboardToolbar();
    }

    self.attachEvents();
    return self;
  }

  destroy() {
    let self = this;
    self.$el.trigger('texteditor:beforedestroy');
    self.emit('local::beforeDestroy textEditorBeforeDestroy', self);
    self.detachEvents();
    if (self.popover) {
      self.popover.close(false);
      self.popover.destroy();
    }
    delete self.$el[0].f7TextEditor;
    Utils.deleteProps(self);
    self = null;
  }
}

export default TextEditor;
