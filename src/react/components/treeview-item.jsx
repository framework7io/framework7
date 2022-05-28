import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { classNames, getExtraAttrs, getSlots, emit } from '../shared/utils.js';
import {
  colorClasses,
  actionsAttrs,
  actionsClasses,
  routerAttrs,
  routerClasses,
} from '../shared/mixins.js';
import { useIcon } from '../shared/use-icon.js';
import { f7ready, f7 } from '../shared/f7.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  toggle? : boolean
  itemToggle? : boolean
  selectable? : boolean
  selected? : boolean
  opened? : boolean
  label? : string
  loadChildren? : boolean
  link? : boolean | string
  COLOR_PROPS
  ACTIONS_PROPS
  ROUTER_PROPS
  ICON_PROPS
  onClick? : (event?: any) => void
  onTreeviewOpen? : (el?: HTMLElement) => void
  onTreeviewClose? : (el?: HTMLElement) => void
  onTreeviewLoadChildren? : (el?: HTMLElement, done?: any) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const TreeviewItem = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    toggle,
    itemToggle,
    selectable,
    selected,
    opened,
    label,
    loadChildren,
    link,
  } = props;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onClick = (event) => {
    emit(props, 'click', event);
  };
  const onOpen = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'treeviewOpen', el);
  };
  const onClose = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'treeviewClose', el);
  };
  const onLoadChildren = (el, done) => {
    if (elRef.current !== el) return;
    emit(props, 'treeviewLoadChildren', el, done);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const attachEvents = () => {
    if (!elRef.current) return;
    f7ready(() => {
      f7.on('treeviewOpen', onOpen);
      f7.on('treeviewClose', onClose);
      f7.on('treeviewLoadChildren', onLoadChildren);
    });
  };

  const detachEvents = () => {
    if (!f7) return;
    f7.off('treeviewOpen', onOpen);
    f7.off('treeviewClose', onClose);
    f7.off('treeviewLoadChildren', onLoadChildren);
  };

  useIsomorphicLayoutEffect(() => {
    attachEvents();
    return detachEvents;
  });

  const slots = getSlots(props);
  const hasChildren =
    (slots.default && slots.default.length) ||
    (slots.children && slots.children.length) ||
    (slots['children-start'] && slots['children-start'].length);
  const needToggle = typeof toggle === 'undefined' ? hasChildren : toggle;

  const iconEl = useIcon(props);

  const TreeviewRootTag = link || link === '' ? 'a' : 'div';

  const classes = classNames(
    className,
    'treeview-item',
    {
      'treeview-item-opened': opened,
      'treeview-load-children': loadChildren,
    },
    colorClasses(props),
  );

  const itemRootClasses = classNames(
    'treeview-item-root',
    {
      'treeview-item-selectable': selectable,
      'treeview-item-selected': selected,
      'treeview-item-toggle': itemToggle,
    },
    routerClasses(props),
    actionsClasses(props),
  );

  let href = link;
  if (link === true) href = '#';
  if (link === false) href = undefined; // no href attribute
  const itemRootAttrs = {
    href,
    ...routerAttrs(props),
    ...actionsAttrs(props),
  };

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      <TreeviewRootTag onClick={onClick} className={itemRootClasses} {...itemRootAttrs}>
        {slots['root-start']}
        {needToggle && <div className="treeview-toggle"></div>}
        <div className="treeview-item-content">
          {slots['content-start']}
          {iconEl}
          {slots.media}
          <div className="treeview-item-label">
            {slots['label-start']}
            {label}
            {slots.label}
          </div>
          {slots.content}
          {slots['content-end']}
        </div>
        {slots.root}
        {slots['root-end']}
      </TreeviewRootTag>
      {hasChildren && (
        <div className="treeview-item-children">
          {slots['children-start']}
          {slots.default}
          {slots.children}
        </div>
      )}
    </div>
  );
});

TreeviewItem.displayName = 'f7-treeview-item';

export default TreeviewItem;
