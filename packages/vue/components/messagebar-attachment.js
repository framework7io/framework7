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
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var deletable = props.deletable,
        image = props.image,
        className = props.className,
        id = props.id,
        style = props.style;
    var classes = Utils.classNames(className, 'messagebar-attachment', Mixins.colorClasses(props));
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
      this.dispatchEvent('attachment:click attachmentClick', event);
    },
    onDeleteClick: function onDeleteClick(event) {
      this.dispatchEvent('attachment:delete attachmentDelete', event);
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