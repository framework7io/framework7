import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

import F7NavLeft from './nav-left';
import F7NavTitle from './nav-title';
import F7NavRight from './nav-right';

export default {
  name: 'f7-navbar',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    backLink: [Boolean, String],
    backLinkUrl: String,
    backLinkForce: Boolean,
    backLinkShowText: {
      type: Boolean,
      default: undefined,
    },
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
    large: Boolean,
    titleLarge: String,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      backLink,
      backLinkUrl,
      backLinkForce,
      backLinkShowText,
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
      large,
      titleLarge,
    } = props;

    let innerEl;
    let leftEl;
    let titleEl;
    let rightEl;
    let titleLargeEl;

    const addLeftTitleClass = self.$theme && self.$theme.ios && self.$f7 && !self.$f7.params.navbar.iosCenterTitle;
    const addCenterTitleClass = (self.$theme && self.$theme.md && self.$f7 && self.$f7.params.navbar.mdCenterTitle)
      || (self.$theme && self.$theme.aurora && self.$f7 && self.$f7.params.navbar.auroraCenterTitle);

    const slots = self.slots;

    if (inner) {
      if (backLink || slots['nav-left']) {
        leftEl = (
          <F7NavLeft
            backLink={backLink}
            backLinkUrl={backLinkUrl}
            backLinkForce={backLinkForce}
            backLinkShowText={backLinkShowText}
            onBackClick={self.onBackClick}
          >{slots['nav-left']}</F7NavLeft>
        );
      }
      if (title || subtitle || slots.title) {
        titleEl = (
          <F7NavTitle
            title={title}
            subtitle={subtitle}
          >{slots.title}</F7NavTitle>
        );
      }
      if (slots['nav-right']) {
        rightEl = (
          <F7NavRight>{slots['nav-right']}</F7NavRight>
        );
      }
      let largeTitle = titleLarge;
      if (!largeTitle && large && title) largeTitle = title;
      if (largeTitle) {
        titleLargeEl = (
          <div className="title-large">
            <div className="title-large-text">{largeTitle}</div>
          </div>
        );
      }
      innerEl = (
        <div
          ref="inner"
          className={Utils.classNames(
            'navbar-inner',
            innerClass,
            innerClassName,
            {
              sliding,
              'navbar-inner-left-title': addLeftTitleClass,
              'navbar-inner-centered-title': addCenterTitleClass,
              'navbar-inner-large': large,
            }
          )}
        >
          {leftEl}
          {titleEl}
          {rightEl}
          {titleLargeEl}
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
        'navbar-large': large,
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
  componentDidCreate() {
    Utils.bindMethods(this, ['onBackClick']);
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
