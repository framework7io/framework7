import routers from '../utils/routers';
import events from '../utils/events';
import __vueComponentTransformJSXProps from '../runtime-helpers/vue-component-transform-jsx-props.js';
export default {
  name: 'f7-routable-modals',
  data() {
    const state = (() => {
      return { modals: [] };
    })();
    return { state };
  },
  render() {
    const _h = this.$createElement;
    return _h('div', {
      ref: 'el',
      class: 'framework7-modals'
    }, [this.state.modals.map(modal => {
        const ModalComponent = modal.component;
        return _h(ModalComponent, __vueComponentTransformJSXProps({
          key: modal.id,
          ...modal.props
        }));
      })]);
  },
  updated() {
    const self = this;
    if (!self.routerData)
      return;
    events.emit('modalsRouterDidUpdate', self.routerData);
  },
  beforeDestroy() {
    const self = this;
    if (!self.routerData)
      return;
    routers.modals = null;
    self.routerData = null;
    delete self.routerData;
  },
  mounted() {
    const self = this;
    const el = self.$refs.el;
    self.routerData = {
      el,
      component: self
    };
    routers.modals = self.routerData;
  }
};