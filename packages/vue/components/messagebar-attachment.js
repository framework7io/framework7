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

  created() {
    this.onClickBound = this.onClick.bind(this);
    this.onDeleteClickBound = this.onDeleteClick.bind(this);
  },

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
      style: style,
      class: classes,
      on: {
        click: self.onClickBound
      },
      attrs: {
        id: id
      }
    }, [image && _h('img', {
      attrs: {
        src: image
      }
    }), deletable && _h('span', {
      class: 'messagebar-attachment-delete',
      on: {
        click: self.onDeleteClickBound
      }
    }), this.$slots['default']]);
  },

  methods: {
    onClick(e) {
      this.dispatchEvent('attachment:click attachmentClick', e);
    },

    onDeleteClick(e) {
      this.dispatchEvent('attachment:delete attachmentDelete', e);
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