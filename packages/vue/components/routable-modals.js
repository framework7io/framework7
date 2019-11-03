import f7 from '../utils/f7';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
export default {
  name: 'f7-routable-modals',

  data() {
    const state = (() => {
      return {
        modals: []
      };
    })();

    return {
      state
    };
  },

  render() {
    const _h = this.$createElement;
    return _h('div', {
      ref: 'el',
      class: 'framework7-modals'
    }, [this.state.modals.map(modal => {
      const ModalComponent = modal.component;
      {
        return _h(ModalComponent, {
          key: modal.id,
          props: modal.props
        });
      }
    })]);
  },

  updated() {
    const self = this;
    if (!self.routerData) return;
    f7.events.emit('modalsRouterDidUpdate', self.routerData);
  },

  beforeDestroy() {
    const self = this;
    if (!self.routerData) return;
    f7.routers.modals = null;
    self.routerData = null;
    delete self.routerData;
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    self.routerData = {
      modals: self.state.modals,
      el,
      component: self,

      setModals(modals) {
        self.setState({
          modals
        });
      }

    };
    f7.routers.modals = self.routerData;
  },

  methods: {
    setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }

  }
};