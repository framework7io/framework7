import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Icon from './icon';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Chip extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onClick', 'onDeleteClick']);
    })();
  }

  onClick(event) {
    this.dispatchEvent('click', event);
  }

  onDeleteClick(event) {
    this.dispatchEvent('delete', event);
  }

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
      iconSize
    } = props;
    let iconEl;
    let mediaEl;
    let labelEl;
    let deleteEl;

    if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
      iconEl = React.createElement(F7Icon, {
        material: iconMaterial,
        f7: iconF7,
        icon: icon,
        md: iconMd,
        ios: iconIos,
        aurora: iconAurora,
        color: iconColor,
        size: iconSize
      });
    }

    if (media || iconEl || self.slots && self.slots.media) {
      const mediaClasses = Utils.classNames('chip-media', mediaTextColor && `text-color-${mediaTextColor}`, mediaBgColor && `bg-color-${mediaBgColor}`);
      mediaEl = React.createElement('div', {
        className: mediaClasses
      }, iconEl, media, this.slots['media']);
    }

    if (text || self.slots && (self.slots.text || self.slots.default && self.slots.default.length)) {
      labelEl = React.createElement('div', {
        className: 'chip-label'
      }, text, this.slots['text'], this.slots['default']);
    }

    if (deleteable) {
      deleteEl = React.createElement('a', {
        ref: __reactNode => {
          this.__reactRefs['deleteEl'] = __reactNode;
        },
        className: 'chip-delete'
      });
    }

    const classes = Utils.classNames(className, 'chip', {
      'chip-outline': outline
    }, Mixins.colorClasses(props));
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes
    }, mediaEl, labelEl, deleteEl);
  }

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
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    el.addEventListener('click', self.onClick);

    if (self.refs.deleteEl) {
      self.refs.deleteEl.addEventListener('click', self.onDeleteClick);
    }

    const {
      tooltip,
      tooltipTrigger
    } = self.props;
    if (!tooltip) return;
    self.$f7ready(f7 => {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: el,
        text: tooltip,
        trigger: tooltipTrigger
      });
    });
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

  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, newText => {
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
          trigger: self.props.tooltipTrigger
        });
        return;
      }

      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    });
  }

}

__reactComponentSetProps(F7Chip, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  media: String,
  text: [String, Number],
  deleteable: Boolean,
  mediaBgColor: String,
  mediaTextColor: String,
  outline: Boolean,
  tooltip: String,
  tooltipTrigger: String
}, Mixins.colorProps, {}, Mixins.linkIconProps));

F7Chip.displayName = 'f7-chip';
export default F7Chip;