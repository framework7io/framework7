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

    this.state = (() => {
      const self = this;
      const $f7 = self.$f7;

      if (!$f7) {
        self.$f7ready(() => {
          self.setState({
            _theme: self.$theme
          });
        });
      }

      return {
        _theme: $f7 ? self.$theme : null
      };
    })();
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
    const theme = self.state._theme;
    let text = material || f7;

    if (md && theme && theme.md && (md.indexOf('material:') >= 0 || md.indexOf('f7:') >= 0)) {
      text = md.split(':')[1];
    } else if (ios && theme && theme.ios && (ios.indexOf('material:') >= 0 || ios.indexOf('f7:') >= 0)) {
      text = ios.split(':')[1];
    } else if (aurora && theme && theme.aurora && (aurora.indexOf('material:') >= 0 || aurora.indexOf('f7:') >= 0)) {
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
    const theme = self.state._theme;
    const {
      material,
      f7,
      icon,
      md,
      ios,
      aurora,
      className
    } = props;
    let themeIcon;
    if (theme && theme.ios) themeIcon = ios;else if (theme && theme.md) themeIcon = md;else if (theme && theme.aurora) themeIcon = aurora;

    if (themeIcon) {
      const parts = themeIcon.split(':');
      const prop = parts[0];
      const value = parts[1];

      if (prop === 'material' || prop === 'f7') {
        classes['material-icons'] = prop === 'material';
        classes['f7-icons'] = prop === 'f7';
      }

      if (prop === 'icon') {
        classes[value] = true;
      }
    } else {
      classes = {
        icon: true,
        'material-icons': material,
        'f7-icons': f7
      };
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
    let size = props.size;

    if (typeof size === 'number' || parseFloat(size) === size * 1) {
      size = `${size}px`;
    }

    return React.createElement('i', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: Utils.extend({
        fontSize: size,
        width: size,
        height: size
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

      if (!newText && self.f7Tooltip) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
        return;
      }

      if (newText && !self.f7Tooltip && self.$f7) {
        self.f7Tooltip = self.$f7.tooltip.create({
          targetEl: self.refs.el,
          text: newText
        });
        return;
      }

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
  icon: String,
  ios: String,
  aurora: String,
  md: String,
  tooltip: String,
  size: [String, Number]
}, Mixins.colorProps));

F7Icon.displayName = 'f7-icon';
export default F7Icon;