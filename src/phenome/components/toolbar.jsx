import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-toolbar',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    bottomMd: Boolean,
    tabbar: Boolean,
    labels: Boolean,
    scrollable: Boolean,
    hidden: Boolean,
    noShadow: Boolean,
    noHairline: Boolean,
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
      bottomMd,
      tabbar,
      labels,
      scrollable,
      hidden,
      noShadow,
      noHairline,
    } = props;

    const classes = Utils.classNames(
      className,
      'toolbar',
      {
        'toolbar-bottom-md': bottomMd,
        tabbar,
        'tabbar-labels': labels,
        'tabbar-scrollable': scrollable,
        'toolbar-hidden': hidden,
        'no-shadow': noShadow,
        'no-hairline': noHairline,
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
