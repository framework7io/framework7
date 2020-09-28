import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect';
import { classNames, getExtraAttrs, emit } from '../shared/utils';
import { colorClasses } from '../shared/mixins';
import { f7ready, f7 } from '../shared/f7';
import { watchProp } from '../shared/watch-prop';
import { useTooltip } from '../shared/use-tooltip';

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
  tooltip? : string
  tooltipTrigger? : string
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

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onChange = (event) => {
    emit(props, 'change', event);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7Toggle: () => f7Toggle.current,
  }));

  useTooltip(elRef, props);

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

  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

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
    <label id={id} style={style} className={labelClasses} ref={elRef} {...extraAttrs}>
      {inputEl}
      <span className="toggle-icon" />
    </label>
  );
});

Toggle.displayName = 'f7-toggle';

export default Toggle;
