import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const FabProps = Utils.extend({
  morphTo: String,
  href: [
    Boolean,
    String
  ],
  position: {
    type: String,
    default: 'right-bottom'
  }
}, Mixins.colorProps);
export default {
  name: 'f7-fab',
  props: __vueComponentGetPropKeys(FabProps),
  render() {
    var _h = this.$createElement;
    const self = this;
    const {morphTo} = self.props;
    let href = self.props.href;
    if (href === true)
      href = '#';
    if (href === false)
      href = undefined;
    const linkChildren = [];
    const rootChildren = [];
    const {
      link: linkSlots,
      default: defaultSlots,
      root: rootSlots
    } = self.$slots;
    if (defaultSlots) {
      for (let i = 0; i < defaultSlots.length; i += 1) {
        const child = defaultSlots[i];
        let isRoot;
        {
          if (child.tag && child.tag.indexOf('fab-buttons') >= 0)
            isRoot = true;
        }
        if (isRoot)
          rootChildren.push(child);
        else
          linkChildren.push(child);
      }
    }
    let linkEl;
    if (linkChildren.length || linkSlots.length) {
      linkEl = _h('a', {
        key: 'f7-fab-link',
        on: { click: self.onClick.bind(self) },
        attrs: { href: href }
      }, [
        linkChildren,
        linkSlots
      ]);
    }
    return _h('div', {
      style: self.props.style,
      class: self.classes,
      attrs: {
        id: self.props.id,
        'data-morph-to': morphTo
      }
    }, [
      linkEl,
      rootChildren,
      rootSlots
    ]);
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(self.props.className, {
        fab: true,
        'fab-morph': self.morphTo,
        [`fab-${ self.props.position }`]: true
      }, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  },
  methods: {
    onClick(event) {
      const self = this;
      self.dispatchEvent('click', event);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }
  }
};