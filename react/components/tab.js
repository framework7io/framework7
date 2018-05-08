import React from 'react';
import events from '../utils/events';
import routers from '../utils/routers';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7Tab extends React.Component {
  constructor(props, context) {
    super(props, context);
    (() => {
      this.onTabShowBound = this.onTabShow.bind(this);
      this.onTabHideBound = this.onTabHide.bind(this);
    })();
    this.state = (() => {
      return { tabContent: null };
    })();
  }
  show(animate) {
    if (!this.$f7)
      return;
    this.$f7.tab.show(this.refs.el, animate);
  }
  onTabShow(e) {
    this.dispatchEvent('tab:show tabShow', e);
  }
  onTabHide(e) {
    this.dispatchEvent('tab:hide tabHide', e);
  }
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (el) {
      el.addEventListener('tab:show', self.onTabShowBound);
      el.addEventListener('tab:hide', self.onTabHideBound);
    }
    self.setState({ tabContent: null });
    self.$f7ready(() => {
      self.routerData = {
        el,
        component: self
      };
      routers.tabs.push(self.routerData);
    });
  }
  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    if (el) {
      el.removeEventListener('tab:show', self.onTabShowBound);
      el.removeEventListener('tab:hide', self.onTabHideBound);
    }
    if (!self.routerData)
      return;
    routers.tabs.splice(routers.tabs.indexOf(self.routerData), 1);
  }
  componentDidUpdate() {
    const self = this;
    if (!self.routerData)
      return;
    events.emit('tabRouterDidUpdate', self.routerData);
  }
  render() {
    const self = this;
    const {tabActive, id, className, style} = self.props;
    const tabContent = self.state.tabContent;
    const classes = Utils.classNames(className, 'tab', { 'tab-active': tabActive }, Mixins.colorClasses(self));
    let TabContent;
    if (tabContent)
      TabContent = tabContent.component;
    return React.createElement('div', {
      id: id,
      style: style,
      ref: 'el',
      className: classes
    }, tabContent ? React.createElement(TabContent, {
      key: tabContent.id,
      ...tabContent.params
    }) : this.slots['default']);
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
}
__reactComponentSetProps(F7Tab, {
  id: [
    String,
    Number
  ],
  tabActive: Boolean,
  ...Mixins.colorProps
});
export default F7Tab;