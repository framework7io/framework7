import Mixins from '../utils/mixins';
import Utils from '../utils/utils';

export default {
  name: 'f7-actions-button',
  props: {
    bold: Boolean,
    close: {
      type: Boolean,
      default: true,
    },
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    let mediaEl;

    if (self.slots.media && self.slots.media.length) {
      mediaEl = (
        <div className="actions-button-media">
          <slot name="media" />
        </div>
      );
    }

    return (
      <div id={self.props.id} style={self.props.style} className={self.className} onClick={self.onClick.bind(self)}>
        { mediaEl }
        <div className="actions-button-text">
          <slot />
        </div>
      </div>
    );
  },
  computed: {
    classes() {
      const self = this;

      return Utils.classNames(
        self.props.className,
        {
          'actions-button': true,
          'actions-button-bold': self.props.bold,
        },
        Mixins.colorClasses(self),
      );
    },
  },
  methods: {
    onClick(event) {
      const self = this;
      const $$ = self.$$;
      if (self.props.close && self.$f7) {
        self.$f7.actions.close($$(self.$el).parents('.actions-modal'));
      }
      self.dispatchEvent('click', event);
    },
  },
};
