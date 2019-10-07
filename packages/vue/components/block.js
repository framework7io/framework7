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
    noHairlines: Boolean,
    noHairlinesMd: Boolean,
    noHairlinesIos: Boolean,
    noHairlinesAurora: Boolean
  }, Mixins.colorProps),
  created: function created() {
    Utils.bindMethods(this, ['onTabShow', 'onTabHide']);
  },
  mounted: function mounted() {
    var self = this;
    var el = self.$refs.el;
    if (!el) return;
    self.eventTargetEl = el;
    self.$f7ready(function (f7) {
      f7.on('tabShow', self.onTabShow);
      f7.on('tabHide', self.onTabHide);
    });
  },
  beforeDestroy: function beforeDestroy() {
    var el = this.$refs.el;
    if (!el || !this.$f7) return;
    this.$f7.off('tabShow', this.onTabShow);
    this.$f7.off('tabHide', this.onTabHide);
    delete this.eventTargetEl;
  },
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var className = props.className,
        inset = props.inset,
        xsmallInset = props.xsmallInset,
        smallInset = props.smallInset,
        mediumInset = props.mediumInset,
        largeInset = props.largeInset,
        xlargeInset = props.xlargeInset,
        strong = props.strong,
        accordionList = props.accordionList,
        tabs = props.tabs,
        tab = props.tab,
        tabActive = props.tabActive,
        noHairlines = props.noHairlines,
        noHairlinesIos = props.noHairlinesIos,
        noHairlinesMd = props.noHairlinesMd,
        noHairlinesAurora = props.noHairlinesAurora,
        id = props.id,
        style = props.style;
    var classes = Utils.classNames(className, 'block', {
      inset: inset,
      'xsmall-inset': xsmallInset,
      'small-inset': smallInset,
      'medium-inset': mediumInset,
      'large-inset': largeInset,
      'xlarge-inset': xlargeInset,
      'block-strong': strong,
      'accordion-list': accordionList,
      tabs: tabs,
      tab: tab,
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
    onTabShow: function onTabShow(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tabShow tab:show');
    },
    onTabHide: function onTabHide(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tabHide tab:hide');
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