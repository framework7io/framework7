<script>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { extend } from '../shared/utils';
import { f7ready, f7 } from '../shared/f7';

export default {
  name: 'f7-photo-browser',

  props: {
    init: {
      type: Boolean,
      default: true,
    },
    params: Object,
    photos: Array,
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
      default: true,
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
  },
  emits: [
    'photobrowser:open',
    'photobrowser:close',
    'photobrowser:opened',
    'photobrowser:closed',
    'photobrowser:swipetoclose',
  ],
  setup(props, { emit }) {
    const f7PhotoBrowser = ref(null);

    const open = (index) => {
      return f7PhotoBrowser.value.open(index);
    };
    const close = () => {
      return f7PhotoBrowser.value.close();
    };
    const expositionToggle = () => {
      return f7PhotoBrowser.value.expositionToggle();
    };
    const expositionEnable = () => {
      return f7PhotoBrowser.value.expositionEnable();
    };
    const expositionDisable = () => {
      return f7PhotoBrowser.value.expositionDisable();
    };
    watch(
      () => props.photos,
      (value) => {
        const pb = f7PhotoBrowser.value;
        if (!pb) return;
        pb.params.photos = value;
        if (pb.opened && pb.swiper) {
          pb.swiper.update();
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

        f7PhotoBrowser.value = f7.photoBrowser.create(paramsComputed);
      });
    });

    onBeforeUnmount(() => {
      if (f7PhotoBrowser.value && f7PhotoBrowser.value.destroy) f7PhotoBrowser.value.destroy();
      f7PhotoBrowser.value = null;
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
