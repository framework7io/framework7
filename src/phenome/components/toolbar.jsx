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
  state() {
    const self = this;
    const $f7 = self.$f7;
    if (!$f7) {
      self.$f7ready(() => {
        self.setState({ _theme: self.$theme });
      });
    }
    return {
      _theme: $f7 ? self.$theme : null,
    };
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
    // eslint-disable-next-line
    const theme = self.state._theme;

    const classes = Utils.classNames(
      className,
      'toolbar',
      {
        tabbar,
        'toolbar-bottom': (theme && theme.md && bottomMd) || (theme && theme.ios && bottomIos) || (theme && theme.aurora && bottomAurora) || bottom || position === 'bottom',
        'toolbar-top': (theme && theme.md && topMd) || (theme && theme.ios && topIos) || (theme && theme.aurora && topAurora) || top || position === 'top',
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
  componentDidCreate() {
    Utils.bindMethods(this, ['onHide', 'onShow']);
  },
  componentDidUpdate() {
    const self = this;
    if (self.props.tabbar && self.$f7) {
      self.$f7.toolbar.setHighlight(self.refs.el);
    }
  },
  componentDidMount() {
    const self = this;
    const { el } = self.refs;
    if (!el) return;
    self.$f7ready((f7) => {
      self.eventTargetEl = el;
      if (self.props.tabbar) f7.toolbar.setHighlight(el);
      f7.on('toolbarShow', self.onShow);
      f7.on('toolbarHide', self.onHide);
    });
  },
  componentWillUnmount() {
    const self = this;
    const { el } = self.refs;
    if (!el || !self.$f7) return;
    const f7 = self.$f7;
    f7.off('toolbarShow', self.onShow);
    f7.off('toolbarHide', self.onHide);
    self.eventTargetEl = null;
    delete self.eventTargetEl;
  },
  methods: {
    onHide(navbarEl) {
      if (this.eventTargetEl !== navbarEl) return;
      this.dispatchEvent('toolbar:hide toolbarHide');
    },
    onShow(navbarEl) {
      if (this.eventTargetEl !== navbarEl) return;
      this.dispatchEvent('toolbar:show toolbarShow');
    },
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
