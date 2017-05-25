import Modal from './modal-class';

export default {
  name: 'modal',
  static: {
    Modal,
  },
  params: {
    modals: {
      moveToRoot: true,
      stackDialogs: true,
      dialogTitle: 'Framework7',
      dialogButtonOk: 'Ok',
      dialogButtonCancel: 'Cancel',
    },
  },
};
