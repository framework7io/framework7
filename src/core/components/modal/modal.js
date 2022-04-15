import Modal from './modal-class.js';
import CustomModal from './custom-modal-class.js';

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
      queueDialogs: true,
    },
  },
};
