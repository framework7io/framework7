import React, { useRef, useContext } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { ListContext } from '../shared/list-context.js';
import { setRef } from '../shared/set-ref.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  mediaList? : boolean
  sortable? : boolean
  sortableOpposite? : boolean
  sortableTapHold? : boolean
  sortableMoveElements? : boolean
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const ListGroup = (props) => {
  const {
    className,
    id,
    style,
    children,
    simpleList,
    mediaList,
    sortable,
    sortableOpposite,
    sortableTapHold,
    sortableMoveElements,
    ref,
  } = props;

  const extraAttrs = getExtraAttrs(props);

  const listContext = useContext(ListContext);

  const elRef = useRef(null);

  const classes = classNames(
    className,
    'list-group',
    {
      'media-list': mediaList,
      sortable,
      'sortable-tap-hold': sortableTapHold,
      'sortable-opposite': sortableOpposite,
    },
    colorClasses(props),
  );

  return (
    <div
      id={id}
      style={style}
      className={classes}
      data-sortable-move-elements={
        typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined
      }
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
      {...extraAttrs}
    >
      <ul>
        <ListContext.Provider
          value={{
            listIsMedia: mediaList || listContext.listIsMedia,
            listIsSimple: simpleList || listContext.listIsSimple,
            listIsSortable: sortable || listContext.listIsSortable,
            listIsSortableOpposite: sortableOpposite || listContext.listIsSortableOpposite,
          }}
        >
          {children}
        </ListContext.Provider>
      </ul>
    </div>
  );
};

ListGroup.displayName = 'f7-list-group';

export default ListGroup;
