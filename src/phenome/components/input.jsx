import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

import F7Toggle from './toggle';
import F7Range from './range';

export default {
  name: 'f7-input',
  props: {
    // Inputs
    type: String,
    name: String,
    value: [String, Number, Array],
    defaultValue: [String, Number, Array],
    placeholder: String,
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
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
    inputStyle: [String, Object], // phenome-vue-line
    inputStyle: Object, // phenome-react-line
    /* phenome-react-dts-props
    inputStyle?: React.CSSProperties
    */
    pattern: String,
    validate: [Boolean, String],
    tabindex: [String, Number],
    resizable: Boolean,
    clearButton: Boolean,

    // Form
    noFormStoreData: Boolean,
    noStoreData: Boolean,
    ignoreStoreData: Boolean,

    // Error, Info
    errorMessage: String,
    errorMessageForce: Boolean,
    info: String,

    // Components
    wrap: {
      type: Boolean,
      default: true,
    },
    ...Mixins.colorProps,
  },
  state(props) {
    const { value, defaultValue } = props;
    return {
      inputFocused: false,
      inputInvalid: false,
      currentInputValue: typeof value === 'undefined' ? defaultValue : value,
    };
  },

  computed: {
    inputWithValue() {
      const self = this;
      const { value } = self.props;
      const { currentInputValue } = self.state;
      return typeof value === 'undefined'
        ? (currentInputValue)
        : (value || value === 0);
    },
  },

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
      tabindex,
      resizable,
      clearButton,
      errorMessage,
      errorMessageForce,
      info,
      wrap,
      style,
      className,
      noStoreData,
      noFormStoreData,
      ignoreStoreData,
    } = props;

    let inputEl;

    const createInput = (tag, children) => {
      const InputTag = tag;
      const needsValue = type !== 'file';
      const needsType = tag === 'input';
      const inputClassName = Utils.classNames(
        !wrap && className,
        {
          resizable: type === 'textarea' && resizable,
          'no-store-data': (noFormStoreData || noStoreData || ignoreStoreData),
          'input-invalid': (errorMessage && errorMessageForce) || self.state.inputInvalid,
          'input-with-value': self.inputWithValue,
          'input-focused': self.state.inputFocused,
        }
      );
      let input;
      if (process.env.COMPILER === 'react') {
        input = (
          <InputTag
            ref="inputEl"
            style={inputStyle}
            name={name}
            type={needsType ? type : undefined}
            placeholder={placeholder}
            id={inputId}
            value={needsValue ? value : undefined}
            defaultValue={defaultValue}
            size={size}
            accept={accept}
            autoComplete={autocomplete}
            autoCorrect={autocorrect}
            autoCapitalize={autocapitalize}
            spellCheck={spellcheck}
            autoFocus={autofocus}
            autoSave={autosave}
            checked={checked}
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
            data-validate={validate === true || validate === '' ? true : undefined}
            tabIndex={tabindex}
            data-error-message={errorMessageForce ? undefined : errorMessage}
            className={inputClassName}
            onFocus={self.onFocusBound}
            onBlur={self.onBlurBound}
            onInput={self.onInputBound}
            onChange={self.onChangeBound}
          >
            {children}
          </InputTag>
        );
      }
      if (process.env.COMPILER === 'vue') {
        input = (
          <InputTag
            ref="inputEl"
            style={inputStyle}
            name={name}
            type={needsType ? type : undefined}
            placeholder={placeholder}
            id={inputId}
            size={size}
            accept={accept}
            autoComplete={autocomplete}
            autoCorrect={autocorrect}
            autoCapitalize={autocapitalize}
            spellCheck={spellcheck}
            autoFocus={autofocus}
            autoSave={autosave}
            max={max}
            maxLength={maxlength}
            min={min}
            minLength={minlength}
            step={step}
            pattern={pattern}
            validate={typeof validate === 'string' && validate.length ? validate : undefined}
            data-validate={validate === true || validate === '' ? true : undefined}
            tabIndex={tabindex}
            data-error-message={errorMessageForce ? undefined : errorMessage}
            className={inputClassName}
            onFocus={self.onFocusBound}
            onBlur={self.onBlurBound}
            onInput={self.onInputBound}
            onChange={self.onChangeBound}
            domProps={{
              value: needsValue ? value || self.state.currentInputValue : undefined,
              checked,
              disabled,
              readOnly: readonly,
              multiple,
              required,
            }}
          >
            {children}
          </InputTag>
        );
      }
      return input;
    };

    const { default: slotsDefault, info: slotsInfo } = self.slots;
    if (type === 'select' || type === 'textarea' || type === 'file') {
      if (type === 'select') {
        inputEl = createInput('select', slotsDefault);
      } else if (type === 'file') {
        inputEl = createInput('input');
      } else {
        inputEl = createInput('textarea');
      }
    } else if ((slotsDefault && slotsDefault.length > 0) || !type) {
      inputEl = slotsDefault;
    } else if (type === 'toggle') {
      inputEl = (
        <F7Toggle
          checked={checked}
          readonly={readonly}
          name={name}
          value={value}
          disabled={disabled}
          id={inputId}
          onChange={self.onChangeBound}
        />
      );
    } else if (type === 'range') {
      inputEl = (
        <F7Range
          value={value}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          name={name}
          id={inputId}
          input={true}
          onRangeChange={self.onChangeBound}
        />
      );
    } else {
      inputEl = createInput('input');
    }

    if (wrap) {
      const wrapClasses = Utils.classNames(
        className,
        'item-input-wrap',
        Mixins.colorClasses(props),
      );
      return (
        <div id={id} ref="wrapEl" className={wrapClasses} style={style}>
          {inputEl}
          {errorMessage && errorMessageForce && (
            <div className="item-input-error-message">{errorMessage}</div>
          )}
          {clearButton && (
            <span className="input-clear-button" />
          )}
          {(info || (slotsInfo && slotsInfo.length)) && (
            <div className="item-input-info">
              {info}
              <slot name="info" />
            </div>
          )}
        </div>
      );
    }
    return inputEl;
  },
  watch: {
    'props.value': function watchValue() {
      const self = this;
      const { type, value } = self.props;

      if (type === 'range' || type === 'toggle') return;

      if (!self.$f7) return;

      self.setState({ currentInputValue: value });

      self.updateInputOnDidUpdate = true;
    },
  },
  componentDidCreate() {
    const self = this;
    self.onFocusBound = self.onFocus.bind(self);
    self.onBlurBound = self.onBlur.bind(self);
    self.onInputBound = self.onInput.bind(self);
    self.onChangeBound = self.onChange.bind(self);
    self.onTextareaResizeBound = self.onTextareaResize.bind(self);
    self.onInputNotEmptyBound = self.onInputNotEmpty.bind(self);
    self.onInputEmptyBound = self.onInputEmpty.bind(self);
    self.onInputClearBound = self.onInputClear.bind(self);
  },
  componentDidMount() {
    const self = this;
    self.$f7ready((f7) => {
      const { validate, resizable, type, clearButton, value, defaultValue } = self.props;
      if (type === 'range' || type === 'toggle') return;

      const inputEl = self.refs.inputEl;
      if (!inputEl) return;

      inputEl.addEventListener('input:notempty', self.onInputNotEmptyBound, false);
      if (type === 'textarea' && resizable) {
        inputEl.addEventListener('textarea:resze', self.onTextareaResizeBound, false);
      }
      if (clearButton) {
        inputEl.addEventListener('input:empty', self.onInputEmptyBound, false);
        inputEl.addEventListener('input:clear', self.onInputClearBound, false);
      }

      f7.input.checkEmptyState(inputEl);
      if (
        (validate || validate === '') && (
          (typeof value !== 'undefined' && value !== null && value !== '')
          || (typeof defaultValue !== 'undefined' && defaultValue !== null && defaultValue !== '')
        )
      ) {
        setTimeout(() => {
          self.validateInput(inputEl);
        }, 0);
      }
      if (resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    });
  },
  componentDidUpdate() {
    const self = this;
    const { validate, resizable } = self.props;
    const f7 = self.$f7;
    if (!f7) return;
    if (self.updateInputOnDidUpdate) {
      const inputEl = self.refs.inputEl;
      if (!inputEl) return;
      self.updateInputOnDidUpdate = false;
      f7.input.checkEmptyState(inputEl);
      if (validate) {
        self.validateInput(inputEl);
      }
      if (resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    }
  },
  componentWillUnmount() {
    const self = this;

    const { type, resizable, clearButton } = self.props;
    if (type === 'range' || type === 'toggle') return;

    const inputEl = self.refs.inputEl;
    if (!inputEl) return;

    inputEl.removeEventListener('input:notempty', self.onInputNotEmptyBound, false);

    if (type === 'textarea' && resizable) {
      inputEl.removeEventListener('textarea:resze', self.onTextareaResizeBound, false);
    }
    if (clearButton) {
      inputEl.removeEventListener('input:empty', self.onInputEmptyBound, false);
      inputEl.removeEventListener('input:clear', self.onInputClearBound, false);
    }
  },
  methods: {
    validateInput(inputEl) {
      const self = this;
      const f7 = self.$f7;
      if (!f7 || !inputEl) return;
      const validity = inputEl.validity;
      if (!validity) return;

      if (!validity.valid) {
        if (self.state.inputInvalid !== true) {
          self.setState({ inputInvalid: true });
        }
      } else if (self.state.inputInvalid !== false) {
        self.setState({ inputInvalid: false });
      }
    },
    onTextareaResize(event) {
      this.dispatchEvent('textarea:resize textareaResize', event);
    },
    onInputNotEmpty(event) {
      this.dispatchEvent('input:notempty inputNotEmpty', event);
    },
    onInputEmpty(event) {
      this.dispatchEvent('input:empty inputEmpty', event);
    },
    onInputClear(event) {
      this.dispatchEvent('input:clear inputClear', event);
    },
    onInput(event) {
      const self = this;
      const { validate } = self.props;
      self.dispatchEvent('input', event);
      if ((validate || validate === '') && self.refs && self.refs.inputEl) {
        self.validateInput(self.refs.inputEl);
      }
      self.setState({ currentInputValue: event.target.value });
    },
    onFocus(event) {
      this.dispatchEvent('focus', event);
      this.setState({ inputFocused: true });
    },
    onBlur(event) {
      const self = this;
      const { validate } = self.props;
      self.dispatchEvent('blur', event);
      if ((validate || validate === '') && self.refs && self.refs.inputEl) {
        self.validateInput(self.refs.inputEl);
      }
      self.setState({ inputFocused: false });
    },
    onChange(event) {
      this.dispatchEvent('change', event);
    },
  },
};
