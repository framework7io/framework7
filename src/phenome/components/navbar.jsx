import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

import F7NavLeft from './nav-left';
import F7NavTitle from './nav-title';

export default {
  name: 'f7-navbar',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    backLink: [Boolean, String],
    backLinkUrl: String,
    backLinkForce: Boolean,
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
    innerClass: String,
    innerClassName: String,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      backLink,
      backLinkUrl,
      backLinkForce,
      sliding,
      title,
      subtitle,
      inner,
      innerClass,
      innerClassName,
      className,
      id,
      style,
      hidden,
      noShadow,
      noHairline,
    } = props;

    let innerEl;
    let leftEl;
    let titleEl;

    if (inner) {
      if (backLink) {
        leftEl = (
          <F7NavLeft
            backLink={backLink}
            backLinkUrl={backLinkUrl}
            backLinkForce={backLinkForce}
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
          className={Utils.classNames('navbar-inner', innerClass, innerClassName, { sliding })}
        >
          {leftEl}
          {titleEl}
          <slot />
        </div>
      );
    }
    const classes = Utils.classNames(
      className,
      'navbar',
      {
        'navbar-hidden': hidden,
        'no-shadow': noShadow,
        'no-hairline': noHairline,
      },
      Mixins.colorClasses(props),
    );

    return (
      <div ref="el" id={id} style={style} className={classes}>
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
    onBackClick(event) {
      this.dispatchEvent('back-click backClick click:back clickBack', event);
    },
  },
};
