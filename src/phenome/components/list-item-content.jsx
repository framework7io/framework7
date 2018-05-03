/* eslint import/no-unresolved: ["off"] */
/* eslint import/extensions: ["off"] */
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

import F7Badge from './badge';

const ListItemContentProps = Utils.extend(
  {
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
    itemInput: Boolean,
    itemInputWithInfo: Boolean,
    inlineLabel: Boolean,

    checkbox: Boolean,
    checked: Boolean,
    radio: Boolean,
    name: String,
    value: [String, Number, Array],
    readonly: Boolean,
    required: Boolean,
    disabled: Boolean,
  },
  Mixins.colorProps,
);

export default {
  name: 'f7-list-item-content',
  props: ListItemContentProps,
  state() {
    return {
      itemInputForced: false,
      inlineLabelForced: false,
      itemInputWithInfoForced: false,
    };
  },
  render() {
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

    const slots = self.slots.default;

    if (slots && slots.length > 0) {
      for (let i = 0; i < slots.length; i += 1) {
        const slotEl = slots[i];
        let slotName;
        // phenome-vue-next-line
        slotName = slotEl.data ? slotEl.data.slot : undefined;
        // phenome-react-next-line
        slotName = slotEl.props ? slotEl.props.slot : undefined;
        if (!slotName || (slotName === 'inner')) slotsInner.push(slotEl);
        if (slotName === 'content-start') slotsContentStart.push(slotEl);
        if (slotName === 'content') slotsContent.push(slotEl);
        if (slotName === 'content-end') slotsContentEnd.push(slotEl);
        if (slotName === 'after-start') slotsAfterStart.push(slotEl);
        if (slotName === 'after') slotsAfter.push(slotEl);
        if (slotName === 'after-end') slotsAfterEnd.push(slotEl);
        if (slotName === 'media') slotsMedia.push(slotEl);
        if (slotName === 'inner-start') slotsInnerStart.push(slotEl);
        if (slotName === 'inner-end') slotsInnerEnd.push(slotEl);
        if (slotName === 'before-title') slotsBeforeTitle.push(slotEl);
        if (slotName === 'title') slotsTitle.push(slotEl);
        if (slotName === 'after-title') slotsAfterTitle.push(slotEl);
        if (slotName === 'subtitle') slotsSubtitle.push(slotEl);
        if (slotName === 'text') slotsText.push(slotEl);
        if (slotName === 'header') slotsHeader.push(slotEl);
        if (slotName === 'footer') slotsFooter.push(slotEl);
      }
    }

    // Input
    const {
      radio, checkbox, value, name, checked, readonly, disabled, required,
    } = self.props;

    if (radio || checkbox) {
      inputEl = (
        <input
          value={value}
          name={name}
          checked={checked}
          readOnly={readonly}
          disabled={disabled}
          required={required}
          type={radio ? 'radio' : 'checkbox'}
          onChange={self.onChange.bind(self)}
        />
      );
      inputIconEl = (
        <i className={`icon icon-${radio ? 'radio' : 'checkbox'}`} />
      );
    }
    // Media
    const {
      media,
    } = self.props;

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
    const {
      header, footer, title, subtitle, text, after, badge, mediaList, mediaItem, badgeColor,
    } = self.props;

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
    if (title || slotsTitle.length) {
      titleEl = (
        <div className="item-title">
          {!mediaList && !mediaItem && headerEl}
          {title}
          {slotsTitle}
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
      subtitleEl = (
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
    if (mediaList || mediaItem) {
      titleRowEl = (
        <div className="item-title-row">
          {slotsBeforeTitle}
          {titleEl}
          {slotsAfterTitle}
          {afterWrapEl}
        </div>
      );
    }
    if (mediaList || mediaItem) {
      innerEl = (
        <div className="item-inner">
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
        <div className="item-inner">
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
    const { itemInput, inlineLabel, itemInputWithInfo } = self.props;
    const { itemInputForced, inlineLabelForced, itemInputWithInfoForced } = self.state;
    const classes = Utils.classNames(
      self.props.className,
      'item-content',
      {
        'item-checkbox': checkbox,
        'item-radio': radio,
        'item-input': itemInput || itemInputForced,
        'inline-label': inlineLabel || inlineLabelForced,
        'item-input-with-info': itemInputWithInfo || itemInputWithInfoForced,
      },
      Mixins.colorClasses(self),
    );
    return (
      <ItemContentTag
        id={self.props.id}
        style={self.props.style}
        className={classes}
        onClick={self.onClick.bind(self)}
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
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
    onChange(event) {
      this.dispatchEvent('change', event);
    },
  },
};
