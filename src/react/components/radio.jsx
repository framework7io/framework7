import React, { useRef } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { setRef } from '../shared/set-ref.js';
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

const Radio = (props) => {
  const {
    className,
    id,
    style,
    children,
    value,
    disabled,
    readonly,
    checked,
    defaultChecked,
    ref,
  } = props;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onChange = (event) => {
    emit(props, 'change', event);
  };

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

  const classes = classNames(className, 'radio', { disabled }, colorClasses(props));

  return (
    <label
      id={id}
      style={style}
      className={classes}
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
      {...extraAttrs}
    >
      {inputEl}
      {iconEl}
      {children}
    </label>
  );
};

Radio.displayName = 'f7-radio';

export default Radio;
