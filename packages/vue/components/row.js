import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-row',
  props: Object.assign({
    id: [String, Number],
    noGap: Boolean,
    tag: {
      type: String,
      default: 'div'
    },
    resizable: Boolean,
    resizableFixed: Boolean,
    resizableAbsolute: Boolean,
    resizableHandler: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var className = props.className,
        id = props.id,
        style = props.style,
        tag = props.tag,
        noGap = props.noGap,
        resizable = props.resizable,
        resizableFixed = props.resizableFixed,
        resizableAbsolute = props.resizableAbsolute,
        resizableHandler = props.resizableHandler;
    var RowTag = tag;
    var classes = Utils.classNames(className, 'row', {
      'no-gap': noGap,
      resizable: resizable,
      'resizable-fixed': resizableFixed,
      'resizable-absolute': resizableAbsolute
    }, Mixins.colorClasses(props));
    return _h(RowTag, {
      style: style,
      class: classes,
      ref: 'el',
      attrs: {
        id: id
      }
    }, [this.$slots['default'], resizable && resizableHandler && _h('span', {
      class: 'resize-handler'
    })]);
  },
  created: function created() {
    Utils.bindMethods(this, ['onClick', 'onResize']);
  },
  mounted: function mounted() {
    var self = this;
    self.eventTargetEl = self.$refs.el;
    self.eventTargetEl.addEventListener('click', self.onClick);
    self.$f7ready(function (f7) {
      f7.on('gridResize', self.onResize);
    });
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    var el = self.$refs.el;
    if (!el || !self.$f7) return;
    el.removeEventListener('click', self.onClick);
    self.$f7.off('gridResize', self.onResize);
    delete self.eventTargetEl;
  },
  methods: {
    onClick: function onClick(event) {
      this.dispatchEvent('click', event);
    },
    onResize: function onResize(el) {
      if (el === this.eventTargetEl) {
        this.dispatchEvent('grid:resize gridResize');
      }
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};