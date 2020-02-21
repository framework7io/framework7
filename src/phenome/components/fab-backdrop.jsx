import Utils from '../utils/utils';

export default {
  name: 'f7-fab-backdrop',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
    } = props;

    const classes = Utils.classNames(
      className,
      'fab-backdrop',
    );
    return (
      <div
        id={id}
        style={style}
        className={classes}
      />
    );
  },
};
