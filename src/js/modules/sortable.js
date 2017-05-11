function initSortable() {

}
export default {
  name: 'sortable',
  params: {
    sortable: true,
  },
  instance: {
    // New API
    sortable: {
      open() {},
      close() {},
      toggle() {},
    },
  },
  on: {
    init() {
      initSortable();
    },
  },
};
