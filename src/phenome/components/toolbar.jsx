import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-toolbar',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    tabbar: Boolean,
    labels: Boolean,
    scrollable: Boolean,
    hidden: Boolean,
    noShadow: Boolean,
    noHairline: Boolean,
    noBorder: Boolean,
    position: {
      type: String,
      default: undefined,
    },
    topMd: {
      type: Boolean,
      default: undefined,
    },
    topIos: {
      type: Boolean,
      default: undefined,
    },
    topAurora: {
      type: Boolean,
      default: undefined,
    },
    top: {
      type: Boolean,
      default: undefined,
    },
    bottomMd: {
      type: Boolean,
      default: undefined,
    },
    bottomIos: {
      type: Boolean,
      default: undefined,
    },
    bottomAurora: {
      type: Boolean,
      default: undefined,
    },
    bottom: {
      type: Boolean,
      default: undefined,
    },
    inner: {
      type: Boolean,
      default: true,
    },
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      className,
      inner,
      tabbar,
      labels,
      scrollable,
      hidden,
      noShadow,
      noHairline,
      noBorder,
      topMd,
      topIos,
      topAurora,
      top,
      bottomMd,
      bottomIos,
      bottomAurora,
      bottom,
      position,
    } = props;

    const classes = Utils.classNames(
      className,
      'toolbar',
      {
        tabbar,
        'toolbar-bottom': (self.$theme.md && bottomMd) || (self.$theme.ios && bottomIos) || (self.$theme.aurora && bottomAurora) || bottom || position === 'bottom',
        'toolbar-top': (self.$theme.md && topMd) || (self.$theme.ios && topIos) || (self.$theme.aurora && topAurora) || top || position === 'top',
        'tabbar-labels': labels,
        'tabbar-scrollable': scrollable,
        'toolbar-hidden': hidden,
        'no-shadow': noShadow,
        'no-hairline': noHairline || noBorder,
      },
      Mixins.colorClasses(props),
    );

    return (
      <div id={id} style={style} ref="el" className={classes}>
        <slot name="before-inner" />
        {inner ? (
          <div className="toolbar-inner">
            <slot />
          </div>
        ) : (
          <slot />
        )}
        <slot name="after-inner" />
      </div>
    );
  },
  componentDidUpdate() {
    const self = this;
    if (self.props.tabbar && self.$f7) {
      self.$f7.toolbar.setHighlight(self.refs.el);
    }
  },
  componentDidMount() {
    const self = this;
    self.$f7ready((f7) => {
      if (self.props.tabbar) f7.toolbar.setHighlight(self.refs.el);
    });
  },
  methods: {
    hide(animate) {
      const self = this;
      if (!self.$f7) return;
      self.$f7.toolbar.hide(this.refs.el, animate);
    },
    show(animate) {
      const self = this;
      if (!self.$f7) return;
      self.$f7.toolbar.show(this.refs.el, animate);
    },
  },
};
