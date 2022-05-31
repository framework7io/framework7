import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  checked? : boolean
  indeterminate? : boolean
  name? : number | string
  value? : number | string | boolean
  disabled? : boolean
  readonly? : boolean
  defaultChecked? : boolean
  COLOR_PROPS
  onChange? : (event?: any) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null; inputEl: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const Checkbox = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    children,
    name,
    value,
    disabled,
    readonly,
    checked,
    defaultChecked,
    indeterminate,
  } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  const inputElRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
    inputEl: inputElRef.current,
  }));

  const onChange = (event) => {
    emit(props, 'change', event);
  };

  useEffect(() => {
    if (inputElRef.current) {
      inputElRef.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  const inputEl = (
    <input
      ref={inputElRef}
      type="checkbox"
      name={name}
      value={value}
      disabled={disabled}
      readOnly={readonly}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={onChange}
    />
  );

  const iconEl = <i className="icon-checkbox" />;

  const classes = classNames(
    className,
    {
      checkbox: true,
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

Checkbox.displayName = 'f7-checkbox';

export default Checkbox;
