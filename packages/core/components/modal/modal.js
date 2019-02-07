import Modal from './modal-class';
import CustomModal from './custom-modal-class';

export default {
  name: 'modal',
  static: {
    Modal,
    CustomModal,
  },
  create() {
    const app = this;
    app.customModal = {
      create(params) {
        return new CustomModal(app, params);
      },
    };
  },
  params: {
    modal: {
      moveToRoot: true,
      queueDialogs: true,
    },
  },
};
