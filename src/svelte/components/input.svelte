<script>
  import { createEventDispatcher, onMount, afterUpdate, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';
  import hasSlots from '../utils/has-slots';
  import Toggle from './toggle.svelte';
  import Range from './range.svelte';
  import TextEditor from './text-editor.svelte';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let type = undefined;
  export let name = undefined;
  export let value = undefined;
  export let placeholder = undefined;
  export let inputId = undefined;
  export let size = undefined;
  export let accept = undefined;
  export let autocomplete = undefined;
  export let autocorrect = undefined;
  export let autocapitalize = undefined;
  export let spellcheck = undefined;
  export let autofocus = undefined;
  export let autosave = undefined;
  export let checked = undefined;
  export let disabled = undefined;
  export let max = undefined;
  export let min = undefined;
  export let step = undefined;
  export let maxlength = undefined;
  export let minlength = undefined;
  export let multiple = undefined;
  export let readonly = undefined;
  export let required = undefined;
  export let inputStyle = undefined;
  export let pattern = undefined;
  export let validate = undefined;
  export let validateOnBlur = undefined;
  export let tabindex = undefined;
  export let resizable = undefined;
  export let clearButton = undefined;

  // Form
  export let noFormStoreData = undefined;
  export let noStoreData = undefined;
  export let ignoreStoreData = undefined;

  // Error, Info
  export let errorMessage = undefined;
  export let errorMessageForce = undefined;
  export let info = undefined;

  // Outline
  export let outline = undefined;

  // Components
  export let wrap = true;
  export let dropdown = 'auto';

  // Datepicker
  export let calendarParams = undefined;
  // Colorpciker
  export let colorPickerParams = undefined;
  // Text editor
  export let textEditorParams = undefined;


  // State
  let inputEl;
  let inputFocused = false;
  let inputInvalid = false;
  let updateInputOnDidUpdate = false;
  let f7Calendar;
  let f7ColorPicker;

  function domValue() {
    if (!inputEl) return undefined;
    return inputEl.value;
  }

  function inputHasValue() {
    if (type === 'datepicker' && Array.isArray(value) && value.length === 0) {
      return false;
    }
    const domV = domValue();
    return typeof value === 'undefined'
      ? (domV || domV === 0)
      : (value || value === 0);
  }

  function validateInput() {
    if (!f7.instance || !inputEl) return;
    const validity = inputEl.validity;
    if (!validity) return;

    if (!validity.valid) {
      if (inputInvalid !== true) {
        inputInvalid = true;
      }
    } else if (inputInvalid !== false) {
      inputInvalid = false;
    }
  }

  let initialWatched = false;
  function watchValue() {
    if (!initialWatched) {
      initialWatched = true;
      return;
    }
    if (type === 'range' || type === 'toggle') return;
    if (!f7.instance) return;
    updateInputOnDidUpdate = true;
    if (f7Calendar) {
      f7Calendar.setValue(value);
    }
    if (f7ColorPicker) {
      f7ColorPicker.setValue(value);
    }
  }

  $: watchValue(value);

  $: inputType = type === 'datepicker' || type === 'colorpicker'
    ? 'text'
    : type;

  $: needsValue = type !== 'file' && type !== 'datepicker' && type !== 'colorpicker';

  $: inputValue = (() => {
    let v;
    if (typeof value !== 'undefined') {
      v = value;
    } else {
      v = domValue();
    }
    if (typeof v === 'undefined' || v === null) return '';
    return v;
  })();

  $: classes = Utils.classNames(
    !wrap && className,
    {
      resizable: inputType === 'textarea' && resizable,
      'no-store-data': (noFormStoreData || noStoreData || ignoreStoreData),
      'input-invalid': (errorMessage && errorMessageForce) || inputInvalid,
      'input-with-value': inputHasValue,
      'input-focused': inputFocused,
    }
  );

  $: wrapClasses = Utils.classNames(
    className,
    'input',
    {
      'input-outline': outline,
      'input-dropdown': dropdown === 'auto' ? type === 'select' : dropdown,
    },
    Mixins.colorClasses($$props),
  );

  $: inputClassName = Utils.classNames(
    !wrap && className,
    {
      resizable: inputType === 'textarea' && resizable,
      'no-store-data': (noFormStoreData || noStoreData || ignoreStoreData),
      'input-invalid': (errorMessage && errorMessageForce) || inputInvalid,
      'input-with-value': inputHasValue,
      'input-focused': inputFocused,
    }
  );

  // eslint-disable-next-line
  $: hasInfoSlots = hasSlots(arguments, 'info');

  function onTextareaResize(event) {
    dispatch('textareaResize', [event]);
    if (typeof $$props.onTextareaResize === 'function') $$props.onTextareaResize(event);
  }

  function onInputNotEmpty(event) {
    dispatch('inputNotEmpty', [event]);
    if (typeof $$props.onInputNotEmpty === 'function') $$props.onInputNotEmpty(event);
  }

  function onInputEmpty(event) {
    dispatch('inputEmpty', [event]);
    if (typeof $$props.onInputEmpty === 'function') $$props.onInputEmpty(event);
  }

  function onInputClear(event) {
    dispatch('inputClear', [event]);
    if (typeof $$props.onInputClear === 'function') $$props.onInputClear(event);
  }

  function onInput(...args) {
    dispatch('input', [...args]);
    if (typeof $$props.onInput === 'function') $$props.onInput(...args);
    if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && inputEl) {
      validateInput(inputEl);
    }
  }

  function onFocus(...args) {
    dispatch('focus', [...args]);
    if (typeof $$props.onFocus === 'function') $$props.onFocus(...args);
    inputFocused = true;
  }

  function onBlur(...args) {
    dispatch('blur', [...args]);
    if (typeof $$props.onBlur === 'function') $$props.onBlur(...args);
    if ((validate || validate === '' || validateOnBlur || validateOnBlur === '') && inputEl) {
      validateInput();
    }
    inputFocused = false;
  }

  function onChange(...args) {
    dispatch('change', [...args]);
    if (typeof $$props.onChange === 'function') $$props.onChange(...args);
    if (type === 'texteditor') {
      dispatch('textEditorChange', [args[1]]);
    }
  }

  onMount(() => {
    f7.ready(() => {
      if (type === 'range' || type === 'toggle') return;
      if (!inputEl) return;

      inputEl.addEventListener('input:notempty', onInputNotEmpty, false);
      if (type === 'textarea' && resizable) {
        inputEl.addEventListener('textarea:resize', onTextareaResize, false);
      }
      if (clearButton) {
        inputEl.addEventListener('input:empty', onInputEmpty, false);
        inputEl.addEventListener('input:clear', onInputClear, false);
      }

      if (type === 'datepicker') {
        f7Calendar = f7.instance.calendar.create({
          inputEl,
          value,
          on: {
            change(calendar, calendarValue) {
              dispatch('calendarChange', [calendarValue]);
              if (typeof $$props.onCalendarChange === 'function') $$props.onCalendarChange(calendarValue);
            },
          },
          ...(calendarParams || {}),
        });
      }
      if (type === 'colorpicker') {
        f7ColorPicker = f7.instance.colorPicker.create({
          inputEl,
          value,
          on: {
            change(colorPicker, colorPickerValue) {
              dispatch('colorpickerChange', [colorPickerValue]);
              if (typeof $$props.onColorpickerChange === 'function') $$props.onColorpickerChange(colorPickerValue);
            },
          },
          ...(colorPickerParams || {}),
        });
      }

      f7.instance.input.checkEmptyState(inputEl);
      if (
        !(validateOnBlur || validateOnBlur === '')
        && (validate || validate === '')
        && (typeof value !== 'undefined' && value !== null && value !== '')
      ) {
        setTimeout(() => {
          validateInput();
        }, 0);
      }
      if (resizable) {
        f7.instance.input.resizeTextarea(inputEl);
      }
    });
  });

  afterUpdate(() => {
    if (!f7.instance) return;
    if (updateInputOnDidUpdate) {
      if (!inputEl) return;
      updateInputOnDidUpdate = false;
      f7.instance.input.checkEmptyState(inputEl);
      if (validate && !validateOnBlur) {
        validateInput();
      }
      if (resizable) {
        f7.instance.input.resizeTextarea(inputEl);
      }
    }
  });

  onDestroy(() => {
    if (type === 'range' || type === 'toggle') return;
    if (!inputEl) return;
    inputEl.removeEventListener('input:notempty', onInputNotEmpty, false);
    if (type === 'textarea' && resizable) {
      inputEl.removeEventListener('textarea:resize', onTextareaResize, false);
    }
    if (clearButton) {
      inputEl.removeEventListener('input:empty', onInputEmpty, false);
      inputEl.removeEventListener('input:clear', onInputClear, false);
    }

    if (f7Calendar && f7Calendar.destroy) {
      f7Calendar.destroy();
    }
    if (f7ColorPicker && f7ColorPicker.destroy) {
      f7ColorPicker.destroy();
    }
    f7Calendar = null;
    f7ColorPicker = null;
  });

</script>
<!-- svelte-ignore a11y-autofocus -->
{#if wrap}
  <div id={id} class={wrapClasses} style={style}>
    {#if type === 'select'}
      <select
        bind:this={inputEl}
        style={inputStyle}
        name={name}
        placeholder={placeholder}
        id={inputId}
        size={size}
        accept={accept}
        autocomplete={autocomplete}
        autocorrect={autocorrect}
        autocapitalize={autocapitalize}
        spellcheck={spellcheck}
        autofocus={autofocus}
        autosave={autosave}
        checked={checked}
        disabled={disabled}
        max={max}
        maxlength={maxlength}
        min={min}
        minlength={minlength}
        step={step}
        multiple={multiple}
        readonly={readonly}
        required={required}
        pattern={pattern}
        validate={typeof validate === 'string' && validate.length ? validate : undefined}
        data-validate={validate === true || validate === '' || validateOnBlur === true || validateOnBlur === '' ? true : undefined}
        data-validate-on-blur={validateOnBlur === true || validateOnBlur === '' ? true : undefined}
        tabindex={tabindex}
        data-error-message={errorMessageForce ? undefined : errorMessage}
        class={inputClassName}
        on:focus={onFocus}
        on:blur={onBlur}
        on:input={onInput}
        on:change={onChange}
        value={inputValue}
      >
        <slot />
      </select>
    {:else if type === 'textarea'}
      <textarea
        bind:this={inputEl}
        style={inputStyle}
        name={name}
        placeholder={placeholder}
        id={inputId}
        size={size}
        accept={accept}
        autocomplete={autocomplete}
        autocorrect={autocorrect}
        autocapitalize={autocapitalize}
        spellcheck={spellcheck}
        autofocus={autofocus}
        autosave={autosave}
        checked={checked}
        disabled={disabled}
        max={max}
        maxlength={maxlength}
        min={min}
        minlength={minlength}
        step={step}
        multiple={multiple}
        readonly={readonly}
        required={required}
        pattern={pattern}
        validate={typeof validate === 'string' && validate.length ? validate : undefined}
        data-validate={validate === true || validate === '' || validateOnBlur === true || validateOnBlur === '' ? true : undefined}
        data-validate-on-blur={validateOnBlur === true || validateOnBlur === '' ? true : undefined}
        tabindex={tabindex}
        data-error-message={errorMessageForce ? undefined : errorMessage}
        class={inputClassName}
        on:focus={onFocus}
        on:blur={onBlur}
        on:input={onInput}
        on:change={onChange}
        value={inputValue}
      />
    {:else if type === 'toggle'}
      <Toggle
        checked={checked}
        readonly={readonly}
        name={name}
        value={value}
        disabled={disabled}
        id={inputId}
        on:change={onChange}
      />
    {:else if type === 'range'}
      <Range
        value={value}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        name={name}
        id={inputId}
        input={true}
        on:rangeChange={onChange}
      />
    {:else if type === 'texteditor'}
      <TextEditor
        value={typeof value === 'undefined' ? '' : value}
        resizable={resizable}
        placeholder={placeholder}
        on:textEditorFocus={onFocus}
        on:textEditorBlur={onBlur}
        on:textEditorInput={onInput}
        on:textEditorChange={onChange}
        {...textEditorParams}
      />
    {:else}
      <input
        bind:this={inputEl}
        style={inputStyle}
        name={name}
        type={inputType}
        placeholder={placeholder}
        id={inputId}
        size={size}
        accept={accept}
        autocomplete={autocomplete}
        autocorrect={autocorrect}
        autocapitalize={autocapitalize}
        spellcheck={spellcheck}
        autofocus={autofocus}
        autosave={autosave}
        checked={checked}
        disabled={disabled}
        max={max}
        maxlength={maxlength}
        min={min}
        minlength={minlength}
        step={step}
        multiple={multiple}
        readonly={readonly}
        required={required}
        pattern={pattern}
        validate={typeof validate === 'string' && validate.length ? validate : undefined}
        data-validate={validate === true || validate === '' || validateOnBlur === true || validateOnBlur === '' ? true : undefined}
        data-validate-on-blur={validateOnBlur === true || validateOnBlur === '' ? true : undefined}
        tabIndex={tabindex}
        data-error-message={errorMessageForce ? undefined : errorMessage}
        class={inputClassName}
        on:focus={onFocus}
        on:blur={onBlur}
        on:input={onInput}
        on:change={onChange}
        value={type === 'datepicker' || type === 'colorpicker' || type === 'file' ? '' : inputValue}
      />
    {/if}
    {#if errorMessage && errorMessageForce}
      <div class="input-error-message">{errorMessage}</div>
    {/if}
    {#if clearButton}
      <span class="input-clear-button" />
    {/if}
    {#if (info || hasInfoSlots)}
      <div class="input-info">
        {info}
        <slot name="info" />
      </div>
    {/if}
  </div>
{:else}
  {#if type === 'select'}
    <select
      bind:this={inputEl}
      style={inputStyle}
      name={name}
      placeholder={placeholder}
      id={inputId}
      size={size}
      accept={accept}
      autocomplete={autocomplete}
      autocorrect={autocorrect}
      autocapitalize={autocapitalize}
      spellcheck={spellcheck}
      autofocus={autofocus}
      autosave={autosave}
      checked={checked}
      disabled={disabled}
      max={max}
      maxlength={maxlength}
      min={min}
      minlength={minlength}
      step={step}
      multiple={multiple}
      readonly={readonly}
      required={required}
      pattern={pattern}
      validate={typeof validate === 'string' && validate.length ? validate : undefined}
      data-validate={validate === true || validate === '' || validateOnBlur === true || validateOnBlur === '' ? true : undefined}
      data-validate-on-blur={validateOnBlur === true || validateOnBlur === '' ? true : undefined}
      tabindex={tabindex}
      data-error-message={errorMessageForce ? undefined : errorMessage}
      class={inputClassName}
      on:focus={onFocus}
      on:blur={onBlur}
      on:input={onInput}
      on:change={onChange}
      value={inputValue}
    >
      <slot />
    </select>
  {:else if type === 'textarea'}
    <textarea
      bind:this={inputEl}
      style={inputStyle}
      name={name}
      placeholder={placeholder}
      id={inputId}
      size={size}
      accept={accept}
      autocomplete={autocomplete}
      autocorrect={autocorrect}
      autocapitalize={autocapitalize}
      spellcheck={spellcheck}
      autofocus={autofocus}
      autosave={autosave}
      checked={checked}
      disabled={disabled}
      max={max}
      maxlength={maxlength}
      min={min}
      minlength={minlength}
      step={step}
      multiple={multiple}
      readonly={readonly}
      required={required}
      pattern={pattern}
      validate={typeof validate === 'string' && validate.length ? validate : undefined}
      data-validate={validate === true || validate === '' || validateOnBlur === true || validateOnBlur === '' ? true : undefined}
      data-validate-on-blur={validateOnBlur === true || validateOnBlur === '' ? true : undefined}
      tabindex={tabindex}
      data-error-message={errorMessageForce ? undefined : errorMessage}
      class={inputClassName}
      on:focus={onFocus}
      on:blur={onBlur}
      on:input={onInput}
      on:change={onChange}
      value={inputValue}
    />
  {:else if type === 'toggle'}
    <Toggle
      checked={checked}
      readonly={readonly}
      name={name}
      value={value}
      disabled={disabled}
      id={inputId}
      on:change={onChange}
    />
  {:else if type === 'range'}
    <Range
      value={value}
      disabled={disabled}
      min={min}
      max={max}
      step={step}
      name={name}
      id={inputId}
      input={true}
      on:rangeChange={onChange}
    />
  {:else if type === 'texteditor'}
    <TextEditor
      value={typeof value === 'undefined' ? '' : value}
      resizable={resizable}
      placeholder={placeholder}
      on:textEditorFocus={onFocus}
      on:textEditorBlur={onBlur}
      on:textEditorInput={onInput}
      on:textEditorChange={onChange}
      {...textEditorParams}
    />
  {:else}
    <input
      bind:this={inputEl}
      style={inputStyle}
      name={name}
      type={inputType}
      placeholder={placeholder}
      id={inputId}
      size={size}
      accept={accept}
      autocomplete={autocomplete}
      autocorrect={autocorrect}
      autocapitalize={autocapitalize}
      spellcheck={spellcheck}
      autofocus={autofocus}
      autosave={autosave}
      checked={checked}
      disabled={disabled}
      max={max}
      maxlength={maxlength}
      min={min}
      minlength={minlength}
      step={step}
      multiple={multiple}
      readonly={readonly}
      required={required}
      pattern={pattern}
      validate={typeof validate === 'string' && validate.length ? validate : undefined}
      data-validate={validate === true || validate === '' || validateOnBlur === true || validateOnBlur === '' ? true : undefined}
      data-validate-on-blur={validateOnBlur === true || validateOnBlur === '' ? true : undefined}
      tabIndex={tabindex}
      data-error-message={errorMessageForce ? undefined : errorMessage}
      class={inputClassName}
      on:focus={onFocus}
      on:blur={onBlur}
      on:input={onInput}
      on:change={onChange}
      value={type === 'datepicker' || type === 'colorpicker' || type === 'file' ? '' : inputValue}
    />
  {/if}
{/if}
