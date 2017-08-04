import $ from 'dom7';
import Utils from '../../utils/utils';

const Indicator = {
  visible: false,
  show(color = 'white') {
    const app = this;
    if (Indicator.visible) return;
    const preloaderInner = app.theme !== 'md' ? '' :
      '<span class="preloader-inner">' +
          '<span class="preloader-inner-gap"></span>' +
          '<span class="preloader-inner-left">' +
              '<span class="preloader-inner-half-circle"></span>' +
          '</span>' +
          '<span class="preloader-inner-right">' +
              '<span class="preloader-inner-half-circle"></span>' +
          '</span>' +
      '</span>';
    $('html').addClass('with-modal-indicator');
    app.root.append(`
      <div class="indicator-backdrop"></div>
      <div class="indicator-modal">
        <div class="preloader preloader-${color}">${preloaderInner}</div>
      </div>
    `);
    Indicator.visible = true;
  },
  hide() {
    const app = this;
    if (!Indicator.visible) return;
    $('html').removeClass('with-modal-indicator');
    app.root.find('.indicator-backdrop, .indicator-modal').remove();
    Indicator.visible = false;
  },
};

export default {
  name: 'indicator',
  create() {
    const app = this;
    Utils.extend(app, {
      indicator: {
        show: Indicator.show.bind(app),
        hide: Indicator.hide.bind(app),
      },
    });
  },
};
