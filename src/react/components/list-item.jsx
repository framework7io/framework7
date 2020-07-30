import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react';
import { classNames, getDataAttrs, getSlots, emit, isStringProp, extend } from '../shared/utils';
import {
  colorClasses,
  actionsAttrs,
  actionsClasses,
  routerAttrs,
  routerClasses,
} from '../shared/mixins';
import { useRouteProps } from '../shared/use-route-props';
import { useTooltip } from '../shared/use-tooltip';
import { watchProp } from '../shared/watch-prop';
import { f7ready, f7 } from '../shared/f7';

import Badge from './badge';

/* dts-imports
import { SmartSelect } from 'framework7/types';
*/

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  title? : string | number
  text? : string | number
  media? : string
  subtitle? : string | number
  header? : string | number
  footer? : string | number
  tooltip? : string
  tooltipTrigger? : string
  link? : boolean | string
  target? : string
  tabLink? : boolean | string
  tabLinkActive? : boolean
  after? : string | number
  badge? : string | number
  badgeColor? : string
  mediaItem? : boolean
  mediaList? : boolean
  divider? : boolean
  groupTitle? : boolean
  swipeout? : boolean
  swipeoutOpened? : boolean
  sortable? : boolean
  sortableOpposite? : boolean
  accordionItem? : boolean
  accordionItemOpened? : boolean
  smartSelect? : boolean
  smartSelectParams? : SmartSelect.Parameters
  noChevron? : boolean
  chevronCenter? : boolean
  checkbox? : boolean
  radio? : boolean
  radioIcon? : string
  checked? : boolean
  defaultChecked? : boolean
  indeterminate? : boolean
  name? : string
  value? : string | number | Array<any>
  readonly? : boolean
  required? : boolean
  disabled? : boolean
  virtualListIndex? : number
  COLOR_PROPS
  ROUTER_PROPS
  ACTIONS_PROPS
  onClick? : (event?: any) => void
  onSwipeoutOverswipeEnter? : (...args: any[]) => void
  onSwipeoutOverswipeExit? : (...args: any[]) => void
  onSwipeoutDeleted? : (...args: any[]) => void
  onSwipeoutDelete? : (...args: any[]) => void
  onSwipeoutClose? : (...args: any[]) => void
  onSwipeoutClosed? : (...args: any[]) => void
  onSwipeoutOpen? : (...args: any[]) => void
  onSwipeoutOpened? : (...args: any[]) => void
  onSwipeout? : (progress?: any) => void
  onAccordionBeforeClose? : (prevent?: any) => void
  onAccordionClose? : (...args: any[]) => void
  onAccordionClosed? : (...args: any[]) => void
  onAccordionBeforeOpen? : (prevent?: any) => void
  onAccordionOpen? : (...args: any[]) => void
  onAccordionOpened? : (...args: any[]) => void
  onChange? : (event?: any) => void
*/

const ListItemContent = ({
  props,
  slots,
  inputElRef,
  onChange,
  isMediaComputed,
  isSortableComputed,
  isSortableOppositeComputed,
} = {}) => {
  const {
    radio,
    checkbox,
    value,
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
    radioIcon,
    swipeout,
    sortable,
    accordionItem,
  } = props;
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
  if (media || (slots.media && slots.media.length)) {
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
  if (header || (slots.header && slots.header.length)) {
    headerEl = (
      <div className="item-header">
        {header}
        {slots.header}
      </div>
    );
  }
  if (footer || (slots.footer && slots.footer.length)) {
    footerEl = (
      <div className="item-footer">
        {footer}
        {slots.footer}
      </div>
    );
  }
  if (
    title ||
    (slots.title && slots.title.length) ||
    (!isMediaComputed && headerEl) ||
    (!isMediaComputed && footerEl)
  ) {
    titleEl = (
      <div className="item-title">
        {!isMediaComputed && headerEl}
        {title}
        {slots.title}
        {!isMediaComputed && footerEl}
      </div>
    );
  }
  if (subtitle || (slots.subtitle && slots.subtitle.length)) {
    subtitleEl = (
      <div className="item-subtitle">
        {subtitle}
        {slots.subtitle}
      </div>
    );
  }
  if (text || (slots.text && slots.text.length)) {
    textEl = (
      <div className="item-text">
        {text}
        {slots.text}
      </div>
    );
  }
  if (after || badge || (slots.after && slots.after.length)) {
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
      'item-radio-icon-start': radio && radioIcon === 'start',
      'item-radio-icon-end': radio && radioIcon === 'end',
    },
    colorClasses(props),
  );
  return (
    <ItemContentTag className={classes}>
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

const ListItem = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    children,
    title,
    link,
    target,
    tabLink,
    tabLinkActive,
    mediaItem,
    mediaList,
    divider,
    groupTitle,
    swipeout,
    swipeoutOpened,
    sortable,
    sortableOpposite,
    accordionItem,
    accordionItemOpened,
    smartSelect,
    smartSelectParams,
    noChevron,
    chevronCenter,
    checkbox,
    radio,
    indeterminate,
    disabled,
    virtualListIndex,
    href,
  } = props;

  const [isMedia, setIsMedia] = useState(mediaItem || mediaList);
  const [isSortable, setIsSortable] = useState(sortable);
  const [isSortableOpposite, setIsSortableOpposite] = useState(sortableOpposite);
  const [isSimple, setIsSimple] = useState(false);

  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);
  const linkElRef = useRef(null);
  const f7SmartSelect = useRef(null);
  const listElRef = useRef(null);
  const inputElRef = useRef(null);

  const onClick = (event) => {
    if (event.target.tagName.toLowerCase() !== 'input') {
      emit(props, 'click', event);
    }
  };
  const onSwipeoutOverswipeEnter = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'swipeoutOverswipeEnter');
  };
  const onSwipeoutOverswipeExit = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'swipeoutOverswipeExit');
  };
  const onSwipeoutDeleted = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'swipeoutDeleted');
  };
  const onSwipeoutDelete = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'swipeoutDelete');
  };
  const onSwipeoutClose = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'swipeoutClose');
  };
  const onSwipeoutClosed = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'swipeoutClosed');
  };
  const onSwipeoutOpen = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'swipeoutOpen');
  };
  const onSwipeoutOpened = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'swipeoutOpened');
  };
  const onSwipeout = (el, progress) => {
    if (elRef.current !== el) return;
    emit(props, 'swipeout', progress);
  };
  const onAccBeforeClose = (el, prevent) => {
    if (elRef.current !== el) return;
    emit(props, 'accordionBeforeClose', prevent);
  };
  const onAccClose = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'accordionClose');
  };
  const onAccClosed = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'accordionClosed');
  };
  const onAccBeforeOpen = (el, prevent) => {
    if (elRef.current !== el) return;
    emit(props, 'accordionBeforeOpen', prevent);
  };
  const onAccOpen = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'accordionOpen');
  };
  const onAccOpened = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'accordionOpened');
  };
  const onChange = (event) => {
    emit(props, 'change', event);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7SmartSelect: f7SmartSelect.current,
  }));

  useTooltip(elRef, props);

  useRouteProps(linkElRef, props);

  watchProp(swipeoutOpened, (newValue) => {
    if (!swipeout || !elRef.current || !f7) return;
    if (newValue) {
      f7.swipeout.open(elRef.current);
    } else {
      f7.swipeout.close(elRef.current);
    }
  });

  const onMount = () => {
    f7ready(() => {
      listElRef.current = f7.$(elRef.current).parents('.list, .list-group').eq(0);
      if (listElRef.current.length) {
        setIsMedia(listElRef.current.hasClass('media-list'));
        setIsSimple(listElRef.current.hasClass('simple-list'));
        setIsSortable(listElRef.current.hasClass('sortable'));
        setIsSortableOpposite(listElRef.current.hasClass('sortable-opposite'));
      }
      if (swipeout) {
        f7.on('swipeoutOpen', onSwipeoutOpen);
        f7.on('swipeoutOpened', onSwipeoutOpened);
        f7.on('swipeoutClose', onSwipeoutClose);
        f7.on('swipeoutClosed', onSwipeoutClosed);
        f7.on('swipeoutDelete', onSwipeoutDelete);
        f7.on('swipeoutDeleted', onSwipeoutDeleted);
        f7.on('swipeoutOverswipeEnter', onSwipeoutOverswipeEnter);
        f7.on('swipeoutOverswipeExit', onSwipeoutOverswipeExit);
        f7.on('swipeout', onSwipeout);
      }
      if (accordionItem) {
        f7.on('accordionBeforeOpen', onAccBeforeOpen);
        f7.on('accordionOpen', onAccOpen);
        f7.on('accordionOpened', onAccOpened);
        f7.on('accordionBeforeClose', onAccBeforeClose);
        f7.on('accordionClose', onAccClose);
        f7.on('accordionClosed', onAccClosed);
      }
      if (smartSelect) {
        const ssParams = extend(
          { el: elRef.current.querySelector('a.smart-select') },
          smartSelectParams || {},
        );
        f7SmartSelect.current = f7.smartSelect.create(ssParams);
      }
      if (swipeout && swipeoutOpened) {
        f7.swipeout.open(elRef.current);
      }
    });
  };

  const onDestroy = () => {
    if (!f7) return;
    if (swipeout) {
      f7.off('swipeoutOpen', onSwipeoutOpen);
      f7.off('swipeoutOpened', onSwipeoutOpened);
      f7.off('swipeoutClose', onSwipeoutClose);
      f7.off('swipeoutClosed', onSwipeoutClosed);
      f7.off('swipeoutDelete', onSwipeoutDelete);
      f7.off('swipeoutDeleted', onSwipeoutDeleted);
      f7.off('swipeoutOverswipeEnter', onSwipeoutOverswipeEnter);
      f7.off('swipeoutOverswipeExit', onSwipeoutOverswipeExit);
      f7.off('swipeout', onSwipeout);
    }
    if (accordionItem) {
      f7.off('accordionBeforeOpen', onAccBeforeOpen);
      f7.off('accordionOpen', onAccOpen);
      f7.off('accordionOpened', onAccOpened);
      f7.off('accordionBeforeClose', onAccBeforeClose);
      f7.off('accordionClose', onAccClose);
      f7.off('accordionClosed', onAccClosed);
    }
    if (smartSelect && f7SmartSelect.current) {
      f7SmartSelect.current.destroy();
    }
  };

  useEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  useEffect(() => {
    if (inputElRef.current) {
      inputElRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  useEffect(() => {
    if (!listElRef.current || listElRef.current.length === 0) return;
    const isMediaNow = listElRef.current.hasClass('media-list');
    const isSimpleNow = listElRef.current.hasClass('simple-list');
    const isSortableNow = listElRef.current.hasClass('sortable');
    const isSortableOppositeNow = listElRef.current.hasClass('sortable-opposite');
    if (isMediaNow !== isMedia) {
      setIsMedia(isMediaNow);
    }
    if (isSimpleNow !== isSimple) {
      setIsSimple(isSimpleNow);
    }
    if (isSortableNow !== isSortable) {
      setIsSortable(isSortableNow);
      if (isSortableOppositeNow !== isSortableOpposite) {
        setIsSortableOpposite(isSortableOpposite);
      }
    }
  });

  const slots = getSlots(props);

  let linkEl;
  let itemContentEl;

  const isMediaComputed = mediaItem || mediaList || isMedia;
  const isSortableComputed = sortable || isSortable;
  const isSortableOppositeComputed = isSortableComputed && (sortableOpposite || isSortableOpposite);

  if (!isSimple) {
    // Item Content
    itemContentEl = ListItemContent({
      props,
      slots,
      inputElRef,
      onChange,
      isMediaComputed,
      isSortableComputed,
      isSortableOppositeComputed,
    });

    // Link
    if (link || href || accordionItem || smartSelect) {
      const linkAttrs = {
        href: link === true ? '' : link || href,
        target,
        'data-tab': (isStringProp(tabLink) && tabLink) || undefined,
        ...routerAttrs(props),
        ...actionsAttrs(props),
      };
      const linkClasses = classNames(
        {
          'item-link': true,
          'smart-select': smartSelect,
          'tab-link': tabLink || tabLink === '',
          'tab-link-active': tabLinkActive,
        },
        routerClasses(props),
        actionsClasses(props),
      );
      linkEl = (
        <a ref={linkElRef} className={linkClasses} {...linkAttrs} onClick={onClick}>
          {itemContentEl}
        </a>
      );
    }
  }

  const liClasses = classNames(
    className,
    {
      'item-divider': divider,
      'list-group-title': groupTitle,
      'media-item': isMediaComputed,
      swipeout,
      'accordion-item': accordionItem,
      'accordion-item-opened': accordionItemOpened,
      disabled: disabled && !(radio || checkbox),
      'no-chevron': noChevron,
      'chevron-center': chevronCenter,
      'disallow-sorting': sortable === false,
    },
    colorClasses(props),
  );

  if (divider || groupTitle) {
    return (
      <li
        ref={elRef}
        id={id}
        style={style}
        className={liClasses}
        data-virtual-list-index={virtualListIndex}
        onClick={onClick}
      >
        <span>{children && children.length ? children : title}</span>
      </li>
    );
  }
  if (isSimple) {
    return (
      <li
        ref={elRef}
        id={id}
        style={style}
        className={liClasses}
        data-virtual-list-index={virtualListIndex}
        onClick={onClick}
      >
        {title}
        {children}
      </li>
    );
  }

  const linkItemEl = link || href || smartSelect || accordionItem ? linkEl : itemContentEl;

  return (
    <li
      ref={elRef}
      id={id}
      style={style}
      className={liClasses}
      data-virtual-list-index={virtualListIndex}
      {...dataAttrs}
    >
      {slots['root-start']}
      {swipeout ? <div className="swipeout-content">{linkItemEl}</div> : linkItemEl}
      {isSortableComputed && sortable !== false && !isSortableOppositeComputed && (
        <div className="sortable-handler" />
      )}
      {(swipeout || accordionItem) && slots.default}
      {slots.root}
      {slots['root-end']}
    </li>
  );
});

ListItem.displayName = 'f7-list-item';

export default ListItem;
