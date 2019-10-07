import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-chip',
  props: Object.assign({
    id: [String, Number],
    media: String,
    text: [String, Number],
    deleteable: Boolean,
    mediaBgColor: String,
    mediaTextColor: String,
    outline: Boolean
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var media = props.media,
        text = props.text,
        deleteable = props.deleteable,
        className = props.className,
        id = props.id,
        style = props.style,
        mediaTextColor = props.mediaTextColor,
        mediaBgColor = props.mediaBgColor,
        outline = props.outline;
    var mediaEl;
    var labelEl;
    var deleteEl;

    if (media || self.$slots && self.$slots.media) {
      var mediaClasses = Utils.classNames('chip-media', mediaTextColor && "text-color-".concat(mediaTextColor), mediaBgColor && "bg-color-".concat(mediaBgColor));
      mediaEl = _h('div', {
        class: mediaClasses
      }, [media || this.$slots['media']]);
    }

    if (text || self.$slots && self.$slots.text) {
      labelEl = _h('div', {
        class: 'chip-label'
      }, [text, this.$slots['text']]);
    }

    if (deleteable) {
      deleteEl = _h('a', {
        ref: 'deleteEl',
        class: 'chip-delete'
      });
    }

    var classes = Utils.classNames(className, 'chip', {
      'chip-outline': outline
    }, Mixins.colorClasses(props));
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [mediaEl, labelEl, deleteEl]);
  },
  created: function created() {
    Utils.bindMethods(this, ['onClick', 'onDeleteClick']);
  },
  mounted: function mounted() {
    this.$refs.el.addEventListener('click', this.onClick);

    if (this.$refs.deleteEl) {
      this.$refs.deleteEl.addEventListener('click', this.onDeleteClick);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.$refs.el.removeEventListener('click', this.onClick);

    if (this.$refs.deleteEl) {
      this.$refs.deleteEl.removeEventListener('click', this.onDeleteClick);
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.dispatchEvent('click', event);
    },
    onDeleteClick: function onDeleteClick(event) {
      this.dispatchEvent('delete', event);
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};