import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { useTheme } from '../shared/use-theme.js';

import Link from './link.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  backLink? : boolean | string;
  backLinkUrl? : string;
  backLinkForce? : boolean;
  backLinkShowText? : boolean;
  sliding? : boolean;
  COLOR_PROPS
  onBackClick? : (event?: any) => void;
  onClickBack? : (event?: any) => void;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const NavLeft = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    children,
    backLink,
    backLinkUrl,
    backLinkForce,
    backLinkShowText,
    sliding,
  } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onBackClick = (event) => {
    emit(props, 'backClick clickBack', event);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const theme = useTheme();

  let linkEl;
  let needBackLinkText = backLinkShowText;
  if (typeof needBackLinkText === 'undefined') needBackLinkText = !theme.md;

  if (backLink) {
    const text = backLink !== true && needBackLinkText ? backLink : undefined;
    linkEl = (
      <Link
        href={backLinkUrl || '#'}
        back
        icon="icon-back"
        force={backLinkForce || undefined}
        className={!text ? 'icon-only' : undefined}
        text={text}
        onClick={onBackClick}
      />
    );
  }
  const classes = classNames(
    className,
    'left',
    {
      sliding,
    },
    colorClasses(props),
  );

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      {linkEl}
      {children}
    </div>
  );
});

NavLeft.displayName = 'f7-nav-left';

export default NavLeft;
