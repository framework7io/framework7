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
    value: [String, Number, Array],
    inputEvents: {
      type: String,
      default: 'change input compositionend'
    },
    expandable: Boolean,
    inline: Boolean,
    searchContainer: [String, Object],
    searchIn: {
      type: String,
      default: '.item-title'
    },
    searchItem: {
      type: String,
      default: 'li'
    },
    searchGroup: {
      type: String,
      default: '.list-group'
    },
    searchGroupTitle: {
      type: String,
      default: '.item-divider, .list-group-title'
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
      default: undefined
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
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var clearEl;
    var disableEl;
    var props = self.props;
    var placeholder = props.placeholder,
        clearButton = props.clearButton,
        disableButton = props.disableButton,
        disableButtonText = props.disableButtonText,
        form = props.form,
        noShadow = props.noShadow,
        noHairline = props.noHairline,
        expandable = props.expandable,
        className = props.className,
        style = props.style,
        id = props.id,
        value = props.value,
        inline = props.inline;

    if (clearButton) {
      clearEl = _h('span', {
        ref: 'clearEl',
        class: 'input-clear-button'
      });
    }

    if (disableButton) {
      disableEl = _h('span', {
        ref: 'disableEl',
        class: 'searchbar-disable-button'
      }, [disableButtonText]);
    }

    var SearchbarTag = form ? 'form' : 'div';
    var classes = Utils.classNames(className, 'searchbar', {
      'searchbar-inline': inline,
      'no-shadow': noShadow,
      'no-hairline': noHairline,
      'searchbar-expandable': expandable
    }, Mixins.colorClasses(props));
    var inputEl;
    {
      inputEl = _h('input', {
        ref: 'inputEl',
        domProps: {
          value: value
        },
        on: {
          input: self.onInput,
          change: self.onChange,
          focus: self.onFocus,
          blur: self.onBlur
        },
        attrs: {
          placeholder: placeholder,
          type: 'search'
        }
      });
    }
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
    }, [this.$slots['input-wrap-start'], inputEl, _h('i', {
      class: 'searchbar-icon'
    }), clearEl, this.$slots['input-wrap-end']]), disableEl, this.$slots['inner-end'], this.$slots['default']]), this.$slots['after-inner']]);
  },
  created: function created() {
    Utils.bindMethods(this, ['onSubmit', 'onClearButtonClick', 'onDisableButtonClick', 'onInput', 'onChange', 'onFocus', 'onBlur']);
  },
  mounted: function mounted() {
    var self = this;
    var _self$props = self.props,
        init = _self$props.init,
        inputEvents = _self$props.inputEvents,
        searchContainer = _self$props.searchContainer,
        searchIn = _self$props.searchIn,
        searchItem = _self$props.searchItem,
        searchGroup = _self$props.searchGroup,
        searchGroupTitle = _self$props.searchGroupTitle,
        hideOnEnableEl = _self$props.hideOnEnableEl,
        hideOnSearchEl = _self$props.hideOnSearchEl,
        foundEl = _self$props.foundEl,
        notFoundEl = _self$props.notFoundEl,
        backdrop = _self$props.backdrop,
        backdropEl = _self$props.backdropEl,
        disableButton = _self$props.disableButton,
        ignore = _self$props.ignore,
        customSearch = _self$props.customSearch,
        removeDiacritics = _self$props.removeDiacritics,
        hideDividers = _self$props.hideDividers,
        hideGroups = _self$props.hideGroups,
        form = _self$props.form,
        expandable = _self$props.expandable,
        inline = _self$props.inline;
    var _self$$refs = self.$refs,
        el = _self$$refs.el,
        clearEl = _self$$refs.clearEl,
        disableEl = _self$$refs.disableEl;

    if (form && el) {
      el.addEventListener('submit', self.onSubmit, false);
    }

    if (clearEl) {
      clearEl.addEventListener('click', self.onClearButtonClick);
    }

    if (disableEl) {
      disableEl.addEventListener('click', self.onDisableButtonClick);
    }

    if (!init) return;
    self.$f7ready(function () {
      var params = Utils.noUndefinedProps({
        el: self.$refs.el,
        inputEvents: inputEvents,
        searchContainer: searchContainer,
        searchIn: searchIn,
        searchItem: searchItem,
        searchGroup: searchGroup,
        searchGroupTitle: searchGroupTitle,
        hideOnEnableEl: hideOnEnableEl,
        hideOnSearchEl: hideOnSearchEl,
        foundEl: foundEl,
        notFoundEl: notFoundEl,
        backdrop: backdrop,
        backdropEl: backdropEl,
        disableButton: disableButton,
        ignore: ignore,
        customSearch: customSearch,
        removeDiacritics: removeDiacritics,
        hideDividers: hideDividers,
        hideGroups: hideGroups,
        expandable: expandable,
        inline: inline,
        on: {
          search: function search(searchbar, query, previousQuery) {
            self.dispatchEvent('searchbar:search searchbarSearch', searchbar, query, previousQuery);
          },
          clear: function clear(searchbar, previousQuery) {
            self.dispatchEvent('searchbar:clear searchbarClear', searchbar, previousQuery);
          },
          enable: function enable(searchbar) {
            self.dispatchEvent('searchbar:enable searchbarEnable', searchbar);
          },
          disable: function disable(searchbar) {
            self.dispatchEvent('searchbar:disable searchbarDisable', searchbar);
          }
        }
      });
      Object.keys(params).forEach(function (key) {
        if (params[key] === '') {
          delete params[key];
        }
      });
      self.f7Searchbar = self.$f7.searchbar.create(params);
    });
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    var _self$$refs2 = self.$refs,
        el = _self$$refs2.el,
        clearEl = _self$$refs2.clearEl,
        disableEl = _self$$refs2.disableEl;

    if (self.props.form && el) {
      el.removeEventListener('submit', self.onSubmit, false);
    }

    if (clearEl) {
      clearEl.removeEventListener('click', self.onClearButtonClick);
    }

    if (disableEl) {
      disableEl.removeEventListener('click', self.onDisableButtonClick);
    }

    if (self.f7Searchbar && self.f7Searchbar.destroy) self.f7Searchbar.destroy();
  },
  methods: {
    search: function search(query) {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.search(query);
    },
    enable: function enable() {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.enable();
    },
    disable: function disable() {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.disable();
    },
    toggle: function toggle() {
      if (!this.f7Searchbar) return undefined;
      return this.toggle.disable();
    },
    clear: function clear() {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.clear();
    },
    onChange: function onChange(event) {
      this.dispatchEvent('change', event);
    },
    onInput: function onInput(event) {
      this.dispatchEvent('input', event);
    },
    onFocus: function onFocus(event) {
      this.dispatchEvent('focus', event);
    },
    onBlur: function onBlur(event) {
      this.dispatchEvent('blur', event);
    },
    onSubmit: function onSubmit(event) {
      this.dispatchEvent('submit', event);
    },
    onClearButtonClick: function onClearButtonClick(event) {
      this.dispatchEvent('click:clear clickClear', event);
    },
    onDisableButtonClick: function onDisableButtonClick(event) {
      this.dispatchEvent('click:disable clickDisable', event);
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};