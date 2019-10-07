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
    },
    auroraItemHeight: {
      type: Number,
      default: 14
    }
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var props = this.props;
    var className = props.className,
        id = props.id,
        style = props.style;
    var classes = Utils.classNames(className, 'list-index', Mixins.colorClasses(props));
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
  },
  beforeDestroy: function beforeDestroy() {
    if (!this.props.init) return;

    if (this.f7ListIndex && this.f7ListIndex.destroy) {
      this.f7ListIndex.destroy();
    }
  },
  mounted: function mounted() {
    var self = this;
    if (!self.props.init) return;
    self.$f7ready(function (f7) {
      var el = self.$refs.el;
      var _self$props = self.props,
          listEl = _self$props.listEl,
          indexes = _self$props.indexes,
          iosItemHeight = _self$props.iosItemHeight,
          mdItemHeight = _self$props.mdItemHeight,
          auroraItemHeight = _self$props.auroraItemHeight,
          scrollList = _self$props.scrollList,
          label = _self$props.label;
      self.f7ListIndex = f7.listIndex.create({
        el: el,
        listEl: listEl,
        indexes: indexes,
        iosItemHeight: iosItemHeight,
        mdItemHeight: mdItemHeight,
        auroraItemHeight: auroraItemHeight,
        scrollList: scrollList,
        label: label,
        on: {
          select: function select(index, itemContent, itemIndex) {
            self.dispatchEvent('listindex:select listIndexSelect', itemContent, itemIndex);
          }
        }
      });
    });
  },
  watch: {
    'props.indexes': function watchIndexes() {
      if (!this.f7ListIndex) return;
      this.f7ListIndex.params.indexes = this.props.indexes;
      this.update();
    }
  },
  methods: {
    update: function update() {
      if (!this.f7ListIndex) return;
      this.f7ListIndex.update();
    },
    scrollListToIndex: function scrollListToIndex(indexContent) {
      if (!this.f7ListIndex) return;
      this.f7ListIndex.scrollListToIndex(indexContent);
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