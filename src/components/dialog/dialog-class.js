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
    super(app);

    const dialog = this;

    const { title, text, contentAfterText, buttons, verticalButtons } = extendedParams;

    const dialogClasses = ['dialog'];
    if (buttons.length === 0) dialogClasses.push('dialog-no-buttons');
    if (buttons.length > 0) dialogClasses.push(`dialog-buttons-${buttons.length}`);
    if (verticalButtons) dialogClasses.push('dialog-buttons-vertical');

    let buttonsHTML = '';
    if (buttons.length > 0) {
      buttonsHTML = `
        <div class="dialog-buttons">
          ${buttons.map(button => `<span class="dialog-button${button.bold ? ' dialog-button-bold' : ''}">${button.text}</span>`)}
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

    let $overlayEl = app.root.children('.dialog-overlay');
    if ($overlayEl.length === 0) {
      $overlayEl = $('<div class="dialog-overlay"></div>');
      app.root.append($overlayEl);
    }

    Utils.extend(dialog, {
      app,
      html: dialogHtml,
      params: extendedParams,
      $overlayEl,
      overlayEl: $overlayEl[0],
      type: 'dialog',
    });

    return dialog;
    // if (app.params.modalTemplate) {
    //     if (!app._compiledTemplates.modal) app._compiledTemplates.modal = t7.compile(app.params.modalTemplate);
    //     modalHTML = app._compiledTemplates.modal(params);
    // }
    // else {
    //     var buttonsHTML = '';
    //     if (params.buttons && params.buttons.length > 0) {
    //         for (var i = 0; i < params.buttons.length; i++) {
    //             buttonsHTML += '<span class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params.buttons[i].text + '</span>';
    //         }
    //     }
    //     var titleHTML = params.title ? '<div class="modal-title">' + params.title + '</div>' : '';
    //     var textHTML = params.text ? '<div class="modal-text">' + params.text + '</div>' : '';
    //     var afterTextHTML = params.afterText ? params.afterText : '';
    //     var noButtons = !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '';
    //     var verticalButtons = params.verticalButtons ? 'modal-buttons-vertical': '';
    //     var modalButtonsHTML = params.buttons && params.buttons.length > 0 ? '<div class="modal-buttons modal-buttons-' + params.buttons.length + ' ' + verticalButtons + '">' + buttonsHTML + '</div>' : '';
    //     modalHTML = '<div class="modal ' + noButtons + ' ' + (params.cssClass || '') + '"><div class="modal-inner">' + (titleHTML + textHTML + afterTextHTML) + '</div>' + modalButtonsHTML + '</div>';
    // }

    // _modalTemplateTempDiv.innerHTML = modalHTML;

    // var modal = $(_modalTemplateTempDiv).children();

    // app.root.append(modal[0]);

    // // Add events on buttons
    // modal.find('.modal-button').each(function (index, el) {
    //     $(el).on('click', function (e) {
    //         if (params.buttons[index].close !== false) app.closeModal(modal);
    //         if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
    //         if (params.onClick) params.onClick(modal, index);
    //     });
    // });
    // app.openModal(modal);

    // Utils.extend(dialog, {
    //   params: extendedParams,
    // });

    // return dialog;
  }
}
export default Dialog;
