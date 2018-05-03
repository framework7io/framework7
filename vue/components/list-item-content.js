import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Badge from './badge';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const ListItemContentProps = Utils.extend({
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
  after: [
    String,
    Number
  ],
  badge: [
    String,
    Number
  ],
  badgeColor: String,
  mediaList: Boolean,
  mediaItem: Boolean,
  itemInput: Boolean,
  itemInputWithInfo: Boolean,
  inlineLabel: Boolean,
  checkbox: Boolean,
  checked: Boolean,
  radio: Boolean,
  name: String,
  value: [
    String,
    Number,
    Array
  ],
  readonly: Boolean,
  required: Boolean,
  disabled: Boolean
}, Mixins.colorProps);
export default {
  name: 'f7-list-item-content',
  props: __vueComponentGetPropKeys(ListItemContentProps),
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
  render() {
    var _h = this.$createElement;
    const self = this;
    const slotsContentStart = [];
    const slotsContent = [];
    const slotsContentEnd = [];
    const slotsInnerStart = [];
    const slotsInner = [];
    const slotsInnerEnd = [];
    const slotsAfterStart = [];
    const slotsAfter = [];
    const slotsAfterEnd = [];
    const slotsMedia = [];
    const slotsBeforeTitle = [];
    const slotsTitle = [];
    const slotsAfterTitle = [];
    const slotsSubtitle = [];
    const slotsText = [];
    const slotsHeader = [];
    const slotsFooter = [];
    let titleEl;
    let afterWrapEl;
    let afterEl;
    let badgeEl;
    let innerEl;
    let titleRowEl;
    let subtitleEl;
    let textEl;
    let mediaEl;
    let inputEl;
    let inputIconEl;
    let headerEl;
    let footerEl;
    const slots = self.$slots.default;
    if (slots && slots.length > 0) {
      for (let i = 0; i < slots.length; i += 1) {
        const slotEl = slots[i];
        let slotName;
        slotName = slotEl.data ? slotEl.data.slot : undefined;
        if (!slotName || slotName === 'inner')
          slotsInner.push(slotEl);
        if (slotName === 'content-start')
          slotsContentStart.push(slotEl);
        if (slotName === 'content')
          slotsContent.push(slotEl);
        if (slotName === 'content-end')
          slotsContentEnd.push(slotEl);
        if (slotName === 'after-start')
          slotsAfterStart.push(slotEl);
        if (slotName === 'after')
          slotsAfter.push(slotEl);
        if (slotName === 'after-end')
          slotsAfterEnd.push(slotEl);
        if (slotName === 'media')
          slotsMedia.push(slotEl);
        if (slotName === 'inner-start')
          slotsInnerStart.push(slotEl);
        if (slotName === 'inner-end')
          slotsInnerEnd.push(slotEl);
        if (slotName === 'before-title')
          slotsBeforeTitle.push(slotEl);
        if (slotName === 'title')
          slotsTitle.push(slotEl);
        if (slotName === 'after-title')
          slotsAfterTitle.push(slotEl);
        if (slotName === 'subtitle')
          slotsSubtitle.push(slotEl);
        if (slotName === 'text')
          slotsText.push(slotEl);
        if (slotName === 'header')
          slotsHeader.push(slotEl);
        if (slotName === 'footer')
          slotsFooter.push(slotEl);
      }
    }
    const {radio, checkbox, value, name, checked, readonly, disabled, required} = self.props;
    if (radio || checkbox) {
      inputEl = _h('input', {
        on: { change: self.onChange.bind(self) },
        attrs: {
          value: value,
          name: name,
          checked: checked,
          readonly: readonly,
          disabled: disabled,
          required: required,
          type: radio ? 'radio' : 'checkbox'
        }
      });
      inputIconEl = _h('i', { class: `icon icon-${ radio ? 'radio' : 'checkbox' }` });
    }
    const {media} = self.props;
    if (media || slotsMedia.length) {
      let mediaImgEl;
      if (media) {
        mediaImgEl = _h('img', { attrs: { src: media } });
      }
      mediaEl = _h('div', { class: 'item-media' }, [
        mediaImgEl,
        slotsMedia
      ]);
    }
    const {header, footer, title, subtitle, text, after, badge, mediaList, mediaItem, badgeColor} = self.props;
    if (header || slotsHeader.length) {
      headerEl = _h('div', { class: 'item-header' }, [
        header,
        slotsHeader
      ]);
    }
    if (footer || slotsFooter.length) {
      footerEl = _h('div', { class: 'item-footer' }, [
        footer,
        slotsFooter
      ]);
    }
    if (title || slotsTitle.length) {
      titleEl = _h('div', { class: 'item-title' }, [
        !mediaList && !mediaItem && headerEl,
        title,
        slotsTitle
      ]);
    }
    if (subtitle || slotsSubtitle.length) {
      subtitleEl = _h('div', { class: 'item-subtitle' }, [
        subtitle,
        slotsSubtitle
      ]);
    }
    if (text || slotsText.length) {
      subtitleEl = _h('div', { class: 'item-text' }, [
        text,
        slotsText
      ]);
    }
    if (after || badge || slotsAfter.length) {
      if (after) {
        afterEl = _h('span', [after]);
      }
      if (badge) {
        badgeEl = _h(F7Badge, { attrs: { color: badgeColor } }, [badge]);
      }
      afterWrapEl = _h('div', { class: 'item-after' }, [
        slotsAfterStart,
        afterEl,
        badgeEl,
        slotsAfter,
        slotsAfterEnd
      ]);
    }
    if (mediaList || mediaItem) {
      titleRowEl = _h('div', { class: 'item-title-row' }, [
        slotsBeforeTitle,
        titleEl,
        slotsAfterTitle,
        afterWrapEl
      ]);
    }
    if (mediaList || mediaItem) {
      innerEl = _h('div', { class: 'item-inner' }, [
        slotsInnerStart,
        headerEl,
        titleRowEl,
        subtitleEl,
        textEl,
        slotsInner,
        footerEl,
        slotsInnerEnd
      ]);
    } else {
      innerEl = _h('div', { class: 'item-inner' }, [
        slotsInnerStart,
        slotsBeforeTitle,
        titleEl,
        slotsAfterTitle,
        afterWrapEl,
        slotsInner,
        slotsInnerEnd
      ]);
    }
    const ItemContentTag = checkbox || radio ? 'label' : 'div';
    const {itemInput, inlineLabel, itemInputWithInfo} = self.props;
    const {itemInputForced, inlineLabelForced, itemInputWithInfoForced} = self.state;
    const classes = Utils.classNames(self.props.className, 'item-content', {
      'item-checkbox': checkbox,
      'item-radio': radio,
      'item-input': itemInput || itemInputForced,
      'inline-label': inlineLabel || inlineLabelForced,
      'item-input-with-info': itemInputWithInfo || itemInputWithInfoForced
    }, Mixins.colorClasses(self));
    return _h(ItemContentTag, {
      style: self.props.style,
      class: classes,
      on: { click: self.onClick.bind(self) },
      attrs: { id: self.props.id }
    }, [
      slotsContentStart,
      inputEl,
      inputIconEl,
      mediaEl,
      innerEl,
      slotsContent,
      slotsContentEnd
    ]);
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
    onChange(event) {
      this.dispatchEvent('change', event);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }
  },
  computed: {
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  }
};