import React, { useRef } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { setRef } from '../shared/set-ref.js';

import Link from './link.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  backLink? : boolean | string;
  backLinkUrl? : string;
  backLinkForce? : boolean;
  backLinkShowText? : boolean;
  COLOR_PROPS
  onBackClick? : (event?: any) => void;
  onClickBack? : (event?: any) => void;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const NavLeft = (props) => {
  const {
    className,
    id,
    style,
    children,
    backLink,
    backLinkUrl,
    backLinkForce,
    backLinkShowText,
    ref,
  } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onBackClick = (event) => {
    emit(props, 'backClick clickBack', event);
  };

  let linkEl;

  if (backLink) {
    const text = backLink !== true && backLinkShowText ? backLink : undefined;
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
  const classes = classNames(className, 'left', {}, colorClasses(props));

  return (
    <div
      id={id}
      style={style}
      className={classes}
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
      {...extraAttrs}
    >
      {linkEl}
      {children}
    </div>
  );
};

NavLeft.displayName = 'f7-nav-left';

export default NavLeft;
