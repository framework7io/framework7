import f7 from '../utils/f7';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
export default {
  name: 'f7-routable-modals',
  data: function data() {
    var state = function () {
      return {
        modals: []
      };
    }();

    return {
      state: state
    };
  },
  render: function render() {
    var _h = this.$createElement;
    return _h('div', {
      ref: 'el',
      class: 'framework7-modals'
    }, [this.state.modals.map(function (modal) {
      var ModalComponent = modal.component;
      {
        return _h(ModalComponent, {
          key: modal.id,
          props: modal.props
        });
      }
    })]);
  },
  updated: function updated() {
    var self = this;
    if (!self.routerData) return;
    f7.events.emit('modalsRouterDidUpdate', self.routerData);
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    if (!self.routerData) return;
    f7.routers.modals = null;
    self.routerData = null;
    delete self.routerData;
  },
  mounted: function mounted() {
    var self = this;
    var el = self.$refs.el;
    self.routerData = {
      modals: self.state.modals,
      el: el,
      component: self,
      setModals: function setModals(modals) {
        self.setState({
          modals: modals
        });
      }
    };
    f7.routers.modals = self.routerData;
  },
  methods: {
    setState: function setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }
  }
};