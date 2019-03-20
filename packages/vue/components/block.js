import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-block',
  props: Object.assign({
    id: [String, Number],
    inset: Boolean,
    tabletInset: Boolean,
    strong: Boolean,
    tabs: Boolean,
    tab: Boolean,
    tabActive: Boolean,
    accordionList: Boolean,
    noHairlines: Boolean,
    noHairlinesMd: Boolean,
    noHairlinesIos: Boolean,
    noHairlinesAurora: Boolean
  }, Mixins.colorProps),

  created() {
    Utils.bindMethods(this, ['onTabShow', 'onTabHide']);
  },

  mounted() {
    const el = this.$refs.el;
    if (!el) return;
    el.addEventListener('tab:show', this.onTabShow);
    el.addEventListener('tab:hide', this.onTabHide);
  },

  beforeDestroy() {
    const el = this.$refs.el;
    if (!el) return;
    el.removeEventListener('tab:show', this.onTabShow);
    el.removeEventListener('tab:hide', this.onTabHide);
  },

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      className,
      inset,
      strong,
      accordionList,
      tabletInset,
      tabs,
      tab,
      tabActive,
      noHairlines,
      noHairlinesIos,
      noHairlinesMd,
      noHairlinesAurora,
      id,
      style
    } = props;
    const classes = Utils.classNames(className, 'block', {
      inset,
      'block-strong': strong,
      'accordion-list': accordionList,
      'tablet-inset': tabletInset,
      tabs,
      tab,
      'tab-active': tabActive,
      'no-hairlines': noHairlines,
      'no-hairlines-md': noHairlinesMd,
      'no-hairlines-ios': noHairlinesIos,
      'no-hairlines-aurora': noHairlinesAurora
    }, Mixins.colorClasses(props));
    return _h('div', {
      style: style,
      class: classes,
      ref: 'el',
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
  },

  methods: {
    onTabShow(event) {
      this.dispatchEvent('tabShow tab:show', event);
    },

    onTabHide(event) {
      this.dispatchEvent('tabHide tab:hide', event);
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