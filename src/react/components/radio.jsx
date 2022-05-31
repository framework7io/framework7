import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  checked? : boolean
  name? : number | string
  value? : number | string | boolean
  disabled? : boolean
  readonly? : boolean
  defaultChecked? : boolean
  COLOR_PROPS
  onChange? : (event?: any) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const Radio = forwardRef((props, ref) => {
  const { className, id, style, children, value, disabled, readonly, checked, defaultChecked } =
    props;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onChange = (event) => {
    emit(props, 'change', event);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const inputEl = (
    <input
      type="radio"
      name={name}
      value={value}
      disabled={disabled}
      readOnly={readonly}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={onChange}
    />
  );

  const iconEl = <i className="icon-radio" />;

  const classes = classNames(
    className,
    'radio',
    {
      disabled,
    },
    colorClasses(props),
  );

  return (
    <label id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      {inputEl}
      {iconEl}
      {children}
    </label>
  );
});

Radio.displayName = 'f7-radio';

export default Radio;
