import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils';
import {
  colorClasses,
  routerAttrs,
  routerClasses,
  actionsAttrs,
  actionsClasses,
} from '../shared/mixins';
import { useRouteProps } from '../shared/use-route-props';

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
  ROUTER_PROPS
  ACTIONS_PROPS
  onClick? : (event?: any) => void;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
*/

const MenuDropdownItem = forwardRef((props, ref) => {
  const { className, id, style, children, link, href, target, text, divider, menuClose } = props;
  const extraAttrs = getExtraAttrs(props);

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
    routerClasses(props),
    actionsClasses(props),
    {
      'menu-close': typeof menuClose === 'undefined',
    },
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
      className={classes}
      id={id}
      style={style}
      ref={elRef}
      {...attrs}
      {...extraAttrs}
      onClick={onClick}
    >
      {text}
      {children}
    </Tag>
  );
});

MenuDropdownItem.displayName = 'f7-menu-dropdown-item';

export default MenuDropdownItem;
