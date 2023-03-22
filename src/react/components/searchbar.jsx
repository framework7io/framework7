import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { classNames, getExtraAttrs, getSlots, noUndefinedProps, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';

/* dts-imports
import { Searchbar } from 'framework7/types';
*/

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  outline? : boolean
  form? : boolean
  placeholder? : string
  disableButton? : boolean
  disableButtonText? : string
  clearButton? : boolean
  value? : string | number | Array<any>
  inputEvents? : string
  expandable? : boolean
  inline? : boolean
  searchContainer? : string | object
  searchIn? : string
  searchItem? : string
  searchGroup? : string
  searchGroupTitle? : string
  foundEl? : string | object
  notFoundEl? : string | object
  backdrop? : boolean
  backdropEl? : string | object
  hideOnEnableEl? : string | object
  hideOnSearchEl? : string | object
  ignore? : string
  customSearch? : boolean
  removeDiacritics? : boolean
  hideGroupTitles? : boolean
  hideGroups? : boolean
  init? : boolean
  COLOR_PROPS
  onSearchbarSearch? : (searchbar?: Searchbar.Searchbar, query?: any, previousQuery?: any) => void
  onSearchbarClear? : (searchbar?: Searchbar.Searchbar, previousQuery?: any) => void
  onSearchbarEnable? : (searchbar?: Searchbar.Searchbar) => void
  onSearchbarDisable? : (searchbar?: Searchbar.Searchbar) => void
  onChange? : (event?: any) => void
  onInput? : (event?: any) => void
  onFocus? : (event?: any) => void
  onBlur? : (event?: any) => void
  onSubmit? : (event?: any) => void
  onClickClear? : (event?: any) => void
  onClickDisable? : (event?: any) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null; f7Searchbar: () => Searchbar.Searchbar;}>;
  children?: React.ReactNode;
*/

const Searchbar = forwardRef((props, ref) => {
  const f7Searchbar = useRef(null);
  const {
    className,
    id,
    style,
    outline = true,
    form = true,
    placeholder = 'Search',
    spellcheck,
    disableButton = true,
    disableButtonText = 'Cancel',
    clearButton = true,
    // Input Value
    value,
    // SB Params
    inputEvents = 'change input compositionend',
    expandable,
    inline,
    searchContainer,
    searchIn = '.item-title',
    searchItem = 'li',
    searchGroup = '.list-group',
    searchGroupTitle = '.list-group-title',
    foundEl = '.searchbar-found',
    notFoundEl = '.searchbar-not-found',
    backdrop,
    backdropEl,
    hideOnEnableEl = '.searchbar-hide-on-enable',
    hideOnSearchEl = '.searchbar-hide-on-search',
    ignore = '.searchbar-ignore',
    customSearch = false,
    removeDiacritics = false,
    hideGroupTitles = true,
    hideGroups = true,
    init = true,
  } = props;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const search = (query) => {
    if (!f7Searchbar.current) return undefined;
    return f7Searchbar.current.search(query);
  };
  const enable = () => {
    if (!f7Searchbar.current) return undefined;
    return f7Searchbar.current.enable();
  };
  const disable = () => {
    if (!f7Searchbar.current) return undefined;
    return f7Searchbar.current.disable();
  };
  const toggle = () => {
    if (!f7Searchbar.current) return undefined;
    return f7Searchbar.current.toggle();
  };
  const clear = () => {
    if (!f7Searchbar.current) return undefined;
    return f7Searchbar.current.clear();
  };
  const onChange = (event) => {
    emit(props, 'change', event);
  };
  const onInput = (event) => {
    emit(props, 'input', event);
  };
  const onFocus = (event) => {
    emit(props, 'focus', event);
  };
  const onBlur = (event) => {
    emit(props, 'blur', event);
  };
  const onSubmit = (event) => {
    emit(props, 'submit', event);
  };
  const onClearButtonClick = (event) => {
    emit(props, 'click:clear clickClear', event);
  };
  const onDisableButtonClick = (event) => {
    emit(props, 'click:disable clickDisable', event);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7Searchbar: () => f7Searchbar.current,
    search,
    enable,
    disable,
    toggle,
    clear,
  }));

  const onMount = () => {
    if (!init) return;

    f7ready(() => {
      const params = noUndefinedProps({
        el: elRef.current,
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
        hideGroupTitles,
        hideGroups,
        expandable,
        inline,
        on: {
          search(searchbar, query, previousQuery) {
            emit(props, 'searchbarSearch', searchbar, query, previousQuery);
          },
          clear(searchbar, previousQuery) {
            emit(props, 'searchbarClear', searchbar, previousQuery);
          },
          enable(searchbar) {
            emit(props, 'searchbarEnable', searchbar);
          },
          disable(searchbar) {
            emit(props, 'searchbarDisable', searchbar);
          },
        },
      });
      Object.keys(params).forEach((key) => {
        if (params[key] === '') {
          delete params[key];
        }
      });
      f7Searchbar.current = f7.searchbar.create(params);
    });
  };

  const onDestroy = () => {
    if (f7Searchbar.current && f7Searchbar.current.destroy) f7Searchbar.current.destroy();
    f7Searchbar.current = null;
  };

  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  let clearEl;
  let disableEl;

  if (clearButton) {
    clearEl = <span className="input-clear-button" onClick={onClearButtonClick} />;
  }
  if (disableButton) {
    disableEl = (
      <span className="searchbar-disable-button" onClick={onDisableButtonClick}>
        {disableButtonText}
      </span>
    );
  }

  const SearchbarTag = form ? 'form' : 'div';

  const classes = classNames(
    className,
    'searchbar',
    {
      'searchbar-inline': inline,
      'no-outline': !outline,
      'searchbar-expandable': expandable,
    },
    colorClasses(props),
  );

  const slots = getSlots(props);

  return (
    <SearchbarTag
      ref={elRef}
      id={id}
      style={style}
      className={classes}
      {...extraAttrs}
      onSubmit={onSubmit}
    >
      {slots['before-inner']}
      <div className="searchbar-inner">
        {slots['inner-start']}
        <div className="searchbar-input-wrap">
          {slots['input-wrap-start']}
          <input
            value={value}
            placeholder={placeholder}
            spellCheck={spellcheck}
            type="search"
            onInput={onInput}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <i className="searchbar-icon" />
          {clearEl}
          {slots['input-wrap-end']}
        </div>
        {disableEl}
        {slots['inner-end']}
        {slots.default}
      </div>
      {slots['after-inner']}
    </SearchbarTag>
  );
});

Searchbar.displayName = 'f7-searchbar';

export default Searchbar;
