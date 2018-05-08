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
    (() => {
      const self = this;
      self.onFocusBound = self.onFocus.bind(self);
      self.onBlurBound = self.onBlur.bind(self);
      self.onInputBound = self.onInput.bind(self);
      self.onChangeBound = self.onChange.bind(self);
      self.onTextareaResizeBound = self.onTextareaResize.bind(self);
      self.onInputNotEmptyBound = self.onInputNotEmpty.bind(self);
      self.onInputEmptyBound = self.onInputEmpty.bind(self);
      self.onInputClearBound = self.onInputClear.bind(self);
    })();
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
    this.dispatchEvent('input', event);
  }
  onFocus(event) {
    this.dispatchEvent('focus', event);
  }
  onBlur(event) {
    this.dispatchEvent('blur', event);
  }
  onChange(event) {
    this.dispatchEvent('change', event);
  }
  componentWillUnmount() {
    const self = this;
    const {type, resizable, clearButton} = self.props;
    if (type === 'range' || type === 'toggle')
      return;
    const inputEl = self.refs.inputEl;
    if (!inputEl)
      return;
    inputEl.removeEventListener('focus', self.onFocusBound, false);
    inputEl.removeEventListener('blur', self.onBlurBound, false);
    inputEl.removeEventListener('input', self.onInputBound, false);
    inputEl.removeEventListener('change', self.onChangeBound, false);
    inputEl.removeEventListener('input:notempty', self.onInputNotEmptyBound, false);
    if (type === 'textarea' && resizable) {
      inputEl.removeEventListener('textarea:resze', self.onTextareaResizeBound, false);
    }
    if (clearButton) {
      inputEl.removeEventListener('input:empty', self.onInputEmptyBound, false);
      inputEl.removeEventListener('input:clear', self.onInputClearBound, false);
    }
  }
  componentDidUpdate() {
    const self = this;
    const {validate, resizable} = self.props;
    const f7 = self.$f7;
    if (!f7)
      return;
    if (self.updateInputOnDidUpdate) {
      const inputEl = self.refs.inputEl;
      if (!inputEl)
        return;
      self.updateInputOnDidUpdate = false;
      f7.input.checkEmptyState(inputEl);
      if (validate) {
        f7.input.validate(inputEl);
      }
      if (resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    }
  }
  componentDidMount() {
    const self = this;
    self.$f7ready(f7 => {
      const {validate, resizable, type, clearButton} = self.props;
      if (type === 'range' || type === 'toggle')
        return;
      const inputEl = self.refs.inputEl;
      if (!inputEl)
        return;
      inputEl.addEventListener('focus', self.onFocusBound, false);
      inputEl.addEventListener('blur', self.onBlurBound, false);
      inputEl.addEventListener('input', self.onInputBound, false);
      inputEl.addEventListener('change', self.onChangeBound, false);
      inputEl.addEventListener('input:notempty', self.onInputNotEmptyBound, false);
      if (type === 'textarea' && resizable) {
        inputEl.addEventListener('textarea:resze', self.onTextareaResizeBound, false);
      }
      if (clearButton) {
        inputEl.addEventListener('input:empty', self.onInputEmptyBound, false);
        inputEl.addEventListener('input:clear', self.onInputClearBound, false);
      }
      f7.input.checkEmptyState(inputEl);
      if (validate) {
        f7.input.validate(inputEl);
      }
      if (resizable) {
        f7.input.resizeTextarea(inputEl);
      }
    });
  }
  render() {
    const self = this;
    const {type, name, value, placeholder, id, inputId, size, accept, autocomplete, autocorrect, autocapitalize, spellcheck, autofocus, autosave, checked, disabled, max, min, step, maxlength, minlength, multiple, readonly, required, inputStyle, pattern, validate, tabindex, resizable, clearButton, errorMessage, info, wrap, style, className, noStoreData, noFormStoreData} = self.props;
    let inputEl;
    function createInput(tag, children) {
      const InputTag = tag;
      const needsValue = !(type === 'select' || type === 'textarea' || type === 'file');
      const inputClassName = Utils.classNames(type === 'textarea' && resizable && 'resizable', !wrap && className, (noFormStoreData || noStoreData) && 'no-store-data');
      return React.createElement(InputTag, {
        ref: 'inputEl',
        style: inputStyle,
        name: name,
        type: type,
        placeholder: placeholder,
        id: inputId,
        value: needsValue ? value : undefined,
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
        validate: validate,
        tabIndex: tabindex,
        'data-error-message': errorMessage,
        className: inputClassName
      }, children);
    }
    const {
      default: slotsDefault,
      info: slotsInfo
    } = self.slots;
    if (type === 'select' || self.type === 'textarea' || self.type === 'file') {
      if (self.type === 'select') {
        inputEl = createInput('select', slotsDefault);
      } else if (self.type === 'file') {
        inputEl = createInput('input');
      } else {
        inputEl = createInput('textarea', slotsDefault);
      }
    } else if (slotsDefault && slotsDefault.length > 0 || !type) {
      inputEl = slotsDefault;
    } else if (type === 'toggle') {
      inputEl = React.createElement(F7Toggle, {
        checked: checked,
        readOnly: readonly,
        name: name,
        value: value,
        disabled: disabled,
        id: inputId,
        onChange: self.onChangeBound
      });
    } else if (self.type === 'range') {
      inputEl = React.createElement(F7Range, {
        value: value,
        disabled: disabled,
        min: min,
        max: max,
        step: step,
        id: inputId,
        onRangeChange: self.onChangeBound
      });
    } else {
      inputEl = createInput('input');
    }
    if (wrap) {
      const wrapClasses = Utils.classNames(className, 'item-input-wrap', Mixins.colorClasses(self));
      return React.createElement('div', {
        id: id,
        ref: 'wrapEl',
        className: wrapClasses,
        style: style
      }, inputEl, clearButton && React.createElement('span', { className: 'input-clear-button' }), (info || slotsInfo && slotsInfo.length) && React.createElement('div', { className: 'item-input-info' }, info, this.slots['info']));
    }
    return inputEl;
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.value', prevProps, prevState, () => {
      const self = this;
      const {type} = self.props;
      if (type === 'range' || type === 'toggle')
        return;
      const f7 = self.$f7;
      if (!f7)
        return;
      self.updateInputOnDidUpdate = true;
    });
  }
}
__reactComponentSetProps(F7Input, {
  type: String,
  name: String,
  value: [
    String,
    Number,
    Array
  ],
  placeholder: String,
  id: [
    String,
    Number
  ],
  inputId: [
    String,
    Number
  ],
  size: [
    String,
    Number
  ],
  accept: [
    String,
    Number
  ],
  autocomplete: [String],
  autocorrect: [String],
  autocapitalize: [String],
  spellcheck: [String],
  autofocus: Boolean,
  autosave: String,
  checked: Boolean,
  disabled: Boolean,
  max: [
    String,
    Number
  ],
  min: [
    String,
    Number
  ],
  step: [
    String,
    Number
  ],
  maxlength: [
    String,
    Number
  ],
  minlength: [
    String,
    Number
  ],
  multiple: Boolean,
  readonly: Boolean,
  required: Boolean,
  inputStyle: String,
  pattern: String,
  validate: Boolean,
  tabindex: [
    String,
    Number
  ],
  resizable: Boolean,
  clearButton: Boolean,
  noFormStoreData: Boolean,
  noStoreData: Boolean,
  errorMessage: String,
  info: String,
  wrap: {
    type: Boolean,
    default: true
  },
  ...Mixins.colorProps
});
export default F7Input;