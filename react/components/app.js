import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import f7Plugin from '../utils/plugin';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const self = this;
    const classes = Utils.classNames(self.props.className, { 'framework7-root': true }, Mixins.colorClasses(self));
    return React.createElement('div', {
      ref: 'el',
      id: 'framework7-root',
      className: classes
    }, this.slots['default']);
  }
  componentDidMount() {
    const self = this;
    const {params = {}, routes} = self.props;
    const el = self.refs.el;
    const parentEl = el.parentNode;
    if (parentEl && parentEl !== document.body && parentEl.parentNode === document.body) {
      parentEl.style.height = '100%';
    }
    f7Plugin.init(el, params, routes);
  }
  get slots() {
    return __reactComponentSlots(this);
  }
}
__reactComponentSetProps(F7App, {
  params: Object,
  routes: Array
});
export default F7App;