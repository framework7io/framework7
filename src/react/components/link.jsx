import React, { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react';
import { classNames, getDataAttrs, isStringProp, emit, extend } from '../shared/utils';
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
import { f7ready, f7 } from '../shared/f7';

import Badge from './badge';

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
  const [isTabbarLabel, setIsTabbarLabel] = useState(tabbarLabel);

  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);

  const onClick = (e) => {
    emit(props, 'click', e);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7SmartSelect: f7SmartSelect.current,
  }));

  useTooltip(elRef, props);

  useRouteProps(elRef, props);

  const onMount = () => {
    f7ready(() => {
      if (smartSelect) {
        const ssParams = extend({ el: elRef.current }, smartSelectParams || {});
        f7SmartSelect.current = f7.smartSelect.create(ssParams);
      }
    });
  };

  const onDestroy = () => {
    if (f7SmartSelect.current && f7SmartSelect.current.destroy) {
      f7SmartSelect.current.destroy();
    }
    f7SmartSelect.current = null;
  };

  useEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  useEffect(() => {
    if (!elRef.current || !f7) return;
    let isTabbarLabelComputed = false;
    if (
      tabbarLabel ||
      ((tabLink || tabLink === '') && f7.$(elRef.current).parents('.tabbar-labels').length)
    ) {
      isTabbarLabelComputed = true;
    }
    setIsTabbarLabel(isTabbarLabelComputed);
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
  if (iconOnly || (!text && children && children.length === 0) || (!text && !children)) {
    self.iconOnlyComputed = true;
  } else {
    self.iconOnlyComputed = false;
  }

  const classes = classNames(
    className,
    {
      link: !(noLinkClass || isTabbarLabel),
      'icon-only': self.iconOnlyComputed,
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
      {...dataAttrs}
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
