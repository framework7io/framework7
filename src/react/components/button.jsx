import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs, extend, isStringProp, emit } from '../shared/utils.js';
import {
  colorClasses,
  actionsAttrs,
  actionsClasses,
  routerAttrs,
  routerClasses,
} from '../shared/mixins.js';
import { useTooltip } from '../shared/use-tooltip.js';
import { useIcon } from '../shared/use-icon.js';
import { useRouteProps } from '../shared/use-route-props.js';

import Preloader from './preloader.js';

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
  fill? : boolean
  fillMd? : boolean
  fillIos? : boolean
  tonal? : boolean
  tonalMd? : boolean
  tonalIos? : boolean
  large? : boolean
  largeMd? : boolean
  largeIos? : boolean
  small? : boolean
  smallMd? : boolean
  smallIos? : boolean
  raised? : boolean
  raisedMd? : boolean
  raisedIos? : boolean
  outline? : boolean
  outlineMd? : boolean
  outlineIos? : boolean
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
  children?: React.ReactNode;
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
    roundMd,
    fill,
    fillIos,
    fillMd,
    tonal,
    tonalIos,
    tonalMd,
    large,
    largeIos,
    largeMd,
    small,
    smallIos,
    smallMd,
    raised,
    raisedIos,
    raisedMd,
    active,
    outline,
    outlineIos,
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
        'button-round-md': roundMd,
        'button-fill': fill,
        'button-fill-ios': fillIos,
        'button-fill-md': fillMd,
        'button-tonal': tonal,
        'button-tonal-ios': tonalIos,
        'button-tonal-md': tonalMd,
        'button-large': large,
        'button-large-ios': largeIos,
        'button-large-md': largeMd,
        'button-small': small,
        'button-small-ios': smallIos,
        'button-small-md': smallMd,
        'button-raised': raised,
        'button-raised-ios': raisedIos,
        'button-raised-md': raisedMd,
        'button-active': active,
        'button-outline': outline,
        'button-outline-ios': outlineIos,
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
