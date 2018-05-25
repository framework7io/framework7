
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-messagebar-sheet-image',
  props: {
    id: [String, Number],
    image: String,
    checked: Boolean,
    ...Mixins.colorProps,
  },
  componentDidCreate() {
    this.onChangeBound = this.onChange.bind(this);
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      image,
      checked,
      id,
      className,
      style,
    } = props;

    const classes = Utils.classNames(
      className,
      'messagebar-sheet-image',
      'checkbox',
      Mixins.colorClasses(props),
    );
    const styles = Utils.extend({
      backgroundImage: image && `url(${image})`,
    }, style || {});

    return (
      <label id={id} className={classes} style={styles}>
        <input type="checkbox" checked={checked} onChange={self.onChangeBound} />
        <i className="icon icon-checkbox" />
        <slot />
      </label>
    );
  },
  methods: {
    onChange(e) {
      if (this.props.checked) this.dispatchEvent('checked', e);
      else this.dispatchEvent('unchecked', e);
      this.dispatchEvent('change', e);
    },
  },
};
