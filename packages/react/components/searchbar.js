import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Searchbar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onSubmit', 'onClearButtonClick', 'onDisableButtonClick', 'onInput', 'onChange', 'onFocus', 'onBlur']);
    })();
  }

  search(query) {
    if (!this.f7Searchbar) return undefined;
    return this.f7Searchbar.search(query);
  }

  enable() {
    if (!this.f7Searchbar) return undefined;
    return this.f7Searchbar.enable();
  }

  disable() {
    if (!this.f7Searchbar) return undefined;
    return this.f7Searchbar.disable();
  }

  toggle() {
    if (!this.f7Searchbar) return undefined;
    return this.toggle.disable();
  }

  clear() {
    if (!this.f7Searchbar) return undefined;
    return this.f7Searchbar.clear();
  }

  onChange(event) {
    this.dispatchEvent('change', event);
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

  onSubmit(event) {
    this.dispatchEvent('submit', event);
  }

  onClearButtonClick(event) {
    this.dispatchEvent('click:clear clickClear', event);
  }

  onDisableButtonClick(event) {
    this.dispatchEvent('click:disable clickDisable', event);
  }

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
      value,
      inline
    } = props;

    if (clearButton) {
      clearEl = React.createElement('span', {
        ref: __reactNode => {
          this.__reactRefs['clearEl'] = __reactNode;
        },
        className: 'input-clear-button'
      });
    }

    if (disableButton) {
      disableEl = React.createElement('span', {
        ref: __reactNode => {
          this.__reactRefs['disableEl'] = __reactNode;
        },
        className: 'searchbar-disable-button'
      }, disableButtonText);
    }

    const SearchbarTag = form ? 'form' : 'div';
    const classes = Utils.classNames(className, 'searchbar', {
      'searchbar-inline': inline,
      'no-shadow': noShadow,
      'no-hairline': noHairline,
      'searchbar-expandable': expandable
    }, Mixins.colorClasses(props));
    let inputEl;
    {
      inputEl = React.createElement('input', {
        ref: __reactNode => {
          this.__reactRefs['inputEl'] = __reactNode;
        },
        value: value,
        placeholder: placeholder,
        type: 'search',
        onInput: self.onInput,
        onChange: self.onChange.bind(self),
        onFocus: self.onFocus,
        onBlur: self.onBlur
      });
    }
    return React.createElement(SearchbarTag, {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes
    }, this.slots['before-inner'], React.createElement('div', {
      className: 'searchbar-inner'
    }, this.slots['inner-start'], React.createElement('div', {
      className: 'searchbar-input-wrap'
    }, this.slots['input-wrap-start'], inputEl, React.createElement('i', {
      className: 'searchbar-icon'
    }), clearEl, this.slots['input-wrap-end']), disableEl, this.slots['inner-end'], this.slots['default']), this.slots['after-inner']);
  }

  componentWillUnmount() {
    const self = this;
    const {
      el,
      clearEl,
      disableEl
    } = self.refs;

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
  }

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
      expandable,
      inline
    } = self.props;
    const {
      el,
      clearEl,
      disableEl
    } = self.refs;

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
        expandable,
        inline,
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
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

__reactComponentSetProps(F7Searchbar, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
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
}, Mixins.colorProps));

F7Searchbar.displayName = 'f7-searchbar';
export default F7Searchbar;