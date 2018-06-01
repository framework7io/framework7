/* eslint array-callback-return: "off" */
/* eslint consistent-return: "off" */
import f7 from '../utils/f7';
import events from '../utils/events';

export default {
  name: 'f7-routable-modals',
  state() {
    return {
      modals: [],
    };
  },
  render() {
    return (
      <div ref="el" className="framework7-modals">
        {this.state.modals.map((modal) => {
          const ModalComponent = modal.component;
          if (process.env.COMPILER === 'react') {
            return (
              <ModalComponent key={modal.id} {...modal.props} />
            );
          }
          if (process.env.COMPILER === 'vue') {
            return (
              <ModalComponent key={modal.id} props={modal.props} />
            );
          }
        })}
      </div>
    );
  },
  componentDidUpdate() {
    const self = this;
    if (!self.routerData) return;
    events.emit('modalsRouterDidUpdate', self.routerData);
  },
  componentWillUnmount() {
    const self = this;
    if (!self.routerData) return;
    f7.routers.modals = null;
    self.routerData = null;
    delete self.routerData;
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    self.setState({ modals: [] });
    self.routerData = {
      el,
      component: self,
    };
    f7.routers.modals = self.routerData;
  },
};
