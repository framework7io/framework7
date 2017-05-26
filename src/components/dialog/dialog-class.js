import $ from 'dom7';
import Utils from '../../utils/utils';
import Modal from '../modal/modal-class';

class Dialog extends Modal {
  constructor(app, params) {
    const extendedParams = Utils.extend({
      title: app.params.modals.dialogTitle,
      text: undefined,
      contentAfterText: '',
      buttons: [],
      verticalButtons: false,
      onClick: undefined,
      on: {},
    }, params);

    // Extends with open/close Modal methods;
    super(app, extendedParams);

    const dialog = this;

    const { title, text, contentAfterText, buttons, verticalButtons, cssClass } = extendedParams;

    dialog.params = extendedParams;

    // Find Element
    let $el;
    if (!dialog.params.el) {
      const dialogClasses = ['dialog'];
      if (buttons.length === 0) dialogClasses.push('dialog-no-buttons');
      if (buttons.length > 0) dialogClasses.push(`dialog-buttons-${buttons.length}`);
      if (verticalButtons) dialogClasses.push('dialog-buttons-vertical');
      if (cssClass) dialogClasses.push(cssClass);

      let buttonsHTML = '';
      if (buttons.length > 0) {
        buttonsHTML = `
          <div class="dialog-buttons">
            ${buttons.map(button => `<span class="dialog-button${button.bold ? ' dialog-button-bold' : ''}">${button.text}</span>`).join('')}
          </div>
        `;
      }

      const dialogHtml = `
        <div class="${dialogClasses.join(' ')}">
          <div class="dialog-inner">
            ${title ? `<div class="dialog-title">${title}</div>` : ''}
            ${text ? `<div class="dialog-text">${text}</div>` : ''}
            ${contentAfterText}
          </div>
          ${buttonsHTML}
        </div>
      `;
      $el = $(dialogHtml);
    } else {
      $el = $(dialog.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    let $overlayEl = app.root.children('.dialog-overlay');
    if ($overlayEl.length === 0) {
      $overlayEl = $('<div class="dialog-overlay"></div>');
      app.root.append($overlayEl);
    }

    // Assign events
    function buttonOnClick(e) {
      const buttonEl = this;
      const index = $(buttonEl).index();
      const button = buttons[index];
      if (button.onClick) button.onClick(dialog, e);
      if (dialog.params.onClick) dialog.params.onClick(dialog, index);
      if (button.close !== false) dialog.close();
    }
    if (buttons && buttons.length > 0) {
      $el.find('.dialog-button').each((index, buttonEl) => {
        $(buttonEl).on('click', buttonOnClick);
      });
      dialog.on('close', () => {
        $el.find('.dialog-button').each((index, buttonEl) => {
          $(buttonEl).off('click', buttonOnClick);
        });
      });
    }
    Utils.extend(dialog, {
      app,
      $el,
      el: $el[0],
      $overlayEl,
      overlayEl: $overlayEl[0],
      type: 'dialog',
    });

    $el[0].f7Modal = dialog;

    return dialog;
  }
}
export default Dialog;
