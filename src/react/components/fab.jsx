import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs, getSlots, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { useTooltip } from '../shared/use-tooltip.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  morphTo? : string;
  href? : boolean | string;
  target? : string;
  text? : string;
  position? : string;
  tooltip? : string;
  tooltipTrigger? : string;
  onClick? : (event?: any) => void;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const Fab = forwardRef((props, ref) => {
  const { className, id, style, morphTo, href, target, text, position = 'right-bottom' } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onClick = (e) => {
    emit(props, 'click', e);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  useTooltip(elRef, props);

  let hrefComputed = href;
  if (hrefComputed === true) hrefComputed = '#';
  if (hrefComputed === false) hrefComputed = undefined; // no href attribute

  const linkChildren = [];
  const rootChildren = [];

  const {
    link: linkSlots,
    default: defaultSlots,
    root: rootSlots,
    text: textSlots,
  } = getSlots(props);

  if (defaultSlots) {
    for (let i = 0; i < defaultSlots.length; i += 1) {
      const child = defaultSlots[i];
      let isRoot;
      const tag = child.type && (child.type.displayName || child.type.name);
      if (tag === 'FabButtons' || tag === 'f7-fab-buttons') isRoot = true;
      if (isRoot) rootChildren.push(child);
      else linkChildren.push(child);
    }
  }
  let textEl;
  if (text || (textSlots && textSlots.length)) {
    textEl = (
      <div className="fab-text">
        {text}
        {textSlots}
      </div>
    );
  }
  let linkEl;
  if (linkChildren.length || (linkSlots && linkSlots.length) || textEl) {
    linkEl = (
      <a target={target} href={hrefComputed} onClick={onClick}>
        {linkChildren}
        {textEl}
        {linkSlots}
      </a>
    );
  }

  const classes = classNames(
    className,
    'fab',
    `fab-${position}`,
    {
      'fab-morph': morphTo,
      'fab-extended': typeof textEl !== 'undefined',
    },
    colorClasses(props),
  );

  return (
    <div
      id={id}
      style={style}
      className={classes}
      data-morph-to={morphTo}
      ref={elRef}
      {...extraAttrs}
    >
      {linkEl}
      {rootChildren}
      {rootSlots}
    </div>
  );
});

Fab.displayName = 'f7-fab';

export default Fab;
