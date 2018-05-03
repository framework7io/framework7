import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

const ChipProps = Utils.extend({
  media: String,
  text: [String, Number],
  deleteable: Boolean,
  mediaBgColor: String,
  mediaTextColor: String,
  onDelete: Function,
}, Mixins.colorProps);

export default {
  name: 'f7-chip',
  props: ChipProps,
  render() {
    const self = this;
    let mediaEl;
    let labelEl;
    let deleteEl;
    if (self.props.media || (self.slots && self.slots.media)) {
      mediaEl = (
        <div className={self.mediaClasses}>
          {self.props.media ? self.props.media : (<slot name="media" />)}
        </div>
      );
    }
    if (self.props.text || (self.slots && self.slots.text)) {
      labelEl = (
        <div className="chip-label">
          {self.props.text}
          <slot name="text" />
        </div>
      );
    }
    if (self.props.deleteable) {
      deleteEl = (
        <a href="#" className="chip-delete" onClick={self.onDeleteClick.bind(self)} />
      );
    }

    return (
      <div id={this.props.id} style={this.props.style} className={self.classes} onClick={self.onClick.bind(self)}>
        {mediaEl}
        {labelEl}
        {deleteEl}
      </div>
    );
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(
        self.props.className,
        {
          chip: true,
        },
        Mixins.colorClasses(self),
      );
    },
    mediaClasses() {
      const c = {
        'chip-media': true,
      };
      if (this.props.mediaTextColor) c[`text-color-${this.props.mediaTextColor}`] = true;
      if (this.props.mediaBgColor) c[`bg-color-${this.props.mediaBgColor}`] = true;
      return Utils.classNames(c);
    },
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
    onDeleteClick(event) {
      this.dispatchEvent('delete', event);
    },
  },
};
