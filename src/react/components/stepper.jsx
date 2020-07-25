import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { classNames, getDataAttrs, emit, noUndefinedProps } from '../utils/utils';
import { colorClasses } from '../utils/mixins';
import { f7ready, f7 } from '../utils/f7';
import { watchProp } from '../utils/watch-prop';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  COLOR_PROPS
*/

const Stepper = forwardRef((props, ref) => {
  const f7Stepper = useRef(null);
  const {
    className,
    id,
    style,
    init = true,
    value = 0,
    min = 0,
    max = 100,
    step = 1,
    formatValue,
    name,
    inputId,
    input = true,
    inputType = 'text',
    inputReadonly = false,
    autorepeat = false,
    autorepeatDynamic = false,
    wraps = false,
    manualInputMode = false,
    decimalPoint = 4,
    buttonsEndInputMode = true,
    disabled,
    buttonsOnly,
    round,
    roundMd,
    roundIos,
    roundAurora,
    fill,
    fillMd,
    fillIos,
    fillAurora,
    large,
    largeMd,
    largeIos,
    largeAurora,
    small,
    smallMd,
    smallIos,
    smallAurora,
    raised,
    raisedMd,
    raisedIos,
    raisedAurora,
  } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);

  const increment = () => {
    if (!f7Stepper.current) return;
    f7Stepper.current.increment();
  };
  const decrement = () => {
    if (!f7Stepper.current) return;
    f7Stepper.current.decrement();
  };
  const setValue = (newValue) => {
    if (f7Stepper.current && f7Stepper.current.setValue) f7Stepper.current.setValue(newValue);
  };
  const getValue = () => {
    if (f7Stepper.current && f7Stepper.current.getValue) {
      return f7Stepper.current.getValue();
    }
    return undefined;
  };
  const onInput = (event) => {
    emit(props, 'input', event, f7Stepper.current);
  };
  const onChange = (event) => {
    emit(props, 'change', event, f7Stepper.current);
  };
  const onMinusClick = (event) => {
    emit(props, 'stepperMinusClick', event, f7Stepper.current);
  };
  const onPlusClick = (event) => {
    emit(props, 'stepperPlusClick', event, f7Stepper.current);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7Stepper: f7Stepper.current,
    increment,
    decrement,
    setValue,
    getValue,
  }));

  watchProp(value, (newValue) => {
    if (!f7Stepper.current) return;
    f7Stepper.current.setValue(newValue);
  });

  const onMount = () => {
    f7ready(() => {
      if (!init || !elRef.current) return;
      f7Stepper.current = f7.stepper.create(
        noUndefinedProps({
          el: elRef.current,
          min,
          max,
          value,
          step,
          formatValue,
          autorepeat,
          autorepeatDynamic,
          wraps,
          manualInputMode,
          decimalPoint,
          buttonsEndInputMode,
          on: {
            change(stepper, newValue) {
              emit(props, 'stepperChange', newValue);
            },
          },
        }),
      );
    });
  };

  const onDestroy = () => {
    if (f7Stepper.current && f7Stepper.current.destroy) {
      f7Stepper.current.destroy();
    }
    f7Stepper.current = null;
  };

  useEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  let inputWrapEl;
  let valueEl;
  if (input && !buttonsOnly) {
    const inputEl = (
      <input
        ref="inputEl"
        name={name}
        id={inputId}
        type={inputType}
        min={inputType === 'number' ? min : undefined}
        max={inputType === 'number' ? max : undefined}
        step={inputType === 'number' ? step : undefined}
        onInput={onInput}
        onChange={onChange}
        value={value}
        readOnly={inputReadonly}
      />
    );

    inputWrapEl = <div className="stepper-input-wrap">{inputEl}</div>;
  }
  if (!input && !buttonsOnly) {
    valueEl = <div className="stepper-value">{value}</div>;
  }

  const classes = classNames(
    className,
    'stepper',
    {
      disabled,
      'stepper-round': round,
      'stepper-round-ios': roundIos,
      'stepper-round-md': roundMd,
      'stepper-round-aurora': roundAurora,
      'stepper-fill': fill,
      'stepper-fill-ios': fillIos,
      'stepper-fill-md': fillMd,
      'stepper-fill-aurora': fillAurora,
      'stepper-large': large,
      'stepper-large-ios': largeIos,
      'stepper-large-md': largeMd,
      'stepper-large-aurora': largeAurora,
      'stepper-small': small,
      'stepper-small-ios': smallIos,
      'stepper-small-md': smallMd,
      'stepper-small-aurora': smallAurora,
      'stepper-raised': raised,
      'stepper-raised-ios': raisedIos,
      'stepper-raised-md': raisedMd,
      'stepper-raised-aurora': raisedAurora,
    },
    colorClasses(props),
  );
  return (
    <div ref={elRef} id={id} style={style} className={classes} {...dataAttrs}>
      <div className="stepper-button-minus" onClick={onMinusClick} />
      {inputWrapEl}
      {valueEl}
      <div className="stepper-button-plus" onClick={onPlusClick} />
    </div>
  );
});

Stepper.displayName = 'f7-stepper';

export default Stepper;
