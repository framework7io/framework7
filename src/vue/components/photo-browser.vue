<script>
import { watch, onMounted, onBeforeUnmount } from 'vue';
import { extend } from '../shared/utils.js';
import { f7ready, f7 } from '../shared/f7.js';

export default {
  name: 'f7-photo-browser',

  props: {
    init: {
      type: Boolean,
      default: true,
    },
    params: Object,
    photos: Array,
    thumbs: Array,
    exposition: {
      type: Boolean,
      default: true,
    },
    expositionHideCaptions: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
    },
    navbar: {
      type: Boolean,
      default: true,
    },
    toolbar: {
      type: Boolean,
      default: true,
    },
    theme: {
      type: String,
    },
    captionsTheme: {
      type: String,
    },
    iconsColor: {
      type: String,
    },
    swipeToClose: {
      type: Boolean,
      default: true,
    },
    pageBackLinkText: {
      type: String,
      default: undefined,
    },
    popupCloseLinkIcon: {
      type: Boolean,
      default: undefined,
    },
    popupCloseLinkText: {
      type: String,
      default: undefined,
    },
    navbarOfText: {
      type: String,
      default: undefined,
    },
    navbarShowCount: {
      type: Boolean,
      default: undefined,
    },
    swiper: {
      type: Object,
    },
    url: {
      type: String,
    },
    routableModals: {
      type: Boolean,
      default: false,
    },
    virtualSlides: {
      type: Boolean,
      default: true,
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
    renderStandalone: Function,
    renderThumb: Function,
  },
  emits: [
    'photobrowser:open',
    'photobrowser:close',
    'photobrowser:opened',
    'photobrowser:closed',
    'photobrowser:swipetoclose',
  ],
  setup(props, { emit }) {
    let f7PhotoBrowser = null;

    const open = (index) => {
      return f7PhotoBrowser.open(index);
    };
    const close = () => {
      return f7PhotoBrowser.close();
    };
    const expositionToggle = () => {
      return f7PhotoBrowser.expositionToggle();
    };
    const expositionEnable = () => {
      return f7PhotoBrowser.expositionEnable();
    };
    const expositionDisable = () => {
      return f7PhotoBrowser.expositionDisable();
    };
    watch(
      () => props.photos,
      (value) => {
        const pb = f7PhotoBrowser;
        if (!pb) return;
        pb.params.photos = value;
        if (pb.opened && pb.swiper) {
          pb.swiper.update();
        }
      },
    );
    watch(
      () => props.thumbs,
      (value) => {
        const pb = f7PhotoBrowser;
        if (!pb) return;
        pb.params.thumbs = value;
        if (pb.opened && pb.thumbsSwiper) {
          pb.thumbsSwiper.update();
        }
      },
    );
    onMounted(() => {
      if (!props.init) return;
      f7ready(() => {
        let paramsComputed;

        if (typeof props.params !== 'undefined') {
          paramsComputed = props.params;
        } else {
          paramsComputed = { ...props };
          delete paramsComputed.params;
        }

        Object.keys(paramsComputed).forEach((param) => {
          if (typeof paramsComputed[param] === 'undefined' || paramsComputed[param] === '')
            delete paramsComputed[param];
        });

        paramsComputed = extend({}, paramsComputed, {
          on: {
            open() {
              emit('photobrowser:open');
            },
            close() {
              emit('photobrowser:close');
            },
            opened() {
              emit('photobrowser:opened');
            },
            closed() {
              emit('photobrowser:closed');
            },
            swipeToClose() {
              emit('photobrowser:swipetoclose');
            },
          },
        });

        f7PhotoBrowser = f7.photoBrowser.create(paramsComputed);
      });
    });

    onBeforeUnmount(() => {
      if (f7PhotoBrowser && f7PhotoBrowser.destroy) f7PhotoBrowser.destroy();
      f7PhotoBrowser = null;
    });

    return {
      open,
      close,
      expositionToggle,
      expositionEnable,
      expositionDisable,
    };
  },
  render() {
    return null;
  },
};
</script>
