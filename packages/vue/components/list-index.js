import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-list-index',
  props: Object.assign({
    id: [String, Number],
    init: {
      type: Boolean,
      default: true
    },
    listEl: [String, Object],
    indexes: {
      type: [String, Array],
      default: 'auto'
    },
    scrollList: {
      type: Boolean,
      default: true
    },
    label: {
      type: Boolean,
      default: false
    },
    iosItemHeight: {
      type: Number,
      default: 14
    },
    mdItemHeight: {
      type: Number,
      default: 14
    }
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const props = this.props;
    const {
      className,
      id,
      style
    } = props;
    const classes = Utils.classNames(className, 'list-index', Mixins.colorClasses(props));
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
  },

  beforeDestroy() {
    if (!this.props.init) return;

    if (this.f7ListIndex && this.f7ListIndex.destroy) {
      this.f7ListIndex.destroy();
    }
  },

  mounted() {
    const self = this;
    if (!self.props.init) return;
    self.$f7ready(f7 => {
      const el = self.$refs.el;
      const {
        listEl,
        indexes,
        iosItemHeight,
        mdItemHeight,
        scrollList,
        label
      } = self.props;
      self.f7ListIndex = f7.listIndex.create({
        el,
        listEl,
        indexes,
        iosItemHeight,
        mdItemHeight,
        scrollList,
        label,
        on: {
          select(index, itemContent, itemIndex) {
            self.dispatchEvent('listindex:select listIndexSelect', itemContent, itemIndex);
          }

        }
      });
    });
  },

  watch: {
    'props.indexes': function watchIndexes() {
      if (!this.f7ListIndex) return;
      this.f7ListIndex.params.indexes = this.indexes;
      this.update();
    }
  },
  methods: {
    update() {
      if (!this.f7ListIndex) return;
      this.f7ListIndex.update();
    },

    scrollListToIndex(indexContent) {
      if (!this.f7ListIndex) return;
      this.f7ListIndex.scrollListToIndex(indexContent);
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