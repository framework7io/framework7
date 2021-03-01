import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils';
import { colorClasses } from '../shared/mixins';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  raised? : boolean
  raisedIos? : boolean
  raisedMd? : boolean
  raisedAurora? : boolean
  round? : boolean
  roundIos? : boolean
  roundMd? : boolean
  roundAurora? : boolean
  strong? : boolean
  strongIos? : boolean
  strongMd? : boolean
  strongAurora? : boolean
  tag? : string
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  COLOR_PROPS
*/

const Segmented = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    children,
    raised,
    raisedIos,
    raisedMd,
    raisedAurora,
    round,
    roundIos,
    roundMd,
    roundAurora,
    strong,
    strongIos,
    strongMd,
    strongAurora,
    tag = 'div',
  } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames(
    className,
    {
      segmented: true,
      'segmented-raised': raised,
      'segmented-raised-ios': raisedIos,
      'segmented-raised-aurora': raisedAurora,
      'segmented-raised-md': raisedMd,
      'segmented-round': round,
      'segmented-round-ios': roundIos,
      'segmented-round-aurora': roundAurora,
      'segmented-round-md': roundMd,
      'segmented-strong': strong,
      'segmented-strong-ios': strongIos,
      'segmented-strong-md': strongMd,
      'segmented-strong-aurora': strongAurora,
    },
    colorClasses(props),
  );
  const SegmentedTag = tag;

  return (
    <SegmentedTag id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      {children}
      {(strong || strongIos || strongMd || strongAurora) && (
        <span className="segmented-highlight" />
      )}
    </SegmentedTag>
  );
});

Segmented.displayName = 'f7-segmented';

export default Segmented;
