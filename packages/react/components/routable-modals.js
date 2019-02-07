import React from 'react';
import f7 from '../utils/f7';
import events from '../utils/events';

class F7RoutableModals extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    this.state = (() => {
      return {
        modals: []
      };
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
      {
        return React.createElement(ModalComponent, Object.assign({
          key: modal.id
        }, modal.props));
      }
    }));
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    self.setState({
      modals: []
    });
    self.routerData = {
      el,
      component: self
    };
    f7.routers.modals = self.routerData;
  }

  componentWillUnmount() {
    const self = this;
    if (!self.routerData) return;
    f7.routers.modals = null;
    self.routerData = null;
    delete self.routerData;
  }

  componentDidUpdate() {
    const self = this;
    if (!self.routerData) return;
    events.emit('modalsRouterDidUpdate', self.routerData);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

F7RoutableModals.displayName = 'f7-routable-modals';
export default F7RoutableModals;