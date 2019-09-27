import $ from 'dom7';
import ConstructorMethods from '../../utils/constructor-methods';
import ColorPicker from './color-picker-class';

export default {
  name: 'colorPicker',
  static: {
    ColorPicker,
  },
  create() {
    const app = this;
    app.colorPicker = ConstructorMethods({
      defaultSelector: '.color-picker',
      constructor: ColorPicker,
      app,
      domProp: 'f7ColorPicker',
    });
    app.colorPicker.close = function close(el = '.color-picker') {
      const $el = $(el);
      if ($el.length === 0) return;
      const colorPicker = $el[0].f7ColorPicker;
      if (!colorPicker || (colorPicker && !colorPicker.opened)) return;
      colorPicker.close();
    };
  },
  params: {
    colorPicker: {
      // Color picker settings
      value: null,
      modules: [
        'wheel',
      ],
      palette: [
        ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C'],
        ['#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C'],
        ['#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E'],
        ['#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B'],
        ['#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40'],
        ['#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E'],
        ['#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17'],
        ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100'],
      ],
      groupedModules: false,
      centerModules: true,

      sliderLabel: false,
      sliderValue: false,
      sliderValueEdiable: false,

      barLabel: false,
      barValue: false,
      barValueEdiable: false,

      hexLabel: false,
      hexValueEditable: false,

      redLabelText: 'R',
      greenLabelText: 'G',
      blueLabelText: 'B',
      hueLabelText: 'H',
      saturationLabelText: 'S',
      brightnessLabelText: 'B',
      hexLabelText: 'HEX',
      alphaLabelText: 'A',

      // Common opener settings
      containerEl: null,
      openIn: 'popover', // or 'popover' or 'sheet' or 'popup' or 'page' or 'auto'
      openInPhone: 'popup', // or 'popover' or 'sheet' or 'popup' or 'page'
      popupPush: false,
      popupSwipeToClose: undefined,
      sheetPush: false,
      sheetSwipeToClose: undefined,
      formatValue: null,
      targetEl: null,
      targetElSetBackgroundColor: false,
      inputEl: null,
      inputReadOnly: true,
      closeByOutsideClick: true,
      scrollToInput: true,
      toolbarSheet: true,
      toolbarPopover: false,
      toolbarCloseText: 'Done',
      navbarPopup: true,
      navbarCloseText: 'Done',
      navbarTitleText: 'Color',
      navbarBackLinkText: 'Back',
      cssClass: null,
      routableModals: true,
      view: null,
      url: 'color/',
      backdrop: null,
      closeByBackdropClick: true,
      // Render functions
      renderToolbar: null,
      renderNavbar: null,
      renderInline: null,
      renderPopover: null,
      renderSheet: null,
      renderPopup: null,
      render: null,
    },
  },
};
