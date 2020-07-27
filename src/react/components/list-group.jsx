import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getDataAttrs } from '../shared/utils';
import { colorClasses } from '../shared/mixins';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  mediaList? : boolean
  sortable? : boolean
  sortableOpposite? : boolean
  sortableTapHold? : boolean
  sortableMoveElements? : boolean
  COLOR_PROPS
*/

const ListGroup = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    children,
    mediaList,
    sortable,
    sortableOpposite,
    sortableTapHold,
    sortableMoveElements,
  } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

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
      ref={elRef}
      {...dataAttrs}
    >
      <ul>{children}</ul>
    </div>
  );
});

ListGroup.displayName = 'f7-list-group';

export default ListGroup;
