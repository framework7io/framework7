import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs, extend } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { useTheme } from '../shared/use-theme.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  size? : number | string;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const Preloader = forwardRef((props, ref) => {
  const theme = useTheme();
  const { className, id, style, size } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const preloaderStyle = {};
  let sizeComputed = size;
  if (sizeComputed && typeof sizeComputed === 'string' && sizeComputed.indexOf('px') >= 0) {
    sizeComputed = sizeComputed.replace('px', '');
  }
  if (sizeComputed) {
    preloaderStyle.width = `${sizeComputed}px`;
    preloaderStyle.height = `${sizeComputed}px`;
    preloaderStyle['--f7-preloader-size'] = `${sizeComputed}px`;
  }
  if (style) extend(preloaderStyle, style || {});

  let innerEl;
  if (theme && theme.md) {
    innerEl = (
      <span className="preloader-inner">
        <svg viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="16" />
        </svg>
      </span>
    );
  } else if (theme && theme.ios) {
    innerEl = (
      <span className="preloader-inner">
        <span className="preloader-inner-line" />
        <span className="preloader-inner-line" />
        <span className="preloader-inner-line" />
        <span className="preloader-inner-line" />
        <span className="preloader-inner-line" />
        <span className="preloader-inner-line" />
        <span className="preloader-inner-line" />
        <span className="preloader-inner-line" />
      </span>
    );
  } else if (!theme) {
    innerEl = <span className="preloader-inner" />;
  }

  const classes = classNames(
    className,
    {
      preloader: true,
    },
    colorClasses(props),
  );
  return (
    <span id={id} style={preloaderStyle} className={classes} ref={elRef} {...extraAttrs}>
      {innerEl}
    </span>
  );
});

Preloader.displayName = 'f7-preloader';

export default Preloader;
