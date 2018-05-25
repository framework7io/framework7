import routers from '../utils/routers';
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
          return (
            <ModalComponent key={modal.id} {...modal.props} />
          );
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
    routers.modals = null;
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
    routers.modals = self.routerData;
  },
};
