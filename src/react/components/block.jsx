import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils';
import { colorClasses } from '../shared/mixins';
import { useTab } from '../shared/use-tab';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  inset?: boolean
  xsmallInset?: boolean
  smallInset?: boolean
  mediumInset?: boolean
  largeInset?: boolean
  xlargeInset?: boolean
  strong?: boolean
  tabs?: boolean
  tab?: boolean
  tabActive?: boolean
  accordionList?: boolean
  accordionOpposite?: boolean
  noHairlines?: boolean
  noHairlinesMd?: boolean
  noHairlinesIos?: boolean
  noHairlinesAurora?: boolean
  onTabShow?: (el?: HTMLElement) => void
  onTabHide?: (el?: HTMLElement) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  COLOR_PROPS
*/

const Block = forwardRef((props, ref) => {
  const {
    className,
    inset,
    xsmallInset,
    smallInset,
    mediumInset,
    largeInset,
    xlargeInset,
    strong,
    accordionList,
    accordionOpposite,

    tabs,
    tab,
    tabActive,
    noHairlines,
    noHairlinesIos,
    noHairlinesMd,
    noHairlinesAurora,
    id,
    style,
    children,
  } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  useTab(elRef, props);

  const classes = classNames(
    className,
    'block',
    {
      inset,
      'xsmall-inset': xsmallInset,
      'small-inset': smallInset,
      'medium-inset': mediumInset,
      'large-inset': largeInset,
      'xlarge-inset': xlargeInset,
      'block-strong': strong,
      'accordion-list': accordionList,
      'accordion-opposite': accordionOpposite,
      tabs,
      tab,
      'tab-active': tabActive,
      'no-hairlines': noHairlines,
      'no-hairlines-md': noHairlinesMd,
      'no-hairlines-ios': noHairlinesIos,
      'no-hairlines-aurora': noHairlinesAurora,
    },
    colorClasses(props),
  );

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      {children}
    </div>
  );
});

Block.displayName = 'f7-block';

export default Block;
