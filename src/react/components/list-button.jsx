import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs, isStringProp, emit } from '../shared/utils.js';
import {
  colorClasses,
  actionsAttrs,
  actionsClasses,
  routerAttrs,
  routerClasses,
} from '../shared/mixins.js';
import { useTooltip } from '../shared/use-tooltip.js';
import { useRouteProps } from '../shared/use-route-props.js';

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
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
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
  const extraAttrs = getExtraAttrs(props);

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
    ...routerAttrs(props),
    ...actionsAttrs(props),
  };

  const linkClasses = classNames({
    'list-button': true,
    'tab-link': tabLink || tabLink === '',
    'tab-link-active': tabLinkActive,
    ...colorClasses(props),
    ...routerClasses(props),
    ...actionsClasses(props),
  });

  return (
    <li id={id} style={style} className={className} ref={elRef} {...extraAttrs}>
      <a className={linkClasses} {...linkAttrs} onClick={onClick} ref={linkElRef}>
        {title}
        {text}
        {children}
      </a>
    </li>
  );
});

ListButton.displayName = 'f7-list-button';

export default ListButton;
