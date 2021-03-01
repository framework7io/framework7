import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs, extend, isStringProp, emit } from '../shared/utils';
import {
  colorClasses,
  actionsAttrs,
  actionsClasses,
  routerAttrs,
  routerClasses,
} from '../shared/mixins';
import { useTooltip } from '../shared/use-tooltip';
import { useIcon } from '../shared/use-icon';
import { useRouteProps } from '../shared/use-route-props';

import Preloader from './preloader';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  text? : string
  tabLink? : boolean | string
  tabLinkActive? : boolean
  type? : string
  href? : string | boolean
  target? : string
  round? : boolean
  roundMd? : boolean
  roundIos? : boolean
  roundAurora? : boolean
  fill? : boolean
  fillMd? : boolean
  fillIos? : boolean
  fillAurora? : boolean
  large? : boolean
  largeMd? : boolean
  largeIos? : boolean
  largeAurora? : boolean
  small? : boolean
  smallMd? : boolean
  smallIos? : boolean
  smallAurora? : boolean
  raised? : boolean
  raisedMd? : boolean
  raisedIos? : boolean
  raisedAurora? : boolean
  outline? : boolean
  outlineMd? : boolean
  outlineIos? : boolean
  outlineAurora? : boolean
  active? : boolean
  disabled? : boolean
  tooltip? : string
  tooltipTrigger? : string
  preloader?: boolean;
  preloaderSize?: number | string;
  preloaderColor?: string;
  loading?: boolean;
  onClick? : (event?: any) => void;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  COLOR_PROPS
  ICON_PROPS
  ROUTER_PROPS
  ACTIONS_PROPS
*/

const Button = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    children,
    text,
    type,
    href = '#',
    target,
    tabLink,
    tabLinkActive,
    round,
    roundIos,
    roundAurora,
    roundMd,
    fill,
    fillIos,
    fillAurora,
    fillMd,
    large,
    largeIos,
    largeAurora,
    largeMd,
    small,
    smallIos,
    smallAurora,
    smallMd,
    raised,
    raisedIos,
    raisedAurora,
    raisedMd,
    active,
    outline,
    outlineIos,
    outlineAurora,
    outlineMd,
    disabled,
    preloader,
    preloaderSize,
    preloaderColor,
    loading,
  } = props;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onClick = (e) => {
    emit(props, 'click', e);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  useTooltip(elRef, props);

  useRouteProps(elRef, props);

  const getClasses = () => {
    return classNames(
      className,
      'button',
      {
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,

        'button-round': round,
        'button-round-ios': roundIos,
        'button-round-aurora': roundAurora,
        'button-round-md': roundMd,
        'button-fill': fill,
        'button-fill-ios': fillIos,
        'button-fill-aurora': fillAurora,
        'button-fill-md': fillMd,
        'button-large': large,
        'button-large-ios': largeIos,
        'button-large-aurora': largeAurora,
        'button-large-md': largeMd,
        'button-small': small,
        'button-small-ios': smallIos,
        'button-small-aurora': smallAurora,
        'button-small-md': smallMd,
        'button-raised': raised,
        'button-raised-ios': raisedIos,
        'button-raised-aurora': raisedAurora,
        'button-raised-md': raisedMd,
        'button-active': active,
        'button-outline': outline,
        'button-outline-ios': outlineIos,
        'button-outline-aurora': outlineAurora,
        'button-outline-md': outlineMd,
        'button-preloader': preloader,
        'button-loading': loading,
        disabled,
      },
      colorClasses(props),
      routerClasses(props),
      actionsClasses(props),
    );
  };

  const ButtonTag = type === 'submit' || type === 'reset' || type === 'button' ? 'button' : 'a';

  const getAttrs = () => {
    let hrefComputed = href;
    if (href === true) hrefComputed = '#';
    if (href === false || ButtonTag === 'button') hrefComputed = undefined; // no href attribute
    return extend(
      {
        href: hrefComputed,
        target,
        type,
        'data-tab': (isStringProp(tabLink) && tabLink) || undefined,
      },
      routerAttrs(props),
      actionsAttrs(props),
    );
  };

  const iconEl = useIcon(props);
  let textEl;

  if (text) {
    textEl = <span>{text}</span>;
  }

  if (preloader) {
    return (
      <ButtonTag
        ref={elRef}
        id={id}
        style={style}
        className={getClasses()}
        {...getAttrs()}
        {...extraAttrs}
        onClick={onClick}
      >
        <Preloader size={preloaderSize} color={preloaderColor} />
        <span>
          {iconEl}
          {textEl}
          {children}
        </span>
      </ButtonTag>
    );
  }

  return (
    <ButtonTag
      ref={elRef}
      id={id}
      style={style}
      className={getClasses()}
      {...getAttrs()}
      {...extraAttrs}
      onClick={onClick}
    >
      {iconEl}
      {textEl}
      {children}
    </ButtonTag>
  );
});

Button.displayName = 'f7-button';

export default Button;
