import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-toolbar',
  props: Object.assign({
    id: [String, Number],
    tabbar: Boolean,
    labels: Boolean,
    scrollable: Boolean,
    hidden: Boolean,
    noShadow: Boolean,
    noHairline: Boolean,
    noBorder: Boolean,
    position: {
      type: String,
      default: undefined
    },
    topMd: {
      type: Boolean,
      default: undefined
    },
    topIos: {
      type: Boolean,
      default: undefined
    },
    topAurora: {
      type: Boolean,
      default: undefined
    },
    top: {
      type: Boolean,
      default: undefined
    },
    bottomMd: {
      type: Boolean,
      default: undefined
    },
    bottomIos: {
      type: Boolean,
      default: undefined
    },
    bottomAurora: {
      type: Boolean,
      default: undefined
    },
    bottom: {
      type: Boolean,
      default: undefined
    },
    inner: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps),
  data: function data() {
    var _this = this;

    var props = __vueComponentProps(this);

    var state = function () {
      var self = _this;
      var $f7 = self.$f7;

      if (!$f7) {
        self.$f7ready(function () {
          self.setState({
            _theme: self.$theme
          });
        });
      }

      return {
        _theme: $f7 ? self.$theme : null
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
    var id = props.id,
        style = props.style,
        className = props.className,
        inner = props.inner,
        tabbar = props.tabbar,
        labels = props.labels,
        scrollable = props.scrollable,
        hidden = props.hidden,
        noShadow = props.noShadow,
        noHairline = props.noHairline,
        noBorder = props.noBorder,
        topMd = props.topMd,
        topIos = props.topIos,
        topAurora = props.topAurora,
        top = props.top,
        bottomMd = props.bottomMd,
        bottomIos = props.bottomIos,
        bottomAurora = props.bottomAurora,
        bottom = props.bottom,
        position = props.position;
    var theme = self.state._theme;
    var classes = Utils.classNames(className, 'toolbar', {
      tabbar: tabbar,
      'toolbar-bottom': theme && theme.md && bottomMd || theme && theme.ios && bottomIos || theme && theme.aurora && bottomAurora || bottom || position === 'bottom',
      'toolbar-top': theme && theme.md && topMd || theme && theme.ios && topIos || theme && theme.aurora && topAurora || top || position === 'top',
      'tabbar-labels': labels,
      'tabbar-scrollable': scrollable,
      'toolbar-hidden': hidden,
      'no-shadow': noShadow,
      'no-hairline': noHairline || noBorder
    }, Mixins.colorClasses(props));
    return _h('div', {
      style: style,
      ref: 'el',
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['before-inner'], inner ? _h('div', {
      class: 'toolbar-inner'
    }, [this.$slots['default']]) : this.$slots['default'], this.$slots['after-inner']]);
  },
  updated: function updated() {
    var self = this;

    if (self.props.tabbar && self.$f7) {
      self.$f7.toolbar.setHighlight(self.$refs.el);
    }
  },
  mounted: function mounted() {
    var self = this;
    self.$f7ready(function (f7) {
      if (self.props.tabbar) f7.toolbar.setHighlight(self.$refs.el);
    });
  },
  methods: {
    hide: function hide(animate) {
      var self = this;
      if (!self.$f7) return;
      self.$f7.toolbar.hide(this.$refs.el, animate);
    },
    show: function show(animate) {
      var self = this;
      if (!self.$f7) return;
      self.$f7.toolbar.show(this.$refs.el, animate);
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