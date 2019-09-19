import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import f7 from '../utils/f7';
import RoutableModals from './routable-modals';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      className
    } = props;
    const classes = Utils.classNames(className, 'framework7-root', Mixins.colorClasses(props));
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id || 'framework7-root',
      style: style,
      className: classes
    }, this.slots['default'], React.createElement(RoutableModals, null));
  }

  componentDidMount() {
    const self = this;
    const {
      params = {},
      routes
    } = self.props;
    const el = self.refs.el;
    const parentEl = el.parentNode;

    if (parentEl && parentEl !== document.body && parentEl.parentNode === document.body) {
      parentEl.style.height = '100%';
    }

    f7.init(el, params, routes);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

__reactComponentSetProps(F7App, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  params: Object,
  routes: Array
}, Mixins.colorProps));

F7App.displayName = 'f7-app';
export default F7App;