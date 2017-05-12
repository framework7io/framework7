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
    allowSwipeout: true,
    swipeoutOpenedEl: undefined,
    swipeoutOpen() {},
    swipeoutClose() {},
    swipeoutDelete() {},
    // New API
    swipeout: {
      el: undefined,
      allow: true,
      open() {

      },
      close() {

      },
      delete() {

      },
    },
  },
  on: {
    init: initSwipeout,
  },
};
