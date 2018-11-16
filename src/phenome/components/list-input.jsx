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
    tag: {
      type: String,
      default: 'li',
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
    value: [String, Number, Array],
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

    // Label
    label: [String, Number],
    inlineLabel: Boolean,
    floatingLabel: Boolean,
    // Colors
    ...Mixins.colorProps,
  },
  state(props) {
    const { value, defaultValue } = props;
    return {
      isSortable: props.sortable,
      inputFocused: false,
      inputInvalid: false,
      currentInputValue: typeof value === 'undefined' ? defaultValue : value,
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
      input: renderInput,
      tag,
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
      tabindex,
      resizable,
      clearButton,
      noFormStoreData,
      noStoreData,
      ignoreStoreData,
      errorMessage,
      errorMessageForce,
      info,
      label,
      inlineLabel,
      floatingLabel,

    } = props;

    const isSortable = sortable || self.state.isSortable;

    const createInput = (tag, children) => {
      const InputTag = tag;
      const needsValue = type !== 'file';
      const needsType = tag === 'input';
      const inputClassName = Utils.classNames(
        {
          resizable: type === 'textarea' && resizable,
          'no-store-data': (noFormStoreData || noStoreData || ignoreStoreData),
          'input-invalid': (errorMessage && errorMessageForce) || inputInvalid,
          'input-with-value': self.inputHasValue,
          'input-focused': inputFocused,
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

    const ItemTag = tag;
    return (
      <ItemTag ref="el" id={id} style={style} className={Utils.classNames(
        className,
        { disabled },
        Mixins.colorClasses(props),
      )}>
        <slot name="root-start" />
        <div className={Utils.classNames(
          'item-content item-input',
          {
            'inline-label': inlineLabel,
            'item-input-focused': inputFocused,
            'item-input-with-info': !!info || (self.slots.info && self.slots.info.length),
            'item-input-with-value': self.inputHasValue,
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
              'input-dropdown': type === 'select',
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
        {isSortable && (<div className="sortable-handler" />)}
        <slot name="root" />
        <slot name="root-end" />
      </ItemTag>
    );
  },
  computed: {
    inputHasValue() {
      const self = this;
      const { value } = self.props;
      const { currentInputValue } = self.state;
      return typeof value === 'undefined'
        ? (currentInputValue)
        : (value || value === 0);
    },
  },
  watch: {
    'props.value': function watchValue() {
      const self = this;
      const { value } = self.props;
      if (!self.$f7) return;
      self.setState({ currentInputValue: value });
      self.updateInputOnDidUpdate = true;
    },
  },
  componentDidCreate() {
    const self = this;
    self.onChangeBound = self.onChange.bind(self);
    self.onInputBound = self.onInput.bind(self);
    self.onFocusBound = self.onFocus.bind(self);
    self.onBlurBound = self.onBlur.bind(self);
    self.onTextareaResizeBound = self.onTextareaResize.bind(self);
    self.onInputNotEmptyBound = self.onInputNotEmpty.bind(self);
    self.onInputEmptyBound = self.onInputEmpty.bind(self);
    self.onInputClearBound = self.onInputClear.bind(self);
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;

    self.$f7ready((f7) => {
      const { validate, resizable, value, defaultValue, type } = self.props;

      const inputEl = self.refs.inputEl;
      if (!inputEl) return;

      inputEl.addEventListener('input:notempty', self.onInputNotEmptyBound, false);
      inputEl.addEventListener('textarea:resze', self.onTextareaResizeBound, false);
      inputEl.addEventListener('input:empty', self.onInputEmptyBound, false);
      inputEl.addEventListener('input:clear', self.onInputClearBound, false);

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
      if (type === 'textarea' && resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    });

    self.$listEl = self.$$(el).parents('.list, .list-group').eq(0);
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
    const { validate, resizable, type } = self.props;
    const f7 = self.$f7;
    if (!f7) return;
    if (self.updateInputOnDidUpdate) {
      const inputEl = self.refs.inputEl;
      if (!inputEl) return;
      self.updateInputOnDidUpdate = false;
      if (validate) {
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

    inputEl.removeEventListener('input:notempty', self.onInputNotEmptyBound, false);
    inputEl.removeEventListener('textarea:resze', self.onTextareaResizeBound, false);
    inputEl.removeEventListener('input:empty', self.onInputEmptyBound, false);
    inputEl.removeEventListener('input:clear', self.onInputClearBound, false);
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
