import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { classNames, getExtraAttrs, emit, noUndefinedProps } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';
import { watchProp } from '../shared/watch-prop.js';

/* dts-imports
import { Stepper } from 'framework7/types';
*/
/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  init? : boolean
  value? : number
  min? : number
  max? : number
  step? : number
  formatValue? : Function
  name? : string
  inputId? : string
  input? : boolean
  inputType? : string
  inputReadonly? : boolean
  autorepeat? : boolean
  autorepeatDynamic? : boolean
  wraps? : boolean
  manualInputMode? : boolean
  decimalPoint? : number
  buttonsEndInputMode? : boolean
  disabled? : boolean
  buttonsOnly? : boolean
  round? : boolean
  roundMd? : boolean
  roundIos? : boolean
  fill? : boolean
  fillMd? : boolean
  fillIos? : boolean
  large? : boolean
  largeMd? : boolean
  largeIos? : boolean
  small? : boolean
  smallMd? : boolean
  smallIos? : boolean
  raised? : boolean
  raisedMd? : boolean
  raisedIos? : boolean
  COLOR_PROPS
  onStepperChange? : (newValue?: any) => void
  onInput? : (event?: any, stepper?: Stepper.Stepper) => void
  onChange? : (event?: any, stepper?: Stepper.Stepper) => void
  onStepperMinusClick? : (event?: any, stepper?: Stepper.Stepper) => void
  onStepperPlusClick? : (event?: any, stepper?: Stepper.Stepper) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null; f7Stepper: () => Stepper.Stepper;}>;
  children?: React.ReactNode;
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
    fill,
    fillMd,
    fillIos,
    large,
    largeMd,
    largeIos,
    small,
    smallMd,
    smallIos,
    raised,
    raisedMd,
    raisedIos,
  } = props;
  const extraAttrs = getExtraAttrs(props);

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
    f7Stepper: () => f7Stepper.current,
    increment,
    decrement,
    setValue,
    getValue,
  }));

  watchProp(value, (newValue) => {
    if (!f7Stepper.current) return;
    f7Stepper.current.setValue(newValue);
  });

  const onStepperChange = (stepper, newValue) => {
    emit(props, 'stepperChange', newValue);
  };

  const stepperEvents = (method) => {
    if (!f7Stepper.current) return;
    f7Stepper.current[method]('change', onStepperChange);
  };

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
        }),
      );
      stepperEvents('on');
    });
  };

  const onDestroy = () => {
    if (f7Stepper.current && f7Stepper.current.destroy) {
      f7Stepper.current.destroy();
    }
    f7Stepper.current = null;
  };

  useIsomorphicLayoutEffect(() => {
    stepperEvents('on');
    return () => {
      stepperEvents('off');
    };
  });

  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  let inputWrapEl;
  let valueEl;
  if (input && !buttonsOnly) {
    const inputEl = (
      <input
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
      'stepper-fill': fill,
      'stepper-fill-ios': fillIos,
      'stepper-fill-md': fillMd,
      'stepper-large': large,
      'stepper-large-ios': largeIos,
      'stepper-large-md': largeMd,
      'stepper-small': small,
      'stepper-small-ios': smallIos,
      'stepper-small-md': smallMd,
      'stepper-raised': raised,
      'stepper-raised-ios': raisedIos,
      'stepper-raised-md': raisedMd,
    },
    colorClasses(props),
  );
  return (
    <div ref={elRef} id={id} style={style} className={classes} {...extraAttrs}>
      <div className="stepper-button-minus" onClick={onMinusClick} />
      {inputWrapEl}
      {valueEl}
      <div className="stepper-button-plus" onClick={onPlusClick} />
    </div>
  );
});

Stepper.displayName = 'f7-stepper';

export default Stepper;
