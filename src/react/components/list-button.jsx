import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getDataAttrs, isStringProp, emit } from '../shared/utils';
import {
  colorClasses,
  linkActionsAttrs,
  linkActionsClasses,
  linkRouterAttrs,
  linkRouterClasses,
} from '../shared/mixins';
import { useTooltip } from '../shared/use-tooltip';
import { useRouteProps } from '../shared/use-route-props';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  title? : string | number
  text? : string | number
  tabLink? : boolean | string
  tabLinkActive? : boolean
  link? : boolean | string
  href? : boolean | string
  target? : string
  tooltip? : string
  tooltipTrigger? : string
  COLOR_PROPS
  ROUTER_PROPS
  ACTIONS_PROPS
  onClick? : (event?: any) => void
*/

const ListButton = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    children,
    title,
    text,
    tabLink,
    tabLinkActive,
    link,
    href,
    target,
  } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);
  const linkElRef = useRef(null);

  const onClick = (e) => {
    emit(props, 'click', e);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  useTooltip(linkElRef, props);

  useRouteProps(linkElRef, props);

  const linkAttrs = {
    href: typeof link === 'boolean' && typeof href === 'boolean' ? '#' : link || href,
    target,
    'data-tab': isStringProp(tabLink) && tabLink,
    ...linkRouterAttrs(props),
    ...linkActionsAttrs(props),
  };

  const linkClasses = classNames({
    'list-button': true,
    'tab-link': tabLink || tabLink === '',
    'tab-link-active': tabLinkActive,
    ...colorClasses(props),
    ...linkRouterClasses(props),
    ...linkActionsClasses(props),
  });

  return (
    <li id={id} style={style} className={className} ref={elRef} {...dataAttrs}>
      <a className={linkClasses} {...linkAttrs} onClick={onClick} ref={linkElRef}>
        {children && children.length ? children : title || text}
      </a>
    </li>
  );
});

ListButton.displayName = 'f7-list-button';

export default ListButton;
