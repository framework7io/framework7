export const modalStateClasses = ({ isOpened = false, isClosing = false } = {}) => {
  return {
    'modal-in': isOpened && !isClosing,
    'modal-out': isClosing,
  };
};
