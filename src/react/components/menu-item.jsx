import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect';
import { classNames, getExtraAttrs, getSlots, emit } from '../shared/utils';
import {
  colorClasses,
  routerAttrs,
  routerClasses,
  actionsClasses,
  actionsAttrs,
} from '../shared/mixins';
import { useRouteProps } from '../shared/use-route-props';
import { useIcon } from '../shared/use-icon';
import { f7ready, f7 } from '../shared/f7';
import { useTooltip } from '../shared/use-tooltip';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  text?: string;
  iconOnly?: boolean;
  href?: string;
  link?: boolean;
  target?: string;
  dropdown?: boolean;
  tooltip? : string
  tooltipTrigger? : string
  COLOR_PROPS
  ICON_PROPS
  ROUTER_PROPS
  ACTIONS_PROPS
  onClick? : (event?: any) => void;
  onMenuOpened? : (el?: HTMLElement) => void;
  onMenuClosed? : (el?: HTMLElement) => void;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
*/

const MenuItem = forwardRef((props, ref) => {
  const { className, id, style, link, href, target, text, dropdown, iconOnly } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onClick = (e) => {
    emit(props, 'click', e);
  };
  const onOpened = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'menuOpened', el);
  };
  const onClosed = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'menuClosed', el);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  useTooltip(elRef, props);

  useRouteProps(elRef, props);

  const attachEvents = () => {
    f7ready(() => {
      f7.on('menuOpened', onOpened);
      f7.on('menuClosed', onClosed);
    });
  };

  const detachEvents = () => {
    f7.off('menuOpened', onOpened);
    f7.off('menuClosed', onOpened);
  };

  useIsomorphicLayoutEffect(() => {
    attachEvents();
    return detachEvents;
  });

  const iconEl = useIcon(props);
  const slots = getSlots(props);

  let iconOnlyComputed;

  if (iconOnly || (!text && slots.text && slots.text.length === 0) || (!text && !slots.text)) {
    iconOnlyComputed = true;
  } else {
    iconOnlyComputed = false;
  }

  const isLink = link || href || href === '';
  const Tag = isLink ? 'a' : 'div';
  const isDropdown = dropdown || dropdown === '';

  const classes = classNames(
    {
      'menu-item': true,
      'menu-item-dropdown': isDropdown,
      'icon-only': iconOnlyComputed,
    },
    className,
    colorClasses(props),
    routerClasses(props),
    actionsClasses(props),
  );

  let hrefComputed = href;
  if (typeof hrefComputed === 'undefined' && link) hrefComputed = '#';

  const attrs = {
    href: hrefComputed,
    target,
    ...routerAttrs(props),
    ...actionsAttrs(props),
  };

  return (
    <Tag
      ref={elRef}
      className={classes}
      id={id}
      style={style}
      {...attrs}
      {...extraAttrs}
      onClick={onClick}
    >
      {(text || (slots.text && slots.text.length) || iconEl) && (
        <div className="menu-item-content">
          {text}
          {iconEl}
          {slots.text}
        </div>
      )}
      {slots.default}
    </Tag>
  );
});

MenuItem.displayName = 'f7-menu-item';

export default MenuItem;
