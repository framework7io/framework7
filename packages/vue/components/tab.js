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
  data: function data() {
    var props = __vueComponentProps(this);

    var state = function () {
      return {
        tabContent: null
      };
    }();

    return {
      state: state
    };
  },
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var tabActive = props.tabActive,
        id = props.id,
        className = props.className,
        style = props.style;
    var tabContent = self.state.tabContent;
    var classes = Utils.classNames(className, 'tab', {
      'tab-active': tabActive
    }, Mixins.colorClasses(props));
    var TabContent;
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
  created: function created() {
    Utils.bindMethods(this, ['onTabShow', 'onTabHide']);
  },
  updated: function updated() {
    var self = this;
    if (!self.routerData) return;
    f7.events.emit('tabRouterDidUpdate', self.routerData);
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;

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
  mounted: function mounted() {
    var self = this;
    var el = self.$refs.el;
    self.setState({
      tabContent: null
    });
    self.$f7ready(function () {
      self.$f7.on('tabShow', self.onTabShow);
      self.$f7.on('tabHide', self.onTabHide);
      self.eventTargetEl = el;
      self.routerData = {
        el: el,
        component: self,
        setTabContent: function setTabContent(tabContent) {
          self.setState({
            tabContent: tabContent
          });
        }
      };
      f7.routers.tabs.push(self.routerData);
    });
  },
  methods: {
    show: function show(animate) {
      if (!this.$f7) return;
      this.$f7.tab.show(this.$refs.el, animate);
    },
    onTabShow: function onTabShow(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tab:show tabShow');
    },
    onTabHide: function onTabHide(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tab:hide tabHide');
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    },
    setState: function setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};