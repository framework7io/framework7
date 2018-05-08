import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentTransformJSXProps from '../runtime-helpers/vue-component-transform-jsx-props.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-list-button',
  props: {
    id: [
      String,
      Number
    ],
    noFastclick: Boolean,
    noFastClick: Boolean,
    title: [
      String,
      Number
    ],
    text: [
      String,
      Number
    ],
    tabLink: [
      Boolean,
      String
    ],
    tabLinkActive: Boolean,
    link: [
      Boolean,
      String
    ],
    href: [
      Boolean,
      String
    ],
    target: String,
    ...Mixins.colorProps,
    ...Mixins.linkRouterProps,
    ...Mixins.linkActionsProps
  },
  render() {
    const _h = this.$createElement;
    const self = this;
    return _h('li', {
      style: self.props.style,
      class: self.props.className,
      attrs: { id: self.props.id }
    }, [_h('a', __vueComponentTransformJSXProps({
        class: self.classes,
        ...self.attrs,
        on: { click: self.onClick.bind(self) }
      }), [this.$slots['default'] || [self.props.title || self.props.text]])]);
  },
  computed: {
    attrs() {
      const self = this;
      const {link, href, target, tabLink} = self.props;
      return Utils.extend({
        href: typeof link === 'boolean' && typeof href === 'boolean' ? '#' : link || href,
        target,
        'data-tab': Utils.isStringProp(tabLink) && tabLink
      }, Mixins.linkRouterAttrs(self), Mixins.linkActionsAttrs(self));
    },
    classes() {
      const self = this;
      const {noFastclick, noFastClick, tabLink, tabLinkActive} = self.props;
      return Utils.classNames({
        'item-link': true,
        'list-button': true,
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,
        'no-fastclick': noFastclick || noFastClick
      }, Mixins.colorClasses(self), Mixins.linkRouterClasses(self), Mixins.linkActionsClasses(self));
    },
    props() {
      return __vueComponentProps(this);
    }
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }
  }
};