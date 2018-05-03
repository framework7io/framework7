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
    placeholder: String,
    id: String,
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
    inputStyle: String,
    pattern: String,
    validate: Boolean,
    tabindex: [String, Number],
    resizable: Boolean,
    clearButton: Boolean,

    // Error, Info
    errorMessage: String,
    info: String,

    // Components
    wrap: {
      type: Boolean,
      default: true,
    },
    ...Mixins.colorProps,
  },

  render() {
    const self = this;

    const {
      type,
      name,
      value,
      placeholder,
      id,
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
      info,
      wrap,
      style,
      className,
    } = self.props;

    let inputEl;

    function renderInput(tag, children) {
      const InputTag = tag;
      const needsValue = !(type === 'select' || type === 'textarea' || type === 'file');
      const inputClassName = Utils.classNames(
        (type === 'textarea' && resizable ? 'resizable' : ''),
        (!wrap && className),
      );
      return (
        <InputTag
          ref="inputEl"
          style={inputStyle}
          name={name}
          type={type}
          placeholder={placeholder}
          id={id}
          value={needsValue ? value : undefined}
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
          validate={validate}
          tabIndex={tabindex}
          data-error-message={errorMessage}
          className={inputClassName}
        >
          {children}
        </InputTag>
      );
    }

    const { default: slotsDefault, info: slotsInfo } = self.slots;
    if (type === 'select' || self.type === 'textarea' || self.type === 'file') {
      if (self.type === 'select') {
        inputEl = renderInput('select', slotsDefault);
      } else if (self.type === 'file') {
        inputEl = renderInput('input');
      } else {
        inputEl = renderInput('textarea', slotsDefault);
      }
    } else if ((slotsDefault && slotsDefault.length > 0) || !type) {
      inputEl = slotsDefault;
    } else if (type === 'toggle') {
      inputEl = <F7Toggle checked={checked} readOnly={readonly} name={name} value={value} disabled={disabled} onChange={self.onChangeBound} />;
    } else if (self.type === 'range') {
      inputEl = <F7Range value={value} disabled={disabled} min={min} max={max} step={step} onRangeChange={self.onChangeBound} />;
    } else {
      inputEl = renderInput('input');
    }

    let clearButtonEl;
    if (clearButton) {
      clearButtonEl = <span className="input-clear-button" />;
    }

    /*
    TODO: force parent info
    let $parent = self.$parent;
    let foundItemContent;
    while ($parent && !foundItemContent) {
      const tag = $parent.$vnode && $parent.$vnode.tag;
      if (tag && (tag.indexOf('list-item') > 0 || tag.indexOf('list-item-content') > 0)) {
        foundItemContent = $parent;
      }
      $parent = $parent.$parent;
    }
    if (foundItemContent) foundItemContent.itemInputForced = true;
    if (foundItemContent && (self.info || (self.$slots.info && self.$slots.info.length))) foundItemContent.itemInputWithInfoForced = true;
    */

    let infoEl;
    if (info || (slotsInfo && slotsInfo.length)) {
      infoEl = (
        <div className="item-input-info">
          {info}
          <slot name="info" />
        </div>
      );
    }
    if (wrap) {
      const wrapClasses = Utils.classNames(
        className,
        'item-input-wrap',
        Mixins.colorClasses(self),
      );
      return (
        <div ref="wrapEl" className={wrapClasses} style={style}>
          {inputEl}
          {clearButtonEl}
          {infoEl}
        </div>
      );
    }
    return inputEl;
  },
  watch: {
    'props.value': function watchValue() {
      const self = this;
      const {
        type,
      } = self.props;

      if (type === 'range' || type === 'toggle') return;

      const f7 = self.$f7;
      if (!f7) return;

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
      const { validate, resizable, type } = self.props;
      if (type === 'range' || type === 'toggle') return;

      const inputEl = self.refs.inputEl;
      if (!inputEl) return;

      inputEl.addEventListener('focus', self.onFocusBound, false);
      inputEl.addEventListener('blur', self.onBlurBound, false);
      inputEl.addEventListener('input', self.onInputBound, false);
      inputEl.addEventListener('change', self.onChangeBound, false);
      inputEl.addEventListener('textarea:resze', self.onTextareaResizeBound, false);
      inputEl.addEventListener('input:notempty', self.onInputNotEmptyBound, false);
      inputEl.addEventListener('input:empty', self.onInputEmptyBound, false);
      inputEl.addEventListener('input:clear', self.onInputClearBound, false);

      f7.input.checkEmptyState(inputEl);
      if (validate) {
        f7.input.validate(inputEl);
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
        f7.input.validate(inputEl);
      }
      if (resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    }
  },
  componentWillUnmount() {
    const self = this;

    const { type } = self.props;
    if (type === 'range' || type === 'toggle') return;

    const inputEl = self.refs.inputEl;
    if (!inputEl) return;

    inputEl.removeEventListener('focus', self.onFocusBound, false);
    inputEl.removeEventListener('blur', self.onBlurBound, false);
    inputEl.removeEventListener('input', self.onInputBound, false);
    inputEl.removeEventListener('change', self.onChangeBound, false);
    inputEl.removeEventListener('textarea:resze', self.onTextareaResizeBound, false);
    inputEl.removeEventListener('input:notempty', self.onInputNotEmptyBound, false);
    inputEl.removeEventListener('input:empty', self.onInputEmptyBound, false);
    inputEl.removeEventListener('input:clear', self.onInputClearBound, false);
  },

  methods: {
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
      this.dispatchEvent('input', event);
    },
    onFocus(event) {
      this.dispatchEvent('focus', event);
    },
    onBlur(event) {
      this.dispatchEvent('blur', event);
    },
    onChange(event) {
      this.dispatchEvent('change', event);
    },
  },
};
