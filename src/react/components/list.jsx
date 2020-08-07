import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect';
import { classNames, getExtraAttrs, getSlots, flattenArray, emit, extend } from '../shared/utils';
import { colorClasses } from '../shared/mixins';
import { f7, f7ready } from '../shared/f7';

/* dts-import
import { VirtualList } from 'framework7/types';
*/
/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  inset? : boolean
  xsmallInset? : boolean
  smallInset? : boolean
  mediumInset? : boolean
  largeInset? : boolean
  xlargeInset? : boolean
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
  noHairlines? : boolean
  noHairlinesBetween? : boolean
  noHairlinesMd? : boolean
  noHairlinesBetweenMd? : boolean
  noHairlinesIos? : boolean
  noHairlinesBetweenIos? : boolean
  noHairlinesAurora? : boolean
  noHairlinesBetweenAurora? : boolean
  noChevron? : boolean
  chevronCenter? : boolean
  tab? : boolean
  tabActive? : boolean
  form? : boolean
  formStoreData? : boolean
  inlineLabels? : boolean
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
  onTabShow? : (el?: HTMLElement) => void
  onTabHide? : (el?: HTMLElement) => void
*/

const List = forwardRef((props, ref) => {
  const f7VirtualList = useRef(null);
  const {
    className,
    id,
    style,
    inset,
    xsmallInset,
    smallInset,
    mediumInset,
    largeInset,
    xlargeInset,
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
    noHairlines,
    noHairlinesBetween,
    noHairlinesMd,
    noHairlinesBetweenMd,
    noHairlinesIos,
    noHairlinesBetweenIos,
    noHairlinesAurora,
    noHairlinesBetweenAurora,
    noChevron,
    chevronCenter,
    tab,
    tabActive,
    form,
    formStoreData,
    inlineLabels,
    virtualList,
    virtualListParams,
  } = props;
  const dataAttrs = getExtraAttrs(props);

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
  const onTabShow = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'tabShow', el);
  };
  const onTabHide = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'tabHide', el);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7VirtualList: () => f7VirtualList.current,
  }));

  const onMount = () => {
    f7ready(() => {
      f7.on('sortableEnable', onSortableEnable);
      f7.on('sortableDisable', onSortableDisable);
      f7.on('sortableSort', onSortableSort);
      f7.on('tabShow', onTabShow);
      f7.on('tabHide', onTabHide);

      if (!virtualList) return;
      const vlParams = virtualListParams || {};
      if (!vlParams.renderItem && !vlParams.itemTemplate && !vlParams.renderExternal) return;

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
    f7.off('sortableEnable', onSortableEnable);
    f7.off('sortableDisable', onSortableDisable);
    f7.off('sortableSort', onSortableSort);
    f7.off('tabShow', onTabShow);
    f7.off('tabHide', onTabHide);

    if (!(virtualList && f7VirtualList.current)) return;
    if (f7VirtualList.current.destroy) f7VirtualList.current.destroy();
  };

  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

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
      'xsmall-inset': xsmallInset,
      'small-inset': smallInset,
      'medium-inset': mediumInset,
      'large-inset': largeInset,
      'xlarge-inset': xlargeInset,
      'media-list': mediaList,
      'simple-list': simpleList,
      'links-list': linksList,
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
      'no-hairlines': noHairlines,
      'no-hairlines-md': noHairlinesMd,
      'no-hairlines-ios': noHairlinesIos,
      'no-hairlines-aurora': noHairlinesAurora,
      'no-hairlines-between': noHairlinesBetween,
      'no-hairlines-between-md': noHairlinesBetweenMd,
      'no-hairlines-between-ios': noHairlinesBetweenIos,
      'no-hairlines-between-aurora': noHairlinesBetweenAurora,
      'form-store-data': formStoreData,
      'inline-labels': inlineLabels,
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
      {...dataAttrs}
      data-sortable-move-elements={
        typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined
      }
      onSubmit={onSubmit}
    >
      {slots['before-list']}
      {rootChildrenBeforeList}
      {ulChildren.length > 0 && <ul>{ulChildren}</ul>}

      {slots['after-list']}
      {rootChildrenAfterList}
    </ListTag>
  );
});

List.displayName = 'f7-list';

export default List;
