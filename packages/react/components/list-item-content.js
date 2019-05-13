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
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, 'onClick onChange'.split(' '));
    })();
  }

  onClick(event) {
    this.dispatchEvent('click', event);
  }

  onChange(event) {
    this.dispatchEvent('change', event);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      className,
      style,
      radio,
      checkbox,
      value,
      name,
      checked,
      defaultChecked,
      readonly,
      disabled,
      required,
      media,
      header,
      footer,
      title,
      subtitle,
      text,
      after,
      badge,
      mediaList,
      mediaItem,
      badgeColor
    } = props;
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
    const flattenSlots = [];

    if (slots && slots.length) {
      slots.forEach(slot => {
        if (Array.isArray(slot)) flattenSlots.push(...slot);else flattenSlots.push(slot);
      });
    }

    flattenSlots.forEach(child => {
      if (typeof child === 'undefined') return;
      let slotName;
      slotName = child.props ? child.props.slot : undefined;
      if (!slotName || slotName === 'inner') slotsInner.push(child);
      if (slotName === 'content-start') slotsContentStart.push(child);
      if (slotName === 'content') slotsContent.push(child);
      if (slotName === 'content-end') slotsContentEnd.push(child);
      if (slotName === 'after-start') slotsAfterStart.push(child);
      if (slotName === 'after') slotsAfter.push(child);
      if (slotName === 'after-end') slotsAfterEnd.push(child);
      if (slotName === 'media') slotsMedia.push(child);
      if (slotName === 'inner-start') slotsInnerStart.push(child);
      if (slotName === 'inner-end') slotsInnerEnd.push(child);
      if (slotName === 'before-title') slotsBeforeTitle.push(child);
      if (slotName === 'title') slotsTitle.push(child);
      if (slotName === 'after-title') slotsAfterTitle.push(child);
      if (slotName === 'subtitle') slotsSubtitle.push(child);
      if (slotName === 'text') slotsText.push(child);
      if (slotName === 'header') slotsHeader.push(child);
      if (slotName === 'footer') slotsFooter.push(child);
    });

    if (radio || checkbox) {
      {
        inputEl = React.createElement('input', {
          ref: __reactNode => {
            this.__reactRefs['inputEl'] = __reactNode;
          },
          value: value,
          name: name,
          checked: checked,
          defaultChecked: defaultChecked,
          readOnly: readonly,
          disabled: disabled,
          required: required,
          type: radio ? 'radio' : 'checkbox',
          onChange: this.onChange
        });
      }
      inputIconEl = React.createElement('i', {
        className: `icon icon-${radio ? 'radio' : 'checkbox'}`
      });
    }

    if (media || slotsMedia.length) {
      let mediaImgEl;

      if (media) {
        mediaImgEl = React.createElement('img', {
          src: media
        });
      }

      mediaEl = React.createElement('div', {
        className: 'item-media'
      }, mediaImgEl, slotsMedia);
    }

    const isMedia = mediaItem || mediaList;

    if (header || slotsHeader.length) {
      headerEl = React.createElement('div', {
        className: 'item-header'
      }, header, slotsHeader);
    }

    if (footer || slotsFooter.length) {
      footerEl = React.createElement('div', {
        className: 'item-footer'
      }, footer, slotsFooter);
    }

    if (title || slotsTitle.length || !isMedia && headerEl || !isMedia && footerEl) {
      titleEl = React.createElement('div', {
        className: 'item-title'
      }, !isMedia && headerEl, title, slotsTitle, !isMedia && footerEl);
    }

    if (subtitle || slotsSubtitle.length) {
      subtitleEl = React.createElement('div', {
        className: 'item-subtitle'
      }, subtitle, slotsSubtitle);
    }

    if (text || slotsText.length) {
      textEl = React.createElement('div', {
        className: 'item-text'
      }, text, slotsText);
    }

    if (after || badge || slotsAfter.length) {
      if (after) {
        afterEl = React.createElement('span', null, after);
      }

      if (badge) {
        badgeEl = React.createElement(F7Badge, {
          color: badgeColor
        }, badge);
      }

      afterWrapEl = React.createElement('div', {
        className: 'item-after'
      }, slotsAfterStart, afterEl, badgeEl, slotsAfter, slotsAfterEnd);
    }

    if (isMedia) {
      titleRowEl = React.createElement('div', {
        className: 'item-title-row'
      }, slotsBeforeTitle, titleEl, slotsAfterTitle, afterWrapEl);
      innerEl = React.createElement('div', {
        ref: __reactNode => {
          this.__reactRefs['innerEl'] = __reactNode;
        },
        className: 'item-inner'
      }, slotsInnerStart, headerEl, titleRowEl, subtitleEl, textEl, slotsInner, footerEl, slotsInnerEnd);
    } else {
      innerEl = React.createElement('div', {
        ref: __reactNode => {
          this.__reactRefs['innerEl'] = __reactNode;
        },
        className: 'item-inner'
      }, slotsInnerStart, slotsBeforeTitle, titleEl, slotsAfterTitle, afterWrapEl, slotsInner, slotsInnerEnd);
    }

    const ItemContentTag = checkbox || radio ? 'label' : 'div';
    const classes = Utils.classNames(className, 'item-content', {
      'item-checkbox': checkbox,
      'item-radio': radio
    }, Mixins.colorClasses(props));
    return React.createElement(ItemContentTag, {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes
    }, slotsContentStart, inputEl, inputIconEl, mediaEl, innerEl, slotsContent, slotsContentEnd);
  }

  componentWillUnmount() {
    const self = this;
    const {
      el
    } = self.refs;
    el.removeEventListener('click', self.onClick);
  }

  componentDidUpdate() {
    const self = this;
    const {
      inputEl
    } = self.refs;
    const {
      indeterminate
    } = self.props;

    if (inputEl) {
      inputEl.indeterminate = indeterminate;
    }
  }

  componentDidMount() {
    const self = this;
    const {
      el,
      inputEl
    } = self.refs;
    const {
      indeterminate
    } = self.props;

    if (indeterminate && inputEl) {
      inputEl.indeterminate = true;
    }

    el.addEventListener('click', self.onClick);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

__reactComponentSetProps(F7ListItemContent, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  title: [String, Number],
  text: [String, Number],
  media: String,
  subtitle: [String, Number],
  header: [String, Number],
  footer: [String, Number],
  after: [String, Number],
  badge: [String, Number],
  badgeColor: String,
  mediaList: Boolean,
  mediaItem: Boolean,
  checkbox: Boolean,
  checked: Boolean,
  defaultChecked: Boolean,
  indeterminate: Boolean,
  radio: Boolean,
  name: String,
  value: [String, Number, Array],
  readonly: Boolean,
  required: Boolean,
  disabled: Boolean
}, Mixins.colorProps));

F7ListItemContent.displayName = 'f7-list-item-content';
export default F7ListItemContent;