export const modalStateClasses = ({ isOpened, isClosing } = {}) => {
  return {
    'modal-in': isOpened && !isClosing,
    'modal-out': isClosing,
  };
};
