import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

import F7Link from './link';

export default {
  name: 'f7-nav-left',
  props: {
    id: [String, Number],
    backLink: [Boolean, String],
    backLinkUrl: String,
    backLinkForce: Boolean,
    sliding: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const props = this.props;
    const {
      backLink,
      backLinkUrl,
      backLinkForce,
      sliding,
      className,
      style,
      id,
    } = props;

    let linkEl;
    if (backLink) {
      linkEl = (
        <F7Link
          href={backLinkUrl || '#'}
          back
          icon="icon-back"
          force={backLinkForce || undefined}
          className={(backLink === true || (backLink && this.$theme.md)) ? 'icon-only' : undefined}
          text={backLink !== true && !this.$theme.md ? backLink : undefined}
          onClick={this.onBackClick.bind(this)}
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
    return (
      <div id={id} style={style} className={classes}>
        {linkEl}
        <slot />
      </div>
    );
  },
  methods: {
    onBackClick(e) {
      this.dispatchEvent('back-click backClick click:back clickBack', e);
    },
  },
};
