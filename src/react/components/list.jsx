import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import {
  classNames,
  getExtraAttrs,
  getSlots,
  flattenArray,
  emit,
  extend,
} from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { f7, f7ready } from '../shared/f7.js';
import { ListContext } from '../shared/list-context.js';
import { useTab } from '../shared/use-tab.js';

/* dts-imports
import { VirtualList } from 'framework7/types';
*/
/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  inset? : boolean
  insetIos? : boolean
  insetMd? : boolean
  xsmallInset? : boolean
  xsmallInsetIos? : boolean
  xsmallInsetMd? : boolean
  smallInset? : boolean
  smallInsetIos? : boolean
  smallInsetMd? : boolean
  mediumInset? : boolean
  mediumInsetIos? : boolean
  mediumInsetMd? : boolean
  largeInset? : boolean
  largeInsetIos? : boolean
  largeInsetMd? : boolean
  xlargeInset? : boolean
  xlargeInsetIos? : boolean
  xlargeInsetMd? : boolean
  strong?: boolean
  strongIos?: boolean
  strongMd?: boolean
  outline?: boolean
  outlineIos?: boolean
  outlineMd?: boolean
  dividers?: boolean
  dividersIos?: boolean
  dividersMd?: boolean
  mediaList? : boolean
  sortable? : boolean
  sortableTapHold? : boolean
  sortableEnabled? : boolean
  sortableMoveElements? : boolean
  sortableOpposite? : boolean
  accordionList? : boolean
  accordionOpposite? : boolean
  contactsList? : boolean
  simpleList? : boolean
  linksList? : boolean
  menuList? : boolean
  noChevron? : boolean
  chevronCenter? : boolean
  tab? : boolean
  tabActive? : boolean
  form? : boolean
  formStoreData? : boolean
  virtualList? : boolean
  virtualListParams? : Object
  COLOR_PROPS
  onVirtualItemBeforeInsert? : (vl?: VirtualList.VirtualList, itemEl?: HTMLElement, item?: any) => void
  onVirtualBeforeClear? : (vl?: VirtualList.VirtualList, fragment?: any) => void
  onVirtualItemsBeforeInsert? : (vl?: VirtualList.VirtualList, fragment?: any) => void
  onVirtualItemsAfterInsert? : (vl?: VirtualList.VirtualList, fragment?: any) => void
  onSubmit? : (event?: any) => void
  onSortableEnable? : (...args: any[]) => void
  onSortableDisable? : (...args: any[]) => void
  onSortableSort? : (sortData?: any) => void
  onSortableMove? : (itemEl?: any) => void
  onTabShow? : (el?: HTMLElement) => void
  onTabHide? : (el?: HTMLElement) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null; f7VirtualList: () => VirtualList.VirtualList}>;
  children?: React.ReactNode;
*/

const List = forwardRef((props, ref) => {
  const f7VirtualList = useRef(null);
  const {
    className,
    id,
    style,
    inset,
    insetIos,
    insetMd,
    xsmallInset,
    xsmallInsetIos,
    xsmallInsetMd,
    smallInset,
    smallInsetIos,
    smallInsetMd,
    mediumInset,
    mediumInsetIos,
    mediumInsetMd,
    largeInset,
    largeInsetIos,
    largeInsetMd,
    xlargeInset,
    xlargeInsetIos,
    xlargeInsetMd,
    strong,
    strongIos,
    strongMd,
    outline,
    outlineIos,
    outlineMd,
    dividers,
    dividersIos,
    dividersMd,
    mediaList,
    sortable,
    sortableTapHold,
    sortableEnabled,
    sortableMoveElements,
    sortableOpposite,
    accordionList,
    accordionOpposite,
    contactsList,
    simpleList,
    linksList,
    menuList,
    noChevron,
    chevronCenter,
    tab,
    tabActive,
    form,
    formStoreData,
    virtualList,
    virtualListParams,
  } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onSubmit = (event) => {
    emit(props, 'submit', event);
  };
  const onSortableEnable = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'sortableEnable');
  };
  const onSortableDisable = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'sortableDisable');
  };
  const onSortableSort = (el, sortData, listEl) => {
    if (elRef.current !== listEl) return;
    emit(props, 'sortableSort', sortData);
  };

  const onSortableMove = (el, listEl) => {
    if (elRef.current !== listEl) return;
    emit(props, 'sortableMove', el, listEl);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7VirtualList: () => f7VirtualList.current,
  }));

  useTab(elRef, props);

  const attachEvents = () => {
    f7ready(() => {
      f7.on('sortableEnable', onSortableEnable);
      f7.on('sortableDisable', onSortableDisable);
      f7.on('sortableSort', onSortableSort);
      f7.on('sortableMove', onSortableMove);
    });
  };

  const detachEvents = () => {
    if (!f7) return;
    f7.off('sortableEnable', onSortableEnable);
    f7.off('sortableDisable', onSortableDisable);
    f7.off('sortableSort', onSortableSort);
    f7.off('sortableMove', onSortableMove);
  };

  const onMount = () => {
    f7ready(() => {
      if (!virtualList) return;
      const vlParams = virtualListParams || {};
      if (!vlParams.renderItem && !vlParams.renderExternal) return;

      f7VirtualList.current = f7.virtualList.create(
        extend(
          {
            el: elRef.current,
            on: {
              itemBeforeInsert(itemEl, item) {
                const vl = this;
                emit(props, 'virtualItemBeforeInsert', vl, itemEl, item);
              },
              beforeClear(fragment) {
                const vl = this;
                emit(props, 'virtualBeforeClear', vl, fragment);
              },
              itemsBeforeInsert(fragment) {
                const vl = this;
                emit(props, 'virtualItemsBeforeInsert', vl, fragment);
              },
              itemsAfterInsert(fragment) {
                const vl = this;
                emit(props, 'virtualItemsAfterInsert', vl, fragment);
              },
            },
          },
          vlParams,
        ),
      );
    });
  };

  const onDestroy = () => {
    if (!f7) return;

    if (!(virtualList && f7VirtualList.current)) return;
    if (f7VirtualList.current.destroy) f7VirtualList.current.destroy();
    f7VirtualList.current = null;
  };

  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  useIsomorphicLayoutEffect(() => {
    attachEvents();
    return detachEvents;
  });

  const slots = getSlots(props);

  const { list: slotsList, default: slotsDefault } = slots;
  const rootChildrenBeforeList = [];
  const rootChildrenAfterList = [];
  const ulChildren = slotsList || [];
  const flattenSlots = flattenArray(slotsDefault);

  let wasUlChild = false;
  flattenSlots.forEach((child) => {
    if (typeof child === 'undefined') return;
    let tag = child.type && (child.type.displayName || child.type.name);
    if (!tag && typeof child.type === 'string') {
      tag = child.type;
    }

    if (
      !tag ||
      (tag &&
        !(
          tag === 'li' ||
          tag.indexOf('f7-list-item') >= 0 ||
          tag.indexOf('f7-list-button') >= 0 ||
          tag.indexOf('f7-list-input') >= 0
        ))
    ) {
      if (wasUlChild) rootChildrenAfterList.push(child);
      else rootChildrenBeforeList.push(child);
    } else if (tag) {
      wasUlChild = true;
      ulChildren.push(child);
    }
  });
  const ListTag = form ? 'form' : 'div';

  const classes = classNames(
    className,
    'list',
    {
      inset,
      'inset-ios': insetIos,
      'inset-md': insetMd,
      'xsmall-inset': xsmallInset,
      'xsmall-inset-ios': xsmallInsetIos,
      'xsmall-inset-md': xsmallInsetMd,
      'small-inset': smallInset,
      'small-inset-ios': smallInsetIos,
      'small-inset-md': smallInsetMd,
      'medium-inset': mediumInset,
      'medium-inset-ios': mediumInsetIos,
      'medium-inset-md': mediumInsetMd,
      'large-inset': largeInset,
      'large-inset-ios': largeInsetIos,
      'large-inset-md': largeInsetMd,
      'xlarge-inset': xlargeInset,
      'xlarge-inset-ios': xlargeInsetIos,
      'xlarge-inset-md': xlargeInsetMd,
      'list-strong': strong,
      'list-strong-ios': strongIos,
      'list-strong-md': strongMd,
      'list-outline': outline,
      'list-outline-ios': outlineIos,
      'list-outline-md': outlineMd,
      'list-dividers': dividers,
      'list-dividers-ios': dividersIos,
      'list-dividers-md': dividersMd,
      'media-list': mediaList,
      'simple-list': simpleList,
      'links-list': linksList,
      'menu-list': menuList,
      sortable,
      'sortable-tap-hold': sortableTapHold,
      'sortable-enabled': sortableEnabled,
      'sortable-opposite': sortableOpposite,
      'accordion-list': accordionList,
      'accordion-opposite': accordionOpposite,
      'contacts-list': contactsList,
      'virtual-list': virtualList,
      tab,
      'tab-active': tabActive,
      'form-store-data': formStoreData,
      'no-chevron': noChevron,
      'chevron-center': chevronCenter,
    },
    colorClasses(props),
  );

  return (
    <ListTag
      id={id}
      ref={elRef}
      style={style}
      className={classes}
      {...extraAttrs}
      data-sortable-move-elements={
        typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined
      }
      onSubmit={onSubmit}
    >
      <ListContext.Provider
        value={{
          listIsMedia: mediaList,
          listIsSimple: simpleList,
          listIsSortable: sortable,
          listIsSortableOpposite: sortableOpposite,
        }}
      >
        {slots['before-list']}
        {rootChildrenBeforeList}

        {ulChildren.length > 0 && <ul>{ulChildren}</ul>}

        {slots['after-list']}
        {rootChildrenAfterList}
      </ListContext.Provider>
    </ListTag>
  );
});

List.displayName = 'f7-list';

export default List;
