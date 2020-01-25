import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7NavLeft from './nav-left';
import F7NavTitle from './nav-title';
import F7NavRight from './nav-right';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-navbar',
  props: Object.assign({
    id: [String, Number],
    backLink: [Boolean, String],
    backLinkUrl: String,
    backLinkForce: Boolean,
    backLinkShowText: {
      type: Boolean,
      default: undefined
    },
    sliding: {
      type: Boolean,
      default: true
    },
    title: String,
    subtitle: String,
    hidden: Boolean,
    noShadow: Boolean,
    noHairline: Boolean,
    innerClass: String,
    innerClassName: String,
    large: Boolean,
    largeTransparent: Boolean,
    titleLarge: String
  }, Mixins.colorProps),

  data() {
    const props = __vueComponentProps(this);

    const state = (() => {
      const self = this;
      const $f7 = self.$f7;

      if (!$f7) {
        self.$f7ready(() => {
          self.setState({
            _theme: self.$theme
          });
        });
      }

      return {
        _theme: $f7 ? self.$theme : null,
        routerPositionClass: '',
        largeCollapsed: false,
        routerNavbarRole: null,
        routerNavbarRoleDetailRoot: false,
        routerNavbarMasterStack: false
      };
    })();

    return {
      state
    };
  },

  render() {
    const _h = this.$createElement;
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
      innerClass,
      innerClassName,
      className,
      id,
      style,
      hidden,
      noShadow,
      noHairline,
      large,
      largeTransparent,
      titleLarge
    } = props;
    const {
      _theme: theme,
      routerPositionClass,
      largeCollapsed
    } = self.state;
    let leftEl;
    let titleEl;
    let rightEl;
    let titleLargeEl;
    const addLeftTitleClass = theme && theme.ios && self.$f7 && !self.$f7.params.navbar.iosCenterTitle;
    const addCenterTitleClass = theme && theme.md && self.$f7 && self.$f7.params.navbar.mdCenterTitle || theme && theme.aurora && self.$f7 && self.$f7.params.navbar.auroraCenterTitle;
    const slots = self.$slots;
    const classes = Utils.classNames(className, 'navbar', routerPositionClass && routerPositionClass, {
      'navbar-hidden': hidden,
      'navbar-large': large,
      'navbar-large-transparent': largeTransparent,
      'navbar-large-collapsed': large && largeCollapsed,
      'navbar-master': this.state.routerNavbarRole === 'master',
      'navbar-master-detail': this.state.routerNavbarRole === 'detail',
      'navbar-master-detail-root': this.state.routerNavbarRoleDetailRoot === true,
      'navbar-master-stacked': this.state.routerNavbarMasterStack === true,
      'no-shadow': noShadow,
      'no-hairline': noHairline
    }, Mixins.colorClasses(props));

    if (backLink || slots['nav-left'] || slots.left) {
      leftEl = _h(F7NavLeft, {
        on: {
          backClick: self.onBackClick
        },
        attrs: {
          backLink: backLink,
          backLinkUrl: backLinkUrl,
          backLinkForce: backLinkForce,
          backLinkShowText: backLinkShowText
        }
      }, [slots['nav-left'], slots.left]);
    }

    if (title || subtitle || slots.title) {
      titleEl = _h(F7NavTitle, {
        attrs: {
          title: title,
          subtitle: subtitle
        }
      }, [slots.title]);
    }

    if (slots['nav-right'] || slots.right) {
      rightEl = _h(F7NavRight, [slots['nav-right'], slots.right]);
    }

    let largeTitle = titleLarge;
    if (!largeTitle && large && title) largeTitle = title;

    if (largeTitle || slots['title-large']) {
      titleLargeEl = _h('div', {
        class: 'title-large'
      }, [_h('div', {
        class: 'title-large-text'
      }, [largeTitle || '', this.$slots['title-large']])]);
    }

    const innerEl = _h('div', {
      class: Utils.classNames('navbar-inner', innerClass, innerClassName, {
        sliding,
        'navbar-inner-left-title': addLeftTitleClass,
        'navbar-inner-centered-title': addCenterTitleClass
      })
    }, [leftEl, titleEl, rightEl, titleLargeEl, this.$slots['default']]);

    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [_h('div', {
      class: 'navbar-bg'
    }), this.$slots['before-inner'], innerEl, this.$slots['after-inner']]);
  },

  created() {
    Utils.bindMethods(this, ['onBackClick', 'onHide', 'onShow', 'onExpand', 'onCollapse', 'onNavbarPosition', 'onNavbarRole', 'onNavbarMasterStack', 'onNavbarMasterUnstack']);
  },

  mounted() {
    const self = this;
    const {
      el
    } = self.$refs;
    if (!el) return;
    self.$f7ready(f7 => {
      self.eventTargetEl = el;
      f7.on('navbarShow', self.onShow);
      f7.on('navbarHide', self.onHide);
      f7.on('navbarCollapse', self.onCollapse);
      f7.on('navbarExpand', self.onExpand);
      f7.on('navbarPosition', self.onNavbarPosition);
      f7.on('navbarRole', self.onNavbarRole);
      f7.on('navbarMasterStack', self.onNavbarMasterStack);
      f7.on('navbarMasterUnstack', self.onNavbarMasterUnstack);
    });
  },

  updated() {
    const self = this;
    if (!self.$f7) return;
    const el = self.$refs.el;
    self.$f7.navbar.size(el);
  },

  beforeDestroy() {
    const self = this;
    const {
      el
    } = self.$refs;
    if (!el || !self.$f7) return;
    const f7 = self.$f7;
    f7.off('navbarShow', self.onShow);
    f7.off('navbarHide', self.onHide);
    f7.off('navbarCollapse', self.onCollapse);
    f7.off('navbarExpand', self.onExpand);
    f7.off('navbarPosition', self.onNavbarPosition);
    f7.off('navbarRole', self.onNavbarRole);
    f7.off('navbarMasterStack', self.onNavbarMasterStack);
    f7.off('navbarMasterUnstack', self.onNavbarMasterUnstack);
    self.eventTargetEl = null;
    delete self.eventTargetEl;
  },

  methods: {
    onHide(navbarEl) {
      if (this.eventTargetEl !== navbarEl) return;
      this.dispatchEvent('navbar:hide navbarHide');
    },

    onShow(navbarEl) {
      if (this.eventTargetEl !== navbarEl) return;
      this.dispatchEvent('navbar:show navbarShow');
    },

    onExpand(navbarEl) {
      if (this.eventTargetEl !== navbarEl) return;
      this.setState({
        largeCollapsed: false
      });
      this.dispatchEvent('navbar:expand navbarExpand');
    },

    onCollapse(navbarEl) {
      if (this.eventTargetEl !== navbarEl) return;
      this.setState({
        largeCollapsed: true
      });
      this.dispatchEvent('navbar:collapse navbarCollapse');
    },

    onNavbarPosition(navbarEl, position) {
      if (this.eventTargetEl !== navbarEl) return;
      this.setState({
        routerPositionClass: position ? `navbar-${position}` : ''
      });
    },

    onNavbarRole(navbarEl, rolesData) {
      if (this.eventTargetEl !== navbarEl) return;
      this.setState({
        routerNavbarRole: rolesData.role,
        routerNavbarRoleDetailRoot: rolesData.detailRoot
      });
    },

    onNavbarMasterStack(navbarEl) {
      if (this.eventTargetEl !== navbarEl) return;
      this.setState({
        routerNavbarMasterStack: true
      });
    },

    onNavbarMasterUnstack(navbarEl) {
      if (this.eventTargetEl !== navbarEl) return;
      this.setState({
        routerNavbarMasterStack: false
      });
    },

    hide(animate) {
      const self = this;
      if (!self.$f7) return;
      self.$f7.navbar.hide(self.$refs.el, animate);
    },

    show(animate) {
      const self = this;
      if (!self.$f7) return;
      self.$f7.navbar.show(self.$refs.el, animate);
    },

    size() {
      const self = this;
      if (!self.$f7) return;
      self.$f7.navbar.size(self.$refs.el);
    },

    onBackClick(event) {
      this.dispatchEvent('back-click backClick click:back clickBack', event);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    },

    setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};