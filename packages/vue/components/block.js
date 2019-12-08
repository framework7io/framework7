import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-block',
  props: Object.assign({
    id: [String, Number],
    inset: Boolean,
    xsmallInset: Boolean,
    smallInset: Boolean,
    mediumInset: Boolean,
    largeInset: Boolean,
    xlargeInset: Boolean,
    strong: Boolean,
    tabs: Boolean,
    tab: Boolean,
    tabActive: Boolean,
    accordionList: Boolean,
    accordionOpposite: Boolean,
    noHairlines: Boolean,
    noHairlinesMd: Boolean,
    noHairlinesIos: Boolean,
    noHairlinesAurora: Boolean
  }, Mixins.colorProps),

  created() {
    Utils.bindMethods(this, ['onTabShow', 'onTabHide']);
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el) return;
    self.eventTargetEl = el;
    self.$f7ready(f7 => {
      f7.on('tabShow', self.onTabShow);
      f7.on('tabHide', self.onTabHide);
    });
  },

  beforeDestroy() {
    const el = this.$refs.el;
    if (!el || !this.$f7) return;
    this.$f7.off('tabShow', this.onTabShow);
    this.$f7.off('tabHide', this.onTabHide);
    delete this.eventTargetEl;
  },

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      className,
      inset,
      xsmallInset,
      smallInset,
      mediumInset,
      largeInset,
      xlargeInset,
      strong,
      accordionList,
      accordionOpposite,
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
      'xsmall-inset': xsmallInset,
      'small-inset': smallInset,
      'medium-inset': mediumInset,
      'large-inset': largeInset,
      'xlarge-inset': xlargeInset,
      'block-strong': strong,
      'accordion-list': accordionList,
      'accordion-opposite': accordionOpposite,
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
    onTabShow(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tabShow tab:show');
    },

    onTabHide(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tabHide tab:hide');
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