import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-block',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
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
    noHairlinesAurora: Boolean,
    ...Mixins.colorProps,
  },
  componentDidCreate() {
    Utils.bindMethods(this, ['onTabShow', 'onTabHide']);
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    self.eventTargetEl = el;
    self.$f7ready((f7) => {
      f7.on('tabShow', self.onTabShow);
      f7.on('tabHide', self.onTabHide);
    });
  },
  componentWillUnmount() {
    const el = this.refs.el;
    if (!el || !this.$f7) return;
    this.$f7.off('tabShow', this.onTabShow);
    this.$f7.off('tabHide', this.onTabHide);
    delete this.eventTargetEl;
  },
  render() {
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

      tabs,
      tab,
      tabActive,
      noHairlines,
      noHairlinesIos,
      noHairlinesMd,
      noHairlinesAurora,
      id,
      style,
    } = props;
    const classes = Utils.classNames(
      className,
      'block',
      {
        inset,
        'xsmall-inset': xsmallInset,
        'small-inset': smallInset,
        'medium-inset': mediumInset,
        'large-inset': largeInset,
        'xlarge-inset': xlargeInset,
        'block-strong': strong,
        'accordion-list': accordionList,
        tabs,
        tab,
        'tab-active': tabActive,
        'no-hairlines': noHairlines,
        'no-hairlines-md': noHairlinesMd,
        'no-hairlines-ios': noHairlinesIos,
        'no-hairlines-aurora': noHairlinesAurora,
      },
      Mixins.colorClasses(props),
    );
    return (
      <div
        id={id}
        style={style}
        className={classes}
        ref="el"
      >
        <slot />
      </div>
    );
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
  },
};
