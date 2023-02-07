import React, { useRef, useEffect } from 'react';
import { classNames } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';

import Badge from './badge.js';

const ListItemContent = (props) => {
  const {
    indeterminate,
    radio,
    checkbox,
    value,
    name,
    readonly,
    disabled,
    checked,
    defaultChecked,
    required,
    media,
    header,
    footer,
    title,
    subtitle,
    text,
    after,
    badge,
    badgeColor,
    checkboxIcon,
    radioIcon,
    swipeout,
    sortable,
    accordionItem,
    onChange,
    onClick,
    isMediaComputed,
    isSortableComputed,
    isSortableOppositeComputed,
    slots,
  } = props;
  const inputElRef = useRef(null);

  useEffect(() => {
    if (inputElRef.current) {
      inputElRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

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

  // Input
  if (radio || checkbox) {
    inputEl = (
      <input
        ref={inputElRef}
        value={value}
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        readOnly={readonly}
        disabled={disabled}
        required={required}
        type={radio ? 'radio' : 'checkbox'}
        onChange={onChange}
      />
    );
    inputIconEl = <i className={`icon icon-${radio ? 'radio' : 'checkbox'}`} />;
  }
  // Media
  if (media || slots.media) {
    let mediaImgEl;
    if (media) {
      mediaImgEl = <img src={media} />;
    }
    mediaEl = (
      <div className="item-media">
        {mediaImgEl}
        {slots.media}
      </div>
    );
  }
  // Inner Elements
  if (header || slots.header) {
    headerEl = (
      <div className="item-header">
        {header}
        {slots.header}
      </div>
    );
  }
  if (footer || slots.footer) {
    footerEl = (
      <div className="item-footer">
        {footer}
        {slots.footer}
      </div>
    );
  }
  if (title || slots.title || (!isMediaComputed && headerEl) || (!isMediaComputed && footerEl)) {
    titleEl = (
      <div className="item-title">
        {!isMediaComputed && headerEl}
        {title}
        {slots.title}
        {!isMediaComputed && footerEl}
      </div>
    );
  }
  if (subtitle || slots.subtitle) {
    subtitleEl = (
      <div className="item-subtitle">
        {subtitle}
        {slots.subtitle}
      </div>
    );
  }
  if (text || slots.text) {
    textEl = (
      <div className="item-text">
        {text}
        {slots.text}
      </div>
    );
  }
  if (after || badge || slots.after) {
    if (after) {
      afterEl = <span>{after}</span>;
    }
    if (badge) {
      badgeEl = <Badge color={badgeColor}>{badge}</Badge>;
    }
    afterWrapEl = (
      <div className="item-after">
        {slots['after-start']}
        {afterEl}
        {badgeEl}
        {slots.after}
        {slots['after-end']}
      </div>
    );
  }
  if (isMediaComputed) {
    titleRowEl = (
      <div className="item-title-row">
        {slots['before-title']}
        {titleEl}
        {slots['after-title']}
        {afterWrapEl}
      </div>
    );
    innerEl = (
      <div className="item-inner">
        {slots['inner-start']}
        {headerEl}
        {titleRowEl}
        {subtitleEl}
        {textEl}
        {swipeout || accordionItem ? null : slots.default}
        {slots.inner}
        {footerEl}
        {slots['inner-end']}
      </div>
    );
  } else {
    innerEl = (
      <div className="item-inner">
        {slots['inner-start']}
        {slots['before-title']}
        {titleEl}
        {slots['after-title']}
        {afterWrapEl}
        {swipeout || accordionItem ? null : slots.default}
        {slots.inner}
        {slots['inner-end']}
      </div>
    );
  }

  const ItemContentTag = checkbox || radio ? 'label' : 'div';

  const classes = classNames(
    'item-content',
    {
      'item-checkbox': checkbox,
      'item-radio': radio,
      'item-checkbox-icon-start': checkbox && checkboxIcon === 'start',
      'item-checkbox-icon-end': checkbox && checkboxIcon === 'end',
      'item-radio-icon-start': radio && radioIcon === 'start',
      'item-radio-icon-end': radio && radioIcon === 'end',
    },
    colorClasses(props),
  );
  return (
    <ItemContentTag className={classes} onClick={onClick}>
      {isSortableComputed && sortable !== false && isSortableOppositeComputed && (
        <div className="sortable-handler" />
      )}
      {slots['content-start']}
      {inputEl}
      {inputIconEl}
      {mediaEl}
      {innerEl}
      {slots.content}
      {slots['content-end']}
    </ItemContentTag>
  );
};

ListItemContent.displayName = 'f7-list-item-content';

export default ListItemContent;
