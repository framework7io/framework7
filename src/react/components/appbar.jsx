import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getDataAttrs, getSlots } from '../shared/utils';
import { colorClasses } from '../shared/mixins';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  noShadow: boolean;
  noHairline: boolean;
  inner: boolean;
  innerClass: string;
  innerClassName: string;
  COLOR_PROPS
*/

const Appbar = forwardRef((props, ref) => {
  const { className, id, style, inner, innerClass, innerClassName, noShadow, noHairline } = props;

  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  let innerEl;

  if (inner) {
    innerEl = (
      <div className={classNames('appbar-inner', innerClass, innerClassName)}>
        <slot />
      </div>
    );
  }
  const classes = classNames(
    className,
    'appbar',
    {
      'no-shadow': noShadow,
      'no-hairline': noHairline,
    },
    colorClasses(props),
  );

  const slots = getSlots(props);

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...dataAttrs}>
      {slots['before-inner']}
      {innerEl || slots.default}
      {slots['after-inner']}
    </div>
  );
});

Appbar.displayName = 'f7-appbar';

export default Appbar;
