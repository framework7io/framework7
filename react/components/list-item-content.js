import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Badge from './badge';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7ListItemContent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = (() => {
      return {
        hasInput: false,
        hasInlineLabel: false,
        hasInputInfo: false
      };
    })();
  }
  render() {
    const self = this;
    const {radio, checkbox, value, name, checked, readonly, disabled, required, media, header, footer, title, subtitle, text, after, badge, mediaList, mediaItem, badgeColor, itemInput, inlineLabel, itemInputWithInfo} = self.props;
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
    const slots = self.slots.default;
    if (slots && slots.length > 0) {
      for (let i = 0; i < slots.length; i += 1) {
        const slotEl = slots[i];
        let slotName;
        slotName = slotEl.props ? slotEl.props.slot : undefined;
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
      inputEl = React.createElement('input', {
        value: value,
        name: name,
        checked: checked,
        readOnly: readonly,
        disabled: disabled,
        required: required,
        type: radio ? 'radio' : 'checkbox',
        onChange: self.onChange.bind(self)
      });
      inputIconEl = React.createElement('i', { className: `icon icon-${ radio ? 'radio' : 'checkbox' }` });
    }
    if (media || slotsMedia.length) {
      let mediaImgEl;
      if (media) {
        mediaImgEl = React.createElement('img', { src: media });
      }
      mediaEl = React.createElement('div', { className: 'item-media' }, mediaImgEl, slotsMedia);
    }
    const isMedia = mediaItem || mediaList;
    if (header || slotsHeader.length) {
      headerEl = React.createElement('div', { className: 'item-header' }, header, slotsHeader);
    }
    if (footer || slotsFooter.length) {
      footerEl = React.createElement('div', { className: 'item-footer' }, footer, slotsFooter);
    }
    if (title || slotsTitle.length) {
      titleEl = React.createElement('div', { className: 'item-title' }, !isMedia && headerEl, title, slotsTitle);
    }
    if (subtitle || slotsSubtitle.length) {
      subtitleEl = React.createElement('div', { className: 'item-subtitle' }, subtitle, slotsSubtitle);
    }
    if (text || slotsText.length) {
      subtitleEl = React.createElement('div', { className: 'item-text' }, text, slotsText);
    }
    if (after || badge || slotsAfter.length) {
      if (after) {
        afterEl = React.createElement('span', null, after);
      }
      if (badge) {
        badgeEl = React.createElement(F7Badge, { color: badgeColor }, badge);
      }
      afterWrapEl = React.createElement('div', { className: 'item-after' }, slotsAfterStart, afterEl, badgeEl, slotsAfter, slotsAfterEnd);
    }
    if (isMedia) {
      titleRowEl = React.createElement('div', { className: 'item-title-row' }, slotsBeforeTitle, titleEl, slotsAfterTitle, afterWrapEl);
      innerEl = React.createElement('div', {
        ref: 'innerEl',
        className: 'item-inner'
      }, slotsInnerStart, headerEl, titleRowEl, subtitleEl, textEl, slotsInner, footerEl, slotsInnerEnd);
    } else {
      innerEl = React.createElement('div', {
        ref: 'innerEl',
        className: 'item-inner'
      }, slotsInnerStart, slotsBeforeTitle, titleEl, slotsAfterTitle, afterWrapEl, slotsInner, slotsInnerEnd);
    }
    const ItemContentTag = checkbox || radio ? 'label' : 'div';
    const classes = Utils.classNames(self.props.className, 'item-content', {
      'item-checkbox': checkbox,
      'item-radio': radio,
      'item-input': hasInput,
      'inline-label': hasInlineLabel,
      'item-input-with-info': hasInputInfo
    }, Mixins.colorClasses(self));
    return React.createElement(ItemContentTag, {
      ref: 'el',
      id: self.props.id,
      style: self.props.style,
      className: classes,
      onClick: self.onClick.bind(self)
    }, slotsContentStart, inputEl, inputIconEl, mediaEl, innerEl, slotsContent, slotsContentEnd);
  }
  componentDidMount() {
    const self = this;
    const innerEl = self.refs.innerEl;
    if (!innerEl)
      return;
    const $innerEl = self.$$(innerEl);
    const $labelEl = $innerEl.children('.item-title.item-label');
    const $inputEl = $innerEl.children('.item-input-wrap');
    self.setState({
      hasInlineLabel: $labelEl.hasClass('item-label-inline'),
      hasInput: $inputEl.length > 0,
      hasInputInfo: $inputEl.children('.item-input-info').length > 0
    });
  }
  componentDidUpdate() {
    const self = this;
    const innerEl = self.refs.innerEl;
    if (!innerEl)
      return;
    const $innerEl = self.$$(innerEl);
    const $labelEl = $innerEl.children('.item-title.item-label');
    const $inputEl = $innerEl.children('.item-input-wrap');
    self.setState({
      hasInlineLabel: $labelEl.hasClass('item-label-inline'),
      hasInput: $inputEl.length > 0,
      hasInputInfo: $inputEl.children('.item-input-info').length > 0
    });
  }
  onClick(event) {
    this.dispatchEvent('click', event);
  }
  onChange(event) {
    this.dispatchEvent('change', event);
  }
  get slots() {
    return __reactComponentSlots(this);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
}
__reactComponentSetProps(F7ListItemContent, {
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
});
export default F7ListItemContent;