import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Badge extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};
  }

  render() {
    const props = this.props;
    const {
      className,
      id,
      style
    } = props;
    const classes = Utils.classNames(className, 'badge', Mixins.colorClasses(props));
    return React.createElement('span', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes
    }, this.slots['default']);
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

__reactComponentSetProps(F7Badge, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  tooltip: String,
  tooltipTrigger: String
}, Mixins.colorProps));

F7Badge.displayName = 'f7-badge';
export default F7Badge;