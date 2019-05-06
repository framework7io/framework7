/* eslint import/no-unresolved: ["off"] */
/* eslint import/extensions: ["off"] */
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

import F7Badge from './badge';

export default {
  name: 'f7-list-item-content',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line

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
    disabled: Boolean,
    ...Mixins.colorProps,
  },
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
      badgeColor,
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
      slots.forEach((slot) => {
        if (Array.isArray(slot)) flattenSlots.push(...slot);
        else flattenSlots.push(slot);
      });
    }
    flattenSlots.forEach((child) => {
      if (typeof child === 'undefined') return;

      let slotName;
      // phenome-vue-next-line
      slotName = child.data ? child.data.slot : undefined;
      // phenome-react-next-line
      slotName = child.props ? child.props.slot : undefined;
      if (!slotName || (slotName === 'inner')) slotsInner.push(child);
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

    // Input
    if (radio || checkbox) {
      if (process.env.COMPILER === 'vue') {
        inputEl = (
          <input
            ref="inputEl"
            name={name}
            type={radio ? 'radio' : 'checkbox'}
            domProps={{ checked, readonly, disabled, required, value }}
            onChange={this.onChange}
          />
        );
      } else {
        inputEl = (
          <input
            ref="inputEl"
            value={value}
            name={name}
            checked={checked}
            defaultChecked={defaultChecked}
            readOnly={readonly}
            disabled={disabled}
            required={required}
            type={radio ? 'radio' : 'checkbox'}
            onChange={this.onChange}
          />
        );
      }

      inputIconEl = (
        <i className={`icon icon-${radio ? 'radio' : 'checkbox'}`} />
      );
    }
    // Media
    if (media || slotsMedia.length) {
      let mediaImgEl;
      if (media) {
        mediaImgEl = (
          <img src={media} />
        );
      }
      mediaEl = (
        <div className="item-media">
          {mediaImgEl}
          {slotsMedia}
        </div>
      );
    }
    // Inner Elements
    const isMedia = mediaItem || mediaList;

    if (header || slotsHeader.length) {
      headerEl = (
        <div className="item-header">
          {header}
          {slotsHeader}
        </div>
      );
    }
    if (footer || slotsFooter.length) {
      footerEl = (
        <div className="item-footer">
          {footer}
          {slotsFooter}
        </div>
      );
    }
    if (title || slotsTitle.length || (!isMedia && headerEl) || (!isMedia && footerEl)) {
      titleEl = (
        <div className="item-title">
          {!isMedia && headerEl}
          {title}
          {slotsTitle}
          {!isMedia && footerEl}
        </div>
      );
    }
    if (subtitle || slotsSubtitle.length) {
      subtitleEl = (
        <div className="item-subtitle">
          {subtitle}
          {slotsSubtitle}
        </div>
      );
    }
    if (text || slotsText.length) {
      textEl = (
        <div className="item-text">
          {text}
          {slotsText}
        </div>
      );
    }
    if (after || badge || slotsAfter.length) {
      if (after) {
        afterEl = <span>{after}</span>;
      }
      if (badge) {
        badgeEl = <F7Badge color={badgeColor}>{badge}</F7Badge>;
      }
      afterWrapEl = (
        <div className="item-after">
          {slotsAfterStart}
          {afterEl}
          {badgeEl}
          {slotsAfter}
          {slotsAfterEnd}
        </div>
      );
    }
    if (isMedia) {
      titleRowEl = (
        <div className="item-title-row">
          {slotsBeforeTitle}
          {titleEl}
          {slotsAfterTitle}
          {afterWrapEl}
        </div>
      );
      innerEl = (
        <div ref="innerEl" className="item-inner">
          {slotsInnerStart}
          {headerEl}
          {titleRowEl}
          {subtitleEl}
          {textEl}
          {slotsInner}
          {footerEl}
          {slotsInnerEnd}
        </div>
      );
    } else {
      innerEl = (
        <div ref="innerEl" className="item-inner">
          {slotsInnerStart}
          {slotsBeforeTitle}
          {titleEl}
          {slotsAfterTitle}
          {afterWrapEl}
          {slotsInner}
          {slotsInnerEnd}
        </div>
      );
    }

    // Finalize
    const ItemContentTag = checkbox || radio ? 'label' : 'div';

    const classes = Utils.classNames(
      className,
      'item-content',
      {
        'item-checkbox': checkbox,
        'item-radio': radio,
      },
      Mixins.colorClasses(props),
    );
    return (
      <ItemContentTag
        ref="el"
        id={id}
        style={style}
        className={classes}
      >
        {slotsContentStart}
        {inputEl}
        {inputIconEl}
        {mediaEl}
        {innerEl}
        {slotsContent}
        {slotsContentEnd}
      </ItemContentTag>
    );
  },
  componentDidCreate() {
    Utils.bindMethods(this, 'onClick onChange'.split(' '));
  },
  componentDidMount() {
    const self = this;
    const { el, inputEl } = self.refs;
    const { indeterminate } = self.props;
    if (indeterminate && inputEl) {
      inputEl.indeterminate = true;
    }
    el.addEventListener('click', self.onClick);
  },
  componentDidUpdate() {
    const self = this;
    const { inputEl } = self.refs;
    const { indeterminate } = self.props;
    if (inputEl) {
      inputEl.indeterminate = indeterminate;
    }
  },
  componentWillUnmount() {
    const self = this;
    const { el } = self.refs;
    el.removeEventListener('click', self.onClick);
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
    onChange(event) {
      this.dispatchEvent('change', event);
    },
  },
};
