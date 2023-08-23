<script>
  import { createEventDispatcher, onMount, afterUpdate, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { app, f7ready } from '../shared/f7.js';
  import Toggle from './toggle.svelte';
  import Range from './range.svelte';
  import TextEditor from './text-editor.svelte';

  const emit = createEmitter(createEventDispatcher, $$props);

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
  export let onValidate = undefined;
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
  // Colorpicker
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
    return typeof value === 'undefined' ? domV || domV === 0 : value || value === 0;
  }

  function validateInput() {
    if (!app.f7 || !inputEl) return;
    const validity = inputEl.validity;
    if (!validity) return;

    if (!validity.valid) {
      if (onValidate) onValidate(false);
      if (inputInvalid !== true) {
        inputInvalid = true;
      }
    } else {
      if (onValidate) onValidate(true);
      if (inputInvalid !== false) {
        inputInvalid = false;
      }
    }
  }

  let initialWatched = false;
  function watchValue() {
    if (!initialWatched) {
      initialWatched = true;
      return;
    }
    if (type === 'range' || type === 'toggle') return;
    if (!app.f7) return;
    updateInputOnDidUpdate = true;
    if (f7Calendar) {
      f7Calendar.setValue(value);
    }
    if (f7ColorPicker) {
      f7ColorPicker.setValue(value);
    }
  }

  $: watchValue(value);

  $: inputType = type === 'datepicker' || type === 'colorpicker' ? 'text' : type;

  // eslint-disable-next-line
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

  $: wrapClasses = classNames(
    className,
    'input',
    {
      'input-outline': outline,
      'input-dropdown': dropdown === 'auto' ? type === 'select' : dropdown,
      'input-invalid': (errorMessage && errorMessageForce) || inputInvalid,
    },
    colorClasses($$props),
  );

  $: inputClassName = classNames(!wrap && className, {
    resizable: inputType === 'textarea' && resizable,
    'no-store-data': noFormStoreData || noStoreData || ignoreStoreData,
    'input-invalid': (errorMessage && errorMessageForce) || inputInvalid,
    'input-with-value': inputHasValue(),
    'input-focused': inputFocused,
  });

  // eslint-disable-next-line
  $: hasInfoSlots = $$slots.info;
  // eslint-disable-next-line
  $: hasErrorSlots = $$slots['error-message'];

  function onTextareaResize(event) {
    emit('textareaResize', [event]);
  }

  function onInputNotEmpty(event) {
    emit('inputNotEmpty', [event]);
  }

  function onInputEmpty(event) {
    emit('inputEmpty', [event]);
  }

  function onInputClear(event) {
    emit('inputClear', [event]);
  }

  function onInput(...args) {
    emit('input', [...args]);

    if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && inputEl) {
      validateInput(inputEl);
    }
    if (inputEl && type !== 'texteditor' && type !== 'colorpicker' && type !== 'datepicker') {
      value = inputEl.value;
    }
  }

  function onFocus(...args) {
    emit('focus', [...args]);

    inputFocused = true;
  }

  function onBlur(...args) {
    emit('blur', [...args]);

    if ((validate || validate === '' || validateOnBlur || validateOnBlur === '') && inputEl) {
      validateInput();
    }
    inputFocused = false;
  }

  function onChange(...args) {
    emit('change', [...args]);

    if (type === 'texteditor') {
      emit('textEditorChange', [args[1]]);
      value = args[1];
    }
  }

  onMount(() => {
    f7ready(() => {
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
        f7Calendar = app.f7.calendar.create({
          inputEl,
          value,
          on: {
            change(calendar, calendarValue) {
              emit('calendarChange', [calendarValue]);
              value = calendarValue;
            },
          },
          ...(calendarParams || {}),
        });
      }
      if (type === 'colorpicker') {
        f7ColorPicker = app.f7.colorPicker.create({
          inputEl,
          value,
          on: {
            change(colorPicker, colorPickerValue) {
              emit('colorpickerChange', [colorPickerValue]);
              value = colorPickerValue;
            },
          },
          ...(colorPickerParams || {}),
        });
      }

      app.f7.input.checkEmptyState(inputEl);
      if (
        !(validateOnBlur || validateOnBlur === '') &&
        (validate || validate === '') &&
        typeof value !== 'undefined' &&
        value !== null &&
        value !== ''
      ) {
        setTimeout(() => {
          validateInput();
        }, 0);
      }
      if (resizable) {
        app.f7.input.resizeTextarea(inputEl);
      }
    });
  });

  afterUpdate(() => {
    if (!app.f7) return;
    if (updateInputOnDidUpdate) {
      if (!inputEl) return;
      updateInputOnDidUpdate = false;
      app.f7.input.checkEmptyState(inputEl);
      if (validate && !validateOnBlur) {
        validateInput();
      }
      if (resizable) {
        app.f7.input.resizeTextarea(inputEl);
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
  <div class={wrapClasses} {...restProps($$restProps)}>
    {#if type === 'select'}
      <select
        bind:this={inputEl}
        style={inputStyle}
        {name}
        {placeholder}
        id={inputId}
        {size}
        {accept}
        {autocomplete}
        {autocorrect}
        {autocapitalize}
        {spellcheck}
        {autofocus}
        {autosave}
        {checked}
        {disabled}
        {max}
        {maxlength}
        {min}
        {minlength}
        {step}
        {multiple}
        {readonly}
        {required}
        {pattern}
        validate={typeof validate === 'string' && validate.length ? validate : undefined}
        data-validate={validate === true ||
        validate === '' ||
        validateOnBlur === true ||
        validateOnBlur === ''
          ? true
          : undefined}
        data-validate-on-blur={validateOnBlur === true || validateOnBlur === '' ? true : undefined}
        {tabindex}
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
        {name}
        {placeholder}
        id={inputId}
        {size}
        {accept}
        {autocomplete}
        {autocorrect}
        {autocapitalize}
        {spellcheck}
        {autofocus}
        {autosave}
        {checked}
        {disabled}
        {max}
        {maxlength}
        {min}
        {minlength}
        {step}
        {multiple}
        {readonly}
        {required}
        {pattern}
        validate={typeof validate === 'string' && validate.length ? validate : undefined}
        data-validate={validate === true ||
        validate === '' ||
        validateOnBlur === true ||
        validateOnBlur === ''
          ? true
          : undefined}
        data-validate-on-blur={validateOnBlur === true || validateOnBlur === '' ? true : undefined}
        {tabindex}
        data-error-message={errorMessageForce ? undefined : errorMessage}
        class={inputClassName}
        on:focus={onFocus}
        on:blur={onBlur}
        on:input={onInput}
        on:change={onChange}
        value={inputValue}
      />
    {:else if type === 'toggle'}
      <Toggle {checked} {readonly} {name} {value} {disabled} id={inputId} on:change={onChange} />
    {:else if type === 'range'}
      <Range
        {value}
        {disabled}
        {min}
        {max}
        {step}
        {name}
        id={inputId}
        input={true}
        on:rangeChange={onChange}
      />
    {:else if type === 'texteditor'}
      <TextEditor
        value={typeof value === 'undefined' ? '' : value}
        {resizable}
        {placeholder}
        onTextEditorFocus={onFocus}
        onTextEditorBlur={onBlur}
        onTextEditorInput={onInput}
        onTextEditorChange={onChange}
        {...textEditorParams}
      />
    {:else}
      <input
        bind:this={inputEl}
        style={inputStyle}
        {name}
        type={inputType}
        {placeholder}
        id={inputId}
        {size}
        {accept}
        {autocomplete}
        {autocorrect}
        {autocapitalize}
        {spellcheck}
        {autofocus}
        {autosave}
        {checked}
        {disabled}
        {max}
        {maxlength}
        {min}
        {minlength}
        {step}
        {multiple}
        {readonly}
        {required}
        {pattern}
        validate={typeof validate === 'string' && validate.length ? validate : undefined}
        data-validate={validate === true ||
        validate === '' ||
        validateOnBlur === true ||
        validateOnBlur === ''
          ? true
          : undefined}
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
    {#if (errorMessage || hasErrorSlots) && errorMessageForce}
      <div class="input-error-message">
        {errorMessage}
        <slot name="error-message" />
      </div>
    {/if}
    {#if clearButton}<span class="input-clear-button" />{/if}
    {#if info || hasInfoSlots}
      <div class="input-info">
        {info}
        <slot name="info" />
      </div>
    {/if}
  </div>
{:else if type === 'select'}
  <select
    bind:this={inputEl}
    style={inputStyle}
    {name}
    {placeholder}
    id={inputId}
    {size}
    {accept}
    {autocomplete}
    {autocorrect}
    {autocapitalize}
    {spellcheck}
    {autofocus}
    {autosave}
    {checked}
    {disabled}
    {max}
    {maxlength}
    {min}
    {minlength}
    {step}
    {multiple}
    {readonly}
    {required}
    {pattern}
    validate={typeof validate === 'string' && validate.length ? validate : undefined}
    data-validate={validate === true ||
    validate === '' ||
    validateOnBlur === true ||
    validateOnBlur === ''
      ? true
      : undefined}
    data-validate-on-blur={validateOnBlur === true || validateOnBlur === '' ? true : undefined}
    {tabindex}
    data-error-message={errorMessageForce ? undefined : errorMessage}
    class={inputClassName}
    on:focus={onFocus}
    on:blur={onBlur}
    on:input={onInput}
    on:change={onChange}
    value={inputValue}
    {...restProps($$restProps)}
  >
    <slot />
  </select>
{:else if type === 'textarea'}
  <textarea
    bind:this={inputEl}
    style={inputStyle}
    {name}
    {placeholder}
    id={inputId}
    {size}
    {accept}
    {autocomplete}
    {autocorrect}
    {autocapitalize}
    {spellcheck}
    {autofocus}
    {autosave}
    {checked}
    {disabled}
    {max}
    {maxlength}
    {min}
    {minlength}
    {step}
    {multiple}
    {readonly}
    {required}
    {pattern}
    validate={typeof validate === 'string' && validate.length ? validate : undefined}
    data-validate={validate === true ||
    validate === '' ||
    validateOnBlur === true ||
    validateOnBlur === ''
      ? true
      : undefined}
    data-validate-on-blur={validateOnBlur === true || validateOnBlur === '' ? true : undefined}
    {tabindex}
    data-error-message={errorMessageForce ? undefined : errorMessage}
    class={inputClassName}
    on:focus={onFocus}
    on:blur={onBlur}
    on:input={onInput}
    on:change={onChange}
    value={inputValue}
    {...restProps($$restProps)}
  />
{:else if type === 'toggle'}
  <Toggle
    {checked}
    {readonly}
    {name}
    {value}
    {disabled}
    id={inputId}
    on:change={onChange}
    {...restProps($$restProps)}
  />
{:else if type === 'range'}
  <Range
    {value}
    {disabled}
    {min}
    {max}
    {step}
    {name}
    id={inputId}
    input={true}
    on:rangeChange={onChange}
    {...restProps($$restProps)}
  />
{:else if type === 'texteditor'}
  <TextEditor
    value={typeof value === 'undefined' ? '' : value}
    {resizable}
    {placeholder}
    onTextEditorFocus={onFocus}
    onTextEditorBlur={onBlur}
    onTextEditorInput={onInput}
    onTextEditorChange={onChange}
    {...textEditorParams}
    {...restProps($$restProps)}
  />
{:else}
  <input
    bind:this={inputEl}
    style={inputStyle}
    {name}
    type={inputType}
    {placeholder}
    id={inputId}
    {size}
    {accept}
    {autocomplete}
    {autocorrect}
    {autocapitalize}
    {spellcheck}
    {autofocus}
    {autosave}
    {checked}
    {disabled}
    {max}
    {maxlength}
    {min}
    {minlength}
    {step}
    {multiple}
    {readonly}
    {required}
    {pattern}
    validate={typeof validate === 'string' && validate.length ? validate : undefined}
    data-validate={validate === true ||
    validate === '' ||
    validateOnBlur === true ||
    validateOnBlur === ''
      ? true
      : undefined}
    data-validate-on-blur={validateOnBlur === true || validateOnBlur === '' ? true : undefined}
    tabIndex={tabindex}
    data-error-message={errorMessageForce ? undefined : errorMessage}
    class={inputClassName}
    on:focus={onFocus}
    on:blur={onBlur}
    on:input={onInput}
    on:change={onChange}
    value={type === 'datepicker' || type === 'colorpicker' || type === 'file' ? '' : inputValue}
    {...restProps($$restProps)}
  />
{/if}
