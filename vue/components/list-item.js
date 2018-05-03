import Utils from '../utils/utils';
import F7ListItemContent from './list-item-content';
import Mixins from '../utils/mixins';
import __vueComponentTransformJSXProps from '../runtime-helpers/vue-component-transform-jsx-props.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const ListItemProps = Utils.extend({
  title: [
    String,
    Number
  ],
  text: [
    String,
    Number
  ],
  media: String,
  subtitle: [
    String,
    Number
  ],
  header: [
    String,
    Number
  ],
  footer: [
    String,
    Number
  ],
  link: [
    Boolean,
    String
  ],
  target: String,
  noFastclick: Boolean,
  noFastClick: Boolean,
  after: [
    String,
    Number
  ],
  badge: [
    String,
    Number
  ],
  badgeColor: String,
  mediaItem: Boolean,
  mediaList: Boolean,
  divider: Boolean,
  groupTitle: Boolean,
  swipeout: Boolean,
  sortable: Boolean,
  accordionItem: Boolean,
  accordionItemOpened: Boolean,
  smartSelect: Boolean,
  smartSelectParams: Object,
  checkbox: Boolean,
  radio: Boolean,
  checked: Boolean,
  name: String,
  value: [
    String,
    Number,
    Array
  ],
  readonly: Boolean,
  required: Boolean,
  disabled: Boolean,
  itemInput: Boolean,
  itemInputWithInfo: Boolean,
  inlineLabel: Boolean
}, Mixins.colorProps, Mixins.linkRouterProps, Mixins.linkActionsProps);
export default {
  name: 'f7-list-item',
  props: __vueComponentGetPropKeys(ListItemProps),
  render() {
    var _h = this.$createElement;
    const self = this;
    let linkEl;
    let itemContentEl;
    const {title, text, media, subtitle, header, footer, link, href, target, noFastclick, noFastClick, after, badge, badgeColor, mediaItem, mediaList, divider, groupTitle, swipeout, accordionItem, accordionItemOpened, smartSelect, checkbox, radio, checked, name, value, readonly, required, disabled, itemInput, itemInputWithInfo, inlineLabel} = self.props;
    if (!self.simpleListComputed) {
      const needsEvents = !(link || href || accordionItem || smartSelect);
      itemContentEl = _h(F7ListItemContent, {
        on: needsEvents ? {
          click: self.onClickBound,
          change: self.onChangeBound
        } : undefined,
        attrs: {
          title: title,
          text: text,
          media: media,
          subtitle: subtitle,
          after: after,
          header: header,
          footer: footer,
          badge: badge,
          badgeColor: badgeColor,
          mediaList: self.mediaListComputed,
          accordionItem: accordionItem,
          checkbox: checkbox,
          checked: checked,
          radio: radio,
          name: name,
          value: value,
          readonly: readonly,
          required: required,
          disabled: disabled,
          itemInput: itemInput || self.itemInputForced,
          itemInputWithInfo: itemInputWithInfo || self.itemInputWithInfoForced,
          inlineLabel: inlineLabel || self.inlineLabelForced
        }
      }, [
        this.$slots['content-start'],
        this.$slots['content'],
        this.$slots['content-end'],
        this.$slots['media'],
        this.$slots['inner-start'],
        this.$slots['inner'],
        this.$slots['inner-end'],
        this.$slots['after-start'],
        this.$slots['after'],
        this.$slots['after-end'],
        this.$slots['header'],
        this.$slots['footer'],
        this.$slots['before-title'],
        this.$slots['title'],
        this.$slots['after-title'],
        this.$slots['subtitle'],
        this.$slots['text'],
        swipeout || accordionItem ? null : self.$slots.default
      ]);
      if (link || href || accordionItem || smartSelect) {
        const linkAttrs = Utils.extend({
          href: link === true || accordionItem || smartSelect ? '#' : link || href,
          target
        }, Mixins.linkRouterAttrs(self), Mixins.linkActionsAttrs(self));
        const linkClasses = Utils.classNames({
          'item-link': true,
          'no-fastclick': noFastclick || noFastClick,
          'smart-select': smartSelect
        }, Mixins.linkRouterClasses(self), Mixins.linkActionsClasses(self));
        linkEl = _h('a', __vueComponentTransformJSXProps({
          class: linkClasses,
          ...linkAttrs,
          on: { click: self.onClick.bind(self) }
        }), [itemContentEl]);
      }
    }
    const liClasses = Utils.classNames(self.props.className, {
      'item-divider': divider,
      'list-group-title': groupTitle,
      'media-item': mediaItem || mediaList,
      swipeout,
      'accordion-item': accordionItem,
      'accordion-item-opened': accordionItemOpened
    }, Mixins.colorClasses(self));
    if (divider || groupTitle) {
      return _h('li', {
        ref: 'el',
        style: self.props.style,
        class: liClasses,
        attrs: { id: self.props.id }
      }, [_h('span', [this.$slots['default'] || [title]])]);
    } else if (self.simpleListComputed) {
      return _h('li', {
        ref: 'el',
        style: self.props.style,
        class: liClasses,
        attrs: { id: self.props.id }
      }, [
        title,
        this.$slots['default']
      ]);
    }
    const linkItemEl = link || href || smartSelect || accordionItem ? linkEl : itemContentEl;
    return _h('li', {
      ref: 'el',
      style: self.props.style,
      class: liClasses,
      attrs: { id: self.props.id }
    }, [
      this.$slots['root-start'],
      swipeout ? _h('div', { class: 'swipeout-content' }, [linkItemEl]) : linkItemEl,
      self.sortableComputed && _h('div', { class: 'sortable-handler' }),
      (swipeout || accordionItem) && self.$slots.default,
      this.$slots['root'],
      this.$slots['root-end']
    ]);
  },
  data() {
    const props = __vueComponentProps(this, __vueComponentPropsKeys);
    const state = (() => {
      return {
        itemInputForced: false,
        inlineLabelForced: false,
        itemInputWithInfoForced: false
      };
    })();
    return { state };
  },
  computed: {
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  },
  created() {
    const self = this;
    self.onClickBound = self.onClick.bind(self);
    self.onChangeBound = self.onChange.bind(self);
    self.onSwipeoutOpenBound = self.onSwipeoutOpen.bind(self);
    self.onSwipeoutOpenedBound = self.onSwipeoutOpened.bind(self);
    self.onSwipeoutCloseBound = self.onSwipeoutClose.bind(self);
    self.onSwipeoutClosedBound = self.onSwipeoutClosed.bind(self);
    self.onSwipeoutDeleteBound = self.onSwipeoutDelete.bind(self);
    self.onSwipeoutDeletedBound = self.onSwipeoutDeleted.bind(self);
    self.onSwipeoutBound = self.onSwipeout.bind(self);
    self.onAccOpenBound = self.onAccOpen.bind(self);
    self.onAccOpenedBound = self.onAccOpened.bind(self);
    self.onAccCloseBound = self.onAccClose.bind(self);
    self.onAccClosedBound = self.onAccClosed.bind(self);
  },
  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el)
      return;
    el.addEventListener('swipeout:open', self.onSwipeoutOpenBound);
    el.addEventListener('swipeout:opened', self.onSwipeoutOpenedBound);
    el.addEventListener('swipeout:close', self.onSwipeoutCloseBound);
    el.addEventListener('swipeout:closed', self.onSwipeoutClosedBound);
    el.addEventListener('swipeout:delete', self.onSwipeoutDeleteBound);
    el.addEventListener('swipeout:deleted', self.onSwipeoutDeletedBound);
    el.addEventListener('swipeout', self.onSwipeoutBound);
    el.addEventListener('accordion:open', self.onAccOpenBound);
    el.addEventListener('accordion:opened', self.onAccOpenedBound);
    el.addEventListener('accordion:close', self.onAccCloseBound);
    el.addEventListener('accordion:closed', self.onAccClosedBound);
    if (!self.props.smartSelect)
      return;
    self.$f7ready(f7 => {
      const smartSelectParams = Utils.extend({ el: el.querySelector('a.smart-select') }, self.props.smartSelectParams || {});
      self.f7SmartSelect = f7.smartSelect.create(smartSelectParams);
    });
  },
  beforeDestroy() {
    const self = this;
    const el = self.$refs.el;
    if (el) {
      el.removeEventListener('swipeout:open', self.onSwipeoutOpenBound);
      el.removeEventListener('swipeout:opened', self.onSwipeoutOpenedBound);
      el.removeEventListener('swipeout:close', self.onSwipeoutCloseBound);
      el.removeEventListener('swipeout:closed', self.onSwipeoutClosedBound);
      el.removeEventListener('swipeout:delete', self.onSwipeoutDeleteBound);
      el.removeEventListener('swipeout:deleted', self.onSwipeoutDeletedBound);
      el.removeEventListener('swipeout', self.onSwipeoutBound);
      el.removeEventListener('accordion:open', self.onAccOpenBound);
      el.removeEventListener('accordion:opened', self.onAccOpenedBound);
      el.removeEventListener('accordion:close', self.onAccCloseBound);
      el.removeEventListener('accordion:closed', self.onAccClosedBound);
    }
    if (self.props.smartSelect && self.f7SmartSelect) {
      self.f7SmartSelect.destroy();
    }
  },
  methods: {
    onClick(event) {
      const self = this;
      if (self.props.smartSelect && self.f7SmartSelect) {
        self.f7SmartSelect.open();
      }
      if (event.target.tagName.toLowerCase() !== 'input') {
        self.dispatchEvent('click', event);
      }
    },
    onSwipeoutDeleted(event) {
      this.dispatchEvent('swipeout:deleted swipeoutDeleted', event);
    },
    onSwipeoutDelete(event) {
      this.dispatchEvent('swipeout:delete swipeoutDelete', event);
    },
    onSwipeoutClose(event) {
      this.dispatchEvent('swipeout:close swipeoutClose', event);
    },
    onSwipeoutClosed(event) {
      this.dispatchEvent('swipeout:closed swipeoutClosed', event);
    },
    onSwipeoutOpen(event) {
      this.dispatchEvent('swipeout:open swipeoutOpen', event);
    },
    onSwipeoutOpened(event) {
      this.dispatchEvent('swipeout:opened swipeoutOpened', event);
    },
    onSwipeout(event) {
      this.dispatchEvent('swipeout', event);
    },
    onAccClose(event) {
      this.dispatchEvent('accordion:close accordionClose', event);
    },
    onAccClosed(event) {
      this.dispatchEvent('accordion:closed accordionClosed', event);
    },
    onAccOpen(event) {
      this.dispatchEvent('accordion:open accordionOpen', event);
    },
    onAccOpened(event) {
      this.dispatchEvent('accordion:opened accordionOpened', event);
    },
    onChange(event) {
      this.dispatchEvent('change', event);
    },
    onInput(event) {
      this.dispatchEvent('input', event);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }
  }
};