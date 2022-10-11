import React, { forwardRef, useRef, useImperativeHandle, useState, useContext } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { classNames, getExtraAttrs, emit, getSlots, extend } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';

import TextEditor from './text-editor.js';
import { watchProp } from '../shared/watch-prop.js';
import { ListContext } from '../shared/list-context.js';

/* dts-imports
import { Calendar, ColorPicker, TextEditor } from 'framework7/types';
*/
/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  sortable? : boolean
  media? : string
  dropdown? : string | boolean
  wrap? : boolean
  input? : boolean
  type? : string
  name? : string
  value? : string | number | Array<any> | Date | Object
  defaultValue? : string | number | Array<any>
  inputmode? : string
  readonly? : boolean
  required? : boolean
  disabled? : boolean
  placeholder? : string
  inputId? : string | number
  size? : string | number
  accept? : string | number
  autocomplete? : string
  autocorrect? : string
  autocapitalize? : string
  spellcheck? : string
  autofocus? : boolean
  autosave? : string
  max? : string | number
  min? : string | number
  step? : string | number
  maxlength? : string | number
  minlength? : string | number
  multiple? : boolean
  inputStyle?: React.CSSProperties;
  pattern? : string
  validate? : boolean | string
  validateOnBlur? : boolean
  onValidate? : Function
  tabindex? : string | number
  resizable? : boolean
  clearButton? : boolean
  noFormStoreData? : boolean
  noStoreData? : boolean
  ignoreStoreData? : boolean
  errorMessage? : string
  errorMessageForce? : boolean
  info? : string
  outline? : boolean
  label? : string | number
  floatingLabel? : boolean
  calendarParams? : Calendar.Parameters;
  colorPickerParams? : ColorPicker.Parameters;
  textEditorParams? : TextEditor.Parameters;
  COLOR_PROPS
  onCalendarChange? : (calendarValue?: any) => void
  onColorPickerChange? : (colorPickerValue?: any) => void
  onTextareaResize? : (event?: any) => void
  onInputNotEmpty? : (event?: any) => void
  onInputEmpty? : (event?: any) => void
  onInputClear? : (event?: any) => void
  onInput? : (...args: any[]) => void
  onFocus? : (...args: any[]) => void
  onBlur? : (...args: any[]) => void
  onChange? : (...args: any[]) => void
  onTextEditorChange? : (...args: any[]) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const ListInput = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    sortable,
    media,
    dropdown = 'auto',
    wrap = true,

    // Inputs
    input: renderInput = true,
    type = 'text',
    name,
    value,
    defaultValue,
    inputmode,
    readonly,
    required,
    disabled,
    placeholder,
    inputId,
    size,
    accept,
    autocomplete,
    autocorrect,
    autocapitalize,
    spellcheck,
    autofocus,
    autosave,
    max,
    min,
    step,
    maxlength,
    minlength,
    multiple,
    inputStyle,
    pattern,
    validate,
    validateOnBlur,
    onValidate,
    tabindex,
    resizable,
    clearButton,

    // Form
    noFormStoreData,
    noStoreData,
    ignoreStoreData,

    // Error, Info
    errorMessage,
    errorMessageForce,
    info,

    // Outline
    outline,

    // Label
    label,
    floatingLabel,

    // Datepicker
    calendarParams,
    // Colorpicker
    colorPickerParams,
    // Text editor
    textEditorParams,
  } = props;

  const [inputInvalid, setInputInvalid] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const listContext = useContext(ListContext);

  const { listIsSortable = false } = listContext || {};

  const extraAttrs = getExtraAttrs(props);

  const f7Calendar = useRef(null);
  const f7ColorPicker = useRef(null);
  const elRef = useRef(null);
  const inputElRef = useRef(null);
  const itemContentElRef = useRef(null);
  const updateInputOnDidUpdate = useRef(false);

  const getDomValue = () => {
    if (!inputElRef.current) return undefined;
    return inputElRef.current.value;
  };

  const isInputHasValue = () => {
    if (type === 'datepicker' && Array.isArray(value) && value.length === 0) {
      return false;
    }
    const domValue = getDomValue();
    return typeof value === 'undefined' ? domValue || domValue === 0 : value || value === 0;
  };

  const validateInput = () => {
    if (!f7 || !inputElRef.current) return;
    const validity = inputElRef.current.validity;
    if (!validity) return;
    if (!validity.valid) {
      if (onValidate) onValidate(false);
      if (inputInvalid !== true) {
        setInputInvalid(true);
      }
    } else {
      if (onValidate) onValidate(true);
      if (inputInvalid !== false) {
        setInputInvalid(false);
      }
    }
  };

  const onTextareaResize = (event) => {
    emit(props, 'textareaResize', event);
  };
  const onInputNotEmpty = (event) => {
    emit(props, 'inputNotEmpty', event);
  };
  const onInputEmpty = (event) => {
    emit(props, 'inputEmpty', event);
  };
  const onInputClear = (event) => {
    emit(props, 'inputClear', event);
  };
  const onInput = (...args) => {
    emit(props, 'input', ...args);
    if (
      !(validateOnBlur || validateOnBlur === '') &&
      (validate || validate === '') &&
      inputElRef.current
    ) {
      validateInput(inputElRef.current);
    }
  };
  const onFocus = (...args) => {
    emit(props, 'focus', ...args);
    setInputFocused(true);
  };
  const onBlur = (...args) => {
    emit(props, 'blur', ...args);
    if (
      (validate || validate === '' || validateOnBlur || validateOnBlur === '') &&
      inputElRef.current
    ) {
      validateInput(inputElRef.current);
    }
    setInputFocused(false);
  };
  const onChange = (...args) => {
    emit(props, 'change', ...args);
    if (type === 'texteditor') {
      emit(props, 'textEditorChange', args[0]);
    }
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const onMount = () => {
    if (!elRef.current && !itemContentElRef.current) return;

    f7ready(() => {
      if (!inputElRef.current) return;

      inputElRef.current.addEventListener('input:notempty', onInputNotEmpty, false);
      inputElRef.current.addEventListener('textarea:resize', onTextareaResize, false);
      inputElRef.current.addEventListener('input:empty', onInputEmpty, false);
      inputElRef.current.addEventListener('input:clear', onInputClear, false);

      if (type === 'datepicker') {
        f7Calendar.current = f7.calendar.create({
          inputEl: inputElRef.current,
          value,
          on: {
            change(calendar, calendarValue) {
              emit(props, 'calendarChange', calendarValue);
            },
          },
          ...(calendarParams || {}),
        });
      }
      if (type === 'colorpicker') {
        f7ColorPicker.current = f7.colorPicker.create({
          inputEl: inputElRef.current,
          value,
          on: {
            change(colorPicker, colorPickerValue) {
              emit(props, 'colorpicker:change colorPickerChange', colorPickerValue);
            },
          },
          ...(colorPickerParams || {}),
        });
      }
      if (
        !(validateOnBlur || validateOnBlur === '') &&
        (validate || validate === '') &&
        ((typeof value !== 'undefined' && value !== null && value !== '') ||
          (typeof defaultValue !== 'undefined' && defaultValue !== null && defaultValue !== ''))
      ) {
        setTimeout(() => {
          validateInput();
        }, 0);
      }
      if (type === 'textarea' && resizable) {
        f7.input.resizeTextarea(inputElRef.current);
      }
    });
  };

  const onDestroy = () => {
    if (inputElRef.current) {
      inputElRef.current.removeEventListener('input:notempty', onInputNotEmpty, false);
      inputElRef.current.removeEventListener('textarea:resize', onTextareaResize, false);
      inputElRef.current.removeEventListener('input:empty', onInputEmpty, false);
      inputElRef.current.removeEventListener('input:clear', onInputClear, false);
    }

    if (f7Calendar.current && f7Calendar.current.destroy) {
      f7Calendar.current.destroy();
      f7Calendar.current = null;
    }
    if (f7ColorPicker.current && f7ColorPicker.current.destroy) {
      f7ColorPicker.current.destroy();
      f7ColorPicker.current = null;
    }
  };

  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!f7) return;
    if (updateInputOnDidUpdate.current) {
      if (!inputElRef.current) return;
      updateInputOnDidUpdate.current = false;
      if (validate && !validateOnBlur) {
        validateInput();
      }
      if (type === 'textarea' && resizable) {
        f7.input.resizeTextarea(inputElRef.current);
      }
    }
  });

  watchProp(colorPickerParams, (newValue) => {
    if (!f7 || !f7ColorPicker.current) return;
    extend(f7ColorPicker.current.params, newValue || {});
  });

  watchProp(calendarParams, (newValue) => {
    if (!f7 || !f7Calendar.current) return;
    extend(f7Calendar.current.params, newValue || {});
  });

  watchProp(value, (newValue) => {
    if (!f7) return;
    updateInputOnDidUpdate.current = true;
    if (f7Calendar.current) {
      f7Calendar.current.setValue(newValue);
    }
    if (f7ColorPicker.current) {
      f7ColorPicker.current.setValue(newValue);
    }
  });

  const slots = getSlots(props);

  const domValue = getDomValue();

  const inputHasValue = isInputHasValue();

  const isSortableComputed = sortable === true || sortable === false ? sortable : listIsSortable;

  let inputEl;

  const createInput = (InputTag, children) => {
    const needsValue = type !== 'file' && type !== 'datepicker' && type !== 'colorpicker';
    const needsType = InputTag === 'input';
    let inputType = type;
    if (inputType === 'datepicker' || inputType === 'colorpicker') {
      inputType = 'text';
    }
    const inputClassName = classNames({
      resizable: inputType === 'textarea' && resizable,
      'no-store-data': noFormStoreData || noStoreData || ignoreStoreData,
      'input-invalid': (errorMessage && errorMessageForce) || inputInvalid,
      'input-with-value': inputHasValue,
      'input-focused': inputFocused,
    });
    let inputValue;
    if (needsValue) {
      if (typeof value !== 'undefined') inputValue = value;
      else inputValue = domValue;
    }
    const valueProps = {};
    if (type !== 'datepicker' && type !== 'colorpicker') {
      if ('value' in props) valueProps.value = inputValue;
      if ('defaultValue' in props) valueProps.defaultValue = defaultValue;
    }
    return (
      <InputTag
        ref={inputElRef}
        style={inputStyle}
        name={name}
        type={needsType ? inputType : undefined}
        placeholder={placeholder}
        inputMode={inputmode}
        id={inputId}
        size={size}
        accept={accept}
        autoComplete={autocomplete}
        autoCorrect={autocorrect}
        autoCapitalize={autocapitalize}
        spellCheck={spellcheck}
        autoFocus={autofocus}
        autoSave={autosave}
        disabled={disabled}
        max={max}
        maxLength={maxlength}
        min={min}
        minLength={minlength}
        step={step}
        multiple={multiple}
        readOnly={readonly}
        required={required}
        pattern={pattern}
        validate={typeof validate === 'string' && validate.length ? validate : undefined}
        data-validate={
          validate === true || validate === '' || validateOnBlur === true || validateOnBlur === ''
            ? true
            : undefined
        }
        data-validate-on-blur={validateOnBlur === true || validateOnBlur === '' ? true : undefined}
        tabIndex={tabindex}
        data-error-message={errorMessageForce ? undefined : errorMessage}
        className={inputClassName}
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onInput}
        onChange={onChange}
        {...valueProps}
      >
        {children}
      </InputTag>
    );
  };

  if (renderInput) {
    if (type === 'select' || type === 'textarea' || type === 'file') {
      if (type === 'select') {
        inputEl = createInput('select', slots.default);
      } else if (type === 'file') {
        inputEl = createInput('input');
      } else {
        inputEl = createInput('textarea');
      }
    } else if (type === 'texteditor') {
      inputEl = (
        <TextEditor
          value={value}
          resizable={resizable}
          placeholder={placeholder}
          onTextEditorFocus={onFocus}
          onTextEditorBlur={onBlur}
          onTextEditorInput={onInput}
          onTextEditorChange={onChange}
          {...(textEditorParams || {})}
        />
      );
    } else {
      inputEl = createInput('input');
    }
  }

  const hasErrorMessage =
    !!errorMessage || (slots['error-message'] && slots['error-message'].length);

  const ItemContent = (
    <div
      ref={itemContentElRef}
      className={classNames(
        'item-content item-input',
        !wrap && className,
        !wrap && { disabled },
        !wrap && colorClasses(props),
        {
          'item-input-outline': outline,
          'item-input-focused': inputFocused,
          'item-input-with-info': !!info || (slots.info && slots.info.length),
          'item-input-with-value': inputHasValue,
          'item-input-with-error-message': (hasErrorMessage && errorMessageForce) || inputInvalid,
          'item-input-invalid': (hasErrorMessage && errorMessageForce) || inputInvalid,
        },
      )}
    >
      {slots['content-start']}

      {(media || slots.media) && (
        <div className="item-media">
          {media && <img src={media} />}
          {slots.media}
        </div>
      )}
      <div className="item-inner">
        {slots['inner-start']}
        {(label || slots.label) && (
          <div
            className={classNames('item-title item-label', {
              'item-floating-label': floatingLabel,
            })}
          >
            {label}
            {slots.label}
          </div>
        )}
        <div
          className={classNames('item-input-wrap', {
            'input-dropdown': dropdown === 'auto' ? type === 'select' : dropdown,
          })}
        >
          {inputEl}
          {slots.input}
          {hasErrorMessage && errorMessageForce && (
            <div className="item-input-error-message">
              {errorMessage}
              {slots['error-message']}
            </div>
          )}
          {clearButton && <span className="input-clear-button" />}
          {(info || slots.info) && (
            <div className="item-input-info">
              {info}
              {slots.info}
            </div>
          )}
        </div>
        {slots.inner}
        {slots['inner-end']}
      </div>
      {slots.content}
      {slots['content-end']}
    </div>
  );
  if (!wrap) {
    return ItemContent;
  }
  return (
    <li
      ref={elRef}
      id={id}
      style={style}
      className={classNames(className, { disabled }, colorClasses(props))}
      {...extraAttrs}
    >
      {slots['root-start']}
      {ItemContent}
      {isSortableComputed && <div className="sortable-handler" />}
      {slots.root}
      {slots['root-end']}
    </li>
  );
});

ListInput.displayName = 'f7-list-input';

export default ListInput;
