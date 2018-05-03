import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

const BlockProps = Utils.extend(
  {
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
  },
  Mixins.colorProps,
);

export default {
  name: 'f7-block',
  props: BlockProps,
  componentDidMount() {
    const el = this.el;
    if (!el) return;
    this.onTabShowBound = this.onTabShow.bind(this);
    this.onTabHideBound = this.onTabHide.bind(this);
    el.addEventListener('tab:show', this.onTabShowBound);
    el.addEventListener('tab:hide', this.onTabHideBound);
  },
  componentWillUnmount() {
    const el = this.el;
    if (!el) return;
    el.removeEventListener('tab:show', this.onTabShowBound);
    el.removeEventListener('tab:hide', this.onTabHideBound);
  },
  render() {
    return (
      <div
        id={this.props.id}
        style={this.props.style}
        className={this.classes}
      >
        <slot />
      </div>
    );
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(
        self.props.className,
        {
          block: true,
          inset: self.props.inset,
          'block-strong': self.props.strong,
          'accordion-list': self.props.accordionList,
          'tablet-inset': self.props.tabletInset,
          tabs: self.props.tabs,
          tab: self.props.tab,
          'tab-active': self.props.tabActive,
          'no-hairlines': self.props.noHairlines,
          'no-hairlines-md': self.props.noHairlinesMd,
          'no-hairlines-ios': self.props.noHairlinesIos,
        },
        Mixins.colorClasses(self),
      );
    },
  },
  methods: {
    onTabShow(e) {
      this.dispatchEvent('tabShow tab:show', e);
    },
    onTabHide(e) {
      this.dispatchEvent('tabShow tab:hide', e);
    },
  },
};
