import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-block',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
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
    noHairlinesAurora: Boolean,
    ...Mixins.colorProps,
  },
  componentDidCreate() {
    Utils.bindMethods(this, ['onTabShow', 'onTabHide']);
  },
  componentDidMount() {
    const el = this.refs.el;
    if (!el) return;
    el.addEventListener('tab:show', this.onTabShow);
    el.addEventListener('tab:hide', this.onTabHide);
  },
  componentWillUnmount() {
    const el = this.refs.el;
    if (!el) return;
    el.removeEventListener('tab:show', this.onTabShow);
    el.removeEventListener('tab:hide', this.onTabHide);
  },
  render() {
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
      style,
    } = props;
    const classes = Utils.classNames(
      className,
      'block',
      {
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
    onTabShow(event) {
      this.dispatchEvent('tabShow tab:show', event);
    },
    onTabHide(event) {
      this.dispatchEvent('tabHide tab:hide', event);
    },
  },
};
