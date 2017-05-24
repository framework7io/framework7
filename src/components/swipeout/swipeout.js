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
      allow: true,
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
