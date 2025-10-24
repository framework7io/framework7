import React, { useRef } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { useTab } from '../shared/use-tab.js';
import { setRef } from '../shared/set-ref.js';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  inset?: boolean
  insetIos?: boolean
  insetMd?: boolean
  xsmallInset?: boolean
  xsmallInsetIos?: boolean
  xsmallInsetMd?: boolean
  smallInset?: boolean
  smallInsetIos?: boolean
  smallInsetMd?: boolean
  mediumInset?: boolean
  mediumInsetIos?: boolean
  mediumInsetMd?: boolean
  largeInset?: boolean
  largeInsetIos?: boolean
  largeInsetMd?: boolean
  xlargeInset?: boolean
  xlargeInsetIos?: boolean
  xlargeInsetMd?: boolean
  strong?: boolean
  strongIos?: boolean
  strongMd?: boolean
  outline?: boolean
  outlineIos?: boolean
  outlineMd?: boolean
  tabs?: boolean
  tab?: boolean
  tabActive?: boolean
  accordionList?: boolean
  accordionOpposite?: boolean
  onTabShow?: (el?: HTMLElement) => void
  onTabHide?: (el?: HTMLElement) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const Block = (props) => {
  const {
    className,
    inset,
    insetIos,
    insetMd,
    xsmallInset,
    xsmallInsetIos,
    xsmallInsetMd,
    smallInset,
    smallInsetIos,
    smallInsetMd,
    mediumInset,
    mediumInsetIos,
    mediumInsetMd,
    largeInset,
    largeInsetIos,
    largeInsetMd,
    xlargeInset,
    xlargeInsetIos,
    xlargeInsetMd,
    strong,
    strongIos,
    strongMd,
    outline,
    outlineIos,
    outlineMd,
    accordionList,
    accordionOpposite,

    tabs,
    tab,
    tabActive,
    id,
    style,
    children,
    ref,
  } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  useTab(elRef, props);

  const classes = classNames(
    className,
    'block',
    {
      inset,
      'inset-ios': insetIos,
      'inset-md': insetMd,
      'xsmall-inset': xsmallInset,
      'xsmall-inset-ios': xsmallInsetIos,
      'xsmall-inset-md': xsmallInsetMd,
      'small-inset': smallInset,
      'small-inset-ios': smallInsetIos,
      'small-inset-md': smallInsetMd,
      'medium-inset': mediumInset,
      'medium-inset-ios': mediumInsetIos,
      'medium-inset-md': mediumInsetMd,
      'large-inset': largeInset,
      'large-inset-ios': largeInsetIos,
      'large-inset-md': largeInsetMd,
      'xlarge-inset': xlargeInset,
      'xlarge-inset-ios': xlargeInsetIos,
      'xlarge-inset-md': xlargeInsetMd,
      'block-strong': strong,
      'block-strong-ios': strongIos,
      'block-strong-md': strongMd,
      'block-outline': outline,
      'block-outline-ios': outlineIos,
      'block-outline-md': outlineMd,
      'accordion-list': accordionList,
      'accordion-opposite': accordionOpposite,
      tabs,
      tab,
      'tab-active': tabActive,
    },
    colorClasses(props),
  );

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
      {children}
    </div>
  );
};

Block.displayName = 'f7-block';

export default Block;
