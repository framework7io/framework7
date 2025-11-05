<script>
  import { getContext } from 'svelte';
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, extend } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';

  import TextEditor from './text-editor.svelte';

  let {
    class: className,
    sortable = undefined,
    sortableOpposite = undefined,
    media = undefined,
    dropdown = 'auto',
    wrap = true,
    input = true,
    inputContent = undefined,
    type = 'text',
    name = undefined,
    value = undefined,
    inputmode = undefined,
    readonly = undefined,
    required = undefined,
    disabled = undefined,
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
    max = undefined,
    min = undefined,
    step = undefined,
    maxlength = undefined,
    minlength = undefined,
    multiple = undefined,
    inputStyle = undefined,
    pattern = undefined,
    validate = undefined,
    validateOnBlur = undefined,
    onValidate = undefined,
    tabindex = undefined,
    resizable = undefined,
    clearButton = undefined,
    noFormStoreData = undefined,
    noStoreData = undefined,
    ignoreStoreData = undefined,
    errorMessage = undefined,
    errorMessageForce = undefined,
    info = undefined,
    outline = undefined,
    label = undefined,
    floatingLabel = undefined,
    calendarParams = undefined,
    colorPickerParams = undefined,
    textEditorParams = undefined,
    rootStart,
    contentStart,
    innerStart,
    inner,
    innerEnd,
    content,
    contentEnd,
    root,
    rootEnd,
    children,
    ...restProps
  } = $props();

  let inputEl = $state(null);
  let inputFocused = $state(false);
  let inputInvalid = $state(false);
  let updateInputOnDidUpdate = $state(false);
  let f7Calendar = $state(null);
  let f7ColorPicker = $state(null);

  export function calendarInstance() {
    return f7Calendar;
  }

  export function colorPickerInstance() {
    return f7ColorPicker;
  }

  const ListContext =
    getContext('ListContext') ||
    (() => ({
      value: {},
    }));

  const isSortable = $derived(
    sortable === true || sortable === false ? sortable : ListContext().value.listIsSortable,
  );
  const isSortableOpposite = $derived(
    sortableOpposite || ListContext().value.listIsSortableOpposite,
  );

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

  let initialWatched = $state(false);
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

  function watchColorPickerParams() {
    if (!app.f7 || !f7ColorPicker) return;
    extend(f7ColorPicker.params, colorPickerParams || {});
  }

  function watchCalendarParams() {
    if (!app.f7 || !f7Calendar) return;
    extend(f7Calendar.params, calendarParams || {});
  }

  $effect(() => watchValue(value));
  $effect(() => watchColorPickerParams(colorPickerParams));
  $effect(() => watchCalendarParams(calendarParams));

  const inputType = $derived(type === 'datepicker' || type === 'colorpicker' ? 'text' : type);

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

  const hasInfoSlots = $derived(info);
  const hasErrorSlots = $derived(errorMessage);
  const hasMediaSlots = $derived(media);
  const hasLabelSlots = $derived(label);

  const hasErrorMessage = $derived(!!errorMessage || hasErrorSlots);

  const inputClasses = $derived(
    classNames({
      resizable: inputType === 'textarea' && resizable,
      'no-store-data': noFormStoreData || noStoreData || ignoreStoreData,
      'input-invalid': (errorMessage && errorMessageForce) || inputInvalid,
      'input-with-value': inputHasValue(),
      'input-focused': inputFocused,
    }),
  );

  const itemContentClasses = $derived(
    classNames(
      'item-content item-input',
      !wrap && className,
      !wrap && { disabled },
      !wrap && colorClasses(restProps),
      {
        'item-input-outline': outline,
        'item-input-focused': inputFocused,
        'item-input-with-info': !!info || hasInfoSlots,
        'item-input-with-value': inputHasValue(),
        'item-input-with-error-message': (hasErrorMessage && errorMessageForce) || inputInvalid,
        'item-input-invalid': (hasErrorMessage && errorMessageForce) || inputInvalid,
      },
    ),
  );

  const labelClasses = $derived(
    classNames('item-title item-label', {
      'item-floating-label': floatingLabel,
    }),
  );

  const inputWrapClasses = $derived(
    classNames('item-input-wrap', {
      'input-dropdown': dropdown === 'auto' ? type === 'select' : dropdown,
    }),
  );

  const classes = $derived(classNames(className, { disabled }, colorClasses(restProps)));

  function onTextareaResize(event) {
    restProps.onTextareaResize?.(event);
    restProps.ontextareaResize?.(event);
  }

  function onInputNotEmpty(event) {
    restProps.onInputNotEmpty?.(event);
    restProps.oninputNotEmpty?.(event);
  }

  function onInputEmpty(event) {
    restProps.onInputEmpty?.(event);
    restProps.oninputEmpty?.(event);
  }

  function onInputClear(event) {
    restProps.onInputClear?.(event);
    restProps.oninputClear?.(event);
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
      restProps.onTextEditorChange?.(args[0]);
      restProps.ontextEditorChange?.(args[0]);
      value = args[0];
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
              restProps.oncalendarChange?.(calendarValue);
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
              if (JSON.stringify(value) === JSON.stringify(colorPickerValue)) {
                return;
              }
              restProps.onColorPickerChange?.(colorPickerValue);
              restProps.oncolorPickerChange?.(colorPickerValue);
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
<!-- svelte-ignore a11y-missing-attribute -->
{#if wrap}
  <li class={classes} {...restProps}>
    {@render rootStart?.()}
    <div class={itemContentClasses}>
      {@render contentStart?.()}
      {#if isSortable && isSortableOpposite}
        <div class="sortable-handler" />
      {/if}

      {#if media || hasMediaSlots}
        <div class="item-media">
          {#if typeof media === 'function'}
            {@render media?.()}
          {:else if typeof media === 'string'}
            <img src={media} />
          {/if}
        </div>
      {/if}
      <div class="item-inner">
        {@render innerStart?.()}
        {#if typeof label !== 'undefined' || hasLabelSlots}
          <div class={labelClasses}>
            {#if typeof label === 'function'}
              {@render label?.()}
            {:else}
              {label}
            {/if}
          </div>
        {/if}
        <div class={inputWrapClasses}>
          {#if input === true}
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
                data-validate-on-blur={validateOnBlur === true || validateOnBlur === ''
                  ? true
                  : undefined}
                {tabindex}
                data-error-message={errorMessageForce ? undefined : errorMessage}
                class={inputClasses}
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
                data-validate-on-blur={validateOnBlur === true || validateOnBlur === ''
                  ? true
                  : undefined}
                {tabindex}
                data-error-message={errorMessageForce ? undefined : errorMessage}
                class={inputClasses}
                onfocus={onFocus}
                onblur={onBlur}
                oninput={onInput}
                onchange={onChange}
                value={inputValue}
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
                {inputmode}
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
                data-validate-on-blur={validateOnBlur === true || validateOnBlur === ''
                  ? true
                  : undefined}
                tabIndex={tabindex}
                data-error-message={errorMessageForce ? undefined : errorMessage}
                class={inputClasses}
                onfocus={onFocus}
                onblur={onBlur}
                oninput={onInput}
                onchange={onChange}
                value={type === 'datepicker' || type === 'colorpicker' || type === 'file'
                  ? ''
                  : inputValue}
              />
            {/if}
          {/if}
          {#if typeof inputContent === 'function'}
            {@render inputContent?.()}
          {/if}

          {#if hasErrorMessage && errorMessageForce}
            <div class="item-input-error-message">
              {#if typeof errorMessage === 'function'}
                {@render errorMessage?.()}
              {:else}
                {errorMessage}
              {/if}
            </div>
          {/if}
          {#if clearButton}<span class="input-clear-button" />{/if}
          {#if typeof info !== 'undefined' || hasInfoSlots}
            <div class="item-input-info">
              {#if typeof info === 'function'}
                {@render info?.()}
              {:else}
                {info}
              {/if}
            </div>
          {/if}
        </div>
        {@render inner?.()}
        {@render innerEnd?.()}
      </div>
      {@render content?.()}
      {@render contentEnd?.()}
    </div>
    {#if isSortable && !isSortableOpposite}
      <div class="sortable-handler" />
    {/if}
    {@render root?.()}
    {@render rootEnd?.()}
  </li>
{:else}
  <div class={itemContentClasses} {...restProps}>
    {@render contentStart?.()}
    {#if isSortable && isSortableOpposite}
      <div class="sortable-handler" />
    {/if}

    {#if media || hasMediaSlots}
      <div class="item-media">
        {#if typeof media === 'function'}
          {@render media?.()}
        {:else if typeof media === 'string'}
          <img src={media} />
        {/if}
      </div>
    {/if}
    <div class="item-inner">
      {@render innerStart?.()}
      {#if typeof label !== 'undefined' || hasLabelSlots}
        <div class={labelClasses}>
          {#if typeof label === 'function'}
            {@render label?.()}
          {:else}
            {label}
          {/if}
        </div>
      {/if}
      <div class={inputWrapClasses}>
        {#if input === true}
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
              data-validate-on-blur={validateOnBlur === true || validateOnBlur === ''
                ? true
                : undefined}
              {tabindex}
              data-error-message={errorMessageForce ? undefined : errorMessage}
              class={inputClasses}
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
              data-validate-on-blur={validateOnBlur === true || validateOnBlur === ''
                ? true
                : undefined}
              {tabindex}
              data-error-message={errorMessageForce ? undefined : errorMessage}
              class={inputClasses}
              onfocus={onFocus}
              onblur={onBlur}
              oninput={onInput}
              onchange={onChange}
              value={inputValue}
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
              {inputmode}
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
              data-validate-on-blur={validateOnBlur === true || validateOnBlur === ''
                ? true
                : undefined}
              tabIndex={tabindex}
              data-error-message={errorMessageForce ? undefined : errorMessage}
              class={inputClasses}
              onfocus={onFocus}
              onblur={onBlur}
              oninput={onInput}
              onchange={onChange}
              value={type === 'datepicker' || type === 'colorpicker' || type === 'file'
                ? ''
                : inputValue}
            />
          {/if}
        {/if}
        {#if typeof inputContent === 'function'}
          {@render inputContent?.()}
        {/if}
        {#if hasErrorMessage && errorMessageForce}
          <div class="item-input-error-message">
            {#if typeof errorMessage === 'function'}
              {@render errorMessage?.()}
            {:else}
              {errorMessage}
            {/if}
          </div>
        {/if}
        {#if clearButton}<span class="input-clear-button"></span>{/if}
        {#if typeof info !== 'undefined' || hasInfoSlots}
          <div class="item-input-info">
            {#if typeof info === 'function'}
              {@render info?.()}
            {:else}
              {info}
            {/if}
          </div>
        {/if}
      </div>
      {@render inner?.()}
      {@render innerEnd?.()}
    </div>
    {@render content?.()}
    {@render contentEnd?.()}
  </div>
{/if}
