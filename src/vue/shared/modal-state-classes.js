export const modalStateClasses = ({ isOpened, isClosing } = {}) => {
  return {
    'modal-in': isOpened.value && !isClosing.value,
    'modal-out': isClosing.value,
  };
};
