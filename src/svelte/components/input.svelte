<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';
  import Toggle from './toggle.svelte';
  import Range from './range.svelte';
  import TextEditor from './text-editor.svelte';

  let {
    class: className,
    type = undefined,
    name = undefined,
    value = undefined,
    inputmode = undefined,
    placeholder = undefined,
    inputId = undefined,
    size = undefined,
    accept = undefined,
    autocomplete = undefined,
    autocorrect = undefined,
    autocapitalize = undefined,
    spellcheck = undefined,
    autofocus = undefined,
    autosave = undefined,
    checked = undefined,
    disabled = undefined,
    max = undefined,
    min = undefined,
    step = undefined,
    maxlength = undefined,
    minlength = undefined,
    multiple = undefined,
    readonly = undefined,
    required = undefined,
    inputStyle = undefined,
    pattern = undefined,
    validate = undefined,
    validateOnBlur = undefined,
    onValidate = undefined,
    tabindex = undefined,
    resizable = undefined,
    clearButton = undefined,

    // Form
    noFormStoreData = undefined,
    noStoreData = undefined,
    ignoreStoreData = undefined,

    // Error, Info
    errorMessage = undefined,
    errorMessageForce = undefined,
    info = undefined,

    // Outline
    outline = undefined,

    // Components
    wrap = true,
    dropdown = 'auto',

    // Datepicker
    calendarParams = undefined,
    // Colorpicker
    colorPickerParams = undefined,
    // Text editor
    textEditorParams = undefined,

    ...restProps
  } = $props();

  // State
  let inputEl = $state(null);
  let inputFocused = $state(false);
  let inputInvalid = $state(false);
  let updateInputOnDidUpdate = $state(false);
  let f7Calendar = $state(null);
  let f7ColorPicker = $state(null);

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

  $effect(() => {
    watchValue(value);
  });

  const inputType = $derived(type === 'datepicker' || type === 'colorpicker' ? 'text' : type);

  // eslint-disable-next-line
  const needsValue = $derived(type !== 'file' && type !== 'datepicker' && type !== 'colorpicker');

  const inputValue = $derived.by(() => {
    let v;
    if (typeof value !== 'undefined') {
      v = value;
    } else {
      v = domValue();
    }
    if (typeof v === 'undefined' || v === null) return '';
    return v;
  });

  const wrapClasses = $derived(
    classNames(
      className,
      'input',
      {
        'input-outline': outline,
        'input-dropdown': dropdown === 'auto' ? type === 'select' : dropdown,
        'input-invalid': (errorMessage && errorMessageForce) || inputInvalid,
      },
      colorClasses(restProps),
    ),
  );

  const inputClassName = $derived(
    classNames(!wrap && className, {
      resizable: inputType === 'textarea' && resizable,
      'no-store-data': noFormStoreData || noStoreData || ignoreStoreData,
      'input-invalid': (errorMessage && errorMessageForce) || inputInvalid,
      'input-with-value': inputHasValue(),
      'input-focused': inputFocused,
    }),
  );

  function onTextareaResize(event) {
    restProps.ontextarearesize?.(event);
    restProps.onTextareaResize?.(event);
  }

  function onInputNotEmpty(event) {
    restProps.onInputNotEmpty?.(event);
    restProps.oninputnotempty?.(event);
  }

  function onInputEmpty(event) {
    restProps.onInputEmpty?.(event);
    restProps.oninputempty?.(event);
  }

  function onInputClear(event) {
    restProps.onInputClear?.(event);
    restProps.oninputclear?.(event);
  }

  function onInput(...args) {
    restProps.onInput?.(...args);
    restProps.oninput?.(...args);

    if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && inputEl) {
      validateInput(inputEl);
    }
    if (inputEl && type !== 'texteditor' && type !== 'colorpicker' && type !== 'datepicker') {
      value = inputEl.value;
    }
  }

  function onFocus(...args) {
    restProps.onFocus?.(...args);
    restProps.onfocus?.(...args);

    inputFocused = true;
  }

  function onBlur(...args) {
    restProps.onBlur?.(...args);
    restProps.onblur?.(...args);

    if ((validate || validate === '' || validateOnBlur || validateOnBlur === '') && inputEl) {
      validateInput();
    }
    inputFocused = false;
  }

  function onChange(...args) {
    restProps.onChange?.(...args);
    restProps.onchange?.(...args);

    if (type === 'texteditor') {
      restProps.ontexteditorchange?.(args[1]);
      restProps.onTextEditorChange?.(args[1]);
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
              restProps.onCalendarChange?.(calendarValue);
              restProps.oncalendarchange?.(calendarValue);
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
              restProps.onColorPickerChange?.(colorPickerValue);
              restProps.oncolorpickerchange?.(colorPickerValue);
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

  $effect(() => {
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
  <div class={wrapClasses} {...restProps}>
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
        onfocus={onFocus}
        onblur={onBlur}
        oninput={onInput}
        onchange={onChange}
        value={inputValue}
      >
        {@render children?.()}
      </select>
    {:else if type === 'textarea'}
      <textarea
        bind:this={inputEl}
        style={inputStyle}
        {name}
        {placeholder}
        id={inputId}
        {size}
        {inputmode}
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
        onfocus={onFocus}
        onblur={onBlur}
        oninput={onInput}
        onchange={onChange}
        value={inputValue}
      ></textarea>
    {:else if type === 'toggle'}
      <Toggle {checked} {readonly} {name} {value} {disabled} id={inputId} onchange={onChange} />
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
        onRangeChange={onChange}
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
        {inputmode}
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
        onfocus={onFocus}
        onblur={onBlur}
        oninput={onInput}
        onchange={onChange}
        value={type === 'datepicker' || type === 'colorpicker' || type === 'file' ? '' : inputValue}
      />
    {/if}
    {#if errorMessage && errorMessageForce}
      <div class="input-error-message">
        {#if typeof errorMessage === 'function'}
          {@render errorMessage?.()}
        {:else}
          {errorMessage}
        {/if}
      </div>
    {/if}
    {#if clearButton}<span class="input-clear-button"></span>{/if}
    {#if info}
      <div class="input-info">
        {#if typeof info === 'function'}
          {@render info?.()}
        {:else}
          {info}
        {/if}
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
    onfocus={onFocus}
    onblur={onBlur}
    oninput={onInput}
    onchange={onChange}
    value={inputValue}
    {...restProps}
  >
    {@render children?.()}
  </select>
{:else if type === 'textarea'}
  <textarea
    bind:this={inputEl}
    style={inputStyle}
    {name}
    {placeholder}
    id={inputId}
    {size}
    {inputmode}
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
    onfocus={onFocus}
    onblur={onBlur}
    oninput={onInput}
    onchange={onChange}
    value={inputValue}
    {...restProps}
  ></textarea>
{:else if type === 'toggle'}
  <Toggle
    {checked}
    {readonly}
    {name}
    {value}
    {disabled}
    id={inputId}
    onchange={onChange}
    {...restProps}
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
    onRangeChange={onChange}
    {...restProps}
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
    {...restProps}
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
    {inputmode}
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
    onfocus={onFocus}
    onblur={onBlur}
    oninput={onInput}
    onchange={onChange}
    value={type === 'datepicker' || type === 'colorpicker' || type === 'file' ? '' : inputValue}
    {...restProps}
  />
{/if}
