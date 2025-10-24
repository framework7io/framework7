import React, { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';
import { watchProp } from '../shared/watch-prop.js';
import { useTooltip } from '../shared/use-tooltip.js';
import { setRef } from '../shared/set-ref.js';
/* dts-imports
import { Toggle } from 'framework7/types';
*/
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
  ref?: React.MutableRefObject<{el: HTMLElement | null; f7Toggle: () => Toggle.Toggle;}>;
  children?: React.ReactNode;
*/

const Toggle = (props) => {
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
    ref,
  } = props;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  const inputElRef = useRef(null);

  const onChange = (event) => {
    emit(props, 'change', event);
  };

  useTooltip(elRef, props);

  watchProp(checked, (newValue) => {
    if (!f7Toggle.current) return;
    f7Toggle.current.checked = newValue;
  });

  const onToggleChange = (toggleInstance) => {
    emit(props, 'toggleChange', toggleInstance.checked);
  };

  const toggleEvents = (method) => {
    if (!f7Toggle.current) return;
    f7Toggle.current[method]('toggleChange', onToggleChange);
  };

  const onMount = () => {
    f7ready(() => {
      if (!init || !elRef.current) return;
      f7Toggle.current = f7.toggle.create({ el: elRef.current });
      toggleEvents('on');
    });
  };

  const onDestroy = () => {
    if (f7Toggle.current && f7Toggle.current.destroy && f7Toggle.current.$el) {
      f7Toggle.current.destroy();
    }
    f7Toggle.current = null;
  };

  useIsomorphicLayoutEffect(() => {
    toggleEvents('on');
    if (inputElRef.current) {
      inputElRef.current.addEventListener('change', onChange);
    }
    return () => {
      toggleEvents('off');
      if (inputElRef.current) {
        inputElRef.current.removeEventListener('change', onChange);
      }
    };
  });

  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  const labelClasses = classNames('toggle', className, { disabled }, colorClasses(props));

  return (
    <label
      id={id}
      style={style}
      className={labelClasses}
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el, { f7Toggle: () => f7Toggle.current });
      }}
      {...extraAttrs}
    >
      <input
        ref={inputElRef}
        type="checkbox"
        name={name}
        disabled={disabled}
        readOnly={readonly}
        checked={checked}
        defaultChecked={defaultChecked}
        value={value}
        onChange={() => {}}
      />
      <span className="toggle-icon" />
    </label>
  );
};

Toggle.displayName = 'f7-toggle';

export default Toggle;
