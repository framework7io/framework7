import f7 from '../utils/f7';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-tab',
  props: Object.assign({
    id: [String, Number],
    tabActive: Boolean
  }, Mixins.colorProps),

  data() {
    const props = __vueComponentProps(this);

    const state = (() => {
      return {
        tabContent: null
      };
    })();

    return {
      state
    };
  },

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      tabActive,
      id,
      className,
      style
    } = props;
    const tabContent = self.state.tabContent;
    const classes = Utils.classNames(className, 'tab', {
      'tab-active': tabActive
    }, Mixins.colorClasses(props));
    let TabContent;
    if (tabContent) TabContent = tabContent.component;
    {
      return _h('div', {
        style: style,
        ref: 'el',
        class: classes,
        attrs: {
          id: id
        }
      }, [tabContent ? _h(TabContent, {
        key: tabContent.id,
        props: tabContent.props
      }) : this.$slots['default']]);
    }
  },

  created() {
    Utils.bindMethods(this, ['onTabShow', 'onTabHide']);
  },

  updated() {
    const self = this;
    if (!self.routerData) return;
    f7.events.emit('tabRouterDidUpdate', self.routerData);
  },

  beforeDestroy() {
    const self = this;

    if (self.$f7) {
      self.$f7.off('tabShow', self.onTabShow);
      self.$f7.off('tabHide', self.onTabHide);
    }

    if (!self.routerData) return;
    f7.routers.tabs.splice(f7.routers.tabs.indexOf(self.routerData), 1);
    self.routerData = null;
    self.eventTargetEl = null;
    delete self.routerData;
    delete self.eventTargetEl;
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    self.setState({
      tabContent: null
    });
    self.$f7ready(() => {
      self.$f7.on('tabShow', self.onTabShow);
      self.$f7.on('tabHide', self.onTabHide);
      self.eventTargetEl = el;
      self.routerData = {
        el,
        component: self,

        setTabContent(tabContent) {
          self.setState({
            tabContent
          });
        }

      };
      f7.routers.tabs.push(self.routerData);
    });
  },

  methods: {
    show(animate) {
      if (!this.$f7) return;
      this.$f7.tab.show(this.$refs.el, animate);
    },

    onTabShow(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tab:show tabShow', el);
    },

    onTabHide(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tab:hide tabHide', el);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    },

    setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};