/* eslint array-callback-return: "off" */
/* eslint consistent-return: "off" */
import f7 from '../utils/f7';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-tab',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    tabActive: Boolean,
    ...Mixins.colorProps,
  },
  state() {
    return {
      tabContent: null,
    };
  },
  render() {
    const self = this;
    const props = self.props;
    const { tabActive, id, className, style } = props;
    const tabContent = self.state.tabContent;

    const classes = Utils.classNames(
      className,
      'tab',
      {
        'tab-active': tabActive,
      },
      Mixins.colorClasses(props),
    );

    let TabContent;
    if (tabContent) TabContent = tabContent.component;
    if (process.env.COMPILER === 'react') {
      return (
        <div id={id} style={style} ref="el" className={classes}>
          {tabContent ? (
            <TabContent key={tabContent.id} {...tabContent.props} />
          ) : (
            <slot />
          )}
        </div>
      );
    }
    if (process.env.COMPILER === 'vue') {
      return (
        <div id={id} style={style} ref="el" className={classes}>
          {tabContent ? (
            <TabContent key={tabContent.id} props={tabContent.props} />
          ) : (
            <slot />
          )}
        </div>
      );
    }
  },
  componentDidCreate() {
    Utils.bindMethods(this, ['onTabShow', 'onTabHide']);
  },
  componentDidUpdate() {
    const self = this;
    if (!self.routerData) return;
    f7.events.emit('tabRouterDidUpdate', self.routerData);
  },
  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    if (el) {
      el.removeEventListener('tab:show', self.onTabShow);
      el.removeEventListener('tab:hide', self.onTabHide);
    }
    if (!self.routerData) return;
    f7.routers.tabs.splice(f7.routers.tabs.indexOf(self.routerData), 1);
    self.routerData = null;
    delete self.routerData;
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;

    if (el) {
      el.addEventListener('tab:show', self.onTabShow);
      el.addEventListener('tab:hide', self.onTabHide);
    }
    self.setState({ tabContent: null });

    self.$f7ready(() => {
      self.routerData = {
        el,
        component: self,
        setTabContent(tabContent) {
          self.setState({ tabContent });
        },
      };
      f7.routers.tabs.push(self.routerData);
    });
  },
  methods: {
    show(animate) {
      if (!this.$f7) return;
      this.$f7.tab.show(this.refs.el, animate);
    },
    onTabShow(event) {
      this.dispatchEvent('tab:show tabShow', event);
    },
    onTabHide(event) {
      this.dispatchEvent('tab:hide tabHide', event);
    },
  },
};
