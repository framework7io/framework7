export default {
  name: 'panels',
  params: {
    panels: {
      panelLeftBreakpoint: null,
      panelRightBreakpoint: null,
      swipePanel: false, // or 'left' or 'right'
      swipePanelActiveArea: 0,
      swipePanelCloseOpposite: true,
      swipePanelOnlyClose: false,
      swipePanelNoFollow: false,
      swipePanelThreshold: 0,
      closeByOutsideClick: true,
    },
  },
  instance: {
    panel: {
      allowOpen: true,
      open() {},
      close() {},
    },
  },
  on: {
    init() {
      // Init Swipe Panels
      // Init Panels Breakpoints
    },
  },
};
