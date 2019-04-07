/* eslint import/no-unresolved: ["off"] */
/* eslint import/extensions: ["off"] */
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-list-input',
  props: {
    id: [String, Number],
    style: Object, // phenome-react-line
    className: String, // phenome-react-line
    sortable: Boolean,
    media: String,
    dropdown: {
      type: [String, Boolean],
      default: 'auto',
    },
    wrap: {
      type: Boolean,
      default: true,
    },

    // Inputs
    input: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'text',
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
    inputStyle: [String, Object], // phenome-vue-line
    inputStyle: Object, // phenome-react-line
    /* phenome-react-dts-props
    inputStyle?: React.CSSProperties
    */
    pattern: String,
    validate: [Boolean, String],
    validateOnBlur: Boolean,
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

    // Outline
    outline: Boolean,

    // Label
    label: [String, Number],
    inlineLabel: Boolean,
    floatingLabel: Boolean,

    // Datepicker
    calendarParams: Object,
    colorPickerParams: Object,

    // Colors
    ...Mixins.colorProps,
  },
  state(props) {
    return {
      isSortable: props.sortable,
      inputFocused: false,
      inputInvalid: false,
    };
  },
  render() {
    const self = this;

    const {
      inputFocused,
      inputInvalid,
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
      floatingLabel,
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
      const inputClassName = Utils.classNames(
        {
          resizable: inputType === 'textarea' && resizable,
          'no-store-data': (noFormStoreData || noStoreData || ignoreStoreData),
          'input-invalid': (errorMessage && errorMessageForce) || inputInvalid,
          'input-with-value': inputHasValue,
          'input-focused': inputFocused,
        }
      );
      let input;
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

      if (process.env.COMPILER === 'react') {
        input = (
          <InputTag
            ref="inputEl"
            style={inputStyle}
            name={name}
            type={needsType ? inputType : undefined}
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
            data-validate={validate === true || validate === '' || validateOnBlur === true || validateOnBlur === '' ? true : undefined}
            data-validate-on-blur={validateOnBlur === true || validateOnBlur === '' ? true : undefined}
            tabIndex={tabindex}
            data-error-message={errorMessageForce ? undefined : errorMessage}
            className={inputClassName}
            onFocus={self.onFocus}
            onBlur={self.onBlur}
            onInput={self.onInput}
            onChange={self.onChange}
            {...valueProps}
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
            type={needsType ? inputType : undefined}
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
            data-validate={validate === true || validate === '' || validateOnBlur === true || validateOnBlur === '' ? true : undefined}
            data-validate-on-blur={validateOnBlur === true || validateOnBlur === '' ? true : undefined}
            tabIndex={tabindex}
            data-error-message={errorMessageForce ? undefined : errorMessage}
            className={inputClassName}
            onFocus={self.onFocus}
            onBlur={self.onBlur}
            onInput={self.onInput}
            onChange={self.onChange}
            domProps={{
              disabled,
              readOnly: readonly,
              multiple,
              required,
              ...valueProps,
            }}
          >
            {children}
          </InputTag>
        );
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

    const hasErrorMessage = !!errorMessage || (self.slots['error-message'] && self.slots['error-message'].length);

    const ItemContent = (
      <div ref="itemContentEl" className={Utils.classNames(
        'item-content item-input',
        !wrap && className,
        !wrap && { disabled },
        !wrap && Mixins.colorClasses(props),
        {
          'inline-label': inlineLabel,
          'item-input-outline': outline,
          'item-input-focused': inputFocused,
          'item-input-with-info': !!info || (self.slots.info && self.slots.info.length),
          'item-input-with-value': inputHasValue,
          'item-input-with-error-message': (hasErrorMessage && errorMessageForce) || inputInvalid,
          'item-input-invalid': (hasErrorMessage && errorMessageForce) || inputInvalid,
        }
      )}>
        <slot name="content-start" />

        {(media || self.slots.media) && (
          <div className="item-media">
            {media && (<img src={media} />)}
            <slot name="media"/>
          </div>
        )}
        <div className="item-inner">
          <slot name="inner-start"/>
          {(label || self.slots.label) && (
            <div className={Utils.classNames('item-title item-label', { 'item-floating-label': floatingLabel })}>
              {label}
              <slot name="label"/>
            </div>
          )}
          <div className={Utils.classNames('item-input-wrap', {
            'input-dropdown': dropdown === 'auto' ? type === 'select' : dropdown,
          })}>
            {inputEl}
            <slot name="input" />
            {hasErrorMessage && errorMessageForce && (
              <div className="item-input-error-message">
                {errorMessage}
                <slot name="error-message"/>
              </div>
            )}
            {clearButton && (
              <span className="input-clear-button" />
            )}
            {(info || self.slots.info) && (
              <div className="item-input-info">
                {info}
                <slot name="info"/>
              </div>
            )}
          </div>
          <slot name="inner"/>
          <slot name="inner-end"/>
        </div>
        <slot name="content" />
        <slot name="content-end" />
      </div>
    );
    if (!wrap) {
      return ItemContent;
    }
    return (
      <li ref="el" id={id} style={style} className={Utils.classNames(
        className,
        { disabled },
        Mixins.colorClasses(props),
      )}>
        <slot name="root-start" />
        {ItemContent}
        {isSortable && (<div className="sortable-handler" />)}
        <slot name="root" />
        <slot name="root-end" />
      </li>
    );
  },
  watch: {
    'props.value': function watchValue() {
      const self = this;
      if (!self.$f7) return;
      self.updateInputOnDidUpdate = true;
      if (self.f7Calendar) {
        self.f7Calendar.setValue(self.props.value);
      }
      if (self.f7ColorPicker) {
        self.f7ColorPicker.setValue(self.props.value);
      }
    },
  },
  componentDidCreate() {
    Utils.bindMethods(this, 'onChange onInput onFocus onBlur onTextareaResize onInputNotEmpty onInputEmpty onInputClear'.split(' '));
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    const itemContentEl = self.refs.itemContentEl;
    if (!el && !itemContentEl) return;

    self.$f7ready((f7) => {
      const { validate, validateOnBlur, resizable, value, defaultValue, type, calendarParams, colorPickerParams } = self.props;

      const inputEl = self.refs.inputEl;
      if (!inputEl) return;

      inputEl.addEventListener('input:notempty', self.onInputNotEmpty, false);
      inputEl.addEventListener('textarea:resize', self.onTextareaResize, false);
      inputEl.addEventListener('input:empty', self.onInputEmpty, false);
      inputEl.addEventListener('input:clear', self.onInputClear, false);
      if (type === 'datepicker') {
        self.f7Calendar = f7.calendar.create({
          inputEl,
          value,
          on: {
            change(calendar, calendarValue) {
              self.dispatchEvent('calendar:change calendarChange', calendarValue);
            },
          },
          ...(calendarParams || {}),
        });
      }
      if (type === 'colorpicker') {
        self.f7ColorPicker = f7.colorPicker.create({
          inputEl,
          value,
          on: {
            change(colorPicker, colorPickerValue) {
              self.dispatchEvent('colorpicker:change colorPickerChange', colorPickerValue);
            },
          },
          ...(colorPickerParams || {}),
        });
      }
      if (
        !(validateOnBlur || validateOnBlur === '')
        && (validate || validate === '')
        && (
          (typeof value !== 'undefined' && value !== null && value !== '')
          || (typeof defaultValue !== 'undefined' && defaultValue !== null && defaultValue !== '')
        )
      ) {
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
        isSortable: self.$listEl.hasClass('sortable'),
      });
    }
  },
  componentDidUpdate() {
    const self = this;
    const { $listEl } = self;
    if (!$listEl || ($listEl && $listEl.length === 0)) return;
    const isSortable = $listEl.hasClass('sortable');
    if (isSortable !== self.state.isSortable) {
      self.setState({ isSortable });
    }
    const { validate, validateOnBlur, resizable, type } = self.props;
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
  },
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
  },
  methods: {
    domValue() {
      const self = this;
      const { inputEl } = self.refs;
      if (!inputEl) return undefined;
      return inputEl.value;
    },
    inputHasValue() {
      const self = this;
      const { value } = self.props;
      const domValue = self.domValue();
      return typeof value === 'undefined'
        ? (domValue || domValue === 0)
        : (value || value === 0);
    },
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
      const { validate, validateOnBlur } = self.props;
      self.dispatchEvent('input', event);
      if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && self.refs && self.refs.inputEl) {
        self.validateInput(self.refs.inputEl);
      }
    },
    onFocus(event) {
      this.dispatchEvent('focus', event);
      this.setState({ inputFocused: true });
    },
    onBlur(event) {
      const self = this;
      const { validate, validateOnBlur } = self.props;
      self.dispatchEvent('blur', event);
      if ((validate || validate === '' || validateOnBlur || validateOnBlur === '') && self.refs && self.refs.inputEl) {
        self.validateInput(self.refs.inputEl);
      }
      self.setState({ inputFocused: false });
    },
    onChange(event) {
      this.dispatchEvent('change', event);
    },
  },
};
