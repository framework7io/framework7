import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Icon extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};
  }

  get sizeComputed() {
    const self = this;
    let size = self.props.size;

    if (typeof size === 'number' || parseFloat(size) === size * 1) {
      size = `${size}px`;
    }

    return size;
  }

  get iconTextComputed() {
    const self = this;
    const {
      material,
      f7,
      md,
      ios,
      aurora
    } = self.props;
    let text = material || f7;

    if (md && self.$theme.md && (md.indexOf('material:') >= 0 || md.indexOf('f7:') >= 0)) {
      text = md.split(':')[1];
    } else if (ios && self.$theme.ios && (ios.indexOf('material:') >= 0 || ios.indexOf('f7:') >= 0)) {
      text = ios.split(':')[1];
    } else if (aurora && self.$theme.aurora && (aurora.indexOf('material:') >= 0 || aurora.indexOf('f7:') >= 0)) {
      text = aurora.split(':')[1];
    }

    return text;
  }

  get classes() {
    let classes = {
      icon: true
    };
    const self = this;
    const props = self.props;
    const {
      material,
      f7,
      fa,
      ion,
      icon,
      md,
      ios,
      aurora,
      className
    } = props;
    let themeIcon;
    if (self.$theme.ios) themeIcon = ios;else if (self.$theme.md) themeIcon = md;else if (self.$theme.aurora) themeIcon = aurora;

    if (themeIcon) {
      const parts = themeIcon.split(':');
      const prop = parts[0];
      const value = parts[1];

      if (prop === 'material' || prop === 'fa' || prop === 'f7') {
        classes.fa = prop === 'fa';
        classes['material-icons'] = prop === 'material';
        classes['f7-icons'] = prop === 'f7';
      }

      if (prop === 'fa' || prop === 'ion') {
        classes[`${prop}-${value}`] = true;
      }

      if (prop === 'icon') {
        classes[value] = true;
      }
    } else {
      classes = {
        icon: true,
        'material-icons': material,
        'f7-icons': f7,
        fa
      };
      if (ion) classes[`ion-${ion}`] = true;
      if (fa) classes[`fa-${fa}`] = true;
      if (icon) classes[icon] = true;
    }

    return Utils.classNames(className, classes, Mixins.colorClasses(props));
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      style
    } = props;
    return React.createElement('i', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: Utils.extend({
        fontSize: self.sizeComputed
      }, style),
      className: self.classes
    }, self.iconTextComputed, this.slots['default']);
  }

  componentWillUnmount() {
    const self = this;

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    const {
      tooltip
    } = self.props;
    if (!tooltip) return;
    self.$f7ready(f7 => {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: el,
        text: tooltip
      });
    });
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, newText => {
      const self = this;
      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    });
  }

}

__reactComponentSetProps(F7Icon, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  material: String,
  f7: String,
  ion: String,
  fa: String,
  icon: String,
  ios: String,
  aurora: String,
  md: String,
  tooltip: String,
  size: [String, Number]
}, Mixins.colorProps));

F7Icon.displayName = 'f7-icon';
export default F7Icon;