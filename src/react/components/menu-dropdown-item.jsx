import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getDataAttrs, emit } from '../utils/utils';
import {
  colorClasses,
  linkRouterAttrs,
  linkRouterClasses,
  linkActionsAttrs,
  linkActionsClasses,
} from '../utils/mixins';
import { useRouteProps } from '../utils/use-route-props';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  text? : string;
  link? : boolean;
  href? : string;
  target? : string;
  divider? : boolean;
  COLOR_PROPS
  LINK_ROUTER_PROPS
  LINK_ACTIONS_PROPS
  onClick? : (event?: any) => void;
*/

const MenuDropdownItem = forwardRef((props, ref) => {
  const { className, id, style, children, link, href, target, text, divider, menuClose } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);

  const onClick = (e) => {
    emit(props, 'click', e);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  useRouteProps(elRef, props);

  const isLink = link || href || href === '';
  const Tag = isLink ? 'a' : 'div';

  const classes = classNames(
    {
      'menu-dropdown-link': isLink && !divider,
      'menu-dropdown-item': !isLink && !divider,
      'menu-dropdown-divider': divider,
    },
    className,
    colorClasses(props),
    linkRouterClasses(props),
    linkActionsClasses(props),
    {
      'menu-close': typeof menuClose === 'undefined',
    },
  );

  let hrefComputed = href;
  if (typeof hrefComputed === 'undefined' && link) hrefComputed = '#';
  const attrs = {
    href: hrefComputed,
    target,
    ...linkRouterAttrs(props),
    ...linkActionsAttrs(props),
  };

  return (
    <Tag
      className={classes}
      id={id}
      style={style}
      ref={elRef}
      {...attrs}
      {...dataAttrs}
      onClick={onClick}
    >
      {text}
      {children}
    </Tag>
  );
});

MenuDropdownItem.displayName = 'f7-menu-dropdown-item';

export default MenuDropdownItem;
