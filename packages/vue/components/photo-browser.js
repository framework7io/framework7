import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-photo-browser',
  props: {
    id: [String, Number],
    init: {
      type: Boolean,
      default: true
    },
    params: Object,
    photos: Array,
    exposition: {
      type: Boolean,
      default: true
    },
    expositionHideCaptions: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    },
    navbar: {
      type: Boolean,
      default: true
    },
    toolbar: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String
    },
    captionsTheme: {
      type: String
    },
    iconsColor: {
      type: String
    },
    swipeToClose: {
      type: Boolean,
      default: true
    },
    pageBackLinkText: {
      type: String,
      default: undefined
    },
    popupCloseLinkText: {
      type: String,
      default: undefined
    },
    navbarOfText: {
      type: String,
      default: undefined
    },
    navbarShowCount: {
      type: Boolean,
      default: undefined
    },
    swiper: {
      type: Object
    },
    url: {
      type: String
    },
    routableModals: {
      type: Boolean,
      default: true
    },
    virtualSlides: {
      type: Boolean,
      default: true
    },
    view: [String, Object],
    renderNavbar: Function,
    renderToolbar: Function,
    renderCaption: Function,
    renderObject: Function,
    renderLazyPhoto: Function,
    renderPhoto: Function,
    renderPage: Function,
    renderPopup: Function,
    renderStandalone: Function
  },

  render() {
    const _h = this.$createElement;
    return null;
  },

  watch: {
    'props.photos': function watchPhotos(newValue) {
      const self = this;
      const pb = self.f7PhotoBrowser;
      if (!pb) return;
      self.f7PhotoBrowser.params.photos = newValue;

      if (pb.opened && pb.swiper) {
        pb.swiper.update();
      }
    }
  },

  beforeDestroy() {
    const self = this;
    if (self.f7PhotoBrowser && self.f7PhotoBrowser.destroy) self.f7PhotoBrowser.destroy();
  },

  mounted() {
    const self = this;
    if (!self.props.init) return;
    self.$f7ready(f7 => {
      let params;
      if (typeof self.props.params !== 'undefined') params = self.props.params;else params = Object.assign({}, self.props);
      Object.keys(params).forEach(param => {
        if (typeof params[param] === 'undefined' || params[param] === '') delete params[param];
      });
      params = Utils.extend({}, params, {
        on: {
          open() {
            self.dispatchEvent('photobrowser:open photoBrowserOpen');
          },

          close() {
            self.dispatchEvent('photobrowser:close photoBrowserClose');
          },

          opened() {
            self.dispatchEvent('photobrowser:opened photoBrowserOpened');
          },

          closed() {
            self.dispatchEvent('photobrowser:closed photoBrowserClosed');
          },

          swipeToClose() {
            self.dispatchEvent('photobrowser:swipetoclose photoBrowserSwipeToClose');
          }

        }
      });
      self.f7PhotoBrowser = f7.photoBrowser.create(params);
    });
  },

  methods: {
    open(index) {
      return this.f7PhotoBrowser.open(index);
    },

    close() {
      return this.f7PhotoBrowser.close();
    },

    expositionToggle() {
      return this.f7PhotoBrowser.expositionToggle();
    },

    expositionEnable() {
      return this.f7PhotoBrowser.expositionEnable();
    },

    expositionDisable() {
      return this.f7PhotoBrowser.expositionDisable();
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};