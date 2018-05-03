import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

import F7NavLeft from './nav-left';
import F7NavTitle from './nav-title';

const NavbarProps = Utils.extend({
  backLink: [Boolean, String],
  backLinkUrl: String,
  sliding: {
    type: Boolean,
    default: true,
  },
  title: String,
  subtitle: String,
  hidden: Boolean,
  noShadow: Boolean,
  noHairline: Boolean,
  inner: {
    type: Boolean,
    default: true,
  },
}, Mixins.colorProps);

export default {
  name: 'f7-navbar',
  props: NavbarProps,
  render() {
    const self = this;
    const {
      backLink,
      backLinkUrl,
      sliding,
      title,
      subtitle,
      inner,
    } = self.props;

    let innerEl;
    let leftEl;
    let titleEl;

    if (inner) {
      if (backLink) {
        leftEl = (
          <F7NavLeft
            backLink={backLink}
            backLinkUrl={backLinkUrl}
            onBackClick={self.onBackClick.bind(self)}
          />
        );
      }
      if (title || subtitle) {
        titleEl = (
          <F7NavTitle
            title={title}
            subtitle={subtitle}
          />
        );
      }
      innerEl = (
        <div
          ref="inner"
          className={Utils.classNames('navbar-inner', { sliding })}
        >
          {leftEl}
          {titleEl}
          <slot />
        </div>
      );
    }
    return (
      <div ref="el" id={this.props.id} style={this.props.style} className={this.classes}>
        <slot name="before-inner" />
        {innerEl}
        <slot name="after-inner" />
      </div>
    );
  },
  componentDidUpdate() {
    const self = this;
    if (!self.$f7) return;
    const el = self.refs.el;
    if (el && el.children && el.children.length) {
      self.$f7.navbar.size(el);
    } else if (self.refs.inner) {
      self.$f7.navbar.size(self.refs.inner);
    }
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(
        self.props.className,
        {
          navbar: true,
          'navbar-hidden': self.props.hidden,
          'no-shadow': self.props.noShadow,
          'no-hairline': self.props.noHairline,
        },
        Mixins.colorClasses(self),
      );
    },
  },
  methods: {
    hide(animate) {
      const self = this;
      if (!self.$f7) return;
      self.$f7.navbar.hide(self.refs.el, animate);
    },
    show(animate) {
      const self = this;
      if (!self.$f7) return;
      self.$f7.navbar.show(self.refs.el, animate);
    },
    size() {
      const self = this;
      if (!self.$f7) return;
      self.$f7.navbar.size(self.refs.el);
    },
    onBackClick(e) {
      this.dispatchEvent('back-click backClick click:back clickBack', e);
    },
  },
};
