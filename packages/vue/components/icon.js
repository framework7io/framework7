import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-icon',
  props: Object.assign({
    id: [String, Number],
    material: String,
    f7: String,
    icon: String,
    ios: String,
    aurora: String,
    md: String,
    tooltip: String,
    size: [String, Number]
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
        style = props.style;
    var size = props.size;

    if (typeof size === 'number' || parseFloat(size) === size * 1) {
      size = "".concat(size, "px");
    }

    return _h('i', {
      ref: 'el',
      style: Utils.extend({
        fontSize: size,
        width: size,
        height: size
      }, style),
      class: self.classes,
      attrs: {
        id: id
      }
    }, [self.iconTextComputed, this.$slots['default']]);
  },
  watch: {
    'props.tooltip': function watchTooltip(newText) {
      var self = this;

      if (!newText && self.f7Tooltip) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
        return;
      }

      if (newText && !self.f7Tooltip && self.$f7) {
        self.f7Tooltip = self.$f7.tooltip.create({
          targetEl: self.$refs.el,
          text: newText
        });
        return;
      }

      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    }
  },
  mounted: function mounted() {
    var self = this;
    var el = self.$refs.el;
    if (!el) return;
    var tooltip = self.props.tooltip;
    if (!tooltip) return;
    self.$f7ready(function (f7) {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: el,
        text: tooltip
      });
    });
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  },
  computed: {
    iconTextComputed: function iconTextComputed() {
      var self = this;
      var _self$props = self.props,
          material = _self$props.material,
          f7 = _self$props.f7,
          md = _self$props.md,
          ios = _self$props.ios,
          aurora = _self$props.aurora;
      var theme = self.state._theme;
      var text = material || f7;

      if (md && theme && theme.md && (md.indexOf('material:') >= 0 || md.indexOf('f7:') >= 0)) {
        text = md.split(':')[1];
      } else if (ios && theme && theme.ios && (ios.indexOf('material:') >= 0 || ios.indexOf('f7:') >= 0)) {
        text = ios.split(':')[1];
      } else if (aurora && theme && theme.aurora && (aurora.indexOf('material:') >= 0 || aurora.indexOf('f7:') >= 0)) {
        text = aurora.split(':')[1];
      }

      return text;
    },
    classes: function classes() {
      var classes = {
        icon: true
      };
      var self = this;
      var props = self.props;
      var theme = self.state._theme;
      var material = props.material,
          f7 = props.f7,
          icon = props.icon,
          md = props.md,
          ios = props.ios,
          aurora = props.aurora,
          className = props.className;
      var themeIcon;
      if (theme && theme.ios) themeIcon = ios;else if (theme && theme.md) themeIcon = md;else if (theme && theme.aurora) themeIcon = aurora;

      if (themeIcon) {
        var parts = themeIcon.split(':');
        var prop = parts[0];
        var value = parts[1];

        if (prop === 'material' || prop === 'f7') {
          classes['material-icons'] = prop === 'material';
          classes['f7-icons'] = prop === 'f7';
        }

        if (prop === 'icon') {
          classes[value] = true;
        }
      } else {
        classes = {
          icon: true,
          'material-icons': material,
          'f7-icons': f7
        };
        if (icon) classes[icon] = true;
      }

      return Utils.classNames(className, classes, Mixins.colorClasses(props));
    },
    props: function props() {
      return __vueComponentProps(this);
    }
  },
  methods: {
    setState: function setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }
  }
};