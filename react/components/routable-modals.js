import React from 'react';
import routers from '../utils/routers';
import events from '../utils/events';
class F7RoutableModals extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};
    this.state = (() => {
      return { modals: [] };
    })();
  }
  render() {
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      className: 'framework7-modals'
    }, this.state.modals.map(modal => {
      const ModalComponent = modal.component;
      return React.createElement(ModalComponent, {
        key: modal.id,
        ...modal.props
      });
    }));
  }
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    self.routerData = {
      el,
      component: self
    };
    routers.modals = self.routerData;
  }
  componentWillUnmount() {
    const self = this;
    if (!self.routerData)
      return;
    routers.modals = null;
    self.routerData = null;
    delete self.routerData;
  }
  componentDidUpdate() {
    const self = this;
    if (!self.routerData)
      return;
    events.emit('modalsRouterDidUpdate', self.routerData);
  }
  get refs() {
    return this.__reactRefs;
  }
  set refs(refs) {
  }
}
export default F7RoutableModals;