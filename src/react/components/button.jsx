import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { classNames, getDataAttrs, extend, isStringProp, emit } from '../utils/utils';
import {
  colorClasses,
  linkActionsAttrs,
  linkActionsClasses,
  linkRouterAttrs,
  linkRouterClasses,
} from '../utils/mixins';
import { useTooltip } from '../utils/use-tooltip';
import { useIcon } from '../utils/use-icon';

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
  COLOR_PROPS
  LINK_ICON_PROPS
  LINK_ROUTER_PROPS
  LINK_ACTIONS_PROPS
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
    routeProps,
  } = props;

  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);

  const onClick = (e) => {
    emit(props, 'click', e);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  useTooltip(elRef, props);

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

        disabled,
      },
      colorClasses(props),
      linkRouterClasses(props),
      linkActionsClasses(props),
    );
  };

  const getAttrs = () => {
    let hrefComputed = href;
    if (href === true) hrefComputed = '#';
    if (href === false) hrefComputed = undefined; // no href attribute
    return extend(
      {
        href: hrefComputed,
        target,
        type,
        'data-tab': (isStringProp(tabLink) && tabLink) || undefined,
      },
      linkRouterAttrs(props),
      linkActionsAttrs(props),
    );
  };

  useEffect(() => {
    if (routeProps && elRef.current) {
      elRef.current.f7RouteProps = routeProps;
    }
    return () => {
      if (elRef.current && elRef.current.f7RouteProps) {
        delete elRef.current.f7RouteProps;
      }
    };
  }, [routeProps]);

  const iconEl = useIcon(props);
  let textEl;

  if (text) {
    textEl = <span>{text}</span>;
  }

  const ButtonTag = type === 'submit' || type === 'reset' || type === 'button' ? 'button' : 'a';
  return (
    <ButtonTag
      ref={elRef}
      id={id}
      style={style}
      className={getClasses()}
      {...getAttrs()}
      {...dataAttrs}
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
