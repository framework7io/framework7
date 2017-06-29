import Modal from './modal-class';

export default {
  name: 'modal',
  static: {
    Modal,
  },
  params: {
    modals: {
      moveToRoot: true,

      queueDialogs: true,
      dialogTitle: 'Framework7',
      dialogButtonOk: 'OK',
      dialogButtonCancel: 'Cancel',
      dialogUsernamePlaceholder: 'Username',
      dialogPasswordPlaceholder: 'Password',
      dialogPreloaderTitle: 'Loading... ',
      dialogProgressTitle: 'Loading... ',
      dialogCloseByBackdropClick: false,

      popupCloseByBackdropClick: true,

      popoverCloseByBackdropClick: true,
      popoverCloseByOutsideClick: false,

      actionsToPopover: true,
      actionsCloseByBackdropClick: true,

      sheetCloseByBackdropClick: true,
      sheetCloseByOutsideClick: false,
    },
  },
};
