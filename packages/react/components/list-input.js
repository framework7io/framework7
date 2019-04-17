import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7ListInput extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    this.state = (() => {
      return {
        isSortable: props.sortable,
        inputFocused: false,
        inputInvalid: false
      };
    })();

    (() => {
      Utils.bindMethods(this, 'onChange onInput onFocus onBlur onTextareaResize onInputNotEmpty onInputEmpty onInputClear'.split(' '));
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
    const {
      inputFocused,
      inputInvalid
    } = self.state;
    const props = self.props;
    const {
      id,
      style,
      className,
      sortable,
      media,
      dropdown,
      input: renderInput,
      wrap,
      type,
      name,
      value,
      defaultValue,
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
      tabindex,
      resizable,
      clearButton,
      noFormStoreData,
      noStoreData,
      ignoreStoreData,
      errorMessage,
      errorMessageForce,
      info,
      outline,
      label,
      inlineLabel,
      floatingLabel
    } = props;
    const domValue = self.domValue();
    const inputHasValue = self.inputHasValue();
    const isSortable = sortable || self.state.isSortable;

    const createInput = (InputTag, children) => {
      const needsValue = type !== 'file' && type !== 'datepicker' && type !== 'colorpicker';
      const needsType = InputTag === 'input';
      let inputType = type;

      if (inputType === 'datepicker' || inputType === 'colorpicker') {
        inputType = 'text';
      }

      const inputClassName = Utils.classNames({
        resizable: inputType === 'textarea' && resizable,
        'no-store-data': noFormStoreData || noStoreData || ignoreStoreData,
        'input-invalid': errorMessage && errorMessageForce || inputInvalid,
        'input-with-value': inputHasValue,
        'input-focused': inputFocused
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

    let inputEl;

    if (renderInput) {
      if (type === 'select' || type === 'textarea' || type === 'file') {
        if (type === 'select') {
          inputEl = createInput('select', self.slots.default);
        } else if (type === 'file') {
          inputEl = createInput('input');
        } else {
          inputEl = createInput('textarea');
        }
      } else {
        inputEl = createInput('input');
      }
    }

    const hasErrorMessage = !!errorMessage || self.slots['error-message'] && self.slots['error-message'].length;
    const ItemContent = React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['itemContentEl'] = __reactNode;
      },
      className: Utils.classNames('item-content item-input', !wrap && className, !wrap && {
        disabled
      }, !wrap && Mixins.colorClasses(props), {
        'inline-label': inlineLabel,
        'item-input-outline': outline,
        'item-input-focused': inputFocused,
        'item-input-with-info': !!info || self.slots.info && self.slots.info.length,
        'item-input-with-value': inputHasValue,
        'item-input-with-error-message': hasErrorMessage && errorMessageForce || inputInvalid,
        'item-input-invalid': hasErrorMessage && errorMessageForce || inputInvalid
      })
    }, this.slots['content-start'], (media || self.slots.media) && React.createElement('div', {
      className: 'item-media'
    }, media && React.createElement('img', {
      src: media
    }), this.slots['media']), React.createElement('div', {
      className: 'item-inner'
    }, this.slots['inner-start'], (label || self.slots.label) && React.createElement('div', {
      className: Utils.classNames('item-title item-label', {
        'item-floating-label': floatingLabel
      })
    }, label, this.slots['label']), React.createElement('div', {
      className: Utils.classNames('item-input-wrap', {
        'input-dropdown': dropdown === 'auto' ? type === 'select' : dropdown
      })
    }, inputEl, this.slots['input'], hasErrorMessage && errorMessageForce && React.createElement('div', {
      className: 'item-input-error-message'
    }, errorMessage, this.slots['error-message']), clearButton && React.createElement('span', {
      className: 'input-clear-button'
    }), (info || self.slots.info) && React.createElement('div', {
      className: 'item-input-info'
    }, info, this.slots['info'])), this.slots['inner'], this.slots['inner-end']), this.slots['content'], this.slots['content-end']);

    if (!wrap) {
      return ItemContent;
    }

    return React.createElement('li', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: Utils.classNames(className, {
        disabled
      }, Mixins.colorClasses(props))
    }, this.slots['root-start'], ItemContent, isSortable && React.createElement('div', {
      className: 'sortable-handler'
    }), this.slots['root'], this.slots['root-end']);
  }

  componentWillUnmount() {
    const self = this;
    const inputEl = self.refs.inputEl;
    if (!inputEl) return;
    inputEl.removeEventListener('input:notempty', self.onInputNotEmpty, false);
    inputEl.removeEventListener('textarea:resize', self.onTextareaResize, false);
    inputEl.removeEventListener('input:empty', self.onInputEmpty, false);
    inputEl.removeEventListener('input:clear', self.onInputClear, false);

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
      $listEl
    } = self;
    if (!$listEl || $listEl && $listEl.length === 0) return;
    const isSortable = $listEl.hasClass('sortable');

    if (isSortable !== self.state.isSortable) {
      self.setState({
        isSortable
      });
    }

    const {
      validate,
      validateOnBlur,
      resizable,
      type
    } = self.props;
    const f7 = self.$f7;
    if (!f7) return;

    if (self.updateInputOnDidUpdate) {
      const inputEl = self.refs.inputEl;
      if (!inputEl) return;
      self.updateInputOnDidUpdate = false;

      if (validate && !validateOnBlur) {
        self.validateInput(inputEl);
      }

      if (type === 'textarea' && resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    }
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    const itemContentEl = self.refs.itemContentEl;
    if (!el && !itemContentEl) return;
    self.$f7ready(f7 => {
      const {
        validate,
        validateOnBlur,
        resizable,
        value,
        defaultValue,
        type,
        calendarParams,
        colorPickerParams
      } = self.props;
      const inputEl = self.refs.inputEl;
      if (!inputEl) return;
      inputEl.addEventListener('input:notempty', self.onInputNotEmpty, false);
      inputEl.addEventListener('textarea:resize', self.onTextareaResize, false);
      inputEl.addEventListener('input:empty', self.onInputEmpty, false);
      inputEl.addEventListener('input:clear', self.onInputClear, false);

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

      if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && (typeof value !== 'undefined' && value !== null && value !== '' || typeof defaultValue !== 'undefined' && defaultValue !== null && defaultValue !== '')) {
        setTimeout(() => {
          self.validateInput(inputEl);
        }, 0);
      }

      if (type === 'textarea' && resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    });
    self.$listEl = self.$$(el || itemContentEl).parents('.list, .list-group').eq(0);

    if (self.$listEl.length) {
      self.setState({
        isSortable: self.$listEl.hasClass('sortable')
      });
    }
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

__reactComponentSetProps(F7ListInput, Object.assign({
  id: [String, Number],
  style: Object,
  className: String,
  sortable: Boolean,
  media: String,
  dropdown: {
    type: [String, Boolean],
    default: 'auto'
  },
  wrap: {
    type: Boolean,
    default: true
  },
  input: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'text'
  },
  name: String,
  value: [String, Number, Array, Date, Object],
  defaultValue: [String, Number, Array],
  readonly: Boolean,
  required: Boolean,
  disabled: Boolean,
  placeholder: String,
  inputId: [String, Number],
  size: [String, Number],
  accept: [String, Number],
  autocomplete: [String],
  autocorrect: [String],
  autocapitalize: [String],
  spellcheck: [String],
  autofocus: Boolean,
  autosave: String,
  max: [String, Number],
  min: [String, Number],
  step: [String, Number],
  maxlength: [String, Number],
  minlength: [String, Number],
  multiple: Boolean,
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
  label: [String, Number],
  inlineLabel: Boolean,
  floatingLabel: Boolean,
  calendarParams: Object,
  colorPickerParams: Object
}, Mixins.colorProps));

F7ListInput.displayName = 'f7-list-input';
export default F7ListInput;