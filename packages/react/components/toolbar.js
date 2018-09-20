import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Toolbar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};
  }

  hide(animate) {
    const self = this;
    if (!self.$f7) return;
    self.$f7.toolbar.hide(this.refs.el, animate);
  }

  show(animate) {
    const self = this;
    if (!self.$f7) return;
    self.$f7.toolbar.show(this.refs.el, animate);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      className,
      inner,
      bottomMd,
      tabbar,
      labels,
      scrollable,
      hidden,
      noShadow,
      noHairline
    } = props;
    const classes = Utils.classNames(className, 'toolbar', {
      'toolbar-bottom-md': bottomMd,
      tabbar,
      'tabbar-labels': labels,
      'tabbar-scrollable': scrollable,
      'toolbar-hidden': hidden,
      'no-shadow': noShadow,
      'no-hairline': noHairline
    }, Mixins.colorClasses(props));
    return React.createElement('div', {
      id: id,
      style: style,
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      className: classes
    }, this.slots['before-inner'], inner ? React.createElement('div', {
      className: 'toolbar-inner'
    }, this.slots['default']) : this.slots['default'], this.slots['after-inner']);
  }

  componentDidMount() {
    const self = this;
    self.$f7ready(f7 => {
      if (self.props.tabbar) f7.toolbar.setHighlight(self.refs.el);
    });
  }

  componentDidUpdate() {
    const self = this;

    if (self.props.tabbar && self.$f7) {
      self.$f7.toolbar.setHighlight(self.refs.el);
    }
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

__reactComponentSetProps(F7Toolbar, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  bottomMd: Boolean,
  tabbar: Boolean,
  labels: Boolean,
  scrollable: Boolean,
  hidden: Boolean,
  noShadow: Boolean,
  noHairline: Boolean,
  inner: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps));

F7Toolbar.displayName = 'f7-toolbar';
export default F7Toolbar;