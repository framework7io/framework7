import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-messagebar-attachment',
  props: Object.assign({
    id: [String, Number],
    image: String,
    deletable: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      deletable,
      image,
      className,
      id,
      style
    } = props;
    const classes = Utils.classNames(className, 'messagebar-attachment', Mixins.colorClasses(props));
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [image && _h('img', {
      attrs: {
        src: image
      }
    }), deletable && _h('span', {
      ref: 'deleteEl',
      class: 'messagebar-attachment-delete'
    }), this.$slots['default']]);
  },

  created() {
    Utils.bindMethods(this, ['onClick', 'onDeleteClick']);
  },

  mounted() {
    this.$refs.el.addEventListener('click', this.onClick);

    if (this.$refs.deleteEl) {
      this.$refs.deleteEl.addEventListener('click', this.onDeleteClick);
    }
  },

  beforeDestroy() {
    this.$refs.el.removeEventListener('click', this.onClick);

    if (this.$refs.deleteEl) {
      this.$refs.deleteEl.removeEventListener('click', this.onDeleteClick);
    }
  },

  methods: {
    onClick(event) {
      this.dispatchEvent('attachment:click attachmentClick', event);
    },

    onDeleteClick(event) {
      this.dispatchEvent('attachment:delete attachmentDelete', event);
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