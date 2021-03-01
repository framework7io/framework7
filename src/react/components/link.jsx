import React, { forwardRef, useRef, useImperativeHandle, useContext } from 'react';
import { classNames, getExtraAttrs, isStringProp, emit } from '../shared/utils';
import {
  colorClasses,
  routerAttrs,
  routerClasses,
  actionsAttrs,
  actionsClasses,
} from '../shared/mixins';
import { useIcon } from '../shared/use-icon';
import { useRouteProps } from '../shared/use-route-props';
import { useTooltip } from '../shared/use-tooltip';
import { TabbarContext } from '../shared/tabbar-context';

import Badge from './badge';
import { useSmartSelect } from '../shared/use-smart-select';

/* dts-imports
import { SmartSelect } from 'framework7/types';
*/

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  noLinkClass? : boolean
  text? : string
  tabLink? : boolean | string
  tabLinkActive? : boolean
  tabbarLabel? : boolean
  iconOnly? : boolean
  badge? : string | number
  badgeColor? : string
  iconBadge? : string | number
  href? : string | boolean
  target? : string
  tooltip? : string
  tooltipTrigger? : string
  smartSelect? : boolean
  smartSelectParams? : SmartSelect.Parameters;
  COLOR_PROPS
  ICON_PROPS
  ACTIONS_PROPS
  ROUTER_PROPS
  onClick? : (event?: any) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null; f7SmartSelect: () => SmartSelect.SmartSelect}>;
*/

const Link = forwardRef((props, ref) => {
  const f7SmartSelect = useRef(null);
  const {
    className,
    id,
    style,
    children,
    noLinkClass,
    text,
    tabLink,
    tabLinkActive,
    tabbarLabel,
    iconOnly,
    badge,
    badgeColor,
    href = '#',
    target,
    // Smart Select
    smartSelect,
    smartSelectParams,
  } = props;

  const tabbarContext = useContext(TabbarContext);

  const isTabbarLabel = tabbarLabel || tabbarContext.tabbarHasLabels;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onClick = (e) => {
    emit(props, 'click', e);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7SmartSelect: () => f7SmartSelect.current,
  }));

  useTooltip(elRef, props);

  useRouteProps(elRef, props);

  useSmartSelect(smartSelect, smartSelectParams, f7SmartSelect, () => {
    return elRef.current;
  });

  let textEl;
  let badgeEl;

  if (text) {
    if (badge) badgeEl = <Badge color={badgeColor}>{badge}</Badge>;
    textEl = (
      <span className={isTabbarLabel ? 'tabbar-label' : ''}>
        {text}
        {badgeEl}
      </span>
    );
  }
  const iconEl = useIcon(props);
  let iconOnlyComputed;
  if (iconOnly || (!text && children && children.length === 0) || (!text && !children)) {
    iconOnlyComputed = true;
  } else {
    iconOnlyComputed = false;
  }

  const classes = classNames(
    className,
    {
      link: !(noLinkClass || isTabbarLabel),
      'icon-only': iconOnlyComputed,
      'tab-link': tabLink || tabLink === '',
      'tab-link-active': tabLinkActive,
      'smart-select': smartSelect,
    },
    colorClasses(props),
    routerClasses(props),
    actionsClasses(props),
  );

  let hrefComputed = href;
  if (href === true) hrefComputed = '#';
  if (href === false) hrefComputed = undefined; // no href attribute
  const attrs = {
    href: hrefComputed,
    target,
    'data-tab': (isStringProp(tabLink) && tabLink) || undefined,
    ...routerAttrs(props),
    ...actionsAttrs(props),
  };

  return (
    <a
      ref={elRef}
      id={id}
      style={style}
      className={classes}
      {...attrs}
      {...extraAttrs}
      onClick={onClick}
    >
      {iconEl}
      {textEl}
      {children}
    </a>
  );
});

Link.displayName = 'f7-link';

export default Link;
