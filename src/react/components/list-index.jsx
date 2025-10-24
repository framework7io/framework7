import React, { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';
import { watchProp } from '../shared/watch-prop.js';
import { setRef } from '../shared/set-ref.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  init? : boolean
  listEl? : string | object
  indexes? : string | Array<any>
  scrollList? : boolean
  label? : boolean
  iosItemHeight? : number
  mdItemHeight? : number
  COLOR_PROPS
  onListIndexSelect? : (itemContent?: any, itemIndex?: any) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const ListIndex = (props) => {
  const f7ListIndex = useRef(null);
  const {
    className,
    id,
    style,
    children,
    init = true,
    listEl,
    indexes = 'auto',
    scrollList = true,
    label = false,
    iosItemHeight = 14,
    mdItemHeight = 14,
    ref,
  } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const update = () => {
    if (!f7ListIndex.current) return;
    f7ListIndex.current.update();
  };
  const scrollListToIndex = (indexContent) => {
    if (!f7ListIndex.current) return;
    f7ListIndex.current.scrollListToIndex(indexContent);
  };

  watchProp(indexes, (newValue) => {
    if (!f7ListIndex.current) return;
    f7ListIndex.current.params.indexes = newValue;
    update();
  });

  const onMount = () => {
    if (!init) return;
    f7ready(() => {
      f7ListIndex.current = f7.listIndex.create({
        el: elRef.current,
        listEl,
        indexes,
        iosItemHeight,
        mdItemHeight,
        scrollList,
        label,
        on: {
          select(index, itemContent, itemIndex) {
            emit(props, 'listIndexSelect', itemContent, itemIndex);
          },
        },
      });
    });
  };

  const onDestroy = () => {
    if (f7ListIndex.current && f7ListIndex.current.destroy) {
      f7ListIndex.current.destroy();
    }
    f7ListIndex.current = null;
  };

  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  const classes = classNames(className, 'list-index', colorClasses(props));

  return (
    <div
      id={id}
      style={style}
      className={classes}
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el, { update, scrollListToIndex, f7ListIndex: () => f7ListIndex.current });
      }}
      {...extraAttrs}
    >
      {children}
    </div>
  );
};

ListIndex.displayName = 'f7-list-index';

export default ListIndex;
