import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { f7 } from '../shared/f7.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  progress? : number;
  infinite? : boolean;
  ref?: React.MutableRefObject<{el: HTMLElement | null; set: (progress: number, duration: number) => void}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const Progressbar = forwardRef((props, ref) => {
  const { className, id, style, progress, infinite } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const set = (newProgress, speed) => {
    if (!f7) return;
    f7.progressbar.set(elRef.current, newProgress, speed);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    set,
  }));

  const transformStyle = {
    transform: progress ? `translate3d(${-100 + progress}%, 0, 0)` : '',
    WebkitTransform: progress ? `translate3d(${-100 + progress}%, 0, 0)` : '',
  };

  const classes = classNames(
    className,
    'progressbar',
    {
      'progressbar-infinite': infinite,
    },
    colorClasses(props),
  );

  return (
    <span
      ref={elRef}
      id={id}
      style={style}
      className={classes}
      data-progress={progress}
      {...extraAttrs}
    >
      <span style={transformStyle} />
    </span>
  );
});

Progressbar.displayName = 'f7-progressbar';

export default Progressbar;
