<template>
  <component :is="tag" ref="elRef" :class="classes" @submit="onSubmit">
    <slot name="before-inner" />
    <div class="searchbar-inner">
      <slot name="inner-start" />
      <div class="searchbar-input-wrap">
        <slot name="input-wrap-start" />
        <input
          :value="value"
          :placeholder="placeholder"
          :spellcheck="spellcheck"
          type="search"
          @input="onInput"
          @change="onChange"
          @focus="onFocus"
          @blur="onBlur"
        />
        <i class="searchbar-icon" />
        <span v-if="clearButton" class="input-clear-button" @click="onClearButtonClick" />
        <slot name="input-wrap-end" />
      </div>
      <span v-if="disableButton" class="searchbar-disable-button" @click="onDisableButtonClick">
        {{ disableButtonText }}
      </span>
      <slot name="inner-end" />
      <slot />
    </div>
    <slot name="after-inner" />
  </component>
</template>
<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { classNames, noUndefinedProps } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';

export default {
  name: 'f7-searchbar',
  props: {
    outline: { type: Boolean, default: true },
    form: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: 'Search',
    },
    spellcheck: {
      type: Boolean,
      default: undefined,
    },
    disableButton: {
      type: Boolean,
      default: true,
    },
    disableButtonText: {
      type: String,
      default: 'Cancel',
    },
    clearButton: {
      type: Boolean,
      default: true,
    },
    // Input Value
    value: [String, Number, Array],

    // SB Params
    inputEvents: {
      type: String,
      default: 'change input compositionend',
    },
    expandable: Boolean,
    inline: Boolean,
    searchContainer: [String, Object],
    searchIn: {
      type: String,
      default: '.item-title',
    },
    searchItem: {
      type: String,
      default: 'li',
    },
    searchGroup: {
      type: String,
      default: '.list-group',
    },
    searchGroupTitle: {
      type: String,
      default: '.list-group-title',
    },
    foundEl: {
      type: [String, Object],
      default: '.searchbar-found',
    },
    notFoundEl: {
      type: [String, Object],
      default: '.searchbar-not-found',
    },
    backdrop: {
      type: Boolean,
      default: undefined,
    },
    backdropEl: [String, Object],
    hideOnEnableEl: {
      type: [String, Object],
      default: '.searchbar-hide-on-enable',
    },
    hideOnSearchEl: {
      type: [String, Object],
      default: '.searchbar-hide-on-search',
    },
    ignore: {
      type: String,
      default: '.searchbar-ignore',
    },
    customSearch: {
      type: Boolean,
      default: false,
    },
    removeDiacritics: {
      type: Boolean,
      default: false,
    },
    hideGroupTitles: {
      type: Boolean,
      default: true,
    },
    hideGroups: {
      type: Boolean,
      default: true,
    },
    init: {
      type: Boolean,
      default: true,
    },
    ...colorProps,
  },
  emits: [
    'change',
    'input',
    'focus',
    'blur',
    'submit',
    'click:clear',
    'click:disable',
    'searchbar:search',
    'searchbar:clear',
    'searchbar:enable',
    'searchbar:disable',
    'update:value',
  ],
  setup(props, { emit }) {
    let f7Searchbar = null;
    const elRef = ref(null);

    const search = (query) => {
      if (!f7Searchbar) return undefined;
      return f7Searchbar.search(query);
    };
    const enable = () => {
      if (!f7Searchbar) return undefined;
      return f7Searchbar.enable();
    };
    const disable = () => {
      if (!f7Searchbar) return undefined;
      return f7Searchbar.disable();
    };
    const toggle = () => {
      if (!f7Searchbar) return undefined;
      return f7Searchbar.toggle();
    };
    const clear = () => {
      if (!f7Searchbar) return undefined;
      return f7Searchbar.clear();
    };
    const onChange = (event) => {
      emit('change', event);
    };
    const onInput = (event) => {
      emit('input', event);
      emit('update:value', event.target.value);
    };
    const onFocus = (event) => {
      emit('focus', event);
    };
    const onBlur = (event) => {
      emit('blur', event);
    };
    const onSubmit = (event) => {
      emit('submit', event);
    };
    const onClearButtonClick = (event) => {
      emit('click:clear', event);
    };
    const onDisableButtonClick = (event) => {
      emit('click:disable', event);
    };

    onMounted(() => {
      if (!props.init) return;

      f7ready(() => {
        const params = noUndefinedProps({
          el: elRef.value,
          inputEvents: props.inputEvents,
          searchContainer: props.searchContainer,
          searchIn: props.searchIn,
          searchItem: props.searchItem,
          searchGroup: props.searchGroup,
          searchGroupTitle: props.searchGroupTitle,
          hideOnEnableEl: props.hideOnEnableEl,
          hideOnSearchEl: props.hideOnSearchEl,
          foundEl: props.foundEl,
          notFoundEl: props.notFoundEl,
          backdrop: props.backdrop,
          backdropEl: props.backdropEl,
          disableButton: props.disableButton,
          ignore: props.ignore,
          customSearch: props.customSearch,
          removeDiacritics: props.removeDiacritics,
          hideGroupTitles: props.hideGroupTitles,
          hideGroups: props.hideGroups,
          expandable: props.expandable,
          inline: props.inline,
          on: {
            search(searchbar, query, previousQuery) {
              emit('searchbar:search', searchbar, query, previousQuery);
            },
            clear(searchbar, previousQuery) {
              emit('searchbar:clear', searchbar, previousQuery);
            },
            enable(searchbar) {
              emit('searchbar:enable', searchbar);
            },
            disable(searchbar) {
              emit('searchbar:disable', searchbar);
            },
          },
        });
        Object.keys(params).forEach((key) => {
          if (params[key] === '') {
            delete params[key];
          }
        });
        f7Searchbar = f7.searchbar.create(params);
      });
    });

    onBeforeUnmount(() => {
      if (f7Searchbar && f7Searchbar.destroy) f7Searchbar.destroy();
      f7Searchbar = null;
    });

    const classes = computed(() =>
      classNames(
        'searchbar',
        {
          'searchbar-inline': props.inline,
          'no-outline': !props.outline,
          'searchbar-expandable': props.expandable,
        },
        colorClasses(props),
      ),
    );

    const tag = computed(() => (props.form ? 'form' : 'div'));

    return {
      elRef,
      tag,
      classes,
      search,
      enable,
      disable,
      toggle,
      clear,
      onChange,
      onInput,
      onFocus,
      onBlur,
      onSubmit,
      onClearButtonClick,
      onDisableButtonClick,
    };
  },
};
</script>
