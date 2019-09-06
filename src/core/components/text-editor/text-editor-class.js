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

    Utils.extend(self, {
      app,
      $el,
      el: $el[0],
    });

    $el[0].f7TextEditor = self;

    // Bind
    self.onButtonClick = self.onButtonClick.bind(self);

    // Handle Events
    self.attachEvents = function attachEvents() {
      if (self.params.type === 'toolbar') {
        self.$el.find('.text-editor-toolbar').on('click', 'button', self.onButtonClick);
      }
    };
    self.detachEvents = function detachEvents() {
      if (self.params.type === 'toolbar') {
        self.$el.find('.text-editor-toolbar').off('click', 'button', self.onButtonClick);
      }
    };

    // Install Modules
    self.useModules();

    // Init
    self.init();

    return self;
  }

  setValue() {

  }

  getValue() {
    return this.value;
  }

  onButtonClick(e) {
    const self = this;
    const button = $(e.target).closest('button').attr('data-button');
    if (!button || !textEditorButtonsMap[button]) return;
    const command = textEditorButtonsMap[button][2];
    if (command === 'createLink') {
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
        return;
      }
      const link = window.prompt('Link please');
      if (link && link.trim().length) {
        document.execCommand(command, false, link.trim());
      }
      return;
    }
    if (command === 'insertImage') {
      const imageUrl = window.prompt('image url please');
      if (imageUrl && imageUrl.trim().length) {
        document.execCommand(command, false, imageUrl.trim());
      }
      return;
    }
    document.execCommand(command, false);
  }

  renderButtons() {
    const self = this;
    let html = '';
    function renderButton(button) {
      const iconClass = self.app.theme === 'md' ? 'material-icons' : 'f7-icons';
      const iconContent = textEditorButtonsMap[button][self.app.theme === 'md' ? 1 : 0];
      return `<button data-button="${button}">${iconContent.indexOf('<') >= 0 ? iconContent : `<i class="${iconClass}">${iconContent}</i>`}</button>`.trim();
    }
    self.params.buttons.forEach((button, buttonIndex) => {
      if (Array.isArray(button)) {
        button.forEach((b) => {
          html += renderButton(b);
        });
        if (buttonIndex < self.params.buttons.length - 1 && self.params.dividers) {
          html += '<div class="text-editor-toolbar-divider"></div>';
        }
      } else {
        html += renderButton(button);
      }
    });
    return html;
  }

  render() {
    const self = this;
    const buttonsHtml = self.renderButtons();
    if (self.params.type === 'toolbar') {
      self.$el.find('.text-editor-toolbar').html(buttonsHtml);
    }
  }

  init() {
    const self = this;
    self.render();
    self.attachEvents();
    return self;
  }

  destroy() {
    let self = this;
    self.$el.trigger('texteditor:beforedestroy');
    self.emit('local::beforeDestroy textEditorBeforeDestroy', self);
    delete self.$el[0].f7TextEditor;
    self.detachEvents();
    Utils.deleteProps(self);
    self = null;
  }
}

export default TextEditor;
