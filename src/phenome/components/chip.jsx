import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

// eslint-disable-next-line
import F7Icon from './icon';

/* phenome-dts-imports
import { Tooltip as TooltipNamespace } from 'framework7/components/tooltip/tooltip';
*/

/* phenome-dts-instance
f7Tooltip: TooltipNamespace.Tooltip
*/

export default {
  name: 'f7-chip',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    media: String,
    text: [String, Number],
    deleteable: Boolean,
    mediaBgColor: String,
    mediaTextColor: String,
    outline: Boolean,
    tooltip: String,
    tooltipTrigger: String,
    ...Mixins.colorProps,
    ...Mixins.linkIconProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      media,
      text,
      deleteable,
      className,
      id,
      style,
      mediaTextColor,
      mediaBgColor,
      outline,
      icon,
      iconMaterial,
      iconF7,
      iconMd,
      iconIos,
      iconAurora,
      iconColor,
      iconSize,
    } = props;

    let iconEl;
    let mediaEl;
    let labelEl;
    let deleteEl;

    if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
      iconEl = (
        <F7Icon
          material={iconMaterial}
          f7={iconF7}
          icon={icon}
          md={iconMd}
          ios={iconIos}
          aurora={iconAurora}
          color={iconColor}
          size={iconSize}
        />
      );
    }
    if (media || iconEl || (self.slots && self.slots.media)) {
      const mediaClasses = Utils.classNames(
        'chip-media',
        mediaTextColor && `text-color-${mediaTextColor}`,
        mediaBgColor && `bg-color-${mediaBgColor}`,
      );
      mediaEl = (
        <div className={mediaClasses}>
          {iconEl}
          {media}
          <slot name="media" />
        </div>
      );
    }
    if (text || (self.slots && (self.slots.text || (self.slots.default && self.slots.default.length)))) {
      labelEl = (
        <div className="chip-label">
          {text}
          <slot name="text" />
          <slot name="default" />
        </div>
      );
    }
    if (deleteable) {
      deleteEl = (
        <a ref="deleteEl" className="chip-delete" />
      );
    }

    const classes = Utils.classNames(
      className,
      'chip',
      {
        'chip-outline': outline,
      },
      Mixins.colorClasses(props),
    );

    return (
      <div ref="el" id={id} style={style} className={classes}>
        {mediaEl}
        {labelEl}
        {deleteEl}
      </div>
    );
  },
  watch: {
    'props.tooltip': function watchTooltip(newText) {
      const self = this;
      if (!newText && self.f7Tooltip) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
        return;
      }
      if (newText && !self.f7Tooltip && self.$f7) {
        self.f7Tooltip = self.$f7.tooltip.create({
          targetEl: self.refs.el,
          text: newText,
          trigger: self.props.tooltipTrigger,
        });
        return;
      }
      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    },
  },
  componentDidCreate() {
    Utils.bindMethods(this, ['onClick', 'onDeleteClick']);
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    el.addEventListener('click', self.onClick);
    if (self.refs.deleteEl) {
      self.refs.deleteEl.addEventListener('click', self.onDeleteClick);
    }
    const { tooltip, tooltipTrigger } = self.props;
    if (!tooltip) return;

    self.$f7ready((f7) => {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: el,
        text: tooltip,
        trigger: tooltipTrigger,
      });
    });
  },
  componentWillUnmount() {
    const self = this;
    self.refs.el.removeEventListener('click', self.onClick);
    if (self.refs.deleteEl) {
      self.refs.deleteEl.removeEventListener('click', self.onDeleteClick);
    }
    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
    onDeleteClick(event) {
      this.dispatchEvent('delete', event);
    },
  },
};
