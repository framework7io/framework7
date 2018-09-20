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
      id
    } = props;

    if (clearButton) {
      clearEl = React.createElement('span', {
        className: 'input-clear-button',
        onClick: self.onClearButtonClick.bind(self)
      });
    }

    if (disableButton) {
      disableEl = React.createElement('span', {
        className: 'searchbar-disable-button',
        onClick: self.onDisableButtonClick.bind(self)
      }, disableButtonText);
    }

    const SearchbarTag = form ? 'form' : 'div';
    const classes = Utils.classNames(className, 'searchbar', {
      'no-shadow': noShadow,
      'no-hairline': noHairline,
      'searchbar-expandable': expandable
    }, Mixins.colorClasses(props));
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
    }, this.slots['input-wrap-start'], React.createElement('input', {
      placeholder: placeholder,
      type: 'search',
      onInput: self.onInput.bind(self),
      onChange: self.onChange.bind(self),
      onFocus: self.onFocus.bind(self),
      onBlur: self.onBlur.bind(self)
    }), React.createElement('i', {
      className: 'searchbar-icon'
    }), clearEl, this.slots['input-wrap-end']), disableEl, this.slots['inner-end'], this.slots['default']), this.slots['after-inner']);
  }

  componentDidMount() {
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
    const el = self.refs.el;

    if (form && el) {
      self.onSubmitBound = self.onSubmit.bind(self);
      el.addEventListener('submit', self.onSubmitBound, false);
    }

    self.$f7ready(() => {
      const params = Utils.noUndefinedProps({
        el: self.refs.el,
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
  }

  componentWillUnmount() {
    const self = this;

    if (self.props.form && self.refs.el) {
      self.refs.el.removeEventListener('submit', self.onSubmitBound, false);
    }

    if (self.f7Searchbar && self.f7Searchbar.destroy) self.f7Searchbar.destroy();
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
}, Mixins.colorProps));

F7Searchbar.displayName = 'f7-searchbar';
export default F7Searchbar;