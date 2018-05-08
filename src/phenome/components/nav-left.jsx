import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

import F7Link from './link';

export default {
  name: 'f7-nav-left',
  props: {
    id: [String, Number],
    backLink: [Boolean, String],
    backLinkUrl: String,
    sliding: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const {
      backLink,
      backLinkUrl,
    } = this.props;

    let linkEl;
    if (backLink) {
      linkEl = (
        <F7Link
          href={backLinkUrl || '#'}
          back
          icon="icon-back"
          className={(backLink === true || (backLink && this.$theme.md)) ? 'icon-only' : undefined}
          text={backLink !== true && !this.$theme.md ? backLink : undefined}
          onClick={this.onBackClick.bind(this)}
        />
      );
    }
    return (
      <div id={this.props.id} style={this.props.style} className={this.classes}>
        {linkEl}
        <slot />
      </div>
    );
  },
  computed: {
    classes() {
      return Utils.classNames(
        this.props.className,
        {
          left: true,
          sliding: this.props.slidng,
        },
        Mixins.colorClasses(this),
      );
    },
  },
  methods: {
    onBackClick(e) {
      this.dispatchEvent('back-click backClick click:back clickBack', e);
    },
  },
};
