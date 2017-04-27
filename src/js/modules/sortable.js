function initSortable() {

}
export default {
  name: 'sortable',
  params: true,
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
