import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

/* phenome-dts-imports
import { Searchbar as SearchbarNamespace } from 'framework7/components/searchbar/searchbar';
*/

/* phenome-dts-instance
f7Searchbar: SearchbarNamespace.Searchbar
*/

export default {
  name: 'f7-searchbar',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    noShadow: Boolean,
    noHairline: Boolean,
    form: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: 'Search',
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

    // SB Params
    inputEvents: {
      type: String,
      default: 'change input compositionend',
    },
    expandable: Boolean,
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
      default: '.item-divider, .list-group-title',
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
      default: true,
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
    hideDividers: {
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
    ...Mixins.colorProps,
  },
  render() {
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
      id,
    } = props;

    if (clearButton) {
      clearEl = (
        <span className="input-clear-button" onClick={self.onClearButtonClick.bind(self)} />
      );
    }
    if (disableButton) {
      disableEl = (
        <span className="searchbar-disable-button" onClick={self.onDisableButtonClick.bind(self)}>{disableButtonText}</span>
      );
    }

    const SearchbarTag = form ? 'form' : 'div';

    const classes = Utils.classNames(
      className,
      'searchbar',
      {
        'no-shadow': noShadow,
        'no-hairline': noHairline,
        'searchbar-expandable': expandable,
      },
      Mixins.colorClasses(props),
    );

    return (
      <SearchbarTag ref="el" id={id} style={style} className={classes}>
        <slot name="before-inner" />
        <div className="searchbar-inner">
          <slot name="inner-start" />
          <div className="searchbar-input-wrap">
            <slot name="input-wrap-start" />
            <input
              placeholder={placeholder}
              type="search"
              onInput={self.onInput.bind(self)}
              onChange={self.onChange.bind(self)}
              onFocus={self.onFocus.bind(self)}
              onBlur={self.onBlur.bind(self)}
            />
            <i className="searchbar-icon" />
            {clearEl}
            <slot name="input-wrap-end" />
          </div>
          {disableEl}
          <slot name="inner-end" />
          <slot />
        </div>
        <slot name="after-inner" />
      </SearchbarTag>
    );
  },
  componentWillUnmount() {
    const self = this;
    if (self.props.form && self.refs.el) {
      self.refs.el.removeEventListener('submit', self.onSubmitBound, false);
    }
    if (self.f7Searchbar && self.f7Searchbar.destroy) self.f7Searchbar.destroy();
  },
  componentDidMount() {
    const self = this;

    const {
      init,
      inputEvents,
      searchContainer,
      searchIn,
      searchItem,
      searchGroup,
      searchGroupTitle,
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
      form,
    } = self.props;

    if (!init) return;

    const el = self.refs.el;

    if (form && el) {
      self.onSubmitBound = self.onSubmit.bind(self);
      el.addEventListener('submit', self.onSubmitBound, false);
    }

    self.$f7ready(() => {
      const params = Utils.noUndefinedProps({
        el: self.refs.el,
        inputEvents,
        searchContainer,
        searchIn,
        searchItem,
        searchGroup,
        searchGroupTitle,
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
          },
        },
      });
      Object.keys(params).forEach((key) => {
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
  },
};
