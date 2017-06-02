function initSwipeout() {

}
export default {
  name: 'swipeout',
  params: {
    swipeout: {
      actionsNoFold: false,
      noFollow: false,
      removeWithTimeout: false,
    },
  },
  instance: {
    swipeout: {
      allowOpen: true,
      el: undefined,
      open() {},
      close() {},
      delete() {},
    },
  },
  on: {
    init: initSwipeout,
  },
};
