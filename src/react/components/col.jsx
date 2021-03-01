import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils';
import { colorClasses } from '../shared/mixins';
import { f7ready, f7 } from '../shared/f7';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  tag? : string
  width? : number | string
  xsmall? : number | string
  small? : number | string
  medium? : number | string
  large? : number | string
  xlarge? : number | string
  resizable? : boolean
  resizableFixed? : boolean
  resizableAbsolute? : boolean
  resizableHandler? : boolean
  onClick? : (event?: any) => void
  onGridResize? : (...args: any[]) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  COLOR_PROPS
*/

const Col = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    children,
    tag = 'div',
    width = 'auto',
    xsmall,
    small,
    medium,
    large,
    xlarge,
    resizable,
    resizableFixed,
    resizableAbsolute,
    resizableHandler = true,
  } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onClick = (event) => {
    emit(props, 'click', event);
  };

  const onResize = (el) => {
    if (el === elRef.current) {
      emit(props, 'gridResize');
    }
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const ColTag = tag;

  const classes = classNames(
    className,
    {
      col: width === 'auto',
      [`col-${width}`]: width !== 'auto',
      [`xsmall-${xsmall}`]: xsmall,
      [`small-${small}`]: small,
      [`medium-${medium}`]: medium,
      [`large-${large}`]: large,
      [`xlarge-${xlarge}`]: xlarge,
      resizable,
      'resizable-fixed': resizableFixed,
      'resizable-absolute': resizableAbsolute,
    },
    colorClasses(props),
  );

  useEffect(() => {
    f7ready(() => {
      f7.on('gridResize', onResize);
    });
    return () => {
      f7.off('gridResize', onResize);
    };
  });

  return (
    <ColTag id={id} style={style} className={classes} ref={elRef} {...extraAttrs} onClick={onClick}>
      {children}
      {resizable && resizableHandler && <span className="resize-handler" />}
    </ColTag>
  );
});

Col.displayName = 'f7-col';

export default Col;
