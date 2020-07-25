import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { classNames, getDataAttrs, emit } from '../utils/utils';
import { colorClasses } from '../utils/mixins';
import { f7ready, f7 } from '../utils/f7';
import { watchProp } from '../utils/watch-prop';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  init? : boolean
  checked? : boolean
  defaultChecked? : boolean
  disabled? : boolean
  readonly? : boolean
  name? : string
  value? : string | number | Array<any>
  COLOR_PROPS
  onToggleChange? : (...args: any[]) => void
  onChange? : (event?: any) => void
*/

const Toggle = forwardRef((props, ref) => {
  const f7Toggle = useRef(null);
  const {
    className,
    id,
    style,
    init = true,
    checked,
    defaultChecked,
    disabled,
    readonly,
    name,
    value,
  } = props;

  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);

  const toggle = () => {
    if (f7Toggle.current && f7Toggle.current.toggle) f7Toggle.current.toggle();
  };

  const onChange = (event) => {
    emit(props, 'change', event);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7Toggle: f7Toggle.current,
    toggle,
  }));

  watchProp(checked, (newValue) => {
    if (!f7Toggle.current) return;
    f7Toggle.current.checked = newValue;
  });

  const onMount = () => {
    f7ready(() => {
      if (!init || !elRef.current) return;
      f7Toggle.current = f7.toggle.create({
        el: elRef.current,
        on: {
          change(toggleInstance) {
            emit(props, 'toggleChange', toggleInstance.checked);
          },
        },
      });
    });
  };

  const onDestroy = () => {
    if (f7Toggle.current && f7Toggle.current.destroy && f7Toggle.current.$el) {
      f7Toggle.current.destroy();
    }
    f7Toggle.current = null;
  };

  useEffect(() => {
    onMount();
    return onDestroy;
  });

  const labelClasses = classNames(
    'toggle',
    className,
    {
      disabled,
    },
    colorClasses(props),
  );
  const inputEl = (
    <input
      ref="inputEl"
      type="checkbox"
      name={name}
      disabled={disabled}
      readOnly={readonly}
      checked={checked}
      defaultChecked={defaultChecked}
      value={value}
      onChange={onChange}
    />
  );

  return (
    <label id={id} style={style} className={labelClasses} ref={elRef} {...dataAttrs}>
      {inputEl}
      <span className="toggle-icon" />
    </label>
  );
});

Toggle.displayName = 'f7-toggle';

export default Toggle;
