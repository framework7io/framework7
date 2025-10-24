import React, { useRef } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { setRef } from '../shared/set-ref.js';
/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  raised? : boolean
  raisedIos? : boolean
  raisedMd? : boolean
  round? : boolean
  roundIos? : boolean
  roundMd? : boolean
  strong? : boolean
  strongIos? : boolean
  strongMd? : boolean
  tag? : string
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const Segmented = (props) => {
  const {
    className,
    id,
    style,
    children,
    raised,
    raisedIos,
    raisedMd,
    round,
    roundIos,
    roundMd,
    strong,
    strongIos,
    strongMd,
    tag = 'div',
    ref,
  } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  const classes = classNames(
    className,
    {
      segmented: true,
      'segmented-raised': raised,
      'segmented-raised-ios': raisedIos,
      'segmented-raised-md': raisedMd,
      'segmented-round': round,
      'segmented-round-ios': roundIos,
      'segmented-round-md': roundMd,
      'segmented-strong': strong,
      'segmented-strong-ios': strongIos,
      'segmented-strong-md': strongMd,
    },
    colorClasses(props),
  );
  const SegmentedTag = tag;

  return (
    <SegmentedTag
      id={id}
      style={style}
      className={classes}
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
      {...extraAttrs}
    >
      {children}
      {(strong || strongIos || strongMd) && <span className="segmented-highlight" />}
    </SegmentedTag>
  );
};

Segmented.displayName = 'f7-segmented';

export default Segmented;
