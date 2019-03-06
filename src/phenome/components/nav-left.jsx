import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

import F7Link from './link';

export default {
  name: 'f7-nav-left',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    backLink: [Boolean, String],
    backLinkUrl: String,
    backLinkForce: Boolean,
    backLinkShowText: {
      type: Boolean,
      default: undefined,
    },
    sliding: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const props = this.props;
    const {
      backLink,
      backLinkUrl,
      backLinkForce,
      backLinkShowText,
      sliding,
      className,
      style,
      id,
    } = props;

    let linkEl;
    let needBackLinkText = backLinkShowText;
    if (typeof needBackLinkText === 'undefined') needBackLinkText = !this.$theme.md;

    if (backLink) {
      linkEl = (
        <F7Link
          href={backLinkUrl || '#'}
          back
          icon="icon-back"
          force={backLinkForce || undefined}
          className={(backLink === true || (backLink && this.$theme.md)) ? 'icon-only' : undefined}
          text={backLink !== true && needBackLinkText ? backLink : undefined}
          onClick={this.onBackClick}
        />
      );
    }
    const classes = Utils.classNames(
      className,
      'left',
      {
        sliding,
      },
      Mixins.colorClasses(props),
    );

    const children = [];
    const slots = this.slots;
    if (slots && Object.keys(slots).length) {
      Object.keys(slots).forEach((key) => {
        children.push(...slots[key]);
      });
    }
    return (
      <div id={id} style={style} className={classes}>
        {linkEl}
        {children}
      </div>
    );
  },
  componentDidCreate() {
    Utils.bindMethods(this, ['onBackClick']);
  },
  methods: {
    onBackClick(event) {
      this.dispatchEvent('back-click backClick click:back clickBack', event);
    },
  },
};
