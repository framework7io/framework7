import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getDataAttrs, extend } from '../utils/utils';
import { colorClasses } from '../utils/mixins';
import { useTheme } from '../utils/use-theme';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  size? : number | string;
  COLOR_PROPS
*/

const Preloader = forwardRef((props, ref) => {
  const theme = useTheme();
  const { className, id, style, size } = props;
  const dataAttrs = getDataAttrs(props);

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
        <span className="preloader-inner-gap" />
        <span className="preloader-inner-left">
          <span className="preloader-inner-half-circle" />
        </span>
        <span className="preloader-inner-right">
          <span className="preloader-inner-half-circle" />
        </span>
      </span>
    );
  } else if (theme && theme.ios) {
    innerEl = (
      <span className="preloader-inner">
        <span className="preloader-inner-line"></span>
        <span className="preloader-inner-line"></span>
        <span className="preloader-inner-line"></span>
        <span className="preloader-inner-line"></span>
        <span className="preloader-inner-line"></span>
        <span className="preloader-inner-line"></span>
        <span className="preloader-inner-line"></span>
        <span className="preloader-inner-line"></span>
        <span className="preloader-inner-line"></span>
        <span className="preloader-inner-line"></span>
        <span className="preloader-inner-line"></span>
        <span className="preloader-inner-line"></span>
      </span>
    );
  } else if (theme && theme.aurora) {
    innerEl = (
      <span className="preloader-inner">
        <span className="preloader-inner-circle"></span>
      </span>
    );
  } else if (!theme) {
    innerEl = <span className="preloader-inner"></span>;
  }

  const classes = classNames(className, 'preloader', colorClasses(props));
  return (
    <span id={id} style={preloaderStyle} className={classes} ref={elRef} {...dataAttrs}>
      {innerEl}
    </span>
  );
});

Preloader.displayName = 'f7-preloader';

export default Preloader;
