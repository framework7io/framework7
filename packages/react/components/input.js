import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Toggle from './toggle';
import F7Range from './range';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Input extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    this.state = (() => {
      return {
        inputFocused: false,
        inputInvalid: false
      };
    })();

    (() => {
      Utils.bindMethods(this, 'onFocus onBlur onInput onChange onTextareaResize onInputNotEmpty onInputEmpty onInputClear'.split(' '));
    })();
  }

  domValue() {
    const self = this;
    const {
      inputEl
    } = self.refs;
    if (!inputEl) return undefined;
    return inputEl.value;
  }

  inputHasValue() {
    const self = this;
    const {
      value
    } = self.props;
    const domValue = self.domValue();
    return typeof value === 'undefined' ? domValue || domValue === 0 : value || value === 0;
  }

  validateInput(inputEl) {
    const self = this;
    const f7 = self.$f7;
    if (!f7 || !inputEl) return;
    const validity = inputEl.validity;
    if (!validity) return;

    if (!validity.valid) {
      if (self.state.inputInvalid !== true) {
        self.setState({
          inputInvalid: true
        });
      }
    } else if (self.state.inputInvalid !== false) {
      self.setState({
        inputInvalid: false
      });
    }
  }

  onTextareaResize(event) {
    this.dispatchEvent('textarea:resize textareaResize', event);
  }

  onInputNotEmpty(event) {
    this.dispatchEvent('input:notempty inputNotEmpty', event);
  }

  onInputEmpty(event) {
    this.dispatchEvent('input:empty inputEmpty', event);
  }

  onInputClear(event) {
    this.dispatchEvent('input:clear inputClear', event);
  }

  onInput(event) {
    const self = this;
    const {
      validate,
      validateOnBlur
    } = self.props;
    self.dispatchEvent('input', event);

    if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && self.refs && self.refs.inputEl) {
      self.validateInput(self.refs.inputEl);
    }
  }

  onFocus(event) {
    this.dispatchEvent('focus', event);
    this.setState({
      inputFocused: true
    });
  }

  onBlur(event) {
    const self = this;
    const {
      validate,
      validateOnBlur
    } = self.props;
    self.dispatchEvent('blur', event);

    if ((validate || validate === '' || validateOnBlur || validateOnBlur === '') && self.refs && self.refs.inputEl) {
      self.validateInput(self.refs.inputEl);
    }

    self.setState({
      inputFocused: false
    });
  }

  onChange(event) {
    this.dispatchEvent('change', event);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      type,
      name,
      value,
      defaultValue,
      placeholder,
      id,
      inputId,
      size,
      accept,
      autocomplete,
      autocorrect,
      autocapitalize,
      spellcheck,
      autofocus,
      autosave,
      checked,
      disabled,
      max,
      min,
      step,
      maxlength,
      minlength,
      multiple,
      readonly,
      required,
      inputStyle,
      pattern,
      validate,
      validateOnBlur,
      tabindex,
      resizable,
      clearButton,
      errorMessage,
      errorMessageForce,
      info,
      wrap,
      dropdown,
      style,
      className,
      noStoreData,
      noFormStoreData,
      ignoreStoreData,
      outline
    } = props;
    const domValue = self.domValue();
    const inputHasValue = self.inputHasValue();
    let inputEl;

    const createInput = (InputTag, children) => {
      const needsValue = type !== 'file' && type !== 'datepicker' && type !== 'colorpicker';
      const needsType = InputTag === 'input';
      let inputType = type;

      if (inputType === 'datepicker' || inputType === 'colorpicker') {
        inputType = 'text';
      }

      const inputClassName = Utils.classNames(!wrap && className, {
        resizable: inputType === 'textarea' && resizable,
        'no-store-data': noFormStoreData || noStoreData || ignoreStoreData,
        'input-invalid': errorMessage && errorMessageForce || self.state.inputInvalid,
        'input-with-value': inputHasValue,
        'input-focused': self.state.inputFocused
      });
      let input;
      let inputValue;

      if (needsValue) {
        if (typeof value !== 'undefined') inputValue = value;else inputValue = domValue;
      }

      const valueProps = {};

      if (type !== 'datepicker' && type !== 'colorpicker') {
        if ('value' in props) valueProps.value = inputValue;
        if ('defaultValue' in props) valueProps.defaultValue = defaultValue;
      }

      {
        input = React.createElement(InputTag, Object.assign({
          ref: __reactNode => {
            this.__reactRefs['inputEl'] = __reactNode;
          },
          style: inputStyle,
          name: name,
          type: needsType ? inputType : undefined,
          placeholder: placeholder,
          id: inputId,
          size: size,
          accept: accept,
          autoComplete: autocomplete,
          autoCorrect: autocorrect,
          autoCapitalize: autocapitalize,
          spellCheck: spellcheck,
          autoFocus: autofocus,
          autoSave: autosave,
          checked: checked,
          disabled: disabled,
          max: max,
          maxLength: maxlength,
          min: min,
          minLength: minlength,
          step: step,
          multiple: multiple,
          readOnly: readonly,
          required: required,
          pattern: pattern,
          validate: typeof validate === 'string' && validate.length ? validate : undefined,
          'data-validate': validate === true || validate === '' || validateOnBlur === true || validateOnBlur === '' ? true : undefined,
          'data-validate-on-blur': validateOnBlur === true || validateOnBlur === '' ? true : undefined,
          tabIndex: tabindex,
          'data-error-message': errorMessageForce ? undefined : errorMessage,
          className: inputClassName,
          onFocus: self.onFocus,
          onBlur: self.onBlur,
          onInput: self.onInput,
          onChange: self.onChange
        }, valueProps), children);
      }
      return input;
    };

    const {
      default: slotsDefault,
      info: slotsInfo
    } = self.slots;

    if (type === 'select' || type === 'textarea' || type === 'file') {
      if (type === 'select') {
        inputEl = createInput('select', slotsDefault);
      } else if (type === 'file') {
        inputEl = createInput('input');
      } else {
        inputEl = createInput('textarea');
      }
    } else if (slotsDefault && slotsDefault.length > 0 || !type) {
      inputEl = slotsDefault;
    } else if (type === 'toggle') {
      inputEl = React.createElement(F7Toggle, {
        checked: checked,
        readonly: readonly,
        name: name,
        value: value,
        disabled: disabled,
        id: inputId,
        onChange: self.onChange
      });
    } else if (type === 'range') {
      inputEl = React.createElement(F7Range, {
        value: value,
        disabled: disabled,
        min: min,
        max: max,
        step: step,
        name: name,
        id: inputId,
        input: true,
        onRangeChange: self.onChange
      });
    } else {
      inputEl = createInput('input');
    }

    if (wrap) {
      const wrapClasses = Utils.classNames(className, 'input', {
        'input-outline': outline,
        'input-dropdown': dropdown === 'auto' ? type === 'select' : dropdown
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        ref: __reactNode => {
          this.__reactRefs['wrapEl'] = __reactNode;
        },
        className: wrapClasses,
        style: style
      }, inputEl, errorMessage && errorMessageForce && React.createElement('div', {
        className: 'input-error-message'
      }, errorMessage), clearButton && React.createElement('span', {
        className: 'input-clear-button'
      }), (info || slotsInfo && slotsInfo.length) && React.createElement('div', {
        className: 'input-info'
      }, info, this.slots['info']));
    }

    return inputEl;
  }

  componentWillUnmount() {
    const self = this;
    const {
      type,
      resizable,
      clearButton
    } = self.props;
    if (type === 'range' || type === 'toggle') return;
    const inputEl = self.refs.inputEl;
    if (!inputEl) return;
    inputEl.removeEventListener('input:notempty', self.onInputNotEmpty, false);

    if (type === 'textarea' && resizable) {
      inputEl.removeEventListener('textarea:resize', self.onTextareaResize, false);
    }

    if (clearButton) {
      inputEl.removeEventListener('input:empty', self.onInputEmpty, false);
      inputEl.removeEventListener('input:clear', self.onInputClear, false);
    }

    if (self.f7Calendar && self.f7Calendar.destroy) {
      self.f7Calendar.destroy();
    }

    if (self.f7ColorPicker && self.f7ColorPicker.destroy) {
      self.f7ColorPicker.destroy();
    }

    delete self.f7Calendar;
    delete self.f7ColorPicker;
  }

  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.value', prevProps, prevState, () => {
      const self = this;
      const {
        type
      } = self.props;
      if (type === 'range' || type === 'toggle') return;
      if (!self.$f7) return;
      self.updateInputOnDidUpdate = true;

      if (self.f7Calendar) {
        self.f7Calendar.setValue(self.props.value);
      }

      if (self.f7ColorPicker) {
        self.f7ColorPicker.setValue(self.props.value);
      }
    });

    const self = this;
    const {
      validate,
      validateOnBlur,
      resizable
    } = self.props;
    const f7 = self.$f7;
    if (!f7) return;

    if (self.updateInputOnDidUpdate) {
      const inputEl = self.refs.inputEl;
      if (!inputEl) return;
      self.updateInputOnDidUpdate = false;
      f7.input.checkEmptyState(inputEl);

      if (validate && !validateOnBlur) {
        self.validateInput(inputEl);
      }

      if (resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    }
  }

  componentDidMount() {
    const self = this;
    self.$f7ready(f7 => {
      const {
        validate,
        validateOnBlur,
        resizable,
        type,
        clearButton,
        value,
        defaultValue,
        calendarParams,
        colorPickerParams
      } = self.props;
      if (type === 'range' || type === 'toggle') return;
      const inputEl = self.refs.inputEl;
      if (!inputEl) return;
      inputEl.addEventListener('input:notempty', self.onInputNotEmpty, false);

      if (type === 'textarea' && resizable) {
        inputEl.addEventListener('textarea:resize', self.onTextareaResize, false);
      }

      if (clearButton) {
        inputEl.addEventListener('input:empty', self.onInputEmpty, false);
        inputEl.addEventListener('input:clear', self.onInputClear, false);
      }

      if (type === 'datepicker') {
        self.f7Calendar = f7.calendar.create(Object.assign({
          inputEl,
          value,
          on: {
            change(calendar, calendarValue) {
              self.dispatchEvent('calendar:change calendarChange', calendarValue);
            }

          }
        }, calendarParams || {}));
      }

      if (type === 'colorpicker') {
        self.f7ColorPicker = f7.colorPicker.create(Object.assign({
          inputEl,
          value,
          on: {
            change(colorPicker, colorPickerValue) {
              self.dispatchEvent('colorpicker:change colorPickerChange', colorPickerValue);
            }

          }
        }, colorPickerParams || {}));
      }

      f7.input.checkEmptyState(inputEl);

      if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && (typeof value !== 'undefined' && value !== null && value !== '' || typeof defaultValue !== 'undefined' && defaultValue !== null && defaultValue !== '')) {
        setTimeout(() => {
          self.validateInput(inputEl);
        }, 0);
      }

      if (resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    });
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

__reactComponentSetProps(F7Input, Object.assign({
  type: String,
  name: String,
  value: [String, Number, Array, Date, Object],
  defaultValue: [String, Number, Array],
  placeholder: String,
  id: [String, Number],
  className: String,
  style: Object,
  inputId: [String, Number],
  size: [String, Number],
  accept: [String, Number],
  autocomplete: [String],
  autocorrect: [String],
  autocapitalize: [String],
  spellcheck: [String],
  autofocus: Boolean,
  autosave: String,
  checked: Boolean,
  disabled: Boolean,
  max: [String, Number],
  min: [String, Number],
  step: [String, Number],
  maxlength: [String, Number],
  minlength: [String, Number],
  multiple: Boolean,
  readonly: Boolean,
  required: Boolean,
  inputStyle: Object,
  pattern: String,
  validate: [Boolean, String],
  validateOnBlur: Boolean,
  tabindex: [String, Number],
  resizable: Boolean,
  clearButton: Boolean,
  noFormStoreData: Boolean,
  noStoreData: Boolean,
  ignoreStoreData: Boolean,
  errorMessage: String,
  errorMessageForce: Boolean,
  info: String,
  outline: Boolean,
  wrap: {
    type: Boolean,
    default: true
  },
  dropdown: {
    type: [String, Boolean],
    default: 'auto'
  },
  calendarParams: Object,
  colorPickerParams: Object
}, Mixins.colorProps));

F7Input.displayName = 'f7-input';
export default F7Input;