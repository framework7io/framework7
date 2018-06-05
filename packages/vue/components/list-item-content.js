import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Badge from './badge';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-list-item-content',
  props: {
    id: [
      String,
      Number
    ],
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
    disabled: Boolean,
    ...Mixins.colorProps
  },
  data() {
    const props = __vueComponentProps(this);
    const state = (() => {
      return {
        hasInput: false,
        hasInlineLabel: false,
        hasInputInfo: false
      };
    })();
    return { state };
  },
  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {id, className, style, radio, checkbox, value, name, checked, readonly, disabled, required, media, header, footer, title, subtitle, text, after, badge, mediaList, mediaItem, badgeColor, itemInput, inlineLabel, itemInputWithInfo} = props;
    const hasInput = itemInput || self.state.hasInput;
    const hasInlineLabel = inlineLabel || self.state.hasInlineLabel;
    const hasInputInfo = itemInputWithInfo || self.state.hasInputInfo;
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
    const flattenSlots = [];
    if (slots && slots.length) {
      slots.forEach(slot => {
        if (Array.isArray(slot))
          flattenSlots.push(...slot);
        else
          flattenSlots.push(slot);
      });
    }
    if (flattenSlots.length) {
      for (let i = 0; i < flattenSlots.length; i += 1) {
        const slotEl = flattenSlots[i];
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
    if (radio || checkbox) {
      {
        inputEl = _h('input', {
          domProps: {
            checked,
            readonly,
            disabled,
            required,
            value
          },
          on: { change: self.onChange.bind(self) },
          attrs: {
            name: name,
            type: radio ? 'radio' : 'checkbox'
          }
        });
      }
      inputIconEl = _h('i', { class: `icon icon-${ radio ? 'radio' : 'checkbox' }` });
    }
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
    const isMedia = mediaItem || mediaList;
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
    if (title || slotsTitle.length || !isMedia && headerEl || !isMedia && footerEl) {
      titleEl = _h('div', { class: 'item-title' }, [
        !isMedia && headerEl,
        title,
        slotsTitle,
        !isMedia && footerEl
      ]);
    }
    if (subtitle || slotsSubtitle.length) {
      subtitleEl = _h('div', { class: 'item-subtitle' }, [
        subtitle,
        slotsSubtitle
      ]);
    }
    if (text || slotsText.length) {
      textEl = _h('div', { class: 'item-text' }, [
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
    if (isMedia) {
      titleRowEl = _h('div', { class: 'item-title-row' }, [
        slotsBeforeTitle,
        titleEl,
        slotsAfterTitle,
        afterWrapEl
      ]);
      innerEl = _h('div', {
        ref: 'innerEl',
        class: 'item-inner'
      }, [
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
      innerEl = _h('div', {
        ref: 'innerEl',
        class: 'item-inner'
      }, [
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
    const classes = Utils.classNames(className, 'item-content', {
      'item-checkbox': checkbox,
      'item-radio': radio,
      'item-input': hasInput,
      'inline-label': hasInlineLabel,
      'item-input-with-info': hasInputInfo
    }, Mixins.colorClasses(props));
    return _h(ItemContentTag, {
      ref: 'el',
      style: style,
      class: classes,
      on: { click: self.onClick.bind(self) },
      attrs: { id: id }
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
  mounted() {
    const self = this;
    const innerEl = self.$refs.innerEl;
    if (!innerEl)
      return;
    const $innerEl = self.$$(innerEl);
    const $labelEl = $innerEl.children('.item-title.item-label');
    const $inputEl = $innerEl.children('.item-input-wrap');
    const hasInlineLabel = $labelEl.hasClass('item-label-inline');
    const hasInput = $inputEl.length > 0;
    const hasInputInfo = $inputEl.children('.item-input-info').length > 0;
    if (hasInlineLabel !== self.state.hasInlineLabel) {
      self.setState({ hasInlineLabel });
    }
    if (hasInput !== self.state.hasInput) {
      self.setState({ hasInput });
    }
    if (hasInputInfo !== self.state.hasInputInfo) {
      self.setState({ hasInputInfo });
    }
  },
  updated() {
    const self = this;
    const innerEl = self.$refs.innerEl;
    if (!innerEl)
      return;
    const $innerEl = self.$$(innerEl);
    const $labelEl = $innerEl.children('.item-title.item-label');
    const $inputEl = $innerEl.children('.item-input-wrap');
    const hasInlineLabel = $labelEl.hasClass('item-label-inline');
    const hasInput = $inputEl.length > 0;
    const hasInputInfo = $inputEl.children('.item-input-info').length > 0;
    if (hasInlineLabel !== self.state.hasInlineLabel) {
      self.setState({ hasInlineLabel });
    }
    if (hasInput !== self.state.hasInput) {
      self.setState({ hasInput });
    }
    if (hasInputInfo !== self.state.hasInputInfo) {
      self.setState({ hasInputInfo });
    }
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