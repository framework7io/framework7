import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs, getSlots, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { useTooltip } from '../shared/use-tooltip.js';
import { useIcon } from '../shared/use-icon.js';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  media? : string
  text? : string | number
  deleteable? : boolean
  mediaBgColor? : string
  mediaTextColor? : string
  outline? : boolean
  tooltip? : string
  tooltipTrigger? : string
  onClick? : (event?: any) => void
  onDelete? : (event?: any) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
  ICON_PROPS
*/

const Chip = forwardRef((props, ref) => {
  const { className, id, style, media, text, deleteable, mediaTextColor, mediaBgColor, outline } =
    props;
  const extraAttrs = getExtraAttrs(props);

  const onClick = (event) => {
    emit(props, 'click', event);
  };

  const onDeleteClick = (event) => {
    emit(props, 'delete', event);
  };

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  useTooltip(elRef, props);

  const slots = getSlots(props);

  const iconEl = useIcon(props);
  let mediaEl;
  let labelEl;
  let deleteEl;

  if (media || iconEl || (slots && slots.media)) {
    const mediaClasses = classNames(
      'chip-media',
      mediaTextColor && `text-color-${mediaTextColor}`,
      mediaBgColor && `bg-color-${mediaBgColor}`,
    );
    mediaEl = (
      <div className={mediaClasses}>
        {iconEl}
        {media}
        {slots.media}
      </div>
    );
  }
  if (text || (slots && (slots.text || (slots.default && slots.default.length)))) {
    labelEl = (
      <div className="chip-label">
        {text}
        {slots.text}
        {slots.default}
      </div>
    );
  }
  if (deleteable) {
    deleteEl = <a className="chip-delete" onClick={onDeleteClick} />;
  }

  const classes = classNames(
    className,
    'chip',
    {
      'chip-outline': outline,
    },
    colorClasses(props),
  );

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs} onClick={onClick}>
      {mediaEl}
      {labelEl}
      {deleteEl}
    </div>
  );
});

Chip.displayName = 'f7-chip';

export default Chip;
