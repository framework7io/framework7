import $ from 'dom7';
import Utils from '../../utils/utils';
import TextEditor from './text-editor-class';
import ConstructorMethods from '../../utils/constructor-methods';

export default {
  name: 'textEditor',
  params: {
    textEditor: {
      el: null,
      mode: 'toolbar', // or 'popover'
      value: undefined, // will use html content
      customButtons: null,
      buttons: [
        ['bold', 'italic', 'underline', 'strikeThrough'],
        ['orderedList', 'unorderedList'],
        ['link', 'image'],
        ['paragraph', 'h1', 'h2', 'h3'],
        ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
        ['subscript', 'superscript'],
        ['indent', 'outdent'],
      ],
      dividers: true,
      imageUrlText: 'Insert image URL',
      linkUrlText: 'Insert link URL',
      placeholder: null,
      clearFormattingOnPaste: true,
    },
  },
  create() {
    const app = this;
    app.textEditor = Utils.extend(
      ConstructorMethods({
        defaultSelector: '.text-editor',
        constructor: TextEditor,
        app,
        domProp: 'f7TextEditor',
      }),
    );
  },
  static: {
    TextEditor,
  },
  on: {
    tabMounted(tabEl) {
      const app = this;
      $(tabEl).find('.text-editor-init').each((index, editorEl) => {
        const dataset = $(editorEl).dataset();
        app.textEditor.create(Utils.extend({ el: editorEl }, dataset || {}));
      });
    },
    tabBeforeRemove(tabEl) {
      $(tabEl).find('.text-editor-init').each((index, editorEl) => {
        if (editorEl.f7TextEditor) editorEl.f7TextEditor.destroy();
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.text-editor-init').each((index, editorEl) => {
        const dataset = $(editorEl).dataset();
        app.textEditor.create(Utils.extend({ el: editorEl }, dataset || {}));
      });
    },
    pageBeforeRemove(page) {
      page.$el.find('.text-editor-init').each((index, editorEl) => {
        if (editorEl.f7TextEditor) editorEl.f7TextEditor.destroy();
      });
    },
  },
  vnode: {
    'text-editor-init': {
      insert(vnode) {
        const app = this;
        const editorEl = vnode.elm;
        const dataset = $(editorEl).dataset();
        app.textEditor.create(Utils.extend({ el: editorEl }, dataset || {}));
      },
      destroy(vnode) {
        const editorEl = vnode.elm;
        if (editorEl.f7TextEditor) editorEl.f7TextEditor.destroy();
      },
    },
  },
};
