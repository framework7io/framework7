function initPageSmartSelect() {

}
export default {
  name: 'smartSelect',
  params: {
    smartSelect: {
      openIn: 'page', // or 'popup' or 'picker'
      backText: 'Back',
      popupCloseText: 'Close',
      pickerCloseText: 'Done',
      searchbar: false,
      backOnSelect: false,
    },
  },
  instance: {
    // New API
    smartSelect: {
      addOption() {

      },
      open() {

      },
      close() {

      },
      init() {

      },
    },
  },
  on: {
    'page:init': function pageInit() {
      initPageSmartSelect();
    },
  },
};
