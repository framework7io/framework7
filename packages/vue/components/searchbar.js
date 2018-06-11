import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-searchbar',
  props: Object.assign({
    id: [String, Number],
    noShadow: Boolean,
    noHairline: Boolean,
    form: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: 'Search'
    },
    disableButton: {
      type: Boolean,
      default: true
    },
    disableButtonText: {
      type: String,
      default: 'Cancel'
    },
    clearButton: {
      type: Boolean,
      default: true
    },
    expandable: Boolean,
    searchContainer: [String, Object],
    searchIn: {
      type: String,
      default: '.item-title'
    },
    searchItem: {
      type: String,
      default: 'li'
    },
    foundEl: {
      type: [String, Object],
      default: '.searchbar-found'
    },
    notFoundEl: {
      type: [String, Object],
      default: '.searchbar-not-found'
    },
    backdrop: {
      type: Boolean,
      default: true
    },
    backdropEl: [String, Object],
    hideOnEnableEl: {
      type: [String, Object],
      default: '.searchbar-hide-on-enable'
    },
    hideOnSearchEl: {
      type: [String, Object],
      default: '.searchbar-hide-on-search'
    },
    ignore: {
      type: String,
      default: '.searchbar-ignore'
    },
    customSearch: {
      type: Boolean,
      default: false
    },
    removeDiacritics: {
      type: Boolean,
      default: false
    },
    hideDividers: {
      type: Boolean,
      default: true
    },
    hideGroups: {
      type: Boolean,
      default: true
    },
    init: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    let clearEl;
    let disableEl;
    const props = self.props;
    const {
      placeholder,
      clearButton,
      disableButton,
      disableButtonText,
      form,
      noShadow,
      noHairline,
      expandable,
      className,
      style,
      id
    } = props;

    if (clearButton) {
      clearEl = _h('span', {
        class: 'input-clear-button',
        on: {
          click: self.onClearButtonClick.bind(self)
        }
      });
    }

    if (disableButton) {
      disableEl = _h('span', {
        class: 'searchbar-disable-button',
        on: {
          click: self.onDisableButtonClick.bind(self)
        }
      }, [disableButtonText]);
    }

    const SearchbarTag = form ? 'form' : 'div';
    const classes = Utils.classNames(className, 'searchbar', {
      'no-shadow': noShadow,
      'no-hairline': noHairline,
      'searchbar-expandable': expandable
    }, Mixins.colorClasses(props));
    return _h(SearchbarTag, {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['before-inner'], _h('div', {
      class: 'searchbar-inner'
    }, [this.$slots['inner-start'], _h('div', {
      class: 'searchbar-input-wrap'
    }, [this.$slots['input-wrap-start'], _h('input', {
      on: {
        input: self.onInput.bind(self),
        change: self.onChange.bind(self),
        focus: self.onFocus.bind(self),
        blur: self.onBlur.bind(self)
      },
      attrs: {
        placeholder: placeholder,
        type: 'search'
      }
    }), _h('i', {
      class: 'searchbar-icon'
    }), clearEl, this.$slots['input-wrap-end']]), disableEl, this.$slots['inner-end'], this.$slots['default']]), this.$slots['after-inner']]);
  },

  beforeDestroy() {
    const self = this;

    if (self.props.form && self.$refs.el) {
      self.$refs.el.removeEventListener('submit', self.onSubmitBound, false);
    }

    if (self.f7Searchbar && self.f7Searchbar.destroy) self.f7Searchbar.destroy();
  },

  mounted() {
    const self = this;
    const {
      init,
      searchContainer,
      searchIn,
      searchItem,
      hideOnEnableEl,
      hideOnSearchEl,
      foundEl,
      notFoundEl,
      backdrop,
      backdropEl,
      disableButton,
      ignore,
      customSearch,
      removeDiacritics,
      hideDividers,
      hideGroups,
      form
    } = self.props;
    if (!init) return;
    const el = self.$refs.el;

    if (form && el) {
      self.onSubmitBound = self.onSubmit.bind(self);
      el.addEventListener('submit', self.onSubmitBound, false);
    }

    self.$f7ready(() => {
      const params = Utils.noUndefinedProps({
        el: self.$refs.el,
        searchContainer,
        searchIn,
        searchItem,
        hideOnEnableEl,
        hideOnSearchEl,
        foundEl,
        notFoundEl,
        backdrop,
        backdropEl,
        disableButton,
        ignore,
        customSearch,
        removeDiacritics,
        hideDividers,
        hideGroups,
        on: {
          search(searchbar, query, previousQuery) {
            self.dispatchEvent('searchbar:search searchbarSearch', searchbar, query, previousQuery);
          },

          clear(searchbar, previousQuery) {
            self.dispatchEvent('searchbar:clear searchbarClear', searchbar, previousQuery);
          },

          enable(searchbar) {
            self.dispatchEvent('searchbar:enable searchbarEnable', searchbar);
          },

          disable(searchbar) {
            self.dispatchEvent('searchbar:disable searchbarDisable', searchbar);
          }

        }
      });
      Object.keys(params).forEach(key => {
        if (params[key] === '') {
          delete params[key];
        }
      });
      self.f7Searchbar = self.$f7.searchbar.create(params);
    });
  },

  methods: {
    search(query) {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.search(query);
    },

    enable() {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.enable();
    },

    disable() {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.disable();
    },

    toggle() {
      if (!this.f7Searchbar) return undefined;
      return this.toggle.disable();
    },

    clear() {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.clear();
    },

    onChange(event) {
      this.dispatchEvent('change', event);
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

    onSubmit(event) {
      this.dispatchEvent('submit', event);
    },

    onClearButtonClick(event) {
      this.dispatchEvent('click:clear clickClear', event);
    },

    onDisableButtonClick(event) {
      this.dispatchEvent('click:disable clickDisable', event);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};