export const modalStateClasses = ({ isOpened, isClosing } = {}) => {
  return {
    'modal-in': isOpened.current && !isClosing.current,
    'modal-out': isClosing.current,
  };
};
